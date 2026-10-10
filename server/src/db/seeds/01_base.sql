-- Seed: lookups, one kitchen, system config, 6 slot templates
-- Safe to re-run (uses INSERT ... ON CONFLICT DO NOTHING)

-- Kitchen
INSERT INTO kitchens (name, location, max_households, slots_per_day, scheduled_hours, status)
VALUES ('SPCKI Kitchen 1', 'Rohingya Camp, Cox''s Bazar, Bangladesh', 16, 6, 13, 'Active')
ON CONFLICT (name) DO NOTHING;

-- System config (4 kWp panels, 10 kWh battery, PR=0.75, PSH=4.5)
INSERT INTO system_config (kitchen_id, pv_capacity_kwp, battery_capacity_kwh, performance_ratio, peak_sun_hours, cooking_duty_factor, productive_sun_hours)
SELECT id, 4.0, 10.0, 0.75, 4.5, 0.60, 10.0
FROM kitchens WHERE name = 'SPCKI Kitchen 1'
ON CONFLICT (kitchen_id) DO NOTHING;

-- 6 slot templates (6:00–19:00, roughly 2 hours each)
-- Slot 1: Solar (morning peak)
-- Slot 2: Solar
-- Slot 3: Solar (midday)
-- Slot 4: Battery (afternoon)
-- Slot 5: Battery (evening)
-- Slot 6: Battery (night)
INSERT INTO slot_templates (kitchen_id, slot_no, start_time, end_time, power_source)
SELECT k.id, v.slot_no, v.start_time::time, v.end_time::time, v.power_source
FROM kitchens k
CROSS JOIN (VALUES
  (1, '06:00', '08:00', 'Solar'),
  (2, '08:00', '10:00', 'Solar'),
  (3, '10:00', '12:30', 'Solar'),
  (4, '12:30', '14:30', 'Battery'),
  (5, '14:30', '16:30', 'Battery'),
  (6, '16:30', '19:00', 'Battery')
) AS v(slot_no, start_time, end_time, power_source)
WHERE k.name = 'SPCKI Kitchen 1'
ON CONFLICT (kitchen_id, slot_no) DO NOTHING;
