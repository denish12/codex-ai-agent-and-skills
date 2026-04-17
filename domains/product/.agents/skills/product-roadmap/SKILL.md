---
name: product-roadmap
description: Дорожная карта по темам — Now / Next / Later, без жёстких дат, attached к OKR
---
# Product Roadmap

> **Категория:** Strategy  ·  **Slug:** `product-roadmap`

## Когда использовать

- При квартальном или полугодовом планировании.
- При stakeholder communication (exec, sales, customer success).
- Для alignment cross-functional работы (eng + design + marketing + CS).
- При public-facing customer roadmap (с оговорками).

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Product vision | ✅ | Long-term direction |
| OKRs | ✅ | Current quarter goals |
| North Star Metric | ✅ | Alignment anchor |
| Backlog (prioritized) | ✅ | Initiatives + score |
| Capacity | ✅ | Team size, eng bandwidth |
| Known commitments | ⬚ | Customer promises, compliance deadlines |

## Источники данных

1. `$okr-framework` — quarterly goals.
2. `$rice-scoring` / `$moscow-prioritization` — initiatives.
3. `$jtbd-canvas` / `$opportunity-solution-tree` — opportunity themes.
4. Customer feedback (support, NPS, direct requests).

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `okr-framework` | KRs | Перед roadmap |
| `rice-scoring` | Prioritized initiatives | Для Now/Next/Later assignment |
| `kano-model` | Feature balance | Баланс must-have / delighters |
| `product-vision` | Themes rationale | Темы должны fit vision |

## Формат: Now / Next / Later by Theme

```
Theme A: [Customer outcome]
  Now (0-3 months):    [Initiative 1], [Initiative 2]
  Next (3-6 months):   [Initiative 3]
  Later (6+ months):   [Theme direction]

Theme B: ...
```

**Темы**, не фичи: каждая theme = customer outcome или strategic direction.

## Протокол

### Шаг 0 — Identify Themes

Из vision + OKR определить 3-5 themes на текущий horizon.

Theme = customer-valued outcome, не «Q2 release».

✅ Good themes:
- «Onboarding: new teams activate in <7 days»
- «Enterprise-ready: SSO, SCIM, audit logs»
- «Usage visibility: account-level analytics»

❌ Bad themes:
- «Platform improvements» (слишком abstract)
- «Bug fixes» (не theme, это operational)
- «Ship feature X» (single feature ≠ theme)

### Шаг 1 — Initiatives per Theme

Для каждой theme — список initiatives (из backlog). Через `$rice-scoring`.

| Theme | Initiative | RICE Score | Effort (t-shirt) |
|-------|------------|:----------:|:----------------:|
| Onboarding | In-app checklist | 45 | M |
| Onboarding | Team templates | 30 | L |

### Шаг 2 — Capacity Check

- Team size × weeks = total person-weeks
- Minus: oncall, meetings, eng debt, slack (~30%)
- Net available = useful capacity

Match Now (0-3 months) к ~70-80% capacity. Остальное — buffer для incidents, emergent work.

### Шаг 3 — Assignment to Now / Next / Later

**Now** — committed to work, specific scope, start date within 6 weeks.

**Next** — high-priority, but scope/timing TBD. Will start в 3-6 months.

**Later** — strategically important, но not yet shaped. Placeholder направлений.

Не putаем даты, кроме hard external commits (compliance, customer SLA).

### Шаг 4 — Cross-team Dependencies

Для каждой initiative:
- Какие teams involved (design, data, platform, security)?
- External dependencies (vendors, legal, partnerships)?
- Hard deadlines (contract, regulation)?

### Шаг 5 — Risks + Contingencies

- Top 3 risks per theme (missing deps, scope uncertainty, hiring)
- Trigger events — что заставит roadmap measure adjustment

### Шаг 6 — Communication Artifact

Два format:
- **Internal roadmap** — полный, с RICE scores, risks
- **External roadmap** (if shared с customers) — themes + directions, **без promised dates**, с disclaimer «subject to change»

### Шаг 7 — Review Cadence

- **Monthly:** progress, emergent work, re-assignment
- **Quarterly:** Now → shipped, Next → Now, Later → shaped
- **Board/exec:** quarterly summary

## Валидация (Quality Gate)

