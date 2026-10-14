/**
 * test-create-page13.cjs - Creates Page 13 (Household Form Modal Dialog)
 */
const oracledb = require('oracledb');

const config = {
  user: process.env.ORACLE_USER || 'solar_cook',
  password: process.env.ORACLE_PASSWORD || 'solar_cook',
  connectString: process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank',
  libDir: process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

async function main() {
  try {
    oracledb.initOracleClient({ libDir: config.libDir });
  } catch (err) {
    if (!err.message.includes('already initialized')) console.error(err);
  }

  const conn = await oracledb.getConnection(config);
  try {
    const plsql = `
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

  -- Remove Page 13 if exists
  wwv_flow_api.remove_page(p_flow_id=>100, p_page_id=>13);

  -- Create Page 13 Modal Dialog
  wwv_flow_api.create_page(
    p_id=>13
   ,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
   ,p_name=>'Household Details'
   ,p_alias=>'HOUSEHOLD-DETAILS'
   ,p_page_mode=>'MODAL'
   ,p_step_title=>'Household Details'
   ,p_autocomplete_on_off=>'OFF'
   ,p_page_template_options=>'#DEFAULT#'
   ,p_dialog_chained=>'N'
   ,p_last_updated_by=>'SOLAR_COOK'
   ,p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id)
   ,p_plug_name=>'Household Information'
   ,p_region_template_options=>'#DEFAULT#'
   ,p_escape_on_http_output=>'Y'
   ,p_plug_template=>wwv_flow_api.id(472274973856945887)
   ,p_plug_display_sequence=>10
   ,p_plug_display_point=>'BODY'
   ,p_plug_query_num_rows=>15
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
   ,p_plug_query_num_rows=>15
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
   ,p_button_template_options=>'#DEFAULT#'
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
   ,p_button_condition=>'P13_ID IS NOT NULL'
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
   ,p_button_condition=>'P13_ID IS NOT NULL'
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
   ,p_button_image_alt=>'Create Household'
   ,p_button_position=>'NEXT'
   ,p_button_condition=>'P13_ID IS NULL'
   ,p_button_condition_type=>'PLSQL_EXPRESSION'
   ,p_database_action=>'INSERT'
  );

  -- Page Items
  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_ID'
   ,p_item_sequence=>10
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_display_as=>'NATIVE_HIDDEN'
   ,p_attribute_01=>'Y'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_HOUSEHOLD_CODE'
   ,p_item_sequence=>20
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Household Code'
   ,p_placeholder=>'e.g. HH-017'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>30
   ,p_cMaxlength=>20
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
   ,p_attribute_01=>'N'
   ,p_attribute_02=>'N'
   ,p_attribute_04=>'TEXT'
   ,p_attribute_05=>'BOTH'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_FAMILY_SIZE'
   ,p_item_sequence=>30
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Family Size (Total Members)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_ADULTS_COUNT'
   ,p_item_sequence=>40
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Adults Count'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_CHILDREN_COUNT'
   ,p_item_sequence=>50
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Children Count'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>10
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_BASELINE_FUEL_TYPE'
   ,p_item_sequence=>60
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Baseline Cooking Fuel'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Firewood;Firewood,Charcoal;Charcoal,LPG Cylinder;LPG Cylinder,Kerosene;Kerosene'
   ,p_lov=>'STATIC:Firewood;Firewood,Charcoal;Charcoal,LPG Cylinder;LPG Cylinder,Kerosene;Kerosene'
   ,p_lov_display_null=>'YES'
   ,p_lov_null_text=>'- Select Baseline Fuel -'
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_BASELINE_MONTHLY_FUEL_COST'
   ,p_item_sequence=>70
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Baseline Monthly Fuel Cost (BDT)'
   ,p_display_as=>'NATIVE_NUMBER_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_STATUS'
   ,p_item_sequence=>80
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Status'
   ,p_display_as=>'NATIVE_SELECT_LIST'
   ,p_named_lov=>'STATIC:Active;ACTIVE,Inactive;INACTIVE'
   ,p_lov=>'STATIC:Active;ACTIVE,Inactive;INACTIVE'
   ,p_field_template=>wwv_flow_api.id(472336055780945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  wwv_flow_api.create_page_item(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_name=>'P13_JOINED_DATE'
   ,p_item_sequence=>90
   ,p_item_plug_id=>wwv_flow_api.id(l_plug_id)
   ,p_prompt=>'Joined Date (YYYY-MM-DD)'
   ,p_display_as=>'NATIVE_TEXT_FIELD'
   ,p_cSize=>15
   ,p_field_template=>wwv_flow_api.id(472335722995945909)
   ,p_item_template_options=>'#DEFAULT#'
  );

  -- Page Processes
  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>10
   ,p_process_point=>'BEFORE_HEADER'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Fetch Record'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :P13_ID IS NOT NULL THEN
    SELECT household_code, family_size, children_count, adults_count,
           baseline_fuel_type, baseline_monthly_fuel_cost, status, to_char(joined_date, 'YYYY-MM-DD')
    INTO :P13_HOUSEHOLD_CODE, :P13_FAMILY_SIZE, :P13_CHILDREN_COUNT, :P13_ADULTS_COUNT,
         :P13_BASELINE_FUEL_TYPE, :P13_BASELINE_MONTHLY_FUEL_COST, :P13_STATUS, :P13_JOINED_DATE
    FROM households
    WHERE id = :P13_ID;
  ELSE
    :P13_STATUS := 'ACTIVE';
    :P13_FAMILY_SIZE := 5;
    :P13_ADULTS_COUNT := 3;
    :P13_CHILDREN_COUNT := 2;
    :P13_JOINED_DATE := to_char(SYSDATE, 'YYYY-MM-DD');
  END IF;
END;]'
   ,p_error_display_location=>'INLINE_IN_NOTIFICATION'
  );

  wwv_flow_api.create_page_process(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
   ,p_process_sequence=>20
   ,p_process_point=>'AFTER_SUBMIT'
   ,p_process_type=>'NATIVE_PLSQL'
   ,p_process_name=>'Process Household DML'
   ,p_process_sql_clob=>q'[
BEGIN
  IF :REQUEST = 'CREATE' THEN
    INSERT INTO households (
      id, kitchen_id, household_code, family_size, children_count, adults_count,
      baseline_fuel_type, baseline_monthly_fuel_cost, status, joined_date, created_at
    ) VALUES (
      COALESCE((SELECT MAX(id) + 1 FROM households), 1),
      1,
      :P13_HOUSEHOLD_CODE,
      TO_NUMBER(:P13_FAMILY_SIZE),
      TO_NUMBER(:P13_CHILDREN_COUNT),
      TO_NUMBER(:P13_ADULTS_COUNT),
      :P13_BASELINE_FUEL_TYPE,
      TO_NUMBER(:P13_BASELINE_MONTHLY_FUEL_COST),
      NVL(:P13_STATUS, 'ACTIVE'),
      TO_DATE(:P13_JOINED_DATE, 'YYYY-MM-DD'),
      SYSTIMESTAMP
    ) RETURNING id INTO :P13_ID;
    apex_application.g_print_success_message := 'Household created successfully.';
  ELSIF :REQUEST = 'SAVE' THEN
    UPDATE households
    SET household_code = :P13_HOUSEHOLD_CODE,
        family_size = TO_NUMBER(:P13_FAMILY_SIZE),
        children_count = TO_NUMBER(:P13_CHILDREN_COUNT),
        adults_count = TO_NUMBER(:P13_ADULTS_COUNT),
        baseline_fuel_type = :P13_BASELINE_FUEL_TYPE,
        baseline_monthly_fuel_cost = TO_NUMBER(:P13_BASELINE_MONTHLY_FUEL_COST),
        status = NVL(:P13_STATUS, 'ACTIVE'),
        joined_date = TO_DATE(:P13_JOINED_DATE, 'YYYY-MM-DD')
    WHERE id = :P13_ID;
    apex_application.g_print_success_message := 'Household changes saved.';
  ELSIF :REQUEST = 'DELETE' THEN
    DELETE FROM households WHERE id = :P13_ID;
    apex_application.g_print_success_message := 'Household deleted.';
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
`;

    console.log('Deploying Page 13 (Household Details Modal Form)...');
    await conn.execute(plsql);
    console.log('SUCCESS! Page 13 deployed successfully.');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
