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
    const res = await conn.execute(`
DECLARE
  l_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31',
    p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065,
    p_default_application_id=>100,
    p_default_id_offset=>0,
    p_default_owner=>'SOLAR_COOK'
  );

  SELECT region_id INTO l_plug_id
  FROM apex_application_page_regions
  WHERE application_id = 100 AND page_id = 13 AND region_name = 'Buttons Container';

  wwv_flow.g_flow_step_id := 13;

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val),
    p_button_sequence=>10,
    p_button_plug_id=>wwv_flow_api.id(l_plug_id),
    p_button_name=>'CANCEL',
    p_button_action=>'REDIRECT_URL',
    p_button_template_id=>wwv_flow_api.id(472337011970945910),
    p_button_image_alt=>'Cancel',
    p_button_position=>'REGION_TEMPLATE_PREVIOUS',
    p_button_redirect_url=>'javascript:apex.navigation.dialog.close(true);'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val),
    p_button_sequence=>20,
    p_button_plug_id=>wwv_flow_api.id(l_plug_id),
    p_button_name=>'SAVE',
    p_button_action=>'SUBMIT',
    p_button_template_options=>'#DEFAULT#:t-Button--primary',
    p_button_template_id=>wwv_flow_api.id(472337011970945910),
    p_button_is_hot=>'Y',
    p_button_image_alt=>'Save Changes',
    p_button_position=>'REGION_TEMPLATE_NEXT',
    p_database_action=>'UPDATE'
  );

  wwv_flow_api.create_page_button(
    p_id=>wwv_flow_api.id(wwv_flow_id.next_val),
    p_button_sequence=>30,
    p_button_plug_id=>wwv_flow_api.id(l_plug_id),
    p_button_name=>'CREATE',
    p_button_action=>'SUBMIT',
    p_button_template_options=>'#DEFAULT#:t-Button--primary',
    p_button_template_id=>wwv_flow_api.id(472337011970945910),
    p_button_is_hot=>'Y',
    p_button_image_alt=>'Create Household',
    p_button_position=>'REGION_TEMPLATE_NEXT',
    p_database_action=>'INSERT'
  );

  wwv_flow_api.import_end(false);
  COMMIT;
END;
    `);
    console.log('Test Page 13 buttons successfully deployed!');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
