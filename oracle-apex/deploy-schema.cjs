/**
 * Oracle 19c Schema Deployment Script for SPCKI
 * Deploys full SPCKI tables, constraints, triggers, views, and starter data.
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

async function executeStatement(conn, sql, description) {
  try {
    await conn.execute(sql);
    console.log(`✅ [OK] ${description}`);
  } catch (err) {
    if (err.message.includes('ORA-00955') || err.message.includes('name is already used by an existing object')) {
      console.log(`⚠️  [EXISTS] ${description}`);
    } else {
      console.error(`❌ [FAIL] ${description}:`, err.message);
      throw err;
    }
  }
}

async function deploy() {
  console.log(`Connecting to Oracle: ${DB_CONNECT_STRING} as ${DB_USER}...`);
  const conn = await oracledb.getConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    connectString: DB_CONNECT_STRING,
  });

  try {
    console.log('\n--- 1. Creating Tables ---');

    await executeStatement(conn, `
      CREATE TABLE kitchens (
          id                NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name              VARCHAR2(100) NOT NULL UNIQUE,
          location          VARCHAR2(200),
          max_households    NUMBER(4) DEFAULT 16 NOT NULL CHECK (max_households > 0),
          slots_per_day     NUMBER(3) DEFAULT 6 NOT NULL CHECK (slots_per_day > 0),
          scheduled_hours   NUMBER(4,1) DEFAULT 13 NOT NULL CHECK (scheduled_hours > 0 AND scheduled_hours <= 24),
          status            VARCHAR2(10) DEFAULT 'Active' NOT NULL CHECK (status IN ('Active','Inactive')),
          created_at        TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    `, 'Table: kitchens');

    await executeStatement(conn, `
      CREATE TABLE system_config (
          kitchen_id            NUMBER(19) PRIMARY KEY REFERENCES kitchens(id) ON DELETE CASCADE,
          pv_capacity_kwp       NUMBER(8,2) NOT NULL CHECK (pv_capacity_kwp > 0),
          battery_capacity_kwh  NUMBER(8,2) NOT NULL CHECK (battery_capacity_kwh > 0),
          performance_ratio     NUMBER(4,2) DEFAULT 0.75 NOT NULL CHECK (performance_ratio BETWEEN 0.30 AND 1.00),
          peak_sun_hours        NUMBER(4,2) DEFAULT 4.5 NOT NULL CHECK (peak_sun_hours > 0),
          cooking_duty_factor   NUMBER(3,2) DEFAULT 0.60 NOT NULL CHECK (cooking_duty_factor BETWEEN 0 AND 1),
          productive_sun_hours  NUMBER(4,1) DEFAULT 10 NOT NULL CHECK (productive_sun_hours > 0),
          updated_at            TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    `, 'Table: system_config');

    await executeStatement(conn, `
      CREATE TABLE slot_templates (
          id            NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          kitchen_id    NUMBER(19) NOT NULL REFERENCES kitchens(id) ON DELETE CASCADE,
          slot_no       NUMBER(3) NOT NULL CHECK (slot_no > 0),
          start_time    VARCHAR2(5) NOT NULL,
          end_time      VARCHAR2(5) NOT NULL,
          power_source  VARCHAR2(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
          CONSTRAINT chk_slot_tmpl_time CHECK (end_time > start_time),
          CONSTRAINT unq_slot_tmpl UNIQUE (kitchen_id, slot_no)
      )
    `, 'Table: slot_templates');

    await executeStatement(conn, `
      CREATE TABLE weather_factors (
          weather  VARCHAR2(20) PRIMARY KEY,
          factor   NUMBER(3,2) NOT NULL CHECK (factor BETWEEN 0 AND 1)
      )
    `, 'Table: weather_factors');

    await executeStatement(conn, `
      CREATE TABLE appliances (
          id        NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name      VARCHAR2(60) NOT NULL UNIQUE,
          power_kw  NUMBER(5,2) NOT NULL CHECK (power_kw > 0),
          active    CHAR(1) DEFAULT 'Y' NOT NULL CHECK (active IN ('Y','N'))
      )
    `, 'Table: appliances');

    await executeStatement(conn, `
      CREATE TABLE dishes (
          id      NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name    VARCHAR2(40) NOT NULL UNIQUE,
          active  CHAR(1) DEFAULT 'Y' NOT NULL CHECK (active IN ('Y','N'))
      )
    `, 'Table: dishes');

    await executeStatement(conn, `
      CREATE TABLE problem_categories (
          id      NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          kind    VARCHAR2(10) NOT NULL CHECK (kind IN ('Waiting','Technical')),
          name    VARCHAR2(60) NOT NULL,
          active  CHAR(1) DEFAULT 'Y' NOT NULL CHECK (active IN ('Y','N')),
          CONSTRAINT unq_problem_cat UNIQUE (kind, name)
      )
    `, 'Table: problem_categories');

    await executeStatement(conn, `
      CREATE TABLE users (
          id                      NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          kitchen_id              NUMBER(19) REFERENCES kitchens(id),
          username                VARCHAR2(50) NOT NULL UNIQUE,
          full_name               VARCHAR2(100) NOT NULL,
          email                   VARCHAR2(150) UNIQUE,
          password_hash           VARCHAR2(255) NOT NULL,
          role                    VARCHAR2(12) NOT NULL CHECK (role IN ('Admin','Project','Field','Technical','Viewer')),
          status                  VARCHAR2(10) DEFAULT 'Active' NOT NULL CHECK (status IN ('Active','Inactive')),
          must_change_password    CHAR(1) DEFAULT 'Y' NOT NULL CHECK (must_change_password IN ('Y','N')),
          failed_login_attempts   NUMBER(3) DEFAULT 0 NOT NULL,
          locked_until            TIMESTAMP WITH TIME ZONE,
          last_login_at           TIMESTAMP WITH TIME ZONE,
          created_at              TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    `, 'Table: users');

    await executeStatement(conn, `
      CREATE TABLE refresh_tokens (
          id              NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          user_id         NUMBER(19) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          token_hash      VARCHAR2(255) NOT NULL UNIQUE,
          family          VARCHAR2(36) NOT NULL,
          expires_at      TIMESTAMP WITH TIME ZONE NOT NULL,
          revoked_at      TIMESTAMP WITH TIME ZONE,
          created_at      TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    `, 'Table: refresh_tokens');

    await executeStatement(conn, `
      CREATE TABLE login_history (
          id          NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          user_id     NUMBER(19) REFERENCES users(id),
          username    VARCHAR2(50) NOT NULL,
          login_time  TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          success     CHAR(1) NOT NULL CHECK (success IN ('Y','N')),
          ip_address  VARCHAR2(45),
          device      VARCHAR2(200)
      )
    `, 'Table: login_history');

    await executeStatement(conn, `
      CREATE TABLE audit_logs (
          id          NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          user_id     NUMBER(19) REFERENCES users(id),
          action      VARCHAR2(10) NOT NULL CHECK (action IN ('CREATE','UPDATE','DELETE','EXPORT','LOGIN')),
          table_name  VARCHAR2(60) NOT NULL,
          record_id   VARCHAR2(60),
          old_values  CLOB CHECK (old_values IS JSON),
          new_values  CLOB CHECK (new_values IS JSON),
          reason      VARCHAR2(4000),
          created_at  TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    `, 'Table: audit_logs');

    await executeStatement(conn, `
      CREATE TABLE households (
          id                         NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          kitchen_id                 NUMBER(19) NOT NULL REFERENCES kitchens(id),
          household_code             VARCHAR2(20) NOT NULL UNIQUE,
          family_size                NUMBER(3) NOT NULL CHECK (family_size > 0),
          children_count             NUMBER(3) DEFAULT 0 NOT NULL CHECK (children_count >= 0),
          adults_count               NUMBER(3) DEFAULT 0 NOT NULL CHECK (adults_count >= 0),
          baseline_fuel_type         VARCHAR2(30),
          baseline_monthly_fuel_cost NUMBER(10,2) CHECK (baseline_monthly_fuel_cost >= 0),
          status                     VARCHAR2(10) DEFAULT 'Active' NOT NULL CHECK (status IN ('Active','Inactive')),
          joined_date                DATE DEFAULT TRUNC(SYSDATE) NOT NULL,
          created_at                 TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          CONSTRAINT chk_hh_family CHECK (children_count + adults_count = family_size)
      )
    `, 'Table: households');

    await executeStatement(conn, `
      CREATE TABLE slots (
          id            NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          kitchen_id    NUMBER(19) NOT NULL REFERENCES kitchens(id),
          slot_date     DATE NOT NULL,
          slot_no       NUMBER(3) NOT NULL CHECK (slot_no > 0),
          start_time    VARCHAR2(5) NOT NULL,
          end_time      VARCHAR2(5) NOT NULL,
          power_source  VARCHAR2(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
          household_id  NUMBER(19) REFERENCES households(id),
          status        VARCHAR2(10) DEFAULT 'Scheduled' NOT NULL
                        CHECK (status IN ('Scheduled','Attended','Missed','Cancelled','Swapped')),
          note          VARCHAR2(200),
          created_by    NUMBER(19) REFERENCES users(id),
          created_at    TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          CONSTRAINT unq_slots_k_d_n UNIQUE (kitchen_id, slot_date, slot_no),
          CONSTRAINT chk_slot_time CHECK (end_time > start_time)
      )
    `, 'Table: slots');

    await executeStatement(conn, `
      CREATE TABLE cooking_sessions (
          id                  NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          client_uuid         VARCHAR2(36) NOT NULL UNIQUE,
          slot_id             NUMBER(19) NOT NULL UNIQUE REFERENCES slots(id),
          household_id        NUMBER(19) NOT NULL REFERENCES households(id),
          persons_cooked_for  NUMBER(3) NOT NULL CHECK (persons_cooked_for > 0),
          start_at            TIMESTAMP WITH TIME ZONE NOT NULL,
          end_at              TIMESTAMP WITH TIME ZONE NOT NULL,
          duration_min        NUMBER(6),
          appliance_id        NUMBER(10) NOT NULL REFERENCES appliances(id),
          power_source        VARCHAR2(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
          cooking_completed   CHAR(1) NOT NULL CHECK (cooking_completed IN ('Y','N')),
          cleaning_completed  CHAR(1) NOT NULL CHECK (cleaning_completed IN ('Y','N')),
          waiting_issue       CHAR(1) DEFAULT 'N' NOT NULL CHECK (waiting_issue IN ('Y','N')),
          waiting_reason_id   NUMBER(10) REFERENCES problem_categories(id),
          technical_problem   CHAR(1) DEFAULT 'N' NOT NULL CHECK (technical_problem IN ('Y','N')),
          problem_type_id     NUMBER(10) REFERENCES problem_categories(id),
          remarks             VARCHAR2(4000),
          created_by          NUMBER(19) REFERENCES users(id),
          device_time         TIMESTAMP WITH TIME ZONE,
          created_at          TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          CONSTRAINT chk_session_times CHECK (end_at > start_at),
          CONSTRAINT chk_session_waiting CHECK (waiting_issue = 'N' OR waiting_reason_id IS NOT NULL),
          CONSTRAINT chk_session_tech CHECK (technical_problem = 'N' OR problem_type_id IS NOT NULL)
      )
    `, 'Table: cooking_sessions');

    await executeStatement(conn, `
      CREATE OR REPLACE TRIGGER trg_cooking_sessions_dur
      BEFORE INSERT OR UPDATE ON cooking_sessions
      FOR EACH ROW
      BEGIN
          :NEW.duration_min := ROUND((CAST(:NEW.end_at AS DATE) - CAST(:NEW.start_at AS DATE)) * 1440);
      END;
    `, 'Trigger: trg_cooking_sessions_dur');

    await executeStatement(conn, `
      CREATE TABLE session_dishes (
          session_id  NUMBER(19) NOT NULL REFERENCES cooking_sessions(id) ON DELETE CASCADE,
          dish_id     NUMBER(10) NOT NULL REFERENCES dishes(id),
          PRIMARY KEY (session_id, dish_id)
      )
    `, 'Table: session_dishes');

    await executeStatement(conn, `
      CREATE TABLE daily_technical_logs (
          id                  NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          client_uuid         VARCHAR2(36) NOT NULL UNIQUE,
          kitchen_id          NUMBER(19) NOT NULL REFERENCES kitchens(id),
          log_date            DATE NOT NULL,
          solar_kwh           NUMBER(7,2) NOT NULL CHECK (solar_kwh >= 0),
          morning_soc         NUMBER(3) NOT NULL CHECK (morning_soc BETWEEN 0 AND 100),
          evening_soc         NUMBER(3) NOT NULL CHECK (evening_soc BETWEEN 0 AND 100),
          system_operational  CHAR(1) NOT NULL CHECK (system_operational IN ('Y','N')),
          fault_count         NUMBER(3) DEFAULT 0 NOT NULL CHECK (fault_count >= 0),
          downtime_hours      NUMBER(4,1) DEFAULT 0 NOT NULL CHECK (downtime_hours BETWEEN 0 AND 24),
          safety_incident     CHAR(1) DEFAULT 'N' NOT NULL CHECK (safety_incident IN ('Y','N')),
          safety_severity     VARCHAR2(10) CHECK (safety_severity IN ('Minor','Major','Critical')),
          safety_note         VARCHAR2(4000),
          weather             VARCHAR2(20) NOT NULL REFERENCES weather_factors(weather),
          energy_consumed_kwh NUMBER(7,2) CHECK (energy_consumed_kwh >= 0),
          remarks             VARCHAR2(4000),
          created_by          NUMBER(19) REFERENCES users(id),
          device_time         TIMESTAMP WITH TIME ZONE,
          created_at          TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          CONSTRAINT unq_daily_kitchen_date UNIQUE (kitchen_id, log_date),
          CONSTRAINT chk_daily_safety CHECK (safety_incident = 'N' OR safety_severity IS NOT NULL)
      )
    `, 'Table: daily_technical_logs');

    await executeStatement(conn, `
      CREATE TABLE generator_logs (
          id                   NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          client_uuid          VARCHAR2(36) NOT NULL UNIQUE,
          kitchen_id           NUMBER(19) NOT NULL REFERENCES kitchens(id),
          log_date             DATE NOT NULL,
          fuel_start_l         NUMBER(6,1) NOT NULL CHECK (fuel_start_l >= 0),
          refuel_l             NUMBER(6,1) DEFAULT 0 NOT NULL CHECK (refuel_l >= 0),
          fuel_end_l           NUMBER(6,1) NOT NULL CHECK (fuel_end_l >= 0),
          fuel_used_l          NUMBER(6,1),
          running_hours        NUMBER(4,1) NOT NULL CHECK (running_hours BETWEEN 0 AND 24),
          maintenance_required CHAR(1) DEFAULT 'N' NOT NULL CHECK (maintenance_required IN ('Y','N')),
          maintenance_type     VARCHAR2(60),
          remarks              VARCHAR2(4000),
          created_by           NUMBER(19) REFERENCES users(id),
          device_time          TIMESTAMP WITH TIME ZONE,
          created_at           TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          CONSTRAINT unq_gen_kitchen_date UNIQUE (kitchen_id, log_date),
          CONSTRAINT chk_gen_fuel_used CHECK (fuel_end_l <= fuel_start_l + refuel_l)
      )
    `, 'Table: generator_logs');

    await executeStatement(conn, `
      CREATE OR REPLACE TRIGGER trg_generator_logs_fuel
      BEFORE INSERT OR UPDATE ON generator_logs
      FOR EACH ROW
      BEGIN
          :NEW.fuel_used_l := :NEW.fuel_start_l + NVL(:NEW.refuel_l, 0) - :NEW.fuel_end_l;
      END;
    `, 'Trigger: trg_generator_logs_fuel');

    await executeStatement(conn, `
      CREATE TABLE monthly_feedback (
          id                    NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          client_uuid           VARCHAR2(36) NOT NULL UNIQUE,
          household_id          NUMBER(19) NOT NULL REFERENCES households(id),
          survey_month          DATE NOT NULL,
          backup_fuel_used      CHAR(1) NOT NULL CHECK (backup_fuel_used IN ('Y','N')),
          backup_fuel_spend     NUMBER(10,2) CHECK (backup_fuel_spend >= 0),
          fuel_reduction_rating NUMBER(1) CHECK (fuel_reduction_rating BETWEEN 1 AND 5),
          safety_rating         NUMBER(1) NOT NULL CHECK (safety_rating BETWEEN 1 AND 5),
          privacy_rating        NUMBER(1) NOT NULL CHECK (privacy_rating BETWEEN 1 AND 5),
          waiting_rating        NUMBER(1) NOT NULL CHECK (waiting_rating BETWEEN 1 AND 5),
          overall_rating        NUMBER(1) NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
          cleanliness_rating    NUMBER(1) NOT NULL CHECK (cleanliness_rating BETWEEN 1 AND 5),
          ease_rating           NUMBER(1) NOT NULL CHECK (ease_rating BETWEEN 1 AND 5),
          slot_suitability      NUMBER(1) CHECK (slot_suitability BETWEEN 1 AND 5),
          time_enough           VARCHAR2(12) CHECK (time_enough IN ('Too short','About right','Too long')),
          family_members_now    NUMBER(3) CHECK (family_members_now > 0),
          willing_to_continue   CHAR(1) NOT NULL CHECK (willing_to_continue IN ('Y','N')),
          remarks               VARCHAR2(4000),
          created_by            NUMBER(19) REFERENCES users(id),
          device_time           TIMESTAMP WITH TIME ZONE,
          created_at            TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
          CONSTRAINT unq_feedback_hh_month UNIQUE (household_id, survey_month)
      )
    `, 'Table: monthly_feedback');

    await executeStatement(conn, `
      CREATE TABLE sync_conflicts (
          id             NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          client_uuid    VARCHAR2(36) NOT NULL,
          table_name     VARCHAR2(60) NOT NULL,
          payload        CLOB NOT NULL CHECK (payload IS JSON),
          reason         VARCHAR2(200) NOT NULL,
          submitted_by   NUMBER(19) REFERENCES users(id),
          status         VARCHAR2(10) DEFAULT 'Open' NOT NULL CHECK (status IN ('Open','Resolved','Rejected')),
          resolved_by    NUMBER(19) REFERENCES users(id),
          resolved_at    TIMESTAMP WITH TIME ZONE,
          created_at     TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    `, 'Table: sync_conflicts');

    console.log('\n--- 2. Creating KPI Views ---');

    await executeStatement(conn, `
      CREATE OR REPLACE VIEW v_session_details AS
      SELECT s.id,
             sl.kitchen_id,
             s.household_id,
             h.household_code,
             TRUNC(CAST(s.start_at AS DATE)) AS session_date,
             s.persons_cooked_for,
             s.duration_min,
             ROUND(s.duration_min / NULLIF(s.persons_cooked_for, 0), 1) AS minutes_per_person,
             CASE WHEN s.persons_cooked_for <= 3 THEN '1-3'
                  WHEN s.persons_cooked_for <= 5 THEN '4-5'
                  WHEN s.persons_cooked_for <= 7 THEN '6-7'
                  ELSE '8+' END AS size_band,
             s.power_source,
             a.name AS appliance,
             ROUND(a.power_kw * s.duration_min / 60.0 * c.cooking_duty_factor, 2) AS energy_kwh,
             s.cooking_completed, s.cleaning_completed, s.waiting_issue, s.technical_problem
      FROM cooking_sessions s
      JOIN slots sl        ON sl.id = s.slot_id
      JOIN households h    ON h.id  = s.household_id
      JOIN appliances a    ON a.id  = s.appliance_id
      JOIN system_config c ON c.kitchen_id = sl.kitchen_id
    `, 'View: v_session_details');

    await executeStatement(conn, `
      CREATE OR REPLACE VIEW v_daily_solar AS
      SELECT d.kitchen_id,
             d.log_date,
             d.weather,
             d.solar_kwh,
             ROUND(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio, 2) AS expected_kwh,
             ROUND(d.solar_kwh / NULLIF(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio, 0), 3) AS efficiency,
             NVL(d.energy_consumed_kwh, 0) AS consumed_kwh,
             ROUND((d.evening_soc - d.morning_soc) / 100.0 * c.battery_capacity_kwh, 2) AS battery_change_kwh,
             ROUND(d.solar_kwh - NVL(d.energy_consumed_kwh, 0)
                   - (d.evening_soc - d.morning_soc) / 100.0 * c.battery_capacity_kwh, 2) AS wasted_kwh,
             ROUND(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio
                   / c.productive_sun_hours * d.downtime_hours, 2) AS downtime_loss_kwh
      FROM daily_technical_logs d
      JOIN system_config c   ON c.kitchen_id = d.kitchen_id
      JOIN weather_factors w ON w.weather = d.weather
    `, 'View: v_daily_solar');

    await executeStatement(conn, `
      CREATE OR REPLACE VIEW v_household_activity AS
      SELECT h.id AS household_id,
             h.household_code,
             h.family_size,
             COUNT(DISTINCT s.id)  AS sessions_attended,
             COUNT(DISTINCT sl.id) AS slots_assigned
      FROM households h
      LEFT JOIN cooking_sessions s ON s.household_id = h.id
      LEFT JOIN slots sl           ON sl.household_id = h.id
      GROUP BY h.id, h.household_code, h.family_size
    `, 'View: v_household_activity');

    await executeStatement(conn, `
      CREATE OR REPLACE VIEW v_slot_utilisation AS
      SELECT sl.kitchen_id,
             sl.slot_date,
             COUNT(CASE WHEN sl.status = 'Scheduled' THEN 1 END) AS scheduled,
             COUNT(CASE WHEN sl.status IN ('Attended', 'Swapped') THEN 1 END) AS attended,
             COUNT(CASE WHEN sl.status = 'Missed' THEN 1 END) AS missed,
             COUNT(CASE WHEN sl.status = 'Cancelled' THEN 1 END) AS cancelled,
             ROUND(
               COUNT(CASE WHEN sl.status IN ('Attended','Swapped') THEN 1 END)
               / NULLIF(COUNT(*), 0) * 100, 1
             ) AS utilisation_pct
      FROM slots sl
      GROUP BY sl.kitchen_id, sl.slot_date
    `, 'View: v_slot_utilisation');

    console.log('\n--- 3. Inserting Starter Lookups & Seed Data ---');

    await executeStatement(conn, `
      MERGE INTO weather_factors dst
      USING (
        SELECT 'Sunny' as w, 1.00 as f FROM dual UNION ALL
        SELECT 'Partly cloudy', 0.65 FROM dual UNION ALL
        SELECT 'Cloudy', 0.35 FROM dual UNION ALL
        SELECT 'Rainy', 0.20 FROM dual UNION ALL
        SELECT 'Stormy', 0.10 FROM dual
      ) src ON (dst.weather = src.w)
      WHEN NOT MATCHED THEN INSERT (weather, factor) VALUES (src.w, src.f)
    `, 'Lookups: weather_factors');

    await executeStatement(conn, `
      MERGE INTO appliances dst
      USING (
        SELECT 'Induction cooktop' as name, 2.00 as p FROM dual UNION ALL
        SELECT 'Electric pressure cooker', 1.00 FROM dual UNION ALL
        SELECT 'Rice cooker', 0.70 FROM dual
      ) src ON (dst.name = src.name)
      WHEN NOT MATCHED THEN INSERT (name, power_kw, active) VALUES (src.name, src.p, 'Y')
    `, 'Lookups: appliances');

    await executeStatement(conn, `
      MERGE INTO dishes dst
      USING (
        SELECT 'Rice' as name FROM dual UNION ALL
        SELECT 'Dal' FROM dual UNION ALL
        SELECT 'Vegetables' FROM dual UNION ALL
        SELECT 'Fish' FROM dual UNION ALL
        SELECT 'Meat' FROM dual UNION ALL
        SELECT 'Curry' FROM dual UNION ALL
        SELECT 'Khichuri' FROM dual UNION ALL
        SELECT 'Other' FROM dual
      ) src ON (dst.name = src.name)
      WHEN NOT MATCHED THEN INSERT (name, active) VALUES (src.name, 'Y')
    `, 'Lookups: dishes');

    await executeStatement(conn, `
      MERGE INTO problem_categories dst
      USING (
        SELECT 'Waiting' as kind, 'No free slot' as name FROM dual UNION ALL
        SELECT 'Waiting', 'Appliance busy' FROM dual UNION ALL
        SELECT 'Waiting', 'Late start' FROM dual UNION ALL
        SELECT 'Technical', 'Power cut' FROM dual UNION ALL
        SELECT 'Technical', 'Appliance fault' FROM dual UNION ALL
        SELECT 'Technical', 'Low battery' FROM dual UNION ALL
        SELECT 'Technical', 'Other' FROM dual
      ) src ON (dst.kind = src.kind AND dst.name = src.name)
      WHEN NOT MATCHED THEN INSERT (kind, name, active) VALUES (src.kind, src.name, 'Y')
    `, 'Lookups: problem_categories');

    await executeStatement(conn, `
      MERGE INTO kitchens dst
      USING (
        SELECT 'SPCKI Kitchen 1' as name, 'Rohingya Camp, Cox''s Bazar, Bangladesh' as loc, 16 as mh, 6 as spd, 13 as sh, 'Active' as st FROM dual
      ) src ON (dst.name = src.name)
      WHEN NOT MATCHED THEN INSERT (name, location, max_households, slots_per_day, scheduled_hours, status)
      VALUES (src.name, src.loc, src.mh, src.spd, src.sh, src.st)
    `, 'Seed: kitchens');

    await executeStatement(conn, `
      MERGE INTO system_config dst
      USING (
        SELECT id as kid, 4.0 as pv, 10.0 as bat, 0.75 as pr, 4.5 as psh, 0.60 as cdf, 10.0 as psh_prod
        FROM kitchens WHERE name = 'SPCKI Kitchen 1'
      ) src ON (dst.kitchen_id = src.kid)
      WHEN NOT MATCHED THEN INSERT (kitchen_id, pv_capacity_kwp, battery_capacity_kwh, performance_ratio, peak_sun_hours, cooking_duty_factor, productive_sun_hours)
      VALUES (src.kid, src.pv, src.bat, src.pr, src.psh, src.cdf, src.psh_prod)
    `, 'Seed: system_config');

    await executeStatement(conn, `
      MERGE INTO slot_templates dst
      USING (
        SELECT k.id as kid, 1 as s_no, '06:00' as st, '08:00' as et, 'Solar' as ps FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 2, '08:00', '10:00', 'Solar' FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 3, '10:00', '12:30', 'Solar' FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 4, '12:30', '14:30', 'Battery' FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 5, '14:30', '16:30', 'Battery' FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 6, '16:30', '19:00', 'Battery' FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1'
      ) src ON (dst.kitchen_id = src.kid AND dst.slot_no = src.s_no)
      WHEN NOT MATCHED THEN INSERT (kitchen_id, slot_no, start_time, end_time, power_source)
      VALUES (src.kid, src.s_no, src.st, src.et, src.ps)
    `, 'Seed: slot_templates');

    await executeStatement(conn, `
      MERGE INTO households dst
      USING (
        SELECT k.id as kid, 'HH-01' as code, 4 as fs, 2 as ch, 2 as ad, 'LPG' as ftype, 1800.00 as cost, 'Active' as st, TO_DATE('2024-01-01', 'YYYY-MM-DD') as jd FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-02', 6, 3, 3, 'LPG', 2400.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-03', 3, 1, 2, 'LPG', 1500.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-04', 8, 4, 4, 'LPG', 3200.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-05', 5, 2, 3, 'LPG', 2000.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-06', 4, 2, 2, 'LPG', 1800.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-07', 7, 3, 4, 'LPG', 2800.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-08', 3, 1, 2, 'LPG', 1500.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-09', 6, 3, 3, 'LPG', 2400.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-10', 5, 2, 3, 'LPG', 2000.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-11', 4, 2, 2, 'LPG', 1800.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-12', 8, 4, 4, 'LPG', 3200.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-13', 3, 1, 2, 'LPG', 1500.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-14', 6, 3, 3, 'LPG', 2400.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-15', 5, 2, 3, 'LPG', 2000.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1' UNION ALL
        SELECT k.id, 'HH-16', 4, 2, 2, 'LPG', 1800.00, 'Active', TO_DATE('2024-01-01', 'YYYY-MM-DD') FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1'
      ) src ON (dst.household_code = src.code)
      WHEN NOT MATCHED THEN INSERT (kitchen_id, household_code, family_size, children_count, adults_count, baseline_fuel_type, baseline_monthly_fuel_cost, status, joined_date)
      VALUES (src.kid, src.code, src.fs, src.ch, src.ad, src.ftype, src.cost, src.st, src.jd)
    `, 'Seed: households (HH-01 to HH-16)');

    await executeStatement(conn, `
      MERGE INTO users dst
      USING (
        SELECT 'admin' as u, 'System Administrator' as fn, 'admin@spcki.local' as em, 'Admin@12345' as pw, 'Admin' as r FROM dual UNION ALL
        SELECT 'project', 'Project Coordinator', 'project@spcki.org', 'Project@12345', 'Project' FROM dual UNION ALL
        SELECT 'field', 'Field Officer', 'field@spcki.org', 'Field@12345', 'Field' FROM dual UNION ALL
        SELECT 'technical', 'Technical Specialist', 'technical@spcki.org', 'Technical@12345', 'Technical' FROM dual UNION ALL
        SELECT 'viewer', 'Donor Viewer', 'viewer@spcki.org', 'Viewer@12345', 'Viewer' FROM dual
      ) src ON (dst.username = src.u)
      WHEN NOT MATCHED THEN INSERT (username, full_name, email, password_hash, role, status, must_change_password)
      VALUES (src.u, src.fn, src.em, src.pw, src.r, 'Active', 'N')
    `, 'Seed: users (5 roles)');

    console.log('\n--- 4. Verification ---');
    const tableList = await conn.execute(`
      SELECT table_name, num_rows
      FROM user_tables
      ORDER BY table_name
    `);
    console.log('\nAll User Tables in SOLAR_COOK:');
    console.table(tableList.rows);

    const viewList = await conn.execute(`
      SELECT view_name FROM user_views ORDER BY view_name
    `);
    console.log('\nAll User Views:');
    console.table(viewList.rows);

    console.log('\n🎉 ALL TABLES, CONSTRAINTS, TRIGGERS, VIEWS & SEED DATA DEPLOYED SUCCESSFULLY! 🎉');

  } finally {
    await conn.close();
  }
}

deploy().catch(err => {
  console.error('\nDeployment aborted with error:', err);
  process.exit(1);
});
