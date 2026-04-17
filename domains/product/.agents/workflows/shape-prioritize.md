# /shape-prioritize — Full Pipeline B (Build-vs-Cut Adversarial)

> **Используй, когда стратегия утверждена, а scope-дискуссия открыта.**
> 6 сессий с adversarial на оси **Build vs Cut**. Mediator синтезирует final MoSCoW. Output — PRD (PDF).

## Когда использовать

- Strategy / vision / roadmap theme уже согласованы (внутри команды или в предыдущей /ship-right-thing сессии)
- Команда расходится: «build everything» vs «cut ruthlessly»
- Сжатый timeline, важна приоритизация
- Нужен финальный PRD с обоснованным scope и scope-rationale appendix
- High-stakes release (quarter-defining initiative)

## Когда НЕ использовать

- Стратегия не утверждена → `/ship-right-thing`
- Scope утверждён, нужен только PRD → `/spec`
- Быстрая оценка → `/quick-pm`
- Solo-PM scope decision без disagreement → `/spec` (с PM acting in consultation)

## Decision Tree (уточняющие вопросы в COND-01)

```
Strategy утверждена?
  ├── НЕТ → /ship-right-thing (нужен strategy synthesis first)
  └── ДА → продолжаем

Scope-дебат открыт?
  ├── ДА (команда спорит / timeline pressure) → /shape-prioritize (эта workflow)
  └── НЕТ (scope известен) → /spec

Risk of cut (вырезаем ценное) или risk of bloat (overcommit) — одинаково высоки?
  ├── ДА → /shape-prioritize (adversarial ценен)
  └── НЕТ (одна сторона очевидна) → /spec

Нужна exec-review presentation с scope-rationale?
  ├── ДА → /shape-prioritize (mini deck part of output)
  └── НЕТ → /shape-prioritize всё равно (PRD первичен), mini deck optional
```

## Пайплайн (6 сессий)

```
Сессия 1: CONDUCTOR → DISCOVERY (scope intake)                         → session-1-handoff.md
Сессия 2: CONDUCTOR → BUILD-CAMP (pm α + tech_lead α)                  → session-2-handoff.md
Сессия 3: CONDUCTOR → CUT-CAMP (pm β + tech_lead β)                    → session-3-handoff.md
Сессия 4: CONDUCTOR → MEDIATOR (Scope Synthesis)                       → session-4-handoff.md
Сессия 5: CONDUCTOR → PM (final PRD) → UX_DESIGNER + DATA_ANALYST      → session-5-handoff.md
Сессия 6: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE_GATE               → PDF
```

Каждая сессия стартует с нуля. В отличие от /ship-right-thing, PM α и β работают **в паре с Tech Lead α и β** — двухагентные камды (parallel expertise).

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Утверждённая стратегия / roadmap theme | ✅ | Откуда pull'аем: какая initiative |
| Vision / NSM / OKR | ✅ | Из утверждённой strategy |
| Time box (release horizon) | ✅ | Quarter / release date |
| Team composition | ✅ | Senior / mid / junior count, velocity baseline |
| Tech constraints | ✅ | Stack, integrations, existing tech debt |
| Compliance constraints | ⬚ | SOC 2 / GDPR / HIPAA / industry-specific |
| Initial backlog (если есть) | ⬚ | Что уже обсуждается в команде |
| Budget ceiling | ⬚ | Для Tech Lead feasibility с budget-constraint |

## Гейты и deliverables

### Сессия 1 — Scope Intake Gate

- **COND-01** (Conductor): Interview Brief
  - 5+ clarifying questions (current scope-дебат, team composition, constraints)
  - Strategy Brief загружен (pointer или inline)
  - Scope-debate context задокументирован

- **DISC-01** (Discovery): Scope-focused Discovery Brief
  - Какие JTBD в scope (в рамках утверждённой strategy) — и которые НЕ в scope
  - Assumptions: что считаем верным для scope-decision
  - Open questions (которые требуют experiments / pilots)
  - Focus на end-user JTBD (buyer уже обосновал strategy)

### Сессия 2 — Build-Camp (Camp Alpha)

- **PM-01α** (PM α, paired с Tech Lead α): full Scope Proposal
  - RICE-scored backlog (top 15-20 items)
  - **Каждая позиция с rationale** «почему обязательно сейчас»
  - Include-bias: каждая идея презюмируется нужной, burden of proof — показать что можно отложить
  - Kano balance (может содержать delighters как аргумент «без этого не выигрываем»)
  - Out-of-scope: minimal, явно

- **TECH-01α** (Tech Lead α, paired с PM α): Build Feasibility
  - «Yes, доставим за N team-weeks при [team setup]»
  - t-shirt по **нижней границе** с rationale параллелизации
  - Existing-stack leverage точки
  - Allowed trade-offs (но не cuts)
  - Managed risk posture: каждый риск с mitigation

