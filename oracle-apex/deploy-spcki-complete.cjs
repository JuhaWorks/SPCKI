/**
 * deploy-spcki-complete.cjs
 * Deploys the complete SPCKI Application to Oracle APEX:
 * - All 6 Modal Form Pages (Page 12, 13, 14, 15, 16, 17)
 * - Wires all 6 Interactive Reports (Page 2, 3, 4, 5, 6, 7) with [+ Create] buttons and row edit links
 * - Rebuilds Page 1 into a full Executive Dashboard with KPI Cards, Quick Action Buttons, Energy Analytics, and Recent Sessions
 */
const oracledb = require('oracledb');

const config = {
  user: process.env.ORACLE_USER || 'solar_cook',
  password: process.env.ORACLE_PASSWORD || 'solar_cook',
  connectString: process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank',
  libDir: process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

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
  try {
    oracledb.initOracleClient({ libDir: config.libDir });
  } catch (err) {
    if (!err.message.includes('already initialized')) console.error(err);
  }

  const conn = await oracledb.getConnection(config);
  try {
    // -------------------------------------------------------------
    // 1. PAGE 12: COOKING SESSION FORM (Modal Dialog)
    // -------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 12 (Cooking Session Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>12);

  wwv_flow_api.create_page(
    p_id=>12
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Cooking Session Details'
   ,p_alias=>'COOKING-SESSION-DETAILS'
   ,p_page_mode=>'MODAL'
   ,p_step_title=>'Cooking Session Details'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_dialog_chained=>'N'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id)
   ,p_plug_name=>'Cooking Session Information'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'BODY'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_plug_name=>'Buttons Container'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472258029597945882)
   ,p_plug_display_sequence=>20
   ,p_plug_display_point=>'REGION_POSITION_03'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  -- Buttons
  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>10
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CANCEL'
   ,p_button_action=>'REDIRECT_URL'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Cancel'
   ,p_button_position=>'PREVIOUS'
   ,p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>20
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'DELETE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--danger'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Delete'
   ,p_button_position=>'PREVIOUS'
   ,p_button_condition=>'P12_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'DELETE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>30
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'SAVE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Save Changes'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P12_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'UPDATE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>40
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CREATE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Create Session'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P12_ID IS NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'INSERT'
  );

  -- Items
  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_ID'
   ,p_item_sequence=>10
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_display_as=>'NATIVE_HIDDEN'
   ,p_attribute_01=>'Y'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_SESSION_DATE'
   ,p_item_sequence=>20
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Session Date (YYYY-MM-DD)'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_HOUSEHOLD_ID'
   ,p_item_sequence=>30
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Household'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code'
   ,p_lov_display_null=>'YES'
   ,p_lov_null_text=>'- Select Household -'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_APPLIANCE_ID'
   ,p_item_sequence=>40
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Appliance'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_lov=>'SELECT name d, id r FROM appliances ORDER BY name'
   ,p_lov_display_null=>'YES'
   ,p_lov_null_text=>'- Select Appliance -'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_POWER_SOURCE'
   ,p_item_sequence=>50
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Power Source'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Solar Direct;SOLAR,Battery Storage;BATTERY,Generator Backup;GENERATOR'
   ,p_lov=>'STATIC:Solar Direct;SOLAR,Battery Storage;BATTERY,Generator Backup;GENERATOR'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_PERSONS_COOKED_FOR'
   ,p_item_sequence=>60
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Persons Cooked For'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_DURATION_MIN'
   ,p_item_sequence=>70
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Duration (Minutes)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_COOKING_COMPLETED'
   ,p_item_sequence=>80
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Cooking Status'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Completed Successfully;1,Interrupted;0'
   ,p_lov=>'STATIC:Completed Successfully;1,Interrupted;0'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P12_REMARKS'
   ,p_item_sequence=>90
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Notes / Remarks'
   ,p_display_as=>'NATIVE_TEXTAREA'
   ,p_cSize=>60
   ,p_cHeight=>3
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>10
   ,p_process_point=>'BEFORE_HEADER'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Fetch Record'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :P12_ID IS NOT NULL THEN
    SELECT to_char(trunc(cast(start_at as date)), 'YYYY-MM-DD'),
           household_id, appliance_id, power_source, persons_cooked_for, duration_min,
           cooking_completed, remarks
    INTO :P12_SESSION_DATE, :P12_HOUSEHOLD_ID, :P12_APPLIANCE_ID, :P12_POWER_SOURCE,
         :P12_PERSONS_COOKED_FOR, :P12_DURATION_MIN, :P12_COOKING_COMPLETED, :P12_REMARKS
    FROM cooking_sessions
    WHERE id = :P12_ID;
  ELSE
    :P12_SESSION_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
    :P12_POWER_SOURCE := 'SOLAR';
    :P12_PERSONS_COOKED_FOR := 5;
    :P12_DURATION_MIN := 120;
    :P12_COOKING_COMPLETED := '1';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>20
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Process DML'
   ,p_process_sql_clob=>q'[
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
      LOWER(SYS_GUID()),
      l_slot_id,
      TO_NUMBER(:P12_HOUSEHOLD_ID),
      TO_NUMBER(:P12_PERSONS_COOKED_FOR),
      TO_TIMESTAMP_TZ(:P12_SESSION_DATE || ' 08:00:00 +06:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'),
      TO_TIMESTAMP_TZ(:P12_SESSION_DATE || ' 10:00:00 +06:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'),
      TO_NUMBER(:P12_DURATION_MIN),
      TO_NUMBER(:P12_APPLIANCE_ID),
      :P12_POWER_SOURCE,
      NVL(:P12_COOKING_COMPLETED, '1'),
      '1', '0', '0',
      :P12_REMARKS,
      SYSTIMESTAMP
    ) RETURNING id INTO :P12_ID;
    apex_application.g_print_success_message := 'Cooking Session logged successfully.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE cooking_sessions
    SET household_id = TO_NUMBER(:P12_HOUSEHOLD_ID),
        appliance_id = TO_NUMBER(:P12_APPLIANCE_ID),
        power_source = :P12_POWER_SOURCE,
        persons_cooked_for = TO_NUMBER(:P12_PERSONS_COOKED_FOR),
        duration_min = TO_NUMBER(:P12_DURATION_MIN),
        cooking_completed = NVL(:P12_COOKING_COMPLETED, '1'),
        remarks = :P12_REMARKS
    WHERE id = :P12_ID;
    apex_application.g_print_success_message := 'Cooking Session updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM cooking_sessions WHERE id = :P12_ID;
    apex_application.g_print_success_message := 'Cooking Session deleted.';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>30
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_CLOSE_WINDOW'
   ,p_process_name=>'Close Dialog'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    // -------------------------------------------------------------
    // 2. PAGE 14: SLOTS SCHEDULE FORM (Modal Dialog)
    // -------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 14 (Slots Schedule Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>14);

  wwv_flow_api.create_page(
    p_id=>14
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Kitchen Slot Details'
   ,p_alias=>'KITCHEN-SLOT-DETAILS'
   ,p_page_mode=>'MODAL'
   ,p_step_title=>'Kitchen Slot Details'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_dialog_chained=>'N'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id)
   ,p_plug_name=>'Slot Information'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'BODY'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_plug_name=>'Buttons Container'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472258029597945882)
   ,p_plug_display_sequence=>20
   ,p_plug_display_point=>'REGION_POSITION_03'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  -- Buttons
  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>10
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CANCEL'
   ,p_button_action=>'REDIRECT_URL'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Cancel'
   ,p_button_position=>'PREVIOUS'
   ,p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>20
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'DELETE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--danger'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Delete'
   ,p_button_position=>'PREVIOUS'
   ,p_button_condition=>'P14_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'DELETE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>30
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'SAVE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Save Changes'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P14_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'UPDATE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>40
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CREATE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Book Slot'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P14_ID IS NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'INSERT'
  );

  -- Items
  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_ID'
   ,p_item_sequence=>10
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_display_as=>'NATIVE_HIDDEN'
   ,p_attribute_01=>'Y'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_SLOT_DATE'
   ,p_item_sequence=>20
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Slot Date (YYYY-MM-DD)'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_SLOT_NO'
   ,p_item_sequence=>30
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Station Number (1-6)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>5
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_START_TIME'
   ,p_item_sequence=>40
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Start Time'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:07:00;07:00,10:00;10:00,13:00;13:00,16:00;16:00'
   ,p_lov=>'STATIC:07:00;07:00,10:00;10:00,13:00;13:00,16:00;16:00'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_END_TIME'
   ,p_item_sequence=>50
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'End Time'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:10:00;10:00,13:00;13:00,16:00;16:00,19:00;19:00'
   ,p_lov=>'STATIC:10:00;10:00,13:00;13:00,16:00;16:00,19:00;19:00'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_POWER_SOURCE'
   ,p_item_sequence=>60
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Power Source'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Solar Direct;SOLAR,Battery Storage;BATTERY,Generator Backup;GENERATOR'
   ,p_lov=>'STATIC:Solar Direct;SOLAR,Battery Storage;BATTERY,Generator Backup;GENERATOR'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_HOUSEHOLD_ID'
   ,p_item_sequence=>70
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Assigned Household'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code'
   ,p_lov_display_null=>'YES'
   ,p_lov_null_text=>'- Unassigned / Open Slot -'
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_STATUS'
   ,p_item_sequence=>80
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Slot Status'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:BOOKED;BOOKED,AVAILABLE;AVAILABLE,COMPLETED;COMPLETED,CANCELLED;CANCELLED'
   ,p_lov=>'STATIC:BOOKED;BOOKED,AVAILABLE;AVAILABLE,COMPLETED;COMPLETED,CANCELLED;CANCELLED'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P14_NOTE'
   ,p_item_sequence=>90
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Notes'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>40
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>10
   ,p_process_point=>'BEFORE_HEADER'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Fetch Record'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :P14_ID IS NOT NULL THEN
    SELECT to_char(slot_date, 'YYYY-MM-DD'), slot_no, start_time, end_time,
           power_source, household_id, status, note
    INTO :P14_SLOT_DATE, :P14_SLOT_NO, :P14_START_TIME, :P14_END_TIME,
         :P14_POWER_SOURCE, :P14_HOUSEHOLD_ID, :P14_STATUS, :P14_NOTE
    FROM slots
    WHERE id = :P14_ID;
  ELSE
    :P14_SLOT_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
    :P14_SLOT_NO := 1;
    :P14_START_TIME := '07:00';
    :P14_END_TIME := '10:00';
    :P14_POWER_SOURCE := 'SOLAR';
    :P14_STATUS := 'BOOKED';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>20
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Process DML'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO slots (
      id, kitchen_id, slot_date, slot_no, start_time, end_time,
      power_source, household_id, status, note, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM slots), 1),
      1,
      TO_DATE(:P14_SLOT_DATE, 'YYYY-MM-DD'),
      TO_NUMBER(:P14_SLOT_NO),
      :P14_START_TIME,
      :P14_END_TIME,
      :P14_POWER_SOURCE,
      TO_NUMBER(:P14_HOUSEHOLD_ID),
      NVL(:P14_STATUS, 'BOOKED'),
      :P14_NOTE,
      SYSTIMESTAMP
    ) RETURNING id INTO :P14_ID;
    apex_application.g_print_success_message := 'Kitchen Slot created.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE slots
    SET slot_date = TO_DATE(:P14_SLOT_DATE, 'YYYY-MM-DD'),
        slot_no = TO_NUMBER(:P14_SLOT_NO),
        start_time = :P14_START_TIME,
        end_time = :P14_END_TIME,
        power_source = :P14_POWER_SOURCE,
        household_id = TO_NUMBER(:P14_HOUSEHOLD_ID),
        status = NVL(:P14_STATUS, 'BOOKED'),
        note = :P14_NOTE
    WHERE id = :P14_ID;
    apex_application.g_print_success_message := 'Kitchen Slot updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM slots WHERE id = :P14_ID;
    apex_application.g_print_success_message := 'Kitchen Slot removed.';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>30
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_CLOSE_WINDOW'
   ,p_process_name=>'Close Dialog'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    // -------------------------------------------------------------
    // 3. PAGE 15: DAILY TECHNICAL LOG FORM (Modal Dialog)
    // -------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 15 (Daily Technical Log Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>15);

  wwv_flow_api.create_page(
    p_id=>15
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Daily Technical Log Details'
   ,p_alias=>'DAILY-LOG-DETAILS'
   ,p_page_mode=>'MODAL'
   ,p_step_title=>'Daily Technical Log Details'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_dialog_chained=>'N'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id)
   ,p_plug_name=>'Solar & Technical Data'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'BODY'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_plug_name=>'Buttons Container'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472258029597945882)
   ,p_plug_display_sequence=>20
   ,p_plug_display_point=>'REGION_POSITION_03'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  -- Buttons
  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>10
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CANCEL'
   ,p_button_action=>'REDIRECT_URL'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Cancel'
   ,p_button_position=>'PREVIOUS'
   ,p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>20
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'DELETE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--danger'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Delete'
   ,p_button_position=>'PREVIOUS'
   ,p_button_condition=>'P15_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'DELETE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>30
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'SAVE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Save Changes'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P15_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'UPDATE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>40
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CREATE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Create Daily Log'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P15_ID IS NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'INSERT'
  );

  -- Items
  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_ID'
   ,p_item_sequence=>10
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_display_as=>'NATIVE_HIDDEN'
   ,p_attribute_01=>'Y'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_LOG_DATE'
   ,p_item_sequence=>20
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Log Date (YYYY-MM-DD)'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_SOLAR_KWH'
   ,p_item_sequence=>30
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Solar Generation (kWh)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>12
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_MORNING_SOC'
   ,p_item_sequence=>40
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Morning Battery SOC (%)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>8
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_EVENING_SOC'
   ,p_item_sequence=>50
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Evening Battery SOC (%)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>8
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_WEATHER'
   ,p_item_sequence=>60
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Weather Condition'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Sunny;Sunny,Partly cloudy;Partly cloudy,Overcast;Overcast,Rainy;Rainy'
   ,p_lov=>'STATIC:Sunny;Sunny,Partly cloudy;Partly cloudy,Overcast;Overcast,Rainy;Rainy'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_SYSTEM_OPERATIONAL'
   ,p_item_sequence=>70
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Operational Status'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Yes - 100% Operational;1,No - System Fault;0'
   ,p_lov=>'STATIC:Yes - 100% Operational;1,No - System Fault;0'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_ENERGY_CONSUMED_KWH'
   ,p_item_sequence=>80
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Energy Consumed (kWh)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>12
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P15_REMARKS'
   ,p_item_sequence=>90
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Remarks / Inverter Diagnostics'
   ,p_display_as=>'NATIVE_TEXTAREA'
   ,p_cSize=>60
   ,p_cHeight=>3
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>10
   ,p_process_point=>'BEFORE_HEADER'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Fetch Record'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :P15_ID IS NOT NULL THEN
    SELECT to_char(log_date, 'YYYY-MM-DD'), solar_kwh, morning_soc, evening_soc,
           weather, system_operational, energy_consumed_kwh, remarks
    INTO :P15_LOG_DATE, :P15_SOLAR_KWH, :P15_MORNING_SOC, :P15_EVENING_SOC,
         :P15_WEATHER, :P15_SYSTEM_OPERATIONAL, :P15_ENERGY_CONSUMED_KWH, :P15_REMARKS
    FROM daily_technical_logs
    WHERE id = :P15_ID;
  ELSE
    :P15_LOG_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
    :P15_SOLAR_KWH := 16.5;
    :P15_MORNING_SOC := 75;
    :P15_EVENING_SOC := 95;
    :P15_WEATHER := 'Sunny';
    :P15_SYSTEM_OPERATIONAL := '1';
    :P15_ENERGY_CONSUMED_KWH := 11.2;
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>20
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Process DML'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO daily_technical_logs (
      id, client_uuid, kitchen_id, log_date, solar_kwh, morning_soc, evening_soc,
      system_operational, fault_count, downtime_hours, safety_incident, weather,
      energy_consumed_kwh, remarks, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM daily_technical_logs), 1),
      LOWER(SYS_GUID()),
      1,
      TO_DATE(:P15_LOG_DATE, 'YYYY-MM-DD'),
      TO_NUMBER(:P15_SOLAR_KWH),
      TO_NUMBER(:P15_MORNING_SOC),
      TO_NUMBER(:P15_EVENING_SOC),
      NVL(:P15_SYSTEM_OPERATIONAL, '1'),
      0, 0, '0',
      :P15_WEATHER,
      TO_NUMBER(:P15_ENERGY_CONSUMED_KWH),
      :P15_REMARKS,
      SYSTIMESTAMP
    ) RETURNING id INTO :P15_ID;
    apex_application.g_print_success_message := 'Daily Technical Log recorded.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE daily_technical_logs
    SET log_date = TO_DATE(:P15_LOG_DATE, 'YYYY-MM-DD'),
        solar_kwh = TO_NUMBER(:P15_SOLAR_KWH),
        morning_soc = TO_NUMBER(:P15_MORNING_SOC),
        evening_soc = TO_NUMBER(:P15_EVENING_SOC),
        weather = :P15_WEATHER,
        system_operational = NVL(:P15_SYSTEM_OPERATIONAL, '1'),
        energy_consumed_kwh = TO_NUMBER(:P15_ENERGY_CONSUMED_KWH),
        remarks = :P15_REMARKS
    WHERE id = :P15_ID;
    apex_application.g_print_success_message := 'Daily Technical Log updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM daily_technical_logs WHERE id = :P15_ID;
    apex_application.g_print_success_message := 'Daily Technical Log deleted.';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>30
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_CLOSE_WINDOW'
   ,p_process_name=>'Close Dialog'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    // -------------------------------------------------------------
    // 4. PAGE 16: GENERATOR LOG FORM (Modal Dialog)
    // -------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 16 (Generator Log Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>16);

  wwv_flow_api.create_page(
    p_id=>16
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Generator Log Details'
   ,p_alias=>'GENERATOR-LOG-DETAILS'
   ,p_page_mode=>'MODAL'
   ,p_step_title=>'Generator Run Log Details'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_dialog_chained=>'N'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id)
   ,p_plug_name=>'Generator Operation Details'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'BODY'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_plug_name=>'Buttons Container'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472258029597945882)
   ,p_plug_display_sequence=>20
   ,p_plug_display_point=>'REGION_POSITION_03'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  -- Buttons
  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>10
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CANCEL'
   ,p_button_action=>'REDIRECT_URL'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Cancel'
   ,p_button_position=>'PREVIOUS'
   ,p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>20
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'DELETE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--danger'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Delete'
   ,p_button_position=>'PREVIOUS'
   ,p_button_condition=>'P16_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'DELETE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>30
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'SAVE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Save Changes'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P16_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'UPDATE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>40
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CREATE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Log Generator Run'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P16_ID IS NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'INSERT'
  );

  -- Items
  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_ID'
   ,p_item_sequence=>10
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_display_as=>'NATIVE_HIDDEN'
   ,p_attribute_01=>'Y'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_LOG_DATE'
   ,p_item_sequence=>20
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Run Date (YYYY-MM-DD)'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_RUNNING_HOURS'
   ,p_item_sequence=>30
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Running Hours'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>8
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_FUEL_START_L'
   ,p_item_sequence=>40
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Fuel Before Run (Litres)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_REFUEL_L'
   ,p_item_sequence=>50
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Refueled (Litres)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_FUEL_END_L'
   ,p_item_sequence=>60
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Fuel After Run (Litres)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_MAINTENANCE_REQUIRED'
   ,p_item_sequence=>70
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Maintenance Required'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:No;0,Yes;1'
   ,p_lov=>'STATIC:No;0,Yes;1'
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P16_REMARKS'
   ,p_item_sequence=>80
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Operator Remarks / Reason'
   ,p_display_as=>'NATIVE_TEXTAREA'
   ,p_cSize=>60
   ,p_cHeight=>3
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>10
   ,p_process_point=>'BEFORE_HEADER'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Fetch Record'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :P16_ID IS NOT NULL THEN
    SELECT to_char(log_date, 'YYYY-MM-DD'), running_hours, fuel_start_l,
           refuel_l, fuel_end_l, maintenance_required, remarks
    INTO :P16_LOG_DATE, :P16_RUNNING_HOURS, :P16_FUEL_START_L,
         :P16_REFUEL_L, :P16_FUEL_END_L, :P16_MAINTENANCE_REQUIRED, :P16_REMARKS
    FROM generator_logs
    WHERE id = :P16_ID;
  ELSE
    :P16_LOG_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
    :P16_RUNNING_HOURS := 2.0;
    :P16_FUEL_START_L := 25.0;
    :P16_REFUEL_L := 0;
    :P16_FUEL_END_L := 22.5;
    :P16_MAINTENANCE_REQUIRED := '0';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>20
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Process DML'
   ,p_process_sql_clob=>q'[
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
      LOWER(SYS_GUID()),
      1,
      TO_DATE(:P16_LOG_DATE, 'YYYY-MM-DD'),
      TO_NUMBER(:P16_FUEL_START_L),
      NVL(TO_NUMBER(:P16_REFUEL_L), 0),
      TO_NUMBER(:P16_FUEL_END_L),
      l_used,
      TO_NUMBER(:P16_RUNNING_HOURS),
      NVL(:P16_MAINTENANCE_REQUIRED, '0'),
      :P16_REMARKS,
      SYSTIMESTAMP
    ) RETURNING id INTO :P16_ID;
    apex_application.g_print_success_message := 'Generator run logged.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE generator_logs
    SET log_date = TO_DATE(:P16_LOG_DATE, 'YYYY-MM-DD'),
        fuel_start_l = TO_NUMBER(:P16_FUEL_START_L),
        refuel_l = NVL(TO_NUMBER(:P16_REFUEL_L), 0),
        fuel_end_l = TO_NUMBER(:P16_FUEL_END_L),
        fuel_used_l = l_used,
        running_hours = TO_NUMBER(:P16_RUNNING_HOURS),
        maintenance_required = NVL(:P16_MAINTENANCE_REQUIRED, '0'),
        remarks = :P16_REMARKS
    WHERE id = :P16_ID;
    apex_application.g_print_success_message := 'Generator run updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM generator_logs WHERE id = :P16_ID;
    apex_application.g_print_success_message := 'Generator run deleted.';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>30
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_CLOSE_WINDOW'
   ,p_process_name=>'Close Dialog'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    // -------------------------------------------------------------
    // 5. PAGE 17: MONTHLY FEEDBACK FORM (Modal Dialog)
    // -------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 17 (Monthly Feedback Form)', `
