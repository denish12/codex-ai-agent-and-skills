---
name: handoff
description: Передача артефактов между гейтами и сессиями — структурированный формат с decision context
---
# Handoff — Передача контекста между гейтами и сессиями

## Когда использовать
- При **каждом переходе** между гейтами внутри сессии — стандартная передача (intra-session handoff).
- При **завершении сессии** — межсессионная передача (multi-session handoff), сохранение в файл.
- При **возврате на доработку** — обратная передача (reverse handoff).
- **Обязателен** на каждом переходе, в любом режиме пайплайна. Без исключений.

> **Разграничение:** `$gates` проверяет готовность. `$handoff` передаёт работу. `$board` отслеживает статус. Порядок: `$gates` PASS → `$handoff` → обновить `$board`.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Результат `$gates` | ✅ | PASS или CONDITIONAL PASS — handoff невозможен при FAIL |
| Агент-отправитель | ✅ | Кто передаёт (текущий гейт с ID) |
| Агент-получатель | ✅ | Кому передаёт (следующий гейт с ID) |
| Артефакты гейта | ✅ | Deliverables текущего гейта (из реестра `$gates`) |
| Режим пайплайна | ✅ | Full A (`/ship-right-thing`) / Full B (`/shape-prioritize`) / Quick (`/quick-pm`) / Spec (`/spec`) |
| Тип handoff | ✅ | Forward / Reverse / Session (межсессионный) |
| Adversarial camp | ⬚ | Для Full A/B при передаче между camps (через Mediator) |
| Номер сессии | ⬚ | Для межсессионного handoff — текущая и следующая сессия |

> **Предусловие:** Handoff возможен **только** после `$gates` PASS или CONDITIONAL PASS. При FAIL — вернуть агенту, handoff не выполняется.

### Связь с другими скилами
| Скил | Взаимодействие | Когда |
|------|----------------|-------|
| `$gates` | Предусловие: PASS / CONDITIONAL PASS → разрешает handoff. Gate check приложен к конверту | Перед каждым handoff |
| `$board` | После handoff: обновить статусы гейтов (текущий → `[✓]`, следующий → `[→]`) | После каждого handoff |
| `$session-prompt-generator` | Для Session handoff: генерация промпта следующей сессии, включается в файл | При завершении сессии |
| Скилы-фреймворки (jtbd, prd, rice etc.) | Артефакты скилов (заполненные шаблоны) — часть deliverables гейтов | При передаче между агентами |

## Типы handoff

| Тип | Описание | Файл | Контекст следующего получателя |
|-----|----------|------|-------------------------------|
| **Forward** | Стандартная передача между гейтами внутри сессии | Нет (в памяти) | Полный контекст сессии доступен |
| **Reverse** | Возврат на доработку | Нет (в памяти) | Полный контекст сессии доступен |
| **Session** | Межсессионная передача | `docs/product/session-N-handoff.md` | **НОЛЬ** предыдущего контекста — файл должен быть самодостаточным |

> **Ключевое правило межсессионного handoff:** следующая сессия начинается с НУЛЯ контекста. Файл handoff — единственный источник информации. Никаких ссылок на «см. выше» или «как обсуждалось». Всё должно быть в файле.

> **Ключевое правило adversarial independence:** в Full A/B при передаче Discovery Brief обеим camp'ам — **оба пакета идентичны**. Alpha и Beta не видят artefacts друг друга до Mediator. Session-handoff Camp Alpha **НЕ передаётся** Beta до MED-01.

## Реестр передач — что передавать

### Full Pipeline A (`/ship-right-thing`, 6 сессий)

