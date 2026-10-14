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
  
  const cnt = await conn.execute(`SELECT count(*) FROM cooking_sessions`);
  console.log('Cooking sessions count:', cnt.rows[0][0]);

  const sample = await conn.execute(
    `SELECT s.id, to_char(trunc(cast(s.start_at as date)), 'YYYY-MM-DD') AS s_date,
            a.name AS appliance, s.power_source, s.persons_cooked_for, s.duration_min,
            h.family_size
     FROM cooking_sessions s
     JOIN appliances a ON a.id = s.appliance_id
     JOIN households h ON h.id = s.household_id
     WHERE ROWNUM <= 5`
  );
  console.log('Sample sessions:', sample.rows);

  await conn.close();
}

main().catch(console.error);
