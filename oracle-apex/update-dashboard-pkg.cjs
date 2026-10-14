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
    console.log('Fixing spcki_dashboard_pkg body...');
    await conn.execute(`
    CREATE OR REPLACE PACKAGE BODY spcki_dashboard_pkg AS

        -- 1. Solar Trend (Generated vs Consumed)
        FUNCTION get_solar_trend_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
                       NVL(solar_kwh, 0) AS gen,
                       NVL(energy_consumed_kwh, 0) AS cons
                FROM daily_technical_logs
                ORDER BY log_date ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"date":"' || r.l_date || '","generated":' || r.gen || ',"consumed":' || r.cons || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 2. Battery SOC Trend (%)
        FUNCTION get_battery_soc_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
                       NVL(morning_soc, 0) AS msoc,
                       NVL(evening_soc, 0) AS esoc
                FROM daily_technical_logs
                ORDER BY log_date ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"date":"' || r.l_date || '","morning":' || r.msoc || ',"evening":' || r.esoc || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 3. Appliance Utilisation
        FUNCTION get_appliance_pie_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT a.name AS appliance, COUNT(*) AS cnt
                FROM cooking_sessions s
                JOIN appliances a ON a.id = s.appliance_id
                GROUP BY a.name
                ORDER BY cnt DESC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"name":"' || r.appliance || '","value":' || r.cnt || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 4. Power Source Distribution
        FUNCTION get_power_pie_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT power_source, COUNT(*) AS cnt
                FROM cooking_sessions
                GROUP BY power_source
                ORDER BY cnt DESC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"name":"' || r.power_source || '","value":' || r.cnt || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 5. Daily Slot Utilisation (Bar Chart)
        FUNCTION get_slot_utilisation_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT to_char(slot_date, 'YYYY-MM-DD') AS s_date,
                       scheduled, attended, missed, cancelled
                FROM v_slot_utilisation
                ORDER BY slot_date ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"date":"' || r.s_date || '","scheduled":' || r.scheduled ||
                                    ',"attended":' || r.attended || ',"missed":' || r.missed ||
                                    ',"cancelled":' || r.cancelled || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 6. Family Size Band Cooking Time
        FUNCTION get_size_band_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT size_band,
                       ROUND(AVG(duration_min), 0) AS avg_duration,
                       ROUND(AVG(duration_min / NULLIF(persons_cooked_for, 0)), 1) AS min_per_person,
                       COUNT(*) AS session_count
                FROM v_session_details
                GROUP BY size_band
                ORDER BY size_band ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"band":"' || r.size_band || '","duration":' || r.avg_duration ||
                                    ',"minPerPerson":' || r.min_per_person || ',"sessions":' || r.session_count || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 7. Monthly Satisfaction & Safety Trend
        FUNCTION get_satisfaction_trend_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT to_char(survey_month, 'YYYY-MM') AS s_month,
                       ROUND(AVG(overall_rating), 1) AS avg_overall,
                       ROUND(AVG(safety_rating), 1) AS avg_safety,
                       ROUND(AVG(cleanliness_rating), 1) AS avg_clean,
                       ROUND(AVG(ease_rating), 1) AS avg_ease
                FROM monthly_feedback
                GROUP BY to_char(survey_month, 'YYYY-MM')
                ORDER BY s_month ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"month":"' || r.s_month || '","overall":' || r.avg_overall ||
                                    ',"safety":' || r.avg_safety || ',"cleanliness":' || r.avg_clean ||
                                    ',"ease":' || r.avg_ease || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 8. Fault & Uptime Trend
        FUNCTION get_fault_uptime_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
                       NVL(fault_count, 0) AS faults,
                       ROUND((24 - NVL(downtime_hours, 0)) / 24 * 100, 1) AS uptime_pct
                FROM daily_technical_logs
                ORDER BY log_date ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"date":"' || r.l_date || '","faults":' || r.faults || ',"uptime":' || r.uptime_pct || '}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

        -- 9. Granular Sessions Trend (Client-Side Filtering)
        FUNCTION get_sessions_trend_json RETURN CLOB IS
            v_clob CLOB := '[';
            v_first BOOLEAN := TRUE;
        BEGIN
            FOR r IN (
                SELECT to_char(trunc(cast(s.start_at as date)), 'YYYY-MM-DD') AS s_date,
                       a.name AS appliance,
                       s.power_source,
                       NVL(s.duration_min, 120) AS duration_min,
                       NVL(s.persons_cooked_for, 4) AS persons_cooked_for,
                       CASE 
                           WHEN h.family_size <= 3 THEN '1-3'
                           WHEN h.family_size <= 5 THEN '4-5'
                           WHEN h.family_size <= 7 THEN '6-7'
                           ELSE '8+'
                       END AS size_band
                FROM cooking_sessions s
                JOIN appliances a ON a.id = s.appliance_id
                JOIN households h ON h.id = s.household_id
                ORDER BY s.start_at ASC
            ) LOOP
                IF NOT v_first THEN v_clob := v_clob || ','; END IF;
                v_clob := v_clob || '{"date":"' || r.s_date ||
                                    '","appliance":"' || replace(r.appliance, '"', '\"') ||
                                    '","power":"' || r.power_source ||
                                    '","duration":' || r.duration_min ||
                                    ',"persons":' || r.persons_cooked_for ||
                                    ',"band":"' || r.size_band || '"}';
                v_first := FALSE;
            END LOOP;
            v_clob := v_clob || ']';
            RETURN v_clob;
        END;

    END spcki_dashboard_pkg;
    `);

    console.log('✓ spcki_dashboard_pkg JSON fixed.');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
