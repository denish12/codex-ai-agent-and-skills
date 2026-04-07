---
name: release-gate-checklist-template
description: Генерирует перед релизом видимый чек-лист RG-01…RG-xx (Evidence/DoD/Security/Ops/Post-deploy/Rollback) и правила статусов.
---

# Skill: Release Gate Checklist Template (RG-01…RG-xx)

Стандартный релизный чек-лист. Создавать перед каждым Release Gate.

**Разделы:**
1. [Workflow](#1-workflow)
2. [Checklist](#2-checklist)
3. [Status Rules](#3-rules)
4. [Timing Guide](#4-timing)
5. [Пример: Filled Checklist](#5-пример)

---

## 1. Workflow

```
1. Conductor создаёт checklist (copy section 2 as-is)
2. Заполняй статусы по мере сбора evidence
3. Все blocking items (🔴) must be DONE для GO
4. Advisory items (🟡) могут быть N/A с обоснованием
5. Pass checklist to $release-gate для финального решения
```

---

## 2. Checklist

### Evidence (source data collection)

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-01 | Evidence | Scope релиза + version/tag/commit указаны | 🔴 | ☐ |
| RG-02 | Evidence | CI: unit tests PASS | 🔴 | ☐ |
| RG-03 | Evidence | CI: integration tests PASS | 🔴 | ☐ |
| RG-04 | Evidence | CI: lint/format PASS | 🟡 | ☐ |
| RG-05 | Evidence | Dependency/SCA audit PASS или риски зафиксированы | 🟡 | ☐ |
| RG-06 | Evidence | Reviewer report получен (P0=0) + ссылка | 🔴 | ☐ |
| RG-07 | Evidence | Tester report получен (P0=0) + ссылка | 🔴 | ☐ |

### DoD (Definition of Done)

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-08 | DoD | Секреты не попали в код/логи | 🔴 | ☐ |
| RG-09 | DoD | Runbook / инструкции запуска актуальны | 🔴 | ☐ |
| RG-10 | DoD | Базовая безопасность: input validation + authz | 🔴 | ☐ |

### Contracts & Data

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-11 | Contracts | API соответствует контрактам | 🔴 | ☐ |
| RG-12 | Data | Миграции/данные: план + обратимость | 🟡 | ☐ |

### Operations

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-13 | Ops | Observability: request_id + безопасные логи | 🟡 | ☐ |
| RG-14 | Ops | Rate limiting / security headers | 🟡 | ☐ |

### Release

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-15 | Release | Release notes подготовлены | 🟡 | ☐ |
| RG-16 | Release | Feature flags / rollout strategy | 🟡 | ☐ |
| RG-17 | Rollback | Rollback plan описан и понятен | 🔴 | ☐ |
| RG-18 | Rollback | Backup/restore (если DB) | 🟡 | ☐ |

### Post-deploy

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-19 | Post-deploy | Smoke test сценарии определены | 🔴 | ☐ |
| RG-20 | Post-deploy | Smoke test выполнен на целевом env | 🔴 | ☐ |
| RG-21 | Post-deploy | Мониторинг/логи проверены | 🟡 | ☐ |

### Decision

| # | Category | Check | Blocking? | Status |
|---|----------|-------|:---------:|--------|
| RG-22 | Decision | Итоговое решение: GO / NO-GO | 🔴 | ☐ |

---

## 3. Status Rules

| Status | Meaning |
|--------|---------|
| `☐ TODO` | Not started |
| `⏳ IN-PROGRESS` | Being checked |
| `✅ DONE` | Check passed |
| `⚠️ BLOCKED` | Check failed — requires fix |
| `N/A` | Not applicable (with reason) |

### Blocking rules

| Condition | Result |
|----------|--------|
| Any 🔴 item = `⚠️ BLOCKED` | Release = **NO-GO** |
| P0 from RG-06 or RG-07 | Release = **NO-GO** |
| All 🔴 items = `✅ DONE` | Release = **GO** (or GO-with-conditions for P1) |
| 🟡 item = `⚠️ BLOCKED` | Acceptable risk, document + track |

---

## 4. Timing Guide

When to check each item:

| Phase | Items | When |
|-------|-------|------|
| **Pre-collect** | RG-01 | Start of release gate |
| **CI verification** | RG-02, RG-03, RG-04, RG-05 | After DEV complete |
| **Reports collection** | RG-06, RG-07 | After REV + TEST gates |
| **DoD verification** | RG-08, RG-09, RG-10 | During review/assessment |
| **Contracts check** | RG-11, RG-12 | After API changes |
| **Ops check** | RG-13, RG-14 | After OPS gate |
| **Release prep** | RG-15, RG-16, RG-17, RG-18 | Pre-deploy |
| **Post-deploy** | RG-19, RG-20, RG-21 | After deploy to target env |
| **Final** | RG-22 | Last step |

---

## 5. Пример: Filled Checklist

```markdown
## Release Gate Checklist — SaaS Admin Panel v1.0

### Evidence
| # | Check | Blocking | Status | Notes |
|---|-------|:--------:|:------:|-------|
| RG-01 | Scope: Settings + Products + Content v1.0, commit abc1234 | 🔴 | ✅ | — |
| RG-02 | Unit tests: 42/42 pass | 🔴 | ✅ | CI run #78 |
| RG-03 | Integration tests: 8/8 pass | 🔴 | ✅ | CI run #78 |
| RG-04 | Lint: 0 errors | 🟡 | ✅ | Biome |
| RG-05 | npm audit: 0 high/critical | 🟡 | ✅ | — |
| RG-06 | Reviewer: 0 P0, 2 P1 | 🔴 | ✅ | rev-01.md |
| RG-07 | Tester: 0 P0, 1 P1, 22/24 pass | 🔴 | ✅ | test-report-iter1.md |

### DoD
| RG-08 | No secrets in code/logs | 🔴 | ✅ | grep clean |
| RG-09 | Runbook: docs/runbook.md | 🔴 | ✅ | Updated |
| RG-10 | Zod validation + auth middleware | 🔴 | ✅ | — |

### Contracts
| RG-11 | API matches contracts | 🔴 | ✅ | api-compliance.md |
| RG-12 | No migrations needed | 🟡 | N/A | New app, no existing data |

### Ops
| RG-13 | Pino + request_id | 🟡 | ✅ | — |
| RG-14 | Helmet security headers | 🟡 | ✅ | — |

### Release
| RG-15 | Release notes | 🟡 | ✅ | CHANGELOG.md |
| RG-16 | No feature flags | 🟡 | N/A | — |
| RG-17 | Rollback: docker compose revert | 🔴 | ✅ | Documented |
| RG-18 | MongoDB backup | 🟡 | ✅ | mongodump before deploy |

### Post-deploy
| RG-19 | Smoke scenarios: 3 P0 flows | 🔴 | ✅ | Defined |
| RG-20 | Smoke test PASS on staging | 🔴 | ✅ | All 3 pass |
| RG-21 | Logs clean, no error spike | 🟡 | ✅ | — |

### Decision
| RG-22 | **⚠️ GO with conditions** | 🔴 | ✅ | 3 P1 tracked for v0.9.1 |

### What's Missing to GO
Nothing blocking. 3 P1 issues accepted with tasks + owners.
```

---

## См. также
- `$release-gate` — decision process (uses this checklist)
- `$gates` — gate definitions
