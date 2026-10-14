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
      `SELECT DISTINCT plug_display_condition_type 
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE plug_display_condition_type IS NOT NULL AND ROWNUM <= 20`
    );
    console.log('Condition types in plugs:', res.rows.map(r => r[0]));

    const res3 = await conn.execute(
      `SELECT condition_name, condition_type 
         FROM apex_200100.wwv_flow_conditions 
        WHERE condition_type LIKE '%PAGE%' OR condition_name LIKE '%Page%'`
    );
    console.log('Page condition types:', res3.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
