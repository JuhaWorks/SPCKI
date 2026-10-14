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
    const plsql = `
    DECLARE
      v_date DATE;
      v_exists NUMBER;
      v_solar NUMBER;
      v_consumed NUMBER;
      v_msoc NUMBER;
      v_esoc NUMBER;
      v_weather VARCHAR2(50);
    BEGIN
      FOR i IN 0..89 LOOP
        v_date := trunc(sysdate) - i;
        SELECT count(*) INTO v_exists FROM daily_technical_logs WHERE trunc(log_date) = v_date;
        IF v_exists = 0 THEN
          v_solar := round(dbms_random.value(12.5, 19.8), 1);
          v_consumed := round(dbms_random.value(10.2, 14.8), 1);
          v_msoc := round(dbms_random.value(46, 62), 0);
          v_esoc := round(dbms_random.value(78, 96), 0);
          CASE mod(i, 4)
            WHEN 0 THEN v_weather := 'Sunny';
            WHEN 1 THEN v_weather := 'Partly cloudy';
            WHEN 2 THEN v_weather := 'Sunny';
            ELSE v_weather := 'Cloudy';
          END CASE;

          INSERT INTO daily_technical_logs (
            client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc,
            system_operational, fault_count, downtime_hours, safety_incident,
            weather, energy_consumed_kwh
          ) VALUES (
            rawtohex(sys_guid()), 1, v_date, v_solar, v_msoc, v_esoc,
            'Y', 0, 0, 'N',
            v_weather, v_consumed
          );
        END IF;
      END LOOP;
      COMMIT;
    END;
    `;
    await conn.execute(plsql);
    const res = await conn.execute('SELECT count(*), min(log_date), max(log_date) FROM daily_technical_logs');
    console.log('Daily technical logs seeded successfully:', res.rows);
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
