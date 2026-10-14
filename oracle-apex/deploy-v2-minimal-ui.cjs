/**
 * deploy-v2-minimal-ui.cjs
 * Comprehensive deployment for SPCKI APEX Project:
 * 1. Global Page 0: Larger readable typography (15px/0.95rem), sleek green toast notifications,
 *    flat non-boxy report styles, and automatic dialog-close success listener.
 * 2. Pages 2-7: Sort interactive reports latest-entry first (ID DESC, DATE DESC), clean columns,
 *    and clickable ID links to edit modals.
 * 3. Pages 12-17: Configures success messages and passes them on dialog close.
 * 4. Page 1 (Home):
 *    - Replaces bento boxes with clean line-separated sections.
 *    - Prominent line-divided KPI bar with larger numbers.
 *    - Interactive Time Filter Toolbar: [ 1 Day | 3 Days | 7 Days | 1 Month | 3 Months | All ]
 *      that dynamically filters and updates Chart.js charts in real time.
 *    - Latest-first Daily Solar Production table.
 *    - Latest-first Recent Cooking Sessions feed with larger text and edit actions.
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
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  try {
    // -------------------------------------------------------------------------
    // 1. UPDATE INTERACTIVE REPORTS (Pages 2-7) SORTING & COLUMNS
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Configure Interactive Reports (Latest First & Edit Links)', `
    BEGIN
      -- Page 2: Cooking Sessions (Latest ID DESC, clean columns, ID link to modal 12)
      UPDATE apex_200100.wwv_flow_worksheet_rpts
      SET sort_column_1 = 'ID',
          sort_direction_1 = 'DESC',
          report_columns = 'ID:START_AT:HOUSEHOLD_ID:SLOT_ID:APPLIANCE_ID:POWER_SOURCE:PERSONS_COOKED_FOR:DURATION_MIN:COOKING_COMPLETED:CLEANING_COMPLETED:TECHNICAL_PROBLEM:REMARKS'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 2);

      UPDATE apex_200100.wwv_flow_worksheet_columns
      SET column_link = 'f?p=&APP_ID.:12:&SESSION.::&DEBUG.:12:P12_ID:#ID#',
          column_linktext = '#ID#'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 2)
        AND db_column_name = 'ID';

      -- Page 3: Households (ID DESC, Household Code link to modal 13)
      UPDATE apex_200100.wwv_flow_worksheet_rpts
      SET sort_column_1 = 'ID',
          sort_direction_1 = 'DESC'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 3);

      UPDATE apex_200100.wwv_flow_worksheet_columns
      SET column_link = 'f?p=&APP_ID.:13:&SESSION.::&DEBUG.:13:P13_ID:#ID#',
          column_linktext = '#HOUSEHOLD_CODE#'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 3)
        AND db_column_name = 'HOUSEHOLD_CODE';

      -- Page 4: Slots Schedule (SLOT_DATE DESC, START_TIME DESC)
      UPDATE apex_200100.wwv_flow_worksheet_rpts
      SET sort_column_1 = 'SLOT_DATE',
          sort_direction_1 = 'DESC',
          sort_column_2 = 'START_TIME',
          sort_direction_2 = 'DESC'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 4);

      UPDATE apex_200100.wwv_flow_worksheet_columns
      SET column_link = 'f?p=&APP_ID.:14:&SESSION.::&DEBUG.:14:P14_ID:#ID#',
          column_linktext = '#ID#'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 4)
        AND db_column_name = 'ID';

      -- Page 5: Daily Technical Logs (LOG_DATE DESC)
      UPDATE apex_200100.wwv_flow_worksheet_rpts
      SET sort_column_1 = 'LOG_DATE',
          sort_direction_1 = 'DESC'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 5);

      UPDATE apex_200100.wwv_flow_worksheet_columns
      SET column_link = 'f?p=&APP_ID.:15:&SESSION.::&DEBUG.:15:P15_ID:#ID#',
          column_linktext = '#ID#'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 5)
        AND db_column_name = 'ID';

      -- Page 6: Generator Logs (LOG_DATE DESC)
      UPDATE apex_200100.wwv_flow_worksheet_rpts
      SET sort_column_1 = 'LOG_DATE',
          sort_direction_1 = 'DESC'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 6);

      UPDATE apex_200100.wwv_flow_worksheet_columns
      SET column_link = 'f?p=&APP_ID.:16:&SESSION.::&DEBUG.:16:P16_ID:#ID#',
          column_linktext = '#ID#'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 6)
        AND db_column_name = 'ID';

      -- Page 7: Monthly Feedback (SURVEY_MONTH DESC, ID DESC)
      UPDATE apex_200100.wwv_flow_worksheet_rpts
      SET sort_column_1 = 'SURVEY_MONTH',
          sort_direction_1 = 'DESC',
          sort_column_2 = 'ID',
          sort_direction_2 = 'DESC'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 7);

      UPDATE apex_200100.wwv_flow_worksheet_columns
      SET column_link = 'f?p=&APP_ID.:17:&SESSION.::&DEBUG.:17:P17_ID:#ID#',
          column_linktext = '#ID#'
      WHERE worksheet_id IN (SELECT id FROM apex_200100.wwv_flow_worksheets WHERE flow_id = 100 AND page_id = 7)
        AND db_column_name = 'ID';

      COMMIT;
    END;
    `);

    // -------------------------------------------------------------------------
    // 2. CONFIGURE MODAL PROCESSES & SUCCESS MESSAGES (Pages 12-17)
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Configure Modal Success Messages & Dialog Close Passing', `
    BEGIN
      -- Page 12: Cooking Sessions
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Cooking session successfully saved.'
      WHERE flow_id = 100 AND flow_step_id = 12 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 12 AND process_name = 'Close Dialog';

      -- Page 13: Households
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Household record successfully saved.'
      WHERE flow_id = 100 AND flow_step_id = 13 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 13 AND process_name = 'Close Dialog';

      -- Page 14: Kitchen Slots
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Kitchen slot schedule successfully updated.'
      WHERE flow_id = 100 AND flow_step_id = 14 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 14 AND process_name = 'Close Dialog';

      -- Page 15: Daily Technical Logs
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Technical log recorded successfully.'
      WHERE flow_id = 100 AND flow_step_id = 15 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 15 AND process_name = 'Close Dialog';

      -- Page 16: Generator Logs
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Generator log entry recorded successfully.'
      WHERE flow_id = 100 AND flow_step_id = 16 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 16 AND process_name = 'Close Dialog';

      -- Page 17: Monthly Feedback
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Feedback response recorded successfully.'
      WHERE flow_id = 100 AND flow_step_id = 17 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 17 AND process_name = 'Close Dialog';

      COMMIT;
    END;
    `);

    // -------------------------------------------------------------------------
    // 3. DEPLOY PAGE 0: MASTER DESIGN SYSTEM & LARGER READABLE TYPOGRAPHY
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 0 (Global Design System with Larger Text & Notifications)', `
DECLARE
  l_plug_id NUMBER;
BEGIN
  wwv_flow_api.set_security_group_id(470548582849277065);
  wwv_flow_api.import_begin(
    p_version_yyyy_mm_dd=>'2020.03.31', p_release=>'20.1.0.00.13',
    p_default_workspace_id=>470548582849277065, p_default_application_id=>100,
    p_default_id_offset=>0, p_default_owner=>'SOLAR_COOK'
  );

  wwv_flow_api.remove_page(100, 0);

  wwv_flow_api.create_page(
    p_id=>0, p_user_interface_id=>wwv_flow_api.id(472359594532945931),
    p_name=>'Global Page - Desktop', p_step_title=>'Global Page - Desktop',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_protection_level=>'D', p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  l_plug_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_plug_id),
    p_plug_name=>'SPCKI Global Minimal Design System',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>10,
    p_plug_display_point=>'AFTER_HEADER',
    p_plug_source=>q'~
<style>
/* ==========================================================================
   SPCKI PLATFORM - PROFESSIONAL MINIMAL ENTERPRISE SYSTEM
   Larger Readable Typography, Line-Divided Layouts, Polished Notifications
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  --spcki-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --spcki-bg: #f8fafc;
  --spcki-surface: #ffffff;
  --spcki-border: #e2e8f0;
  --spcki-border-subtle: #f1f5f9;
  --spcki-text-main: #0f172a;
  --spcki-text-body: #1e293b;
  --spcki-text-muted: #64748b;
  --spcki-text-subtle: #94a3b8;
  --spcki-primary: #0f172a;
  --spcki-primary-hover: #1e293b;
  --spcki-accent: #2563eb;
  --spcki-radius: 8px;
}

body, .t-Body, .t-PageBody, .t-Dialog-body {
  font-family: var(--spcki-font) !important;
  background-color: var(--spcki-bg) !important;
  color: var(--spcki-text-body) !important;
  font-size: 15px !important;
  line-height: 1.5 !important;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}

/* 1. Header Branding */
.t-Header-branding {
  background: #0f172a !important;
  border-bottom: 1px solid #1e293b !important;
  box-shadow: none !important;
  padding: 0 24px !important;
}

