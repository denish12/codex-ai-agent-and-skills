---
name: north-star-metric
description: Выбор NSM для B2B SaaS — баланс leading/lagging, alignment с customer value и business outcome
---
# North Star Metric (NSM)

> **Категория:** Strategy  ·  **Slug:** `north-star-metric`

## Когда использовать

- При определении продуктовой стратегии — единая метрика фокуса.
- При alignment команды: decision-making через призму «это поднимает NSM?».
- При board / investor reporting — single metric story.
- При review существующей метрики — still meaningful?

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Product vision | ✅ | North star должен отражать vision |
| Business model | ✅ | Subscription / usage / hybrid |
| Current metric stack | ✅ | MRR, DAU, retention, etc. |
| Customer value definition | ✅ | Что считаем value для customer |
| Adversarial camp (Full A) | ⬚ | alpha (Customer-first) / beta (Business-first) |

## Источники данных

1. Current product analytics (Amplitude, Mixpanel, custom).
2. Customer interviews → what «valuable» means.
3. Business metrics — NRR, churn.
4. Industry benchmarks (SaaS Capital, OpenView reports).

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `product-vision` | Vision → NSM alignment | Перед выбором NSM |
| `aarrr-metrics` | Framework для decomposition | Для input metrics |
| `saas-metrics` | Business metric layer | Для lagging alignment |
| `okr-framework` | OKR KRs → часто привязаны к NSM | После NSM |

## Критерии хорошей NSM

1. **Отражает customer value** — когда NSM растёт, customers получают value.
2. **Leading indicator of revenue** — движется раньше, чем MRR.
3. **Actionable** — команда может влиять.
4. **Singular** — не composite, не aggregate.
5. **Measurable** — numerically trackable.
6. **Resistant to gaming** — сложно накрутить без реального value.

## Протокол

### Шаг 0 — Role Framing (Full A)

- **Customer-Champion (alpha):** акцент на user-value metric
- **Business-Champion (beta):** акцент на business-value metric

### Шаг 1 — Business Model Analysis

- **Subscription SaaS:** NSM чаще related к weekly/monthly active teams, usage depth
- **Usage-based:** raw consumption (API calls, workloads)
- **Transaction-based:** successful transactions
- **Platform:** marketplace size × match rate

### Шаг 2 — Generate Candidates

Минимум 5 candidates. Каждый — через формулу:

**[Action verb]** × **[Unit with value]** × **[Frequency/Cadence]** × **[Quality]**

Примеры B2B SaaS:
- «Weekly Active Teams with ≥5 seats» (платформа для команд)
- «Monthly reports generated per paying account» (analytics tool)
- «Weekly successful deployments per engineering team» (DevOps tool)
- «Onboarded workspaces completing setup within 7 days» (product-led growth)

### Шаг 3 — Evaluation

| Metric | Customer Value | Leads Revenue | Actionable | Singular | Measurable | Anti-game | Total |
|--------|:--------------:|:-------------:|:----------:|:--------:|:----------:|:---------:|:-----:|
| [cand] | 5 | 4 | 4 | 5 | 5 | 3 | 26 |

Ранжировать. Топ кандидат = NSM. Второй → guardrail или input metric.

### Шаг 4 — Decomposition (Metric Tree)

NSM → input metrics → leading indicators.

```
NSM: Weekly Active Teams ≥5 seats
  ├── Input: New teams activating weekly
  │     ├── Signup → activation rate
  │     └── Time-to-5-seats (onboarding speed)
  ├── Input: Existing teams retaining
  │     ├── W/W retention rate
  │     └── Seats-per-team growth
  └── Guardrails:
        ├── Churn rate (capped)
        ├── NPS (no drop)
        └── Support ticket volume (no spike)
```

### Шаг 5 — Guardrails

Что **НЕ должно сломаться** в погоне за NSM:
- Churn rate
- NPS / CSAT
- Gross margin
- Support ticket volume
- p95 latency / error rate

Каждый guardrail = numeric threshold.

### Шаг 6 — Baseline + Target

- Current value
- 90-day target
- 1-year aspirational

### Шаг 7 — Anti-Gaming Review

Team brainstorm: «Как бы мы накрутили NSM?». Если легко — уточнить определение или изменить метрику.

Пример: «Weekly Active Teams» можно «накрутить» через counting churned teams в последний раз активные → уточнение: «with activity in last 7 days».

## Валидация (Quality Gate)

