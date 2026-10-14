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
    
    oracledb.fetchAsString = [oracledb.CLOB];
    const r = await conn.execute(
      `SELECT region_source
       FROM apex_application_page_regions
       WHERE application_id = 100 AND page_id = 1 AND region_name = 'Operational Analytics & Performance Visualizations'`
    );
    const src = r.rows[0].REGION_SOURCE;
    console.log("Region source length:", src.length);
    console.log("Snippet:\n", src.substring(0, 300));

    const lines = src.split('\n');
    lines.slice(0, 30).forEach((l, idx) => console.log(`${idx + 1}: ${l}`));
  } catch (err) {
    console.error("✗ Error:", err.message);
  } finally {
    await conn.close();
  }
})().catch(console.error);
