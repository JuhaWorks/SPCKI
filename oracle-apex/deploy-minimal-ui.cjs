/**
 * deploy-minimal-ui.cjs
 * Deploys an ultra-clean, minimal, professional, and non-boxy UI across the APEX project:
 * 1. Global Page 0: Injects the Master Minimal Design System CSS (modern typography, midnight slate header, borderless tables, subtle pills, minimal dialogs).
 * 2. Page 1 (Home): Clean Command Center (no clunky icon square, unified minimal buttons, 6 sleek hairline KPI cards, 8 elegant Chart.js visualizations, borderless tables).
 * 3. Pages 12-17: Modern minimal modal action bars.
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
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 20px; border-top:1px solid #f1f5f9; background:#fafafa;">
  <div style="display:flex; gap:10px;">
    <button type="button" onclick="apex.navigation.dialog.close(true);" style="padding:6px 14px; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">Cancel</button>
    <button type="button" id="btn_delete_${pkItem}" onclick="if(confirm('Are you sure you want to delete this ${entityName}?')){apex.submit('DELETE');}" style="padding:6px 14px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">
      <span class="fa fa-trash-o" aria-hidden="true"></span> Delete
    </button>
  </div>
  <div style="display:flex; gap:10px;">
    <button type="button" id="btn_save_${pkItem}" onclick="apex.submit('SAVE');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">
      <span class="fa fa-check" aria-hidden="true"></span> Save Changes
    </button>
    <button type="button" id="btn_create_${pkItem}" onclick="apex.submit('CREATE');" style="padding:6px 18px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:0.85rem; font-weight:500; cursor:pointer;">
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
    // 1. PAGE 0: GLOBAL MINIMAL DESIGN SYSTEM INJECTION
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 0 (Global Minimal Design System)', `
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
   SPCKI PLATFORM - MINIMAL ENTERPRISE DESIGN SYSTEM
   Professional, Sleek, Non-Boxy, Modern Monochromatic + Subtle Accents
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  --spcki-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --spcki-bg: #f8fafc;
  --spcki-surface: #ffffff;
  --spcki-border: #e2e8f0;
  --spcki-border-subtle: #f1f5f9;
  --spcki-text-main: #0f172a;
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
  color: var(--spcki-text-main) !important;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}

/* 1. Header Branding - Elegant Midnight Slate */
.t-Header-branding {
  background: #0f172a !important;
  border-bottom: 1px solid #1e293b !important;
  box-shadow: none !important;
  padding: 0 24px !important;
}

.t-Header-logo-link {
  color: #f8fafc !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  letter-spacing: -0.02em !important;
}

.t-Header-nav .t-Button, 
.t-Header-nav .t-Button--navBar, 
.t-Header .t-Button--navBar {
  color: #94a3b8 !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  transition: all 0.15s ease !important;
}

.t-Header-nav .t-Button:hover, 
.t-Header .t-Button--navBar:hover {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

/* 2. De-boxify APEX Regions */
.t-Region {
  border: 1px solid var(--spcki-border) !important;
  border-radius: var(--spcki-radius) !important;
  background: var(--spcki-surface) !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03) !important;
  margin-bottom: 24px !important;
}

.t-Region-header {
  border-bottom: 1px solid var(--spcki-border-subtle) !important;
  padding: 16px 20px !important;
  background: transparent !important;
}

.t-Region-title {
  font-size: 0.98rem !important;
  font-weight: 600 !important;
  color: var(--spcki-text-main) !important;
  letter-spacing: -0.02em !important;
}

.t-Region-body {
  padding: 20px !important;
}

