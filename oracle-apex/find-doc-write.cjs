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
    const plugs = await conn.execute(
      `SELECT page_id, plug_name, dbms_lob.substr(plug_source, 4000, 1) as src
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE flow_id = 100 AND dbms_lob.instr(plug_source, 'document.write') > 0`
    );
    console.log('Plugs with document.write:', plugs.rows.length);
    for (const r of plugs.rows) {
      console.log(`Page: ${r[0]}, Plug: ${r[1]}`);
    }

    const steps = await conn.execute(
      `SELECT id, name, dbms_lob.substr(javascript_code, 4000, 1)
         FROM apex_200100.wwv_flow_steps
        WHERE flow_id = 100 AND dbms_lob.instr(javascript_code, 'document.write') > 0`
    );
    console.log('Steps with document.write:', steps.rows.length);

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
