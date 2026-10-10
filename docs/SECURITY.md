# SPCKI Platform – Security Documentation

> **Status:** Work in progress — updated at each phase.

---

## Threat Model

### Assets

- Household data (coded IDs, usage patterns, feedback)
- User accounts and credentials
- Audit trail
- Data exports

### Threat Actors & Scenarios

| Threat                                | Mitigation                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Stolen/shared phones                  | Session timeouts, coded IDs, offline lock, screen-lock warnings                   |
| Weak or reused passwords              | argon2id, min 10 chars, common-password check                                     |
| IDOR – reading another kitchen's data | `kitchen_id` scope on every query, object-level checks, tests                     |
| Data leak via exports                 | Role-checked, audited, row-limited, formula-injection safe                        |
| SQL injection                         | Parameterised queries only, ESLint rule, code review                              |
| XSS                                   | React auto-escaping, strict CSP, no `dangerouslySetInnerHTML`                     |
| Replayed/tampered sync requests       | Auth on sync endpoint, idempotency via client UUID, server validates role/kitchen |
| Insider misuse                        | Audit log append-only, reason required for corrections                            |
| Leaked backups                        | Encrypted backups, off-server storage                                             |
| Leaked secrets                        | Env vars only, rotate on handover, per-environment secrets                        |
| Login/sync abuse                      | Rate limiting (IP + username), account lockout, reuse detection                   |

---

## Security Controls Checklist

_(✅ = implemented, 🔲 = pending, ➡️ = in progress)_

### Authentication & Sessions

- 🔲 argon2id password hashing
- 🔲 Minimum 10-character passwords, common-password check
- 🔲 Generic error on bad credentials, constant-time comparison
- 🔲 Account lockout / progressive delay after 5 failures
- 🔲 Rate limit login by IP and username
- 🔲 Access token: JWT, 15 min, in-memory only
- 🔲 Refresh token: hashed in DB, HttpOnly Secure SameSite=Strict cookie, rotated per use
- 🔲 Reuse detection: old token reuse revokes entire session family
- 🔲 CSRF: SameSite + custom header + Origin check
- 🔲 Logout revokes refresh token
- 🔲 Deactivate user revokes all sessions
- 🔲 Force password change on first login / after admin reset
- 🔲 Login history recorded

### Authorization

- 🔲 Role checks in middleware on every route (deny by default)
- 🔲 `kitchen_id` scope on every query
- 🔲 Object-level checks (record belongs to kitchen)
- 🔲 Field/Technical: edit own recent entries only
- 🔲 Viewer: coded IDs and aggregates only
- 🔲 Cross-kitchen tests pass

### Input / Output / Injection

- 🔲 Zod validation on all inputs (body, query, params)
- 🔲 Parameterised SQL only
- 🔲 Column-name whitelist for ORDER BY
- 🔲 React escapes all output
- 🔲 Body size limit (1 MB), sync batch limit (100 items), pagination
- 🔲 Request timeouts set

### Transport & Headers

- 🔲 HTTPS everywhere, HSTS with preload-ready settings
- 🔲 Helmet with strict CSP
- 🔲 CORS restricted to known origin
- 🔲 Secure cookies

### Database Security

- 🔲 Separate DB roles (owner, app, readonly)
- 🔲 App role: no DDL
- 🔲 audit_logs: INSERT + SELECT only for app role
- 🔲 PostgreSQL only accessible from app network
- 🔲 Backups encrypted and restore-tested

### Data Protection & Privacy

- 🔲 Coded household IDs only
- 🔲 Minimum data collection
- 🔲 No third-party analytics/trackers without written approval
- 🔲 Export protections in place

### Offline & Device Security

- 🔲 Only app shell and reference data cached
- 🔲 No authenticated API response caching
- 🔲 Clear local DB/cache on logout or deactivation
- 🔲 Auto sign-out after inactivity (30 min)

### Secrets, Dependencies, Supply Chain

- 🔲 All secrets in env vars
- 🔲 npm ci with lockfile
- 🔲 npm audit passing (no high/critical)
- 🔲 Trivy image scan in CI
- 🔲 Dependabot configured

### Logging, Audit, Monitoring

- 🔲 Structured logs, no secrets/tokens/PII in logs
- 🔲 Audit trail: who, what, when, old+new values, reason
- 🔲 Alerts: failed logins, unusual exports, server errors

---

## Data Retention

- Cooking session data: 5 years (project monitoring period + 2 years)
- Audit logs: 5 years
- Login history: 1 year
- Exports: not stored server-side; generated on demand

---

## Accepted Risks

_(None at this stage — to be updated as needed)_

---

_Last updated: Phase 0_
