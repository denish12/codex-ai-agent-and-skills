# Обзор проекта

| Поле | Значение |
|------|----------|
| **Название** | code-ai-installer |
| **Описание** | CLI для установки AI-агентов и скилов для множества AI-ассистентов |
| **Текущая фаза** | v2.4.1 — Domain karpathy fix + Gemini agent rename |
| **Дата создания** | 2026-03-01 |
| **Последнее обновление** | 2026-04-29 |

---

## Результаты пайплайна

| Gate | Статус | Ключевой результат | Дата |
|------|--------|---------------------|------|
| Conductor | ✅ | Master Checklist, 16 задач, 3-session plan | 2026-04-03 |
| PM (PRD) | ✅ | PRD v1.0 — docs/prd-domains-v1.md | 2026-04-03 |
| UX/UI | ✅ | UX Spec v1.0 — docs/ux-spec-domains-v1.md | 2026-04-03 |
| Architect | ✅ | Architecture Doc v1.0 — docs/architecture-domains-v1.md | 2026-04-04 |
| DevOps | ✅ | OPS-01 report (CLI tool, N/A containers) | 2026-04-04 |
| Dev (TDD) | ✅ | 4 slices: types, domainResolver, installer, content domain | 2026-04-04 |
| Reviewer | ✅ | REV-01 GO (0 P0, JSDoc 14/14) | 2026-04-04 |
| Tester | ✅ | QA-01 PASS (93/93 tests, 8/8 CLI smoke) | 2026-04-04 |
| Release Gate | ✅ | RG-01 GO | 2026-04-04 |

---

## Ключевые решения (ADR)

| ID | Решение | Обоснование | Статус |
|----|---------|-------------|--------|
| ADR-001 | Domain filesystem layout: domains/<id>/ с полной структурой + domain.json | Полная изоляция, стандартная структура, независимое тестирование | Accepted |
| ADR-002 | Backward compat: two-phase detection (sourceResolver + domainResolver) | Zero-config upgrade, два code path | Accepted |
| ADR-003 | Domain metadata via domain.json (zod-validated) | Structured, extensible, не зависит от markdown parsing | Accepted |
| ADR-004 | Separate domainResolver.ts module (SRP) | Clean API, testable, sourceResolver остаётся про package root | Accepted |
| ADR-005 | State file naming: target--domain.json | Backward compat, flat files, safe separator | Accepted |

---

## Текущее состояние

### Сделано
- v2.0.0 Domain System полностью реализован
- DomainId strict enum + zod validation
- domainResolver.ts: listDomains, resolveDomainSourceRoot, normalizeDomain
- sourceResolver.ts: расширена isValidSourceRoot для domains/ layout
- installer.ts: domain-aware state file naming (target--domain.json) + Gemini prompt.md → `<agent>.md` migration (v2.4.1)
- index.ts: --domain flag на всех CLI командах, wizard domain step
- domains/development/: 8 agents, 72 skills (включая karpathy-guidelines), 5 workflows
- domains/content/: 6 agents, 35 skills, 4 workflows
- domains/analytics/: 8 agents, 24 skills
- domains/product/: 10 agents, 33 skills
- Локали en/ для всех 4 доменов
- karpathy-guidelines: cross-cutting skill, mandatory for all agents in all domains (v2.4.1 fix: добавлен в `domains/<id>/`)
- Gemini layout: `<agentsDir>/<agentName>/<agentName>.md` (v2.4.1, было `prompt.md` до v2.4.0)
- agentSkillResolution регрессионный тест: ловит broken `$skill-name` ссылки из агентов
- package.json: v2.4.1, "domains" в files array
- 102 теста, все GREEN
- Build (tsc): 0 errors

### В процессе
- Нет активных задач

### Заблокировано
- Нет блокеров

---

## Открытые вопросы

| ID | Вопрос | Владелец | Дедлайн | Статус |
|----|--------|----------|---------|--------|
| Q-001 | Content domain metadata sidecars (skill.yaml, vendor JSON) | DEV | post-MVP | Open |
| Q-002 | npm package size с domains/ | DevOps | post-MVP | Open |

---

## История сессий

