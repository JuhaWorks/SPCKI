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
    const res = await conn.execute(
      `SELECT plug_id, plug_name, page_id, plug_template, plug_source_type, 
              dbms_lob.substr(plug_header, 4000, 1) as p_hdr,
              dbms_lob.substr(plug_footer, 4000, 1) as p_ftr
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE flow_id = 100 AND page_id IN (0, 9999)`
    );
    for (const r of res.rows) {
      console.log(`--- Page ${r[2]} Plug: ${r[1]} (ID: ${r[0]}) ---`);
      console.log('Header:\n', r[5]);
      console.log('Footer:\n', r[6]);
    }
    
    const p9999 = await conn.execute(
      `SELECT page_id, name, 
              dbms_lob.substr(javascript_code, 4000, 1) as js,
              dbms_lob.substr(inline_css, 4000, 1) as css
         FROM apex_200100.wwv_flow_steps 
        WHERE flow_id = 100 AND page_id = 9999`
    );
    console.log('\n--- Page 9999 step props ---', p9999.rows);
  } finally {
    await conn.close();
  }
}
main().catch(console.error);
