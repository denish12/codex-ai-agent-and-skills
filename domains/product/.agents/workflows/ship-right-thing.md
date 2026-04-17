# /ship-right-thing — Full Pipeline A (Customer-vs-Business Adversarial)

> **Используй, когда стратегия не утверждена, нужен полный план от discovery до PRD + PDF.**
> 6 сессий с adversarial на оси **Customer vs Business**. Mediator синтезирует. Output — PRD + Product Review Deck (PDF).

## Когда использовать

- Новое продуктовое направление, pivot, крупная инициатива
- High stakes: решение повлияет на quarters of work
- Нужен второй взгляд на стратегию (Customer vs Business)
- Финальный артефакт — Product Review Deck для exec-sign-off
- Strategy альтернативы не очевидны — нужен adversarial дебат, не solo-planning

## Когда НЕ использовать

- Маленький фикс → `/quick-pm`
- Стратегия утверждена, scope обсуждаем → `/shape-prioritize`
- Scope утверждён → `/spec`
- Известный roadmap theme, нужен только detailed PRD → `/spec`

## Decision Tree (уточняющие вопросы в COND-01)

```
Стратегия / vision / NSM утверждены?
  ├── НЕТ → /ship-right-thing (эта workflow)
  └── ДА → /shape-prioritize или /spec

Нужен PDF для exec-review?
  ├── ДА → /ship-right-thing (Product Review Deck — output Full A)
  └── НЕТ + только PRD → /spec или /shape-prioritize (если scope открыт)

Stakes:
  ├── High (quarters of work, $100K+ investment) → /ship-right-thing
  └── Low (reversible, weekly decision) → /quick-pm
```

## Пайплайн (6 сессий)

