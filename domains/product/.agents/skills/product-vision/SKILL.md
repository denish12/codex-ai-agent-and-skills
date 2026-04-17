---
name: product-vision
description: Видение продукта — for whom / why / what's unique / 2-3 year horizon / guiding principles
---
# Product Vision

> **Категория:** Strategy  ·  **Slug:** `product-vision`

## Когда использовать

- В начале нового продуктового направления (new product line, pivot).
- При onboarding новых команд — vision как shared north star.
- Когда команда расходится в стратегических решениях — нет shared framework.
- При investor / exec communication — vision = story.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Discovery Brief (JTBD, problems) | ✅ | Customer-value foundation |
| Business context (ARR, segment, stage) | ✅ | Business-value foundation |
| Competitive landscape | ⬚ | Differentiation context |
| Horizon | ⬚ | 2-3 года стандарт |
| Adversarial camp (Full A) | ⬚ | alpha (Customer) / beta (Business) |

## Источники данных

1. `$jtbd-canvas` — язык for whom / what job.
2. Business metrics (ARR, NRR, churn) — для Business-Champion lens.
3. Competitive analysis — moat identification.
4. Company mission / values — alignment.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `jtbd-canvas` | Customer frame | Для user-value формулировки |
| `okr-framework` | Vision → quarterly goals | После vision |
| `north-star-metric` | Vision → measurable NSM | После vision |
| `product-roadmap` | Vision → themes | После NSM |

## Vision Formula (Geoffrey Moore)

```
Для [целевого customer]
Который [формулировка потребности или возможности]
Наш [название продукта] является [категория продукта]
Который [формулировка ключевой выгоды — то есть убедительная причина купить]
В отличие от [основная конкурентная альтернатива]
Наш продукт [формулировка основного дифференциатора]
```

## Протокол

### Шаг 0 — Role Determination (Full A)

Если Full Pipeline A — определить камду (Customer-Champion или Business-Champion). Разные акценты:

**Customer-Champion:**
- Для кого — конкретный end-user / buyer segment
- Почему — user outcome, выполнение JTBD
- Дифференциатор — user experience, ценность на использование

**Business-Champion:**
- Для кого — segment с наивысшим NRR / expansion potential
- Почему — business outcome (ARR, moat, strategic asset)
- Дифференциатор — technical/market moat, scale economics

### Шаг 1 — Target Customer

Конкретный сегмент, не «B2B companies»:
- Firmographic (size, industry, geography)
- Psychographic (buying behavior, maturity)
- Primary role (buyer) + primary user (end-user)

### Шаг 2 — Need / Opportunity

Один **primary** unmet job или problem (из Discovery). Не список — ONE.

### Шаг 3 — Product Category

В какой категории играем. Если новая категория — зафиксировать, что она includes.

### Шаг 4 — Key Benefit

Outcome-focused («get X done in Y time») или emotional («confident about Z»), не feature list.

### Шаг 5 — Alternative

Честно: что customers используют вместо нашего продукта? Включая «do nothing» и self-built solutions.

### Шаг 6 — Differentiation

Почему мы лучше для этого customer в этом job? Не «лучше в X» общее — specific differentiator.

### Шаг 7 — Guiding Principles (3-5)

Пункты, которые направляют решения:
- «Выпускать часто и небольшими шагами, а не идеально и поздно»
- «Оптимизировать под time-to-value end-user, а не количество функций»
- «Enterprise-grade, SMB-simple»

### Шаг 8 — Vision Story

Финальный artifact: 1-3 абзаца, читается как история. Включает:
- Кто герой (target customer)
- В чём его боль
- Как наш продукт меняет его жизнь
- Где мы будем через 2-3 года

### Шаг 9 — Vision Test (FOCUS)

- **F**easible — можем ли реализовать?
- **O**bsession-worthy — вдохновляет команду?
- **C**larifying — помогает решать trade-offs?
- **U**nique — отличается от копий конкурентов?
- **S**pecific — не общие слова?

## Валидация (Quality Gate)

- [ ] Geoffrey Moore formula заполнена
- [ ] Target customer — specific, не generic
- [ ] Need — один primary job, не список
- [ ] Differentiation — specific, checkable
- [ ] 3-5 guiding principles
- [ ] Vision story ≤ 3 paragraphs
- [ ] Passes FOCUS test
- [ ] (Full A) — камду определена, акценты соответствуют

## Handoff

Результат является входом для:
- **`okr-framework`** — vision → quarterly Objectives
- **`north-star-metric`** — vision → measurable NSM
- **`product-roadmap`** — vision → themes
- **Mediator** (Full A) — alpha и beta vision для synthesis

