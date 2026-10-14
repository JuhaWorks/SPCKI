const oracledb = require('oracledb');
const fs = require('fs');
const path = require('path');

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
    const sqlFile = fs.readFileSync(path.join(__dirname, 'spcki_all_plsql_packages.sql'), 'utf8');
    
    // Split on standalone '/'
    const statements = sqlFile
      .split(/\n\/\s*(\n|$)/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('SET DEFINE'));

    console.log(`Executing ${statements.length} blocks from spcki_all_plsql_packages.sql...`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (!stmt || stmt.length === 0) continue;
      try {
        await conn.execute(stmt);
      } catch (err) {
        console.error(`Error on block ${i + 1}:\n${stmt.substring(0, 100)}...\n--> ${err.message}`);
      }
    }

    // Verify user_errors
    const errors = await conn.execute(
      "SELECT name, type, line, position, text FROM user_errors ORDER BY name, sequence"
    );
    if (errors.rows.length === 0) {
      console.log('🎉 SUCCESS: All PL/SQL packages, views, and triggers compiled with 0 errors!');
    } else {
      console.log('Errors found:');
      console.table(errors.rows);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