```
Сессия 1: CONDUCTOR → DISCOVERY                                        → session-1-handoff.md
Сессия 2: CONDUCTOR → CUSTOMER-CHAMPION (product_strategist α)         → session-2-handoff.md
Сессия 3: CONDUCTOR → BUSINESS-CHAMPION (product_strategist β)         → session-3-handoff.md
Сессия 4: CONDUCTOR → MEDIATOR (Strategy Synthesis)                    → session-4-handoff.md
Сессия 5: CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD + DATA_ANALYST      → session-5-handoff.md
Сессия 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

Каждая сессия стартует с нуля — handoff-файл единственный источник контекста.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Продуктовый вопрос | ✅ | Что решаем, для кого — в 1 предложении |
| Segment | ✅ | SMB / mid-market / enterprise |
| Текущие метрики | ✅ | ARR, churn, NRR, LTV/CAC, Payback |
| Constraint'ы | ✅ | Timeline, team, tech, compliance, budget |
| Горизонт планирования | ⬚ | Обычно 1-2 квартала для Q1 delivery |
| Existing product context | ⬚ | Текущие фичи / stack / recent incidents |
| Competitive landscape | ⬚ | Ключевые конкуренты (Mediator использует в evidence audit) |

## Гейты и deliverables

### Сессия 1 — Discovery Gate

- **COND-01** (Conductor): Interview Brief
  - 5+ clarifying questions отработаны
  - Режим пайплайна зафиксирован
  - Scope и anti-scope определены
  - `$board` создана с полным списком гейтов

- **DISC-01** (Discovery): Discovery Brief
  - JTBD (functional / emotional / social) — **отдельно для buyer и end-user** (B2B critical)
  - Problem statements (top 3-5) — формула [actor][context][pain][root cause][evidence]
  - Assumption map (4 квадранта: value / usability / feasibility / viability) с top risky
  - Evidence inventory с quality markers (✅ Verified / ⚠️ Old / 🔮 Assumed)
  - Open questions для Сессии 2

### Сессия 2 — Customer-Champion (Camp Alpha)

- **STRAT-01α** (product_strategist α): Strategy Brief Alpha
  - Vision (из user outcomes — «managers save 2h/week...»)
  - NSM — user-value метрика (WAM using feature × rating ≥ 4/5)
  - OKR (1-3 Objectives + 3-5 KR each, с числами и сроками)
  - Roadmap (theme-based: Now / Next / Later)
  - Kano balance (must-have / performance / delighters с user-pain focus)
  - Evidence traceability per позиция
  - Risks top 5 с митигацией

### Сессия 3 — Business-Champion (Camp Beta)

- **STRAT-02β** (product_strategist β): Strategy Brief Beta
  - Vision (из business outcomes — «+$1M ARR в HR-tech сегменте...»)
  - NSM — business-value метрика (ARR per seat, NRR по сегменту)
  - OKR (ARR, CAC payback, NRR, win rate focus)
  - Roadmap (theme-based, открывает sales motion / pricing / moat первым)
  - Rationale: revenue / margin / competitive moat
  - Evidence traceability per позиция
  - Risks top 5 с митигацией

### Сессия 4 — Mediator Strategy Synthesis

- **MED-01** (Mediator): Unified Strategy Brief
  - **Independence check** (contamination: true/false)
  - Evidence audit per camp (coverage %, strength per позиция)
  - Position map (Alpha vs Beta по ключевым темам: Vision / NSM / OKR / Roadmap / Risks)
  - Disagreement analysis (Factual / Value / Risk / Methodological classification)
  - Scoring (5 dimensions × 0-10): Evidence / Coherence / Feasibility / Risk / User-Business Fit
  - Strengths & Weaknesses per camp
  - **Synthesis Path**: Adopt Alpha / Adopt Beta / Hybrid (with explicit rationale)
  - **Unified deliverable** (Vision, NSM, OKR, Roadmap) — source-pointer per element

### Сессия 5 — Planning + Specification

- **PM-SPEC** (PM): Final PRD + prioritized backlog
  - PRD 10 секций (Overview → Rollout)
  - RICE-scored backlog top 15
  - User stories INVEST + Gherkin AC
  - Epic breakdown 4-8 epics
  - Dependencies map с UX / Tech / Data
  - Out-of-scope явно

- **UX-01** (UX Designer, параллельно с Tech + Data):
  - User flows (primary + secondary + edge)
  - Low-fi wireframes
  - Accessibility checklist (WCAG AA baseline)
  - Design brief для Designer downstream

- **TECH-01** (Tech Lead, параллельно):
  - Architecture review
  - Feasibility matrix (t-shirt per item с rationale)
  - NFR (9 категорий: performance / security / scalability / compliance / observability / integrations / accessibility / i18n / privacy)
  - Risk Register (5-10 рисков с P×I + mitigation + owner)
  - Dependencies Map + Critical Path (team-weeks floor)
  - Epic breakdown с critical path membership

- **DATA-01** (Data Analyst, параллельно):
  - Metric Plan (tree: NSM → inputs → guardrails → leading)
  - Hypotheses formalized (3-7 с threshold + timeframe)
  - Experiment designs (per primary hypothesis с sample size / MDE / guardrails)
  - SaaS Impact Model (ARR / churn / NRR / LTV/CAC / Rule of 40)
  - AARRR funnel (B2B-adapted: Activation ≠ signup)
  - Instrumentation requirements (events / properties / cohorts / privacy)

### Сессия 6 — Document Finalization

- **DS-01** (Designer): Design Spec
  - PRD document IA (10 sections)
  - Product Review Deck structure (14-15 slides, Why→What→How→When→Measure→Risks→Ask arc)
  - Visual hierarchy (typography, color B2B sober, spacing 8pt)
  - Key visualizations spec (roadmap, metric tree, RICE, risk heatmap, flow summary)
  - Layouter handoff spec (8 sections)

- **LY-01** (Layouter): HTML → PDF
  - Self-contained PRD HTML (semantic, print-ready)
  - Self-contained Deck HTML (15-20 slides)
  - Embedded CSS, page-break hints, @page rules
  - TOC с anchors
  - Visualizations: CSS Grid / SVG / Mermaid / Chart.js с fallback

- **RG-01** (Conductor): Release Gate sign-off
  - Все гейты [✓]
  - Visual check PDF (page breaks, content intact)
  - User sign-off получен

## Adversarial Independence (правило 4 пайплайна)

**Critical:** Alpha и Beta работают независимо в Сессиях 2 и 3.

- Оба получают одинаковый Discovery Brief (из Сессии 1).
- Не пересекаются artifact'ами, не видят позицию другой камды.
- Beta handoff в Сессии 3 помечен `team: beta` + содержит Alpha deliverable read-only через camp filter.
- Conductor применяет camp filter при formation Session 3 handoff (Alpha Strategy → Beta read-only).

**Contamination check** (Mediator, Шаг 1):
- Direct quotes из Alpha в Beta без маркировки → contamination: true.
- Structural mirroring (Beta vision = rephrased Alpha) → flag.
- При contamination: `confidence` в synthesis понижен, user notified, возможен rerun одной из камд.

## Severity levels

- **P0 Blocker:** отсутствие Discovery Brief, одной из камд, Mediator synthesis; contamination = true (critical case)
- **P1 Gap:** weak evidence в одной камде (допустимо, Mediator учтёт при scoring), evidence coverage 50-79%
- **P2 Note:** UX wireframes для non-UI-инициатив; low-priority disagreements

## Escalation paths

- **Stalemate** (Mediator не может синтезировать, обе камды слабы) → эскалация user с двумя вариантами + rationale + recommended (обычно rerun одной из камд)
- **Contradictory evidence** между камдами → дополнительная discovery мини-сессия (loop back to Discovery)
- **Compliance block** обнаружен в Сессии 5 (Tech Lead review) → пауза pipeline, legal / security review, возврат
- **Resource block** (scope > capacity) → loop back к Mediator для re-synthesis с cut constraints или эскалация budget
- **User non-sign-off** на Mediator synthesis → Reverse Handoff к Discovery для more evidence

## Health metrics для этой workflow

| Метрика | Здоровый | Проблемный | Действие |
|---------|:--------:|:----------:|----------|
| Session 1-3 velocity | 1 session / 1-2 days | > 3 days / session | Проверить clarification quality |
| Evidence coverage (per camp) | ≥ 80% | < 50% | Discovery loop |
| Contamination | false | true | Rerun или partial rerun |
| Mediator synthesis delta (Total) | < 1.5 (hybrid expected) | > 3.0 | Возможен bias, re-audit |
| Session 5 parallel completion | All 4 parallel agents ✅ | Sequential due to dependencies | Unblock by PM |

## Output

- `prd.pdf` — финальный PRD для команды (30-45 страниц)
- `product-review-deck.pdf` — для exec-sign-off (15-20 слайдов)
- Все `session-N-handoff.md` в `docs/product/` (N = 1..5)
- `$board` history с метриками

## Пример — TeamFlow AI 1:1 Summarization (сквозной)

**Запрос:** «Нужно ли нам запускать AI 1:1 summarization для managers? Какая должна быть стратегия?»

**Режим:** /ship-right-thing (стратегия не утверждена, high stakes — $M initiative)

**Сессия 1 (Discovery):**
- Conductor: 5+ вопросов (segment HR-tech, ARR $8M, buyer=CPO, end-user=Manager).
- Discovery: 8 manager interviews (✅ Verified), CPO 2 interviews (⚠️ Old). 3 problems (top: 2h/week prep pain). 8 assumptions (top risky: «managers actually read summaries»). Coverage 72%.

**Сессия 2 (Customer-Champion α):**
- Strategy Alpha: Vision «managers save 2h/week», NSM = «40% MAM × 4.0 rating», OKR focus adoption + retention.

**Сессия 3 (Business-Champion β):**
- Strategy Beta: Vision «unlock $1M ARR HR-tech segment», NSM = «ARR per seat × seats-with-activity», OKR focus sales motion + ARPU.

**Сессия 4 (Mediator):**
- Scoring: Alpha Total 7.3, Beta Total 7.4 (delta < 0.5 → паритет).
- Synthesis: **Hybrid** — Alpha vision (user) + Beta risk lens (adoption stall) + hybrid OKR (40% MAM + 10 HR-tech logo wins).

**Сессия 5 (Planning):**
- PM PRD: 10 user stories, RICE-scored, epics 5, rollout pilot→beta→GA.
- UX: primary flow (generate summary post-1:1), accessibility WCAG AA.
- Tech: 10 team-weeks critical path, 5 risks managed.
- Data: NSM tree, 3 hypotheses, 1 A/B design (coaching prompts).

**Сессия 6 (Document):**
- Designer: PRD 35 pages + Deck 15 slides.
- Layouter: HTML → PDF, self-contained.
- Release Gate: user sign-off, PDF публикуется.

**Итог:** 6 sessions × ~2h = 12h для unified plan, validated с adversarial дебатом, evidence-based.
