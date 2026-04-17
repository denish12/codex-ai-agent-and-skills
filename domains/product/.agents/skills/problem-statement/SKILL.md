---
name: problem-statement
description: Формулировка проблемы продукта — actor, context, pain, root cause, evidence
---
# Problem Statement

> **Категория:** Discovery  ·  **Slug:** `problem-statement`

## Когда использовать

- В начале Discovery phase — как фокусирующий артефакт.
- Перед PRD — чётко сформулированная проблема = половина решения.
- Когда команда расходится: «что именно мы решаем?».
- Как filter для backlog: не relates к active problem → not in scope.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Evidence (interviews, tickets, metrics) | ✅ | Что указывает на проблему |
| Target role | ✅ | Buyer / end-user / admin |
| Context / trigger | ✅ | Когда проблема возникает |
| Existing workaround | ⬚ | Как сейчас справляются |

## Источники данных

1. `$user-interview-script` quotes — pain descriptions.
2. Support tickets — volume + categorization.
3. Product analytics — drop-off points, error rates.
4. Competitor comparison — что они делают, а вы нет.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `user-interview-script` | Evidence quotes | Для каждой problem |
| `jtbd-canvas` | Actor + desired outcome | Для формулировки |
| `assumption-mapping` | Root cause assumptions | Если root cause неясен |
| `opportunity-solution-tree` | Problem → opportunities | После formulating |

## Протокол

### Шаг 0 — Raw Signal Collection

Собрать все signals: quotes, tickets, metrics. Группировать по похожим themes.

### Шаг 1 — Formulation Frame

Используй структуру:

> **[Actor]** in **[context]** experiences **[pain]** because **[root cause]**. Evidence: **[data]**. Impact: **[quantified]**.

✅ Good:  
«**End-user engineers** at **mid-market SaaS companies** experience **2-3 hour delays to onboard new teammates** because **our role-based access setup requires 7 manual admin steps**. Evidence: 14 interviews + 230 support tickets Q3-Q4 2025. Impact: ~40% of new-hire first-week productivity lost.»

❌ Bad: «Onboarding is slow.»

### Шаг 2 — Five Whys

Для каждой problem — drill to root cause через 5 «почему?»:

1. Why is onboarding slow? → Manual admin steps.
2. Why manual? → No role templates.
3. Why no templates? → Product doesn't support.
4. Why not? → Not prioritized.
5. Why? → No data on impact.

Остановиться, когда дошёл до fix-able root cause (обычно на 3-4 уровне).

### Шаг 3 — Impact Quantification

- **Reach** — сколько пользователей affected (weekly/monthly)
- **Frequency** — как часто они encounter
- **Severity** — насколько плохо (блокирует / frustrating / minor)
- **Business impact** — churn risk / conversion drop / CAC increase / NRR impact

Priority = Reach × Frequency × Severity.

### Шаг 4 — Problem vs Symptom

Distinguish:
- **Problem:** «Can't easily onboard new teammates» (root)
- **Symptom:** «Support tickets about SSO setup» (surface)

Symptoms — evidence для problem. Problem — то, что решаем.

### Шаг 5 — Non-problems

Explicit out-of-scope: что **НЕ** решаем в этом framing:
- «Мы не решаем compliance onboarding (legal concern)»
- «Мы не решаем onboarding for external contractors (different flow)»

### Шаг 6 — Problem Statement Document

Final artifact:
- Problem statement (1 sentence structured format)
- Evidence section (quotes, data, metrics)
- Five-whys analysis
- Impact quantification
- Non-problems (explicit)
- Open questions (для discovery)

## Валидация (Quality Gate)

- [ ] Problem formulated как structured: actor / context / pain / root cause
- [ ] Evidence ≥ 2 sources (interviews + quantitative)
- [ ] Five-whys проведён до fix-able root
- [ ] Impact quantified (reach × frequency × severity)
- [ ] Distinguish problem от symptom
- [ ] Non-problems explicit
- [ ] Quantified impact связан с business metric

## Handoff

Результат является входом для:
- **`opportunity-solution-tree`** — problem → opportunity space
- **`rice-scoring`** — reach + impact feeds scoring
- **`prd-template`** — problem section
- **`hypothesis-template`** — testable predictions из root cause