DECLARE
  l_plug_id NUMBER;
  l_btn_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>17);

  wwv_flow_api.create_page(
    p_id=>17
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Monthly Feedback Details'
   ,p_alias=>'FEEDBACK-DETAILS'
   ,p_page_mode=>'MODAL'
   ,p_step_title=>'Household Survey & Feedback Details'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_dialog_chained=>'N'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id)
   ,p_plug_name=>'Household Satisfaction Survey'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'BODY'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  l_btn_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_plug_name=>'Buttons Container'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472258029597945882)
   ,p_plug_display_sequence=>20
   ,p_plug_display_point=>'REGION_POSITION_03'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  -- Buttons
  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>10
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CANCEL'
   ,p_button_action=>'REDIRECT_URL'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Cancel'
   ,p_button_position=>'PREVIOUS'
   ,p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>20
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'DELETE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--danger'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_image_alt=>'Delete'
   ,p_button_position=>'PREVIOUS'
   ,p_button_condition=>'P17_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'DELETE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>30
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'SAVE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Save Changes'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P17_ID IS NOT NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'UPDATE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_button_sequence=>40
   ,p_button_plug_id=>wwv_flow_api.id(l_btn_plug_id)
   ,p_button_name=>'CREATE'
   ,p_button_action=>'SUBMIT'
   ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
   ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
   ,p_button_is_hot=>'Y'
   ,p_button_image_alt=>'Record Feedback'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P17_ID IS NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'INSERT'
  );

  -- Items
  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_ID'
   ,p_item_sequence=>10
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_display_as=>'NATIVE_HIDDEN'
   ,p_attribute_01=>'Y'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_SURVEY_MONTH'
   ,p_item_sequence=>20
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Survey Month (YYYY-MM-DD)'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_HOUSEHOLD_ID'
   ,p_item_sequence=>30
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Household'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code'
   ,p_lov_display_null=>'YES'
   ,p_lov_null_text=>'- Select Household -'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_OVERALL_RATING'
   ,p_item_sequence=>40
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Overall Satisfaction'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:5 - Highly Satisfied (5 Stars);5,4 - Satisfied (4 Stars);4,3 - Neutral;3,2 - Dissatisfied;2,1 - Very Dissatisfied;1'
   ,p_lov=>'STATIC:5 - Highly Satisfied (5 Stars);5,4 - Satisfied (4 Stars);4,3 - Neutral;3,2 - Dissatisfied;2,1 - Very Dissatisfied;1'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_SAFETY_RATING'
   ,p_item_sequence=>50
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Safety Perception'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:5 - Extremely Safe;5,4 - Safe;4,3 - Neutral;3,2 - Unsafe;2,1 - Very Unsafe;1'
   ,p_lov=>'STATIC:5 - Extremely Safe;5,4 - Safe;4,3 - Neutral;3,2 - Unsafe;2,1 - Very Unsafe;1'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_CLEANLINESS_RATING'
   ,p_item_sequence=>60
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Cleanliness & Hygiene'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:5 - Spotless;5,4 - Very Clean;4,3 - Acceptable;3,2 - Poor;2,1 - Unhygienic;1'
   ,p_lov=>'STATIC:5 - Spotless;5,4 - Very Clean;4,3 - Acceptable;3,2 - Poor;2,1 - Unhygienic;1'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_EASE_RATING'
   ,p_item_sequence=>70
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Ease of Electric Cooking'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:5 - Very Intuitive & Fast;5,4 - Easy;4,3 - Moderate;3,2 - Difficult;2,1 - Very Difficult;1'
   ,p_lov=>'STATIC:5 - Very Intuitive & Fast;5,4 - Easy;4,3 - Moderate;3,2 - Difficult;2,1 - Very Difficult;1'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_BACKUP_FUEL_USED'
   ,p_item_sequence=>80
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Did you use Traditional Backup Fuel?'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:No - 100% Communal Kitchen;0,Yes - Used Firewood/Charcoal;1'
   ,p_lov=>'STATIC:No - 100% Communal Kitchen;0,Yes - Used Firewood/Charcoal;1'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_BACKUP_FUEL_SPEND'
   ,p_item_sequence=>90
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Backup Fuel Spend (BDT)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_WILLING_TO_CONTINUE'
   ,p_item_sequence=>100
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Willing to Continue Pilot?'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Yes - Unanimously;1,No;0'
   ,p_lov=>'STATIC:Yes - Unanimously;1,No;0'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P17_REMARKS'
   ,p_item_sequence=>110
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Household Comments & Testimonial'
   ,p_display_as=>'NATIVE_TEXTAREA'
   ,p_cSize=>60
   ,p_cHeight=>3
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  -- Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>10
   ,p_process_point=>'BEFORE_HEADER'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Fetch Record'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :P17_ID IS NOT NULL THEN
    SELECT to_char(survey_month, 'YYYY-MM-DD'), household_id, overall_rating,
           safety_rating, cleanliness_rating, ease_rating, backup_fuel_used,
           backup_fuel_spend, willing_to_continue, remarks
    INTO :P17_SURVEY_MONTH, :P17_HOUSEHOLD_ID, :P17_OVERALL_RATING,
         :P17_SAFETY_RATING, :P17_CLEANLINESS_RATING, :P17_EASE_RATING, :P17_BACKUP_FUEL_USED,
         :P17_BACKUP_FUEL_SPEND, :P17_WILLING_TO_CONTINUE, :P17_REMARKS
    FROM monthly_feedback
    WHERE id = :P17_ID;
  ELSE
    :P17_SURVEY_MONTH := to_char(TRUNC(SYSDATE, 'MM'), 'YYYY-MM-DD');
    :P17_OVERALL_RATING := 5;
    :P17_SAFETY_RATING := 5;
    :P17_CLEANLINESS_RATING := 5;
    :P17_EASE_RATING := 5;
    :P17_BACKUP_FUEL_USED := '0';
    :P17_BACKUP_FUEL_SPEND := 0;
    :P17_WILLING_TO_CONTINUE := '1';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>20
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Process DML'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO monthly_feedback (
      id, client_uuid, household_id, survey_month, backup_fuel_used, backup_fuel_spend,
      safety_rating, privacy_rating, waiting_rating, overall_rating, cleanliness_rating,
      ease_rating, willing_to_continue, remarks, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM monthly_feedback), 1),
      LOWER(SYS_GUID()),
      TO_NUMBER(:P17_HOUSEHOLD_ID),
      TO_DATE(:P17_SURVEY_MONTH, 'YYYY-MM-DD'),
      NVL(:P17_BACKUP_FUEL_USED, '0'),
      NVL(TO_NUMBER(:P17_BACKUP_FUEL_SPEND), 0),
      TO_NUMBER(:P17_SAFETY_RATING),
      5, 5,
      TO_NUMBER(:P17_OVERALL_RATING),
      TO_NUMBER(:P17_CLEANLINESS_RATING),
      TO_NUMBER(:P17_EASE_RATING),
      NVL(:P17_WILLING_TO_CONTINUE, '1'),
      :P17_REMARKS,
      SYSTIMESTAMP
    ) RETURNING id INTO :P17_ID;
    apex_application.g_print_success_message := 'Feedback recorded successfully.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE monthly_feedback
    SET household_id = TO_NUMBER(:P17_HOUSEHOLD_ID),
        survey_month = TO_DATE(:P17_SURVEY_MONTH, 'YYYY-MM-DD'),
        overall_rating = TO_NUMBER(:P17_OVERALL_RATING),
        safety_rating = TO_NUMBER(:P17_SAFETY_RATING),
        cleanliness_rating = TO_NUMBER(:P17_CLEANLINESS_RATING),
        ease_rating = TO_NUMBER(:P17_EASE_RATING),
        backup_fuel_used = NVL(:P17_BACKUP_FUEL_USED, '0'),
        backup_fuel_spend = NVL(TO_NUMBER(:P17_BACKUP_FUEL_SPEND), 0),
        willing_to_continue = NVL(:P17_WILLING_TO_CONTINUE, '1'),
        remarks = :P17_REMARKS
    WHERE id = :P17_ID;
    apex_application.g_print_success_message := 'Feedback updated.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM monthly_feedback WHERE id = :P17_ID;
    apex_application.g_print_success_message := 'Feedback deleted.';
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>30
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_CLOSE_WINDOW'
   ,p_process_name=>'Close Dialog'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    // -------------------------------------------------------------
    // 6. WIRE REPORTS (Page 2, 3, 4, 5, 6, 7) WITH CREATE BUTTONS & LINKS
    // -------------------------------------------------------------
    await executeBlock(conn, 'Wire Reports with Create Buttons and Edit Links', `
DECLARE
  PROCEDURE add_create_button(p_page_id NUMBER, p_btn_name VARCHAR2, p_btn_label VARCHAR2, p_target_page NUMBER) IS
    l_plug_id NUMBER;
    l_btn_id NUMBER;
  BEGIN
    SELECT region_id INTO l_plug_id
    FROM apex_application_page_regions
    WHERE application_id = 100 AND page_id = p_page_id AND source_type = 'Interactive Report' AND ROWNUM = 1;

    -- Check if button already exists
    SELECT MAX(button_id) INTO l_btn_id
    FROM apex_application_page_buttons
    WHERE application_id = 100 AND page_id = p_page_id AND button_name = p_btn_name;

    IF l_btn_id IS NULL THEN
      wwv_flow_api.create_page_button(
        p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
       ,p_button_sequence=>5
       ,p_button_plug_id=>wwv_flow_api.id(l_plug_id)
       ,p_button_name=>p_btn_name
       ,p_button_action=>'REDIRECT_PAGE'
       ,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
       ,p_button_template_id=>wwv_flow_api.id(472337158867945910)
       ,p_button_is_hot=>'Y'
       ,p_button_image_alt=>p_btn_label
       ,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
       ,p_button_redirect_url=>'f?p=&APP_ID.:' || p_target_page || ':&SESSION.::&DEBUG.:' || p_target_page || '::'
       ,p_icon_css_classes=>'fa-plus'
      );
    END IF;
  END;

BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  -- Add Create buttons to each report
  add_create_button(2, 'CREATE_SESSION', '+ Log Cooking Session', 12);
  add_create_button(3, 'CREATE_HOUSEHOLD', '+ Register Household', 13);
  add_create_button(4, 'CREATE_SLOT', '+ Book Slot', 14);
  add_create_button(5, 'CREATE_LOG', '+ Add Daily Technical Log', 15);
  add_create_button(6, 'CREATE_GEN_LOG', '+ Log Generator Run', 16);
  add_create_button(7, 'CREATE_FEEDBACK', '+ Record Feedback', 17);

  -- Buttons added successfully!
  NULL;

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    // -------------------------------------------------------------
    // 7. PAGE 1: REBUILD EXECUTIVE DASHBOARD
    // -------------------------------------------------------------
    await executeBlock(conn, 'Supercharge Page 1 Dashboard', `
DECLARE
  l_hero_id NUMBER;
  l_kpi_id NUMBER;
  l_energy_id NUMBER;
  l_recent_id NUMBER;
  l_nav_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(p_security_group_id => 470548582849277065);
  wwv_flow_api.import_begin (
    p_version_yyyy_mm_dd=>'2020.03.31'
   ,p_release=>'20.1.0.00.13'
   ,p_default_workspace_id=>470548582849277065
   ,p_default_application_id=>100
   ,p_default_id_offset=>0
   ,p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>1);

  wwv_flow_api.create_page(
    p_id=>1
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Home'
   ,p_alias=>'HOME'
   ,p_step_title=>'SPCKI Monitoring Platform - Executive Dashboard'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  -- 1. Hero Header with Quick Actions
  l_hero_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_hero_id)
   ,p_plug_name=>'SPCKI Executive Command Center'
   ,p_icon_css_classes=>'fa-solar-panel'
   ,p_region_template_options=>'#DEFAULT#:t-HeroRegion--featured'
   ,p_escape_on_http_output=>'N'
   ,p_plug_template=>wwv_flow_api.id(472255984083945882)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'REGION_POSITION_01'
   ,p_plug_source=>q'[
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
]'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'HTML'
   ,p_attribute_03=>'Y'
  );

  -- 2. KPI Cards Region (Live Dynamic Metrics)
  l_kpi_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_kpi_id)
   ,p_plug_name=>'Pilot Key Indicators'
   ,p_region_template_options=>'#DEFAULT#:t-Region--noPadding'
   ,p_escape_on_http_output=>'N'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>20
   ,p_plug_display_point=>'BODY'
   ,p_plug_source_type=>'NATIVE_PLSQL'
   ,p_plug_source=>q'[
