import { SignJWT, jwtVerify } from 'jose';
import crypto from 'node:crypto';

// Secret keys should be 32 bytes minimum in production
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-development-key-that-is-at-least-32-bytes-long'
);

export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';

/**
 * Generate a new access token for a user.
 * @param {object} user - User object containing id, username, role, kitchen_id
 * @returns {Promise<string>}
 */
export async function generateAccessToken(user) {
  return new SignJWT({
    sub: String(user.id),
    username: user.username,
    role: user.role,
    kitchen_id: user.kitchen_id,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Generate a cryptographically secure random string for a refresh token.
 * We hash this string in the database.
 * @returns {{ raw: string, hash: string }}
 */
export function generateRefreshToken() {
  const raw = crypto.randomBytes(40).toString('hex');
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  return { raw, hash };
}

/**
 * Hash a plain string token (used when verifying incoming refresh tokens).
 * @param {string} token 
 * @returns {string}
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Verify an access token.
 * @param {string} token 
 * @returns {Promise<object>} The decoded payload
 */
export async function verifyAccessToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    throw new Error('Invalid or expired token');
  }
}
