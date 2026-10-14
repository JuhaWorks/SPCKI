/**
 * deploy-spcki-forms-with-buttons.cjs
 * Deploys all 6 Modal Dialog Form pages (12, 13, 14, 15, 16, 17)
 * with fully integrated, styled Universal Theme action buttons in Buttons Container.
 */
const oracledb = require('oracledb');

const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
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
    // 1. PAGE 12: Cooking Session Form
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
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P12_POWER_SOURCE', p_item_sequence=>50, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Power Source', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Solar Direct' d, 'SOLAR' r FROM dual UNION ALL SELECT 'Battery Storage', 'BATTERY' FROM dual UNION ALL SELECT 'Generator Backup', 'GENERATOR' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Power Source -', p_field_template=>wwv_flow_api.id(472336055780945909));
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
    :P12_POWER_SOURCE := 'SOLAR';
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
  l_slot_id NUMBER;
BEGIN
  IF :REQUEST = 'CREATE' THEN
    SELECT COALESCE(MIN(id), 1) INTO l_slot_id FROM slots WHERE slot_date = TO_DATE(:P12_SESSION_DATE, 'YYYY-MM-DD');
    IF l_slot_id IS NULL THEN l_slot_id := 1; END IF;

    INSERT INTO cooking_sessions (
      id, client_uuid, slot_id, household_id, persons_cooked_for,
      start_at, end_at, duration_min, appliance_id, power_source,
      cooking_completed, cleaning_completed, waiting_issue, technical_problem,
      remarks, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM cooking_sessions), 1),
      LOWER(SYS_GUID()), l_slot_id, TO_NUMBER(:P12_HOUSEHOLD_ID), TO_NUMBER(:P12_PERSONS_COOKED_FOR),
      TO_TIMESTAMP_TZ(:P12_SESSION_DATE || ' 08:00:00 +06:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'),
      TO_TIMESTAMP_TZ(:P12_SESSION_DATE || ' 10:00:00 +06:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'),
      TO_NUMBER(:P12_DURATION_MIN), TO_NUMBER(:P12_APPLIANCE_ID), :P12_POWER_SOURCE,
      NVL(:P12_COOKING_COMPLETED, '1'), '1', '0', '0', :P12_REMARKS, SYSTIMESTAMP
    ) RETURNING id INTO :P12_ID;
    apex_application.g_print_success_message := 'Cooking Session logged successfully.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE cooking_sessions
    SET household_id = TO_NUMBER(:P12_HOUSEHOLD_ID), appliance_id = TO_NUMBER(:P12_APPLIANCE_ID),
        power_source = :P12_POWER_SOURCE, persons_cooked_for = TO_NUMBER(:P12_PERSONS_COOKED_FOR),
        duration_min = TO_NUMBER(:P12_DURATION_MIN), cooking_completed = NVL(:P12_COOKING_COMPLETED, '1'),
        remarks = :P12_REMARKS
    WHERE id = :P12_ID;
    apex_application.g_print_success_message := 'Cooking Session updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM cooking_sessions WHERE id = :P12_ID;
    apex_application.g_print_success_message := 'Cooking Session deleted.';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
