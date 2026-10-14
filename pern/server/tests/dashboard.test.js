import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { pool } from '../src/db/pool.js';
import { generateAccessToken } from '../src/utils/jwt.js';

describe('Dashboard API Tests', () => {
  let adminToken;
  let viewerToken;

  beforeAll(async () => {
    adminToken = await generateAccessToken({ id: 1, username: 'admin', role: 'Admin', kitchen_id: null });
    viewerToken = await generateAccessToken({ id: 5, username: 'viewer', role: 'Viewer', kitchen_id: 1 });
  });

  afterAll(async () => {
    await pool.end();
  });

  it('Admin can fetch sessions without kitchen constraint', async () => {
    const res = await request(app)
      .get('/api/dashboard/sessions')
      .set('Cookie', [`accessToken=${adminToken}`]);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Should return some sessions since we seeded
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Viewer gets data filtered by their assigned kitchen', async () => {
    const res = await request(app)
      .get('/api/dashboard/sessions')
      .set('Cookie', [`accessToken=${viewerToken}`]);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    
    // Viewer is assigned to kitchen 1, so all results must have kitchen_id == '1' (or 1)
    res.body.forEach(session => {
      expect(session.kitchen_id.toString()).toBe('1');
    });
  });

  it('Unauthorized without token', async () => {
    const res = await request(app).get('/api/dashboard/sessions');
    expect(res.status).toBe(401);
  });

  it('Filters by date', async () => {
    const res = await request(app)
      .get('/api/dashboard/solar?start_date=2023-12-31&end_date=2024-01-01')
      .set('Cookie', [`accessToken=${adminToken}`]);
      
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