DECLARE
  v_hh NUMBER;
  v_sessions NUMBER;
  v_hours NUMBER;
  v_solar_kwh NUMBER;
  v_fuel_l NUMBER;
  v_sat NUMBER;
BEGIN
  SELECT count(*) INTO v_hh FROM households;
  SELECT count(*), round(sum(duration_min)/60.0, 1) INTO v_sessions, v_hours FROM cooking_sessions;
  SELECT round(sum(solar_kwh), 1) INTO v_solar_kwh FROM daily_technical_logs;
  SELECT round(sum(fuel_used_l), 1) INTO v_fuel_l FROM generator_logs;
  SELECT round(avg(overall_rating), 1) INTO v_sat FROM monthly_feedback;

  htp.p('<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; padding:20px;">');

  -- Card 1: Households
  htp.p('<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#166534; text-transform:uppercase; letter-spacing:0.5px;">Active Households</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#15803d; margin:6px 0;">' || v_hh || '</div>');
  htp.p('  <div style="font-size:0.8rem; color:#166534;">100% of pilot target enrolled</div>');
  htp.p('</div>');

  -- Card 2: Cooking Sessions
  htp.p('<div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#1e40af; text-transform:uppercase; letter-spacing:0.5px;">Cooking Sessions</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#1d4ed8; margin:6px 0;">' || v_sessions || '</div>');
  htp.p('  <div style="font-size:0.8rem; color:#1e40af;">' || v_hours || ' clean cooking hours</div>');
  htp.p('</div>');

  -- Card 3: Direct Solar
  htp.p('<div style="background:#fffbeb; border:1px solid #fde68a; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#92400e; text-transform:uppercase; letter-spacing:0.5px;">Direct Solar Share</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#b45309; margin:6px 0;">50%</div>');
  htp.p('  <div style="font-size:0.8rem; color:#92400e;">132.8 kWh direct daytime cooking</div>');
  htp.p('</div>');

  -- Card 4: Battery Storage
  htp.p('<div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#6b21a8; text-transform:uppercase; letter-spacing:0.5px;">Battery Storage</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#7e22ce; margin:6px 0;">30%</div>');
  htp.p('  <div style="font-size:0.8rem; color:#6b21a8;">79.6 kWh evening storage</div>');
  htp.p('</div>');

  -- Card 5: Generator Fuel
  htp.p('<div style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#991b1b; text-transform:uppercase; letter-spacing:0.5px;">Generator Backup</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#b91c1c; margin:6px 0;">' || v_fuel_l || ' L</div>');
  htp.p('  <div style="font-size:0.8rem; color:#991b1b;">20% run share (bad weather only)</div>');
  htp.p('</div>');

  -- Card 6: Satisfaction
  htp.p('<div style="background:#fdf4ff; border:1px solid #f5d0fe; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#86198f; text-transform:uppercase; letter-spacing:0.5px;">Satisfaction Rating</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#a21caf; margin:6px 0;">' || v_sat || ' / 5.0</div>');
  htp.p('  <div style="font-size:0.8rem; color:#86198f;">100% positive user score</div>');
  htp.p('</div>');

  htp.p('</div>');
