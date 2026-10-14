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
  try {
    const r1 = await conn.execute(`SELECT min(log_date), max(log_date), count(*) FROM daily_technical_logs`);
    console.log('Daily logs:', r1.rows[0]);

    const r2 = await conn.execute(`SELECT min(cooking_date), max(cooking_date), count(*) FROM cooking_sessions`);
    console.log('Cooking sessions:', r2.rows[0]);

    // Check last 10 dates of daily logs
    const r3 = await conn.execute(`
      SELECT to_char(log_date, 'YYYY-MM-DD') FROM (
        SELECT log_date FROM daily_technical_logs ORDER BY log_date DESC
      ) WHERE ROWNUM <= 10
    `);
    console.log('Latest 10 daily logs:', r3.rows.map(r => r[0]));

    // Check last 10 dates of cooking sessions
    const r4 = await conn.execute(`
      SELECT to_char(cooking_date, 'YYYY-MM-DD') FROM (
        SELECT cooking_date FROM cooking_sessions ORDER BY cooking_date DESC
      ) WHERE ROWNUM <= 10
    `);
    console.log('Latest 10 cooking sessions:', r4.rows.map(r => r[0]));
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
