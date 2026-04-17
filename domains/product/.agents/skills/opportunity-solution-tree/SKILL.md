---
name: opportunity-solution-tree
description: Дерево возможностей-решений по Терезе Торрес — desired outcome → opportunities → solutions → experiments
---
# Opportunity-Solution Tree (OST)

> **Категория:** Discovery  ·  **Slug:** `opportunity-solution-tree`

## Когда использовать

- Когда у тебя есть desired outcome (из стратегии или OKR), но неясно **как** его достичь.
- При continuous discovery — как артефакт, который эволюционирует со временем.
- Когда команда прыгает в solution mode без понимания opportunity space.
- При передаче discovery в engineering — OST показывает rationale за solutions.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Desired outcome | ✅ | Бизнес- или продуктовый outcome (из NSM/OKR) |
| Customer research | ✅ | Interviews, JTBD, problems |
| Текущие assumptions | ⬚ | Какие гипотезы существуют |
| Time box | ⬚ | Обычно 1-2 недели для MVP tree |

## Источники данных

1. `$user-interview-script` transcripts — opportunities из pain points.
2. `$jtbd-canvas` — opportunity jobs.
3. Support tickets, NPS comments — evidence для opportunities.
4. Product analytics — quantitative signal.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `jtbd-canvas` | Underserved jobs → opportunities | На ветвлении opportunities |
| `problem-statement` | Specific problem → opportunity node | Для articulating конкретной opportunity |
| `assumption-mapping` | Assumptions underlying solutions | Для каждой solution node |
| `hypothesis-template` | Solution → testable hypothesis | Для experiment nodes |

## Структура дерева

```
Desired Outcome (top)
  │
  ├── Opportunity 1 (customer problem / unmet job)
  │     ├── Solution 1a (product idea)
  │     │     └── Experiment 1a-i (test)
  │     └── Solution 1b
  │
  ├── Opportunity 2
  │     └── Solution 2a
  │           └── Experiment 2a-i
  │
  └── Opportunity 3
```

## Протокол

### Шаг 0 — Desired Outcome

Сформулировать **один** outcome. Должен быть measurable, связан с business metric.

✅ Good: «Increase weekly active teams by 30% in 2 quarters»  
❌ Bad: «Improve engagement»

### Шаг 1 — Opportunities

Opportunities — это customer problems или unmet jobs. Из JTBD + interviews.

Правила:
- Сформулированы как **customer** statement, не solution
- Evidence-backed (evidence ≥ 2 sources или mark 🔮 assumed)
- Mutually exclusive (нет overlap)

Ограничение: 3-7 opportunities верхнего уровня. Больше — split в sub-branches.

| # | Opportunity | Подтверждение | Предполагаемый impact |
|---|-------------|----------|-------------------|
| O1 | [боль клиента / незакрытый job] | JTBD F3, Interview 4-7 | Высокий / Средний / Низкий |

### Шаг 2 — Opportunity Assessment

Для каждой — importance × reach × gap (где current solution слабее).

Отсечь opportunities с low impact — фокус на top 3.

### Шаг 3 — Solutions

Для каждой **top** opportunity — 2-5 solution candidates. Это product ideas, features, process changes.

Правила:
- Specific (не «improve onboarding», а «in-app checklist for first 3 tasks»)
- Одна opportunity может иметь несколько solutions — не выбирать сразу
- Solutions могут быть «non-product» (docs, training, pricing change)

### Шаг 4 — Experiments

Для каждой solution — experiment (или несколько) для validation.

| Solution | Эксперимент | Предсказание | Измерение | Time box |
|----------|------------|------------|-------------|-----------|
| In-app checklist | A/B test с 50% новых пользователей | +20% активация за первую неделю | Funnel metric | 4 недели |

Experiments — через `$hypothesis-template` + `$ab-test-design`.

### Шаг 5 — Prioritization

Приоритизировать experiments, не solutions. Иногда quick experiments раскрывают, что opportunity слабее, чем казалось.

Use `$rice-scoring` на experiment level.

### Шаг 6 — Iteration

OST — living document. После каждой experiment:
- Обновить evidence
- Отсечь опровергнутые ветки
- Добавить new opportunities из findings

## Валидация (Quality Gate)

- [ ] Desired outcome — measurable, связан с metric
- [ ] 3-7 opportunities на top level
- [ ] Каждая opportunity — customer-framed, не solution
- [ ] Evidence (≥ 2 sources) или mark 🔮
- [ ] Top 3 opportunities имеют ≥ 2 solutions
- [ ] Каждая solution имеет ≥ 1 experiment
- [ ] Experiments приоритизированы (RICE)