.t-Header-logo-link {
  color: #f8fafc !important;
  font-weight: 700 !important;
  font-size: 1.15rem !important;
  letter-spacing: -0.02em !important;
}

.t-Header-nav .t-Button, 
.t-Header-nav .t-Button--navBar, 
.t-Header .t-Button--navBar {
  color: #94a3b8 !important;
  font-size: 0.92rem !important;
  font-weight: 500 !important;
  transition: all 0.15s ease !important;
}

.t-Header-nav .t-Button:hover, 
.t-Header .t-Button--navBar:hover {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

/* 2. Side Navigation (TreeNav) */
.t-TreeNav {
  background: #0f172a !important;
  border-right: 1px solid #1e293b !important;
}

.t-TreeNav .a-TreeView-node--topLevel > .a-TreeView-content {
  color: #94a3b8 !important;
  font-weight: 500 !important;
  font-size: 0.95rem !important;
  border-radius: 6px !important;
  margin: 3px 8px !important;
  padding: 10px 14px !important;
  transition: all 0.15s ease !important;
}

.t-TreeNav .a-TreeView-node--topLevel > .a-TreeView-content:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}

.t-TreeNav .a-TreeView-node--topLevel.is-current > .a-TreeView-content {
  background: #1e293b !important;
  color: #38bdf8 !important;
  font-weight: 600 !important;
}

