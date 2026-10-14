import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import crypto from 'crypto';
import argon2 from 'argon2';
import app from '../src/app.js';
import { pool, query } from '../src/db/pool.js';
import { generateAccessToken, generateRefreshToken } from '../src/utils/jwt.js';
import { sanitizeCell, sanitizeRow } from '../src/utils/csv-safe.js';

describe('Security Hardening Test Suite (Section 9 & Phase 8)', () => {
  let adminToken;
  let fieldTokenKitchen1;
  let viewerToken;

  beforeAll(async () => {
    adminToken = await generateAccessToken({ id: 1, username: 'admin', role: 'Admin', kitchen_id: null });
    fieldTokenKitchen1 = await generateAccessToken({ id: 3, username: 'field', role: 'Field', kitchen_id: 1 });
    viewerToken = await generateAccessToken({ id: 5, username: 'viewer', role: 'Viewer', kitchen_id: 1 });
  });

  afterAll(async () => {
    await pool.end();
  });

  // 1. Authentication & Session Security
  describe('9.2 Authentication & Sessions', () => {
    it('returns 401 Unauthorized when accessing protected routes without token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
    });

    it('returns 401 on invalid login credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        username: 'admin',
        password: 'WrongPassword999!',
      });
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/invalid/i);
    });

    it('locks account after 5 consecutive failed login attempts', async () => {
      const testUser = 'lockout_test_user';
      const testHash = await argon2.hash('TestPwd@12345', { type: argon2.argon2id });
      // Create a dedicated active test user for lockout test
      await query(
        `INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, failed_login_attempts)
         VALUES (1, $1, 'Lockout Test', 'lockout@test.com', $2, 'Field', 'Active', 0)
         ON CONFLICT (username) DO UPDATE SET password_hash = $2, failed_login_attempts = 0, locked_until = NULL`,
        [testUser, testHash]
      );

      // Attempt 5 bad logins
      for (let i = 0; i < 5; i++) {
        await request(app).post('/api/auth/login').send({
          username: testUser,
          password: 'IncorrectPassword!',
        });
      }

      // 6th attempt must be rejected with 403 locked
      const lockedRes = await request(app).post('/api/auth/login').send({
        username: testUser,
        password: 'IncorrectPassword!',
      });
      expect(lockedRes.status).toBe(403);
      expect(lockedRes.body.error).toMatch(/locked/i);

      // Cleanup
      await query('DELETE FROM login_history WHERE user_id = (SELECT id FROM users WHERE username = $1)', [testUser]);
      await query('DELETE FROM users WHERE username = $1', [testUser]);
    });

    it('detects refresh token reuse and revokes entire token family', async () => {
      const { raw, hash } = generateRefreshToken();
      const family = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      // Insert already-revoked refresh token
      await query(
        `INSERT INTO refresh_tokens (user_id, token_hash, family, expires_at, revoked_at)
         VALUES (1, $1, $2, $3, now())`,
        [hash, family, expiresAt]
      );

      // Attempt to refresh using already revoked token
      const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: raw });

      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/compromised/i);

      // Verify entire family is revoked in DB
      const check = await query('SELECT revoked_at FROM refresh_tokens WHERE family = $1', [family]);
      expect(check.rows.length).toBeGreaterThan(0);
      expect(check.rows.every(r => r.revoked_at !== null)).toBe(true);
    });

    it('enforces password policy on /change-password (rejects < 10 chars and common passwords)', async () => {
      // Rejects short password
      const shortRes = await request(app)
        .post('/api/auth/change-password')
        .set('Cookie', [`accessToken=${adminToken}`])
        .send({
          currentPassword: 'Admin@12345',
          newPassword: 'short',
        });
      expect(shortRes.status).toBe(400);

      // Rejects common password
      const commonRes = await request(app)
        .post('/api/auth/change-password')
        .set('Cookie', [`accessToken=${adminToken}`])
        .send({
          currentPassword: 'Admin@12345',
          newPassword: 'password123',
        });
      expect(commonRes.status).toBe(400);
      const isCommonMsg = (commonRes.body.error && /common/i.test(commonRes.body.error)) ||
        JSON.stringify(commonRes.body.details || []).toLowerCase().includes('common');
      expect(isCommonMsg).toBeTruthy();
    });
  });

  // 2. Authorization & IDOR Protection
  describe('9.3 Authorization & Cross-Kitchen Isolation', () => {
    it('returns 403 when user with Viewer role attempts to create a household', async () => {
      const res = await request(app)
        .post('/api/households')
        .set('Cookie', [`accessToken=${viewerToken}`])
        .send({
          kitchen_id: 1,
          household_code: 'HH-UNAUTH',
          family_size: 4,
          adults_count: 2,
          children_count: 2,
          status: 'Active',
        });
      expect(res.status).toBe(403);
    });

    it('blocks cross-kitchen household modification (IDOR defense)', async () => {
      // Ensure kitchen 2 exists for cross-kitchen test
      const k2 = await query(
        `INSERT INTO kitchens (name, location, max_households, slots_per_day, scheduled_hours, status)
         VALUES ('Kitchen 2', 'Location 2', 50, 7, 14, 'Active')
         ON CONFLICT (name) DO UPDATE SET status = 'Active' RETURNING id`
      );
      const kitchen2Id = k2.rows[0].id;

      // Insert household in kitchen 2
      const hhK2 = await query(
        `INSERT INTO households (kitchen_id, household_code, family_size, adults_count, children_count, status)
         VALUES ($1, 'HH-K2-TEST', 3, 2, 1, 'Active')
         ON CONFLICT (household_code) DO UPDATE SET kitchen_id = $1 RETURNING id`,
        [kitchen2Id]
      );
      const householdId = hhK2.rows[0].id;

      // Field staff assigned to Kitchen 1 attempts to update household in Kitchen 2
      const res = await request(app)
        .put(`/api/households/${householdId}`)
        .set('Cookie', [`accessToken=${fieldTokenKitchen1}`])
        .send({
          kitchen_id: 1,
          household_code: 'HH-K2-HIJACK',
          family_size: 3,
          adults_count: 2,
          children_count: 1,
          status: 'Active',
        });

      // Must be rejected with 403 Forbidden
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/another kitchen/i);

      // Cleanup
      await query('DELETE FROM households WHERE id = $1', [householdId]);
    });
  });

  // 3. Input Validation & Injection Protection
  describe('9.4 Input Validation & Injection', () => {
    it('rejects household with invalid family sum (adults + children != family_size)', async () => {
      const res = await request(app)
        .post('/api/households')
        .set('Cookie', [`accessToken=${adminToken}`])
        .send({
          kitchen_id: 1,
          household_code: 'HH-BAD-MATH',
          family_size: 10,
          adults_count: 2,
          children_count: 2, // 2 + 2 != 10
          status: 'Active',
        });
      expect(res.status).toBe(400);
    });

    it('neutralizes spreadsheet formula injection (CSV/Excel injection)', () => {
      expect(sanitizeCell('=1+1')).toBe("'=1+1");
      expect(sanitizeCell('+cmd|')).toBe("'+cmd|");
      expect(sanitizeCell('-calc')).toBe("'-calc");
      expect(sanitizeCell('@SUM(A1:A10)')).toBe("'@SUM(A1:A10)");
      expect(sanitizeCell('\t=2+2')).toBe("'\t=2+2");
      expect(sanitizeCell('Normal text')).toBe('Normal text');

      const sanitizedRow = sanitizeRow({
        name: '=HYPERLINK("http://attacker.com")',
        count: 5,
      });
      expect(sanitizedRow.name).toBe('\'=HYPERLINK("http://attacker.com")');
      expect(sanitizedRow.count).toBe(5);
    });
  });

  // 4. Transport & Security Headers
  describe('9.5 Transport & Headers', () => {
    it('sets strict security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)', async () => {
      const res = await request(app).get('/health');
      expect(res.headers['x-frame-options']).toBe('DENY');
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['referrer-policy']).toBe('no-referrer');
      expect(res.headers['permissions-policy']).toBeDefined();
      expect(res.headers['content-security-policy']).toBeDefined();
    });

    it('rejects cookie-based state changes from untrusted Origin (CSRF Protection)', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Origin', 'http://malicious-site.com')
        .set('Cookie', [`accessToken=${adminToken}`]);

      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/CSRF/i);
    });
  });
});
