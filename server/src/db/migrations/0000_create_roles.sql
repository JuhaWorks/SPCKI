-- DB Roles setup
-- Run as PostgreSQL superuser ONCE before app deployment.
-- spcki_owner  : runs migrations (DDL rights)
-- spcki_app    : application runtime (DML only, no DDL)
-- spcki_readonly: reporting/exports

-- Create roles (ignore error if they already exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'spcki_owner') THEN
    CREATE ROLE spcki_owner WITH LOGIN PASSWORD 'CHANGE_ME_OWNER';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'spcki_app') THEN
    CREATE ROLE spcki_app WITH LOGIN PASSWORD 'CHANGE_ME_APP';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'spcki_readonly') THEN
    CREATE ROLE spcki_readonly WITH LOGIN PASSWORD 'CHANGE_ME_READONLY';
  END IF;
END
$$;

-- spcki_owner: full DDL rights (schema owner)
GRANT ALL PRIVILEGES ON DATABASE spcki TO spcki_owner;
GRANT ALL PRIVILEGES ON SCHEMA public TO spcki_owner;

-- spcki_app: DML only on all current and future tables
GRANT CONNECT ON DATABASE spcki TO spcki_app;
GRANT USAGE ON SCHEMA public TO spcki_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO spcki_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO spcki_app;

-- Restrict audit_logs: app can only INSERT and SELECT (never UPDATE or DELETE)
REVOKE UPDATE, DELETE ON audit_logs FROM spcki_app;

-- Future tables automatically grant to spcki_app
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO spcki_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO spcki_app;

-- spcki_readonly: SELECT only (for reporting tools)
GRANT CONNECT ON DATABASE spcki TO spcki_readonly;
GRANT USAGE ON SCHEMA public TO spcki_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO spcki_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO spcki_readonly;