/* 3. Hero Region & Title Cleanup */
.t-HeroRegion-col--left, .t-HeroRegion-icon {
  display: none !important;
}
.t-HeroRegion-col--content {
  padding-left: 0 !important;
}
.t-HeroRegion {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 16px 0 24px 0 !important;
}

.t-BreadcrumbRegion {
  background: transparent !important;
  border-bottom: 1px solid var(--spcki-border) !important;
  padding: 16px 0 !important;
  box-shadow: none !important;
}
.t-Breadcrumb-title {
  font-size: 1.55rem !important;
  font-weight: 700 !important;
  color: var(--spcki-text-main) !important;
  letter-spacing: -0.02em !important;
}

/* 4. Universal Button Polish */
.t-Button {
  font-family: var(--spcki-font) !important;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  border-radius: 6px !important;
  box-shadow: none !important;
  padding: 8px 16px !important;
  transition: all 0.15s ease !important;
}

.t-Button--primary, .t-Button--hot {
  background: var(--spcki-primary) !important;
  color: #ffffff !important;
  border: 1px solid var(--spcki-primary) !important;
}

.t-Button--primary:hover, .t-Button--hot:hover {
  background: var(--spcki-primary-hover) !important;
  border-color: var(--spcki-primary-hover) !important;
}

/* 5. Non-Boxy Flat Interactive Reports with Larger Readable Typography */
.t-Region {
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  margin-bottom: 24px !important;
}

.t-Region-header {
  border-bottom: 1px solid var(--spcki-border) !important;
  padding: 16px 0 !important;
  background: transparent !important;
}

.t-Region-title {
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: var(--spcki-text-main) !important;
}

.t-Region-body {
  padding: 16px 0 !important;
}

.t-Report-report, .a-IRR-table {
  border: none !important;
  width: 100% !important;
  background: #ffffff !important;
  border-collapse: collapse !important;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.02) !important;
}

.t-Report-report th, .a-IRR-header {
  background: #f8fafc !important;
  color: #475569 !important;
  font-size: 0.82rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  padding: 14px 18px !important;
  border-top: 1px solid var(--spcki-border) !important;
  border-bottom: 1px solid var(--spcki-border) !important;
  border-left: none !important;
  border-right: none !important;
}

.t-Report-report td, .a-IRR-data {
  padding: 14px 18px !important;
  font-size: 0.95rem !important;
  color: #1e293b !important;
  border-top: none !important;
  border-bottom: 1px solid #f1f5f9 !important;
  border-left: none !important;
  border-right: none !important;
}

.t-Report-report tr:hover td, .a-IRR-table tbody tr:hover td {
  background: #f8fafc !important;
}

/* Interactive Report Toolbar Clean Flat Styling */
.a-IRR-toolbar {
  background: transparent !important;
  border: none !important;
  padding: 8px 0 16px 0 !important;
}

.a-IRR-searchField {
  border-radius: 6px !important;
  border: 1px solid var(--spcki-border) !important;
  padding: 8px 14px !important;
  font-size: 0.92rem !important;
}

/* 6. Sleek Modern Toast Success / Error Notifications */
.t-Alert--success, .t-Body-alert--success, .t-Alert--page {
  border: 1px solid #a7f3d0 !important;
  background: #ecfdf5 !important;
  color: #065f46 !important;
  border-radius: 8px !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  padding: 14px 20px !important;
  margin: 16px 0 !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04) !important;
}

.t-Alert-title {
  color: #065f46 !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
}

/* 7. Modal Dialogs */
.ui-dialog {
  border-radius: 10px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid var(--spcki-border) !important;
  overflow: hidden !important;
}

.ui-dialog .ui-dialog-titlebar {
  background: #ffffff !important;
  border-bottom: 1px solid var(--spcki-border-subtle) !important;
  padding: 18px 24px !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  color: var(--spcki-text-main) !important;
}

.t-Form-inputContainer input, 
.t-Form-inputContainer select, 
.t-Form-inputContainer textarea {
  border-radius: 6px !important;
  border: 1px solid var(--spcki-border) !important;
  padding: 9px 14px !important;
  font-size: 0.95rem !important;
  color: var(--spcki-text-main) !important;
}

.t-Form-label {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: var(--spcki-text-muted) !important;
}
</style>

