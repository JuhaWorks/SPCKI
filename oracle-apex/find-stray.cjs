const oracledb = require('oracledb');

const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  try {
    const p0 = await conn.execute(
      `SELECT plug_source FROM apex_200100.wwv_flow_page_plugs WHERE flow_id = 100 AND page_id = 0`
    );
    if (p0.rows.length && p0.rows[0][0]) {
      const src = await p0.rows[0][0].getData();
      console.log('Page 0 plug source length:', src.length);
      console.log('Start of Page 0:\n', src.substring(0, 150));
      const target = "'); }";
      const idx = src.indexOf(target);
      console.log("Index of target in Page 0:", idx);
      if (idx !== -1) {
        console.log('Context:\n', src.substring(idx - 40, idx + 40));
      }
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
