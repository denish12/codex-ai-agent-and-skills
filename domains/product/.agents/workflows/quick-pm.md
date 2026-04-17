# /quick-pm — Quick Pipeline (1 сессия, без adversarial)

> **Используй для быстрых продуктовых ответов — 1-2 часа работы.**
> 1 сессия, без adversarial, без handoff-файлов между шагами. Output — Short brief (markdown, 1-2 страницы).

## Когда использовать

- Focused продуктовый вопрос с очевидным scope
- Нет времени на Full Pipeline (6 сессий)
- Stakes низкие — решение обратимо или низкозатратное
- Нужна оценка, не полный план
- Unlock decision: «should we X?» / «is Y worth building?»
- Triage ticket / backlog item перед добавлением в quarter plan

## Когда НЕ использовать

- Стратегическое решение (pivot, new segment, $M investment) → `/ship-right-thing`
- Scope-дебат (команда расходится) → `/shape-prioritize`
- Нужен формальный PRD для engineering → `/spec`
- High stakes (quarters of work, irreversible) → `/ship-right-thing`
- Compliance-sensitive решение → Full A/B для thorough risk review

## Decision Tree (уточняющие вопросы в Шаге 0)

```
Stakes?
  ├── Low (reversible, < $10K impact) → /quick-pm (эта workflow)
  ├── Medium ($10-100K, team-quarter impact) → /spec или /shape-prioritize
  └── High (quarters, pivot, > $100K) → /ship-right-thing

Time budget?
  ├── 1-2 hours → /quick-pm
  ├── 3-6 hours → /spec
  └── Multi-day → Full A/B

Scope clarity?
  ├── Obvious (one-pager) → /quick-pm
  ├── Mostly clear, needs spec → /spec
  └── Open debate → /shape-prioritize

Output type?
  ├── Short brief / recommendation → /quick-pm
  ├── Engineering-ready PRD → /spec
  └── Exec-review deck → /ship-right-thing
```

## Пайплайн (1 сессия)

```
CONDUCTOR → DISCOVERY → product_strategist → PM → TECH_LEAD → DATA_ANALYST → Short Brief
```

Все агенты в одной сессии, последовательно, без handoff-файлов между шагами. Каждый агент — compact contribution.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Focused вопрос | ✅ | Формат: «Should we X?» или «How do we prioritize Y?» в 1 предложении |
| Текущий контекст | ✅ | ARR, сегмент, недавние решения — 2-3 sentences |
| Time box | ⬚ | По умолчанию 1-2 часа; max 3 часа |
| Existing evidence (если есть) | ⬚ | Support tickets, user feedback, metrics |
| Decision deadline | ⬚ | Если есть — ограничивает depth |

## Шаги

### Шаг 0 — Clarification (5 min)

**Conductor**: 3-5 уточняющих вопросов (не 5+ как в Full):
- Что конкретно решаем (обратимо ли?)
- Stakes (cost of mistake)?
- Time box?
- Формат ответа (recommendation / estimate / comparison)?
- Любые hard constraints?

### Шаг 1 — Discovery Compact (15-20 min)

**Discovery**:
- JTBD summary (1 абзац для end-user + 1 для buyer если применимо)
- Problem statement (1 sentence)
- Key assumptions (3-5)
- Evidence pointer (если есть — какие данные уже подтверждают direction)

Формат: 30-60 строк markdown.

### Шаг 2 — Strategy Alignment (15 min)

**product_strategist**:
- Какой NSM / OKR связан (reference в approved strategy)
- Какой roadmap theme
- Strategic fit? (strongly / loosely / off-strategy)
- Если off-strategy → эскалация к /ship-right-thing

Формат: 20-40 строк markdown.

### Шаг 3 — PM Assessment (20 min)

**PM**:
- Rough RICE scoring per item (top 3-5 candidates)
- MVP sketch — 3-5 user stories (без Gherkin AC)
- Kano classification (must / performance / delighter)
- Out-of-scope (brief)

Формат: 40-80 строк markdown.

### Шаг 4 — Tech Sanity (10 min)

**Tech Lead**:
- Feasibility rough (S/M/L/XL) overall
- Top 2-3 risks
- Hidden integrations / dependencies? (Yes / No, если Yes — highlight)
- Spike recommendation если unknown unknowns

Формат: 20-30 строк markdown.

### Шаг 5 — Metric Sketch (10 min)

**Data Analyst**:
- Primary success metric (aligned с approved NSM)
- Guardrail (что не должно сломаться — churn / NPS / perf)
- Rough target (number + timeframe)

Формат: 10-20 строк markdown.

### Шаг 6 — Short Brief (final deliverable, 5 min)

**PM** консолидирует:

```markdown
# Quick Brief — [Question]

## Recommendation
[Yes / No / Need more discovery] — 1 sentence

## Rationale (top 3 reasons)
1. ...
2. ...
3. ...

## Rough Scope (if proceed)
- [bullet 1]
- [bullet 2]
- [bullet 3]

## Success Metric
- Primary: [NSM link]
- Guardrail: [что не должно сломаться]
- Rough target: [number + timeframe]

## Key Risks
- [risk 1 + mitigation]
- [risk 2 + mitigation]

## Effort Estimate
- T-shirt: S / M / L
- Team-weeks: ~N

## Next Step
- [Usually: deeper dive via Full A/B, proceed to /spec, or decline]
```

Формат: 1-2 pages markdown.

## Gate sequencing (упрощённый)

Внутри одной сессии — все гейты по порядку:

