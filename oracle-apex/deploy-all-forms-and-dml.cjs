/**
 * deploy-all-forms-and-dml.cjs
 * Deploys complete PL/SQL DML package (SPCKI_DML_PKG) with save_slot and delete_slot,
 * and standardizes Pages 14, 15, 16, 17 to wire directly through spcki_dml_pkg.
 */

const oracledb = require('oracledb');

const config = {
  user: process.env.ORACLE_USER || 'solar_cook',
  password: process.env.ORACLE_PASSWORD || 'solar_cook',
  connectString: process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank',
  libDir: process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

function buttonHtml(pkItem, entityName) {
  return `
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:12px 16px; border-top:1px solid #e2e8f0; background:#f8fafc;">
  <div style="display:flex; gap:10px;">
    <button type="button" onclick="apex.navigation.dialog.close(true);" class="t-Button">Cancel</button>
    <button type="button" id="btn_delete_${pkItem}" onclick="if(confirm('Are you sure you want to delete this ${entityName}?')){apex.submit('DELETE');}" class="t-Button t-Button--danger">
      <span class="fa fa-trash" aria-hidden="true"></span> Delete
    </button>
  </div>
  <div style="display:flex; gap:10px;">
    <button type="button" id="btn_save_${pkItem}" onclick="apex.submit('SAVE');" class="t-Button t-Button--primary t-Button--hot">
      <span class="fa fa-check" aria-hidden="true"></span> Save Changes
    </button>
    <button type="button" id="btn_create_${pkItem}" onclick="apex.submit('CREATE');" class="t-Button t-Button--primary t-Button--hot">
      <span class="fa fa-plus" aria-hidden="true"></span> Create ${entityName}
    </button>
  </div>
</div>
<script>
(function() {
  function checkPk() {
    var item = apex.item('${pkItem}');
    var pkVal = item ? item.getValue() : null;
    var bDel = document.getElementById('btn_delete_${pkItem}');
    var bSave = document.getElementById('btn_save_${pkItem}');
    var bCreate = document.getElementById('btn_create_${pkItem}');
    if (!pkVal) {
      if (bDel) bDel.style.display = 'none';
      if (bSave) bSave.style.display = 'none';
      if (bCreate) bCreate.style.display = 'inline-block';
    } else {
      if (bDel) bDel.style.display = 'inline-block';
      if (bSave) bSave.style.display = 'inline-block';
      if (bCreate) bCreate.style.display = 'none';
    }
  }
  setTimeout(checkPk, 100);
})();
</script>
`;
}

async function executeBlock(conn, name, sql) {
  console.log(`\n>>> Executing: ${name}...`);
  try {
    await conn.execute(sql);
    console.log(`✓ ${name} successful.`);
  } catch (err) {
    console.error(`✗ Error in ${name}:`, err.message);
    throw err;
  }
}

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  try {
    // -------------------------------------------------------------------------
    // 1. RE-COMPILE SPCKI_DML_PKG SPEC & BODY (Adding save_slot / delete_slot)
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Compile SPCKI_DML_PKG Specification', `
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
        p_completed       IN VARCHAR2 DEFAULT '1',
        p_remarks         IN VARCHAR2 DEFAULT NULL
    );
    PROCEDURE delete_cooking_session(p_id IN NUMBER);

    PROCEDURE save_slot(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_slot_date    IN DATE,
        p_slot_no      IN NUMBER,
        p_start_time   IN VARCHAR2,
        p_end_time     IN VARCHAR2,
        p_power_source IN VARCHAR2,
        p_household_id IN NUMBER DEFAULT NULL,
        p_status       IN VARCHAR2 DEFAULT 'Booked',
        p_note         IN VARCHAR2 DEFAULT NULL
    );
    PROCEDURE delete_slot(p_id IN NUMBER);

    PROCEDURE save_daily_log(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_log_date     IN DATE,
        p_solar_kwh    IN NUMBER,
        p_morning_soc  IN NUMBER,
        p_evening_soc  IN NUMBER,
        p_weather      IN VARCHAR2,
        p_operational  IN VARCHAR2 DEFAULT '1',
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
        p_maint_req    IN VARCHAR2 DEFAULT '0',
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
        p_backup_fuel     IN VARCHAR2 DEFAULT '0',
        p_backup_spend    IN NUMBER DEFAULT 0,
        p_willing         IN VARCHAR2 DEFAULT '1',
        p_remarks         IN VARCHAR2 DEFAULT NULL
    );
    PROCEDURE delete_feedback(p_id IN NUMBER);
END spcki_dml_pkg;
    `);

    await executeBlock(conn, 'Compile SPCKI_DML_PKG Body', `
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
        p_completed       IN VARCHAR2 DEFAULT '1',
        p_remarks         IN VARCHAR2 DEFAULT NULL
    ) IS
        v_slot_id NUMBER;
        v_start_time TIMESTAMP;
        v_end_time TIMESTAMP;
        v_comp CHAR(1);
    BEGIN
        spcki_validation_pkg.validate_cooking_session(
            p_id => p_id, p_session_date => p_session_date,
            p_household_id => p_household_id, p_appliance_id => p_appliance_id,
            p_power_source => p_power_source, p_persons_cooked => p_persons_cooked,
            p_duration_min => p_duration_min
        );

        v_start_time := CAST(p_session_date AS TIMESTAMP) + NUMTODSINTERVAL(10, 'HOUR');
        v_end_time := v_start_time + NUMTODSINTERVAL(NVL(p_duration_min, 120), 'MINUTE');
        v_comp := CASE WHEN p_completed IN ('1', 'Y', 'true', 'TRUE') THEN 'Y' ELSE 'N' END;

        IF p_id IS NULL THEN
            SELECT MIN(s.id) INTO v_slot_id
            FROM slots s
            WHERE s.slot_date = p_session_date
              AND NOT EXISTS (SELECT 1 FROM cooking_sessions cs WHERE cs.slot_id = s.id);

            IF v_slot_id IS NULL THEN
                INSERT INTO slots (
                    kitchen_id, slot_date, slot_no, start_time, end_time, power_source, household_id, status, created_at
                ) VALUES (
                    1, p_session_date,
                    NVL((SELECT MAX(slot_no) + 1 FROM slots WHERE slot_date = p_session_date), 1),
                    TO_CHAR(v_start_time, 'HH24:MI'), TO_CHAR(v_end_time, 'HH24:MI'),
                    INITCAP(p_power_source), p_household_id, 'Attended', SYSTIMESTAMP
                ) RETURNING id INTO v_slot_id;
            END IF;

            INSERT INTO cooking_sessions (
                client_uuid, slot_id, household_id, persons_cooked_for,
                start_at, end_at, duration_min, appliance_id, power_source,
                cooking_completed, cleaning_completed, remarks, created_at
            ) VALUES (
                SYS_GUID(), v_slot_id, p_household_id, p_persons_cooked,
                v_start_time, v_end_time, p_duration_min, p_appliance_id, INITCAP(p_power_source),
                v_comp, 'Y', p_remarks, SYSTIMESTAMP
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE cooking_sessions SET
                household_id = p_household_id, persons_cooked_for = p_persons_cooked,
                duration_min = p_duration_min, appliance_id = p_appliance_id,
                power_source = INITCAP(p_power_source), cooking_completed = v_comp,
                remarks = p_remarks, start_at = v_start_time, end_at = v_end_time
            WHERE id = p_id;
        END IF;
    END save_cooking_session;

    PROCEDURE delete_cooking_session(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM cooking_sessions WHERE id = p_id;
    END delete_cooking_session;

    PROCEDURE save_slot(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_slot_date    IN DATE,
        p_slot_no      IN NUMBER,
        p_start_time   IN VARCHAR2,
        p_end_time     IN VARCHAR2,
        p_power_source IN VARCHAR2,
        p_household_id IN NUMBER DEFAULT NULL,
        p_status       IN VARCHAR2 DEFAULT 'Booked',
        p_note         IN VARCHAR2 DEFAULT NULL
    ) IS
        v_status VARCHAR2(20);
        v_pwr VARCHAR2(20);
    BEGIN
        v_status := CASE UPPER(p_status)
            WHEN 'BOOKED' THEN 'Scheduled'
            WHEN 'SCHEDULED' THEN 'Scheduled'
            WHEN 'ATTENDED' THEN 'Attended'
            WHEN 'COMPLETED' THEN 'Attended'
            WHEN 'MISSED' THEN 'Missed'
            WHEN 'CANCELLED' THEN 'Cancelled'
            WHEN 'SWAPPED' THEN 'Swapped'
            ELSE 'Scheduled'
        END;
        v_pwr := INITCAP(p_power_source);

        spcki_validation_pkg.validate_slot(
            p_slot_date    => p_slot_date,
            p_slot_no      => p_slot_no,
            p_start_time   => p_start_time,
            p_end_time     => p_end_time,
            p_power_source => v_pwr,
            p_status       => v_status
        );

        IF p_id IS NULL THEN
            INSERT INTO slots (
                kitchen_id, slot_date, slot_no, start_time, end_time,
                power_source, household_id, status, note, created_at
            ) VALUES (
                NVL(p_kitchen_id, 1), p_slot_date, p_slot_no, p_start_time, p_end_time,
                v_pwr, p_household_id, v_status, p_note, SYSTIMESTAMP
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE slots SET
                kitchen_id   = NVL(p_kitchen_id, 1),
                slot_date    = p_slot_date,
                slot_no      = p_slot_no,
                start_time   = p_start_time,
                end_time     = p_end_time,
                power_source = v_pwr,
                household_id = p_household_id,
                status       = v_status,
                note         = p_note
            WHERE id = p_id;
        END IF;
    END save_slot;

    PROCEDURE delete_slot(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM slots WHERE id = p_id;
    END delete_slot;

    PROCEDURE save_daily_log(
        p_id           IN OUT NUMBER,
        p_kitchen_id   IN NUMBER DEFAULT 1,
        p_log_date     IN DATE,
        p_solar_kwh    IN NUMBER,
        p_morning_soc  IN NUMBER,
        p_evening_soc  IN NUMBER,
        p_weather      IN VARCHAR2,
        p_operational  IN VARCHAR2 DEFAULT '1',
        p_consumed_kwh IN NUMBER DEFAULT 0,
        p_remarks      IN VARCHAR2 DEFAULT NULL
    ) IS
        v_oper CHAR(1);
    BEGIN
        spcki_validation_pkg.validate_daily_log(
            p_id => p_id, p_log_date => p_log_date, p_solar_kwh => p_solar_kwh,
            p_morning_soc => p_morning_soc, p_evening_soc => p_evening_soc,
            p_consumed_kwh => p_consumed_kwh, p_weather => p_weather
        );

        v_oper := CASE WHEN p_operational IN ('1', 'Y', 'true', 'TRUE') THEN 'Y' ELSE 'N' END;

        IF p_id IS NULL THEN
            INSERT INTO daily_technical_logs (
                client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc,
                weather, system_operational, energy_consumed_kwh, remarks, created_at
            ) VALUES (
                LOWER(SYS_GUID()), NVL(p_kitchen_id, 1), p_log_date, p_solar_kwh, p_morning_soc, p_evening_soc,
                p_weather, v_oper, NVL(p_consumed_kwh, 0), p_remarks, SYSTIMESTAMP
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE daily_technical_logs SET
                log_date = p_log_date, solar_kwh = p_solar_kwh,
                morning_soc = p_morning_soc, evening_soc = p_evening_soc,
                weather = p_weather, system_operational = v_oper,
                energy_consumed_kwh = NVL(p_consumed_kwh, 0), remarks = p_remarks
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
        p_maint_req    IN VARCHAR2 DEFAULT '0',
        p_remarks      IN VARCHAR2 DEFAULT NULL
    ) IS
        v_fuel_used NUMBER;
        v_maint CHAR(1);
    BEGIN
        spcki_validation_pkg.validate_generator_log(
            p_id => p_id, p_log_date => p_log_date, p_running_hrs => p_running_hrs,
            p_fuel_start => p_fuel_start, p_refuel => p_refuel, p_fuel_end => p_fuel_end
        );

        v_fuel_used := NVL(p_fuel_start, 0) + NVL(p_refuel, 0) - NVL(p_fuel_end, 0);
        IF v_fuel_used < 0 THEN v_fuel_used := 0; END IF;
        v_maint := CASE WHEN p_maint_req IN ('1', 'Y', 'true', 'TRUE') THEN 'Y' ELSE 'N' END;

        IF p_id IS NULL THEN
            INSERT INTO generator_logs (
                client_uuid, kitchen_id, log_date, running_hours, fuel_start_l, refuel_l,
                fuel_end_l, fuel_used_l, maintenance_required, remarks, created_at
            ) VALUES (
                LOWER(SYS_GUID()), NVL(p_kitchen_id, 1), p_log_date, p_running_hrs, p_fuel_start, NVL(p_refuel, 0),
                p_fuel_end, v_fuel_used, v_maint, p_remarks, SYSTIMESTAMP
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE generator_logs SET
                log_date = p_log_date, running_hours = p_running_hrs,
                fuel_start_l = p_fuel_start, refuel_l = NVL(p_refuel, 0),
                fuel_end_l = p_fuel_end, fuel_used_l = v_fuel_used,
                maintenance_required = v_maint, remarks = p_remarks
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
        p_backup_fuel     IN VARCHAR2 DEFAULT '0',
        p_backup_spend    IN NUMBER DEFAULT 0,
        p_willing         IN VARCHAR2 DEFAULT '1',
        p_remarks         IN VARCHAR2 DEFAULT NULL
    ) IS
        v_backup CHAR(1);
        v_will CHAR(1);
    BEGIN
        spcki_validation_pkg.validate_feedback(
            p_household_id => p_household_id, p_survey_month => p_survey_month,
            p_overall_rating => p_overall_rating, p_safety_rating => p_safety_rating,
            p_clean_rating => p_clean_rating, p_ease_rating => p_ease_rating,
            p_backup_spend => p_backup_spend
        );

        v_backup := CASE WHEN p_backup_fuel IN ('1', 'Y', 'true', 'TRUE') THEN 'Y' ELSE 'N' END;
        v_will := CASE WHEN p_willing IN ('1', 'Y', 'true', 'TRUE') THEN 'Y' ELSE 'N' END;

        IF p_id IS NULL THEN
            INSERT INTO monthly_feedback (
                client_uuid, household_id, survey_month, overall_rating,
                safety_rating, cleanliness_rating, ease_rating,
                backup_fuel_used, backup_fuel_spend, willing_to_continue,
                privacy_rating, waiting_rating, remarks, created_at
            ) VALUES (
                LOWER(SYS_GUID()), p_household_id, p_survey_month, p_overall_rating,
                p_safety_rating, p_clean_rating, p_ease_rating,
                v_backup, NVL(p_backup_spend, 0), v_will,
                5, 5, p_remarks, SYSTIMESTAMP
            ) RETURNING id INTO p_id;
        ELSE
            UPDATE monthly_feedback SET
                household_id = p_household_id, survey_month = p_survey_month,
                overall_rating = p_overall_rating, safety_rating = p_safety_rating,
                cleanliness_rating = p_clean_rating, ease_rating = p_ease_rating,
                backup_fuel_used = v_backup, backup_fuel_spend = NVL(p_backup_spend, 0),
                willing_to_continue = v_will, remarks = p_remarks
            WHERE id = p_id;
        END IF;
    END save_feedback;

    PROCEDURE delete_feedback(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM monthly_feedback WHERE id = p_id;
    END delete_feedback;

END spcki_dml_pkg;
    `);

    // -------------------------------------------------------------------------
    // 2. DEPLOY PAGE 14 (Kitchen Slot Details) - WIRED WITH SPCKI_DML_PKG
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 14 (Kitchen Slot Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31', p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065, p_default_application_id=>100,
    p_default_id_offset=>0, p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(100, 14);

  wwv_flow_api.create_page(
    p_id=>14, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Kitchen Slot Details', p_alias=>'KITCHEN-SLOT-DETAILS',
    p_page_mode=>'MODAL', p_step_title=>'Kitchen Slot Details',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_step_template=>wwv_flow_api.id(472224840776945867),
    p_dialog_chained=>'N', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id), p_plug_name=>'Slot Information',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'Y',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>10, p_plug_display_point=>'BODY',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id), p_plug_name=>'Action Buttons',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879),
    p_plug_display_sequence=>20, p_plug_display_point=>'REGION_POSITION_03',
    p_plug_source=>q'[${buttonHtml('P14_ID', 'Kitchen Slot')}]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- Items
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_ID', p_item_sequence=>10, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_display_as=>'NATIVE_HIDDEN', p_attribute_01=>'Y');
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_SLOT_DATE', p_item_sequence=>20, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Slot Date (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_SLOT_NO', p_item_sequence=>30, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Station Number (1-6)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>5, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_START_TIME', p_item_sequence=>40, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Start Time', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT '07:00' d, '07:00' r FROM dual UNION ALL SELECT '10:00', '10:00' FROM dual UNION ALL SELECT '13:00', '13:00' FROM dual UNION ALL SELECT '16:00', '16:00' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Start Time -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_END_TIME', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'End Time', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT '10:00' d, '10:00' r FROM dual UNION ALL SELECT '13:00', '13:00' FROM dual UNION ALL SELECT '16:00', '16:00' FROM dual UNION ALL SELECT '19:00', '19:00' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select End Time -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_POWER_SOURCE', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Power Source', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Solar Direct' d, 'Solar' r FROM dual UNION ALL SELECT 'Battery Storage', 'Battery' FROM dual UNION ALL SELECT 'Generator Backup', 'Generator' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Power Source -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_HOUSEHOLD_ID', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Assigned Household', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code', p_lov_display_null=>'YES', p_lov_null_text=>'- Unassigned / Open Slot -', p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_STATUS', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Slot Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Scheduled' d, 'Scheduled' r FROM dual UNION ALL SELECT 'Attended', 'Attended' FROM dual UNION ALL SELECT 'Missed', 'Missed' FROM dual UNION ALL SELECT 'Cancelled', 'Cancelled' FROM dual UNION ALL SELECT 'Swapped', 'Swapped' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_NOTE', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Notes', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>40, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P14_ID IS NOT NULL THEN
    SELECT to_char(slot_date, 'YYYY-MM-DD'), slot_no, start_time, end_time,
           power_source, household_id, status, note
    INTO :P14_SLOT_DATE, :P14_SLOT_NO, :P14_START_TIME, :P14_END_TIME,
         :P14_POWER_SOURCE, :P14_HOUSEHOLD_ID, :P14_STATUS, :P14_NOTE
    FROM slots WHERE id = :P14_ID;
  ELSE
    :P14_SLOT_DATE := to_char(SYSDATE, 'YYYY-MM-DD'); :P14_SLOT_NO := 1;
    :P14_START_TIME := '07:00'; :P14_END_TIME := '10:00';
    :P14_POWER_SOURCE := 'Solar'; :P14_STATUS := 'Scheduled';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
DECLARE
  l_id NUMBER := TO_NUMBER(:P14_ID);
BEGIN
  IF :REQUEST = 'DELETE' THEN
    spcki_dml_pkg.delete_slot(l_id);
  ELSIF :REQUEST IN ('CREATE', 'SAVE') THEN
    spcki_dml_pkg.save_slot(
      p_id           => l_id,
      p_kitchen_id   => 1,
      p_slot_date    => TO_DATE(:P14_SLOT_DATE, 'YYYY-MM-DD'),
      p_slot_no      => TO_NUMBER(:P14_SLOT_NO),
      p_start_time   => :P14_START_TIME,
      p_end_time     => :P14_END_TIME,
      p_power_source => :P14_POWER_SOURCE,
      p_household_id => TO_NUMBER(:P14_HOUSEHOLD_ID),
      p_status       => :P14_STATUS,
      p_note         => :P14_NOTE
    );
    :P14_ID := l_id;
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 3. DEPLOY PAGE 15 (Daily Technical Logs) - WIRED WITH SPCKI_DML_PKG
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 15 (Daily Technical Log Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31', p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065, p_default_application_id=>100,
    p_default_id_offset=>0, p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(100, 15);

  wwv_flow_api.create_page(
    p_id=>15, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Daily Technical Log Details', p_alias=>'DAILY-LOG-DETAILS',
    p_page_mode=>'MODAL', p_step_title=>'Daily Technical Log Details',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_step_template=>wwv_flow_api.id(472224840776945867),
    p_dialog_chained=>'N', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id), p_plug_name=>'Solar & Technical Data',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'Y',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>10, p_plug_display_point=>'BODY',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id), p_plug_name=>'Action Buttons',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879),
    p_plug_display_sequence=>20, p_plug_display_point=>'REGION_POSITION_03',
    p_plug_source=>q'[${buttonHtml('P15_ID', 'Daily Technical Log')}]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- Items
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_ID', p_item_sequence=>10, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_display_as=>'NATIVE_HIDDEN', p_attribute_01=>'Y');
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_LOG_DATE', p_item_sequence=>20, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Log Date (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_SOLAR_KWH', p_item_sequence=>30, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Solar Generation (kWh)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>12, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_MORNING_SOC', p_item_sequence=>40, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Morning Battery SOC (%)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>8, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_EVENING_SOC', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Evening Battery SOC (%)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>8, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_WEATHER', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Weather Condition', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Sunny' d, 'Sunny' r FROM dual UNION ALL SELECT 'Partly cloudy', 'Partly cloudy' FROM dual UNION ALL SELECT 'Overcast', 'Overcast' FROM dual UNION ALL SELECT 'Rainy', 'Rainy' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Weather -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_SYSTEM_OPERATIONAL', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Operational Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Yes - 100% Operational' d, '1' r FROM dual UNION ALL SELECT 'No - System Fault', '0' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_ENERGY_CONSUMED_KWH', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Energy Consumed (kWh)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>12, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_REMARKS', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Remarks / Inverter Diagnostics', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P15_ID IS NOT NULL THEN
    SELECT to_char(log_date, 'YYYY-MM-DD'), solar_kwh, morning_soc, evening_soc,
           weather, CASE WHEN system_operational = 'Y' THEN '1' ELSE '0' END,
           energy_consumed_kwh, remarks
    INTO :P15_LOG_DATE, :P15_SOLAR_KWH, :P15_MORNING_SOC, :P15_EVENING_SOC,
         :P15_WEATHER, :P15_SYSTEM_OPERATIONAL, :P15_ENERGY_CONSUMED_KWH, :P15_REMARKS
    FROM daily_technical_logs WHERE id = :P15_ID;
  ELSE
    :P15_LOG_DATE := to_char(SYSDATE, 'YYYY-MM-DD'); :P15_SOLAR_KWH := 16.5;
    :P15_MORNING_SOC := 75; :P15_EVENING_SOC := 95; :P15_WEATHER := 'Sunny';
    :P15_SYSTEM_OPERATIONAL := '1'; :P15_ENERGY_CONSUMED_KWH := 11.2;
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
DECLARE
  l_id NUMBER := TO_NUMBER(:P15_ID);
BEGIN
  IF :REQUEST = 'DELETE' THEN
    spcki_dml_pkg.delete_daily_log(l_id);
  ELSIF :REQUEST IN ('CREATE', 'SAVE') THEN
    spcki_dml_pkg.save_daily_log(
      p_id           => l_id,
      p_kitchen_id   => 1,
      p_log_date     => TO_DATE(:P15_LOG_DATE, 'YYYY-MM-DD'),
      p_solar_kwh    => TO_NUMBER(:P15_SOLAR_KWH),
      p_morning_soc  => TO_NUMBER(:P15_MORNING_SOC),
      p_evening_soc  => TO_NUMBER(:P15_EVENING_SOC),
      p_weather      => :P15_WEATHER,
      p_operational  => :P15_SYSTEM_OPERATIONAL,
      p_consumed_kwh => TO_NUMBER(:P15_ENERGY_CONSUMED_KWH),
      p_remarks      => :P15_REMARKS
    );
    :P15_ID := l_id;
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 4. DEPLOY PAGE 16 (Generator Logs) - WIRED WITH SPCKI_DML_PKG
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 16 (Generator Log Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31', p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065, p_default_application_id=>100,
    p_default_id_offset=>0, p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(100, 16);

  wwv_flow_api.create_page(
    p_id=>16, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Generator Log Details', p_alias=>'GENERATOR-LOG-DETAILS',
    p_page_mode=>'MODAL', p_step_title=>'Generator Run Log Details',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_step_template=>wwv_flow_api.id(472224840776945867),
    p_dialog_chained=>'N', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id), p_plug_name=>'Generator Operation Details',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'Y',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>10, p_plug_display_point=>'BODY',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id), p_plug_name=>'Action Buttons',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879),
    p_plug_display_sequence=>20, p_plug_display_point=>'REGION_POSITION_03',
    p_plug_source=>q'[${buttonHtml('P16_ID', 'Generator Run')}]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- Items
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_ID', p_item_sequence=>10, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_display_as=>'NATIVE_HIDDEN', p_attribute_01=>'Y');
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_LOG_DATE', p_item_sequence=>20, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Run Date (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_RUNNING_HOURS', p_item_sequence=>30, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Running Hours', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>8, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_FUEL_START_L', p_item_sequence=>40, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Fuel Before Run (Litres)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_REFUEL_L', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Refueled (Litres)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_FUEL_END_L', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Fuel After Run (Litres)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_MAINTENANCE_REQUIRED', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Maintenance Required', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'No' d, '0' r FROM dual UNION ALL SELECT 'Yes', '1' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select -', p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_REMARKS', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Operator Remarks / Reason', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P16_ID IS NOT NULL THEN
    SELECT to_char(log_date, 'YYYY-MM-DD'), running_hours, fuel_start_l,
           refuel_l, fuel_end_l, CASE WHEN maintenance_required = 'Y' THEN '1' ELSE '0' END, remarks
    INTO :P16_LOG_DATE, :P16_RUNNING_HOURS, :P16_FUEL_START_L,
         :P16_REFUEL_L, :P16_FUEL_END_L, :P16_MAINTENANCE_REQUIRED, :P16_REMARKS
    FROM generator_logs WHERE id = :P16_ID;
  ELSE
    :P16_LOG_DATE := to_char(SYSDATE, 'YYYY-MM-DD'); :P16_RUNNING_HOURS := 2.0;
    :P16_FUEL_START_L := 25.0; :P16_REFUEL_L := 0; :P16_FUEL_END_L := 22.5;
    :P16_MAINTENANCE_REQUIRED := '0';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
DECLARE
  l_id NUMBER := TO_NUMBER(:P16_ID);
BEGIN
  IF :REQUEST = 'DELETE' THEN
    spcki_dml_pkg.delete_generator_log(l_id);
  ELSIF :REQUEST IN ('CREATE', 'SAVE') THEN
    spcki_dml_pkg.save_generator_log(
      p_id          => l_id,
      p_kitchen_id  => 1,
      p_log_date    => TO_DATE(:P16_LOG_DATE, 'YYYY-MM-DD'),
      p_running_hrs => TO_NUMBER(:P16_RUNNING_HOURS),
      p_fuel_start  => TO_NUMBER(:P16_FUEL_START_L),
      p_refuel      => NVL(TO_NUMBER(:P16_REFUEL_L), 0),
      p_fuel_end    => TO_NUMBER(:P16_FUEL_END_L),
      p_maint_req   => :P16_MAINTENANCE_REQUIRED,
      p_remarks     => :P16_REMARKS
    );
    :P16_ID := l_id;
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 5. DEPLOY PAGE 17 (Monthly Feedback) - WIRED WITH SPCKI_DML_PKG
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 17 (Monthly Feedback Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31', p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065, p_default_application_id=>100,
    p_default_id_offset=>0, p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(100, 17);

  wwv_flow_api.create_page(
    p_id=>17, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Monthly Feedback Details', p_alias=>'FEEDBACK-DETAILS',
    p_page_mode=>'MODAL', p_step_title=>'Household Survey & Feedback Details',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_step_template=>wwv_flow_api.id(472224840776945867),
    p_dialog_chained=>'N', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id), p_plug_name=>'Household Satisfaction Survey',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'Y',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>10, p_plug_display_point=>'BODY',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id), p_plug_name=>'Action Buttons',
    p_region_template_options=>'#DEFAULT#', p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879),
    p_plug_display_sequence=>20, p_plug_display_point=>'REGION_POSITION_03',
    p_plug_source=>q'[${buttonHtml('P17_ID', 'Feedback')}]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- Items
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_ID', p_item_sequence=>10, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_display_as=>'NATIVE_HIDDEN', p_attribute_01=>'Y');
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_SURVEY_MONTH', p_item_sequence=>20, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Survey Month (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_HOUSEHOLD_ID', p_item_sequence=>30, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Household', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Household -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_OVERALL_RATING', p_item_sequence=>40, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Overall Satisfaction', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT '5 - Highly Satisfied (5 Stars)' d, 5 r FROM dual UNION ALL SELECT '4 - Satisfied (4 Stars)', 4 FROM dual UNION ALL SELECT '3 - Neutral', 3 FROM dual UNION ALL SELECT '2 - Dissatisfied', 2 FROM dual UNION ALL SELECT '1 - Very Dissatisfied', 1 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Rating -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_SAFETY_RATING', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Safety Perception', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT '5 - Extremely Safe' d, 5 r FROM dual UNION ALL SELECT '4 - Safe', 4 FROM dual UNION ALL SELECT '3 - Neutral', 3 FROM dual UNION ALL SELECT '2 - Unsafe', 2 FROM dual UNION ALL SELECT '1 - Very Unsafe', 1 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Rating -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_CLEANLINESS_RATING', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Cleanliness & Hygiene', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT '5 - Spotless' d, 5 r FROM dual UNION ALL SELECT '4 - Very Clean', 4 FROM dual UNION ALL SELECT '3 - Acceptable', 3 FROM dual UNION ALL SELECT '2 - Poor', 2 FROM dual UNION ALL SELECT '1 - Unhygienic', 1 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Rating -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_EASE_RATING', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Ease of Electric Cooking', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT '5 - Very Intuitive & Fast' d, 5 r FROM dual UNION ALL SELECT '4 - Easy', 4 FROM dual UNION ALL SELECT '3 - Moderate', 3 FROM dual UNION ALL SELECT '2 - Difficult', 2 FROM dual UNION ALL SELECT '1 - Very Difficult', 1 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Rating -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_BACKUP_FUEL_USED', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Did you use Traditional Backup Fuel?', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'No - 100% Communal Kitchen' d, '0' r FROM dual UNION ALL SELECT 'Yes - Used Firewood/Charcoal', '1' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_BACKUP_FUEL_SPEND', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Backup Fuel Spend (BDT)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_WILLING_TO_CONTINUE', p_item_sequence=>100, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Willing to Continue Pilot?', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Yes - Unanimously' d, '1' r FROM dual UNION ALL SELECT 'No', '0' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_REMARKS', p_item_sequence=>110, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Household Comments & Testimonial', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P17_ID IS NOT NULL THEN
    SELECT to_char(survey_month, 'YYYY-MM-DD'), household_id, overall_rating,
           safety_rating, cleanliness_rating, ease_rating,
           CASE WHEN backup_fuel_used = 'Y' THEN '1' ELSE '0' END,
           backup_fuel_spend,
           CASE WHEN willing_to_continue = 'Y' THEN '1' ELSE '0' END,
           remarks
    INTO :P17_SURVEY_MONTH, :P17_HOUSEHOLD_ID, :P17_OVERALL_RATING,
         :P17_SAFETY_RATING, :P17_CLEANLINESS_RATING, :P17_EASE_RATING, :P17_BACKUP_FUEL_USED,
         :P17_BACKUP_FUEL_SPEND, :P17_WILLING_TO_CONTINUE, :P17_REMARKS
    FROM monthly_feedback WHERE id = :P17_ID;
  ELSE
    :P17_SURVEY_MONTH := to_char(TRUNC(SYSDATE, 'MM'), 'YYYY-MM-DD');
    :P17_OVERALL_RATING := 5; :P17_SAFETY_RATING := 5; :P17_CLEANLINESS_RATING := 5; :P17_EASE_RATING := 5;
    :P17_BACKUP_FUEL_USED := '0'; :P17_BACKUP_FUEL_SPEND := 0; :P17_WILLING_TO_CONTINUE := '1';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
DECLARE
  l_id NUMBER := TO_NUMBER(:P17_ID);
BEGIN
  IF :REQUEST = 'DELETE' THEN
    spcki_dml_pkg.delete_feedback(l_id);
  ELSIF :REQUEST IN ('CREATE', 'SAVE') THEN
    spcki_dml_pkg.save_feedback(
      p_id             => l_id,
      p_survey_month   => TO_DATE(:P17_SURVEY_MONTH, 'YYYY-MM-DD'),
      p_household_id   => TO_NUMBER(:P17_HOUSEHOLD_ID),
      p_overall_rating => TO_NUMBER(:P17_OVERALL_RATING),
      p_safety_rating  => TO_NUMBER(:P17_SAFETY_RATING),
      p_clean_rating   => TO_NUMBER(:P17_CLEANLINESS_RATING),
      p_ease_rating    => TO_NUMBER(:P17_EASE_RATING),
      p_backup_fuel    => :P17_BACKUP_FUEL_USED,
      p_backup_spend   => NVL(TO_NUMBER(:P17_BACKUP_FUEL_SPEND), 0),
      p_willing        => :P17_WILLING_TO_CONTINUE,
      p_remarks        => :P17_REMARKS
    );
    :P17_ID := l_id;
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog'
  );

  COMMIT;
END;
    `);

    console.log('\n===========================================================');
    console.log('🎉 ALL MODAL FORMS (12-17) AND SPCKI_DML_PKG DEPLOYED! 🎉');
    console.log('===========================================================');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
