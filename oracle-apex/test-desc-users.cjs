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
  
  const cols = await conn.execute(
    `SELECT column_name, data_type, data_length, nullable 
     FROM user_tab_cols 
     WHERE table_name = 'USERS' 
     ORDER BY column_id`
  );
  console.log('USERS columns:', cols.rows);

  const users = await conn.execute(`SELECT * FROM users`);
  console.log('USERS rows:', users.rows);

  await conn.close();
}

main().catch(console.error);
