# SPCKI Digital Monitoring Platform – PERN Stack

**Solar Powered Community Kitchen Initiative (SPCKI)**  
Beximco Solar-Powered Communal Kitchen Monitoring & Governance System

---

## 🏗️ Project Architecture

```
SPCKI/
├── client/                           # React 19 + Vite + TailwindCSS + PWA frontend
│   ├── src/
│   │   ├── api/                      # Axios HTTP client & API services
│   │   ├── components/               # Shared UI & navigation layout
│   │   ├── features/                 # Domain modules (Dashboard, Kitchens, Sessions, Logs)
│   │   ├── offline/                  # Offline-first queue & IndexedDB sync engine
│   │   ├── App.jsx                   # Application root & routing
│   │   └── main.jsx                  # Client entry point
│   ├── package.json
│   └── vite.config.js                # Vite build & Service Worker PWA config
│
├── server/                           # Express.js + PostgreSQL backend API
│   ├── src/
│   │   ├── db/                       # Connection pool, migrations, and seeds
│   │   ├── middleware/               # JWT auth, role RBAC, CSRF, security headers
│   │   ├── routes/                   # REST API endpoints (auth, kitchens, sessions, logs, dashboard)
│   │   ├── utils/                    # KPI formulas, tokens, audit logging
│   │   ├── app.js                    # Express app definition
│   │   └── server.js                 # HTTP server bootstrap
│   ├── tests/                        # Vitest unit, API, and security test suites
│   ├── package.json
│   └── vitest.config.js
│
├── deploy/                           # Deployment infrastructure
│   ├── backup/                       # Automated database backups
│   ├── environments/                 # Environment configs (dev, staging, prod)
│   └── nginx/                        # Reverse proxy configs
│
├── docs/                             # Specifications & PostgreSQL reference schema
│   ├── ASSUMPTIONS.md
│   ├── RUNBOOK.md
│   ├── SECURITY.md
│   ├── SPCKI_System_Report.md
│   └── spcki_schema.sql              # PostgreSQL reference schema
│
├── spcki_schema.sql                  # Clean PostgreSQL master DDL
├── .github/                          # GitHub Actions CI/CD workflows
├── package.json                      # Root workspace monorepo definition
├── package-lock.json
└── README.md                         # Documentation
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** >= 20.0.0
- **PostgreSQL** >= 14
- **npm** >= 9.0.0

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure your credentials:
```bash
cp .env.example .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Migrations & Seeds
```bash
npm run migrate --workspace=server
npm run seed --workspace=server
```

### 5. Running the Application
Run both backend API and frontend client concurrently:
```bash
npm run dev
```
- **Backend API**: `http://localhost:3000`
- **Frontend Client**: `http://localhost:5173`

---

## 🧪 Testing & Quality Assurance

All test suites and linting are automated:

```bash
# Run unit, integration, and security tests
npm test

# Run code style & security linting
npm run lint

# Build production client bundle
npm run build
```

---

## 🔒 Security Architecture
- **JWT Authentication**: Short-lived access tokens with rotating refresh tokens and automatic family revocation upon reuse.
- **RBAC**: Role-based access control protecting all administrative endpoints.
- **Defense in Depth**: Parameterized queries, CSRF validation, Content Security Policy (CSP), rate limiting, and password hashing with Argon2id.