Формат: problem statement doc (markdown). Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Solution embedded | «Проблема: нет dashboard» | Проблема — боль, не отсутствие функции |
| Vague actor | «Пользователи» | Конкретная роль: «Engineering manager в mid-market» |
| No evidence | Спекуляция | Мин 2 источника, количественный + качественный |
| No root cause | Остаёмся на поверхности | Five-whys обязателен |
| Not quantified | «Серьёзная проблема» | Reach × Frequency × Severity |
| Scope creep | «Все проблемы onboarding» | Узкий + non-problems |

## Шаблон

```markdown
# Problem Statement: [Краткое название]

## Statement
[Actor] в [контексте] испытывает [боль] потому что [root cause].
Подтверждение: [источники]. Impact: [количественный].

## Подтверждение
- Quote 1: «...» (Interview 3, mid-market Engineering Manager)
- Объём тикетов: [N] Q3-Q4 2025
- Метрика: [drop-off X% на шаге Y]

## Root Cause (Five Whys)
1. Почему X? → A
2. Почему A? → B
...

## Impact
- Reach: [N пользователей / неделю]
- Frequency: [N раз / месяц]
- Severity: Blocker / Major / Minor
- Business: [$X NRR impact / Y% conversion drop]

## Non-problems (вне scope)
- ...
```

## Worked Example — TeamFlow Top 3 Problem Statements

**Контекст:** TeamFlow (B2B SaaS HR-tech, $8M ARR, 200 customers). После 8 interviews + JTBD canvas — команда сформулировала Top 3 problem statements для Discovery Brief. Все 3 — candidates для AI 1:1 summarization initiative, но разного приоритета.

### Problem Statement #1: Manager Admin Overhead

#### Statement

**People managers** (primarily в mid-market / enterprise B2B SaaS, 100-1000 employees) **managing 5-15 direct reports** experience **45-60 мин/неделю per report на 1:1 prep + note-taking + follow-up** (3-4 hrs/неделю total для manager с 8 reports), **because** TeamFlow provides a structured template but no capture or synthesis capability — managers должны manually type notes during conversation (losing focus) or after (losing context).

Evidence: 6 of 8 customer interviews + 120 related support tickets Q1 2026 + internal analytics (averaged prep time inferred from session duration data). Impact: 3,000 active managers × 2 hrs/week saved × 50 weeks × $150/hr loaded cost = $45M gross annual value; business case assumes ~10% realizable as paid TeamFlow expansion → $3-5M ARR opportunity through premium AI tier.

#### Evidence

- **Quote 1:** «25 минут prep каждую неделю на каждого из 8 reports. Итого ~3 часа в неделю.» — Interview E3 (Engineering Manager, mid-market, 250 emp)
- **Quote 2:** «Печатать во время встречи → lose conversation. После встречи → forget context. Часто пишу только headlines и теряю context.» — E3
- **Quote 3:** «Я скипнул подготовку к 1:1 с Junior engineer потому что был слишком загружен. Встреча получилась скомканной, он явно был disappointed. Я чувствовал себя виноватым.» — E3
- **Quote 4:** «Если бы я мог просто говорить вслух во время встречи, а система сама бы писала notes, выделяла action items — я бы за это заплатил personally.» — E3
- **Support tickets:** 120 tickets Q1 2026 tagged «1:1 notes / notes / meeting» — recurring themes: «can I export?», «why does TeamFlow not do X automatically?», «how do other teams handle notes?»
- **Product analytics:** Session duration (time spent в 1:1 notes interface) avg 12 min per 1:1 prep + 8 min post — matches self-reported numbers
- **Competitor comparison:** Lattice, 15Five — same gap. Industry-wide unmet need, not TeamFlow-specific.

#### Root Cause (Five Whys)

1. **Почему менеджеры тратят 45-60 мин/неделю на 1:1 admin?**
   → Потому что prep + note-taking + follow-up — ручной труд, требующий ментального переключения контекста.

2. **Почему вручную?**
   → Потому что нет инструмента, который автоматически захватывает контент разговора и синтезирует action items.

3. **Почему нет инструмента?**
   → Исторически: инструменты требовали точной транскрипции (не решено), privacy concerns, чувствительность HR данных. Теперь LLM APIs делают это осуществимым, но TeamFlow не инвестировал.