### Сессия 3 — Cut-Camp (Camp Beta)

- **PM-02β** (PM β, paired с Tech Lead β): Minimum Scope Proposal
  - **MoSCoW**: Must только без чего не запускаемся
  - Should / Could / Won't (this release) с rationale per cut
  - Exclude-bias: каждая идея презюмируется лишней, burden of proof — почему обязательно сейчас, а не в Q2
  - Validation paths для deferred items (experiments в Q2)
  - Out-of-scope: максимально явно, с rationale

- **TECH-02β** (Tech Lead β, paired с PM β): Hidden Risks + Cut Rationale
  - t-shirt по **верхней границе** с rationale hidden dependencies
  - Скрытые интеграции, migration costs
  - Technical debt implications (что нельзя начать без prior work)
  - Compliance phantoms (SOC 2 / GDPR riding tag)
  - 3rd party SLA risks
  - «Что нельзя начать без [X]» явно для каждого deferred item

### Сессия 4 — Mediator Scope Synthesis

- **MED-01** (Mediator): Unified Scope Decision
  - **Independence check** (contamination: true/false)
  - Evidence audit per camp (coverage %, strength per позиция)
  - Position map **per item** (Alpha Build / Beta Cut / overlap / disagreement)
  - Disagreement analysis per item (Factual / Value / Risk / Methodological)
  - Scoring (5 dimensions): Evidence / Coherence / Delivery Feasibility / Risk / Value Density
  - Strengths & Weaknesses per camp
  - **Synthesis Path**: Adopt Build / Adopt Cut / Hybrid (often hybrid — Must from both + Should from one)
  - **Final MoSCoW** — source-pointer per item
  - Tradeoff map (что выбросили и почему)
  - Delivery estimate (team-weeks)

### Сессия 5 — Spec (Final PRD на утверждённый scope)

- **PM-SPEC** (PM, neutral — executes Mediator synthesis):
  - Финальный PRD (10 секций)
  - User stories INVEST + Gherkin AC на Mediator-approved items
  - Epic breakdown
  - Scope rationale appendix (из Mediator Tradeoff Map)
  - NFR (из Mediator synthesis + Tech reviews)
  - Success metrics (из approved Strategy)
  - Rollout plan (pilot → beta → GA с criteria)

- **UX-01** (UX Designer, параллельно):
  - User flows для Mediator-approved scope
  - Low-fi wireframes для Must items
  - Accessibility checklist (WCAG AA)
  - Design brief для Designer

- **DATA-01** (Data Analyst, параллельно):
  - Metric plan для approved scope
  - Validation experiments для deferred items (Q2 planning)
  - SaaS Impact Model (cut items — потенциальный impact как reference)
  - Instrumentation requirements

Note: в Full B Сессии 5 **Tech Lead** не требуется активно — feasibility уже выстроена в Сессиях 2-3 и синтезирована Mediator. Если PRD spec revealы new tech concerns — Reverse Handoff к Tech Lead.

### Сессия 6 — Document

- **DS-01** (Designer): Design Spec
  - PRD document IA с scope rationale appendix
  - Mini deck (10 slides): scope decision rationale для stakeholder review (не полный exec deck — Full B фокус на PRD)
  - Visualizations: MoSCoW matrix, Tradeoff map, Epic breakdown, Risk heatmap

- **LY-01** (Layouter): HTML → PDF
  - PRD HTML (25-30 страниц + appendix)
  - Mini deck HTML (10 слайдов, если требуется)
  - Self-contained, print-ready

- **RG-01** (Conductor): Release Gate sign-off

## Build-Camp vs Cut-Camp Rules

**Build-Camp presumption:** каждая идея на столе — нужна. Burden of proof — показать, что можно отложить.
- t-shirt по нижней границе.
- Параллелизация через team setup.
- Existing-stack leverage.
- Managed risk (mitigation per риск).
- Output tone: «вот путь — это реализуемо».

**Cut-Camp presumption:** каждая идея — лишняя. Burden of proof — показать, что обязательно сейчас.
- t-shirt по верхней границе.
- Hidden dependencies surfaced.
- Compliance / tech debt / 3rd party risks явно.
- Validation paths для deferred items.
- Output tone: «вот риски — вот что отложим, и вот как провалидируем».

Оба используют **одинаковый** Discovery Brief и Strategy Brief как input.

**Camp discipline self-check (перед handoff):**
- Build-Camp: «Я вырезал item, который был в Discovery?» → если да, переосмыслить как Include.
- Cut-Camp: «Я включил item на "nice-to-have" rationale?» → если да, переместить в Should / Could.

## Adversarial Independence (правило 4 пайплайна)

