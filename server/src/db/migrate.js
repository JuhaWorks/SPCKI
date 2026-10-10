/**
 * migrate.js — run SQL migrations in order from migrations/ directory
 *
 * Usage:
 *   node src/db/migrate.js           # run all pending migrations
 *   node src/db/migrate.js --dry-run  # show what would run
 *
 * Each migration file is tracked in the "schema_migrations" table.
 * Files run top-to-bottom, once only.
 */

import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');
const DRY_RUN = process.argv.includes('--dry-run');

async function migrate() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    // Create tracking table

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename   TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    // Get already-applied migrations
    const { rows: applied } = await client.query(
      'SELECT filename FROM schema_migrations ORDER BY filename',
    );
    const appliedSet = new Set(applied.map((r) => r.filename));

    // Read migration files in order (skip role file which needs superuser)
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith('.sql') && f !== '0000_create_roles.sql')
      .sort();

    let ran = 0;
    for (const file of files) {
      if (appliedSet.has(file)) {
        console.info(`[migrate] ✓ already applied: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');

      if (DRY_RUN) {
        console.info(`[migrate] DRY RUN — would apply: ${file}`);
        continue;
      }

      console.info(`[migrate] Applying: ${file} ...`);
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.info(`[migrate] ✓ applied: ${file}`);
      ran++;
    }

    if (ran === 0 && !DRY_RUN) {
      console.info('[migrate] All migrations already applied. Database is up to date.');
    } else {
      console.info(`[migrate] Done. Applied ${ran} migration(s).`);
    }
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('[migrate] FAILED:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