Формат: vision doc (~1 page) + Moore-formula + principles. Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Vision = feature roadmap | Нет differentiator, нет story | История: герой + боль + трансформация |
| Generic customer | «Teams» | Конкретный: «DevOps teams в mid-market SaaS» |
| Multiple «primary» needs | Distraction | ОДНА primary, остальное secondary |
| Copy competitors | Нет moat | Конкретный differentiator |
| Feasible только через 10 лет | Команда теряет мотивацию | Горизонт 2-3 года |
| No guiding principles | Team trade-offs по настроению | 3-5 principles |

## Шаблон

```markdown
# Product Vision

## Целевой Customer
[Конкретный сегмент]

## Потребность / Возможность
[ОДНА основная незакрытая задача / проблема]

## Категория продукта
[Категория в которой играем]

## Ключевая выгода
[Убедительный outcome]

## Unlike (Альтернатива)
[Текущие альтернативы + почему мы лучше]

## Дифференциация
[Конкретная, защищаемая]

## Guiding Principles
1. ...

## Vision Story (1-3 абзаца)
...

## FOCUS Check
- Feasible: ✅
- Obsession-worthy: ✅
- Clarifying: ✅
- Unique: ✅
- Specific: ✅
```

## Worked Example — TeamFlow (Full Pipeline A: Customer-Champion vs Business-Champion)

**Контекст:** TeamFlow AI summarization initiative. Full Pipeline A (`/ship-right-thing`) — adversarial vision сессии. Alpha (STRAT-01α) и Beta (STRAT-02β) работают **независимо**, каждая получает только Discovery Brief, Mediator синтезирует в сессии 4. Ниже — полные vision docs обеих camp'ов + Mediator output.

### Camp Alpha — Vision Customer-Champion (STRAT-01α)

```markdown
# Product Vision — AI 1:1 Summarization (Customer-Champion perspective)

## Целевой Customer
People managers (5-15 прямых подчинённых) в B2B SaaS / Tech companies 100-1000 сотрудников.
Вторичный: individual contributors, извлекающие косвенную выгоду через лучших менеджеров.

## Потребность / Возможность
Каждую неделю менеджеры теряют 3-4 часа на admin overhead (prep + note-taking + follow-up).
Это отнимает и время, И внимание от реального разговора — когда manager типит notes во время
1:1, они не слушают глубоко. End-user менеджеры хотят, чтобы TeamFlow **взял на себя admin работу
чтобы они могли фокусироваться на людях**.

## Категория продукта
AI-assisted 1:1 workflow (новая категория — расширяет «performance management platform»).

## Ключевая выгода
**Вернуть 3 часа в неделю глубокой работы + превратить 1:1s из тревожной admin задачи
в уверенные, connected разговоры.** Менеджер входит в каждую 1:1
зная контекст, выходит без домашних заданий, никогда не теряет action item.

## Unlike (Альтернативы)
- **Ручной workflow (сегодня):** 3-4 часа/неделю потеряно, 40% action items брошено, тревога
  + чувство вины от пропущенного prep.
- **Otter.ai + ChatGPT workaround:** privacy concern (конфиденциальные HR данные в OpenAI
  consumer), оторвано от контекста TeamFlow.
- **Lattice / 15Five:** тот же разрыв — нет native AI summarization. Только ручные шаблоны.

## Дифференциация
**Privacy-first AI интегрированный в 1:1 data model TeamFlow.** Summaries знают предыдущие
1:1s, action items, OKR контекст. Standalone transcription инструменты не могут воспроизвести
contextual awareness. Конкуренты могут догнать по AI — но наш end-user trust moat
(3+ лет работы с HR данными) глубже.

## Guiding Principles
1. **Время end-user священно.** Каждая функция должна экономить минуты, а не добавлять.
2. **Summaries дополняют, а не заменяют, человеческое суждение.** Inline edit всегда доступен.
3. **Privacy by design.** Менеджер управляет каждым toggle. Нет обучения на данных пользователей.
4. **Интегрированное всегда лучше standalone.** Контекст > точность.
5. **Радовать менеджера, а не наблюдать за ним.** Индивидуальная ценность, не management control.

## Vision Story
Представьте Marcus, engineering manager с 8 подчинёнными. Понедельник утром: TeamFlow показывает
ему AI-generated prep card для 1:1 с Sarah в 10:00 — обязательства прошлой недели
возобновлены, её недавние Slack mood indicators отмечены, предложены discussion prompts
из org паттернов. Во время разговора Marcus полностью присутствует — не печатает.
Когда встреча заканчивается, TeamFlow имеет готовый draft summary, action items извлечены, готово для
одобрения Marcus одним касанием. К пятнице Marcus потратил 45 минут на 1:1 admin
вместо 3.5 часов. Он лучший менеджер потому что инструмент делает работу, которую AI делает лучше всего.

К 2028 году TeamFlow стал стандартом: если ты менеджер и не используешь
AI-assisted 1:1s, ты считаешься отставшим — как сейчас ощущается печать без автодополнения.

## FOCUS Check
- **Feasible:** ✅ LLM APIs необходимого качества существуют сегодня
- **Obsession-worthy:** ✅ Менеджеры лично хотят этого, помимо business case
- **Clarifying:** ✅ «Экономит ли это время менеджера?» — чёткий decision filter
- **Unique:** ✅ Native TeamFlow integration + privacy architecture
- **Specific:** ✅ Конкретный сегмент, конкретная экономия времени, конкретные альтернативы
```

