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
    console.log('1. Recompiling SPCKI_DML_PKG spec & body...');
    await conn.execute(`
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
        p_completed       IN VARCHAR2 DEFAULT 'Y',
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

    PROCEDURE save_slot(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_slot_date    IN DATE,
        p_slot_no      IN NUMBER,
        p_start_time   IN VARCHAR2,
        p_end_time     IN VARCHAR2,
        p_power_source IN VARCHAR2,
        p_household_id IN NUMBER,
        p_status       IN VARCHAR2 DEFAULT 'Scheduled',
        p_note         IN VARCHAR2 DEFAULT NULL
    );

    PROCEDURE delete_slot(p_id IN NUMBER);
END spcki_dml_pkg;
    `);

    await conn.execute(`
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
        p_completed       IN VARCHAR2 DEFAULT 'Y',
        p_remarks         IN VARCHAR2 DEFAULT NULL
    ) IS
        v_slot_id NUMBER;
        v_start_time TIMESTAMP;
        v_end_time TIMESTAMP;
        v_comp VARCHAR2(5);
    BEGIN
        spcki_validation_pkg.validate_cooking_session(
            p_id => p_id, p_session_date => p_session_date,
            p_household_id => p_household_id, p_appliance_id => p_appliance_id,
            p_power_source => p_power_source, p_persons_cooked => p_persons_cooked,
            p_duration_min => p_duration_min
        );

        v_start_time := CAST(p_session_date AS TIMESTAMP) + NUMTODSINTERVAL(10, 'HOUR');
        v_end_time := v_start_time + NUMTODSINTERVAL(NVL(p_duration_min, 120), 'MINUTE');
        v_comp := NVL(p_completed, 'Y');
        IF v_comp IN ('1', 'true', 'TRUE', 'yes', 'YES') THEN v_comp := 'Y'; END IF;
        IF v_comp IN ('0', 'false', 'FALSE', 'no', 'NO') THEN v_comp := 'N'; END IF;

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
                v_comp, 'Y', p_remarks, SYSDATE
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE cooking_sessions SET
                household_id = p_household_id, appliance_id = p_appliance_id,
                power_source = p_power_source, persons_cooked_for = p_persons_cooked,
                duration_min = p_duration_min, cooking_completed = v_comp,
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

    PROCEDURE save_slot(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_slot_date    IN DATE,
        p_slot_no      IN NUMBER,
        p_start_time   IN VARCHAR2,
        p_end_time     IN VARCHAR2,
        p_power_source IN VARCHAR2,
        p_household_id IN NUMBER,
        p_status       IN VARCHAR2 DEFAULT 'Scheduled',
        p_note         IN VARCHAR2 DEFAULT NULL
    ) IS
    BEGIN
        IF p_id IS NULL THEN
            INSERT INTO slots (
                kitchen_id, slot_date, slot_no, start_time, end_time,
                power_source, household_id, status, note, created_at
            ) VALUES (
                p_kitchen_id, p_slot_date, p_slot_no, p_start_time, p_end_time,
                p_power_source, p_household_id, p_status, p_note, SYSDATE
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE slots SET
                slot_date = p_slot_date, slot_no = p_slot_no,
                start_time = p_start_time, end_time = p_end_time,
                power_source = p_power_source, household_id = p_household_id,
                status = p_status, note = p_note
            WHERE id = p_id;
        END IF;
    END save_slot;

    PROCEDURE delete_slot(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM slots WHERE id = p_id;
    END delete_slot;

END spcki_dml_pkg;
    `);

    // Verify compilation status
    const status = await conn.execute(
      "SELECT status FROM user_objects WHERE object_name = 'SPCKI_DML_PKG' AND object_type = 'PACKAGE BODY'"
    );
    console.log('SPCKI_DML_PKG Body status:', status.rows[0][0]);

    // Update Page 12 Process DML in APEX
    const page12Dml = `
DECLARE
  l_id NUMBER := TO_NUMBER(:P12_ID);
BEGIN
  IF :REQUEST = 'DELETE' THEN
    spcki_dml_pkg.delete_cooking_session(l_id);
  ELSIF :REQUEST IN ('CREATE', 'SAVE') THEN
    spcki_dml_pkg.save_cooking_session(
      p_id => l_id,
      p_session_date => TO_DATE(:P12_SESSION_DATE, 'YYYY-MM-DD'),
      p_household_id => TO_NUMBER(:P12_HOUSEHOLD_ID),
      p_appliance_id => TO_NUMBER(:P12_APPLIANCE_ID),
      p_power_source => :P12_POWER_SOURCE,
      p_persons_cooked => TO_NUMBER(:P12_PERSONS_COOKED_FOR),
      p_duration_min => TO_NUMBER(:P12_DURATION_MIN),
      p_completed => NVL(:P12_COOKING_COMPLETED, 'Y'),
      p_remarks => :P12_REMARKS
    );
    :P12_ID := l_id;
  END IF;
END;
`;
    await conn.execute(
      `UPDATE apex_200100.wwv_flow_step_processing
       SET process_sql_clob = :sql
       WHERE flow_id = 100 AND flow_step_id = 12 AND process_name = 'Process DML'`,
      { sql: page12Dml }
    );
    await conn.commit();
    console.log('✓ Page 12 Process DML updated.');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
