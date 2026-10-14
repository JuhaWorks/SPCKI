import { verifyAccessToken } from '../utils/jwt.js';

/**
 * Middleware to protect routes that require authentication.
 * Checks for token in HTTP-only cookies first, then Authorization header.
 */
export async function requireAuth(req, res, next) {
  try {
    // 1. Try to get token from cookie
    let token = req.cookies?.accessToken;

    // 2. Fallback to Bearer token in header (useful for mobile apps/testing)
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const payload = await verifyAccessToken(token);
    
    // Attach user payload to request
    req.user = {
      id: parseInt(payload.sub, 10),
      username: payload.username,
      role: payload.role,
      kitchen_id: payload.kitchen_id,
    };

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Middleware to restrict access to specific roles.
 * Must be used AFTER requireAuth.
 * @param {string[]} allowedRoles
 */
export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