## Handoff

Результат является входом для:
- **`rice-scoring`** — приоритизация experiments
- **`hypothesis-template`** — formalize experiments
- **PM**: solutions → feature candidates для roadmap
- **`assumption-mapping`** — assumptions behind solutions

Формат: OST as markdown tree или Miro-style diagram (exported). Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Solution-first tree | Пропуск opportunity space | Начни с outcome → opportunities |
| Opportunities = features | Просто переименованный backlog | Opportunity = customer problem |
| No experiments | Solutions не validated | Каждая solution имеет experiment |
| Tree никогда не обновляется | OST frozen = мёртвый | Еженедельное/двухнедельное обновление |
| Выбор solution до validation | Заморожены в первой идее | Хранить альтернативы до experiment data |

## Worked Example — TeamFlow OST (AI 1:1 Summarization инициатива)

**Контекст:** TeamFlow (B2B SaaS HR-tech, $8M ARR, NRR 105%). После Discovery (8 interviews + JTBD canvas) команда строит OST для выбранного desired outcome. Вопрос: «Should we build AI summarization?» — OST должен показать opportunity space и альтернативы, не прыгать к conclusion.

### Desired Outcome

```
Grow Net Revenue Retention from 105% to 115% within 4 quarters
```

**Почему эта метрика:** NRR — ключевая SaaS метрика для Board и investors. Growth в NRR драйвит ARR, моат, margin. 10pp lift связан с expansion + churn reduction, оба достижимы если увеличить manager engagement с продуктом.

**Почему не другая метрика:**
- «Activation rate» — слишком leading, не prove business outcome.
- «Weekly active teams» — vanity если не linked с revenue.
- «ARR growth» — слишком lagging, NRR = leading indicator.

### Opportunity Layer (из JTBD canvas + Discovery Brief)

```
Desired: Grow NRR 105% → 115%
  │
  ├── O1: Менеджеры тратят 3-4 часа/неделю на 1:1 admin overhead
  │   (боль buyer и end-user)
  │   Подтверждение: 6 из 8 интервью, internal analytics показывает prep время
  │   Предполагаемый охват: 3,000 активных менеджеров по customer base
  │   Impact: retention + expansion (см. оценку Opportunity)
  │
  ├── O2: VP HR лишён видимости 1:1 practice/quality менеджеров по организации
  │   (боль buyer)
  │   Подтверждение: 4 из 4 buyer interviews
  │   Предполагаемый охват: 200 buyer аккаунтов
  │   Impact: expansion opportunity (enterprise tier)
  │
  ├── O3: 40% action items из 1:1 брошено / забыто
  │   (боль end-user)
  │   Подтверждение: 5 из 8 end-user interviews, internal product data (completed/total)
  │   Предполагаемый охват: 3,000 менеджеров × 8 reports × 40% = значительный
  │   Impact: user retention + NPS
  │
  ├── O4: Onboarding нового менеджера занимает 6+ месяцев до «effective 1:1»
  │   (боль buyer F4)
  │   Подтверждение: 3 из 4 buyer interviews
  │   Предполагаемый охват: ~1,000 новых менеджеров/год по customer base
  │   Impact: меньше, но высокая ценность для enterprise segment
  │
  └── O5: Непоследовательность 1:1 experience между менеджерами
      (боль buyer + skip-level + employee)
      Подтверждение: 2 из 4 buyer interviews, 1 end-user взаимосвязь
      Предполагаемый охват: Широкий, но размытый — сложно количественно оценить
      Impact: employee NPS / retention, но косвенно
```

### Opportunity Assessment

| # | Opportunity | Важность (1-10) | Охват (пользователи) | Разрыв (текущий vs желаемый) | Приоритетный балл |
|---|-------------|:-----------------:|:-------------:|:------------------------:|:--------------:|
| O1 | Admin overhead | 10 | ~3,000 | Большой (инструмента нет) | 52,000 |
| O3 | Action items dropped | 9 | ~3,000 | Большой | 46,800 |
| O2 | Buyer visibility | 9 | ~200 (но $$$) | Большой | 1,800 (абсолютный) — но high deal size |
| O4 | New-mgr onboarding | 7 | ~1,000/год | Средний | 7,000 |
| O5 | Cross-mgr consistency | 6 | Размытый | Средний | Сложно оценить |