`);

    // 2. PAGE 13: Household Form
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
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_STATUS', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Active' d, 'ACTIVE' r FROM dual UNION ALL SELECT 'Inactive', 'INACTIVE' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P13_JOINED_DATE', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Joined Date (YYYY-MM-DD)', p_display_as=>'NATIVE_TEXT_FIELD', p_cSize=>15, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P13_ID IS NOT NULL THEN
    SELECT household_code, family_size, children_count, adults_count,
           baseline_fuel_type, baseline_monthly_fuel_cost, status, to_char(joined_date, 'YYYY-MM-DD')
    INTO :P13_HOUSEHOLD_CODE, :P13_FAMILY_SIZE, :P13_CHILDREN_COUNT, :P13_ADULTS_COUNT,
         :P13_BASELINE_FUEL_TYPE, :P13_BASELINE_MONTHLY_FUEL_COST, :P13_STATUS, :P13_JOINED_DATE
    FROM households WHERE id = :P13_ID;
  ELSE
    :P13_STATUS := 'ACTIVE'; :P13_FAMILY_SIZE := 5; :P13_ADULTS_COUNT := 3; :P13_CHILDREN_COUNT := 2;
    :P13_JOINED_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO households (
      id, kitchen_id, household_code, family_size, children_count, adults_count,
      baseline_fuel_type, baseline_monthly_fuel_cost, status, joined_date, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM households), 1),
      1, :P13_HOUSEHOLD_CODE, TO_NUMBER(:P13_FAMILY_SIZE), TO_NUMBER(:P13_CHILDREN_COUNT), TO_NUMBER(:P13_ADULTS_COUNT),
      :P13_BASELINE_FUEL_TYPE, TO_NUMBER(:P13_BASELINE_MONTHLY_FUEL_COST), NVL(:P13_STATUS, 'ACTIVE'),
      TO_DATE(:P13_JOINED_DATE, 'YYYY-MM-DD'), SYSTIMESTAMP
    ) RETURNING id INTO :P13_ID;
    apex_application.g_print_success_message := 'Household created successfully.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE households
    SET household_code = :P13_HOUSEHOLD_CODE, family_size = TO_NUMBER(:P13_FAMILY_SIZE),
        children_count = TO_NUMBER(:P13_CHILDREN_COUNT), adults_count = TO_NUMBER(:P13_ADULTS_COUNT),
        baseline_fuel_type = :P13_BASELINE_FUEL_TYPE, baseline_monthly_fuel_cost = TO_NUMBER(:P13_BASELINE_MONTHLY_FUEL_COST),
        status = NVL(:P13_STATUS, 'ACTIVE'), joined_date = TO_DATE(:P13_JOINED_DATE, 'YYYY-MM-DD')
    WHERE id = :P13_ID;
    apex_application.g_print_success_message := 'Household updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM households WHERE id = :P13_ID;
    apex_application.g_print_success_message := 'Household deleted.';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
`);

    // 3. PAGE 14: Slots Schedule Form
    await executeBlock(conn, 'Deploy Page 14 (Slots Schedule Form)', `
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
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_POWER_SOURCE', p_item_sequence=>60, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Power Source', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Solar Direct' d, 'SOLAR' r FROM dual UNION ALL SELECT 'Battery Storage', 'BATTERY' FROM dual UNION ALL SELECT 'Generator Backup', 'GENERATOR' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Power Source -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_HOUSEHOLD_ID', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Assigned Household', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code', p_lov_display_null=>'YES', p_lov_null_text=>'- Unassigned / Open Slot -', p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P14_STATUS', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Slot Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Booked' d, 'BOOKED' r FROM dual UNION ALL SELECT 'Available', 'AVAILABLE' FROM dual UNION ALL SELECT 'Completed', 'COMPLETED' FROM dual UNION ALL SELECT 'Cancelled', 'CANCELLED' FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
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
    :P14_POWER_SOURCE := 'SOLAR'; :P14_STATUS := 'BOOKED';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>20, p_process_point=>'AFTER_SUBMIT', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Process DML',
    p_process_sql_clob=>q'[
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO slots (
      id, kitchen_id, slot_date, slot_no, start_time, end_time,
      power_source, household_id, status, note, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM slots), 1),
      1, TO_DATE(:P14_SLOT_DATE, 'YYYY-MM-DD'), TO_NUMBER(:P14_SLOT_NO),
      :P14_START_TIME, :P14_END_TIME, :P14_POWER_SOURCE, TO_NUMBER(:P14_HOUSEHOLD_ID),
      NVL(:P14_STATUS, 'BOOKED'), :P14_NOTE, SYSTIMESTAMP
    ) RETURNING id INTO :P14_ID;
    apex_application.g_print_success_message := 'Kitchen Slot created.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE slots
    SET slot_date = TO_DATE(:P14_SLOT_DATE, 'YYYY-MM-DD'), slot_no = TO_NUMBER(:P14_SLOT_NO),
        start_time = :P14_START_TIME, end_time = :P14_END_TIME, power_source = :P14_POWER_SOURCE,
        household_id = TO_NUMBER(:P14_HOUSEHOLD_ID), status = NVL(:P14_STATUS, 'BOOKED'), note = :P14_NOTE
    WHERE id = :P14_ID;
    apex_application.g_print_success_message := 'Kitchen Slot updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM slots WHERE id = :P14_ID;
    apex_application.g_print_success_message := 'Kitchen Slot removed.';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
`);

    // 4. PAGE 15: Daily Technical Log Form
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
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_SYSTEM_OPERATIONAL', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Operational Status', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Yes - 100% Operational' d, 1 r FROM dual UNION ALL SELECT 'No - System Fault', 0 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select Status -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_ENERGY_CONSUMED_KWH', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Energy Consumed (kWh)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>12, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P15_REMARKS', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Remarks / Inverter Diagnostics', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P15_ID IS NOT NULL THEN
    SELECT to_char(log_date, 'YYYY-MM-DD'), solar_kwh, morning_soc, evening_soc,
           weather, system_operational, energy_consumed_kwh, remarks
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
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO daily_technical_logs (
      id, client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc,
      system_operational, fault_count, downtime_hours, safety_incident, weather,
      energy_consumed_kwh, remarks, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM daily_technical_logs), 1),
      LOWER(SYS_GUID()), 1, TO_DATE(:P15_LOG_DATE, 'YYYY-MM-DD'),
      TO_NUMBER(:P15_SOLAR_KWH), TO_NUMBER(:P15_MORNING_SOC), TO_NUMBER(:P15_EVENING_SOC),
      NVL(:P15_SYSTEM_OPERATIONAL, '1'), 0, 0, '0', :P15_WEATHER,
      TO_NUMBER(:P15_ENERGY_CONSUMED_KWH), :P15_REMARKS, SYSTIMESTAMP
    ) RETURNING id INTO :P15_ID;
    apex_application.g_print_success_message := 'Daily Technical Log recorded.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE daily_technical_logs
    SET log_date = TO_DATE(:P15_LOG_DATE, 'YYYY-MM-DD'), solar_kwh = TO_NUMBER(:P15_SOLAR_KWH),
        morning_soc = TO_NUMBER(:P15_MORNING_SOC), evening_soc = TO_NUMBER(:P15_EVENING_SOC),
        weather = :P15_WEATHER, system_operational = NVL(:P15_SYSTEM_OPERATIONAL, '1'),
        energy_consumed_kwh = TO_NUMBER(:P15_ENERGY_CONSUMED_KWH), remarks = :P15_REMARKS
    WHERE id = :P15_ID;
    apex_application.g_print_success_message := 'Daily Technical Log updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM daily_technical_logs WHERE id = :P15_ID;
    apex_application.g_print_success_message := 'Daily Technical Log deleted.';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