---

### Camp Beta — Vision Business-Champion (STRAT-02β)

```markdown
# Product Vision — AI 1:1 Summarization (Business-Champion perspective)

## Целевой Customer
VP People / Chief People Officers в mid-market и enterprise B2B SaaS компаниях
($5M-$500M ARR, 100-1000 сотрудников). Вторичный: менеджеры, как пользователи инструмента.

## Потребность / Возможность
Mid-market CPOs не могут **измерять или драйвить** эффективность менеджеров в масштабе. Они полагаются
на storytelling + anecdata когда CFO спрашивает «какой ROI $200K менеджерского обучения?».
Разрыв: нет data layer на 1:1 practice. **Мы открываем измеримые People Ops** — превращая
HR в data-driven дисциплину наравне с Sales и Engineering.

## Категория продукта
People Ops analytics платформа (расширение категории с «performance management
platform» до более широкой «people operations intelligence»).

## Ключевая выгода
**Сделать People Operations такими же измеримыми как Sales Operations.** Dashboard с
частотой 1:1, velocity action items, team health indicators на уровне менеджера и org —
метрики, которые CPOs всегда хотели. Превращает «мягкую» HR функцию в credible
ELT присутствие.

## Unlike (Альтернативы)
- **Culture Amp, Lattice surveys:** lagging, ежеквартальные, с самооценкой сотрудников. Наши метрики
  — leading, непрерывные, поведенческие.
- **Spreadsheets + tribal knowledge:** не масштабируется после 200 сотрудников.
- **Подход Zendesk «просто считать тикеты»:** не выявляет причину.

## Дифференциация
**Leading indicators эффективности менеджеров**, извлечённые из паттернов 1:1. Moat: 
1. 3+ лет customer 1:1 behavioral data (training corpus для AI)
2. Network effect — больше customers → лучшие aggregate benchmarks (ваша частота 1:1
   в топ-квартиле?)
3. Analytics layer как expansion driver (Enterprise tier открывает это)

## Guiding Principles
1. **Измерено или не существует.** Каждая функция генерирует data point.
2. **Analytics драйвит tier expansion.** Базовое использование = Team tier, analytics = Enterprise.
3. **Aggregate > individual для buyers.** Никогда — surveillance контента.
4. **Benchmark как value-add.** Отраслевые / cohort сравнения = сложно скопировать.
5. **ROI visibility для CPO.** Dashboard → Board deck в 1 клик.

## Vision Story
Представьте Jennifer, CPO в B2B SaaS из 450 человек. Понедельник утром, она просматривает TeamFlow
dashboard: 89% менеджеров провели 1:1s на прошлой неделе (vs 82% в прошлом месяце — зелёная стрелка). Action
item completion rate 68% org-wide, но Engineering team — 52% (флаг: возможность для менеджерского обучения). Её cohort retention топ-исполнителей показывает паттерн 1:1 отличается
от at-risk cohort — 3 недели раннего предупреждения до regrettable attrition.

Когда CEO спрашивает «каков ROI инвестиций в People?», Jennifer имеет одностраничный dashboard
готовый: частота 1:1 коррелирует с retention r=0.71, velocity actions коррелирует
с NPS r=0.58. Впервые People появляется в ELT с hard numbers.

К 2028 году TeamFlow — это «Salesforce для People Operations» — платформа, где
CPOs проводят своё утро так же как CROs живут в своём pipeline dashboard. Category-defining,
не feature-expanding.

## FOCUS Check
- **Feasible:** ✅ Данные существуют в продукте, surfacing — решаемо инженерно
- **Obsession-worthy:** ✅ CPOs просят об этом годами
- **Clarifying:** ✅ «Даёт ли это CPOs новую метрику?» — filter
- **Unique:** ✅ Наш data corpus уникален; benchmarks создают moat
- **Specific:** ✅ Конкретная persona, конкретный ELT narrative, конкретные метрики
```