4. **Почему TeamFlow не инвестировал?**
   → Исторически фокус на structured-data features (OKR, reviews). Note-taking воспринималось как commodity. Никто не строил business case для AI integration.

5. **Почему нет business case?**
   → NRR / churn данные показывают что top-churn reason — «manager adoption low» (60% из customer interviews + CRM data). Связь между нагрузкой admin на менеджера → снижение adoption не была явно прослежена до недавнего анализа.

**Root cause (уровень действий):** Отсутствие AI-powered capture + synthesis в 1:1 workflow — решается через integrated AI summarization feature.

#### Impact

- **Reach:** ~3,000 активных people managers по 200 customers (взвешенно: SMB 120 × 5 avg managers = 600, mid-market 70 × 20 avg = 1,400, enterprise 10 × 100 avg = 1,000)
- **Frequency:** Еженедельно (3-4 часа/неделю на менеджера → 9,000-12,000 часов/неделю всего по базе)
- **Severity:** Major (не блокирует, но генерирует 30% churn signal manager-tool)
- **Business impact:** 
  - Прямой: $3-5M ARR expansion opportunity в 4 кварталах через premium AI tier ($8-12/seat/mo)
  - Косвенный: NRR lift 5-10pp если улучшится manager activation / retention
  - Защитный: Lattice / 15Five могут запустить аналогичное; first-mover даёт moat

#### Non-problems (out of scope)

- **Не решаем** transcription accuracy ниже 95% для non-English languages (defer to future; English-first)
- **Не решаем** meeting recording / video archival (legal / privacy implications различны в разных юрисдикциях)
- **Не решаем** automated coaching suggestions («manager should have asked X») — требует deeper training data, future work
- **Не решаем** integration с external meeting tools (Zoom/Meet/Teams) в первом релизе — только TeamFlow-native 1:1s

---

### Problem Statement #2: VP HR Lacks Visibility into 1:1 Quality / Frequency

#### Statement

**VPs of People / CPOs** у **mid-market и enterprise customers (100-1000 сотрудников)** лишены **видимости частоты 1:1, качества и completion rate action items по всей организации**, что вынуждает их полагаться на самоотчёты + анекдоты + exit interviews после ухода сотрудников. **Потому что** аналитика TeamFlow отображает team-level OKR данные, но не health метрики 1:1 (частота, длительность, velocity action items, sentiment).

Подтверждение: 4 из 4 buyer interviews — прямые цитаты боли + конкретные запросы на dashboard. Impact: blocker для expansion с Team tier ($15/seat) на Enterprise tier ($50+/seat + analytics). Решение этой проблемы = $2-3M ARR expansion opportunity в существующей базе.

#### Evidence

- **Quote 1:** «Некоторые менеджеры проводят потрясающие 1:1s, другие буквально их отменяют. У меня нет видимости, нет рычагов влияния.» — B2 (VP HR, 450-emp B2B SaaS)
- **Quote 2:** «Когда CFO спрашивает о ROI затрат на retention, мне приходится плести историю. У меня нет данных.» — B1 (CPO, 800-emp enterprise)
- **Quote 3:** «Sarah оставила компанию потому что её менеджер никогда не делал 1:1s. Мы узнали только потом. Я должна была знать.» — B3 (VP HR, 200-emp mid-market)
- **CRM data:** 8 из 10 enterprise prospects спрашивают «есть ли у вас 1:1 analytics?» во время оценочных звонков — это текущий blocker для Enterprise tier conversion
- **Product analytics:** В настоящее время buyer-role logins (VP/CPO) — 35% monthly active vs end-user 78% — указывает что у buyer недостаточно причин использовать продукт регулярно

#### Root Cause (Five Whys)

1. **Почему VP HR лишён видимости?** → TeamFlow не отображает health метрики 1:1.
2. **Почему не отображает?** → Существующая аналитика фокусируется на goals (OKR) и reviews, не на паттернах встреч.
3. **Почему?** → Product roadmap исторически приоритизировал OKR-centric features (последние 2 года).
4. **Почему?** → Потому что sales-led сигналы указывали на OKR как дифференциатор vs конкуренты.
5. **Почему такие сигналы?** → Sales никогда не сегментировал buyer personas — VP HR vs CPO имеют разные приоритеты, но pitch был унифицирован.

