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
    `SELECT plug_name, plug_source_type, substr(plug_source, 1, 200)
     FROM apex_200100.wwv_flow_page_plugs
     WHERE flow_id = 100 AND page_id = 1`
  );
  console.log(res.rows);
  await conn.close();
}

main().catch(console.error);