**Pruning:** фокус на top 3: **O1 (admin overhead), O3 (action items), O2 (buyer visibility)** — все interconnected и one feature может address multiple.

### Solutions Layer (для top 3 opportunities)

```
O1: Admin overhead
  ├── S1.1: AI-powered real-time transcription + summarization during 1:1
  │         (hypothesis: address capture-during-meeting pain + action items extraction)
  ├── S1.2: Template library + auto-population from previous 1:1s
  │         (lighter: не AI, но reduces prep time)
  ├── S1.3: 1:1 duration reduction through structured agendas + time-boxing UI
  │         (behavioral, не AI)
  └── S1.4: Async 1:1s (structured written async для some updates)
            (radical: reduce live meeting count)

O3: Action items dropped
  ├── S3.1: AI-extracted action items with automated reminders в следующей 1:1
  │         (ties to S1.1 — AI summarization output)
  ├── S3.2: Calendar / Slack integration — reminders 2 days before 1:1
  │         (lighter: rules-based)
  └── S3.3: Weekly digest email «here's what you committed to» с status checkboxes

O2: Buyer visibility
  ├── S2.1: Aggregate dashboard: 1:1 frequency, duration, action items velocity per team
  │         (rule-based analytics, no AI needed for basic version)
  ├── S2.2: AI-inferred 1:1 health score (combining multiple signals)
  │         (более advanced, needs S1.1 infrastructure)
  └── S2.3: Quarterly People Ops report generator (auto-composed for Board)
```

### Experiments Layer (для top solutions)

| Solution | Эксперимент | Предсказание | Измерение | Time box | RICE score |
|----------|------------|------------|-------------|----------|:----------:|
| S1.1: AI summarization | Concierge MVP: «AI» вручную помогает 10 beta-клиентам в течение 2 недель | Менеджеры экономят 30 мин/неделю; хотят продолжить | Опрос + retention | 3 недели | 35 |
| S1.1: AI summarization | Wizard-of-Oz: реальная интеграция OpenAI API с 20 beta-менеджерами, под строгим контролем | 20% drop-off приемлемо; качество summarization > 70% приемлемо | Опрос менеджеров + usage data | 4 недели | 48 |
| S1.2: Template library | Выкатить feature flag для 50% пользователей, измерить prep time через опросы | -30% prep time по самооценке | Опрос + funnel | 4 недели | 28 |
| S3.1: AI action items | Строится на S1.1 — отдельная оценка: после генерации AI summary, opt-in система напоминаний | +20% завершённых action items | Product analytics | 6 недель | 30 |
| S3.2: Rule-based reminders | Выкатить для всех пользователей, измерить completion rate | +10% завершённых action items | Product analytics | 2 недели | 25 |
| S2.1: Aggregate dashboard | Beta 5 enterprise customers, qualitative интервью через 30 дней | 4 из 5 скажут «использовали бы еженедельно» | Интервью | 6 недель | 22 |

### Приоритизация экспериментов

1. **S1.2 (Template library)** — низкий риск, быстро, независимо. **Выкатить первым** (4 недели).
2. **S3.2 (Rule-based reminders)** — quick win, дополняет S1.2.
3. **S1.1 (AI summarization) — сначала Concierge MVP, затем Wizard-of-Oz** — подтверждает ценность до инженерных инвестиций.
4. **S2.1 (Dashboard)** — параллельный трек, другой customer (enterprise), другой eng workstream.
5. **S3.1 (AI action items)** — отложен до результатов S1.1.

### Заметки по итерации (как этот OST эволюционирует)

**Обновление на неделе 4 (гипотетически):** S1.2 Template library выпущена — опрос показывает только -12% prep time (не -30%). Вывод: шаблоны помогают новым менеджерам, но опытные их не принимают. → Обновить OST: разделить opportunity O1 по стажу менеджера. Новая sub-opportunity: «Новые менеджеры сталкиваются с самой крутой кривой обучения» (O4 перекомбинирована сюда).

**Обновление на неделе 6:** Результаты S1.1 Concierge MVP положительные (9 из 10 хотят функцию). Одобрить Wizard-of-Oz + инженерные инвестиции. Ветка расширена: добавить «privacy architecture» как необходимую sub-solution.

**Обновление на неделе 10:** Wizard-of-Oz показывает 72% качество summarization приемлемо, но privacy concerns от enterprise beta. Добавлена новая ветка для compliance architecture.

