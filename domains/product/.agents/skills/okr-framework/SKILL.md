---
name: okr-framework
description: Objectives & Key Results для B2B продуктовых команд — квартальный цикл, measurable key results
---
# OKR Framework

> **Категория:** Strategy  ·  **Slug:** `okr-framework`

## Когда использовать

- При квартальном планировании продуктовой команды.
- При трансляции vision → operational goals.
- При alignment с exec-level goals (cascading OKR).
- При post-quarter review — grade KRs.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Product vision | ✅ | Что является long-term north star |
| North Star Metric | ✅ | Measurable anchor |
| Company-level goals | ✅ | Какие OKR сверху |
| Предыдущий квартал grade | ⬚ | Для adjustments |
| Team capacity | ✅ | Честная оценка ресурсов |

## Источники данных

1. `$product-vision` — long-term direction.
2. `$north-star-metric` — основная метрика.
3. Company OKR — alignment с company goals.
4. Previous quarter results — learning.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `product-vision` | Vision | Перед OKR — для alignment |
| `north-star-metric` | NSM | KRs часто привязаны к NSM |
| `product-roadmap` | Initiatives | OKR → roadmap themes |
| `rice-scoring` | Priorities | Какие initiatives в этом квартале |

## Структура

```
Objective (качественная цель, inspirational)
  ├── Key Result 1 (measurable, outcome, not output)
  ├── Key Result 2
  └── Key Result 3
```

## Протокол

### Шаг 0 — Cascade from Company

1. Посмотреть company-level Objectives.
2. Какие из них мы продукт-командой драйвим?
3. Alignment не через copy-paste — через «как мы вкладываемся».

### Шаг 1 — Objectives (1-3)

Правила:
- **Качественные, inspirational** — не число
- Clear enough to know «did we achieve it?»
- Time-bounded (обычно квартал)
- 1-3 за квартал — больше = distraction

✅ Good: «Become the default onboarding tool for mid-market engineering teams»  
❌ Bad: «Increase feature adoption» (слабо inspirational) или «Grow ARR by 15%» (это KR, не O)

### Шаг 2 — Key Results per Objective (2-5)

Правила:
- **Measurable** — numeric target
- **Outcome, не output** (не «ship feature X», а «feature X used by Y teams»)
- **Ambitious** — 70% grade = success (target = stretch)
- **Time-boxed** (к концу квартала)

Типы KRs:
- **Impact metrics:** NRR, activation rate, retention
- **Leading indicators:** time-to-value, feature adoption
- **Quality:** p95 latency, error rate, NPS

Смешивать типы — не все impact, не все leading.

✅ Good KR: «Grow weekly active teams from 120 to 180»  
❌ Bad KR: «Ship checkout redesign» (output, not outcome)

### Шаг 3 — Ambition Calibration

Stretch goals:
- **Committed KRs** (обязательно выполнить) — 100% target. Обычно 0.8× ambitious.
- **Aspirational KRs** — 70% target. Обычно 1.3× ambitious.

В B2B SaaS обычно mix: 70% committed + 30% aspirational.

### Шаг 4 — Initiatives Mapping

Для каждого KR — **какие initiatives** (features, projects) драйвят его? Через `$product-roadmap`.

| KR | Initiative | Expected impact | Timeline |
|----|------------|:---------------:|----------|
| KR1 | Onboarding checklist | +15% activation | Week 4-8 |

### Шаг 5 — Sanity Check

- Команда capacity хватает? (не over-ambitious)
- Каждое Objective имеет ≥ 2 KRs?
- KRs cover leading + lagging?
- Conflict check: достижение одного KR не разрушает другое?

### Шаг 6 — Review Cadence

- **Weekly:** progress check (burndown style)
- **Mid-quarter:** re-calibration (adjust committed/aspirational если реальность изменилась)
- **End-of-quarter:** grade каждой KR (0-1.0), retro

### Шаг 7 — Grading

- 0.0-0.3 — failed / didn't prioritize
- 0.4-0.6 — didn't hit but made progress
- 0.7 — hit target (healthy for aspirational)
- 1.0 — fully achieved (if consistently 1.0 → KRs не достаточно ambitious)