- [ ] 3-5 themes, customer-outcome framed
- [ ] Каждая theme имеет initiatives
- [ ] Initiatives — scored (RICE / MoSCoW)
- [ ] Capacity check: Now ~70-80%
- [ ] No hard dates кроме external commits
- [ ] Dependencies identified
- [ ] Risks listed
- [ ] Internal + external versions разделены

## Handoff

Результат является входом для:
- **PM** → PRDs для Now initiatives
- **Tech Lead** → engineering planning
- **Stakeholders** → expectation setting
- **Mediator** (Full A) — для synthesis

Формат: roadmap doc (markdown + optional visual / timeline). Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Dated roadmap (публичный) | Пропущенные даты → эрозия доверия | Темы без дат во внешних |
| Feature list вместо themes | Нет outcome framing | Themes = outcomes |
| 100% capacity | No buffer для инцидентов | 70-80% в Now |
| Слишком много themes (6+) | Focus lost | 3-5 themes |
| No review cadence | Устаревший roadmap | Ежемесячные check-ins |
| Promise «всё это» | Under-delivers | Now = обязательство, Next = намерение, Later = направление |

## Шаблон

```markdown
# Product Roadmap — Q2-Q3 2026

## Themes

### Theme 1: [Customer Outcome]
**Почему:** [alignment с vision / OKR]

#### Now (0-3 месяца)
- [Initiative A] — RICE 45, Effort M, Owner: PM-X
- [Initiative B] — RICE 30, Effort L

#### Next (3-6 месяцев)
- [Initiative C]

#### Later (6+ месяцев)
- [Направление]

**Dependencies:** [cross-team]
**Риски:** [top 3]

### Theme 2: ...

---

## Capacity
- Команда: N человек
- Now commitment: X person-weeks (Y% capacity)
- Buffer: 20%

## Review Cadence
- Ежемесячно: прогресс + emergent work
- Ежеквартально: пересмотр Next/Later
```

## Worked Example — TeamFlow Roadmap Q2-Q3 2026

**Контекст:** TeamFlow after Q1 Mediator synthesis + OKR set. Roadmap aligns to unified vision (workflow + analytics), cascades через 3 Objectives.

