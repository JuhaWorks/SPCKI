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
    const tests = [
      ['admin', 'Admin@12345'],
      ['field', 'Field@12345'],
      ['technical', 'Technical@12345'],
      ['viewer', 'Viewer@12345'],
      ['donor', 'Viewer@12345'],
      ['solar_cook', 'solar_cook'],
      ['admin', 'wrong_pass'],
    ];

    for (const [u, p] of tests) {
      const res = await conn.execute(
        `BEGIN
           IF spcki_auth_pkg.authenticate(:u, :p) THEN
             :res := 1;
           ELSE
             :res := 0;
           END IF;
         END;`,
        {
          u: u,
          p: p,
          res: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        }
      );
      console.log(`Auth test [${u}] -> ${res.outBinds.res === 1 ? 'SUCCESS (TRUE)' : 'FAILED (FALSE)'}`);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