## Валидация (Quality Gate)

- [ ] 1-3 Objectives per team / quarter
- [ ] 2-5 KRs per Objective
- [ ] KRs measurable (numeric, не subjective)
- [ ] KRs outcome-focused, не output
- [ ] Mix leading + lagging
- [ ] Initiatives mapped к KRs
- [ ] Capacity-checked
- [ ] Cascade alignment с company OKR
- [ ] Review cadence planned

## Handoff

Результат является входом для:
- **`product-roadmap`** — initiatives mapped to KRs
- **`rice-scoring`** — приоритизация initiatives within quarter
- **Data Analyst** (`$saas-metrics`, `$hypothesis-template`) — как измерить KRs

Формат: OKR doc (одна страница per quarter). Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Слишком много Objectives | Потеря фокуса | Макс 3 |
| KR = feature ship | Output, не outcome | Измеряй customer impact |
| Vague KR | «Улучшить X» | Числовой: «X от A до B» |
| No ambition | Всегда 1.0 | Aspirational: stretch 70% |
| Ignoring capacity | Overcommit | Честная проверка capacity |
| Copy-paste from company | Не cascaded | «Как мы вкладываемся в» |

## Шаблон

```markdown
# OKR Q2 2026 — [Название команды]

## O1: [Вдохновляющий Objective]
- **KR1.1:** [Метрика] от [baseline] до [target] к [дате]
- **KR1.2:** [Метрика] от X до Y
- **KR1.3:** ...

### Initiatives для O1
| KR | Initiative | Ожидаемый impact | Timeline |
| ... |

## O2: ...

---

## Проверка здоровья
- [ ] Objectives вдохновляют
- [ ] KRs измеримы
- [ ] Честно по capacity
- [ ] Cascade проверен

## Расписание ревью
- Еженедельно по вторникам: прогресс
- Mid-Q (неделя 6): пересмотр
- End-Q: оценка + ретро
```

## Worked Example — TeamFlow Q2 2026 OKRs (Product team, post-Mediator)

**Контекст:** TeamFlow (B2B SaaS HR-tech, $8M ARR). После Mediator synthesis visions (Alpha + Beta) команда формирует Q2 OKRs для Product team. Company-level OKRs: grow ARR 50% YoY ($8M → $12M by Q4) + launch AI tier + NRR 105% → 110%.