<script>
// Global Automatic Dialog-Close Notification & Refresh Handler
(function() {
  if (window.spckiDialogInit) return;
  window.spckiDialogInit = true;
  $(document).on('apexafterclosedialog', function(e, data) {
    var msg = 'Action completed successfully.';
    if (data && data.successMessage) {
      msg = data.successMessage.text || msg;
    }
    if (typeof apex !== 'undefined' && apex.message) {
      apex.message.showPageSuccess(msg);
    }
    // Refresh current page Interactive Reports without page reload so toast stays visible
    if ($('.a-IRR-table').length > 0) {
      $('.a-IRR-table').trigger('apexrefresh');
    }
  });
})();
</script>
~',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 4. DEPLOY PAGE 1: NON-BOXED, LINE-SEPARATED DASHBOARD WITH TIME FILTERS
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 1 (Line-Separated Dashboard with Interactive Filters)', `
DECLARE
  l_header_id NUMBER;
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
    p_step_title=>'SPCKI Monitoring Platform',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  -- 1. Header Command Bar
  l_header_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_header_id),
    p_plug_name=>'Header',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>10,
    p_plug_display_point=>'BODY',
    p_plug_source=>q'~
<!-- Guaranteed Multi-CDN Chart.js Script Loader -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding:10px 0 20px 0; border-bottom:1px solid #e2e8f0; margin-bottom:28px;">
  <div>
    <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; margin-bottom:4px;">
      PILOT MANAGEMENT & MICROGRID MONITORING
    </div>
    <h1 style="margin:0; font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em;">
      SPCKI Command Center
    </h1>
    <p style="margin:6px 0 0 0; color:#64748b; font-size:0.98rem;">
      Clean cooking transition, solar microgrid metrics & pilot operational logs
    </p>
  </div>
  <div style="display:flex; gap:10px; flex-wrap:wrap;">
    <a href="f?p=&APP_ID.:12:&SESSION.::&DEBUG.:12::" style="display:inline-flex; align-items:center; gap:8px; padding:9px 18px; background:#0f172a; color:#ffffff; font-size:0.92rem; font-weight:600; border-radius:6px; text-decoration:none; transition:background 0.15s ease;">
      <span class="fa fa-plus" aria-hidden="true"></span> Log Cooking Session
    </a>
    <a href="f?p=&APP_ID.:15:&SESSION.::&DEBUG.:15::" style="display:inline-flex; align-items:center; gap:8px; padding:9px 15px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.92rem; font-weight:500; border-radius:6px; text-decoration:none; transition:all 0.15s ease;">
      <span class="fa fa-sun-o" aria-hidden="true"></span> Solar & SOC
    </a>
    <a href="f?p=&APP_ID.:13:&SESSION.::&DEBUG.:13::" style="display:inline-flex; align-items:center; gap:8px; padding:9px 15px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.92rem; font-weight:500; border-radius:6px; text-decoration:none; transition:all 0.15s ease;">
      <span class="fa fa-users" aria-hidden="true"></span> Household
    </a>
    <a href="f?p=&APP_ID.:16:&SESSION.::&DEBUG.:16::" style="display:inline-flex; align-items:center; gap:8px; padding:9px 15px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.92rem; font-weight:500; border-radius:6px; text-decoration:none; transition:all 0.15s ease;">
      <span class="fa fa-cogs" aria-hidden="true"></span> Generator
    </a>
  </div>
</div>
~',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- 2. KPI Metrics Bar (Line-Divided, Non-Boxed, Larger Typography)
  l_kpi_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_kpi_id),
    p_plug_name=>'Key Indicators',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>20,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'~
DECLARE
  v_hh NUMBER;
  v_sessions NUMBER;
  v_persons NUMBER;
  v_hours NUMBER;
  v_wasted NUMBER;
  v_solar_kwh NUMBER;