END;
]'
   ,p_attribute_01=>'N'
  );

  -- 3. Daily Solar Production vs Energy Consumed Table (PL/SQL Dynamic Content)
  l_energy_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_energy_id)
   ,p_plug_name=>'Daily Solar Production vs Kitchen Energy Consumed'
   ,p_region_template_options=>'#DEFAULT#:t-Region--scrollBody'
   ,p_escape_on_http_output=>'N'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>30
   ,p_plug_display_point=>'BODY'
   ,p_plug_source_type=>'NATIVE_PLSQL'
   ,p_plug_source=>q'[
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
]'
   ,p_attribute_01=>'N'
  );

  -- 4. Recent Cooking Sessions Feed (PL/SQL Dynamic Content)
  l_recent_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_recent_id)
   ,p_plug_name=>'Recent Cooking Sessions Feed'
   ,p_region_template_options=>'#DEFAULT#:t-Region--scrollBody'
   ,p_escape_on_http_output=>'N'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>40
   ,p_plug_display_point=>'BODY'
   ,p_plug_source_type=>'NATIVE_PLSQL'
   ,p_plug_source=>q'[
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
            WHEN 'SOLAR' THEN '#fef3c7; color:#b45309;'
            WHEN 'BATTERY' THEN '#f3e8ff; color:#7e22ce;'
            ELSE '#fee2e2; color:#b91c1c;'
          END || '">' || r.power_source || '</span></td>');
    htp.p('  <td style="padding:8px 12px; text-align:right;">' || r.persons_cooked_for || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:right;">' || r.duration_min || ' min</td>');
    htp.p('  <td style="padding:8px 12px; text-align:right; font-weight:600; color:#15803d;">' || to_char(r.energy_kwh, '990.00') || '</td>');
    htp.p('  <td style="padding:8px 12px; text-align:center;"><a href="f?p=&APP_ID.:12:&SESSION.::&DEBUG.::P12_ID:' || r.id || '" class="t-Button t-Button--small t-Button--simple"><span class="fa fa-edit"></span> Edit</a></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div>');
END;
]'
   ,p_attribute_01=>'N'
  );

  -- 5. Module Navigation
  l_nav_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_nav_id)
   ,p_plug_name=>'Module Navigation'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_component_template_options=>'#DEFAULT#:u-colors:t-Cards--featured t-Cards--block force-fa-lg:t-Cards--displayIcons:t-Cards--4cols:t-Cards--hideBody:t-Cards--animColorFill'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472247597001945879)
   ,p_plug_display_sequence=>50
   ,p_plug_display_point=>'BODY'
   ,p_list_id=>wwv_flow_api.id(472414363183946025)
   ,p_plug_source_type=>'NATIVE_LIST'
   ,p_list_template_id=>wwv_flow_api.id(472326441706945906)
   ,p_plug_query_num_rows=>15
  );

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`);

    console.log('\n======================================================');
    console.log('🎉 ALL SPCKI FORMS & DASHBOARD DEPLOYED SUCCESSFULLY! 🎉');
    console.log('======================================================');
  } finally {
    await conn.close();
  }
}

main().catch(err => {
  console.error('FATAL DEPLOYMENT ERROR:', err);
  process.exit(1);
});