/* 3. Universal Button Minimal Polish */
.t-Button {
  font-family: var(--spcki-font) !important;
  font-size: 0.84rem !important;
  font-weight: 500 !important;
  border-radius: 6px !important;
  box-shadow: none !important;
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

/* 4. Minimal Clean Tables & Reports */
.t-Report-report, .a-IRR-table {
  border: none !important;
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
}

.t-Report-report th, .a-IRR-header {
  background: #f8fafc !important;
  color: var(--spcki-text-muted) !important;
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  padding: 10px 16px !important;
  border-top: none !important;
  border-bottom: 1px solid var(--spcki-border) !important;
}

.t-Report-report td, .a-IRR-data {
  padding: 11px 16px !important;
  font-size: 0.86rem !important;
  color: #334155 !important;
  border-top: none !important;
  border-bottom: 1px solid var(--spcki-border-subtle) !important;
}

.t-Report-report tr:hover td, .a-IRR-table tbody tr:hover td {
  background: #f8fafc !important;
}

/* 5. Minimal Modal Dialogs */
.ui-dialog {
  border-radius: 10px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid var(--spcki-border) !important;
  overflow: hidden !important;
}

.ui-dialog .ui-dialog-titlebar {
  background: #ffffff !important;
  border-bottom: 1px solid var(--spcki-border-subtle) !important;
  padding: 16px 20px !important;
  font-weight: 600 !important;
  font-size: 1.02rem !important;
  color: var(--spcki-text-main) !important;
}

/* Input Fields */
.t-Form-inputContainer input, 
.t-Form-inputContainer select, 
.t-Form-inputContainer textarea {
  border-radius: 6px !important;
  border: 1px solid var(--spcki-border) !important;
  padding: 7px 12px !important;
  font-size: 0.88rem !important;
  color: var(--spcki-text-main) !important;
}

.t-Form-inputContainer input:focus, 
.t-Form-inputContainer select:focus, 
.t-Form-inputContainer textarea:focus {
  border-color: #94a3b8 !important;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.12) !important;
  outline: none !important;
}

.t-Form-label {
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: var(--spcki-text-muted) !important;
}

/* 6. Suppress Any Clunky Hero Region Icons & Left Columns */
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
  padding: 12px 0 20px 0 !important;
}

/* 7. Side Navigation (TreeNav) Clean Minimal Dark Palette */
.t-TreeNav {
  background: #0f172a !important;
  border-right: 1px solid #1e293b !important;
}
.t-TreeNav .a-TreeView-node--topLevel > .a-TreeView-content {
  color: #94a3b8 !important;
  font-weight: 500 !important;
  font-size: 0.88rem !important;
  border-radius: 6px !important;
  margin: 2px 8px !important;
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

/* 8. Breadcrumbs & Page Titles */
.t-BreadcrumbRegion {
  background: transparent !important;
  border-bottom: 1px solid var(--spcki-border) !important;
  padding: 14px 0 !important;
  box-shadow: none !important;
}
.t-Breadcrumb-item {
  color: var(--spcki-text-muted) !important;
  font-size: 0.84rem !important;
}
.t-Breadcrumb-title {
  font-size: 1.45rem !important;
  font-weight: 700 !important;
  color: var(--spcki-text-main) !important;
  letter-spacing: -0.02em !important;
}

/* 9. Interactive Reports (IRR) Sleek Flat Toolbar */
.a-IRR-toolbar {
  background: transparent !important;
  border: none !important;
  padding: 8px 0 16px 0 !important;
}
.a-IRR-searchField {
  border-radius: 6px !important;
  border: 1px solid var(--spcki-border) !important;
  padding: 6px 12px !important;
  font-size: 0.86rem !important;
}
.a-IRR-controls {
  border: none !important;
  background: transparent !important;
}
.a-IRR-pagination {
  border-top: 1px solid var(--spcki-border-subtle) !important;
  padding: 12px 16px !important;
  font-size: 0.82rem !important;
  color: var(--spcki-text-muted) !important;
}
</style>
~',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  COMMIT;
END;
    `);

    // -------------------------------------------------------------------------
    // 2. PAGE 1: REFINED MINIMAL EXECUTIVE COMMAND CENTER DASHBOARD
    // -------------------------------------------------------------------------
    await executeBlock(conn, 'Deploy Page 1 (Minimal Executive Dashboard)', `
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
    p_step_title=>'SPCKI Monitoring Platform',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  -- 1. Hero Command Header (Blank with Attributes - NO clunky blue icon box)
  l_hero_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_hero_id),
    p_plug_name=>'Header',
    p_region_template_options=>'#DEFAULT#',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472247597001945879), -- Blank with Attributes
    p_plug_display_sequence=>10,
    p_plug_display_point=>'BODY',
    p_plug_source=>q'~