> **Урок OST:** Tree — living document. Initial focus на «build AI» был верен, но через experiments выявилось что **template library + rule-based reminders** закрывают 40-50% value с 20% effort. OST заставил рассмотреть **альтернативы** (S1.2, S3.2) которые иначе пропустили бы в favor лучшей AI story.

> **Ссылка на `$assumption-mapping`:** Каждая solution стоит на assumptions. Для S1.1 top assumptions (privacy, LLM quality, willingness to pay) — tracked в assumption map, validated через experiments.

## Experiment Card Templates (per branch)

Каждая solution в OST имеет prescribed experiment design. Используйте эти шаблоны.

### Шаблон A: Concierge MVP (подтверждает Ценность)

```markdown
# Experiment: S1.1 Concierge MVP — AI Summarization

**Ветка дерева:** Desired Outcome → O1 Admin Overhead → S1.1 AI Summarization
**Статус:** Активен Неделя 2-5 (4-недельный эксперимент)

## Что тестируем
Ценность AI-summarized 1:1s — готовы ли менеджеры изменить свой workflow?

## Метод
Concierge (человек-«AI»): 10 beta customer-менеджеров присылают нам аудио встречи; PM + Designer вручную создают summary + action items в течение 24 часов, доставляют обратно в TeamFlow UI с пометкой «AI-generated» (на самом деле человек).

## Предсказание
- ≥ 7 из 10 менеджеров хотят продолжить после 2 недель
- Самооценка экономии времени ≥ 2 часа / неделю
- Action items completion rate растёт ≥ 10pp

## Измерение
- Еженедельный опрос (5 мин)
- Exit interview на неделе 4
- Дневник времени (самооценка)
- Action items completion отслеживается в продукте

## Порог успеха
≥ 7 из 10 говорят «хочу продолжить» → одобрить Wizard-of-Oz

## Правила принятия решений
- 9+ положительных → Сильный сигнал, инвестировать агрессивно
- 7-8 положительных → Переходить к Wizard-of-Oz со стандартными инвестициями
- 5-6 положительных → Итерировать concierge, ретестировать
- <5 положительных → Закрыть ветку или существенно переосмыслить

## Связь с assumption map
Подтверждает V1 (willingness to pay — косвенно через willingness to use), V2 (adoption intent)
```

### Шаблон B: Wizard-of-Oz (подтверждает Осуществимость + Юзабилити)

```markdown
# Experiment: S1.1 Wizard-of-Oz — AI Summarization (Real LLM)

**Ветка дерева:** Та же, что у Concierge, следующий шаг
**Статус:** Запланирован Неделя 6-9 (после валидации Concierge)

## Что тестируем
(a) Качество LLM — может ли реальный AI производить приемлемый output?
(b) Доверие пользователей — будут ли менеджеры редактировать или бросать?

## Метод
Реальная интеграция OpenAI GPT-4 с 20 beta-менеджерами. Полный pipeline: запись встречи → транскрипция → LLM summarization → UI ревью менеджера. Интенсивная телеметрия + обратная связь.

## Предсказание
- Качество summary ≥ 4 из 5 в среднем (слепая оценка)
- Edit rate 30-50% (не 0% = слепое одобрение; не 100% = AI бесполезен)
- P95 latency ≤ 60s
- Менеджеры продолжают использовать через 4 недели (≥ 80%)

## Измерение
- Рейтинг summary (1-5) на встречу через in-product prompt
- Edit телеметрия (какой % summary был изменён)
- Generation latency (server metrics)
- Drop-off tracking (weekly active managers в beta)

## Пороги успеха
- Качество: ≥ 85% summaries с рейтингом ≥ 4
- Edit rate: 25-55% (sweet spot)
- Continuation: ≥ 80% всё ещё используют на неделе 4

## Правила принятия решений
- Все пороги выполнены → Одобрить GA investment
- 2/3 выполнены → Итерировать prompt + ретестировать неделя 10-11
- 1/3 выполнен → Рассмотреть feature gate (human-review layer)
- 0/3 выполнены → Закрыть ветку

## Связь с assumption map
Основная валидация для F1 (LLM quality) + U1 (manager trust)
```

### Шаблон C: A/B Test (подтверждает Масштаб)

