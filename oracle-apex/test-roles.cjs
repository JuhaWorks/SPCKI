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
    const users = ['admin', 'field', 'technical', 'viewer', 'donor', 'solar_cook'];
    for (const u of users) {
      const resRole = await conn.execute(
        `BEGIN :role := spcki_auth_pkg.get_user_role(:u); END;`,
        { u: u, role: { dir: oracledb.BIND_OUT, type: oracledb.STRING } }
      );
      console.log(`User: [${u.padEnd(10)}] -> Evaluated Actor Role: ${resRole.outBinds.role}`);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
