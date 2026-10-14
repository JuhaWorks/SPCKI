const oracledb = require('oracledb');
const fs = require('fs');
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
      `SELECT plug_source FROM apex_200100.wwv_flow_page_plugs WHERE flow_id = 100 AND page_id = 0`
    );
    if (res.rows.length && res.rows[0][0]) {
      const src = await res.rows[0][0].getData();
      fs.writeFileSync('page0_plug_source.txt', src);
      console.log('Saved page0_plug_source.txt, length:', src.length);
    }
  } finally {
    await conn.close();
  }
}
main().catch(console.error);
