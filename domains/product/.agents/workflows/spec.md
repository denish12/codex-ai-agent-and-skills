# /spec — PRD-only Pipeline (1 сессия, без adversarial)

> **Используй, когда стратегия и scope утверждены — нужен формальный PRD.**
> 1 сессия, без adversarial. Output — PRD (markdown) или PRD PDF (опционально).

## Когда использовать

- Strategy утверждена (в предыдущих сессиях `/ship-right-thing` или из внешнего процесса)
- Scope утверждён (в `/shape-prioritize` или из roadmap document)
- Команда готова начинать implementation — нужен PRD для handoff
- Feature / initiative в рамках approved roadmap theme
- Team alignment уже достигнут — spec нужен для engineering / UX / QA

## Когда НЕ использовать

- Scope открыт → `/shape-prioritize`
- Стратегия неясна → `/ship-right-thing`
- Нужна быстрая оценка без полного PRD → `/quick-pm`
- Exploratory / discovery-heavy initiative → `/ship-right-thing`

## Decision Tree (уточняющие вопросы в COND-01)

```
Strategy утверждена?
  ├── НЕТ → /ship-right-thing
  └── ДА → продолжаем

Scope утверждён?
  ├── НЕТ → /shape-prioritize
  └── ДА → продолжаем

Успех =
  ├── Full PRD для engineering handoff → /spec (эта workflow)
  ├── Short brief для discussion → /quick-pm
  └── Deep strategy rethink → /ship-right-thing
```

## Пайплайн (1 сессия)

```
CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD → PRD (markdown)
             ↓
            DATA_ANALYST (для success metrics validation)
```

Последовательно-параллельный:
- PM запускает PRD draft.
- UX Designer + Tech Lead работают параллельно на PM output.
- Data Analyst — sanity check success metrics.
- PM finaliz'ит PRD, интегрируя UX + Tech + Data input.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Initiative name | ✅ | Что специфицируем |
| Approved strategy context | ✅ | NSM, OKR, roadmap theme (reference или inline) |
| Approved scope | ✅ | Backlog / MoSCoW / decision memo |
| User segments | ✅ | Buyer vs end-user (из Discovery / strategy) |
| Constraints | ✅ | Timeline, team, NFR (из Tech expectations) |
| Existing flows / screens | ⬚ | Если extension существующего UI |
| Success metrics expected | ⬚ | Обычно наследуется из approved strategy NSM |

## Гейты и deliverables

### COND-01 — Clarification + Scope Review

- **Conductor**:
  - 5+ clarifying questions (scope boundaries, timeline, NFR expectations, audience)
  - Validate approved scope (sanity check — есть ли open questions?)
  - Identify dependencies (other teams / external services / compliance)
  - `$board` создана с 5 гейтами (COND-01 / PM-SPEC / UX-01 / TECH-01 / LITE-RG)

### PM-SPEC — Core PRD

- **PM**: Final PRD через `$prd-template` (10 секций):
  1. Overview (problem + audience + business context)
  2. Goals & Success Metrics (NSM / OKR link)
  3. Solution Approach + non-goals
  4. User Stories (INVEST) — 5-10 stories
  5. Acceptance Criteria (Gherkin) per story
  6. NFR (compact)
  7. Risks (top 5 с mitigation)
  8. Rollout Plan (pilot → GA)
  9. Dependencies
  10. Open Questions

- **PM** также:
  - Epic breakdown (3-5 epics)
  - Out-of-scope явно

### UX-01 — User Flows + Wireframes (параллельно Tech, если UI)

- **UX Designer** через `$user-flow` + `$design-brief`:
  - User flows для primary + secondary flows
  - Low-fi wireframes для ключевых screens
  - Accessibility checklist (WCAG AA baseline)
  - Design brief для downstream visual designer (опц., если требуется hi-fi)
  - B2B persona delineation (buyer flows / end-user flows / shared)

Если initiative non-UI (backend / infrastructure) — UX skip, помечен как N/A на `$board`.

### TECH-01 — Feasibility + NFR (параллельно UX)

- **Tech Lead** (neutral mode, без camp):
  - Architecture review
  - Feasibility check (Yes / Yes-caveat / No + rationale per item)
  - NFR (compact — top 5-7 категорий: performance / security / compliance / observability / integrations)
  - Risk Register (top 3-5 с P×I + mitigation + owner)
  - Integration map (dependencies на другие сервисы / teams)
  - Epic breakdown (shallow, shared с PM)

### DATA-01 — Metric Plan (опционально если scope содержит new metrics)

- **Data Analyst**:
  - Metric tree (NSM + top 3 inputs + guardrails)
  - Hypothesis formalization (1-3, if applicable)
  - Instrumentation requirements (events + properties)
  - Baseline и target values

Если success metrics наследуются as-is из approved strategy и инструментирование уже есть — Data skip, помечен N/A.

### LITE-RG — PRD Finalization

- **PM** merge UX + Tech + Data input
- Self-review checklist (PRD Content Checklist — ниже)
- Cross-check acceptance criteria на consistency с user stories
- User sign-off

### Optional: DS-01 + LY-01 (если нужен PDF)

- Designer: compact design spec (10-15 page PRD layout).
- Layouter: HTML → PDF.
- Добавляет +1 сессию (Сессия 2 Spec становится Full A-style document session).

