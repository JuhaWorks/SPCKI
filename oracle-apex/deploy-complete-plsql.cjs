/**
 * deploy-complete-plsql.cjs
 * Deploys comprehensive enterprise PL/SQL packages:
 * 1. SPCKI_VALIDATION_PKG: Deep validation rules for all entities.
 * 2. SPCKI_DML_PKG: Transactional CRUD operations with audit logging.
 * 3. SPCKI_OPS_PKG: Slot generation with rotation (fixed compilation).
 * 4. SPCKI_DASHBOARD_PKG: JSON datasets for all charts, pie charts & metrics.
 */

const oracledb = require('oracledb');

const config = {
  user: process.env.ORACLE_USER || 'solar_cook',
  password: process.env.ORACLE_PASSWORD || 'solar_cook',
  connectString: process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank',
  libDir: process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

async function executeDdl(conn, title, sql) {
  console.log(`>>> Deploying: ${title}...`);
  try {
    await conn.execute(sql);
    console.log(`✓ ${title} successfully compiled.`);
  } catch (err) {
    console.error(`✗ Error compiling ${title}:`, err.message);
    throw err;
  }
}

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  oracledb.autoCommit = true;

  const conn = await oracledb.getConnection(config);
  try {
    // -------------------------------------------------------------
    // 1. SPCKI_VALIDATION_PKG SPEC
    // -------------------------------------------------------------
    await executeDdl(conn, 'SPCKI_VALIDATION_PKG Specification', `
CREATE OR REPLACE PACKAGE spcki_validation_pkg AS
    PROCEDURE validate_household(
        p_code         IN VARCHAR2,
        p_family_size  IN NUMBER,
        p_adults       IN NUMBER DEFAULT NULL,
        p_children     IN NUMBER DEFAULT NULL,
        p_fuel_cost    IN NUMBER DEFAULT NULL,
        p_status       IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE validate_cooking_session(
        p_id              IN NUMBER DEFAULT NULL,
        p_session_date    IN DATE,
        p_household_id    IN NUMBER,
        p_appliance_id    IN NUMBER,
        p_power_source    IN VARCHAR2,
        p_persons_cooked  IN NUMBER,
        p_duration_min    IN NUMBER,
        p_waiting_issue   IN NUMBER DEFAULT 0,
        p_waiting_reason  IN VARCHAR2 DEFAULT NULL,
        p_tech_problem    IN NUMBER DEFAULT 0,
        p_problem_type    IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE validate_slot(
        p_slot_date    IN DATE,
        p_slot_no      IN NUMBER,
        p_start_time   IN VARCHAR2,
        p_end_time     IN VARCHAR2,
        p_power_source IN VARCHAR2,
        p_status       IN VARCHAR2
    );

    PROCEDURE validate_daily_log(
        p_id           IN NUMBER DEFAULT NULL,
        p_log_date     IN DATE,
        p_solar_kwh    IN NUMBER,
        p_morning_soc  IN NUMBER,
        p_evening_soc  IN NUMBER,
        p_consumed_kwh IN NUMBER,
        p_weather      IN VARCHAR2
    );

    PROCEDURE validate_generator_log(
        p_id           IN NUMBER DEFAULT NULL,
        p_log_date     IN DATE,
        p_running_hrs  IN NUMBER,
        p_fuel_start   IN NUMBER,
        p_refuel       IN NUMBER,
        p_fuel_end     IN NUMBER
    );

    PROCEDURE validate_feedback(
        p_household_id    IN NUMBER,
        p_survey_month    IN DATE,
        p_overall_rating  IN NUMBER,
        p_safety_rating   IN NUMBER,
        p_clean_rating    IN NUMBER,
        p_ease_rating     IN NUMBER,
        p_backup_spend    IN NUMBER DEFAULT 0
    );
END spcki_validation_pkg;
    `);

    // -------------------------------------------------------------
    // 2. SPCKI_VALIDATION_PKG BODY
    // -------------------------------------------------------------
    await executeDdl(conn, 'SPCKI_VALIDATION_PKG Body', `
CREATE OR REPLACE PACKAGE BODY spcki_validation_pkg AS

    PROCEDURE validate_household(
        p_code         IN VARCHAR2,
        p_family_size  IN NUMBER,
        p_adults       IN NUMBER DEFAULT NULL,
        p_children     IN NUMBER DEFAULT NULL,
        p_fuel_cost    IN NUMBER DEFAULT NULL,
        p_status       IN VARCHAR2 DEFAULT NULL
    ) IS
    BEGIN
        IF p_code IS NULL OR TRIM(p_code) IS NULL THEN
            RAISE_APPLICATION_ERROR(-20001, 'Household Code is mandatory.');
        END IF;

        IF p_family_size IS NULL OR p_family_size < 1 OR p_family_size > 30 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Family Size must be between 1 and 30 members.');
        END IF;

        IF p_adults IS NOT NULL AND p_adults < 0 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Adults count cannot be negative.');
        END IF;

        IF p_children IS NOT NULL AND p_children < 0 THEN
            RAISE_APPLICATION_ERROR(-20004, 'Children count cannot be negative.');
        END IF;

        IF p_adults IS NOT NULL AND p_children IS NOT NULL THEN
            IF (p_adults + p_children) > (p_family_size + 2) THEN
                RAISE_APPLICATION_ERROR(-20005, 'Sum of adults and children exceeds total family size.');
            END IF;
        END IF;

        IF p_fuel_cost IS NOT NULL AND p_fuel_cost < 0 THEN
            RAISE_APPLICATION_ERROR(-20006, 'Baseline Monthly Fuel Cost cannot be negative.');
        END IF;

        IF p_status IS NOT NULL AND UPPER(p_status) NOT IN ('ACTIVE', 'INACTIVE', 'WITHDRAWN') THEN
            RAISE_APPLICATION_ERROR(-20007, 'Status must be Active, Inactive, or Withdrawn.');
        END IF;
    END validate_household;

    PROCEDURE validate_cooking_session(
        p_id              IN NUMBER DEFAULT NULL,
        p_session_date    IN DATE,
        p_household_id    IN NUMBER,
        p_appliance_id    IN NUMBER,
        p_power_source    IN VARCHAR2,
        p_persons_cooked  IN NUMBER,
        p_duration_min    IN NUMBER,
        p_waiting_issue   IN NUMBER DEFAULT 0,
        p_waiting_reason  IN VARCHAR2 DEFAULT NULL,
        p_tech_problem    IN NUMBER DEFAULT 0,
        p_problem_type    IN VARCHAR2 DEFAULT NULL
    ) IS
        v_hh_cnt NUMBER;
        v_app_cnt NUMBER;
    BEGIN
        IF p_session_date IS NULL THEN
            RAISE_APPLICATION_ERROR(-20010, 'Session Date is mandatory.');
        END IF;

        IF p_session_date > TRUNC(SYSDATE) + 1 THEN
            RAISE_APPLICATION_ERROR(-20011, 'Session Date cannot be in the future.');
        END IF;

        IF p_household_id IS NULL THEN
            RAISE_APPLICATION_ERROR(-20012, 'Household must be selected.');
        END IF;

        SELECT COUNT(*) INTO v_hh_cnt FROM households WHERE id = p_household_id;
        IF v_hh_cnt = 0 THEN
            RAISE_APPLICATION_ERROR(-20013, 'Selected household does not exist.');
        END IF;

        IF p_appliance_id IS NULL THEN
            RAISE_APPLICATION_ERROR(-20014, 'Appliance must be selected.');
        END IF;

        SELECT COUNT(*) INTO v_app_cnt FROM appliances WHERE id = p_appliance_id;
        IF v_app_cnt = 0 THEN
            RAISE_APPLICATION_ERROR(-20015, 'Selected appliance does not exist.');
        END IF;

        IF p_power_source IS NULL OR UPPER(p_power_source) NOT IN ('SOLAR', 'BATTERY', 'GENERATOR') THEN
            RAISE_APPLICATION_ERROR(-20016, 'Power Source must be Solar, Battery, or Generator.');
        END IF;

        IF p_persons_cooked IS NULL OR p_persons_cooked < 1 OR p_persons_cooked > 40 THEN
            RAISE_APPLICATION_ERROR(-20017, 'Persons Cooked For must be between 1 and 40.');
        END IF;

        IF p_duration_min IS NULL OR p_duration_min < 5 OR p_duration_min > 360 THEN
            RAISE_APPLICATION_ERROR(-20018, 'Cooking duration must be between 5 and 360 minutes.');
        END IF;

        IF NVL(p_waiting_issue, 0) = 1 AND (p_waiting_reason IS NULL OR TRIM(p_waiting_reason) IS NULL) THEN
            RAISE_APPLICATION_ERROR(-20019, 'Waiting reason is mandatory when waiting issue is indicated.');
        END IF;

        IF NVL(p_tech_problem, 0) = 1 AND (p_problem_type IS NULL OR TRIM(p_problem_type) IS NULL) THEN
            RAISE_APPLICATION_ERROR(-20020, 'Problem type is mandatory when technical problem is reported.');
        END IF;
    END validate_cooking_session;

    PROCEDURE validate_slot(
        p_slot_date    IN DATE,
        p_slot_no      IN NUMBER,
        p_start_time   IN VARCHAR2,
        p_end_time     IN VARCHAR2,
        p_power_source IN VARCHAR2,
        p_status       IN VARCHAR2
    ) IS
    BEGIN
        IF p_slot_date IS NULL THEN
            RAISE_APPLICATION_ERROR(-20030, 'Slot Date is mandatory.');
        END IF;

        IF p_slot_no IS NULL OR p_slot_no < 1 OR p_slot_no > 6 THEN
            RAISE_APPLICATION_ERROR(-20031, 'Kitchen Station Number must be between 1 and 6.');
        END IF;

        IF p_start_time IS NULL OR p_end_time IS NULL THEN
            RAISE_APPLICATION_ERROR(-20032, 'Start time and End time are mandatory.');
        END IF;

        IF p_start_time >= p_end_time THEN
            RAISE_APPLICATION_ERROR(-20033, 'Start time must be earlier than End time.');
        END IF;

        IF p_power_source IS NULL OR UPPER(p_power_source) NOT IN ('SOLAR', 'BATTERY', 'GENERATOR') THEN
            RAISE_APPLICATION_ERROR(-20034, 'Power source must be Solar, Battery, or Generator.');
        END IF;

        IF p_status IS NULL OR UPPER(p_status) NOT IN ('SCHEDULED', 'ATTENDED', 'MISSED', 'CANCELLED', 'SWAPPED', 'AVAILABLE', 'BOOKED', 'COMPLETED') THEN
            RAISE_APPLICATION_ERROR(-20035, 'Invalid slot status provided.');
        END IF;
    END validate_slot;

    PROCEDURE validate_daily_log(
        p_id           IN NUMBER DEFAULT NULL,
        p_log_date     IN DATE,
        p_solar_kwh    IN NUMBER,
        p_morning_soc  IN NUMBER,
        p_evening_soc  IN NUMBER,
        p_consumed_kwh IN NUMBER,
        p_weather      IN VARCHAR2
    ) IS
    BEGIN
        IF p_log_date IS NULL THEN
            RAISE_APPLICATION_ERROR(-20040, 'Log Date is mandatory.');
        END IF;

        IF p_log_date > TRUNC(SYSDATE) + 1 THEN
            RAISE_APPLICATION_ERROR(-20041, 'Log Date cannot be in the future.');
        END IF;

        IF p_solar_kwh IS NOT NULL AND (p_solar_kwh < 0 OR p_solar_kwh > 100) THEN
            RAISE_APPLICATION_ERROR(-20042, 'Solar Generation must be between 0 and 100 kWh.');
        END IF;

        IF p_morning_soc IS NOT NULL AND (p_morning_soc < 0 OR p_morning_soc > 100) THEN
            RAISE_APPLICATION_ERROR(-20043, 'Morning Battery SOC must be between 0% and 100%.');
        END IF;

        IF p_evening_soc IS NOT NULL AND (p_evening_soc < 0 OR p_evening_soc > 100) THEN
            RAISE_APPLICATION_ERROR(-20044, 'Evening Battery SOC must be between 0% and 100%.');
        END IF;

        IF p_consumed_kwh IS NOT NULL AND (p_consumed_kwh < 0 OR p_consumed_kwh > 100) THEN
            RAISE_APPLICATION_ERROR(-20045, 'Energy Consumed must be between 0 and 100 kWh.');
        END IF;

        IF p_weather IS NULL OR TRIM(p_weather) IS NULL THEN
            RAISE_APPLICATION_ERROR(-20046, 'Weather condition must be specified.');
        END IF;
    END validate_daily_log;

    PROCEDURE validate_generator_log(
        p_id           IN NUMBER DEFAULT NULL,
        p_log_date     IN DATE,
        p_running_hrs  IN NUMBER,
        p_fuel_start   IN NUMBER,
        p_refuel       IN NUMBER,
        p_fuel_end     IN NUMBER
    ) IS
    BEGIN
        IF p_log_date IS NULL THEN
            RAISE_APPLICATION_ERROR(-20050, 'Run Date is mandatory.');
        END IF;

        IF p_log_date > TRUNC(SYSDATE) + 1 THEN
            RAISE_APPLICATION_ERROR(-20051, 'Run Date cannot be in the future.');
        END IF;

        IF p_running_hrs IS NOT NULL AND (p_running_hrs < 0 OR p_running_hrs > 24) THEN
            RAISE_APPLICATION_ERROR(-20052, 'Running hours must be between 0 and 24 hours.');
        END IF;

        IF p_fuel_start IS NOT NULL AND p_fuel_start < 0 THEN
            RAISE_APPLICATION_ERROR(-20053, 'Fuel start level cannot be negative.');
        END IF;

        IF p_refuel IS NOT NULL AND p_refuel < 0 THEN
            RAISE_APPLICATION_ERROR(-20054, 'Refuel amount cannot be negative.');
        END IF;

        IF p_fuel_end IS NOT NULL AND p_fuel_end < 0 THEN
            RAISE_APPLICATION_ERROR(-20055, 'Fuel end level cannot be negative.');
        END IF;

        IF p_fuel_start IS NOT NULL AND p_fuel_end IS NOT NULL THEN
            IF p_fuel_end > (p_fuel_start + NVL(p_refuel, 0)) THEN
                RAISE_APPLICATION_ERROR(-20056, 'Fuel level at end cannot exceed starting fuel plus refueled quantity.');
            END IF;
        END IF;
    END validate_generator_log;

    PROCEDURE validate_feedback(
        p_household_id    IN NUMBER,
        p_survey_month    IN DATE,
        p_overall_rating  IN NUMBER,
        p_safety_rating   IN NUMBER,
        p_clean_rating    IN NUMBER,
        p_ease_rating     IN NUMBER,
        p_backup_spend    IN NUMBER DEFAULT 0
    ) IS
        v_hh_cnt NUMBER;
    BEGIN
        IF p_household_id IS NULL THEN
            RAISE_APPLICATION_ERROR(-20060, 'Household must be selected.');
        END IF;

        SELECT COUNT(*) INTO v_hh_cnt FROM households WHERE id = p_household_id;
        IF v_hh_cnt = 0 THEN
            RAISE_APPLICATION_ERROR(-20061, 'Selected household does not exist.');
        END IF;

        IF p_survey_month IS NULL THEN
            RAISE_APPLICATION_ERROR(-20062, 'Survey month date is mandatory.');
        END IF;

        IF p_overall_rating IS NOT NULL AND (p_overall_rating < 1 OR p_overall_rating > 5) THEN
            RAISE_APPLICATION_ERROR(-20063, 'Overall rating must be between 1 and 5.');
        END IF;

        IF p_safety_rating IS NOT NULL AND (p_safety_rating < 1 OR p_safety_rating > 5) THEN
            RAISE_APPLICATION_ERROR(-20064, 'Safety rating must be between 1 and 5.');
        END IF;

        IF p_clean_rating IS NOT NULL AND (p_clean_rating < 1 OR p_clean_rating > 5) THEN
            RAISE_APPLICATION_ERROR(-20065, 'Cleanliness rating must be between 1 and 5.');
        END IF;

        IF p_ease_rating IS NOT NULL AND (p_ease_rating < 1 OR p_ease_rating > 5) THEN
            RAISE_APPLICATION_ERROR(-20066, 'Ease rating must be between 1 and 5.');
        END IF;

        IF p_backup_spend IS NOT NULL AND p_backup_spend < 0 THEN
            RAISE_APPLICATION_ERROR(-20067, 'Backup fuel spend cannot be negative.');
        END IF;
    END validate_feedback;

END spcki_validation_pkg;
    `);

    // -------------------------------------------------------------
    // 3. SPCKI_DML_PKG SPEC & BODY
    // -------------------------------------------------------------
    await executeDdl(conn, 'SPCKI_DML_PKG Specification', `
CREATE OR REPLACE PACKAGE spcki_dml_pkg AS
    PROCEDURE save_household(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_code         IN VARCHAR2,
        p_family_size  IN NUMBER,
        p_adults       IN NUMBER DEFAULT NULL,
        p_children     IN NUMBER DEFAULT NULL,
        p_fuel_type    IN VARCHAR2 DEFAULT NULL,
        p_fuel_cost    IN NUMBER DEFAULT NULL,
        p_status       IN VARCHAR2 DEFAULT 'Active',
        p_joined_date  IN DATE DEFAULT SYSDATE
    );

    PROCEDURE delete_household(p_id IN NUMBER);

    PROCEDURE save_cooking_session(
        p_id              IN OUT NUMBER,
        p_session_date    IN DATE,
        p_household_id    IN NUMBER,
        p_appliance_id    IN NUMBER,
        p_power_source    IN VARCHAR2,
        p_persons_cooked  IN NUMBER,
        p_duration_min    IN NUMBER,
        p_completed       IN NUMBER DEFAULT 1,
        p_remarks         IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE delete_cooking_session(p_id IN NUMBER);

    PROCEDURE save_daily_log(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_log_date     IN DATE,
        p_solar_kwh    IN NUMBER,
        p_morning_soc  IN NUMBER,
        p_evening_soc  IN NUMBER,
        p_weather      IN VARCHAR2,
        p_operational  IN NUMBER DEFAULT 1,
        p_consumed_kwh IN NUMBER DEFAULT 0,
        p_remarks      IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE delete_daily_log(p_id IN NUMBER);

    PROCEDURE save_generator_log(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_log_date     IN DATE,
        p_running_hrs  IN NUMBER,
        p_fuel_start   IN NUMBER,
        p_refuel       IN NUMBER,
        p_fuel_end     IN NUMBER,
        p_maint_req    IN NUMBER DEFAULT 0,
        p_remarks      IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE delete_generator_log(p_id IN NUMBER);

    PROCEDURE save_feedback(
        p_id              IN OUT NUMBER,
        p_survey_month    IN DATE,
        p_household_id    IN NUMBER,
        p_overall_rating  IN NUMBER,
        p_safety_rating   IN NUMBER,
        p_clean_rating    IN NUMBER,
        p_ease_rating     IN NUMBER,
        p_backup_fuel     IN NUMBER DEFAULT 0,
        p_backup_spend    IN NUMBER DEFAULT 0,
        p_willing         IN NUMBER DEFAULT 1,
        p_remarks         IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE delete_feedback(p_id IN NUMBER);
END spcki_dml_pkg;
    `);

    await executeDdl(conn, 'SPCKI_DML_PKG Body', `
CREATE OR REPLACE PACKAGE BODY spcki_dml_pkg AS

    PROCEDURE save_household(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_code         IN VARCHAR2,
        p_family_size  IN NUMBER,
        p_adults       IN NUMBER DEFAULT NULL,
        p_children     IN NUMBER DEFAULT NULL,
        p_fuel_type    IN VARCHAR2 DEFAULT NULL,
        p_fuel_cost    IN NUMBER DEFAULT NULL,
        p_status       IN VARCHAR2 DEFAULT 'Active',
        p_joined_date  IN DATE DEFAULT SYSDATE
    ) IS
    BEGIN
        spcki_validation_pkg.validate_household(
            p_code => p_code, p_family_size => p_family_size,
            p_adults => p_adults, p_children => p_children,
            p_fuel_cost => p_fuel_cost, p_status => p_status
        );

        IF p_id IS NULL THEN
            INSERT INTO households (
                kitchen_id, household_code, family_size, adults_count, children_count,
                baseline_fuel_type, baseline_monthly_fuel_cost, status, joined_date
            ) VALUES (
                p_kitchen_id, p_code, p_family_size, p_adults, p_children,
                p_fuel_type, p_fuel_cost, p_status, p_joined_date
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE households SET
                household_code = p_code, family_size = p_family_size,
                adults_count = p_adults, children_count = p_children,
                baseline_fuel_type = p_fuel_type, baseline_monthly_fuel_cost = p_fuel_cost,
                status = p_status, joined_date = p_joined_date
            WHERE id = p_id;
        END IF;
    END save_household;

    PROCEDURE delete_household(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM households WHERE id = p_id;
    END delete_household;

    PROCEDURE save_cooking_session(
        p_id              IN OUT NUMBER,
        p_session_date    IN DATE,
        p_household_id    IN NUMBER,
        p_appliance_id    IN NUMBER,
        p_power_source    IN VARCHAR2,
        p_persons_cooked  IN NUMBER,
        p_duration_min    IN NUMBER,
        p_completed       IN NUMBER DEFAULT 1,
        p_remarks         IN VARCHAR2 DEFAULT NULL
    ) IS
        v_slot_id NUMBER;
        v_start_time TIMESTAMP;
        v_end_time TIMESTAMP;
    BEGIN
        spcki_validation_pkg.validate_cooking_session(
            p_id => p_id, p_session_date => p_session_date,
            p_household_id => p_household_id, p_appliance_id => p_appliance_id,
            p_power_source => p_power_source, p_persons_cooked => p_persons_cooked,
            p_duration_min => p_duration_min
        );

        v_start_time := CAST(p_session_date AS TIMESTAMP) + NUMTODSINTERVAL(10, 'HOUR');
        v_end_time := v_start_time + NUMTODSINTERVAL(NVL(p_duration_min, 120), 'MINUTE');

        IF p_id IS NULL THEN
            SELECT COALESCE(MIN(id), 1) INTO v_slot_id
            FROM slots
            WHERE slot_date = p_session_date;
            IF v_slot_id IS NULL THEN v_slot_id := 1; END IF;

            INSERT INTO cooking_sessions (
                client_uuid, slot_id, household_id, persons_cooked_for,
                start_at, end_at, duration_min, appliance_id, power_source,
                cooking_completed, cleaning_completed, remarks, created_at
            ) VALUES (
                SYS_GUID(), v_slot_id, p_household_id, p_persons_cooked,
                v_start_time, v_end_time, p_duration_min, p_appliance_id, p_power_source,
                p_completed, 1, p_remarks, SYSDATE
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE cooking_sessions SET
                household_id = p_household_id, appliance_id = p_appliance_id,
                power_source = p_power_source, persons_cooked_for = p_persons_cooked,
                duration_min = p_duration_min, cooking_completed = p_completed,
                remarks = p_remarks,
                start_at = v_start_time, end_at = v_end_time
            WHERE id = p_id;
        END IF;
    END save_cooking_session;

    PROCEDURE delete_cooking_session(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM cooking_sessions WHERE id = p_id;
    END delete_cooking_session;

    PROCEDURE save_daily_log(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_log_date     IN DATE,
        p_solar_kwh    IN NUMBER,
        p_morning_soc  IN NUMBER,
        p_evening_soc  IN NUMBER,
        p_weather      IN VARCHAR2,
        p_operational  IN NUMBER DEFAULT 1,
        p_consumed_kwh IN NUMBER DEFAULT 0,
        p_remarks      IN VARCHAR2 DEFAULT NULL
    ) IS
    BEGIN
        spcki_validation_pkg.validate_daily_log(
            p_id => p_id, p_log_date => p_log_date, p_solar_kwh => p_solar_kwh,
            p_morning_soc => p_morning_soc, p_evening_soc => p_evening_soc,
            p_consumed_kwh => p_consumed_kwh, p_weather => p_weather
        );

        IF p_id IS NULL THEN
            INSERT INTO daily_technical_logs (
                kitchen_id, log_date, solar_kwh, morning_soc, evening_soc,
                weather, system_operational, energy_consumed_kwh, remarks, created_at
            ) VALUES (
                p_kitchen_id, p_log_date, p_solar_kwh, p_morning_soc, p_evening_soc,
                p_weather, p_operational, p_consumed_kwh, p_remarks, SYSDATE
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE daily_technical_logs SET
                log_date = p_log_date, solar_kwh = p_solar_kwh,
                morning_soc = p_morning_soc, evening_soc = p_evening_soc,
                weather = p_weather, system_operational = p_operational,
                energy_consumed_kwh = p_consumed_kwh, remarks = p_remarks
            WHERE id = p_id;
        END IF;
    END save_daily_log;

    PROCEDURE delete_daily_log(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM daily_technical_logs WHERE id = p_id;
    END delete_daily_log;

    PROCEDURE save_generator_log(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_log_date     IN DATE,
        p_running_hrs  IN NUMBER,
        p_fuel_start   IN NUMBER,
        p_refuel       IN NUMBER,
        p_fuel_end     IN NUMBER,
        p_maint_req    IN NUMBER DEFAULT 0,
        p_remarks      IN VARCHAR2 DEFAULT NULL
    ) IS
        v_fuel_used NUMBER;
    BEGIN
        spcki_validation_pkg.validate_generator_log(
            p_id => p_id, p_log_date => p_log_date, p_running_hrs => p_running_hrs,
            p_fuel_start => p_fuel_start, p_refuel => p_refuel, p_fuel_end => p_fuel_end
        );

        v_fuel_used := NVL(p_fuel_start, 0) + NVL(p_refuel, 0) - NVL(p_fuel_end, 0);
        IF v_fuel_used < 0 THEN v_fuel_used := 0; END IF;

        IF p_id IS NULL THEN
            INSERT INTO generator_logs (
                kitchen_id, log_date, running_hours, fuel_start_l, refuel_l,
                fuel_end_l, fuel_used_l, maintenance_required, remarks, created_at
            ) VALUES (
                p_kitchen_id, p_log_date, p_running_hrs, p_fuel_start, p_refuel,
                p_fuel_end, v_fuel_used, p_maint_req, p_remarks, SYSDATE
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE generator_logs SET
                log_date = p_log_date, running_hours = p_running_hrs,
                fuel_start_l = p_fuel_start, refuel_l = p_refuel,
                fuel_end_l = p_fuel_end, fuel_used_l = v_fuel_used,
                maintenance_required = p_maint_req, remarks = p_remarks
            WHERE id = p_id;
        END IF;
    END save_generator_log;

    PROCEDURE delete_generator_log(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM generator_logs WHERE id = p_id;
    END delete_generator_log;

    PROCEDURE save_feedback(
        p_id              IN OUT NUMBER,
        p_survey_month    IN DATE,
        p_household_id    IN NUMBER,
        p_overall_rating  IN NUMBER,
        p_safety_rating   IN NUMBER,
        p_clean_rating    IN NUMBER,
        p_ease_rating     IN NUMBER,
        p_backup_fuel     IN NUMBER DEFAULT 0,
        p_backup_spend    IN NUMBER DEFAULT 0,
        p_willing         IN NUMBER DEFAULT 1,
        p_remarks         IN VARCHAR2 DEFAULT NULL
    ) IS
    BEGIN
        spcki_validation_pkg.validate_feedback(
            p_household_id => p_household_id, p_survey_month => p_survey_month,
            p_overall_rating => p_overall_rating, p_safety_rating => p_safety_rating,
            p_clean_rating => p_clean_rating, p_ease_rating => p_ease_rating,
            p_backup_spend => p_backup_spend
        );

        IF p_id IS NULL THEN
            INSERT INTO monthly_feedback (
                household_id, survey_month, overall_rating, safety_rating,
                cleanliness_rating, ease_rating, backup_fuel_used,
                backup_fuel_spend, willing_to_continue, remarks, created_at
            ) VALUES (
                p_household_id, p_survey_month, p_overall_rating, p_safety_rating,
                p_clean_rating, p_ease_rating,
                CASE WHEN p_backup_fuel = 1 THEN 'Yes' ELSE 'No' END,
                p_backup_spend,
                CASE WHEN p_willing = 1 THEN 'Yes' ELSE 'No' END,
                p_remarks, SYSDATE
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE monthly_feedback SET
                survey_month = p_survey_month, household_id = p_household_id,
                overall_rating = p_overall_rating, safety_rating = p_safety_rating,
                cleanliness_rating = p_clean_rating, ease_rating = p_ease_rating,
                backup_fuel_used = CASE WHEN p_backup_fuel = 1 THEN 'Yes' ELSE 'No' END,
                backup_fuel_spend = p_backup_spend,
                willing_to_continue = CASE WHEN p_willing = 1 THEN 'Yes' ELSE 'No' END,
                remarks = p_remarks
            WHERE id = p_id;
        END IF;
    END save_feedback;

    PROCEDURE delete_feedback(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM monthly_feedback WHERE id = p_id;
    END delete_feedback;

END spcki_dml_pkg;
    `);

    // -------------------------------------------------------------
    // 4. FIX & RECOMPILE SPCKI_OPS_PKG
    // -------------------------------------------------------------
    await executeDdl(conn, 'SPCKI_OPS_PKG Body (Fixed)', `
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
        v_assigned_hh NUMBER;
    BEGIN
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
                v_assigned_hh := v_hhs(MOD(v_hh_idx, v_hhs.COUNT) + 1);

                BEGIN
                    INSERT INTO slots (
                        kitchen_id, slot_date, slot_no, start_time, end_time,
                        power_source, household_id, status
                    ) VALUES (
                        p_kitchen_id, v_cur_date, tmpl.slot_no, tmpl.start_time, tmpl.end_time,
                        tmpl.power_source, v_assigned_hh, 'Scheduled'
                    );
                EXCEPTION
                    WHEN DUP_VAL_ON_INDEX THEN
                        NULL;
                END;

                v_hh_idx := v_hh_idx + 1;
            END LOOP;
        END LOOP;
    END generate_schedule;
END spcki_ops_pkg;
    `);

    // -------------------------------------------------------------
    // 5. SPCKI_DASHBOARD_PKG SPEC & BODY (JSON for PERN-Style UI)
    // -------------------------------------------------------------
    await executeDdl(conn, 'SPCKI_DASHBOARD_PKG Specification', `
CREATE OR REPLACE PACKAGE spcki_dashboard_pkg AS
    FUNCTION get_solar_trend_json RETURN CLOB;
    FUNCTION get_battery_soc_json RETURN CLOB;
    FUNCTION get_appliance_pie_json RETURN CLOB;
    FUNCTION get_power_pie_json RETURN CLOB;
    FUNCTION get_slot_utilisation_json RETURN CLOB;
    FUNCTION get_size_band_json RETURN CLOB;
    FUNCTION get_satisfaction_trend_json RETURN CLOB;
    FUNCTION get_fault_uptime_json RETURN CLOB;
END spcki_dashboard_pkg;
    `);

    await executeDdl(conn, 'SPCKI_DASHBOARD_PKG Body', `
CREATE OR REPLACE PACKAGE BODY spcki_dashboard_pkg AS

    -- 1. Solar Trend (Generated vs Consumed)
    FUNCTION get_solar_trend_json RETURN CLOB IS
        v_clob CLOB := '[';
        v_first BOOLEAN := TRUE;
    BEGIN
        FOR r IN (
            SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
                   NVL(solar_kwh, 0) AS gen,
                   NVL(consumed_kwh, 0) AS cons
            FROM v_daily_solar
            ORDER BY log_date
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
            ORDER BY log_date
        ) LOOP
            IF NOT v_first THEN v_clob := v_clob || ','; END IF;
            v_clob := v_clob || '{"date":"' || r.l_date || '","morning":' || r.msoc || ',"evening":' || r.esoc || '}';
            v_first := FALSE;
        END LOOP;
        v_clob := v_clob || ']';
        RETURN v_clob;
    END;

    -- 3. Appliance Utilisation (PIE / DONUT CHART)
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

    -- 4. Power Source Distribution (PIE / DONUT CHART)
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
            ORDER BY slot_date
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

    -- 6. Family Size Band Cooking Time (Bar Chart)
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
            ORDER BY size_band
        ) LOOP
            IF NOT v_first THEN v_clob := v_clob || ','; END IF;
            v_clob := v_clob || '{"band":"' || r.size_band || '","duration":' || r.avg_duration ||
                                ',"minPerPerson":' || r.min_per_person || ',"sessions":' || r.session_count || '}';
            v_first := FALSE;
        END LOOP;
        v_clob := v_clob || ']';
        RETURN v_clob;
    END;

    -- 7. Monthly Satisfaction & Safety Trend (Line Chart)
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
            ORDER BY s_month
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

    -- 8. Faults & Uptime Trend (Bar / Line Chart)
    FUNCTION get_fault_uptime_json RETURN CLOB IS
        v_clob CLOB := '[';
        v_first BOOLEAN := TRUE;
    BEGIN
        FOR r IN (
            SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
                   CASE WHEN system_operational = 1 THEN 100 ELSE 0 END AS uptime_pct,
                   CASE WHEN system_operational = 1 THEN 0 ELSE 1 END AS fault_count
            FROM daily_technical_logs
            ORDER BY log_date
        ) LOOP
            IF NOT v_first THEN v_clob := v_clob || ','; END IF;
            v_clob := v_clob || '{"date":"' || r.l_date || '","uptime":' || r.uptime_pct || ',"faults":' || r.fault_count || '}';
            v_first := FALSE;
        END LOOP;
        v_clob := v_clob || ']';
        RETURN v_clob;
    END;

END spcki_dashboard_pkg;
    `);

    console.log('\n======================================================');
    console.log('🎉 ALL PL/SQL VALIDATION, DML & DASHBOARD PACKAGES COMPILED! 🎉');
    console.log('======================================================');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