```
COND-01 → DISC-quick → STRAT-quick → PM-quick → TECH-quick → DATA-quick → LITE-RG
```

Каждый гейт: deliverable + `$gates` mini-check + next step. Без handoff-файлов. User sign-off — на **финальном brief**, не на каждом шаге.

## Severity levels

- **P0:** missing context (ARR, segment, product area)
- **P1:** weak evidence (допустимо — explicitly "preliminary", с noted assumption map)
- **P2:** incomplete strategic fit analysis

## Escalation paths

Если Quick выявляет сложность — **конвертировать в Full A или Full B**:

- **Discovery reveal:** problem space сложнее чем 3-5 assumptions → save brief, escalate к `/ship-right-thing`
- **Scope debate emerges:** команда внутри сессии расходится по scope → escalate к `/shape-prioritize`
- **Strategy misalignment:** initiative off-strategy / contradicts approved → escalate к `/ship-right-thing`
- **High risk revealed:** Tech Lead surfaces compliance / security concern → pause, не ship Quick brief as decision
- **Overrun time box:** сессия > 3h → stop, save progress, escalate (Quick не подходит для этого scope)

## Health metrics

| Метрика | Здоровый | Проблемный | Действие |
|---------|:--------:|:----------:|----------|
| Session duration | 1-2h | > 3h | Escalate to Full |
| Open questions | ≤ 3 | > 6 | Scope too big for Quick |
| Evidence coverage | ≥ 60% | < 30% | Discovery loop recommend, Quick brief как preliminary |
| Strategic fit | Strong / Loose | Off-strategy | Escalate to /ship-right-thing |

## Output

- `quick-brief-[slug].md` (1-2 pages) — финальный deliverable
- Optional: CONTEXT.md update (если project использует CONTEXT.md)
- Optional: добавление item в roadmap backlog (если recommendation = Yes)

## Пример — TeamFlow AI 1:1: Add emoji reactions в summary? (Quick)

**Запрос:** «Стоит ли добавить emoji reactions (👍/❤️/🎉) в summary card? Support tickets просят.»

**Режим:** /quick-pm (low stakes, focused, 1h)

**Шаг 0 (Clarification):**
- Stakes: low (1 week implementation, reversible).
- Deadline: next sprint planning (2 days).
- Format: recommendation + rough estimate.
- Constraints: existing design system, accessibility.

**Шаг 1 (Discovery, 15 min):**
- End-user JTBD: emotional — «I want to react quickly к summary без going back to meeting».
- Evidence: 6 support tickets (Q3-Q4) asking для quick reactions. Manager Slack feedback.
- Assumptions: emoji reactions increase engagement; not distracting.

**Шаг 2 (Strategy, 10 min):**
- NSM link: sessions/week per active manager (engagement proxy). Roadmap theme: «delighters Q2».
- Fit: loosely (not core JTBD, delighter category).

**Шаг 3 (PM, 15 min):**
- RICE: reach 1500 (MAM), impact 0.25 (minor), confidence 80%, effort 1 week → score 300.
- 3 user stories (view reactions, add reaction, see who reacted).
- Kano: delighter.

**Шаг 4 (Tech, 10 min):**
- Feasibility: Yes, S. Existing reactions service (extend).
- Risks: accessibility (screen reader announces), perf (aggregation при 100+ reactions).
- Integrations: existing.

**Шаг 5 (Data, 5 min):**
- Primary: reaction rate per summary (new event).
- Guardrail: summary rating stays ≥ 4.0.
- Target: 30% summaries get ≥ 1 reaction within 4 weeks.

**Шаг 6 (Brief):**

```markdown
# Quick Brief — Emoji Reactions in Summary

## Recommendation
**Yes, add as delighter in Q2.**

## Rationale
1. 6 support tickets + Manager Slack direct ask (demand signal)
2. 1 team-week effort, existing stack leverage
3. Delighter category — differentiator without core risk

## Rough Scope
- 3 emojis (👍/❤️/🎉) в summary card
- Reaction aggregation (count + who)
- Notification to 1:1 participants (optional)

## Success Metric
- Primary: 30% summaries with ≥ 1 reaction in 4 weeks
- Guardrail: summary rating stays ≥ 4.0
- Rough target: 1500 MAM × 30% = 450 reactions/week

## Key Risks
- Accessibility: screen reader announces (mitigation: aria-label per reaction)
- Perf при 100+ reactions (mitigation: cached aggregation, unlikely at current scale)

## Effort Estimate
- T-shirt: S (1 team-week)
- 1 senior engineer

## Next Step
- Add к Q2 roadmap as delighter
- No Full pipeline needed — proceed к /spec в sprint planning
```

**Итог:** 1 session × 60 min = recommendation + rough plan, готов к sprint planning.

---

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Формальный PRD в Quick | Quick = brief, не PRD | Если нужен PRD, escalate to /spec |
| Adversarial в Quick | Adversarial только Full A/B | Single perspective ok для low stakes |
| Overthinking / overrun | Defeats purpose of Quick | Box-ed to 1-2h; > 3h → escalate |
| Skip strategic fit | Off-strategy items slip in | Always check NSM / roadmap link |
| No guardrail metric | NSM можно gaming'овать | Гуардрейл — churn / NPS / perf always |
| Decision без evidence | Guessing в recommendation | Include existing support tickets / metrics / user quotes |
| Quick brief as PRD | Engineering ожидает более detail | Explicit «this is preliminary, PRD to follow» |
| Missing next step | Brief без action | Always define next step (proceed / escalate / decline) |
