-- Demo seed: 16 households + 14 days of realistic data
-- Load AFTER 01_base.sql
-- Safe to re-run (uses INSERT ... ON CONFLICT DO NOTHING / IGNORE)

-- =====================================================================
-- 16 Households (coded IDs, no PII)
-- =====================================================================
INSERT INTO households (kitchen_id, household_code, family_size, children_count, adults_count,
                        baseline_fuel_type, baseline_monthly_fuel_cost, status, joined_date)
SELECT k.id, v.code, v.fs, v.ch, v.ad, 'LPG', v.cost, 'Active', '2024-01-01'
FROM kitchens k
CROSS JOIN (VALUES
  ('HH-01', 4, 2, 2, 1800.00),
  ('HH-02', 6, 3, 3, 2400.00),
  ('HH-03', 3, 1, 2, 1500.00),
  ('HH-04', 8, 4, 4, 3200.00),
  ('HH-05', 5, 2, 3, 2000.00),
  ('HH-06', 4, 2, 2, 1800.00),
  ('HH-07', 7, 3, 4, 2800.00),
  ('HH-08', 3, 1, 2, 1500.00),
  ('HH-09', 6, 3, 3, 2400.00),
  ('HH-10', 5, 2, 3, 2000.00),
  ('HH-11', 4, 2, 2, 1800.00),
  ('HH-12', 8, 4, 4, 3200.00),
  ('HH-13', 3, 1, 2, 1500.00),
  ('HH-14', 6, 3, 3, 2400.00),
  ('HH-15', 5, 2, 3, 2000.00),
  ('HH-16', 4, 2, 2, 1800.00)
) AS v(code, fs, ch, ad, cost)
WHERE k.name = 'SPCKI Kitchen 1'
ON CONFLICT (household_code) DO NOTHING;

-- =====================================================================
-- System users for all roles (passwords hashed by seed runner: <Role>@12345)
-- =====================================================================
INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, must_change_password)
SELECT NULL, 'admin', 'System Administrator', 'admin@spcki.local',
       '$argon2id$PLACEHOLDER_REPLACE_AT_RUNTIME',
       'Admin', 'Active', FALSE
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, must_change_password)
SELECT k.id, 'project', 'Project Coordinator', 'project@spcki.org',
       '$argon2id$PLACEHOLDER_PROJECT',
       'Project', 'Active', FALSE
FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, must_change_password)
SELECT k.id, 'field', 'Field Officer', 'field@spcki.org',
       '$argon2id$PLACEHOLDER_FIELD',
       'Field', 'Active', FALSE
FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, must_change_password)
SELECT k.id, 'technical', 'Technical Specialist', 'technical@spcki.org',
       '$argon2id$PLACEHOLDER_TECHNICAL',
       'Technical', 'Active', FALSE
FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (kitchen_id, username, full_name, email, password_hash, role, status, must_change_password)
SELECT k.id, 'viewer', 'Donor Viewer', 'viewer@spcki.org',
       '$argon2id$PLACEHOLDER_VIEWER',
       'Viewer', 'Active', FALSE
FROM kitchens k WHERE k.name = 'SPCKI Kitchen 1'
ON CONFLICT (username) DO NOTHING;

-- =====================================================================
-- 14 days of slots (fair rotation, 6 slots/day × 14 days = 84 slots)
-- Households assigned in round-robin: 1,2,...,16,1,2,...
-- =====================================================================
DO $$
DECLARE
  v_kitchen_id BIGINT;
  v_day        DATE;
  v_hh_ids     BIGINT[];
  v_tmpl       RECORD;
  v_hh_idx     INT := 0;
BEGIN
  SELECT id INTO v_kitchen_id FROM kitchens WHERE name = 'SPCKI Kitchen 1';

  -- Build ordered household ID array
  SELECT ARRAY_AGG(id ORDER BY household_code)
  INTO   v_hh_ids
  FROM   households
  WHERE  kitchen_id = v_kitchen_id AND status = 'Active';

  -- 14 days starting 2024-01-01
  FOR v_day IN SELECT generate_series('2024-01-01'::date, '2024-01-14'::date, '1 day'::interval)::date
  LOOP
    FOR v_tmpl IN
      SELECT slot_no, start_time, end_time, power_source
      FROM   slot_templates
      WHERE  kitchen_id = v_kitchen_id
      ORDER  BY slot_no
    LOOP
      INSERT INTO slots (kitchen_id, slot_date, slot_no, start_time, end_time, power_source, household_id, status)
      VALUES (
        v_kitchen_id,
        v_day,
        v_tmpl.slot_no,
        v_tmpl.start_time,
        v_tmpl.end_time,
        v_tmpl.power_source,
        v_hh_ids[(v_hh_idx % array_length(v_hh_ids, 1)) + 1],
        'Attended'
      )
      ON CONFLICT (kitchen_id, slot_date, slot_no) DO NOTHING;

      v_hh_idx := v_hh_idx + 1;
    END LOOP;
  END LOOP;
END
$$;

-- =====================================================================
-- 14 days of cooking sessions (one per slot)
-- =====================================================================
DO $$
DECLARE
  v_kitchen_id  BIGINT;
  v_slot        RECORD;
  v_appliance   INTEGER;
  v_dishes      INTEGER[];
  v_user_id     BIGINT;
