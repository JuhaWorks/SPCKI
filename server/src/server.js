import app from './app.js';

const PORT = process.env.PORT ?? 4000;

const server = app.listen(PORT, () => {
  console.info(`[server] Listening on http://localhost:${PORT}`);
});

const shutdown = () => {
  server.close(() => {
    console.info('[server] Graceful shutdown complete.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
