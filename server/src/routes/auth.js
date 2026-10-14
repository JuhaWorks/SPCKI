import { Router } from 'express';
import argon2 from 'argon2';
import crypto from 'node:crypto';
import { z } from 'zod';
import { query, getClient } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { generateAccessToken, generateRefreshToken, hashToken } from '../utils/jwt.js';
import { logAuditEvent } from '../utils/audit.js';
import { isAllowedOrigin } from '../utils/origins.js';

const router = Router();

// Validation schemas
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const COMMON_PASSWORDS = new Set([
  'password123',
  '1234567890',
  'qwerty12345',
  'admin12345',
  'letmein123',
  'changeme123',
  'password1234',
  'welcome1234',
  'iloveyou123',
  'spcki12345',
]);

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(10, 'Password must be at least 10 characters long')
    .max(128, 'Password cannot exceed 128 characters')
    .refine((pwd) => !COMMON_PASSWORDS.has(pwd.toLowerCase()), {
      message: 'Password is too common or easily guessable',
    }),
});

// Configure cookie settings for security
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

// CSRF check for state-changing cookie-based endpoints
function csrfProtection(req, res, next) {
  const origin = req.headers.origin;
  if (origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ error: 'CSRF validation failed: Invalid Origin' });
  }
  next();
}

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const { rows } = await query('SELECT * FROM users WHERE username = $1 OR email = $1', [username]);
    const user = rows[0];

    // Log login attempt (failed)
    if (!user) {
      await query(
        'INSERT INTO login_history (username, success, ip_address) VALUES ($1, false, $2)',
        [username, req.ip]
      );
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(403).json({ error: 'Account is temporarily locked' });
    }

    // Verify password
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) {
      const attempts = user.failed_login_attempts + 1;
      let lockQuery = 'UPDATE users SET failed_login_attempts = $1 WHERE id = $2';
      const lockParams = [attempts, user.id];
      
      if (attempts >= 5) {
        // Lock for 15 minutes
        lockQuery = 'UPDATE users SET failed_login_attempts = $1, locked_until = now() + interval \'15 minutes\' WHERE id = $2';
      }
      
      await query(lockQuery, lockParams);
      await query(
        'INSERT INTO login_history (user_id, username, success, ip_address) VALUES ($1, $2, false, $3)',
        [user.id, username, req.ip]
      );
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Success! Reset failed attempts and update last login
    await query(
      'UPDATE users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = now() WHERE id = $1',
      [user.id]
    );
    await query(
      'INSERT INTO login_history (user_id, username, success, ip_address) VALUES ($1, $2, true, $3)',
      [user.id, username, req.ip]
    );

    // Generate tokens
    const accessToken = await generateAccessToken(user);
    const { raw: refreshTokenRaw, hash: refreshTokenHash } = generateRefreshToken();
    const family = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await query(
      'INSERT INTO refresh_tokens (user_id, token_hash, family, expires_at) VALUES ($1, $2, $3, $4)',
      [user.id, refreshTokenHash, family, expiresAt]
    );

    // Set cookies
    res.cookie('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 mins
    });
    res.cookie('refreshToken', refreshTokenRaw, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/auth/refresh', // Restrict refresh token to refresh endpoint
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        kitchen_id: user.kitchen_id,
        must_change_password: user.must_change_password,
      },
      // Optionally return tokens in body for mobile clients that don't use cookies
      accessToken,
      refreshToken: refreshTokenRaw
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refresh', csrfProtection, async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!rawToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const hashed = hashToken(rawToken);
    
    // Begin transaction for token rotation
    const client = await getClient();
    try {
      await client.query('BEGIN');

      // Find token
      const { rows } = await client.query(
        'SELECT * FROM refresh_tokens WHERE token_hash = $1',
        [hashed]
      );
      const tokenRecord = rows[0];

      if (!tokenRecord) {
        // Token doesn't exist (or was already consumed). 
        // For opaque tokens, deny.
        await client.query('ROLLBACK');
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      if (tokenRecord.revoked_at) {
        // Token was already consumed/revoked! This is a reuse detection (security breach).
        // Revoke the ENTIRE family to protect the user.
        await client.query(
          'UPDATE refresh_tokens SET revoked_at = now() WHERE family = $1',
          [tokenRecord.family]
        );
        await client.query('COMMIT');
        return res.status(401).json({ error: 'Token compromised. Please log in again.' });
      }

      if (new Date(tokenRecord.expires_at) < new Date()) {
        await client.query('ROLLBACK');
        return res.status(401).json({ error: 'Refresh token expired' });
      }

      // Mark old token as revoked
      await client.query(
        'UPDATE refresh_tokens SET revoked_at = now() WHERE id = $1',
        [tokenRecord.id]
      );

      // Get user
      const { rows: userRows } = await client.query('SELECT * FROM users WHERE id = $1 AND status = $2', [tokenRecord.user_id, 'Active']);
      const user = userRows[0];
      if (!user) {
        await client.query('ROLLBACK');
        return res.status(401).json({ error: 'User deactivated or not found' });
      }

      // Issue new tokens (same family)
      const accessToken = await generateAccessToken(user);
      const { raw: newRefreshRaw, hash: newRefreshHash } = generateRefreshToken();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await client.query(
        'INSERT INTO refresh_tokens (user_id, token_hash, family, expires_at) VALUES ($1, $2, $3, $4)',
        [user.id, newRefreshHash, tokenRecord.family, expiresAt]
      );

      await client.query('COMMIT');

      // Set cookies
      res.cookie('accessToken', accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie('refreshToken', newRefreshRaw, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/api/auth/refresh',
      });

      res.json({ accessToken, refreshToken: newRefreshRaw });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', requireAuth, csrfProtection, async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (rawToken) {
      const hashed = hashToken(rawToken);
      await query('UPDATE refresh_tokens SET revoked_at = now() WHERE token_hash = $1', [hashed]);
    }
    
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/change-password', requireAuth, csrfProtection, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    const { rows } = await query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const valid = await argon2.verify(rows[0].password_hash, currentPassword);
    if (!valid) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: 'New password cannot be the same as the current password' });
    }

    const newHash = await argon2.hash(newPassword, { type: argon2.argon2id });
    await query(
      'UPDATE users SET password_hash = $1, must_change_password = false WHERE id = $2',
      [newHash, req.user.id]
    );

    // Revoke all existing refresh token families on password change
    await query('UPDATE refresh_tokens SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL', [req.user.id]);

    await logAuditEvent({
      userId: req.user.id,
      action: 'UPDATE',
      tableName: 'users',
      recordId: req.user.id,
      reason: 'User changed password',
    });

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await query('SELECT id, username, full_name, email, role, kitchen_id, must_change_password FROM users WHERE id = $1', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
