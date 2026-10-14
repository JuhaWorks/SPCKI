Solar Powered Community Kitchen Initiative (SPCKI)

# Digital Data Collection Application and Impact Monitoring Dashboard

System Report: Requirements, Design and Technology | October 2026

**Note on highlighting.** Text that is highlighted marks a feature added beyond the Terms of Reference (ToR) and the Technical Document (TD); a short explanation follows it in parentheses. Everything else comes from those two documents, with their inconsistencies already resolved.

**Contents**

1. Introduction
2. System Overview
3. Users and Roles
4. Operating Model
5. Data Collection Modules
6. KPIs and Analysis
7. Dashboard and Reports
8. Architecture and Technology Stack
9. Database Design
10. Offline Operation
11. Security and Data Quality
12. Implementation Plan

## 1. Introduction

SPCKI is a managed clean-cooking service in which solar panels, a hybrid inverter, a battery bank, a backup generator and electric appliances serve a shared community kitchen of 16 households (the household count is a kitchen setting, so other kitchens can differ). The pilot must produce evidence on how the kitchen is used, how reliably it operates, how households experience it, and whether it merits continuation or scale-up.

Field data is currently consolidated from paper and spreadsheets. The platform replaces this with a simple, mobile-responsive system that turns routine entries into indicators, charts and reports. It is intended to be a focused monitoring tool, not a complex management information system.

**Objectives:** simplify field data entry; improve consistency and completeness; reduce manual calculation; give timely visibility of operational and technical performance; monitor household participation and experience; support donor reporting; allow data export; build an evidence base for scale-up.

## 2. System Overview

The system has four integrated components: a mobile-responsive data collection application, a central backend and database, an impact monitoring dashboard, and a reporting and export system. Data moves through one pipeline: field entry, central database, automatic KPI calculation, dashboard, reports.

Figure 1. Data flow. Highlighted boxes are additions.

## 3. Users and Roles

| Role               | Enters data                | Edits                   | Manages users, households, slots | Dashboard            | Export  |
| ------------------ | -------------------------- | ----------------------- | -------------------------------- | -------------------- | ------- |
| Field / Data Entry | Cooking sessions, feedback | Own entries             | No                               | Limited              | No      |
| Technical          | Daily technical, generator | Own entries             | No                               | Technical view       | No      |
| Project / Admin    | All forms                  | All, with reason logged | Yes                              | Full                 | Yes     |
| Viewer (donor)     | No                         | No                      | No                               | Full, coded IDs only | Summary |

