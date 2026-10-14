import { ZodError } from 'zod';

export function errorHandler(err, req, res, _next) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({ path: e.path.join('.'), message: e.message }))
    });
  }

  // Postgres unique constraint violation
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists (duplicate key)' });
  }

  // Postgres foreign key violation
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referenced record does not exist' });
  }

  // Default server error
  req.log.error(err);
  const isDev = process.env.NODE_ENV === 'development';
  return res.status(500).json({
    error: 'Internal server error',
    ...(isDev && { message: err.message, stack: err.stack }),
  });
}
