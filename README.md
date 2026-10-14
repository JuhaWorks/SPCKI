# SPCKI Digital Monitoring Platform

**Smart Solar Powered Communal Kitchen Initiative (SPCKI)**  
Beximco Solar-Powered Communal Kitchen Monitoring & Governance System

---

## 🏗️ Project Architecture

This repository is organized into two completely separated, self-contained sub-systems to maintain a pristine directory structure:

```
SPCKI/
├── pern/                   # 🌐 PERN Stack Web Application
│   ├── client/             # React + Vite + TailwindCSS + PWA frontend
│   ├── server/             # Express.js + PostgreSQL API backend & business rules
│   ├── deploy/             # Docker, Nginx, and deployment configurations
│   ├── docs/               # System reports, runbooks, and PostgreSQL schema
│   ├── package.json        # Dedicated PERN workspace orchestrator
│   └── .env                # PERN environment variables
│
├── oracle-apex/            # 🏛️ Oracle 19c & APEX Platform
│   ├── spcki_all_plsql_packages.sql  # Master Oracle 19c PL/SQL packages & triggers
│   ├── spcki_oracle_apex_schema.sql  # Complete Oracle DDL schema
│   ├── app100_export.sql             # Oracle APEX 20.1/24.2 App 100 export
│   ├── server.cjs                    # Oracle Database & APEX MCP Server
│   ├── oracle-cli.cjs                # Interactive Oracle SQL CLI & REPL
│   ├── deploy-*.cjs                  # Automation & deployment scripts
│   └── package.json                  # Oracle toolchain dependencies
│
├── .agents/                # Antigravity IDE agent configuration & MCP integration
├── .github/                # GitHub Actions CI/CD workflows
├── package.json            # Top-level workspace script proxy
└── README.md               # Repository documentation
```

---

## 🚀 Quick Start

### 1. PERN Stack (PostgreSQL · Express · React · Node.js)

To run the web application locally:

```bash
# Navigate to the PERN directory
cd pern

# Install dependencies (if not already installed)
npm install

# Start both backend API (port 3000) and frontend client (port 5173)
npm run dev

# Run unit and integration tests
npm test

# Run linter
npm run lint
```

*Or run directly from repository root via proxy commands:*
```bash
npm run pern:dev
npm run pern:test
```

---

### 2. Oracle 19c & Oracle APEX

The `oracle-apex/` directory contains all Oracle 19c Enterprise Edition database assets, PL/SQL packages, and the APEX application suite:

```bash
# Navigate to Oracle APEX directory
cd oracle-apex

# Test database connection
npm test

# Check system status
npm run status

# Launch interactive SQL REPL
npm run cli

# Re-compile master PL/SQL packages
npm run compile:plsql
```

#### Oracle MCP Server (Antigravity Integration)
The Oracle MCP server exposes database inspection, APEX metadata, and PL/SQL execution tools directly to Antigravity IDE:
```bash
node oracle-apex/server.cjs
```
Configured in: `.agents/mcp_config.json` & `~/.gemini/config/mcp_config.json`.

---

## 📋 Technology Stacks Summary

| Component | PERN Stack (`pern/`) | Oracle APEX Stack (`oracle-apex/`) |
| :--- | :--- | :--- |
| **Database** | PostgreSQL 16+ | Oracle 19c Enterprise Edition |
| **Backend** | Express.js / Node.js 20+ | PL/SQL Packages (`SPCKI_KPI_PKG`, `SPCKI_OPS_PKG`, `SPCKI_AUTH_PKG`) |
| **Frontend UI** | React 19 + Vite (Offline PWA) | Oracle APEX 20.1 / 24.2 (App 100) |
| **Styling** | Modern TailwindCSS / Custom Design | APEX Universal Theme (Theme 42) + Custom CSS |
| **Testing** | Vitest + Coverage | Oracle validation & compilation suites |
| **CI/CD** | GitHub Actions (`.github/workflows/ci.yml`) | Automated JS/PL/SQL deployment scripts |
