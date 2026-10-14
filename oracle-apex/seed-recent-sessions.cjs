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
      v_hh_id NUMBER;
      v_app_id NUMBER;
      v_pwr VARCHAR2(20);
      v_persons NUMBER;
      v_duration NUMBER;
      v_start TIMESTAMP;
      v_end TIMESTAMP;
      v_slot_id NUMBER;
    BEGIN
      -- Ensure slots exist for the past 90 days
      FOR i IN 0..89 LOOP
        v_date := trunc(sysdate) - i;
        SELECT count(*) INTO v_exists FROM slots WHERE trunc(slot_date) = v_date;
        IF v_exists = 0 THEN
          FOR s IN 1..4 LOOP
            INSERT INTO slots (
              kitchen_id, slot_date, slot_no, start_time, end_time,
              power_source, household_id, status
            ) VALUES (
              1, v_date, s,
              CASE s WHEN 1 THEN '08:00' WHEN 2 THEN '11:00' WHEN 3 THEN '14:00' ELSE '17:00' END,
              CASE s WHEN 1 THEN '10:00' WHEN 2 THEN '13:00' WHEN 3 THEN '16:00' ELSE '19:00' END,
              CASE s WHEN 1 THEN 'Solar' WHEN 2 THEN 'Solar' WHEN 3 THEN 'Battery' ELSE 'Battery' END,
              MOD(i * 4 + s, 16) + 1,
              'Attended'
            );
          END LOOP;
        END IF;
      END LOOP;

      -- Seed cooking sessions for the past 90 days (1 to 2 sessions per day)
      FOR i IN 0..89 LOOP
        v_date := trunc(sysdate) - i;
        SELECT count(*) INTO v_exists FROM cooking_sessions WHERE trunc(cast(start_at as date)) = v_date;
        IF v_exists = 0 THEN
          FOR k IN 1..2 LOOP
            v_hh_id := MOD(i * 2 + k, 16) + 1;
            
            -- Cycle appliances: 1=Rice cooker, 2=Electric pressure cooker, 3=Induction cooktop
            CASE MOD(i + k, 3)
              WHEN 0 THEN v_app_id := 1; -- Rice cooker
              WHEN 1 THEN v_app_id := 2; -- Electric pressure cooker
              ELSE v_app_id := 3;        -- Induction cooktop
            END CASE;

            -- Power source
            CASE MOD(i + k, 5)
              WHEN 0 THEN v_pwr := 'Solar';
              WHEN 1 THEN v_pwr := 'Solar';
              WHEN 2 THEN v_pwr := 'Battery';
              WHEN 3 THEN v_pwr := 'Solar';
              ELSE v_pwr := 'Generator';
            END CASE;

            SELECT family_size INTO v_persons FROM households WHERE id = v_hh_id;
            v_duration := 90 + MOD(i * 7 + k * 13, 60); -- 90 to 150 minutes

            v_start := cast(v_date as timestamp) + numtodsinterval(CASE k WHEN 1 THEN 10 ELSE 15 END, 'HOUR');
            v_end := v_start + numtodsinterval(v_duration, 'MINUTE');

            SELECT NVL(MIN(id), 1) INTO v_slot_id FROM slots WHERE trunc(slot_date) = v_date AND slot_no = k;

            INSERT INTO cooking_sessions (
              client_uuid, slot_id, household_id, persons_cooked_for,
              start_at, end_at, duration_min, appliance_id, power_source,
              cooking_completed, cleaning_completed, remarks, created_at
            ) VALUES (
              rawtohex(sys_guid()), v_slot_id, v_hh_id, v_persons,
              v_start, v_end, v_duration, v_app_id, v_pwr,
              'Y', 'Y', 'Regular pilot session', SYSDATE
            );
          END LOOP;
        END IF;
      END LOOP;
      COMMIT;
    END;
    `;
    await conn.execute(plsql);
    const res = await conn.execute('SELECT count(*), min(start_at), max(start_at) FROM cooking_sessions');
    console.log('Cooking sessions count after seeding:', res.rows);
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
