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
    const ws = await conn.execute("SELECT apex_util.find_security_group_id('SOLAR_COOK') AS wsid FROM dual");
    await conn.execute("BEGIN wwv_flow_api.set_security_group_id(:wsid); END;", { wsid: ws.rows[0].WSID });
    const pages = await conn.execute(
      "SELECT page_id, page_name, page_mode FROM apex_application_pages WHERE application_id = 100 ORDER BY page_id"
    );
    console.table(pages.rows);
  } finally {
    await conn.close();
  }
})().catch(console.error);
