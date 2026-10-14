const oracledb = require('oracledb');
try { oracledb.initOracleClient({ libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin' }); } catch (e) {}
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

(async () => {
  const conn = await oracledb.getConnection({
    user: 'solar_cook',
    password: 'solar_cook',
    connectString: '202.84.45.58:1521/bexibank',
  });
  try {
    const res = await conn.execute(
      `SELECT object_name, object_type, status, last_ddl_time
       FROM user_objects
       WHERE object_type IN ('PACKAGE', 'PACKAGE BODY', 'TRIGGER', 'VIEW')
       ORDER BY object_type, object_name`
    );
    console.table(res.rows);
  } finally {
    await conn.close();
  }
})().catch(console.error);