| Переход | Артефакты | Ключевой контекст |
|---------|-----------|-------------------|
| **COND-01 → DISC-01** | Scope задачи, режим, доска, адверсариал-контекст | Продуктовый вопрос, constraints, ICP, текущие метрики |
| **DISC-01 → Session Handoff** | Discovery Brief (JTBD, problems, assumptions, evidence) | Всё discovery-evidence, open questions |
| **COND-02 → STRAT-01α** | Session-1 handoff (Discovery Brief), camp assignment | Discovery Brief + явное «ты Customer-Champion» |
| **STRAT-01α → Session Handoff** | Strategy Brief Alpha (vision, NSM, OKR, roadmap) | Пакет Customer-Champion для Mediator — изолирован от Beta |
| **COND-03 → STRAT-02β** | Session-1 handoff (Discovery Brief, тот же что дали Alpha) | **БЕЗ** Session-2-handoff! Только Discovery |
| **STRAT-02β → Session Handoff** | Strategy Brief Beta | Пакет Business-Champion для Mediator |
| **COND-04 → MED-01** | Session-2 + Session-3 handoff (оба) | Первый гейт, где видны оба camp'а одновременно |
| **MED-01 → Session Handoff** | Unified Strategy Brief (synthesis + rationale) | Финальная стратегия, evidence audit, synthesis path |
| **COND-05 → PM-SPEC** | Session-4 handoff (unified strategy) + Discovery Brief | Strategy для scope decisions |
| **PM-SPEC → UX-01 + TECH-01 + DATA-01** (parallel) | PRD + user stories + AC | Каждый получает свою часть для параллельной работы |
| **Session 5 → Session Handoff** | Объединённый deliverable S5 (PRD + wireframes + feasibility + metric plan) | Всё готово для финальной упаковки |
| **COND-06 → DS-01** | Session-5 handoff + design directive | Content для верстки |
| **DS-01 → LY-01** | Design spec (layout + components) | Готовые templates для HTML/PDF |
| **LY-01 → RG-01** | Final PRD + Product Review Deck (PDF) | Готовый к релизу пакет |

### Full Pipeline B (`/shape-prioritize`, 6 сессий)

| Переход | Артефакты | Ключевой контекст |
|---------|-----------|-------------------|
| **COND-01 → DISC-01** | Scope задачи, утверждённая стратегия (from prior /ship-right-thing или external) | Scope boundaries для приоритизации |
| **DISC-01 → Session Handoff** | Scope Brief (ЧТО приоритизируем, какие JTBD в scope) | Scope boundaries для обеих camp'ов |
| **COND-02 → PM-01α + TECH-01α** (parallel) | Session-1 handoff, Build-camp assignment | Scope Brief + «ты Build-Camp: максимум scope, каждая фича оправдана» |
| **PM-01α / TECH-01α → Session Handoff** | Build scope proposal (max RICE) + feasibility per story | Max-scope пакет для Mediator |
| **COND-03 → PM-02β + TECH-02β** (parallel) | Session-1 handoff (same Scope Brief) | **БЕЗ** Session-2! Cut-camp не видит Build artefacts |
| **PM-02β / TECH-02β → Session Handoff** | Cut scope proposal (MoSCoW) + hidden risks | Min-scope пакет для Mediator |
| **COND-04 → MED-01** | Session-2 + Session-3 handoff | Build vs Cut одновременно |
| **MED-01 → Session Handoff** | Final scope decision + rationale | Утверждённый scope + out-of-scope list |
| **COND-05 → PM-SPEC** | Session-4 handoff (final scope) | Готов писать финальный PRD |
| **PM-SPEC → UX-01 + DATA-01** (parallel) | PRD | Параллельная работа по scope |
| **Session 5 → Session Handoff** | PRD + wireframes + metric plan | Packaging for PDF |
| **COND-06 → DS-01 → LY-01 → RG-01** | Standard packaging | — |

### Quick Pipeline (`/quick-pm`, 1 сессия)

| Переход | Артефакты | Ключевой контекст |
|---------|-----------|-------------------|
| **COND-01 → DISC-01** | Focused вопрос | Short scope |
| **DISC-01 → STRAT-01** | Rough JTBD + problem statement | Strategy alignment input |
| **STRAT-01 → PM-01** | NSM, theme, strategic fit | Для RICE rough |
| **PM-01 → TECH-01** | Rough RICE, MVP sketch (3-5 stories) | Для feasibility |
| **TECH-01 → DATA-01** | Feasibility, risks | Для metric sketch |
| **DATA-01 → Short Brief** | Primary metric, guardrail, target | Final brief |

### Spec Pipeline (`/spec`, 1 сессия)

| Переход | Артефакты | Ключевой контекст |
|---------|-----------|-------------------|
| **COND-01 → PM-SPEC** | Approved strategy + scope | Готово писать PRD |
| **PM-SPEC → UX-01 + TECH-01** (parallel) | PRD draft | Параллельный review |
| **UX + TECH → PM-FINAL** | UX flows + feasibility + NFR | Merge в PRD |
| **PM-FINAL → Handoff to Engineering** | Final PRD | Implementation ready |

## Межсессионный Handoff (Session)

### Структура файла `docs/product/session-N-handoff.md`

Файл содержит **весь** необходимый контекст. Никаких ссылок, никаких сокращений.

