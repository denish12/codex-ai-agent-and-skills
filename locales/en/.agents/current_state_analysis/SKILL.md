---
name: current_state_analysis
description: Analysis of the current repository architecture ? conventions, patterns, tech debt, scaling bottlenecks, security risks, and consistency.
---

#Skill: Current State Analysis

System audit of the existing code before starting a new task.

**Sections:**
1. [When to use](#1-when-to-use)
2. [Audit algorithm](#2-audit-algorithm)
3. [What to search for (checklist)](#3-what-to-search-for)
4. [Severity levels](#4-severity)
5. [Output Template](#5-output-template)
6. [Example analysis](#6-example)

---

## 1. When use

- The project already exists / there is a repository with code
- Before the ARCH gate (new feature, refactoring, migration)
- There are legacy or partially implemented features
- The team wants to understand the current state before planning

---

## 2. Algorithm

```
1. Structure overview (5 min)
   ├── list_dir → root, src/, packages/
   ├── package.json → deps, scripts, engines
   ??? Docker files ? services, ports, volumes
   └── Config files → .env.example, tsconfig, biome, vitest

2. Pattern identification (10 min)
   ├── FE: framework, state management, routing, styling
   ├── BE: framework, layers (router/controller/service/repo), middleware
   ├── Data: ORM/ODM, schema strategy, migrations
   └── Infra: CI/CD, Docker, reverse proxy, certs

3. Search for bottlenecks (10 min)
   ├── grep_search → console.log, TODO, FIXME, HACK, XXX
   ├── grep_search → hardcoded secrets, passwords, API keys
   ├── grep_search → any, eslint-disable, @ts-ignore
   ├── find_by_name → *.test.*, *.spec.* (coverage)
   └── Manual check → N+1, god objects, tight coupling

4. Recording findings (5 min)
   ??? Fill in the Output Template (section 5)

5. Form recommendations
   └── Quick wins (< 1h) vs Strategic (> 1 sprint)
```

---

## 3. What search

### Structure and conventions

| What check | How | Red flag |
|--------------|-----|----------|
| Layers (FE/BE) | `list_dir` src/ | No clear separation |
| Naming | Files, variables, exports | Mixed styles (camelCase + snake_case) |
| JSDoc | `grep_search` `@param` | No documentation functions |
| Imports | Absolute vs relative | `../../../` ? deep nesting |
| Config | `.env.example`, schema validation | No validation env vars |

### Technical debt

| What search | Grep pattern | Severity |
|-----------|-------------|----------|
| `console.log` in production | `console.log` (excluding tests) | P1 |
| TODO/FIXME | `TODO\|FIXME\|HACK\|XXX` | P1-P2 |
| Hardcoded secrets | `password.*=\|secret.*=\|apiKey.*=` | 🔴 P0 |
| Disabled linting | `eslint-disable\|@ts-ignore\|biome-ignore` | P1 |
| `any` types | `:\s*any` (in .ts files) | P1 |
| Missing error handling | `catch\s*\(\s*\)` (empty catch) | P1 |
| Outdated deps | `npm outdated` / `npm audit` | P1-P2 |
| Dead code | Unused exports, unreachable branches | P2 |

### Performance

| What search | Where | Red flag |
|-----------|-----|----------|
| N+1 queries | Loops with DB calls inside | 🔴 P0 |
| Missing indexes | Schema definitions | P0-P1 |
| No `.lean()` | Mongoose queries in API responses | P1 |
| No `.select()` | Full document fetch for list endpoints | P1 |
| `skip()` pagination | Large collections | P1 |
| Sync heavy ops | Main thread blocking | P0 |

### Security

| What search | How | Severity |
|-----------|-----|----------|
| NoSQL injection | `Model.find(req.query)` | 🔴 P0 |
| XSS | `dangerouslySetInnerHTML` without sanitize | 🔴 P0 |
| Secrets in code | `grep_search` API keys, tokens | 🔴 P0 |
| No Helmet | Express without `helmet()` | P1 |
| No CORS whitelist | `cors({ origin: '*' })` | P1 |
| No rate limiting | Public endpoints without throttle | P1 |

---

## 4. Severity

| Level | Description | Action |
|-------|---------|----------|
| 🔴 **P0** | Blocker: security vulnerability, data loss risk, broken core flow | Fix to release |
| ?? **P1** | Important: tech debt, missing validation, no tests, performance risk | Plan in the current sprint |
| 🟡 **P2** | Improvement: code style, naming, dead code, minor optimizations | Backlog |

---

## 5. Output Template

```markdown
# Current State Analysis: <project-name>

**Date:** YYYY-MM-DD
**Analyst:** Architect Agent
**Scope:** <what analysis>

## Summary
<1-2 paragraphs: what it means for the project, key technologies, current status>

## Stack
| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.x |
| Backend | Express | 4.x |
| Database | MongoDB + Mongoose | 7.x |
| Infra | Docker + Caddy | ... |

## Conventions (detected patterns)
- **Naming:** camelCase for files, PascalCase for components
- **Layers:** router → controller → service → repository
- **State:** Zustand / context
- **Styling:** CSS Modules / Tailwind
- **Testing:** Vitest + RTL

## Technical Debt

| # | Finding | Severity | Location | Recommendation |
|---|---------|----------|----------|----------------|
| 1 | No input validation on API endpoints | 🔴 P0 | `api/routes/*.js` | Add Zod schemas |
| 2 | console.log in production code | 🟠 P1 | 12 files | Replace with pino logger |
| 3 | No JSDoc on service functions | 🟡 P2 | `api/services/` | Add JSDoc blocks |

## Scalability Limits
- <concrete bottlenecks: no indexes, sync ops, no cache, etc.>

## Security Notes
- <hardcoded secrets, no CORS, injection risks, etc.>

## Recommendations

### Quick Wins (< 1 hour each)
1. Add Helmet middleware
2. Add .env validation (Zod)
3. Replace console.log with pino

### Strategic (requires planning)
1. ARCH-xx: Implement input validation layer
2. ARCH-xx: Add integration tests for critical paths
3. ARCH-xx: Set up CI pipeline

## Next Actions
- [ ] ARCH-01: <description>
- [ ] ARCH-02: <description>
```

---

## 6. Example analysis (fragment)

```markdown
# Current State Analysis: Smart Cart Rescue

**Date:** 2025-12-01
**Scope:** Full repository audit

## Summary
Wix Self-Hosted App with Dashboard (React 18 + Vite) and API (Express 4).
Embedded Script shows a popup on Wix sites.
Monorepo with Docker Compose + Caddy gateway.

## Technical Debt

| # | Finding | Severity | Location | Recommendation |
|---|---------|----------|----------|----------------|
| 1 | Widget payload hardcoded in script | 🔴 P0 | `widget/embedded-script.js` | Fetch from API |
| 2 | No error boundaries in React | 🟠 P1 | Dashboard components | Add ErrorBoundary wrapper |
| 3 | Mixed import styles (CJS + ESM) | 🟡 P2 | API server files | Migrate to ESM |

## Scalability Limits
- No DB indexes on `settings.appInstanceId` (collection scan on every widget request)
- Embedded script fetches config on every page load (no caching)

## Quick Wins
1. Add compound index `{ appInstanceId: 1 }` on settings collection
2. Add `Cache-Control` header to widget endpoint
3. Add Helmet to Express app
```

---

## Deliverables

| Artifact | Format | Where to store |
|---------|--------|---------------|
| Current State Analysis | Markdown (output template above) | `docs/architecture/current-state-analysis.md` |
| Tech Debt backlog | ARCH-xx items | `docs/architecture/tech-debt.md` or tasks in backlog |

---

## See also
- `$system_design_checklist` — checklist for new design
- `$architecture_doc` — full Architecture Document
- `$security_baseline_dev` — detail check security
- `$observability_logging` — observability