`);

    // 5. PAGE 16: Generator Log Form
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
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_MAINTENANCE_REQUIRED', p_item_sequence=>70, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Maintenance Required', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'No' d, 0 r FROM dual UNION ALL SELECT 'Yes', 1 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select -', p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P16_REMARKS', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Operator Remarks / Reason', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P16_ID IS NOT NULL THEN
    SELECT to_char(log_date, 'YYYY-MM-DD'), running_hours, fuel_start_l,
           refuel_l, fuel_end_l, maintenance_required, remarks
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
  l_used NUMBER;
BEGIN
  l_used := (TO_NUMBER(:P16_FUEL_START_L) + NVL(TO_NUMBER(:P16_REFUEL_L), 0)) - TO_NUMBER(:P16_FUEL_END_L);
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO generator_logs (
      id, client_uuid, kitchen_id, log_date, fuel_start_l, refuel_l, fuel_end_l,
      fuel_used_l, running_hours, maintenance_required, remarks, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM generator_logs), 1),
      LOWER(SYS_GUID()), 1, TO_DATE(:P16_LOG_DATE, 'YYYY-MM-DD'),
      TO_NUMBER(:P16_FUEL_START_L), NVL(TO_NUMBER(:P16_REFUEL_L), 0), TO_NUMBER(:P16_FUEL_END_L),
      l_used, TO_NUMBER(:P16_RUNNING_HOURS), NVL(:P16_MAINTENANCE_REQUIRED, '0'), :P16_REMARKS, SYSTIMESTAMP
    ) RETURNING id INTO :P16_ID;
    apex_application.g_print_success_message := 'Generator run logged.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE generator_logs
    SET log_date = TO_DATE(:P16_LOG_DATE, 'YYYY-MM-DD'), fuel_start_l = TO_NUMBER(:P16_FUEL_START_L),
        refuel_l = NVL(TO_NUMBER(:P16_REFUEL_L), 0), fuel_end_l = TO_NUMBER(:P16_FUEL_END_L),
        fuel_used_l = l_used, running_hours = TO_NUMBER(:P16_RUNNING_HOURS),
        maintenance_required = NVL(:P16_MAINTENANCE_REQUIRED, '0'), remarks = :P16_REMARKS
    WHERE id = :P16_ID;
    apex_application.g_print_success_message := 'Generator run updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM generator_logs WHERE id = :P16_ID;
    apex_application.g_print_success_message := 'Generator run deleted.';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
`);

    // 6. PAGE 17: Monthly Feedback Form
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
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_BACKUP_FUEL_USED', p_item_sequence=>80, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Did you use Traditional Backup Fuel?', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'No - 100% Communal Kitchen' d, 0 r FROM dual UNION ALL SELECT 'Yes - Used Firewood/Charcoal', 1 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_BACKUP_FUEL_SPEND', p_item_sequence=>90, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Backup Fuel Spend (BDT)', p_display_as=>'NATIVE_NUMBER_FIELD', p_cSize=>10, p_field_template=>wwv_flow_api.id(472335722995945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_WILLING_TO_CONTINUE', p_item_sequence=>100, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Willing to Continue Pilot?', p_display_as=>'NATIVE_SELECT_LIST', p_lov=>q'[SELECT 'Yes - Unanimously' d, 1 r FROM dual UNION ALL SELECT 'No', 0 FROM dual]', p_lov_display_null=>'YES', p_lov_null_text=>'- Select -', p_field_template=>wwv_flow_api.id(472336055780945909));
  wwv_flow_api.create_page_item(p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_name=>'P17_REMARKS', p_item_sequence=>110, p_item_plug_id=>wwv_flow_api.id(l_plug_id), p_prompt=>'Household Comments & Testimonial', p_display_as=>'NATIVE_TEXTAREA', p_cSize=>60, p_cHeight=>3, p_field_template=>wwv_flow_api.id(472335722995945909));

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>10, p_process_point=>'BEFORE_HEADER', p_process_type=>'NATIVE_PLSQL', p_process_name=>'Fetch Record',
    p_process_sql_clob=>q'[
