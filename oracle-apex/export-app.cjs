/**
 * export-app.cjs - Exports APEX Application 100 to inspect/modify
 */
const oracledb = require('oracledb');
const fs = require('fs');
const path = require('path');

const config = {
  user: process.env.ORACLE_USER || 'solar_cook',
  password: process.env.ORACLE_PASSWORD || 'solar_cook',
  connectString: process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank',
  libDir: process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

async function main() {
  try {
    oracledb.initOracleClient({ libDir: config.libDir });
  } catch (err) {
    if (!err.message.includes('already initialized')) console.error(err);
  }

  const conn = await oracledb.getConnection(config);
  try {
    await conn.execute('BEGIN wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065); END;');

    const result = await conn.execute(
      `DECLARE
         l_files apex_t_export_files;
       BEGIN
         l_files := apex_export.get_application(p_application_id => 100);
         :cnt := l_files.count;
         IF l_files.count > 0 THEN
           :name := l_files(1).name;
           :content := l_files(1).contents;
         END IF;
       END;`,
      {
        cnt: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        name: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
        content: { dir: oracledb.BIND_OUT, type: oracledb.CLOB },
      }
    );

    console.log(`Exported files count: ${result.outBinds.cnt}`);
    if (result.outBinds.cnt > 0) {
      const lob = result.outBinds.content;
      let fullText = '';
      lob.setEncoding('utf8');
      lob.on('data', (chunk) => { fullText += chunk; });
      await new Promise((resolve, reject) => {
        lob.on('end', resolve);
        lob.on('error', reject);
      });
      fs.writeFileSync(path.join(__dirname, 'app100_export.sql'), fullText, 'utf8');
      console.log(`Saved export to app100_export.sql (${fullText.length} characters)`);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
