/**
 * seed.js — run seed SQL files in order
 *
 * Usage:
 *   node src/db/seed.js         # base seed only (lookups already in migration)
 *   node src/db/seed.js --demo  # base + demo data (16 households, 14 days)
 *
 * The admin user's placeholder password is replaced with a real argon2id hash.
 */

import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import argon2 from 'argon2';
import 'dotenv/config';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEEDS_DIR = path.join(__dirname, 'seeds');
const DEMO = process.argv.includes('--demo');

async function seed() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    // Run base seed
    const baseFile = path.join(SEEDS_DIR, '01_base.sql');
    console.info('[seed] Applying 01_base.sql ...');
    await client.query(fs.readFileSync(baseFile, 'utf8'));
    console.info('[seed] ✓ 01_base.sql done');

    if (DEMO) {
      const demoFile = path.join(SEEDS_DIR, '02_demo.sql');
      console.info('[seed] Applying 02_demo.sql ...');
      await client.query(fs.readFileSync(demoFile, 'utf8'));
      console.info('[seed] ✓ 02_demo.sql done');

      // Replace the placeholder admin password with a real argon2id hash
      const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? 'Admin@12345';
      const hash = await argon2.hash(adminPassword, { type: argon2.argon2id });
      await client.query(
        "UPDATE users SET password_hash = $1 WHERE username = 'admin' AND password_hash LIKE '$argon2id$PLACEHOLDER%'",
        [hash],
      );
      console.info('[seed] ✓ Admin password hashed (argon2id)');
    }

    console.info('[seed] All seeds applied successfully.');
  } catch (err) {
    console.error('[seed] FAILED:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