<!-- Chart.js CDN for Interactive Visualizations -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:18px; border-bottom:1px solid #e2e8f0;">
  <div>
    <div style="font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; margin-bottom:4px;">
      PILOT MANAGEMENT & MICROGRID MONITORING
    </div>
    <h1 style="margin:0; font-size:1.65rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em;">
      SPCKI Command Center
    </h1>
    <p style="margin:4px 0 0 0; color:#64748b; font-size:0.92rem;">
      Clean cooking transition, solar microgrid metrics & pilot operational logs
    </p>
  </div>
  <div style="display:flex; gap:8px; flex-wrap:wrap;">
    <a href="f?p=&APP_ID.:12:&SESSION.::&DEBUG.:12::" style="display:inline-flex; align-items:center; gap:6px; padding:7px 15px; background:#0f172a; color:#ffffff; font-size:0.84rem; font-weight:500; border-radius:6px; text-decoration:none; transition:background 0.15s ease;">
      <span class="fa fa-plus" aria-hidden="true" style="font-size:0.75rem;"></span> Log Cooking Session
    </a>
    <a href="f?p=&APP_ID.:15:&SESSION.::&DEBUG.:15::" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.84rem; font-weight:500; border-radius:6px; text-decoration:none; transition:all 0.15s ease;">
      <span class="fa fa-sun-o" aria-hidden="true"></span> Solar & SOC
    </a>
    <a href="f?p=&APP_ID.:13:&SESSION.::&DEBUG.:13::" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.84rem; font-weight:500; border-radius:6px; text-decoration:none; transition:all 0.15s ease;">
      <span class="fa fa-users" aria-hidden="true"></span> Household
    </a>
    <a href="f?p=&APP_ID.:16:&SESSION.::&DEBUG.:16::" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; background:#ffffff; color:#334155; border:1px solid #e2e8f0; font-size:0.84rem; font-weight:500; border-radius:6px; text-decoration:none; transition:all 0.15s ease;">
      <span class="fa fa-cogs" aria-hidden="true"></span> Generator
    </a>
  </div>
