---
name: handoff
description: Формирование Context Pack и постановка задачи агенту — цели, ограничения, артефакты, решения, вопросы, Definition of Done. Требует стандартного формата ответа.
---

# Skill: Context Pack Handoff

Передача задач между гейтами с полным контекстом.

**Разделы:**
1. [Workflow](#1-workflow)
2. [Context Pack](#2-context-pack)
3. [HANDOFF Envelope](#3-envelope)
4. [Reply Format](#4-reply)
5. [Gate-Specific Variations](#5-variations)
6. [Пример: PM→UX Handoff](#6-пример)

---

## 1. Workflow

```
1. Предыдущий gate завершён (☑ в board)
2. Conductor собирает Context Pack (section 2)
3. Conductor формирует HANDOFF Envelope (section 3)
4. Conductor делегирует следующему агенту
5. Агент получает envelope → читает свой role .md → активирует skills
6. Агент возвращает ответ по Reply Format (section 4)
7. Conductor проверяет DoD → ☑ или ⚠️ (возврат)
```

---

## 2. Context Pack

### Обязательные поля

| Field | Description | Example |
|-------|------------|---------|
| **Goal** | Что нужно получить | "Create UX Spec for Settings page" |
| **Scope** | Что входит / не входит | "In: Settings CRUD. Out: Analytics" |
| **Constraints** | Стек, деплой, сроки, интеграции | "React + Express, desktop-first" |
| **Inputs** | Ссылки на документы/файлы | "PRD: docs/prd.md, UX Discovery: ..." |
| **Decisions** | Что уже решено (нельзя менять без согласования) | "ADR-001: MongoDB, ADR-002: shadcn" |
| **Open Questions** | Что неизвестно | "Timer design not finalized" |
| **DoD** | Критерий «готово» | "UX Spec covers all PRD flows + states" |
| **Output Format** | В каком виде вернуть результат | "Markdown file: docs/ux-spec.md" |

---

## 3. HANDOFF Envelope

### Template (copy as-is)

```markdown
---
## HANDOFF ENVELOPE

**From:** <Gate/Agent> (e.g., PM Gate)
**To:** <Gate/Agent> (e.g., UX/UI Designer)
**Task ID:** <board task ID> (e.g., UX-01)
**Date:** YYYY-MM-DD

### Context Pack
- **Goal:** <one sentence>
- **Scope:** In: <list> | Out: <list>
- **Constraints:** <stack, deploy, integrations>
- **Inputs:**
  - <file/link 1>
  - <file/link 2>
- **Decisions:** <key decisions that must not change>
- **Open Questions:** <unresolved items>
- **DoD:** <checkable criteria>
- **Output Format:** <expected deliverable format>

### Task
- **What to do:** <concrete action>
- **Skills to use:** $skill-1, $skill-2
- **Acceptance criteria:**
  - [ ] <criterion 1>
  - [ ] <criterion 2>
---
```

---

## 4. Reply Format

Every agent must return their deliverable in this structure:

```markdown
### Summary
<1-3 sentences: what was done>

### Deliverables
<list of artifacts produced with paths/links>

### Decisions
<key decisions made during this gate>

### Risks / Blockers
<anything that may affect downstream gates>

### Open Questions
<unresolved items for user/conductor>

### Next Actions
<suggested next steps with IDs: UX-02, ARCH-01, etc.>
```

---

## 5. Gate-Specific Variations

### PM → UX

| Field | Typical content |
|-------|----------------|
| Inputs | PRD, Interview Summary |
| Skills | $ux-discovery, $ux-spec, $ui-inventory, $a11y-baseline |
| DoD | UX Spec covers all flows + screens + states + validations |

### UX → ARCH

| Field | Typical content |
|-------|----------------|
| Inputs | PRD, UX Spec, UI Inventory |
| Skills | $architecture-doc, $adr-log, $api-contracts, $data-model |
| DoD | Architecture doc + API contracts + data model + ADRs |

### ARCH → DEV

| Field | Typical content |
|-------|----------------|
| Inputs | Architecture, API Contracts, UX Spec, Data Model |
| Skills | $tdd-workflow, $testing-strategy-js, relevant best practices |
| DoD | Code complete, tests pass, no P0 self-review issues |

### DEV → REV

| Field | Typical content |
|-------|----------------|
| Inputs | Code diff, test results, API contracts |
| Skills | $code-review-checklist, $security-review, $performance-review-baseline |
| DoD | Review report with 0 P0, P1 tracked |

### REV → OPS

| Field | Typical content |
|-------|----------------|
| Inputs | Approved code, Docker config |
| Skills | $deployment-ci-plan, /auto-restart-containers |
| DoD | Build success, containers healthy |

### OPS → TEST

| Field | Typical content |
|-------|----------------|
| Inputs | Deployed environment, UX Spec, API Contracts |
| Skills | $qa-test-plan, $qa-manual-run, $qa-api-contract-tests, $qa-security-smoke-tests |
| DoD | All P0 tests pass, 0 open P0 bugs |

### TEST → RG

| Field | Typical content |
|-------|----------------|
| Inputs | All gate reports (REV, TEST, CI) |
| Skills | $release-gate, $release-gate-checklist-template |
| DoD | Release checklist complete, GO decision |

---

## 6. Пример: PM→UX Handoff

```markdown
---
## HANDOFF ENVELOPE

**From:** PM Gate (PM Agent)
**To:** UX/UI Designer
**Task ID:** UX-01
**Date:** 2026-03-13

### Context Pack
- **Goal:** Create UX Spec for SaaS Admin Panel Dashboard
- **Scope:** In: Settings, Products, Content preview | Out: Analytics, multi-lang
- **Constraints:** React + Express, desktop-first, shadcn/ui components
- **Inputs:**
  - PRD: `docs/prd.md`
  - Backlog: `docs/backlog.md`
- **Decisions:** ADR-001: MongoDB for storage, ADR-002: shadcn/ui for UI
- **Open Questions:** Notification design (email vs in-app)
- **DoD:** UX Spec covers all 5 PRD user stories, all screens have 4 states
- **Output Format:** `docs/ux-spec.md`

### Task
- **What to do:** Run $ux-discovery → $ux-spec → $ui-inventory → $a11y-baseline
- **Skills to use:** $ux-discovery, $ux-spec, $ui-inventory, $a11y-baseline
- **Acceptance criteria:**
  - [ ] All PRD flows have screen specs
  - [ ] States: loading/empty/error/success defined per screen
  - [ ] UI Inventory maps to design system components
  - [ ] A11y baseline documented
---
```

---

## См. также
- `$gates` — gate definitions and DoD
- `$board` — project board tracking
- `$memory` — context preservation
