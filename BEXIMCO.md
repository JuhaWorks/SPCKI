Solar Powered Community Kitchen Initiative (SPCKI)

# Digital Data Collection Application and Impact Monitoring Dashboard

System Report | October 2026

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

SPCKI is a shared community kitchen powered by solar energy. It has solar panels, a battery, a backup generator and electric cooking appliances. Each kitchen serves 16 households (a setting that can change per kitchen).

The pilot must show whether the kitchen is used, whether it runs reliably, whether households are satisfied, and whether it should continue or grow. Data is now collected on paper and spreadsheets. This platform replaces them: staff enter data on a phone, and the system calculates indicators, draws charts and creates reports.

**Objectives:** make data entry simple; keep data consistent and complete; remove manual calculation; show results quickly; track household use and feedback; support donor reports; allow data export; provide evidence for scale-up.

## 2. System Overview

The system has four parts: a data collection app, a central database, an impact dashboard, and reports with export. Data follows one path: field entry, database, automatic KPI calculation, dashboard, reports.

Figure 1. Data flow. Highlighted boxes are additions.

## 3. Users and Roles

| Role               | Enters data                | Edits              | Manages users, households, slots | Dashboard            | Export  |
| ------------------ | -------------------------- | ------------------ | -------------------------------- | -------------------- | ------- |
| Field / Data Entry | Cooking sessions, feedback | Own entries        | No                               | Limited              | No      |
| Technical          | Daily technical, generator | Own entries        | No                               | Technical view       | No      |
| Project / Admin    | All forms                  | All, reason logged | Yes                              | Full                 | Yes     |
| Viewer (donor)     | No                         | No                 | No                               | Full, coded IDs only | Summary |

User management covers: creating, editing and deactivating accounts; roles and permissions; secure login and passwords; activity log; login history; reports by user and role. Every user and record belongs to a kitchen, so new locations can be added later.

## 4. Operating Model

Slot scheduling. With 16 households, cooking turns are planned in slots. A slot has a start time, an end time and a power source: solar, battery or generator. The system suggests a fair rotation, and the administrator can change it.

Figure 2. Slot planning and outcomes (added feature).

## 5. Data Collection Modules

Forms use dropdowns, Yes/No buttons and automatic date and time, so users type very little.

### 5.1 Household Register (new)

| Field                               | Description                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| Household code                      | Coded ID. Dashboards never show names                                                |
| Family size, children, adults       | Number of members (needed to compare cooking times fairly)                           |
| Baseline fuel type and monthly cost | What the household used before the pilot (needed for "baseline vs current fuel use") |
| Status, kitchen, joining date       | Active or inactive; assigned kitchen; date joined                                    |

### 5.2 Cooking Session

| Field                                 | Description                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| Date                                  | Cooking date, filled automatically                                              |
| Household                             | The household using the slot (one household per session)                        |
| Session                               | Session number, linked to the slot                                              |
| Persons cooked for                    | Number of people eating. Defaults to family size                                |
| Start time, End time                  | When cooking started and ended                                                  |
| Cooking duration                      | Calculated automatically                                                        |
| Food type                             | One or more: rice, dal, vegetables, fish, meat, curry, khichuri, other          |
| Appliance                             | Appliance used (each has a power rating in kW)                                  |
| Power source                          | Solar, battery or generator (shows if delays came from power problems)          |
| Cooking completed, Cleaning completed | Yes / No                                                                        |
| Waiting issue                         | Yes / No. If Yes, choose a reason: no free slot, appliance busy, late start     |
| Technical problem                     | Yes / No. If Yes, choose a type: power cut, appliance fault, low battery, other |
| Remarks                               | Optional note                                                                   |

### 5.3 Daily Technical Data

| Field                            | Description                                                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Date                             | One record per kitchen per day                                                                                          |
| Daily solar production           | kWh                                                                                                                     |
| Morning and evening battery SOC  | Battery charge, % (0 to 100)                                                                                            |
| System operational               | Yes / No                                                                                                                |
| Technical faults, Total downtime | Number; hours                                                                                                           |
| Safety incident                  | Yes / No. If Yes, add severity and a note                                                                               |
| Weather condition                | Sunny, Partly cloudy, Cloudy, Rainy, Stormy                                                                             |
| Energy consumed                  | kWh used by the kitchen, from a meter or estimated from appliance power and cooking time (needed to find wasted energy) |
| Remarks                          | Technical notes                                                                                                         |

### 5.4 Generator Maintenance

| Field                               | Description                                    |
| ----------------------------------- | ---------------------------------------------- |
| Date, Running time                  | Day of operation; hours run                    |
| Fuel at start, Re-fuel              | Litres in the tank at the start; litres added  |
| Fuel at end                         | Litres left. Fuel used = start + re-fuel − end |
| Maintenance required, type, remarks | Yes / No; category; notes                      |

### 5.5 Monthly Household Feedback

A short survey per household. Ratings run from 1 (Very Poor) to 5 (Very Good).

