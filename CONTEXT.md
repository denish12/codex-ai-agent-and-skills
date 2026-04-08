# Обзор проекта

| Поле | Значение |
|------|----------|
| **Название** | code-ai-installer |
| **Описание** | CLI для установки AI-агентов и скилов для множества AI-ассистентов |
| **Текущая фаза** | v2.1.0 — Socket.dev Supply-Chain Integration |
| **Дата создания** | 2026-03-01 |
| **Последнее обновление** | 2026-04-08 |

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
- installer.ts: domain-aware state file naming (target--domain.json)
- index.ts: --domain flag на всех CLI командах, wizard domain step
- domains/development/: зеркало корня (8 agents, 71 skills, 5 workflows)
- domains/content/: новый домен (6 agents, 30 skills, 4 workflows)
- Локали en/ для обоих доменов
- package.json: v2.0.0, "domains" в files array
- 93 теста (86 existing + 7 new), все GREEN
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
