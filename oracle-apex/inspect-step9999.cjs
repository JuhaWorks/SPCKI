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
      `SELECT column_name, data_type FROM all_tab_columns 
        WHERE owner = 'APEX_200100' AND table_name = 'WWV_FLOW_STEPS'
          AND (column_name LIKE '%CSS%' OR column_name LIKE '%HTML%' OR column_name LIKE '%JAVA%')`
    );
    console.log('Columns in wwv_flow_steps:', res.rows.map(r => r[0]));

    const p9999 = await conn.execute(
      `SELECT id, name, step_title, 
              dbms_lob.substr(javascript_code, 2000, 1),
              dbms_lob.substr(inline_css, 2000, 1)
         FROM apex_200100.wwv_flow_steps 
        WHERE flow_id = 100 AND id = 9999`
    );
    console.log('Page 9999 step:');
    if (p9999.rows.length) {
      console.log('Name:', p9999.rows[0][1]);
      console.log('Title:', p9999.rows[0][2]);
      console.log('JS:', p9999.rows[0][3]);
      console.log('CSS:', p9999.rows[0][4]);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
