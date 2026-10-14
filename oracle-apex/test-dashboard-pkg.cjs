const oracledb = require('oracledb');
try { oracledb.initOracleClient({ libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin' }); } catch (e) {}

(async () => {
  const conn = await oracledb.getConnection({
    user: 'solar_cook',
    password: 'solar_cook',
    connectString: '202.84.45.58:1521/bexibank',
  });
  try {
    oracledb.fetchAsString = [oracledb.CLOB];
    const funcs = [
      'get_solar_trend_json',
      'get_battery_soc_json',
      'get_appliance_pie_json',
      'get_power_pie_json',
      'get_slot_utilisation_json',
      'get_size_band_json',
      'get_satisfaction_trend_json',
    ];
    for (const f of funcs) {
      try {
        const res = await conn.execute(`SELECT spcki_dashboard_pkg.${f}() AS val FROM dual`);
        console.log(`✓ ${f}: length = ${res.rows[0][0].length}, preview = ${res.rows[0][0].substring(0, 80)}`);
      } catch (e) {
        console.error(`✗ ${f} ERROR:`, e.message);
      }
    }
  } finally {
    await conn.close();
  }
})().catch(console.error);
