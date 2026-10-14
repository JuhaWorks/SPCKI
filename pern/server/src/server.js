import 'dotenv/config';
import { app } from './app.js';
import { pool } from './db/pool.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verify database connection before starting
    const { rows } = await pool.query('SELECT NOW() as time');
    // eslint-disable-next-line no-console
    console.info(`[db] Connected to PostgreSQL at ${rows[0].time}`);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.info(`[server] Listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[server] Failed to start:', err.message);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  // eslint-disable-next-line no-console
  console.info('[server] SIGTERM signal received. Closing pool...');
  await pool.end();
  process.exit(0);
});