| Сессия | Дата | Краткий итог | Артефакты |
|--------|------|--------------|-----------|
| Session 1 | 2026-04-03 | Gates 0-1: Conductor + PM (PRD) | docs/prd-domains-v1.md, docs/session-1-summary.md |
| Session 2 | 2026-04-03 | Gates 2-3: UX + ARCH | docs/ux-spec-domains-v1.md, docs/architecture-domains-v1.md, docs/session-2-summary.md |
| Session 3 | 2026-04-04 | Gates 4-8: DEV + REV + OPS + TEST + RG | src/domainResolver.ts, domains/, package.json v2.0.0 |
| Hotfix v2.0.2 | 2026-04-08 | Bugfix + защита от регрессии: (1) 30 content-domain скиллов имели расхождения `description` между SKILL.md frontmatter и портабл/вендор sidecar — приведено к SKILL.md (источник истины), 150 файлов обновлено. (2) 4 скилла (`email-engagement-tiers`, `google-stitch-content`, `mailerlite-email-ops`, `marketing-psychology`) шипились без sidecar — сгенерированы 24 файла (skill.yaml + claude/copilot/gemini/qwen.json + openai.yaml). (3) Test gap: единственный test против реальных файлов смотрел только на легаси-корень репо (= development domain), content domain был слепой. Добавлен `metadataAudit.test.ts → "should pass audit for every domain × every target"` — итерируется по `listDomains() × 5 targets`. (4) `package.json prepack` теперь запускает `doctor:all` (`development` + `content`) — `npm publish` не сможет запаковать сломанный пакет. 94/94 теста зелёные, doctor PASS на всех 5 targets без warnings. **Не публиковался отдельно — все изменения вошли в v2.1.0.** | См. v2.1.0 |
| Feature v2.1.0 | 2026-04-08 | **Socket.dev Supply-Chain Integration**. Bugfix-pipeline (CONDUCTOR → ARCH lite → DEV → REV → TEST) с user sign-off на каждом гейте. Изменения: (1) `dependency-supply-chain-review` skill v2.0 — добавлена секция «0. Prerequisites» с обязательным `socket-mcp` (HTTP по умолчанию, stdio для paid аккаунтов), detection protocol, degraded mode protocol; новая секция «9. Socket.dev Integration» с `depscore` workflow и threshold matrix (supply_chain≥0.75, vulnerability≥0.80, license≥0.50); checklist 3.2 расширен DEP-05a/05b/05c/05d (P0); Output Template обновлён блоком Socket.dev Audit. (2) Reviewer agent: добавлен socket-mcp в Входы, обязательный принцип supply chain через socket.dev в Главные принципы, поле `SOCKET.DEV MODE` в Handoff Envelope. (3) Senior Full Stack agent: новый принцип #11 (pre-install gate), шаг в Security Baseline, новый DoD пункт, поле `SOCKET.DEV PRE-INSTALL` в Handoff Envelope. (4) RU + EN локали зеркальны. (5) 12 sidecar файлов синхронизированы (RU + EN × 6 файлов). (6) Bonus: фиксы из v2.0.2 (sidecar metadata + regression test + prepack:doctor:all) включены в этот же релиз. P0 алерты от socket.dev блокируют установку до явного подтверждения. Degraded mode (socket-mcp недоступен) — review не блокируется, но статус фиксируется. | package.json v2.1.0, domains/development/.agents/skills/dependency-supply-chain-review/**, domains/development/agents/{reviewer,senior_full_stack}.md, domains/content/** (sidecar fixes из v2.0.2), src/__tests__/metadataAudit.test.ts |
| Bugfix v2.4.1 | 2026-04-29 | **Domain karpathy fix + Gemini agent rename**. Bugfix-pipeline (CONDUCTOR → DEV → REV → TEST → RG) с user sign-off на каждом гейте. **Часть A — karpathy в доменах:** v2.4.0 поставил `$karpathy-guidelines` в легаси-корень репо, но забыл скопировать папку скила в `domains/<id>/.agents/skills/`, при этом 32 файла агентов в доменах уже ссылались на скил. При установке через `--domain <id>` скил физически отсутствовал. Скил скопирован в 4 домена × 2 локали (56 файлов), секция «Cross-cutting / Quality» добавлена в 8 файлов AGENTS.md. **Часть B — Gemini agent rename:** до v2.4.1 Gemini-адаптер ставил агентов как `<agentsDir>/<agentName>/prompt.md`, теперь как `<agentsDir>/<agentName>/<agentName>.md`. Добавлена `migrateLegacyGeminiPromptFiles` миграция в `runInstall`: переименовывает legacy `prompt.md` → `<agentName>.md` (сохраняя user-customized content под skip mode), патчит `promptFile` поле в legacy `config.json`, чистит orphan файлы. Идемпотентна, под backup/rollback covered. **Часть C — регрессионный тест:** новый `agentSkillResolution.test.ts` проверяет резолвимость каждого `$skill-name` из агентов в существующую папку скила домена. Тест нашёл 2 пре-существующих бага: (1) литеральный `$skill-name` плейсхолдер в `analytics/data_analyst.md` (RU+EN) — заменён на `` `<skill-name>` ``; (2) `$google-stitch` → `$google-stitch-skill` в `development/ux_ui_designer.md` (RU+EN). **Verification:** 102/102 тестов PASS, doctor:all PASS на всех 4 доменах × 5 targets, end-to-end smoke-install gemini target в tmp подтвердил миграцию с user customizations preserved. | package.json v2.4.1, domains/{development,content,analytics,product}/.agents/skills/karpathy-guidelines/**, domains/{...}/locales/en/.agents/skills/karpathy-guidelines/**, domains/{...}/AGENTS.md (RU+EN), src/installer.ts, src/platforms/adapters.ts, src/__tests__/agentSkillResolution.test.ts (NEW), src/__tests__/installer.test.ts, src/__tests__/domainIntegration.test.ts |
