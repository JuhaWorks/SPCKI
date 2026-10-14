-- =============================================================================
-- SPCKI (Solar Powered Community Kitchen Initiative)
-- Oracle 19c & APEX 24.2 Master Database Schema & Business Logic Script
-- Workspace: SOLAR_COOK | Schema: SOLAR_COOK
-- Host: 202.84.45.58:1521/bexibank | APEX: http://202.84.45.58:8999/bkb
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. KITCHENS & SYSTEM CONFIG
-- -----------------------------------------------------------------------------
CREATE TABLE kitchens (
    id                NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name              VARCHAR2(100) NOT NULL UNIQUE,
    location          VARCHAR2(200),
    max_households    NUMBER(4) DEFAULT 16 NOT NULL CHECK (max_households > 0),
    slots_per_day     NUMBER(3) DEFAULT 6 NOT NULL CHECK (slots_per_day > 0),
    scheduled_hours   NUMBER(4,1) DEFAULT 13 NOT NULL CHECK (scheduled_hours > 0 AND scheduled_hours <= 24),
    status            VARCHAR2(10) DEFAULT 'Active' NOT NULL CHECK (status IN ('Active','Inactive')),
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE system_config (
    kitchen_id            NUMBER(19) PRIMARY KEY REFERENCES kitchens(id) ON DELETE CASCADE,
    pv_capacity_kwp       NUMBER(8,2) NOT NULL CHECK (pv_capacity_kwp > 0),
    battery_capacity_kwh  NUMBER(8,2) NOT NULL CHECK (battery_capacity_kwh > 0),
    performance_ratio     NUMBER(4,2) DEFAULT 0.75 NOT NULL CHECK (performance_ratio BETWEEN 0.30 AND 1.00),
    peak_sun_hours        NUMBER(4,2) DEFAULT 4.5 NOT NULL CHECK (peak_sun_hours > 0),
    cooking_duty_factor   NUMBER(3,2) DEFAULT 0.60 NOT NULL CHECK (cooking_duty_factor BETWEEN 0 AND 1),
    productive_sun_hours  NUMBER(4,1) DEFAULT 10 NOT NULL CHECK (productive_sun_hours > 0),
    updated_at            TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE slot_templates (
    id            NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id    NUMBER(19) NOT NULL REFERENCES kitchens(id) ON DELETE CASCADE,
    slot_no       NUMBER(3) NOT NULL CHECK (slot_no > 0),
    start_time    VARCHAR2(5) NOT NULL,
    end_time      VARCHAR2(5) NOT NULL,
    power_source  VARCHAR2(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
    CONSTRAINT chk_slot_tmpl_time CHECK (end_time > start_time),
    CONSTRAINT unq_slot_tmpl UNIQUE (kitchen_id, slot_no)
);

-- -----------------------------------------------------------------------------
-- 2. LOOKUPS
-- -----------------------------------------------------------------------------
CREATE TABLE weather_factors (
    weather  VARCHAR2(20) PRIMARY KEY,
    factor   NUMBER(3,2) NOT NULL CHECK (factor BETWEEN 0 AND 1)
);

CREATE TABLE appliances (
    id        NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name      VARCHAR2(60) NOT NULL UNIQUE,
    power_kw  NUMBER(5,2) NOT NULL CHECK (power_kw > 0),
    active    CHAR(1) DEFAULT 'Y' NOT NULL CHECK (active IN ('Y','N'))
);

CREATE TABLE dishes (
    id      NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    VARCHAR2(40) NOT NULL UNIQUE,
    active  CHAR(1) DEFAULT 'Y' NOT NULL CHECK (active IN ('Y','N'))
);

CREATE TABLE problem_categories (
    id      NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kind    VARCHAR2(10) NOT NULL CHECK (kind IN ('Waiting','Technical')),
    name    VARCHAR2(60) NOT NULL,
    active  CHAR(1) DEFAULT 'Y' NOT NULL CHECK (active IN ('Y','N')),
    CONSTRAINT unq_problem_cat UNIQUE (kind, name)
);

-- -----------------------------------------------------------------------------
-- 3. USERS & SECURITY
-- -----------------------------------------------------------------------------
CREATE TABLE users (
    id                      NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id              NUMBER(19) REFERENCES kitchens(id),
    username                VARCHAR2(50) NOT NULL UNIQUE,
    full_name               VARCHAR2(100) NOT NULL,
    email                   VARCHAR2(150) UNIQUE,
    password_hash           VARCHAR2(255) NOT NULL,
    role                    VARCHAR2(12) NOT NULL CHECK (role IN ('Admin','Project','Field','Technical','Viewer')),
    status                  VARCHAR2(10) DEFAULT 'Active' NOT NULL CHECK (status IN ('Active','Inactive')),
    must_change_password    CHAR(1) DEFAULT 'Y' NOT NULL CHECK (must_change_password IN ('Y','N')),
    failed_login_attempts   NUMBER(3) DEFAULT 0 NOT NULL,
    locked_until            TIMESTAMP WITH TIME ZONE,
    last_login_at           TIMESTAMP WITH TIME ZONE,
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE refresh_tokens (
    id              NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         NUMBER(19) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR2(255) NOT NULL UNIQUE,
    family          VARCHAR2(36) NOT NULL,
    expires_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at      TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE login_history (
    id          NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     NUMBER(19) REFERENCES users(id),
    username    VARCHAR2(50) NOT NULL,
    login_time  TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    success     CHAR(1) NOT NULL CHECK (success IN ('Y','N')),
    ip_address  VARCHAR2(45),
    device      VARCHAR2(200)
);

CREATE TABLE audit_logs (
    id          NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     NUMBER(19) REFERENCES users(id),
    action      VARCHAR2(10) NOT NULL CHECK (action IN ('CREATE','UPDATE','DELETE','EXPORT','LOGIN')),
    table_name  VARCHAR2(60) NOT NULL,
    record_id   VARCHAR2(60),
    old_values  CLOB CHECK (old_values IS JSON),
    new_values  CLOB CHECK (new_values IS JSON),
    reason      VARCHAR2(4000),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

-- -----------------------------------------------------------------------------
-- 4. HOUSEHOLDS & SLOTS
-- -----------------------------------------------------------------------------
CREATE TABLE households (
    id                         NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id                 NUMBER(19) NOT NULL REFERENCES kitchens(id),
    household_code             VARCHAR2(20) NOT NULL UNIQUE,
    family_size                NUMBER(3) NOT NULL CHECK (family_size > 0),
    children_count             NUMBER(3) DEFAULT 0 NOT NULL CHECK (children_count >= 0),
    adults_count               NUMBER(3) DEFAULT 0 NOT NULL CHECK (adults_count >= 0),
    baseline_fuel_type         VARCHAR2(30),
    baseline_monthly_fuel_cost NUMBER(10,2) CHECK (baseline_monthly_fuel_cost >= 0),
    status                     VARCHAR2(10) DEFAULT 'Active' NOT NULL CHECK (status IN ('Active','Inactive')),
    joined_date                DATE DEFAULT TRUNC(SYSDATE) NOT NULL,
    created_at                 TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT chk_hh_family CHECK (children_count + adults_count = family_size)
);

CREATE TABLE slots (
    id            NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kitchen_id    NUMBER(19) NOT NULL REFERENCES kitchens(id),
    slot_date     DATE NOT NULL,
    slot_no       NUMBER(3) NOT NULL CHECK (slot_no > 0),
    start_time    VARCHAR2(5) NOT NULL,
    end_time      VARCHAR2(5) NOT NULL,
    power_source  VARCHAR2(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
    household_id  NUMBER(19) REFERENCES households(id),
    status        VARCHAR2(10) DEFAULT 'Scheduled' NOT NULL
                  CHECK (status IN ('Scheduled','Attended','Missed','Cancelled','Swapped')),
    note          VARCHAR2(200),
    created_by    NUMBER(19) REFERENCES users(id),
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT unq_slots_k_d_n UNIQUE (kitchen_id, slot_date, slot_no),
    CONSTRAINT chk_slot_time CHECK (end_time > start_time)
);

-- -----------------------------------------------------------------------------
-- 5. DATA COLLECTION FORMS
-- -----------------------------------------------------------------------------
CREATE TABLE cooking_sessions (
    id                  NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid         VARCHAR2(36) NOT NULL UNIQUE,
    slot_id             NUMBER(19) NOT NULL UNIQUE REFERENCES slots(id),
    household_id        NUMBER(19) NOT NULL REFERENCES households(id),
    persons_cooked_for  NUMBER(3) NOT NULL CHECK (persons_cooked_for > 0),
    start_at            TIMESTAMP WITH TIME ZONE NOT NULL,
    end_at              TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_min        NUMBER(6),
    appliance_id        NUMBER(10) NOT NULL REFERENCES appliances(id),
    power_source        VARCHAR2(10) NOT NULL CHECK (power_source IN ('Solar','Battery','Generator')),
    cooking_completed   CHAR(1) NOT NULL CHECK (cooking_completed IN ('Y','N')),
    cleaning_completed  CHAR(1) NOT NULL CHECK (cleaning_completed IN ('Y','N')),
    waiting_issue       CHAR(1) DEFAULT 'N' NOT NULL CHECK (waiting_issue IN ('Y','N')),
    waiting_reason_id   NUMBER(10) REFERENCES problem_categories(id),
    technical_problem   CHAR(1) DEFAULT 'N' NOT NULL CHECK (technical_problem IN ('Y','N')),
    problem_type_id     NUMBER(10) REFERENCES problem_categories(id),
    remarks             VARCHAR2(4000),
    created_by          NUMBER(19) REFERENCES users(id),
    device_time         TIMESTAMP WITH TIME ZONE,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT chk_session_times CHECK (end_at > start_at),
    CONSTRAINT chk_session_waiting CHECK (waiting_issue = 'N' OR waiting_reason_id IS NOT NULL),
    CONSTRAINT chk_session_tech CHECK (technical_problem = 'N' OR problem_type_id IS NOT NULL)
);

CREATE OR REPLACE TRIGGER trg_cooking_sessions_dur
BEFORE INSERT OR UPDATE ON cooking_sessions
FOR EACH ROW
BEGIN
    :NEW.duration_min := ROUND((CAST(:NEW.end_at AS DATE) - CAST(:NEW.start_at AS DATE)) * 1440);
END;
/

CREATE TABLE session_dishes (
    session_id  NUMBER(19) NOT NULL REFERENCES cooking_sessions(id) ON DELETE CASCADE,
    dish_id     NUMBER(10) NOT NULL REFERENCES dishes(id),
    PRIMARY KEY (session_id, dish_id)
);

CREATE TABLE daily_technical_logs (
    id                  NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid         VARCHAR2(36) NOT NULL UNIQUE,
    kitchen_id          NUMBER(19) NOT NULL REFERENCES kitchens(id),
    log_date            DATE NOT NULL,
    solar_kwh           NUMBER(7,2) NOT NULL CHECK (solar_kwh >= 0),
    morning_soc         NUMBER(3) NOT NULL CHECK (morning_soc BETWEEN 0 AND 100),
    evening_soc         NUMBER(3) NOT NULL CHECK (evening_soc BETWEEN 0 AND 100),
    system_operational  CHAR(1) NOT NULL CHECK (system_operational IN ('Y','N')),
    fault_count         NUMBER(3) DEFAULT 0 NOT NULL CHECK (fault_count >= 0),
    downtime_hours      NUMBER(4,1) DEFAULT 0 NOT NULL CHECK (downtime_hours BETWEEN 0 AND 24),
    safety_incident     CHAR(1) DEFAULT 'N' NOT NULL CHECK (safety_incident IN ('Y','N')),
    safety_severity     VARCHAR2(10) CHECK (safety_severity IN ('Minor','Major','Critical')),
    safety_note         VARCHAR2(4000),
    weather             VARCHAR2(20) NOT NULL REFERENCES weather_factors(weather),
    energy_consumed_kwh NUMBER(7,2) CHECK (energy_consumed_kwh >= 0),
    remarks             VARCHAR2(4000),
    created_by          NUMBER(19) REFERENCES users(id),
    device_time         TIMESTAMP WITH TIME ZONE,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT unq_daily_kitchen_date UNIQUE (kitchen_id, log_date),
    CONSTRAINT chk_daily_safety CHECK (safety_incident = 'N' OR safety_severity IS NOT NULL)
);

CREATE TABLE generator_logs (
    id                   NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid          VARCHAR2(36) NOT NULL UNIQUE,
    kitchen_id           NUMBER(19) NOT NULL REFERENCES kitchens(id),
    log_date             DATE NOT NULL,
    fuel_start_l         NUMBER(6,1) NOT NULL CHECK (fuel_start_l >= 0),
    refuel_l             NUMBER(6,1) DEFAULT 0 NOT NULL CHECK (refuel_l >= 0),
    fuel_end_l           NUMBER(6,1) NOT NULL CHECK (fuel_end_l >= 0),
    fuel_used_l          NUMBER(6,1),
    running_hours        NUMBER(4,1) NOT NULL CHECK (running_hours BETWEEN 0 AND 24),
    maintenance_required CHAR(1) DEFAULT 'N' NOT NULL CHECK (maintenance_required IN ('Y','N')),
    maintenance_type     VARCHAR2(60),
    remarks              VARCHAR2(4000),
    created_by           NUMBER(19) REFERENCES users(id),
    device_time          TIMESTAMP WITH TIME ZONE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT unq_gen_kitchen_date UNIQUE (kitchen_id, log_date),
    CONSTRAINT chk_gen_fuel_used CHECK (fuel_end_l <= fuel_start_l + refuel_l)
);

CREATE OR REPLACE TRIGGER trg_generator_logs_fuel
BEFORE INSERT OR UPDATE ON generator_logs
FOR EACH ROW
BEGIN
    :NEW.fuel_used_l := :NEW.fuel_start_l + NVL(:NEW.refuel_l, 0) - :NEW.fuel_end_l;
END;
/

CREATE TABLE monthly_feedback (
    id                    NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid           VARCHAR2(36) NOT NULL UNIQUE,
    household_id          NUMBER(19) NOT NULL REFERENCES households(id),
    survey_month          DATE NOT NULL,
    backup_fuel_used      CHAR(1) NOT NULL CHECK (backup_fuel_used IN ('Y','N')),
    backup_fuel_spend     NUMBER(10,2) CHECK (backup_fuel_spend >= 0),
    fuel_reduction_rating NUMBER(1) CHECK (fuel_reduction_rating BETWEEN 1 AND 5),
    safety_rating         NUMBER(1) NOT NULL CHECK (safety_rating BETWEEN 1 AND 5),
    privacy_rating        NUMBER(1) NOT NULL CHECK (privacy_rating BETWEEN 1 AND 5),
    waiting_rating        NUMBER(1) NOT NULL CHECK (waiting_rating BETWEEN 1 AND 5),
    overall_rating        NUMBER(1) NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    cleanliness_rating    NUMBER(1) NOT NULL CHECK (cleanliness_rating BETWEEN 1 AND 5),
    ease_rating           NUMBER(1) NOT NULL CHECK (ease_rating BETWEEN 1 AND 5),
    slot_suitability      NUMBER(1) CHECK (slot_suitability BETWEEN 1 AND 5),
    time_enough           VARCHAR2(12) CHECK (time_enough IN ('Too short','About right','Too long')),
    family_members_now    NUMBER(3) CHECK (family_members_now > 0),
    willing_to_continue   CHAR(1) NOT NULL CHECK (willing_to_continue IN ('Y','N')),
    remarks               VARCHAR2(4000),
    created_by            NUMBER(19) REFERENCES users(id),
    device_time           TIMESTAMP WITH TIME ZONE,
    created_at            TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT unq_feedback_hh_month UNIQUE (household_id, survey_month)
);

CREATE TABLE sync_conflicts (
    id             NUMBER(19) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_uuid    VARCHAR2(36) NOT NULL,
    table_name     VARCHAR2(60) NOT NULL,
    payload        CLOB NOT NULL CHECK (payload IS JSON),
    reason         VARCHAR2(200) NOT NULL,
    submitted_by   NUMBER(19) REFERENCES users(id),
    status         VARCHAR2(10) DEFAULT 'Open' NOT NULL CHECK (status IN ('Open','Resolved','Rejected')),
    resolved_by    NUMBER(19) REFERENCES users(id),
    resolved_at    TIMESTAMP WITH TIME ZONE,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

-- -----------------------------------------------------------------------------
-- 6. KPI MONITORING VIEWS (FOR APEX DASHBOARDS & REPORTS)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_session_details AS
SELECT s.id,
       sl.kitchen_id,
       s.household_id,
       h.household_code,
       TRUNC(CAST(s.start_at AS DATE)) AS session_date,
       s.persons_cooked_for,
       s.duration_min,
       ROUND(s.duration_min / NULLIF(s.persons_cooked_for, 0), 1) AS minutes_per_person,
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

CREATE OR REPLACE VIEW v_daily_solar AS
SELECT d.kitchen_id,
       d.log_date,
       d.weather,
       d.solar_kwh,
       ROUND(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio, 2) AS expected_kwh,
       ROUND(d.solar_kwh / NULLIF(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio, 0), 3) AS efficiency,
       NVL(d.energy_consumed_kwh, 0) AS consumed_kwh,
       ROUND((d.evening_soc - d.morning_soc) / 100.0 * c.battery_capacity_kwh, 2) AS battery_change_kwh,
       ROUND(d.solar_kwh - NVL(d.energy_consumed_kwh, 0)
             - (d.evening_soc - d.morning_soc) / 100.0 * c.battery_capacity_kwh, 2) AS wasted_kwh,
       ROUND(c.pv_capacity_kwp * c.peak_sun_hours * w.factor * c.performance_ratio
             / c.productive_sun_hours * d.downtime_hours, 2) AS downtime_loss_kwh
FROM daily_technical_logs d
JOIN system_config c   ON c.kitchen_id = d.kitchen_id
JOIN weather_factors w ON w.weather = d.weather;

CREATE OR REPLACE VIEW v_household_activity AS
SELECT h.id AS household_id,
       h.household_code,
       h.family_size,
       COUNT(DISTINCT s.id)  AS sessions_attended,
       COUNT(DISTINCT sl.id) AS slots_assigned
FROM households h
LEFT JOIN cooking_sessions s ON s.household_id = h.id
LEFT JOIN slots sl           ON sl.household_id = h.id
GROUP BY h.id, h.household_code, h.family_size;

CREATE OR REPLACE VIEW v_slot_utilisation AS
SELECT sl.kitchen_id,
       sl.slot_date,
       COUNT(CASE WHEN sl.status = 'Scheduled' THEN 1 END) AS scheduled,
       COUNT(CASE WHEN sl.status IN ('Attended', 'Swapped') THEN 1 END) AS attended,
       COUNT(CASE WHEN sl.status = 'Missed' THEN 1 END) AS missed,
       COUNT(CASE WHEN sl.status = 'Cancelled' THEN 1 END) AS cancelled,
       ROUND(
         COUNT(CASE WHEN sl.status IN ('Attended','Swapped') THEN 1 END)
         / NULLIF(COUNT(*), 0) * 100, 1
       ) AS utilisation_pct
FROM slots sl
GROUP BY sl.kitchen_id, sl.slot_date;

-- -----------------------------------------------------------------------------
-- 7. APEX PL/SQL PACKAGES
-- -----------------------------------------------------------------------------
CREATE OR REPLACE PACKAGE spcki_kpi_pkg AS
    FUNCTION get_dashboard_json(p_kitchen_id IN NUMBER DEFAULT 1) RETURN CLOB;
    FUNCTION get_active_households(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
    FUNCTION get_total_sessions(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
    FUNCTION get_total_cooking_hours(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
    FUNCTION get_utilisation_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
    FUNCTION get_solar_fraction(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
    FUNCTION get_satisfaction_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER;
END spcki_kpi_pkg;
/

CREATE OR REPLACE PACKAGE BODY spcki_kpi_pkg AS
    FUNCTION get_active_households(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count FROM households WHERE kitchen_id = p_kitchen_id AND status = 'Active';
        RETURN v_count;
    END;

    FUNCTION get_total_sessions(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count FROM v_session_details WHERE kitchen_id = p_kitchen_id;
        RETURN v_count;
    END;

    FUNCTION get_total_cooking_hours(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
        v_hours NUMBER;
    BEGIN
        SELECT NVL(ROUND(SUM(duration_min) / 60.0, 1), 0) INTO v_hours FROM v_session_details WHERE kitchen_id = p_kitchen_id;
        RETURN v_hours;
    END;

    FUNCTION get_utilisation_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
        v_rate NUMBER;
    BEGIN
        SELECT NVL(ROUND(COUNT(CASE WHEN status IN ('Attended','Swapped') THEN 1 END) / NULLIF(COUNT(*), 0) * 100, 1), 0)
        INTO v_rate
        FROM slots
        WHERE kitchen_id = p_kitchen_id;
        RETURN v_rate;
    END;

    FUNCTION get_solar_fraction(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
        v_frac NUMBER;
    BEGIN
        SELECT NVL(ROUND(COUNT(CASE WHEN power_source = 'Solar' THEN 1 END) / NULLIF(COUNT(*), 0) * 100, 1), 0)
        INTO v_frac
        FROM v_session_details
        WHERE kitchen_id = p_kitchen_id;
        RETURN v_frac;
    END;

    FUNCTION get_satisfaction_rate(p_kitchen_id IN NUMBER DEFAULT 1) RETURN NUMBER IS
        v_sat NUMBER;
    BEGIN
        SELECT NVL(ROUND(AVG(overall_rating), 1), 0)
        INTO v_sat
        FROM monthly_feedback mf
        JOIN households h ON h.id = mf.household_id
        WHERE h.kitchen_id = p_kitchen_id;
        RETURN v_sat;
    END;

    FUNCTION get_dashboard_json(p_kitchen_id IN NUMBER DEFAULT 1) RETURN CLOB IS
        v_json CLOB;
    BEGIN
        SELECT JSON_OBJECT(
            'kitchen_id'          VALUE p_kitchen_id,
            'active_households'   VALUE get_active_households(p_kitchen_id),
            'total_sessions'      VALUE get_total_sessions(p_kitchen_id),
            'total_cooking_hours' VALUE get_total_cooking_hours(p_kitchen_id),
            'utilisation_rate'    VALUE get_utilisation_rate(p_kitchen_id),
            'solar_fraction'      VALUE get_solar_fraction(p_kitchen_id),
            'avg_satisfaction'    VALUE get_satisfaction_rate(p_kitchen_id)
        ) INTO v_json FROM dual;

        RETURN v_json;
    END;
END spcki_kpi_pkg;
/