- [ ] Минимум 5 candidates рассмотрены
- [ ] Evaluation по 6 критериям
- [ ] Metric tree decomposition (NSM → inputs)
- [ ] Guardrails с numeric thresholds
- [ ] Baseline + target
- [ ] Anti-gaming review проведён
- [ ] Business model alignment verified
- [ ] Vision alignment verified

## Handoff

Результат является входом для:
- **`okr-framework`** — NSM = основа для several KRs
- **`aarrr-metrics`** — NSM fits в AARRR как ключевой stage
- **Data Analyst** — instrumentation requirements
- **Mediator** (Full A) — alpha и beta NSM для synthesis

Формат: NSM doc (one-pager) с metric tree. Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Revenue как NSM | Lagging, не actionable | Используй leading value metric |
| Vanity metric | Выглядит хорошо, не предсказывает | Customer value + revenue proxy |
| Composite metric | Weighted sum не singular | Выбери ОДНУ |
| No guardrails | Принимаем churn ростом NSM | Явные guardrails |
| Change every quarter | Команда не может align | Стабильна ≥ год |
| Copy other company | Context-specific | Твоя бизнес-модель |

## Шаблон

```markdown
# North Star Metric: [Название]

## Определение
**[Действие]** × **[Единица с ценностью]** × **[Частота/Каденс]** × **[Качество]**
Точно: [точное определение с правилами включения/исключения]

## Обоснование
[Почему эта метрика — customer value + бизнес]

## Metric Tree
NSM
├── Input: ...
├── Input: ...
└── Guardrails:
    ├── ...

## Базовые значения и цели
- Текущее: X
- Цель на 90 дней: Y
- Годовая aspirational: Z

## Anti-Gaming
[Как это можно накрутить? Меры защиты]

## Ревью
- Ежеквартально: still meaningful?
- Ежегодно: пересмотр
```

## Worked Example — TeamFlow NSM Selection (post-Mediator synthesis)

**Контекст:** После Mediator synthesis visions команда выбирает unified NSM. Alpha предлагала «weekly 1:1s with AI summaries used»; Beta — «ARR from accounts with ≥3 seats on AI tier». Ниже — full candidate evaluation.

### Анализ бизнес-модели

- **Revenue model:** Подписка, tiered (Core / Team / Enterprise)
- **Growth lever:** Seat expansion (mid-market, enterprise) + tier upgrade
- **Основная доставка ценности:** Экономия на workflow на 1:1 + adoption менеджеров

### 5 кандидатов на NSM

| # | Кандидат | Формула | Leading/Lagging | Связан с vision? |
|---|-----------|---------|:---------------:|:---------------:|
| C1 | Weekly Active Managers using AI summarization (≥ 1 per week) | count(WAM_ai) | Leading | Alpha ✓ |
| C2 | ARR from AI-tier accounts | $ ARR tagged «AI tier» | Lagging | Beta ✓ |
| C3 | «Sticky Manager Ratio» — managers running ≥ 4 AI-assisted 1:1s per month | ratio | Leading + quality signal | Alpha ✓ |
| C4 | «AI-assisted 1:1s completed per week» (total count across base) | count | Leading, usage-based | Alpha ✓ |
| C5 | Net New AI Tier ARR / Quarter | $ | Lagging | Beta ✓ |

### Evaluation Matrix (6 критериев × 5 кандидатов, шкала 1-5)

| Метрика | Customer Value | Leads Revenue | Actionable | Singular | Measurable | Anti-Game | **Итого** |
|--------|:--------------:|:-------------:|:----------:|:--------:|:----------:|:---------:|:---------:|
| C1 WAM_ai | 4 | 4 | 5 | 5 | 5 | 3 | **26** |
| C2 ARR AI tier | 2 | 2 (= это И ЕСТЬ revenue) | 3 | 5 | 5 | 4 | 21 |
| C3 Sticky Manager Ratio | 5 | 4 | 5 | 5 | 5 | 4 | **28** |
| C4 AI 1:1s/week | 4 | 4 | 4 | 5 | 5 | 2 (легко накрутить bulk) | 24 |
| C5 Net New AI ARR | 2 | 2 (= это И ЕСТЬ revenue) | 2 | 5 | 5 | 4 | 20 |

**Победитель: C3 «Sticky Manager Ratio»** — балансирует customer value signal (качество — 4+ 1:1s/month implies real habit) + anti-gaming (нельзя создать bulk; требует реального usage) + чёткий leading indicator для ARR.

### Выбранный NSM — Определение