## PRD Content Checklist (LITE-RG criteria)

- [ ] Problem (clear, evidence-backed, из approved Discovery pointer)
- [ ] Audience (buyer + end-user из Discovery)
- [ ] Solution approach (1-2 paragraphs, no implementation details)
- [ ] Success metrics (primary NSM + guardrails — из approved strategy)
- [ ] User stories (INVEST — Independent / Negotiable / Valuable / Estimable / Small / Testable)
- [ ] Acceptance criteria (Gherkin Given/When/Then)
- [ ] Non-functional requirements (performance / security / compliance / accessibility)
- [ ] Out-of-scope (explicit list)
- [ ] Risks (top 3-5 с mitigation + owner)
- [ ] Rollout plan (pilot / beta / GA с criteria + rollback)
- [ ] Dependencies (other teams / external / compliance)
- [ ] Open questions (owner + deadline)

## Severity levels

- **P0 Blocker:** PRD без success metrics; user stories без AC; NFR void; audience undefined
- **P1 Gap:** Skipped UX для initiative, где UI затронут; missing rollout plan; thin dependencies
- **P2 Note:** Optional PDF; expanded risks beyond top 5

## Escalation paths

- **Scope reveals strategy gap** (новый contradiction с approved strategy) → pause, эскалация к /ship-right-thing мини-сессии
- **Scope reveals feasibility blocker** (Tech Lead surface hard-no) → pause, escalation к PM / stakeholder для re-scope
- **Compliance block** обнаружен (SOC 2 / GDPR / HIPAA) → pause, legal review, возврат
- **Timeline conflict** (scope > capacity) → escalation: cut scope или extend timeline (user decision)

## Health metrics

| Метрика | Здоровый | Проблемный | Действие |
|---------|:--------:|:----------:|----------|
| PRD completeness | 10/12 checklist items | < 8 | Не передавать engineering |
| User stories AC coverage | 100% stories have AC | < 80% | Reverse Handoff PM |
| NFR coverage | ≥ 5 categories | < 3 | Reverse Handoff Tech Lead |
| Session duration | ≤ 3h focused | > 6h | Scope too big for Spec → consider split |

## Output

- `prd.md` (main deliverable) — 10-20 pages markdown
- Optional `prd.pdf` (если добавлены Designer + Layouter сессии)
- `$board` history
- Engineering-ready handoff (story IDs, epics, dependencies)

## Пример — TeamFlow AI 1:1 Summary: Q2 Export feature (Spec)

**Запрос:** «Scope утверждён для Q2: add PDF/Notion export для summaries. Нужен PRD для engineering team.»

**Режим:** /spec (strategy + scope уже утверждены; specification-only work)

**Сессия 1:**

- **COND-01**: Scope validation — Q2 roadmap theme «Export», scope include PDF + Notion, out-of-scope Slack. Timeline 3 weeks. WCAG AA. 5 вопросов отработаны.

- **PM-SPEC**:
  - PRD 12 pages: Problem (support tickets 14 в Q3 asking for export), audience (end-user Manager), solution (native PDF + Notion API).
  - 5 user stories INVEST: «As a manager I want to export summary as PDF so I can share with report». AC Gherkin per story.
  - NFR: performance p95 < 3s для PDF gen; Notion API rate limit handling.
  - Risks: Notion API deprecation risk (mitigation: vendored client); PDF rendering quality (mitigation: preview in UI).
  - Rollout: opt-in beta для 10 managers, GA при 4.0 rating.
  - Dependencies: Notion integration (new), PDF service (existing).

- **UX-01**:
  - User flow: Click «Export» на summary → select format (PDF/Notion) → download/open Notion page.
  - Low-fi wireframes: 2 screens (summary detail + export modal).
  - Accessibility: keyboard nav для modal, aria-label для format selector.

- **TECH-01**:
  - Feasibility: Yes. t-shirt = M (2 team-weeks).
  - NFR: PDF gen через existing service, Notion integration new (1 week spike для auth OAuth flow).
  - Risks: Notion API rate limit (mitigation: batch + retry), PDF large file size (mitigation: compression).
  - Epics: 2 (PDF pipeline, Notion integration).

- **DATA-01 (N/A)**: Metrics наследуются — «export events» logged via existing event pipeline. Skip.

- **LITE-RG**:
  - PRD checklist: 11/12 ✅ (open questions перечислены, 1 noted «Notion Teams API vs Personal»).
  - User sign-off получен.

**Итог:** 1 session × 3h = готовый PRD 12 pages, engineering-ready.

---

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| PRD без success metrics | Невозможно оценить win | NSM / OKR link обязателен |
| Implementation details в PRD | PRD = what/why, не how | How → engineering docs |
| User stories без AC | AC — контракт с engineers | Gherkin Given/When/Then |
| Skipping NFR | В B2B SaaS часто deal-breakers | NFR top 5 минимум |
| Scope reveal in spec session | Нарушение порядка pipeline | Escalate — возврат к /shape-prioritize или /ship-right-thing |
| No rollout plan | Риск incidents at GA | Pilot → Beta → GA с criteria + rollback |
| Open questions без owner | Blocked during impl | Owner + deadline per question |
