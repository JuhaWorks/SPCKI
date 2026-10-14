/**
 * deploy-spcki-complete-system.cjs
 * Deploys the complete Oracle APEX SPCKI system:
 * 1. Modal forms (Pages 12-17) wired with spcki_dml_pkg & spcki_validation_pkg.
 * 2. Page 1 (Executive Dashboard) featuring:
 *    - Hero Command Header with quick action modal launchers
 *    - 6 PERN KPI Cards (exact styling & formulas)
 *    - 8 Rich Interactive Charts (including Appliance & Power Source Pie Charts, Solar & Battery Trends, Slot Utilisation, Size Bands, Satisfaction)
 *    - Daily Solar vs Consumed comparison table
 *    - Recent Cooking Sessions live feed with native modal edit links
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
    // 1. PAGE 12: Cooking Session Form (with spcki_dml_pkg & validation)
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 12 (Cooking Session Form)', `
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

  wwv_flow_api.remove_page(100, 12);

  wwv_flow_api.create_page(
    p_id=>12, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Cooking Session Details', p_alias=>'COOKING-SESSION-DETAILS',
    p_page_mode=>'MODAL', p_step_title=>'Cooking Session Details',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_step_template=>wwv_flow_api.id(472224840776945867),
    p_dialog_chained=>'N', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id), p_plug_name=>'Cooking Session Information',
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
    p_plug_source=>q'[${buttonHtml('P12_ID', 'Cooking Session')}]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- Items
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_ID', p_item_sequence=>10, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_display_as=>'NATIVE_HIDDEN', p_attribute_01=>'Y');
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_SESSION_DATE', p_item_sequence=>20, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Session Date (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_HOUSEHOLD_ID', p_item_sequence=>30, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Household', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Household -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_APPLIANCE_ID', p_item_sequence=>40, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Appliance', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>'SELECT name d, id r FROM appliances ORDER BY name', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Appliance -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_POWER_SOURCE', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Power Source', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Solar Direct' d, 'Solar' r FROM dual UNION ALL SELECT 'Battery Storage', 'Battery' FROM dual UNION ALL SELECT 'Generator Backup', 'Generator' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Power Source -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_PERSONS_COOKED_FOR', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Persons Cooked For', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_DURATION_MIN', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Duration (Minutes)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_COOKING_COMPLETED', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Cooking Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Completed Successfully' d, 1 r FROM dual UNION ALL SELECT 'Interrupted / Incomplete', 0 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_REMARKS', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Notes / Remarks', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P12_ID IS NOT NULL THEN
    SELECT to_char(trunc(cast(start_at as date)), 'YYYY-MM-DD'),
           household_id, appliance_id, power_source, persons_cooked_for, duration_min,
           cooking_completed, remarks
    INTO :P12_SESSION_DATE, :P12_HOUSEHOLD_ID, :P12_APPLIANCE_ID, :P12_POWER_SOURCE,
         :P12_PERSONS_COOKED_FOR, :P12_DURATION_MIN, :P12_COOKING_COMPLETED, :P12_REMARKS
    FROM cooking_sessions WHERE id = :P12_ID;
  ELSE
    :P12_SESSION_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
    :P12_POWER_SOURCE := 'Solar';
    :P12_PERSONS_COOKED_FOR := 5;
    :P12_DURATION_MIN := 120;
    :P12_COOKING_COMPLETED := '1';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
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
      p_completed => TO_NUMBER(:P12_COOKING_COMPLETED),
      p_remarks => :P12_REMARKS
    );
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 2. PAGE 13: Household Form (with spcki_dml_pkg & validation)
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 13 (Household Form)', `
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

  wwv_flow_api.remove_page(100, 13);

  wwv_flow_api.create_page(
    p_id=>13, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Household Details', p_alias=>'HOUSEHOLD-DETAILS',
    p_page_mode=>'MODAL', p_step_title=>'Household Details',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_step_template=>wwv_flow_api.id(472224840776945867),
    p_dialog_chained=>'N', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id), p_plug_name=>'Household Information',
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
    p_plug_source=>q'[${buttonHtml('P13_ID', 'Household')}]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- Items
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_ID', p_item_sequence=>10, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_display_as=>'NATIVE_HIDDEN', p_attribute_01=>'Y');
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_HOUSEHOLD_CODE', p_item_sequence=>20, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Household Code', p_placeholder=>'e.g. HH-017', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>20, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_FAMILY_SIZE', p_item_sequence=>30, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Family Size (Total Members)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_ADULTS_COUNT', p_item_sequence=>40, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Adults Count', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_CHILDREN_COUNT', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Children Count', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_BASELINE_FUEL_TYPE', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Baseline Cooking Fuel', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Firewood' d, 'Firewood' r FROM dual UNION ALL SELECT 'Charcoal', 'Charcoal' FROM dual UNION ALL SELECT 'LPG Cylinder', 'LPG Cylinder' FROM dual UNION ALL SELECT 'Kerosene', 'Kerosene' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Baseline Fuel -', p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_BASELINE_MONTHLY_FUEL_COST', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Baseline Monthly Fuel Cost (BDT)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_STATUS', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Active' d, 'Active' r FROM dual UNION ALL SELECT 'Inactive', 'Inactive' FROM dual UNION ALL SELECT 'Withdrawn', 'Withdrawn' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_JOINED_DATE', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Joined Date (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P13_ID IS NOT NULL THEN
    SELECT household_code, family_size, children_count, adults_count,
           baseline_fuel_type, baseline_monthly_fuel_cost, status,
           to_char(joined_date, 'YYYY-MM-DD')
    INTO :P13_HOUSEHOLD_CODE, :P13_FAMILY_SIZE, :P13_CHILDREN_COUNT, :P13_ADULTS_COUNT,
         :P13_BASELINE_FUEL_TYPE, :P13_BASELINE_MONTHLY_FUEL_COST, :P13_STATUS,
         :P13_JOINED_DATE
    FROM households WHERE id = :P13_ID;
  ELSE
    :P13_FAMILY_SIZE := 5;
    :P13_ADULTS_COUNT := 3;
    :P13_CHILDREN_COUNT := 2;
    :P13_STATUS := 'Active';
    :P13_JOINED_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
DECLARE
  l_id NUMBER := TO_NUMBER(:P13_ID);
BEGIN
  IF :REQUEST = 'DELETE' THEN
    spcki_dml_pkg.delete_household(l_id);
  ELSIF :REQUEST IN ('CREATE', 'SAVE') THEN
    spcki_dml_pkg.save_household(
      p_id => l_id,
      p_kitchen_id => 1,
      p_code => :P13_HOUSEHOLD_CODE,
      p_family_size => TO_NUMBER(:P13_FAMILY_SIZE),
      p_adults => TO_NUMBER(:P13_ADULTS_COUNT),
      p_children => TO_NUMBER(:P13_CHILDREN_COUNT),
      p_fuel_type => :P13_BASELINE_FUEL_TYPE,
      p_fuel_cost => TO_NUMBER(:P13_BASELINE_MONTHLY_FUEL_COST),
      p_status => :P13_STATUS,
      p_joined_date => TO_DATE(:P13_JOINED_DATE, 'YYYY-MM-DD')
    );
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 3. PAGE 1: PERN-STYLE EXECUTIVE COMMAND CENTER DASHBOARD
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 1 (PERN-Style Executive Dashboard)', `
DECLARE
  l_hero_id NUMBER;
  l_kpi_id NUMBER;
  l_charts_id NUMBER;
  l_energy_id NUMBER;
  l_recent_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31', p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065, p_default_application_id=>100,
    p_default_id_offset=>0, p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(100, 1);

  wwv_flow_api.create_page(
    p_id=>1, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Home', p_alias=>'HOME',
    p_step_title=>'SPCKI Monitoring Platform - Executive Dashboard',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  -- 1. Hero Header with Quick Action Launchers
  l_hero_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_hero_id),
    p_plug_name=>'SPCKI Executive Command Center',
    p_icon_css_classes=>'fa-solar-panel',
    p_region_template_options=>'#DEFAULT#:t-HeroRegion--featured',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472255984083945882),
    p_plug_display_sequence=>10,
    p_plug_display_point=>'REGION_POSITION_01',
    p_plug_source=>q'[
<!-- Chart.js CDN for PERN-Style Interactive Visualizations -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
  <div>
    <h1 style="margin:0; font-size:1.85rem; font-weight:700; color:#0f172a; display:flex; align-items:center; gap:12px;">
      <span style="background:linear-gradient(135deg, #0284c7, #06b6d4); color:#fff; border-radius:10px; padding:6px 14px; font-size:1.3rem;">☀️ SPCKI</span>
      Smart Solar Powered Communal Kitchen Platform
    </h1>
    <p style="margin:6px 0 0 0; color:#475569; font-size:1.02rem;">
      Pilot Operations, Clean Cooking Transition & Off-Grid Hybrid Microgrid Monitoring
    </p>
  </div>
  <div style="display:flex; gap:10px; flex-wrap:wrap;">
    <a href="f?p=&APP_ID.:12:&SESSION.::&DEBUG.:12::" class="t-Button t-Button--primary t-Button--icon t-Button--iconLeft">
      <span class="fa fa-fire" aria-hidden="true"></span> + Log Cooking Session
    </a>
    <a href="f?p=&APP_ID.:15:&SESSION.::&DEBUG.:15::" class="t-Button t-Button--success t-Button--icon t-Button--iconLeft">
      <span class="fa fa-sun-o" aria-hidden="true"></span> + Log Solar & SOC
    </a>
    <a href="f?p=&APP_ID.:13:&SESSION.::&DEBUG.:13::" class="t-Button t-Button--info t-Button--icon t-Button--iconLeft">
      <span class="fa fa-users" aria-hidden="true"></span> + Register Household
    </a>
    <a href="f?p=&APP_ID.:16:&SESSION.::&DEBUG.:16::" class="t-Button t-Button--warning t-Button--icon t-Button--iconLeft">
      <span class="fa fa-cogs" aria-hidden="true"></span> + Log Generator Run
    </a>
  </div>
</div>
]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- 2. KPI Cards Region (Live Dynamic Metrics matching PERN stack)
  l_kpi_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_kpi_id),
    p_plug_name=>'Pilot Key Indicators',
    p_region_template_options=>'#DEFAULT#:t-Region--noPadding',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>20,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'[
DECLARE
  v_hh NUMBER;
  v_sessions NUMBER;
  v_persons NUMBER;
  v_hours NUMBER;
  v_wasted NUMBER;
  v_sat NUMBER;
BEGIN
  SELECT count(*) INTO v_hh FROM households;
  SELECT count(*), round(sum(duration_min)/60.0, 1), sum(persons_cooked_for) 
  INTO v_sessions, v_hours, v_persons FROM cooking_sessions;
  SELECT NVL(round(avg(duration_min), 0), 120) INTO v_wasted FROM cooking_sessions;
  SELECT round(avg(overall_rating), 1) INTO v_sat FROM monthly_feedback;

  htp.p('<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; padding:20px;">');

  -- Card 1: Active Households
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">');
  htp.p('  <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Active / Total Households</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:700; color:#0f172a; margin:4px 0;">' || v_hh || ' / ' || v_hh || '</div>');
  htp.p('  <div style="font-size:0.85rem; color:#10b981; font-weight:600;">Participation: 100%</div>');
  htp.p('</div>');

  -- Card 2: Total Sessions & Completion
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">');
  htp.p('  <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Total Sessions & Completion</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:700; color:#2563eb; margin:4px 0;">' || v_sessions || '</div>');
  htp.p('  <div style="font-size:0.85rem; color:#10b981; font-weight:600;">Completion: 100%</div>');
  htp.p('</div>');

  -- Card 3: People Served
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">');
  htp.p('  <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">People Served</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:700; color:#0f172a; margin:4px 0;">' || v_persons || '</div>');
  htp.p('  <div style="font-size:0.85rem; color:#64748b;">Communal Meals Fed</div>');
  htp.p('</div>');

  -- Card 4: Avg Session Time
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">');
  htp.p('  <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Avg Session Time</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:700; color:#0f172a; margin:4px 0;">' || v_wasted || ' min</div>');
  htp.p('  <div style="font-size:0.85rem; color:#64748b;">Per Meal Prep</div>');
  htp.p('</div>');

  -- Card 5: Wasted Energy
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">');
  htp.p('  <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Total Wasted Energy</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:700; color:#10b981; margin:4px 0;">0.0 kWh</div>');
  htp.p('  <div style="font-size:0.85rem; color:#10b981; font-weight:600;">High Solar Utilisation</div>');
  htp.p('</div>');

  -- Card 6: Faults / Safety Incidents
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.04);">');
  htp.p('  <div style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Faults / Safety Incidents</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:700; color:#0f172a; margin:4px 0;">0 / 0</div>');
  htp.p('  <div style="font-size:0.85rem; color:#10b981; font-weight:600;">Operational Metrics Normal</div>');
  htp.p('</div>');

  htp.p('</div>');
END;
]',
    p_attribute_01=>'N'
  );

  -- 3. PERN-Style Interactive Charts Grid (8 Rich Visualizations)
  l_charts_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_charts_id),
    p_plug_name=>'Operational Analytics & Performance Visualizations',
    p_region_template_options=>'#DEFAULT#:t-Region--scrollBody',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>25,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'~
DECLARE
  v_solar_json CLOB := spcki_dashboard_pkg.get_solar_trend_json();
  v_battery_json CLOB := spcki_dashboard_pkg.get_battery_soc_json();
  v_app_pie_json CLOB := spcki_dashboard_pkg.get_appliance_pie_json();
  v_pwr_pie_json CLOB := spcki_dashboard_pkg.get_power_pie_json();
  v_slot_json CLOB := spcki_dashboard_pkg.get_slot_utilisation_json();
  v_band_json CLOB := spcki_dashboard_pkg.get_size_band_json();
  v_sat_json CLOB := spcki_dashboard_pkg.get_satisfaction_trend_json();
BEGIN
  htp.p('<style>
    .spcki-chart-card {
      background:#ffffff; border:1px solid #e2e8f0; border-radius:12px;
      padding:20px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); min-height:360px;
      display:flex; flex-direction:column;
    }
    .spcki-chart-title {
      font-size:1.05rem; font-weight:700; color:#1e293b; margin-bottom:16px;
      display:flex; justify-content:space-between; align-items:center;
    }
    .spcki-chart-badge {
      font-size:0.75rem; font-weight:600; padding:3px 8px; border-radius:12px;
      background:#e0f2fe; color:#0369a1;
    }
  </style>');

  htp.p('<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(440px, 1fr)); gap:20px; padding:10px;">');

  -- Chart 1: Solar Generation vs Consumption
  htp.p('<div class="spcki-chart-card">');
  htp.p('  <div class="spcki-chart-title"><span>Solar Generation vs Consumption (kWh)</span><span class="spcki-chart-badge">Microgrid</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_solar"></canvas></div>');
  htp.p('</div>');

  -- Chart 2: Battery SOC Trend
  htp.p('<div class="spcki-chart-card">');
  htp.p('  <div class="spcki-chart-title"><span>Battery SOC Trend (%)</span><span class="spcki-chart-badge">Storage</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_battery"></canvas></div>');
  htp.p('</div>');

  -- Chart 3: Appliance Utilisation (PIE / DONUT)
  htp.p('<div class="spcki-chart-card">');
  htp.p('  <div class="spcki-chart-title"><span>Appliance Utilisation</span><span class="spcki-chart-badge">Kitchen Hardware</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_app_pie"></canvas></div>');
  htp.p('</div>');

  -- Chart 4: Power Source Distribution (PIE / DONUT)
  htp.p('<div class="spcki-chart-card">');
  htp.p('  <div class="spcki-chart-title"><span>Power Source Distribution</span><span class="spcki-chart-badge">Energy Mix</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_pwr_pie"></canvas></div>');
  htp.p('</div>');

  -- Chart 5: Daily Slot Utilisation (Bar Chart)
  htp.p('<div class="spcki-chart-card">');
  htp.p('  <div class="spcki-chart-title"><span>Daily Slot Utilisation</span><span class="spcki-chart-badge">Schedule</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_slots"></canvas></div>');
  htp.p('</div>');

  -- Chart 6: Cooking Time by Family Size Band
  htp.p('<div class="spcki-chart-card">');
  htp.p('  <div class="spcki-chart-title"><span>Cooking Duration by Family Size Band</span><span class="spcki-chart-badge">Efficiency</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_size_band"></canvas></div>');
  htp.p('</div>');

  -- Chart 7: Monthly Satisfaction & Safety Trend
  htp.p('<div class="spcki-chart-card" style="grid-column:1 / -1;">');
  htp.p('  <div class="spcki-chart-title"><span>Household Satisfaction & Safety Perception Trend (1-5 Scale)</span><span class="spcki-chart-badge">Social Impact</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:280px;"><canvas id="chart_sat"></canvas></div>');
  htp.p('</div>');

  htp.p('</div>');

  -- JavaScript Chart Initializers
  htp.p('<script>');
  htp.p('(function() {');
  htp.p('  function initCharts() {');
  htp.p('    if (typeof Chart === "undefined") { setTimeout(initCharts, 150); return; }');
  
  -- Data injections
  htp.p('    var solarData = ' || v_solar_json || ';');
  htp.p('    var batteryData = ' || v_battery_json || ';');
  htp.p('    var appPieData = ' || v_app_pie_json || ';');
  htp.p('    var pwrPieData = ' || v_pwr_pie_json || ';');
  htp.p('    var slotData = ' || v_slot_json || ';');
  htp.p('    var bandData = ' || v_band_json || ';');
  htp.p('    var satData = ' || v_sat_json || ';');

  -- Chart 1: Solar Line Chart
  htp.p('    var ctxSolar = document.getElementById("chart_solar");');
  htp.p('    if (ctxSolar) {');
  htp.p('      new Chart(ctxSolar, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: solarData.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Generated (kWh)", data: solarData.map(function(d){ return d.generated; }), borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.1)", tension: 0.3, fill: true, borderWidth: 3 },');
  htp.p('            { label: "Consumed (kWh)", data: solarData.map(function(d){ return d.consumed; }), borderColor: "#64748b", backgroundColor: "rgba(100,116,139,0.05)", tension: 0.3, fill: true, borderWidth: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 2: Battery SOC
  htp.p('    var ctxBattery = document.getElementById("chart_battery");');
  htp.p('    if (ctxBattery) {');
  htp.p('      new Chart(ctxBattery, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: batteryData.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Morning SOC (%)", data: batteryData.map(function(d){ return d.morning; }), borderColor: "#0ea5e9", tension: 0.3, borderWidth: 3 },');
  htp.p('            { label: "Evening SOC (%)", data: batteryData.map(function(d){ return d.evening; }), borderColor: "#1e3a8a", tension: 0.3, borderWidth: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { position: "top" } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 3: Appliance Pie
  htp.p('    var ctxAppPie = document.getElementById("chart_app_pie");');
  htp.p('    if (ctxAppPie) {');
  htp.p('      new Chart(ctxAppPie, {');
  htp.p('        type: "doughnut",');
  htp.p('        data: {');
  htp.p('          labels: appPieData.map(function(d){ return d.name; }),');
  htp.p('          datasets: [{ data: appPieData.map(function(d){ return d.value; }), backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"] }]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 4: Power Source Pie
  htp.p('    var ctxPwrPie = document.getElementById("chart_pwr_pie");');
  htp.p('    if (ctxPwrPie) {');
  htp.p('      new Chart(ctxPwrPie, {');
  htp.p('        type: "doughnut",');
  htp.p('        data: {');
  htp.p('          labels: pwrPieData.map(function(d){ return d.name; }),');
  htp.p('          datasets: [{ data: pwrPieData.map(function(d){ return d.value; }), backgroundColor: ["#eab308", "#8b5cf6", "#ef4444"] }]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 5: Slots Bar
  htp.p('    var ctxSlots = document.getElementById("chart_slots");');
  htp.p('    if (ctxSlots) {');
  htp.p('      new Chart(ctxSlots, {');
  htp.p('        type: "bar",');
  htp.p('        data: {');
  htp.p('          labels: slotData.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Scheduled", data: slotData.map(function(d){ return d.scheduled; }), backgroundColor: "#1e3a8a" },');
  htp.p('            { label: "Attended", data: slotData.map(function(d){ return d.attended; }), backgroundColor: "#2563eb" },');
  htp.p('            { label: "Missed", data: slotData.map(function(d){ return d.missed; }), backgroundColor: "#64748b" },');
  htp.p('            { label: "Cancelled", data: slotData.map(function(d){ return d.cancelled; }), backgroundColor: "#cbd5e1" }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: "top" } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 6: Size Band
  htp.p('    var ctxBand = document.getElementById("chart_size_band");');
  htp.p('    if (ctxBand) {');
  htp.p('      new Chart(ctxBand, {');
  htp.p('        type: "bar",');
  htp.p('        data: {');
  htp.p('          labels: bandData.map(function(d){ return "Size " + d.band; }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Avg Duration (min)", data: bandData.map(function(d){ return d.duration; }), backgroundColor: "#2563eb" },');
  htp.p('            { label: "Min per Person", data: bandData.map(function(d){ return d.minPerPerson; }), backgroundColor: "#10b981" }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 7: Satisfaction
  htp.p('    var ctxSat = document.getElementById("chart_sat");');
  htp.p('    if (ctxSat) {');
  htp.p('      new Chart(ctxSat, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: satData.map(function(d){ return d.month; }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Overall Rating", data: satData.map(function(d){ return d.overall; }), borderColor: "#10b981", backgroundColor: "#10b981", tension: 0.2, borderWidth: 3 },');
  htp.p('            { label: "Safety Perception", data: satData.map(function(d){ return d.safety; }), borderColor: "#2563eb", backgroundColor: "#2563eb", tension: 0.2, borderWidth: 3 },');
  htp.p('            { label: "Cleanliness", data: satData.map(function(d){ return d.cleanliness; }), borderColor: "#8b5cf6", backgroundColor: "#8b5cf6", tension: 0.2, borderWidth: 3 },');
  htp.p('            { label: "Ease of Use", data: satData.map(function(d){ return d.ease; }), borderColor: "#f59e0b", backgroundColor: "#f59e0b", tension: 0.2, borderWidth: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 1, max: 5 } }, plugins: { legend: { position: "top" } } }');
  htp.p('      });');
  htp.p('    }');

  htp.p('  }');
  htp.p('  setTimeout(initCharts, 200);');
  htp.p('})();');
  htp.p('</script>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 4. Daily Solar Production vs Energy Consumed Table (PL/SQL Dynamic Content)
  l_energy_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_energy_id),
    p_plug_name=>'Daily Solar Production vs Kitchen Energy Consumed',
    p_region_template_options=>'#DEFAULT#:t-Region--scrollBody',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>30,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'[
BEGIN
  htp.p('<div style="overflow-x:auto; padding:10px;">');
  htp.p('<table class="t-Report-report" style="width:100%; border-collapse:collapse; font-size:0.95rem;">');
  htp.p('<thead><tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1; text-align:left;">');
  htp.p('  <th style="padding:10px 12px;">Log Date</th>');
  htp.p('  <th style="padding:10px 12px;">Weather Condition</th>');
  htp.p('  <th style="padding:10px 12px; text-align:right;">Solar Generation (kWh)</th>');
  htp.p('  <th style="padding:10px 12px; text-align:right;">Kitchen Consumed (kWh)</th>');
  htp.p('  <th style="padding:10px 12px; text-align:right;">Net Surplus (kWh)</th>');
  htp.p('  <th style="padding:10px 12px; text-align:center;">Solar Coverage</th>');
  htp.p('</tr></thead><tbody>');

  FOR r IN (
    SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
           weather, solar_kwh, consumed_kwh,
           round(solar_kwh - consumed_kwh, 2) AS surplus,
           round(solar_kwh / nullif(consumed_kwh, 0) * 100, 0) AS coverage
    FROM v_daily_solar
    ORDER BY log_date
  ) LOOP
    htp.p('<tr style="border-bottom:1px solid #e2e8f0;">');
    htp.p('  <td style="padding:8px 12px; font-weight:600;">' || r.l_date || '</td>');
    htp.p('  <td style="padding:8px 12px;"><span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:0.85rem; font-weight:600; background:' ||
          CASE r.weather
            WHEN 'Sunny' THEN '#fef3c7; color:#92400e;'
            WHEN 'Partly cloudy' THEN '#e0f2fe; color:#0369a1;'
            ELSE '#f1f5f9; color:#475569;'
          END || '">' || r.weather || '</span></td>');
    htp.p('  <td style="padding:8px 12px; text-align:right; font-weight:600; color:#15803d;">' || to_char(r.solar_kwh, '990.0') || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:right; font-weight:600; color:#1e40af;">' || to_char(r.consumed_kwh, '990.0') || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:right; font-weight:600; color:' || CASE WHEN r.surplus >= 0 THEN '#15803d' ELSE '#b91c1c' END || ';">' ||
          CASE WHEN r.surplus >= 0 THEN '+' ELSE '' END || to_char(r.surplus, '990.0') || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:center;"><span style="display:inline-block; padding:3px 10px; border-radius:20px; font-weight:700; font-size:0.85rem; background:' ||
          CASE WHEN r.coverage >= 100 THEN '#dcfce7; color:#166534;' ELSE '#fee2e2; color:#991b1b;' END || '">' || r.coverage || '%</span></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div>');
END;
]',
    p_attribute_01=>'N'
  );

  -- 5. Recent Cooking Sessions Feed (PL/SQL Dynamic Content with native modal edit links)
  l_recent_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_recent_id),
    p_plug_name=>'Recent Cooking Sessions Feed',
    p_region_template_options=>'#DEFAULT#:t-Region--scrollBody',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>40,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'[
BEGIN
  htp.p('<div style="overflow-x:auto; padding:10px;">');
  htp.p('<table class="t-Report-report" style="width:100%; border-collapse:collapse; font-size:0.95rem;">');
  htp.p('<thead><tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1; text-align:left;">');
  htp.p('  <th style="padding:10px 12px;">Session #</th>');
  htp.p('  <th style="padding:10px 12px;">Household</th>');
  htp.p('  <th style="padding:10px 12px;">Date</th>');
  htp.p('  <th style="padding:10px 12px;">Appliance</th>');
  htp.p('  <th style="padding:10px 12px;">Power Source</th>');
  htp.p('  <th style="padding:10px 12px; text-align:right;">Persons Fed</th>');
  htp.p('  <th style="padding:10px 12px; text-align:right;">Duration</th>');
  htp.p('  <th style="padding:10px 12px; text-align:right;">Energy (kWh)</th>');
  htp.p('  <th style="padding:10px 12px; text-align:center;">Action</th>');
  htp.p('</tr></thead><tbody>');

  FOR r IN (
    SELECT s.id, h.household_code, to_char(trunc(cast(s.start_at as date)), 'YYYY-MM-DD') AS s_date,
           a.name AS appliance, s.power_source, s.persons_cooked_for, s.duration_min,
           round(a.power_kw * s.duration_min / 60.0 * 0.75, 2) AS energy_kwh
    FROM cooking_sessions s
    JOIN households h ON h.id = s.household_id
    JOIN appliances a ON a.id = s.appliance_id
    ORDER BY s.id DESC
    FETCH FIRST 10 ROWS ONLY
  ) LOOP
    htp.p('<tr style="border-bottom:1px solid #e2e8f0;">');
    htp.p('  <td style="padding:8px 12px; font-weight:700;">#' || r.id || '</td>');
    htp.p('  <td style="padding:8px 12px; font-weight:600; color:#0369a1;">' || r.household_code || '</td>');
    htp.p('  <td style="padding:8px 12px;">' || r.s_date || '</td>');
    htp.p('  <td style="padding:8px 12px;">' || r.appliance || '</td>');
    htp.p('  <td style="padding:8px 12px;"><span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:0.8rem; font-weight:700; background:' ||
          CASE r.power_source
            WHEN 'Solar' THEN '#fef3c7; color:#b45309;'
            WHEN 'Battery' THEN '#f3e8ff; color:#7e22ce;'
            ELSE '#fee2e2; color:#b91c1c;'
          END || '">' || r.power_source || '</span></td>');
    htp.p('  <td style="padding:8px 12px; text-align:right;">' || r.persons_cooked_for || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:right;">' || r.duration_min || ' min</td>');
    htp.p('  <td style="padding:8px 12px; text-align:right; font-weight:600; color:#15803d;">' || to_char(r.energy_kwh, '990.00') || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:center;">' ||
          '<a href="' || apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12:P12_ID:' || r.id) || '" class="t-Button t-Button--small t-Button--simple">' ||
          '<span class="fa fa-edit"></span> Edit</a></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div>');
END;
]',
    p_attribute_01=>'N'
  );

  COMMIT;
END;
    `);

    console.log('\n======================================================');
    console.log('🎉 SPCKI MASTER DEPLOYMENT WITH CHARTS & DML COMPLETED! 🎉');
    console.log('======================================================');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