| Question                                                                     | Answer                                 |
| ---------------------------------------------------------------------------- | -------------------------------------- |
| Backup fuel used? Amount spent?                                              | Yes / No; amount                       |
| Reduction in backup fuel use                                                 | 1 to 5                                 |
| Safety, Privacy, Waiting, Overall satisfaction, Cleanliness, Ease of cooking | 1 to 5 each                            |
| Was your slot time suitable?                                                 | 1 to 5                                 |
| Was the time enough for your family size?                                    | Too short / About right / Too long     |
| How many family members now?                                                 | Number (keeps the register up to date) |
| Willing to continue? Remarks                                                 | Yes / No; optional                     |

## 6. KPIs and Analysis

### 6.1 KPIs

| KPI                     | Calculation                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Participation rate      | Active households ÷ Registered households × 100. Active means at least one attended session in the period |
| Session completion rate | Completed sessions ÷ Total sessions × 100                                                                 |
| Average cooking time    | Total cooking time ÷ Completed sessions                                                                   |
| Cleaning compliance     | Cleaned sessions ÷ Total sessions × 100                                                                   |
| Waiting issue rate      | Sessions with a waiting issue ÷ Total sessions × 100                                                      |
| Technical fault rate    | Sessions with a fault ÷ Total sessions × 100                                                              |
| System uptime           | (Scheduled hours − Downtime) ÷ Scheduled hours × 100                                                      |
| Average downtime        | Total downtime ÷ Operational days                                                                         |
| Average satisfaction    | Total rating ÷ Number of responses                                                                        |
| Minutes per person      | Cooking time ÷ Persons cooked for                                                                         |
| Slot utilisation        | Attended slots ÷ Scheduled slots × 100                                                                    |
| Backup-fuel reduction   | (Baseline cost − Current cost) ÷ Baseline cost × 100                                                      |
| Generator fuel used     | Start + Re-fuel − End (litres)                                                                            |

### 6.2 Household size and cooking time

Raw cooking time can mislead. A family with five children may take two hours to cook rice, while a family of three takes longer. Reports therefore compare similar cases:

| Analysis              | Description                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Size bands            | 1-3, 4-5, 6-7 and 8+ persons                                                                                                                                                                     |
| Time by dish and band | Average time and minutes per person for each dish within each band                                                                                                                               |
| Slow sessions         | Sessions over 1.5 × the median for the same dish and band, listed with power source, appliance and problem reason. This shows whether slowness comes from the family or from power and equipment |
| Feedback by band      | "Was the time enough?" answers split by band, to show which family sizes need longer slots                                                                                                       |

### 6.3 Solar output, efficiency and waste

| Measure         | Calculation                                                                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expected output | Panel capacity (kWp) × Peak sun hours × Weather factor × Performance ratio. Starting weather factors: Sunny 1.0, Partly cloudy 0.65, Cloudy 0.35, Rainy 0.20, Stormy 0.10. Performance ratio: 0.70 to 0.80. All are editable settings, to be adjusted using real data |
| Efficiency      | Actual ÷ Expected × 100. Low values point to dirty panels, shading, faults or downtime                                                                                                                                                                                |
| Wasted energy   | Generated − Consumed − (Change in SOC ÷ 100 × Battery capacity)                                                                                                                                                                                                       |
| Downtime loss   | Expected hourly output × Downtime hours                                                                                                                                                                                                                               |

## 7. Dashboard and Reports

| Section                  | Indicators                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| A. Overview              | Registered and active households, participation rate, total and completed sessions, completion rate                                        |
| B. Cooking               | Average cooking time, food type performance, appliance use, session-wise performance, incomplete sessions, waiting issues                  |
| C. Operations            | Waiting issue rate, incomplete session rate, cleaning compliance, technical problems, common user problems, safety incidents               |
| D. Technical             | Daily and monthly solar production, morning vs evening SOC, uptime, faults, downtime, generator hours, fuel use                            |
| E. Feedback              | Backup fuel use and cost, safety, privacy, waiting, satisfaction, cleanliness, willingness to continue                                     |
| F. Family size and slots | Minutes per person, time by size band, slow sessions, slot utilisation, slot fairness, expected vs actual solar, efficiency, wasted energy |

**Charts:** cooking sessions (daily, weekly, monthly); solar production; battery SOC; food types; appliance use; faults and uptime; waiting issues; cleaning compliance; backup fuel use, baseline vs current; satisfaction; safety incidents; expected vs actual solar; energy used, stored and wasted; cooking time by family size band.

**Filters:** date or period, household, session, indicator, food or appliance, kitchen, family size band. Donor screens show coded IDs only.

**Reports:** the daily report covers cooking, solar, battery, faults, downtime, safety and generator. The monthly report covers participation, cooking, technical performance, generator, feedback and backup fuel, plus size-band analysis and slot fairness. Data exports to Excel, CSV and PDF.

## 8. Architecture and Technology Stack

The system uses the PERN stack (PostgreSQL, Express, React, Node.js) as a web app that works on phones, tablets and computers.