```markdown
# OKR Q2 2026 — TeamFlow Product Team

## Контекст компании (cascade input)
- **Company O:** Стать лидирующей платформой People Ops в категории к 2027
- **Company KR:** $12M ARR к Q4 2026 (с $8M), NRR 115%, запуск AI tier
- **Наша cascade роль:** Драйвить product-led expansion; обеспечить Enterprise tier; сделать AI MVP успешным

---

## O1: Запустить AI 1:1 tier, который менеджеры полюбят, а покупатели за него заплатят

**Ambition:** Aspirational (70% grade = успех)

- **KR1.1:** 40 customers (of 200 base) upgraded to AI Team tier ($8/seat) by June 30
  - Baseline: 0 (tier ещё не существует)
  - Target: 40 аккаунтов = 20% проникновение в базу
  - Stretch: 60 аккаунтов
- **KR1.2:** Among upgraded accounts, 65% of active managers use AI summarization weekly (vs zero baseline)
- **KR1.3:** AI summarization NPS ≥ 50 (vs general TeamFlow NPS 45)
- **KR1.4:** Action items completion rate lifts from 60% baseline to 75% in AI tier accounts

### Initiatives для O1
| KR | Initiative | Ожидаемый impact | Timeline |
|----|------------|-----------------|----------|
| KR1.1 | Запуск AI Team tier (feature flag gated) | 40 разговоров об upgrade | Week 4-10 |
| KR1.1 | GTM campaign (email, webinar, in-app) | +15 upgrades | Week 6-12 |
| KR1.2 | Onboarding flow для новых AI пользователей (checklist + first-success moment) | +25pp adoption | Week 8-10 |
| KR1.3 | Feedback loop (in-product rating после каждого summary) | Signal для iteration | Week 6-ongoing |
| KR1.4 | Автоматические reminders для AI-extracted action items | +15pp completion | Week 10-12 |

---

## O2: Утвердить Enterprise tier как достоверный путь расширения

**Ambition:** Committed (100% grade = обязательно выполнить)

- **KR2.1:** 5 Enterprise tier аккаунтов подписаны ($50+/seat, мин 300 seats каждый) к 30 июня
  - Baseline: 10 Enterprise аккаунтов на legacy pricing
  - Target: 5 на новом Enterprise tier
- **KR2.2:** Enterprise pilot: 3 design partners live на aggregate dashboard + health score features
- **KR2.3:** Security review пройден: SOC 2 Type II controls задокументированы для AI features (blocker для 2 deals)
- **KR2.4:** 0 отклонений Enterprise контрактов из-за compliance/AI concerns (baseline: 2 в Q1)

### Initiatives для O2
| KR | Initiative | Ожидаемый impact | Timeline |
|----|------------|-----------------|----------|
| KR2.1 | Enterprise tier pricing + packaging docs | Sales enablement | Week 2-4 |
| KR2.2 | Aggregate dashboard MVP (из Beta vision) | 3 design partners привлечено | Week 6-12 |
| KR2.3 | SOC 2 Type II аудит для AI tier | Разблокировать enterprise deals | Week 1-8 |
| KR2.4 | Compliance FAQ + deck для работы с возражениями | Sales сокращает время на возражения | Week 4 |

---

## O3: Создать data foundation для лидерства в категории 2027

**Ambition:** Aspirational (70%)

- **KR3.1:** 1:1 behavioral data pipeline инструментирует 100% AI tier events (надёжно для downstream analytics)
- **KR3.2:** Privacy architecture проходит внешний аудит (trust layer для будущих AI features)
- **KR3.3:** Benchmark engine MVP — 3 отраслевых/сегментных сравнения live для Enterprise аккаунтов

### Initiatives для O3
| KR | Initiative | Ожидаемый impact | Timeline |
|----|------------|-----------------|----------|
| KR3.1 | Event schema + instrumentation (PM + Data) | Основа данных для Q3 features | Week 4-8 |
| KR3.2 | Privacy architecture review + attestation | Укрепление moat | Week 2-10 |
| KR3.3 | Benchmark calculation engine | Восхищение Enterprise | Week 10-13 |

---

## Проверка здоровья
- [x] Objectives вдохновляют — все связаны с позиционированием в категории
- [x] KRs измеримы — все числовые (% / count / NPS / binary)
- [x] Честно по capacity — 8 eng + 3 PM + 2 design = 13 person-weeks capacity per sprint × 13 sprints = 169 weeks всего доступно; запланированные initiatives ≈ 120 person-weeks (71% capacity, 29% buffer)
- [x] Cascade проверен — O1 драйвит Company KR «launch AI tier»; O2 драйвит «NRR 115%»; O3 драйвит «category leadership»

## Расписание ревью
- **Еженедельно по вторникам в 10:00:** progress burndown + корректировки (15 мин на каждый Objective)
- **Mid-Q (Неделя 6, 12 мая):** пересмотр commitments, переместить committed↔aspirational если реальность изменилась
- **End-Q (30 июня):** оценить все KRs (0-1.0), ретроспектива, input для Q3

## Шкала оценок (применяется в конце квартала)

Пример оценки для KR1.1 (40 upgrades аккаунтов):
- Достигли 40 → 1.0 (цель выполнена)
- Достигли 30 → 0.75 (здоровый прогресс, 75% от цели)
- Достигли 20 → 0.5 (частично)
- Достигли 10 → 0.25 (минимально)
- Достигли 0 → 0.0

Для aspirational KRs, 0.7 = зелёный. Для committed KRs, всё что ниже 1.0 запускает ретро.
```

> **Урок OKR:** O1, O2, O3 распределены по приоритетам Alpha и Beta — O1 с весом Alpha (workflow + managers), O2 с весом Beta (analytics + buyers), O3 — основа для обоих. Это предотвращает пересмотр Mediator synthesis на уровне OKR — roadmap теперь направляется тройным Objective, а не политикой camp.
