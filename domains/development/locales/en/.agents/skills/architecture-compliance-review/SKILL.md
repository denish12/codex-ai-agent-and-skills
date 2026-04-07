---
name: architecture-compliance-review
description: Code compliance review against architecture/ADR — module boundaries, layers, dependencies, conventions, red flags.
---

# Skill: Architecture Compliance Review

Review for compliance with the architectural document and ADRs.

**Sections:**
1. [Expected Architecture](#1-expected)
2. [Checklist](#2-checklist)
3. [Automated Detection](#3-detection)
4. [Red Flags](#4-red-flags)
5. [Output Template](#5-output)

---

## 1. Expected Architecture

### Layer Architecture (Node.js / Express)

```
┌──────────────────────────┐
│        Routes            │  ← HTTP routing only, no logic
├──────────────────────────┤
│      Middleware           │  ← Auth, validation (Zod), logging
├──────────────────────────┤
│      Controllers          │  ← Request/response handling, HTTP concerns
├──────────────────────────┤
│       Services            │  ← Business logic, orchestration
├──────────────────────────┤
│     Repositories          │  ← Data access (Mongoose), queries
├──────────────────────────┤
│        Models             │  ← Schema definitions
└──────────────────────────┘
```

### Dependency rules

| Layer | Can depend on | MUST NOT depend on |
|-------|--------------|-------------------|
| Routes | Controllers, Middleware | Services, Repos, Models |
| Middleware | (standalone) | Services, Repos |
| Controllers | Services | Repos, Models directly |
| Services | Repos, other Services | `req`, `res`, HTTP concerns |
| Repos | Models | `req`, `res`, `next`, Services |
| Models | (standalone) | Anything above |

### Frontend Architecture (React)

```
┌──────────────────────────┐
│        Pages              │  ← Route-level components
├──────────────────────────┤
│      Components           │  ← UI building blocks (presentational)
├──────────────────────────┤
│        Hooks              │  ← State/logic encapsulation
├──────────────────────────┤
│       Services/API        │  ← HTTP calls to backend
├──────────────────────────┤
│        Store              │  ← Global state (Zustand/RTK)
└──────────────────────────┘
```

---

## 2. Checklist

### 2.1 Layer Boundaries

| # | Check | Severity | Status |
|---|-------|----------|--------|
| ARCH-01 | No DB calls (Mongoose) in routes or controllers | 🔴 P0 | ☐ |
| ARCH-02 | No `req`/`res` objects in services | 🔴 P0 | ☐ |
| ARCH-03 | No business logic in routes (only routing) | 🟠 P1 | ☐ |
| ARCH-04 | Controllers delegate to services (no direct repo calls) | 🟠 P1 | ☐ |
| ARCH-05 | Models are standalone (no imports from layers above) | 🟠 P1 | ☐ |

### 2.2 Module Boundaries

| # | Check | Severity | Status |
|---|-------|----------|--------|
| ARCH-06 | Service A doesn't import internals of Service B | 🟠 P1 | ☐ |
| ARCH-07 | No circular dependencies between modules | 🔴 P0 | ☐ |
| ARCH-08 | Shared code is in `utils/` or `common/`, not copy-pasted | 🟠 P1 | ☐ |
| ARCH-09 | Feature modules have clear public API (index exports) | 🟡 P2 | ☐ |

### 2.3 Code Size & Complexity

| # | Check | Severity | Status |
|---|-------|----------|--------|
| ARCH-10 | File < 500 lines (God Object indicator) | 🟠 P1 | ☐ |
| ARCH-11 | Function < 40 lines (complexity indicator) | 🟠 P1 | ☐ |
| ARCH-12 | Class/module < 10 public methods | 🟡 P2 | ☐ |
| ARCH-13 | Cyclomatic complexity reasonable (no deeply nested if/else) | 🟠 P1 | ☐ |

### 2.4 ADR Compliance

| # | Check | Severity | Status |
|---|-------|----------|--------|
| ARCH-14 | Code follows existing ADR decisions | 🔴 P0 | ☐ |
| ARCH-15 | New patterns/libraries → ADR created | 🟠 P1 | ☐ |
| ARCH-16 | DB schema changes → ADR if significant | 🟠 P1 | ☐ |
| ARCH-17 | Integration changes → ADR created | 🟠 P1 | ☐ |

### 2.5 Naming Conventions

| # | Check | Severity | Status |
|---|-------|----------|--------|
| ARCH-18 | Files follow naming convention (`camelCase.js` or `kebab-case.js`) | 🟡 P2 | ☐ |
| ARCH-19 | Exports match file purpose (not mixed responsibilities) | 🟠 P1 | ☐ |
| ARCH-20 | Test files co-located or in `__tests__/` consistently | 🟡 P2 | ☐ |

---

## 3. Automated Detection

### Grep patterns for boundary violations

```bash
# 🔴 P0: DB in routes/controllers
grep_search: Query="mongoose"    Includes=["*/routes/*"]       → DB access in routes!
grep_search: Query="Model.find"  Includes=["*/controllers/*"]  → DB in controller!
grep_search: Query=".save()"     Includes=["*/routes/*"]       → DB mutation in route!

# 🔴 P0: HTTP in services
grep_search: Query="req\."  Includes=["*/services/*"]  → HTTP object in service!
grep_search: Query="res\."  Includes=["*/services/*"]  → HTTP object in service!
grep_search: Query="next("  Includes=["*/services/*"]  → Express middleware in service!

# 🟠 P1: Cross-module internals
grep_search: Query="from '\.\./" Includes=["*/services/*"]  → Check: crossing module boundary?

# 🟠 P1: God Object detection
find_by_name: Pattern="*.js" Extensions=["js","ts"]
→ Check: file size > 500 lines?

# 🟡 P2: Copy-paste detection
grep_search: Query="<duplicated code block>"  → Extract to shared util
```

### File size audit

```bash
# Find files > 500 lines
find_by_name: Pattern="*.js" → for each: check line count
# If file > 500 lines → P1: God Object risk
# If function > 40 lines → P1: complexity risk
```

---

## 4. Red Flags

| Red Flag | Pattern | Severity | Indicator |
|----------|---------|----------|-----------|
| **Big Ball of Mud** | Everything in one file/folder | 🔴 P0 | File > 1000 lines, no folder structure |
| **God Object** | One module does everything | 🔴 P0 | Class > 20 methods, file > 500 lines |
| **Tight Coupling** | Service A depends on internals of B | 🟠 P1 | Deep import paths, circular deps |
| **Magic** | Implicit side effects, hidden globals | 🟠 P1 | Global state mutation, hidden event listeners |
| **Layering violation** | DB in routes, HTTP in services | 🔴 P0 | Mongoose in wrong folder |
| **Missing abstraction** | Same code in 3+ places | 🟠 P1 | Duplicated validation, repeated queries |
| **Wrong granularity** | Too many tiny files or too few large files | 🟡 P2 | 1-liner utils as separate files |

---

## 5. Output Template

```markdown
# Architecture Compliance Review

**Scope:** <PR/module>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD
**Reference:** Architecture Doc, ADR-xxx

## Findings

| # | Severity | Check | File:Line | Finding | Fix |
|---|----------|-------|-----------|---------|-----|
| 1 | 🔴 P0 | ARCH-01 | `routes/products.js:25` | `Product.find()` called directly in route | Move to `productService.list()` |
| 2 | 🟠 P1 | ARCH-10 | `services/config.js` | 620 lines — God Object risk | Split into `configService` + `templateService` |
| 3 | 🟠 P1 | ARCH-15 | `services/analytics.js` | New analytics module, no ADR | Create ADR for analytics approach |

## Layer Compliance
| Layer | Files | Violations | Status |
|-------|:-----:|:----------:|:------:|
| Routes | 5 | 0 | ✅ |
| Controllers | 4 | 1 | ⚠️ |
| Services | 6 | 0 | ✅ |
| Repos | 3 | 0 | ✅ |

## ADR Compliance
| ADR | Description | Compliant? |
|-----|-------------|:----------:|
| ADR-018 | ImageViewer component | ✅ |
| ADR-019 | CSS overflow strategy | ✅ |
| — | New analytics pattern | ❌ ADR needed |

## Verdict
- ✅ COMPLIANT — architecture fully followed
- ⚠️ VIOLATIONS — fix P0/P1 before merge
- ❌ REDESIGN — fundamental architecture mismatch
```

---

## See also
- `$architecture-doc` — Architecture Document (reference)
- `$adr-log` — ADR Log (reference)
- `$code-review-checklist` — general review (architecture section)
- `$current-state-analysis` — initial repo audit
