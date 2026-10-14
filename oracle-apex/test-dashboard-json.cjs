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
  try {
    const fnSolar = await conn.execute(`SELECT spcki_dashboard_pkg.get_solar_trend_json() FROM dual`);
    const sSolar = await fnSolar.rows[0][0].getData();
    console.log('Solar JSON length:', sSolar.length, 'sample:', sSolar.substring(0, 100));

    const fnBat = await conn.execute(`SELECT spcki_dashboard_pkg.get_battery_soc_json() FROM dual`);
    const sBat = await fnBat.rows[0][0].getData();
    console.log('Battery JSON length:', sBat.length, 'sample:', sBat.substring(0, 100));

    const fnSlot = await conn.execute(`SELECT spcki_dashboard_pkg.get_slot_utilisation_json() FROM dual`);
    const sSlot = await fnSlot.rows[0][0].getData();
    console.log('Slot JSON length:', sSlot.length, 'sample:', sSlot.substring(0, 100));

    const fnSess = await conn.execute(`SELECT spcki_dashboard_pkg.get_sessions_trend_json() FROM dual`);
    const sSess = await fnSess.rows[0][0].getData();
    console.log('Sessions JSON length:', sSess.length, 'sample:', sSess.substring(0, 100));

    const fnSat = await conn.execute(`SELECT spcki_dashboard_pkg.get_satisfaction_trend_json() FROM dual`);
    const sSat = await fnSat.rows[0][0].getData();
    console.log('Sat JSON length:', sSat.length, 'sample:', sSat.substring(0, 100));

    // Verify all JSON parses correctly in JS
    JSON.parse(sSolar);
    JSON.parse(sBat);
    JSON.parse(sSlot);
    JSON.parse(sSess);
    JSON.parse(sSat);
    console.log('ALL JSON PACKAGES RETURN VALID JSON OBJECTS!');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