BEGIN
  SELECT id INTO v_kitchen_id FROM kitchens WHERE name = 'SPCKI Kitchen 1';
  SELECT id INTO v_user_id FROM users WHERE username = 'admin';

  -- Pick a sample appliance (induction cooktop)
  SELECT id INTO v_appliance FROM appliances WHERE name = 'Induction cooktop';

  FOR v_slot IN
    SELECT sl.id AS slot_id, sl.household_id, sl.slot_date, sl.start_time, sl.end_time, sl.power_source,
           h.family_size
    FROM   slots sl
    JOIN   households h ON h.id = sl.household_id
    WHERE  sl.kitchen_id = v_kitchen_id
    AND    sl.status = 'Attended'
    ORDER  BY sl.slot_date, sl.slot_no
  LOOP
    INSERT INTO cooking_sessions (
      client_uuid, slot_id, household_id, persons_cooked_for,
      start_at, end_at, appliance_id, power_source,
      cooking_completed, cleaning_completed, waiting_issue, technical_problem,
      created_by, device_time
    ) VALUES (
      gen_random_uuid(),
      v_slot.slot_id,
      v_slot.household_id,
      v_slot.family_size,
      (v_slot.slot_date + v_slot.start_time)::timestamptz AT TIME ZONE 'Asia/Dhaka',
      (v_slot.slot_date + v_slot.start_time + interval '90 minutes')::timestamptz AT TIME ZONE 'Asia/Dhaka',
      v_appliance,
      v_slot.power_source,
      TRUE, TRUE, FALSE, FALSE,
      v_user_id,
      (v_slot.slot_date + v_slot.start_time)::timestamptz AT TIME ZONE 'Asia/Dhaka'
    )
    ON CONFLICT (slot_id) DO NOTHING;
  END LOOP;
END
$$;

-- =====================================================================
-- 14 days of daily technical logs
-- =====================================================================
DO $$
DECLARE
  v_kitchen_id BIGINT;
  v_user_id    BIGINT;
  v_day        DATE;
  v_weather    VARCHAR(20);
  v_weathers   VARCHAR(20)[] := ARRAY['Sunny','Partly cloudy','Sunny','Sunny','Cloudy','Partly cloudy','Sunny',
                                       'Sunny','Rainy','Partly cloudy','Sunny','Sunny','Partly cloudy','Sunny'];
  i            INT := 1;
BEGIN
  SELECT id INTO v_kitchen_id FROM kitchens WHERE name = 'SPCKI Kitchen 1';
  SELECT id INTO v_user_id FROM users WHERE username = 'admin';

  FOR v_day IN SELECT generate_series('2024-01-01'::date, '2024-01-14'::date, '1 day'::interval)::date
  LOOP
    v_weather := v_weathers[i];
    INSERT INTO daily_technical_logs (
      client_uuid, kitchen_id, log_date,
      solar_kwh, morning_soc, evening_soc,
      system_operational, fault_count, downtime_hours,
      safety_incident, weather, energy_consumed_kwh,
      created_by, device_time
    ) VALUES (
      gen_random_uuid(), v_kitchen_id, v_day,
      CASE v_weather WHEN 'Sunny' THEN 16.5 WHEN 'Partly cloudy' THEN 10.7 WHEN 'Cloudy' THEN 5.8 ELSE 3.2 END,
      30, 65,
      TRUE, 0, 0,
      FALSE, v_weather,
      CASE v_weather WHEN 'Sunny' THEN 14.2 WHEN 'Partly cloudy' THEN 9.5 WHEN 'Cloudy' THEN 5.0 ELSE 2.8 END,
      v_user_id, now()
    )
    ON CONFLICT (kitchen_id, log_date) DO NOTHING;

    i := i + 1;
  END LOOP;
END
$$;

-- =====================================================================
-- Monthly feedback (January 2024, one per household)
-- =====================================================================
DO $$
DECLARE
  v_household RECORD;
  v_user_id   BIGINT;
  v_kitchen_id BIGINT;
BEGIN
  SELECT id INTO v_kitchen_id FROM kitchens WHERE name = 'SPCKI Kitchen 1';
  SELECT id INTO v_user_id FROM users WHERE username = 'admin';

  FOR v_household IN
    SELECT id FROM households WHERE kitchen_id = v_kitchen_id ORDER BY household_code
  LOOP
    INSERT INTO monthly_feedback (
      client_uuid, household_id, survey_month,
      backup_fuel_used, backup_fuel_spend,
      fuel_reduction_rating, safety_rating, privacy_rating,
      waiting_rating, overall_rating, cleanliness_rating,
      ease_rating, slot_suitability, time_enough,
      family_members_now, willing_to_continue,
      created_by, device_time
    ) VALUES (
      gen_random_uuid(), v_household.id, '2024-01-01',
      FALSE, 0,
      4, 4, 3, 3, 4, 5, 4, 4, 'About right',
      NULL, TRUE,
      v_user_id, now()
    )
    ON CONFLICT (household_id, survey_month) DO NOTHING;
  END LOOP;
END
$$;