User management provides account creation, update and deactivation; role-based access control and permission management; secure login and password handling; activity and audit trail; login history; and user-wise and role-wise reports. Control is by kitchen (every user and record belongs to a kitchen, which supports additional locations later and replaces the TD's unclear "department/branch-wise" control).

## 4. Operating Model

Slot scheduling (neither source document describes how the 16 households take turns; since slots depend on available time and generator backup, the system manages a schedule so that fairness, cooking times and power conditions can be analysed). Each day has slots with a start time, end time and expected power source: Solar, Battery or Generator. The system suggests a fair rotation, weighted by family size and past slot share; the administrator adjusts or swaps. Slot status is scheduled, attended, missed, cancelled or swapped.

Figure 2. Slot allocation (added feature).

## 5. Data Collection Modules

Forms use predefined options, dropdowns, Yes/No toggles, household IDs and automatic date and time, to minimise typing.

### 5.1 Household Register (added; supplies family size and baseline data used throughout)

| Field                                    | Description                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Household code                           | Coded ID, so dashboards never show names                                                                          |
| Family size, children, adults            | Number of members (needed to compare cooking times fairly across families)                                        |
| Baseline fuel type and monthly fuel cost | What the household used and spent before the pilot (needed for the ToR's "baseline vs current backup fuel" chart) |
| Status, kitchen, registration date       | Active or inactive; assigned kitchen; date joined                                                                 |

### 5.2 Cooking Session

| Field                | Description                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date                 | Cooking date, captured automatically                                                                                                                           |
| Household ID         | One household per session, taken from the allocated slot                                                                                                       |
| Session              | Session number, linked to a slot                                                                                                                               |
| Persons cooked for   | Number of people the meal serves, defaulting to family size (gives minutes per person, explaining why a family of five may cook faster than a family of three) |
| Start time, End time | Cooking start and end                                                                                                                                          |
| Cooking duration     | Calculated automatically                                                                                                                                       |
| Food type            | Category (rice, dal, vegetables, fish, meat, curry, khichuri, other); several may be selected per session                                                      |
| Appliance            | Appliance used; each appliance has a stored power rating in kW                                                                                                 |
| Power source in use  | Solar, Battery or Generator (shows whether delays come from power conditions rather than family size)                                                          |
| Cooking completed    | Yes / No                                                                                                                                                       |
| Waiting issue        | Yes / No; reason category when Yes (no free slot, appliance busy, late start; this feeds "Common User Problems")                                               |
| Technical problem    | Yes / No; problem category when Yes (power cut, appliance fault, low battery, other)                                                                           |
| Cleaning completed   | Yes / No                                                                                                                                                       |
| Remarks              | Additional information                                                                                                                                         |

### 5.3 Daily Technical Data

| Field                         | Description                                                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Date                          | Monitoring date; one record per kitchen per day                                                                                               |
| Daily solar production        | kWh                                                                                                                                           |
| Morning / Evening battery SOC | State of charge, % (0 to 100)                                                                                                                 |
| System operational            | Yes / No                                                                                                                                      |
| Technical faults              | Number                                                                                                                                        |
| Total downtime                | Hours                                                                                                                                         |
| Safety incident               | Yes / No; severity and note when Yes (so the incident summary has content)                                                                    |
| Weather condition             | Sunny, Partly cloudy, Cloudy, Rainy, Stormy                                                                                                   |
| Energy consumed               | kWh used by the kitchen, from the inverter or meter, or estimated from appliance power and cooking time (required to calculate wasted energy) |
| Remarks                       | Technical notes                                                                                                                               |

### 5.4 Generator Maintenance

| Field                               | Description                                              |
| ----------------------------------- | -------------------------------------------------------- |
| Date, Running time                  | Operation date; hours run                                |
| Fuel at start                       | Litres in the tank at the start (the TD's "Fuel Feed")   |
| Re-fuel                             | Litres added                                             |
| Fuel at end                         | Litres remaining (fuel consumed = start + re-fuel − end) |
| Maintenance required, type, remarks | Yes / No; category; notes                                |

### 5.5 Monthly Household Feedback

A short survey per household; ratings use 1 (Very Poor) to 5 (Very Good).

| Indicator                                                                                       | Response                                                                                                                        |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Backup fuel use; backup fuel expenditure                                                        | Yes / No; amount                                                                                                                |
| Perceived reduction in backup fuel                                                              | 1 to 5 (required by the ToR, absent from the TD form)                                                                           |
| Safety, Privacy, Waiting experience, Overall satisfaction, Kitchen cleanliness, Ease of cooking | 1 to 5 each                                                                                                                     |
| Slot time suitability                                                                           | 1 to 5 (whether the allocated slot suited the household's routine)                                                              |
| Time enough for family size                                                                     | Too short / About right / Too long (captures the large-family versus small-family cooking time issue from the household's view) |
| Current family members                                                                          | Number (keeps the register accurate for size-based analysis)                                                                    |
| Willingness to continue; remarks                                                                | Yes / No; optional                                                                                                              |

## 6. KPIs and Analysis

### 6.1 Automatic KPIs

| KPI                     | Calculation                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Participation rate      | Active households ÷ Registered households × 100. A household is active if it has at least one attended session in the period. |
| Session completion rate | Completed sessions ÷ Total sessions × 100                                                                                     |
| Average cooking time    | Total cooking time of completed sessions ÷ Completed sessions                                                                 |
| Cleaning compliance     | Cleaned sessions ÷ Total sessions × 100                                                                                       |
| Waiting issue rate      | Sessions with waiting issue ÷ Total sessions × 100                                                                            |
| Technical fault rate    | Sessions with a fault ÷ Total sessions × 100 (daily fault count is reported separately)                                       |
| System uptime           | (Scheduled hours − Downtime) ÷ Scheduled hours × 100, with scheduled hours set per kitchen                                    |
| Average downtime        | Total downtime ÷ Operational days                                                                                             |
| Average satisfaction    | Total rating ÷ Number of responses                                                                                            |
| Minutes per person      | Cooking duration ÷ Persons cooked for (a fair basis for comparing families)                                                   |
| Slot utilisation        | Attended slots ÷ Scheduled slots × 100                                                                                        |
| Backup-fuel reduction   | (Baseline − Current expenditure) ÷ Baseline × 100 (the main evidence of household impact)                                     |
| Generator fuel consumed | Start + Re-fuel − End litres (the cost of backup)                                                                             |

### 6.2 Household size and cooking time

Raw cooking time is misleading. For example, a family with five children may take two hours to cook rice while a family of three takes longer. Reports therefore compare like with like:

| Analysis                  | Description                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Size bands                | 1-3, 4-5, 6-7 and 8+ persons                                                                                                                                                         |
| Duration by dish and band | Average time for each dish within each band, and minutes per person                                                                                                                  |
| Outlier flag              | Sessions longer than 1.5 × the median for the same dish and band, listed with power source, appliance and problem reason (separates family effects from power or equipment problems) |
| Feedback by band          | "Time enough for family size" answers split by band (shows which family sizes need longer slots)                                                                                     |

### 6.3 Solar output, efficiency and waste

| Measure                | Calculation and use                                                                                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expected output        | Installed capacity (kWp) × Peak sun hours × Weather factor × Performance ratio. Starting weather factors: Sunny 1.0, Partly cloudy 0.65, Cloudy 0.35, Rainy 0.20, Stormy 0.10; performance ratio 0.70 to 0.80. All values are editable settings, to be calibrated with recorded data. |
| Efficiency             | Actual ÷ Expected × 100 (low values indicate dirty panels, shading, faults or downtime)                                                                                                                                                                                               |
| Unused (wasted) energy | Generated − Consumed − (Change in SOC ÷ 100 × Battery capacity), including conversion losses                                                                                                                                                                                          |
| Downtime loss          | Expected hourly output × Downtime hours                                                                                                                                                                                                                                               |

## 7. Dashboard and Reports

| Section                     | Indicators                                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| A. Overview                 | Registered and active households, participation rate, total and completed sessions, completion rate                                       |
| B. Cooking performance      | Average cooking time, food type performance, appliance utilization, session-wise performance, incomplete sessions, waiting issues         |
| C. Operational performance  | Waiting issue rate, incomplete session rate, cleaning compliance, technical problems, common user problems, safety incidents              |
| D. Technical performance    | Daily and monthly solar production, morning vs evening SOC, uptime, faults, downtime, generator running hours, fuel consumption           |
| E. Household feedback       | Backup fuel use and expenditure, safety, privacy, waiting experience, satisfaction, cleanliness, willingness to continue                  |
| F. Household size and slots | Minutes per person, duration by size band, outliers, slot utilisation, slot fairness, expected vs actual solar, efficiency, unused energy |

**Charts:** cooking sessions (daily, weekly, monthly); solar production trend; battery SOC trend; food type distribution; appliance utilization; fault and uptime trend; waiting issue trend; cleaning compliance; backup fuel use trend, including baseline versus current; user satisfaction trend; safety incident summary; expected vs actual solar (the gap shows lost potential); energy flow: consumed, stored, unused; cooking time by family size band.

**Filters:** date or period, household, session, indicator, food or appliance category, kitchen and size band. Dashboards for donors show coded IDs only.

**Reports:** the daily report covers cooking, solar, battery, faults, downtime, safety and generator. The monthly report covers household participation, cooking performance, technical performance, generator operation, user feedback and backup-fuel use, plus the size-band analysis and slot fairness. Data exports in Excel, CSV and PDF with clear column headings.

## 8. Architecture and Technology Stack

The system is built on the PERN stack (PostgreSQL, Express, React, Node.js) as a progressive web application, so one codebase serves phones, tablets and computers.

Figure 3. System architecture. Highlighted boxes are additions.

| Layer                 | Technology                                      | Purpose                                                                                   |
| --------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Database              | PostgreSQL                                      | Relational storage with CHECK, UNIQUE and foreign-key constraints; SQL views compute KPIs |
| Data access           | Prisma (or Knex)                                | Typed queries and schema migrations                                                       |
| Backend               | Node.js, Express                                | REST API, business rules, KPI and export endpoints                                        |
| Validation            | Zod                                             | Server-side validation of every submission                                                |
| Authentication        | JWT with refresh tokens, bcrypt                 | Secure login, role-based permissions, hashed passwords                                    |
| Hardening             | Helmet, CORS, express-rate-limit, pino          | Security headers, abuse limits, structured logs and audit trail                           |
| Frontend              | React with Vite, React Router                   | Responsive forms, dashboard and admin screens                                             |
| UI and forms          | Tailwind CSS, React Hook Form, TanStack Query   | Mobile-first styling, form handling, data fetching and caching                            |
| Charts                | Recharts                                        | Simple dashboard visualisations                                                           |
| Offline layer         | Workbox service worker, Dexie (IndexedDB)       | Offline app shell, local storage of entries and reference data, background sync           |
| Export                | exceljs, fast-csv, pdfkit or Puppeteer          | Excel, CSV and PDF reports                                                                |
| Scheduling and backup | node-cron, pg_dump                              | Regular database backups and routine data-quality checks                                  |
| Testing               | Vitest or Jest, Supertest, Playwright           | Unit tests (KPI formulas), API tests, mobile and desktop end-to-end tests                 |
| Deployment            | Docker Compose, Nginx, Let's Encrypt, cloud VPS | Reproducible deployment, HTTPS, three-year hosting and domain                             |

## 9. Database Design

Figure 4a. Database tables for households, slots and cooking sessions. Highlighted tables are additions.

Figure 4b. Database tables for technical monitoring, settings and users.

Added tables: HOUSEHOLD, SLOT, SYSTEM_CONFIG (panel and battery capacity, performance ratio, scheduled hours), SESSION_DISH (several dishes per session) and lookup tables for problem categories. Fields marked "added" extend tables defined in the TD. Arrows run from the parent table to the child table that holds its foreign key (FK). Constraints: one daily log per kitchen per day; one feedback per household per month; end time after start time; SOC 0 to 100; ratings 1 to 5; unique client identifier per record.

## 10. Offline Operation

Field users may lose connectivity. The application must never lose an unfinished or submitted entry, and must synchronise when connectivity returns. If full offline use is not possible in a given situation, it falls back to low-bandwidth operation.

Figure 5. Offline submission and synchronisation.

| Mechanism             | Description                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Local outbox          | Every submission is saved on the device first (nothing is lost if the signal drops)                                |
| Unique entry ID       | Generated on the device; the server ignores entries it already holds (retries cannot create duplicates)            |
| Automatic sync        | Runs on reconnection, on app start and periodically, with retries; status shown as Pending, Synced or Failed       |
| Conflict list         | Clashes, such as two daily logs for one date, go to an administrator review list (nothing is silently overwritten) |
| Draft autosave        | Half-completed forms persist (meets the ToR requirement not to lose unfinished entries)                            |
| Cached reference data | Households, today's slots and dropdown lists are stored locally (forms work fully offline)                         |
| Offline login         | A time-limited cached session; passwords are never stored on the device                                            |
| Dashboard and exports | Require connectivity; a "last updated" time is shown, and payloads are kept small for low bandwidth                |

## 11. Security and Data Quality

| Area                | Measures                                                                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validation          | Mandatory fields, household ID and date/time checks, duplicate detection, numeric limits, predefined categories, automatic calculation; the administrator can review incomplete or unusual records |
| Access and security | Authenticated access, role-based permissions, secure password handling, secure database access, restricted administration, audit trail and login history                                           |
| Privacy             | No unnecessary personal information on donor-facing screens; coded household IDs; data confidential and owned by the commissioning organisation                                                    |
| Backup              | Regular database backup, controlled data export                                                                                                                                                    |

## 12. Implementation Plan

| Step           | Work                                                                                                                         | Complete when                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1. Foundation  | Repository, Docker setup, database schema, authentication, roles, audit log                                                  | Roles can log in and constraints are enforced  |
| 2. Master data | Kitchen settings, 16 households, appliances, dishes, weather factors                                                         | Administrator manages all reference data       |
| 3. Slots       | Slot management, rotation suggestion, swaps, status tracking                                                                 | A weekly schedule can be generated and edited  |
| 4. Forms       | Four data forms with validation and automatic calculation                                                                    | Each form saves correct data from a phone      |
| 5. Offline     | Web app caching, local outbox, sync endpoint, conflict list                                                                  | Offline entries sync without duplicates        |
| 6. KPIs        | SQL views for all KPIs, size-band analysis, solar analysis                                                                   | Results match manual calculations on test data |
| 7. Dashboard   | Indicator cards, charts, filters, coded IDs for viewers                                                                      | All indicators render and filter correctly     |
| 8. Reports     | Daily and monthly reports; Excel, CSV and PDF export                                                                         | Exports open cleanly with proper headings      |
| 9. Testing     | Validation, access, KPI, export, mobile and desktop display, offline tests; defect fixing                                    | Complete workflow passes                       |
| 10. Delivery   | Deployment, user training, user guide, system documentation with flowcharts, handover of domain, hosting and database access | Users operate the system independently         |

**Items to confirm with the project team:** installed solar capacity and battery size; kitchen operating hours; number and length of daily slots; whether larger families receive longer slots; source of baseline fuel data; whether energy use is metered or estimated; final family size bands; export rights for viewers.