Figure 3. System architecture. Highlighted boxes are additions.

| Layer              | Technology                                      | Purpose                                                               |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------- |
| Database           | PostgreSQL                                      | Stores all data; constraints block bad data; SQL views calculate KPIs |
| Data access        | Prisma (or Knex)                                | Database queries and schema changes                                   |
| Backend            | Node.js, Express                                | API, business rules, KPI and export endpoints                         |
| Validation         | Zod                                             | Checks every submission on the server                                 |
| Login and security | JWT, bcrypt, Helmet, rate limiting              | Secure login, roles, hashed passwords, protection against abuse       |
| Logging            | pino                                            | Server logs and audit trail                                           |
| Frontend           | React with Vite, React Router                   | Forms, dashboard and admin screens                                    |
| Screens and forms  | Tailwind CSS, React Hook Form, TanStack Query   | Mobile-first design, forms, data loading                              |
| Charts             | Recharts                                        | Simple dashboard charts                                               |
| Offline support    | Workbox, Dexie (IndexedDB)                      | Works without signal; saves entries on the device; syncs later        |
| Export             | exceljs, fast-csv, pdfkit or Puppeteer          | Excel, CSV and PDF files                                              |
| Jobs and backup    | node-cron, pg_dump                              | Regular backups and data checks                                       |
| Testing            | Vitest or Jest, Supertest, Playwright           | KPI formula tests, API tests, mobile and desktop tests                |
| Deployment         | Docker Compose, Nginx, Let's Encrypt, cloud VPS | Easy setup, HTTPS, three-year hosting and domain                      |

## 9. Database Design

Figure 4a. Tables for households, slots, cooking sessions and feedback.

Figure 4b. Tables for technical monitoring, settings and users.

Highlighted tables are new. Columns marked "added" are new fields in tables from the technical document. Arrows run from the parent table to the child table that holds its foreign key (FK). Rules: one daily log per kitchen per day; one feedback per household per month; end time after start time; SOC from 0 to 100; ratings from 1 to 5; unique client ID per record.

## 10. Offline Operation

Field users may lose signal. The app must never lose an entry, and must sync when the signal returns. Without full offline support, it still works on low bandwidth.

Figure 5. Working offline and syncing later.

| Feature               | How it works                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Local outbox          | Every entry is saved on the device first                                                                   |
| Unique entry ID       | Created on the device, so a retry never makes a duplicate                                                  |
| Automatic sync        | Runs when signal returns, when the app opens, and every few minutes. Status: Pending, Synced or Review     |
| Review list           | Clashes (for example two daily logs for one date) go to the administrator. Nothing is overwritten silently |
| Draft autosave        | Unfinished forms are kept                                                                                  |
| Saved lists           | Households, slots and dropdown lists are stored on the device                                              |
| Offline login         | A time-limited saved login. Passwords are never stored                                                     |
| Dashboard and exports | Need internet. A "last updated" time is shown                                                              |

## 11. Security and Data Quality

| Area       | Measures                                                                                                                                                                                            |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validation | Required fields, valid household IDs, date and time checks, duplicate detection, number limits, fixed categories, automatic calculation. The administrator can review incomplete or unusual records |
| Access     | Login required, role-based permissions, hashed passwords, secure database access, limited admin access, audit trail, login history                                                                  |
| Privacy    | No personal details on donor screens; coded household IDs; data belongs to the commissioning organisation                                                                                           |
| Backup     | Regular database backups; controlled data export                                                                                                                                                    |

## 12. Implementation Plan

| Step           | Work                                                                                              | Done when                                 |
| -------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1. Foundation  | Repository, Docker, database schema, login, roles, audit log                                      | Roles can log in; constraints work        |
| 2. Master data | Kitchen settings, 16 households, appliances, dishes, weather factors                              | Admin manages all reference data          |
| 3. Slots       | Slot management, rotation suggestion, swaps, status                                               | A weekly schedule can be made and edited  |
| 4. Forms       | Four data forms with checks and automatic calculation                                             | Each form saves correct data from a phone |
| 5. Offline     | Cached app, local outbox, sync, review list                                                       | Offline entries sync without duplicates   |
| 6. KPIs        | SQL views for all KPIs, size-band and solar analysis                                              | Results match manual calculations         |
| 7. Dashboard   | Indicator cards, charts, filters, coded IDs for viewers                                           | All indicators show and filter correctly  |
| 8. Reports     | Daily and monthly reports; Excel, CSV, PDF export                                                 | Exports open cleanly                      |
| 9. Testing     | Validation, access, KPI, export, display and offline tests; fix defects                           | Full workflow passes                      |
| 10. Delivery   | Deploy, train users, write guide and documentation, hand over domain, hosting and database access | Users work on their own                   |

**To confirm with the project team:** solar panel and battery size; kitchen operating hours; slots per day and slot length; whether larger families get longer slots; source of baseline fuel data; metered or estimated energy use; final family size bands; export rights for viewers.
