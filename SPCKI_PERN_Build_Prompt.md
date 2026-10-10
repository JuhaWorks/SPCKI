# SPCKI Platform: Master Build Prompt (PERN, from first commit to secure deployment)

## How to use this prompt

1. Create an empty Git repository. Put these files in a `/docs` folder: `spcki_schema.sql` (PostgreSQL schema), `SPCKI_Sample_Dataset.xlsx` (sample data), and the system report.
2. Open an AI coding assistant (for example Claude Code) in the repository.
3. Paste everything below the line into it. Work **one phase at a time**: after each phase, check the "Done when" list, run the tests, and only then say "continue to the next phase".

---

# PROMPT STARTS HERE

You are a senior full-stack engineer and security engineer. Build the **SPCKI Digital Monitoring Platform** end to end on the **PERN stack** (PostgreSQL, Express, React, Node.js), in **TypeScript**, and prepare it for secure production deployment.

## 1. The project in plain words

SPCKI (Solar Powered Community Kitchen Initiative) is a pilot of a **shared solar-powered kitchen** in a camp setting. One kitchen serves **16 households**. It has solar panels, a battery, a backup generator and electric cooking appliances. Households cook in scheduled **slots**; each slot has a power source (Solar, Battery or Generator).

The platform must replace paper and spreadsheets with one flow:

**Field data entry (phone) → Central database → Automatic KPI calculation → Dashboard → Reports and export.**

It must prove: how the kitchen is used, how reliably it runs, how households experience it, and whether the model should continue or scale up. Keep it a **focused monitoring tool, not a complex MIS**. Users are volunteers and caretakers, so forms must be simple: dropdowns, Yes/No switches, automatic dates and times, minimum typing.

### Roles

| Role           | Can do                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------- |
| Field          | Enter cooking sessions and monthly feedback; edit own recent entries                            |
| Technical      | Enter daily technical logs and generator logs; edit own recent entries                          |
| Project        | Everything Field and Technical do, plus review data and see all reports                         |
| Admin          | Everything: users, households, slots, settings, corrections (with a reason), exports, audit log |
| Viewer (donor) | Dashboard and summary reports only, **coded household IDs only**, no data entry                 |

Every user and record belongs to a **kitchen** (`kitchen_id`) so more kitchens can be added later. Viewers may have access to all kitchens.

## 2. Ground rules for you (the assistant)

- Follow the phases in order. Do not skip ahead. At the end of each phase, give me: what you built, how to run it, the tests you ran and their results, and anything you assumed.
- Treat `/docs/spcki_schema.sql` as the **source of truth** for the database. If you must change it, explain why and update the file.
- Write down every assumption in `docs/ASSUMPTIONS.md`. Do not invent requirements. If something blocks you, ask one short question.
- No placeholder code, no `TODO` left in finished features, no fake data in production code paths.
- Every feature needs tests. Run lint, type-check and tests before saying a phase is done.
- Never log or print secrets, passwords, tokens or full request bodies. Never commit `.env` files.
- Keep dependencies few and well known. Pin versions. Run `npm audit` and fix high and critical findings.
- Commit at the end of each phase with a clear message.

## 3. Stack and libraries (use these unless you give me a strong reason)

| Layer             | Choice                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Language          | javascript (strict mode) in both backend and frontend                                                            |
| Database          | PostgreSQL 16                                                                                                    |
| DB access         | `pg` with small typed query functions (parameterised queries only). Migrations: `node-pg-migrate` with plain SQL |
| Backend           | Node.js 20 LTS, Express 4/5, Zod for validation, `pino` + `pino-http` for logs                                   |
| Security packages | `helmet`, `cors`, `express-rate-limit`, `argon2` (argon2id), `jose` (JWT), `cookie-parser`, `hpp`                |
| Frontend          | React 18 + Vite, React Router, TanStack Query, React Hook Form + Zod, Tailwind CSS, Recharts                     |
| Offline           | `vite-plugin-pwa` (Workbox) and Dexie (IndexedDB)                                                                |
| Export            | `exceljs` (xlsx), `fast-csv` (csv), `pdfkit` (pdf)                                                               |
| Jobs              | `node-cron`                                                                                                      |
| Testing           | Vitest (unit), Supertest (API), Playwright (end to end), k6 (small load test)                                    |
| DevOps            | Docker + Docker Compose, Nginx, Let's Encrypt (certbot), GitHub Actions                                          |

