import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { rateLimit } from 'express-rate-limit';

import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import syncRoutes from './routes/sync.js';
import kitchensRoutes from './routes/kitchens.js';
import householdsRoutes from './routes/households.js';
import exportRoutes from './routes/export.js';
import { getAllowedOrigins } from './utils/origins.js';
export const app = express();
const allowedOrigins = getAllowedOrigins();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", ...allowedOrigins],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
    frameguard: { action: 'deny' },
    crossOriginEmbedderPolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

app.use(hpp());

// CORS configuration (allow credentials for cookies)
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, !origin || allowedOrigins.has(origin));
    },
    credentials: true,
  })
);

// Body parsing and cookies
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Logging
app.use(
  pinoHttp({
    level: process.env.LOG_LEVEL || 'info',
    autoLogging: process.env.NODE_ENV !== 'test',
  })
);

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
app.use('/api', limiter);

// Strict rate limit for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  limit: 50,
});
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/kitchens', kitchensRoutes);
app.use('/api/households', householdsRoutes);
app.use('/api/export', exportRoutes);
// Health check
app.get(['/health', '/api/v1/health'], (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling (must be last)
app.use(errorHandler);

export default app;
