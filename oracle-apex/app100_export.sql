prompt --application/set_environment
set define off verify off feedback off
whenever sqlerror exit sql.sqlcode rollback
--------------------------------------------------------------------------------
--
-- ORACLE Application Express (APEX) export file
--
-- You should run the script connected to SQL*Plus as the Oracle user
-- APEX_200100 or as the owner (parsing schema) of the application.
--
-- NOTE: Calls to apex_application_install override the defaults below.
--
--------------------------------------------------------------------------------
begin
wwv_flow_api.import_begin (
 p_version_yyyy_mm_dd=>'2020.03.31'
,p_release=>'20.1.0.00.13'
,p_default_workspace_id=>470548582849277065
,p_default_application_id=>100
,p_default_id_offset=>0
,p_default_owner=>'SOLAR_COOK'
);
end;
/
 
prompt APPLICATION 100 - SPCKI Monitoring Platform
--
-- Application Export:
--   Application:     100
--   Name:            SPCKI Monitoring Platform
--   Exported By:     SOLAR_COOK
--   Flashback:       0
--   Export Type:     Application Export
--     Pages:                     15
--       Items:                   58
--       Processes:               22
--       Regions:                 28
--       Buttons:                  9
--     Shared Components:
--       Logic:
--       Navigation:
--         Lists:                  3
--         Breadcrumbs:            1
--           Entries:              3
--       Security:
--         Authentication:         1
--         Authorization:          1
--       User Interface:
--         Themes:                 1
--         Templates:
--           Page:                 9
--           Region:              16
--           Label:                7
--           List:                13
--           Popup LOV:            1
--           Calendar:             1
--           Breadcrumb:           1
--           Button:               3
--           Report:              11
--         LOVs:                   6
--         Shortcuts:              1
--       Globalization:
--       Reports:
--       E-Mail:
--     Supporting Objects:  Excluded
--   Version:         20.1.0.00.13
--   Instance ID:     204262059315004
--

prompt --application/delete_application
begin
wwv_flow_api.remove_flow(wwv_flow.g_flow_id);
end;
/
prompt --application/create_application
begin
wwv_flow_api.create_flow(
 p_id=>wwv_flow.g_flow_id
,p_owner=>nvl(wwv_flow_application_install.get_schema,'SOLAR_COOK')
,p_name=>nvl(wwv_flow_application_install.get_application_name,'SPCKI Monitoring Platform')
,p_alias=>nvl(wwv_flow_application_install.get_application_alias,'SPCKI-MONITORING-PLATFORM')
,p_page_view_logging=>'YES'
,p_page_protection_enabled_y_n=>'Y'
,p_checksum_salt=>'98D1BDDB361455C3674303C8BC75949527394329B043198EA1DF768F406EBFB1'
,p_bookmark_checksum_function=>'SH512'
,p_compatibility_mode=>'19.2'
,p_flow_language=>'en'
,p_flow_language_derived_from=>'FLOW_PRIMARY_LANGUAGE'
,p_allow_feedback_yn=>'Y'
,p_date_format=>'DS'
,p_timestamp_format=>'DS'
,p_timestamp_tz_format=>'DS'
,p_direction_right_to_left=>'N'
,p_flow_image_prefix => nvl(wwv_flow_application_install.get_image_prefix,'')
,p_documentation_banner=>'Application created from create application wizard 2026.10.12.'
,p_authentication=>'PLUGIN'
,p_authentication_id=>wwv_flow_api.id(472220635047945851)
,p_application_tab_set=>1
,p_logo_type=>'T'
,p_logo_text=>'SPCKI Monitoring Platform'
,p_app_builder_icon_name=>'app-icon.svg'
,p_proxy_server=>nvl(wwv_flow_application_install.get_proxy,'')
,p_no_proxy_domains=>nvl(wwv_flow_application_install.get_no_proxy_domains,'')
,p_flow_version=>'Release 1.0'
,p_flow_status=>'AVAILABLE_W_EDIT_LINK'
,p_exact_substitutions_only=>'Y'
,p_browser_cache=>'N'
,p_browser_frame=>'D'
,p_rejoin_existing_sessions=>'N'
,p_csv_encoding=>'Y'
,p_auto_time_zone=>'N'
,p_substitution_string_01=>'APP_NAME'
,p_substitution_value_01=>'SPCKI Monitoring Platform'
,p_last_updated_by=>'SOLAR_COOK'
,p_last_upd_yyyymmddhh24miss=>'20261014025205'
,p_file_prefix => nvl(wwv_flow_application_install.get_static_app_file_prefix,'')
,p_files_version=>3
,p_ui_type_name => null
);
end;
/
prompt --application/shared_components/navigation/lists/desktop_navigation_menu
begin
wwv_flow_api.create_list(
 p_id=>wwv_flow_api.id(472221404925945854)
,p_name=>'Desktop Navigation Menu'
,p_list_status=>'PUBLIC'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472376942985945984)
,p_list_item_display_sequence=>10
,p_list_item_link_text=>'Home'
,p_list_item_link_target=>'f?p=&APP_ID.:1:&APP_SESSION.::&DEBUG.:'
,p_list_item_icon=>'fa-home'
,p_list_item_current_type=>'TARGET_PAGE'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472378419280945987)
,p_list_item_display_sequence=>20
,p_list_item_link_text=>'Cooking Sessions'
,p_list_item_link_target=>'f?p=&APP_ID.:2:&APP_SESSION.::&DEBUG.:'
,p_list_item_icon=>'fa-table'
,p_list_item_current_type=>'TARGET_PAGE'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472392523547946003)
,p_list_item_display_sequence=>30
,p_list_item_link_text=>'Households'
,p_list_item_link_target=>'f?p=&APP_ID.:3:&APP_SESSION.::&DEBUG.:'
,p_list_item_icon=>'fa-table'
,p_list_item_current_type=>'TARGET_PAGE'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472417670913000175)
,p_list_item_display_sequence=>40
,p_list_item_link_text=>'Slots Schedule'
,p_list_item_link_target=>'f?p=&APP_ID.:4:&APP_SESSION.::&DEBUG.:::'
,p_list_item_current_type=>'COLON_DELIMITED_PAGE_LIST'
,p_list_item_current_for_pages=>'4'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472423743694011171)
,p_list_item_display_sequence=>50
,p_list_item_link_text=>'Daily Technical Logs'
,p_list_item_link_target=>'f?p=&APP_ID.:5:&APP_SESSION.::&DEBUG.:::'
,p_list_item_current_type=>'COLON_DELIMITED_PAGE_LIST'
,p_list_item_current_for_pages=>'5'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472432402828022057)
,p_list_item_display_sequence=>60
,p_list_item_link_text=>'Generator Logs'
,p_list_item_link_target=>'f?p=&APP_ID.:6:&APP_SESSION.::&DEBUG.:::'
,p_list_item_current_type=>'COLON_DELIMITED_PAGE_LIST'
,p_list_item_current_for_pages=>'6'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472439576203034906)
,p_list_item_display_sequence=>70
,p_list_item_link_text=>'Monthly Feedback'
,p_list_item_link_target=>'f?p=&APP_ID.:7:&APP_SESSION.::&DEBUG.:::'
,p_list_item_current_type=>'COLON_DELIMITED_PAGE_LIST'
,p_list_item_current_for_pages=>'7'
);
end;
/
prompt --application/shared_components/navigation/lists/desktop_navigation_bar
begin
wwv_flow_api.create_list(
 p_id=>wwv_flow_api.id(472359290854945929)
,p_name=>'Desktop Navigation Bar'
,p_list_status=>'PUBLIC'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472415849582946025)
,p_list_item_display_sequence=>10
,p_list_item_link_text=>'&APP_USER.'
,p_list_item_link_target=>'#'
,p_list_item_icon=>'fa-user'
,p_list_text_02=>'has-username'
,p_list_item_current_type=>'TARGET_PAGE'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472416320523946025)
,p_list_item_display_sequence=>20
,p_list_item_link_text=>'---'
,p_list_item_link_target=>'separator'
,p_parent_list_item_id=>wwv_flow_api.id(472415849582946025)
,p_list_item_current_type=>'TARGET_PAGE'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472416735190946026)
,p_list_item_display_sequence=>30
,p_list_item_link_text=>'Sign Out'
,p_list_item_link_target=>'&LOGOUT_URL.'
,p_list_item_icon=>'fa-sign-out'
,p_parent_list_item_id=>wwv_flow_api.id(472415849582946025)
,p_list_item_current_type=>'TARGET_PAGE'
);
end;
/
prompt --application/shared_components/navigation/lists/page_navigation
begin
wwv_flow_api.create_list(
 p_id=>wwv_flow_api.id(472414363183946025)
,p_name=>'Page Navigation'
,p_list_status=>'PUBLIC'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472414724133946025)
,p_list_item_display_sequence=>20
,p_list_item_link_text=>'Cooking Sessions'
,p_list_item_link_target=>'f?p=&APP_ID.:2:&APP_SESSION.::&DEBUG.:'
,p_list_item_icon=>'fa-table'
,p_list_item_current_type=>'TARGET_PAGE'
);
wwv_flow_api.create_list_item(
 p_id=>wwv_flow_api.id(472415144936946025)
,p_list_item_display_sequence=>30
,p_list_item_link_text=>'Households'
,p_list_item_link_target=>'f?p=&APP_ID.:3:&APP_SESSION.::&DEBUG.:'
,p_list_item_icon=>'fa-table'
,p_list_item_current_type=>'TARGET_PAGE'
);
end;
/
prompt --application/shared_components/files/app_icon_svg
begin
wwv_flow_api.g_varchar2_table := wwv_flow_api.empty_varchar2_table;
wwv_flow_api.g_varchar2_table(1) := '3C73766720786D6C6E733D22687474703A2F2F7777772E77332E6F72672F323030302F737667222076696577426F783D22302030203634203634222077696474683D22363422206865696768743D223634223E3C726563742077696474683D2231303025';
wwv_flow_api.g_varchar2_table(2) := '22206865696768743D2231303025222066696C6C3D222332454246424322202F3E3C67206F7061636974793D222E32223E3C7061746820643D224D333220323661322E3520322E3520302031203020322E3520322E3541322E35303320322E3530332030';
wwv_flow_api.g_varchar2_table(3) := '203020302033322032367A6D30203461312E3520312E3520302031203120312E352D312E3541312E35303220312E3530322030203020312033322033307A222F3E3C7061746820643D224D34322E3533362033362E3832386C2D322E3637332D322E3637';
wwv_flow_api.g_varchar2_table(4) := '324131382E3937332031382E39373320302030203020343020333263302D352E3835352D322E3732332D31312E3439332D372E3636382D31352E383734612E352E352030203020302D2E36363420304332362E3732332032302E3530372032342032362E';
wwv_flow_api.g_varchar2_table(5) := '3134352032342033326131382E3937332031382E393733203020302030202E31333720322E3135366C2D322E36373320322E36373341342E39363720342E3936372030203020302032302034302E3336345634372E35612E352E35203020302030202E35';
wwv_flow_api.g_varchar2_table(6) := '2E3568312E30373561332E30303220332E30303220302030203020312E3935322D2E3732326C342E332D332E363835632E3431312E3538322E38343720312E31353520312E33323220312E37313261322E30303120322E30303120302030203020312E35';
wwv_flow_api.g_varchar2_table(7) := '32372E363935682E38323476312E35612E352E3520302030203020312030563436682E38323461322E30303120322E30303120302030203020312E3532372D2E3639352032332E37382032332E373820302030203020312E3332332D312E3731326C342E';
wwv_flow_api.g_varchar2_table(8) := '32393820332E36383461332E30303220332E30303220302030203020312E3935332E3732334834332E35612E352E35203020302030202E352D2E35762D372E31333661342E393720342E39372030203020302D312E3436342D332E3533367A4D33322031';
wwv_flow_api.g_varchar2_table(9) := '372E3137334132322E3839372032322E3839372030203020312033362E363237203233682D392E3235344132322E3839372032322E3839372030203020312033322031372E3137337A4D32322E3837362034362E3532613220322030203020312D312E33';
wwv_flow_api.g_varchar2_table(10) := '2E343831483231762D362E36333661332E39373320332E39373320302030203120312E3137312D322E3832386C322E31342D322E31346132302E3330312032302E33303120302030203020322E39353920372E3335377A6D31312E3231342D312E383633';
wwv_flow_api.g_varchar2_table(11) := '61312E30313420312E3031342030203020312D2E3736362E3334344833322E35762D392E35612E352E352030203020302D312030563435682D2E38323461312E30313420312E3031342030203020312D2E3736362D2E3334344131392E342031392E3420';
wwv_flow_api.g_varchar2_table(12) := '30203020312032352033326131382E3434362031382E34343620302030203120312E3835382D386831302E3238344131382E3434362031382E3434362030203020312033392033326131392E342031392E342030203020312D342E39312031322E363536';
wwv_flow_api.g_varchar2_table(13) := '7A4D3433203437682D2E353735613220322030203020312D312E3330322D2E3438326C2D342E3339332D332E3736356132302E332032302E3320302030203020322E3935382D372E3335386C322E313420322E313441332E39373520332E393735203020';
wwv_flow_api.g_varchar2_table(14) := '3020312034332034302E3336347A222F3E3C2F673E3C7061746820643D224D33322031372E3137334132322E3839372032322E3839372030203020312033362E363237203233682D392E3235344132322E3839372032322E383937203020302031203332';
wwv_flow_api.g_varchar2_table(15) := '2031372E3137337A4D32322E3837362034362E3532613220322030203020312D312E332E343831483231762D362E36333661332E39373320332E39373320302030203120312E3137312D322E3832386C322E31342D322E31346132302E3330312032302E';
wwv_flow_api.g_varchar2_table(16) := '33303120302030203020322E39353920372E3335377A4D3433203437682D2E353735613220322030203020312D312E3330322D2E3438326C2D342E3339332D332E3736356132302E332032302E3320302030203020322E3935382D372E3335386C322E31';
wwv_flow_api.g_varchar2_table(17) := '3420322E313441332E39373520332E3937352030203020312034332034302E3336347A222066696C6C3D222366636662666122206F7061636974793D222E34222F3E3C7061746820643D224D33372E3134322032344832362E3835384131382E34343620';
wwv_flow_api.g_varchar2_table(18) := '31382E3434362030203020302032352033326131392E342031392E3420302030203020342E39312031322E36353620312E30313420312E303134203020302030202E3736362E333434682E383234762D392E35612E352E35203020302031203120305634';
wwv_flow_api.g_varchar2_table(19) := '35682E38323461312E30313420312E303134203020302030202E3736362D2E3334344131392E342031392E342030203020302033392033326131382E3434362031382E3434362030203020302D312E3835382D387A4D333220333161322E3520322E3520';
wwv_flow_api.g_varchar2_table(20) := '302031203120322E352D322E3541322E35303320322E3530332030203020312033322033317A222066696C6C3D222366666622206F7061636974793D222E3935222F3E3C7061746820643D224D333220333061312E3520312E3520302031203120312E35';
wwv_flow_api.g_varchar2_table(21) := '2D312E3541312E35303220312E3530322030203020312033322033307A222066696C6C3D222366636662666122206F7061636974793D222E36222F3E3C2F7376673E';
wwv_flow_api.create_app_static_file(
 p_id=>wwv_flow_api.id(472360511325945951)
,p_file_name=>'app-icon.svg'
,p_mime_type=>'image/svg+xml'
,p_file_charset=>'utf-8'
,p_file_content => wwv_flow_api.varchar2_to_blob(wwv_flow_api.g_varchar2_table)
);
end;
/
prompt --application/shared_components/files/app_icon_css
begin
wwv_flow_api.g_varchar2_table := wwv_flow_api.empty_varchar2_table;
wwv_flow_api.g_varchar2_table(1) := '2E6170702D69636F6E207B0A202020206261636B67726F756E642D696D6167653A2075726C286170702D69636F6E2E737667293B0A202020206261636B67726F756E642D7265706561743A206E6F2D7265706561743B0A202020206261636B67726F756E';
wwv_flow_api.g_varchar2_table(2) := '642D73697A653A20636F7665723B0A202020206261636B67726F756E642D706F736974696F6E3A203530253B0A202020206261636B67726F756E642D636F6C6F723A20233245424642433B0A7D';
wwv_flow_api.create_app_static_file(
 p_id=>wwv_flow_api.id(472360868913945951)
,p_file_name=>'app-icon.css'
,p_mime_type=>'text/css'
,p_file_charset=>'utf-8'
,p_file_content => wwv_flow_api.varchar2_to_blob(wwv_flow_api.g_varchar2_table)
);
end;
/
prompt --application/plugin_settings
begin
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472218586362945848)
,p_plugin_type=>'REGION TYPE'
,p_plugin=>'NATIVE_DISPLAY_SELECTOR'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472218809569945850)
,p_plugin_type=>'ITEM TYPE'
,p_plugin=>'NATIVE_RICH_TEXT_EDITOR'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472219177217945850)
,p_plugin_type=>'REGION TYPE'
,p_plugin=>'NATIVE_IR'
,p_attribute_01=>'IG'
);
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472219404600945850)
,p_plugin_type=>'REGION TYPE'
,p_plugin=>'NATIVE_CSS_CALENDAR'
);
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472219708965945850)
,p_plugin_type=>'ITEM TYPE'
,p_plugin=>'NATIVE_COLOR_PICKER'
,p_attribute_01=>'modern'
);
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472220054355945850)
,p_plugin_type=>'ITEM TYPE'
,p_plugin=>'NATIVE_STAR_RATING'
,p_attribute_01=>'fa-star'
,p_attribute_04=>'#VALUE#'
);
wwv_flow_api.create_plugin_setting(
 p_id=>wwv_flow_api.id(472220352580945850)
,p_plugin_type=>'ITEM TYPE'
,p_plugin=>'NATIVE_YES_NO'
,p_attribute_01=>'Y'
,p_attribute_03=>'N'
,p_attribute_05=>'SWITCH_CB'
);
end;
/
prompt --application/shared_components/security/authorizations/administration_rights
begin
wwv_flow_api.create_security_scheme(
 p_id=>wwv_flow_api.id(472362174803945953)
,p_name=>'Administration Rights'
,p_scheme_type=>'NATIVE_FUNCTION_BODY'
,p_attribute_01=>'return true;'
,p_error_message=>'Insufficient privileges, user is not an Administrator'
,p_caching=>'BY_USER_BY_PAGE_VIEW'
);
end;
/
prompt --application/shared_components/navigation/navigation_bar
begin
null;
end;
/
prompt --application/shared_components/logic/application_settings
begin
null;
end;
/
prompt --application/shared_components/navigation/tabs/standard
begin
null;
end;
/
prompt --application/shared_components/navigation/tabs/parent
begin
null;
end;
/
prompt --application/shared_components/user_interface/lovs/appliances_name
begin
wwv_flow_api.create_list_of_values(
 p_id=>wwv_flow_api.id(472387601260945998)
,p_lov_name=>'APPLIANCES.NAME'
,p_source_type=>'TABLE'
,p_location=>'LOCAL'
,p_query_table=>'APPLIANCES'
,p_return_column_name=>'ID'
,p_display_column_name=>'NAME'
,p_default_sort_column_name=>'NAME'
,p_default_sort_direction=>'ASC'
);
end;
/
prompt --application/shared_components/user_interface/lovs/households_household_code
begin
wwv_flow_api.create_list_of_values(
 p_id=>wwv_flow_api.id(472388291657945998)
,p_lov_name=>'HOUSEHOLDS.HOUSEHOLD_CODE'
,p_source_type=>'TABLE'
,p_location=>'LOCAL'
,p_query_table=>'HOUSEHOLDS'
,p_return_column_name=>'ID'
,p_display_column_name=>'HOUSEHOLD_CODE'
,p_default_sort_column_name=>'HOUSEHOLD_CODE'
,p_default_sort_direction=>'ASC'
);
end;
/
prompt --application/shared_components/user_interface/lovs/login_remember_username
begin
wwv_flow_api.create_list_of_values(
 p_id=>wwv_flow_api.id(472372137129945975)
,p_lov_name=>'LOGIN_REMEMBER_USERNAME'
,p_lov_query=>'.'||wwv_flow_api.id(472372137129945975)||'.'
,p_location=>'STATIC'
);
wwv_flow_api.create_static_lov_data(
 p_id=>wwv_flow_api.id(472372505321945976)
,p_lov_disp_sequence=>10
,p_lov_disp_value=>'Remember username'
,p_lov_return_value=>'Y'
);
end;
/
prompt --application/shared_components/user_interface/lovs/problem_categories_kind
begin
wwv_flow_api.create_list_of_values(
 p_id=>wwv_flow_api.id(472388858081945998)
,p_lov_name=>'PROBLEM_CATEGORIES.KIND'
,p_source_type=>'TABLE'
,p_location=>'LOCAL'
,p_query_table=>'PROBLEM_CATEGORIES'
,p_return_column_name=>'ID'
,p_display_column_name=>'KIND'
,p_default_sort_column_name=>'KIND'
,p_default_sort_direction=>'ASC'
);
end;
/
prompt --application/shared_components/user_interface/lovs/slots_start_time
begin
wwv_flow_api.create_list_of_values(
 p_id=>wwv_flow_api.id(472389776205945998)
,p_lov_name=>'SLOTS.START_TIME'
,p_source_type=>'TABLE'
,p_location=>'LOCAL'
,p_query_table=>'SLOTS'
,p_return_column_name=>'ID'
,p_display_column_name=>'START_TIME'
,p_default_sort_column_name=>'START_TIME'
,p_default_sort_direction=>'ASC'
);
end;
/
prompt --application/shared_components/user_interface/lovs/users_username
begin
wwv_flow_api.create_list_of_values(
 p_id=>wwv_flow_api.id(472390318444946000)
,p_lov_name=>'USERS.USERNAME'
,p_source_type=>'TABLE'
,p_location=>'LOCAL'
,p_query_table=>'USERS'
,p_return_column_name=>'ID'
,p_display_column_name=>'USERNAME'
,p_default_sort_column_name=>'USERNAME'
,p_default_sort_direction=>'ASC'
);
end;
/
prompt --application/pages/page_groups
begin
wwv_flow_api.create_page_group(
 p_id=>wwv_flow_api.id(472362752064945954)
,p_group_name=>'Administration'
);
end;
/
prompt --application/shared_components/navigation/breadcrumbs/breadcrumb
begin
wwv_flow_api.create_menu(
 p_id=>wwv_flow_api.id(472220915933945851)
,p_name=>'Breadcrumb'
);
wwv_flow_api.create_menu_option(
 p_id=>wwv_flow_api.id(472221157808945853)
,p_short_name=>'Home'
,p_link=>'f?p=&APP_ID.:1:&APP_SESSION.::&DEBUG.'
,p_page_id=>1
);
wwv_flow_api.create_menu_option(
 p_id=>wwv_flow_api.id(472392168142946003)
,p_short_name=>'Cooking Sessions'
,p_link=>'f?p=&APP_ID.:2:&APP_SESSION.::&DEBUG.:::'
,p_page_id=>2
);
wwv_flow_api.create_menu_option(
 p_id=>wwv_flow_api.id(472399315033946006)
,p_short_name=>'Households'
,p_link=>'f?p=&APP_ID.:3:&APP_SESSION.::&DEBUG.:::'
,p_page_id=>3
);
end;
/
prompt --application/shared_components/user_interface/templates/page/master_detail
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472221711174945859)
,p_theme_id=>42
,p_name=>'Marquee'
,p_internal_name=>'MASTER_DETAIL'
,p_is_popup=>false
,p_javascript_file_urls=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.stickyTableHeader#MIN#.js?v=#APEX_VERSION#',
'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.apexTabs#MIN#.js?v=#APEX_VERSION#'))
,p_javascript_code_onload=>'apex.theme42.initializePage.masterDetail();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-PageBody t-PageBody--masterDetail t-PageBody--hideLeft no-anim #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">',
'<a href="#main" id="t_Body_skipToContent">&APP_TEXT$UI_PAGE_SKIP_TO_CONTENT.</a>',
'#FORM_OPEN#',
'<header class="t-Header" id="t_Header" role="banner">',
'  #REGION_POSITION_07#',
'  <div class="t-Header-branding">',
'    <div class="t-Header-controls">',
'      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" aria-label="#EXPAND_COLLAPSE_NAV_LABEL#" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Header-controlsIcon" aria-hidden="t'
||'rue"></span></button>',
'    </div>',
'    <div class="t-Header-logo">',
'      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>',
'    </div>',
'    <div class="t-Header-navBar">#NAVIGATION_BAR#</div>',
'  </div>',
'  <div class="t-Header-nav">#TOP_GLOBAL_NAVIGATION_LIST##REGION_POSITION_06#</div>',
'</header>'))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body">',
'  #SIDE_GLOBAL_NAVIGATION_LIST#',
'  <div class="t-Body-main">',
'    <div class="t-Body-title" id="t_Body_title">#REGION_POSITION_01#</div>',
'    <div class="t-Body-content" id="t_Body_content">',
'      <main id="main" class="t-Body-mainContent">',
'        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#',
'        <div class="t-Body-fullContent">#REGION_POSITION_08#</div>',
'        <div class="t-Body-info" id="t_Body_info">#REGION_POSITION_02#</div>',
'        <div class="t-Body-contentInner" role="main">#BODY#</div>',
'      </main>',
'      <footer class="t-Footer" role="contentinfo">',
'        <div class="t-Footer-body">',
'          <div class="t-Footer-content">#REGION_POSITION_05#</div>',
'          <div class="t-Footer-apex">',
'            <div class="t-Footer-version">#APP_VERSION#</div>',
'            <div class="t-Footer-customize">#CUSTOMIZE#</div>',
'            #BUILT_WITH_LOVE_USING_APEX#',
'          </div>',
'        </div>',
'        <div class="t-Footer-top">',
'          <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>',
'        </div>',
'      </footer>',
'    </div>',
'  </div>',
'  <div class="t-Body-actions" id="t_Body_actions">',
'    <button class="t-Body-actionsToggle" title="#EXPAND_COLLAPSE_SIDE_COL_LABEL#" id="t_Button_rightControlButton" type="button"><span class="t-Body-actionsControlsIcon" aria-hidden="true"></span></button>',
'    <div class="t-Body-actionsContent" role="complementary">#REGION_POSITION_03#</div>',
'  </div>',
'</div>',
'<div class="t-Body-inlineDialogs">#REGION_POSITION_04#</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_navigation_bar=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-NavigationBar" data-mode="classic">',
'  <li class="t-NavigationBar-item">',
'    <span class="t-Button t-Button--icon t-Button--noUI t-Button--header t-Button--navBar t-Button--headerUser">',
'      <span class="t-Icon a-Icon icon-user"></span>',
'      <span class="t-Button-label">&APP_USER.</span>',
'    </span>',
'  </li>#BAR_BODY#',
'</ul>'))
,p_navbar_entry=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item">',
'  <a class="t-Button t-Button--icon t-Button--header t-Button--navBar" href="#LINK#">',
'    <span class="t-Icon #IMAGE#"></span>',
'    <span class="t-Button-label">#TEXT#</span>',
'  </a>',
'</li>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_sidebar_def_reg_pos=>'REGION_POSITION_03'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>17
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>1996914646461572319
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472222094550945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472222373927945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Breadcrumb Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472222639983945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Master Detail'
,p_placeholder=>'REGION_POSITION_02'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472222926184945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Right Side Column'
,p_placeholder=>'REGION_POSITION_03'
,p_has_grid_support=>false
,p_glv_new_row=>false
,p_max_fixed_grid_columns=>4
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472223296900945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Inline Dialogs'
,p_placeholder=>'REGION_POSITION_04'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472223528097945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Footer'
,p_placeholder=>'REGION_POSITION_05'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472223800823945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Page Navigation'
,p_placeholder=>'REGION_POSITION_06'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472224145988945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Page Header'
,p_placeholder=>'REGION_POSITION_07'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472224486228945864)
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_name=>'Before Content Body'
,p_placeholder=>'REGION_POSITION_08'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
end;
/
prompt --application/shared_components/user_interface/templates/page/modal_dialog
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472224840776945867)
,p_theme_id=>42
,p_name=>'Modal Dialog'
,p_internal_name=>'MODAL_DIALOG'
,p_is_popup=>true
,p_javascript_code_onload=>'apex.theme42.initializePage.modalDialog();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-Dialog-page t-Dialog-page--standard #DIALOG_CSS_CLASSES# #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD#>',
'#FORM_OPEN#'))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Dialog" role="dialog" aria-label="#TITLE#">',
'  <div class="t-Dialog-header">#REGION_POSITION_01#</div>',
'  <div class="t-Dialog-bodyWrapperOut">',
'    <div class="t-Dialog-bodyWrapperIn">',
'      <div class="t-Dialog-body" role="main">#SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION##BODY#</div>',
'    </div>',
'  </div>',
'  <div class="t-Dialog-footer">#REGION_POSITION_03#</div>',
'</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>3
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},''t-Dialog-page--standard ''+#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_height=>'auto'
,p_dialog_width=>'720'
,p_dialog_max_width=>'960'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2098960803539086924
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472225175198945868)
,p_page_template_id=>wwv_flow_api.id(472224840776945867)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472225423851945868)
,p_page_template_id=>wwv_flow_api.id(472224840776945867)
,p_name=>'Dialog Header'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472225780134945868)
,p_page_template_id=>wwv_flow_api.id(472224840776945867)
,p_name=>'Dialog Footer'
,p_placeholder=>'REGION_POSITION_03'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/page/login
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472226368032945868)
,p_theme_id=>42
,p_name=>'Login'
,p_internal_name=>'LOGIN'
,p_is_popup=>false
,p_javascript_code_onload=>'apex.theme42.initializePage.appLogin();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-PageBody--login no-anim #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD#>',
'#FORM_OPEN#'))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Login-container">',
'  <header class="t-Login-containerHeader">#REGION_POSITION_01#</header>',
'  <main class="t-Login-containerBody" id="main">#SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION##BODY#</main>',
'  <footer class="t-Login-containerFooter">#REGION_POSITION_02#</footer>',
'</div>',
''))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>6
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2099711150063350616
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472226638303945868)
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472226964806945868)
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_name=>'Body Header'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472227270529945868)
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_name=>'Body Footer'
,p_placeholder=>'REGION_POSITION_02'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/page/wizard_modal_dialog
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472228635473945870)
,p_theme_id=>42
,p_name=>'Wizard Modal Dialog'
,p_internal_name=>'WIZARD_MODAL_DIALOG'
,p_is_popup=>true
,p_javascript_code_onload=>'apex.theme42.initializePage.wizardModal();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-Dialog-page t-Dialog-page--wizard #DIALOG_CSS_CLASSES# #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD#>',
'#FORM_OPEN#'))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Dialog" role="dialog" aria-label="#TITLE#">',
'  <div class="t-Dialog-header">#REGION_POSITION_01#</div>',
'  <div class="t-Dialog-bodyWrapperOut">',
'    <div class="t-Dialog-bodyWrapperIn">',
'      <div class="t-Dialog-body" role="main">#SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION##BODY#</div>',
'    </div>',
'  </div>',
'  <div class="t-Dialog-footer">#REGION_POSITION_03#</div>',
'</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_theme_class_id=>3
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},''t-Dialog-page--wizard ''+#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_height=>'auto'
,p_dialog_width=>'720'
,p_dialog_max_width=>'960'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2120348229686426515
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472228956637945870)
,p_page_template_id=>wwv_flow_api.id(472228635473945870)
,p_name=>'Wizard Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472229282438945870)
,p_page_template_id=>wwv_flow_api.id(472228635473945870)
,p_name=>'Wizard Progress Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472229513843945870)
,p_page_template_id=>wwv_flow_api.id(472228635473945870)
,p_name=>'Wizard Buttons'
,p_placeholder=>'REGION_POSITION_03'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/page/left_side_column
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472230165807945870)
,p_theme_id=>42
,p_name=>'Left Side Column'
,p_internal_name=>'LEFT_SIDE_COLUMN'
,p_is_popup=>false
,p_javascript_code_onload=>'apex.theme42.initializePage.leftSideCol();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-PageBody t-PageBody--showLeft t-PageBody--hideActions no-anim #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">',
'<a href="#main" id="t_Body_skipToContent">&APP_TEXT$UI_PAGE_SKIP_TO_CONTENT.</a>',
'#FORM_OPEN#',
'<header class="t-Header" id="t_Header" role="banner">',
'  #REGION_POSITION_07#',
'  <div class="t-Header-branding">',
'    <div class="t-Header-controls">',
'      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" aria-label="#EXPAND_COLLAPSE_NAV_LABEL#" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Header-controlsIcon" aria-hidden="t'
||'rue"></span></button>',
'    </div>',
'    <div class="t-Header-logo">',
'      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>',
'    </div>',
'    <div class="t-Header-navBar">#NAVIGATION_BAR#</div>',
'  </div>',
'  <div class="t-Header-nav">#TOP_GLOBAL_NAVIGATION_LIST##REGION_POSITION_06#</div>',
'</header>',
''))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body">',
'  #SIDE_GLOBAL_NAVIGATION_LIST#',
'  <div class="t-Body-main">',
'    <div class="t-Body-title" id="t_Body_title">#REGION_POSITION_01#</div>',
'    <div class="t-Body-side" id="t_Body_side">#REGION_POSITION_02#</div>',
'    <div class="t-Body-content" id="t_Body_content">',
'      <main id="main" class="t-Body-mainContent">',
'        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#',
'        <div class="t-Body-fullContent">#REGION_POSITION_08#</div>',
'        <div class="t-Body-contentInner">#BODY#</div>',
'      </main>',
'      <footer class="t-Footer" role="contentinfo">',
'        <div class="t-Footer-body">',
'          <div class="t-Footer-content">#REGION_POSITION_05#</div>',
'          <div class="t-Footer-apex">',
'            <div class="t-Footer-version">#APP_VERSION#</div>',
'            <div class="t-Footer-customize">#CUSTOMIZE#</div>',
'            #BUILT_WITH_LOVE_USING_APEX#',
'          </div>',
'        </div>',
'        <div class="t-Footer-top">',
'          <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>',
'        </div>',
'      </footer>',
'    </div>',
'  </div>',
'</div>',
'<div class="t-Body-inlineDialogs">#REGION_POSITION_04#</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_navigation_bar=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-NavigationBar" data-mode="classic">',
'  <li class="t-NavigationBar-item">',
'    <span class="t-Button t-Button--icon t-Button--noUI t-Button--header t-Button--navBar t-Button--headerUser">',
'      <span class="t-Icon a-Icon icon-user"></span>',
'      <span class="t-Button-label">&APP_USER.</span>',
'    </span>',
'  </li>#BAR_BODY#',
'</ul>'))
,p_navbar_entry=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item">',
'  <a class="t-Button t-Button--icon t-Button--header t-Button--navBar" href="#LINK#">',
'    <span class="t-Icon #IMAGE#"></span>',
'    <span class="t-Button-label">#TEXT#</span>',
'  </a>',
'</li>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>17
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2525196570560608698
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472230485815945870)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472230734881945870)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Breadcrumb Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472231095523945870)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Left Column'
,p_placeholder=>'REGION_POSITION_02'
,p_has_grid_support=>false
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>4
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472231318093945871)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Inline Dialogs'
,p_placeholder=>'REGION_POSITION_04'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472231669470945871)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Footer'
,p_placeholder=>'REGION_POSITION_05'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472231991811945871)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Page Navigation'
,p_placeholder=>'REGION_POSITION_06'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472232295295945871)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Page Header'
,p_placeholder=>'REGION_POSITION_07'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472232553509945871)
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_name=>'Before Content Body'
,p_placeholder=>'REGION_POSITION_08'
,p_has_grid_support=>true
,p_glv_new_row=>false
,p_max_fixed_grid_columns=>8
);
end;
/
prompt --application/shared_components/user_interface/templates/page/right_side_column
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472232951251945871)
,p_theme_id=>42
,p_name=>'Right Side Column'
,p_internal_name=>'RIGHT_SIDE_COLUMN'
,p_is_popup=>false
,p_javascript_code_onload=>'apex.theme42.initializePage.rightSideCol();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8"> ',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-PageBody t-PageBody--hideLeft no-anim #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">',
'<a href="#main" id="t_Body_skipToContent">&APP_TEXT$UI_PAGE_SKIP_TO_CONTENT.</a>',
'#FORM_OPEN#',
'<header class="t-Header" id="t_Header" role="banner">',
'  #REGION_POSITION_07#',
'  <div class="t-Header-branding">',
'    <div class="t-Header-controls">',
'      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" aria-label="#EXPAND_COLLAPSE_NAV_LABEL#" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Header-controlsIcon" aria-hidden="t'
||'rue"></span></button>',
'    </div>',
'    <div class="t-Header-logo">',
'      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>',
'    </div>',
'    <div class="t-Header-navBar">#NAVIGATION_BAR#</div>',
'  </div>',
'  <div class="t-Header-nav">#TOP_GLOBAL_NAVIGATION_LIST##REGION_POSITION_06#</div>',
'</header>'))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body">',
'  #SIDE_GLOBAL_NAVIGATION_LIST#',
'  <div class="t-Body-main">',
'    <div class="t-Body-title" id="t_Body_title">#REGION_POSITION_01#</div>',
'    <div class="t-Body-content" id="t_Body_content">',
'      <main id="main" class="t-Body-mainContent">',
'        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#',
'        <div class="t-Body-fullContent">#REGION_POSITION_08#</div>',
'        <div class="t-Body-contentInner">#BODY#</div>',
'      </main>',
'      <footer class="t-Footer" role="contentinfo">',
'        <div class="t-Footer-body">',
'          <div class="t-Footer-content">#REGION_POSITION_05#</div>',
'          <div class="t-Footer-apex">',
'            <div class="t-Footer-version">#APP_VERSION#</div>',
'            <div class="t-Footer-customize">#CUSTOMIZE#</div>',
'            #BUILT_WITH_LOVE_USING_APEX#',
'          </div>',
'        </div>',
'        <div class="t-Footer-top">',
'          <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>',
'        </div>',
'      </footer>',
'    </div>',
'  </div>',
'  <div class="t-Body-actions" id="t_Body_actions">',
'    <button class="t-Body-actionsToggle" aria-label="#EXPAND_COLLAPSE_SIDE_COL_LABEL#" title="#EXPAND_COLLAPSE_SIDE_COL_LABEL#" id="t_Button_rightControlButton" type="button"><span class="t-Body-actionsControlsIcon" aria-hidden="true"></span></button'
||'>',
'    <div class="t-Body-actionsContent" role="complementary">#REGION_POSITION_03#</div>',
'  </div>',
'</div>',
'<div class="t-Body-inlineDialogs">#REGION_POSITION_04#</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_navigation_bar=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-NavigationBar" data-mode="classic">',
'  <li class="t-NavigationBar-item">',
'    <span class="t-Button t-Button--icon t-Button--noUI t-Button--header t-Button--navBar t-Button--headerUser">',
'      <span class="t-Icon a-Icon icon-user"></span>',
'      <span class="t-Button-label">&APP_USER.</span>',
'    </span>',
'  </li>#BAR_BODY#',
'</ul>'))
,p_navbar_entry=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item">',
'  <a class="t-Button t-Button--icon t-Button--header t-Button--navBar" href="#LINK#">',
'    <span class="t-Icon #IMAGE#"></span>',
'    <span class="t-Button-label">#TEXT#</span>',
'  </a>',
'</li>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_sidebar_def_reg_pos=>'REGION_POSITION_03'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>17
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2525200116240651575
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472233227065945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472233548303945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Breadcrumb Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472233887259945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Right Column'
,p_placeholder=>'REGION_POSITION_03'
,p_has_grid_support=>false
,p_glv_new_row=>false
,p_max_fixed_grid_columns=>4
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472234155678945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Inline Dialogs'
,p_placeholder=>'REGION_POSITION_04'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472234466430945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Footer'
,p_placeholder=>'REGION_POSITION_05'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472234791517945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Page Navigation'
,p_placeholder=>'REGION_POSITION_06'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472235004795945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Page Header'
,p_placeholder=>'REGION_POSITION_07'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472235310687945871)
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_name=>'Before Content Body'
,p_placeholder=>'REGION_POSITION_08'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>8
);
end;
/
prompt --application/shared_components/user_interface/templates/page/left_and_right_side_columns
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472235794693945871)
,p_theme_id=>42
,p_name=>'Left and Right Side Columns'
,p_internal_name=>'LEFT_AND_RIGHT_SIDE_COLUMNS'
,p_is_popup=>false
,p_javascript_code_onload=>'apex.theme42.initializePage.bothSideCols();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">  ',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>',
'</head>',
'<body class="t-PageBody t-PageBody--showLeft no-anim #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">',
'<a href="#main" id="t_Body_skipToContent">&APP_TEXT$UI_PAGE_SKIP_TO_CONTENT.</a>',
'#FORM_OPEN#',
'<header class="t-Header" id="t_Header" role="banner">',
'  #REGION_POSITION_07#',
'  <div class="t-Header-branding">',
'    <div class="t-Header-controls">',
'      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" aria-label="#EXPAND_COLLAPSE_NAV_LABEL#" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Header-controlsIcon" aria-hidden="t'
||'rue"></span></button>',
'    </div>',
'    <div class="t-Header-logo">',
'      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>',
'    </div>',
'    <div class="t-Header-navBar">#NAVIGATION_BAR#</div>',
'  </div>',
'  <div class="t-Header-nav">#TOP_GLOBAL_NAVIGATION_LIST##REGION_POSITION_06#</div>',
'</header>',
''))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body">',
'  #SIDE_GLOBAL_NAVIGATION_LIST#',
'  <div class="t-Body-main">',
'    <div class="t-Body-title" id="t_Body_title">#REGION_POSITION_01#</div>',
'    <div class="t-Body-side" id="t_Body_side">#REGION_POSITION_02#</div>',
'    <div class="t-Body-content" id="t_Body_content">',
'      <main id="main" class="t-Body-mainContent">',
'        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#',
'        <div class="t-Body-fullContent">#REGION_POSITION_08#</div>',
'        <div class="t-Body-contentInner">#BODY#</div>',
'      </main>',
'      <footer class="t-Footer" role="contentinfo">',
'        <div class="t-Footer-body">',
'          <div class="t-Footer-content">#REGION_POSITION_05#</div>',
'          <div class="t-Footer-apex">',
'            <div class="t-Footer-version">#APP_VERSION#</div>',
'            <div class="t-Footer-customize">#CUSTOMIZE#</div>',
'            #BUILT_WITH_LOVE_USING_APEX#',
'          </div>',
'        </div>',
'        <div class="t-Footer-top">',
'          <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>',
'        </div>',
'      </footer>',
'    </div>',
'  </div>',
'  <div class="t-Body-actions" id="t_Body_actions">',
'    <button class="t-Body-actionsToggle" title="#EXPAND_COLLAPSE_SIDE_COL_LABEL#" id="t_Button_rightControlButton" type="button"><span class="t-Body-actionsControlsIcon" aria-hidden="true"></span></button>',
'    <div class="t-Body-actionsContent" role="complementary">#REGION_POSITION_03#</div>',
'  </div>',
'</div>',
'<div class="t-Body-inlineDialogs">#REGION_POSITION_04#</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>'))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Success'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" onclick="apex.jQuery(''#t_Alert_Notification'').remove();" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_navigation_bar=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-NavigationBar" data-mode="classic">',
'  <li class="t-NavigationBar-item">',
'    <span class="t-Button t-Button--icon t-Button--noUI t-Button--header t-Button--navBar t-Button--headerUser">',
'      <span class="t-Icon a-Icon icon-user"></span>',
'      <span class="t-Button-label">&APP_USER.</span>',
'    </span>',
'  </li>#BAR_BODY#',
'</ul>'))
,p_navbar_entry=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item">',
'  <a class="t-Button t-Button--icon t-Button--header t-Button--navBar" href="#LINK#">',
'    <span class="t-Icon #IMAGE#"></span>',
'    <span class="t-Button-label">#TEXT#</span>',
'  </a>',
'</li>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_sidebar_def_reg_pos=>'REGION_POSITION_03'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>17
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2525203692562657055
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472236065408945871)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>6
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472236378423945871)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Breadcrumb Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472236602890945871)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Left Column'
,p_placeholder=>'REGION_POSITION_02'
,p_has_grid_support=>false
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>3
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472236900358945873)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Right Column'
,p_placeholder=>'REGION_POSITION_03'
,p_has_grid_support=>false
,p_glv_new_row=>false
,p_max_fixed_grid_columns=>3
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472237289389945873)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Inline Dialogs'
,p_placeholder=>'REGION_POSITION_04'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472237597444945873)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Footer'
,p_placeholder=>'REGION_POSITION_05'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>6
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472237840797945873)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Page Navigation'
,p_placeholder=>'REGION_POSITION_06'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472238123575945873)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Page Header'
,p_placeholder=>'REGION_POSITION_07'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472238456510945873)
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_name=>'Before Content Body'
,p_placeholder=>'REGION_POSITION_08'
,p_has_grid_support=>true
,p_glv_new_row=>false
,p_max_fixed_grid_columns=>6
);
end;
/
prompt --application/shared_components/user_interface/templates/page/minimal_no_navigation
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472238803777945873)
,p_theme_id=>42
,p_name=>'Minimal (No Navigation)'
,p_internal_name=>'MINIMAL_NO_NAVIGATION'
,p_is_popup=>false
,p_javascript_code_onload=>'apex.theme42.initializePage.noSideCol();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#  ',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-PageBody t-PageBody--hideLeft t-PageBody--hideActions no-anim #PAGE_CSS_CLASSES# t-PageBody--noNav" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">',
'<a href="#main" id="t_Body_skipToContent">&APP_TEXT$UI_PAGE_SKIP_TO_CONTENT.</a>',
'#FORM_OPEN#',
'<header class="t-Header" id="t_Header" role="banner">',
'  #REGION_POSITION_07#',
'  <div class="t-Header-branding">',
'    <div class="t-Header-controls">',
'      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" aria-label="#EXPAND_COLLAPSE_NAV_LABEL#" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Icon fa fa-bars" aria-hidden="true"'
||'></span></button>',
'    </div>',
'    <div class="t-Header-logo">',
'      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>',
'    </div>',
'    <div class="t-Header-navBar">#NAVIGATION_BAR#</div>',
'  </div>',
'</header>',
'    '))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body">',
'  <div class="t-Body-main">',
'    <div class="t-Body-title" id="t_Body_title">#REGION_POSITION_01#</div>',
'    <div class="t-Body-content" id="t_Body_content">',
'      <main id="main" class="t-Body-mainContent">',
'        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#',
'        <div class="t-Body-fullContent">#REGION_POSITION_08#</div>',
'        <div class="t-Body-contentInner">#BODY#</div>',
'      </main>',
'      <footer class="t-Footer" role="contentinfo">',
'        <div class="t-Footer-body">',
'          <div class="t-Footer-content">#REGION_POSITION_05#</div>',
'          <div class="t-Footer-apex">',
'            <div class="t-Footer-version">#APP_VERSION#</div>',
'            <div class="t-Footer-customize">#CUSTOMIZE#</div>',
'            #BUILT_WITH_LOVE_USING_APEX#',
'          </div>',
'        </div>',
'        <div class="t-Footer-top">',
'          <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>',
'        </div>',
'      </footer>',
'    </div>',
'  </div>',
'</div>',
'<div class="t-Body-inlineDialogs">#REGION_POSITION_04#</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>',
''))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_navigation_bar=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-NavigationBar t-NavigationBar--classic" data-mode="classic">',
'  <li class="t-NavigationBar-item">',
'    <span class="t-Button t-Button--icon t-Button--noUI t-Button--header t-Button--navBar t-Button--headerUser">',
'      <span class="t-Icon a-Icon icon-user"></span>',
'      <span class="t-Button-label">&APP_USER.</span>',
'    </span>',
'  </li>#BAR_BODY#',
'</ul>'))
,p_navbar_entry=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item">',
'  <a class="t-Button t-Button--icon t-Button--header" href="#LINK#">',
'    <span class="t-Icon #IMAGE#"></span>',
'    <span class="t-Button-label">#TEXT#</span>',
'  </a>',
'</li>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>4
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>2977628563533209425
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472239169998945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472239488716945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Breadcrumb Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472239710972945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Inline Dialogs'
,p_placeholder=>'REGION_POSITION_04'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472240087805945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Footer'
,p_placeholder=>'REGION_POSITION_05'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472240303621945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Page Navigation'
,p_placeholder=>'REGION_POSITION_06'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472240665126945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Page Header'
,p_placeholder=>'REGION_POSITION_07'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472240906001945873)
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_name=>'Before Content Body'
,p_placeholder=>'REGION_POSITION_08'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/page/standard
begin
wwv_flow_api.create_template(
 p_id=>wwv_flow_api.id(472241329888945873)
,p_theme_id=>42
,p_name=>'Standard'
,p_internal_name=>'STANDARD'
,p_is_popup=>false
,p_javascript_code_onload=>'apex.theme42.initializePage.noSideCol();'
,p_header_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html class="no-js #RTL_CLASS# page-&APP_PAGE_ID. app-&APP_ALIAS." lang="&BROWSER_LANGUAGE." #TEXT_DIRECTION#>',
'<head>',
'  <meta http-equiv="x-ua-compatible" content="IE=edge" />',
'  <meta charset="utf-8">',
'  <title>#TITLE#</title>',
'  #APEX_CSS#',
'  #THEME_CSS#',
'  #TEMPLATE_CSS#',
'  #THEME_STYLE_CSS#',
'  #APPLICATION_CSS#',
'  #PAGE_CSS#',
'  #FAVICONS#',
'  #HEAD#',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'</head>',
'<body class="t-PageBody t-PageBody--hideLeft t-PageBody--hideActions no-anim #PAGE_CSS_CLASSES#" #TEXT_DIRECTION# #ONLOAD# id="t_PageBody">',
'<a href="#main" id="t_Body_skipToContent">&APP_TEXT$UI_PAGE_SKIP_TO_CONTENT.</a>',
'#FORM_OPEN#',
'<header class="t-Header" id="t_Header" role="banner">',
'  #REGION_POSITION_07#',
'  <div class="t-Header-branding">',
'    <div class="t-Header-controls">',
'      <button class="t-Button t-Button--icon t-Button--header t-Button--headerTree" aria-label="#EXPAND_COLLAPSE_NAV_LABEL#" title="#EXPAND_COLLAPSE_NAV_LABEL#" id="t_Button_navControl" type="button"><span class="t-Header-controlsIcon" aria-hidden="t'
||'rue"></span></button>',
'    </div>',
'    <div class="t-Header-logo">',
'      <a href="#HOME_LINK#" class="t-Header-logo-link">#LOGO#</a>',
'    </div>',
'    <div class="t-Header-navBar">#NAVIGATION_BAR#</div>',
'  </div>',
'  <div class="t-Header-nav">#TOP_GLOBAL_NAVIGATION_LIST##REGION_POSITION_06#</div>',
'</header>',
''))
,p_box=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body">',
'  #SIDE_GLOBAL_NAVIGATION_LIST#',
'  <div class="t-Body-main">',
'    <div class="t-Body-title" id="t_Body_title">#REGION_POSITION_01#</div>',
'    <div class="t-Body-content" id="t_Body_content">',
'      <main id="main" class="t-Body-mainContent">',
'        #SUCCESS_MESSAGE##NOTIFICATION_MESSAGE##GLOBAL_NOTIFICATION#',
'        <div class="t-Body-fullContent">#REGION_POSITION_08#</div>',
'        <div class="t-Body-contentInner">#BODY#</div>',
'      </main>',
'      <footer class="t-Footer" role="contentinfo">',
'        <div class="t-Footer-body">',
'          <div class="t-Footer-content">#REGION_POSITION_05#</div>',
'          <div class="t-Footer-apex">',
'            <div class="t-Footer-version">#APP_VERSION#</div>',
'            <div class="t-Footer-customize">#CUSTOMIZE#</div>',
'            #BUILT_WITH_LOVE_USING_APEX#',
'          </div>',
'        </div>',
'        <div class="t-Footer-top">',
'          <a href="#top" class="t-Footer-topButton" id="t_Footer_topButton"><span class="a-Icon icon-up-chevron"></span></a>',
'        </div>',
'      </footer>',
'    </div>',
'  </div>',
'</div>',
'<div class="t-Body-inlineDialogs">#REGION_POSITION_04#</div>'))
,p_footer_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#FORM_CLOSE#',
'#DEVELOPER_TOOLBAR#',
'#APEX_JAVASCRIPT#',
'#GENERATED_CSS#',
'#THEME_JAVASCRIPT#',
'#TEMPLATE_JAVASCRIPT#',
'#APPLICATION_JAVASCRIPT#',
'#PAGE_JAVASCRIPT#  ',
'#GENERATED_JAVASCRIPT#',
'</body>',
'</html>',
''))
,p_success_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-header">',
'          <h2 class="t-Alert-title">#SUCCESS_MESSAGE#</h2>',
'        </div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_notification_message=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-alert">',
'  <div class="t-Alert t-Alert--defaultIcons t-Alert--warning t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Notification" role="alert">',
'    <div class="t-Alert-wrap">',
'      <div class="t-Alert-icon">',
'        <span class="t-Icon"></span>',
'      </div>',
'      <div class="t-Alert-content">',
'        <div class="t-Alert-body">#MESSAGE#</div>',
'      </div>',
'      <div class="t-Alert-buttons">',
'        <button class="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="#CLOSE_NOTIFICATION#"><span class="t-Icon icon-close"></span></button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'))
,p_navigation_bar=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-NavigationBar t-NavigationBar--classic" data-mode="classic">',
'  <li class="t-NavigationBar-item">',
'    <span class="t-Button t-Button--icon t-Button--noUI t-Button--header t-Button--navBar t-Button--headerUser">',
'      <span class="t-Icon a-Icon icon-user"></span>',
'      <span class="t-Button-label">&APP_USER.</span>',
'    </span>',
'  </li>#BAR_BODY#',
'</ul>'))
,p_navbar_entry=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item">',
'  <a class="t-Button t-Button--icon t-Button--header" href="#LINK#">',
'    <span class="t-Icon #IMAGE#"></span>',
'    <span class="t-Button-label">#TEXT#</span>',
'  </a>',
'</li>'))
,p_region_table_cattributes=>' summary="" cellpadding="0" border="0" cellspacing="0" width="100%"'
,p_breadcrumb_def_reg_pos=>'REGION_POSITION_01'
,p_theme_class_id=>1
,p_error_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--danger t-Alert--wizard t-Alert--defaultIcons">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-body">',
'        <h3>#MESSAGE#</h3>',
'        <p>#ADDITIONAL_INFO#</p>',
'        <div class="t-Alert-inset">#TECHNICAL_INFO#</div>',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      <button onclick="#BACK_LINK#" class="t-Button t-Button--hot w50p t-Button--large" type="button">#OK#</button>',
'    </div>',
'  </div>',
'</div>'))
,p_grid_type=>'FIXED'
,p_grid_max_columns=>12
,p_grid_always_use_max_columns=>true
,p_grid_has_column_span=>true
,p_grid_always_emit=>true
,p_grid_emit_empty_leading_cols=>true
,p_grid_emit_empty_trail_cols=>false
,p_grid_default_label_col_span=>2
,p_grid_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="container">',
'#ROWS#',
'</div>'))
,p_grid_row_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="row">',
'#COLUMNS#',
'</div>'))
,p_grid_column_template=>'<div class="col col-#COLUMN_SPAN_NUMBER# #CSS_CLASSES#" #ATTRIBUTES#>#CONTENT#</div>'
,p_grid_first_column_attributes=>'alpha'
,p_grid_last_column_attributes=>'omega'
,p_dialog_js_init_code=>'apex.navigation.dialog(#PAGE_URL#,{title:#TITLE#,height:#DIALOG_HEIGHT#,width:#DIALOG_WIDTH#,maxWidth:#DIALOG_MAX_WIDTH#,modal:#IS_MODAL#,dialog:#DIALOG#,#DIALOG_ATTRIBUTES#},#DIALOG_CSS_CLASSES#,#TRIGGERING_ELEMENT#);'
,p_dialog_js_close_code=>'apex.navigation.dialog.close(#IS_MODAL#,#TARGET#);'
,p_dialog_js_cancel_code=>'apex.navigation.dialog.cancel(#IS_MODAL#);'
,p_dialog_browser_frame=>'MODAL'
,p_reference_id=>4070909157481059304
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472241606785945873)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472241977527945873)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Breadcrumb Bar'
,p_placeholder=>'REGION_POSITION_01'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472242292750945875)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Inline Dialogs'
,p_placeholder=>'REGION_POSITION_04'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472242535441945875)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Footer'
,p_placeholder=>'REGION_POSITION_05'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472242848293945875)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Page Navigation'
,p_placeholder=>'REGION_POSITION_06'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472243129226945875)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Page Header'
,p_placeholder=>'REGION_POSITION_07'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_page_tmpl_display_point(
 p_id=>wwv_flow_api.id(472243467942945875)
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_name=>'Before Content Body'
,p_placeholder=>'REGION_POSITION_08'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/button/icon
begin
wwv_flow_api.create_button_templates(
 p_id=>wwv_flow_api.id(472336358748945910)
,p_template_name=>'Icon'
,p_internal_name=>'ICON'
,p_template=>'<button class="t-Button t-Button--noLabel t-Button--icon #BUTTON_CSS_CLASSES#" #BUTTON_ATTRIBUTES# onclick="#JAVASCRIPT#" type="button" id="#BUTTON_ID#" title="#LABEL#" aria-label="#LABEL#"><span class="t-Icon #ICON_CSS_CLASSES#" aria-hidden="true"><'
||'/span></button>'
,p_hot_template=>'<button class="t-Button t-Button--noLabel t-Button--icon #BUTTON_CSS_CLASSES# t-Button--hot" #BUTTON_ATTRIBUTES# onclick="#JAVASCRIPT#" type="button" id="#BUTTON_ID#" title="#LABEL#" aria-label="#LABEL#"><span class="t-Icon #ICON_CSS_CLASSES#" aria-h'
||'idden="true"></span></button>'
,p_reference_id=>2347660919680321258
,p_translate_this_template=>'N'
,p_theme_class_id=>5
,p_theme_id=>42
);
end;
/
prompt --application/shared_components/user_interface/templates/button/text
begin
wwv_flow_api.create_button_templates(
 p_id=>wwv_flow_api.id(472337011970945910)
,p_template_name=>'Text'
,p_internal_name=>'TEXT'
,p_template=>'<button onclick="#JAVASCRIPT#" class="t-Button #BUTTON_CSS_CLASSES#" type="button" #BUTTON_ATTRIBUTES# id="#BUTTON_ID#"><span class="t-Button-label">#LABEL#</span></button>'
,p_hot_template=>'<button onclick="#JAVASCRIPT#" class="t-Button t-Button--hot #BUTTON_CSS_CLASSES#" type="button" #BUTTON_ATTRIBUTES# id="#BUTTON_ID#"><span class="t-Button-label">#LABEL#</span></button>'
,p_reference_id=>4070916158035059322
,p_translate_this_template=>'N'
,p_theme_class_id=>1
,p_theme_id=>42
);
end;
/
prompt --application/shared_components/user_interface/templates/button/text_with_icon
begin
wwv_flow_api.create_button_templates(
 p_id=>wwv_flow_api.id(472337158867945910)
,p_template_name=>'Text with Icon'
,p_internal_name=>'TEXT_WITH_ICON'
,p_template=>'<button class="t-Button t-Button--icon #BUTTON_CSS_CLASSES#" #BUTTON_ATTRIBUTES# onclick="#JAVASCRIPT#" type="button" id="#BUTTON_ID#"><span class="t-Icon t-Icon--left #ICON_CSS_CLASSES#" aria-hidden="true"></span><span class="t-Button-label">#LABEL#'
||'</span><span class="t-Icon t-Icon--right #ICON_CSS_CLASSES#" aria-hidden="true"></span></button>'
,p_hot_template=>'<button class="t-Button t-Button--icon #BUTTON_CSS_CLASSES# t-Button--hot" #BUTTON_ATTRIBUTES# onclick="#JAVASCRIPT#" type="button" id="#BUTTON_ID#"><span class="t-Icon t-Icon--left #ICON_CSS_CLASSES#" aria-hidden="true"></span><span class="t-Button-'
||'label">#LABEL#</span><span class="t-Icon t-Icon--right #ICON_CSS_CLASSES#" aria-hidden="true"></span></button>'
,p_reference_id=>2081382742158699622
,p_translate_this_template=>'N'
,p_theme_class_id=>4
,p_preset_template_options=>'t-Button--iconRight'
,p_theme_id=>42
);
end;
/
prompt --application/shared_components/user_interface/templates/region/alert
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472243814204945875)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-header">',
'        <h2 class="t-Alert-title" id="#REGION_STATIC_ID#_heading">#TITLE#</h2>',
'      </div>',
'      <div class="t-Alert-body">#BODY#</div>',
'    </div>',
'    <div class="t-Alert-buttons">#PREVIOUS##CLOSE##CREATE##NEXT#</div>',
'  </div>',
'</div>'))
,p_page_plug_template_name=>'Alert'
,p_internal_name=>'ALERT'
,p_plug_table_bgcolor=>'#ffffff'
,p_theme_id=>42
,p_theme_class_id=>21
,p_preset_template_options=>'t-Alert--horizontal:t-Alert--defaultIcons:t-Alert--warning'
,p_plug_heading_bgcolor=>'#ffffff'
,p_plug_font_size=>'-1'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2039236646100190748
,p_translate_this_template=>'N'
,p_template_comment=>'Red Theme'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472244192131945876)
,p_plug_template_id=>wwv_flow_api.id(472243814204945875)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/region/blank_with_attributes
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472247597001945879)
,p_layout=>'TABLE'
,p_template=>'<div id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES# class="#REGION_CSS_CLASSES#">#PREVIOUS##BODY##SUB_REGIONS##NEXT#</div>'
,p_page_plug_template_name=>'Blank with Attributes'
,p_internal_name=>'BLANK_WITH_ATTRIBUTES'
,p_theme_id=>42
,p_theme_class_id=>7
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>4499993862448380551
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/region/blank_with_attributes_no_grid
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472247730903945879)
,p_layout=>'TABLE'
,p_template=>'<div id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES# class="#REGION_CSS_CLASSES#">#PREVIOUS##BODY##SUB_REGIONS##NEXT#</div>'
,p_page_plug_template_name=>'Blank with Attributes (No Grid)'
,p_internal_name=>'BLANK_WITH_ATTRIBUTES_NO_GRID'
,p_theme_id=>42
,p_theme_class_id=>7
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>3369790999010910123
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472248067939945879)
,p_plug_template_id=>wwv_flow_api.id(472247730903945879)
,p_name=>'Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472248349929945879)
,p_plug_template_id=>wwv_flow_api.id(472247730903945879)
,p_name=>'Sub Regions'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/region/carousel_container
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472248553235945879)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Region t-Region--carousel #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
' <div class="t-Region-header">',
'  <div class="t-Region-headerItems t-Region-headerItems--title">',
'    <span class="t-Region-headerIcon"><span class="t-Icon #ICON_CSS_CLASSES#" aria-hidden="true"></span></span>',
'    <h2 class="t-Region-title" id="#REGION_STATIC_ID#_heading">#TITLE#</h2>',
'  </div>',
'  <div class="t-Region-headerItems t-Region-headerItems--buttons">#COPY##EDIT#<span class="js-maximizeButtonContainer"></span></div>',
' </div>',
' <div class="t-Region-bodyWrap">',
'   <div class="t-Region-buttons t-Region-buttons--top">',
'    <div class="t-Region-buttons-left">#PREVIOUS#</div>',
'    <div class="t-Region-buttons-right">#NEXT#</div>',
'   </div>',
'   <div class="t-Region-body">',
'     #BODY#',
'   <div class="t-Region-carouselRegions">',
'     #SUB_REGIONS#',
'   </div>',
'   </div>',
'   <div class="t-Region-buttons t-Region-buttons--bottom">',
'    <div class="t-Region-buttons-left">#CLOSE##HELP#</div>',
'    <div class="t-Region-buttons-right">#DELETE##CHANGE##CREATE#</div>',
'   </div>',
' </div>',
'</div>'))
,p_sub_plug_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div data-label="#SUB_REGION_TITLE#" id="SR_#SUB_REGION_ID#">',
'  #SUB_REGION#',
'</div>'))
,p_page_plug_template_name=>'Carousel Container'
,p_internal_name=>'CAROUSEL_CONTAINER'
,p_javascript_file_urls=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.apexTabs#MIN#.js?v=#APEX_VERSION#',
'#IMAGE_PREFIX#plugins/com.oracle.apex.carousel/1.1/com.oracle.apex.carousel#MIN#.js?v=#APEX_VERSION#'))
,p_plug_table_bgcolor=>'#ffffff'
,p_theme_id=>42
,p_theme_class_id=>5
,p_default_template_options=>'t-Region--showCarouselControls'
,p_preset_template_options=>'t-Region--hiddenOverflow'
,p_plug_heading_bgcolor=>'#ffffff'
,p_plug_font_size=>'-1'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2865840475322558786
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472248892681945879)
,p_plug_template_id=>wwv_flow_api.id(472248553235945879)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472249116247945879)
,p_plug_template_id=>wwv_flow_api.id(472248553235945879)
,p_name=>'Slides'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/region/hero
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472255984083945882)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-HeroRegion #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
'  <div class="t-HeroRegion-wrap">',
'    <div class="t-HeroRegion-col t-HeroRegion-col--left"><span class="t-HeroRegion-icon t-Icon #ICON_CSS_CLASSES#"></span></div>',
'    <div class="t-HeroRegion-col t-HeroRegion-col--content">',
'      <h1 class="t-HeroRegion-title">#TITLE#</h1>',
'      #BODY#',
'    </div>',
'    <div class="t-HeroRegion-col t-HeroRegion-col--right"><div class="t-HeroRegion-form">#SUB_REGIONS#</div><div class="t-HeroRegion-buttons">#NEXT#</div></div>',
'  </div>',
'</div>'))
,p_page_plug_template_name=>'Hero'
,p_internal_name=>'HERO'
,p_theme_id=>42
,p_theme_class_id=>22
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2672571031438297268
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472256288671945882)
,p_plug_template_id=>wwv_flow_api.id(472255984083945882)
,p_name=>'Region Body'
,p_placeholder=>'#BODY#'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/region/buttons_container
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472258029597945882)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ButtonRegion t-Form--floatLeft #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
'  <div class="t-ButtonRegion-wrap">',
'    <div class="t-ButtonRegion-col t-ButtonRegion-col--left"><div class="t-ButtonRegion-buttons">#PREVIOUS##CLOSE##DELETE#</div></div>',
'    <div class="t-ButtonRegion-col t-ButtonRegion-col--content">',
'      <h2 class="t-ButtonRegion-title" id="#REGION_STATIC_ID#_heading">#TITLE#</h2>',
'      #BODY#',
'      <div class="t-ButtonRegion-buttons">#CHANGE#</div>',
'    </div>',
'    <div class="t-ButtonRegion-col t-ButtonRegion-col--right"><div class="t-ButtonRegion-buttons">#EDIT##CREATE##NEXT#</div></div>',
'  </div>',
'</div>'))
,p_page_plug_template_name=>'Buttons Container'
,p_internal_name=>'BUTTONS_CONTAINER'
,p_plug_table_bgcolor=>'#ffffff'
,p_theme_id=>42
,p_theme_class_id=>17
,p_plug_heading_bgcolor=>'#ffffff'
,p_plug_font_size=>'-1'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2124982336649579661
,p_translate_this_template=>'N'
,p_template_comment=>'Red Theme'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472258327026945882)
,p_plug_template_id=>wwv_flow_api.id(472258029597945882)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472258680830945882)
,p_plug_template_id=>wwv_flow_api.id(472258029597945882)
,p_name=>'Sub Regions'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/region/collapsible
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472260001306945884)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Region t-Region--hideShow #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
' <div class="t-Region-header">',
'  <div class="t-Region-headerItems  t-Region-headerItems--controls"><button class="t-Button t-Button--icon t-Button--hideShow" type="button"></button></div>',
'  <div class="t-Region-headerItems t-Region-headerItems--title">',
'    <h2 class="t-Region-title">#TITLE#</h2>',
'  </div>',
'  <div class="t-Region-headerItems t-Region-headerItems--buttons">#EDIT#</div>',
' </div>',
' <div class="t-Region-bodyWrap">',
'   <div class="t-Region-buttons t-Region-buttons--top">',
'    <div class="t-Region-buttons-left">#CLOSE#</div>',
'    <div class="t-Region-buttons-right">#CREATE#</div>',
'   </div>',
'   <div class="t-Region-body">',
'     #COPY#',
'     #BODY#',
'     #SUB_REGIONS#',
'     #CHANGE#',
'   </div>',
'   <div class="t-Region-buttons t-Region-buttons--bottom">',
'    <div class="t-Region-buttons-left">#PREVIOUS#</div>',
'    <div class="t-Region-buttons-right">#NEXT#</div>',
'   </div>',
' </div>',
'</div>'))
,p_page_plug_template_name=>'Collapsible'
,p_internal_name=>'COLLAPSIBLE'
,p_plug_table_bgcolor=>'#ffffff'
,p_theme_id=>42
,p_theme_class_id=>1
,p_preset_template_options=>'is-expanded:t-Region--scrollBody'
,p_plug_heading_bgcolor=>'#ffffff'
,p_plug_font_size=>'-1'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2662888092628347716
,p_translate_this_template=>'N'
,p_template_comment=>'Red Theme'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472260336033945884)
,p_plug_template_id=>wwv_flow_api.id(472260001306945884)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472260689992945884)
,p_plug_template_id=>wwv_flow_api.id(472260001306945884)
,p_name=>'Sub Regions'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/region/content_block
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472265441625945884)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ContentBlock #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
'  <div class="t-ContentBlock-header">',
'    <div class="t-ContentBlock-headerItems t-ContentBlock-headerItems--title">',
'      <span class="t-ContentBlock-headerIcon"><span class="t-Icon #ICON_CSS_CLASSES#" aria-hidden="true"></span></span>',
'      <h1 class="t-ContentBlock-title" id="#REGION_STATIC_ID#_heading">#TITLE#</h1>',
'      #EDIT#',
'    </div>',
'    <div class="t-ContentBlock-headerItems t-ContentBlock-headerItems--buttons">#CHANGE#</div>',
'  </div>',
'  <div class="t-ContentBlock-body">#BODY#</div>',
'  <div class="t-ContentBlock-buttons">#PREVIOUS##NEXT#</div>',
'</div>',
''))
,p_page_plug_template_name=>'Content Block'
,p_internal_name=>'CONTENT_BLOCK'
,p_theme_id=>42
,p_theme_class_id=>21
,p_preset_template_options=>'t-ContentBlock--h1'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2320668864738842174
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/region/inline_dialog
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472267403332945885)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div id="#REGION_STATIC_ID#_parent">',
'<div id="#REGION_STATIC_ID#"  class="t-DialogRegion #REGION_CSS_CLASSES# js-regionDialog" #REGION_ATTRIBUTES# style="display:none" title="#TITLE#">',
'  <div class="t-DialogRegion-wrap">',
'    <div class="t-DialogRegion-bodyWrapperOut"><div class="t-DialogRegion-bodyWrapperIn"><div class="t-DialogRegion-body">#BODY#</div></div></div>',
'    <div class="t-DialogRegion-buttons">',
'       <div class="t-ButtonRegion t-ButtonRegion--dialogRegion">',
'         <div class="t-ButtonRegion-wrap">',
'           <div class="t-ButtonRegion-col t-ButtonRegion-col--left"><div class="t-ButtonRegion-buttons">#PREVIOUS##DELETE##CLOSE#</div></div>',
'           <div class="t-ButtonRegion-col t-ButtonRegion-col--right"><div class="t-ButtonRegion-buttons">#EDIT##CREATE##NEXT#</div></div>',
'         </div>',
'       </div>',
'    </div>',
'  </div>',
'</div>',
'</div>'))
,p_page_plug_template_name=>'Inline Dialog'
,p_internal_name=>'INLINE_DIALOG'
,p_theme_id=>42
,p_theme_class_id=>24
,p_default_template_options=>'js-modal:js-draggable:js-resizable'
,p_preset_template_options=>'js-dialog-size600x400'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2671226943886536762
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472267769063945885)
,p_plug_template_id=>wwv_flow_api.id(472267403332945885)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/region/inline_popup
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472269781989945885)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div id="#REGION_STATIC_ID#_parent">',
'<div id="#REGION_STATIC_ID#"  class="t-DialogRegion #REGION_CSS_CLASSES# js-regionPopup" #REGION_ATTRIBUTES# style="display:none" title="#TITLE#">',
'  <div class="t-DialogRegion-wrap">',
'    <div class="t-DialogRegion-bodyWrapperOut"><div class="t-DialogRegion-bodyWrapperIn"><div class="t-DialogRegion-body">#BODY#</div></div></div>',
'    <div class="t-DialogRegion-buttons">',
'       <div class="t-ButtonRegion t-ButtonRegion--dialogRegion">',
'         <div class="t-ButtonRegion-wrap">',
'           <div class="t-ButtonRegion-col t-ButtonRegion-col--left"><div class="t-ButtonRegion-buttons">#PREVIOUS##DELETE##CLOSE#</div></div>',
'           <div class="t-ButtonRegion-col t-ButtonRegion-col--right"><div class="t-ButtonRegion-buttons">#EDIT##CREATE##NEXT#</div></div>',
'         </div>',
'       </div>',
'    </div>',
'  </div>',
'</div>',
'</div>'))
,p_page_plug_template_name=>'Inline Popup'
,p_internal_name=>'INLINE_POPUP'
,p_theme_id=>42
,p_theme_class_id=>24
,p_preset_template_options=>'js-dialog-size600x400'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>1483922538999385230
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472270082903945885)
,p_plug_template_id=>wwv_flow_api.id(472269781989945885)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/region/interactive_report
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472273039041945887)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES# class="t-IRR-region #REGION_CSS_CLASSES#">',
'  <h2 class="u-VisuallyHidden" id="#REGION_STATIC_ID#_heading">#TITLE#</h2>',
'#PREVIOUS##BODY##SUB_REGIONS##NEXT#',
'</div>'))
,p_page_plug_template_name=>'Interactive Report'
,p_internal_name=>'INTERACTIVE_REPORT'
,p_theme_id=>42
,p_theme_class_id=>9
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2099079838218790610
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/region/login
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472273677779945887)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Login-region t-Form--stretchInputs t-Form--labelsAbove #REGION_CSS_CLASSES#" id="#REGION_ID#" #REGION_ATTRIBUTES#>',
'  <div class="t-Login-header">',
'    <span class="t-Login-logo #ICON_CSS_CLASSES#"></span>',
'    <h1 class="t-Login-title" id="#REGION_STATIC_ID#_heading">#TITLE#</h1>',
'  </div>',
'  <div class="t-Login-body">#BODY#</div>',
'  <div class="t-Login-buttons">#NEXT#</div>',
'  <div class="t-Login-links">#EDIT##CREATE#</div>',
'  <div class="t-Login-subRegions">#SUB_REGIONS#</div>',
'</div>'))
,p_page_plug_template_name=>'Login'
,p_internal_name=>'LOGIN'
,p_theme_id=>42
,p_theme_class_id=>23
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2672711194551076376
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472273907730945887)
,p_plug_template_id=>wwv_flow_api.id(472273677779945887)
,p_name=>'Content Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/region/standard
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472274973856945887)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Region #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
' <div class="t-Region-header">',
'  <div class="t-Region-headerItems t-Region-headerItems--title">',
'    <span class="t-Region-headerIcon"><span class="t-Icon #ICON_CSS_CLASSES#" aria-hidden="true"></span></span>',
'    <h2 class="t-Region-title" id="#REGION_STATIC_ID#_heading">#TITLE#</h2>',
'  </div>',
'  <div class="t-Region-headerItems t-Region-headerItems--buttons">#COPY##EDIT#<span class="js-maximizeButtonContainer"></span></div>',
' </div>',
' <div class="t-Region-bodyWrap">',
'   <div class="t-Region-buttons t-Region-buttons--top">',
'    <div class="t-Region-buttons-left">#PREVIOUS#</div>',
'    <div class="t-Region-buttons-right">#NEXT#</div>',
'   </div>',
'   <div class="t-Region-body">',
'     #BODY#',
'     #SUB_REGIONS#',
'   </div>',
'   <div class="t-Region-buttons t-Region-buttons--bottom">',
'    <div class="t-Region-buttons-left">#CLOSE##HELP#</div>',
'    <div class="t-Region-buttons-right">#DELETE##CHANGE##CREATE#</div>',
'   </div>',
' </div>',
'</div>',
''))
,p_page_plug_template_name=>'Standard'
,p_internal_name=>'STANDARD'
,p_plug_table_bgcolor=>'#ffffff'
,p_theme_id=>42
,p_theme_class_id=>8
,p_preset_template_options=>'t-Region--scrollBody'
,p_plug_heading_bgcolor=>'#ffffff'
,p_plug_font_size=>'-1'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>4070912133526059312
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472275234158945887)
,p_plug_template_id=>wwv_flow_api.id(472274973856945887)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472275533785945887)
,p_plug_template_id=>wwv_flow_api.id(472274973856945887)
,p_name=>'Sub Regions'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>true
,p_glv_new_row=>true
,p_max_fixed_grid_columns=>12
);
end;
/
prompt --application/shared_components/user_interface/templates/region/tabs_container
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472281708023945889)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-TabsRegion #REGION_CSS_CLASSES# apex-tabs-region" #REGION_ATTRIBUTES# id="#REGION_STATIC_ID#">',
'  #BODY#',
'  <div class="t-TabsRegion-items">',
'    #SUB_REGIONS#',
'  </div>',
'</div>'))
,p_sub_plug_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div data-label="#SUB_REGION_TITLE#" id="SR_#SUB_REGION_ID#">',
'  #SUB_REGION#',
'</div>'))
,p_page_plug_template_name=>'Tabs Container'
,p_internal_name=>'TABS_CONTAINER'
,p_javascript_file_urls=>'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.apexTabs#MIN#.js?v=#APEX_VERSION#'
,p_theme_id=>42
,p_theme_class_id=>5
,p_preset_template_options=>'t-TabsRegion-mod--simple'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>3221725015618492759
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472282051869945889)
,p_plug_template_id=>wwv_flow_api.id(472281708023945889)
,p_name=>'Region Body'
,p_placeholder=>'BODY'
,p_has_grid_support=>true
,p_glv_new_row=>true
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472282309483945889)
,p_plug_template_id=>wwv_flow_api.id(472281708023945889)
,p_name=>'Tabs'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>false
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/region/title_bar
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472284353970945890)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES# class="t-BreadcrumbRegion #REGION_CSS_CLASSES#"> ',
'  <div class="t-BreadcrumbRegion-body">',
'    <div class="t-BreadcrumbRegion-breadcrumb">',
'      #BODY#',
'    </div>',
'    <div class="t-BreadcrumbRegion-title">',
'      <h1 class="t-BreadcrumbRegion-titleText">#TITLE#</h1>',
'    </div>',
'  </div>',
'  <div class="t-BreadcrumbRegion-buttons">#PREVIOUS##CLOSE##DELETE##HELP##CHANGE##EDIT##COPY##CREATE##NEXT#</div>',
'</div>'))
,p_page_plug_template_name=>'Title Bar'
,p_internal_name=>'TITLE_BAR'
,p_theme_id=>42
,p_theme_class_id=>6
,p_default_template_options=>'t-BreadcrumbRegion--showBreadcrumb'
,p_preset_template_options=>'t-BreadcrumbRegion--useBreadcrumbTitle'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2530016523834132090
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/region/wizard_container
begin
wwv_flow_api.create_plug_template(
 p_id=>wwv_flow_api.id(472285322780945890)
,p_layout=>'TABLE'
,p_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Wizard #REGION_CSS_CLASSES#" id="#REGION_STATIC_ID#" #REGION_ATTRIBUTES#>',
'  <div class="t-Wizard-header">',
'    <h1 class="t-Wizard-title">#TITLE#</h1>',
'    <div class="u-Table t-Wizard-controls">',
'      <div class="u-Table-fit t-Wizard-buttons">#PREVIOUS##CLOSE#</div>',
'      <div class="u-Table-fill t-Wizard-steps">',
'        #BODY#',
'      </div>',
'      <div class="u-Table-fit t-Wizard-buttons">#NEXT#</div>',
'    </div>',
'  </div>',
'  <div class="t-Wizard-body">',
'    #SUB_REGIONS#',
'  </div>',
'</div>'))
,p_page_plug_template_name=>'Wizard Container'
,p_internal_name=>'WIZARD_CONTAINER'
,p_theme_id=>42
,p_theme_class_id=>8
,p_preset_template_options=>'t-Wizard--hideStepsXSmall'
,p_default_label_alignment=>'RIGHT'
,p_default_field_alignment=>'LEFT'
,p_reference_id=>2117602213152591491
,p_translate_this_template=>'N'
);
wwv_flow_api.create_plug_tmpl_display_point(
 p_id=>wwv_flow_api.id(472285644215945890)
,p_plug_template_id=>wwv_flow_api.id(472285322780945890)
,p_name=>'Wizard Sub Regions'
,p_placeholder=>'SUB_REGIONS'
,p_has_grid_support=>true
,p_glv_new_row=>true
);
end;
/
prompt --application/shared_components/user_interface/templates/list/top_navigation_tabs
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472310641767945900)
,p_list_template_current=>'<li class="t-NavTabs-item #A03# is-active" id="#A01#"><a href="#LINK#" class="t-NavTabs-link #A04# " title="#TEXT_ESC_SC#"><span class="t-Icon #ICON_CSS_CLASSES#" aria-hidden="true"></span><span class="t-NavTabs-label">#TEXT_ESC_SC#</span><span class'
||'="t-NavTabs-badge #A05#">#A02#</span></a></li>'
,p_list_template_noncurrent=>'<li class="t-NavTabs-item #A03#" id="#A01#"><a href="#LINK#" class="t-NavTabs-link #A04# " title="#TEXT_ESC_SC#"><span class="t-Icon #ICON_CSS_CLASSES#" aria-hidden="true"></span><span class="t-NavTabs-label">#TEXT_ESC_SC#</span><span class="t-NavTab'
||'s-badge #A05#">#A02#</span></a></li>'
,p_list_template_name=>'Top Navigation Tabs'
,p_internal_name=>'TOP_NAVIGATION_TABS'
,p_theme_id=>42
,p_theme_class_id=>7
,p_preset_template_options=>'t-NavTabs--inlineLabels-lg:t-NavTabs--displayLabels-sm'
,p_list_template_before_rows=>'<ul class="t-NavTabs #COMPONENT_CSS_CLASSES#" id="#PARENT_STATIC_ID#_navtabs">'
,p_list_template_after_rows=>'</ul>'
,p_a01_label=>'List Item ID'
,p_a02_label=>'Badge Value'
,p_a03_label=>'List Item Class'
,p_a04_label=>'Link Class'
,p_a05_label=>'Badge Class'
,p_reference_id=>1453011561172885578
);
end;
/
prompt --application/shared_components/user_interface/templates/list/top_navigation_mega_menu
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472312234782945901)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item t-MegaMenu-item--top t-MegaMenu-item--noSub is-active #A04#" data-current="true" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>',
'</li>'))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item t-MegaMenu-item--top t-MegaMenu-item--noSub #A04#" data-current="false" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>',
'</li>'))
,p_list_template_name=>'Top Navigation Mega Menu'
,p_internal_name=>'TOP_NAVIGATION_MEGA_MENU'
,p_theme_id=>42
,p_theme_class_id=>20
,p_list_template_before_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-MegaMenu #COMPONENT_CSS_CLASSES#" id="t_MenuNav" style="display:none;">',
'  <div class="a-Menu-content t-MegaMenu-container">',
'    <div class="t-MegaMenu-body">',
'    <ul class="t-MegaMenu-list t-MegaMenu-list--top">'))
,p_list_template_after_rows=>' </ul></div></div></div>'
,p_before_sub_list=>'<ul class="t-MegaMenu-list t-MegaMenu-list--sub">'
,p_after_sub_list=>'</ul></li>'
,p_sub_list_item_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item is-active #A04#" data-current="true" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>',
'</li>'))
,p_sub_list_item_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item #A04#" data-current="false" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>',
'</li>'))
,p_item_templ_curr_w_child=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item t-MegaMenu-item--top t-MegaMenu-item--hasSub is-active #A04#" data-current="true" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>'))
,p_item_templ_noncurr_w_child=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item t-MegaMenu-item--top t-MegaMenu-item--hasSub #A04#" data-current="false" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>',
'</li>'))
,p_sub_templ_curr_w_child=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item is-active #A04#" data-current="true" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>'))
,p_sub_templ_noncurr_w_child=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MegaMenu-item #A04#" data-current="false" data-id="#A01#" data-shortcut="#A05#">',
'  <span class="a-Menu-item t-MegaMenu-itemBody #A08#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#"></span>',
'    <a class="a-Menu-label t-MegaMenu-labelWrap" href="#LINK#" target="#A06#">',
'      <span class="t-MegaMenu-label">#TEXT_ESC_SC#</span>',
'      <span class="t-MegaMenu-desc">#A03#</span>',
'    </a>',
'    <span class="t-MegaMenu-badge #A07#">#A02#</span>',
'  </span>'))
,p_a01_label=>'ID Attribute'
,p_a02_label=>'Badge Value'
,p_a03_label=>'Description'
,p_a04_label=>'List Item Class'
,p_a05_label=>'Shortcut'
,p_a06_label=>'Link Target'
,p_a07_label=>'Badge Class'
,p_a08_label=>'Menu Item Class'
,p_reference_id=>1665447133514362075
);
end;
/
prompt --application/shared_components/user_interface/templates/list/wizard_progress
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472314275177945903)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-WizardSteps-step is-active" id="#LIST_ITEM_ID#"><div class="t-WizardSteps-wrap" data-link="#LINK#"><span class="t-WizardSteps-marker"></span><span class="t-WizardSteps-label">#TEXT# <span class="t-WizardSteps-labelState"></span></span></'
||'div></li>',
''))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-WizardSteps-step" id="#LIST_ITEM_ID#"><div class="t-WizardSteps-wrap" data-link="#LINK#"><span class="t-WizardSteps-marker"></span><span class="t-WizardSteps-label">#TEXT# <span class="t-WizardSteps-labelState"></span></span></div></li>',
''))
,p_list_template_name=>'Wizard Progress'
,p_internal_name=>'WIZARD_PROGRESS'
,p_javascript_code_onload=>'apex.theme.initWizardProgressBar();'
,p_theme_id=>42
,p_theme_class_id=>17
,p_preset_template_options=>'t-WizardSteps--displayLabels'
,p_list_template_before_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<h2 class="u-VisuallyHidden">#CURRENT_PROGRESS#</h2>',
'<ul class="t-WizardSteps #COMPONENT_CSS_CLASSES#" id="#LIST_ID#">'))
,p_list_template_after_rows=>'</ul>'
,p_reference_id=>2008702338707394488
);
end;
/
prompt --application/shared_components/user_interface/templates/list/menu_bar
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472315633964945903)
,p_list_template_current=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_list_template_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_list_template_name=>'Menu Bar'
,p_internal_name=>'MENU_BAR'
,p_javascript_code_onload=>wwv_flow_string.join(wwv_flow_t_varchar2(
'var e = apex.jQuery("##PARENT_STATIC_ID#_menubar", apex.gPageContext$);',
'if (e.hasClass("js-addActions")) {',
'  apex.actions.addFromMarkup( e );',
'}',
'e.menu({',
'  behaveLikeTabs: e.hasClass("js-tabLike"),',
'  menubarShowSubMenuIcon: e.hasClass("js-showSubMenuIcons") || null,',
'  iconType: ''fa'',',
'  menubar: true,',
'  menubarOverflow: true,',
'  callout: e.hasClass("js-menu-callout")',
'});'))
,p_theme_id=>42
,p_theme_class_id=>20
,p_default_template_options=>'js-showSubMenuIcons'
,p_list_template_before_rows=>'<div class="t-MenuBar #COMPONENT_CSS_CLASSES#" id="#PARENT_STATIC_ID#_menubar"><ul style="display:none">'
,p_list_template_after_rows=>'</ul></div>'
,p_before_sub_list=>'<ul>'
,p_after_sub_list=>'</ul></li>'
,p_sub_list_item_current=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_sub_list_item_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_item_templ_curr_w_child=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_item_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_curr_w_child=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_a01_label=>'Menu Item ID / Action Name'
,p_a02_label=>'Disabled (True/False)'
,p_a03_label=>'Hidden (True/False)'
,p_a04_label=>'Title Attribute (Used By Actions Only)'
,p_a05_label=>'Shortcut'
,p_a06_label=>'Link Target'
,p_reference_id=>2008709236185638887
);
end;
/
prompt --application/shared_components/user_interface/templates/list/badge_list
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472316641102945903)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-BadgeList-item #A02#">',
'  <a class="t-BadgeList-wrap u-color #A04#" href="#LINK#" #A03#>',
'  <span class="t-BadgeList-label">#TEXT#</span>',
'  <span class="t-BadgeList-value">#A01#</span>',
'  </a>',
'</li>'))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-BadgeList-item #A02#">',
'  <a class="t-BadgeList-wrap u-color #A04#" href="#LINK#" #A03#>',
'  <span class="t-BadgeList-label">#TEXT#</span>',
'  <span class="t-BadgeList-value">#A01#</span>',
'  </a>',
'</li>'))
,p_list_template_name=>'Badge List'
,p_internal_name=>'BADGE_LIST'
,p_theme_id=>42
,p_theme_class_id=>3
,p_preset_template_options=>'t-BadgeList--large:t-BadgeList--cols t-BadgeList--3cols:t-BadgeList--circular'
,p_list_template_before_rows=>'<ul class="t-BadgeList #COMPONENT_CSS_CLASSES#">'
,p_list_template_after_rows=>'</ul>'
,p_a01_label=>'Value'
,p_a02_label=>'List item CSS Classes'
,p_a03_label=>'Link Attributes'
,p_a04_label=>'Link Classes'
,p_reference_id=>2062482847268086664
,p_list_template_comment=>wwv_flow_string.join(wwv_flow_t_varchar2(
'A01: Large Number',
'A02: List Item Classes',
'A03: Link Attributes'))
);
end;
/
prompt --application/shared_components/user_interface/templates/list/media_list
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472320415596945904)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MediaList-item is-active #A04#">',
'    <a href="#LINK#" class="t-MediaList-itemWrap #A05#" #A03#>',
'        <div class="t-MediaList-iconWrap">',
'            <span class="t-MediaList-icon u-color #A06#"><span class="t-Icon #ICON_CSS_CLASSES#" #IMAGE_ATTR#></span></span>',
'        </div>',
'        <div class="t-MediaList-body">',
'            <h3 class="t-MediaList-title">#TEXT#</h3>',
'            <p class="t-MediaList-desc">#A01#</p>',
'        </div>',
'        <div class="t-MediaList-badgeWrap">',
'            <span class="t-MediaList-badge">#A02#</span>',
'        </div>',
'    </a>',
'</li>'))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MediaList-item  #A04#">',
'    <a href="#LINK#" class="t-MediaList-itemWrap #A05#" #A03#>',
'        <div class="t-MediaList-iconWrap">',
'            <span class="t-MediaList-icon u-color #A06#"><span class="t-Icon #ICON_CSS_CLASSES#" #IMAGE_ATTR#></span></span>',
'        </div>',
'        <div class="t-MediaList-body">',
'            <h3 class="t-MediaList-title">#TEXT#</h3>',
'            <p class="t-MediaList-desc">#A01#</p>',
'        </div>',
'        <div class="t-MediaList-badgeWrap">',
'            <span class="t-MediaList-badge">#A02#</span>',
'        </div>',
'    </a>',
'</li>'))
,p_list_template_name=>'Media List'
,p_internal_name=>'MEDIA_LIST'
,p_theme_id=>42
,p_theme_class_id=>5
,p_default_template_options=>'t-MediaList--showIcons:t-MediaList--showDesc'
,p_list_template_before_rows=>'<ul class="t-MediaList #COMPONENT_CSS_CLASSES#">'
,p_list_template_after_rows=>'</ul>'
,p_a01_label=>'Description'
,p_a02_label=>'Badge Value'
,p_a03_label=>'Link Attributes'
,p_a04_label=>'List Item CSS Classes'
,p_a05_label=>'Link Class'
,p_a06_label=>'Icon Color Class'
,p_reference_id=>2066548068783481421
);
end;
/
prompt --application/shared_components/user_interface/templates/list/side_navigation_menu
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472323411914945904)
,p_list_template_current=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_list_template_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_list_template_name=>'Side Navigation Menu'
,p_internal_name=>'SIDE_NAVIGATION_MENU'
,p_javascript_file_urls=>'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.treeView#MIN#.js?v=#APEX_VERSION#'
,p_javascript_code_onload=>'apex.jQuery(''body'').addClass(''t-PageBody--leftNav'');'
,p_theme_id=>42
,p_theme_class_id=>19
,p_default_template_options=>'js-defaultCollapsed'
,p_preset_template_options=>'js-navCollapsed--hidden:t-TreeNav--styleA'
,p_list_template_before_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Body-nav" id="t_Body_nav" role="navigation" aria-label="&APP_TITLE!ATTR.">',
'<div class="t-TreeNav #COMPONENT_CSS_CLASSES#" id="t_TreeNav" data-id="#PARENT_STATIC_ID#_tree" aria-label="&APP_TITLE!ATTR."><ul style="display:none">'))
,p_list_template_after_rows=>'</ul></div></div>'
,p_before_sub_list=>'<ul>'
,p_after_sub_list=>'</ul></li>'
,p_sub_list_item_current=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_sub_list_item_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_item_templ_curr_w_child=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_item_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_curr_w_child=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_a01_label=>'ID Attribute'
,p_a02_label=>'Disabled (True/False)'
,p_a04_label=>'Title Attribute (Used By Actions Only)'
,p_a06_label=>'Link Target'
,p_reference_id=>2466292414354694776
);
end;
/
prompt --application/shared_components/user_interface/templates/list/top_navigation_menu
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472325071321945906)
,p_list_template_current=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_list_template_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_list_template_name=>'Top Navigation Menu'
,p_internal_name=>'TOP_NAVIGATION_MENU'
,p_javascript_code_onload=>wwv_flow_string.join(wwv_flow_t_varchar2(
'var e = apex.jQuery("#t_MenuNav", apex.gPageContext$);',
'if (e.hasClass("js-addActions")) {',
'  apex.actions.addFromMarkup( e );',
'}',
'e.menu({',
'  behaveLikeTabs: e.hasClass("js-tabLike"),',
'  menubarShowSubMenuIcon: e.hasClass("js-showSubMenuIcons") || null,',
'  menubar: true,',
'  menubarOverflow: true,',
'  callout: e.hasClass("js-menu-callout")',
'});',
''))
,p_theme_id=>42
,p_theme_class_id=>20
,p_default_template_options=>'js-tabLike'
,p_list_template_before_rows=>'<div class="t-Header-nav-list #COMPONENT_CSS_CLASSES#" id="t_MenuNav"><ul style="display:none">'
,p_list_template_after_rows=>'</ul></div>'
,p_before_sub_list=>'<ul>'
,p_after_sub_list=>'</ul></li>'
,p_sub_list_item_current=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_sub_list_item_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_item_templ_curr_w_child=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_item_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_curr_w_child=>'<li data-current="true" data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_a01_label=>'Menu Item ID / Action Name'
,p_a02_label=>'Disabled (True/False)'
,p_a03_label=>'Hidden (True/False)'
,p_a04_label=>'Title Attribute (Used By Actions Only)'
,p_a05_label=>'Shortcut Key'
,p_a06_label=>'Link Target'
,p_reference_id=>2525307901300239072
);
end;
/
prompt --application/shared_components/user_interface/templates/list/navigation_bar
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472326048549945906)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item is-active #A02#">',
'  <a class="t-Button t-Button--icon t-Button--header t-Button--navBar" href="#LINK#">',
'      <span class="t-Icon #ICON_CSS_CLASSES#" #IMAGE_ATTR#></span><span class="t-Button-label">#TEXT_ESC_SC#</span><span class="t-Button-badge">#A01#</span>',
'  </a>',
'</li>'))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item #A02#">',
'  <a class="t-Button t-Button--icon t-Button--header t-Button--navBar" href="#LINK#">',
'    <span class="t-Icon #ICON_CSS_CLASSES#" #IMAGE_ATTR#></span><span class="t-Button-label">#TEXT_ESC_SC#</span><span class="t-Button-badge">#A01#</span>',
'  </a>',
'</li>'))
,p_list_template_name=>'Navigation Bar'
,p_internal_name=>'NAVIGATION_BAR'
,p_theme_id=>42
,p_theme_class_id=>20
,p_list_template_before_rows=>'<ul class="t-NavigationBar #COMPONENT_CSS_CLASSES#" id="#LIST_ID#">'
,p_list_template_after_rows=>'</ul>'
,p_before_sub_list=>'<div class="t-NavigationBar-menu" style="display: none" id="menu_#PARENT_LIST_ITEM_ID#"><ul>'
,p_after_sub_list=>'</ul></div></li>'
,p_sub_list_item_current=>'<li data-current="true" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#">#TEXT_ESC_SC#</a></li>'
,p_sub_list_item_noncurrent=>'<li data-current="false" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#">#TEXT_ESC_SC#</a></li>'
,p_item_templ_curr_w_child=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item is-active #A02#">',
'  <button class="t-Button t-Button--icon t-Button t-Button--header t-Button--navBar js-menuButton" type="button" id="#LIST_ITEM_ID#" data-menu="menu_#LIST_ITEM_ID#">',
'      <span class="t-Icon #ICON_CSS_CLASSES#" #IMAGE_ATTR#></span><span class="t-Button-label">#TEXT_ESC_SC#</span><span class="t-Button-badge">#A01#</span><span class="a-Icon icon-down-arrow"></span>',
'  </button>'))
,p_item_templ_noncurr_w_child=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-NavigationBar-item #A02#">',
'  <button class="t-Button t-Button--icon t-Button t-Button--header t-Button--navBar js-menuButton" type="button" id="#LIST_ITEM_ID#" data-menu="menu_#LIST_ITEM_ID#">',
'      <span class="t-Icon #ICON_CSS_CLASSES#" #IMAGE_ATTR#></span><span class="t-Button-label">#TEXT_ESC_SC#</span><span class="t-Button-badge">#A01#</span><span class="a-Icon icon-down-arrow"></span>',
'  </button>'))
,p_sub_templ_curr_w_child=>'<li data-current="true" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#">#TEXT_ESC_SC#</a></li>'
,p_sub_templ_noncurr_w_child=>'<li data-current="false" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#">#TEXT_ESC_SC#</a></li>'
,p_a01_label=>'Badge Value'
,p_a02_label=>'List  Item CSS Classes'
,p_reference_id=>2846096252961119197
);
end;
/
prompt --application/shared_components/user_interface/templates/list/cards
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472326441706945906)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Cards-item is-active #A04#">',
'  <div class="t-Card">',
'    <a href="#LINK#" class="t-Card-wrap" #A05#>',
'      <div class="t-Card-icon u-color #A06#"><span class="t-Icon #ICON_CSS_CLASSES#"><span class="t-Card-initials" role="presentation">#A03#</span></span></div>',
'      <div class="t-Card-titleWrap"><h3 class="t-Card-title">#TEXT#</h3><h4 class="t-Card-subtitle">#A07#</h4></div>',
'      <div class="t-Card-body">',
'        <div class="t-Card-desc">#A01#</div>',
'        <div class="t-Card-info">#A02#</div>',
'      </div>',
'      <span class="t-Card-colorFill u-color #A06#"></span>',
'    </a>',
'  </div>',
'</li>'))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Cards-item #A04#">',
'  <div class="t-Card">',
'    <a href="#LINK#" class="t-Card-wrap" #A05#>',
'      <div class="t-Card-icon u-color #A06#"><span class="t-Icon #ICON_CSS_CLASSES#"><span class="t-Card-initials" role="presentation">#A03#</span></span></div>',
'      <div class="t-Card-titleWrap"><h3 class="t-Card-title">#TEXT#</h3><h4 class="t-Card-subtitle">#A07#</h4></div>',
'      <div class="t-Card-body">',
'        <div class="t-Card-desc">#A01#</div>',
'        <div class="t-Card-info">#A02#</div>',
'      </div>',
'      <span class="t-Card-colorFill u-color #A06#"></span>',
'    </a>',
'  </div>',
'</li>'))
,p_list_template_name=>'Cards'
,p_internal_name=>'CARDS'
,p_theme_id=>42
,p_theme_class_id=>4
,p_preset_template_options=>'t-Cards--animColorFill:t-Cards--3cols:t-Cards--basic'
,p_list_template_before_rows=>'<ul class="t-Cards #COMPONENT_CSS_CLASSES#">'
,p_list_template_after_rows=>'</ul>'
,p_a01_label=>'Description'
,p_a02_label=>'Secondary Information'
,p_a03_label=>'Initials'
,p_a04_label=>'List Item CSS Classes'
,p_a05_label=>'Link Attributes'
,p_a06_label=>'Card Color Class'
,p_a07_label=>'Subtitle'
,p_reference_id=>2885322685880632508
);
end;
/
prompt --application/shared_components/user_interface/templates/list/tabs
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472331805313945907)
,p_list_template_current=>'<li class="t-Tabs-item is-active #A03#" id="#A01#"><a href="#LINK#" class="t-Tabs-link #A04#"><span class="t-Icon #ICON_CSS_CLASSES#"></span><span class="t-Tabs-label">#TEXT#</span></a></li>'
,p_list_template_noncurrent=>'<li class="t-Tabs-item #A03#" id="#A01#"><a href="#LINK#" class="t-Tabs-link #A04#"><span class="t-Icon #ICON_CSS_CLASSES#"></span><span class="t-Tabs-label">#TEXT#</span></a></li>'
,p_list_template_name=>'Tabs'
,p_internal_name=>'TABS'
,p_javascript_file_urls=>'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.apexTabs#MIN#.js?v=#APEX_VERSION#'
,p_theme_id=>42
,p_theme_class_id=>7
,p_preset_template_options=>'t-Tabs--simple'
,p_list_template_before_rows=>'<ul class="t-Tabs #COMPONENT_CSS_CLASSES#">'
,p_list_template_after_rows=>'</ul>'
,p_a01_label=>'List Item ID'
,p_a03_label=>'List Item Class'
,p_a04_label=>'Link Class'
,p_reference_id=>3288206686691809997
);
end;
/
prompt --application/shared_components/user_interface/templates/list/menu_popup
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472333401466945907)
,p_list_template_current=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>',
''))
,p_list_template_noncurrent=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>',
''))
,p_list_template_name=>'Menu Popup'
,p_internal_name=>'MENU_POPUP'
,p_javascript_code_onload=>wwv_flow_string.join(wwv_flow_t_varchar2(
'var e = apex.jQuery("##PARENT_STATIC_ID#_menu", apex.gPageContext$);',
'if (e.hasClass("js-addActions")) {',
'  apex.actions.addFromMarkup( e );',
'}',
'e.menu({ iconType: ''fa'', callout: e.hasClass("js-menu-callout")});'))
,p_theme_id=>42
,p_theme_class_id=>20
,p_list_template_before_rows=>'<div id="#PARENT_STATIC_ID#_menu" class="#COMPONENT_CSS_CLASSES#" style="display:none;"><ul>'
,p_list_template_after_rows=>'</ul></div>'
,p_before_sub_list=>'<ul>'
,p_after_sub_list=>'</ul></li>'
,p_sub_list_item_current=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_sub_list_item_noncurrent=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a></li>'
,p_item_templ_curr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_item_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_curr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_sub_templ_noncurr_w_child=>'<li data-id="#A01#" data-disabled="#A02#" data-hide="#A03#" data-shortcut="#A05#" data-icon="#ICON_CSS_CLASSES#"><a href="#LINK#" title="#A04#" target="#A06#">#TEXT_ESC_SC#</a>'
,p_a01_label=>'Menu Item ID / Action Name'
,p_a02_label=>'Disabled (True/False)'
,p_a03_label=>'Hidden (True/False)'
,p_a04_label=>'Title Attribute (Used By Actions Only)'
,p_a05_label=>'Shortcut'
,p_a06_label=>'Link Target'
,p_reference_id=>3492264004432431646
);
end;
/
prompt --application/shared_components/user_interface/templates/list/links_list
begin
wwv_flow_api.create_list_template(
 p_id=>wwv_flow_api.id(472334036440945907)
,p_list_template_current=>'<li class="t-LinksList-item is-current #A03#"><a href="#LINK#" class="t-LinksList-link" #A02#><span class="t-LinksList-icon"><span class="t-Icon #ICON_CSS_CLASSES#"></span></span><span class="t-LinksList-label">#TEXT#</span><span class="t-LinksList-b'
||'adge">#A01#</span></a></li>'
,p_list_template_noncurrent=>'<li class="t-LinksList-item #A03#"><a href="#LINK#" class="t-LinksList-link" #A02#><span class="t-LinksList-icon"><span class="t-Icon #ICON_CSS_CLASSES#"></span></span><span class="t-LinksList-label">#TEXT#</span><span class="t-LinksList-badge">#A01#'
||'</span></a></li>'
,p_list_template_name=>'Links List'
,p_internal_name=>'LINKS_LIST'
,p_theme_id=>42
,p_theme_class_id=>18
,p_list_template_before_rows=>'<ul class="t-LinksList #COMPONENT_CSS_CLASSES#" id="#LIST_ID#">'
,p_list_template_after_rows=>'</ul>'
,p_before_sub_list=>'<ul class="t-LinksList-list">'
,p_after_sub_list=>'</ul>'
,p_sub_list_item_current=>'<li class="t-LinksList-item is-current #A03#"><a href="#LINK#" class="t-LinksList-link" #A02#><span class="t-LinksList-icon"><span class="t-Icon #ICON_CSS_CLASSES#"></span></span><span class="t-LinksList-label">#TEXT#</span><span class="t-LinksList-b'
||'adge">#A01#</span></a></li>'
,p_sub_list_item_noncurrent=>'<li class="t-LinksList-item #A03#"><a href="#LINK#" class="t-LinksList-link" #A02#><span class="t-LinksList-icon"><span class="t-Icon #ICON_CSS_CLASSES#"></span></span><span class="t-LinksList-label">#TEXT#</span><span class="t-LinksList-badge">#A01#'
||'</span></a></li>'
,p_item_templ_curr_w_child=>'<li class="t-LinksList-item is-current is-expanded #A03#"><a href="#LINK#" class="t-LinksList-link" #A02#><span class="t-LinksList-icon"><span class="t-Icon #ICON_CSS_CLASSES#"></span></span><span class="t-LinksList-label">#TEXT#</span><span class="t'
||'-LinksList-badge">#A01#</span></a>#SUB_LISTS#</li>'
,p_item_templ_noncurr_w_child=>'<li class="t-LinksList-item #A03#"><a href="#LINK#" class="t-LinksList-link" #A02#><span class="t-LinksList-icon"><span class="t-Icon #ICON_CSS_CLASSES#"></span></span><span class="t-LinksList-label">#TEXT#</span><span class="t-LinksList-badge">#A01#'
||'</span></a></li>'
,p_a01_label=>'Badge Value'
,p_a02_label=>'Link Attributes'
,p_a03_label=>'List Item CSS Classes'
,p_reference_id=>4070914341144059318
);
end;
/
prompt --application/shared_components/user_interface/templates/report/alerts
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472286699677945890)
,p_row_template_name=>'Alerts'
,p_internal_name=>'ALERTS'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Alert t-Alert--horizontal t-Alert--colorBG t-Alert--defaultIcons t-Alert--#ALERT_TYPE#" role="alert">',
'  <div class="t-Alert-wrap">',
'    <div class="t-Alert-icon">',
'      <span class="t-Icon"></span>',
'    </div>',
'    <div class="t-Alert-content">',
'      <div class="t-Alert-header">',
'        <h2 class="t-Alert-title">#ALERT_TITLE#</h2>',
'      </div>',
'      <div class="t-Alert-body">',
'        #ALERT_DESC#',
'      </div>',
'    </div>',
'    <div class="t-Alert-buttons">',
'      #ALERT_ACTION#',
'    </div>',
'  </div>',
'</div>'))
,p_row_template_before_rows=>'<div class="t-Alerts #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_alerts" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</div>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>14
,p_reference_id=>2881456138952347027
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/badge_list
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472286824492945892)
,p_row_template_name=>'Badge List'
,p_internal_name=>'BADGE_LIST'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-BadgeList-item">',
' <span class="t-BadgeList-wrap u-color">',
'  <span class="t-BadgeList-label">#COLUMN_HEADER#</span>',
'  <span class="t-BadgeList-value">#COLUMN_VALUE#</span>',
' </span>',
'</li>'))
,p_row_template_before_rows=>'<ul class="t-BadgeList #COMPONENT_CSS_CLASSES#" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'GENERIC_COLUMNS'
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>6
,p_preset_template_options=>'t-BadgeList--large:t-BadgeList--fixed:t-BadgeList--circular'
,p_reference_id=>2103197159775914759
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/cards
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472290824968945893)
,p_row_template_name=>'Cards'
,p_internal_name=>'CARDS'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Cards-item #CARD_MODIFIERS#">',
'  <div class="t-Card">',
'    <a href="#CARD_LINK#" class="t-Card-wrap">',
'      <div class="t-Card-icon u-color #CARD_COLOR#"><span class="t-Icon fa #CARD_ICON#"><span class="t-Card-initials" role="presentation">#CARD_INITIALS#</span></span></div>',
'      <div class="t-Card-titleWrap"><h3 class="t-Card-title">#CARD_TITLE#</h3><h4 class="t-Card-subtitle">#CARD_SUBTITLE#</h4></div>',
'      <div class="t-Card-body">',
'        <div class="t-Card-desc">#CARD_TEXT#</div>',
'        <div class="t-Card-info">#CARD_SUBTEXT#</div>',
'      </div>',
'      <span class="t-Card-colorFill u-color #CARD_COLOR#"></span>',
'    </a>',
'  </div>',
'</li>'))
,p_row_template_condition1=>':CARD_LINK is not null'
,p_row_template2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Cards-item #CARD_MODIFIERS#">',
'  <div class="t-Card">',
'    <div class="t-Card-wrap">',
'      <div class="t-Card-icon u-color #CARD_COLOR#"><span class="t-Icon fa #CARD_ICON#"><span class="t-Card-initials" role="presentation">#CARD_INITIALS#</span></span></div>',
'      <div class="t-Card-titleWrap"><h3 class="t-Card-title">#CARD_TITLE#</h3><h4 class="t-Card-subtitle">#CARD_SUBTITLE#</h4></div>',
'      <div class="t-Card-body">',
'        <div class="t-Card-desc">#CARD_TEXT#</div>',
'        <div class="t-Card-info">#CARD_SUBTEXT#</div>',
'      </div>',
'      <span class="t-Card-colorFill u-color #CARD_COLOR#"></span>',
'    </div>',
'  </div>',
'</li>'))
,p_row_template_before_rows=>'<ul class="t-Cards #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_cards" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'NOT_CONDITIONAL'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'NOT_CONDITIONAL'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>7
,p_preset_template_options=>'t-Cards--animColorFill:t-Cards--3cols:t-Cards--basic'
,p_reference_id=>2973535649510699732
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/comments
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472296275002945895)
,p_row_template_name=>'Comments'
,p_internal_name=>'COMMENTS'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Comments-item #COMMENT_MODIFIERS#">',
'    <div class="t-Comments-icon">',
'        <div class="t-Comments-userIcon #ICON_MODIFIER#" aria-hidden="true">#USER_ICON#</div>',
'    </div>',
'    <div class="t-Comments-body">',
'        <div class="t-Comments-info">',
'            #USER_NAME# <span class="t-Comments-date">#COMMENT_DATE#</span> <span class="t-Comments-actions">#ACTIONS#</span>',
'        </div>',
'        <div class="t-Comments-comment">',
'            #COMMENT_TEXT##ATTRIBUTE_1##ATTRIBUTE_2##ATTRIBUTE_3##ATTRIBUTE_4#',
'        </div>',
'    </div>',
'</li>'))
,p_row_template_before_rows=>'<ul class="t-Comments #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_report" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'NOT_CONDITIONAL'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>',
''))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>7
,p_preset_template_options=>'t-Comments--chat'
,p_reference_id=>2611722012730764232
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/content_row
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472297479275945895)
,p_row_template_name=>'Content Row'
,p_internal_name=>'CONTENT_ROW'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-ContentRow-item #ITEM_CLASSES#">',
'  <div class="t-ContentRow-wrap">',
'    <div class="t-ContentRow-selection">#SELECTION#</div>',
'    <div class="t-ContentRow-iconWrap">',
'      <span class="t-ContentRow-icon #ICON_CLASS#">#ICON_HTML#</span>',
'    </div>',
'    <div class="t-ContentRow-body">',
'      <div class="t-ContentRow-content">',
'        <h3 class="t-ContentRow-title">#TITLE#</h3>',
'        <div class="t-ContentRow-description">#DESCRIPTION#</div>',
'      </div>',
'      <div class="t-ContentRow-misc">#MISC#</div>',
'      <div class="t-ContentRow-actions">#ACTIONS#</div>',
'    </div>',
'  </div>',
'</li>'))
,p_row_template_before_rows=>'<ul class="t-ContentRow #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_report" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>4
,p_reference_id=>1797843454948280151
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/media_list
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472300668206945895)
,p_row_template_name=>'Media List'
,p_internal_name=>'MEDIA_LIST'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MediaList-item #LIST_CLASS#">',
'    <a href="#LINK#" class="t-MediaList-itemWrap #LINK_CLASS#" #LINK_ATTR#>',
'        <div class="t-MediaList-iconWrap">',
'            <span class="t-MediaList-icon u-color #ICON_COLOR_CLASS#"><span class="t-Icon #ICON_CLASS#"></span></span>',
'        </div>',
'        <div class="t-MediaList-body">',
'            <h3 class="t-MediaList-title">#LIST_TITLE#</h3>',
'            <p class="t-MediaList-desc">#LIST_TEXT#</p>',
'        </div>',
'        <div class="t-MediaList-badgeWrap">',
'            <span class="t-MediaList-badge">#LIST_BADGE#</span>',
'        </div>',
'    </a>',
'</li>'))
,p_row_template_condition1=>':LINK is not null'
,p_row_template2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-MediaList-item #LIST_CLASS#">',
'    <div class="t-MediaList-itemWrap #LINK_CLASS#" #LINK_ATTR#>',
'        <div class="t-MediaList-iconWrap">',
'            <span class="t-MediaList-icon u-color #ICON_COLOR_CLASS#"><span class="t-Icon #ICON_CLASS#"></span></span>',
'        </div>',
'        <div class="t-MediaList-body">',
'            <h3 class="t-MediaList-title">#LIST_TITLE#</h3>',
'            <p class="t-MediaList-desc">#LIST_TEXT#</p>',
'        </div>',
'        <div class="t-MediaList-badgeWrap">',
'            <span class="t-MediaList-badge">#LIST_BADGE#</span>',
'        </div>',
'    </div>',
'</li>'))
,p_row_template_before_rows=>'<ul class="t-MediaList #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_report" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'NOT_CONDITIONAL'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'NOT_CONDITIONAL'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>1
,p_default_template_options=>'t-MediaList--showDesc:t-MediaList--showIcons'
,p_preset_template_options=>'t-MediaList--stack'
,p_reference_id=>2092157460408299055
,p_translate_this_template=>'N'
,p_row_template_comment=>' (SELECT link_text, link_target, detail1, detail2, last_modified)'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/search_results
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472303621432945896)
,p_row_template_name=>'Search Results'
,p_internal_name=>'SEARCH_RESULTS'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-SearchResults-item">',
'    <h3 class="t-SearchResults-title"><a href="#SEARCH_LINK#">#SEARCH_TITLE#</a></h3>',
'    <div class="t-SearchResults-info">',
'      <p class="t-SearchResults-desc">#SEARCH_DESC#</p>',
'      <span class="t-SearchResults-misc">#LABEL_01#: #VALUE_01#</span>',
'    </div>',
'  </li>'))
,p_row_template_condition1=>':LABEL_02 is null'
,p_row_template2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-SearchResults-item">',
'    <h3 class="t-SearchResults-title"><a href="#SEARCH_LINK#">#SEARCH_TITLE#</a></h3>',
'    <div class="t-SearchResults-info">',
'      <p class="t-SearchResults-desc">#SEARCH_DESC#</p>',
'      <span class="t-SearchResults-misc">#LABEL_01#: #VALUE_01#</span>',
'      <span class="t-SearchResults-misc">#LABEL_02#: #VALUE_02#</span>',
'    </div>',
'  </li>'))
,p_row_template_condition2=>':LABEL_03 is null'
,p_row_template3=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-SearchResults-item">',
'    <h3 class="t-SearchResults-title"><a href="#SEARCH_LINK#">#SEARCH_TITLE#</a></h3>',
'    <div class="t-SearchResults-info">',
'      <p class="t-SearchResults-desc">#SEARCH_DESC#</p>',
'      <span class="t-SearchResults-misc">#LABEL_01#: #VALUE_01#</span>',
'      <span class="t-SearchResults-misc">#LABEL_02#: #VALUE_02#</span>',
'      <span class="t-SearchResults-misc">#LABEL_03#: #VALUE_03#</span>',
'    </div>',
'  </li>'))
,p_row_template_condition3=>':LABEL_04 is null'
,p_row_template4=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-SearchResults-item">',
'    <h3 class="t-SearchResults-title"><a href="#SEARCH_LINK#">#SEARCH_TITLE#</a></h3>',
'    <div class="t-SearchResults-info">',
'      <p class="t-SearchResults-desc">#SEARCH_DESC#</p>',
'      <span class="t-SearchResults-misc">#LABEL_01#: #VALUE_01#</span>',
'      <span class="t-SearchResults-misc">#LABEL_02#: #VALUE_02#</span>',
'      <span class="t-SearchResults-misc">#LABEL_03#: #VALUE_03#</span>',
'      <span class="t-SearchResults-misc">#LABEL_04#: #VALUE_04#</span>',
'    </div>',
'  </li>'))
,p_row_template_before_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-SearchResults #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_report" data-region-id="#REGION_STATIC_ID#">',
'<ul class="t-SearchResults-list">'))
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>',
'</div>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'NOT_CONDITIONAL'
,p_row_template_display_cond2=>'NOT_CONDITIONAL'
,p_row_template_display_cond3=>'NOT_CONDITIONAL'
,p_row_template_display_cond4=>'NOT_CONDITIONAL'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>1
,p_reference_id=>4070913431524059316
,p_translate_this_template=>'N'
,p_row_template_comment=>' (SELECT link_text, link_target, detail1, detail2, last_modified)'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/standard
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472303814532945896)
,p_row_template_name=>'Standard'
,p_internal_name=>'STANDARD'
,p_row_template1=>'<td class="t-Report-cell" #ALIGNMENT# headers="#COLUMN_HEADER_NAME#">#COLUMN_VALUE#</td>'
,p_row_template_before_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Report #COMPONENT_CSS_CLASSES#" id="report_#REGION_STATIC_ID#" #REPORT_ATTRIBUTES# data-region-id="#REGION_STATIC_ID#">',
'  <div class="t-Report-wrap">',
'    <table class="t-Report-pagination" role="presentation">#TOP_PAGINATION#</table>',
'    <div class="t-Report-tableWrap">',
'    <table class="t-Report-report" id="report_table_#REGION_STATIC_ID#" aria-label="#REGION_TITLE#">'))
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'      </tbody>',
'    </table>',
'    </div>',
'    <div class="t-Report-links">#EXTERNAL_LINK##CSV_LINK#</div>',
'    <table class="t-Report-pagination t-Report-pagination--bottom" role="presentation">#PAGINATION#</table>',
'  </div>',
'</div>'))
,p_row_template_type=>'GENERIC_COLUMNS'
,p_before_column_heading=>'<thead>'
,p_column_heading_template=>'<th class="t-Report-colHead" #ALIGNMENT# id="#COLUMN_HEADER_NAME#" #COLUMN_WIDTH#>#COLUMN_HEADER#</th>'
,p_after_column_heading=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</thead>',
'<tbody>'))
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>4
,p_preset_template_options=>'t-Report--altRowsDefault:t-Report--rowHighlight'
,p_reference_id=>2537207537838287671
,p_translate_this_template=>'N'
);
begin
wwv_flow_api.create_row_template_patch(
 p_id=>wwv_flow_api.id(472303814532945896)
,p_row_template_before_first=>'<tr>'
,p_row_template_after_last=>'</tr>'
);
exception when others then null;
end;
end;
/
prompt --application/shared_components/user_interface/templates/report/timeline
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472306460088945896)
,p_row_template_name=>'Timeline'
,p_internal_name=>'TIMELINE'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Timeline-item #EVENT_MODIFIERS#" #EVENT_ATTRIBUTES#>',
'  <div class="t-Timeline-wrap">',
'    <div class="t-Timeline-user">',
'      <div class="t-Timeline-avatar #USER_COLOR#">',
'        #USER_AVATAR#',
'      </div>',
'      <div class="t-Timeline-userinfo">',
'        <span class="t-Timeline-username">#USER_NAME#</span>',
'        <span class="t-Timeline-date">#EVENT_DATE#</span>',
'      </div>',
'    </div>',
'    <div class="t-Timeline-content">',
'      <div class="t-Timeline-typeWrap">',
'        <div class="t-Timeline-type #EVENT_STATUS#">',
'          <span class="t-Icon #EVENT_ICON#"></span>',
'          <span class="t-Timeline-typename">#EVENT_TYPE#</span>',
'        </div>',
'      </div>',
'      <div class="t-Timeline-body">',
'        <h3 class="t-Timeline-title">#EVENT_TITLE#</h3>',
'        <p class="t-Timeline-desc">#EVENT_DESC#</p>',
'      </div>',
'    </div>',
'  </div>',
'</li>'))
,p_row_template_condition1=>':EVENT_LINK is null'
,p_row_template2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<li class="t-Timeline-item #EVENT_MODIFIERS#" #EVENT_ATTRIBUTES#>',
'  <a href="#EVENT_LINK#" class="t-Timeline-wrap">',
'    <div class="t-Timeline-user">',
'      <div class="t-Timeline-avatar #USER_COLOR#">',
'        #USER_AVATAR#',
'      </div>',
'      <div class="t-Timeline-userinfo">',
'        <span class="t-Timeline-username">#USER_NAME#</span>',
'        <span class="t-Timeline-date">#EVENT_DATE#</span>',
'      </div>',
'    </div>',
'    <div class="t-Timeline-content">',
'      <div class="t-Timeline-typeWrap">',
'        <div class="t-Timeline-type #EVENT_STATUS#">',
'          <span class="t-Icon #EVENT_ICON#"></span>',
'          <span class="t-Timeline-typename">#EVENT_TYPE#</span>',
'        </div>',
'      </div>',
'      <div class="t-Timeline-body">',
'        <h3 class="t-Timeline-title">#EVENT_TITLE#</h3>',
'        <p class="t-Timeline-desc">#EVENT_DESC#</p>',
'      </div>',
'    </div>',
'  </a>',
'</li>'))
,p_row_template_before_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<ul class="t-Timeline #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="#REGION_STATIC_ID#_timeline" data-region-id="#REGION_STATIC_ID#">',
''))
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</ul>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'NOT_CONDITIONAL'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'NOT_CONDITIONAL'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>7
,p_reference_id=>1513373588340069864
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/value_attribute_pairs_column
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472306822863945898)
,p_row_template_name=>'Value Attribute Pairs - Column'
,p_internal_name=>'VALUE_ATTRIBUTE_PAIRS_COLUMN'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<dt class="t-AVPList-label">',
'  #COLUMN_HEADER#',
'</dt>',
'<dd class="t-AVPList-value">',
'  #COLUMN_VALUE#',
'</dd>'))
,p_row_template_before_rows=>'<dl class="t-AVPList #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</dl>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'GENERIC_COLUMNS'
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>6
,p_preset_template_options=>'t-AVPList--leftAligned'
,p_reference_id=>2099068636272681754
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/report/value_attribute_pairs_row
begin
wwv_flow_api.create_row_template(
 p_id=>wwv_flow_api.id(472308844968945898)
,p_row_template_name=>'Value Attribute Pairs - Row'
,p_internal_name=>'VALUE_ATTRIBUTE_PAIRS_ROW'
,p_row_template1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<dt class="t-AVPList-label">',
'  #1#',
'</dt>',
'<dd class="t-AVPList-value">',
'  #2#',
'</dd>'))
,p_row_template_before_rows=>'<dl class="t-AVPList #COMPONENT_CSS_CLASSES#" #REPORT_ATTRIBUTES# id="report_#REGION_STATIC_ID#" data-region-id="#REGION_STATIC_ID#">'
,p_row_template_after_rows=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</dl>',
'<table class="t-Report-pagination" role="presentation">#PAGINATION#</table>'))
,p_row_template_type=>'NAMED_COLUMNS'
,p_row_template_display_cond1=>'0'
,p_row_template_display_cond2=>'0'
,p_row_template_display_cond3=>'0'
,p_row_template_display_cond4=>'0'
,p_pagination_template=>'<span class="t-Report-paginationText">#TEXT#</span>'
,p_next_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_page_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS#',
'</a>'))
,p_next_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next">',
'  #PAGINATION_NEXT_SET#<span class="a-Icon icon-right-arrow"></span>',
'</a>'))
,p_previous_set_template=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<a href="#LINK#" class="t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev">',
'  <span class="a-Icon icon-left-arrow"></span>#PAGINATION_PREVIOUS_SET#',
'</a>'))
,p_theme_id=>42
,p_theme_class_id=>7
,p_preset_template_options=>'t-AVPList--leftAligned'
,p_reference_id=>2099068321678681753
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/hidden
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472335622814945909)
,p_template_name=>'Hidden'
,p_internal_name=>'HIDDEN'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer t-Form-labelContainer--hiddenLabel col col-#LABEL_COLUMN_SPAN_NUMBER#">',
'<label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label u-VisuallyHidden">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</label>',
'</div>'))
,p_before_item=>'<div class="t-Form-fieldContainer t-Form-fieldContainer--hiddenLabel rel-col #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer col col-#ITEM_COLUMN_SPAN_NUMBER#"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT##HELP_TEMPLATE#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>13
,p_reference_id=>2039339104148359505
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/optional
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472335722995945909)
,p_template_name=>'Optional'
,p_internal_name=>'OPTIONAL'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer col col-#LABEL_COLUMN_SPAN_NUMBER#">',
'<label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</label>',
'</div>',
''))
,p_before_item=>'<div class="t-Form-fieldContainer rel-col #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer col col-#ITEM_COLUMN_SPAN_NUMBER#"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT##HELP_TEMPLATE#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>3
,p_reference_id=>2317154212072806530
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/optional_above
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472335804445945909)
,p_template_name=>'Optional - Above'
,p_internal_name=>'OPTIONAL_ABOVE'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer">',
'<label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</label>#HELP_TEMPLATE#',
'</div>'))
,p_before_item=>'<div class="t-Form-fieldContainer t-Form-fieldContainer--stacked #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>3
,p_reference_id=>3030114864004968404
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/optional_floating
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472335930824945909)
,p_template_name=>'Optional - Floating'
,p_internal_name=>'OPTIONAL_FLOATING'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer">',
'<label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</label>',
'</div>'))
,p_before_item=>'<div class="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT##HELP_TEMPLATE#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>3
,p_reference_id=>1607675164727151865
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/required
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472336055780945909)
,p_template_name=>'Required'
,p_internal_name=>'REQUIRED'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer col col-#LABEL_COLUMN_SPAN_NUMBER#">',
'  <label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
' <span class="u-VisuallyHidden">(#VALUE_REQUIRED#)</span></label>',
'</div>'))
,p_before_item=>'<div class="t-Form-fieldContainer is-required rel-col #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer col col-#ITEM_COLUMN_SPAN_NUMBER#"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT##HELP_TEMPLATE#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>4
,p_reference_id=>2525313812251712801
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/required_above
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472336137881945909)
,p_template_name=>'Required - Above'
,p_internal_name=>'REQUIRED_ABOVE'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer">',
'  <label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
' <span class="u-VisuallyHidden">(#VALUE_REQUIRED#)</span></label> #HELP_TEMPLATE#',
'</div>'))
,p_before_item=>'<div class="t-Form-fieldContainer t-Form-fieldContainer--stacked is-required #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>4
,p_reference_id=>3030115129444970113
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/label/required_floating
begin
wwv_flow_api.create_field_template(
 p_id=>wwv_flow_api.id(472336202125945909)
,p_template_name=>'Required - Floating'
,p_internal_name=>'REQUIRED_FLOATING'
,p_template_body1=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-Form-labelContainer">',
'  <label for="#CURRENT_ITEM_NAME#" id="#LABEL_ID#" class="t-Form-label">'))
,p_template_body2=>wwv_flow_string.join(wwv_flow_t_varchar2(
' <span class="u-VisuallyHidden">(#VALUE_REQUIRED#)</span></label>',
'</div>'))
,p_before_item=>'<div class="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required #ITEM_CSS_CLASSES#" id="#CURRENT_ITEM_CONTAINER_ID#">'
,p_after_item=>'</div>'
,p_item_pre_text=>'<span class="t-Form-itemText t-Form-itemText--pre">#CURRENT_ITEM_PRE_TEXT#</span>'
,p_item_post_text=>'<span class="t-Form-itemText t-Form-itemText--post">#CURRENT_ITEM_POST_TEXT#</span>'
,p_before_element=>'<div class="t-Form-inputContainer"><div class="t-Form-itemWrapper">#ITEM_PRE_TEXT#'
,p_after_element=>'#ITEM_POST_TEXT##HELP_TEMPLATE#</div>#INLINE_HELP_TEMPLATE##ERROR_TEMPLATE#</div>'
,p_help_link=>'<button class="t-Form-helpButton js-itemHelp" data-itemhelp="#CURRENT_ITEM_ID#" title="#CURRENT_ITEM_HELP_LABEL#" aria-label="#CURRENT_ITEM_HELP_LABEL#" tabindex="-1" type="button"><span class="a-Icon icon-help" aria-hidden="true"></span></button>'
,p_inline_help_text=>'<span class="t-Form-inlineHelp">#CURRENT_ITEM_INLINE_HELP_TEXT#</span>'
,p_error_template=>'<span class="t-Form-error">#ERROR_MESSAGE#</span>'
,p_theme_id=>42
,p_theme_class_id=>4
,p_reference_id=>1607675344320152883
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/breadcrumb/breadcrumb
begin
wwv_flow_api.create_menu_template(
 p_id=>wwv_flow_api.id(472338475478945912)
,p_name=>'Breadcrumb'
,p_internal_name=>'BREADCRUMB'
,p_before_first=>'<ul class="t-Breadcrumb #COMPONENT_CSS_CLASSES#">'
,p_current_page_option=>'<li class="t-Breadcrumb-item is-active"><h1 class="t-Breadcrumb-label">#NAME#</h1></li>'
,p_non_current_page_option=>'<li class="t-Breadcrumb-item"><a href="#LINK#" class="t-Breadcrumb-label">#NAME#</a></li>'
,p_after_last=>'</ul>'
,p_max_levels=>6
,p_start_with_node=>'PARENT_TO_LEAF'
,p_theme_id=>42
,p_theme_class_id=>1
,p_reference_id=>4070916542570059325
,p_translate_this_template=>'N'
);
end;
/
prompt --application/shared_components/user_interface/templates/popuplov
begin
wwv_flow_api.create_popup_lov_template(
 p_id=>wwv_flow_api.id(472338613736945915)
,p_page_name=>'winlov'
,p_page_title=>'Search Dialog'
,p_page_html_head=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<!DOCTYPE html>',
'<html lang="&BROWSER_LANGUAGE.">',
'<head>',
'<title>#TITLE#</title>',
'#APEX_CSS#',
'#THEME_CSS#',
'#THEME_STYLE_CSS#',
'#FAVICONS#',
'#APEX_JAVASCRIPT#',
'#THEME_JAVASCRIPT#',
'<meta name="viewport" content="width=device-width,initial-scale=1.0" />',
'</head>'))
,p_page_body_attr=>'onload="first_field()" class="t-Page t-Page--popupLOV"'
,p_before_field_text=>'<div class="t-PopupLOV-actions t-Form--large">'
,p_filter_width=>'20'
,p_filter_max_width=>'100'
,p_filter_text_attr=>'class="apex-item-text"'
,p_find_button_text=>'Search'
,p_find_button_attr=>'class="t-Button t-Button--hot t-Button--padLeft"'
,p_close_button_text=>'Close'
,p_close_button_attr=>'class="t-Button u-pullRight"'
,p_next_button_text=>'Next &gt;'
,p_next_button_attr=>'class="t-Button t-PopupLOV-button"'
,p_prev_button_text=>'&lt; Previous'
,p_prev_button_attr=>'class="t-Button t-PopupLOV-button"'
,p_after_field_text=>'</div>'
,p_scrollbars=>'1'
,p_resizable=>'1'
,p_width=>'380'
,p_result_row_x_of_y=>'<div class="t-PopupLOV-pagination">Row(s) #FIRST_ROW# - #LAST_ROW#</div>'
,p_result_rows_per_pg=>100
,p_before_result_set=>'<div class="t-PopupLOV-links">'
,p_theme_id=>42
,p_theme_class_id=>1
,p_reference_id=>2885398517835871876
,p_translate_this_template=>'N'
,p_after_result_set=>'</div>'
);
end;
/
prompt --application/shared_components/user_interface/templates/calendar/calendar
begin
wwv_flow_api.create_calendar_template(
 p_id=>wwv_flow_api.id(472338563742945912)
,p_cal_template_name=>'Calendar'
,p_internal_name=>'CALENDAR'
,p_day_of_week_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<th id="#DY#" scope="col" class="t-ClassicCalendar-dayColumn">',
'  <span class="visible-md visible-lg">#IDAY#</span>',
'  <span class="hidden-md hidden-lg">#IDY#</span>',
'</th>'))
,p_month_title_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ClassicCalendar">',
'<h1 class="t-ClassicCalendar-title">#IMONTH# #YYYY#</h1>'))
,p_month_open_format=>'<table class="t-ClassicCalendar-calendar" cellpadding="0" cellspacing="0" border="0" aria-label="#IMONTH# #YYYY#">'
,p_month_close_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</table>',
'</div>',
''))
,p_day_title_format=>'<span class="t-ClassicCalendar-date">#DD#</span>'
,p_day_open_format=>'<td class="t-ClassicCalendar-day" headers="#DY#">#TITLE_FORMAT#<div class="t-ClassicCalendar-dayEvents">#DATA#</div>'
,p_day_close_format=>'</td>'
,p_today_open_format=>'<td class="t-ClassicCalendar-day is-today" headers="#DY#">#TITLE_FORMAT#<div class="t-ClassicCalendar-dayEvents">#DATA#</div>'
,p_weekend_title_format=>'<span class="t-ClassicCalendar-date">#DD#</span>'
,p_weekend_open_format=>'<td class="t-ClassicCalendar-day is-weekend" headers="#DY#">#TITLE_FORMAT#<div class="t-ClassicCalendar-dayEvents">#DATA#</div>'
,p_weekend_close_format=>'</td>'
,p_nonday_title_format=>'<span class="t-ClassicCalendar-date">#DD#</span>'
,p_nonday_open_format=>'<td class="t-ClassicCalendar-day is-inactive" headers="#DY#">'
,p_nonday_close_format=>'</td>'
,p_week_open_format=>'<tr>'
,p_week_close_format=>'</tr> '
,p_daily_title_format=>'<table cellspacing="0" cellpadding="0" border="0" summary="" class="t1DayCalendarHolder"> <tr> <td class="t1MonthTitle">#IMONTH# #DD#, #YYYY#</td> </tr> <tr> <td>'
,p_daily_open_format=>'<tr>'
,p_daily_close_format=>'</tr>'
,p_weekly_title_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ClassicCalendar t-ClassicCalendar--weekly">',
'<h1 class="t-ClassicCalendar-title">#WTITLE#</h1>'))
,p_weekly_day_of_week_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<th scope="col" class="t-ClassicCalendar-dayColumn" id="#DY#">',
'  <span class="visible-md visible-lg">#DD# #IDAY#</span>',
'  <span class="hidden-md hidden-lg">#DD# #IDY#</span>',
'</th>'))
,p_weekly_month_open_format=>'<table border="0" cellpadding="0" cellspacing="0" aria-label="#CALENDAR_TITLE# #START_DL# - #END_DL#" class="t-ClassicCalendar-calendar">'
,p_weekly_month_close_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</table>',
'</div>'))
,p_weekly_day_open_format=>'<td class="t-ClassicCalendar-day" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_weekly_day_close_format=>'</div></td>'
,p_weekly_today_open_format=>'<td class="t-ClassicCalendar-day is-today" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_weekly_weekend_open_format=>'<td class="t-ClassicCalendar-day is-weekend" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_weekly_weekend_close_format=>'</div></td>'
,p_weekly_time_open_format=>'<th scope="row" class="t-ClassicCalendar-day t-ClassicCalendar-timeCol">'
,p_weekly_time_close_format=>'</th>'
,p_weekly_time_title_format=>'#TIME#'
,p_weekly_hour_open_format=>'<tr>'
,p_weekly_hour_close_format=>'</tr>'
,p_daily_day_of_week_format=>'<th scope="col" id="#DY#" class="t-ClassicCalendar-dayColumn">#IDAY#</th>'
,p_daily_month_title_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ClassicCalendar t-ClassicCalendar--daily">',
'<h1 class="t-ClassicCalendar-title">#IMONTH# #DD#, #YYYY#</h1>'))
,p_daily_month_open_format=>'<table border="0" cellpadding="0" cellspacing="0" aria-label="#CALENDAR_TITLE# #START_DL#" class="t-ClassicCalendar-calendar">'
,p_daily_month_close_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</table>',
'</div>'))
,p_daily_day_open_format=>'<td class="t-ClassicCalendar-day" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_daily_day_close_format=>'</div></td>'
,p_daily_today_open_format=>'<td class="t-ClassicCalendar-day is-today" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_daily_time_open_format=>'<th scope="row" class="t-ClassicCalendar-day t-ClassicCalendar-timeCol" id="#TIME#">'
,p_daily_time_close_format=>'</th>'
,p_daily_time_title_format=>'#TIME#'
,p_daily_hour_open_format=>'<tr>'
,p_daily_hour_close_format=>'</tr>'
,p_cust_month_title_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ClassicCalendar">',
'<h1 class="t-ClassicCalendar-title">#IMONTH# #YYYY#</h1>'))
,p_cust_day_of_week_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<th id="#DY#" scope="col" class="t-ClassicCalendar-dayColumn">',
'  <span class="visible-md visible-lg">#IDAY#</span>',
'  <span class="hidden-md hidden-lg">#IDY#</span>',
'</th>'))
,p_cust_month_open_format=>'<table class="t-ClassicCalendar-calendar" cellpadding="0" cellspacing="0" border="0" aria-label="#IMONTH# #YYYY#">'
,p_cust_month_close_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</table>',
'</div>'))
,p_cust_week_open_format=>'<tr>'
,p_cust_week_close_format=>'</tr> '
,p_cust_day_title_format=>'<span class="t-ClassicCalendar-date">#DD#</span>'
,p_cust_day_open_format=>'<td class="t-ClassicCalendar-day" headers="#DY#">'
,p_cust_day_close_format=>'</td>'
,p_cust_today_open_format=>'<td class="t-ClassicCalendar-day is-today" headers="#DY#">'
,p_cust_nonday_title_format=>'<span class="t-ClassicCalendar-date">#DD#</span>'
,p_cust_nonday_open_format=>'<td class="t-ClassicCalendar-day is-inactive" headers="#DY#">'
,p_cust_nonday_close_format=>'</td>'
,p_cust_weekend_title_format=>'<span class="t-ClassicCalendar-date">#DD#</span>'
,p_cust_weekend_open_format=>'<td class="t-ClassicCalendar-day is-weekend" headers="#DY#">'
,p_cust_weekend_close_format=>'</td>'
,p_cust_hour_open_format=>'<tr>'
,p_cust_hour_close_format=>'</tr>'
,p_cust_time_title_format=>'#TIME#'
,p_cust_time_open_format=>'<th scope="row" class="t-ClassicCalendar-day t-ClassicCalendar-timeCol">'
,p_cust_time_close_format=>'</th>'
,p_cust_wk_month_title_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ClassicCalendar">',
'<h1 class="t-ClassicCalendar-title">#WTITLE#</h1>'))
,p_cust_wk_day_of_week_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<th scope="col" class="t-ClassicCalendar-dayColumn" id="#DY#">',
'  <span class="visible-md visible-lg">#DD# #IDAY#</span>',
'  <span class="hidden-md hidden-lg">#DD# #IDY#</span>',
'</th>'))
,p_cust_wk_month_open_format=>'<table border="0" cellpadding="0" cellspacing="0" summary="#CALENDAR_TITLE# #START_DL# - #END_DL#" class="t-ClassicCalendar-calendar">'
,p_cust_wk_month_close_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'</table>',
'</div>'))
,p_cust_wk_week_open_format=>'<tr>'
,p_cust_wk_week_close_format=>'</tr> '
,p_cust_wk_day_open_format=>'<td class="t-ClassicCalendar-day" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_cust_wk_day_close_format=>'</div></td>'
,p_cust_wk_today_open_format=>'<td class="t-ClassicCalendar-day is-today" headers="#DY#"><div class="t-ClassicCalendar-dayEvents">'
,p_cust_wk_weekend_open_format=>'<td class="t-ClassicCalendar-day" headers="#DY#">'
,p_cust_wk_weekend_close_format=>'</td>'
,p_agenda_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<div class="t-ClassicCalendar t-ClassicCalendar--list">',
'  <div class="t-ClassicCalendar-title">#IMONTH# #YYYY#</div>',
'  <ul class="t-ClassicCalendar-list">',
'    #DAYS#',
'  </ul>',
'</div>'))
,p_agenda_past_day_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-ClassicCalendar-listTitle is-past">',
'    <span class="t-ClassicCalendar-listDayTitle">#IDAY#</span><span class="t-ClassicCalendar-listDayDate">#IMONTH# #DD#</span>',
'  </li>'))
,p_agenda_today_day_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-ClassicCalendar-listTitle is-today">',
'    <span class="t-ClassicCalendar-listDayTitle">#IDAY#</span><span class="t-ClassicCalendar-listDayDate">#IMONTH# #DD#</span>',
'  </li>'))
,p_agenda_future_day_format=>wwv_flow_string.join(wwv_flow_t_varchar2(
'  <li class="t-ClassicCalendar-listTitle is-future">',
'    <span class="t-ClassicCalendar-listDayTitle">#IDAY#</span><span class="t-ClassicCalendar-listDayDate">#IMONTH# #DD#</span>',
'  </li>'))
,p_agenda_past_entry_format=>'  <li class="t-ClassicCalendar-listEvent is-past">#DATA#</li>'
,p_agenda_today_entry_format=>'  <li class="t-ClassicCalendar-listEvent is-today">#DATA#</li>'
,p_agenda_future_entry_format=>'  <li class="t-ClassicCalendar-listEvent is-future">#DATA#</li>'
,p_month_data_format=>'#DAYS#'
,p_month_data_entry_format=>'<span class="t-ClassicCalendar-event">#DATA#</span>'
,p_theme_id=>42
,p_theme_class_id=>1
,p_reference_id=>4070916747979059326
);
end;
/
prompt --application/shared_components/user_interface/themes
begin
wwv_flow_api.create_theme(
 p_id=>wwv_flow_api.id(472339800634945918)
,p_theme_id=>42
,p_theme_name=>'Universal Theme'
,p_theme_internal_name=>'UNIVERSAL_THEME'
,p_ui_type_name=>'DESKTOP'
,p_navigation_type=>'L'
,p_nav_bar_type=>'LIST'
,p_reference_id=>4070917134413059350
,p_is_locked=>false
,p_default_page_template=>wwv_flow_api.id(472241329888945873)
,p_default_dialog_template=>wwv_flow_api.id(472224840776945867)
,p_error_template=>wwv_flow_api.id(472226368032945868)
,p_printer_friendly_template=>wwv_flow_api.id(472241329888945873)
,p_breadcrumb_display_point=>'REGION_POSITION_01'
,p_sidebar_display_point=>'REGION_POSITION_02'
,p_login_template=>wwv_flow_api.id(472226368032945868)
,p_default_button_template=>wwv_flow_api.id(472337011970945910)
,p_default_region_template=>wwv_flow_api.id(472274973856945887)
,p_default_chart_template=>wwv_flow_api.id(472274973856945887)
,p_default_form_template=>wwv_flow_api.id(472274973856945887)
,p_default_reportr_template=>wwv_flow_api.id(472274973856945887)
,p_default_tabform_template=>wwv_flow_api.id(472274973856945887)
,p_default_wizard_template=>wwv_flow_api.id(472274973856945887)
,p_default_menur_template=>wwv_flow_api.id(472284353970945890)
,p_default_listr_template=>wwv_flow_api.id(472274973856945887)
,p_default_irr_template=>wwv_flow_api.id(472273039041945887)
,p_default_report_template=>wwv_flow_api.id(472303814532945896)
,p_default_label_template=>wwv_flow_api.id(472335930824945909)
,p_default_menu_template=>wwv_flow_api.id(472338475478945912)
,p_default_calendar_template=>wwv_flow_api.id(472338563742945912)
,p_default_list_template=>wwv_flow_api.id(472334036440945907)
,p_default_nav_list_template=>wwv_flow_api.id(472325071321945906)
,p_default_top_nav_list_temp=>wwv_flow_api.id(472325071321945906)
,p_default_side_nav_list_temp=>wwv_flow_api.id(472323411914945904)
,p_default_nav_list_position=>'SIDE'
,p_default_dialogbtnr_template=>wwv_flow_api.id(472258029597945882)
,p_default_dialogr_template=>wwv_flow_api.id(472247597001945879)
,p_default_option_label=>wwv_flow_api.id(472335930824945909)
,p_default_required_label=>wwv_flow_api.id(472336202125945909)
,p_default_page_transition=>'NONE'
,p_default_popup_transition=>'NONE'
,p_default_navbar_list_template=>wwv_flow_api.id(472326048549945906)
,p_file_prefix => nvl(wwv_flow_application_install.get_static_theme_file_prefix(42),'#IMAGE_PREFIX#themes/theme_42/1.5/')
,p_files_version=>64
,p_icon_library=>'FONTAPEX'
,p_javascript_file_urls=>wwv_flow_string.join(wwv_flow_t_varchar2(
'#IMAGE_PREFIX#libraries/apex/#MIN_DIRECTORY#widget.stickyWidget#MIN#.js?v=#APEX_VERSION#',
'#THEME_IMAGES#js/theme42#MIN#.js?v=#APEX_VERSION#'))
,p_css_file_urls=>'#THEME_IMAGES#css/Core#MIN#.css?v=#APEX_VERSION#'
);
end;
/
prompt --application/shared_components/user_interface/theme_style
begin
wwv_flow_api.create_theme_style(
 p_id=>wwv_flow_api.id(472338846870945917)
,p_theme_id=>42
,p_name=>'Vista'
,p_css_file_urls=>'#THEME_IMAGES#css/Vista#MIN#.css?v=#APEX_VERSION#'
,p_is_current=>false
,p_is_public=>false
,p_is_accessible=>false
,p_theme_roller_read_only=>true
,p_reference_id=>4007676303523989775
);
wwv_flow_api.create_theme_style(
 p_id=>wwv_flow_api.id(472339015269945917)
,p_theme_id=>42
,p_name=>'Vita'
,p_is_current=>true
,p_is_public=>true
,p_is_accessible=>true
,p_theme_roller_input_file_urls=>'#THEME_IMAGES#less/theme/Vita.less'
,p_theme_roller_output_file_url=>'#THEME_IMAGES#css/Vita#MIN#.css?v=#APEX_VERSION#'
,p_theme_roller_read_only=>true
,p_reference_id=>2719875314571594493
);
wwv_flow_api.create_theme_style(
 p_id=>wwv_flow_api.id(472339226251945917)
,p_theme_id=>42
,p_name=>'Vita - Dark'
,p_is_current=>false
,p_is_public=>true
,p_is_accessible=>false
,p_theme_roller_input_file_urls=>'#THEME_IMAGES#less/theme/Vita-Dark.less'
,p_theme_roller_output_file_url=>'#THEME_IMAGES#css/Vita-Dark#MIN#.css?v=#APEX_VERSION#'
,p_theme_roller_read_only=>true
,p_reference_id=>3543348412015319650
);
wwv_flow_api.create_theme_style(
 p_id=>wwv_flow_api.id(472339478467945917)
,p_theme_id=>42
,p_name=>'Vita - Red'
,p_is_current=>false
,p_is_public=>true
,p_is_accessible=>false
,p_theme_roller_input_file_urls=>'#THEME_IMAGES#less/theme/Vita-Red.less'
,p_theme_roller_output_file_url=>'#THEME_IMAGES#css/Vita-Red#MIN#.css?v=#APEX_VERSION#'
,p_theme_roller_read_only=>true
,p_reference_id=>1938457712423918173
);
wwv_flow_api.create_theme_style(
 p_id=>wwv_flow_api.id(472339650181945917)
,p_theme_id=>42
,p_name=>'Vita - Slate'
,p_is_current=>false
,p_is_public=>true
,p_is_accessible=>false
,p_theme_roller_input_file_urls=>'#THEME_IMAGES#less/theme/Vita-Slate.less'
,p_theme_roller_output_file_url=>'#THEME_IMAGES#css/Vita-Slate#MIN#.css?v=#APEX_VERSION#'
,p_theme_roller_read_only=>true
,p_reference_id=>3291983347983194966
);
end;
/
prompt --application/shared_components/user_interface/theme_files
begin
null;
end;
/
prompt --application/shared_components/user_interface/theme_display_points
begin
null;
end;
/
prompt --application/shared_components/user_interface/template_opt_groups
begin
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472227592300945870)
,p_theme_id=>42
,p_name=>'PAGE_BACKGROUND'
,p_display_name=>'Page Background'
,p_display_sequence=>20
,p_template_types=>'PAGE'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472228305531945870)
,p_theme_id=>42
,p_name=>'PAGE_LAYOUT'
,p_display_name=>'Page Layout'
,p_display_sequence=>10
,p_template_types=>'PAGE'
,p_null_text=>'Floating (Default)'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472244479052945878)
,p_theme_id=>42
,p_name=>'ALERT_TITLE'
,p_display_name=>'Alert Title'
,p_display_sequence=>40
,p_template_types=>'REGION'
,p_help_text=>'Determines how the title of the alert is displayed.'
,p_null_text=>'Visible - Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472245063167945878)
,p_theme_id=>42
,p_name=>'ALERT_ICONS'
,p_display_name=>'Alert Icons'
,p_display_sequence=>2
,p_template_types=>'REGION'
,p_help_text=>'Sets how icons are handled for the Alert Region.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472245478514945878)
,p_theme_id=>42
,p_name=>'ALERT_TYPE'
,p_display_name=>'Alert Type'
,p_display_sequence=>3
,p_template_types=>'REGION'
,p_help_text=>'Sets the type of alert which can be used to determine the icon, icon color, and the background color.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472246018439945878)
,p_theme_id=>42
,p_name=>'ALERT_DISPLAY'
,p_display_name=>'Alert Display'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Sets the layout of the Alert Region.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472249407321945879)
,p_theme_id=>42
,p_name=>'BODY_HEIGHT'
,p_display_name=>'Body Height'
,p_display_sequence=>10
,p_template_types=>'REGION'
,p_help_text=>'Sets the Region Body height. You can also specify a custom height by modifying the Region''s CSS Classes and using the height helper classes "i-hXXX" where XXX is any increment of 10 from 100 to 800.'
,p_null_text=>'Auto - Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472250473229945881)
,p_theme_id=>42
,p_name=>'TIMER'
,p_display_name=>'Timer'
,p_display_sequence=>2
,p_template_types=>'REGION'
,p_help_text=>'Sets the timer for when to automatically navigate to the next region within the Carousel Region.'
,p_null_text=>'No Timer'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472251810496945881)
,p_theme_id=>42
,p_name=>'ACCENT'
,p_display_name=>'Accent'
,p_display_sequence=>30
,p_template_types=>'REGION'
,p_help_text=>'Set the Region''s accent. This accent corresponds to a Theme-Rollable color and sets the background of the Region''s Header.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472253069848945881)
,p_theme_id=>42
,p_name=>'ANIMATION'
,p_display_name=>'Animation'
,p_display_sequence=>10
,p_template_types=>'REGION'
,p_help_text=>'Sets the animation when navigating within the Carousel Region.'
,p_null_text=>'Fade'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472253636656945881)
,p_theme_id=>42
,p_name=>'BODY_OVERFLOW'
,p_display_name=>'Body Overflow'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Determines the scroll behavior when the region contents are larger than their container.'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472254078789945882)
,p_theme_id=>42
,p_name=>'HEADER'
,p_display_name=>'Header'
,p_display_sequence=>20
,p_template_types=>'REGION'
,p_help_text=>'Determines the display of the Region Header which also contains the Region Title.'
,p_null_text=>'Visible - Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472254452330945882)
,p_theme_id=>42
,p_name=>'STYLE'
,p_display_name=>'Style'
,p_display_sequence=>40
,p_template_types=>'REGION'
,p_help_text=>'Determines how the region is styled. Use the "Remove Borders" template option to remove the region''s borders and shadows.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472256997368945882)
,p_theme_id=>42
,p_name=>'DISPLAY_ICON'
,p_display_name=>'Display Icon'
,p_display_sequence=>50
,p_template_types=>'REGION'
,p_help_text=>'Display the Hero Region icon.'
,p_null_text=>'Yes (Default)'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472257336814945882)
,p_theme_id=>42
,p_name=>'ICON_SHAPE'
,p_display_name=>'Icon Shape'
,p_display_sequence=>60
,p_template_types=>'REGION'
,p_help_text=>'Determines the shape of the icon.'
,p_null_text=>'Rounded Corners'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472259145066945884)
,p_theme_id=>42
,p_name=>'BODY_PADDING'
,p_display_name=>'Body Padding'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Sets the Region Body padding for the region.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472261770533945884)
,p_theme_id=>42
,p_name=>'DEFAULT_STATE'
,p_display_name=>'Default State'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Sets the default state of the region.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472263590586945884)
,p_theme_id=>42
,p_name=>'COLLAPSIBLE_ICON_POSITION'
,p_display_name=>'Collapsible Icon Position'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Determines the position of the expand and collapse toggle for the region.'
,p_null_text=>'Start'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472264172600945884)
,p_theme_id=>42
,p_name=>'COLLAPSIBLE_BUTTON_ICONS'
,p_display_name=>'Collapsible Button Icons'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Determines which arrows to use to represent the icons for the collapse and expand button.'
,p_null_text=>'Arrows'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472265789869945885)
,p_theme_id=>42
,p_name=>'REGION_TITLE'
,p_display_name=>'Region Title'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_help_text=>'Sets the source of the Title Bar region''s title.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472266503626945885)
,p_theme_id=>42
,p_name=>'BODY_STYLE'
,p_display_name=>'Body Style'
,p_display_sequence=>20
,p_template_types=>'REGION'
,p_help_text=>'Controls the display of the region''s body container.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472268272352945885)
,p_theme_id=>42
,p_name=>'DIALOG_SIZE'
,p_display_name=>'Dialog Size'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472271795369945887)
,p_theme_id=>42
,p_name=>'CALLOUT_POSITION'
,p_display_name=>'Callout Position'
,p_display_sequence=>10
,p_template_types=>'REGION'
,p_help_text=>'Determines where the callout for the popup will be positioned relative to its parent.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472274222348945887)
,p_theme_id=>42
,p_name=>'LOGIN_HEADER'
,p_display_name=>'Login Header'
,p_display_sequence=>10
,p_template_types=>'REGION'
,p_help_text=>'Controls the display of the Login region header.'
,p_null_text=>'Icon and Title (Default)'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472282812250945890)
,p_theme_id=>42
,p_name=>'LAYOUT'
,p_display_name=>'Layout'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472283223463945890)
,p_theme_id=>42
,p_name=>'TABS_SIZE'
,p_display_name=>'Tabs Size'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472283602673945890)
,p_theme_id=>42
,p_name=>'TAB_STYLE'
,p_display_name=>'Tab Style'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472285974769945890)
,p_theme_id=>42
,p_name=>'HIDE_STEPS_FOR'
,p_display_name=>'Hide Steps For'
,p_display_sequence=>1
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472287121062945892)
,p_theme_id=>42
,p_name=>'STYLE'
,p_display_name=>'Style'
,p_display_sequence=>10
,p_template_types=>'REPORT'
,p_help_text=>'Determines the overall style for the component.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472287510004945892)
,p_theme_id=>42
,p_name=>'LAYOUT'
,p_display_name=>'Layout'
,p_display_sequence=>30
,p_template_types=>'REPORT'
,p_help_text=>'Determines the layout of Cards in the report.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472289346883945892)
,p_theme_id=>42
,p_name=>'BADGE_SIZE'
,p_display_name=>'Badge Size'
,p_display_sequence=>10
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472291715527945893)
,p_theme_id=>42
,p_name=>'ANIMATION'
,p_display_name=>'Animation'
,p_display_sequence=>70
,p_template_types=>'REPORT'
,p_help_text=>'Sets the hover and focus animation.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472292919866945893)
,p_theme_id=>42
,p_name=>'BODY_TEXT'
,p_display_name=>'Body Text'
,p_display_sequence=>40
,p_template_types=>'REPORT'
,p_help_text=>'Determines the height of the card body.'
,p_null_text=>'Auto'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472293773555945893)
,p_theme_id=>42
,p_name=>'ICONS'
,p_display_name=>'Icons'
,p_display_sequence=>20
,p_template_types=>'REPORT'
,p_help_text=>'Controls how to handle icons in the report.'
,p_null_text=>'No Icons'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472295372757945893)
,p_theme_id=>42
,p_name=>'ICON_SHAPE'
,p_display_name=>'Icon Shape'
,p_display_sequence=>60
,p_template_types=>'REPORT'
,p_help_text=>'Determines the shape of the icon.'
,p_null_text=>'Circle'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472296526602945895)
,p_theme_id=>42
,p_name=>'COMMENTS_STYLE'
,p_display_name=>'Comments Style'
,p_display_sequence=>10
,p_template_types=>'REPORT'
,p_help_text=>'Determines the style in which comments are displayed.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472297759933945895)
,p_theme_id=>42
,p_name=>'CONTENT_ALIGNMENT'
,p_display_name=>'Content Alignment'
,p_display_sequence=>90
,p_template_types=>'REPORT'
,p_null_text=>'Center (Default)'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472298134280945895)
,p_theme_id=>42
,p_name=>'COL_ACTIONS'
,p_display_name=>'Actions'
,p_display_sequence=>150
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472298510596945895)
,p_theme_id=>42
,p_name=>'COL_CONTENT_DESCRIPTION'
,p_display_name=>'Description'
,p_display_sequence=>130
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472298955608945895)
,p_theme_id=>42
,p_name=>'COL_ICON'
,p_display_name=>'Icon'
,p_display_sequence=>110
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472299367868945895)
,p_theme_id=>42
,p_name=>'COL_MISC'
,p_display_name=>'Misc'
,p_display_sequence=>140
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472299784176945895)
,p_theme_id=>42
,p_name=>'COL_SELECTION'
,p_display_name=>'Selection'
,p_display_sequence=>100
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472300159983945895)
,p_theme_id=>42
,p_name=>'COL_CONTENT_TITLE'
,p_display_name=>'Title'
,p_display_sequence=>120
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472302304880945896)
,p_theme_id=>42
,p_name=>'SIZE'
,p_display_name=>'Size'
,p_display_sequence=>35
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472304180390945896)
,p_theme_id=>42
,p_name=>'ALTERNATING_ROWS'
,p_display_name=>'Alternating Rows'
,p_display_sequence=>10
,p_template_types=>'REPORT'
,p_help_text=>'Shades alternate rows in the report with slightly different background colors.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472304565896945896)
,p_theme_id=>42
,p_name=>'REPORT_BORDER'
,p_display_name=>'Report Border'
,p_display_sequence=>30
,p_template_types=>'REPORT'
,p_help_text=>'Controls the display of the Report''s borders.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472305312099945896)
,p_theme_id=>42
,p_name=>'ROW_HIGHLIGHTING'
,p_display_name=>'Row Highlighting'
,p_display_sequence=>20
,p_template_types=>'REPORT'
,p_help_text=>'Determines whether you want the row to be highlighted on hover.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472307182767945898)
,p_theme_id=>42
,p_name=>'LABEL_WIDTH'
,p_display_name=>'Label Width'
,p_display_sequence=>10
,p_template_types=>'REPORT'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472310971667945901)
,p_theme_id=>42
,p_name=>'MOBILE'
,p_display_name=>'Mobile'
,p_display_sequence=>100
,p_template_types=>'LIST'
,p_help_text=>'Determines the display for a mobile-sized screen'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472311338511945901)
,p_theme_id=>42
,p_name=>'DESKTOP'
,p_display_name=>'Desktop'
,p_display_sequence=>90
,p_template_types=>'LIST'
,p_help_text=>'Determines the display for a desktop-sized screen'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472312966030945901)
,p_theme_id=>42
,p_name=>'LAYOUT'
,p_display_name=>'Layout'
,p_display_sequence=>30
,p_template_types=>'LIST'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472314758065945903)
,p_theme_id=>42
,p_name=>'LABEL_DISPLAY'
,p_display_name=>'Label Display'
,p_display_sequence=>50
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472316990677945903)
,p_theme_id=>42
,p_name=>'STYLE'
,p_display_name=>'Style'
,p_display_sequence=>10
,p_template_types=>'LIST'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472318944010945904)
,p_theme_id=>42
,p_name=>'BADGE_SIZE'
,p_display_name=>'Badge Size'
,p_display_sequence=>70
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472321755189945904)
,p_theme_id=>42
,p_name=>'ICON_SHAPE'
,p_display_name=>'Icon Shape'
,p_display_sequence=>60
,p_template_types=>'LIST'
,p_help_text=>'Determines the shape of the icon.'
,p_null_text=>'Circle'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472322326274945904)
,p_theme_id=>42
,p_name=>'SIZE'
,p_display_name=>'Size'
,p_display_sequence=>1
,p_template_types=>'LIST'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472323967773945906)
,p_theme_id=>42
,p_name=>'COLLAPSE_STYLE'
,p_display_name=>'Collapse Mode'
,p_display_sequence=>30
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472327337794945906)
,p_theme_id=>42
,p_name=>'ANIMATION'
,p_display_name=>'Animation'
,p_display_sequence=>80
,p_template_types=>'LIST'
,p_help_text=>'Sets the hover and focus animation.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472328552347945906)
,p_theme_id=>42
,p_name=>'BODY_TEXT'
,p_display_name=>'Body Text'
,p_display_sequence=>40
,p_template_types=>'LIST'
,p_help_text=>'Determines the height of the card body.'
,p_null_text=>'Auto'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472329381423945907)
,p_theme_id=>42
,p_name=>'ICONS'
,p_display_name=>'Icons'
,p_display_sequence=>20
,p_template_types=>'LIST'
,p_null_text=>'No Icons'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472335134138945909)
,p_theme_id=>42
,p_name=>'DISPLAY_ICONS'
,p_display_name=>'Display Icons'
,p_display_sequence=>30
,p_template_types=>'LIST'
,p_null_text=>'No Icons'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472336551809945910)
,p_theme_id=>42
,p_name=>'ICON_HOVER_ANIMATION'
,p_display_name=>'Icon Hover Animation'
,p_display_sequence=>55
,p_template_types=>'BUTTON'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472337722869945912)
,p_theme_id=>42
,p_name=>'ICON_POSITION'
,p_display_name=>'Icon Position'
,p_display_sequence=>50
,p_template_types=>'BUTTON'
,p_help_text=>'Sets the position of the icon relative to the label.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472340022878945923)
,p_theme_id=>42
,p_name=>'BOTTOM_MARGIN'
,p_display_name=>'Bottom Margin'
,p_display_sequence=>220
,p_template_types=>'FIELD'
,p_help_text=>'Set the bottom margin for this field.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472340482276945923)
,p_theme_id=>42
,p_name=>'REGION_BOTTOM_MARGIN'
,p_display_name=>'Bottom Margin'
,p_display_sequence=>210
,p_template_types=>'REGION'
,p_help_text=>'Set the bottom margin for this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472342013536945923)
,p_theme_id=>42
,p_name=>'LEFT_MARGIN'
,p_display_name=>'Left Margin'
,p_display_sequence=>220
,p_template_types=>'FIELD'
,p_help_text=>'Set the left margin for this field.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472342408183945923)
,p_theme_id=>42
,p_name=>'REGION_LEFT_MARGIN'
,p_display_name=>'Left Margin'
,p_display_sequence=>220
,p_template_types=>'REGION'
,p_help_text=>'Set the left margin for this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472344000516945925)
,p_theme_id=>42
,p_name=>'RIGHT_MARGIN'
,p_display_name=>'Right Margin'
,p_display_sequence=>230
,p_template_types=>'FIELD'
,p_help_text=>'Set the right margin for this field.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472344430967945925)
,p_theme_id=>42
,p_name=>'REGION_RIGHT_MARGIN'
,p_display_name=>'Right Margin'
,p_display_sequence=>230
,p_template_types=>'REGION'
,p_help_text=>'Set the right margin for this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472346087061945925)
,p_theme_id=>42
,p_name=>'TOP_MARGIN'
,p_display_name=>'Top Margin'
,p_display_sequence=>200
,p_template_types=>'FIELD'
,p_help_text=>'Set the top margin for this field.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472346470088945925)
,p_theme_id=>42
,p_name=>'REGION_TOP_MARGIN'
,p_display_name=>'Top Margin'
,p_display_sequence=>200
,p_template_types=>'REGION'
,p_help_text=>'Set the top margin for this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472348057377945925)
,p_theme_id=>42
,p_name=>'TYPE'
,p_display_name=>'Type'
,p_display_sequence=>20
,p_template_types=>'BUTTON'
,p_null_text=>'Normal'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472348446902945925)
,p_theme_id=>42
,p_name=>'SPACING_BOTTOM'
,p_display_name=>'Spacing Bottom'
,p_display_sequence=>100
,p_template_types=>'BUTTON'
,p_help_text=>'Controls the spacing to the bottom of the button.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472348837201945926)
,p_theme_id=>42
,p_name=>'SPACING_LEFT'
,p_display_name=>'Spacing Left'
,p_display_sequence=>70
,p_template_types=>'BUTTON'
,p_help_text=>'Controls the spacing to the left of the button.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472349273799945926)
,p_theme_id=>42
,p_name=>'SPACING_RIGHT'
,p_display_name=>'Spacing Right'
,p_display_sequence=>80
,p_template_types=>'BUTTON'
,p_help_text=>'Controls the spacing to the right of the button.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472349676016945926)
,p_theme_id=>42
,p_name=>'SPACING_TOP'
,p_display_name=>'Spacing Top'
,p_display_sequence=>90
,p_template_types=>'BUTTON'
,p_help_text=>'Controls the spacing to the top of the button.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472350048833945926)
,p_theme_id=>42
,p_name=>'SIZE'
,p_display_name=>'Size'
,p_display_sequence=>10
,p_template_types=>'BUTTON'
,p_help_text=>'Sets the size of the button.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472350441580945926)
,p_theme_id=>42
,p_name=>'STYLE'
,p_display_name=>'Style'
,p_display_sequence=>30
,p_template_types=>'BUTTON'
,p_help_text=>'Sets the style of the button. Use the "Simple" option for secondary actions or sets of buttons. Use the "Remove UI Decoration" option to make the button appear as text.'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472351820779945926)
,p_theme_id=>42
,p_name=>'BUTTON_SET'
,p_display_name=>'Button Set'
,p_display_sequence=>40
,p_template_types=>'BUTTON'
,p_help_text=>'Enables you to group many buttons together into a pill. You can use this option to specify where the button is within this set. Set the option to Default if this button is not part of a button set.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472353276575945926)
,p_theme_id=>42
,p_name=>'WIDTH'
,p_display_name=>'Width'
,p_display_sequence=>60
,p_template_types=>'BUTTON'
,p_help_text=>'Sets the width of the button.'
,p_null_text=>'Auto - Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472354219583945926)
,p_theme_id=>42
,p_name=>'LABEL_POSITION'
,p_display_name=>'Label Position'
,p_display_sequence=>140
,p_template_types=>'REGION'
,p_help_text=>'Sets the position of the label relative to the form item.'
,p_null_text=>'Inline - Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472354685981945926)
,p_theme_id=>42
,p_name=>'ITEM_SIZE'
,p_display_name=>'Item Size'
,p_display_sequence=>110
,p_template_types=>'REGION'
,p_help_text=>'Sets the size of the form items within this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472355097301945926)
,p_theme_id=>42
,p_name=>'LABEL_ALIGNMENT'
,p_display_name=>'Label Alignment'
,p_display_sequence=>130
,p_template_types=>'REGION'
,p_help_text=>'Set the label text alignment for items within this region.'
,p_null_text=>'Right'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472355482151945928)
,p_theme_id=>42
,p_name=>'ITEM_PADDING'
,p_display_name=>'Item Padding'
,p_display_sequence=>100
,p_template_types=>'REGION'
,p_help_text=>'Sets the padding around items within this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472356025366945928)
,p_theme_id=>42
,p_name=>'ITEM_WIDTH'
,p_display_name=>'Item Width'
,p_display_sequence=>120
,p_template_types=>'REGION'
,p_help_text=>'Sets the width of the form items within this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472356612636945928)
,p_theme_id=>42
,p_name=>'SIZE'
,p_display_name=>'Size'
,p_display_sequence=>10
,p_template_types=>'FIELD'
,p_null_text=>'Default'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472357095719945928)
,p_theme_id=>42
,p_name=>'ITEM_POST_TEXT'
,p_display_name=>'Item Post Text'
,p_display_sequence=>30
,p_template_types=>'FIELD'
,p_help_text=>'Adjust the display of the Item Post Text'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472357428376945928)
,p_theme_id=>42
,p_name=>'ITEM_PRE_TEXT'
,p_display_name=>'Item Pre Text'
,p_display_sequence=>20
,p_template_types=>'FIELD'
,p_help_text=>'Adjust the display of the Item Pre Text'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472357879436945928)
,p_theme_id=>42
,p_name=>'RADIO_GROUP_DISPLAY'
,p_display_name=>'Item Group Display'
,p_display_sequence=>300
,p_template_types=>'FIELD'
,p_help_text=>'Determines the display style for radio and check box items.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
wwv_flow_api.create_template_opt_group(
 p_id=>wwv_flow_api.id(472358634682945928)
,p_theme_id=>42
,p_name=>'PAGINATION_DISPLAY'
,p_display_name=>'Pagination Display'
,p_display_sequence=>10
,p_template_types=>'REPORT'
,p_help_text=>'Controls the display of pagination for this region.'
,p_null_text=>'Default'
,p_is_advanced=>'Y'
);
end;
/
prompt --application/shared_components/user_interface/template_options
begin
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472224702929945867)
,p_theme_id=>42
,p_name=>'STICKY_HEADER_ON_MOBILE'
,p_display_name=>'Sticky Header on Mobile'
,p_display_sequence=>100
,p_page_template_id=>wwv_flow_api.id(472221711174945859)
,p_css_classes=>'js-pageStickyMobileHeader'
,p_template_types=>'PAGE'
,p_help_text=>'This will position the contents of the Breadcrumb Bar region position so it sticks to the top of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472226008732945868)
,p_theme_id=>42
,p_name=>'REMOVE_BODY_PADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>20
,p_page_template_id=>wwv_flow_api.id(472224840776945867)
,p_css_classes=>'t-Dialog--noPadding'
,p_template_types=>'PAGE'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472226295924945868)
,p_theme_id=>42
,p_name=>'STRETCH_TO_FIT_WINDOW'
,p_display_name=>'Stretch to Fit Window'
,p_display_sequence=>1
,p_page_template_id=>wwv_flow_api.id(472224840776945867)
,p_css_classes=>'ui-dialog--stretch'
,p_template_types=>'PAGE'
,p_help_text=>'Stretch the dialog to fit the browser window.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472227782816945870)
,p_theme_id=>42
,p_name=>'PAGE_BACKGROUND_1'
,p_display_name=>'Background 1'
,p_display_sequence=>10
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_css_classes=>'t-LoginPage--bg1'
,p_group_id=>wwv_flow_api.id(472227592300945870)
,p_template_types=>'PAGE'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472227906834945870)
,p_theme_id=>42
,p_name=>'PAGE_BACKGROUND_2'
,p_display_name=>'Background 2'
,p_display_sequence=>20
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_css_classes=>'t-LoginPage--bg2'
,p_group_id=>wwv_flow_api.id(472227592300945870)
,p_template_types=>'PAGE'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472228181797945870)
,p_theme_id=>42
,p_name=>'PAGE_BACKGROUND_3'
,p_display_name=>'Background 3'
,p_display_sequence=>30
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_css_classes=>'t-LoginPage--bg3'
,p_group_id=>wwv_flow_api.id(472227592300945870)
,p_template_types=>'PAGE'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472228543837945870)
,p_theme_id=>42
,p_name=>'PAGE_LAYOUT_SPLIT'
,p_display_name=>'Split'
,p_display_sequence=>1
,p_page_template_id=>wwv_flow_api.id(472226368032945868)
,p_css_classes=>'t-LoginPage--split'
,p_group_id=>wwv_flow_api.id(472228305531945870)
,p_template_types=>'PAGE'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472229842114945870)
,p_theme_id=>42
,p_name=>'REMOVE_BODY_PADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>20
,p_page_template_id=>wwv_flow_api.id(472228635473945870)
,p_css_classes=>'t-Dialog--noPadding'
,p_template_types=>'PAGE'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472230028188945870)
,p_theme_id=>42
,p_name=>'STRETCH_TO_FIT_WINDOW'
,p_display_name=>'Stretch to Fit Window'
,p_display_sequence=>10
,p_page_template_id=>wwv_flow_api.id(472228635473945870)
,p_css_classes=>'ui-dialog--stretch'
,p_template_types=>'PAGE'
,p_help_text=>'Stretch the dialog to fit the browser window.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472232875201945871)
,p_theme_id=>42
,p_name=>'STICKY_HEADER_ON_MOBILE'
,p_display_name=>'Sticky Header on Mobile'
,p_display_sequence=>100
,p_page_template_id=>wwv_flow_api.id(472230165807945870)
,p_css_classes=>'js-pageStickyMobileHeader'
,p_template_types=>'PAGE'
,p_help_text=>'This will position the contents of the Breadcrumb Bar region position so it sticks to the top of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472235624037945871)
,p_theme_id=>42
,p_name=>'STICKY_HEADER_ON_MOBILE'
,p_display_name=>'Sticky Header on Mobile'
,p_display_sequence=>100
,p_page_template_id=>wwv_flow_api.id(472232951251945871)
,p_css_classes=>'js-pageStickyMobileHeader'
,p_template_types=>'PAGE'
,p_help_text=>'This will position the contents of the Breadcrumb Bar region position so it sticks to the top of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472238728349945873)
,p_theme_id=>42
,p_name=>'STICKY_HEADER_ON_MOBILE'
,p_display_name=>'Sticky Header on Mobile'
,p_display_sequence=>100
,p_page_template_id=>wwv_flow_api.id(472235794693945871)
,p_css_classes=>'js-pageStickyMobileHeader'
,p_template_types=>'PAGE'
,p_help_text=>'This will position the contents of the Breadcrumb Bar region position so it sticks to the top of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472241277331945873)
,p_theme_id=>42
,p_name=>'STICKY_HEADER_ON_MOBILE'
,p_display_name=>'Sticky Header on Mobile'
,p_display_sequence=>100
,p_page_template_id=>wwv_flow_api.id(472238803777945873)
,p_css_classes=>'js-pageStickyMobileHeader'
,p_template_types=>'PAGE'
,p_help_text=>'This will position the contents of the Breadcrumb Bar region position so it sticks to the top of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472243721742945875)
,p_theme_id=>42
,p_name=>'STICKY_HEADER_ON_MOBILE'
,p_display_name=>'Sticky Header on Mobile'
,p_display_sequence=>100
,p_page_template_id=>wwv_flow_api.id(472241329888945873)
,p_css_classes=>'js-pageStickyMobileHeader'
,p_template_types=>'PAGE'
,p_help_text=>'This will position the contents of the Breadcrumb Bar region position so it sticks to the top of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472244601725945878)
,p_theme_id=>42
,p_name=>'HIDDENHEADER'
,p_display_name=>'Hidden but Accessible'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--accessibleHeading'
,p_group_id=>wwv_flow_api.id(472244479052945878)
,p_template_types=>'REGION'
,p_help_text=>'Visually hides the alert title, but assistive technologies can still read it.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472244847132945878)
,p_theme_id=>42
,p_name=>'COLOREDBACKGROUND'
,p_display_name=>'Highlight Background'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--colorBG'
,p_template_types=>'REGION'
,p_help_text=>'Set alert background color to that of the alert type (warning, success, etc.)'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472245203697945878)
,p_theme_id=>42
,p_name=>'SHOW_CUSTOM_ICONS'
,p_display_name=>'Show Custom Icons'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--customIcons'
,p_group_id=>wwv_flow_api.id(472245063167945878)
,p_template_types=>'REGION'
,p_help_text=>'Set custom icons by modifying the Alert Region''s Icon CSS Classes property.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472245642314945878)
,p_theme_id=>42
,p_name=>'DANGER'
,p_display_name=>'Danger'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--danger'
,p_group_id=>wwv_flow_api.id(472245478514945878)
,p_template_types=>'REGION'
,p_help_text=>'Show an error or danger alert.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472245851229945878)
,p_theme_id=>42
,p_name=>'USEDEFAULTICONS'
,p_display_name=>'Show Default Icons'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--defaultIcons'
,p_group_id=>wwv_flow_api.id(472245063167945878)
,p_template_types=>'REGION'
,p_help_text=>'Uses default icons for alert types.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472246264877945878)
,p_theme_id=>42
,p_name=>'HORIZONTAL'
,p_display_name=>'Horizontal'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--horizontal'
,p_group_id=>wwv_flow_api.id(472246018439945878)
,p_template_types=>'REGION'
,p_help_text=>'Show horizontal alert with buttons to the right.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472246441895945878)
,p_theme_id=>42
,p_name=>'INFORMATION'
,p_display_name=>'Information'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--info'
,p_group_id=>wwv_flow_api.id(472245478514945878)
,p_template_types=>'REGION'
,p_help_text=>'Show informational alert.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472246664461945878)
,p_theme_id=>42
,p_name=>'HIDE_ICONS'
,p_display_name=>'Hide Icons'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--noIcon'
,p_group_id=>wwv_flow_api.id(472245063167945878)
,p_template_types=>'REGION'
,p_help_text=>'Hides alert icons'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472246832137945878)
,p_theme_id=>42
,p_name=>'HIDDENHEADERNOAT'
,p_display_name=>'Hidden'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--removeHeading'
,p_group_id=>wwv_flow_api.id(472244479052945878)
,p_template_types=>'REGION'
,p_help_text=>'Hides the Alert Title from being displayed.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472247055588945878)
,p_theme_id=>42
,p_name=>'SUCCESS'
,p_display_name=>'Success'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--success'
,p_group_id=>wwv_flow_api.id(472245478514945878)
,p_template_types=>'REGION'
,p_help_text=>'Show success alert.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472247278698945879)
,p_theme_id=>42
,p_name=>'WARNING'
,p_display_name=>'Warning'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--warning'
,p_group_id=>wwv_flow_api.id(472245478514945878)
,p_template_types=>'REGION'
,p_help_text=>'Show a warning alert.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472247496566945879)
,p_theme_id=>42
,p_name=>'WIZARD'
,p_display_name=>'Wizard'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472243814204945875)
,p_css_classes=>'t-Alert--wizard'
,p_group_id=>wwv_flow_api.id(472246018439945878)
,p_template_types=>'REGION'
,p_help_text=>'Show the alert in a wizard style region.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472249699530945879)
,p_theme_id=>42
,p_name=>'240PX'
,p_display_name=>'240px'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'i-h240'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets region body height to 240px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472249865541945881)
,p_theme_id=>42
,p_name=>'320PX'
,p_display_name=>'320px'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'i-h320'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets region body height to 320px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472250054283945881)
,p_theme_id=>42
,p_name=>'480PX'
,p_display_name=>'480px'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'i-h480'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472250215333945881)
,p_theme_id=>42
,p_name=>'640PX'
,p_display_name=>'640px'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'i-h640'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472250695206945881)
,p_theme_id=>42
,p_name=>'10_SECONDS'
,p_display_name=>'10 Seconds'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'js-cycle10s'
,p_group_id=>wwv_flow_api.id(472250473229945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472250823549945881)
,p_theme_id=>42
,p_name=>'15_SECONDS'
,p_display_name=>'15 Seconds'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'js-cycle15s'
,p_group_id=>wwv_flow_api.id(472250473229945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472251048890945881)
,p_theme_id=>42
,p_name=>'20_SECONDS'
,p_display_name=>'20 Seconds'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'js-cycle20s'
,p_group_id=>wwv_flow_api.id(472250473229945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472251227077945881)
,p_theme_id=>42
,p_name=>'5_SECONDS'
,p_display_name=>'5 Seconds'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'js-cycle5s'
,p_group_id=>wwv_flow_api.id(472250473229945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472251493910945881)
,p_theme_id=>42
,p_name=>'SHOW_MAXIMIZE_BUTTON'
,p_display_name=>'Show Maximize Button'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'js-showMaximizeButton'
,p_template_types=>'REGION'
,p_help_text=>'Displays a button in the Region Header to maximize the region. Clicking this button will toggle the maximize state and stretch the region to fill the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472251675110945881)
,p_theme_id=>42
,p_name=>'REMEMBER_CAROUSEL_SLIDE'
,p_display_name=>'Remember Carousel Slide'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'js-useLocalStorage'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472252069297945881)
,p_theme_id=>42
,p_name=>'ACCENT_1'
,p_display_name=>'Accent 1'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--accent1'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472252225119945881)
,p_theme_id=>42
,p_name=>'ACCENT_2'
,p_display_name=>'Accent 2'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--accent2'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472252467280945881)
,p_theme_id=>42
,p_name=>'ACCENT_3'
,p_display_name=>'Accent 3'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--accent3'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472252675629945881)
,p_theme_id=>42
,p_name=>'ACCENT_4'
,p_display_name=>'Accent 4'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--accent4'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472252892665945881)
,p_theme_id=>42
,p_name=>'ACCENT_5'
,p_display_name=>'Accent 5'
,p_display_sequence=>50
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--accent5'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472253289922945881)
,p_theme_id=>42
,p_name=>'SLIDE'
,p_display_name=>'Slide'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--carouselSlide'
,p_group_id=>wwv_flow_api.id(472253069848945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472253473764945881)
,p_theme_id=>42
,p_name=>'SPIN'
,p_display_name=>'Spin'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--carouselSpin'
,p_group_id=>wwv_flow_api.id(472253069848945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472253887575945881)
,p_theme_id=>42
,p_name=>'HIDEOVERFLOW'
,p_display_name=>'Hide'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--hiddenOverflow'
,p_group_id=>wwv_flow_api.id(472253636656945881)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472254287523945882)
,p_theme_id=>42
,p_name=>'HIDEREGIONHEADER'
,p_display_name=>'Hidden but accessible'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--hideHeader'
,p_group_id=>wwv_flow_api.id(472254078789945882)
,p_template_types=>'REGION'
,p_help_text=>'This option will hide the region header.  Note that the region title will still be audible for Screen Readers. Buttons placed in the region header will be hidden and inaccessible.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472254651266945882)
,p_theme_id=>42
,p_name=>'NOBORDER'
,p_display_name=>'Remove Borders'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--noBorder'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes borders from the region.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472254837360945882)
,p_theme_id=>42
,p_name=>'NOBODYPADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--noPadding'
,p_template_types=>'REGION'
,p_help_text=>'Removes padding from region body.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472255013331945882)
,p_theme_id=>42
,p_name=>'HIDDENHEADERNOAT'
,p_display_name=>'Hidden'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--removeHeader'
,p_group_id=>wwv_flow_api.id(472254078789945882)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472255243637945882)
,p_theme_id=>42
,p_name=>'SCROLLBODY'
,p_display_name=>'Scroll'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--scrollBody'
,p_group_id=>wwv_flow_api.id(472253636656945881)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472255430580945882)
,p_theme_id=>42
,p_name=>'SHOW_NEXT_AND_PREVIOUS_BUTTONS'
,p_display_name=>'Show Next and Previous Buttons'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--showCarouselControls'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472255631969945882)
,p_theme_id=>42
,p_name=>'SHOW_REGION_ICON'
,p_display_name=>'Show Region Icon'
,p_display_sequence=>50
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--showIcon'
,p_template_types=>'REGION'
,p_help_text=>'Displays the region icon in the region header beside the region title'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472255895755945882)
,p_theme_id=>42
,p_name=>'STACKED'
,p_display_name=>'Stack Region'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472248553235945879)
,p_css_classes=>'t-Region--stacked'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes side borders and shadows, and can be useful for accordions and regions that need to be grouped together vertically.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472256541744945882)
,p_theme_id=>42
,p_name=>'FEATURED'
,p_display_name=>'Featured'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472255984083945882)
,p_css_classes=>'t-HeroRegion--featured'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472256746239945882)
,p_theme_id=>42
,p_name=>'STACKED_FEATURED'
,p_display_name=>'Stacked Featured'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472255984083945882)
,p_css_classes=>'t-HeroRegion--featured t-HeroRegion--centered'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472257117562945882)
,p_theme_id=>42
,p_name=>'DISPLAY_ICON_NO'
,p_display_name=>'No'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472255984083945882)
,p_css_classes=>'t-HeroRegion--hideIcon'
,p_group_id=>wwv_flow_api.id(472256997368945882)
,p_template_types=>'REGION'
,p_help_text=>'Hide the Hero Region icon.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472257533213945882)
,p_theme_id=>42
,p_name=>'ICONS_CIRCULAR'
,p_display_name=>'Circle'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472255984083945882)
,p_css_classes=>'t-HeroRegion--iconsCircle'
,p_group_id=>wwv_flow_api.id(472257336814945882)
,p_template_types=>'REGION'
,p_help_text=>'The icons are displayed within a circle.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472257748642945882)
,p_theme_id=>42
,p_name=>'ICONS_SQUARE'
,p_display_name=>'Square'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472255984083945882)
,p_css_classes=>'t-HeroRegion--iconsSquare'
,p_group_id=>wwv_flow_api.id(472257336814945882)
,p_template_types=>'REGION'
,p_help_text=>'The icons are displayed within a square.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472257985175945882)
,p_theme_id=>42
,p_name=>'REMOVE_BODY_PADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472255984083945882)
,p_css_classes=>'t-HeroRegion--noPadding'
,p_template_types=>'REGION'
,p_help_text=>'Removes the padding around the hero region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472258929371945884)
,p_theme_id=>42
,p_name=>'BORDERLESS'
,p_display_name=>'Borderless'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472258029597945882)
,p_css_classes=>'t-ButtonRegion--noBorder'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472259394759945884)
,p_theme_id=>42
,p_name=>'NOPADDING'
,p_display_name=>'No Padding'
,p_display_sequence=>3
,p_region_template_id=>wwv_flow_api.id(472258029597945882)
,p_css_classes=>'t-ButtonRegion--noPadding'
,p_group_id=>wwv_flow_api.id(472259145066945884)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472259557255945884)
,p_theme_id=>42
,p_name=>'REMOVEUIDECORATION'
,p_display_name=>'Remove UI Decoration'
,p_display_sequence=>4
,p_region_template_id=>wwv_flow_api.id(472258029597945882)
,p_css_classes=>'t-ButtonRegion--noUI'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472259732820945884)
,p_theme_id=>42
,p_name=>'SLIMPADDING'
,p_display_name=>'Slim Padding'
,p_display_sequence=>5
,p_region_template_id=>wwv_flow_api.id(472258029597945882)
,p_css_classes=>'t-ButtonRegion--slimPadding'
,p_group_id=>wwv_flow_api.id(472259145066945884)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472259923153945884)
,p_theme_id=>42
,p_name=>'STICK_TO_BOTTOM'
,p_display_name=>'Stick to Bottom for Mobile'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472258029597945882)
,p_css_classes=>'t-ButtonRegion--stickToBottom'
,p_template_types=>'REGION'
,p_help_text=>'This will position the button container region to the bottom of the screen for small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472260918666945884)
,p_theme_id=>42
,p_name=>'240PX'
,p_display_name=>'240px'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'i-h240'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets region body height to 240px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472261128360945884)
,p_theme_id=>42
,p_name=>'320PX'
,p_display_name=>'320px'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'i-h320'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets region body height to 320px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472261322552945884)
,p_theme_id=>42
,p_name=>'480PX'
,p_display_name=>'480px'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'i-h480'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets body height to 480px.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472261525329945884)
,p_theme_id=>42
,p_name=>'640PX'
,p_display_name=>'640px'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'i-h640'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets body height to 640px.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472261977014945884)
,p_theme_id=>42
,p_name=>'COLLAPSED'
,p_display_name=>'Collapsed'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'is-collapsed'
,p_group_id=>wwv_flow_api.id(472261770533945884)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472262127249945884)
,p_theme_id=>42
,p_name=>'EXPANDED'
,p_display_name=>'Expanded'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'is-expanded'
,p_group_id=>wwv_flow_api.id(472261770533945884)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472262345445945884)
,p_theme_id=>42
,p_name=>'REMEMBER_COLLAPSIBLE_STATE'
,p_display_name=>'Remember Collapsible State'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'js-useLocalStorage'
,p_template_types=>'REGION'
,p_help_text=>'This option saves the current state of the collapsible region for the duration of the session.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472262596519945884)
,p_theme_id=>42
,p_name=>'ACCENT_1'
,p_display_name=>'Accent 1'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--accent1'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472262714810945884)
,p_theme_id=>42
,p_name=>'ACCENT_2'
,p_display_name=>'Accent 2'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--accent2'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472262991701945884)
,p_theme_id=>42
,p_name=>'ACCENT_3'
,p_display_name=>'Accent 3'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--accent3'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472263184945945884)
,p_theme_id=>42
,p_name=>'ACCENT_4'
,p_display_name=>'Accent 4'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--accent4'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472263300094945884)
,p_theme_id=>42
,p_name=>'ACCENT_5'
,p_display_name=>'Accent 5'
,p_display_sequence=>50
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--accent5'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472263798055945884)
,p_theme_id=>42
,p_name=>'CONRTOLS_POSITION_END'
,p_display_name=>'End'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--controlsPosEnd'
,p_group_id=>wwv_flow_api.id(472263590586945884)
,p_template_types=>'REGION'
,p_help_text=>'Position the expand / collapse button to the end of the region header.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472263994010945884)
,p_theme_id=>42
,p_name=>'HIDEOVERFLOW'
,p_display_name=>'Hide'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--hiddenOverflow'
,p_group_id=>wwv_flow_api.id(472253636656945881)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472264312438945884)
,p_theme_id=>42
,p_name=>'ICONS_PLUS_OR_MINUS'
,p_display_name=>'Plus or Minus'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--hideShowIconsMath'
,p_group_id=>wwv_flow_api.id(472264172600945884)
,p_template_types=>'REGION'
,p_help_text=>'Use the plus and minus icons for the expand and collapse button.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472264503219945884)
,p_theme_id=>42
,p_name=>'NOBORDER'
,p_display_name=>'Remove Borders'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--noBorder'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes borders from the region.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472264783250945884)
,p_theme_id=>42
,p_name=>'NOBODYPADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--noPadding'
,p_template_types=>'REGION'
,p_help_text=>'Removes padding from region body.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472264937819945884)
,p_theme_id=>42
,p_name=>'REMOVE_UI_DECORATION'
,p_display_name=>'Remove UI Decoration'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--noUI'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes UI decoration (borders, backgrounds, shadows, etc) from the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472265143271945884)
,p_theme_id=>42
,p_name=>'SCROLLBODY'
,p_display_name=>'Scroll - Default'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--scrollBody'
,p_group_id=>wwv_flow_api.id(472253636656945881)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
end;
/
begin
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472265355361945884)
,p_theme_id=>42
,p_name=>'STACKED'
,p_display_name=>'Stack Region'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472260001306945884)
,p_css_classes=>'t-Region--stacked'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes side borders and shadows, and can be useful for accordions and regions that need to be grouped together vertically.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472265955653945885)
,p_theme_id=>42
,p_name=>'CONTENT_TITLE_H1'
,p_display_name=>'Heading Level 1'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--h1'
,p_group_id=>wwv_flow_api.id(472265789869945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472266148931945885)
,p_theme_id=>42
,p_name=>'CONTENT_TITLE_H2'
,p_display_name=>'Heading Level 2'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--h2'
,p_group_id=>wwv_flow_api.id(472265789869945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472266348175945885)
,p_theme_id=>42
,p_name=>'CONTENT_TITLE_H3'
,p_display_name=>'Heading Level 3'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--h3'
,p_group_id=>wwv_flow_api.id(472265789869945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472266750294945885)
,p_theme_id=>42
,p_name=>'LIGHT_BACKGROUND'
,p_display_name=>'Light Background'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--lightBG'
,p_group_id=>wwv_flow_api.id(472266503626945885)
,p_template_types=>'REGION'
,p_help_text=>'Gives the region body a slightly lighter background.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472266921470945885)
,p_theme_id=>42
,p_name=>'ADD_BODY_PADDING'
,p_display_name=>'Add Body Padding'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--padded'
,p_template_types=>'REGION'
,p_help_text=>'Adds padding to the region''s body container.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472267148904945885)
,p_theme_id=>42
,p_name=>'SHADOW_BACKGROUND'
,p_display_name=>'Shadow Background'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--shadowBG'
,p_group_id=>wwv_flow_api.id(472266503626945885)
,p_template_types=>'REGION'
,p_help_text=>'Gives the region body a slightly darker background.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472267391297945885)
,p_theme_id=>42
,p_name=>'SHOW_REGION_ICON'
,p_display_name=>'Show Region Icon'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472265441625945884)
,p_css_classes=>'t-ContentBlock--showIcon'
,p_template_types=>'REGION'
,p_help_text=>'Displays the region icon in the region header beside the region title'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472268070939945885)
,p_theme_id=>42
,p_name=>'AUTO_HEIGHT_INLINE_DIALOG'
,p_display_name=>'Auto Height'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-dialog-autoheight'
,p_template_types=>'REGION'
,p_help_text=>'This option will set the height of the dialog to fit its contents.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472268482142945885)
,p_theme_id=>42
,p_name=>'SMALL_480X320'
,p_display_name=>'Small (480x320)'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-dialog-size480x320'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472268655331945885)
,p_theme_id=>42
,p_name=>'MEDIUM_600X400'
,p_display_name=>'Medium (600x400)'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-dialog-size600x400'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472268891793945885)
,p_theme_id=>42
,p_name=>'LARGE_720X480'
,p_display_name=>'Large (720x480)'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-dialog-size720x480'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472269086684945885)
,p_theme_id=>42
,p_name=>'DRAGGABLE'
,p_display_name=>'Draggable'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-draggable'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472269279281945885)
,p_theme_id=>42
,p_name=>'MODAL'
,p_display_name=>'Modal'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-modal'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472269457379945885)
,p_theme_id=>42
,p_name=>'RESIZABLE'
,p_display_name=>'Resizable'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'js-resizable'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472269632443945885)
,p_theme_id=>42
,p_name=>'REMOVE_BODY_PADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>5
,p_region_template_id=>wwv_flow_api.id(472267403332945885)
,p_css_classes=>'t-DialogRegion--noPadding'
,p_template_types=>'REGION'
,p_help_text=>'Removes the padding around the region body.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472270336231945885)
,p_theme_id=>42
,p_name=>'AUTO_HEIGHT_INLINE_DIALOG'
,p_display_name=>'Auto Height'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-dialog-autoheight'
,p_template_types=>'REGION'
,p_help_text=>'This option will set the height of the dialog to fit its contents.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472270500336945885)
,p_theme_id=>42
,p_name=>'NONE'
,p_display_name=>'None'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-dialog-nosize'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472270737932945885)
,p_theme_id=>42
,p_name=>'SMALL_480X320'
,p_display_name=>'Small (480x320)'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-dialog-size480x320'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472270922655945885)
,p_theme_id=>42
,p_name=>'MEDIUM_600X400'
,p_display_name=>'Medium (600x400)'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-dialog-size600x400'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472271173403945887)
,p_theme_id=>42
,p_name=>'LARGE_720X480'
,p_display_name=>'Large (720x480)'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-dialog-size720x480'
,p_group_id=>wwv_flow_api.id(472268272352945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472271383122945887)
,p_theme_id=>42
,p_name=>'DISPLAY_POPUP_CALLOUT'
,p_display_name=>'Display Popup Callout'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-callout'
,p_template_types=>'REGION'
,p_help_text=>'Use this option to add display a callout for the popup. Note that callout will only be displayed if the data-parent-element custom attribute is defined.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472271550915945887)
,p_theme_id=>42
,p_name=>'REMOVE_PAGE_OVERLAY'
,p_display_name=>'Remove Page Overlay'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-noOverlay'
,p_template_types=>'REGION'
,p_help_text=>'This option will display the inline dialog without an overlay on the background.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472271943596945887)
,p_theme_id=>42
,p_name=>'ABOVE'
,p_display_name=>'Above'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-pos-above'
,p_group_id=>wwv_flow_api.id(472271795369945887)
,p_template_types=>'REGION'
,p_help_text=>'Positions the callout above or typically on top of the parent.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472272187425945887)
,p_theme_id=>42
,p_name=>'AFTER'
,p_display_name=>'After'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-pos-after'
,p_group_id=>wwv_flow_api.id(472271795369945887)
,p_template_types=>'REGION'
,p_help_text=>'Positions the callout after or typically to the right of the parent.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472272337132945887)
,p_theme_id=>42
,p_name=>'BEFORE'
,p_display_name=>'Before'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-pos-before'
,p_group_id=>wwv_flow_api.id(472271795369945887)
,p_template_types=>'REGION'
,p_help_text=>'Positions the callout before or typically to the left of the parent.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472272579349945887)
,p_theme_id=>42
,p_name=>'BELOW'
,p_display_name=>'Below'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-pos-below'
,p_group_id=>wwv_flow_api.id(472271795369945887)
,p_template_types=>'REGION'
,p_help_text=>'Positions the callout below or typically to the bottom of the parent.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472272704772945887)
,p_theme_id=>42
,p_name=>'INSIDE'
,p_display_name=>'Inside'
,p_display_sequence=>50
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'js-popup-pos-inside'
,p_group_id=>wwv_flow_api.id(472271795369945887)
,p_template_types=>'REGION'
,p_help_text=>'Positions the callout inside of the parent. This is useful when the parent is sufficiently large, such as a report or large region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472272999882945887)
,p_theme_id=>42
,p_name=>'REMOVE_BODY_PADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472269781989945885)
,p_css_classes=>'t-DialogRegion--noPadding'
,p_template_types=>'REGION'
,p_help_text=>'Removes the padding around the region body.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472273306717945887)
,p_theme_id=>42
,p_name=>'SHOW_MAXIMIZE_BUTTON'
,p_display_name=>'Show Maximize Button'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472273039041945887)
,p_css_classes=>'js-showMaximizeButton'
,p_template_types=>'REGION'
,p_help_text=>'Displays a button in the Interactive Reports toolbar to maximize the report. Clicking this button will toggle the maximize state and stretch the report to fill the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472273543439945887)
,p_theme_id=>42
,p_name=>'REMOVEBORDERS'
,p_display_name=>'Remove Borders'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472273039041945887)
,p_css_classes=>'t-IRR-region--noBorders'
,p_template_types=>'REGION'
,p_help_text=>'Removes borders around the Interactive Report'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472274439762945887)
,p_theme_id=>42
,p_name=>'LOGO_HEADER_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472273677779945887)
,p_css_classes=>'t-Login-region--headerHidden'
,p_group_id=>wwv_flow_api.id(472274222348945887)
,p_template_types=>'REGION'
,p_help_text=>'Hides both the Region Icon and Title from the Login region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472274652512945887)
,p_theme_id=>42
,p_name=>'LOGIN_HEADER_ICON'
,p_display_name=>'Icon'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472273677779945887)
,p_css_classes=>'t-Login-region--headerIcon'
,p_group_id=>wwv_flow_api.id(472274222348945887)
,p_template_types=>'REGION'
,p_help_text=>'Displays only the Region Icon in the Login region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472274864521945887)
,p_theme_id=>42
,p_name=>'LOGIN_HEADER_TITLE'
,p_display_name=>'Title'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472273677779945887)
,p_css_classes=>'t-Login-region--headerTitle'
,p_group_id=>wwv_flow_api.id(472274222348945887)
,p_template_types=>'REGION'
,p_help_text=>'Displays only the Region Title in the Login region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472275895852945887)
,p_theme_id=>42
,p_name=>'240PX'
,p_display_name=>'240px'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'i-h240'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets region body height to 240px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472276016970945887)
,p_theme_id=>42
,p_name=>'320PX'
,p_display_name=>'320px'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'i-h320'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
,p_help_text=>'Sets region body height to 320px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472276247368945887)
,p_theme_id=>42
,p_name=>'480PX'
,p_display_name=>'480px'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'i-h480'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472276432623945887)
,p_theme_id=>42
,p_name=>'640PX'
,p_display_name=>'640px'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'i-h640'
,p_group_id=>wwv_flow_api.id(472249407321945879)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472276677530945889)
,p_theme_id=>42
,p_name=>'SHOW_MAXIMIZE_BUTTON'
,p_display_name=>'Show Maximize Button'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'js-showMaximizeButton'
,p_template_types=>'REGION'
,p_help_text=>'Displays a button in the Region Header to maximize the region. Clicking this button will toggle the maximize state and stretch the region to fill the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472276844682945889)
,p_theme_id=>42
,p_name=>'ACCENT_1'
,p_display_name=>'Accent 1'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent1'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472277040745945889)
,p_theme_id=>42
,p_name=>'ACCENT_10'
,p_display_name=>'Accent 10'
,p_display_sequence=>100
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent10'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472277211307945889)
,p_theme_id=>42
,p_name=>'ACCENT_11'
,p_display_name=>'Accent 11'
,p_display_sequence=>110
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent11'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472277450347945889)
,p_theme_id=>42
,p_name=>'ACCENT_12'
,p_display_name=>'Accent 12'
,p_display_sequence=>120
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent12'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472277603709945889)
,p_theme_id=>42
,p_name=>'ACCENT_13'
,p_display_name=>'Accent 13'
,p_display_sequence=>130
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent13'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472277897692945889)
,p_theme_id=>42
,p_name=>'ACCENT_14'
,p_display_name=>'Accent 14'
,p_display_sequence=>140
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent14'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472278050202945889)
,p_theme_id=>42
,p_name=>'ACCENT_15'
,p_display_name=>'Accent 15'
,p_display_sequence=>150
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent15'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472278294653945889)
,p_theme_id=>42
,p_name=>'ACCENT_2'
,p_display_name=>'Accent 2'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent2'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472278409478945889)
,p_theme_id=>42
,p_name=>'ACCENT_3'
,p_display_name=>'Accent 3'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent3'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472278613880945889)
,p_theme_id=>42
,p_name=>'ACCENT_4'
,p_display_name=>'Accent 4'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent4'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472278803768945889)
,p_theme_id=>42
,p_name=>'ACCENT_5'
,p_display_name=>'Accent 5'
,p_display_sequence=>50
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent5'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472279020830945889)
,p_theme_id=>42
,p_name=>'ACCENT_6'
,p_display_name=>'Accent 6'
,p_display_sequence=>60
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent6'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472279297300945889)
,p_theme_id=>42
,p_name=>'ACCENT_7'
,p_display_name=>'Accent 7'
,p_display_sequence=>70
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent7'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472279484888945889)
,p_theme_id=>42
,p_name=>'ACCENT_8'
,p_display_name=>'Accent 8'
,p_display_sequence=>80
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent8'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472279675925945889)
,p_theme_id=>42
,p_name=>'ACCENT_9'
,p_display_name=>'Accent 9'
,p_display_sequence=>90
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--accent9'
,p_group_id=>wwv_flow_api.id(472251810496945881)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472279845547945889)
,p_theme_id=>42
,p_name=>'HIDEOVERFLOW'
,p_display_name=>'Hide'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--hiddenOverflow'
,p_group_id=>wwv_flow_api.id(472253636656945881)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472280075083945889)
,p_theme_id=>42
,p_name=>'HIDEREGIONHEADER'
,p_display_name=>'Hidden but accessible'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--hideHeader'
,p_group_id=>wwv_flow_api.id(472254078789945882)
,p_template_types=>'REGION'
,p_help_text=>'This option will hide the region header.  Note that the region title will still be audible for Screen Readers. Buttons placed in the region header will be hidden and inaccessible.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472280231510945889)
,p_theme_id=>42
,p_name=>'NOBORDER'
,p_display_name=>'Remove Borders'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--noBorder'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes borders from the region.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472280414142945889)
,p_theme_id=>42
,p_name=>'NOBODYPADDING'
,p_display_name=>'Remove Body Padding'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--noPadding'
,p_template_types=>'REGION'
,p_help_text=>'Removes padding from region body.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472280686167945889)
,p_theme_id=>42
,p_name=>'REMOVE_UI_DECORATION'
,p_display_name=>'Remove UI Decoration'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--noUI'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes UI decoration (borders, backgrounds, shadows, etc) from the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472280834947945889)
,p_theme_id=>42
,p_name=>'HIDDENHEADERNOAT'
,p_display_name=>'Hidden'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--removeHeader'
,p_group_id=>wwv_flow_api.id(472254078789945882)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472281017892945889)
,p_theme_id=>42
,p_name=>'SCROLLBODY'
,p_display_name=>'Scroll - Default'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--scrollBody'
,p_group_id=>wwv_flow_api.id(472253636656945881)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472281202325945889)
,p_theme_id=>42
,p_name=>'SHOW_REGION_ICON'
,p_display_name=>'Show Region Icon'
,p_display_sequence=>30
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--showIcon'
,p_template_types=>'REGION'
,p_help_text=>'Displays the region icon in the region header beside the region title'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472281466894945889)
,p_theme_id=>42
,p_name=>'STACKED'
,p_display_name=>'Stack Region'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--stacked'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Removes side borders and shadows, and can be useful for accordions and regions that need to be grouped together vertically.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472281654977945889)
,p_theme_id=>42
,p_name=>'TEXT_CONTENT'
,p_display_name=>'Text Content'
,p_display_sequence=>40
,p_region_template_id=>wwv_flow_api.id(472274973856945887)
,p_css_classes=>'t-Region--textContent'
,p_group_id=>wwv_flow_api.id(472254452330945882)
,p_template_types=>'REGION'
,p_help_text=>'Useful for displaying primarily text-based content, such as FAQs and more.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472282617010945890)
,p_theme_id=>42
,p_name=>'REMEMBER_ACTIVE_TAB'
,p_display_name=>'Remember Active Tab'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472281708023945889)
,p_css_classes=>'js-useLocalStorage'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472283070053945890)
,p_theme_id=>42
,p_name=>'FILL_TAB_LABELS'
,p_display_name=>'Fill Tab Labels'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472281708023945889)
,p_css_classes=>'t-TabsRegion-mod--fillLabels'
,p_group_id=>wwv_flow_api.id(472282812250945890)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472283484172945890)
,p_theme_id=>42
,p_name=>'TABSLARGE'
,p_display_name=>'Large'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472281708023945889)
,p_css_classes=>'t-TabsRegion-mod--large'
,p_group_id=>wwv_flow_api.id(472283223463945890)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472283893593945890)
,p_theme_id=>42
,p_name=>'PILL'
,p_display_name=>'Pill'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472281708023945889)
,p_css_classes=>'t-TabsRegion-mod--pill'
,p_group_id=>wwv_flow_api.id(472283602673945890)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472284058084945890)
,p_theme_id=>42
,p_name=>'SIMPLE'
,p_display_name=>'Simple'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472281708023945889)
,p_css_classes=>'t-TabsRegion-mod--simple'
,p_group_id=>wwv_flow_api.id(472283602673945890)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472284237039945890)
,p_theme_id=>42
,p_name=>'TABS_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472281708023945889)
,p_css_classes=>'t-TabsRegion-mod--small'
,p_group_id=>wwv_flow_api.id(472283223463945890)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472284687768945890)
,p_theme_id=>42
,p_name=>'USE_COMPACT_STYLE'
,p_display_name=>'Use Compact Style'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472284353970945890)
,p_css_classes=>'t-BreadcrumbRegion--compactTitle'
,p_template_types=>'REGION'
,p_help_text=>'Uses a compact style for the breadcrumbs.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472284807535945890)
,p_theme_id=>42
,p_name=>'HIDE_BREADCRUMB'
,p_display_name=>'Show Breadcrumbs'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472284353970945890)
,p_css_classes=>'t-BreadcrumbRegion--showBreadcrumb'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472285068272945890)
,p_theme_id=>42
,p_name=>'GET_TITLE_FROM_BREADCRUMB'
,p_display_name=>'Use Current Breadcrumb Entry'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472284353970945890)
,p_css_classes=>'t-BreadcrumbRegion--useBreadcrumbTitle'
,p_group_id=>wwv_flow_api.id(472265789869945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472285267886945890)
,p_theme_id=>42
,p_name=>'REGION_HEADER_VISIBLE'
,p_display_name=>'Use Region Title'
,p_display_sequence=>1
,p_region_template_id=>wwv_flow_api.id(472284353970945890)
,p_css_classes=>'t-BreadcrumbRegion--useRegionTitle'
,p_group_id=>wwv_flow_api.id(472265789869945885)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472286128299945890)
,p_theme_id=>42
,p_name=>'HIDESMALLSCREENS'
,p_display_name=>'Small Screens (Tablet)'
,p_display_sequence=>20
,p_region_template_id=>wwv_flow_api.id(472285322780945890)
,p_css_classes=>'t-Wizard--hideStepsSmall'
,p_group_id=>wwv_flow_api.id(472285974769945890)
,p_template_types=>'REGION'
,p_help_text=>'Hides the wizard progress steps for screens that are smaller than 768px wide.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472286358385945890)
,p_theme_id=>42
,p_name=>'HIDEXSMALLSCREENS'
,p_display_name=>'X Small Screens (Mobile)'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472285322780945890)
,p_css_classes=>'t-Wizard--hideStepsXSmall'
,p_group_id=>wwv_flow_api.id(472285974769945890)
,p_template_types=>'REGION'
,p_help_text=>'Hides the wizard progress steps for screens that are smaller than 768px wide.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472286525363945890)
,p_theme_id=>42
,p_name=>'SHOW_TITLE'
,p_display_name=>'Show Title'
,p_display_sequence=>10
,p_region_template_id=>wwv_flow_api.id(472285322780945890)
,p_css_classes=>'t-Wizard--showTitle'
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472287351284945892)
,p_theme_id=>42
,p_name=>'CIRCULAR'
,p_display_name=>'Circular'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--circular'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472287785122945892)
,p_theme_id=>42
,p_name=>'2COLUMNGRID'
,p_display_name=>'2 Column Grid'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_help_text=>'Arrange badges in a two column grid'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472287935814945892)
,p_theme_id=>42
,p_name=>'3COLUMNGRID'
,p_display_name=>'3 Column Grid'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--cols t-BadgeList--3cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_help_text=>'Arrange badges in a 3 column grid'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472288162354945892)
,p_theme_id=>42
,p_name=>'4COLUMNGRID'
,p_display_name=>'4 Column Grid'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--cols t-BadgeList--4cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472288327356945892)
,p_theme_id=>42
,p_name=>'5COLUMNGRID'
,p_display_name=>'5 Column Grid'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--cols t-BadgeList--5cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472288533600945892)
,p_theme_id=>42
,p_name=>'GRID'
,p_display_name=>'Grid'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--dash'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
);
end;
/
begin
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472288758266945892)
,p_theme_id=>42
,p_name=>'FIXED'
,p_display_name=>'Span Horizontally'
,p_display_sequence=>60
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--fixed'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472288925323945892)
,p_theme_id=>42
,p_name=>'FLEXIBLEBOX'
,p_display_name=>'Flexible Box'
,p_display_sequence=>80
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--flex'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472289152811945892)
,p_theme_id=>42
,p_name=>'FLOATITEMS'
,p_display_name=>'Float Items'
,p_display_sequence=>70
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--float'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472289564727945892)
,p_theme_id=>42
,p_name=>'64PX'
,p_display_name=>'64px'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--large'
,p_group_id=>wwv_flow_api.id(472289346883945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472289738440945892)
,p_theme_id=>42
,p_name=>'48PX'
,p_display_name=>'48px'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--medium'
,p_group_id=>wwv_flow_api.id(472289346883945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472289996297945892)
,p_theme_id=>42
,p_name=>'32PX'
,p_display_name=>'32px'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--small'
,p_group_id=>wwv_flow_api.id(472289346883945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472290130650945892)
,p_theme_id=>42
,p_name=>'STACKED'
,p_display_name=>'Stacked'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--stacked'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472290373593945893)
,p_theme_id=>42
,p_name=>'96PX'
,p_display_name=>'96px'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--xlarge'
,p_group_id=>wwv_flow_api.id(472289346883945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472290519510945893)
,p_theme_id=>42
,p_name=>'128PX'
,p_display_name=>'128px'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'t-BadgeList--xxlarge'
,p_group_id=>wwv_flow_api.id(472289346883945892)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472290726043945893)
,p_theme_id=>42
,p_name=>'APPLY_THEME_COLORS'
,p_display_name=>'Apply Theme Colors'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472286824492945892)
,p_css_classes=>'u-colors'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472291108245945893)
,p_theme_id=>42
,p_name=>'3_COLUMNS'
,p_display_name=>'3 Columns'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--3cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472291352099945893)
,p_theme_id=>42
,p_name=>'4_COLUMNS'
,p_display_name=>'4 Columns'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--4cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472291580052945893)
,p_theme_id=>42
,p_name=>'5_COLUMNS'
,p_display_name=>'5 Columns'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--5cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472291961370945893)
,p_theme_id=>42
,p_name=>'CARDS_COLOR_FILL'
,p_display_name=>'Color Fill'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--animColorFill'
,p_group_id=>wwv_flow_api.id(472291715527945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472292144900945893)
,p_theme_id=>42
,p_name=>'CARD_RAISE_CARD'
,p_display_name=>'Raise Card'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--animRaiseCard'
,p_group_id=>wwv_flow_api.id(472291715527945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472292355932945893)
,p_theme_id=>42
,p_name=>'BASIC'
,p_display_name=>'Basic'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--basic'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472292508061945893)
,p_theme_id=>42
,p_name=>'2_COLUMNS'
,p_display_name=>'2 Columns'
,p_display_sequence=>15
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472292764956945893)
,p_theme_id=>42
,p_name=>'COMPACT'
,p_display_name=>'Compact'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--compact'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
,p_help_text=>'Use this option when you want to show smaller cards.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472293144928945893)
,p_theme_id=>42
,p_name=>'2_LINES'
,p_display_name=>'2 Lines'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--desc-2ln'
,p_group_id=>wwv_flow_api.id(472292919866945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472293312073945893)
,p_theme_id=>42
,p_name=>'3_LINES'
,p_display_name=>'3 Lines'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--desc-3ln'
,p_group_id=>wwv_flow_api.id(472292919866945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472293577257945893)
,p_theme_id=>42
,p_name=>'4_LINES'
,p_display_name=>'4 Lines'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--desc-4ln'
,p_group_id=>wwv_flow_api.id(472292919866945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472293962971945893)
,p_theme_id=>42
,p_name=>'DISPLAY_ICONS'
,p_display_name=>'Display Icons'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--displayIcons'
,p_group_id=>wwv_flow_api.id(472293773555945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472294198726945893)
,p_theme_id=>42
,p_name=>'DISPLAY_INITIALS'
,p_display_name=>'Display Initials'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--displayInitials'
,p_group_id=>wwv_flow_api.id(472293773555945893)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472294390405945893)
,p_theme_id=>42
,p_name=>'DISPLAY_SUBTITLE'
,p_display_name=>'Display Subtitle'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--displaySubtitle'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472294521179945893)
,p_theme_id=>42
,p_name=>'FEATURED'
,p_display_name=>'Featured'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--featured force-fa-lg'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472294782273945893)
,p_theme_id=>42
,p_name=>'BLOCK'
,p_display_name=>'Block'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--featured t-Cards--block force-fa-lg'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472294920389945893)
,p_theme_id=>42
,p_name=>'FLOAT'
,p_display_name=>'Float'
,p_display_sequence=>60
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--float'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472295185948945893)
,p_theme_id=>42
,p_name=>'HIDDEN_BODY_TEXT'
,p_display_name=>'Hidden'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--hideBody'
,p_group_id=>wwv_flow_api.id(472292919866945893)
,p_template_types=>'REPORT'
,p_help_text=>'This option hides the card body which contains description and subtext.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472295595772945893)
,p_theme_id=>42
,p_name=>'ICONS_ROUNDED'
,p_display_name=>'Rounded Corners'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--iconsRounded'
,p_group_id=>wwv_flow_api.id(472295372757945893)
,p_template_types=>'REPORT'
,p_help_text=>'The icons are displayed within a square with rounded corners.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472295795853945893)
,p_theme_id=>42
,p_name=>'ICONS_SQUARE'
,p_display_name=>'Square'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--iconsSquare'
,p_group_id=>wwv_flow_api.id(472295372757945893)
,p_template_types=>'REPORT'
,p_help_text=>'The icons are displayed within a square shape.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472295985947945893)
,p_theme_id=>42
,p_name=>'SPAN_HORIZONTALLY'
,p_display_name=>'Span Horizontally'
,p_display_sequence=>70
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'t-Cards--spanHorizontally'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472296128201945895)
,p_theme_id=>42
,p_name=>'USE_THEME_COLORS'
,p_display_name=>'Apply Theme Colors'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472290824968945893)
,p_css_classes=>'u-colors'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472296714453945895)
,p_theme_id=>42
,p_name=>'BASIC'
,p_display_name=>'Basic'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472296275002945895)
,p_css_classes=>'t-Comments--basic'
,p_group_id=>wwv_flow_api.id(472296526602945895)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472296960802945895)
,p_theme_id=>42
,p_name=>'SPEECH_BUBBLES'
,p_display_name=>'Speech Bubbles'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472296275002945895)
,p_css_classes=>'t-Comments--chat'
,p_group_id=>wwv_flow_api.id(472296526602945895)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472297183144945895)
,p_theme_id=>42
,p_name=>'ICONS_ROUNDED'
,p_display_name=>'Rounded Corners'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472296275002945895)
,p_css_classes=>'t-Comments--iconsRounded'
,p_group_id=>wwv_flow_api.id(472295372757945893)
,p_template_types=>'REPORT'
,p_help_text=>'The icons are displayed within a square with rounded corners.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472297374236945895)
,p_theme_id=>42
,p_name=>'ICONS_SQUARE'
,p_display_name=>'Square'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472296275002945895)
,p_css_classes=>'t-Comments--iconsSquare'
,p_group_id=>wwv_flow_api.id(472295372757945893)
,p_template_types=>'REPORT'
,p_help_text=>'The icons are displayed within a square shape.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472297962760945895)
,p_theme_id=>42
,p_name=>'ALIGNMENT_TOP'
,p_display_name=>'Top'
,p_display_sequence=>100
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--alignTop'
,p_group_id=>wwv_flow_api.id(472297759933945895)
,p_template_types=>'REPORT'
,p_help_text=>'Aligns the content to the top of the row. This is useful when you expect that yours rows will vary in height (e.g. some rows will have longer descriptions than others).'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472298321655945895)
,p_theme_id=>42
,p_name=>'ACTIONS_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>60
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--hideActions'
,p_group_id=>wwv_flow_api.id(472298134280945895)
,p_template_types=>'REPORT'
,p_help_text=>'Hides the Actions column from being rendered on the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472298750544945895)
,p_theme_id=>42
,p_name=>'DESCRIPTION_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--hideDescription'
,p_group_id=>wwv_flow_api.id(472298510596945895)
,p_template_types=>'REPORT'
,p_help_text=>'Hides the Description from being rendered on the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472299159371945895)
,p_theme_id=>42
,p_name=>'ICON_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--hideIcon'
,p_group_id=>wwv_flow_api.id(472298955608945895)
,p_template_types=>'REPORT'
,p_help_text=>'Hides the Icon from being rendered on the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472299546208945895)
,p_theme_id=>42
,p_name=>'MISC_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--hideMisc'
,p_group_id=>wwv_flow_api.id(472299367868945895)
,p_template_types=>'REPORT'
,p_help_text=>'Hides the Misc column from being rendered on the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472299951564945895)
,p_theme_id=>42
,p_name=>'SELECTION_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--hideSelection'
,p_group_id=>wwv_flow_api.id(472299784176945895)
,p_template_types=>'REPORT'
,p_help_text=>'Hides the Selection column from being rendered on the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472300339556945895)
,p_theme_id=>42
,p_name=>'TITLE_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--hideTitle'
,p_group_id=>wwv_flow_api.id(472300159983945895)
,p_template_types=>'REPORT'
,p_help_text=>'Hides the Title from being rendered on the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472300581449945895)
,p_theme_id=>42
,p_name=>'STYLE_COMPACT'
,p_display_name=>'Compact'
,p_display_sequence=>1
,p_report_template_id=>wwv_flow_api.id(472297479275945895)
,p_css_classes=>'t-ContentRow--styleCompact'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
,p_help_text=>'This option reduces the padding and font sizes to present a compact display of the same information.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472300917706945895)
,p_theme_id=>42
,p_name=>'2_COLUMN_GRID'
,p_display_name=>'2 Column Grid'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--cols t-MediaList--2cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472301142282945895)
,p_theme_id=>42
,p_name=>'3_COLUMN_GRID'
,p_display_name=>'3 Column Grid'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--cols t-MediaList--3cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472301316946945895)
,p_theme_id=>42
,p_name=>'4_COLUMN_GRID'
,p_display_name=>'4 Column Grid'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--cols t-MediaList--4cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472301531352945896)
,p_theme_id=>42
,p_name=>'5_COLUMN_GRID'
,p_display_name=>'5 Column Grid'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--cols t-MediaList--5cols'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472301745992945896)
,p_theme_id=>42
,p_name=>'SPAN_HORIZONTAL'
,p_display_name=>'Span Horizontal'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--horizontal'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472301996893945896)
,p_theme_id=>42
,p_name=>'ICONS_ROUNDED'
,p_display_name=>'Rounded Corners'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--iconsRounded'
,p_group_id=>wwv_flow_api.id(472295372757945893)
,p_template_types=>'REPORT'
,p_help_text=>'The icons are displayed within a square with rounded corners.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472302163117945896)
,p_theme_id=>42
,p_name=>'ICONS_SQUARE'
,p_display_name=>'Square'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--iconsSquare'
,p_group_id=>wwv_flow_api.id(472295372757945893)
,p_template_types=>'REPORT'
,p_help_text=>'The icons are displayed within a square shape.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472302524555945896)
,p_theme_id=>42
,p_name=>'LARGE'
,p_display_name=>'Large'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--large force-fa-lg'
,p_group_id=>wwv_flow_api.id(472302304880945896)
,p_template_types=>'REPORT'
,p_help_text=>'Increases the size of the text and icons in the list.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472302703742945896)
,p_theme_id=>42
,p_name=>'SHOW_BADGES'
,p_display_name=>'Show Badges'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--showBadges'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472302984346945896)
,p_theme_id=>42
,p_name=>'SHOW_DESCRIPTION'
,p_display_name=>'Show Description'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--showDesc'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472303135171945896)
,p_theme_id=>42
,p_name=>'SHOW_ICONS'
,p_display_name=>'Show Icons'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--showIcons'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472303337890945896)
,p_theme_id=>42
,p_name=>'STACK'
,p_display_name=>'Stack'
,p_display_sequence=>5
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'t-MediaList--stack'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472303554235945896)
,p_theme_id=>42
,p_name=>'APPLY_THEME_COLORS'
,p_display_name=>'Apply Theme Colors'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472300668206945895)
,p_css_classes=>'u-colors'
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472304335848945896)
,p_theme_id=>42
,p_name=>'ALTROWCOLORSENABLE'
,p_display_name=>'Enable'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--altRowsDefault'
,p_group_id=>wwv_flow_api.id(472304180390945896)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472304743043945896)
,p_theme_id=>42
,p_name=>'HORIZONTALBORDERS'
,p_display_name=>'Horizontal Only'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--horizontalBorders'
,p_group_id=>wwv_flow_api.id(472304565896945896)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472304955557945896)
,p_theme_id=>42
,p_name=>'REMOVEOUTERBORDERS'
,p_display_name=>'No Outer Borders'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--inline'
,p_group_id=>wwv_flow_api.id(472304565896945896)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472305143175945896)
,p_theme_id=>42
,p_name=>'REMOVEALLBORDERS'
,p_display_name=>'No Borders'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--noBorders'
,p_group_id=>wwv_flow_api.id(472304565896945896)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472305543069945896)
,p_theme_id=>42
,p_name=>'ENABLE'
,p_display_name=>'Enable'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--rowHighlight'
,p_group_id=>wwv_flow_api.id(472305312099945896)
,p_template_types=>'REPORT'
,p_help_text=>'Enable row highlighting on mouse over'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472305713122945896)
,p_theme_id=>42
,p_name=>'ROWHIGHLIGHTDISABLE'
,p_display_name=>'Disable'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--rowHighlightOff'
,p_group_id=>wwv_flow_api.id(472305312099945896)
,p_template_types=>'REPORT'
,p_help_text=>'Disable row highlighting on mouse over'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472305967617945896)
,p_theme_id=>42
,p_name=>'ALTROWCOLORSDISABLE'
,p_display_name=>'Disable'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--staticRowColors'
,p_group_id=>wwv_flow_api.id(472304180390945896)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472306196832945896)
,p_theme_id=>42
,p_name=>'STRETCHREPORT'
,p_display_name=>'Stretch Report'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--stretch'
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472306356558945896)
,p_theme_id=>42
,p_name=>'VERTICALBORDERS'
,p_display_name=>'Vertical Only'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472303814532945896)
,p_css_classes=>'t-Report--verticalBorders'
,p_group_id=>wwv_flow_api.id(472304565896945896)
,p_template_types=>'REPORT'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472306785769945898)
,p_theme_id=>42
,p_name=>'COMPACT'
,p_display_name=>'Compact'
,p_display_sequence=>1
,p_report_template_id=>wwv_flow_api.id(472306460088945896)
,p_css_classes=>'t-Timeline--compact'
,p_group_id=>wwv_flow_api.id(472287121062945892)
,p_template_types=>'REPORT'
,p_help_text=>'Displays a compact version of timeline with smaller text and fewer columns.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472307368954945898)
,p_theme_id=>42
,p_name=>'FIXED_LARGE'
,p_display_name=>'Fixed - Large'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--fixedLabelLarge'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472307561664945898)
,p_theme_id=>42
,p_name=>'FIXED_MEDIUM'
,p_display_name=>'Fixed - Medium'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--fixedLabelMedium'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472307783493945898)
,p_theme_id=>42
,p_name=>'FIXED_SMALL'
,p_display_name=>'Fixed - Small'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--fixedLabelSmall'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472307951441945898)
,p_theme_id=>42
,p_name=>'LEFT_ALIGNED_DETAILS'
,p_display_name=>'Left Aligned Details'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--leftAligned'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472308147292945898)
,p_theme_id=>42
,p_name=>'RIGHT_ALIGNED_DETAILS'
,p_display_name=>'Right Aligned Details'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--rightAligned'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472308396157945898)
,p_theme_id=>42
,p_name=>'VARIABLE_LARGE'
,p_display_name=>'Variable - Large'
,p_display_sequence=>60
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--variableLabelLarge'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472308558072945898)
,p_theme_id=>42
,p_name=>'VARIABLE_MEDIUM'
,p_display_name=>'Variable - Medium'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--variableLabelMedium'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472308735309945898)
,p_theme_id=>42
,p_name=>'VARIABLE_SMALL'
,p_display_name=>'Variable - Small'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472306822863945898)
,p_css_classes=>'t-AVPList--variableLabelSmall'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472309141735945898)
,p_theme_id=>42
,p_name=>'FIXED_LARGE'
,p_display_name=>'Fixed - Large'
,p_display_sequence=>30
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--fixedLabelLarge'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472309382405945898)
,p_theme_id=>42
,p_name=>'FIXED_MEDIUM'
,p_display_name=>'Fixed - Medium'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--fixedLabelMedium'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472309537270945898)
,p_theme_id=>42
,p_name=>'FIXED_SMALL'
,p_display_name=>'Fixed - Small'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--fixedLabelSmall'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472309701701945898)
,p_theme_id=>42
,p_name=>'LEFT_ALIGNED_DETAILS'
,p_display_name=>'Left Aligned Details'
,p_display_sequence=>10
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--leftAligned'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472309952194945898)
,p_theme_id=>42
,p_name=>'RIGHT_ALIGNED_DETAILS'
,p_display_name=>'Right Aligned Details'
,p_display_sequence=>20
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--rightAligned'
,p_group_id=>wwv_flow_api.id(472287510004945892)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472310162503945898)
,p_theme_id=>42
,p_name=>'VARIABLE_LARGE'
,p_display_name=>'Variable - Large'
,p_display_sequence=>60
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--variableLabelLarge'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472310383800945900)
,p_theme_id=>42
,p_name=>'VARIABLE_MEDIUM'
,p_display_name=>'Variable - Medium'
,p_display_sequence=>50
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--variableLabelMedium'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472310516307945900)
,p_theme_id=>42
,p_name=>'VARIABLE_SMALL'
,p_display_name=>'Variable - Small'
,p_display_sequence=>40
,p_report_template_id=>wwv_flow_api.id(472308844968945898)
,p_css_classes=>'t-AVPList--variableLabelSmall'
,p_group_id=>wwv_flow_api.id(472307182767945898)
,p_template_types=>'REPORT'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472311150674945901)
,p_theme_id=>42
,p_name=>'DISPLAY_LABELS_SM'
,p_display_name=>'Display labels'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472310641767945900)
,p_css_classes=>'t-NavTabs--displayLabels-sm'
,p_group_id=>wwv_flow_api.id(472310971667945901)
,p_template_types=>'LIST'
,p_help_text=>'Displays the label for the list items below the icon'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472311502703945901)
,p_theme_id=>42
,p_name=>'NO_LABEL_LG'
,p_display_name=>'Do not display labels'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472310641767945900)
,p_css_classes=>'t-NavTabs--hiddenLabels-lg'
,p_group_id=>wwv_flow_api.id(472311338511945901)
,p_template_types=>'LIST'
,p_help_text=>'Hides the label for the list item'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472311718799945901)
,p_theme_id=>42
,p_name=>'HIDE_LABELS_SM'
,p_display_name=>'Do not display labels'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472310641767945900)
,p_css_classes=>'t-NavTabs--hiddenLabels-sm'
,p_group_id=>wwv_flow_api.id(472310971667945901)
,p_template_types=>'LIST'
);
end;
/
begin
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472311994793945901)
,p_theme_id=>42
,p_name=>'LABEL_INLINE_LG'
,p_display_name=>'Display labels inline'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472310641767945900)
,p_css_classes=>'t-NavTabs--inlineLabels-lg'
,p_group_id=>wwv_flow_api.id(472311338511945901)
,p_template_types=>'LIST'
,p_help_text=>'Display the label inline with the icon and badge'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472312175242945901)
,p_theme_id=>42
,p_name=>'LABEL_ABOVE_LG'
,p_display_name=>'Display labels above'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472310641767945900)
,p_css_classes=>'t-NavTabs--stacked'
,p_group_id=>wwv_flow_api.id(472311338511945901)
,p_template_types=>'LIST'
,p_help_text=>'Display the label stacked above the icon and badge'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472312595207945901)
,p_theme_id=>42
,p_name=>'DISPLAY_MENU_CALLOUT'
,p_display_name=>'Display Menu Callout'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'js-menu-callout'
,p_template_types=>'LIST'
,p_help_text=>'Displays a callout arrow that points to where the menu was activated from.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472312700096945901)
,p_theme_id=>42
,p_name=>'FULL_WIDTH'
,p_display_name=>'Full Width'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--fullWidth'
,p_template_types=>'LIST'
,p_help_text=>'Stretches the menu to fill the width of the screen.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472313126885945901)
,p_theme_id=>42
,p_name=>'2_COLUMNS'
,p_display_name=>'2 Columns'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--layout2Cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472313309996945901)
,p_theme_id=>42
,p_name=>'3_COLUMNS'
,p_display_name=>'3 Columns'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--layout3Cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472313578410945901)
,p_theme_id=>42
,p_name=>'4_COLUMNS'
,p_display_name=>'4 Columns'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--layout4Cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472313718312945901)
,p_theme_id=>42
,p_name=>'5_COLUMNS'
,p_display_name=>'5 Columns'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--layout5Cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472313966800945901)
,p_theme_id=>42
,p_name=>'CUSTOM'
,p_display_name=>'Custom'
,p_display_sequence=>60
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--layoutCustom'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472314199048945903)
,p_theme_id=>42
,p_name=>'STACKED'
,p_display_name=>'Stacked'
,p_display_sequence=>60
,p_list_template_id=>wwv_flow_api.id(472312234782945901)
,p_css_classes=>'t-MegaMenu--layoutStacked'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472314593251945903)
,p_theme_id=>42
,p_name=>'WIZARD_PROGRESS_LINKS'
,p_display_name=>'Make Wizard Steps Clickable'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472314275177945903)
,p_css_classes=>'js-wizardProgressLinks'
,p_template_types=>'LIST'
,p_help_text=>'This option will make the wizard steps clickable links.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472314941308945903)
,p_theme_id=>42
,p_name=>'CURRENTSTEPONLY'
,p_display_name=>'Current Step Only'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472314275177945903)
,p_css_classes=>'t-WizardSteps--displayCurrentLabelOnly'
,p_group_id=>wwv_flow_api.id(472314758065945903)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472315107111945903)
,p_theme_id=>42
,p_name=>'ALLSTEPS'
,p_display_name=>'All Steps'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472314275177945903)
,p_css_classes=>'t-WizardSteps--displayLabels'
,p_group_id=>wwv_flow_api.id(472314758065945903)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472315312022945903)
,p_theme_id=>42
,p_name=>'HIDELABELS'
,p_display_name=>'Hide Labels'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472314275177945903)
,p_css_classes=>'t-WizardSteps--hideLabels'
,p_group_id=>wwv_flow_api.id(472314758065945903)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472315509023945903)
,p_theme_id=>42
,p_name=>'VERTICAL_LIST'
,p_display_name=>'Vertical Orientation'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472314275177945903)
,p_css_classes=>'t-WizardSteps--vertical'
,p_template_types=>'LIST'
,p_help_text=>'Displays the wizard progress list in a vertical orientation and is suitable for displaying within a side column of a page.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472315969375945903)
,p_theme_id=>42
,p_name=>'ADD_ACTIONS'
,p_display_name=>'Add Actions'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472315633964945903)
,p_css_classes=>'js-addActions'
,p_template_types=>'LIST'
,p_help_text=>'Use this option to add shortcuts for menu items. Note that actions.js must be included on your page to support this functionality.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472316179166945903)
,p_theme_id=>42
,p_name=>'DISPLAY_MENU_CALLOUT'
,p_display_name=>'Display Menu Callout'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472315633964945903)
,p_css_classes=>'js-menu-callout'
,p_template_types=>'LIST'
,p_help_text=>'Use this option to add display a callout for the menu.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472316386774945903)
,p_theme_id=>42
,p_name=>'SHOW_SUB_MENU_ICONS'
,p_display_name=>'Show Sub Menu Icons'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472315633964945903)
,p_css_classes=>'js-showSubMenuIcons'
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472316549127945903)
,p_theme_id=>42
,p_name=>'BEHAVE_LIKE_TABS'
,p_display_name=>'Behave Like Tabs'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472315633964945903)
,p_css_classes=>'js-tabLike'
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472317129512945903)
,p_theme_id=>42
,p_name=>'CIRCULAR'
,p_display_name=>'Circular'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--circular'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472317305064945903)
,p_theme_id=>42
,p_name=>'2COLUMNGRID'
,p_display_name=>'2 Column Grid'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Arrange badges in a two column grid'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472317567978945903)
,p_theme_id=>42
,p_name=>'3COLUMNGRID'
,p_display_name=>'3 Column Grid'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--cols t-BadgeList--3cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Arrange badges in a 3 column grid'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472317702699945903)
,p_theme_id=>42
,p_name=>'4COLUMNGRID'
,p_display_name=>'4 Column Grid'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--cols t-BadgeList--4cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Arrange badges in 4 column grid'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472317914777945903)
,p_theme_id=>42
,p_name=>'5COLUMNGRID'
,p_display_name=>'5 Column Grid'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--cols t-BadgeList--5cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Arrange badges in a 5 column grid'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472318155234945904)
,p_theme_id=>42
,p_name=>'GRID'
,p_display_name=>'Grid'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--dash'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472318378477945904)
,p_theme_id=>42
,p_name=>'FIXED'
,p_display_name=>'Span Horizontally'
,p_display_sequence=>60
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--fixed'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Span badges horizontally'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472318552187945904)
,p_theme_id=>42
,p_name=>'FLEXIBLEBOX'
,p_display_name=>'Flexible Box'
,p_display_sequence=>80
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--flex'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Use flexbox to arrange items'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472318716737945904)
,p_theme_id=>42
,p_name=>'FLOATITEMS'
,p_display_name=>'Float Items'
,p_display_sequence=>70
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--float'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Float badges to left'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472319121833945904)
,p_theme_id=>42
,p_name=>'LARGE'
,p_display_name=>'64px'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--large'
,p_group_id=>wwv_flow_api.id(472318944010945904)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472319383206945904)
,p_theme_id=>42
,p_name=>'MEDIUM'
,p_display_name=>'48px'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--medium'
,p_group_id=>wwv_flow_api.id(472318944010945904)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472319585781945904)
,p_theme_id=>42
,p_name=>'SMALL'
,p_display_name=>'32px'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--small'
,p_group_id=>wwv_flow_api.id(472318944010945904)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472319767052945904)
,p_theme_id=>42
,p_name=>'STACKED'
,p_display_name=>'Stacked'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--stacked'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Stack badges on top of each other'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472319967089945904)
,p_theme_id=>42
,p_name=>'XLARGE'
,p_display_name=>'96px'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--xlarge'
,p_group_id=>wwv_flow_api.id(472318944010945904)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472320131795945904)
,p_theme_id=>42
,p_name=>'XXLARGE'
,p_display_name=>'128px'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'t-BadgeList--xxlarge'
,p_group_id=>wwv_flow_api.id(472318944010945904)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472320355999945904)
,p_theme_id=>42
,p_name=>'APPLY_THEME_COLORS'
,p_display_name=>'Apply Theme Colors'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472316641102945903)
,p_css_classes=>'u-colors'
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472320785131945904)
,p_theme_id=>42
,p_name=>'2COLUMNGRID'
,p_display_name=>'2 Column Grid'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--cols t-MediaList--2cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472320948489945904)
,p_theme_id=>42
,p_name=>'3COLUMNGRID'
,p_display_name=>'3 Column Grid'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--cols t-MediaList--3cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472321171770945904)
,p_theme_id=>42
,p_name=>'4COLUMNGRID'
,p_display_name=>'4 Column Grid'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--cols t-MediaList--4cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472321301646945904)
,p_theme_id=>42
,p_name=>'5COLUMNGRID'
,p_display_name=>'5 Column Grid'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--cols t-MediaList--5cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472321543610945904)
,p_theme_id=>42
,p_name=>'SPANHORIZONTAL'
,p_display_name=>'Span Horizontal'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--horizontal'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Show all list items in one horizontal row.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472321921507945904)
,p_theme_id=>42
,p_name=>'ICONS_ROUNDED'
,p_display_name=>'Rounded Corners'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--iconsRounded'
,p_group_id=>wwv_flow_api.id(472321755189945904)
,p_template_types=>'LIST'
,p_help_text=>'The icons are displayed within a square with rounded corners.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472322157670945904)
,p_theme_id=>42
,p_name=>'ICONS_SQUARE'
,p_display_name=>'Square'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--iconsSquare'
,p_group_id=>wwv_flow_api.id(472321755189945904)
,p_template_types=>'LIST'
,p_help_text=>'The icons are displayed within a square shape.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472322578023945904)
,p_theme_id=>42
,p_name=>'LIST_SIZE_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--large force-fa-lg'
,p_group_id=>wwv_flow_api.id(472322326274945904)
,p_template_types=>'LIST'
,p_help_text=>'Increases the size of the text and icons in the list.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472322787677945904)
,p_theme_id=>42
,p_name=>'SHOW_BADGES'
,p_display_name=>'Show Badges'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--showBadges'
,p_template_types=>'LIST'
,p_help_text=>'Show a badge (Attribute 2) to the right of the list item.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472322969494945904)
,p_theme_id=>42
,p_name=>'SHOW_DESCRIPTION'
,p_display_name=>'Show Description'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--showDesc'
,p_template_types=>'LIST'
,p_help_text=>'Shows the description (Attribute 1) for each list item.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472323191146945904)
,p_theme_id=>42
,p_name=>'SHOW_ICONS'
,p_display_name=>'Show Icons'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'t-MediaList--showIcons'
,p_template_types=>'LIST'
,p_help_text=>'Display an icon next to the list item.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472323381067945904)
,p_theme_id=>42
,p_name=>'APPLY_THEME_COLORS'
,p_display_name=>'Apply Theme Colors'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472320415596945904)
,p_css_classes=>'u-colors'
,p_template_types=>'LIST'
,p_help_text=>'Applies colors from the Theme''s color palette to icons in the list.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472323788370945906)
,p_theme_id=>42
,p_name=>'COLLAPSED_DEFAULT'
,p_display_name=>'Collapsed by Default'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_css_classes=>'js-defaultCollapsed'
,p_template_types=>'LIST'
,p_help_text=>'This option will load the side navigation menu in a collapsed state by default.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472324161084945906)
,p_theme_id=>42
,p_name=>'ICON_DEFAULT'
,p_display_name=>'Icon (Default)'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_css_classes=>'js-navCollapsed--default'
,p_group_id=>wwv_flow_api.id(472323967773945906)
,p_template_types=>'LIST'
,p_help_text=>'Display icons when the navigation menu is collapsed for large screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472324354573945906)
,p_theme_id=>42
,p_name=>'COLLAPSE_STYLE_HIDDEN'
,p_display_name=>'Hidden'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_css_classes=>'js-navCollapsed--hidden'
,p_group_id=>wwv_flow_api.id(472323967773945906)
,p_template_types=>'LIST'
,p_help_text=>'Completely hide the navigation menu when it is collapsed.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472324502099945906)
,p_theme_id=>42
,p_name=>'STYLE_C'
,p_display_name=>'Classic'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_css_classes=>'t-TreeNav--classic'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'Classic Style'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472324778894945906)
,p_theme_id=>42
,p_name=>'STYLE_A'
,p_display_name=>'Style A'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_css_classes=>'t-TreeNav--styleA'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'Style Variation A'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472324992222945906)
,p_theme_id=>42
,p_name=>'STYLE_B'
,p_display_name=>'Style B'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_css_classes=>'t-TreeNav--styleB'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'Style Variation B'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472325390385945906)
,p_theme_id=>42
,p_name=>'ADD_ACTIONS'
,p_display_name=>'Add Actions'
,p_display_sequence=>1
,p_list_template_id=>wwv_flow_api.id(472325071321945906)
,p_css_classes=>'js-addActions'
,p_template_types=>'LIST'
,p_help_text=>'Use this option to add shortcuts for menu items. Note that actions.js must be included on your page to support this functionality.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472325570921945906)
,p_theme_id=>42
,p_name=>'DISPLAY_MENU_CALLOUT'
,p_display_name=>'Display Menu Callout'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472325071321945906)
,p_css_classes=>'js-menu-callout'
,p_template_types=>'LIST'
,p_help_text=>'Use this option to add display a callout for the menu.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472325764850945906)
,p_theme_id=>42
,p_name=>'SHOW_SUB_MENU_ICONS'
,p_display_name=>'Show Sub Menu Icons'
,p_display_sequence=>1
,p_list_template_id=>wwv_flow_api.id(472325071321945906)
,p_css_classes=>'js-showSubMenuIcons'
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472325910013945906)
,p_theme_id=>42
,p_name=>'BEHAVE_LIKE_TABS'
,p_display_name=>'Behave Like Tabs'
,p_display_sequence=>1
,p_list_template_id=>wwv_flow_api.id(472325071321945906)
,p_css_classes=>'js-tabLike'
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472326301527945906)
,p_theme_id=>42
,p_name=>'DISPLAY_MENU_CALLOUT'
,p_display_name=>'Display Menu Callout'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326048549945906)
,p_css_classes=>'js-menu-callout'
,p_template_types=>'LIST'
,p_help_text=>'Use this option to add display a callout for the menu.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472326793588945906)
,p_theme_id=>42
,p_name=>'3_COLUMNS'
,p_display_name=>'3 Columns'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--3cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472326970411945906)
,p_theme_id=>42
,p_name=>'4_COLUMNS'
,p_display_name=>'4 Columns'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--4cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472327193695945906)
,p_theme_id=>42
,p_name=>'5_COLUMNS'
,p_display_name=>'5 Columns'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--5cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472327529953945906)
,p_theme_id=>42
,p_name=>'COLOR_FILL'
,p_display_name=>'Color Fill'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--animColorFill'
,p_group_id=>wwv_flow_api.id(472327337794945906)
,p_template_types=>'LIST'
,p_help_text=>'Fills the card background with the color of the icon or default link style.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472327761558945906)
,p_theme_id=>42
,p_name=>'RAISE_CARD'
,p_display_name=>'Raise Card'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--animRaiseCard'
,p_group_id=>wwv_flow_api.id(472327337794945906)
,p_template_types=>'LIST'
,p_help_text=>'Raises the card so it pops up.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472327991900945906)
,p_theme_id=>42
,p_name=>'BASIC'
,p_display_name=>'Basic'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--basic'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472328125985945906)
,p_theme_id=>42
,p_name=>'2_COLUMNS'
,p_display_name=>'2 Columns'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--cols'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472328303585945906)
,p_theme_id=>42
,p_name=>'COMPACT'
,p_display_name=>'Compact'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--compact'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'Use this option when you want to show smaller cards.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472328721167945906)
,p_theme_id=>42
,p_name=>'2_LINES'
,p_display_name=>'2 Lines'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--desc-2ln'
,p_group_id=>wwv_flow_api.id(472328552347945906)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472328916900945906)
,p_theme_id=>42
,p_name=>'3_LINES'
,p_display_name=>'3 Lines'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--desc-3ln'
,p_group_id=>wwv_flow_api.id(472328552347945906)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472329159779945906)
,p_theme_id=>42
,p_name=>'4_LINES'
,p_display_name=>'4 Lines'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--desc-4ln'
,p_group_id=>wwv_flow_api.id(472328552347945906)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472329506319945907)
,p_theme_id=>42
,p_name=>'DISPLAY_ICONS'
,p_display_name=>'Display Icons'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--displayIcons'
,p_group_id=>wwv_flow_api.id(472329381423945907)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472329769271945907)
,p_theme_id=>42
,p_name=>'DISPLAY_INITIALS'
,p_display_name=>'Display Initials'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--displayInitials'
,p_group_id=>wwv_flow_api.id(472329381423945907)
,p_template_types=>'LIST'
,p_help_text=>'Initials come from List Attribute 3'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472329994871945907)
,p_theme_id=>42
,p_name=>'DISPLAY_SUBTITLE'
,p_display_name=>'Display Subtitle'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--displaySubtitle'
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472330180956945907)
,p_theme_id=>42
,p_name=>'FEATURED'
,p_display_name=>'Featured'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--featured force-fa-lg'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472330326359945907)
,p_theme_id=>42
,p_name=>'BLOCK'
,p_display_name=>'Block'
,p_display_sequence=>40
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--featured t-Cards--block force-fa-lg'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472330563084945907)
,p_theme_id=>42
,p_name=>'FLOAT'
,p_display_name=>'Float'
,p_display_sequence=>60
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--float'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472330756365945907)
,p_theme_id=>42
,p_name=>'HIDDEN_BODY_TEXT'
,p_display_name=>'Hidden'
,p_display_sequence=>50
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--hideBody'
,p_group_id=>wwv_flow_api.id(472328552347945906)
,p_template_types=>'LIST'
,p_help_text=>'This option hides the card body which contains description and subtext.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472330904186945907)
,p_theme_id=>42
,p_name=>'ICONS_ROUNDED'
,p_display_name=>'Rounded Corners'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--iconsRounded'
,p_group_id=>wwv_flow_api.id(472321755189945904)
,p_template_types=>'LIST'
,p_help_text=>'The icons are displayed within a square with rounded corners.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472331124459945907)
,p_theme_id=>42
,p_name=>'ICONS_SQUARE'
,p_display_name=>'Square'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--iconsSquare'
,p_group_id=>wwv_flow_api.id(472321755189945904)
,p_template_types=>'LIST'
,p_help_text=>'The icons are displayed within a square shape.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472331386974945907)
,p_theme_id=>42
,p_name=>'SPAN_HORIZONTALLY'
,p_display_name=>'Span Horizontally'
,p_display_sequence=>70
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--spanHorizontally'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472331571515945907)
,p_theme_id=>42
,p_name=>'CARDS_STACKED'
,p_display_name=>'Stacked'
,p_display_sequence=>5
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'t-Cards--stacked'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Stacks the cards on top of each other.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472331786949945907)
,p_theme_id=>42
,p_name=>'USE_THEME_COLORS'
,p_display_name=>'Apply Theme Colors'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472326441706945906)
,p_css_classes=>'u-colors'
,p_template_types=>'LIST'
,p_help_text=>'Applies the colors from the theme''s color palette to the icons or initials within cards.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472332199293945907)
,p_theme_id=>42
,p_name=>'FILL_LABELS'
,p_display_name=>'Fill Labels'
,p_display_sequence=>1
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--fillLabels'
,p_group_id=>wwv_flow_api.id(472312966030945901)
,p_template_types=>'LIST'
,p_help_text=>'Stretch tabs to fill to the width of the tabs container.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472332338469945907)
,p_theme_id=>42
,p_name=>'ABOVE_LABEL'
,p_display_name=>'Above Label'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--iconsAbove'
,p_group_id=>wwv_flow_api.id(472329381423945907)
,p_template_types=>'LIST'
,p_help_text=>'Places icons above tab label.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472332586945945907)
,p_theme_id=>42
,p_name=>'INLINE_WITH_LABEL'
,p_display_name=>'Inline with Label'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--inlineIcons'
,p_group_id=>wwv_flow_api.id(472329381423945907)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472332747503945907)
,p_theme_id=>42
,p_name=>'LARGE'
,p_display_name=>'Large'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--large'
,p_group_id=>wwv_flow_api.id(472322326274945904)
,p_template_types=>'LIST'
,p_help_text=>'Increases font size and white space around tab items.'
);
end;
/
begin
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472332921882945907)
,p_theme_id=>42
,p_name=>'PILL'
,p_display_name=>'Pill'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--pill'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'Displays tabs in a pill container.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472333196963945907)
,p_theme_id=>42
,p_name=>'SIMPLE'
,p_display_name=>'Simple'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--simple'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'A very simplistic tab UI.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472333367378945907)
,p_theme_id=>42
,p_name=>'SMALL'
,p_display_name=>'Small'
,p_display_sequence=>5
,p_list_template_id=>wwv_flow_api.id(472331805313945907)
,p_css_classes=>'t-Tabs--small'
,p_group_id=>wwv_flow_api.id(472322326274945904)
,p_template_types=>'LIST'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472333721103945907)
,p_theme_id=>42
,p_name=>'ADD_ACTIONS'
,p_display_name=>'Add Actions'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472333401466945907)
,p_css_classes=>'js-addActions'
,p_template_types=>'LIST'
,p_help_text=>'Enables you to define a keyboard shortcut to activate the menu item.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472333959332945907)
,p_theme_id=>42
,p_name=>'DISPLAY_MENU_CALLOUT'
,p_display_name=>'Display Menu Callout'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472333401466945907)
,p_css_classes=>'js-menu-callout'
,p_template_types=>'LIST'
,p_help_text=>'Use this option to add display a callout for the menu. Note that callout will only be displayed if the data-parent-element custom attribute is defined.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472334335598945907)
,p_theme_id=>42
,p_name=>'ACTIONS'
,p_display_name=>'Actions'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472334036440945907)
,p_css_classes=>'t-LinksList--actions'
,p_group_id=>wwv_flow_api.id(472316990677945903)
,p_template_types=>'LIST'
,p_help_text=>'Render as actions to be placed on the right side column.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472334509645945907)
,p_theme_id=>42
,p_name=>'DISABLETEXTWRAPPING'
,p_display_name=>'Disable Text Wrapping'
,p_display_sequence=>30
,p_list_template_id=>wwv_flow_api.id(472334036440945907)
,p_css_classes=>'t-LinksList--nowrap'
,p_template_types=>'LIST'
,p_help_text=>'Do not allow link text to wrap to new lines. Truncate with ellipsis.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472334751341945907)
,p_theme_id=>42
,p_name=>'SHOWGOTOARROW'
,p_display_name=>'Show Right Arrow'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472334036440945907)
,p_css_classes=>'t-LinksList--showArrow'
,p_template_types=>'LIST'
,p_help_text=>'Show arrow to the right of link'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472334965482945909)
,p_theme_id=>42
,p_name=>'SHOWBADGES'
,p_display_name=>'Show Badges'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472334036440945907)
,p_css_classes=>'t-LinksList--showBadge'
,p_template_types=>'LIST'
,p_help_text=>'Show badge to right of link (requires Attribute 1 to be populated)'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472335317141945909)
,p_theme_id=>42
,p_name=>'SHOWICONS'
,p_display_name=>'For All Items'
,p_display_sequence=>20
,p_list_template_id=>wwv_flow_api.id(472334036440945907)
,p_css_classes=>'t-LinksList--showIcons'
,p_group_id=>wwv_flow_api.id(472335134138945909)
,p_template_types=>'LIST'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472335548750945909)
,p_theme_id=>42
,p_name=>'SHOWTOPICONS'
,p_display_name=>'For Top Level Items Only'
,p_display_sequence=>10
,p_list_template_id=>wwv_flow_api.id(472334036440945907)
,p_css_classes=>'t-LinksList--showTopIcons'
,p_group_id=>wwv_flow_api.id(472335134138945909)
,p_template_types=>'LIST'
,p_help_text=>'This will show icons for top level items of the list only. It will not show icons for sub lists.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472336737348945910)
,p_theme_id=>42
,p_name=>'PUSH'
,p_display_name=>'Push'
,p_display_sequence=>20
,p_button_template_id=>wwv_flow_api.id(472336358748945910)
,p_css_classes=>'t-Button--hoverIconPush'
,p_group_id=>wwv_flow_api.id(472336551809945910)
,p_template_types=>'BUTTON'
,p_help_text=>'The icon will animate to the right or left on button hover or focus.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472336978955945910)
,p_theme_id=>42
,p_name=>'SPIN'
,p_display_name=>'Spin'
,p_display_sequence=>10
,p_button_template_id=>wwv_flow_api.id(472336358748945910)
,p_css_classes=>'t-Button--hoverIconSpin'
,p_group_id=>wwv_flow_api.id(472336551809945910)
,p_template_types=>'BUTTON'
,p_help_text=>'The icon will spin on button hover or focus.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472337322654945910)
,p_theme_id=>42
,p_name=>'PUSH'
,p_display_name=>'Push'
,p_display_sequence=>20
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_css_classes=>'t-Button--hoverIconPush'
,p_group_id=>wwv_flow_api.id(472336551809945910)
,p_template_types=>'BUTTON'
,p_help_text=>'The icon will animate to the right or left on button hover or focus.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472337552143945912)
,p_theme_id=>42
,p_name=>'SPIN'
,p_display_name=>'Spin'
,p_display_sequence=>10
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_css_classes=>'t-Button--hoverIconSpin'
,p_group_id=>wwv_flow_api.id(472336551809945910)
,p_template_types=>'BUTTON'
,p_help_text=>'The icon will spin on button hover or focus.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472337934273945912)
,p_theme_id=>42
,p_name=>'LEFTICON'
,p_display_name=>'Left'
,p_display_sequence=>10
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_css_classes=>'t-Button--iconLeft'
,p_group_id=>wwv_flow_api.id(472337722869945912)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472338173830945912)
,p_theme_id=>42
,p_name=>'RIGHTICON'
,p_display_name=>'Right'
,p_display_sequence=>20
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_css_classes=>'t-Button--iconRight'
,p_group_id=>wwv_flow_api.id(472337722869945912)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472338334311945912)
,p_theme_id=>42
,p_name=>'HIDE_LABEL_ON_MOBILE'
,p_display_name=>'Hide Label on Mobile'
,p_display_sequence=>10
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_css_classes=>'t-Button--mobileHideLabel'
,p_template_types=>'BUTTON'
,p_help_text=>'This template options hides the button label on small screens.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472340248763945923)
,p_theme_id=>42
,p_name=>'FBM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-bottom-lg'
,p_group_id=>wwv_flow_api.id(472340022878945923)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a large bottom margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472340683505945923)
,p_theme_id=>42
,p_name=>'RBM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-bottom-lg'
,p_group_id=>wwv_flow_api.id(472340482276945923)
,p_template_types=>'REGION'
,p_help_text=>'Adds a large bottom margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472340811457945923)
,p_theme_id=>42
,p_name=>'FBM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-bottom-md'
,p_group_id=>wwv_flow_api.id(472340022878945923)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a medium bottom margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472341059377945923)
,p_theme_id=>42
,p_name=>'RBM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-bottom-md'
,p_group_id=>wwv_flow_api.id(472340482276945923)
,p_template_types=>'REGION'
,p_help_text=>'Adds a medium bottom margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472341259667945923)
,p_theme_id=>42
,p_name=>'FBM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-bottom-none'
,p_group_id=>wwv_flow_api.id(472340022878945923)
,p_template_types=>'FIELD'
,p_help_text=>'Removes the bottom margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472341450296945923)
,p_theme_id=>42
,p_name=>'RBM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-bottom-none'
,p_group_id=>wwv_flow_api.id(472340482276945923)
,p_template_types=>'REGION'
,p_help_text=>'Removes the bottom margin for this region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472341645900945923)
,p_theme_id=>42
,p_name=>'FBM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-bottom-sm'
,p_group_id=>wwv_flow_api.id(472340022878945923)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a small bottom margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472341855506945923)
,p_theme_id=>42
,p_name=>'RBM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-bottom-sm'
,p_group_id=>wwv_flow_api.id(472340482276945923)
,p_template_types=>'REGION'
,p_help_text=>'Adds a small bottom margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472342227427945923)
,p_theme_id=>42
,p_name=>'FLM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-left-lg'
,p_group_id=>wwv_flow_api.id(472342013536945923)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a large left margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472342617811945923)
,p_theme_id=>42
,p_name=>'RLM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-left-lg'
,p_group_id=>wwv_flow_api.id(472342408183945923)
,p_template_types=>'REGION'
,p_help_text=>'Adds a large right margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472342837767945923)
,p_theme_id=>42
,p_name=>'FLM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-left-md'
,p_group_id=>wwv_flow_api.id(472342013536945923)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a medium left margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472343022095945923)
,p_theme_id=>42
,p_name=>'RLM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-left-md'
,p_group_id=>wwv_flow_api.id(472342408183945923)
,p_template_types=>'REGION'
,p_help_text=>'Adds a medium right margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472343289657945925)
,p_theme_id=>42
,p_name=>'FLM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-left-none'
,p_group_id=>wwv_flow_api.id(472342013536945923)
,p_template_types=>'FIELD'
,p_help_text=>'Removes the left margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472343440858945925)
,p_theme_id=>42
,p_name=>'RLM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-left-none'
,p_group_id=>wwv_flow_api.id(472342408183945923)
,p_template_types=>'REGION'
,p_help_text=>'Removes the left margin from the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472343603313945925)
,p_theme_id=>42
,p_name=>'FLM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-left-sm'
,p_group_id=>wwv_flow_api.id(472342013536945923)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a small left margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472343837808945925)
,p_theme_id=>42
,p_name=>'RLM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-left-sm'
,p_group_id=>wwv_flow_api.id(472342408183945923)
,p_template_types=>'REGION'
,p_help_text=>'Adds a small left margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472344296491945925)
,p_theme_id=>42
,p_name=>'FRM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-right-lg'
,p_group_id=>wwv_flow_api.id(472344000516945925)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a large right margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472344606719945925)
,p_theme_id=>42
,p_name=>'RRM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-right-lg'
,p_group_id=>wwv_flow_api.id(472344430967945925)
,p_template_types=>'REGION'
,p_help_text=>'Adds a large right margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472344849898945925)
,p_theme_id=>42
,p_name=>'FRM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-right-md'
,p_group_id=>wwv_flow_api.id(472344000516945925)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a medium right margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472345046030945925)
,p_theme_id=>42
,p_name=>'RRM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-right-md'
,p_group_id=>wwv_flow_api.id(472344430967945925)
,p_template_types=>'REGION'
,p_help_text=>'Adds a medium right margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472345209878945925)
,p_theme_id=>42
,p_name=>'FRM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-right-none'
,p_group_id=>wwv_flow_api.id(472344000516945925)
,p_template_types=>'FIELD'
,p_help_text=>'Removes the right margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472345457830945925)
,p_theme_id=>42
,p_name=>'RRM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-right-none'
,p_group_id=>wwv_flow_api.id(472344430967945925)
,p_template_types=>'REGION'
,p_help_text=>'Removes the right margin from the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472345637831945925)
,p_theme_id=>42
,p_name=>'FRM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-right-sm'
,p_group_id=>wwv_flow_api.id(472344000516945925)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a small right margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472345848303945925)
,p_theme_id=>42
,p_name=>'RRM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-right-sm'
,p_group_id=>wwv_flow_api.id(472344430967945925)
,p_template_types=>'REGION'
,p_help_text=>'Adds a small right margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472346292305945925)
,p_theme_id=>42
,p_name=>'FTM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-top-lg'
,p_group_id=>wwv_flow_api.id(472346087061945925)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a large top margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472346606855945925)
,p_theme_id=>42
,p_name=>'RTM_LARGE'
,p_display_name=>'Large'
,p_display_sequence=>40
,p_css_classes=>'margin-top-lg'
,p_group_id=>wwv_flow_api.id(472346470088945925)
,p_template_types=>'REGION'
,p_help_text=>'Adds a large top margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472346898878945925)
,p_theme_id=>42
,p_name=>'FTM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-top-md'
,p_group_id=>wwv_flow_api.id(472346087061945925)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a medium top margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472347024687945925)
,p_theme_id=>42
,p_name=>'RTM_MEDIUM'
,p_display_name=>'Medium'
,p_display_sequence=>30
,p_css_classes=>'margin-top-md'
,p_group_id=>wwv_flow_api.id(472346470088945925)
,p_template_types=>'REGION'
,p_help_text=>'Adds a medium top margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472347247099945925)
,p_theme_id=>42
,p_name=>'FTM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-top-none'
,p_group_id=>wwv_flow_api.id(472346087061945925)
,p_template_types=>'FIELD'
,p_help_text=>'Removes the top margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472347429372945925)
,p_theme_id=>42
,p_name=>'RTM_NONE'
,p_display_name=>'None'
,p_display_sequence=>10
,p_css_classes=>'margin-top-none'
,p_group_id=>wwv_flow_api.id(472346470088945925)
,p_template_types=>'REGION'
,p_help_text=>'Removes the top margin for this region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472347692016945925)
,p_theme_id=>42
,p_name=>'FTM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-top-sm'
,p_group_id=>wwv_flow_api.id(472346087061945925)
,p_template_types=>'FIELD'
,p_help_text=>'Adds a small top margin for this field.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472347811985945925)
,p_theme_id=>42
,p_name=>'RTM_SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'margin-top-sm'
,p_group_id=>wwv_flow_api.id(472346470088945925)
,p_template_types=>'REGION'
,p_help_text=>'Adds a small top margin to the region.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472348295782945925)
,p_theme_id=>42
,p_name=>'DANGER'
,p_display_name=>'Danger'
,p_display_sequence=>30
,p_css_classes=>'t-Button--danger'
,p_group_id=>wwv_flow_api.id(472348057377945925)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472348680587945925)
,p_theme_id=>42
,p_name=>'LARGEBOTTOMMARGIN'
,p_display_name=>'Large'
,p_display_sequence=>20
,p_css_classes=>'t-Button--gapBottom'
,p_group_id=>wwv_flow_api.id(472348446902945925)
,p_template_types=>'BUTTON'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472349089294945926)
,p_theme_id=>42
,p_name=>'LARGELEFTMARGIN'
,p_display_name=>'Large'
,p_display_sequence=>20
,p_css_classes=>'t-Button--gapLeft'
,p_group_id=>wwv_flow_api.id(472348837201945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472349462996945926)
,p_theme_id=>42
,p_name=>'LARGERIGHTMARGIN'
,p_display_name=>'Large'
,p_display_sequence=>20
,p_css_classes=>'t-Button--gapRight'
,p_group_id=>wwv_flow_api.id(472349273799945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472349846754945926)
,p_theme_id=>42
,p_name=>'LARGETOPMARGIN'
,p_display_name=>'Large'
,p_display_sequence=>20
,p_css_classes=>'t-Button--gapTop'
,p_group_id=>wwv_flow_api.id(472349676016945926)
,p_template_types=>'BUTTON'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472350256054945926)
,p_theme_id=>42
,p_name=>'LARGE'
,p_display_name=>'Large'
,p_display_sequence=>30
,p_css_classes=>'t-Button--large'
,p_group_id=>wwv_flow_api.id(472350048833945926)
,p_template_types=>'BUTTON'
,p_help_text=>'A large button.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472350689278945926)
,p_theme_id=>42
,p_name=>'DISPLAY_AS_LINK'
,p_display_name=>'Display as Link'
,p_display_sequence=>30
,p_css_classes=>'t-Button--link'
,p_group_id=>wwv_flow_api.id(472350441580945926)
,p_template_types=>'BUTTON'
,p_help_text=>'This option makes the button appear as a text link.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472350860683945926)
,p_theme_id=>42
,p_name=>'NOUI'
,p_display_name=>'Remove UI Decoration'
,p_display_sequence=>20
,p_css_classes=>'t-Button--noUI'
,p_group_id=>wwv_flow_api.id(472350441580945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472351065430945926)
,p_theme_id=>42
,p_name=>'SMALLBOTTOMMARGIN'
,p_display_name=>'Small'
,p_display_sequence=>10
,p_css_classes=>'t-Button--padBottom'
,p_group_id=>wwv_flow_api.id(472348446902945925)
,p_template_types=>'BUTTON'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472351277352945926)
,p_theme_id=>42
,p_name=>'SMALLLEFTMARGIN'
,p_display_name=>'Small'
,p_display_sequence=>10
,p_css_classes=>'t-Button--padLeft'
,p_group_id=>wwv_flow_api.id(472348837201945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472351488942945926)
,p_theme_id=>42
,p_name=>'SMALLRIGHTMARGIN'
,p_display_name=>'Small'
,p_display_sequence=>10
,p_css_classes=>'t-Button--padRight'
,p_group_id=>wwv_flow_api.id(472349273799945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472351663811945926)
,p_theme_id=>42
,p_name=>'SMALLTOPMARGIN'
,p_display_name=>'Small'
,p_display_sequence=>10
,p_css_classes=>'t-Button--padTop'
,p_group_id=>wwv_flow_api.id(472349676016945926)
,p_template_types=>'BUTTON'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472352058045945926)
,p_theme_id=>42
,p_name=>'PILL'
,p_display_name=>'Inner Button'
,p_display_sequence=>20
,p_css_classes=>'t-Button--pill'
,p_group_id=>wwv_flow_api.id(472351820779945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472352212008945926)
,p_theme_id=>42
,p_name=>'PILLEND'
,p_display_name=>'Last Button'
,p_display_sequence=>30
,p_css_classes=>'t-Button--pillEnd'
,p_group_id=>wwv_flow_api.id(472351820779945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472352428646945926)
,p_theme_id=>42
,p_name=>'PILLSTART'
,p_display_name=>'First Button'
,p_display_sequence=>10
,p_css_classes=>'t-Button--pillStart'
,p_group_id=>wwv_flow_api.id(472351820779945926)
,p_template_types=>'BUTTON'
,p_help_text=>'Use this for the start of a pill button.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472352637827945926)
,p_theme_id=>42
,p_name=>'PRIMARY'
,p_display_name=>'Primary'
,p_display_sequence=>10
,p_css_classes=>'t-Button--primary'
,p_group_id=>wwv_flow_api.id(472348057377945925)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472352863557945926)
,p_theme_id=>42
,p_name=>'SIMPLE'
,p_display_name=>'Simple'
,p_display_sequence=>10
,p_css_classes=>'t-Button--simple'
,p_group_id=>wwv_flow_api.id(472350441580945926)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472353059928945926)
,p_theme_id=>42
,p_name=>'SMALL'
,p_display_name=>'Small'
,p_display_sequence=>20
,p_css_classes=>'t-Button--small'
,p_group_id=>wwv_flow_api.id(472350048833945926)
,p_template_types=>'BUTTON'
,p_help_text=>'A small button.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472353482363945926)
,p_theme_id=>42
,p_name=>'STRETCH'
,p_display_name=>'Stretch'
,p_display_sequence=>10
,p_css_classes=>'t-Button--stretch'
,p_group_id=>wwv_flow_api.id(472353276575945926)
,p_template_types=>'BUTTON'
,p_help_text=>'Stretches button to fill container'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472353657228945926)
,p_theme_id=>42
,p_name=>'SUCCESS'
,p_display_name=>'Success'
,p_display_sequence=>40
,p_css_classes=>'t-Button--success'
,p_group_id=>wwv_flow_api.id(472348057377945925)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472353835504945926)
,p_theme_id=>42
,p_name=>'TINY'
,p_display_name=>'Tiny'
,p_display_sequence=>10
,p_css_classes=>'t-Button--tiny'
,p_group_id=>wwv_flow_api.id(472350048833945926)
,p_template_types=>'BUTTON'
,p_help_text=>'A very small button.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472354083691945926)
,p_theme_id=>42
,p_name=>'WARNING'
,p_display_name=>'Warning'
,p_display_sequence=>20
,p_css_classes=>'t-Button--warning'
,p_group_id=>wwv_flow_api.id(472348057377945925)
,p_template_types=>'BUTTON'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472354488168945926)
,p_theme_id=>42
,p_name=>'SHOWFORMLABELSABOVE'
,p_display_name=>'Show Form Labels Above'
,p_display_sequence=>10
,p_css_classes=>'t-Form--labelsAbove'
,p_group_id=>wwv_flow_api.id(472354219583945926)
,p_template_types=>'REGION'
,p_help_text=>'Show form labels above input fields.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472354835011945926)
,p_theme_id=>42
,p_name=>'FORMSIZELARGE'
,p_display_name=>'Large'
,p_display_sequence=>10
,p_css_classes=>'t-Form--large'
,p_group_id=>wwv_flow_api.id(472354685981945926)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472355261492945926)
,p_theme_id=>42
,p_name=>'FORMLEFTLABELS'
,p_display_name=>'Left'
,p_display_sequence=>20
,p_css_classes=>'t-Form--leftLabels'
,p_group_id=>wwv_flow_api.id(472355097301945926)
,p_template_types=>'REGION'
,p_help_text=>'Align form labels to left.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472355672793945928)
,p_theme_id=>42
,p_name=>'FORMREMOVEPADDING'
,p_display_name=>'Remove Padding'
,p_display_sequence=>20
,p_css_classes=>'t-Form--noPadding'
,p_group_id=>wwv_flow_api.id(472355482151945928)
,p_template_types=>'REGION'
,p_help_text=>'Removes padding between items.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472355803087945928)
,p_theme_id=>42
,p_name=>'FORMSLIMPADDING'
,p_display_name=>'Slim Padding'
,p_display_sequence=>10
,p_css_classes=>'t-Form--slimPadding'
,p_group_id=>wwv_flow_api.id(472355482151945928)
,p_template_types=>'REGION'
,p_help_text=>'Reduces form item padding to 4px.'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472356292002945928)
,p_theme_id=>42
,p_name=>'STRETCH_FORM_FIELDS'
,p_display_name=>'Stretch Form Fields'
,p_display_sequence=>10
,p_css_classes=>'t-Form--stretchInputs'
,p_group_id=>wwv_flow_api.id(472356025366945928)
,p_template_types=>'REGION'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472356451215945928)
,p_theme_id=>42
,p_name=>'FORMSIZEXLARGE'
,p_display_name=>'X Large'
,p_display_sequence=>20
,p_css_classes=>'t-Form--xlarge'
,p_group_id=>wwv_flow_api.id(472354685981945926)
,p_template_types=>'REGION'
,p_is_advanced=>'N'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472356881677945928)
,p_theme_id=>42
,p_name=>'LARGE_FIELD'
,p_display_name=>'Large'
,p_display_sequence=>10
,p_css_classes=>'t-Form-fieldContainer--large'
,p_group_id=>wwv_flow_api.id(472356612636945928)
,p_template_types=>'FIELD'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472357286238945928)
,p_theme_id=>42
,p_name=>'POST_TEXT_BLOCK'
,p_display_name=>'Display as Block'
,p_display_sequence=>10
,p_css_classes=>'t-Form-fieldContainer--postTextBlock'
,p_group_id=>wwv_flow_api.id(472357095719945928)
,p_template_types=>'FIELD'
,p_help_text=>'Displays the Item Post Text in a block style immediately after the item.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472357625402945928)
,p_theme_id=>42
,p_name=>'PRE_TEXT_BLOCK'
,p_display_name=>'Display as Block'
,p_display_sequence=>10
,p_css_classes=>'t-Form-fieldContainer--preTextBlock'
,p_group_id=>wwv_flow_api.id(472357428376945928)
,p_template_types=>'FIELD'
,p_help_text=>'Displays the Item Pre Text in a block style immediately before the item.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472358015224945928)
,p_theme_id=>42
,p_name=>'DISPLAY_AS_PILL_BUTTON'
,p_display_name=>'Display as Pill Button'
,p_display_sequence=>10
,p_css_classes=>'t-Form-fieldContainer--radioButtonGroup'
,p_group_id=>wwv_flow_api.id(472357879436945928)
,p_template_types=>'FIELD'
,p_help_text=>'Displays the radio buttons to look like a button set / pill button.  Note that the the radio buttons must all be in the same row for this option to work.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472358230682945928)
,p_theme_id=>42
,p_name=>'STRETCH_FORM_ITEM'
,p_display_name=>'Stretch Form Item'
,p_display_sequence=>10
,p_css_classes=>'t-Form-fieldContainer--stretchInputs'
,p_template_types=>'FIELD'
,p_help_text=>'Stretches the form item to fill its container.'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472358420245945928)
,p_theme_id=>42
,p_name=>'X_LARGE_SIZE'
,p_display_name=>'X Large'
,p_display_sequence=>20
,p_css_classes=>'t-Form-fieldContainer--xlarge'
,p_group_id=>wwv_flow_api.id(472356612636945928)
,p_template_types=>'FIELD'
);
wwv_flow_api.create_template_option(
 p_id=>wwv_flow_api.id(472358818128945928)
,p_theme_id=>42
,p_name=>'HIDE_WHEN_ALL_ROWS_DISPLAYED'
,p_display_name=>'Hide when all rows displayed'
,p_display_sequence=>10
,p_css_classes=>'t-Report--hideNoPagination'
,p_group_id=>wwv_flow_api.id(472358634682945928)
,p_template_types=>'REPORT'
,p_help_text=>'This option will hide the pagination when all rows are displayed.'
);
end;
/
prompt --application/shared_components/globalization/language
begin
null;
end;
/
prompt --application/shared_components/logic/build_options
begin
null;
end;
/
prompt --application/shared_components/globalization/messages
begin
null;
end;
/
prompt --application/shared_components/globalization/dyntranslations
begin
null;
end;
/
prompt --application/shared_components/user_interface/shortcuts/delete_confirm_msg
begin
wwv_flow_api.create_shortcut(
 p_id=>wwv_flow_api.id(472362544334945953)
,p_shortcut_name=>'DELETE_CONFIRM_MSG'
,p_shortcut_type=>'TEXT_ESCAPE_JS'
,p_shortcut=>'Would you like to perform this delete action?'
);
end;
/
prompt --application/shared_components/security/authentications/application_express_authentication
begin
wwv_flow_api.create_authentication(
 p_id=>wwv_flow_api.id(472220635047945851)
,p_name=>'Application Express Authentication'
,p_scheme_type=>'NATIVE_CUSTOM'
,p_attribute_03=>'spcki_auth_pkg.authenticate'
,p_attribute_05=>'N'
,p_invalid_session_type=>'LOGIN'
,p_use_secure_cookie_yn=>'N'
,p_ras_mode=>0
);
end;
/
prompt --application/user_interfaces
begin
wwv_flow_api.create_user_interface(
 p_id=>wwv_flow_api.id(472359594532945931)
,p_ui_type_name=>'DESKTOP'
,p_display_name=>'Desktop'
,p_display_seq=>10
,p_use_auto_detect=>false
,p_is_default=>true
,p_theme_id=>42
,p_home_url=>'f?p=&APP_ID.:1:&SESSION.'
,p_login_url=>'f?p=&APP_ID.:LOGIN:&APP_SESSION.::&DEBUG.:::'
,p_theme_style_by_user_pref=>false
,p_built_with_love=>false
,p_global_page_id=>0
,p_navigation_list_id=>wwv_flow_api.id(472221404925945854)
,p_navigation_list_position=>'SIDE'
,p_navigation_list_template_id=>wwv_flow_api.id(472323411914945904)
,p_nav_list_template_options=>'#DEFAULT#:t-TreeNav--styleA:js-navCollapsed--hidden'
,p_css_file_urls=>'#APP_IMAGES#app-icon.css?version=#APP_VERSION#'
,p_nav_bar_type=>'LIST'
,p_nav_bar_list_id=>wwv_flow_api.id(472359290854945929)
,p_nav_bar_list_template_id=>wwv_flow_api.id(472326048549945906)
,p_nav_bar_template_options=>'#DEFAULT#'
);
end;
/
prompt --application/user_interfaces/combined_files
begin
null;
end;
/
prompt --application/pages/page_00000
begin
wwv_flow_api.create_page(
 p_id=>0
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Global Page - Desktop'
,p_step_title=>'Global Page - Desktop'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_protection_level=>'D'
,p_last_upd_yyyymmddhh24miss=>'20261014024003'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472902381580260851)
,p_plug_name=>'SPCKI Global Engine'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>10
,p_plug_display_point=>'AFTER_HEADER'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<!-- Multi-CDN High-Availability Chart.js Engine -->',
'<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>',
'<script>',
'if (typeof Chart === ''undefined'') {',
'  var s = document.createElement(''script'');',
'  s.src = ''https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'';',
'  document.head.appendChild(s);',
'}',
'</script>',
'',
'<style>',
'/* ==========================================================================',
'   SPCKI PLATFORM - HIGH-VISIBILITY & ACCESSIBLE ENTERPRISE THEME',
'   Bigger text, high contrast, clean line dividers, actor role-gated UI',
'   ========================================================================== */',
'',
'@import url(''https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'');',
'',
':root {',
'  --spcki-font: ''Plus Jakarta Sans'', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
'  --spcki-bg: #f8fafc;',
'  --spcki-surface: #ffffff;',
'  --spcki-border: #e2e8f0;',
'  --spcki-text-main: #0f172a;',
'  --spcki-text-body: #1e293b;',
'  --spcki-text-muted: #64748b;',
'  --spcki-primary: #0f172a;',
'}',
'',
'body, .t-Body, .t-PageBody, .t-Dialog-body {',
'  font-family: var(--spcki-font) !important;',
'  background-color: var(--spcki-bg) !important;',
'  color: var(--spcki-text-body) !important;',
'  font-size: 17px !important;',
'  line-height: 1.6 !important;',
'  -webkit-font-smoothing: antialiased;',
'  letter-spacing: -0.01em;',
'}',
'',
'/* 1. Header Branding & Profile */',
'.t-Header-branding {',
'  background: #0f172a !important;',
'  border-bottom: 1px solid #1e293b !important;',
'  box-shadow: none !important;',
'  padding: 0 24px !important;',
'}',
'',
'.t-Header-logo-link {',
'  color: #f8fafc !important;',
'  font-weight: 800 !important;',
'  font-size: 1.25rem !important;',
'  letter-spacing: -0.02em !important;',
'}',
'',
'.t-Header-nav .t-Button, ',
'.t-Header-nav .t-Button--navBar, ',
'.t-Header .t-Button--navBar {',
'  color: #cbd5e1 !important;',
'  font-size: 0.96rem !important;',
'  font-weight: 600 !important;',
'}',
'',
'/* 2. Side Navigation */',
'.t-TreeNav {',
'  background: #0f172a !important;',
'  border-right: 1px solid #1e293b !important;',
'}',
'',
'.t-TreeNav .a-TreeView-node--topLevel > .a-TreeView-content {',
'  color: #94a3b8 !important;',
'  font-weight: 600 !important;',
'  font-size: 1.02rem !important;',
'  border-radius: 6px !important;',
'  margin: 3px 8px !important;',
'  padding: 12px 18px !important;',
'  transition: all 0.15s ease !important;',
'}',
'',
'.t-TreeNav .a-TreeView-node--topLevel > .a-TreeView-content:hover {',
'  background: rgba(255, 255, 255, 0.08) !important;',
'  color: #ffffff !important;',
'}',
'',
'.t-TreeNav .a-TreeView-node--topLevel.is-current > .a-TreeView-content {',
'  background: #1e293b !important;',
'  color: #38bdf8 !important;',
'  font-weight: 700 !important;',
'}',
'',
'/* 3. Universal Button & Inputs */',
'.t-Button {',
'  font-family: var(--spcki-font) !important;',
'  font-size: 0.96rem !important;',
'  font-weight: 600 !important;',
'  border-radius: 6px !important;',
'  box-shadow: none !important;',
'  padding: 10px 20px !important;',
'  transition: all 0.15s ease !important;',
'}',
'',
'.t-Button--primary, .t-Button--hot {',
'  background: var(--spcki-primary) !important;',
'  color: #ffffff !important;',
'  border: 1px solid var(--spcki-primary) !important;',
'}',
'',
'.t-Form-inputContainer input, ',
'.t-Form-inputContainer select, ',
'.t-Form-inputContainer textarea {',
'  border-radius: 6px !important;',
'  border: 1px solid var(--spcki-border) !important;',
'  padding: 12px 16px !important;',
'  font-size: 1.05rem !important;',
'  color: var(--spcki-text-main) !important;',
'}',
'',
'.t-Form-label {',
'  font-size: 1rem !important;',
'  font-weight: 700 !important;',
'  color: #334155 !important;',
'}',
'',
'/* 4. High-Visibility Tables & Reports */',
'.t-Region {',
'  border: none !important;',
'  border-radius: 0 !important;',
'  background: transparent !important;',
'  box-shadow: none !important;',
'  margin-bottom: 28px !important;',
'}',
'',
'.t-Region-header {',
'  border-bottom: 1px solid var(--spcki-border) !important;',
'  padding: 18px 0 !important;',
'  background: transparent !important;',
'}',
'',
'.t-Region-title {',
'  font-size: 1.35rem !important;',
'  font-weight: 800 !important;',
'  color: var(--spcki-text-main) !important;',
'}',
'',
'.t-Report-report, .a-IRR-table {',
'  border: none !important;',
'  width: 100% !important;',
'  background: #ffffff !important;',
'  border-collapse: collapse !important;',
'  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.02) !important;',
'}',
'',
'.t-Report-report th, .a-IRR-header {',
'  background: #f1f5f9 !important;',
'  color: #334155 !important;',
'  font-size: 0.9rem !important;',
'  font-weight: 800 !important;',
'  text-transform: uppercase !important;',
'  letter-spacing: 0.05em !important;',
'  padding: 16px 20px !important;',
'  border-top: 1px solid var(--spcki-border) !important;',
'  border-bottom: 2px solid var(--spcki-border) !important;',
'  border-left: none !important;',
'  border-right: none !important;',
'}',
'',
'.t-Report-report td, .a-IRR-data {',
'  padding: 16px 20px !important;',
'  font-size: 1.02rem !important;',
'  color: #0f172a !important;',
'  font-weight: 500 !important;',
'  border-top: none !important;',
'  border-bottom: 1px solid #f1f5f9 !important;',
'  border-left: none !important;',
'  border-right: none !important;',
'}',
'',
'.t-Report-report tr:hover td, .a-IRR-table tbody tr:hover td {',
'  background: #f8fafc !important;',
'}',
'',
'/* 5. Floating Toast Notification Banner */',
'#spcki-toast-container {',
'  position: fixed;',
'  top: 24px;',
'  right: 24px;',
'  z-index: 9999999;',
'  display: flex;',
'  flex-direction: column;',
'  gap: 12px;',
'  pointer-events: none;',
'}',
'',
'.spcki-toast {',
'  pointer-events: auto;',
'  display: flex;',
'  align-items: flex-start;',
'  gap: 14px;',
'  min-width: 360px;',
'  max-width: 480px;',
'  background: #ffffff;',
'  color: #0f172a;',
'  border-left: 6px solid #10b981;',
'  border-top: 1px solid #e2e8f0;',
'  border-right: 1px solid #e2e8f0;',
'  border-bottom: 1px solid #e2e8f0;',
'  border-radius: 8px;',
'  padding: 18px 22px;',
'  box-shadow: 0 16px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.06);',
'  animation: spckiSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;',
'  transition: opacity 0.25s ease, transform 0.25s ease;',
'}',
'',
'.spcki-toast.fade-out {',
'  opacity: 0;',
'  transform: translateY(-12px);',
'}',
'',
'@keyframes spckiSlideIn {',
'  from { opacity: 0; transform: translateY(-16px) scale(0.96); }',
'  to { opacity: 1; transform: translateY(0) scale(1); }',
'}',
'',
'.spcki-toast-icon {',
'  width: 26px;',
'  height: 26px;',
'  flex-shrink: 0;',
'  color: #10b981;',
'  margin-top: 2px;',
'}',
'',
'.spcki-toast-title {',
'  font-size: 1rem;',
'  font-weight: 700;',
'  color: #065f46;',
'  margin-bottom: 4px;',
'}',
'',
'.spcki-toast-msg {',
'  font-size: 0.95rem;',
'  color: #334155;',
'  line-height: 1.45;',
'}',
'',
'.spcki-toast-close {',
'  background: transparent;',
'  border: none;',
'  color: #94a3b8;',
'  cursor: pointer;',
'  padding: 2px;',
'  font-size: 1.2rem;',
'}',
'',
'/* 6. ACTOR ROLE RESTRICTION RULES */',
'body.actor-donor .spcki-act-btn,',
'body.actor-donor .spcki-edit-btn,',
'body.actor-donor .a-IRR-button,',
'body.actor-donor button[data-action="create"],',
'body.actor-donor .t-Button--hot {',
'  display: none !important;',
'}',
'',
'body.actor-donor .spcki-donor-banner {',
'  display: flex !important;',
'}',
'',
'/* 7. RESPONSIVE MOBILE STYLES */',
'@media (max-width: 768px) {',
'  body {',
'    font-size: 15px !important;',
'  }',
'  .t-Body-contentInner {',
'    padding: 12px 14px !important;',
'  }',
'  .spcki-header-flex {',
'    flex-direction: column !important;',
'    align-items: flex-start !important;',
'  }',
'  .spcki-kpi-grid {',
'    grid-template-columns: repeat(2, 1fr) !important;',
'  }',
'  .spcki-charts-grid {',
'    grid-template-columns: 1fr !important;',
'  }',
'}',
'</style>',
'',
'<div id="spcki-toast-container"></div>',
'',
'<script>',
'// ============================================================================',
'// GLOBAL JAVASCRIPT ON ALL PAGES:',
'// 1. Toast notifications & dialog refresh',
'// 2. Real Authenticated Actor detection & navigation/page gating',
'// ============================================================================',
'(function() {',
'  function getJQuery() {',
'    return (window.apex && window.apex.jQuery) ? window.apex.jQuery : (window.jQuery || null);',
'  }',
'',
'  // Toast Function',
'  window.spckiShowToast = function(msg, title) {',
'    title = title || ''Success'';',
'    msg = msg || ''Action completed successfully.'';',
'',
'    var container = document.getElementById(''spcki-toast-container'');',
'    if (!container) {',
'      container = document.createElement(''div'');',
'      container.id = ''spcki-toast-container'';',
'      document.body.appendChild(container);',
'    }',
'',
'    var toast = document.createElement(''div'');',
'    toast.className = ''spcki-toast'';',
'    toast.innerHTML = ',
'      ''<svg class="spcki-toast-icon" viewBox="0 0 20 20" fill="currentColor">'' +',
'      ''  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />'' +',
'      ''</svg>'' +',
'      ''<div class="spcki-toast-body">'' +',
'      ''  <div class="spcki-toast-title">'' + title + ''</div>'' +',
'      ''  <div class="spcki-toast-msg">'' + msg + ''</div>'' +',
'      ''</div>'' +',
'      ''<button class="spcki-toast-close" onclick="this.parentElement.remove()" title="Close">&times;</button>'';',
'',
'    container.appendChild(toast);',
'',
'    setTimeout(function() {',
'      toast.classList.add(''fade-out'');',
'      setTimeout(function() {',
'        if (toast.parentElement) toast.remove();',
'      }, 300);',
'    }, 4500);',
'  };',
'',
'  // Flash Toast persistence across reloads',
'  try {',
'    var flash = sessionStorage.getItem(''spcki_flash_toast'');',
'    if (flash) {',
'      sessionStorage.removeItem(''spcki_flash_toast'');',
'      setTimeout(function() { window.spckiShowToast(flash); }, 250);',
'    }',
'  } catch(e) {}',
'',
'  // Determine Actor Role from Authenticated User',
'  var rawUser = (''&APP_USER.'').toLowerCase();',
'  var userRole = ''ADMIN'';',
'',
'  if (rawUser === ''field'') {',
'    userRole = ''FIELD'';',
'  } else if (rawUser === ''technical'') {',
'    userRole = ''TECHNICAL'';',
'  } else if (rawUser === ''viewer'' || rawUser === ''donor'') {',
'    userRole = ''DONOR'';',
'  } else {',
'    userRole = ''ADMIN'';',
'  }',
'',
'  // Apply role class to body',
'  document.body.classList.add(''actor-'' + userRole.toLowerCase());',
'',
'  // Navigation & Page Gating',
'  function applyActorGating() {',
'    var $ = getJQuery();',
'    if (!$) { setTimeout(applyActorGating, 50); return; }',
'',
'    var path = window.location.href;',
'',
'    // 1. FIELD USER GATING:',
'    // Field user only entries cooking sessions and feedback.',
'    if (userRole === ''FIELD'') {',
'      // If landed on Home (Page 1), redirect to Cooking Sessions (Page 2)',
'      if (path.indexOf(''/home'') !== -1 || path.indexOf('':1:'') !== -1) {',
'        window.location.href = ''f?p=&APP_ID.:2:&SESSION.:::'';',
'        return;',
'      }',
'      // Hide Technical & Generator links in sidebar navigation',
'      $(''.a-TreeView-label'').each(function() {',
'        var txt = $(this).text().trim().toLowerCase();',
'        if (txt.indexOf(''daily technical'') !== -1 || txt.indexOf(''generator'') !== -1) {',
'          $(this).closest(''.a-TreeView-node'').hide();',
'        }',
'      });',
'    }',
'',
'    // 2. TECHNICAL USER GATING:',
'    // Technical user logs solar & generator details.',
'    if (userRole === ''TECHNICAL'') {',
'      // If landed on Home (Page 1), redirect to Daily Technical Logs (Page 5)',
'      if (path.indexOf(''/home'') !== -1 || path.indexOf('':1:'') !== -1) {',
'        window.location.href = ''f?p=&APP_ID.:5:&SESSION.:::'';',
'        return;',
'      }',
'      // Hide Cooking Sessions, Households, Slots, Feedback from navigation',
'      $(''.a-TreeView-label'').each(function() {',
'        var txt = $(this).text().trim().toLowerCase();',
'        if (txt.indexOf(''cooking'') !== -1 || txt.indexOf(''households'') !== -1 || txt.indexOf(''feedback'') !== -1) {',
'          $(this).closest(''.a-TreeView-node'').hide();',
'        }',
'      });',
'    }',
'',
'    // 3. DONOR / VIEWER GATING:',
'    // Donor can see everything, but read-only without data entry or edits.',
'    if (userRole === ''DONOR'') {',
'      $(''.a-IRR-button'').hide();',
'      $(''button[data-action="create"]'').hide();',
'      $(''.spcki-act-btn'').hide();',
'      $(''.spcki-edit-btn'').hide();',
'    }',
'',
'    // Update Profile text in header to show the authenticated actor',
'    var profileText = $(''.t-Header-nav .t-Button--navBar, #t_Menu_profile, .t-Button--navBar'').first();',
'    var roleBadges = {',
unistr('      ''ADMIN'': ''\D83D\DC51 Administrator ('' + rawUser + '')'','),
unistr('      ''FIELD'': ''\D83D\DCCB Field Officer ('' + rawUser + '')'','),
unistr('      ''TECHNICAL'': ''\26A1 Technical Specialist ('' + rawUser + '')'','),
unistr('      ''DONOR'': ''\D83D\DC41\FE0F Donor Viewer ('' + rawUser + '')'''),
'    };',
'    if (profileText.length) {',
'      profileText.html(''<span class="fa fa-user-circle" style="margin-right:6px;"></span>'' + (roleBadges[userRole] || rawUser));',
'    }',
'  }',
'',
'  // Dialog close listener for all pages',
'  function initDialogListener() {',
'    var $ = getJQuery();',
'    if (!$) { setTimeout(initDialogListener, 50); return; }',
'',
'    $(document).on(''apexafterclosedialog'', function(e, data) {',
'      var msg = ''Record successfully saved.'';',
'      if (data && data.successMessage) {',
'        msg = data.successMessage.text || data.successMessage || msg;',
'      }',
'      window.spckiShowToast(msg);',
'',
'      if ($(''.a-IRR-table'').length > 0) {',
'        $(''.a-IRR-table'').trigger(''apexrefresh'');',
'      }',
'',
'      if (window.location.href.indexOf(''/home'') !== -1 || window.location.href.indexOf('':1:'') !== -1) {',
'        setTimeout(function() {',
'          sessionStorage.setItem(''spcki_flash_toast'', msg);',
'          window.location.reload();',
'        }, 1200);',
'      }',
'    });',
'',
'    if (window.apex && window.apex.message && !window.spckiApexMsgHooked) {',
'      window.spckiApexMsgHooked = true;',
'      var origShowSuccess = window.apex.message.showPageSuccess;',
'      window.apex.message.showPageSuccess = function(msg) {',
'        if (origShowSuccess) origShowSuccess.apply(this, arguments);',
'        window.spckiShowToast(msg);',
'      };',
'    }',
'  }',
'',
'  if (document.readyState === ''loading'') {',
'    document.addEventListener(''DOMContentLoaded'', function() {',
'      applyActorGating();',
'      initDialogListener();',
'    });',
'  } else {',
'    applyActorGating();',
'    initDialogListener();',
'  }',
'})();',
'</script>',
''))
,p_plug_display_condition_type=>'PLSQL_EXPRESSION'
,p_plug_display_when_condition=>':APP_PAGE_ID != 9999'
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
end;
/
prompt --application/pages/page_00001
begin
wwv_flow_api.create_page(
 p_id=>1
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Home'
,p_alias=>'HOME'
,p_step_title=>'SPCKI Monitoring Platform'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_last_upd_yyyymmddhh24miss=>'20261014025205'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472902556532260860)
,p_plug_name=>'Header'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  v_url_12 VARCHAR2(1000);',
'  v_url_15 VARCHAR2(1000);',
'  v_url_16 VARCHAR2(1000);',
'  v_user_role VARCHAR2(50) := spcki_auth_pkg.get_user_role(v(''APP_USER''));',
'BEGIN',
'  v_url_12 := apex_util.prepare_url(''f?p='' || v(''APP_ID'') || '':12:'' || v(''APP_SESSION'') || ''::NO:12::'');',
'  v_url_15 := apex_util.prepare_url(''f?p='' || v(''APP_ID'') || '':15:'' || v(''APP_SESSION'') || ''::NO:15::'');',
'  v_url_16 := apex_util.prepare_url(''f?p='' || v(''APP_ID'') || '':16:'' || v(''APP_SESSION'') || ''::NO:16::'');',
'',
'  htp.p(''<div style="padding:14px 0 24px 0; border-bottom:1px solid #cbd5e1; margin-bottom:32px;">'');',
'  htp.p(''  <div class="spcki-header-flex" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">'');',
'  ',
'  -- Title & Subtitle',
'  htp.p(''    <div>'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#475569; margin-bottom:6px;">'');',
'  htp.p(''        COMMUNITY MICROGRID & COOKING MONITORING'');',
'  htp.p(''      </div>'');',
'  htp.p(''      <h1 style="margin:0; font-size:2.65rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; line-height:1.2;">'');',
'  htp.p(''        SPCKI Command Center'');',
'  htp.p(''      </h1>'');',
'  htp.p(''      <p style="margin:8px 0 0 0; color:#475569; font-size:1.25rem; font-weight:500;">'');',
'  htp.p(''        Clean cooking transition, solar microgrid metrics & pilot operational logs'');',
'  htp.p(''      </p>'');',
'  htp.p(''    </div>'');',
'',
'  -- Role Badge',
'  htp.p(''    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">'');',
'  IF v_user_role = ''DONOR'' THEN',
'    htp.p(''      <span style="display:inline-flex; align-items:center; gap:8px; background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-eye"></span> Do'
||'nor Executive View (Read-Only)</span>'');',
'  ELSIF v_user_role = ''FIELD'' THEN',
'    htp.p(''      <span style="display:inline-flex; align-items:center; gap:8px; background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-cutlery"></span'
||'> Field Officer Entry Mode</span>'');',
'  ELSIF v_user_role = ''TECHNICAL'' THEN',
'    htp.p(''      <span style="display:inline-flex; align-items:center; gap:8px; background:#fefce8; color:#854d0e; border:1px solid #fef08a; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-bolt"></span> T'
||'echnical Specialist Mode</span>'');',
'  ELSE',
'    htp.p(''      <span style="display:inline-flex; align-items:center; gap:8px; background:#f8fafc; color:#0f172a; border:1px solid #cbd5e1; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-shield"></span>'
||' Administrator Mode</span>'');',
'  END IF;',
'',
'  -- Quick Action Buttons',
'  IF v_user_role != ''DONOR'' THEN',
'    htp.p(''      <div class="spcki-action-btns-wrap" style="display:flex; gap:10px; flex-wrap:wrap;">'');',
'    htp.p(''        <a href="'' || v_url_12 || ''" class="spcki-act-btn" style="display:inline-flex; align-items:center; gap:8px; padding:12px 22px; background:#0f172a; color:#ffffff; font-size:1.1rem; font-weight:700; border-radius:8px; text-decoration'
||':none; box-shadow:0 2px 6px rgba(15,23,42,0.12);">'');',
'    htp.p(''          <span class="fa fa-plus" aria-hidden="true"></span> Log Session'');',
'    htp.p(''        </a>'');',
'    htp.p(''        <a href="'' || v_url_15 || ''" class="spcki-act-btn" style="display:inline-flex; align-items:center; gap:8px; padding:12px 20px; background:#ffffff; color:#1e293b; border:1px solid #cbd5e1; font-size:1.1rem; font-weight:700; border-r'
||'adius:8px; text-decoration:none;">'');',
'    htp.p(''          <span class="fa fa-sun-o" aria-hidden="true"></span> Solar & SOC'');',
'    htp.p(''        </a>'');',
'    htp.p(''        <a href="'' || v_url_16 || ''" class="spcki-act-btn" style="display:inline-flex; align-items:center; gap:8px; padding:12px 20px; background:#ffffff; color:#1e293b; border:1px solid #cbd5e1; font-size:1.1rem; font-weight:700; border-r'
||'adius:8px; text-decoration:none;">'');',
'    htp.p(''          <span class="fa fa-cogs" aria-hidden="true"></span> Generator'');',
'    htp.p(''        </a>'');',
'    htp.p(''      </div>'');',
'  END IF;',
'',
'  htp.p(''    </div>'');',
'  htp.p(''  </div>'');',
'  htp.p(''</div>'');',
'END;',
''))
,p_plug_source_type=>'NATIVE_PLSQL'
,p_attribute_01=>'N'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472902609387260860)
,p_plug_name=>'Key Indicators'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'BODY'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  v_hh NUMBER;',
'  v_sessions NUMBER;',
'  v_persons NUMBER;',
'  v_hours NUMBER;',
'  v_wasted NUMBER;',
'BEGIN',
'  SELECT count(*) INTO v_hh FROM households;',
'  SELECT count(*), round(sum(duration_min)/60.0, 1), sum(persons_cooked_for) ',
'  INTO v_sessions, v_hours, v_persons FROM cooking_sessions;',
'  SELECT NVL(round(avg(duration_min), 0), 120) INTO v_wasted FROM cooking_sessions;',
'',
'  htp.p(''<div style="background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:28px 0; margin-bottom:40px;">'');',
'  htp.p(''  <div class="spcki-kpi-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">'');',
'',
'  -- Metric 1: Households',
'  htp.p(''    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Active Households</div>'');',
'  htp.p(''      <div class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">'' || v_hh || '' <span style="font-size:1.45rem; font-weight:600; color:#64748b;">/ '' || v_hh || ''</span><'
||'/div>'');',
'  htp.p(''      <div style="font-size:1.15rem; color:#059669; font-weight:700; display:flex; align-items:center; gap:8px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#059669;"></span> 100% participation</'
||'div>'');',
'  htp.p(''    </div>'');',
'',
'  -- Metric 2: Sessions',
'  htp.p(''    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Cooking Sessions</div>'');',
'  htp.p(''      <div id="kpi-sessions-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">'' || v_sessions || ''</div>'');',
'  htp.p(''      <div id="kpi-hours-desc" style="font-size:1.15rem; color:#475569; font-weight:600;">'' || v_hours || '' total hours logged</div>'');',
'  htp.p(''    </div>'');',
'',
'  -- Metric 3: People Fed',
'  htp.p(''    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">People Fed</div>'');',
'  htp.p(''      <div id="kpi-persons-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">'' || v_persons || ''</div>'');',
'  htp.p(''      <div style="font-size:1.15rem; color:#475569; font-weight:600;">Communal meals served</div>'');',
'  htp.p(''    </div>'');',
'',
'  -- Metric 4: Avg Cooking Time',
'  htp.p(''    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Avg Cooking Time</div>'');',
'  htp.p(''      <div id="kpi-duration-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">'' || v_wasted || '' <span style="font-size:1.45rem; font-weight:600; color:#64748b;'
||'">min</span></div>'');',
'  htp.p(''      <div style="font-size:1.15rem; color:#475569; font-weight:600;">Per meal preparation</div>'');',
'  htp.p(''    </div>'');',
'',
'  -- Metric 5: Clean Solar Share',
'  htp.p(''    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Clean Solar Share</div>'');',
'  htp.p(''      <div id="kpi-solar-share-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">82%</div>'');',
'  htp.p(''      <div style="font-size:1.15rem; color:#059669; font-weight:700; display:flex; align-items:center; gap:8px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#059669;"></span> Solar & battery buff'
||'ered</div>'');',
'  htp.p(''    </div>'');',
'',
'  -- Metric 6: Safety Incidents',
'  htp.p(''    <div class="spcki-kpi-item" style="padding:6px 24px;">'');',
'  htp.p(''      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Safety Incidents</div>'');',
'  htp.p(''      <div class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">0 <span style="font-size:1.45rem; font-weight:600; color:#64748b;">/ 0</span></div>'');',
'  htp.p(''      <div style="font-size:1.15rem; color:#059669; font-weight:700; display:flex; align-items:center; gap:8px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#059669;"></span> 100% safe operation<'
||'/div>'');',
'  htp.p(''    </div>'');',
'',
'  htp.p(''  </div>'');',
'  htp.p(''</div>'');',
'END;',
''))
,p_plug_source_type=>'NATIVE_PLSQL'
,p_attribute_01=>'N'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472902718527260860)
,p_plug_name=>'Analytics & Visualizations'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>25
,p_plug_display_point=>'BODY'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  v_solar_json CLOB := spcki_dashboard_pkg.get_solar_trend_json();',
'  v_battery_json CLOB := spcki_dashboard_pkg.get_battery_soc_json();',
'  v_slot_json CLOB := spcki_dashboard_pkg.get_slot_utilisation_json();',
'  v_sessions_json CLOB := spcki_dashboard_pkg.get_sessions_trend_json();',
'  v_sat_json CLOB := spcki_dashboard_pkg.get_satisfaction_trend_json();',
'BEGIN',
'  -- Unconditionally load Chart.js engine',
'  htp.p(''<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>'');',
'',
'  -- Top Filter Header (Universal Time Filters: 1D, 3D, 7D, 1M, 3M, All)',
'  htp.p(''<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:18px; margin-bottom:32px; padding-bottom:20px; border-bottom:1px solid #cbd5e1;">'');',
'  htp.p(''  <div>'');',
'  htp.p(''    <h2 style="margin:0; font-size:1.95rem; font-weight:800; color:#0f172a; letter-spacing:-0.02em;">Microgrid & Pilot Analytics</h2>'');',
'  htp.p(''    <p style="margin:6px 0 0 0; font-size:1.18rem; color:#475569; font-weight:500;">Universal real-time filtering across generation, battery storage, and community usage</p>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div class="spcki-filter-toolbar-wrap" style="display:flex; align-items:center; gap:8px; background:#ffffff; padding:6px 10px; border:1px solid #cbd5e1; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">'');',
'  htp.p(''    <span style="font-size:1.02rem; font-weight:800; color:#334155; text-transform:uppercase; letter-spacing:0.06em; margin-right:10px; padding-left:8px;">Time Range:</span>'');',
'  htp.p(''    <button type="button" class="spcki-tf-btn" data-days="1" onclick="window.spckiSetFilter(1, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:70'
||'0; cursor:pointer; transition:all 0.15s ease;">1 Day</button>'');',
'  htp.p(''    <button type="button" class="spcki-tf-btn" data-days="3" onclick="window.spckiSetFilter(3, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:70'
||'0; cursor:pointer; transition:all 0.15s ease;">3 Days</button>'');',
'  htp.p(''    <button type="button" class="spcki-tf-btn" data-days="7" onclick="window.spckiSetFilter(7, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:70'
||'0; cursor:pointer; transition:all 0.15s ease;">7 Days</button>'');',
'  htp.p(''    <button type="button" class="spcki-tf-btn" data-days="30" onclick="window.spckiSetFilter(30, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:'
||'700; cursor:pointer; transition:all 0.15s ease;">1 Month</button>'');',
'  htp.p(''    <button type="button" class="spcki-tf-btn" data-days="90" onclick="window.spckiSetFilter(90, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:'
||'700; cursor:pointer; transition:all 0.15s ease;">3 Months</button>'');',
'  htp.p(''    <button type="button" class="spcki-tf-btn spcki-tf-active" data-days="999" onclick="window.spckiSetFilter(999, this)" style="padding:10px 22px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:1.0'
||'5rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">All</button>'');',
'  htp.p(''  </div>'');',
'  htp.p(''</div>'');',
'',
'  -- Responsive Charts Grid',
'  htp.p(''<div class="spcki-charts-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(480px, 1fr)); gap:32px; margin-bottom:48px;">'');',
'',
'  -- Chart 1: Solar Generation vs Consumption',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Solar Generation vs Consumption (kWh)</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Microgrid</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_solar"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  -- Chart 2: Battery SOC Trend',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Battery SOC Trend (%)</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Storage</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_battery"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  -- Chart 3: Appliance Utilisation (DONUT - DYNAMICALLY FILTERED)',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Appliance Utilisation</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Filtered</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_app_pie"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  -- Chart 4: Power Source Distribution (DONUT - DYNAMICALLY FILTERED)',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Power Source Distribution</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Filtered</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_pwr_pie"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  -- Chart 5: Daily Slot Utilisation (BAR)',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Daily Slot Utilisation</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Stations</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_slots"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  -- Chart 6: Cooking Time by Family Size Band (BAR - DYNAMICALLY FILTERED)',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Cooking Duration by Family Size Band</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Filtered</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_size_band"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  -- Chart 7: Monthly Satisfaction & Safety Perception Trend',
'  htp.p(''<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02); grid-column:1 / -1;">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">'');',
'  htp.p(''    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Household Satisfaction & Safety Perception Trend (1-5 Scale)</span>'');',
'  htp.p(''    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Social Impact</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_sat"></canvas></div>'');',
'  htp.p(''</div>'');',
'',
'  htp.p(''</div>'');',
'',
'  -- Multi-Chart Universal Dynamic Filtering JavaScript',
'  htp.p(''<script>'');',
'  htp.p(''(function() {'');',
'  htp.p(''  var rawSolar = '' || v_solar_json || '';'');',
'  htp.p(''  var rawBattery = '' || v_battery_json || '';'');',
'  htp.p(''  var rawSlot = '' || v_slot_json || '';'');',
'  htp.p(''  var rawSessions = '' || v_sessions_json || '';'');',
'  htp.p(''  var rawSat = '' || v_sat_json || '';'');',
'',
'  htp.p(''  var cSolar, cBattery, cAppPie, cPwrPie, cSlots, cBand, cSat;'');',
'  htp.p(''  var waitAttempts = 0;'');',
'',
'  htp.p(''  function sliceData(arr, n) {'');',
'  htp.p(''    if (!arr || !arr.length) return [];'');',
'  htp.p(''    if (n >= arr.length) return arr;'');',
'  htp.p(''    return arr.slice(arr.length - n);'');',
'  htp.p(''  }'');',
'',
'  htp.p(''  function filterSessionsByDays(days) {'');',
'  htp.p(''    if (!rawSessions || !rawSessions.length) return [];'');',
'  htp.p(''    if (days >= 999) return rawSessions;'');',
'  htp.p(''    var curSolar = sliceData(rawSolar, days);'');',
'  htp.p(''    if (!curSolar || !curSolar.length) return rawSessions;'');',
'  htp.p(''    var minDate = curSolar[0].date;'');',
'  htp.p(''    return rawSessions.filter(function(s) { return s.date >= minDate; });'');',
'  htp.p(''  }'');',
'',
'  htp.p(''  function renderAllCharts(days) {'');',
'  htp.p(''    if (typeof Chart === "undefined") {'');',
'  htp.p(''      waitAttempts++;'');',
'  htp.p(''      if (waitAttempts < 25) { setTimeout(function(){ renderAllCharts(days); }, 80); return; }'');',
'  htp.p(''      console.warn("Chart.js unavailable");'');',
'  htp.p(''      return;'');',
'  htp.p(''    }'');',
'',
'  htp.p(''    Chart.defaults.font.family = "Plus Jakarta Sans, -apple-system, sans-serif";'');',
'  htp.p(''    Chart.defaults.font.size = 15;'');',
'  htp.p(''    Chart.defaults.font.weight = "600";'');',
'  htp.p(''    Chart.defaults.color = "#1e293b";'');',
'  htp.p(''    Chart.defaults.scale.grid.color = "#f1f5f9";'');',
'',
'  htp.p(''    var curSolar = sliceData(rawSolar, days);'');',
'  htp.p(''    var curBattery = sliceData(rawBattery, days);'');',
'  htp.p(''    var curSlots = sliceData(rawSlot, days);'');',
'  htp.p(''    var curSessions = filterSessionsByDays(days);'');',
'',
'  -- Recalculate KPIs with clean escaped markup',
'  htp.p(''    var elSessions = document.getElementById("kpi-sessions-val");'');',
'  htp.p(''    var elPersons = document.getElementById("kpi-persons-val");'');',
'  htp.p(''    var elDuration = document.getElementById("kpi-duration-val");'');',
'  htp.p(''    var elHoursDesc = document.getElementById("kpi-hours-desc");'');',
'  htp.p(''    var elSolarShare = document.getElementById("kpi-solar-share-val");'');',
'  htp.p(''    if (curSessions.length > 0) {'');',
'  htp.p(''      var totPersons = 0, totDur = 0, cleanCount = 0;'');',
'  htp.p(''      curSessions.forEach(function(s){'');',
'  htp.p(''        totPersons += s.persons;'');',
'  htp.p(''        totDur += s.duration;'');',
'  htp.p(''        if (s.power === "Solar" || s.power === "Battery") cleanCount++;'');',
'  htp.p(''      });'');',
'  htp.p(''      if (elSessions) elSessions.innerText = curSessions.length;'');',
'  htp.p(''      if (elPersons) elPersons.innerText = totPersons;'');',
'  htp.p(''      if (elDuration) elDuration.innerHTML = Math.round(totDur / curSessions.length) + " <span style=\"font-size:1.45rem; font-weight:600; color:#64748b;\">min</span>";'');',
'  htp.p(''      if (elHoursDesc) elHoursDesc.innerText = Math.round(totDur / 60.0 * 10) / 10 + " total hours in period";'');',
'  htp.p(''      if (elSolarShare) elSolarShare.innerText = Math.round(cleanCount / curSessions.length * 100) + "%";'');',
'  htp.p(''    }'');',
'',
'  -- 1. Solar Line Chart',
'  htp.p(''    var ctxSolar = document.getElementById("chart_solar");'');',
'  htp.p(''    if (ctxSolar) {'');',
'  htp.p(''      if (cSolar) cSolar.destroy();'');',
'  htp.p(''      cSolar = new Chart(ctxSolar, {'');',
'  htp.p(''        type: "line",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: curSolar.map(function(d){ return d.date.substring(5); }),'');',
'  htp.p(''          datasets: ['');',
'  htp.p(''            { label: "Generated (kWh)", data: curSolar.map(function(d){ return d.generated; }), borderColor: "#0f172a", backgroundColor: "rgba(15,23,42,0.06)", tension: 0.2, fill: true, borderWidth: 3, pointRadius: 4 },'');',
'  htp.p(''            { label: "Consumed (kWh)", data: curSolar.map(function(d){ return d.consumed; }), borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.06)", tension: 0.2, fill: true, borderWidth: 3, pointRadius: 4 }'');',
'  htp.p(''          ]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  -- 2. Battery SOC Line Chart',
'  htp.p(''    var ctxBattery = document.getElementById("chart_battery");'');',
'  htp.p(''    if (ctxBattery) {'');',
'  htp.p(''      if (cBattery) cBattery.destroy();'');',
'  htp.p(''      cBattery = new Chart(ctxBattery, {'');',
'  htp.p(''        type: "line",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: curBattery.map(function(d){ return d.date.substring(5); }),'');',
'  htp.p(''          datasets: ['');',
'  htp.p(''            { label: "Morning SOC (%)", data: curBattery.map(function(d){ return d.morning; }), borderColor: "#0284c7", tension: 0.2, borderWidth: 3, pointRadius: 4 },'');',
'  htp.p(''            { label: "Evening SOC (%)", data: curBattery.map(function(d){ return d.evening; }), borderColor: "#0f172a", tension: 0.2, borderWidth: 3, pointRadius: 4 }'');',
'  htp.p(''          ]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  -- 3. Dynamic Appliance Donut Chart',
'  htp.p(''    var ctxAppPie = document.getElementById("chart_app_pie");'');',
'  htp.p(''    if (ctxAppPie) {'');',
'  htp.p(''      if (cAppPie) cAppPie.destroy();'');',
'  htp.p(''      var appMap = {};'');',
'  htp.p(''      curSessions.forEach(function(s){ appMap[s.appliance] = (appMap[s.appliance] || 0) + 1; });'');',
'  htp.p(''      var appLabels = Object.keys(appMap);'');',
'  htp.p(''      var appVals = appLabels.map(function(k){ return appMap[k]; });'');',
'  htp.p(''      cAppPie = new Chart(ctxAppPie, {'');',
'  htp.p(''        type: "doughnut",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: appLabels,'');',
'  htp.p(''          datasets: [{ data: appVals, backgroundColor: ["#0f172a", "#2563eb", "#0284c7", "#64748b"] }]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { cutout: "68%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  -- 4. Dynamic Power Source Donut Chart',
'  htp.p(''    var ctxPwrPie = document.getElementById("chart_pwr_pie");'');',
'  htp.p(''    if (ctxPwrPie) {'');',
'  htp.p(''      if (cPwrPie) cPwrPie.destroy();'');',
'  htp.p(''      var pwrMap = {};'');',
'  htp.p(''      curSessions.forEach(function(s){ pwrMap[s.power] = (pwrMap[s.power] || 0) + 1; });'');',
'  htp.p(''      var pwrLabels = Object.keys(pwrMap);'');',
'  htp.p(''      var pwrVals = pwrLabels.map(function(k){ return pwrMap[k]; });'');',
'  htp.p(''      cPwrPie = new Chart(ctxPwrPie, {'');',
'  htp.p(''        type: "doughnut",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: pwrLabels,'');',
'  htp.p(''          datasets: [{ data: pwrVals, backgroundColor: ["#2563eb", "#059669", "#d97706", "#94a3b8"] }]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { cutout: "68%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  -- 5. Daily Slots Stacked Bar Chart',
'  htp.p(''    var ctxSlots = document.getElementById("chart_slots");'');',
'  htp.p(''    if (ctxSlots) {'');',
'  htp.p(''      if (cSlots) cSlots.destroy();'');',
'  htp.p(''      cSlots = new Chart(ctxSlots, {'');',
'  htp.p(''        type: "bar",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: curSlots.map(function(d){ return d.date.substring(5); }),'');',
'  htp.p(''          datasets: ['');',
'  htp.p(''            { label: "Attended", data: curSlots.map(function(d){ return d.attended; }), backgroundColor: "#2563eb", borderRadius: 4 },'');',
'  htp.p(''            { label: "Scheduled", data: curSlots.map(function(d){ return d.scheduled; }), backgroundColor: "#94a3b8", borderRadius: 4 },'');',
'  htp.p(''            { label: "Missed", data: curSlots.map(function(d){ return d.missed; }), backgroundColor: "#cbd5e1", borderRadius: 4 }'');',
'  htp.p(''          ]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  -- 6. Family Size Band Duration Bar Chart',
'  htp.p(''    var ctxBand = document.getElementById("chart_size_band");'');',
'  htp.p(''    if (ctxBand) {'');',
'  htp.p(''      if (cBand) cBand.destroy();'');',
'  htp.p(''      var bMap = { "1-3": {d:0, m:0, c:0}, "4-5": {d:0, m:0, c:0}, "6-7": {d:0, m:0, c:0}, "8+": {d:0, m:0, c:0} };'');',
'  htp.p(''      curSessions.forEach(function(s){'');',
'  htp.p(''        var k = s.band || "4-5";'');',
'  htp.p(''        if (!bMap[k]) bMap[k] = {d:0, m:0, c:0};'');',
'  htp.p(''        bMap[k].d += s.duration;'');',
'  htp.p(''        bMap[k].m += (s.duration / Math.max(1, s.persons));'');',
'  htp.p(''        bMap[k].c++;'');',
'  htp.p(''      });'');',
'  htp.p(''      var bKeys = ["1-3", "4-5", "6-7", "8+"];'');',
'  htp.p(''      var bDurs = bKeys.map(function(k){ return bMap[k].c ? Math.round(bMap[k].d / bMap[k].c) : 120; });'');',
'  htp.p(''      var bMins = bKeys.map(function(k){ return bMap[k].c ? Math.round(bMap[k].m / bMap[k].c * 10)/10 : 25; });'');',
'  htp.p(''      cBand = new Chart(ctxBand, {'');',
'  htp.p(''        type: "bar",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: ["Size 1-3", "Size 4-5", "Size 6-7", "Size 8+"],'');',
'  htp.p(''          datasets: ['');',
'  htp.p(''            { label: "Avg Duration (min)", data: bDurs, backgroundColor: "#0f172a", borderRadius: 4 },'');',
'  htp.p(''            { label: "Min per Person", data: bMins, backgroundColor: "#059669", borderRadius: 4 }'');',
'  htp.p(''          ]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  -- 7. Satisfaction Trend Line Chart',
'  htp.p(''    var ctxSat = document.getElementById("chart_sat");'');',
'  htp.p(''    if (ctxSat) {'');',
'  htp.p(''      if (cSat) cSat.destroy();'');',
'  htp.p(''      cSat = new Chart(ctxSat, {'');',
'  htp.p(''        type: "line",'');',
'  htp.p(''        data: {'');',
'  htp.p(''          labels: rawSat.map(function(d){ return d.month; }),'');',
'  htp.p(''          datasets: ['');',
'  htp.p(''            { label: "Overall Rating", data: rawSat.map(function(d){ return d.overall; }), borderColor: "#059669", tension: 0.2, borderWidth: 3, pointRadius: 5 },'');',
'  htp.p(''            { label: "Safety Perception", data: rawSat.map(function(d){ return d.safety; }), borderColor: "#2563eb", tension: 0.2, borderWidth: 3, pointRadius: 5 },'');',
'  htp.p(''            { label: "Cleanliness", data: rawSat.map(function(d){ return d.cleanliness; }), borderColor: "#6366f1", tension: 0.2, borderWidth: 3, pointRadius: 5 },'');',
'  htp.p(''            { label: "Ease of Use", data: rawSat.map(function(d){ return d.ease; }), borderColor: "#d97706", tension: 0.2, borderWidth: 3, pointRadius: 5 }'');',
'  htp.p(''          ]'');',
'  htp.p(''        },'');',
'  htp.p(''        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 1, max: 5 } }, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }'');',
'  htp.p(''      });'');',
'  htp.p(''    }'');',
'',
'  htp.p(''  }'');',
'',
'  -- Global Filter Button Handler',
'  htp.p(''  window.spckiSetFilter = function(days, btn) {'');',
'  htp.p(''    var buttons = document.querySelectorAll(".spcki-tf-btn");'');',
'  htp.p(''    buttons.forEach(function(b) {'');',
'  htp.p(''      b.style.background = "#ffffff";'');',
'  htp.p(''      b.style.color = "#334155";'');',
'  htp.p(''      b.style.borderColor = "#cbd5e1";'');',
'  htp.p(''    });'');',
'  htp.p(''    if (btn) {'');',
'  htp.p(''      btn.style.background = "#0f172a";'');',
'  htp.p(''      btn.style.color = "#ffffff";'');',
'  htp.p(''      btn.style.borderColor = "#0f172a";'');',
'  htp.p(''    }'');',
'  htp.p(''    renderAllCharts(days);'');',
'  htp.p(''  };'');',
'',
'  htp.p(''  setTimeout(function(){ renderAllCharts(999); }, 150);'');',
'  htp.p(''})();'');',
'  htp.p(''</script>'');',
'END;',
''))
,p_plug_source_type=>'NATIVE_PLSQL'
,p_attribute_01=>'N'
);
end;
/
begin
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472902885404260860)
,p_plug_name=>'Daily Solar Production vs Kitchen Energy Consumed'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>30
,p_plug_display_point=>'BODY'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  htp.p(''<div style="margin-top:28px; margin-bottom:48px;">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid #cbd5e1;">'');',
'  htp.p(''    <span style="font-size:1.75rem; font-weight:800; color:#0f172a;">Daily Solar Production vs Energy Consumed</span>'');',
'  htp.p(''    <span style="font-size:1.15rem; color:#475569; font-weight:600;">Sorted: Latest records first &bull; Microgrid logs</span>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="overflow-x:auto; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''    <table style="width:100%; border-collapse:collapse; font-size:1.18rem;">'');',
'  htp.p(''      <thead><tr style="background:#f8fafc; border-bottom:2px solid #cbd5e1; text-align:left;">'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Log Date</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Weather</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Solar Generation</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Kitchen Consumed</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Net Surplus</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:center;">Coverage</th>'');',
'  htp.p(''      </tr></thead><tbody>'');',
'',
'  FOR r IN (',
'    SELECT to_char(log_date, ''YYYY-MM-DD'') AS l_date,',
'           weather, solar_kwh, energy_consumed_kwh AS consumed_kwh,',
'           round(solar_kwh - energy_consumed_kwh, 2) AS surplus,',
'           round(solar_kwh / nullif(energy_consumed_kwh, 0) * 100, 0) AS coverage',
'    FROM daily_technical_logs',
'    ORDER BY log_date DESC',
'    FETCH FIRST 15 ROWS ONLY',
'  ) LOOP',
'    htp.p(''<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">'');',
'    htp.p(''  <td style="padding:18px 24px; font-weight:700; color:#0f172a;">'' || r.l_date || ''</td>'');',
'    htp.p(''  <td style="padding:18px 24px;"><span style="display:inline-block; padding:6px 16px; border-radius:6px; font-size:1.05rem; font-weight:700; background:'' ||',
'          CASE r.weather',
'            WHEN ''Sunny'' THEN ''#fefce8; color:#854d0e;''',
'            WHEN ''Partly cloudy'' THEN ''#eff6ff; color:#1e40af;''',
'            ELSE ''#f1f5f9; color:#475569;''',
'          END || ''">'' || r.weather || ''</span></td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:right; font-weight:700; color:#0f172a;">'' || to_char(r.solar_kwh, ''990.0'') || '' kWh</td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:right; color:#475569; font-weight:600;">'' || to_char(r.consumed_kwh, ''990.0'') || '' kWh</td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:right; font-weight:700; color:'' || CASE WHEN r.surplus >= 0 THEN ''#059669'' ELSE ''#dc2626'' END || '';">'' ||',
'          CASE WHEN r.surplus >= 0 THEN ''+'' ELSE '''' END || to_char(r.surplus, ''990.0'') || '' kWh</td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:center;"><span style="display:inline-block; padding:6px 16px; border-radius:6px; font-weight:800; font-size:1.05rem; background:'' ||',
'          CASE WHEN r.coverage >= 100 THEN ''#ecfdf5; color:#065f46;'' ELSE ''#fff1f2; color:#9f1239;'' END || ''">'' || r.coverage || ''%</span></td>'');',
'    htp.p(''</tr>'');',
'  END LOOP;',
'',
'  htp.p(''</tbody></table></div></div>'');',
'END;',
''))
,p_plug_source_type=>'NATIVE_PLSQL'
,p_attribute_01=>'N'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472902951321260860)
,p_plug_name=>'Recent Cooking Sessions Feed'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>40
,p_plug_display_point=>'BODY'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  v_url_13 VARCHAR2(1000);',
'BEGIN',
'  htp.p(''<div style="margin-top:28px; margin-bottom:48px;">'');',
'  htp.p(''  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid #cbd5e1;">'');',
'  htp.p(''    <span style="font-size:1.75rem; font-weight:800; color:#0f172a;">Recent Cooking Sessions</span>'');',
'  htp.p(''    <div style="display:flex; align-items:center; gap:16px;">'');',
'  htp.p(''      <span style="font-size:1.15rem; color:#475569; font-weight:600;">Sorted: Latest sessions first</span>'');',
'  htp.p(''      <a href="f?p='' || v(''APP_ID'') || '':2:'' || v(''APP_SESSION'') || '':::" style="font-size:1.15rem; font-weight:700; color:#2563eb; text-decoration:none;">View all sessions &rarr;</a>'');',
'  htp.p(''    </div>'');',
'  htp.p(''  </div>'');',
'  htp.p(''  <div style="overflow-x:auto; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">'');',
'  htp.p(''    <table style="width:100%; border-collapse:collapse; font-size:1.18rem;">'');',
'  htp.p(''      <thead><tr style="background:#f8fafc; border-bottom:2px solid #cbd5e1; text-align:left;">'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">ID</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Household</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Date</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Appliance</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Power Source</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Persons</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Duration</th>'');',
'  htp.p(''        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Energy</th>'');',
'  htp.p(''        <th class="spcki-edit-btn" style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:center;">Action</th>'');',
'  htp.p(''      </tr></thead><tbody>'');',
'',
'  FOR r IN (',
'    SELECT s.id, h.household_code, to_char(trunc(cast(s.start_at as date)), ''YYYY-MM-DD'') AS s_date,',
'           a.name AS appliance, s.power_source, s.persons_cooked_for, s.duration_min,',
'           round(a.power_kw * s.duration_min / 60.0 * 0.75, 2) AS energy_kwh',
'    FROM cooking_sessions s',
'    JOIN households h ON h.id = s.household_id',
'    JOIN appliances a ON a.id = s.appliance_id',
'    ORDER BY s.id DESC',
'    FETCH FIRST 15 ROWS ONLY',
'  ) LOOP',
'    v_url_13 := apex_util.prepare_url(''f?p='' || v(''APP_ID'') || '':13:'' || v(''APP_SESSION'') || ''::NO:13:P13_ID:'' || r.id);',
'    htp.p(''<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">'');',
'    htp.p(''  <td style="padding:18px 24px; color:#475569; font-weight:700; font-size:1.15rem;">#'' || r.id || ''</td>'');',
'    htp.p(''  <td style="padding:18px 24px; font-weight:800; color:#0f172a;">'' || r.household_code || ''</td>'');',
'    htp.p(''  <td style="padding:18px 24px; color:#475569; font-weight:600;">'' || r.s_date || ''</td>'');',
'    htp.p(''  <td style="padding:18px 24px; color:#1e293b; font-weight:600;">'' || r.appliance || ''</td>'');',
'    htp.p(''  <td style="padding:18px 24px;"><span style="display:inline-block; padding:6px 14px; border-radius:6px; font-size:1.05rem; font-weight:700; background:'' ||',
'          CASE r.power_source',
'            WHEN ''Solar'' THEN ''#fefce8; color:#854d0e;''',
'            WHEN ''Battery'' THEN ''#f0fdf4; color:#166534;''',
'            ELSE ''#fff1f2; color:#9f1239;''',
'          END || ''">'' || r.power_source || ''</span></td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:right; font-weight:600; color:#0f172a;">'' || r.persons_cooked_for || ''</td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:right; color:#475569; font-weight:600;">'' || r.duration_min || '' min</td>'');',
'    htp.p(''  <td style="padding:18px 24px; text-align:right; font-weight:700; color:#0f172a;">'' || to_char(r.energy_kwh, ''990.00'') || '' kWh</td>'');',
'    htp.p(''  <td class="spcki-edit-btn" style="padding:18px 24px; text-align:center;">'');',
'    htp.p(''    <a href="'' || v_url_13 || ''" style="display:inline-block; padding:8px 18px; background:#ffffff; color:#334155; border:1px solid #cbd5e1; border-radius:6px; font-size:1.05rem; font-weight:700; text-decoration:none;">Edit</a>'');',
'    htp.p(''  </td>'');',
'    htp.p(''</tr>'');',
'  END LOOP;',
'',
'  htp.p(''</tbody></table></div></div>'');',
'END;',
''))
,p_plug_source_type=>'NATIVE_PLSQL'
,p_attribute_01=>'N'
);
end;
/
prompt --application/pages/page_00002
begin
wwv_flow_api.create_page(
 p_id=>2
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Cooking Sessions'
,p_alias=>'COOKING-SESSIONS'
,p_step_title=>'Cooking Sessions'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_help_text=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<p>To find data enter a search term into the search dialog, or click on the column headings to limit the records returned.</p>',
'',
'<p>You can perform numerous functions by clicking the <strong>Actions</strong> button. This includes selecting the columns that are displayed / hidden and their display sequence, plus numerous data and format functions.  You can also define additiona'
||'l views of the data using the chart, group by, and pivot options.</p>',
'',
'<p>If you want to save your customizations select report, or click download to unload the data. Enter you email address and time frame under subscription to be sent the data on a regular basis.<p>',
'',
'<p>For additional information click Help at the bottom of the Actions menu.</p> ',
'',
'<p>Click the <strong>Reset</strong> button to reset the interactive report back to the default settings.</p>'))
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472379125728945987)
,p_plug_name=>'Cooking Sessions'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273039041945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_query_type=>'TABLE'
,p_query_table=>'COOKING_SESSIONS'
,p_include_rowid_column=>false
,p_plug_source_type=>'NATIVE_IR'
,p_prn_page_header=>'Cooking Sessions'
);
wwv_flow_api.create_worksheet(
 p_id=>wwv_flow_api.id(472379284074945987)
,p_name=>'Cooking Sessions'
,p_max_row_count_message=>'The maximum row count for this report is #MAX_ROW_COUNT# rows.  Please apply a filter to reduce the number of records in your query.'
,p_no_data_found_message=>'No data found.'
,p_allow_save_rpt_public=>'Y'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_show_detail_link=>'N'
,p_show_notify=>'Y'
,p_download_formats=>'CSV:HTML:EMAIL:XLS:PDF:RTF'
,p_owner=>'SOLAR_COOK'
,p_internal_uid=>472379284074945987
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472379617855945990)
,p_db_column_name=>'ID'
,p_display_order=>1
,p_column_identifier=>'A'
,p_column_label=>'ID'
,p_column_link=>'f?p=&APP_ID.:12:&SESSION.::&DEBUG.:12:P12_ID:#ID#'
,p_column_linktext=>'#ID#'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472380040474945992)
,p_db_column_name=>'CLIENT_UUID'
,p_display_order=>2
,p_column_identifier=>'B'
,p_column_label=>'Client Uuid'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472380455756945993)
,p_db_column_name=>'SLOT_ID'
,p_display_order=>3
,p_column_identifier=>'C'
,p_column_label=>'Slot'
,p_column_type=>'NUMBER'
,p_display_text_as=>'LOV_ESCAPE_SC'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
,p_rpt_named_lov=>wwv_flow_api.id(472389776205945998)
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472380872209945993)
,p_db_column_name=>'HOUSEHOLD_ID'
,p_display_order=>4
,p_column_identifier=>'D'
,p_column_label=>'Household'
,p_column_type=>'NUMBER'
,p_display_text_as=>'LOV_ESCAPE_SC'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
,p_rpt_named_lov=>wwv_flow_api.id(472388291657945998)
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472381277293945993)
,p_db_column_name=>'PERSONS_COOKED_FOR'
,p_display_order=>5
,p_column_identifier=>'E'
,p_column_label=>'Persons Cooked For'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_format_mask=>'990'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472381635527945993)
,p_db_column_name=>'START_AT'
,p_display_order=>6
,p_column_identifier=>'F'
,p_column_label=>'Start At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472382052739945993)
,p_db_column_name=>'END_AT'
,p_display_order=>7
,p_column_identifier=>'G'
,p_column_label=>'End At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472382444548945993)
,p_db_column_name=>'DURATION_MIN'
,p_display_order=>8
,p_column_identifier=>'H'
,p_column_label=>'Duration Min'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_format_mask=>'990'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472382811852945993)
,p_db_column_name=>'APPLIANCE_ID'
,p_display_order=>9
,p_column_identifier=>'I'
,p_column_label=>'Appliance'
,p_column_type=>'NUMBER'
,p_display_text_as=>'LOV_ESCAPE_SC'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
,p_rpt_named_lov=>wwv_flow_api.id(472387601260945998)
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472383295917945993)
,p_db_column_name=>'POWER_SOURCE'
,p_display_order=>10
,p_column_identifier=>'J'
,p_column_label=>'Power Source'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472383639877945993)
,p_db_column_name=>'COOKING_COMPLETED'
,p_display_order=>11
,p_column_identifier=>'K'
,p_column_label=>'Cooking Completed'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472384002967945993)
,p_db_column_name=>'CLEANING_COMPLETED'
,p_display_order=>12
,p_column_identifier=>'L'
,p_column_label=>'Cleaning Completed'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472384456565945993)
,p_db_column_name=>'WAITING_ISSUE'
,p_display_order=>13
,p_column_identifier=>'M'
,p_column_label=>'Waiting Issue'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472384803306945995)
,p_db_column_name=>'WAITING_REASON_ID'
,p_display_order=>14
,p_column_identifier=>'N'
,p_column_label=>'Waiting Reason'
,p_column_type=>'NUMBER'
,p_display_text_as=>'LOV_ESCAPE_SC'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
,p_rpt_named_lov=>wwv_flow_api.id(472388858081945998)
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472385243037945995)
,p_db_column_name=>'TECHNICAL_PROBLEM'
,p_display_order=>15
,p_column_identifier=>'O'
,p_column_label=>'Technical Problem'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472385660102945995)
,p_db_column_name=>'PROBLEM_TYPE_ID'
,p_display_order=>16
,p_column_identifier=>'P'
,p_column_label=>'Problem Type'
,p_column_type=>'NUMBER'
,p_display_text_as=>'LOV_ESCAPE_SC'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
,p_rpt_named_lov=>wwv_flow_api.id(472388858081945998)
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472386061745945995)
,p_db_column_name=>'REMARKS'
,p_display_order=>17
,p_column_identifier=>'Q'
,p_column_label=>'Remarks'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472386494410945995)
,p_db_column_name=>'CREATED_BY'
,p_display_order=>18
,p_column_identifier=>'R'
,p_column_label=>'Created By'
,p_column_type=>'NUMBER'
,p_display_text_as=>'LOV_ESCAPE_SC'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
,p_rpt_named_lov=>wwv_flow_api.id(472390318444946000)
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472386813990945995)
,p_db_column_name=>'DEVICE_TIME'
,p_display_order=>19
,p_column_identifier=>'S'
,p_column_label=>'Device Time'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472387273661945995)
,p_db_column_name=>'CREATED_AT'
,p_display_order=>20
,p_column_identifier=>'T'
,p_column_label=>'Created At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_format_mask=>'SINCE'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_rpt(
 p_id=>wwv_flow_api.id(472400098670946012)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'4724001'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:START_AT:HOUSEHOLD_ID:SLOT_ID:APPLIANCE_ID:POWER_SOURCE:PERSONS_COOKED_FOR:DURATION_MIN:COOKING_COMPLETED:CLEANING_COMPLETED:TECHNICAL_PROBLEM:REMARKS'
,p_sort_column_1=>'ID'
,p_sort_direction_1=>'DESC'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472391739142946003)
,p_plug_name=>'Breadcrumb'
,p_region_template_options=>'#DEFAULT#:t-BreadcrumbRegion--useBreadcrumbTitle'
,p_component_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472284353970945890)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_01'
,p_menu_id=>wwv_flow_api.id(472220915933945851)
,p_plug_source_type=>'NATIVE_BREADCRUMB'
,p_menu_template_id=>wwv_flow_api.id(472338475478945912)
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472505419001450207)
,p_button_sequence=>5
,p_button_plug_id=>wwv_flow_api.id(472379125728945987)
,p_button_name=>'CREATE_SESSION'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'+ Log Cooking Session'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:12:&SESSION.::&DEBUG.:12::'
,p_icon_css_classes=>'fa-plus'
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472390976668946000)
,p_button_sequence=>10
,p_button_plug_id=>wwv_flow_api.id(472379125728945987)
,p_button_name=>'RESET_REPORT'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_image_alt=>'Reset'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:2:&SESSION.::&DEBUG.:RR::'
,p_icon_css_classes=>'fa-undo-alt'
);
end;
/
prompt --application/pages/page_00003
begin
wwv_flow_api.create_page(
 p_id=>3
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Households'
,p_alias=>'HOUSEHOLDS'
,p_step_title=>'Households'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_help_text=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<p>To find data enter a search term into the search dialog, or click on the column headings to limit the records returned.</p>',
'',
'<p>You can perform numerous functions by clicking the <strong>Actions</strong> button. This includes selecting the columns that are displayed / hidden and their display sequence, plus numerous data and format functions.  You can also define additiona'
||'l views of the data using the chart, group by, and pivot options.</p>',
'',
'<p>If you want to save your customizations select report, or click download to unload the data. Enter you email address and time frame under subscription to be sent the data on a regular basis.<p>',
'',
'<p>For additional information click Help at the bottom of the Actions menu.</p> ',
'',
'<p>Click the <strong>Reset</strong> button to reset the interactive report back to the default settings.</p>'))
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472393279454946003)
,p_plug_name=>'Households'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273039041945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_query_type=>'SQL'
,p_plug_source=>'select * from households'
,p_plug_source_type=>'NATIVE_IR'
,p_prn_page_header=>'Households'
);
wwv_flow_api.create_worksheet(
 p_id=>wwv_flow_api.id(472393328206946003)
,p_name=>'Households'
,p_max_row_count_message=>'The maximum row count for this report is #MAX_ROW_COUNT# rows.  Please apply a filter to reduce the number of records in your query.'
,p_no_data_found_message=>'No data found.'
,p_allow_save_rpt_public=>'Y'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_show_detail_link=>'N'
,p_show_notify=>'Y'
,p_download_formats=>'CSV:HTML:EMAIL:XLS:PDF:RTF'
,p_owner=>'SOLAR_COOK'
,p_internal_uid=>472393328206946003
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472393713223946003)
,p_db_column_name=>'ID'
,p_display_order=>1
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472394198585946004)
,p_db_column_name=>'KITCHEN_ID'
,p_display_order=>2
,p_column_identifier=>'B'
,p_column_label=>'Kitchen Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472394585545946004)
,p_db_column_name=>'HOUSEHOLD_CODE'
,p_display_order=>3
,p_column_identifier=>'C'
,p_column_label=>'Household Code'
,p_column_link=>'f?p=&APP_ID.:13:&SESSION.::&DEBUG.:13:P13_ID:#ID#'
,p_column_linktext=>'#HOUSEHOLD_CODE#'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472394985236946004)
,p_db_column_name=>'FAMILY_SIZE'
,p_display_order=>4
,p_column_identifier=>'D'
,p_column_label=>'Family Size'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472395324678946004)
,p_db_column_name=>'CHILDREN_COUNT'
,p_display_order=>5
,p_column_identifier=>'E'
,p_column_label=>'Children Count'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472395714389946004)
,p_db_column_name=>'ADULTS_COUNT'
,p_display_order=>6
,p_column_identifier=>'F'
,p_column_label=>'Adults Count'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472396101088946004)
,p_db_column_name=>'BASELINE_FUEL_TYPE'
,p_display_order=>7
,p_column_identifier=>'G'
,p_column_label=>'Baseline Fuel Type'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472396522297946004)
,p_db_column_name=>'BASELINE_MONTHLY_FUEL_COST'
,p_display_order=>8
,p_column_identifier=>'H'
,p_column_label=>'Baseline Monthly Fuel Cost'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472396952699946004)
,p_db_column_name=>'STATUS'
,p_display_order=>9
,p_column_identifier=>'I'
,p_column_label=>'Status'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472397337552946006)
,p_db_column_name=>'JOINED_DATE'
,p_display_order=>10
,p_column_identifier=>'J'
,p_column_label=>'Joined Date'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472397731457946006)
,p_db_column_name=>'CREATED_AT'
,p_display_order=>11
,p_column_identifier=>'K'
,p_column_label=>'Created At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_rpt(
 p_id=>wwv_flow_api.id(472448866785058917)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'4724489'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:KITCHEN_ID:HOUSEHOLD_CODE:FAMILY_SIZE:CHILDREN_COUNT:ADULTS_COUNT:BASELINE_FUEL_TYPE:BASELINE_MONTHLY_FUEL_COST:STATUS:JOINED_DATE:CREATED_AT'
,p_sort_column_1=>'ID'
,p_sort_direction_1=>'DESC'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472398979238946006)
,p_plug_name=>'Breadcrumb'
,p_region_template_options=>'#DEFAULT#:t-BreadcrumbRegion--useBreadcrumbTitle'
,p_component_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472284353970945890)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_01'
,p_menu_id=>wwv_flow_api.id(472220915933945851)
,p_plug_source_type=>'NATIVE_BREADCRUMB'
,p_menu_template_id=>wwv_flow_api.id(472338475478945912)
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472505512942450207)
,p_button_sequence=>5
,p_button_plug_id=>wwv_flow_api.id(472393279454946003)
,p_button_name=>'CREATE_HOUSEHOLD'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'+ Register Household'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:13:&SESSION.::&DEBUG.:13::'
,p_icon_css_classes=>'fa-plus'
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472398145803946006)
,p_button_sequence=>10
,p_button_plug_id=>wwv_flow_api.id(472393279454946003)
,p_button_name=>'RESET_REPORT'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_image_alt=>'Reset'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:3:&SESSION.::&DEBUG.:RR::'
,p_icon_css_classes=>'fa-undo-alt'
);
end;
/
prompt --application/pages/page_00004
begin
wwv_flow_api.create_page(
 p_id=>4
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Slots Schedule'
,p_alias=>'SLOTS-SCHEDULE'
,p_step_title=>'Slots Schedule'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472418011978000175)
,p_plug_name=>'Slots Schedule'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273039041945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_query_type=>'SQL'
,p_plug_source=>'select * from slots'
,p_plug_source_type=>'NATIVE_IR'
,p_prn_page_header=>'Slots Schedule'
);
wwv_flow_api.create_worksheet(
 p_id=>wwv_flow_api.id(472418135110000175)
,p_name=>'Slots Schedule'
,p_max_row_count_message=>'The maximum row count for this report is #MAX_ROW_COUNT# rows.  Please apply a filter to reduce the number of records in your query.'
,p_no_data_found_message=>'No data found.'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_show_detail_link=>'N'
,p_download_formats=>'CSV:HTML:EMAIL:XLS:PDF:RTF'
,p_owner=>'SOLAR_COOK'
,p_internal_uid=>472418135110000175
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472418577003000175)
,p_db_column_name=>'ID'
,p_display_order=>1
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_link=>'f?p=&APP_ID.:14:&SESSION.::&DEBUG.:14:P14_ID:#ID#'
,p_column_linktext=>'#ID#'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472418932806000175)
,p_db_column_name=>'KITCHEN_ID'
,p_display_order=>2
,p_column_identifier=>'B'
,p_column_label=>'Kitchen Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472419398519000175)
,p_db_column_name=>'SLOT_DATE'
,p_display_order=>3
,p_column_identifier=>'C'
,p_column_label=>'Slot Date'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472419762063000175)
,p_db_column_name=>'SLOT_NO'
,p_display_order=>4
,p_column_identifier=>'D'
,p_column_label=>'Slot No'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472420146331000175)
,p_db_column_name=>'START_TIME'
,p_display_order=>5
,p_column_identifier=>'E'
,p_column_label=>'Start Time'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472420501741000175)
,p_db_column_name=>'END_TIME'
,p_display_order=>6
,p_column_identifier=>'F'
,p_column_label=>'End Time'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472420976219000176)
,p_db_column_name=>'POWER_SOURCE'
,p_display_order=>7
,p_column_identifier=>'G'
,p_column_label=>'Power Source'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472421359054000176)
,p_db_column_name=>'HOUSEHOLD_ID'
,p_display_order=>8
,p_column_identifier=>'H'
,p_column_label=>'Household Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472421779193000176)
,p_db_column_name=>'STATUS'
,p_display_order=>9
,p_column_identifier=>'I'
,p_column_label=>'Status'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472422173890000176)
,p_db_column_name=>'NOTE'
,p_display_order=>10
,p_column_identifier=>'J'
,p_column_label=>'Note'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472422557955000176)
,p_db_column_name=>'CREATED_BY'
,p_display_order=>11
,p_column_identifier=>'K'
,p_column_label=>'Created By'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472422957865000176)
,p_db_column_name=>'CREATED_AT'
,p_display_order=>12
,p_column_identifier=>'L'
,p_column_label=>'Created At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_rpt(
 p_id=>wwv_flow_api.id(472450401507100157)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'4724505'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:KITCHEN_ID:SLOT_DATE:SLOT_NO:START_TIME:END_TIME:POWER_SOURCE:HOUSEHOLD_ID:STATUS:NOTE:CREATED_BY:CREATED_AT'
,p_sort_column_1=>'SLOT_DATE'
,p_sort_direction_1=>'DESC'
,p_sort_column_2=>'START_TIME'
,p_sort_direction_2=>'DESC'
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472505660324450207)
,p_button_sequence=>5
,p_button_plug_id=>wwv_flow_api.id(472418011978000175)
,p_button_name=>'CREATE_SLOT'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'+ Book Slot'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:14:&SESSION.::&DEBUG.:14::'
,p_icon_css_classes=>'fa-plus'
);
end;
/
prompt --application/pages/page_00005
begin
wwv_flow_api.create_page(
 p_id=>5
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Daily Technical Logs'
,p_alias=>'DAILY-TECHNICAL-LOGS'
,p_step_title=>'Daily Technical Logs'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472424151451011171)
,p_plug_name=>'Daily Technical Logs'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273039041945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_query_type=>'SQL'
,p_plug_source=>'select * from daily_technical_logs'
,p_plug_source_type=>'NATIVE_IR'
,p_prn_page_header=>'Daily Technical Logs'
);
wwv_flow_api.create_worksheet(
 p_id=>wwv_flow_api.id(472424254925011171)
,p_name=>'Daily Technical Logs'
,p_max_row_count_message=>'The maximum row count for this report is #MAX_ROW_COUNT# rows.  Please apply a filter to reduce the number of records in your query.'
,p_no_data_found_message=>'No data found.'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_show_detail_link=>'N'
,p_download_formats=>'CSV:HTML:EMAIL:XLS:PDF:RTF'
,p_owner=>'SOLAR_COOK'
,p_internal_uid=>472424254925011171
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472424637906011171)
,p_db_column_name=>'ID'
,p_display_order=>1
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_link=>'f?p=&APP_ID.:15:&SESSION.::&DEBUG.:15:P15_ID:#ID#'
,p_column_linktext=>'#ID#'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472425091577011171)
,p_db_column_name=>'CLIENT_UUID'
,p_display_order=>2
,p_column_identifier=>'B'
,p_column_label=>'Client Uuid'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472425444808011171)
,p_db_column_name=>'KITCHEN_ID'
,p_display_order=>3
,p_column_identifier=>'C'
,p_column_label=>'Kitchen Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472425804269011171)
,p_db_column_name=>'LOG_DATE'
,p_display_order=>4
,p_column_identifier=>'D'
,p_column_label=>'Log Date'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472426274326011171)
,p_db_column_name=>'SOLAR_KWH'
,p_display_order=>5
,p_column_identifier=>'E'
,p_column_label=>'Solar Kwh'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472426621594011173)
,p_db_column_name=>'MORNING_SOC'
,p_display_order=>6
,p_column_identifier=>'F'
,p_column_label=>'Morning Soc'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472427062320011173)
,p_db_column_name=>'EVENING_SOC'
,p_display_order=>7
,p_column_identifier=>'G'
,p_column_label=>'Evening Soc'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472427476609011173)
,p_db_column_name=>'SYSTEM_OPERATIONAL'
,p_display_order=>8
,p_column_identifier=>'H'
,p_column_label=>'System Operational'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472427806345011173)
,p_db_column_name=>'FAULT_COUNT'
,p_display_order=>9
,p_column_identifier=>'I'
,p_column_label=>'Fault Count'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472428222441011173)
,p_db_column_name=>'DOWNTIME_HOURS'
,p_display_order=>10
,p_column_identifier=>'J'
,p_column_label=>'Downtime Hours'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472428618312011173)
,p_db_column_name=>'SAFETY_INCIDENT'
,p_display_order=>11
,p_column_identifier=>'K'
,p_column_label=>'Safety Incident'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472429064265011173)
,p_db_column_name=>'SAFETY_SEVERITY'
,p_display_order=>12
,p_column_identifier=>'L'
,p_column_label=>'Safety Severity'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472429419326011173)
,p_db_column_name=>'SAFETY_NOTE'
,p_display_order=>13
,p_column_identifier=>'M'
,p_column_label=>'Safety Note'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472429897998011173)
,p_db_column_name=>'WEATHER'
,p_display_order=>14
,p_column_identifier=>'N'
,p_column_label=>'Weather'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472430233743011173)
,p_db_column_name=>'ENERGY_CONSUMED_KWH'
,p_display_order=>15
,p_column_identifier=>'O'
,p_column_label=>'Energy Consumed Kwh'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472430681444011173)
,p_db_column_name=>'REMARKS'
,p_display_order=>16
,p_column_identifier=>'P'
,p_column_label=>'Remarks'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472431074478011175)
,p_db_column_name=>'CREATED_BY'
,p_display_order=>17
,p_column_identifier=>'Q'
,p_column_label=>'Created By'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472431411715011175)
,p_db_column_name=>'DEVICE_TIME'
,p_display_order=>18
,p_column_identifier=>'R'
,p_column_label=>'Device Time'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472431821297011175)
,p_db_column_name=>'CREATED_AT'
,p_display_order=>19
,p_column_identifier=>'S'
,p_column_label=>'Created At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_rpt(
 p_id=>wwv_flow_api.id(472449645207061118)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'4724497'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:CLIENT_UUID:KITCHEN_ID:LOG_DATE:SOLAR_KWH:MORNING_SOC:EVENING_SOC:SYSTEM_OPERATIONAL:FAULT_COUNT:DOWNTIME_HOURS:SAFETY_INCIDENT:SAFETY_SEVERITY:SAFETY_NOTE:WEATHER:ENERGY_CONSUMED_KWH:REMARKS:CREATED_BY:DEVICE_TIME:CREATED_AT'
,p_sort_column_1=>'LOG_DATE'
,p_sort_direction_1=>'DESC'
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472505765982450207)
,p_button_sequence=>5
,p_button_plug_id=>wwv_flow_api.id(472424151451011171)
,p_button_name=>'CREATE_LOG'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'+ Add Daily Technical Log'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:15:&SESSION.::&DEBUG.:15::'
,p_icon_css_classes=>'fa-plus'
);
end;
/
prompt --application/pages/page_00006
begin
wwv_flow_api.create_page(
 p_id=>6
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Generator Logs'
,p_alias=>'GENERATOR-LOGS'
,p_step_title=>'Generator Logs'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472432837278022057)
,p_plug_name=>'Generator Logs'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273039041945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_query_type=>'SQL'
,p_plug_source=>'select * from generator_logs'
,p_plug_source_type=>'NATIVE_IR'
,p_prn_page_header=>'Generator Logs'
);
wwv_flow_api.create_worksheet(
 p_id=>wwv_flow_api.id(472432962857022057)
,p_name=>'Generator Logs'
,p_max_row_count_message=>'The maximum row count for this report is #MAX_ROW_COUNT# rows.  Please apply a filter to reduce the number of records in your query.'
,p_no_data_found_message=>'No data found.'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_show_detail_link=>'N'
,p_download_formats=>'CSV:HTML:EMAIL:XLS:PDF:RTF'
,p_owner=>'SOLAR_COOK'
,p_internal_uid=>472432962857022057
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472433365528022057)
,p_db_column_name=>'ID'
,p_display_order=>1
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_link=>'f?p=&APP_ID.:16:&SESSION.::&DEBUG.:16:P16_ID:#ID#'
,p_column_linktext=>'#ID#'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472433727595022059)
,p_db_column_name=>'CLIENT_UUID'
,p_display_order=>2
,p_column_identifier=>'B'
,p_column_label=>'Client Uuid'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472434185868022059)
,p_db_column_name=>'KITCHEN_ID'
,p_display_order=>3
,p_column_identifier=>'C'
,p_column_label=>'Kitchen Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472434549179022059)
,p_db_column_name=>'LOG_DATE'
,p_display_order=>4
,p_column_identifier=>'D'
,p_column_label=>'Log Date'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472434976802022059)
,p_db_column_name=>'FUEL_START_L'
,p_display_order=>5
,p_column_identifier=>'E'
,p_column_label=>'Fuel Start L'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472435303881022059)
,p_db_column_name=>'REFUEL_L'
,p_display_order=>6
,p_column_identifier=>'F'
,p_column_label=>'Refuel L'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472435785321022059)
,p_db_column_name=>'FUEL_END_L'
,p_display_order=>7
,p_column_identifier=>'G'
,p_column_label=>'Fuel End L'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472436197164022059)
,p_db_column_name=>'FUEL_USED_L'
,p_display_order=>8
,p_column_identifier=>'H'
,p_column_label=>'Fuel Used L'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472436550547022059)
,p_db_column_name=>'RUNNING_HOURS'
,p_display_order=>9
,p_column_identifier=>'I'
,p_column_label=>'Running Hours'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472436991522022060)
,p_db_column_name=>'MAINTENANCE_REQUIRED'
,p_display_order=>10
,p_column_identifier=>'J'
,p_column_label=>'Maintenance Required'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472437316248022060)
,p_db_column_name=>'MAINTENANCE_TYPE'
,p_display_order=>11
,p_column_identifier=>'K'
,p_column_label=>'Maintenance Type'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472437765406022060)
,p_db_column_name=>'REMARKS'
,p_display_order=>12
,p_column_identifier=>'L'
,p_column_label=>'Remarks'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472438192137022060)
,p_db_column_name=>'CREATED_BY'
,p_display_order=>13
,p_column_identifier=>'M'
,p_column_label=>'Created By'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472438592311022060)
,p_db_column_name=>'DEVICE_TIME'
,p_display_order=>14
,p_column_identifier=>'N'
,p_column_label=>'Device Time'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472438971047022060)
,p_db_column_name=>'CREATED_AT'
,p_display_order=>15
,p_column_identifier=>'O'
,p_column_label=>'Created At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_rpt(
 p_id=>wwv_flow_api.id(472451052357100326)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'4724511'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:CLIENT_UUID:KITCHEN_ID:LOG_DATE:FUEL_START_L:REFUEL_L:FUEL_END_L:FUEL_USED_L:RUNNING_HOURS:MAINTENANCE_REQUIRED:MAINTENANCE_TYPE:REMARKS:CREATED_BY:DEVICE_TIME:CREATED_AT'
,p_sort_column_1=>'LOG_DATE'
,p_sort_direction_1=>'DESC'
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472505871557450207)
,p_button_sequence=>5
,p_button_plug_id=>wwv_flow_api.id(472432837278022057)
,p_button_name=>'CREATE_GEN_LOG'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'+ Log Generator Run'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:16:&SESSION.::&DEBUG.:16::'
,p_icon_css_classes=>'fa-plus'
);
end;
/
prompt --application/pages/page_00007
begin
wwv_flow_api.create_page(
 p_id=>7
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Monthly Feedback'
,p_alias=>'MONTHLY-FEEDBACK'
,p_step_title=>'Monthly Feedback'
,p_autocomplete_on_off=>'OFF'
,p_page_template_options=>'#DEFAULT#'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472439968395034906)
,p_plug_name=>'Monthly Feedback'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273039041945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_query_type=>'SQL'
,p_plug_source=>'select * from monthly_feedback'
,p_plug_source_type=>'NATIVE_IR'
,p_prn_page_header=>'Monthly Feedback'
);
wwv_flow_api.create_worksheet(
 p_id=>wwv_flow_api.id(472440002624034906)
,p_name=>'Monthly Feedback'
,p_max_row_count_message=>'The maximum row count for this report is #MAX_ROW_COUNT# rows.  Please apply a filter to reduce the number of records in your query.'
,p_no_data_found_message=>'No data found.'
,p_pagination_type=>'ROWS_X_TO_Y'
,p_pagination_display_pos=>'BOTTOM_RIGHT'
,p_report_list_mode=>'TABS'
,p_show_detail_link=>'N'
,p_download_formats=>'CSV:HTML:EMAIL:XLS:PDF:RTF'
,p_owner=>'SOLAR_COOK'
,p_internal_uid=>472440002624034906
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472440483269034907)
,p_db_column_name=>'ID'
,p_display_order=>1
,p_column_identifier=>'A'
,p_column_label=>'Id'
,p_column_link=>'f?p=&APP_ID.:17:&SESSION.::&DEBUG.:17:P17_ID:#ID#'
,p_column_linktext=>'#ID#'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472440827816034907)
,p_db_column_name=>'CLIENT_UUID'
,p_display_order=>2
,p_column_identifier=>'B'
,p_column_label=>'Client Uuid'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472441297557034907)
,p_db_column_name=>'HOUSEHOLD_ID'
,p_display_order=>3
,p_column_identifier=>'C'
,p_column_label=>'Household Id'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472441638595034907)
,p_db_column_name=>'SURVEY_MONTH'
,p_display_order=>4
,p_column_identifier=>'D'
,p_column_label=>'Survey Month'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472442038115034907)
,p_db_column_name=>'BACKUP_FUEL_USED'
,p_display_order=>5
,p_column_identifier=>'E'
,p_column_label=>'Backup Fuel Used'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472442499408034907)
,p_db_column_name=>'BACKUP_FUEL_SPEND'
,p_display_order=>6
,p_column_identifier=>'F'
,p_column_label=>'Backup Fuel Spend'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472442835740034907)
,p_db_column_name=>'FUEL_REDUCTION_RATING'
,p_display_order=>7
,p_column_identifier=>'G'
,p_column_label=>'Fuel Reduction Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472443239052034907)
,p_db_column_name=>'SAFETY_RATING'
,p_display_order=>8
,p_column_identifier=>'H'
,p_column_label=>'Safety Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472443638997034907)
,p_db_column_name=>'PRIVACY_RATING'
,p_display_order=>9
,p_column_identifier=>'I'
,p_column_label=>'Privacy Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472444096621034909)
,p_db_column_name=>'WAITING_RATING'
,p_display_order=>10
,p_column_identifier=>'J'
,p_column_label=>'Waiting Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472444474653034909)
,p_db_column_name=>'OVERALL_RATING'
,p_display_order=>11
,p_column_identifier=>'K'
,p_column_label=>'Overall Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472444881192034909)
,p_db_column_name=>'CLEANLINESS_RATING'
,p_display_order=>12
,p_column_identifier=>'L'
,p_column_label=>'Cleanliness Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472445261623034909)
,p_db_column_name=>'EASE_RATING'
,p_display_order=>13
,p_column_identifier=>'M'
,p_column_label=>'Ease Rating'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472445626938034909)
,p_db_column_name=>'SLOT_SUITABILITY'
,p_display_order=>14
,p_column_identifier=>'N'
,p_column_label=>'Slot Suitability'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472446000830034909)
,p_db_column_name=>'TIME_ENOUGH'
,p_display_order=>15
,p_column_identifier=>'O'
,p_column_label=>'Time Enough'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472446496149034909)
,p_db_column_name=>'FAMILY_MEMBERS_NOW'
,p_display_order=>16
,p_column_identifier=>'P'
,p_column_label=>'Family Members Now'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472446833747034909)
,p_db_column_name=>'WILLING_TO_CONTINUE'
,p_display_order=>17
,p_column_identifier=>'Q'
,p_column_label=>'Willing To Continue'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472447217870034909)
,p_db_column_name=>'REMARKS'
,p_display_order=>18
,p_column_identifier=>'R'
,p_column_label=>'Remarks'
,p_column_type=>'STRING'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472447672116034909)
,p_db_column_name=>'CREATED_BY'
,p_display_order=>19
,p_column_identifier=>'S'
,p_column_label=>'Created By'
,p_column_type=>'NUMBER'
,p_heading_alignment=>'RIGHT'
,p_column_alignment=>'RIGHT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472448042276034910)
,p_db_column_name=>'DEVICE_TIME'
,p_display_order=>20
,p_column_identifier=>'T'
,p_column_label=>'Device Time'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_column(
 p_id=>wwv_flow_api.id(472448413634034910)
,p_db_column_name=>'CREATED_AT'
,p_display_order=>21
,p_column_identifier=>'U'
,p_column_label=>'Created At'
,p_column_type=>'DATE'
,p_heading_alignment=>'LEFT'
,p_tz_dependent=>'N'
);
wwv_flow_api.create_worksheet_rpt(
 p_id=>wwv_flow_api.id(472451641656100509)
,p_application_user=>'APXWS_DEFAULT'
,p_report_seq=>10
,p_report_alias=>'4724517'
,p_status=>'PUBLIC'
,p_is_default=>'Y'
,p_report_columns=>'ID:CLIENT_UUID:HOUSEHOLD_ID:SURVEY_MONTH:BACKUP_FUEL_USED:BACKUP_FUEL_SPEND:FUEL_REDUCTION_RATING:SAFETY_RATING:PRIVACY_RATING:WAITING_RATING:OVERALL_RATING:CLEANLINESS_RATING:EASE_RATING:SLOT_SUITABILITY:TIME_ENOUGH:FAMILY_MEMBERS_NOW:WILLING_TO_CON'
||'TINUE:REMARKS:CREATED_BY:DEVICE_TIME:CREATED_AT'
,p_sort_column_1=>'SURVEY_MONTH'
,p_sort_direction_1=>'DESC'
,p_sort_column_2=>'ID'
,p_sort_direction_2=>'DESC'
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472505920003450207)
,p_button_sequence=>5
,p_button_plug_id=>wwv_flow_api.id(472439968395034906)
,p_button_name=>'CREATE_FEEDBACK'
,p_button_action=>'REDIRECT_PAGE'
,p_button_template_options=>'#DEFAULT#:t-Button--primary:t-Button--iconLeft'
,p_button_template_id=>wwv_flow_api.id(472337158867945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'+ Record Feedback'
,p_button_position=>'RIGHT_OF_IR_SEARCH_BAR'
,p_button_redirect_url=>'f?p=&APP_ID.:17:&SESSION.::&DEBUG.:17::'
,p_icon_css_classes=>'fa-plus'
);
end;
/
prompt --application/pages/page_00012
begin
wwv_flow_api.create_page(
 p_id=>12
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Cooking Session Details'
,p_alias=>'COOKING-SESSION-DETAILS'
,p_page_mode=>'MODAL'
,p_step_title=>'Cooking Session Details'
,p_autocomplete_on_off=>'OFF'
,p_step_template=>wwv_flow_api.id(472224840776945867)
,p_page_template_options=>'#DEFAULT#'
,p_dialog_chained=>'N'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472541399008901806)
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
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472541455119901806)
,p_plug_name=>'Action Buttons'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_03'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>',
'    <button type="button" id="btn_delete_P12_ID" onclick="if(confirm(''Are you sure you want to delete this Cooking Session?'')){apex.submit(''DELETE'');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radiu'
||'s:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete',
'    </button>',
'  </div>',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" id="btn_save_P12_ID" onclick="apex.submit(''SAVE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-check" aria-hidden="true"></span> Save Changes',
'    </button>',
'    <button type="button" id="btn_create_P12_ID" onclick="apex.submit(''CREATE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-plus" aria-hidden="true"></span> Create Cooking Session',
'    </button>',
'  </div>',
'</div>',
'<script>',
'(function() {',
'  function checkPk() {',
'    var item = apex.item(''P12_ID'');',
'    var pkVal = item ? item.getValue() : null;',
'    var bDel = document.getElementById(''btn_delete_P12_ID'');',
'    var bSave = document.getElementById(''btn_save_P12_ID'');',
'    var bCreate = document.getElementById(''btn_create_P12_ID'');',
'    if (!pkVal) {',
'      if (bDel) bDel.style.display = ''none'';',
'      if (bSave) bSave.style.display = ''none'';',
'      if (bCreate) bCreate.style.display = ''inline-block'';',
'    } else {',
'      if (bDel) bDel.style.display = ''inline-block'';',
'      if (bSave) bSave.style.display = ''inline-block'';',
'      if (bCreate) bCreate.style.display = ''none'';',
'    }',
'  }',
'  setTimeout(checkPk, 100);',
'})();',
'</script>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472541567257901806)
,p_name=>'P12_ID'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472541608634901807)
,p_name=>'P12_SESSION_DATE'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Session Date (YYYY-MM-DD)'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472336055780945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472541785495901807)
,p_name=>'P12_HOUSEHOLD_ID'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Household'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Household -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472541813528901807)
,p_name=>'P12_APPLIANCE_ID'
,p_item_sequence=>40
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Appliance'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT name d, id r FROM appliances ORDER BY name'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Appliance -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472541921377901807)
,p_name=>'P12_POWER_SOURCE'
,p_item_sequence=>50
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Power Source'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Solar Direct'' d, ''Solar'' r FROM dual UNION ALL SELECT ''Battery Storage'', ''Battery'' FROM dual UNION ALL SELECT ''Generator Backup'', ''Generator'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Power Source -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472542081148901807)
,p_name=>'P12_PERSONS_COOKED_FOR'
,p_item_sequence=>60
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Persons Cooked For'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472542194920901807)
,p_name=>'P12_DURATION_MIN'
,p_item_sequence=>70
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Duration (Minutes)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472542250251901807)
,p_name=>'P12_COOKING_COMPLETED'
,p_item_sequence=>80
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Cooking Status'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Completed Successfully'' d, 1 r FROM dual UNION ALL SELECT ''Interrupted / Incomplete'', 0 FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Status -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472542338593901807)
,p_name=>'P12_REMARKS'
,p_item_sequence=>90
,p_item_plug_id=>wwv_flow_api.id(472541399008901806)
,p_prompt=>'Notes / Remarks'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>60
,p_cHeight=>3
,p_field_template=>wwv_flow_api.id(472335722995945909)
,p_attribute_04=>'NONE'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472542572786901807)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Process DML'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  l_id NUMBER := TO_NUMBER(:P12_ID);',
'BEGIN',
'  IF :REQUEST = ''DELETE'' THEN',
'    spcki_dml_pkg.delete_cooking_session(l_id);',
'  ELSIF :REQUEST IN (''CREATE'', ''SAVE'') THEN',
'    spcki_dml_pkg.save_cooking_session(',
'      p_id => l_id,',
'      p_session_date => TO_DATE(:P12_SESSION_DATE, ''YYYY-MM-DD''),',
'      p_household_id => TO_NUMBER(:P12_HOUSEHOLD_ID),',
'      p_appliance_id => TO_NUMBER(:P12_APPLIANCE_ID),',
'      p_power_source => :P12_POWER_SOURCE,',
'      p_persons_cooked => TO_NUMBER(:P12_PERSONS_COOKED_FOR),',
'      p_duration_min => TO_NUMBER(:P12_DURATION_MIN),',
'      p_completed => NVL(:P12_COOKING_COMPLETED, ''Y''),',
'      p_remarks => :P12_REMARKS',
'    );',
'    :P12_ID := l_id;',
'  END IF;',
'END;',
''))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>'Cooking session successfully saved.'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472542638128901807)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_CLOSE_WINDOW'
,p_process_name=>'Close Dialog'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472542459794901807)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Fetch Record'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  IF :P12_ID IS NOT NULL THEN',
'    SELECT to_char(trunc(cast(start_at as date)), ''YYYY-MM-DD''),',
'           household_id, appliance_id, power_source, persons_cooked_for, duration_min,',
'           cooking_completed, remarks',
'    INTO :P12_SESSION_DATE, :P12_HOUSEHOLD_ID, :P12_APPLIANCE_ID, :P12_POWER_SOURCE,',
'         :P12_PERSONS_COOKED_FOR, :P12_DURATION_MIN, :P12_COOKING_COMPLETED, :P12_REMARKS',
'    FROM cooking_sessions WHERE id = :P12_ID;',
'  ELSE',
'    :P12_SESSION_DATE := to_char(SYSDATE, ''YYYY-MM-DD'');',
'    :P12_POWER_SOURCE := ''Solar'';',
'    :P12_PERSONS_COOKED_FOR := 5;',
'    :P12_DURATION_MIN := 120;',
'    :P12_COOKING_COMPLETED := ''1'';',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
end;
/
prompt --application/pages/page_00013
begin
wwv_flow_api.create_page(
 p_id=>13
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Household Details'
,p_alias=>'HOUSEHOLD-DETAILS'
,p_page_mode=>'MODAL'
,p_step_title=>'Household Details'
,p_autocomplete_on_off=>'OFF'
,p_step_template=>wwv_flow_api.id(472224840776945867)
,p_page_template_options=>'#DEFAULT#'
,p_dialog_chained=>'N'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472542818127901815)
,p_plug_name=>'Household Information'
,p_region_template_options=>'#DEFAULT#'
,p_escape_on_http_output=>'Y'
,p_plug_template=>wwv_flow_api.id(472274973856945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472542903943901817)
,p_plug_name=>'Action Buttons'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_03'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>',
'    <button type="button" id="btn_delete_P13_ID" onclick="if(confirm(''Are you sure you want to delete this Household?'')){apex.submit(''DELETE'');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:6px;'
||' font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete',
'    </button>',
'  </div>',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" id="btn_save_P13_ID" onclick="apex.submit(''SAVE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-check" aria-hidden="true"></span> Save Changes',
'    </button>',
'    <button type="button" id="btn_create_P13_ID" onclick="apex.submit(''CREATE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-plus" aria-hidden="true"></span> Create Household',
'    </button>',
'  </div>',
'</div>',
'<script>',
'(function() {',
'  function checkPk() {',
'    var item = apex.item(''P13_ID'');',
'    var pkVal = item ? item.getValue() : null;',
'    var bDel = document.getElementById(''btn_delete_P13_ID'');',
'    var bSave = document.getElementById(''btn_save_P13_ID'');',
'    var bCreate = document.getElementById(''btn_create_P13_ID'');',
'    if (!pkVal) {',
'      if (bDel) bDel.style.display = ''none'';',
'      if (bSave) bSave.style.display = ''none'';',
'      if (bCreate) bCreate.style.display = ''inline-block'';',
'    } else {',
'      if (bDel) bDel.style.display = ''inline-block'';',
'      if (bSave) bSave.style.display = ''inline-block'';',
'      if (bCreate) bCreate.style.display = ''none'';',
'    }',
'  }',
'  setTimeout(checkPk, 100);',
'})();',
'</script>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543019511901817)
,p_name=>'P13_ID'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543176974901817)
,p_name=>'P13_HOUSEHOLD_CODE'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Household Code'
,p_placeholder=>'e.g. HH-017'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>20
,p_field_template=>wwv_flow_api.id(472336055780945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543291206901817)
,p_name=>'P13_FAMILY_SIZE'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Family Size (Total Members)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543353536901817)
,p_name=>'P13_ADULTS_COUNT'
,p_item_sequence=>40
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Adults Count'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543480824901817)
,p_name=>'P13_CHILDREN_COUNT'
,p_item_sequence=>50
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Children Count'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543590888901817)
,p_name=>'P13_BASELINE_FUEL_TYPE'
,p_item_sequence=>60
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Baseline Cooking Fuel'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Firewood'' d, ''Firewood'' r FROM dual UNION ALL SELECT ''Charcoal'', ''Charcoal'' FROM dual UNION ALL SELECT ''LPG Cylinder'', ''LPG Cylinder'' FROM dual UNION ALL SELECT ''Kerosene'', ''Kerosene'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Baseline Fuel -'
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543626202901817)
,p_name=>'P13_BASELINE_MONTHLY_FUEL_COST'
,p_item_sequence=>70
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Baseline Monthly Fuel Cost (BDT)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543722542901817)
,p_name=>'P13_STATUS'
,p_item_sequence=>80
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Status'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Active'' d, ''Active'' r FROM dual UNION ALL SELECT ''Inactive'', ''Inactive'' FROM dual UNION ALL SELECT ''Withdrawn'', ''Withdrawn'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Status -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472543814963901817)
,p_name=>'P13_JOINED_DATE'
,p_item_sequence=>90
,p_item_plug_id=>wwv_flow_api.id(472542818127901815)
,p_prompt=>'Joined Date (YYYY-MM-DD)'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472335722995945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472544093928901817)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Process DML'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  l_id NUMBER := TO_NUMBER(:P13_ID);',
'BEGIN',
'  IF :REQUEST = ''DELETE'' THEN',
'    spcki_dml_pkg.delete_household(l_id);',
'  ELSIF :REQUEST IN (''CREATE'', ''SAVE'') THEN',
'    spcki_dml_pkg.save_household(',
'      p_id => l_id,',
'      p_kitchen_id => 1,',
'      p_code => :P13_HOUSEHOLD_CODE,',
'      p_family_size => TO_NUMBER(:P13_FAMILY_SIZE),',
'      p_adults => TO_NUMBER(:P13_ADULTS_COUNT),',
'      p_children => TO_NUMBER(:P13_CHILDREN_COUNT),',
'      p_fuel_type => :P13_BASELINE_FUEL_TYPE,',
'      p_fuel_cost => TO_NUMBER(:P13_BASELINE_MONTHLY_FUEL_COST),',
'      p_status => :P13_STATUS,',
'      p_joined_date => TO_DATE(:P13_JOINED_DATE, ''YYYY-MM-DD'')',
'    );',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>'Household record successfully saved.'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472544187801901817)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_CLOSE_WINDOW'
,p_process_name=>'Close Dialog'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472543990715901817)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Fetch Record'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  IF :P13_ID IS NOT NULL THEN',
'    SELECT household_code, family_size, children_count, adults_count,',
'           baseline_fuel_type, baseline_monthly_fuel_cost, status,',
'           to_char(joined_date, ''YYYY-MM-DD'')',
'    INTO :P13_HOUSEHOLD_CODE, :P13_FAMILY_SIZE, :P13_CHILDREN_COUNT, :P13_ADULTS_COUNT,',
'         :P13_BASELINE_FUEL_TYPE, :P13_BASELINE_MONTHLY_FUEL_COST, :P13_STATUS,',
'         :P13_JOINED_DATE',
'    FROM households WHERE id = :P13_ID;',
'  ELSE',
'    :P13_FAMILY_SIZE := 5;',
'    :P13_ADULTS_COUNT := 3;',
'    :P13_CHILDREN_COUNT := 2;',
'    :P13_STATUS := ''Active'';',
'    :P13_JOINED_DATE := to_char(SYSDATE, ''YYYY-MM-DD'');',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
end;
/
prompt --application/pages/page_00014
begin
wwv_flow_api.create_page(
 p_id=>14
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Kitchen Slot Details'
,p_alias=>'KITCHEN-SLOT-DETAILS'
,p_page_mode=>'MODAL'
,p_step_title=>'Kitchen Slot Details'
,p_autocomplete_on_off=>'OFF'
,p_step_template=>wwv_flow_api.id(472224840776945867)
,p_page_template_options=>'#DEFAULT#'
,p_dialog_chained=>'N'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472551376442010159)
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
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472551464727010159)
,p_plug_name=>'Action Buttons'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_03'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>',
'    <button type="button" id="btn_delete_P14_ID" onclick="if(confirm(''Are you sure you want to delete this Kitchen Slot?'')){apex.submit(''DELETE'');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:6'
||'px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete',
'    </button>',
'  </div>',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" id="btn_save_P14_ID" onclick="apex.submit(''SAVE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-check" aria-hidden="true"></span> Save Changes',
'    </button>',
'    <button type="button" id="btn_create_P14_ID" onclick="apex.submit(''CREATE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-plus" aria-hidden="true"></span> Create Kitchen Slot',
'    </button>',
'  </div>',
'</div>',
'<script>',
'(function() {',
'  function checkPk() {',
'    var item = apex.item(''P14_ID'');',
'    var pkVal = item ? item.getValue() : null;',
'    var bDel = document.getElementById(''btn_delete_P14_ID'');',
'    var bSave = document.getElementById(''btn_save_P14_ID'');',
'    var bCreate = document.getElementById(''btn_create_P14_ID'');',
'    if (!pkVal) {',
'      if (bDel) bDel.style.display = ''none'';',
'      if (bSave) bSave.style.display = ''none'';',
'      if (bCreate) bCreate.style.display = ''inline-block'';',
'    } else {',
'      if (bDel) bDel.style.display = ''inline-block'';',
'      if (bSave) bSave.style.display = ''inline-block'';',
'      if (bCreate) bCreate.style.display = ''none'';',
'    }',
'  }',
'  setTimeout(checkPk, 100);',
'})();',
'</script>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472551585504010159)
,p_name=>'P14_ID'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472551645396010160)
,p_name=>'P14_SLOT_DATE'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Slot Date (YYYY-MM-DD)'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472336055780945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472551727290010160)
,p_name=>'P14_SLOT_NO'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Station Number (1-6)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>5
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472551881041010160)
,p_name=>'P14_START_TIME'
,p_item_sequence=>40
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Start Time'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''07:00'' d, ''07:00'' r FROM dual UNION ALL SELECT ''10:00'', ''10:00'' FROM dual UNION ALL SELECT ''13:00'', ''13:00'' FROM dual UNION ALL SELECT ''16:00'', ''16:00'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Start Time -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472551974051010160)
,p_name=>'P14_END_TIME'
,p_item_sequence=>50
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'End Time'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''10:00'' d, ''10:00'' r FROM dual UNION ALL SELECT ''13:00'', ''13:00'' FROM dual UNION ALL SELECT ''16:00'', ''16:00'' FROM dual UNION ALL SELECT ''19:00'', ''19:00'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select End Time -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472552008429010160)
,p_name=>'P14_POWER_SOURCE'
,p_item_sequence=>60
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Power Source'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Solar Direct'' d, ''Solar'' r FROM dual UNION ALL SELECT ''Battery Storage'', ''Battery'' FROM dual UNION ALL SELECT ''Generator Backup'', ''Generator'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Power Source -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472552108517010160)
,p_name=>'P14_HOUSEHOLD_ID'
,p_item_sequence=>70
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Assigned Household'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Unassigned / Open Slot -'
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472552224846010160)
,p_name=>'P14_STATUS'
,p_item_sequence=>80
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Slot Status'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Scheduled'' d, ''Scheduled'' r FROM dual UNION ALL SELECT ''Attended'', ''Attended'' FROM dual UNION ALL SELECT ''Missed'', ''Missed'' FROM dual UNION ALL SELECT ''Cancelled'', ''Cancelled'' FROM dual UNION ALL SELECT ''Swapped'', ''Swapped'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Status -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472552324164010160)
,p_name=>'P14_NOTE'
,p_item_sequence=>90
,p_item_plug_id=>wwv_flow_api.id(472551376442010159)
,p_prompt=>'Notes'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>40
,p_field_template=>wwv_flow_api.id(472335722995945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472552514302010160)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Process DML'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  l_id NUMBER := TO_NUMBER(:P14_ID);',
'BEGIN',
'  IF :REQUEST = ''DELETE'' THEN',
'    spcki_dml_pkg.delete_slot(l_id);',
'  ELSIF :REQUEST IN (''CREATE'', ''SAVE'') THEN',
'    spcki_dml_pkg.save_slot(',
'      p_id           => l_id,',
'      p_kitchen_id   => 1,',
'      p_slot_date    => TO_DATE(:P14_SLOT_DATE, ''YYYY-MM-DD''),',
'      p_slot_no      => TO_NUMBER(:P14_SLOT_NO),',
'      p_start_time   => :P14_START_TIME,',
'      p_end_time     => :P14_END_TIME,',
'      p_power_source => :P14_POWER_SOURCE,',
'      p_household_id => TO_NUMBER(:P14_HOUSEHOLD_ID),',
'      p_status       => :P14_STATUS,',
'      p_note         => :P14_NOTE',
'    );',
'    :P14_ID := l_id;',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>'Kitchen slot schedule successfully updated.'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472552664450010160)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_CLOSE_WINDOW'
,p_process_name=>'Close Dialog'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472552450401010160)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Fetch Record'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  IF :P14_ID IS NOT NULL THEN',
'    SELECT to_char(slot_date, ''YYYY-MM-DD''), slot_no, start_time, end_time,',
'           power_source, household_id, status, note',
'    INTO :P14_SLOT_DATE, :P14_SLOT_NO, :P14_START_TIME, :P14_END_TIME,',
'         :P14_POWER_SOURCE, :P14_HOUSEHOLD_ID, :P14_STATUS, :P14_NOTE',
'    FROM slots WHERE id = :P14_ID;',
'  ELSE',
'    :P14_SLOT_DATE := to_char(SYSDATE, ''YYYY-MM-DD''); :P14_SLOT_NO := 1;',
'    :P14_START_TIME := ''07:00''; :P14_END_TIME := ''10:00'';',
'    :P14_POWER_SOURCE := ''Solar''; :P14_STATUS := ''Scheduled'';',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
end;
/
prompt --application/pages/page_00015
begin
wwv_flow_api.create_page(
 p_id=>15
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Daily Technical Log Details'
,p_alias=>'DAILY-LOG-DETAILS'
,p_page_mode=>'MODAL'
,p_step_title=>'Daily Technical Log Details'
,p_autocomplete_on_off=>'OFF'
,p_step_template=>wwv_flow_api.id(472224840776945867)
,p_page_template_options=>'#DEFAULT#'
,p_dialog_chained=>'N'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472552867256010167)
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
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472552968009010168)
,p_plug_name=>'Action Buttons'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_03'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>',
'    <button type="button" id="btn_delete_P15_ID" onclick="if(confirm(''Are you sure you want to delete this Daily Technical Log?'')){apex.submit(''DELETE'');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-r'
||'adius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete',
'    </button>',
'  </div>',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" id="btn_save_P15_ID" onclick="apex.submit(''SAVE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-check" aria-hidden="true"></span> Save Changes',
'    </button>',
'    <button type="button" id="btn_create_P15_ID" onclick="apex.submit(''CREATE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-plus" aria-hidden="true"></span> Create Daily Technical Log',
'    </button>',
'  </div>',
'</div>',
'<script>',
'(function() {',
'  function checkPk() {',
'    var item = apex.item(''P15_ID'');',
'    var pkVal = item ? item.getValue() : null;',
'    var bDel = document.getElementById(''btn_delete_P15_ID'');',
'    var bSave = document.getElementById(''btn_save_P15_ID'');',
'    var bCreate = document.getElementById(''btn_create_P15_ID'');',
'    if (!pkVal) {',
'      if (bDel) bDel.style.display = ''none'';',
'      if (bSave) bSave.style.display = ''none'';',
'      if (bCreate) bCreate.style.display = ''inline-block'';',
'    } else {',
'      if (bDel) bDel.style.display = ''inline-block'';',
'      if (bSave) bSave.style.display = ''inline-block'';',
'      if (bCreate) bCreate.style.display = ''none'';',
'    }',
'  }',
'  setTimeout(checkPk, 100);',
'})();',
'</script>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553016091010168)
,p_name=>'P15_ID'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553160909010168)
,p_name=>'P15_LOG_DATE'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Log Date (YYYY-MM-DD)'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472336055780945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553292950010168)
,p_name=>'P15_SOLAR_KWH'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Solar Generation (kWh)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>12
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553351108010168)
,p_name=>'P15_MORNING_SOC'
,p_item_sequence=>40
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Morning Battery SOC (%)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>8
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553493872010168)
,p_name=>'P15_EVENING_SOC'
,p_item_sequence=>50
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Evening Battery SOC (%)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>8
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553594087010168)
,p_name=>'P15_WEATHER'
,p_item_sequence=>60
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Weather Condition'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Sunny'' d, ''Sunny'' r FROM dual UNION ALL SELECT ''Partly cloudy'', ''Partly cloudy'' FROM dual UNION ALL SELECT ''Overcast'', ''Overcast'' FROM dual UNION ALL SELECT ''Rainy'', ''Rainy'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Weather -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553686451010168)
,p_name=>'P15_SYSTEM_OPERATIONAL'
,p_item_sequence=>70
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Operational Status'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Yes - 100% Operational'' d, ''1'' r FROM dual UNION ALL SELECT ''No - System Fault'', ''0'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Status -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553756286010168)
,p_name=>'P15_ENERGY_CONSUMED_KWH'
,p_item_sequence=>80
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Energy Consumed (kWh)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>12
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472553868827010168)
,p_name=>'P15_REMARKS'
,p_item_sequence=>90
,p_item_plug_id=>wwv_flow_api.id(472552867256010167)
,p_prompt=>'Remarks / Inverter Diagnostics'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>60
,p_cHeight=>3
,p_field_template=>wwv_flow_api.id(472335722995945909)
,p_attribute_04=>'NONE'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472554099935010168)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Process DML'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  l_id NUMBER := TO_NUMBER(:P15_ID);',
'BEGIN',
'  IF :REQUEST = ''DELETE'' THEN',
'    spcki_dml_pkg.delete_daily_log(l_id);',
'  ELSIF :REQUEST IN (''CREATE'', ''SAVE'') THEN',
'    spcki_dml_pkg.save_daily_log(',
'      p_id           => l_id,',
'      p_kitchen_id   => 1,',
'      p_log_date     => TO_DATE(:P15_LOG_DATE, ''YYYY-MM-DD''),',
'      p_solar_kwh    => TO_NUMBER(:P15_SOLAR_KWH),',
'      p_morning_soc  => TO_NUMBER(:P15_MORNING_SOC),',
'      p_evening_soc  => TO_NUMBER(:P15_EVENING_SOC),',
'      p_weather      => :P15_WEATHER,',
'      p_operational  => :P15_SYSTEM_OPERATIONAL,',
'      p_consumed_kwh => TO_NUMBER(:P15_ENERGY_CONSUMED_KWH),',
'      p_remarks      => :P15_REMARKS',
'    );',
'    :P15_ID := l_id;',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>'Technical log recorded successfully.'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472554165348010170)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_CLOSE_WINDOW'
,p_process_name=>'Close Dialog'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472553988074010168)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Fetch Record'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  IF :P15_ID IS NOT NULL THEN',
'    SELECT to_char(log_date, ''YYYY-MM-DD''), solar_kwh, morning_soc, evening_soc,',
'           weather, CASE WHEN system_operational = ''Y'' THEN ''1'' ELSE ''0'' END,',
'           energy_consumed_kwh, remarks',
'    INTO :P15_LOG_DATE, :P15_SOLAR_KWH, :P15_MORNING_SOC, :P15_EVENING_SOC,',
'         :P15_WEATHER, :P15_SYSTEM_OPERATIONAL, :P15_ENERGY_CONSUMED_KWH, :P15_REMARKS',
'    FROM daily_technical_logs WHERE id = :P15_ID;',
'  ELSE',
'    :P15_LOG_DATE := to_char(SYSDATE, ''YYYY-MM-DD''); :P15_SOLAR_KWH := 16.5;',
'    :P15_MORNING_SOC := 75; :P15_EVENING_SOC := 95; :P15_WEATHER := ''Sunny'';',
'    :P15_SYSTEM_OPERATIONAL := ''1''; :P15_ENERGY_CONSUMED_KWH := 11.2;',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
end;
/
prompt --application/pages/page_00016
begin
wwv_flow_api.create_page(
 p_id=>16
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Generator Log Details'
,p_alias=>'GENERATOR-LOG-DETAILS'
,p_page_mode=>'MODAL'
,p_step_title=>'Generator Run Log Details'
,p_autocomplete_on_off=>'OFF'
,p_step_template=>wwv_flow_api.id(472224840776945867)
,p_page_template_options=>'#DEFAULT#'
,p_dialog_chained=>'N'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472554388965010178)
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
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472554459457010178)
,p_plug_name=>'Action Buttons'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_03'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>',
'    <button type="button" id="btn_delete_P16_ID" onclick="if(confirm(''Are you sure you want to delete this Generator Run?'')){apex.submit(''DELETE'');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:'
||'6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete',
'    </button>',
'  </div>',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" id="btn_save_P16_ID" onclick="apex.submit(''SAVE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-check" aria-hidden="true"></span> Save Changes',
'    </button>',
'    <button type="button" id="btn_create_P16_ID" onclick="apex.submit(''CREATE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-plus" aria-hidden="true"></span> Create Generator Run',
'    </button>',
'  </div>',
'</div>',
'<script>',
'(function() {',
'  function checkPk() {',
'    var item = apex.item(''P16_ID'');',
'    var pkVal = item ? item.getValue() : null;',
'    var bDel = document.getElementById(''btn_delete_P16_ID'');',
'    var bSave = document.getElementById(''btn_save_P16_ID'');',
'    var bCreate = document.getElementById(''btn_create_P16_ID'');',
'    if (!pkVal) {',
'      if (bDel) bDel.style.display = ''none'';',
'      if (bSave) bSave.style.display = ''none'';',
'      if (bCreate) bCreate.style.display = ''inline-block'';',
'    } else {',
'      if (bDel) bDel.style.display = ''inline-block'';',
'      if (bSave) bSave.style.display = ''inline-block'';',
'      if (bCreate) bCreate.style.display = ''none'';',
'    }',
'  }',
'  setTimeout(checkPk, 100);',
'})();',
'</script>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472554527213010178)
,p_name=>'P16_ID'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472554672980010178)
,p_name=>'P16_LOG_DATE'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Run Date (YYYY-MM-DD)'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472336055780945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472554709037010178)
,p_name=>'P16_RUNNING_HOURS'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Running Hours'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>8
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472554819429010178)
,p_name=>'P16_FUEL_START_L'
,p_item_sequence=>40
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Fuel Before Run (Litres)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472554902813010178)
,p_name=>'P16_REFUEL_L'
,p_item_sequence=>50
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Refueled (Litres)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472555056593010178)
,p_name=>'P16_FUEL_END_L'
,p_item_sequence=>60
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Fuel After Run (Litres)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472555106136010178)
,p_name=>'P16_MAINTENANCE_REQUIRED'
,p_item_sequence=>70
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Maintenance Required'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''No'' d, ''0'' r FROM dual UNION ALL SELECT ''Yes'', ''1'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select -'
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472555286208010178)
,p_name=>'P16_REMARKS'
,p_item_sequence=>80
,p_item_plug_id=>wwv_flow_api.id(472554388965010178)
,p_prompt=>'Operator Remarks / Reason'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>60
,p_cHeight=>3
,p_field_template=>wwv_flow_api.id(472335722995945909)
,p_attribute_04=>'NONE'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472555402112010179)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Process DML'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  l_id NUMBER := TO_NUMBER(:P16_ID);',
'BEGIN',
'  IF :REQUEST = ''DELETE'' THEN',
'    spcki_dml_pkg.delete_generator_log(l_id);',
'  ELSIF :REQUEST IN (''CREATE'', ''SAVE'') THEN',
'    spcki_dml_pkg.save_generator_log(',
'      p_id          => l_id,',
'      p_kitchen_id  => 1,',
'      p_log_date    => TO_DATE(:P16_LOG_DATE, ''YYYY-MM-DD''),',
'      p_running_hrs => TO_NUMBER(:P16_RUNNING_HOURS),',
'      p_fuel_start  => TO_NUMBER(:P16_FUEL_START_L),',
'      p_refuel      => NVL(TO_NUMBER(:P16_REFUEL_L), 0),',
'      p_fuel_end    => TO_NUMBER(:P16_FUEL_END_L),',
'      p_maint_req   => :P16_MAINTENANCE_REQUIRED,',
'      p_remarks     => :P16_REMARKS',
'    );',
'    :P16_ID := l_id;',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>'Generator log entry recorded successfully.'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472555587223010179)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_CLOSE_WINDOW'
,p_process_name=>'Close Dialog'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472555306825010179)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Fetch Record'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  IF :P16_ID IS NOT NULL THEN',
'    SELECT to_char(log_date, ''YYYY-MM-DD''), running_hours, fuel_start_l,',
'           refuel_l, fuel_end_l, CASE WHEN maintenance_required = ''Y'' THEN ''1'' ELSE ''0'' END, remarks',
'    INTO :P16_LOG_DATE, :P16_RUNNING_HOURS, :P16_FUEL_START_L,',
'         :P16_REFUEL_L, :P16_FUEL_END_L, :P16_MAINTENANCE_REQUIRED, :P16_REMARKS',
'    FROM generator_logs WHERE id = :P16_ID;',
'  ELSE',
'    :P16_LOG_DATE := to_char(SYSDATE, ''YYYY-MM-DD''); :P16_RUNNING_HOURS := 2.0;',
'    :P16_FUEL_START_L := 25.0; :P16_REFUEL_L := 0; :P16_FUEL_END_L := 22.5;',
'    :P16_MAINTENANCE_REQUIRED := ''0'';',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
end;
/
prompt --application/pages/page_00017
begin
wwv_flow_api.create_page(
 p_id=>17
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Monthly Feedback Details'
,p_alias=>'FEEDBACK-DETAILS'
,p_page_mode=>'MODAL'
,p_step_title=>'Household Survey & Feedback Details'
,p_autocomplete_on_off=>'OFF'
,p_step_template=>wwv_flow_api.id(472224840776945867)
,p_page_template_options=>'#DEFAULT#'
,p_dialog_chained=>'N'
,p_last_upd_yyyymmddhh24miss=>'20261014013400'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472555784399010185)
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
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472555873543010185)
,p_plug_name=>'Action Buttons'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'REGION_POSITION_03'
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>',
'    <button type="button" id="btn_delete_P17_ID" onclick="if(confirm(''Are you sure you want to delete this Feedback?'')){apex.submit(''DELETE'');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:6px; '
||'font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete',
'    </button>',
'  </div>',
'  <div style="display:flex; gap:10px;">',
'    <button type="button" id="btn_save_P17_ID" onclick="apex.submit(''SAVE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-check" aria-hidden="true"></span> Save Changes',
'    </button>',
'    <button type="button" id="btn_create_P17_ID" onclick="apex.submit(''CREATE'');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">',
'      <span class="fa fa-plus" aria-hidden="true"></span> Create Feedback',
'    </button>',
'  </div>',
'</div>',
'<script>',
'(function() {',
'  function checkPk() {',
'    var item = apex.item(''P17_ID'');',
'    var pkVal = item ? item.getValue() : null;',
'    var bDel = document.getElementById(''btn_delete_P17_ID'');',
'    var bSave = document.getElementById(''btn_save_P17_ID'');',
'    var bCreate = document.getElementById(''btn_create_P17_ID'');',
'    if (!pkVal) {',
'      if (bDel) bDel.style.display = ''none'';',
'      if (bSave) bSave.style.display = ''none'';',
'      if (bCreate) bCreate.style.display = ''inline-block'';',
'    } else {',
'      if (bDel) bDel.style.display = ''inline-block'';',
'      if (bSave) bSave.style.display = ''inline-block'';',
'      if (bCreate) bCreate.style.display = ''none'';',
'    }',
'  }',
'  setTimeout(checkPk, 100);',
'})();',
'</script>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'HTML'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472555983821010185)
,p_name=>'P17_ID'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_display_as=>'NATIVE_HIDDEN'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556016722010185)
,p_name=>'P17_SURVEY_MONTH'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Survey Month (YYYY-MM-DD)'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>15
,p_field_template=>wwv_flow_api.id(472336055780945909)
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556163178010185)
,p_name=>'P17_HOUSEHOLD_ID'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Household'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT household_code d, id r FROM households ORDER BY household_code'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Household -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556271805010185)
,p_name=>'P17_OVERALL_RATING'
,p_item_sequence=>40
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Overall Satisfaction'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''5 - Highly Satisfied (5 Stars)'' d, 5 r FROM dual UNION ALL SELECT ''4 - Satisfied (4 Stars)'', 4 FROM dual UNION ALL SELECT ''3 - Neutral'', 3 FROM dual UNION ALL SELECT ''2 - Dissatisfied'', 2 FROM dual UNION ALL SELECT ''1 - Very Dissatisfied'', 1 '
||'FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Rating -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556377972010187)
,p_name=>'P17_SAFETY_RATING'
,p_item_sequence=>50
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Safety Perception'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''5 - Extremely Safe'' d, 5 r FROM dual UNION ALL SELECT ''4 - Safe'', 4 FROM dual UNION ALL SELECT ''3 - Neutral'', 3 FROM dual UNION ALL SELECT ''2 - Unsafe'', 2 FROM dual UNION ALL SELECT ''1 - Very Unsafe'', 1 FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Rating -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556426258010187)
,p_name=>'P17_CLEANLINESS_RATING'
,p_item_sequence=>60
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Cleanliness & Hygiene'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''5 - Spotless'' d, 5 r FROM dual UNION ALL SELECT ''4 - Very Clean'', 4 FROM dual UNION ALL SELECT ''3 - Acceptable'', 3 FROM dual UNION ALL SELECT ''2 - Poor'', 2 FROM dual UNION ALL SELECT ''1 - Unhygienic'', 1 FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Rating -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556521321010187)
,p_name=>'P17_EASE_RATING'
,p_item_sequence=>70
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Ease of Electric Cooking'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''5 - Very Intuitive & Fast'' d, 5 r FROM dual UNION ALL SELECT ''4 - Easy'', 4 FROM dual UNION ALL SELECT ''3 - Moderate'', 3 FROM dual UNION ALL SELECT ''2 - Difficult'', 2 FROM dual UNION ALL SELECT ''1 - Very Difficult'', 1 FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select Rating -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556643940010187)
,p_name=>'P17_BACKUP_FUEL_USED'
,p_item_sequence=>80
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Did you use Traditional Backup Fuel?'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''No - 100% Communal Kitchen'' d, ''0'' r FROM dual UNION ALL SELECT ''Yes - Used Firewood/Charcoal'', ''1'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556735742010187)
,p_name=>'P17_BACKUP_FUEL_SPEND'
,p_item_sequence=>90
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Backup Fuel Spend (BDT)'
,p_display_as=>'NATIVE_NUMBER_FIELD'
,p_cSize=>10
,p_field_template=>wwv_flow_api.id(472335722995945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556826362010187)
,p_name=>'P17_WILLING_TO_CONTINUE'
,p_item_sequence=>100
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Willing to Continue Pilot?'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT ''Yes - Unanimously'' d, ''1'' r FROM dual UNION ALL SELECT ''No'', ''0'' FROM dual'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Select -'
,p_field_template=>wwv_flow_api.id(472336055780945909)
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472556949002010187)
,p_name=>'P17_REMARKS'
,p_item_sequence=>110
,p_item_plug_id=>wwv_flow_api.id(472555784399010185)
,p_prompt=>'Household Comments & Testimonial'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>60
,p_cHeight=>3
,p_field_template=>wwv_flow_api.id(472335722995945909)
,p_attribute_04=>'NONE'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472557199632010187)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Process DML'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'DECLARE',
'  l_id NUMBER := TO_NUMBER(:P17_ID);',
'BEGIN',
'  IF :REQUEST = ''DELETE'' THEN',
'    spcki_dml_pkg.delete_feedback(l_id);',
'  ELSIF :REQUEST IN (''CREATE'', ''SAVE'') THEN',
'    spcki_dml_pkg.save_feedback(',
'      p_id             => l_id,',
'      p_survey_month   => TO_DATE(:P17_SURVEY_MONTH, ''YYYY-MM-DD''),',
'      p_household_id   => TO_NUMBER(:P17_HOUSEHOLD_ID),',
'      p_overall_rating => TO_NUMBER(:P17_OVERALL_RATING),',
'      p_safety_rating  => TO_NUMBER(:P17_SAFETY_RATING),',
'      p_clean_rating   => TO_NUMBER(:P17_CLEANLINESS_RATING),',
'      p_ease_rating    => TO_NUMBER(:P17_EASE_RATING),',
'      p_backup_fuel    => :P17_BACKUP_FUEL_USED,',
'      p_backup_spend   => NVL(TO_NUMBER(:P17_BACKUP_FUEL_SPEND), 0),',
'      p_willing        => :P17_WILLING_TO_CONTINUE,',
'      p_remarks        => :P17_REMARKS',
'    );',
'    :P17_ID := l_id;',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_success_message=>'Feedback response recorded successfully.'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472557293866010187)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_CLOSE_WINDOW'
,p_process_name=>'Close Dialog'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472557007459010187)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Fetch Record'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'BEGIN',
'  IF :P17_ID IS NOT NULL THEN',
'    SELECT to_char(survey_month, ''YYYY-MM-DD''), household_id, overall_rating,',
'           safety_rating, cleanliness_rating, ease_rating,',
'           CASE WHEN backup_fuel_used = ''Y'' THEN ''1'' ELSE ''0'' END,',
'           backup_fuel_spend,',
'           CASE WHEN willing_to_continue = ''Y'' THEN ''1'' ELSE ''0'' END,',
'           remarks',
'    INTO :P17_SURVEY_MONTH, :P17_HOUSEHOLD_ID, :P17_OVERALL_RATING,',
'         :P17_SAFETY_RATING, :P17_CLEANLINESS_RATING, :P17_EASE_RATING, :P17_BACKUP_FUEL_USED,',
'         :P17_BACKUP_FUEL_SPEND, :P17_WILLING_TO_CONTINUE, :P17_REMARKS',
'    FROM monthly_feedback WHERE id = :P17_ID;',
'  ELSE',
'    :P17_SURVEY_MONTH := to_char(TRUNC(SYSDATE, ''MM''), ''YYYY-MM-DD'');',
'    :P17_OVERALL_RATING := 5; :P17_SAFETY_RATING := 5; :P17_CLEANLINESS_RATING := 5; :P17_EASE_RATING := 5;',
'    :P17_BACKUP_FUEL_USED := ''0''; :P17_BACKUP_FUEL_SPEND := 0; :P17_WILLING_TO_CONTINUE := ''1'';',
'  END IF;',
'END;'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
end;
/
prompt --application/pages/page_09999
begin
wwv_flow_api.create_page(
 p_id=>9999
,p_user_interface_id=>wwv_flow_api.id(472359594532945931)
,p_name=>'Login Page'
,p_alias=>'LOGIN'
,p_step_title=>'SPCKI Monitoring Platform - Sign In'
,p_warn_on_unsaved_changes=>'N'
,p_first_item=>'AUTO_FIRST_ITEM'
,p_autocomplete_on_off=>'OFF'
,p_javascript_code=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'document.addEventListener(''DOMContentLoaded'', function() {',
'  var u = document.getElementById(''P9999_USERNAME'');',
'  var p = document.getElementById(''P9999_PASSWORD'');',
'  function handleEnter(e) {',
'    if (e.key === ''Enter'') {',
'      e.preventDefault();',
'      apex.submit({request: ''LOGIN'', validate: true});',
'    }',
'  }',
'  if (u) u.addEventListener(''keydown'', handleEnter);',
'  if (p) p.addEventListener(''keydown'', handleEnter);',
'  if (u && !u.value) u.focus();',
'  else if (p) p.focus();',
'',
'  var links = document.querySelector(''.t-Login-links'');',
'  if (links) {',
'    links.innerHTML = ''<div class="spcki-login-footer">Enterprise Clean Energy Platform &bull; Secure Access</div>'';',
'  }',
'});',
''))
,p_inline_css=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'@import url(''https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'');',
'',
'html, body {',
'  font-family: ''Plus Jakarta Sans'', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;',
'  background: #f8fafc !important;',
'  color: #0f172a !important;',
'  margin: 0 !important;',
'  padding: 0 !important;',
'  min-height: 100vh !important;',
'}',
'',
'/* Background & Centering */',
'.t-PageBody--login {',
'  background: radial-gradient(circle at 50% 12%, #f1f5f9 0%, #f8fafc 100%) !important;',
'  display: flex !important;',
'  align-items: center !important;',
'  justify-content: center !important;',
'  min-height: 100vh !important;',
'}',
'',
'.t-Login-container {',
'  max-width: 420px !important;',
'  width: 100% !important;',
'  margin: auto !important;',
'  padding: 24px 16px !important;',
'}',
'',
'.t-Login-containerBody {',
'  padding: 0 !important;',
'}',
'',
'/* Pristine Minimalist Card */',
'.t-Login-region {',
'  background: #ffffff !important;',
'  border: 1px solid #e2e8f0 !important;',
'  border-radius: 18px !important;',
'  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.02) !important;',
'  padding: 38px 34px 34px 34px !important;',
'  position: relative !important;',
'  overflow: hidden !important;',
'}',
'',
'/* Hide APEX theme redundant header and rocket icon */',
'.t-Login-header,',
'.t-Login-logo,',
'.t-Login-title,',
'.app-icon {',
'  display: none !important;',
'}',
'',
'.t-Login-subRegions {',
'  display: none !important;',
'}',
'',
'/* Bespoke Unified Brand Header */',
'.spcki-login-brand {',
'  text-align: center;',
'  margin-bottom: 26px;',
'}',
'',
'.spcki-brand-icon {',
'  display: inline-flex;',
'  align-items: center;',
'  justify-content: center;',
'  width: 52px;',
'  height: 52px;',
'  background: #0f172a;',
'  border-radius: 14px;',
'  color: #f59e0b;',
'  font-size: 24px;',
'  margin-bottom: 14px;',
'  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.14);',
'}',
'',
'.spcki-brand-title {',
'  margin: 0;',
'  font-size: 1.4rem;',
'  font-weight: 700;',
'  color: #0f172a;',
'  letter-spacing: -0.025em;',
'  line-height: 1.25;',
'}',
'',
'.spcki-brand-subtitle {',
'  margin: 5px 0 0 0;',
'  font-size: 0.86rem;',
'  color: #64748b;',
'  font-weight: 500;',
'}',
'',
'/* Form Layout */',
'.t-Login-body {',
'  padding: 0 !important;',
'}',
'',
'.t-Form-fieldContainer {',
'  margin-bottom: 16px !important;',
'  padding: 0 !important;',
'}',
'',
'.t-Form-itemWrapper {',
'  position: relative !important;',
'  display: block !important;',
'  width: 100% !important;',
'}',
'',
'/* Modern Input Controls */',
'.t-Form-inputContainer input.text_field,',
'.t-Form-inputContainer input.password {',
'  width: 100% !important;',
'  height: 46px !important;',
'  background-color: #ffffff !important;',
'  border: 1px solid #d1d5db !important;',
'  border-radius: 9px !important;',
'  padding-left: 42px !important;',
'  padding-right: 14px !important;',
'  font-size: 0.94rem !important;',
'  font-family: inherit !important;',
'  color: #0f172a !important;',
'  transition: all 0.15s ease-in-out !important;',
'  box-sizing: border-box !important;',
'}',
'',
'.t-Form-inputContainer input.text_field:focus,',
'.t-Form-inputContainer input.password:focus {',
'  background-color: #ffffff !important;',
'  border-color: #0f172a !important;',
'  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08) !important;',
'  outline: none !important;',
'}',
'',
'.t-Form-inputContainer input::placeholder {',
'  color: #9ca3af !important;',
'  font-size: 0.92rem !important;',
'}',
'',
'/* Clean Input Icons */',
'.t-Form-itemWrapper .apex-item-icon {',
'  position: absolute !important;',
'  left: 14px !important;',
'  top: 50% !important;',
'  transform: translateY(-50%) !important;',
'  color: #9ca3af !important;',
'  font-size: 15px !important;',
'  background: transparent !important;',
'  border: none !important;',
'  line-height: 1 !important;',
'  pointer-events: none !important;',
'  z-index: 10 !important;',
'  display: inline-block !important;',
'}',
'',
'/* Remember username checkbox */',
'#P9999_REMEMBER_CONTAINER {',
'  margin-top: 4px !important;',
'  margin-bottom: 22px !important;',
'}',
'',
'.t-Form-helpButton {',
'  display: none !important;',
'}',
'',
'#P9999_REMEMBER_CONTAINER .apex-item-group--rc,',
'#P9999_REMEMBER_CONTAINER .apex-item-checkbox {',
'  display: flex !important;',
'  align-items: center !important;',
'}',
'',
'#P9999_REMEMBER_CONTAINER .apex-item-option {',
'  display: flex !important;',
'  align-items: center !important;',
'  position: relative !important;',
'  margin: 0 !important;',
'  cursor: pointer !important;',
'}',
'',
'#P9999_REMEMBER_CONTAINER .apex-item-option input[type="checkbox"] {',
'  order: 1 !important;',
'  position: static !important;',
'  opacity: 1 !important;',
'  width: 16px !important;',
'  height: 16px !important;',
'  margin: 0 !important;',
'  accent-color: #0f172a !important;',
'  cursor: pointer !important;',
'  border-radius: 4px !important;',
'  flex-shrink: 0 !important;',
'}',
'',
'#P9999_REMEMBER_CONTAINER .apex-item-option label {',
'  order: 2 !important;',
'  font-size: 0.88rem !important;',
'  color: #475569 !important;',
'  font-weight: 500 !important;',
'  cursor: pointer !important;',
'  padding-left: 8px !important;',
'  margin: 0 !important;',
'  line-height: 1.4 !important;',
'}',
'',
'#P9999_REMEMBER_CONTAINER .apex-item-option label::before,',
'#P9999_REMEMBER_CONTAINER .apex-item-option label::after {',
'  display: none !important;',
'}',
'',
'/* Sign In Button */',
'.t-Login-buttons {',
'  margin-top: 4px !important;',
'  padding: 0 !important;',
'}',
'',
'.t-Login-buttons .t-Button--hot,',
'#B472373807972945978 {',
'  width: 100% !important;',
'  height: 46px !important;',
'  background: #0f172a !important;',
'  border: 1px solid #0f172a !important;',
'  border-radius: 9px !important;',
'  color: #ffffff !important;',
'  font-size: 0.96rem !important;',
'  font-weight: 600 !important;',
'  letter-spacing: -0.01em !important;',
'  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12) !important;',
'  cursor: pointer !important;',
'  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;',
'  display: flex !important;',
'  align-items: center !important;',
'  justify-content: center !important;',
'}',
'',
'.t-Login-buttons .t-Button--hot:hover,',
'#B472373807972945978:hover {',
'  background: #1e293b !important;',
'  border-color: #1e293b !important;',
'  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.18) !important;',
'  transform: translateY(-1px) !important;',
'}',
'',
'.t-Login-buttons .t-Button--hot:active,',
'#B472373807972945978:active {',
'  transform: translateY(0) !important;',
'  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12) !important;',
'}',
'',
'/* Sub-note footer */',
'.spcki-login-footer {',
'  text-align: center;',
'  margin-top: 24px;',
'  padding-top: 18px;',
'  border-top: 1px solid #f1f5f9;',
'  font-size: 0.78rem;',
'  color: #94a3b8;',
'  letter-spacing: 0.02em;',
'}',
''))
,p_step_template=>wwv_flow_api.id(472226368032945868)
,p_page_template_options=>'#DEFAULT#'
,p_page_is_public_y_n=>'Y'
,p_last_upd_yyyymmddhh24miss=>'20261014024126'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472371019733945971)
,p_plug_name=>'SPCKI Monitoring Platform'
,p_region_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_api.id(472273677779945887)
,p_plug_display_sequence=>10
,p_plug_display_point=>'BODY'
,p_plug_header=>wwv_flow_string.join(wwv_flow_t_varchar2(
'',
'<div class="spcki-login-brand">',
'  <div class="spcki-brand-icon">',
'    <span class="fa fa-sun-o"></span>',
'  </div>',
'  <h1 class="spcki-brand-title">SPCKI Monitoring Platform</h1>',
'  <p class="spcki-brand-subtitle">Solar Powered Community Kitchen Initiative</p>',
'</div>',
''))
,p_attribute_01=>'N'
,p_attribute_02=>'TEXT'
,p_attribute_03=>'Y'
);
wwv_flow_api.create_page_plug(
 p_id=>wwv_flow_api.id(472375799912945979)
,p_plug_name=>'Language Selector'
,p_parent_plug_id=>wwv_flow_api.id(472371019733945971)
,p_region_template_options=>'#DEFAULT#'
,p_component_template_options=>'#DEFAULT#'
,p_escape_on_http_output=>'Y'
,p_plug_template=>wwv_flow_api.id(472247597001945879)
,p_plug_display_sequence=>20
,p_plug_display_point=>'BODY'
,p_plug_source=>'apex_lang.emit_language_selector_list;'
,p_plug_source_type=>'NATIVE_PLSQL'
,p_plug_query_num_rows=>15
);
wwv_flow_api.create_page_button(
 p_id=>wwv_flow_api.id(472373807972945978)
,p_button_sequence=>40
,p_button_plug_id=>wwv_flow_api.id(472371019733945971)
,p_button_name=>'LOGIN'
,p_button_action=>'SUBMIT'
,p_button_template_options=>'#DEFAULT#'
,p_button_template_id=>wwv_flow_api.id(472337011970945910)
,p_button_is_hot=>'Y'
,p_button_image_alt=>'Sign In'
,p_button_position=>'REGION_TEMPLATE_NEXT'
,p_button_alignment=>'LEFT'
,p_grid_new_row=>'Y'
,p_grid_new_column=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472371430299945973)
,p_name=>'P9999_USERNAME'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_api.id(472371019733945971)
,p_prompt=>'Username'
,p_placeholder=>'Username'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>40
,p_cMaxlength=>100
,p_label_alignment=>'RIGHT'
,p_field_template=>wwv_flow_api.id(472335622814945909)
,p_item_icon_css_classes=>'fa-user'
,p_item_template_options=>'#DEFAULT#'
,p_is_persistent=>'N'
,p_attribute_01=>'N'
,p_attribute_02=>'N'
,p_attribute_03=>'N'
,p_attribute_04=>'TEXT'
,p_attribute_05=>'NONE'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472371819877945975)
,p_name=>'P9999_PASSWORD'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_api.id(472371019733945971)
,p_prompt=>'Password'
,p_placeholder=>'Password'
,p_display_as=>'NATIVE_PASSWORD'
,p_cSize=>40
,p_cMaxlength=>100
,p_label_alignment=>'RIGHT'
,p_field_template=>wwv_flow_api.id(472335622814945909)
,p_item_icon_css_classes=>'fa-key'
,p_item_template_options=>'#DEFAULT#'
,p_is_persistent=>'N'
,p_attribute_01=>'Y'
);
wwv_flow_api.create_page_item(
 p_id=>wwv_flow_api.id(472372906820945976)
,p_name=>'P9999_REMEMBER'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_api.id(472371019733945971)
,p_prompt=>'Remember username'
,p_display_as=>'NATIVE_CHECKBOX'
,p_named_lov=>'LOGIN_REMEMBER_USERNAME'
,p_lov=>'.'||wwv_flow_api.id(472372137129945975)||'.'
,p_label_alignment=>'RIGHT'
,p_display_when=>'apex_authentication.persistent_cookies_enabled'
,p_display_when_type=>'PLSQL_EXPRESSION'
,p_field_template=>wwv_flow_api.id(472335622814945909)
,p_item_template_options=>'#DEFAULT#'
,p_is_persistent=>'N'
,p_lov_display_extra=>'NO'
,p_help_text=>wwv_flow_string.join(wwv_flow_t_varchar2(
'<p>',
'If you select this checkbox, the application will save your username in a persistent browser cookie named "LOGIN_USERNAME_COOKIE".',
'When you go to the login page the next time,',
'the username field will be automatically populated with this value.',
'</p>',
'<p>',
'If you deselect this checkbox and your username is already saved in the cookie,',
'the application will overwrite it with an empty value.',
'You can also use your browser''s developer tools to completely remove the cookie.',
'</p>'))
,p_attribute_01=>'1'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472374614625945979)
,p_process_sequence=>10
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Set Username Cookie'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'apex_authentication.send_login_username_cookie (',
'    p_username => lower(:P9999_USERNAME),',
'    p_consent  => :P9999_REMEMBER = ''Y'' );'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472374299114945979)
,p_process_sequence=>20
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Login'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'apex_authentication.login(',
'    p_username => :P9999_USERNAME,',
'    p_password => :P9999_PASSWORD );'))
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472375460099945979)
,p_process_sequence=>30
,p_process_point=>'AFTER_SUBMIT'
,p_process_type=>'NATIVE_SESSION_STATE'
,p_process_name=>'Clear Page(s) Cache'
,p_attribute_01=>'CLEAR_CACHE_CURRENT_PAGE'
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
);
wwv_flow_api.create_page_process(
 p_id=>wwv_flow_api.id(472375013986945979)
,p_process_sequence=>10
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Get Username Cookie'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
':P9999_USERNAME := apex_authentication.get_login_username_cookie;',
':P9999_REMEMBER := case when :P9999_USERNAME is not null then ''Y'' end;'))
);
end;
/
prompt --application/end_environment
begin
wwv_flow_api.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false));
commit;
end;
/
set verify on feedback on define on
prompt  ...done