```markdown
# Experiment: S3.2 Rule-Based Reminders — A/B Test

**Ветка дерева:** Desired Outcome → O3 Action Items Dropped → S3.2 Rule-Based Reminders
**Статус:** Запланирован Неделя 12-16 (post-MVP, итерация)

## Что тестируем
Реально ли простые reminders (без AI) улучшают action items completion rate?

## Метод
Классический A/B. 50% пользователей получают auto-reminder за 2 дня до следующей 1:1 с открытыми action items. Контроль: без reminder.

## Предсказание
- Action items completion растёт с 60% (baseline) до 68%+ (+8pp)
- Нет роста «reminder fatigue» (измеряется через opt-out rate)

## Измерение
- Ratio завершённых action items / созданных (еженедельно)
- Opt-out rate для reminders
- NPS impact (отдельный опрос)

## Выборка и длительность
- Допустимых пользователей / неделю: ~500
- Выборка на вариант: 3200 (рассчитано через `$ab-test-design`)
- Длительность: 13 недель

## Guardrails
- Opt-out rate < 15%
- NPS не снижается

## Правила принятия решений
- +8pp И guardrails ok → Выкатить для всех
- +4 до +8pp → Выкатить с доработанным копирайтом
- <+4pp → Закрыть, перейти на S3.1 AI reminders

## Связь с assumption map
Подтверждает U2 (usability — раздражают ли reminders?) + V4 (ценность простого решения)
```

### Шаблон D: Сессии Design Partner (подтверждает Enterprise Ценность)

```markdown
# Experiment: S2.1 Aggregate Dashboard — Enterprise Design Partner

**Ветка дерева:** Desired Outcome → O2 Buyer Visibility → S2.1 Aggregate Dashboard
**Статус:** Неделя 6-12

## Что тестируем
Будут ли VP HR / CPO в enterprise customers делать upgrade tier на основе ценности dashboard?

## Метод
Concierge dashboard для 5 enterprise prospects. Ручная компиляция данных еженедельно, доставляемая как «beta dashboard preview» в Google Sheet. Отслеживать:
- Частоту использования (проверяют ли?)
- Реакции («заплатили бы за это?»)
- Upgrade conversion (заявленное намерение → реальный upgrade)

## Предсказание
- 4 из 5 prospects скажут «использовали бы еженедельно»
- 3 из 5 выразят намерение сделать upgrade
- 2 из 5 реально делают upgrade в течение 30 дней

## Измерение
- Заметки qualitative интервью
- Статус upgrade в CRM
- Частота доступа к dashboard (даже если вручную — отслеживаем запросы)

## Пороги успеха
- Намерение использовать: 4 из 5
- Upgrade conversion: ≥ 2 из 5

## Правила принятия решений
- 2+ upgrade → Одобрить productization
- 0-1 upgrade → Пересмотреть scope dashboard на основе обратной связи
- Застрял на «нравится, но не upgrade» → Исследовать pricing / packaging

## Связь с assumption map
Основная валидация для V3 (buyer tier upgrade) + V4 (expansion driver)
```

### Обзор портфеля экспериментов

| # | Эксперимент | Метод | Длительность | Тип сигнала | Инвестиции |
|---|-----------|--------|:--------:|-------------|:----------:|
| EXP-010 | S1.1 Concierge MVP | Вручную | 4 недели | Качественный | Низкие ($2K) |
| EXP-011 | S1.1 Wizard-of-Oz | Real LLM + интенсивная телеметрия | 4 недели | Кол + Кач | Средние ($15K) |
| EXP-012 | S3.2 Rule-based reminders A/B | Production A/B | 13 недель | Количественный | Низкие ($5K — только eng time) |
| EXP-013 | S2.1 Enterprise dashboard | Design partners | 6 недель | Смешанный | Средние ($10K) |
| EXP-014 | S1.2 Template library A/B | Production A/B | 4 недели | Количественный | Низкие ($3K) |

### Баланс портфеля

- **Смесь методов:** качественные (Concierge, Design Partner) + количественные (A/B) + engineering-heavy (Wizard-of-Oz)
- **Смесь скорости:** быстрые (Concierge 4нед, reminders A/B ранние результаты 6нед) + медленные (full A/B 13нед)
- **Смесь инвестиций:** низкий риск ($2-5K) + средние ($10-15K)
- **Зависимости решений:** Concierge → Wizard → Full AI investment (поэтапные обязательства)

> **Урок experiment portfolio:** Смешивание методов + длительностей предотвращает аналитический паралич. Быстрые низкобюджетные эксперименты (Concierge) открывают уверенность для более высоких инвестиций (Wizard-of-Oz). Чёткие **правила принятия решений на каждый эксперимент** — если threshold не достигнут, действие заранее определено (закрыть / итерировать / развернуть). Без заранее согласованных правил принятия решений «посмотрим» становится хроническим откладыванием.