Build-Camp (PM α + Tech Lead α) и Cut-Camp (PM β + Tech Lead β) работают независимо.

- Не видят друг друга до Mediator.
- Paired agents (PM + Tech Lead) внутри одной камды координируются через Conductor handoff в той же сессии.
- Beta получает Alpha deliverable read-only через camp filter в Сессии 3.
- Contamination check Mediator — как в Full A.

## Severity levels

- **P0 Blocker:** отсутствие одной из камд, scope без обоснований, contamination critical, Mediator без synthesis
- **P1 Gap:** thin evidence в Cut-camp (допустимо, Mediator аудирует); weak rationale per item
- **P2 Note:** mini deck для non-exec stakeholders; edge-case items

## Escalation paths

- **Stalemate при equal evidence** — обе камды сильны, delta < 0.5, Mediator не может выбрать path → эскалация user с двумя scope вариантами и recommended
- **Resource block** — scope > capacity даже в Cut-Camp minimum → pause, re-scope в рамках constraint'ов (возврат к Strategy)
- **Compliance block** — Cut-Camp surface compliance requirement, который critical для release → pause, legal review
- **Hidden strategy gap** — revealed что strategy assumption не держится → pause, возврат к /ship-right-thing мини-сессии

## Health metrics для этой workflow

| Метрика | Здоровый | Проблемный | Действие |
|---------|:--------:|:----------:|----------|
| Build-Cut divergence | Delta 10-30% items | Delta > 50% | Possible misalignment — Mediator investigate |
| Cut rationale depth | Per item с tech + user evidence | Hand-wave «nice to cut» | Reverse Handoff к Cut-Camp |
| Build feasibility confidence | ≥ 70% items с Spike или proven pattern | < 40% | Reverse Handoff к Build-Camp + Tech Lead |
| Final MoSCoW Must % | 30-50% total items | > 70% Must | Cut-Camp недоработал, Mediator re-audit |
| Delivery estimate vs time box | ≤ 100% capacity | > 120% | Re-scope в Mediator |

## Output

- `prd.pdf` — финальный PRD с обоснованным scope (25-35 pages + appendix)
- `prd.pdf` → Appendix: Scope Rationale (из Mediator Tradeoff Map)
- Optional `scope-decision-deck.pdf` — 10-slide mini deck для stakeholder review
- Все `session-N-handoff.md` в `docs/product/` (N = 1..5)
- `$board` history с метриками

## Пример — TeamFlow AI 1:1: Shape MVP scope (Full B)

**Запрос:** «Strategy утверждена (AI summaries). Сколько ставим в MVP: summary only / + coaching / + admin dashboard? Timeline Q1.»

**Режим:** /shape-prioritize (strategy approved, scope debate открыт, 3 сценария MVP)

**Сессия 1 (Discovery scope intake):**
- Какие JTBD в scope Q1: end-user summary (Must-have JTBD из прошлой discovery). Buyer dashboard — under review.
- Assumptions: managers actually read summaries (validated in Q4 pilot ✅). CPO pay premium для dashboard (⚠️ assumed).

**Сессия 2 (Build-Camp PM α + TL α):**
- RICE backlog top 12 items. Include: summary + coaching + dashboard + export + RU + Slack.
- TL: 12 team-weeks при 3 senior + 2 mid, параллелизация. Existing stack covers 80%.

**Сессия 3 (Cut-Camp PM β + TL β):**
- MoSCoW: Must = summary + rating feedback. Should = coaching (validate first). Could = dashboard (assumption unvalidated). Won't = RU, Slack, export.
- TL β: Dashboard revealed dependency на new aggregation service (+3 team-weeks). Компliance on OpenAI TOS в-progress (P1 gap).

**Сессия 4 (Mediator Scope Synthesis):**
- Scoring: Build Total 7.0, Cut Total 7.6 (delta 0.6 → slight Cut advantage).
- Synthesis: **Hybrid** — Must = summary + rating (from both), Should = coaching (with validation gate at W4), Could = dashboard (spike в W2 для CPO interviews), Won't = RU / Slack / export.
- Tradeoff map: dashboard отложен до validation (P1 — отключит 20% premium revenue hypothesis), coaching Should с go/no-go gate.

**Сессия 5 (Spec):**
- PRD: 8 user stories на Must + coaching, epics 3, rollout pilot.
- UX: primary flow (generate summary), coaching prompt panel (Should, MVP-2).
- Data: NSM tree, 3 hypotheses, A/B design для coaching.

**Сессия 6:**
- PRD 28 pages + scope rationale appendix (4 pages).
- Mini deck 10 slides (scope decision rationale для VP Eng review).
- Release Gate sign-off.

**Итог:** 6 sessions × ~1.5h = 9h для unified scope с explicit tradeoffs, validated через adversarial debate.