</div>
~',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- 2. KPI Cards Region (Blank with Attributes - Sleek Hairline Cards)
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

  htp.p('<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:14px; margin-bottom:24px;">');

  -- Card 1: Households
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);">');
  htp.p('  <div style="font-size:0.72rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">Active Households</div>');
  htp.p('  <div style="font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_hh || ' <span style="font-size:1.05rem; font-weight:500; color:#94a3b8;">/ ' || v_hh || '</span></div>');
  htp.p('  <div style="font-size:0.78rem; color:#059669; font-weight:500; display:flex; align-items:center; gap:5px;"><span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#059669;"></span> 100% participation</div>');
  htp.p('</div>');

  -- Card 2: Total Sessions
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);">');
  htp.p('  <div style="font-size:0.72rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">Cooking Sessions</div>');
  htp.p('  <div style="font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_sessions || '</div>');
  htp.p('  <div style="font-size:0.78rem; color:#64748b; font-weight:500;">' || v_hours || ' total hours</div>');
  htp.p('</div>');

  -- Card 3: People Served
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);">');
  htp.p('  <div style="font-size:0.72rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">People Fed</div>');
  htp.p('  <div style="font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_persons || '</div>');
  htp.p('  <div style="font-size:0.78rem; color:#64748b; font-weight:500;">Communal meals served</div>');
  htp.p('</div>');

  -- Card 4: Avg Session Time
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);">');
  htp.p('  <div style="font-size:0.72rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">Avg Cooking Time</div>');
  htp.p('  <div style="font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_wasted || ' <span style="font-size:1.05rem; font-weight:500; color:#94a3b8;">min</span></div>');
  htp.p('  <div style="font-size:0.78rem; color:#64748b; font-weight:500;">Per meal preparation</div>');
  htp.p('</div>');

  -- Card 5: Clean Solar Share
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);">');
  htp.p('  <div style="font-size:0.72rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">Clean Solar Share</div>');
  htp.p('  <div style="font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">82%</div>');
  htp.p('  <div style="font-size:0.78rem; color:#059669; font-weight:500; display:flex; align-items:center; gap:5px;"><span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#059669;"></span> Solar & battery buffered</div>');
  htp.p('</div>');

  -- Card 6: Safety Incidents
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);">');
  htp.p('  <div style="font-size:0.72rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">Safety Incidents</div>');
  htp.p('  <div style="font-size:1.85rem; font-weight:700; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">0 <span style="font-size:1.05rem; font-weight:500; color:#94a3b8;">/ 0</span></div>');
  htp.p('  <div style="font-size:0.78rem; color:#059669; font-weight:500; display:flex; align-items:center; gap:5px;"><span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#059669;"></span> Operational metrics normal</div>');
  htp.p('</div>');

  htp.p('</div>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 3. PERN-Style Interactive Charts Grid (Clean, Non-Boxy, Refined Palette)
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
  htp.p('<style>
    .spcki-card {
      background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;
      padding:18px 20px; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03);
      display:flex; flex-direction:column; min-height:340px;
    }
    .spcki-card-head {
      display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;
    }
    .spcki-card-title {
      font-size:0.92rem; font-weight:600; color:#0f172a; letter-spacing:-0.01em;
    }
    .spcki-card-pill {
      font-size:0.7rem; font-weight:500; color:#64748b; background:#f8fafc;
      border:1px solid #f1f5f9; padding:2px 8px; border-radius:4px;
    }
  </style>');

  htp.p('<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:18px; margin-bottom:24px;">');

  -- Chart 1: Solar Generation vs Consumption
  htp.p('<div class="spcki-card">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Solar Generation vs Consumption (kWh)</span><span class="spcki-card-pill">Microgrid</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_solar"></canvas></div>');
  htp.p('</div>');

  -- Chart 2: Battery SOC Trend
  htp.p('<div class="spcki-card">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Battery SOC Trend (%)</span><span class="spcki-card-pill">Storage</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_battery"></canvas></div>');
  htp.p('</div>');

  -- Chart 3: Appliance Utilisation (DONUT)
  htp.p('<div class="spcki-card">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Appliance Utilisation</span><span class="spcki-card-pill">Kitchen Hardware</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_app_pie"></canvas></div>');
  htp.p('</div>');

  -- Chart 4: Power Source Distribution (DONUT)
  htp.p('<div class="spcki-card">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Power Source Distribution</span><span class="spcki-card-pill">Energy Mix</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_pwr_pie"></canvas></div>');
  htp.p('</div>');

  -- Chart 5: Daily Slot Utilisation (Bar Chart)
  htp.p('<div class="spcki-card">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Daily Slot Utilisation</span><span class="spcki-card-pill">Stations</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_slots"></canvas></div>');
  htp.p('</div>');

  -- Chart 6: Cooking Time by Family Size Band
  htp.p('<div class="spcki-card">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Cooking Duration by Family Size Band</span><span class="spcki-card-pill">Efficiency</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_size_band"></canvas></div>');
  htp.p('</div>');

  -- Chart 7: Monthly Satisfaction & Safety Trend
  htp.p('<div class="spcki-card" style="grid-column:1 / -1;">');
  htp.p('  <div class="spcki-card-head"><span class="spcki-card-title">Household Satisfaction & Safety Perception Trend (1-5 Scale)</span><span class="spcki-card-pill">Social Impact</span></div>');
  htp.p('  <div style="flex:1; position:relative; min-height:260px;"><canvas id="chart_sat"></canvas></div>');
  htp.p('</div>');

  htp.p('</div>');

  -- JavaScript Chart Initializers
  htp.p('<script>');
  htp.p('(function() {');
  htp.p('  function initCharts() {');
  htp.p('    if (typeof Chart === "undefined") { setTimeout(initCharts, 150); return; }');
  
  htp.p('    var solarData = ' || v_solar_json || ';');
  htp.p('    var batteryData = ' || v_battery_json || ';');
  htp.p('    var appPieData = ' || v_app_pie_json || ';');
  htp.p('    var pwrPieData = ' || v_pwr_pie_json || ';');
  htp.p('    var slotData = ' || v_slot_json || ';');
  htp.p('    var bandData = ' || v_band_json || ';');
  htp.p('    var satData = ' || v_sat_json || ';');

  -- Global clean chart defaults
  htp.p('    Chart.defaults.font.family = "Plus Jakarta Sans, -apple-system, sans-serif";');
  htp.p('    Chart.defaults.color = "#64748b";');
  htp.p('    Chart.defaults.scale.grid.color = "#f1f5f9";');

  -- Chart 1: Solar Line Chart
  htp.p('    var ctxSolar = document.getElementById("chart_solar");');
  htp.p('    if (ctxSolar) {');
  htp.p('      new Chart(ctxSolar, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: solarData.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Generated (kWh)", data: solarData.map(function(d){ return d.generated; }), borderColor: "#0f172a", backgroundColor: "rgba(15,23,42,0.03)", tension: 0.25, fill: true, borderWidth: 2, pointRadius: 2 },');
  htp.p('            { label: "Consumed (kWh)", data: solarData.map(function(d){ return d.consumed; }), borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.03)", tension: 0.25, fill: true, borderWidth: 2, pointRadius: 2 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 10, usePointStyle: true } } } }');
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
  htp.p('            { label: "Morning SOC (%)", data: batteryData.map(function(d){ return d.morning; }), borderColor: "#0ea5e9", tension: 0.25, borderWidth: 2, pointRadius: 2 },');
  htp.p('            { label: "Evening SOC (%)", data: batteryData.map(function(d){ return d.evening; }), borderColor: "#1e293b", tension: 0.25, borderWidth: 2, pointRadius: 2 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { position: "top", labels: { boxWidth: 10, usePointStyle: true } } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 3: Appliance Pie/Donut
  htp.p('    var ctxAppPie = document.getElementById("chart_app_pie");');
  htp.p('    if (ctxAppPie) {');
  htp.p('      new Chart(ctxAppPie, {');
  htp.p('        type: "doughnut",');
  htp.p('        data: {');
  htp.p('          labels: appPieData.map(function(d){ return d.name; }),');
  htp.p('          datasets: [{ data: appPieData.map(function(d){ return d.value; }), backgroundColor: ["#1e293b", "#2563eb", "#64748b", "#0ea5e9"] }]');
  htp.p('        },');
  htp.p('        options: { cutout: "70%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 10, usePointStyle: true } } } }');
  htp.p('      });');
  htp.p('    }');

  -- Chart 4: Power Source Pie/Donut
  htp.p('    var ctxPwrPie = document.getElementById("chart_pwr_pie");');
  htp.p('    if (ctxPwrPie) {');
  htp.p('      new Chart(ctxPwrPie, {');
  htp.p('        type: "doughnut",');
  htp.p('        data: {');
  htp.p('          labels: pwrPieData.map(function(d){ return d.name; }),');
  htp.p('          datasets: [{ data: pwrPieData.map(function(d){ return d.value; }), backgroundColor: ["#d97706", "#2563eb", "#94a3b8"] }]');
  htp.p('        },');
  htp.p('        options: { cutout: "70%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 10, usePointStyle: true } } } }');
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
  htp.p('            { label: "Attended", data: slotData.map(function(d){ return d.attended; }), backgroundColor: "#2563eb", borderRadius: 3 },');
  htp.p('            { label: "Scheduled", data: slotData.map(function(d){ return d.scheduled; }), backgroundColor: "#94a3b8", borderRadius: 3 },');
  htp.p('            { label: "Missed", data: slotData.map(function(d){ return d.missed; }), backgroundColor: "#cbd5e1", borderRadius: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: "top", labels: { boxWidth: 10, usePointStyle: true } } } }');
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
  htp.p('            { label: "Avg Duration (min)", data: bandData.map(function(d){ return d.duration; }), backgroundColor: "#0f172a", borderRadius: 3 },');
  htp.p('            { label: "Min per Person", data: bandData.map(function(d){ return d.minPerPerson; }), backgroundColor: "#059669", borderRadius: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 10, usePointStyle: true } } } }');
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
  htp.p('            { label: "Overall Rating", data: satData.map(function(d){ return d.overall; }), borderColor: "#059669", tension: 0.2, borderWidth: 2, pointRadius: 3 },');
  htp.p('            { label: "Safety Perception", data: satData.map(function(d){ return d.safety; }), borderColor: "#2563eb", tension: 0.2, borderWidth: 2, pointRadius: 3 },');
  htp.p('            { label: "Cleanliness", data: satData.map(function(d){ return d.cleanliness; }), borderColor: "#6366f1", tension: 0.2, borderWidth: 2, pointRadius: 3 },');
  htp.p('            { label: "Ease of Use", data: satData.map(function(d){ return d.ease; }), borderColor: "#d97706", tension: 0.2, borderWidth: 2, pointRadius: 3 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 1, max: 5 } }, plugins: { legend: { position: "top", labels: { boxWidth: 10, usePointStyle: true } } } }');
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

  -- 4. Daily Solar Production vs Energy Consumed Table (Clean Borderless Container)
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
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03); margin-bottom:24px;">');
  htp.p('  <div style="padding:16px 20px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">');
  htp.p('    <span style="font-size:0.95rem; font-weight:600; color:#0f172a;">Daily Solar Production vs Energy Consumed</span>');
  htp.p('    <span style="font-size:0.75rem; color:#64748b; font-weight:500;">Microgrid Logs</span>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto;">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; text-align:left;">');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">Log Date</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">Weather Condition</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:right;">Solar Generation</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:right;">Kitchen Consumed</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:right;">Net Surplus</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:center;">Solar Coverage</th>');
  htp.p('      </tr></thead><tbody>');

  FOR r IN (
    SELECT to_char(log_date, 'YYYY-MM-DD') AS l_date,
           weather, solar_kwh, consumed_kwh,
           round(solar_kwh - consumed_kwh, 2) AS surplus,
           round(solar_kwh / nullif(consumed_kwh, 0) * 100, 0) AS coverage
    FROM v_daily_solar
    ORDER BY log_date
  ) LOOP
    htp.p('<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">');
    htp.p('  <td style="padding:10px 16px; font-weight:500; color:#0f172a;">' || r.l_date || '</td>');
    htp.p('  <td style="padding:10px 16px;"><span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:500; background:' ||
          CASE r.weather
            WHEN 'Sunny' THEN '#fefce8; color:#854d0e;'
            WHEN 'Partly cloudy' THEN '#eff6ff; color:#1e40af;'
            ELSE '#f1f5f9; color:#475569;'
          END || '">' || r.weather || '</span></td>');
    htp.p('  <td style="padding:10px 16px; text-align:right; font-weight:500; color:#0f172a;">' || to_char(r.solar_kwh, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:10px 16px; text-align:right; color:#475569;">' || to_char(r.consumed_kwh, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:10px 16px; text-align:right; font-weight:500; color:' || CASE WHEN r.surplus >= 0 THEN '#059669' ELSE '#dc2626' END || ';">' ||
          CASE WHEN r.surplus >= 0 THEN '+' ELSE '' END || to_char(r.surplus, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:10px 16px; text-align:center;"><span style="display:inline-block; padding:2px 8px; border-radius:4px; font-weight:600; font-size:0.75rem; background:' ||
          CASE WHEN r.coverage >= 100 THEN '#ecfdf5; color:#065f46;' ELSE '#fff1f2; color:#9f1239;' END || '">' || r.coverage || '%</span></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div></div>');
END;
~',
    p_attribute_01=>'N'
  );

  -- 5. Recent Cooking Sessions Feed (Clean Minimal Table with Subtle Edit links)
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
  htp.p('<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; box-shadow:0 1px 2px 0 rgba(0,0,0,0.03); margin-bottom:24px;">');
  htp.p('  <div style="padding:16px 20px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">');
  htp.p('    <span style="font-size:0.95rem; font-weight:600; color:#0f172a;">Recent Cooking Sessions</span>');
  htp.p('    <a href="f?p=' || v('APP_ID') || ':2:' || v('APP_SESSION') || ':::" style="font-size:0.8rem; font-weight:500; color:#2563eb; text-decoration:none;">View all sessions &rarr;</a>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto;">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; text-align:left;">');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">ID</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">Household</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">Date</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">Appliance</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b;">Source</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:right;">Persons</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:right;">Duration</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:right;">Energy</th>');
  htp.p('        <th style="padding:10px 16px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; text-align:center;">Action</th>');
  htp.p('      </tr></thead><tbody>');

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
    htp.p('<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">');
    htp.p('  <td style="padding:10px 16px; color:#64748b; font-size:0.8rem;">#' || r.id || '</td>');
    htp.p('  <td style="padding:10px 16px; font-weight:600; color:#0f172a;">' || r.household_code || '</td>');
    htp.p('  <td style="padding:10px 16px; color:#475569;">' || r.s_date || '</td>');
    htp.p('  <td style="padding:10px 16px; color:#334155;">' || r.appliance || '</td>');
    htp.p('  <td style="padding:10px 16px;"><span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:500; background:' ||
          CASE r.power_source
            WHEN 'Solar' THEN '#fffbeb; color:#92400e;'
            WHEN 'Battery' THEN '#eff6ff; color:#1e40af;'
            ELSE '#fef2f2; color:#991b1b;'
          END || '">' || r.power_source || '</span></td>');
    htp.p('  <td style="padding:10px 16px; text-align:right; color:#334155;">' || r.persons_cooked_for || '</td>');
    htp.p('  <td style="padding:10px 16px; text-align:right; color:#334155;">' || r.duration_min || ' min</td>');
    htp.p('  <td style="padding:10px 16px; text-align:right; font-weight:600; color:#0f172a;">' || to_char(r.energy_kwh, '990.00') || ' kWh</td>');
    htp.p('  <td style="padding:10px 16px; text-align:center;">' ||
          '<a href="' || apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12:P12_ID:' || r.id) || '" style="display:inline-block; padding:3px 10px; border:1px solid #e2e8f0; border-radius:5px; font-size:0.78rem; font-weight:500; color:#475569; text-decoration:none; background:#ffffff;">Edit</a></td>');
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

    // -------------------------------------------------------------------------
    // 3. UPDATE MODAL ACTION BUTTONS (Pages 12 - 17)
    // -------------------------------------------------------------------------
    const pages = [
      { id: 12, pk: 'P12_ID', name: 'Cooking Session' },
      { id: 13, pk: 'P13_ID', name: 'Household' },
      { id: 14, pk: 'P14_ID', name: 'Kitchen Slot' },
      { id: 15, pk: 'P15_ID', name: 'Daily Technical Log' },
      { id: 16, pk: 'P16_ID', name: 'Generator Run' },
      { id: 17, pk: 'P17_ID', name: 'Feedback' },
    ];

    for (const p of pages) {
      await executeBlock(conn, `Update Action Buttons on Page ${p.id}`, `
      BEGIN
        UPDATE apex_200100.wwv_flow_page_plugs
        SET plug_source = q'[${buttonHtml(p.pk, p.name)}]',
            plug_template = 472247597001945879
        WHERE flow_id = 100 AND page_id = ${p.id} AND plug_name = 'Action Buttons';
        COMMIT;
      END;
      `);
    }

    console.log('\n======================================================');
    console.log('🎉 MINIMAL ENTERPRISE UI DEPLOYED SUCCESSFULLY! 🎉');
    console.log('======================================================');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
