/* eslint-disable no-console */
import pg from 'pg';
import argon2 from 'argon2';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const ROLES_TO_SEED = [
  {
    username: 'admin',
    fullName: 'System Administrator',
    email: 'admin@spcki.org',
    role: 'Admin',
    password: 'Admin@12345',
    kitchenId: null,
  },
  {
    username: 'project',
    fullName: 'Project Coordinator',
    email: 'project@spcki.org',
    role: 'Project',
    password: 'Project@12345',
    kitchenId: 1,
  },
  {
    username: 'field',
    fullName: 'Field Officer',
    email: 'field@spcki.org',
    role: 'Field',
    password: 'Field@12345',
    kitchenId: 1,
  },
  {
    username: 'technical',
    fullName: 'Technical Specialist',
    email: 'technical@spcki.org',
    role: 'Technical',
    password: 'Technical@12345',
    kitchenId: 1,
  },
  {
    username: 'viewer',
    fullName: 'Donor Viewer',
    email: 'viewer@spcki.org',
    role: 'Viewer',
    password: 'Viewer@12345',
    kitchenId: 1,
  },
];

async function seedRoles() {
  console.log('Seeding role accounts...');
  try {
    for (const u of ROLES_TO_SEED) {
      const passwordHash = await argon2.hash(u.password, { type: argon2.argon2id });
      
      const res = await pool.query(
        `INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, must_change_password)
         VALUES ($1, $2, $3, $4, $5, $6, 'Active', false)
         ON CONFLICT (username) DO UPDATE 
         SET full_name = EXCLUDED.full_name,
             email = EXCLUDED.email,
             password_hash = EXCLUDED.password_hash,
             role = EXCLUDED.role,
             status = 'Active',
             failed_login_attempts = 0,
             locked_until = NULL,
             must_change_password = false
         RETURNING id, username, role, email;`,
        [u.kitchenId, u.username, u.fullName, u.email, passwordHash, u.role]
      );
      console.log(`✓ Seeded ${u.role}: username=${u.username}, email=${u.email} (id=${res.rows[0].id})`);
    }

    // Also ensure admin has must_change_password = false
    await pool.query(
      `UPDATE users SET must_change_password = false WHERE username = 'admin'`
    );
    console.log('✓ Admin must_change_password set to false');
    console.log('All roles seeded successfully!');
  } catch (err) {
    console.error('Failed to seed roles:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedRoles();
