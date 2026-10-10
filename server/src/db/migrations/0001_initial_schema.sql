-- Migration 0001: Initial schema (all tables, indexes, views, starter lookups)
-- Source of truth: docs/spcki_schema.sql
-- Run with: node-pg-migrate up

-- =====================================================================
-- 1. KITCHENS AND SETTINGS
-- =====================================================================
CREATE TABLE kitchens (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name              VARCHAR(100) NOT NULL UNIQUE,
    location          VARCHAR(200),
    max_households    SMALLINT NOT NULL DEFAULT 16 CHECK (max_households > 0),
    slots_per_day     SMALLINT NOT NULL DEFAULT 6  CHECK (slots_per_day > 0),
    scheduled_hours   NUMERIC(4,1) NOT NULL DEFAULT 13 CHECK (scheduled_hours > 0 AND scheduled_hours <= 24),
    status            VARCHAR(10) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Inactive')),
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE system_config (
    kitchen_id            BIGINT PRIMARY KEY REFERENCES kitchens(id) ON DELETE CASCADE,
    pv_capacity_kwp       NUMERIC(8,2) NOT NULL CHECK (pv_capacity_kwp > 0),
    battery_capacity_kwh  NUMERIC(8,2) NOT NULL CHECK (battery_capacity_kwh > 0),
    performance_ratio     NUMERIC(4,2) NOT NULL DEFAULT 0.75 CHECK (performance_ratio BETWEEN 0.30 AND 1.00),
    peak_sun_hours        NUMERIC(4,2) NOT NULL DEFAULT 4.5  CHECK (peak_sun_hours > 0),
    cooking_duty_factor   NUMERIC(3,2) NOT NULL DEFAULT 0.60 CHECK (cooking_duty_factor BETWEEN 0 AND 1),
    productive_sun_hours  NUMERIC(4,1) NOT NULL DEFAULT 10   CHECK (productive_sun_hours > 0),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Slot templates define the daily schedule pattern per kitchen
CREATE TABLE slot_templates (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id    BIGINT NOT NULL REFERENCES kitchens(id) ON DELETE CASCADE,
    slot_no       SMALLINT NOT NULL CHECK (slot_no > 0),
    start_time    TIME NOT NULL,
    end_time      TIME NOT NULL,
    power_source  VARCHAR(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
    CHECK (end_time > start_time),
    UNIQUE (kitchen_id, slot_no)
);

-- =====================================================================
-- 2. LOOKUP TABLES
-- =====================================================================
CREATE TABLE weather_factors (
    weather  VARCHAR(20) PRIMARY KEY,
    factor   NUMERIC(3,2) NOT NULL CHECK (factor BETWEEN 0 AND 1)
);

CREATE TABLE appliances (
    id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name      VARCHAR(60) NOT NULL UNIQUE,
    power_kw  NUMERIC(5,2) NOT NULL CHECK (power_kw > 0),
    active    BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE dishes (
    id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    VARCHAR(40) NOT NULL UNIQUE,
    active  BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE problem_categories (
    id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kind    VARCHAR(10) NOT NULL CHECK (kind IN ('Waiting','Technical')),
    name    VARCHAR(60) NOT NULL,
    active  BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (kind, name)
);

-- =====================================================================
-- 3. USERS AND SECURITY
-- =====================================================================
CREATE TABLE users (
    id                      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id              BIGINT REFERENCES kitchens(id),
    username                VARCHAR(50)  NOT NULL UNIQUE,
    full_name               VARCHAR(100) NOT NULL,
    email                   VARCHAR(150) UNIQUE,
    password_hash           TEXT NOT NULL,
    role                    VARCHAR(12) NOT NULL CHECK (role IN ('Admin','Project','Field','Technical','Viewer')),
    status                  VARCHAR(10) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Inactive')),
    must_change_password    BOOLEAN NOT NULL DEFAULT TRUE,
    failed_login_attempts   SMALLINT NOT NULL DEFAULT 0,
    locked_until            TIMESTAMPTZ,
    last_login_at           TIMESTAMPTZ,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE refresh_tokens (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      TEXT NOT NULL UNIQUE,
    family          UUID NOT NULL,                              -- for reuse detection: revoke entire family
    expires_at      TIMESTAMPTZ NOT NULL,
    revoked_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_family ON refresh_tokens(family);

CREATE TABLE login_history (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id),
    username    VARCHAR(50) NOT NULL,
    login_time  TIMESTAMPTZ NOT NULL DEFAULT now(),
    success     BOOLEAN NOT NULL,
    ip_address  INET,
    device      VARCHAR(200)
);

CREATE TABLE audit_logs (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id),
    action      VARCHAR(10) NOT NULL CHECK (action IN ('CREATE','UPDATE','DELETE','EXPORT','LOGIN')),
    table_name  VARCHAR(60) NOT NULL,
    record_id   VARCHAR(60),
    old_values  JSONB,
    new_values  JSONB,
    reason      TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 4. HOUSEHOLDS AND SLOTS
-- =====================================================================
CREATE TABLE households (
    id                         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id                 BIGINT NOT NULL REFERENCES kitchens(id),
    household_code             VARCHAR(20) NOT NULL UNIQUE,
    family_size                SMALLINT NOT NULL CHECK (family_size > 0),
    children_count             SMALLINT NOT NULL DEFAULT 0 CHECK (children_count >= 0),
    adults_count               SMALLINT NOT NULL DEFAULT 0 CHECK (adults_count >= 0),
    baseline_fuel_type         VARCHAR(30),
    baseline_monthly_fuel_cost NUMERIC(10,2) CHECK (baseline_monthly_fuel_cost >= 0),
    status                     VARCHAR(10) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Inactive')),
    joined_date                DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (children_count + adults_count = family_size)
);

CREATE TABLE slots (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id    BIGINT NOT NULL REFERENCES kitchens(id),
    slot_date     DATE NOT NULL,
    slot_no       SMALLINT NOT NULL CHECK (slot_no > 0),
    start_time    TIME NOT NULL,
    end_time      TIME NOT NULL,
    power_source  VARCHAR(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
    household_id  BIGINT REFERENCES households(id),
    status        VARCHAR(10) NOT NULL DEFAULT 'Scheduled'
                  CHECK (status IN ('Scheduled','Attended','Missed','Cancelled','Swapped')),
    note          VARCHAR(200),
    created_by    BIGINT REFERENCES users(id),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (kitchen_id, slot_date, slot_no),
    CHECK (end_time > start_time)
);

-- =====================================================================
-- 5. DATA COLLECTION FORMS
-- =====================================================================
CREATE TABLE cooking_sessions (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid         UUID NOT NULL UNIQUE,
    slot_id             BIGINT NOT NULL UNIQUE REFERENCES slots(id),
    household_id        BIGINT NOT NULL REFERENCES households(id),
    persons_cooked_for  SMALLINT NOT NULL CHECK (persons_cooked_for > 0),
    start_at            TIMESTAMPTZ NOT NULL,
    end_at              TIMESTAMPTZ NOT NULL,
    duration_min        INTEGER GENERATED ALWAYS AS
                        (ROUND(EXTRACT(EPOCH FROM (end_at - start_at)) / 60)::INTEGER) STORED,
    appliance_id        INTEGER NOT NULL REFERENCES appliances(id),
    power_source        VARCHAR(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
    cooking_completed   BOOLEAN NOT NULL,
    cleaning_completed  BOOLEAN NOT NULL,
    waiting_issue       BOOLEAN NOT NULL DEFAULT FALSE,
    waiting_reason_id   INTEGER REFERENCES problem_categories(id),
    technical_problem   BOOLEAN NOT NULL DEFAULT FALSE,
    problem_type_id     INTEGER REFERENCES problem_categories(id),
    remarks             TEXT,
    created_by          BIGINT REFERENCES users(id),
    device_time         TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (end_at > start_at),
    CHECK (NOT waiting_issue    OR waiting_reason_id IS NOT NULL),
    CHECK (NOT technical_problem OR problem_type_id  IS NOT NULL)
);

CREATE TABLE session_dishes (
    session_id  BIGINT  NOT NULL REFERENCES cooking_sessions(id) ON DELETE CASCADE,
    dish_id     INTEGER NOT NULL REFERENCES dishes(id),
    PRIMARY KEY (session_id, dish_id)
);

CREATE TABLE daily_technical_logs (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid         UUID NOT NULL UNIQUE,
    kitchen_id          BIGINT NOT NULL REFERENCES kitchens(id),
    log_date            DATE NOT NULL,
    solar_kwh           NUMERIC(7,2) NOT NULL CHECK (solar_kwh >= 0),
    morning_soc         SMALLINT NOT NULL CHECK (morning_soc BETWEEN 0 AND 100),
    evening_soc         SMALLINT NOT NULL CHECK (evening_soc BETWEEN 0 AND 100),
    system_operational  BOOLEAN NOT NULL,
    fault_count         SMALLINT NOT NULL DEFAULT 0 CHECK (fault_count >= 0),
    downtime_hours      NUMERIC(4,1) NOT NULL DEFAULT 0 CHECK (downtime_hours BETWEEN 0 AND 24),
    safety_incident     BOOLEAN NOT NULL DEFAULT FALSE,
    safety_severity     VARCHAR(10) CHECK (safety_severity IN ('Minor','Major','Critical')),
    safety_note         TEXT,
    weather             VARCHAR(20) NOT NULL REFERENCES weather_factors(weather),
    energy_consumed_kwh NUMERIC(7,2) CHECK (energy_consumed_kwh >= 0),
    remarks             TEXT,
    created_by          BIGINT REFERENCES users(id),
    device_time         TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (kitchen_id, log_date),
    CHECK (NOT safety_incident OR safety_severity IS NOT NULL)
);

CREATE TABLE generator_logs (
    id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid          UUID NOT NULL UNIQUE,
    kitchen_id           BIGINT NOT NULL REFERENCES kitchens(id),
    log_date             DATE NOT NULL,
    fuel_start_l         NUMERIC(6,1) NOT NULL CHECK (fuel_start_l >= 0),
    refuel_l             NUMERIC(6,1) NOT NULL DEFAULT 0 CHECK (refuel_l >= 0),
    fuel_end_l           NUMERIC(6,1) NOT NULL CHECK (fuel_end_l >= 0),
    fuel_used_l          NUMERIC(6,1) GENERATED ALWAYS AS (fuel_start_l + refuel_l - fuel_end_l) STORED,
    running_hours        NUMERIC(4,1) NOT NULL CHECK (running_hours BETWEEN 0 AND 24),
    maintenance_required BOOLEAN NOT NULL DEFAULT FALSE,
    maintenance_type     VARCHAR(60),
    remarks              TEXT,
    created_by           BIGINT REFERENCES users(id),
    device_time          TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (kitchen_id, log_date),
    CHECK (fuel_end_l <= fuel_start_l + refuel_l)
);

CREATE TABLE monthly_feedback (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid           UUID NOT NULL UNIQUE,
    household_id          BIGINT NOT NULL REFERENCES households(id),
    survey_month          DATE NOT NULL CHECK (survey_month = date_trunc('month', survey_month)::date),
    backup_fuel_used      BOOLEAN NOT NULL,
    backup_fuel_spend     NUMERIC(10,2) CHECK (backup_fuel_spend >= 0),
    fuel_reduction_rating SMALLINT CHECK (fuel_reduction_rating BETWEEN 1 AND 5),
    safety_rating         SMALLINT NOT NULL CHECK (safety_rating       BETWEEN 1 AND 5),
    privacy_rating        SMALLINT NOT NULL CHECK (privacy_rating      BETWEEN 1 AND 5),
    waiting_rating        SMALLINT NOT NULL CHECK (waiting_rating      BETWEEN 1 AND 5),
    overall_rating        SMALLINT NOT NULL CHECK (overall_rating      BETWEEN 1 AND 5),
    cleanliness_rating    SMALLINT NOT NULL CHECK (cleanliness_rating  BETWEEN 1 AND 5),
    ease_rating           SMALLINT NOT NULL CHECK (ease_rating         BETWEEN 1 AND 5),
    slot_suitability      SMALLINT CHECK (slot_suitability BETWEEN 1 AND 5),
    time_enough           VARCHAR(12) CHECK (time_enough IN ('Too short','About right','Too long')),
    family_members_now    SMALLINT CHECK (family_members_now > 0),
    willing_to_continue   BOOLEAN NOT NULL,
    remarks               TEXT,
    created_by            BIGINT REFERENCES users(id),
    device_time           TIMESTAMPTZ,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (household_id, survey_month)
);

-- =====================================================================
-- 6. OFFLINE SYNC
-- =====================================================================
CREATE TABLE sync_conflicts (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid    UUID NOT NULL,
    table_name     VARCHAR(60) NOT NULL,
    payload        JSONB NOT NULL,
    reason         VARCHAR(200) NOT NULL,
    submitted_by   BIGINT REFERENCES users(id),
    status         VARCHAR(10) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open','Resolved','Rejected')),
    resolved_by    BIGINT REFERENCES users(id),
    resolved_at    TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 7. INDEXES
-- =====================================================================
CREATE INDEX idx_households_kitchen   ON households (kitchen_id);
CREATE INDEX idx_slots_kitchen_date   ON slots (kitchen_id, slot_date);
CREATE INDEX idx_slots_household      ON slots (household_id);
CREATE INDEX idx_sessions_household   ON cooking_sessions (household_id);
CREATE INDEX idx_sessions_start       ON cooking_sessions (start_at);
CREATE INDEX idx_sessions_appliance   ON cooking_sessions (appliance_id);
CREATE INDEX idx_daily_kitchen_date   ON daily_technical_logs (kitchen_id, log_date);
CREATE INDEX idx_generator_kitchen    ON generator_logs (kitchen_id, log_date);
CREATE INDEX idx_feedback_month       ON monthly_feedback (survey_month);
CREATE INDEX idx_audit_table_record   ON audit_logs (table_name, record_id);
CREATE INDEX idx_audit_created        ON audit_logs (created_at);
CREATE INDEX idx_conflicts_status     ON sync_conflicts (status);
CREATE INDEX idx_login_history_user   ON login_history (user_id, login_time);
CREATE INDEX idx_slots_kitchen_date2  ON slots (kitchen_id, slot_date, slot_no);

-- =====================================================================
-- 8. KPI VIEWS (calculated, never stored)
-- =====================================================================

-- Each cooking session with minutes per person and size band
CREATE VIEW v_session_details AS
SELECT s.id,
       sl.kitchen_id,
       s.household_id,
       h.household_code,
       (s.start_at AT TIME ZONE 'Asia/Dhaka')::date AS session_date,
       s.persons_cooked_for,
       s.duration_min,
       ROUND(s.duration_min::numeric / s.persons_cooked_for, 1) AS minutes_per_person,
       CASE WHEN s.persons_cooked_for <= 3 THEN '1-3'
            WHEN s.persons_cooked_for <= 5 THEN '4-5'
            WHEN s.persons_cooked_for <= 7 THEN '6-7'
            ELSE '8+' END AS size_band,
       s.power_source,
       a.name AS appliance,
       ROUND(a.power_kw * s.duration_min / 60.0 * c.cooking_duty_factor, 2) AS energy_kwh,
       s.cooking_completed, s.cleaning_completed, s.waiting_issue, s.technical_problem
FROM cooking_sessions s
JOIN slots sl        ON sl.id = s.slot_id
JOIN households h    ON h.id  = s.household_id
JOIN appliances a    ON a.id  = s.appliance_id
JOIN system_config c ON c.kitchen_id = sl.kitchen_id;

-- Daily solar: expected output, efficiency and wasted energy
CREATE VIEW v_daily_solar AS
SELECT d.kitchen_id,
       d.log_date,
       d.weather,
       d.solar_kwh,
       ROUND(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio, 2) AS expected_kwh,
       ROUND(d.solar_kwh / NULLIF(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio, 0), 3) AS efficiency,
       COALESCE(d.energy_consumed_kwh, 0) AS consumed_kwh,
       ROUND((d.evening_soc - d.morning_soc) / 100.0 * c.battery_capacity_kwh, 2) AS battery_change_kwh,
       ROUND(d.solar_kwh - COALESCE(d.energy_consumed_kwh, 0)
             - (d.evening_soc - d.morning_soc) / 100.0 * c.battery_capacity_kwh, 2) AS wasted_kwh,
       ROUND(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio
             / c.productive_sun_hours * d.downtime_hours, 2) AS downtime_loss_kwh
FROM daily_technical_logs d
JOIN system_config c   ON c.kitchen_id = d.kitchen_id
JOIN weather_factors w ON w.weather = d.weather;

-- Household activity
CREATE VIEW v_household_activity AS
SELECT h.id AS household_id,
       h.household_code,
       h.family_size,
       COUNT(DISTINCT s.id)  AS sessions_attended,
       COUNT(DISTINCT sl.id) AS slots_assigned
FROM households h
LEFT JOIN cooking_sessions s ON s.household_id = h.id
LEFT JOIN slots sl           ON sl.household_id = h.id
GROUP BY h.id, h.household_code, h.family_size;

-- Slot utilisation per day
CREATE VIEW v_slot_utilisation AS
SELECT sl.kitchen_id,
       sl.slot_date,
       COUNT(*) FILTER (WHERE sl.status = 'Scheduled')                       AS scheduled,
       COUNT(*) FILTER (WHERE sl.status IN ('Attended', 'Swapped'))          AS attended,
       COUNT(*) FILTER (WHERE sl.status = 'Missed')                          AS missed,
       COUNT(*) FILTER (WHERE sl.status = 'Cancelled')                       AS cancelled,
       ROUND(
         COUNT(*) FILTER (WHERE sl.status IN ('Attended','Swapped'))::numeric
         / NULLIF(COUNT(*), 0) * 100, 1
       ) AS utilisation_pct
FROM slots sl
GROUP BY sl.kitchen_id, sl.slot_date;

-- =====================================================================
-- 9. STARTER LOOKUP DATA
-- =====================================================================
INSERT INTO weather_factors (weather, factor) VALUES
  ('Sunny',1.00),('Partly cloudy',0.65),('Cloudy',0.35),('Rainy',0.20),('Stormy',0.10);

INSERT INTO appliances (name, power_kw) VALUES
  ('Induction cooktop',2.00),('Electric pressure cooker',1.00),('Rice cooker',0.70);

INSERT INTO dishes (name) VALUES
  ('Rice'),('Dal'),('Vegetables'),('Fish'),('Meat'),('Curry'),('Khichuri'),('Other');

INSERT INTO problem_categories (kind, name) VALUES
  ('Waiting','No free slot'),('Waiting','Appliance busy'),('Waiting','Late start'),
  ('Technical','Power cut'),('Technical','Appliance fault'),('Technical','Low battery'),('Technical','Other');
