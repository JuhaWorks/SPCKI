import pg from 'pg';

const { Pool } = pg;

// Validate DATABASE_URL is present
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('[db] DATABASE_URL environment variable is required');
}

const ssl = process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false;

export const pool = new Pool({
  connectionString,
  ssl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
  // Log but don't crash – pool will reconnect
  console.error('[db] Unexpected pool error:', err.message);
});

/**
 * Execute a parameterised query. ALWAYS use this – never string-concat SQL.
 * @param {string} text - The SQL query with $1, $2 placeholders
 * @param {unknown[]} [params] - Query parameters
 * @returns {Promise<pg.QueryResult>}
 */
export async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.LOG_LEVEL === 'debug') {
    console.debug('[db] query', { text: text.slice(0, 80), duration, rows: result.rowCount });
  }
  return result;
}

/**
 * Get a client from the pool for transactions.
 * Always call client.release() in a finally block.
 * @returns {Promise<pg.PoolClient>}
 */
export async function getClient() {
  return pool.connect();
}

/**
 * Run a function inside a transaction. Rolls back on error.
 * @param {(client: pg.PoolClient) => Promise<T>} fn
 * @returns {Promise<T>}
 * @template T
 */
export async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
