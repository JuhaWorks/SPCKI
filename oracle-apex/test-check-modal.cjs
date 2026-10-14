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
  const res = await conn.execute(
    `SELECT process_name, process_type, process_success_message, attribute_01, attribute_02, attribute_03
     FROM apex_200100.wwv_flow_step_processing
     WHERE flow_id = 100 AND flow_step_id = 12`
  );
  console.log('Page 12 Processes:', res.rows);
  await conn.close();
}

main().catch(console.error);
