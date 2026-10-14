import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { getAllowedOrigins } from '../src/utils/origins.js';

describe('allowed origins', () => {
  it('allows the configured origin and local Vite fallback port during development', () => {
    const allowedOrigins = getAllowedOrigins({
      corsOrigin: 'http://localhost:5173',
      nodeEnv: 'development',
    });

    expect(allowedOrigins.has('http://localhost:5173')).toBe(true);
    expect(allowedOrigins.has('http://localhost:5174')).toBe(true);
    expect(allowedOrigins.has('https://example.com')).toBe(false);
  });

  it('keeps production CORS restricted to the configured origin', () => {
    const allowedOrigins = getAllowedOrigins({
      corsOrigin: 'https://app.example.com',
      nodeEnv: 'production',
    });

    expect([...allowedOrigins]).toEqual(['https://app.example.com']);
  });

  it('allows the Vite fallback origin through the auth preflight request', async () => {
    const response = await request(app)
      .options('/api/auth/login')
      .set('Origin', 'http://localhost:5174')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'content-type');

    expect(response.status).toBe(204);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5174');
  });

  it('applies the same development origin allowlist to CSRF validation', async () => {
    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Origin', 'http://localhost:5174')
      .send({});

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Refresh token required');
  });
});
