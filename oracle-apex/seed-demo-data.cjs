/**
 * Populate realistic sample data (slots, cooking sessions, technical logs, generator logs, feedback)
 * for SPCKI into Oracle Database.
 */

const oracledb = require('oracledb');

const DB_USER = process.env.ORACLE_USER || 'solar_cook';
const DB_PASSWORD = process.env.ORACLE_PASSWORD || 'solar_cook';
const DB_CONNECT_STRING = process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank';
const ORACLE_CLIENT_LIB_DIR = process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin';

try {
  oracledb.initOracleClient({ libDir: ORACLE_CLIENT_LIB_DIR });
} catch (e) {}

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function seedDemo() {
  console.log('Connecting to Oracle to seed demo data...');
  const conn = await oracledb.getConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    connectString: DB_CONNECT_STRING,
  });

  try {
    // 1. Get Kitchen ID
    const kRes = await conn.execute("SELECT id FROM kitchens WHERE name = 'SPCKI Kitchen 1'");
    if (!kRes.rows || kRes.rows.length === 0) {
      console.log('Kitchen not found!');
      return;
    }
    const kitchenId = kRes.rows[0].ID;

    // 2. Get Households
    const hhRes = await conn.execute(
      "SELECT id, household_code, family_size FROM households WHERE kitchen_id = :kid ORDER BY household_code",
      { kid: kitchenId }
    );
    const households = hhRes.rows;
    console.log(`Found ${households.length} households for kitchen ${kitchenId}`);

    // 3. Get Slot Templates
    const tmplRes = await conn.execute(
      "SELECT slot_no, start_time, end_time, power_source FROM slot_templates WHERE kitchen_id = :kid ORDER BY slot_no",
      { kid: kitchenId }
    );
    const templates = tmplRes.rows;

    // 4. Get Appliances
    const appRes = await conn.execute("SELECT id, name FROM appliances WHERE active = 'Y'");
    const appliances = appRes.rows;

    // 5. Get Dishes
    const dishRes = await conn.execute("SELECT id, name FROM dishes WHERE active = 'Y'");
    const dishes = dishRes.rows;

    // 6. Generate 14 days of slots and cooking sessions
    console.log('Generating 14 days of slots and cooking sessions...');
    const startDate = new Date('2024-01-01');
    let hhIdx = 0;

    for (let day = 0; day < 14; day++) {
      const curDate = new Date(startDate);
      curDate.setDate(startDate.getDate() + day);
      const dateStr = curDate.toISOString().split('T')[0];

      // Daily Technical Log for curDate
      const weathers = ['Sunny', 'Sunny', 'Partly cloudy', 'Partly cloudy', 'Sunny', 'Cloudy', 'Rainy'];
      const weather = weathers[day % weathers.length];
      const solarKwh = weather === 'Sunny' ? 16.5 + (day % 3) * 0.8 : (weather === 'Partly cloudy' ? 12.0 + (day % 2) : 8.5);
      const energyConsumed = 11.2 + (day % 4) * 0.5;

      try {
        await conn.execute(
          `INSERT INTO daily_technical_logs (
            client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc,
            system_operational, fault_count, downtime_hours, safety_incident, weather, energy_consumed_kwh
          ) VALUES (
            SYS_GUID(), :kid, TO_DATE(:dt, 'YYYY-MM-DD'), :sol, :msoc, :esoc,
            'Y', 0, 0, 'N', :w, :cons
          )`,
          {
            kid: kitchenId,
            dt: dateStr,
            sol: solarKwh,
            msoc: 45 + (day % 5) * 2,
            esoc: 85 + (day % 4) * 3,
            w: weather,
            cons: energyConsumed,
          }
        );
      } catch (e) {
        if (!e.message.includes('ORA-00001')) console.error('Daily log err:', e.message);
      }

      // Generator Log
      try {
        await conn.execute(
          `INSERT INTO generator_logs (
            client_uuid, kitchen_id, log_date, fuel_start_l, refuel_l, fuel_end_l,
            running_hours, maintenance_required
          ) VALUES (
            SYS_GUID(), :kid, TO_DATE(:dt, 'YYYY-MM-DD'), 20.0, 0, 18.5, 1.0, 'N'
          )`,
          { kid: kitchenId, dt: dateStr }
        );
      } catch (e) {
        if (!e.message.includes('ORA-00001')) console.error('Gen log err:', e.message);
      }

      // Slots for this day
      for (const tmpl of templates) {
        const assignedHh = households[hhIdx % households.length];
        hhIdx++;

        let slotId;
        try {
          const slotIns = await conn.execute(
            `INSERT INTO slots (
              kitchen_id, slot_date, slot_no, start_time, end_time, power_source, household_id, status
            ) VALUES (
              :kid, TO_DATE(:dt, 'YYYY-MM-DD'), :sno, :st, :et, :ps, :hhid, 'Attended'
            ) RETURNING id INTO :id`,
            {
              kid: kitchenId,
              dt: dateStr,
              sno: tmpl.SLOT_NO,
              st: tmpl.START_TIME,
              et: tmpl.END_TIME,
              ps: tmpl.POWER_SOURCE,
              hhid: assignedHh.ID,
              id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            }
          );
          slotId = slotIns.outBinds.id[0];
        } catch (e) {
          if (e.message.includes('ORA-00001')) {
            // Fetch existing slot
            const exSlot = await conn.execute(
              "SELECT id FROM slots WHERE kitchen_id = :kid AND slot_date = TO_DATE(:dt, 'YYYY-MM-DD') AND slot_no = :sno",
              { kid: kitchenId, dt: dateStr, sno: tmpl.SLOT_NO }
            );
            if (exSlot.rows && exSlot.rows.length > 0) {
              slotId = exSlot.rows[0].ID;
            }
          }
        }

        if (slotId) {
          const app = appliances[(tmpl.SLOT_NO - 1) % appliances.length];
          const startTimestamp = `${dateStr} ${tmpl.START_TIME}:00`;
          const endTimestamp = `${dateStr} ${tmpl.END_TIME}:00`;

          try {
            const sessIns = await conn.execute(
              `INSERT INTO cooking_sessions (
                client_uuid, slot_id, household_id, persons_cooked_for,
                start_at, end_at, appliance_id, power_source,
                cooking_completed, cleaning_completed, waiting_issue, technical_problem
              ) VALUES (
                SYS_GUID(), :slotId, :hhid, :persons,
                TO_TIMESTAMP_TZ(:st || ' +06:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'),
                TO_TIMESTAMP_TZ(:et || ' +06:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'),
                :appid, :ps, 'Y', 'Y', 'N', 'N'
              ) RETURNING id INTO :sid`,
              {
                slotId: slotId,
                hhid: assignedHh.ID,
                persons: assignedHh.FAMILY_SIZE,
                st: startTimestamp,
                et: endTimestamp,
                appid: app.ID,
                ps: tmpl.POWER_SOURCE,
                sid: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
              }
            );

            const sessId = sessIns.outBinds.sid[0];
            // Link 2 dishes
            const d1 = dishes[(tmpl.SLOT_NO) % dishes.length];
            const d2 = dishes[(tmpl.SLOT_NO + 1) % dishes.length];
            await conn.execute("INSERT INTO session_dishes (session_id, dish_id) VALUES (:s, :d)", { s: sessId, d: d1.ID });
            await conn.execute("INSERT INTO session_dishes (session_id, dish_id) VALUES (:s, :d)", { s: sessId, d: d2.ID });
          } catch (e) {
            // Already created or skipped
          }
        }
      }
    }

    // 7. Monthly Feedback for all 16 households
    console.log('Seeding monthly feedback for households...');
    for (const hh of households) {
      try {
        await conn.execute(
          `INSERT INTO monthly_feedback (
            client_uuid, household_id, survey_month, backup_fuel_used, backup_fuel_spend,
            fuel_reduction_rating, safety_rating, privacy_rating, waiting_rating,
            overall_rating, cleanliness_rating, ease_rating, slot_suitability,
            time_enough, family_members_now, willing_to_continue
          ) VALUES (
            SYS_GUID(), :hhid, TO_DATE('2024-01-01', 'YYYY-MM-DD'), 'N', 0,
            5, 5, 4, 4, 5, 5, 5, 5, 'About right', :fsize, 'Y'
          )`,
          { hhid: hh.ID, fsize: hh.FAMILY_SIZE }
        );
      } catch (e) {
        // Skip on duplicate
      }
    }

    console.log('\n--- Demo Data Summary ---');
    const counts = await conn.execute(`
      SELECT 
        (SELECT count(*) FROM slots) as slots_count,
        (SELECT count(*) FROM cooking_sessions) as sessions_count,
        (SELECT count(*) FROM session_dishes) as session_dishes_count,
        (SELECT count(*) FROM daily_technical_logs) as daily_logs_count,
        (SELECT count(*) FROM generator_logs) as gen_logs_count,
        (SELECT count(*) FROM monthly_feedback) as feedback_count
      FROM dual
    `);
    console.table(counts.rows);

    console.log('\nTesting KPI Views with seeded data:');
    const kpiTest = await conn.execute('SELECT * FROM v_session_details WHERE ROWNUM <= 3');
    console.table(kpiTest.rows);

    const solarKpi = await conn.execute('SELECT * FROM v_daily_solar WHERE ROWNUM <= 3');
    console.table(solarKpi.rows);

    console.log('\n✅ Demo Data Seeded & Verified successfully!');

  } finally {
    await conn.close();
  }
}

seedDemo().catch(err => {
  console.error('Seed demo failed:', err);
  process.exit(1);
});