**Root cause (уровень действий):** Отсутствует buyer-persona-specific analytics layer. Решается через новую dashboard feature.

#### Impact

- **Reach:** 80 buyer аккаунтов (mid-market + enterprise), некоторое совпадение с enterprise tier
- **Frequency:** Ежеквартально (критично для board prep)
- **Severity:** Major — blocker для Enterprise tier expansion
- **Business impact:** $2-3M ARR если Enterprise conversion rate улучшится с 15% до 30% в 4 кварталах

#### Non-problems (out of scope)

- **Не решаем** individual 1:1 content surveillance (privacy line — VP HR sees aggregate only)
- **Не решаем** compensation-linked coaching insights (separate initiative)

---

### Problem Statement #3: Action Items Drop Rate ~40%

#### Statement

**Менеджеры с 5+ прямыми подчинёнными** испытывают **~40% drop rate action items** из 1:1 встреч (забытые, не отслеживаемые, никогда не отмеченные как выполненные), **потому что** TeamFlow создаёт action items как записи, но не предоставляет механизма проактивных напоминаний / повторного отображения — менеджеры вынуждены самостоятельно контролировать выполнение.

Подтверждение: 5 из 8 end-user interviews + internal product analytics (соотношение созданных и завершённых action items). Impact: косвенный на end-user satisfaction + retention.

#### Evidence

- **Quote 1:** «У меня наверное 20-30 открытых action items, половина из которых уже не актуальна... да и вообще уже забытые.» — E3
- **Quote 2:** «Action items tracking слабо. Забываю проверить. Накапливаются.» — E3
- **Product analytics:** Average action items created per 1:1 = 3.2. Average marked completed within 14 days = 1.9. Completion rate 60% = drop rate 40%.
- **Support tickets:** 42 tickets Q1 2026 «action items not reminders / notifications»

#### Root Cause (Five Whys)

1. **Почему 40% drop?** → Action items не отображаются проактивно, только ручная проверка.
2. **Почему не проактивно?** → Нет системы уведомлений / напоминаний для action items.
3. **Почему?** → Изначальное дизайн-допущение: менеджер будет проверять вручную.
4. **Почему такое допущение?** → Дизайн эпохи до AI: ручной труд был единственным вариантом.
5. **Почему всё ещё вручную?** → Функция не пересматривалась с момента первоначального запуска (2 года назад).

**Root cause (уровень действий):** Отсутствует проактивный reminder layer. Low-hanging fruit — не требует AI, rule-based достаточно.

#### Impact

- **Reach:** ~3,000 менеджеров
- **Frequency:** Еженедельно
- **Severity:** Minor (не нарушает workflow, но накапливает раздражение)
- **Business impact:** Косвенный — влияет на manager adoption rate + NPS

#### Non-problems (out of scope)

- **Не решаем** automatic action items extraction from unstructured notes (это часть AI summarization initiative)
- **Не решаем** cross-team action items visibility (future)

---

### Сводка топ 3 приоритетов

| # | Проблема | Actor | Severity | Охват | Business Impact | Приоритет |
|---|---------|-------|:--------:|:-----:|:---------------:|:--------:|
| 1 | Admin overhead менеджера | End-user manager | Major | ~3,000 | $3-5M ARR expansion | **P0** |
| 2 | Разрыв видимости для buyer | VP HR / CPO | Major | 80 аккаунтов | $2-3M ARR (Enterprise conv) | **P0** |
| 3 | Drop rate action items | End-user manager | Minor | ~3,000 | Косвенный | **P1** |

**Вывод:** Проблемы #1 и #2 могут быть решены через **одну и ту же функцию** (AI summarization + aggregate dashboard), что делает initiative высокорычажным. Проблема #3 — complementary, но независимая (rule-based reminders, quick win).

> **Урок problem-statement:** Каждая формально структурированная проблема предотвращает скрытые допущения. Five-whys Проблемы #1 выявили что **«почему исторически не инвестировали»** — стратегический вопрос, не просто продуктовый. Это информация для CEO / Board сессии, не просто engineering roadmap.