## 4. Repository structure

```
spcki/
  docs/                 spcki_schema.sql, sample data, ASSUMPTIONS.md, SECURITY.md, RUNBOOK.md, USER_GUIDE.md
  server/
    src/
      config/           env loading and validation (Zod), constants
      db/               pool, query helpers, migrations/, seeds/
      middleware/       auth, rbac, kitchenScope, validate, rateLimit, errorHandler, audit
      modules/          auth, users, kitchens, lookups, households, slots, sessions,
                        dailyLogs, generatorLogs, feedback, sync, kpi, reports, exports, audit
      jobs/             backup and data-quality jobs
      utils/            csv-safe, dates, logger
      app.ts            server.ts
    tests/
  client/
    src/
      api/              typed API client, token handling
      offline/          Dexie db, outbox, sync engine, status hooks
      features/         auth, slots, sessions, dailyLogs, generator, feedback, dashboard, reports, admin
      components/       form fields, tables, charts, layout
      routes/
    public/             icons, manifest
  deploy/               docker-compose.yml, nginx.conf, backup scripts, ci workflow notes
  .github/workflows/    ci.yml
```

## 5. Business rules you must implement exactly

### Data forms (fields come from the schema file)

1. **Cooking session**: one session per slot, one household per session. Fields: slot, persons cooked for (defaults to family size), start and end time, duration (calculated by the database), appliance, power source, cooking completed (Y/N), cleaning completed (Y/N), waiting issue (Y/N, and a reason is required if Yes), technical problem (Y/N, and a problem type is required if Yes), remarks, dishes (one or more).
2. **Daily technical log**: one per kitchen per day. Solar kWh, morning and evening battery %, system operational, faults, downtime hours, safety incident (severity required if Yes), safety note, weather, energy consumed kWh, remarks.
3. **Generator log**: one per kitchen per day. Fuel at start, re-fuel, fuel at end (fuel used = start + re-fuel − end, calculated), running hours, maintenance required and type, remarks.
4. **Monthly household feedback**: one per household per month. Backup fuel used, spend, ratings 1 to 5 (fuel reduction, safety, privacy, waiting, overall, cleanliness, ease, slot suitability), "time enough for family size" (Too short / About right / Too long), current family members, willing to continue, remarks.

### Slots

- Each day has slots from `slot_templates`. A slot has start, end, power source, assigned household and status (Scheduled, Attended, Missed, Cancelled, Swapped).
- `POST /slots/generate` creates slots for a date range and assigns the 16 households in **fair rotation**, continuing after the last assigned household. The administrator can then change generator slots, swap households and edit statuses. Every change is audited.

### KPI definitions (calculate in SQL views or queries, never store)

| KPI                     | Formula                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Participation rate      | Active households ÷ Registered households × 100. **Active = at least one attended session in the period** |
| Session completion rate | Completed sessions ÷ Total sessions × 100                                                                 |
| Average cooking time    | Total cooking time of completed sessions ÷ Completed sessions                                             |
| Minutes per person      | Cooking duration ÷ persons cooked for                                                                     |
| Cleaning compliance     | Cleaned sessions ÷ Total sessions × 100                                                                   |
| Waiting issue rate      | Sessions with waiting issue ÷ Total sessions × 100                                                        |
| Technical fault rate    | Sessions with a problem ÷ Total sessions × 100 (daily fault count is reported separately)                 |
| System uptime           | (Scheduled hours × days − downtime) ÷ (Scheduled hours × days) × 100                                      |
| Average downtime        | Total downtime ÷ days logged                                                                              |
| Average satisfaction    | Total rating ÷ responses                                                                                  |
| Slot utilisation        | (Attended + Swapped) ÷ Scheduled slots × 100                                                              |
| Backup-fuel reduction   | (Baseline cost − Current spend) ÷ Baseline cost × 100                                                     |
| Generator fuel used     | Start + Re-fuel − End                                                                                     |
| Expected solar          | kWp × peak sun hours × weather factor × performance ratio                                                 |
| Solar efficiency        | Actual ÷ Expected × 100                                                                                   |
| Wasted energy           | Generated − Consumed − (evening % − morning %) ÷ 100 × battery kWh                                        |
| Downtime loss           | Expected ÷ productive sun hours × downtime hours                                                          |