---

### Mediator Synthesis (MED-01, Session 4)

**Сила доказательств Alpha:** 4/5 (сильная связь с JTBD, сильная competitive differentiation)  
**Сила доказательств Beta:** 4/5 (сильная buyer need, сильное обоснование tier expansion)  

**Ключевые разногласия:**
1. **Фактические:** Alpha говорит «экономия времени менеджера драйвит retention»; Beta говорит «analytics драйвит expansion». Доказательства поддерживают ОБА — не взаимоисключающие.
2. **Ценностные:** Alpha фокусируется на end-user; Beta — на buyer. Оба — реальные customers в B2B buying loop.
3. **Рисковые:** Alpha недооценивает важность aggregate dashboard для Enterprise; Beta недооценивает privacy concerns для SMB.

**Синтез: ГИБРИДНАЯ vision**

```markdown
# Unified Product Vision — AI-Assisted 1:1 Workflow + Analytics

## Целевой Customer (Расширенный)
Два типа пользователей, оба являются buyers в B2B People Ops решениях:
- **Primary user:** People managers (5-15 подчинённых)
- **Primary buyer:** VP People / CPO (mid-market + enterprise)

## Потребность / Возможность
Одновременно решить две связанные проблемы:
1. Менеджеры теряют 3-4 часа/неделю на 1:1 admin (боль end-user)
2. CPOs не могут измерять эффективность менеджеров (боль buyer)
Обе проистекают из одного корня: 1:1 workflow ручной, не оставляя ни данных, ни времени.

## Ключевая выгода
**Для менеджеров:** Вернуть часы в неделю, превратить 1:1s из admin в связь.
**Для CPOs:** Сделать People Ops измеримыми — leading indicators + benchmarks.
Обе выгоды усиливают друг друга: экономия времени → больше 1:1s происходит → больше данных →
лучшие insights → лучший coaching → retention.

## Категория продукта
AI-powered People Operations платформа (конвергенция workflow + analytics tiers).

## Дифференциация (Moat Stack)
1. **Privacy architecture** (от Alpha): end-user trust
2. **Behavioral data corpus** (от Beta): analytics moat
3. **Integrated workflow** (от Alpha): context-aware summaries
4. **Benchmark network** (от Beta): ценность отраслевых сравнений

## Guiding Principles (Объединённые)
1. Время end-user священно И генерирует ценные данные — alignment.
2. Summaries индивидуальны; analytics — aggregate. Никогда не смешивать.
3. Privacy by design (согласие end-user на AI; только aggregate для buyer).
4. Tiered value: Team tier = workflow, Enterprise tier = analytics.
5. Радовать менеджера И вооружать CPO — оба stakeholders выигрывают.

## Tier Architecture (из синтеза)
- **Core (сегодня):** Ручной 1:1 workflow
- **AI Team tier (+$8/seat):** AI summarization, auto action items, reminders (фокус Alpha)
- **Enterprise tier (+$15/seat):** Aggregate dashboard, manager health scores, benchmarks (фокус Beta)

## Открытые риски
- [Concern Alpha] Privacy architecture должна быть bulletproof для end-user adoption
- [Concern Beta] Analytics tier не должен восприниматься как слежка (применён principle #5 Alpha)
- [Добавлено Mediator] Pricing может каннибализировать если не разделён чисто по tiers — тест с customer advisory board

## Обоснование Гибрида
Alpha и Beta — не конкурирующие visions — они complementary layers одной и той же
платформы. Выбор только одного привёл бы к:
- Только Alpha: пропустить $2-3M ARR Enterprise expansion opportunity
- Только Beta: нехватка end-user love, ведущая к низкому adoption и churn risk

Синтез: **Сначала выпустить Alpha MVP (workflow), добавить Beta (analytics) как Enterprise
tier в течение 4-6 месяцев.** Последовательность уважает end-user trust (должно работать прежде чем наблюдать).
```

> **Урок product-vision adversarial:** Customer vs Business camps, независимая работа, Mediator synthesis. **Ни одна camp не выиграла полностью** — синтез показал что обе были правы, но неполны. Без формального adversarial process, команда выпустила бы vision Alpha одна и пропустила бы $2-3M Enterprise ARR opportunity, ИЛИ выпустила бы vision Beta одна и столкнулась бы с adoption backlash. Структурированные дебаты стоили 2 дополнительных сессии, но сохранили как минимум один стратегический просчёт.
