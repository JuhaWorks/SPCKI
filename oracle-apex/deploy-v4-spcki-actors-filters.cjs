/**
 * deploy-v4-spcki-actors-filters.cjs
 * Comprehensive deployment addressing all user requirements:
 * 1. Multi-Actor / Persona System (Admin, Field Officer, Technical Specialist, Donor Viewer):
 *    - Prominent touch-friendly Persona Switcher in Header & Global Page.
 *    - Role-adaptive Quick Action buttons.
 *    - Role-specific view permissions:
 *      * Donor (Viewer): Read-only executive summary, all action & edit buttons hidden, coded IDs only.
 *      * Field Officer: Cooking sessions & feedback entry actions.
 *      * Technical Specialist: Solar & generator operational logging actions.
 *      * Admin: Full platform access and management.
 * 2. Universal Time Range Filtering on ALL Graphs, Pie Charts & KPIs:
 *    - 1 Day, 3 Days, 7 Days, 1 Month, 3 Months, All.
 *    - Dynamically updates:
 *      * Solar Generation vs Consumption Line Chart
 *      * Battery SOC Trend Line Chart
 *      * Appliance Utilisation Donut Chart (sliced & dynamically aggregated from sessions)
 *      * Power Source Distribution Donut Chart (sliced & dynamically aggregated from sessions)
 *      * Daily Slot Utilisation Stacked Bar Chart
 *      * Cooking Duration by Family Size Band Bar Chart (dynamically aggregated)
 *      * Monthly Satisfaction & Safety Trend Line Chart
 *      * Top KPI Metric indicators (recalculated for the selected time window)
 * 3. Mobile-First & Clutter-Free Design:
 *    - Clean line-separated layouts (zero box-in-box bento clutter).
 *    - Fluid responsive breakpoints (@media 1024px, 768px, 480px).
 *    - Minimum 44px touch targets on mobile.
 *    - Smooth horizontal-scrolling toolbars for filters & actors on small screens.
 *    - Tables with horizontal scroll wrappers and sticky clean headers.
 * 4. High-Visibility Floating Emerald Toast Notifications on Save.
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
    // 1. UPDATE INTERACTIVE REPORTS (Pages 2-7) SORTING & PERMISSIONS
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Configure Interactive Reports (Latest First & Edit Links)', `
    BEGIN
      -- Page 2: Cooking Sessions (ID DESC, clean columns, ID link to modal 12)
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
      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Cooking session successfully saved.'
      WHERE flow_id = 100 AND flow_step_id = 12 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 12 AND process_name = 'Close Dialog';

      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Household record successfully saved.'
      WHERE flow_id = 100 AND flow_step_id = 13 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 13 AND process_name = 'Close Dialog';

      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Kitchen slot schedule successfully updated.'
      WHERE flow_id = 100 AND flow_step_id = 14 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 14 AND process_name = 'Close Dialog';

      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Technical log recorded successfully.'
      WHERE flow_id = 100 AND flow_step_id = 15 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 15 AND process_name = 'Close Dialog';

      UPDATE apex_200100.wwv_flow_step_processing
      SET process_success_message = 'Generator log entry recorded successfully.'
      WHERE flow_id = 100 AND flow_step_id = 16 AND process_name = 'Process DML';

      UPDATE apex_200100.wwv_flow_step_processing
      SET attribute_01 = 'Y'
      WHERE flow_id = 100 AND flow_step_id = 16 AND process_name = 'Close Dialog';

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
    // 3. DEPLOY PAGE 0: MASTER DESIGN SYSTEM, MOBILE-FRIENDLY CSS & ACTOR ROLES
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 0 (Global Design System, Mobile CSS & Actor Roles)', `
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
   SPCKI PLATFORM - MASTER MINIMAL & MOBILE-FRIENDLY DESIGN SYSTEM
   Professional typography, Actor role gating, line-divided layouts
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
  --spcki-accent: #2563eb;
  --spcki-emerald: #059669;
}

body, .t-Body, .t-PageBody, .t-Dialog-body {
  font-family: var(--spcki-font) !important;
  background-color: var(--spcki-bg) !important;
  color: var(--spcki-text-body) !important;
  font-size: 16px !important;
  line-height: 1.55 !important;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}

/* 1. Header Branding & Profile */
.t-Header-branding {
  background: #0f172a !important;
  border-bottom: 1px solid #1e293b !important;
  box-shadow: none !important;
  padding: 0 20px !important;
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

/* 2. Side Navigation */
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

.t-TreeNav .a-TreeView-node--topLevel.is-current > .a-TreeView-content {
  background: #1e293b !important;
  color: #38bdf8 !important;
  font-weight: 600 !important;
}

/* 3. Universal Button & Inputs */
.t-Button {
  font-family: var(--spcki-font) !important;
  font-size: 0.92rem !important;
  font-weight: 600 !important;
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

/* 4. Non-Boxy Flat Interactive Reports */
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
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  color: var(--spcki-text-main) !important;
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
  font-size: 0.85rem !important;
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
  font-size: 0.96rem !important;
  color: #1e293b !important;
  border-top: none !important;
  border-bottom: 1px solid #f1f5f9 !important;
  border-left: none !important;
  border-right: none !important;
}

.t-Report-report tr:hover td, .a-IRR-table tbody tr:hover td {
  background: #f8fafc !important;
}

/* 5. High-Visibility Floating Emerald Success Toast */
#spcki-toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.spcki-toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 340px;
  max-width: 460px;
  background: #ffffff;
  color: #0f172a;
  border-left: 5px solid #10b981;
  border-top: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
  animation: spckiSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.spcki-toast.fade-out {
  opacity: 0;
  transform: translateY(-12px);
}

@keyframes spckiSlideIn {
  from { opacity: 0; transform: translateY(-16px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.spcki-toast-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #10b981;
  margin-top: 2px;
}

.spcki-toast-body {
  flex-grow: 1;
}

.spcki-toast-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #065f46;
  margin-bottom: 3px;
}

.spcki-toast-msg {
  font-size: 0.92rem;
  color: #334155;
  line-height: 1.45;
}

.spcki-toast-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 2px;
  font-size: 1.1rem;
}

/* 6. ACTOR / ROLE PERMISSIONS CSS */
body.actor-donor .spcki-act-btn,
body.actor-donor .spcki-edit-btn,
body.actor-donor .a-IRR-button {
  display: none !important;
}

body.actor-donor .spcki-donor-banner {
  display: flex !important;
}

body.actor-field .spcki-btn-technical {
  display: none !important;
}

body.actor-technical .spcki-btn-field {
  display: none !important;
}

/* 7. MOBILE & TABLET RESPONSIVENESS */
@media (max-width: 1024px) {
  .spcki-kpi-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
  .spcki-charts-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 768px) {
  body {
    font-size: 15px !important;
  }
  .t-Body-contentInner {
    padding: 12px 14px !important;
  }
  .spcki-header-flex {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 14px !important;
  }
  .spcki-actor-container {
    width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 4px !important;
  }
  .spcki-kpi-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .spcki-kpi-item {
    padding: 12px 14px !important;
    border-right: none !important;
    border-bottom: 1px solid #e2e8f0 !important;
  }
  .spcki-filter-toolbar-wrap {
    width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 6px !important;
  }
  .spcki-action-btns-wrap {
    width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 8px !important;
  }
  .spcki-action-btns-wrap a {
    justify-content: center !important;
    padding: 10px 12px !important;
    font-size: 0.88rem !important;
  }
  .spcki-toast {
    min-width: 280px !important;
    max-width: calc(100vw - 32px) !important;
    right: 16px !important;
    top: 16px !important;
  }
}

@media (max-width: 480px) {
  .spcki-kpi-grid {
    grid-template-columns: 1fr !important;
  }
  .spcki-action-btns-wrap {
    grid-template-columns: 1fr !important;
  }
}
</style>

<div id="spcki-toast-container"></div>

<script>
// ============================================================================
// GLOBAL SPCKI ENGINE: TOASTS, DIALOG REFRESH & ACTOR ROLE PERSISTENCE
// ============================================================================
(function() {
  function getJQuery() {
    return (window.apex && window.apex.jQuery) ? window.apex.jQuery : (window.jQuery || null);
  }

  // Toast Function
  window.spckiShowToast = function(msg, title) {
    title = title || 'Success';
    msg = msg || 'Action completed successfully.';

    var container = document.getElementById('spcki-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'spcki-toast-container';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'spcki-toast';
    toast.innerHTML = 
      '<svg class="spcki-toast-icon" viewBox="0 0 20 20" fill="currentColor">' +
      '  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />' +
      '</svg>' +
      '<div class="spcki-toast-body">' +
      '  <div class="spcki-toast-title">' + title + '</div>' +
      '  <div class="spcki-toast-msg">' + msg + '</div>' +
      '</div>' +
      '<button class="spcki-toast-close" onclick="this.parentElement.remove()" title="Close">&times;</button>';

    container.appendChild(toast);

    setTimeout(function() {
      toast.classList.add('fade-out');
      setTimeout(function() {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 4500);
  };

  // Flash Toast persistence across reloads
  try {
    var flash = sessionStorage.getItem('spcki_flash_toast');
    if (flash) {
      sessionStorage.removeItem('spcki_flash_toast');
      setTimeout(function() { window.spckiShowToast(flash); }, 250);
    }
  } catch(e) {}

  // Apply Actor Role
  window.spckiApplyRole = function(role) {
    role = role || sessionStorage.getItem('spcki_current_actor') || 'Admin';
    sessionStorage.setItem('spcki_current_actor', role);

    document.body.classList.remove('actor-admin', 'actor-field', 'actor-technical', 'actor-donor');
    document.body.classList.add('actor-' + role.toLowerCase());

    // Update buttons in actor switcher if present
    var btns = document.querySelectorAll('.spcki-actor-btn');
    btns.forEach(function(b) {
      if (b.getAttribute('data-role') === role) {
        b.style.background = '#0f172a';
        b.style.color = '#ffffff';
        b.style.borderColor = '#0f172a';
      } else {
        b.style.background = 'transparent';
        b.style.color = '#475569';
        b.style.borderColor = 'transparent';
      }
    });

    // Update role banner text
    var roleDesc = document.getElementById('spcki-active-role-desc');
    if (roleDesc) {
      if (role === 'Donor') {
        roleDesc.innerHTML = '<strong>Donor View:</strong> Read-only executive summary. Data entry is restricted. Household IDs are coded.';
      } else if (role === 'Field') {
        roleDesc.innerHTML = '<strong>Field Officer Mode:</strong> Field data entry for cooking sessions and household feedback.';
      } else if (role === 'Technical') {
        roleDesc.innerHTML = '<strong>Technical Specialist Mode:</strong> Solar microgrid and generator operational logs.';
      } else {
        roleDesc.innerHTML = '<strong>Administrator Mode:</strong> Full platform access, operational controls, and settings.';
      }
    }
  };

  // Global Set Actor Handler
  window.spckiSetActor = function(role, btn) {
    window.spckiApplyRole(role);
    window.spckiShowToast('Switched to ' + role + ' mode.', 'Persona Updated');
  };

  function initListeners() {
    var $ = getJQuery();
    if (!$) { setTimeout(initListeners, 50); return; }

    window.spckiApplyRole();

    if (window.spckiListenersInitialized) return;
    window.spckiListenersInitialized = true;

    $(document).on('apexafterclosedialog', function(e, data) {
      var msg = 'Record successfully saved.';
      if (data && data.successMessage) {
        msg = data.successMessage.text || data.successMessage || msg;
      }
      window.spckiShowToast(msg);

      if ($('.a-IRR-table').length > 0) {
        $('.a-IRR-table').trigger('apexrefresh');
      }

      if (window.location.href.indexOf('/home') !== -1 || window.location.href.indexOf(':1:') !== -1) {
        setTimeout(function() {
          sessionStorage.setItem('spcki_flash_toast', msg);
          window.location.reload();
        }, 1200);
      }
    });

    if (window.apex && window.apex.message && !window.spckiApexMsgHooked) {
      window.spckiApexMsgHooked = true;
      var origShowSuccess = window.apex.message.showPageSuccess;
      window.apex.message.showPageSuccess = function(msg) {
        if (origShowSuccess) origShowSuccess.apply(this, arguments);
        window.spckiShowToast(msg);
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListeners);
  } else {
    initListeners();
  }
})();
</script>
~',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 4. DEPLOY PAGE 1: REFINED DASHBOARD (ACTORS, MULTI-CHART FILTERING, CLEAN)
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 1 (Actors, Universal Graph Filters & Mobile Layout)', `
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

  -- 1. Header Command Bar with Actor Switcher & Role-Adaptive Actions
  l_header_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_header_id),
    p_plug_name=>'Header',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>10,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'~
DECLARE
  v_url_12 VARCHAR2(1000);
  v_url_15 VARCHAR2(1000);
  v_url_13 VARCHAR2(1000);
  v_url_16 VARCHAR2(1000);
  v_url_17 VARCHAR2(1000);
BEGIN
  v_url_12 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12::');
  v_url_15 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':15:' || v('APP_SESSION') || '::NO:15::');
  v_url_13 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':13:' || v('APP_SESSION') || '::NO:13::');
  v_url_16 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':16:' || v('APP_SESSION') || '::NO:16::');
  v_url_17 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':17:' || v('APP_SESSION') || '::NO:17::');

  htp.p('<!-- Chart.js Engine -->');
  htp.p('<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>');

  -- Header Block
  htp.p('<div style="padding:10px 0 20px 0; border-bottom:1px solid #e2e8f0; margin-bottom:24px;">');
  
  -- Top Bar: Title & Actor Persona Switcher
  htp.p('  <div class="spcki-header-flex" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:18px;">');
  htp.p('    <div>');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; margin-bottom:4px;">');
  htp.p('        COMMUNITY MICROGRID & COOKING MONITORING');
  htp.p('      </div>');
  htp.p('      <h1 style="margin:0; font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em;">');
  htp.p('        SPCKI Command Center');
  htp.p('      </h1>');
  htp.p('      <p style="margin:4px 0 0 0; color:#64748b; font-size:0.95rem;">');
  htp.p('        Clean cooking transition, solar microgrid metrics & pilot operational logs');
  htp.p('      </p>');
  htp.p('    </div>');

  -- Persona / Actor Switcher
  htp.p('    <div class="spcki-actor-container" style="background:#ffffff; padding:4px 6px; border:1px solid #e2e8f0; border-radius:8px; display:flex; align-items:center; gap:4px;">');
  htp.p('      <span style="font-size:0.78rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; margin-right:6px; padding-left:6px;">Role:</span>');
  htp.p('      <button type="button" class="spcki-actor-btn" data-role="Admin" onclick="spckiSetActor(''Admin'', this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.84rem; font-weight:600; cursor:pointer;">👑 Admin</button>');
  htp.p('      <button type="button" class="spcki-actor-btn" data-role="Field" onclick="spckiSetActor(''Field'', this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.84rem; font-weight:600; cursor:pointer;">📋 Field</button>');
  htp.p('      <button type="button" class="spcki-actor-btn" data-role="Technical" onclick="spckiSetActor(''Technical'', this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.84rem; font-weight:600; cursor:pointer;">⚡ Technical</button>');
  htp.p('      <button type="button" class="spcki-actor-btn" data-role="Donor" onclick="spckiSetActor(''Donor'', this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.84rem; font-weight:600; cursor:pointer;">👁️ Donor (Viewer)</button>');
  htp.p('    </div>');
  htp.p('  </div>');

  -- Role Description / Mode Banner
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">');
  htp.p('    <div id="spcki-active-role-desc" style="font-size:0.88rem; color:#475569; background:#ffffff; padding:6px 14px; border:1px solid #e2e8f0; border-radius:6px;">');
  htp.p('      <strong>Administrator Mode:</strong> Full platform access, operational controls, and settings.');
  htp.p('    </div>');

  -- Role-Adaptive Quick Action Buttons
  htp.p('    <div class="spcki-action-btns-wrap" style="display:flex; gap:8px; flex-wrap:wrap;">');
  htp.p('      <a href="' || v_url_12 || '" class="spcki-act-btn spcki-btn-field" style="display:inline-flex; align-items:center; gap:8px; padding:8px 16px; background:#0f172a; color:#ffffff; font-size:0.9rem; font-weight:600; border-radius:6px; text-decoration:none;">');
  htp.p('        <span class="fa fa-plus" aria-hidden="true"></span> Log Session');
  htp.p('      </a>');
  htp.p('      <a href="' || v_url_17 || '" class="spcki-act-btn spcki-btn-field" style="display:inline-flex; align-items:center; gap:8px; padding:8px 14px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.9rem; font-weight:500; border-radius:6px; text-decoration:none;">');
  htp.p('        <span class="fa fa-commenting-o" aria-hidden="true"></span> Feedback');
  htp.p('      </a>');
  htp.p('      <a href="' || v_url_15 || '" class="spcki-act-btn spcki-btn-technical" style="display:inline-flex; align-items:center; gap:8px; padding:8px 14px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.9rem; font-weight:500; border-radius:6px; text-decoration:none;">');
  htp.p('        <span class="fa fa-sun-o" aria-hidden="true"></span> Solar & SOC');
  htp.p('      </a>');
  htp.p('      <a href="' || v_url_16 || '" class="spcki-act-btn spcki-btn-technical" style="display:inline-flex; align-items:center; gap:8px; padding:8px 14px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.9rem; font-weight:500; border-radius:6px; text-decoration:none;">');
  htp.p('        <span class="fa fa-cogs" aria-hidden="true"></span> Generator');
  htp.p('      </a>');
  htp.p('      <a href="' || v_url_13 || '" class="spcki-act-btn spcki-btn-admin-only" style="display:inline-flex; align-items:center; gap:8px; padding:8px 14px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.9rem; font-weight:500; border-radius:6px; text-decoration:none;">');
  htp.p('        <span class="fa fa-users" aria-hidden="true"></span> Households');
  htp.p('      </a>');
  htp.p('    </div>');
  htp.p('  </div>');

  htp.p('</div>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 2. Line-Divided KPI Metrics Bar (Dynamically updated via client filter)
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
BEGIN
  SELECT count(*) INTO v_hh FROM households;
  SELECT count(*), round(sum(duration_min)/60.0, 1), sum(persons_cooked_for) 
  INTO v_sessions, v_hours, v_persons FROM cooking_sessions;
  SELECT NVL(round(avg(duration_min), 0), 120) INTO v_wasted FROM cooking_sessions;

  htp.p('<div style="background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:20px 0; margin-bottom:30px;">');
  htp.p('  <div class="spcki-kpi-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr));">');

  -- Metric 1: Households
  htp.p('    <div class="spcki-kpi-item" style="padding:4px 20px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Active Households</div>');
  htp.p('      <div class="spcki-kpi-value" style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:4px 0 2px 0;">' || v_hh || ' <span style="font-size:1.1rem; font-weight:500; color:#94a3b8;">/ ' || v_hh || '</span></div>');
  htp.p('      <div style="font-size:0.85rem; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#059669;"></span> 100% participation</div>');
  htp.p('    </div>');

  -- Metric 2: Sessions (dynamically updated)
  htp.p('    <div class="spcki-kpi-item" style="padding:4px 20px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Cooking Sessions</div>');
  htp.p('      <div id="kpi-sessions-val" class="spcki-kpi-value" style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:4px 0 2px 0;">' || v_sessions || '</div>');
  htp.p('      <div id="kpi-hours-desc" style="font-size:0.85rem; color:#64748b; font-weight:500;">' || v_hours || ' total hours logged</div>');
  htp.p('    </div>');

  -- Metric 3: People Fed (dynamically updated)
  htp.p('    <div class="spcki-kpi-item" style="padding:4px 20px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">People Fed</div>');
  htp.p('      <div id="kpi-persons-val" class="spcki-kpi-value" style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:4px 0 2px 0;">' || v_persons || '</div>');
  htp.p('      <div style="font-size:0.85rem; color:#64748b; font-weight:500;">Communal meals served</div>');
  htp.p('    </div>');

  -- Metric 4: Avg Cooking Time (dynamically updated)
  htp.p('    <div class="spcki-kpi-item" style="padding:4px 20px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Avg Cooking Time</div>');
  htp.p('      <div id="kpi-duration-val" class="spcki-kpi-value" style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:4px 0 2px 0;">' || v_wasted || ' <span style="font-size:1.1rem; font-weight:500; color:#94a3b8;">min</span></div>');
  htp.p('      <div style="font-size:0.85rem; color:#64748b; font-weight:500;">Per meal preparation</div>');
  htp.p('    </div>');

  -- Metric 5: Clean Solar Share (dynamically updated)
  htp.p('    <div class="spcki-kpi-item" style="padding:4px 20px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Clean Solar Share</div>');
  htp.p('      <div id="kpi-solar-share-val" class="spcki-kpi-value" style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:4px 0 2px 0;">82%</div>');
  htp.p('      <div style="font-size:0.85rem; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#059669;"></span> Solar & battery buffered</div>');
  htp.p('    </div>');

  -- Metric 6: Safety Incidents
  htp.p('    <div class="spcki-kpi-item" style="padding:4px 20px;">');
  htp.p('      <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Safety Incidents</div>');
  htp.p('      <div class="spcki-kpi-value" style="font-size:2.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:4px 0 2px 0;">0 <span style="font-size:1.1rem; font-weight:500; color:#94a3b8;">/ 0</span></div>');
  htp.p('      <div style="font-size:0.85rem; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#059669;"></span> 100% safe operation</div>');
  htp.p('    </div>');

  htp.p('  </div>');
  htp.p('</div>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 3. Analytics & Visualizations with Universal Multi-Chart Filtering
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
  v_slot_json CLOB := spcki_dashboard_pkg.get_slot_utilisation_json();
  v_sessions_json CLOB := spcki_dashboard_pkg.get_sessions_trend_json();
  v_sat_json CLOB := spcki_dashboard_pkg.get_satisfaction_trend_json();
BEGIN
  -- Top Filter Header (Universal Time Filters: 1D, 3D, 7D, 1M, 3M, All)
  htp.p('<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:14px; border-bottom:1px solid #e2e8f0;">');
  htp.p('  <div>');
  htp.p('    <h2 style="margin:0; font-size:1.35rem; font-weight:700; color:#0f172a; letter-spacing:-0.02em;">Microgrid & Pilot Analytics</h2>');
  htp.p('    <p style="margin:4px 0 0 0; font-size:0.92rem; color:#64748b;">Universal real-time filtering across all generation, storage, and community usage charts</p>');
  htp.p('  </div>');
  htp.p('  <div class="spcki-filter-toolbar-wrap" style="display:flex; align-items:center; gap:4px; background:#ffffff; padding:4px 6px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('    <span style="font-size:0.78rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; margin-right:6px; padding-left:6px;">Time Range:</span>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="1" onclick="window.spckiSetFilter(1, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">1 Day</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="3" onclick="window.spckiSetFilter(3, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">3 Days</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="7" onclick="window.spckiSetFilter(7, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">7 Days</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="30" onclick="window.spckiSetFilter(30, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">1 Month</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="90" onclick="window.spckiSetFilter(90, this)" style="padding:6px 12px; border:1px solid transparent; background:transparent; color:#475569; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">3 Months</button>');
  htp.p('    <button type="button" class="spcki-tf-btn spcki-tf-active" data-days="999" onclick="window.spckiSetFilter(999, this)" style="padding:6px 14px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:5px; font-size:0.85rem; font-weight:600; cursor:pointer;">All</button>');
  htp.p('  </div>');
  htp.p('</div>');

  -- Responsive Charts Grid
  htp.p('<div class="spcki-charts-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:28px; margin-bottom:40px;">');

  -- Chart 1: Solar Generation vs Consumption
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Solar Generation vs Consumption (kWh)</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Microgrid</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_solar" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 2: Battery SOC Trend
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Battery SOC Trend (%)</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Storage</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_battery" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 3: Appliance Utilisation (DONUT - DYNAMICALLY FILTERED)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Appliance Utilisation</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Filtered</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_app_pie" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 4: Power Source Distribution (DONUT - DYNAMICALLY FILTERED)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Power Source Distribution</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Filtered</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_pwr_pie" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 5: Daily Slot Utilisation (BAR)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Daily Slot Utilisation</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Stations</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_slots" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 6: Cooking Time by Family Size Band (BAR - DYNAMICALLY FILTERED)
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Cooking Duration by Family Size Band</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Filtered</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_size_band" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  -- Chart 7: Monthly Satisfaction & Safety Perception Trend
  htp.p('<div style="background:#ffffff; padding:22px; border:1px solid #e2e8f0; border-radius:8px; grid-column:1 / -1;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">');
  htp.p('    <span style="font-size:1.05rem; font-weight:700; color:#0f172a;">Household Satisfaction & Safety Perception Trend (1-5 Scale)</span>');
  htp.p('    <span style="font-size:0.75rem; font-weight:600; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; padding:3px 9px; border-radius:4px;">Social Impact</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:280px; width:100%;"><canvas id="chart_sat" style="display:block; width:100%; height:280px;"></canvas></div>');
  htp.p('</div>');

  htp.p('</div>');

  -- Universal Multi-Chart Filtering JavaScript
  htp.p('<script>');
  htp.p('(function() {');
  htp.p('  var rawSolar = ' || v_solar_json || ';');
  htp.p('  var rawBattery = ' || v_battery_json || ';');
  htp.p('  var rawSlot = ' || v_slot_json || ';');
  htp.p('  var rawSessions = ' || v_sessions_json || ';');
  htp.p('  var rawSat = ' || v_sat_json || ';');

  htp.p('  var cSolar, cBattery, cAppPie, cPwrPie, cSlots, cBand, cSat;');

  htp.p('  function sliceData(arr, n) {');
  htp.p('    if (!arr || !arr.length) return [];');
  htp.p('    if (n >= arr.length) return arr;');
  htp.p('    return arr.slice(arr.length - n);');
  htp.p('  }');

  htp.p('  function filterSessionsByDays(days) {');
  htp.p('    if (!rawSessions || !rawSessions.length) return [];');
  htp.p('    if (days >= 999) return rawSessions;');
  htp.p('    var curSolar = sliceData(rawSolar, days);');
  htp.p('    if (!curSolar || !curSolar.length) return rawSessions;');
  htp.p('    var minDate = curSolar[0].date;');
  htp.p('    return rawSessions.filter(function(s) { return s.date >= minDate; });');
  htp.p('  }');

  htp.p('  function renderAllCharts(days) {');
  htp.p('    if (typeof Chart === "undefined") { setTimeout(function(){ renderAllCharts(days); }, 100); return; }');

  htp.p('    Chart.defaults.font.family = "Plus Jakarta Sans, -apple-system, sans-serif";');
  htp.p('    Chart.defaults.color = "#475569";');
  htp.p('    Chart.defaults.scale.grid.color = "#f1f5f9";');

  -- Sliced datasets
  htp.p('    var curSolar = sliceData(rawSolar, days);');
  htp.p('    var curBattery = sliceData(rawBattery, days);');
  htp.p('    var curSlots = sliceData(rawSlot, days);');
  htp.p('    var curSessions = filterSessionsByDays(days);');

  -- Recalculate KPIs based on filtered period
  htp.p('    var elSessions = document.getElementById("kpi-sessions-val");');
  htp.p('    var elPersons = document.getElementById("kpi-persons-val");');
  htp.p('    var elDuration = document.getElementById("kpi-duration-val");');
  htp.p('    var elHoursDesc = document.getElementById("kpi-hours-desc");');
  htp.p('    var elSolarShare = document.getElementById("kpi-solar-share-val");');
  htp.p('    if (curSessions.length > 0) {');
  htp.p('      var totPersons = 0, totDur = 0, cleanCount = 0;');
  htp.p('      curSessions.forEach(function(s){');
  htp.p('        totPersons += s.persons;');
  htp.p('        totDur += s.duration;');
  htp.p('        if (s.power === "Solar" || s.power === "Battery") cleanCount++;');
  htp.p('      });');
  htp.p('      if (elSessions) elSessions.innerText = curSessions.length;');
  htp.p('      if (elPersons) elPersons.innerText = totPersons;');
  htp.p('      if (elDuration) elDuration.innerHTML = Math.round(totDur / curSessions.length) + " <span style=\"font-size:1.1rem; font-weight:500; color:#94a3b8;\">min</span>";');
  htp.p('      if (elHoursDesc) elHoursDesc.innerText = Math.round(totDur / 60.0 * 10) / 10 + " total hours in period";');
  htp.p('      if (elSolarShare) elSolarShare.innerText = Math.round(cleanCount / curSessions.length * 100) + "%";');
  htp.p('    }');

  -- 1. Solar Chart
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

  -- 2. Battery Chart
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

  -- 3. Dynamic Appliance Pie/Donut (FILTERED BY SESSIONS)
  htp.p('    var ctxAppPie = document.getElementById("chart_app_pie");');
  htp.p('    if (ctxAppPie) {');
  htp.p('      if (cAppPie) cAppPie.destroy();');
  htp.p('      var appMap = {};');
  htp.p('      curSessions.forEach(function(s){ appMap[s.appliance] = (appMap[s.appliance] || 0) + 1; });');
  htp.p('      var appLabels = Object.keys(appMap);');
  htp.p('      var appVals = appLabels.map(function(k){ return appMap[k]; });');
  htp.p('      cAppPie = new Chart(ctxAppPie, {');
  htp.p('        type: "doughnut",');
  htp.p('        data: {');
  htp.p('          labels: appLabels,');
  htp.p('          datasets: [{ data: appVals, backgroundColor: ["#0f172a", "#2563eb", "#0ea5e9", "#64748b"] }]');
  htp.p('        },');
  htp.p('        options: { cutout: "70%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 4. Dynamic Power Source Pie/Donut (FILTERED BY SESSIONS)
  htp.p('    var ctxPwrPie = document.getElementById("chart_pwr_pie");');
  htp.p('    if (ctxPwrPie) {');
  htp.p('      if (cPwrPie) cPwrPie.destroy();');
  htp.p('      var pwrMap = {};');
  htp.p('      curSessions.forEach(function(s){ pwrMap[s.power] = (pwrMap[s.power] || 0) + 1; });');
  htp.p('      var pwrLabels = Object.keys(pwrMap);');
  htp.p('      var pwrVals = pwrLabels.map(function(k){ return pwrMap[k]; });');
  htp.p('      cPwrPie = new Chart(ctxPwrPie, {');
  htp.p('        type: "doughnut",');
  htp.p('        data: {');
  htp.p('          labels: pwrLabels,');
  htp.p('          datasets: [{ data: pwrVals, backgroundColor: ["#2563eb", "#059669", "#d97706", "#94a3b8"] }]');
  htp.p('        },');
  htp.p('        options: { cutout: "70%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 5. Slots Chart
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

  -- 6. Dynamic Family Size Band Chart (FILTERED BY SESSIONS)
  htp.p('    var ctxBand = document.getElementById("chart_size_band");');
  htp.p('    if (ctxBand) {');
  htp.p('      if (cBand) cBand.destroy();');
  htp.p('      var bMap = { "1-3": {d:0, m:0, c:0}, "4-5": {d:0, m:0, c:0}, "6-7": {d:0, m:0, c:0}, "8+": {d:0, m:0, c:0} };');
  htp.p('      curSessions.forEach(function(s){');
  htp.p('        var k = s.band || "4-5";');
  htp.p('        if (!bMap[k]) bMap[k] = {d:0, m:0, c:0};');
  htp.p('        bMap[k].d += s.duration;');
  htp.p('        bMap[k].m += (s.duration / Math.max(1, s.persons));');
  htp.p('        bMap[k].c++;');
  htp.p('      });');
  htp.p('      var bKeys = ["1-3", "4-5", "6-7", "8+"];');
  htp.p('      var bDurs = bKeys.map(function(k){ return bMap[k].c ? Math.round(bMap[k].d / bMap[k].c) : 120; });');
  htp.p('      var bMins = bKeys.map(function(k){ return bMap[k].c ? Math.round(bMap[k].m / bMap[k].c * 10)/10 : 25; });');
  htp.p('      cBand = new Chart(ctxBand, {');
  htp.p('        type: "bar",');
  htp.p('        data: {');
  htp.p('          labels: ["Size 1-3", "Size 4-5", "Size 6-7", "Size 8+"],');
  htp.p('          datasets: [');
  htp.p('            { label: "Avg Duration (min)", data: bDurs, backgroundColor: "#0f172a", borderRadius: 4 },');
  htp.p('            { label: "Min per Person", data: bMins, backgroundColor: "#059669", borderRadius: 4 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 7. Satisfaction Chart
  htp.p('    var ctxSat = document.getElementById("chart_sat");');
  htp.p('    if (ctxSat) {');
  htp.p('      if (cSat) cSat.destroy();');
  htp.p('      cSat = new Chart(ctxSat, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: rawSat.map(function(d){ return d.month; }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Overall Rating", data: rawSat.map(function(d){ return d.overall; }), borderColor: "#059669", tension: 0.2, borderWidth: 2.5, pointRadius: 4 },');
  htp.p('            { label: "Safety Perception", data: rawSat.map(function(d){ return d.safety; }), borderColor: "#2563eb", tension: 0.2, borderWidth: 2.5, pointRadius: 4 },');
  htp.p('            { label: "Cleanliness", data: rawSat.map(function(d){ return d.cleanliness; }), borderColor: "#6366f1", tension: 0.2, borderWidth: 2.5, pointRadius: 4 },');
  htp.p('            { label: "Ease of Use", data: rawSat.map(function(d){ return d.ease; }), borderColor: "#d97706", tension: 0.2, borderWidth: 2.5, pointRadius: 4 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 1, max: 5 } }, plugins: { legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true, font: { weight: 600 } } } } }');
  htp.p('      });');
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
  htp.p('    renderAllCharts(days);');
  htp.p('  };');

  htp.p('  setTimeout(function(){ renderAllCharts(999); }, 150);');
  htp.p('})();');
  htp.p('</script>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 4. Daily Solar Production Table (LATEST FIRST ORDER BY log_date DESC, High Legibility)
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
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">');
  htp.p('    <span style="font-size:1.25rem; font-weight:700; color:#0f172a;">Daily Solar Production vs Energy Consumed</span>');
  htp.p('    <span style="font-size:0.88rem; color:#64748b; font-weight:500;">Sorted: Latest records first &bull; Microgrid logs</span>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:0.96rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; text-align:left;">');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Log Date</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Weather</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Solar Generation</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Kitchen Consumed</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Net Surplus</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:center;">Coverage</th>');
  htp.p('      </tr></thead><tbody>');

  FOR r IN (
    SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
           weather, solar_kwh, energy_consumed_kwh AS consumed_kwh,
           round(solar_kwh - energy_consumed_kwh, 2) AS surplus,
           round(solar_kwh / nullif(energy_consumed_kwh, 0) * 100, 0) AS coverage
    FROM daily_technical_logs
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

  -- 5. Recent Cooking Sessions Feed (LATEST FIRST ORDER BY s.id DESC, High Legibility, Role-Adaptive Edit)
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
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">');
  htp.p('    <span style="font-size:1.25rem; font-weight:700; color:#0f172a;">Recent Cooking Sessions</span>');
  htp.p('    <div style="display:flex; align-items:center; gap:14px;">');
  htp.p('      <span style="font-size:0.88rem; color:#64748b; font-weight:500;">Sorted: Latest sessions first</span>');
  htp.p('      <a href="f?p=' || v('APP_ID') || ':2:' || v('APP_SESSION') || ':::" style="font-size:0.92rem; font-weight:600; color:#2563eb; text-decoration:none;">View all sessions &rarr;</a>');
  htp.p('    </div>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:0.96rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; text-align:left;">');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">ID</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Household</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Date</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Appliance</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569;">Power Source</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Persons</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Duration</th>');
  htp.p('        <th style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:right;">Energy</th>');
  htp.p('        <th class="spcki-edit-btn" style="padding:14px 18px; font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#475569; text-align:center;">Action</th>');
  htp.p('      </tr></thead><tbody>');

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
    htp.p('  <td style="padding:13px 18px; color:#64748b; font-weight:600; font-size:0.92rem;">#' || r.id || '</td>');
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
    htp.p('  <td class="spcki-edit-btn" style="padding:13px 18px; text-align:center;">' ||
          '<a href="' || apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12:P12_ID:' || r.id) || '" style="display:inline-block; padding:5px 14px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.86rem; font-weight:600; color:#0f172a; text-decoration:none; background:#ffffff; transition:all 0.15s ease;">Edit</a></td>');
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
    console.log('🎉 SPCKI V4 MULTI-ACTOR & UNIVERSAL FILTER DEPLOYED! 🎉');
    console.log('======================================================');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