**Family size analysis:** size bands 1-3, 4-5, 6-7, 8+. Show average duration and minutes per person per band, per dish and per power source, and flag **slow sessions** (more than 1.5 × the median for the same dish and band) with their power source, appliance and problem reason. This tells us whether slowness comes from family size or from power and equipment problems.

### Dashboard and reports

- Indicator cards: registered and active households, participation, sessions, completion rate, average cooking time, solar produced, expected vs actual, uptime, faults, satisfaction, backup-fuel reduction, safety incidents, wasted energy.
- 14 charts: sessions (day, week, month); solar trend; expected vs actual solar; battery SOC trend; food type distribution; appliance utilisation; fault and uptime trend; waiting issue trend; cleaning compliance; backup fuel use (baseline vs current); satisfaction trend; safety incident summary; energy used, stored and wasted; cooking time by family size band.
- Filters: date range, household, session or slot, dish, appliance, kitchen, size band.
- Reports: **daily** (cooking, solar, battery, faults, downtime, safety, generator) and **monthly** (participation, cooking, size-band analysis, technical, generator, feedback, backup fuel, slot fairness). Export Excel, CSV and PDF with clear column headings.
- Donor (Viewer) screens and exports show **coded household IDs only**.

## 6. API (prefix `/api/v1`, JSON, consistent error format)

Error format: `{ "error": { "code": "VALIDATION_ERROR", "message": "…", "details": [...] } }`. Never return stack traces or SQL errors to the client.

| Area                 | Endpoints                                                                                                                             | Access                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Auth                 | `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me`, `POST /auth/change-password`                           | public / any signed-in                  |
| Users                | `GET/POST /users`, `PATCH /users/:id`, `POST /users/:id/deactivate`, `POST /users/:id/reset-password`                                 | Admin                                   |
| Kitchen and settings | `GET/PATCH /kitchens/:id`, `GET/PATCH /kitchens/:id/config`                                                                           | read: all; write: Admin                 |
| Lookups              | `GET /lookups`; Admin CRUD for appliances, dishes, problem categories, weather factors                                                | read: all; write: Admin                 |
| Households           | `GET/POST /households`, `PATCH /households/:id`                                                                                       | read: staff; write: Admin               |
| Slots                | `GET /slots`, `POST /slots/generate`, `PATCH /slots/:id`                                                                              | read: staff; write: Admin               |
| Sessions             | `GET/POST /sessions`, `PATCH /sessions/:id`                                                                                           | Field, Project, Admin                   |
| Daily logs           | `GET/POST /daily-logs`, `PATCH /daily-logs/:id`                                                                                       | Technical, Project, Admin               |
| Generator logs       | `GET/POST /generator-logs`, `PATCH /generator-logs/:id`                                                                               | Technical, Project, Admin               |
| Feedback             | `GET/POST /feedback`, `PATCH /feedback/:id`                                                                                           | Field, Project, Admin                   |
| Sync                 | `POST /sync/batch`, `GET /sync/conflicts`, `POST /sync/conflicts/:id/resolve`                                                         | batch: staff; conflicts: Admin          |
| KPIs and charts      | `GET /kpi/summary`, `/kpi/cooking`, `/kpi/technical`, `/kpi/solar`, `/kpi/feedback`, `/kpi/size-bands`, `/kpi/slots`, `/charts/:name` | all roles (Viewer gets anonymised data) |
| Reports and export   | `GET /reports/daily`, `GET /reports/monthly`, `GET /export/:dataset?format=csv\|xlsx\|pdf`                                            | Project, Admin (Viewer: summary only)   |
| Audit                | `GET /audit`                                                                                                                          | Admin                                   |
| Health               | `GET /health`                                                                                                                         | public (no details)                     |

