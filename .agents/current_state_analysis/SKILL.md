---
name: current_state_analysis
description: Анализ текущей архитектуры репозитория — конвенции, паттерны, техдолг, узкие места масштабирования, риски безопасности и консистентность.
---

# Skill: Current State Analysis

Системный аудит существующего кода перед началом новой задачи.

**Разделы:**
1. [Когда использовать](#1-когда-использовать)
2. [Алгоритм аудита](#2-алгоритм)
3. [Что искать (checklist)](#3-что-искать)
4. [Severity levels](#4-severity)
5. [Output Template](#5-output-template)
6. [Пример анализа](#6-пример)

---

## 1. Когда использовать

- Проект уже существует / есть репозиторий с кодом
- Перед ARCH gate (новая фича, рефакторинг, миграция)
- Есть legacy или частично реализованные фичи
- Команда хочет понять текущее состояние перед планированием

---

## 2. Алгоритм

```
1. Обзор структуры (5 min)
   ├── list_dir → root, src/, packages/
   ├── package.json → deps, scripts, engines
   ├── Docker files → сервисы, порты, volumes
   └── Config files → .env.example, tsconfig, biome, vitest

2. Идентификация паттернов (10 min)
   ├── FE: framework, state management, routing, styling
   ├── BE: framework, layers (router/controller/service/repo), middleware
   ├── Data: ORM/ODM, schema strategy, migrations
   └── Infra: CI/CD, Docker, reverse proxy, certs

3. Поиск узких мест (10 min)
   ├── grep_search → console.log, TODO, FIXME, HACK, XXX
   ├── grep_search → hardcoded secrets, passwords, API keys
   ├── grep_search → any, eslint-disable, @ts-ignore
   ├── find_by_name → *.test.*, *.spec.* (coverage)
   └── Ручная проверка → N+1, god objects, tight coupling

4. Фиксация findings (5 min)
   └── Заполнить Output Template (section 5)

5. Формирование рекомендаций
   └── Quick wins (< 1h) vs Strategic (> 1 sprint)
```

---

## 3. Что искать

### Структура и конвенции

| Что проверить | Как | Red flag |
|--------------|-----|----------|
| Слои (FE/BE) | `list_dir` src/ | Нет чёткого разделения |
| Naming | Файлы, переменные, exports | Смешанные стили (camelCase + snake_case) |
| JSDoc | `grep_search` `@param` | Нет документации функций |
| Imports | Абсолютные vs относительные | `../../../` — deep nesting |
| Config | `.env.example`, schema validation | Нет валидации env vars |

### Технический долг

| Что искать | Grep pattern | Severity |
|-----------|-------------|----------|
| `console.log` в production | `console.log` (исключая тесты) | P1 |
| TODO/FIXME | `TODO\|FIXME\|HACK\|XXX` | P1-P2 |
| Hardcoded secrets | `password.*=\|secret.*=\|apiKey.*=` | 🔴 P0 |
| Disabled linting | `eslint-disable\|@ts-ignore\|biome-ignore` | P1 |
| `any` types | `:\s*any\b` (в .ts файлах) | P1 |
| Missing error handling | `catch\s*\(\s*\)` (empty catch) | P1 |
| Outdated deps | `npm outdated` / `npm audit` | P1-P2 |
| Dead code | Unused exports, unreachable branches | P2 |

### Производительность

| Что искать | Где | Red flag |
|-----------|-----|----------|
| N+1 queries | Loops с DB calls внутри | 🔴 P0 |
| Missing indexes | Schema definitions | P0-P1 |
| No `.lean()` | Mongoose queries в API responses | P1 |
| No `.select()` | Full document fetch для list endpoints | P1 |
| `skip()` pagination | Large collections | P1 |
| Sync heavy ops | Main thread blocking | P0 |

### Безопасность

| Что искать | Как | Severity |
|-----------|-----|----------|
| NoSQL injection | `Model.find(req.query)` | 🔴 P0 |
| XSS | `dangerouslySetInnerHTML` без sanitize | 🔴 P0 |
| Secrets в коде | `grep_search` API keys, tokens | 🔴 P0 |
| No Helmet | Express без `helmet()` | P1 |
| No CORS whitelist | `cors({ origin: '*' })` | P1 |
| No rate limiting | Public endpoints без throttle | P1 |

---

## 4. Severity

| Level | Описание | Действие |
|-------|---------|----------|
| 🔴 **P0** | Блокер: security vulnerability, data loss risk, broken core flow | Исправить до release |
| 🟠 **P1** | Важно: tech debt, missing validation, no tests, performance risk | Запланировать в текущем спринте |
| 🟡 **P2** | Улучшение: code style, naming, dead code, minor optimizations | Backlog |

---

## 5. Output Template

```markdown
# Current State Analysis: <project-name>

**Date:** YYYY-MM-DD
**Analyst:** Architect Agent
**Scope:** <что анализировали>

## Summary
<1-2 абзаца: что это за проект, ключевые технологии, текущий статус>

## Stack
| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.x |
| Backend | Express | 4.x |
| Database | MongoDB + Mongoose | 7.x |
| Infra | Docker + Caddy | ... |

## Conventions (обнаруженные паттерны)
- **Naming:** camelCase для файлов, PascalCase для компонентов
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
- <конкретные bottlenecks: no indexes, sync ops, no cache, etc.>

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
- [ ] ARCH-01: <описание>
- [ ] ARCH-02: <описание>
```

---

## 6. Пример анализа (фрагмент)

```markdown
# Current State Analysis: Smart Cart Rescue

**Date:** 2025-12-01
**Scope:** Full repository audit

## Summary
Wix Self-Hosted App с Dashboard (React 18 + Vite) и API (Express 4).
Embedded Script показывает popup на Wix сайтах.
Монорепо с Docker Compose + Caddy gateway.

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

| Артефакт | Формат | Где сохранять |
|---------|--------|---------------|
| Current State Analysis | Markdown (output template above) | `docs/architecture/current-state-analysis.md` |
| Tech Debt backlog | ARCH-xx items | `docs/architecture/tech-debt.md` или задачи в backlog |

---

## См. также
- `$system_design_checklist` — checklist для нового дизайна
- `$architecture_doc` — полный Architecture Document
- `$security_baseline_dev` — детальная проверка безопасности
- `$observability_logging` — наблюдаемость
