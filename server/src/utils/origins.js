const DEFAULT_ORIGIN = 'http://localhost:5173';
const DEVELOPMENT_ORIGINS = ['http://localhost:5173', 'http://localhost:5174'];

export function getAllowedOrigins({
  corsOrigin = process.env.CORS_ORIGIN,
  nodeEnv = process.env.NODE_ENV,
} = {}) {
  const origins = new Set([corsOrigin || DEFAULT_ORIGIN]);

  if (nodeEnv !== 'production') {
    DEVELOPMENT_ORIGINS.forEach((origin) => origins.add(origin));
  }

  return origins;
}

export function isAllowedOrigin(origin) {
  return getAllowedOrigins().has(origin);
}
