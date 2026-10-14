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
    const tmplRes = await conn.execute(
      `SELECT name, template_name, plug_template 
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE flow_id = 100 AND page_id = 9999`
    );
    console.log('Page 9999 plugs:', tmplRes.rows);

    const plugTmpl = await conn.execute(
      `SELECT template_name, definition 
         FROM apex_200100.wwv_flow_templates 
        WHERE flow_id = 100 AND template_name LIKE '%Login%'`
    );
    console.log('Templates found:', plugTmpl.rows.length);
    for (const r of plugTmpl.rows) {
      console.log('Tmpl Name:', r[0]);
      console.log('Def:\n', r[1]);
    }
  } finally {
    await conn.close();
  }
}
main().catch(console.error);
