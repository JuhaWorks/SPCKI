# SPCKI Platform – Runbook

> **Status:** Skeleton – to be filled during Phase 10 (Deployment).

---

## Quick Start (Development)

```bash
# 1. Clone the repository
git clone <repo-url>
cd spcki

# 2. Install dependencies
npm install

# 3. Copy environment file and fill in values
cp .env.example .env
# Edit .env with real values

# 4. Start both server and client
npm run dev
```

---

## Quick Start (Production – Docker)

```bash
# To be completed in Phase 10
docker compose up -d
```

---

## Database

### Run Migrations

```bash
# To be completed in Phase 1
npm run migrate --workspace=server
```

### Load Demo Seed

```bash
npm run seed:demo --workspace=server
```

---

## Operations

### Rotating Secrets

_(To be documented in Phase 10)_

### Adding a New Kitchen

_(To be documented in Phase 10)_

### Adding a New User

_(To be documented in Phase 10)_

### Troubleshooting Sync

_(To be documented in Phase 7/10)_

---

## Backup & Restore

_(To be documented in Phase 10)_

---

_Last updated: Phase 0_
