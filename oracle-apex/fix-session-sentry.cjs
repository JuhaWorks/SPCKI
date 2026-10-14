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
    console.log('Fixing authentication scheme in App 100...');
    
    // Set attribute_01 = NULL (Session Sentry), attribute_03 = 'spcki_auth_pkg.authenticate' (Authentication Function)
    await conn.execute(`
    UPDATE apex_200100.wwv_flow_authentications
    SET scheme_type = 'NATIVE_CUSTOM',
        attribute_01 = NULL,
        attribute_02 = NULL,
        attribute_03 = 'spcki_auth_pkg.authenticate',
        attribute_04 = NULL,
        attribute_05 = 'N'
    WHERE flow_id = 100
    `);
    await conn.commit();

    const r = await conn.execute(
      `SELECT scheme_type, attribute_01, attribute_02, attribute_03, attribute_05
       FROM apex_200100.wwv_flow_authentications
       WHERE flow_id = 100`
    );
    console.log('✓ Successfully fixed Auth Scheme in App 100:', r.rows);

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