```markdown
# Session [N] Handoff — [Название инициативы]

## Meta
- **Проект:** [Название]
- **Дата:** [YYYY-MM-DD]
- **Сессия:** [N] из [M]
- **Режим:** /ship-right-thing | /shape-prioritize | /quick-pm | /spec
- **Adversarial camp** (if applicable): Alpha (Customer / Build) | Beta (Business / Cut) | —
- **Завершённые гейты:** [список ID с deliverables]
- **Следующий гейт:** [ID] [Название]

## Краткое резюме
[2-3 предложения: что было сделано в этой сессии, ключевой результат]

## Состояние доски ($board)
[Полная копия таблицы доски в текущем состоянии + метрики прогресса]

## Полное содержание артефактов

### [Артефакт 1 — например, Discovery Brief]
[ПОЛНЫЙ ТЕКСТ артефакта, не ссылка и не краткое описание]

### [Артефакт 2 — например, JTBD Canvas]
[ПОЛНЫЙ ТЕКСТ артефакта]

### [Артефакт N — ...]
[ПОЛНЫЙ ТЕКСТ]

## Решения и контекст
| # | Решение | Обоснование | Принято кем | Влияет на |
|---|---------|-------------|-------------|-----------|
| 1 | [Что решили] | [Почему] | [User / Conductor] | [Какие гейты] |

## Открытые вопросы и блокеры
| # | Вопрос / Блокер | Severity | Для какого гейта | Статус |
|---|-----------------|:--------:|:----------------:|--------|
| 1 | [Описание] | 🔴/🟡/🟢 | [ID гейта] | Открыт / Разрешён |

## Camp Independence Check (Full A/B)
- [ ] Этот handoff **НЕ** содержит artefacts противоположной camp (если применимо)
- [ ] Если handoff идёт к Camp Beta — артефакты Alpha исключены
- [ ] Mediator получает **оба** session-handoff (явно)

## Кумулятивный индекс
| Сессия | Гейты | Ключевые артефакты | Файл |
|--------|-------|--------------------|------|
| 1 | COND-01, DISC-01 | Discovery Brief, JTBD canvas | session-1-handoff.md |
| 2 | STRAT-01α | Strategy Brief Alpha | session-2-handoff.md |
| [N] | [...] | [...] | session-N-handoff.md |

## Промпт для следующей сессии
[Генерируется через $session-prompt-generator — готовый к вставке промпт]

## Чек-лист верификации
- [ ] Все артефакты включены полностью (не ссылками)
- [ ] Доска задач ($board) сохранена в текущем состоянии
- [ ] Решения и контекст зафиксированы
- [ ] Открытые вопросы / блокеры зафиксированы
- [ ] Кумулятивный индекс актуален
- [ ] Промпт для следующей сессии сгенерирован
- [ ] Camp independence check пройден (Full A/B)
- [ ] Файл самодостаточен — тест: можно прочитать без ЛЮБОГО предыдущего контекста
```

### Протокол восстановления (повреждённый / неполный handoff)

При загрузке session handoff в новой сессии — Conductor выполняет верификацию:

| Проверка | Действие при провале |
|----------|---------------------|
| Файл не найден | Запросить у пользователя путь или пересоздать из памяти предыдущей сессии |
| Артефакты неполные (есть ссылки вместо контента) | Пометить как ⚠️, запросить недостающее у пользователя |
| Кумулятивный индекс не совпадает с содержанием | Пересобрать индекс из фактического содержания файлов |
| Промпт отсутствует | Сгенерировать через `$session-prompt-generator` |
| Доска отсутствует | Восстановить из кумулятивного индекса + артефактов |
| Camp contamination detected | 🔴 Critical: стоп, эскалация, пересоздание handoff с фильтрацией |

> При любом восстановлении — явно сообщить пользователю, что handoff был неполным и что было восстановлено.

## Обратный Handoff (Reverse)

### Когда происходит
- `$gates` — FAIL.
- Mediator обнаружил критические расхождения в данных.
- Пользователь запросил доработку.
- Следующий гейт обнаружил проблему с артефактом предыдущего.

### Протокол reverse handoff
1. Указать **причину возврата** — конкретные gap'ы / замечания.
2. Указать **что именно доработать** — не «переделай», а «проверь evidence для assumption X: в Discovery 0 интервью на этот segment, нужно 5+».
3. Указать **что НЕ трогать** — что уже одобрено и не нуждается в изменениях.
4. Обновить `$board` — гейт-получатель → `[↩] Возврат`, гейт-отправитель → `[→] В работе`.
5. После доработки — повторная `$gates` проверка → forward handoff.

## Подтверждение получения (Receive Acknowledgement)

При получении handoff агент-получатель обязан:

