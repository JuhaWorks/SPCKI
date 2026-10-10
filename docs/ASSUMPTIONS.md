# SPCKI Platform – Assumptions Log

All assumptions made during development are recorded here. Anything not explicitly stated in the build prompt will be listed here with a justification.

---

## Phase 0 – Foundation

| #     | Assumption                                                                     | Justification                                                 |
| ----- | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| A-001 | Project root is the SPCKI directory containing the docs files                  | No separate repo was created; existing files moved to `docs/` |
| A-002 | Node.js v24 LTS is used (v20 LTS is stated in prompt; v24 is what's available) | Using what's installed; behaviour is backward-compatible      |
| A-003 | Windows PowerShell is the shell for development; CI uses Ubuntu                | Developer machine is Windows; CI standard Linux               |
| A-004 | `npm` workspaces are used to manage server and client from the root            | Allows a single `npm install` and root-level scripts          |
| A-005 | Husky + lint-staged used for pre-commit hooks                                  | Industry standard, specified in the build prompt              |
| A-006 | ESLint v9 flat config format used                                              | ESLint v9 is the current standard                             |

---

## Phase 1 – Database

_(to be filled when Phase 1 begins)_

---

## Phase 2 – Backend Core

_(to be filled when Phase 2 begins)_

---

_Last updated: Phase 0_