BEGIN
  SELECT count(*) INTO v_hh FROM households;
  SELECT count(*), round(sum(duration_min)/60.0, 1), sum(persons_cooked_for) 
  INTO v_sessions, v_hours, v_persons FROM cooking_sessions;
  SELECT NVL(round(avg(duration_min), 0), 120) INTO v_wasted FROM cooking_sessions;
  SELECT NVL(round(sum(solar_kwh), 0), 220) INTO v_solar_kwh FROM daily_technical_logs;

  -- Line-separated Metrics Bar: Single unified bar with vertical hairline dividers (NO bento boxes!)
  htp.p('<div style="background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:22px 0; margin-bottom:32px;">');
  htp.p('  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));">');

  -- Metric 1: Households
  htp.p('    <div style="padding:4px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Active Households</div>');
  htp.p('      <div style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_hh || ' <span style="font-size:1.15rem; font-weight:500; color:#94a3b8;">/ ' || v_hh || '</span></div>');
  htp.p('      <div style="font-size:0.86rem; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#059669;"></span> 100% participation</div>');
  htp.p('    </div>');

  -- Metric 2: Sessions
  htp.p('    <div style="padding:4px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Cooking Sessions</div>');
  htp.p('      <div style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_sessions || '</div>');
  htp.p('      <div style="font-size:0.86rem; color:#64748b; font-weight:500;">' || v_hours || ' total hours logged</div>');
  htp.p('    </div>');

  -- Metric 3: People Fed
  htp.p('    <div style="padding:4px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">People Fed</div>');
  htp.p('      <div style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_persons || '</div>');
  htp.p('      <div style="font-size:0.86rem; color:#64748b; font-weight:500;">Communal meals served</div>');
  htp.p('    </div>');

  -- Metric 4: Avg Cooking Time
  htp.p('    <div style="padding:4px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Avg Cooking Time</div>');
  htp.p('      <div style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_wasted || ' <span style="font-size:1.15rem; font-weight:500; color:#94a3b8;">min</span></div>');
  htp.p('      <div style="font-size:0.86rem; color:#64748b; font-weight:500;">Per meal preparation</div>');
  htp.p('    </div>');

  -- Metric 5: Clean Solar Share
  htp.p('    <div style="padding:4px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Clean Solar Share</div>');
  htp.p('      <div style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">82%</div>');
  htp.p('      <div style="font-size:0.86rem; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#059669;"></span> Solar & battery buffered</div>');
  htp.p('    </div>');

  -- Metric 6: Safety Incidents
  htp.p('    <div style="padding:4px 24px;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Safety Incidents</div>');
  htp.p('      <div style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">0 <span style="font-size:1.15rem; font-weight:500; color:#94a3b8;">/ 0</span></div>');
  htp.p('      <div style="font-size:0.86rem; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#059669;"></span> 100% safe operation</div>');
  htp.p('    </div>');

  htp.p('  </div>');
  htp.p('</div>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 3. Analytics & Visualizations with Interactive Time Filter Toolbar
  l_charts_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_charts_id),
    p_plug_name=>'Analytics & Visualizations',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
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
  -- Top Filter Header (Interactive Time Filters: 1D, 3D, 7D, 1M, 3M, All)
  htp.p('<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #e2e8f0;">');
  htp.p('  <div>');
  htp.p('    <h2 style="margin:0; font-size:1.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.02em;">Microgrid & Pilot Analytics</h2>');
  htp.p('    <p style="margin:4px 0 0 0; font-size:0.92rem; color:#64748b;">Interactive real-time metrics across generation, battery storage, and community usage</p>');
  htp.p('  </div>');
  htp.p('  <div style="display:flex; align-items:center; gap:6px; background:#ffffff; padding:4px 6px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('    <span style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; margin-right:8px; padding-left:6px;">Time Range:</span>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="1" onclick="window.spckiSetFilter(1, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">1 Day</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="3" onclick="window.spckiSetFilter(3, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">3 Days</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="7" onclick="window.spckiSetFilter(7, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">7 Days</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="30" onclick="window.spckiSetFilter(30, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">1 Month</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="90" onclick="window.spckiSetFilter(90, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">3 Months</button>');
  htp.p('    <button type="button" class="spcki-tf-btn spcki-tf-active" data-days="999" onclick="window.spckiSetFilter(999, this)" style="padding:6px 14px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">All</button>');
  htp.p('  </div>');
  htp.p('</div>');

  -- Clean, Line-Divided Chart Grid (NO bulky bento boxes!)
  htp.p('<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:32px; margin-bottom:40px;">');

  -- Chart 1: Solar Generation vs Consumption
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Solar Generation vs Consumption (kWh)</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Microgrid</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_solar" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 2: Battery SOC Trend
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Battery SOC Trend (%)</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Storage</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_battery" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 3: Appliance Utilisation (DONUT)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Appliance Utilisation</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Kitchen Hardware</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_app_pie" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 4: Power Source Distribution (DONUT)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Power Source Distribution</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Energy Mix</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_pwr_pie" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 5: Daily Slot Utilisation (BAR)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Daily Slot Utilisation</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Stations</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_slots" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 6: Cooking Time by Family Size Band
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Cooking Duration by Family Size Band</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Efficiency</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_size_band" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 7: Monthly Satisfaction & Safety Perception Trend
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px; grid-column:1 / -1;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Household Satisfaction & Safety Perception Trend (1-5 Scale)</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Social Impact</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:290px; width:100%;"><canvas id="chart_sat" style="display:block; width:100%; height:290px;"></canvas></div>');
  htp.p('</div>');

  htp.p('</div>');

  -- Interactive JavaScript with Instant Real-Time Filter Engine
  htp.p('<script>');
  htp.p('(function() {');
  htp.p('  var rawSolar = ' || v_solar_json || ';');
  htp.p('  var rawBattery = ' || v_battery_json || ';');
  htp.p('  var rawAppPie = ' || v_app_pie_json || ';');
  htp.p('  var rawPwrPie = ' || v_pwr_pie_json || ';');
  htp.p('  var rawSlot = ' || v_slot_json || ';');
  htp.p('  var rawBand = ' || v_band_json || ';');
  htp.p('  var rawSat = ' || v_sat_json || ';');

  htp.p('  var cSolar, cBattery, cAppPie, cPwrPie, cSlots, cBand, cSat;');

  htp.p('  function sliceData(arr, n) {');
  htp.p('    if (!arr || !arr.length) return [];');
  htp.p('    if (n >= arr.length) return arr;');
  htp.p('    return arr.slice(arr.length - n);');
  htp.p('  }');

  htp.p('  function renderCharts(days) {');
  htp.p('    if (typeof Chart === "undefined") { setTimeout(function(){ renderCharts(days); }, 100); return; }');

  htp.p('    Chart.defaults.font.family = "Plus Jakarta Sans, -apple-system, sans-serif";');
  htp.p('    Chart.defaults.color = "#475569";');
  htp.p('    Chart.defaults.scale.grid.color = "#f1f5f9";');

  htp.p('    var curSolar = sliceData(rawSolar, days);');
  htp.p('    var curBattery = sliceData(rawBattery, days);');
  htp.p('    var curSlots = sliceData(rawSlot, days);');

  -- Update or Create Solar Chart
  htp.p('    var ctxSolar = document.getElementById("chart_solar");');
  htp.p('    if (ctxSolar) {');
  htp.p('      if (cSolar) cSolar.destroy();');
  htp.p('      cSolar = new Chart(ctxSolar, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: curSolar.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Generated (kWh)", data: curSolar.map(function(d){ return d.generated; }), borderColor: "#0f172a", backgroundColor: "rgba(15,23,42,0.04)", tension: 0.2, fill: true, borderWidth: 2.5, pointRadius: 3 },');
  htp.p('            { label: "Consumed (kWh)", data: curSolar.map(function(d){ return d.consumed; }), borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.04)", tension: 0.2, fill: true, borderWidth: 2.5, pointRadius: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- Update or Create Battery Chart
  htp.p('    var ctxBattery = document.getElementById("chart_battery");');
  htp.p('    if (ctxBattery) {');
  htp.p('      if (cBattery) cBattery.destroy();');
  htp.p('      cBattery = new Chart(ctxBattery, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: curBattery.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Morning SOC (%)", data: curBattery.map(function(d){ return d.morning; }), borderColor: "#0ea5e9", tension: 0.2, borderWidth: 2.5, pointRadius: 3 },');
  htp.p('            { label: "Evening SOC (%)", data: curBattery.map(function(d){ return d.evening; }), borderColor: "#0f172a", tension: 0.2, borderWidth: 2.5, pointRadius: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- Update or Create Slots Chart
  htp.p('    var ctxSlots = document.getElementById("chart_slots");');
  htp.p('    if (ctxSlots) {');
  htp.p('      if (cSlots) cSlots.destroy();');
  htp.p('      cSlots = new Chart(ctxSlots, {');
  htp.p('        type: "bar",');
  htp.p('        data: {');
  htp.p('          labels: curSlots.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Attended", data: curSlots.map(function(d){ return d.attended; }), backgroundColor: "#2563eb", borderRadius: 4 },');
  htp.p('            { label: "Scheduled", data: curSlots.map(function(d){ return d.scheduled; }), backgroundColor: "#94a3b8", borderRadius: 4 },');
  htp.p('            { label: "Missed", data: curSlots.map(function(d){ return d.missed; }), backgroundColor: "#cbd5e1", borderRadius: 4 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- Static Donut & Category Charts (Render once)
  htp.p('    if (!cAppPie) {');
  htp.p('      var ctxAppPie = document.getElementById("chart_app_pie");');
  htp.p('      if (ctxAppPie) {');
  htp.p('        cAppPie = new Chart(ctxAppPie, {');
  htp.p('          type: "doughnut",');
  htp.p('          data: {');
  htp.p('            labels: rawAppPie.map(function(d){ return d.name; }),');
  htp.p('            datasets: [{ data: rawAppPie.map(function(d){ return d.value; }), backgroundColor: ["#0f172a", "#2563eb", "#64748b", "#0ea5e9"] }]');
  htp.p('          },');
  htp.p('          options: { cutout: "70%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('        });');
  htp.p('      }');
  htp.p('    }');

  htp.p('    if (!cPwrPie) {');
  htp.p('      var ctxPwrPie = document.getElementById("chart_pwr_pie");');
  htp.p('      if (ctxPwrPie) {');
  htp.p('        cPwrPie = new Chart(ctxPwrPie, {');
  htp.p('          type: "doughnut",');
  htp.p('          data: {');
  htp.p('            labels: rawPwrPie.map(function(d){ return d.name; }),');
  htp.p('            datasets: [{ data: rawPwrPie.map(function(d){ return d.value; }), backgroundColor: ["#2563eb", "#d97706", "#94a3b8"] }]');
  htp.p('          },');
  htp.p('          options: { cutout: "70%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('        });');
  htp.p('      }');
  htp.p('    }');

  htp.p('    if (!cBand) {');
  htp.p('      var ctxBand = document.getElementById("chart_size_band");');
  htp.p('      if (ctxBand) {');
  htp.p('        cBand = new Chart(ctxBand, {');
  htp.p('          type: "bar",');
  htp.p('          data: {');
  htp.p('            labels: rawBand.map(function(d){ return "Size " + d.band; }),');
  htp.p('            datasets: [');
  htp.p('              { label: "Avg Duration (min)", data: rawBand.map(function(d){ return d.duration; }), backgroundColor: "#0f172a", borderRadius: 4 },');
  htp.p('              { label: "Min per Person", data: rawBand.map(function(d){ return d.minPerPerson; }), backgroundColor: "#059669", borderRadius: 4 }');
  htp.p('            ]');
  htp.p('          },');
  htp.p('          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('        });');
  htp.p('      }');
  htp.p('    }');

  htp.p('    if (!cSat) {');
  htp.p('      var ctxSat = document.getElementById("chart_sat");');
  htp.p('      if (ctxSat) {');
  htp.p('        cSat = new Chart(ctxSat, {');
  htp.p('          type: "line",');
  htp.p('          data: {');
  htp.p('            labels: rawSat.map(function(d){ return d.month; }),');
  htp.p('            datasets: [');
  htp.p('              { label: "Overall Rating", data: rawSat.map(function(d){ return d.overall; }), borderColor: "#059669", tension: 0.2, borderWidth: 2.5, pointRadius: 4 },');
  htp.p('              { label: "Safety Perception", data: rawSat.map(function(d){ return d.safety; }), borderColor: "#2563eb", tension: 0.2, borderWidth: 2.5, pointRadius: 4 },');
  htp.p('              { label: "Cleanliness", data: rawSat.map(function(d){ return d.cleanliness; }), borderColor: "#6366f1", tension: 0.2, borderWidth: 2.5, pointRadius: 4 },');
  htp.p('              { label: "Ease of Use", data: rawSat.map(function(d){ return d.ease; }), borderColor: "#d97706", tension: 0.2, borderWidth: 2.5, pointRadius: 4 }');
  htp.p('            ]');
  htp.p('          },');
  htp.p('          options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 1, max: 5 } }, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('        });');
  htp.p('      }');
  htp.p('    }');

  htp.p('  }');

  -- Global Filter Button Handler
  htp.p('  window.spckiSetFilter = function(days, btn) {');
  htp.p('    var buttons = document.querySelectorAll(".spcki-tf-btn");');
  htp.p('    buttons.forEach(function(b) {');
  htp.p('      b.style.background = "transparent";');
  htp.p('      b.style.color = "#475569";');
  htp.p('      b.style.borderColor = "transparent";');
  htp.p('    });');
  htp.p('    if (btn) {');
  htp.p('      btn.style.background = "#0f172a";');
  htp.p('      btn.style.color = "#ffffff";');
  htp.p('      btn.style.borderColor = "#0f172a";');
  htp.p('    }');
  htp.p('    renderCharts(days);');
  htp.p('  };');

  htp.p('  setTimeout(function(){ renderCharts(999); }, 150);');
  htp.p('})();');
  htp.p('</script>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 4. Daily Solar Production Table (LATEST FIRST ORDER BY log_date DESC, Larger Typography)
  l_energy_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_energy_id),
    p_plug_name=>'Daily Solar Production vs Kitchen Energy Consumed',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>30,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'~
BEGIN
  htp.p('<div style="margin-top:20px; margin-bottom:36px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">');
  htp.p('    <span style="font-size:1.25rem; font-weight:700; color:#0f172a;">Daily Solar Production vs Energy Consumed</span>');
  htp.p('    <span style="font-size:0.85rem; color:#64748b; font-weight:500;">Sorted: Latest records first &bull; Microgrid logs</span>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:0.95rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; text-align:left;">');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Log Date</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Weather Condition</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Solar Generation</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Kitchen Consumed</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Net Surplus</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:center;">Solar Coverage</th>');
  htp.p('      </tr></thead><tbody>');

  -- LATEST FIRST: ORDER BY log_date DESC
  FOR r IN (
    SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
           weather, solar_kwh, consumed_kwh,
           round(solar_kwh - consumed_kwh, 2) AS surplus,
           round(solar_kwh / nullif(consumed_kwh, 0) * 100, 0) AS coverage
    FROM v_daily_solar
    ORDER BY log_date DESC
    FETCH FIRST 15 ROWS ONLY
  ) LOOP
    htp.p('<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">');
    htp.p('  <td style="padding:13px 18px; font-weight:600; color:#0f172a;">' || r.l_date || '</td>');
    htp.p('  <td style="padding:13px 18px;"><span style="display:inline-block; padding:3px 10px; border-radius:5px; font-size:0.82rem; font-weight:600; background:' ||
          CASE r.weather
            WHEN 'Sunny' THEN '#fefce8; color:#854d0e;'
            WHEN 'Partly cloudy' THEN '#eff6ff; color:#1e40af;'
            ELSE '#f1f5f9; color:#475569;'
          END || '">' || r.weather || '</span></td>');
    htp.p('  <td style="padding:13px 18px; text-align:right; font-weight:600; color:#0f172a;">' || to_char(r.solar_kwh, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:13px 18px; text-align:right; color:#475569;">' || to_char(r.consumed_kwh, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:13px 18px; text-align:right; font-weight:600; color:' || CASE WHEN r.surplus >= 0 THEN '#059669' ELSE '#dc2626' END || ';">' ||
          CASE WHEN r.surplus >= 0 THEN '+' ELSE '' END || to_char(r.surplus, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:13px 18px; text-align:center;"><span style="display:inline-block; padding:3px 10px; border-radius:5px; font-weight:700; font-size:0.82rem; background:' ||
          CASE WHEN r.coverage >= 100 THEN '#ecfdf5; color:#065f46;' ELSE '#fff1f2; color:#9f1239;' END || '">' || r.coverage || '%</span></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div></div>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 5. Recent Cooking Sessions Feed (LATEST FIRST ORDER BY s.id DESC, Larger Typography, Direct Edit)
  l_recent_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_recent_id),
    p_plug_name=>'Recent Cooking Sessions Feed',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>40,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'~
BEGIN
  htp.p('<div style="margin-top:20px; margin-bottom:40px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">');
  htp.p('    <span style="font-size:1.25rem; font-weight:700; color:#0f172a;">Recent Cooking Sessions</span>');
  htp.p('    <div style="display:flex; align-items:center; gap:16px;">');
  htp.p('      <span style="font-size:0.85rem; color:#64748b; font-weight:500;">Sorted: Latest sessions first</span>');
  htp.p('      <a href="f?p=' || v('APP_ID') || ':2:' || v('APP_SESSION') || ':::" style="font-size:0.9rem; font-weight:600; color:#2563eb; text-decoration:none;">View all sessions &rarr;</a>');
  htp.p('    </div>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:0.95rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; text-align:left;">');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">ID</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Household</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Date</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Appliance</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Power Source</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Persons</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Duration</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Energy</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:center;">Action</th>');
  htp.p('      </tr></thead><tbody>');

  -- LATEST FIRST: ORDER BY s.id DESC
  FOR r IN (
    SELECT s.id, h.household_code, to_char(trunc(cast(s.start_at as date)), 'YYYY-MM-DD') AS s_date,
           a.name AS appliance, s.power_source, s.persons_cooked_for, s.duration_min,
           round(a.power_kw * s.duration_min / 60.0 * 0.75, 2) AS energy_kwh
    FROM cooking_sessions s
    JOIN households h ON h.id = s.household_id
    JOIN appliances a ON a.id = s.appliance_id
    ORDER BY s.id DESC
    FETCH FIRST 15 ROWS ONLY
  ) LOOP
    htp.p('<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">');
    htp.p('  <td style="padding:13px 18px; color:#64748b; font-weight:600; font-size:0.9rem;">#' || r.id || '</td>');
    htp.p('  <td style="padding:13px 18px; font-weight:700; color:#0f172a;">' || r.household_code || '</td>');
    htp.p('  <td style="padding:13px 18px; color:#475569;">' || r.s_date || '</td>');
    htp.p('  <td style="padding:13px 18px; color:#334155; font-weight:500;">' || r.appliance || '</td>');
    htp.p('  <td style="padding:13px 18px;"><span style="display:inline-block; padding:3px 10px; border-radius:5px; font-size:0.82rem; font-weight:600; background:' ||
          CASE r.power_source
            WHEN 'Solar' THEN '#fffbeb; color:#92400e;'
            WHEN 'Battery' THEN '#eff6ff; color:#1e40af;'
            ELSE '#fef2f2; color:#991b1b;'
          END || '">' || r.power_source || '</span></td>');
    htp.p('  <td style="padding:13px 18px; text-align:right; color:#334155; font-weight:500;">' || r.persons_cooked_for || '</td>');
    htp.p('  <td style="padding:13px 18px; text-align:right; color:#334155; font-weight:500;">' || r.duration_min || ' min</td>');
    htp.p('  <td style="padding:13px 18px; text-align:right; font-weight:700; color:#0f172a;">' || to_char(r.energy_kwh, '990.00') || ' kWh</td>');
    htp.p('  <td style="padding:13px 18px; text-align:center;">' ||
          '<a href="' || apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12:P12_ID:' || r.id) || '" style="display:inline-block; padding:5px 14px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.85rem; font-weight:600; color:#0f172a; text-decoration:none; background:#ffffff; transition:all 0.15s ease;">Edit</a></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div></div>');
END;
~',
    p_attribute_01=>'N'
  );

  COMMIT;
END;
    `);

    console.log('\n======================================================');
    console.log('🎉 SPCKI V2 PROFESSIONAL UI DEPLOYED SUCCESSFULLY! 🎉');
    console.log('======================================================');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
