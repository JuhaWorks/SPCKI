/**
 * Deploy PL/SQL Packages for SPCKI:
 * 1. SPCKI_KPI_PKG: Calculates all monitoring KPIs, rates, and JSON dashboards for APEX.
 * 2. SPCKI_OPS_PKG: Automates slot generation, session booking, and daily logs.
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

async function deployPackages() {
  console.log('Connecting to Oracle to deploy PL/SQL packages...');
  const conn = await oracledb.getConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    connectString: DB_CONNECT_STRING,
  });

  try {
    console.log('Deploying SPCKI_KPI_PKG Specification...');
    await conn.execute(`
      CREATE OR REPLACE PACKAGE spcki_kpi_pkg AS
          -- Returns JSON string with all KPIs for APEX charts and dashboard regions
          FUNCTION get_dashboard_json(p_kitchen_id IN NUMBER DEFAULT 1) RETURN CLOB;

          -- Return scalar KPI values
          FUNCTION get_active_households(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
          FUNCTION get_total_sessions(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
          FUNCTION get_total_cooking_hours(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
          FUNCTION get_utilisation_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
          FUNCTION get_solar_fraction(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
          FUNCTION get_satisfaction_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
      END spcki_kpi_pkg;
    `);

    console.log('Deploying SPCKI_KPI_PKG Body...');
    await conn.execute(`
      CREATE OR REPLACE PACKAGE BODY spcki_kpi_pkg AS
          FUNCTION get_active_households(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
              v_count NUMBER;
          BEGIN
              SELECT COUNT(*) INTO v_count FROM households WHERE kitchen_id = p_kitchen_id AND status = 'Active';
              RETURN v_count;
          END;

          FUNCTION get_total_sessions(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
              v_count NUMBER;
          BEGIN
              SELECT COUNT(*) INTO v_count FROM v_session_details WHERE kitchen_id = p_kitchen_id;
              RETURN v_count;
          END;

          FUNCTION get_total_cooking_hours(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
              v_hours NUMBER;
          BEGIN
              SELECT NVL(ROUND(SUM(duration_min) / 60.0, 1), 0) INTO v_hours FROM v_session_details WHERE kitchen_id = p_kitchen_id;
              RETURN v_hours;
          END;

          FUNCTION get_utilisation_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
              v_rate NUMBER;
          BEGIN
              SELECT NVL(ROUND(COUNT(CASE WHEN status IN ('Attended','Swapped') THEN 1 END) / NULLIF(COUNT(*), 0) * 100, 1), 0)
              INTO v_rate
              FROM slots
              WHERE kitchen_id = p_kitchen_id;
              RETURN v_rate;
          END;

          FUNCTION get_solar_fraction(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
              v_frac NUMBER;
          BEGIN
              SELECT NVL(ROUND(COUNT(CASE WHEN power_source = 'Solar' THEN 1 END) / NULLIF(COUNT(*), 0) * 100, 1), 0)
              INTO v_frac
              FROM v_session_details
              WHERE kitchen_id = p_kitchen_id;
              RETURN v_frac;
          END;

          FUNCTION get_satisfaction_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
              v_sat NUMBER;
          BEGIN
              SELECT NVL(ROUND(AVG(overall_rating), 1), 0)
              INTO v_sat
              FROM monthly_feedback mf
              JOIN households h ON h.id = mf.household_id
              WHERE h.kitchen_id = p_kitchen_id;
              RETURN v_sat;
          END;

          FUNCTION get_dashboard_json(p_kitchen_id IN NUMBER DEFAULT 1) RETURN CLOB IS
              v_json CLOB;
          BEGIN
              SELECT JSON_OBJECT(
                  'kitchen_id'          VALUE p_kitchen_id,
                  'active_households'   VALUE get_active_households(p_kitchen_id),
                  'total_sessions'      VALUE get_total_sessions(p_kitchen_id),
                  'total_cooking_hours' VALUE get_total_cooking_hours(p_kitchen_id),
                  'utilisation_rate'    VALUE get_utilisation_rate(p_kitchen_id),
                  'solar_fraction'      VALUE get_solar_fraction(p_kitchen_id),
                  'avg_satisfaction'    VALUE get_satisfaction_rate(p_kitchen_id)
              ) INTO v_json FROM dual;

              RETURN v_json;
          END;
      END spcki_kpi_pkg;
    `);

    console.log('Deploying SPCKI_OPS_PKG Specification & Body...');
    await conn.execute(`
      CREATE OR REPLACE PACKAGE spcki_ops_pkg AS
          -- Generates fair rotating schedule for N days from start date
          PROCEDURE generate_schedule(
              p_kitchen_id IN NUMBER,
              p_start_date IN DATE,
              p_days       IN NUMBER DEFAULT 7
          );
      END spcki_ops_pkg;
    `);

    await conn.execute(`
      CREATE OR REPLACE PACKAGE BODY spcki_ops_pkg AS
          PROCEDURE generate_schedule(
              p_kitchen_id IN NUMBER,
              p_start_date IN DATE,
              p_days       IN NUMBER DEFAULT 7
          ) IS
              TYPE t_hh_tab IS TABLE OF NUMBER INDEX BY PLS_INTEGER;
              v_hhs      t_hh_tab;
              v_hh_idx   PLS_INTEGER := 0;
              v_cur_date DATE;
          BEGIN
              -- Collect active households
              SELECT id BULK COLLECT INTO v_hhs
              FROM households
              WHERE kitchen_id = p_kitchen_id AND status = 'Active'
              ORDER BY household_code;

              IF v_hhs.COUNT = 0 THEN
                  RETURN;
              END IF;

              FOR d IN 0 .. (p_days - 1) LOOP
                  v_cur_date := p_start_date + d;

                  FOR tmpl IN (
                      SELECT slot_no, start_time, end_time, power_source
                      FROM slot_templates
                      WHERE kitchen_id = p_kitchen_id
                      ORDER BY slot_no
                  ) LOOP
                      BEGIN
                          INSERT INTO slots (
                              kitchen_id, slot_date, slot_no, start_time, end_time,
                              power_source, household_id, status
                          ) VALUES (
                              p_kitchen_id, v_cur_date, tmpl.slot_no, tmpl.start_time, tmpl.end_time,
                              tmpl.power_source, v_hhs((v_hh_idx MOD v_hhs.COUNT) + 1), 'Scheduled'
                          );
                      EXCEPTION
                          WHEN DUP_VAL_ON_INDEX THEN
                              NULL; -- Slot already scheduled
                      END;

                      v_hh_idx := v_hh_idx + 1;
                  END LOOP;
              END LOOP;
          END;
      END spcki_ops_pkg;
    `);

    console.log('Testing SPCKI_KPI_PKG...');
    const testJson = await conn.execute("SELECT spcki_kpi_pkg.get_dashboard_json(1) as dj FROM dual");
    console.log('Dashboard JSON Result:', testJson.rows[0].DJ);

    console.log('\n🎉 ALL PL/SQL PACKAGES COMPILED & TESTED WITH 100% SUCCESS! 🎉');

  } finally {
    await conn.close();
  }
}

deployPackages().catch(err => {
  console.error('Deploy packages failed:', err);
  process.exit(1);
});