BEGIN
  IF :P17_ID IS NOT NULL THEN
    SELECT to_char(survey_month, 'YYYY-MM-DD'), household_id, overall_rating,
           safety_rating, cleanliness_rating, ease_rating, backup_fuel_used,
           backup_fuel_spend, willing_to_continue, remarks
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
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO monthly_feedback (
      id, client_uuid, household_id, survey_month, backup_fuel_used, backup_fuel_spend,
      safety_rating, privacy_rating, waiting_rating, overall_rating, cleanliness_rating,
      ease_rating, willing_to_continue, remarks, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM monthly_feedback), 1),
      LOWER(SYS_GUID()), TO_NUMBER(:P17_HOUSEHOLD_ID), TO_DATE(:P17_SURVEY_MONTH, 'YYYY-MM-DD'),
      NVL(:P17_BACKUP_FUEL_USED, '0'), NVL(TO_NUMBER(:P17_BACKUP_FUEL_SPEND), 0),
      TO_NUMBER(:P17_SAFETY_RATING), 5, 5, TO_NUMBER(:P17_OVERALL_RATING),
      TO_NUMBER(:P17_CLEANLINESS_RATING), TO_NUMBER(:P17_EASE_RATING), NVL(:P17_WILLING_TO_CONTINUE, '1'),
      :P17_REMARKS, SYSTIMESTAMP
    ) RETURNING id INTO :P17_ID;
    apex_application.g_print_success_message := 'Feedback recorded successfully.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE monthly_feedback
    SET household_id = TO_NUMBER(:P17_HOUSEHOLD_ID), survey_month = TO_DATE(:P17_SURVEY_MONTH, 'YYYY-MM-DD'),
        overall_rating = TO_NUMBER(:P17_OVERALL_RATING), safety_rating = TO_NUMBER(:P17_SAFETY_RATING),
        cleanliness_rating = TO_NUMBER(:P17_CLEANLINESS_RATING), ease_rating = TO_NUMBER(:P17_EASE_RATING),
        backup_fuel_used = NVL(:P17_BACKUP_FUEL_USED, '0'), backup_fuel_spend = NVL(TO_NUMBER(:P17_BACKUP_FUEL_SPEND), 0),
        willing_to_continue = NVL(:P17_WILLING_TO_CONTINUE, '1'), remarks = :P17_REMARKS
    WHERE id = :P17_ID;
    apex_application.g_print_success_message := 'Feedback updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM monthly_feedback WHERE id = :P17_ID;
    apex_application.g_print_success_message := 'Feedback deleted.';
  END IF;
END;]',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val), p_process_sequence=>30, p_process_point=>'AFTER_SUBMIT',
    p_process_type=>'NATIVE_CLOSE_WINDOW', p_process_name=>'Close Dialog',
    p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
`);

    console.log('\n======================================================');
    console.log('🎉 ALL MODAL FORMS WITH ACTION BUTTONS DEPLOYED! 🎉');
    console.log('======================================================');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
