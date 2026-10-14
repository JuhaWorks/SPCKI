/**
 * fix-all-buttons.cjs
 * Creates and attaches all buttons to their exact pages with explicit p_flow_step_id.
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
  PROCEDURE add_report_button(p_page_id NUMBER, p_btn_name VARCHAR2, p_label VARCHAR2, p_target_page NUMBER) IS
    l_plug_id NUMBER;
  BEGIN
    SELECT region_id INTO l_plug_id
    FROM apex_application_page_regions
    WHERE application_id = 100 AND page_id = p_page_id AND source_type = 'Interactive Report' AND ROWNUM = 1;

    wwv_flow_api.create_page_button(
      p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
     ,p_flow_step_id=>p_page_id
     ,p_button_sequence=>5
     ,p_button_plug_id=>wwv_flow_api.id(l_plug_id)
     ,p_button_name=>p_btn_name
     ,p_button_action=>'REDIRECT_PAGE'
     ,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
     ,p_button_template_id=>wwv_flow_api.id(472337158867945910)
     ,p_button_is_hot=>'Y'
     ,p_button_image_alt=>p_label
     ,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
     ,p_button_redirect_url=>'f?p=&APP_ID.:' || p_target_page || ':&SESSION.::&DEBUG.:' || p_target_page || '::'
     ,p_icon_css_classes=>'fa-plus'
    );
  END;

  PROCEDURE add_form_buttons(p_page_id NUMBER, p_pk_item VARCHAR2, p_create_label VARCHAR2) IS
    l_plug_id NUMBER;
  BEGIN
    -- Find Buttons Container region on this form page
    SELECT region_id INTO l_plug_id
    FROM apex_application_page_regions
    WHERE application_id = 100 AND page_id = p_page_id AND region_name = 'Buttons Container' AND ROWNUM = 1;

    -- 1. Cancel
    wwv_flow_api.create_page_button(
      p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
     ,p_flow_step_id=>p_page_id
     ,p_button_sequence=>10
     ,p_button_plug_id=>wwv_flow_api.id(l_plug_id)
     ,p_button_name=>'CANCEL'
     ,p_button_action=>'REDIRECT_URL'
     ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
     ,p_button_image_alt=>'Cancel'
     ,p_button_position=>'PREVIOUS'
     ,p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
    );

    -- 2. Delete
    wwv_flow_api.create_page_button(
      p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
     ,p_flow_step_id=>p_page_id
     ,p_button_sequence=>20
     ,p_button_plug_id=>wwv_flow_api.id(l_plug_id)
     ,p_button_name=>'DELETE'
     ,p_button_action=>'SUBMIT'
     ,p_button_template_options=>'#DEFAULT#:t-Button--danger'
     ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
     ,p_button_image_alt=>'Delete'
     ,p_button_position=>'PREVIOUS'
     ,p_button_condition=>p_pk_item || ' IS NOT NULL'
     ,p_button_condition_type=>'PLSQL_EXPRESSION'
     ,p_database_action=>'DELETE'
    );

    -- 3. Save
    wwv_flow_api.create_page_button(
      p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
     ,p_flow_step_id=>p_page_id
     ,p_button_sequence=>30
     ,p_button_plug_id=>wwv_flow_api.id(l_plug_id)
     ,p_button_name=>'SAVE'
     ,p_button_action=>'SUBMIT'
     ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
     ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
     ,p_button_is_hot=>'Y'
     ,p_button_image_alt=>'Save Changes'
     ,p_button_position=>'NEXT'
     ,p_button_condition=>p_pk_item || ' IS NOT NULL'
     ,p_button_condition_type=>'PLSQL_EXPRESSION'
     ,p_database_action=>'UPDATE'
    );

    -- 4. Create
    wwv_flow_api.create_page_button(
      p_id=>wwv_flow_api.id(wwv_flow_id.next_val)
     ,p_flow_step_id=>p_page_id
     ,p_button_sequence=>40
     ,p_button_plug_id=>wwv_flow_api.id(l_plug_id)
     ,p_button_name=>'CREATE'
     ,p_button_action=>'SUBMIT'
     ,p_button_template_options=>'#DEFAULT#:t-Button--primary'
     ,p_button_template_id=>wwv_flow_api.id(472337011970945910)
     ,p_button_is_hot=>'Y'
     ,p_button_image_alt=>p_create_label
     ,p_button_position=>'NEXT'
     ,p_button_condition=>p_pk_item || ' IS NULL'
     ,p_button_condition_type=>'PLSQL_EXPRESSION'
     ,p_database_action=>'INSERT'
    );
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

  -- Add Report Create Buttons
  add_report_button(2, 'CREATE_SESSION', '+ Log Cooking Session', 12);
  add_report_button(3, 'CREATE_HOUSEHOLD', '+ Register Household', 13);
  add_report_button(4, 'CREATE_SLOT', '+ Book Slot', 14);
  add_report_button(5, 'CREATE_LOG', '+ Add Daily Technical Log', 15);
  add_report_button(6, 'CREATE_GEN_LOG', '+ Log Generator Run', 16);
  add_report_button(7, 'CREATE_FEEDBACK', '+ Record Feedback', 17);

  -- Add Form Buttons (Cancel, Delete, Save, Create) to each modal form
  add_form_buttons(12, 'P12_ID', 'Create Session');
  add_form_buttons(13, 'P13_ID', 'Create Household');
  add_form_buttons(14, 'P14_ID', 'Book Slot');
  add_form_buttons(15, 'P15_ID', 'Create Daily Log');
  add_form_buttons(16, 'P16_ID', 'Log Generator Run');
  add_form_buttons(17, 'P17_ID', 'Record Feedback');

  wwv_flow_api.import_end(p_auto_install_sup_obj => false);
  COMMIT;
END;
`;

    console.log('Attaching buttons to all forms and reports...');
    await conn.execute(plsql);
    console.log('SUCCESS! All buttons attached successfully.');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