```markdown
# North Star Metric: Sticky Manager Ratio (AI Tier)

## Определение
**Активные менеджеры** × **Использующие AI summarization** × **≥ 4 раза в месяц** × **с ≥ 1 подчинённым**

**Точно:**
- **Активный менеджер:** имеет ≥ 1 прямого подчинённого в TeamFlow + заходил в систему за последние 30 дней
- **Использует AI summarization:** завершил 1:1 с AI summary, сгенерированным И просмотренным (не просто сгенерированным, но проигнорированным)
- **≥ 4 в месяц:** скользящее 30-дневное окно
- **Исключения:** внутренние сотрудники TeamFlow; аккаунты <30 дней (onboarding); trial-аккаунты

**Формула:**
```
Sticky Manager Ratio = Менеджеры, соответствующие критериям / Все активные менеджеры в AI-tier аккаунтах
```

## Обоснование

**Почему эта метрика:**

- **Customer value signal:** 4 использования/месяц ≈ еженедельные 1:1s = настоящая привычка, а не эксперимент. Привычка = продукт встроен в workflow → high retention.
- **Leading revenue:** Sticky managers → удержание аккаунта → expansion → NRR. Исторические данные TeamFlow: функции, используемые ≥ 4×/месяц, имеют 3× LTV.
- **Actionable:** Команда может влиять (onboarding, reminders, качество функции).
- **Singular:** Одно число, понятный дашборд.
- **Resistant to gaming:** нельзя «bulk» реальное использование. Можно inflate через trial seats, поэтому trial-аккаунты исключены.

**Почему не альтернативы:**
- C1 WAM_ai: не различает случайное и habitual использование
- C2 ARR tier: lagging, не предсказывает expansion до того как это произойдёт
- C4 1:1s/week: легко накрутить («создай 20 фейковых 1:1s»)
- C5 Net new ARR: та же lagging проблема

## Metric Tree

```
NSM: Sticky Manager Ratio (AI Tier)
  ├── Input: AI Tier account count (expansion)
  │     ├── New AI Tier conversions per week
  │     └── AI Tier churn
  ├── Input: Active manager activation rate (% new managers reaching ≥ 4 1:1s)
  │     ├── Time to first AI summary
  │     └── Onboarding checklist completion
  ├── Input: Feature quality signal
  │     ├── Summary approval rate (kept vs edited >50%)
  │     └── Summary NPS (in-product rating)
  └── Guardrails:
        ├── Overall NPS (не должен дропать > 5 points)
        ├── Gross churn rate (не должен расти >1pp QoQ)
        ├── Support ticket volume / AI issues (monitor для abuse / dissatisfaction)
        └── p95 summary generation latency (< 30 sec)
```

## Baseline & Targets

| Горизонт | Цель | Обоснование |
|---------|:------:|-----------|
| Текущий (Q1 2026) | 0% (функция не запущена) | До запуска |
| 90 дней после запуска (конец Q2) | **20%** | Консервативно — на основе схожих запусков AI-функций в смежном B2B |
| Конец 2026 | 45% | Уровень лидера категории |
| Конец 2027 (aspirational) | 65% | Уровень «не могу представить работу без этого» |

## Анализ Anti-Gaming

**Как это можно накрутить?**

- **Массовое создание фейковых 1:1s:** Меры защиты — требовать AI summary сгенерированным И просмотренным (событие видимого редактирования или подтверждения)
- **Один крупный аккаунт раздувает ratio:** Меры защиты — взвешивать по размеру аккаунта + отчитываться отдельно
- **Менеджеры «поддерживают streak» формальными 1:1s:** Меры защиты — минимальная продолжительность 1:1 (не менее ≥ 10 мин по расписанию)
- **Команда раздувает показатели, отмечая нереальные 1:1s:** Меры защиты — периодический выборочный аудит с разговорами customer success

## Ревью
- **Еженедельно:** ratio отслеживается в exec dashboard
- **Ежеквартально:** выборочный anti-gaming аудит (3 аккаунта проверяется вручную)
- **Ежегодно:** NSM пересматривается в соответствии со стратегическими изменениями
```

> **Урок NSM:** Изначальный «WAM_ai» Alpha был хорош, но слишком груб — не различал trial adoption от привычки. «ARR AI tier» Beta был слишком lagging. Синтез («Sticky Manager Ratio») взял user-centric формулировку Alpha, но применил строгость Beta в отношении порога качества (4+ в месяц = настоящая привычка). Результат — метрика, которая **опережает** revenue, **измеряет** customer value и **сопротивляется** лёгкому накручиванию. Такой уровень уточнения сложно получить с первой попытки — evaluation matrix заставила вести разговор.
