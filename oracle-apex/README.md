# Oracle Database 19c & APEX 24.2 MCP Server & CLI

This package provides a Model Context Protocol (MCP) server and interactive CLI for your Oracle Database and APEX instance.

---

## 📌 Connection Summary

| Parameter | Value |
| :--- | :--- |
| **Host / IP** | `202.84.45.58` |
| **DB Port** | `1521` |
| **Service Name** | `bexibank` |
| **Database User** | `solar_cook` |
| **Database Password** | `solar_cook` |
| **APEX URL** | `http://202.84.45.58:8999/bkb` |
| **APEX Workspace** | `SOLAR_COOK` |
| **APEX App** | Connect to Workspace `SOLAR_COOK` at `http://202.84.45.58:8999/bkb` |
| **Deployed Schema** | 20 Tables, 4 KPI Views, 2 PL/SQL Packages, 2 Triggers, 14 Days Demo Data |
| **Client Mode** | Thick Mode via `E:\app\client\asus\product\19.0.0\client_1\bin` (resolves 10G verifier `0x939`) |

---

## 🗄️ Deployed Database Schema & Objects

The complete SPCKI PostgreSQL schema and business logic was converted to Oracle 19c and pushed to `SOLAR_COOK`:

### 1. Tables (20)
- **Core**: `KITCHENS`, `SYSTEM_CONFIG`, `SLOT_TEMPLATES`, `HOUSEHOLDS`, `SLOTS`
- **Data Collection**: `COOKING_SESSIONS`, `SESSION_DISHES`, `DAILY_TECHNICAL_LOGS`, `GENERATOR_LOGS`, `MONTHLY_FEEDBACK`
- **Lookups**: `WEATHER_FACTORS`, `APPLIANCES`, `DISHES`, `PROBLEM_CATEGORIES`
- **Security & Sync**: `USERS`, `REFRESH_TOKENS`, `LOGIN_HISTORY`, `AUDIT_LOGS`, `SYNC_CONFLICTS`
- **Reference**: `SPCKI`

### 2. Monitoring & KPI Views (4)
- `V_SESSION_DETAILS`: Session duration, energy kWh, size bands, minutes per person.
- `V_DAILY_SOLAR`: Solar production, expected kWh, efficiency ratio, battery change, wasted energy.
- `V_HOUSEHOLD_ACTIVITY`: Attended vs assigned sessions per household.
- `V_SLOT_UTILISATION`: Daily utilization rate (%), attended, missed, and cancelled slots.

### 3. Business Logic PL/SQL Packages
- `SPCKI_KPI_PKG`:
  - `get_dashboard_json(p_kitchen_id)`: Outputs real-time JSON metrics for APEX cards/charts.
  - `get_active_households()`, `get_total_sessions()`, `get_total_cooking_hours()`
  - `get_utilisation_rate()`, `get_solar_fraction()`, `get_satisfaction_rate()`
- `SPCKI_OPS_PKG`:
  - `generate_schedule(p_kitchen_id, p_start_date, p_days)`: Automates rotating slots among households.

### 4. 14 Days Seeded Demo Data
- **84 Slots & 84 Cooking Sessions** (with 168 session dish links)
- **14 Days of Daily Technical Logs & Generator Logs**
- **16 Household Feedback Surveys** (HH-01 through HH-16)

---

## 🚀 Registered MCP Server

The MCP server has been registered in:
1. **Global Antigravity Config**: `~/.gemini/config/mcp_config.json`
2. **Workspace Config**: `.agents/mcp_config.json`

### Available MCP Tools for Antigravity:

| Tool Name | Description |
| :--- | :--- |
| `oracle_query` | Run SELECT queries with bind parameters and fetch structured JSON rows. |
| `oracle_execute` | Execute DML (`INSERT`, `UPDATE`, `DELETE`) or DDL (`CREATE`, `ALTER`, `DROP`) with auto-commit. |
| `oracle_run_plsql` | Execute PL/SQL anonymous blocks and capture `DBMS_OUTPUT` buffer lines. |
| `oracle_list_tables` | List all tables and views in `solar_cook` or specified schema. |
| `oracle_describe_table` | Get complete schema (columns, types, primary keys, foreign keys, indexes). |
| `oracle_list_objects` | List database objects (tables, views, procedures, packages, sequences). |
| `oracle_get_ddl` | Retrieve exact DDL (`CREATE TABLE ...`) via `DBMS_METADATA.GET_DDL` or `ALL_SOURCE`. |
| `oracle_apex_list_apps` | List APEX applications in workspace `SOLAR_COOK`. |
| `oracle_apex_list_pages` | List pages in an APEX application (e.g. app `100`). |
| `oracle_apex_get_page_components` | Inspect regions, page items, buttons, and processes for any page. |
| `oracle_connection_status` | Health check, Oracle version, session ID, and APEX release. |

---

## 💻 Standalone Interactive CLI & REPL

You can also query the database or inspect APEX directly from your terminal anytime:

```bash
cd c:\Users\asus\Downloads\SPCKI\oracle-apex

# Check connection status
node oracle-cli.cjs status

# List tables
node oracle-cli.cjs tables

# Describe table SPCKI
node oracle-cli.cjs desc SPCKI

# List APEX apps
node oracle-cli.cjs apps

# List pages for App 100 (Spcki)
node oracle-cli.cjs pages 100

# Execute any SQL query
node oracle-cli.cjs sql "SELECT * FROM spcki WHERE ROWNUM <= 5"

# Launch Interactive SQL REPL
node oracle-cli.cjs repl
```

Inside the interactive REPL:
```sql
SQL> .tables
SQL> .desc SPCKI
SQL> .apps
SQL> .pages 100
SQL> SELECT count(*) FROM spcki;
SQL> exit
```
