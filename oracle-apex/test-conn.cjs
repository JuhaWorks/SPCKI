const oracledb = require('oracledb');

// Initialize thick mode with Oracle 19c Client
try {
  oracledb.initOracleClient({ libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin' });
  console.log('Initialized Oracle Client in Thick mode successfully.');
} catch (err) {
  console.error('Failed to init thick mode:', err.message);
}

async function testConnection() {
  const configs = [
    {
      name: 'Service Name (easy connect)',
      connectString: '202.84.45.58:1521/bexibank',
    },
    {
      name: 'SERVICE_NAME descriptor',
      connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=202.84.45.58)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=bexibank)))',
    }
  ];

  for (const config of configs) {
    console.log(`\nTesting connection with: ${config.name}`);
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: 'solar_cook',
        password: 'solar_cook',
        connectString: config.connectString,
      });
      console.log('🎉 Connection SUCCESSFUL in Thick Mode! 🎉');

      const versionRes = await connection.execute('SELECT BANNER FROM V$VERSION WHERE ROWNUM = 1');
      console.log('Database Banner:', versionRes.rows ? versionRes.rows[0][0] : 'N/A');

      const userRes = await connection.execute('SELECT USER FROM DUAL');
      console.log('Connected User:', userRes.rows ? userRes.rows[0][0] : 'N/A');

      const tableRes = await connection.execute('SELECT count(*) FROM user_tables');
      console.log('User Tables Count:', tableRes.rows ? tableRes.rows[0][0] : 0);

      const sampleTables = await connection.execute('SELECT table_name FROM user_tables WHERE ROWNUM <= 10');
      console.log('Sample Tables:', sampleTables.rows ? sampleTables.rows.map(r => r[0]) : []);

      await connection.close();
      return config;
    } catch (err) {
      console.error(`Failed with ${config.name}: ${err.message}`);
      if (connection) {
        try { await connection.close(); } catch (_) {}
      }
    }
  }
}

testConnection();
