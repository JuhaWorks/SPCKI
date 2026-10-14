const oracledb = require('oracledb');
const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin'
};

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  
  // Check users table
  try {
    const res = await conn.execute(`SELECT id, username, email, role, is_active FROM users ORDER BY id`);
    console.log('Users in DB:', res.rows);
  } catch (err) {
    console.log('Error checking users:', err.message);
  }

  // Check roles/lookups
  try {
    const res = await conn.execute(`SELECT table_name FROM user_tables ORDER BY table_name`);
    console.log('Tables:', res.rows.map(r => r[0]));
  } catch (err) {
    console.log('Error checking tables:', err.message);
  }

  await conn.close();
}

main().catch(console.error);