**Edit rules:** Field and Technical users may edit only their **own** entries within 24 hours. Corrections by Project and Admin require a written reason and are written to the audit log with old and new values.

## 7. Offline and sync (important)

Users may lose signal. The app must never lose an entry.

1. Cache the app shell with a service worker. Cache reference data (households, today's slots, lookups) in IndexedDB.
2. Every form saves first to a local **outbox** (Dexie) with a **client UUID** created on the device and the device time. Show the status: Pending, Synced, Failed, Needs review.
3. The sync engine runs when the signal returns, when the app opens, and every few minutes, with retry and backoff.
4. `POST /sync/batch` request: `{ "device_id": "…", "items": [ { "type": "cooking_session|daily_log|generator_log|feedback", "client_uuid": "…", "device_time": "…", "payload": { … } } ] }`.
   Response: `{ "results": [ { "client_uuid": "…", "status": "saved|duplicate|conflict|invalid", "error": "…" } ] }`.
5. Each item is processed in **its own transaction** and is **idempotent**: an existing `client_uuid` returns `duplicate`. A unique-key clash (for example a second daily log for the same date, or a second session for a slot) is stored in `sync_conflicts` for the administrator and returns `conflict`. Validation failures return `invalid` with field errors; the user can fix and resend.
6. Autosave drafts of unfinished forms.
7. A signed-in user can keep entering data **offline for up to 7 days**. The device keeps the identity and role from the last sign-in, never the password. If the refresh token has expired when the signal returns, ask the user to sign in again, then sync the saved outbox. The server must check that the submitting user is allowed to enter that type of record for that kitchen.
8. The dashboard and exports need the internet and show a "last updated" time.

## 8. Phases

### Phase 0: Foundation

- Create the repository structure, TypeScript strict config, ESLint (with `eslint-plugin-security`), Prettier, Husky pre-commit (lint, type-check), `.editorconfig`, `.gitignore`, `.env.example`.
- GitHub Actions `ci.yml`: install, lint, type-check, test, `npm audit --audit-level=high`.
- `docs/ASSUMPTIONS.md`, `docs/SECURITY.md` skeletons.
- **Done when:** CI is green on an empty app and `npm run dev` starts both server and client.

### Phase 1: Database

- Turn `spcki_schema.sql` into numbered SQL migrations (`node-pg-migrate`). Add seed scripts: lookups, one kitchen with its settings (assume 4 kWp panels, 10 kWh battery, performance ratio 0.75, peak sun hours 4.5), slot templates (6 slots a day), and a **demo seed** that loads the sample dataset (16 households, 14 days).
- Create **three database roles**: `spcki_owner` (runs migrations), `spcki_app` (the app: SELECT, INSERT, UPDATE, DELETE only on needed tables, no DDL, not a superuser), `spcki_readonly` (reporting). On `audit_logs`, grant the app **INSERT and SELECT only** (REVOKE UPDATE and DELETE).
- **Done when:** a fresh database can be built with one command; the demo seed loads; KPI views return the values in the sample workbook's KPI sheet (check at least 10 numbers).

### Phase 2: Backend core and authentication

- `config`: load and validate environment variables with Zod; the app **refuses to start** with missing or weak secrets.
- `app.ts`: Helmet, strict CORS (only the front-end origin), JSON body limit of 1 MB, `hpp`, request IDs, `pino-http` (redact `authorization`, cookies, passwords), central error handler, 404 handler, graceful shutdown, `/health`.
- Authentication (see section 9 for details): login, refresh with rotation, logout, change password, `me`.
- Middleware: `requireAuth`, `requireRole(...)`, `kitchenScope` (every query is limited to the user's kitchen unless the role allows all), `validate(schema)`, `audit`.
- **Done when:** tests prove login works, a wrong password gets a generic error, lockout works, a normal user gets 403 on admin routes, and a user cannot read another kitchen's data.

### Phase 3: Master data and slots

- Users, kitchen and settings, lookups, households and slots modules, with Zod validation matching the database constraints.
- `POST /slots/generate` with the fair rotation rule. Audit all admin changes.
- **Done when:** an admin can create 16 households, generate a week of slots, swap a household, and every change shows in the audit log.

### Phase 4: Data entry APIs and sync

- Sessions, daily logs, generator logs and feedback modules with full validation (required fields, ranges, end after start, SOC 0 to 100, ratings 1 to 5, reason required when a Yes/No flag is Yes, household belongs to the kitchen, slot belongs to the kitchen, duplicates blocked).
- Edit rules from section 6. Sync endpoints from section 7.
- **Done when:** the same batch sent twice creates no duplicates; a clashing entry lands in `sync_conflicts`; invalid entries return clear field errors.

### Phase 5: KPIs, analytics and charts

- Implement every KPI in section 5 with SQL views and parameterised queries; accept `from`, `to`, `kitchen`, `household`, `dish`, `appliance`, `sizeBand` filters (all validated).
- Chart endpoints return ready-to-plot arrays.
- Viewer role responses contain coded IDs only.
- **Done when:** unit tests compare results with a small hand-calculated fixture; API tests check role-based output.

### Phase 6: Reports and export

- Daily and monthly reports. Export to CSV, Excel and PDF with clear headings.
- **CSV and Excel injection protection:** any cell starting with `=`, `+`, `-` or `@` is prefixed with an apostrophe or a tab.
- Exports need `Project` or `Admin` role, have row limits, run through the same filters, and are **audited** (who, what, when).
- **Done when:** exports open cleanly in Excel and match the on-screen numbers.

### Phase 7: Frontend

- Mobile-first layout, large touch targets, clear fonts, English labels (design so a Bengali or other language file can be added later with i18n).
- Screens: sign in; today's slots; cooking session form; daily technical form; generator form; monthly feedback form; my entries with sync status; dashboard (cards, 14 charts, filters, drill-down); reports and exports; admin (users, households, slots, settings, lookups, sync conflicts, audit log).
- Forms: React Hook Form + the same Zod rules as the server; auto-fill date and time; dropdowns and switches; helpful error messages.
- Offline layer from section 7 with a visible online/offline and sync indicator.
- Show or hide menu items by role, but **never rely on the front end for security**; the server enforces everything.
- Accessibility: labels, focus order, contrast, keyboard use.
- **Done when:** a Field user can enter a cooking session on a phone-sized screen in under a minute, offline, and see it sync later.

### Phase 8: Security hardening (do this fully, not at the end only)

Implement and **verify with tests** every item in section 9. Produce `docs/SECURITY.md` with the threat model, controls, and a completed checklist. Run OWASP ZAP baseline scan against the running app and fix findings.

### Phase 9: Testing

- Unit tests for every KPI formula and validation rule.
- API tests (Supertest) for every endpoint: success, validation failure, wrong role (403), no token (401), other kitchen (403/404).
- End-to-end tests (Playwright): login, enter each form, offline then sync, conflict handling, dashboard filters, export, admin tasks, viewer sees no names.
- Small k6 load test: 30 concurrent users on dashboard and form submission; report response times.
- **Done when:** all tests pass in CI; coverage above 80% on server business logic.

### Phase 10: Deployment

- `docker-compose.yml`: `db` (PostgreSQL, private network only, no public port), `server`, `client` build served by Nginx, `nginx` reverse proxy. Containers run as **non-root**, with read-only file systems where possible, health checks and resource limits.
- Nginx: HTTPS only (Let's Encrypt via certbot, auto-renew), redirect HTTP to HTTPS, HSTS, gzip, request size limits, rate limits, security headers, hide server version.
- Server hardening notes in `docs/RUNBOOK.md`: firewall (only 80, 443 and SSH), SSH keys only, `fail2ban`, automatic security updates, non-root deploy user.
- Environment separation: development, staging, production, each with its own secrets.
- **Backups:** nightly `pg_dump` (custom format), **encrypted**, copied off the server, 30-day retention, plus a **monthly restore test** documented and scripted. Backup job also writes a success or failure log.
- Monitoring: structured logs, uptime check on `/health`, alert on repeated failed logins, disk space and failed backups.
- **Done when:** the app runs on a clean server from one `docker compose up -d`, a restore test succeeds, and the SSL Labs grade is A or better.

### Phase 11: Documentation, training and handover

- `USER_GUIDE.md` (with screenshots) for Field, Technical, Project and Viewer roles; `ADMIN_GUIDE.md`; `RUNBOOK.md` (deploy, backup, restore, rotate secrets, add a kitchen, add a user, troubleshoot sync); API docs (OpenAPI/Swagger, served only to Admin or in non-production); system documentation with the flow charts and ER diagram; a data dictionary.
- Handover checklist: domain, hosting, database, Git repository, and all secrets transferred to the owning organisation; three years of domain and hosting arranged; three months of bug-fix support noted.

## 9. Security requirements (every item must be implemented and tested)

### 9.1 Threat model (write this into `docs/SECURITY.md`)

Assets: household data, user accounts, audit trail, exports. Threats to design against: stolen or shared phones; weak or reused passwords; a user reading another kitchen's data (IDOR); data leaks through exports; SQL injection and XSS; replayed or tampered sync requests; insider misuse; leaked backups or secrets; abuse of login and sync endpoints.

### 9.2 Authentication and sessions

- Passwords hashed with **argon2id**; minimum 10 characters, check against a short common-password list, no maximum below 128; never log or return them.
- Generic error for wrong username or password ("Invalid credentials"); constant-time comparison; **account lockout or progressive delay** after 5 failed attempts; rate limit login by IP and by username.
- Access token: JWT, **15 minutes**, kept in memory only. Refresh token: random, **stored hashed** in the database, sent in an `HttpOnly; Secure; SameSite=Strict` cookie, **rotated on every use** with **reuse detection** (if an old token is reused, revoke the whole session family).
- Do **not** store tokens in `localStorage`.
- CSRF protection for the cookie-based refresh and logout endpoints (SameSite plus a required custom header and an Origin check).
- Logout revokes the refresh token. Deactivating a user revokes all their sessions at once.
- Force a password change on first login and after an admin reset. Optional: TOTP two-factor for Admin accounts.
- Record every login attempt in `login_history`.

### 9.3 Authorization

- Role checks in middleware on **every** route (deny by default).
- **Object-level checks:** every query is filtered by `kitchen_id`; reading or editing a record by ID must verify it belongs to the user's kitchen and that the role allows it. Write tests for cross-kitchen access.
- Field and Technical users can only edit their own recent entries; corrections need a reason and are audited.
- Viewer endpoints return coded IDs and aggregates only.
- Optional defence in depth: PostgreSQL row-level security by `kitchen_id`.

### 9.4 Input, output and injection

- Validate all input with Zod (body, query, params): types, lengths, ranges, enums; reject unknown fields.
- **Parameterised SQL only**; never build SQL by joining strings (ESLint rule and code review check). Whitelist any sortable column names.
- React escapes output; never use `dangerouslySetInnerHTML`. Sanitise remarks if they are ever shown as HTML.
- Limit body size, array size (sync batch of at most 100 items) and page size; use pagination everywhere.
- Set request timeouts.

### 9.5 Transport and headers

- HTTPS everywhere, HSTS with preload-ready settings, secure cookies.
- Helmet with a strict **Content-Security-Policy** (no inline scripts), `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, `Permissions-Policy`, frame protection.
- CORS only for the known front-end origin; no wildcard.

### 9.6 Database security

- Separate roles (owner, app, read-only); the app role cannot change the schema or drop tables.
- PostgreSQL accepts connections only from the app network; SSL required where the database is remote.
- `audit_logs` is append-only for the app role.
- Foreign keys, CHECK and UNIQUE constraints stay on; never disable them.
- Encrypt backups; test restores.

### 9.7 Data protection and privacy

- Households are identified by **coded IDs** (e.g. HH-07). Do not collect names, phone numbers, national ID or addresses unless the project explicitly needs them. If they are added later, encrypt those columns and restrict them to Admin.
- Collect only what is needed. Define a retention rule in `docs/SECURITY.md`.
- Data is owned by the commissioning organisation; never send it to third-party services, analytics or error trackers without written approval.
- Exports: role-checked, audited, row-limited, and protected from spreadsheet formula injection.

### 9.8 Offline and device security

- Cache only what is needed: app shell and non-sensitive reference data. **Do not cache authenticated API responses** except the reference lists. Clear the local database and caches on logout or when the account is deactivated at next sync.
- The outbox holds form data with coded IDs only. Warn users to use a screen lock; sign out automatically after a period of inactivity (for example 30 minutes online).
- Sync requests are authenticated and validated exactly like normal requests; the server never trusts the device's role, kitchen or user ID.

### 9.9 Secrets, dependencies and supply chain

- All secrets in environment variables or a secrets manager; **rotate** secrets on handover and on staff changes; separate secrets per environment.
- `npm ci` with a lockfile; `npm audit`, Dependabot or Renovate; remove unused packages; no packages from unknown authors.
- Run containers with minimal images; scan images (Trivy) in CI.

### 9.10 Logging, audit and monitoring

- Logs are structured and never contain passwords, tokens or full personal data.
- Audit trail records: who, what, when, table, record, old and new values (JSON), and the reason for corrections. Log logins, failed logins, exports, role changes, user deactivation and conflict resolutions.
- Alert on repeated failed logins, unusual export volume, and server errors.

### 9.11 Security testing (part of Phase 8 and CI)

- Automated tests: 401 without token, 403 wrong role, cross-kitchen blocked, lockout works, refresh reuse is detected, validation rejects bad data, CSV injection is neutralised, rate limits trigger, Viewer sees no personal identifiers.
- Tools: `eslint-plugin-security`, `npm audit`, Trivy, OWASP ZAP baseline scan, a manual review against the OWASP Top 10 and ASVS Level 2 checklist.
- Write `docs/SECURITY.md` with the final checklist and any accepted risks.

## 10. Environment variables (put in `.env.example`, no real values)

```
NODE_ENV=development
PORT=4000
DATABASE_URL=postgres://spcki_app:CHANGE_ME@localhost:5432/spcki
DATABASE_SSL=false
JWT_ACCESS_SECRET=CHANGE_ME_LONG_RANDOM
JWT_REFRESH_SECRET=CHANGE_ME_LONG_RANDOM
ACCESS_TOKEN_MINUTES=15
REFRESH_TOKEN_DAYS=7
CORS_ORIGIN=http://localhost:5173
COOKIE_DOMAIN=localhost
LOG_LEVEL=info
BACKUP_DIR=/backups
BACKUP_ENCRYPTION_KEY=CHANGE_ME
```

## 11. Final acceptance checklist (you must show evidence for each)

1. A fresh server builds and starts with one command; migrations and seeds work.
2. Sample data loads and the KPI numbers match the sample workbook.
3. All four forms work on a phone screen, validate properly, and calculate duration, fuel used, minutes per person and size band.
4. Offline entry, later sync, duplicate protection and conflict handling all work (Playwright proof).
5. Slot generation assigns 16 households fairly; swaps and status changes are audited.
6. Dashboard shows all indicator cards and 14 charts with working filters.
7. Family size analysis and solar expected, efficiency and waste are correct.
8. Exports (Excel, CSV, PDF) match the screen and are safe from formula injection.
9. Roles behave exactly as in the role table; cross-kitchen access is impossible; Viewer sees only coded IDs.
10. Every item in section 9 is implemented and has a test or a documented check.
11. Backups run nightly, are encrypted, stored off-server, and a restore test passed.
12. HTTPS, HSTS and security headers are in place; ZAP baseline shows no high findings.
13. Documentation is complete: user guide, admin guide, runbook, API docs, system documentation with diagrams, data dictionary, `SECURITY.md`, `ASSUMPTIONS.md`.
14. Handover checklist is complete and secrets have been rotated.

Start with **Phase 0** now. When it is finished, show me the results and wait for my approval before starting Phase 1.