1. **Подтвердить загрузку:** «Handoff от [ID] получен, [N] артефактов загружено».
2. **Перечислить полученное:** список артефактов с кратким описанием.
3. **Отметить gap'ы:** если CONDITIONAL PASS — явно перечислить полученные gap'ы.
4. **Зафиксировать проблемы:** если артефакт неполный или непонятный — запросить уточнение до начала работы (не додумывать).

> Acknowledge встраивается в начало работы следующего гейта. Это не отдельный шаг, а первый абзац deliverable.

## Протокол

### Шаг 0 — Определение типа handoff
1. Forward (внутри сессии), Reverse (возврат), Session (межсессионный).
2. Для Session — определить путь файла: `docs/product/session-N-handoff.md`.
3. Для Full A/B — проверить camp isolation (если handoff идёт alpha → beta без Mediator — **запрещено**).

### Шаг 1 — Предусловия
1. Убедиться, что `$gates` дал PASS или CONDITIONAL PASS (кроме Reverse).
2. Определить агента-получателя по реестру.
3. Собрать все артефакты из реестра передач.
4. Для Full A/B — **отфильтровать** artefacts противоположной camp (если cross-camp handoff).

### Шаг 2 — Формирование конверта
1. Для Forward: заполнить стандартный шаблон конверта.
2. Для Session: заполнить шаблон файла, включить ПОЛНОЕ содержание артефактов.
3. Для Reverse: заполнить обратный конверт с gap'ами.
4. Для CONDITIONAL PASS — явно указать gap'ы, которые передаются.

### Шаг 3 — User sign-off
1. Показать конверт пользователю.
2. Ожидать явное **"Approved"**.
3. Не переходить без Approved. Без исключений.

### Шаг 4 — Сохранение и активация
1. Для Session: сохранить файл в `docs/product/session-N-handoff.md`.
2. Обновить `$board`: текущий гейт → `[✓] Завершён`, следующий → `[→] В работе`.
3. Добавить запись в лог передач.
4. Для Session: вызвать `$session-prompt-generator` для генерации промпта.

## Пример — Forward Handoff COND-03 → STRAT-02β (TeamFlow, `/ship-right-thing`)

**Контекст:** TeamFlow (B2B SaaS, HR-tech). Сессия 3: назначаем Camp Beta (Business-Champion). Важно: Beta получает ТОЛЬКО Discovery Brief, без Session-2 handoff (artefacts Alpha).

```
### Handoff Envelope — COND-03 → STRAT-02β Product Strategist (Business-Champion)

**Тип:** Forward
**Режим:** /ship-right-thing (Full A)
**Сессия:** 3
**Camp:** Beta (Business-Champion)
**Gate Check:** PASS (camp assignment + independence verified)
**Дата:** 2026-04-12

---

**Артефакты:**

1. **Discovery Brief** (из session-1-handoff.md) — ПОЛНЫЙ текст:
   - ICP: mid-market HR-tech (100-500 employees)
   - Buyer: VP People/HR
   - End-user: People managers + ICs
   - JTBD canvas (buyer + end-user separate)
   - Top 3 problem statements
   - Assumption map (12 assumptions, 4 high-risk)

2. **Camp Assignment:** Business-Champion
   - Ты играешь роль Business-Champion (β)
   - Фокус: strategy вокруг revenue, margin, strategic moat, competitive positioning
   - Не play user-value angle (это Alpha, работает параллельно)

**Independence Check:**
- ⛔ Camp Alpha (Customer-Champion) Strategy Brief **НЕ передан** — Beta работает независимо
- Session-2-handoff.md существует, но **явно исключён** из этого конверта

---

**Задача для STRAT-02β:**

Используя **только Discovery Brief**, сформировать Business-Champion Strategy Brief для TeamFlow инициативы «AI-powered 1:1 note summarization».

Включить:
- Vision (business outcomes: ARR, moat, NRR angle)
- North Star Metric (business-value метрика)
- OKR (quarterly)
- Product Roadmap (themes)
- Rationale: почему именно так с business perspective

**Ожидаемый deliverable:**
Strategy Brief Beta (markdown), ~800-1200 слов, с явным business-angle aрgument.

**Блокеры:** Нет

---

→ Ожидаю **"Approved"** для перехода к **STRAT-02β Product Strategist (Business-Champion)**
```

## Валидация конверта (Quality Gate)

### Стандартный (Forward) конверт
- [ ] Результат `$gates` приложен (PASS / CONDITIONAL PASS)
- [ ] Агент-отправитель и получатель указаны с ID гейтов
- [ ] Все артефакты из реестра передач приложены
- [ ] Задача для следующего агента сформулирована конкретно
- [ ] Gap'ы (если CONDITIONAL) явно перечислены
- [ ] Контекст передан
- [ ] Для Full A/B — camp independence verified
- [ ] User Approved получен
- [ ] `$board` обновлён

