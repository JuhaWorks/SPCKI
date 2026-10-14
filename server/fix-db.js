import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  try {
    console.log('Dropping constraints...');
    await pool.query('ALTER TABLE slots DROP CONSTRAINT IF EXISTS slots_kitchen_id_slot_date_slot_no_key;');
    await pool.query('ALTER TABLE slots DROP CONSTRAINT IF EXISTS slots_slot_no_check;');
    await pool.query('ALTER TABLE cooking_sessions DROP CONSTRAINT IF EXISTS cooking_sessions_slot_id_key;');
    console.log('Constraints dropped!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}
run();
