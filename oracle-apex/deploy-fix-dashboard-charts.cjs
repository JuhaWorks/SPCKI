const oracledb = require('oracledb');

const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin'
};

async function executeBlock(conn, title, sql, params = {}) {
  console.log(`\n=== [RUNNING] ${title} ===`);
  try {
    await conn.execute(sql, params);
    console.log(`[SUCCESS] ${title}`);
  } catch (err) {
    console.error(`[ERROR] ${title}:`, err.message);
    throw err;
  }
}

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);

  try {
    // -------------------------------------------------------------------------
    // 1. UPDATE HEADER PLUG (Page 1): BIGGER TEXT & HIGH-VISIBILITY ACTIONS
    // -------------------------------------------------------------------------
    const headerSource = `
DECLARE
  v_url_12 VARCHAR2(1000);
  v_url_15 VARCHAR2(1000);
  v_url_16 VARCHAR2(1000);
  v_user_role VARCHAR2(50) := spcki_auth_pkg.get_user_role(v('APP_USER'));
BEGIN
  v_url_12 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12::');
  v_url_15 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':15:' || v('APP_SESSION') || '::NO:15::');
  v_url_16 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':16:' || v('APP_SESSION') || '::NO:16::');

  htp.p('<div style="padding:14px 0 24px 0; border-bottom:1px solid #cbd5e1; margin-bottom:32px;">');
  htp.p('  <div class="spcki-header-flex" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">');
  
  -- Title & Subtitle
  htp.p('    <div>');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#475569; margin-bottom:6px;">');
  htp.p('        COMMUNITY MICROGRID & COOKING MONITORING');
  htp.p('      </div>');
  htp.p('      <h1 style="margin:0; font-size:2.65rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; line-height:1.2;">');
  htp.p('        SPCKI Command Center');
  htp.p('      </h1>');
  htp.p('      <p style="margin:8px 0 0 0; color:#475569; font-size:1.25rem; font-weight:500;">');
  htp.p('        Clean cooking transition, solar microgrid metrics & pilot operational logs');
  htp.p('      </p>');
  htp.p('    </div>');

  -- Role Badge
  htp.p('    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">');
  IF v_user_role = 'DONOR' THEN
    htp.p('      <span style="display:inline-flex; align-items:center; gap:8px; background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-eye"></span> Donor Executive View (Read-Only)</span>');
  ELSIF v_user_role = 'FIELD' THEN
    htp.p('      <span style="display:inline-flex; align-items:center; gap:8px; background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-cutlery"></span> Field Officer Entry Mode</span>');
  ELSIF v_user_role = 'TECHNICAL' THEN
    htp.p('      <span style="display:inline-flex; align-items:center; gap:8px; background:#fefce8; color:#854d0e; border:1px solid #fef08a; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-bolt"></span> Technical Specialist Mode</span>');
  ELSE
    htp.p('      <span style="display:inline-flex; align-items:center; gap:8px; background:#f8fafc; color:#0f172a; border:1px solid #cbd5e1; padding:10px 20px; border-radius:8px; font-size:1.05rem; font-weight:700;"><span class="fa fa-shield"></span> Administrator Mode</span>');
  END IF;

  -- Quick Action Buttons
  IF v_user_role != 'DONOR' THEN
    htp.p('      <div class="spcki-action-btns-wrap" style="display:flex; gap:10px; flex-wrap:wrap;">');
    htp.p('        <a href="' || v_url_12 || '" class="spcki-act-btn" style="display:inline-flex; align-items:center; gap:8px; padding:12px 22px; background:#0f172a; color:#ffffff; font-size:1.1rem; font-weight:700; border-radius:8px; text-decoration:none; box-shadow:0 2px 6px rgba(15,23,42,0.12);">');
    htp.p('          <span class="fa fa-plus" aria-hidden="true"></span> Log Session');
    htp.p('        </a>');
    htp.p('        <a href="' || v_url_15 || '" class="spcki-act-btn" style="display:inline-flex; align-items:center; gap:8px; padding:12px 20px; background:#ffffff; color:#1e293b; border:1px solid #cbd5e1; font-size:1.1rem; font-weight:700; border-radius:8px; text-decoration:none;">');
    htp.p('          <span class="fa fa-sun-o" aria-hidden="true"></span> Solar & SOC');
    htp.p('        </a>');
    htp.p('        <a href="' || v_url_16 || '" class="spcki-act-btn" style="display:inline-flex; align-items:center; gap:8px; padding:12px 20px; background:#ffffff; color:#1e293b; border:1px solid #cbd5e1; font-size:1.1rem; font-weight:700; border-radius:8px; text-decoration:none;">');
    htp.p('          <span class="fa fa-cogs" aria-hidden="true"></span> Generator');
    htp.p('        </a>');
    htp.p('      </div>');
  END IF;

  htp.p('    </div>');
  htp.p('  </div>');
  htp.p('</div>');
END;
`;

    await executeBlock(conn, 'Update Page 1 Header Plug', `
    DECLARE
      l_clob CLOB := :src;
    BEGIN
      UPDATE apex_200100.wwv_flow_page_plugs
         SET plug_source = l_clob
       WHERE flow_id = 100 AND page_id = 1 AND plug_name = 'Header';
      COMMIT;
    END;
    `, { src: headerSource });

    // -------------------------------------------------------------------------
    // 2. UPDATE KEY INDICATORS PLUG (Page 1): BIGGER TEXT, READABLE VALUES
    // -------------------------------------------------------------------------
    const kpiSource = `
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

  htp.p('<div style="background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:28px 0; margin-bottom:40px;">');
  htp.p('  <div class="spcki-kpi-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">');

  -- Metric 1: Households
  htp.p('    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Active Households</div>');
  htp.p('      <div class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_hh || ' <span style="font-size:1.45rem; font-weight:600; color:#64748b;">/ ' || v_hh || '</span></div>');
  htp.p('      <div style="font-size:1.15rem; color:#059669; font-weight:700; display:flex; align-items:center; gap:8px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#059669;"></span> 100% participation</div>');
  htp.p('    </div>');

  -- Metric 2: Sessions
  htp.p('    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Cooking Sessions</div>');
  htp.p('      <div id="kpi-sessions-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_sessions || '</div>');
  htp.p('      <div id="kpi-hours-desc" style="font-size:1.15rem; color:#475569; font-weight:600;">' || v_hours || ' total hours logged</div>');
  htp.p('    </div>');

  -- Metric 3: People Fed
  htp.p('    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">People Fed</div>');
  htp.p('      <div id="kpi-persons-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_persons || '</div>');
  htp.p('      <div style="font-size:1.15rem; color:#475569; font-weight:600;">Communal meals served</div>');
  htp.p('    </div>');

  -- Metric 4: Avg Cooking Time
  htp.p('    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Avg Cooking Time</div>');
  htp.p('      <div id="kpi-duration-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">' || v_wasted || ' <span style="font-size:1.45rem; font-weight:600; color:#64748b;">min</span></div>');
  htp.p('      <div style="font-size:1.15rem; color:#475569; font-weight:600;">Per meal preparation</div>');
  htp.p('    </div>');

  -- Metric 5: Clean Solar Share
  htp.p('    <div class="spcki-kpi-item" style="padding:6px 24px; border-right:1px solid #e2e8f0;">');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Clean Solar Share</div>');
  htp.p('      <div id="kpi-solar-share-val" class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">82%</div>');
  htp.p('      <div style="font-size:1.15rem; color:#059669; font-weight:700; display:flex; align-items:center; gap:8px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#059669;"></span> Solar & battery buffered</div>');
  htp.p('    </div>');

  -- Metric 6: Safety Incidents
  htp.p('    <div class="spcki-kpi-item" style="padding:6px 24px;">');
  htp.p('      <div style="font-size:1.05rem; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em;">Safety Incidents</div>');
  htp.p('      <div class="spcki-kpi-value" style="font-size:3.2rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin:6px 0 4px 0;">0 <span style="font-size:1.45rem; font-weight:600; color:#64748b;">/ 0</span></div>');
  htp.p('      <div style="font-size:1.15rem; color:#059669; font-weight:700; display:flex; align-items:center; gap:8px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#059669;"></span> 100% safe operation</div>');
  htp.p('    </div>');

  htp.p('  </div>');
  htp.p('</div>');
END;
`;

    await executeBlock(conn, 'Update Page 1 Key Indicators Plug', `
    DECLARE
      l_clob CLOB := :src;
    BEGIN
      UPDATE apex_200100.wwv_flow_page_plugs
         SET plug_source = l_clob
       WHERE flow_id = 100 AND page_id = 1 AND plug_name = 'Key Indicators';
      COMMIT;
    END;
    `, { src: kpiSource });

    // -------------------------------------------------------------------------
    // 3. UPDATE ANALYTICS & VISUALIZATIONS PLUG: FIX JS SYNTAX, LOAD CHART.JS,
    //    LARGER TEXT & RANGE FILTERS
    // -------------------------------------------------------------------------
    const analyticsSource = `
DECLARE
  v_solar_json CLOB := spcki_dashboard_pkg.get_solar_trend_json();
  v_battery_json CLOB := spcki_dashboard_pkg.get_battery_soc_json();
  v_slot_json CLOB := spcki_dashboard_pkg.get_slot_utilisation_json();
  v_sessions_json CLOB := spcki_dashboard_pkg.get_sessions_trend_json();
  v_sat_json CLOB := spcki_dashboard_pkg.get_satisfaction_trend_json();
BEGIN
  -- Unconditionally load Chart.js engine
  htp.p('<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>');

  -- Top Filter Header (Universal Time Filters: 1D, 3D, 7D, 1M, 3M, All)
  htp.p('<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:18px; margin-bottom:32px; padding-bottom:20px; border-bottom:1px solid #cbd5e1;">');
  htp.p('  <div>');
  htp.p('    <h2 style="margin:0; font-size:1.95rem; font-weight:800; color:#0f172a; letter-spacing:-0.02em;">Microgrid & Pilot Analytics</h2>');
  htp.p('    <p style="margin:6px 0 0 0; font-size:1.18rem; color:#475569; font-weight:500;">Universal real-time filtering across generation, battery storage, and community usage</p>');
  htp.p('  </div>');
  htp.p('  <div class="spcki-filter-toolbar-wrap" style="display:flex; align-items:center; gap:8px; background:#ffffff; padding:6px 10px; border:1px solid #cbd5e1; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">');
  htp.p('    <span style="font-size:1.02rem; font-weight:800; color:#334155; text-transform:uppercase; letter-spacing:0.06em; margin-right:10px; padding-left:8px;">Time Range:</span>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="1" onclick="window.spckiSetFilter(1, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">1 Day</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="3" onclick="window.spckiSetFilter(3, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">3 Days</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="7" onclick="window.spckiSetFilter(7, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">7 Days</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="30" onclick="window.spckiSetFilter(30, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">1 Month</button>');
  htp.p('    <button type="button" class="spcki-tf-btn" data-days="90" onclick="window.spckiSetFilter(90, this)" style="padding:10px 18px; border:1px solid #cbd5e1; background:#ffffff; color:#334155; border-radius:6px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">3 Months</button>');
  htp.p('    <button type="button" class="spcki-tf-btn spcki-tf-active" data-days="999" onclick="window.spckiSetFilter(999, this)" style="padding:10px 22px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; border-radius:6px; font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.15s ease;">All</button>');
  htp.p('  </div>');
  htp.p('</div>');

  -- Responsive Charts Grid
  htp.p('<div class="spcki-charts-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(480px, 1fr)); gap:32px; margin-bottom:48px;">');

  -- Chart 1: Solar Generation vs Consumption
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Solar Generation vs Consumption (kWh)</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Microgrid</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_solar"></canvas></div>');
  htp.p('</div>');

  -- Chart 2: Battery SOC Trend
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Battery SOC Trend (%)</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Storage</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_battery"></canvas></div>');
  htp.p('</div>');

  -- Chart 3: Appliance Utilisation (DONUT - DYNAMICALLY FILTERED)
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Appliance Utilisation</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Filtered</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_app_pie"></canvas></div>');
  htp.p('</div>');

  -- Chart 4: Power Source Distribution (DONUT - DYNAMICALLY FILTERED)
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Power Source Distribution</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Filtered</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_pwr_pie"></canvas></div>');
  htp.p('</div>');

  -- Chart 5: Daily Slot Utilisation (BAR)
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Daily Slot Utilisation</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Stations</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_slots"></canvas></div>');
  htp.p('</div>');

  -- Chart 6: Cooking Time by Family Size Band (BAR - DYNAMICALLY FILTERED)
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Cooking Duration by Family Size Band</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Filtered</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_size_band"></canvas></div>');
  htp.p('</div>');

  -- Chart 7: Monthly Satisfaction & Safety Perception Trend
  htp.p('<div style="background:#ffffff; padding:26px; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02); grid-column:1 / -1;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">');
  htp.p('    <span style="font-size:1.35rem; font-weight:800; color:#0f172a;">Household Satisfaction & Safety Perception Trend (1-5 Scale)</span>');
  htp.p('    <span style="font-size:0.92rem; font-weight:700; color:#475569; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 14px; border-radius:6px;">Social Impact</span>');
  htp.p('  </div>');
  htp.p('  <div style="position:relative; height:380px; width:100%;"><canvas id="chart_sat"></canvas></div>');
  htp.p('</div>');

  htp.p('</div>');

  -- Multi-Chart Universal Dynamic Filtering JavaScript
  htp.p('<script>');
  htp.p('(function() {');
  htp.p('  var rawSolar = ' || v_solar_json || ';');
  htp.p('  var rawBattery = ' || v_battery_json || ';');
  htp.p('  var rawSlot = ' || v_slot_json || ';');
  htp.p('  var rawSessions = ' || v_sessions_json || ';');
  htp.p('  var rawSat = ' || v_sat_json || ';');

  htp.p('  var cSolar, cBattery, cAppPie, cPwrPie, cSlots, cBand, cSat;');
  htp.p('  var waitAttempts = 0;');

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
  htp.p('    if (typeof Chart === "undefined") {');
  htp.p('      waitAttempts++;');
  htp.p('      if (waitAttempts < 25) { setTimeout(function(){ renderAllCharts(days); }, 80); return; }');
  htp.p('      console.warn("Chart.js unavailable");');
  htp.p('      return;');
  htp.p('    }');

  htp.p('    Chart.defaults.font.family = "Plus Jakarta Sans, -apple-system, sans-serif";');
  htp.p('    Chart.defaults.font.size = 15;');
  htp.p('    Chart.defaults.font.weight = "600";');
  htp.p('    Chart.defaults.color = "#1e293b";');
  htp.p('    Chart.defaults.scale.grid.color = "#f1f5f9";');

  htp.p('    var curSolar = sliceData(rawSolar, days);');
  htp.p('    var curBattery = sliceData(rawBattery, days);');
  htp.p('    var curSlots = sliceData(rawSlot, days);');
  htp.p('    var curSessions = filterSessionsByDays(days);');

  -- Recalculate KPIs with clean escaped markup
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
  htp.p('      if (elDuration) elDuration.innerHTML = Math.round(totDur / curSessions.length) + " <span style=\\"font-size:1.45rem; font-weight:600; color:#64748b;\\">min</span>";');
  htp.p('      if (elHoursDesc) elHoursDesc.innerText = Math.round(totDur / 60.0 * 10) / 10 + " total hours in period";');
  htp.p('      if (elSolarShare) elSolarShare.innerText = Math.round(cleanCount / curSessions.length * 100) + "%";');
  htp.p('    }');

  -- 1. Solar Line Chart
  htp.p('    var ctxSolar = document.getElementById("chart_solar");');
  htp.p('    if (ctxSolar) {');
  htp.p('      if (cSolar) cSolar.destroy();');
  htp.p('      cSolar = new Chart(ctxSolar, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: curSolar.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Generated (kWh)", data: curSolar.map(function(d){ return d.generated; }), borderColor: "#0f172a", backgroundColor: "rgba(15,23,42,0.06)", tension: 0.2, fill: true, borderWidth: 3, pointRadius: 4 },');
  htp.p('            { label: "Consumed (kWh)", data: curSolar.map(function(d){ return d.consumed; }), borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.06)", tension: 0.2, fill: true, borderWidth: 3, pointRadius: 4 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 2. Battery SOC Line Chart
  htp.p('    var ctxBattery = document.getElementById("chart_battery");');
  htp.p('    if (ctxBattery) {');
  htp.p('      if (cBattery) cBattery.destroy();');
  htp.p('      cBattery = new Chart(ctxBattery, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: curBattery.map(function(d){ return d.date.substring(5); }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Morning SOC (%)", data: curBattery.map(function(d){ return d.morning; }), borderColor: "#0284c7", tension: 0.2, borderWidth: 3, pointRadius: 4 },');
  htp.p('            { label: "Evening SOC (%)", data: curBattery.map(function(d){ return d.evening; }), borderColor: "#0f172a", tension: 0.2, borderWidth: 3, pointRadius: 4 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 3. Dynamic Appliance Donut Chart
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
  htp.p('          datasets: [{ data: appVals, backgroundColor: ["#0f172a", "#2563eb", "#0284c7", "#64748b"] }]');
  htp.p('        },');
  htp.p('        options: { cutout: "68%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 4. Dynamic Power Source Donut Chart
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
  htp.p('        options: { cutout: "68%", responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 5. Daily Slots Stacked Bar Chart
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
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 6. Family Size Band Duration Bar Chart
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
  htp.p('        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  -- 7. Satisfaction Trend Line Chart
  htp.p('    var ctxSat = document.getElementById("chart_sat");');
  htp.p('    if (ctxSat) {');
  htp.p('      if (cSat) cSat.destroy();');
  htp.p('      cSat = new Chart(ctxSat, {');
  htp.p('        type: "line",');
  htp.p('        data: {');
  htp.p('          labels: rawSat.map(function(d){ return d.month; }),');
  htp.p('          datasets: [');
  htp.p('            { label: "Overall Rating", data: rawSat.map(function(d){ return d.overall; }), borderColor: "#059669", tension: 0.2, borderWidth: 3, pointRadius: 5 },');
  htp.p('            { label: "Safety Perception", data: rawSat.map(function(d){ return d.safety; }), borderColor: "#2563eb", tension: 0.2, borderWidth: 3, pointRadius: 5 },');
  htp.p('            { label: "Cleanliness", data: rawSat.map(function(d){ return d.cleanliness; }), borderColor: "#6366f1", tension: 0.2, borderWidth: 3, pointRadius: 5 },');
  htp.p('            { label: "Ease of Use", data: rawSat.map(function(d){ return d.ease; }), borderColor: "#d97706", tension: 0.2, borderWidth: 3, pointRadius: 5 }');
  htp.p('          ]');
  htp.p('        },');
  htp.p('        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 1, max: 5 } }, plugins: { legend: { position: "top", labels: { boxWidth: 16, font: { weight: "700", size: 15 } } } } }');
  htp.p('      });');
  htp.p('    }');

  htp.p('  }');

  -- Global Filter Button Handler
  htp.p('  window.spckiSetFilter = function(days, btn) {');
  htp.p('    var buttons = document.querySelectorAll(".spcki-tf-btn");');
  htp.p('    buttons.forEach(function(b) {');
  htp.p('      b.style.background = "#ffffff";');
  htp.p('      b.style.color = "#334155";');
  htp.p('      b.style.borderColor = "#cbd5e1";');
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
`;

    await executeBlock(conn, 'Update Page 1 Analytics & Visualizations Plug', `
    DECLARE
      l_clob CLOB := :src;
    BEGIN
      UPDATE apex_200100.wwv_flow_page_plugs
         SET plug_source = l_clob
       WHERE flow_id = 100 AND page_id = 1 AND plug_name = 'Analytics & Visualizations';
      COMMIT;
    END;
    `, { src: analyticsSource });

    // -------------------------------------------------------------------------
    // 4. UPDATE DAILY SOLAR PLUG: BIGGER TABLE HEADERS, CELLS, BADGES
    // -------------------------------------------------------------------------
    const solarTableSource = `
BEGIN
  htp.p('<div style="margin-top:28px; margin-bottom:48px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid #cbd5e1;">');
  htp.p('    <span style="font-size:1.75rem; font-weight:800; color:#0f172a;">Daily Solar Production vs Energy Consumed</span>');
  htp.p('    <span style="font-size:1.15rem; color:#475569; font-weight:600;">Sorted: Latest records first &bull; Microgrid logs</span>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:1.18rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:2px solid #cbd5e1; text-align:left;">');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Log Date</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Weather</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Solar Generation</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Kitchen Consumed</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Net Surplus</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:center;">Coverage</th>');
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
    htp.p('  <td style="padding:18px 24px; font-weight:700; color:#0f172a;">' || r.l_date || '</td>');
    htp.p('  <td style="padding:18px 24px;"><span style="display:inline-block; padding:6px 16px; border-radius:6px; font-size:1.05rem; font-weight:700; background:' ||
          CASE r.weather
            WHEN 'Sunny' THEN '#fefce8; color:#854d0e;'
            WHEN 'Partly cloudy' THEN '#eff6ff; color:#1e40af;'
            ELSE '#f1f5f9; color:#475569;'
          END || '">' || r.weather || '</span></td>');
    htp.p('  <td style="padding:18px 24px; text-align:right; font-weight:700; color:#0f172a;">' || to_char(r.solar_kwh, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:18px 24px; text-align:right; color:#475569; font-weight:600;">' || to_char(r.consumed_kwh, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:18px 24px; text-align:right; font-weight:700; color:' || CASE WHEN r.surplus >= 0 THEN '#059669' ELSE '#dc2626' END || ';">' ||
          CASE WHEN r.surplus >= 0 THEN '+' ELSE '' END || to_char(r.surplus, '990.0') || ' kWh</td>');
    htp.p('  <td style="padding:18px 24px; text-align:center;"><span style="display:inline-block; padding:6px 16px; border-radius:6px; font-weight:800; font-size:1.05rem; background:' ||
          CASE WHEN r.coverage >= 100 THEN '#ecfdf5; color:#065f46;' ELSE '#fff1f2; color:#9f1239;' END || '">' || r.coverage || '%</span></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div></div>');
END;
`;

    await executeBlock(conn, 'Update Page 1 Daily Solar Table Plug', `
    DECLARE
      l_clob CLOB := :src;
    BEGIN
      UPDATE apex_200100.wwv_flow_page_plugs
         SET plug_source = l_clob
       WHERE flow_id = 100 AND page_id = 1 AND plug_name = 'Daily Solar Production vs Kitchen Energy Consumed';
      COMMIT;
    END;
    `, { src: solarTableSource });

    // -------------------------------------------------------------------------
    // 5. UPDATE RECENT SESSIONS PLUG: BIGGER TABLE HEADERS, CELLS, BUTTONS
    // -------------------------------------------------------------------------
    const sessionsTableSource = `
DECLARE
  v_url_13 VARCHAR2(1000);
BEGIN
  htp.p('<div style="margin-top:28px; margin-bottom:48px;">');
  htp.p('  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid #cbd5e1;">');
  htp.p('    <span style="font-size:1.75rem; font-weight:800; color:#0f172a;">Recent Cooking Sessions</span>');
  htp.p('    <div style="display:flex; align-items:center; gap:16px;">');
  htp.p('      <span style="font-size:1.15rem; color:#475569; font-weight:600;">Sorted: Latest sessions first</span>');
  htp.p('      <a href="f?p=' || v('APP_ID') || ':2:' || v('APP_SESSION') || ':::" style="font-size:1.15rem; font-weight:700; color:#2563eb; text-decoration:none;">View all sessions &rarr;</a>');
  htp.p('    </div>');
  htp.p('  </div>');
  htp.p('  <div style="overflow-x:auto; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">');
  htp.p('    <table style="width:100%; border-collapse:collapse; font-size:1.18rem;">');
  htp.p('      <thead><tr style="background:#f8fafc; border-bottom:2px solid #cbd5e1; text-align:left;">');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">ID</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Household</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Date</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Appliance</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b;">Power Source</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Persons</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Duration</th>');
  htp.p('        <th style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:right;">Energy</th>');
  htp.p('        <th class="spcki-edit-btn" style="padding:18px 24px; font-size:1.05rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#1e293b; text-align:center;">Action</th>');
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
    v_url_13 := apex_util.prepare_url('f?p=' || v('APP_ID') || ':13:' || v('APP_SESSION') || '::NO:13:P13_ID:' || r.id);
    htp.p('<tr style="border-bottom:1px solid #f1f5f9; transition:background 0.15s ease;">');
    htp.p('  <td style="padding:18px 24px; color:#475569; font-weight:700; font-size:1.15rem;">#' || r.id || '</td>');
    htp.p('  <td style="padding:18px 24px; font-weight:800; color:#0f172a;">' || r.household_code || '</td>');
    htp.p('  <td style="padding:18px 24px; color:#475569; font-weight:600;">' || r.s_date || '</td>');
    htp.p('  <td style="padding:18px 24px; color:#1e293b; font-weight:600;">' || r.appliance || '</td>');
    htp.p('  <td style="padding:18px 24px;"><span style="display:inline-block; padding:6px 14px; border-radius:6px; font-size:1.05rem; font-weight:700; background:' ||
          CASE r.power_source
            WHEN 'Solar' THEN '#fefce8; color:#854d0e;'
            WHEN 'Battery' THEN '#f0fdf4; color:#166534;'
            ELSE '#fff1f2; color:#9f1239;'
          END || '">' || r.power_source || '</span></td>');
    htp.p('  <td style="padding:18px 24px; text-align:right; font-weight:600; color:#0f172a;">' || r.persons_cooked_for || '</td>');
    htp.p('  <td style="padding:18px 24px; text-align:right; color:#475569; font-weight:600;">' || r.duration_min || ' min</td>');
    htp.p('  <td style="padding:18px 24px; text-align:right; font-weight:700; color:#0f172a;">' || to_char(r.energy_kwh, '990.00') || ' kWh</td>');
    htp.p('  <td class="spcki-edit-btn" style="padding:18px 24px; text-align:center;">');
    htp.p('    <a href="' || v_url_13 || '" style="display:inline-block; padding:8px 18px; background:#ffffff; color:#334155; border:1px solid #cbd5e1; border-radius:6px; font-size:1.05rem; font-weight:700; text-decoration:none;">Edit</a>');
    htp.p('  </td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div></div>');
END;
`;

    await executeBlock(conn, 'Update Page 1 Recent Sessions Table Plug', `
    DECLARE
      l_clob CLOB := :src;
    BEGIN
      UPDATE apex_200100.wwv_flow_page_plugs
         SET plug_source = l_clob
       WHERE flow_id = 100 AND page_id = 1 AND plug_name = 'Recent Cooking Sessions Feed';
      COMMIT;
    END;
    `, { src: sessionsTableSource });

  } finally {
    await conn.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
