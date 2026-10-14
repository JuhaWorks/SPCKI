# SPCKI PERN Stack Platform

**Solar Powered Community Kitchen Initiative (SPCKI)**  
Digital Monitoring Platform built with PostgreSQL, Express.js, React, and Node.js.

---

## 📁 Directory Structure

```
pern/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── api/            # Axios API clients & interceptors
│   │   ├── components/     # Shared UI components
│   │   ├── features/       # Feature modules (Dashboard, Kitchens, Sessions, Logs, etc.)
│   │   ├── offline/        # Offline queue, Dexie/IndexedDB storage
│   │   ├── App.jsx         # Root router & layout
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js      # Vite configuration & PWA service worker
│
├── server/                 # Express.js backend API
│   ├── src/
│   │   ├── db/             # PostgreSQL connection pool, migrations, and seeds
│   │   ├── middleware/     # Authentication, role RBAC, security headers, error handling
│   │   ├── routes/         # REST API endpoints (auth, kitchens, sessions, logs, dashboard)
│   │   ├── utils/          # JWT tokens, KPI formulas, encryption
│   │   ├── app.js          # Express app definition
│   │   └── server.js       # HTTP server bootstrap
│   ├── tests/              # Vitest unit and integration test suites
│   ├── package.json
│   └── vitest.config.js
│
├── deploy/                 # Deployment infrastructure
│   ├── backup/             # Database backup automation
│   ├── environments/       # Environment configs (dev, staging, prod)
│   └── nginx/              # Nginx reverse proxy configs
│
├── docs/                   # System design, runbooks & database specifications
│   ├── ASSUMPTIONS.md
│   ├── RUNBOOK.md
│   ├── SECURITY.md
│   ├── SPCKI_System_Report.md
│   └── spcki_schema.sql    # Clean PostgreSQL reference schema
│
├── package.json            # Monorepo workspace configuration (client + server)
└── .env                    # Environment configuration
```

---

## 🛠️ Setup & Running

### Prerequisites
- Node.js >= 20.0.0
- PostgreSQL >= 14
- npm >= 9.0.0

### Environment Configuration
Copy `.env.example` to `.env` and fill in the PostgreSQL connection details and JWT secrets:
```bash
cp .env.example .env
```

### Run Migrations & Seeds
```bash
npm run migrate --workspace=server
npm run seed --workspace=server
```

### Start Development Servers
```bash
# Starts backend on http://localhost:3000 and client on http://localhost:5173
npm run dev
```

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```
