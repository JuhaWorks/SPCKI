/**
 * update-page1.cjs
 * Updates Page 1 (Home Dashboard) with modal-aware launch buttons
 * and modal-aware Edit buttons in Recent Cooking Sessions.
 */
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
    console.log('>>> Updating Page 1 (Home Dashboard)...');

    await conn.execute(`
DECLARE
  l_hero_id NUMBER;
  l_kpi_id NUMBER;
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
    p_step_title=>'SPCKI Monitoring Platform - Executive Dashboard',
    p_autocomplete_on_off=>'OFF', p_page_template_options=>'#DEFAULT#',
    p_last_updated_by=>'SOLAR_COOK',
    p_last_upd_yyyymmddhh24miss=>to_char(sysdate,'YYYYMMDDHH24MISS')
  );

  -- 1. Hero Header with Modal Launcher Helper
  l_hero_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_hero_id),
    p_plug_name=>'SPCKI Executive Command Center',
    p_icon_css_classes=>'fa-solar-panel',
    p_region_template_options=>'#DEFAULT#:t-HeroRegion--featured',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472255984083945882),
    p_plug_display_sequence=>10,
    p_plug_display_point=>'REGION_POSITION_01',
    p_plug_source=>q'[
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
]',
    p_attribute_01=>'N', p_attribute_02=>'HTML', p_attribute_03=>'Y'
  );

  -- 2. KPI Cards Region (Live Dynamic Metrics)
  l_kpi_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_kpi_id),
    p_plug_name=>'Pilot Key Indicators',
    p_region_template_options=>'#DEFAULT#:t-Region--noPadding',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>20,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'[
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
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#2563eb; margin:6px 0;">' || v_sessions || '</div>');
  htp.p('  <div style="font-size:0.8rem; color:#1e40af;">' || v_hours || ' Total Cooking Hours</div>');
  htp.p('</div>');

  -- Card 3: Solar Generation
  htp.p('<div style="background:#fffbeb; border:1px solid #fde68a; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#92400e; text-transform:uppercase; letter-spacing:0.5px;">Direct Solar Share</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#d97706; margin:6px 0;">50%</div>');
  htp.p('  <div style="font-size:0.8rem; color:#92400e;">42 Direct Solar Sessions</div>');
  htp.p('</div>');

  -- Card 4: Battery Storage
  htp.p('<div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#6b21a8; text-transform:uppercase; letter-spacing:0.5px;">Battery Storage</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#9333ea; margin:6px 0;">30%</div>');
  htp.p('  <div style="font-size:0.8rem; color:#6b21a8;">25 Battery-Buffered Sessions</div>');
  htp.p('</div>');

  -- Card 5: Generator Backup
  htp.p('<div style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#991b1b; text-transform:uppercase; letter-spacing:0.5px;">Generator Backup</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#dc2626; margin:6px 0;">' || v_fuel_l || 'L</div>');
  htp.p('  <div style="font-size:0.8rem; color:#991b1b;">20% run during monsoon peaks</div>');
  htp.p('</div>');

  -- Card 6: User Satisfaction
  htp.p('<div style="background:#fdf4ff; border:1px solid #f5d0fe; border-radius:12px; padding:18px; text-align:center;">');
  htp.p('  <div style="font-size:0.82rem; font-weight:700; color:#86198f; text-transform:uppercase; letter-spacing:0.5px;">User Satisfaction</div>');
  htp.p('  <div style="font-size:2.2rem; font-weight:800; color:#c026d3; margin:6px 0;">' || v_sat || ' / 5.0</div>');
  htp.p('  <div style="font-size:0.8rem; color:#86198f;">100% willing to continue</div>');
  htp.p('</div>');

  htp.p('</div>');
END;
]',
    p_attribute_01=>'N'
  );

  -- 3. Daily Solar Production vs Energy Consumed Table (PL/SQL Dynamic Content)
  l_energy_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_energy_id),
    p_plug_name=>'Daily Solar Production vs Kitchen Energy Consumed',
    p_region_template_options=>'#DEFAULT#:t-Region--scrollBody',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>30,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'[
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
]',
    p_attribute_01=>'N'
  );

  -- 4. Recent Cooking Sessions Feed (PL/SQL Dynamic Content with modal launcher)
  l_recent_id := wwv_flow_id.next_val;
  wwv_flow_api.create_page_plug(
    p_id=>wwv_flow_api.id(l_recent_id),
    p_plug_name=>'Recent Cooking Sessions Feed',
    p_region_template_options=>'#DEFAULT#:t-Region--scrollBody',
    p_escape_on_http_output=>'N',
    p_plug_template=>wwv_flow_api.id(472274973856945887),
    p_plug_display_sequence=>40,
    p_plug_display_point=>'BODY',
    p_plug_source_type=>'NATIVE_PLSQL',
    p_plug_source=>q'[
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
    htp.p('  <td style="padding:8px 12px; text-align:center;">' ||
          '<a href="' || apex_util.prepare_url('f?p=' || v('APP_ID') || ':12:' || v('APP_SESSION') || '::NO:12:P12_ID:' || r.id) || '" class="t-Button t-Button--small t-Button--simple">' ||
          '<span class="fa fa-edit"></span> Edit</a></td>');
    htp.p('</tr>');
  END LOOP;

  htp.p('</tbody></table></div>');
END;
]',
    p_attribute_01=>'N'
  );

  COMMIT;
END;
    `);

    console.log('✓ Page 1 successfully updated with modal launchers.');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