### Межсессионный (Session) конверт — дополнительно
- [ ] Файл сохранён по пути `docs/product/session-N-handoff.md`
- [ ] Все артефакты включены **полным текстом** (не ссылками и не резюме)
- [ ] Состояние доски сохранено
- [ ] Решения и контекст зафиксированы
- [ ] Открытые вопросы / блокеры зафиксированы
- [ ] Кумулятивный индекс актуален
- [ ] Промпт для следующей сессии сгенерирован
- [ ] Camp independence check пройден (Full A/B)
- [ ] Файл самодостаточен — тест: можно прочитать без ЛЮБОГО предыдущего контекста

## Handoff
Результат `$handoff` является входными данными для: следующего агента в пайплайне, `$board` (обновление статусов), `$session-prompt-generator` (для межсессионных handoff).

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Handoff без `$gates` | Непроверенные артефакты → проблемы на следующем гейте | Всегда `$gates` PASS → затем handoff |
| Handoff без Approved | Нарушение протокола, пользователь не в курсе | Всегда ждать явное Approved |
| Session handoff со ссылками вместо контента | Следующая сессия не имеет доступа к контексту | ПОЛНЫЙ текст артефактов в файле |
| «Сделай анализ» вместо задачи | Агент не знает scope | Конкретная задача с параметрами и ожидаемым deliverable |
| Передача без артефактов | Следующий агент работает вслепую | Все артефакты из реестра приложены |
| Reverse handoff без конкретики | Агент не знает что исправлять | Конкретные gap'ы + что НЕ трогать |
| Не обновить `$board` | Доска рассинхронизирована | Обновлять `$board` при каждом handoff |
| Потеря контекста между сессиями | Следующая сессия начинает с нуля | Межсессионный handoff с полным содержанием |
| Получатель не подтвердил загрузку | Неясно, все ли артефакты получены и поняты | Receive Acknowledgement в начале работы следующего гейта |
| Повреждённый session файл | Следующая сессия работает с неполными данными | Протокол восстановления: верификация при загрузке |
| Camp contamination в Full A/B | Beta видит Alpha artefacts до Mediator → anchoring | Явный фильтр в Шаге 1 + independence check в валидации |

## Шаблоны вывода

### Forward Handoff (внутри сессии)

```
### Handoff Envelope — [ID From] [Агент From] → [ID To] [Агент To]

**Тип:** Forward
**Режим:** [/ship-right-thing | /shape-prioritize | /quick-pm | /spec]
**Сессия:** [N]
**Camp:** [α (Customer/Build) | β (Business/Cut) | —]
**Gate Check:** [PASS / CONDITIONAL PASS] (итерация [N])
**Дата:** [YYYY-MM-DD]

---

**Артефакты:**
- [Артефакт 1 — описание]
- [Артефакт 2 — описание]

**Gap'ы (если CONDITIONAL):**
- [Gap 1 — что учесть]

**Independence Check (Full A/B only):**
- Исключено: [artefacts противоположной camp, если применимо]

---

**Задача для [Агент To]:**
[Чёткая конкретная формулировка]

**Ожидаемый deliverable:**
[Что должен вернуть следующий агент]

**Блокеры:**
[Список или «Нет»]

---

→ Ожидаю **"Approved"** для перехода к **[ID To] [Агент To]**
```

### Reverse Handoff

```
### Reverse Handoff — [ID From] [Агент From] → [ID To] [Агент To] (возврат)

**Тип:** Reverse
**Причина:** [FAIL / feedback / расхождения в данных]
**Дата:** [YYYY-MM-DD]

---

**Что исправить:**
| # | Gap / Замечание | Sev | Конкретное действие |
|---|----------------|:---:|---------------------|
| 1 | [описание] | [B] | [что сделать] |

**Что НЕ трогать:**
- [Артефакт / секция, которая уже одобрена]

---

→ После доработки — повторная проверка `$gates` (итерация [N+1])
→ Ожидаю **"Approved"** на возврат
```

### Receive Acknowledgement (начало работы получателя)

```
**Handoff получен:** [ID From] → [ID To]
**Артефакты загружены:** [N] шт.
- [Артефакт 1] — ✅ получен
- [Артефакт 2] — ✅ получен

**Gap'ы принятые:** [список или «Нет»]
**Camp-isolation (Full A/B):** [Verified / N/A]
**Проблемы при загрузке:** [список или «Нет»]
```
