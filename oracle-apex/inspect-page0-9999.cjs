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
    const cols = await conn.execute(
      `SELECT column_name FROM all_tab_columns 
        WHERE owner = 'APEX_200100' AND table_name = 'WWV_FLOW_PAGE_PLUGS' 
          AND column_name LIKE '%COND%'`
    );
    console.log('Condition cols:', cols.rows.map(r => r[0]));

    const res0 = await conn.execute(
      `SELECT id, plug_name, plug_source_type, plug_display_condition_type, plug_display_when_condition
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE flow_id = 100 AND page_id = 0`
    );
    console.log('Page 0 plugs:', res0.rows);

    const res9999 = await conn.execute(
      `SELECT id, plug_name, plug_template, 
              dbms_lob.substr(plug_header, 1000, 1) as hdr,
              dbms_lob.substr(plug_footer, 1000, 1) as ftr
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE flow_id = 100 AND page_id = 9999`
    );
    console.log('\nPage 9999 plugs:');
    for (const r of res9999.rows) {
      console.log(`ID: ${r[0]}, Name: ${r[1]}, Tmpl: ${r[2]}`);
      console.log(`Header:\n${r[3]}`);
      console.log(`Footer:\n${r[4]}`);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