```markdown
# Product Roadmap — Q2-Q3 2026 (TeamFlow Product)

## Strategic Context
- **Vision:** AI-powered People Ops platform (workflow + analytics)
- **NSM:** Sticky Manager Ratio (AI Tier)
- **OKRs:** O1 (AI tier ships + adoption), O2 (Enterprise tier expansion), O3 (data foundation)
- **Horizon:** 6 months (Q2 + Q3)

## Themes

### Theme 1: AI-Assisted 1:1 Workflow (Ценность для End-User)
**Почему:** Драйвит O1 (adoption менеджеров). Решает топ JTBD (admin overhead менеджера).

#### Now (0-3 месяца, апрель-июнь)
- **AI Summarization MVP** — auto-transcribe + summarize + action items. RICE 288, L effort. Owner: PM Alex. *Статус: Неделя 4/12.*
- **Inline Summary Edit** — менеджер проверяет/корректирует перед сохранением. Must-have из Kano. RICE 52, M effort.
- **Action Items Auto-Extract + Reminders** — извлечено из AI summary, отображается перед следующей 1:1. RICE 58, M.
- **Per-Meeting AI Toggle** — privacy Must-have. RICE 45, S.

#### Next (3-6 месяцев, июль-сентябрь)
- **Real-Time Prep Card** — AI генерирует pre-1:1 context brief (предыдущие темы, открытые action items, предлагаемые prompts). Delighter-turning-Performance.
- **Calendar Integration v2** — auto-pull из Google Cal + Outlook, маппинг в TeamFlow 1:1s.
- **Mobile Summary Review** — просмотр / одобрение summaries с мобильного.

#### Later (6+ месяцев, Q4+)
- **Voice-only interaction** — менеджер говорит, печатать не нужно (delighter).
- **Multi-language summarization** — нерусскоязычные компании.
- **Group meeting summarization** — за рамками 1:1s (контроль scope creep).

**Dependencies:** Одобрение LLM API budget (CFO, к Неделе 3); Privacy/Legal review для EU data residency.
**Риски:** (1) LLM quality plateau ниже 85% приемлемого — меры защиты: human-review layer feature flag. (2) Изменение pricing OpenAI — меры защиты: протестирована vendor альтернатива (Anthropic via AWS Bedrock).

---

### Theme 2: People Ops Analytics (Ценность для Buyer → Enterprise Expansion)
**Почему:** Драйвит O2 (enterprise tier). Решает разрыв видимости VP HR.

#### Now (0-3 месяца)
- **Aggregate 1:1 Cadence Dashboard** — per-team, per-manager частота + длительность. RICE 45, M.
- **Manager Health Score (MVP)** — 4-компонентный score (cadence, velocity action items, NPS, attrition). Delighter-turning-Performance. RICE 32, L.
- **Quarterly Exec Report Generator** — auto-composed board-ready PDF. RICE 28, M.

#### Next (3-6 месяцев)
- **Benchmark Engine** — отраслевые сравнения (наша частота 1:1 в топ-квартиле?). Differentiation moat.
- **At-Risk Team Detector** — pattern-based раннее предупреждение. На базе AI.
- **Manager Coaching Insights** — AI выявляет coaching opportunities на каждого менеджера.

#### Later (6+ месяцев)
- **Predictive Attrition Model** — данные manager practice → риск retention.
- **Cross-Customer Benchmarks** — network effect analytics.

**Dependencies:** Инструментация data pipeline (предпосылка Theme 3). Security attestation SOC 2 Type II для analytics tier.
**Риски:** (1) Benchmark данных мало до N ≥ 20 Enterprise customers — меры защиты: начать с internal team benchmarks. (2) Недовольство менеджеров при восприятии как слежки — меры защиты: только aggregate, прозрачная модель данных.

---

### Theme 3: Data & Privacy Foundation
**Почему:** Драйвит O3 (foundation). Обеспечивает Themes 1 & 2.

#### Now (0-3 месяца)
- **Event Schema + Instrumentation** — надёжный 1:1 behavioral data pipeline. Platform work.
- **Privacy Architecture** — opt-in, user-controlled, региональные LLM endpoints (US + EU + APAC).
- **SOC 2 Type II Extension** — для покрытия AI features.

#### Next (3-6 месяцев)
- **Data Retention Controls UI** — customer-controlled (30/90/365 дней).
- **Audit Log Enhancements** — Кто обращался к какому summary и когда.

#### Later (6+ месяцев)
- **HIPAA-ready tier** — для healthcare customers.
- **On-premise LLM option** — для ultra-regulated enterprise.

**Dependencies:** Legal review; вовлечение external security audit firm.
**Риски:** (1) Задержки аудита → Enterprise deals слипают — меры защиты: параллельный аудит + conditional deals.

---

## Capacity

- **Команда:** 8 engineers + 3 PM + 2 design + 1 data = 14 человек
- **Доступные person-weeks:** 14 × 13 недель = 182 недели (на 13-sprint квартал)
- **Распределение:**
  - Theme 1: 70 person-weeks (54% от Now)
  - Theme 2: 45 person-weeks (35% от Now)
  - Theme 3: 30 person-weeks (23% — платформа невидима но критична)
  - Total Now: 145 person-weeks
  - **Buffer:** 37 person-weeks (20% — для инцидентов, emergent work, ramp найма)

## Public-facing Roadmap (для Customers)

### Что дальше в TeamFlow

- **Q2 2026:** AI-assisted 1:1 summaries + action items tracking (Team tier)
- **Q3 2026:** People Ops analytics + team benchmarks (Enterprise tier)
- **Coming Later:** Продвинутые AI coaching insights, predictive analytics

*Этот публичный roadmap показывает темы без конкретных дат. Функции выходят когда готовы; мы делимся прогрессом через ежеквартальные webinars для customers. [Подписаться на обновления].*

## Review Cadence
- **Ежемесячно 1-й вторник:** прогресс по темам + интеграция emergent work
- **Mid-Q (Неделя 6, 12 мая):** пересмотр Now, конвертировать Next→Now если опережаем
- **End-Q (30 июня):** полное ретро, повышения Next→Now, добавления Later
- **Ежегодно (декабрь):** Темы эволюционировали / выведены; определён новый горизонт
```

> **Урок roadmap:** **Три themes = три OKRs**. Каждая theme драйвит один Objective, поэтому команда может сказать «если я касаюсь Theme 1 на этой неделе, я двигаю KR1.x». Нет orphan work. Dependencies между themes (Theme 3 обеспечивает data layer для Theme 2) задокументированы явно — это предотвращает путаницу «почему platform team занята?». Публичная версия строго избегает дат — урок из прошлого недовольства из-за пропущенных дат в Q4 2025.
