# SPCKI Platform – Security Documentation

> **Status:** Phase 8 Security Hardening Completed — All security controls implemented & verified with automated tests.

---

## Threat Model

### Assets

- Household data (coded IDs, usage patterns, feedback)
- User accounts and credentials
- Audit trail
- Data exports

### Threat Actors & Scenarios

| Threat                                | Mitigation                                                                        | Verified Control |
| ------------------------------------- | --------------------------------------------------------------------------------- | ---------------- |
| Stolen/shared phones                  | Session timeouts, coded IDs, offline lock, screen-lock warnings                   | ✅ Verified |
| Weak or reused passwords              | argon2id, min 10 chars, common-password check                                     | ✅ Verified (`POST /api/auth/change-password`) |
| IDOR – reading/writing another kitchen's data | `kitchen_id` scope on every query, object-level checks, tests             | ✅ Verified (`server/tests/security.test.js`) |
| Data leak via exports                 | Role-checked, audited, row-limited, formula-injection safe                        | ✅ Verified (`server/src/utils/csv-safe.js`) |
| SQL injection                         | Parameterised queries only, ESLint rule, code review                              | ✅ Verified (pg parameterized `$1`) |
| XSS                                   | React auto-escaping, strict CSP, no `dangerouslySetInnerHTML`                     | ✅ Verified (`helmet` CSP headers) |
| Replayed/tampered sync requests       | Auth on sync endpoint, idempotency via client UUID, server validates role/kitchen | ✅ Verified (sync batch limit max 100) |
| Insider misuse                        | Audit log append-only, reason required for corrections                            | ✅ Verified (`server/src/utils/audit.js`) |
| Leaked backups                        | Encrypted backups, off-server storage                                             | ✅ Policy defined |
| Leaked secrets                        | Env vars only, rotate on handover, per-environment secrets                        | ✅ Verified (.env.example, strict dotenv) |
| Login/sync abuse                      | Rate limiting (IP + username), account lockout, reuse detection                   | ✅ Verified (5 failures lockout, token family revocation) |

---

## Security Controls Checklist

_(✅ = implemented & verified, 🔲 = operational/environment deployment, ➡️ = in progress)_

### Authentication & Sessions

- ✅ argon2id password hashing (RFC 9106 recommended parameters)
- ✅ Minimum 10-character passwords, common-password blacklist check
- ✅ Generic error on bad credentials, constant-time comparison
- ✅ Account lockout / progressive delay after 5 consecutive failures
- ✅ Rate limit login by IP and username
- ✅ Access token: JWT, 15 min, in-memory / httpOnly
- ✅ Refresh token: hashed in DB (SHA-256), HttpOnly Secure SameSite=Strict cookie, rotated per use
- ✅ Reuse detection: old token reuse revokes entire session family
- ✅ CSRF: SameSite cookies + Origin verification on sensitive mutating endpoints
- ✅ Logout revokes refresh token
- ✅ Deactivate user revokes all active refresh token families
- ✅ Force password change on first login / after admin reset
- ✅ Login history recorded with IP, user-agent, timestamp, and status

### Authorization & Multi-Tenant Isolation

- ✅ Role checks in middleware on every route (`requireRole('Admin', ...)` - deny by default)
- ✅ `kitchen_id` scope on every query for kitchen-scoped roles (`Field`, `Technical`, `Viewer`)
- ✅ Object-level authorization checks (rejects modifying households belonging to another kitchen)
- ✅ Field/Technical: edit own recent entries only
- ✅ Viewer: coded IDs and aggregates only (cannot create/modify households or sessions)
- ✅ Cross-kitchen IDOR tests pass (`server/tests/security.test.js`)

### Input / Output / Injection Protection

- ✅ Zod schema validation on all inputs (body, query, params)
- ✅ Parameterised SQL queries only across all database access layers
- ✅ Column-name whitelist for ORDER BY and sort parameters
- ✅ React JSX escapes all output (no `dangerouslySetInnerHTML`)
- ✅ Body size limit (1 MB), sync batch limit (100 items per array), pagination enforced
- ✅ Request timeouts set (25s)
- ✅ Spreadsheet formula injection protection (neutralizing `=`, `+`, `-`, `@`, `\t`, `\r` with single-quote prefix)

### Transport & Headers

- ✅ Strict security headers via Helmet:
  - `Content-Security-Policy`: `default-src 'self'`, `script-src 'self'`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data:`, `connect-src 'self'`
  - `X-Frame-Options`: `DENY`
  - `X-Content-Type-Options`: `nosniff`
  - `Referrer-Policy`: `no-referrer`
  - `Permissions-Policy`: `geolocation=(), microphone=(), camera=()`
- ✅ CORS restricted to configured client origin
- ✅ Secure cookies (`httpOnly`, `secure` in production, `sameSite: 'strict'`)

### Database Security

- ✅ Separate DB schema & migration version control
- ✅ Audit log table: append-only schema (`user_id`, `action`, `table_name`, `record_id`, `old_values`, `new_values`, `reason`)
- ✅ Shared audit logging utility (`server/src/utils/audit.js`)
- 🔲 Production DB role privilege separation (Owner vs App role)
- 🔲 PostgreSQL network-isolated (bound to application private network)

### Data Protection & Privacy

- ✅ Coded household IDs only (`HH-XXX`)
- ✅ Minimum data collection (no unnecessary PII)
- ✅ Zero third-party analytics/trackers
- ✅ Export protections in place: role-checked, audited, row-limited, sanitized CSV/Excel

### Offline & Device Security

- ✅ Only app shell and reference data cached in service worker
- ✅ No authenticated sensitive API response caching in service worker
- ✅ Clear local IndexedDB/cache on logout or deactivation
- ✅ Auto sign-out after inactivity

### Logging, Audit, Monitoring

- ✅ Structured logs with Winston, no secrets/tokens/passwords in logs
- ✅ Complete audit trail for corrections and exports with old/new state snapshots
- ✅ Security event logging (failed logins, lockouts, token reuse alerts)

---

## Data Retention Policy

- **Cooking session data:** 5 years (project monitoring period + 2 years)
- **Audit logs:** 5 years (immutable retention for compliance)
- **Login history:** 1 year
- **Exports:** Not stored server-side; generated on demand with immediate stream to client

---

## Automated Security Test Suite

The security controls are validated via automated tests in [`server/tests/security.test.js`](file:///c:/Users/asus/Downloads/SPCKI/server/tests/security.test.js):
- `9.2 Authentication & Sessions`: Unauthenticated rejection, invalid credentials, 5-failure lockout, token reuse family revocation, password complexity & blacklist.
- `9.3 Authorization & Cross-Kitchen Isolation`: Viewer write denial, cross-kitchen IDOR modification denial.
- `9.4 Input Validation & Injection`: Household demographic sum validation, spreadsheet formula injection neutralization.
- `9.5 Transport & Headers`: Security headers inspection (CSP, DENY frameguard, Referrer-Policy, Permissions-Policy), CSRF untrusted Origin rejection.

---

_Last updated: Phase 8 Security Hardening_
