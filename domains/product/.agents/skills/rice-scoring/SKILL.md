---
name: rice-scoring
description: Приоритизация по Reach × Impact × Confidence / Effort
---
# RICE Scoring

> **Категория:** Prioritization  ·  **Slug:** `rice-scoring`

## Когда использовать

- При ранжировании множества initiatives / features для roadmap.
- Как первичный отбор перед более глубоким анализом.
- Для сопоставимой оценки initiatives разных типов.
- В Build-Camp (`/shape-prioritize`) — каждая initiative должна иметь RICE score.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Backlog / список initiatives | ✅ | 10-50 initiatives оптимально |
| Reach данные | ✅ | Analytics / CRM для оценки reach |
| Гипотеза impact | ✅ | Целевая метрика + обоснование |
| Оценки effort | ✅ | Время разработки/дизайна |
| Период | ✅ | Обычно квартал |

## Источники данных

1. Product analytics — данные users / accounts для reach.
2. Customer interviews — сигнал impact.
3. Инженерные оценки — effort (время, не стоимость).
4. Исторические данные — фактические результаты аналогичных фич.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `problem-statement` | Reach + impact evidence | Для подсчёта |
| `kano-model` | Category multiplier | Post-scoring adjustment |
| `product-roadmap` | Scored list → Now/Next | После scoring |
| `hypothesis-template` | Confidence basis | Для оценки Confidence |

## Формула

```
RICE = (Reach × Impact × Confidence) / Effort
```

## Протокол

### Шаг 1 — Reach

Сколько **people / accounts** затронуто за период.

Шкала:
- Reach всегда за фиксированный период (квартал, полгода)
- B2B SaaS: считать accounts или teams, не raw seats (обычно)
- Точная метрика: «150 аккаунтов за квартал» > «много клиентов»

✅ Хорошо: «120 аккаунтов используют текущий flow / квартал»  
❌ Плохо: «Много команд» (не измерено)

### Шаг 2 — Impact

Сколько value создаст для каждого затронутого пользователя?

Шкала (фиксированная, оригинал Intercom):
- **3** = Масштабный impact
- **2** = Высокий
- **1** = Средний
- **0.5** = Низкий
- **0.25** = Минимальный

Привязать гипотезу метрики: «+15% activation» → средне-высокий Impact.

### Шаг 3 — Confidence

Насколько уверены в reach × impact?

Шкала:
- **100%** — Сильные доказательства (данные A/B теста, аналогичная фича уже запущена)
- **80%** — Умеренные доказательства (customer interviews N ≥ 10, есть данные)
- **50%** — Слабые доказательства (основано на предположениях, нет прямых данных)

Ниже 50% → сначала assumption-mapping.

### Шаг 4 — Effort

Person-months (суммарно по всем ролям).

Декомпозиция:
- Разработка (senior + junior с поправкой)
- Дизайн
- Время PM
- QA
- Инструментирование данных
- Поддержка после запуска

Округлять до четвертей (0.25 / 0.5 / 1 / 2 person-months).

### Шаг 5 — Calculate

```
RICE = (Reach × Impact × Confidence) / Effort
```

Пример:
- Reach: 120 accounts
- Impact: 2 (High)
- Confidence: 80%
- Effort: 3 person-months

RICE = (120 × 2 × 0.8) / 3 = **64**

### Шаг 6 — Rank

Отсортировать initiatives по RICE. Верхние — кандидаты для Now.

### Шаг 7 — Sanity Check

Топ-5 по RICE — разумно?

Частые красные флаги:
- «Минимальный effort, масштабный reach» — проверить, не пропустили ли effort
- Confidence 100% без доказательств — самоуверенность
- Reach > вся клиентская база — математическая ошибка
- Initiatives радикально разного размера конкурируют — разбить или сгруппировать по bucket

### Шаг 8 — Adjust with Kano + Strategy Fit

RICE — чистая математика. Добавить:
- Kano must-have: усиление (×1.5)
- Kano indifferent: исключить (×0)
- Стратегическое соответствие (согласовано с темой): +20% усиление
- Не соответствует теме: снижение (×0.5)

Final = RICE × корректировки.

### Шаг 9 — Document Rationale

Для каждого score — 1 строка обоснования. Будущему вам (и команде) нужно понять, откуда цифры.

## Валидация (Quality Gate)

- [ ] Каждая initiative имеет числовой Reach (не «a lot»)
- [ ] Impact по фиксированной шкале Intercom
- [ ] Confidence честный — доказательства указаны
- [ ] Effort включает ВСЕ роли, не только разработку
- [ ] Математика проверена (нет ошибок)
- [ ] Sanity check пройден
- [ ] Kano + соответствие теме применено
- [ ] Обоснование задокументировано для каждого score

## Handoff

Результат является входом для:
- **`product-roadmap`** — scored list → Now/Next/Later
- **`wsjf-scoring`** — alternative method для enterprise context
- **PM** → PRD decisions
- **Mediator** (Full B) — evidence для Build/Cut debate

Формат: таблица оцённого backlog, топ-позиции с обоснованием. Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Reach = все клиенты | Завышает score | Только затронутые за период |
| Impact без метрики | Субъективно | Привязать числовую гипотезу |
| Confidence 100% всегда | Самоуверенность | Доказательства для каждого уровня |
| Effort = только разработка | Недооценка | Включить все роли |
| Нет корректировок | Игнорирует стратегию / Kano | Применять множители |
| Scoring ≠ обсуждение | RICE = начало, не конец | Верхние позиции → обсуждение |

## Шаблон

```markdown
# RICE Scoring — Q2 2026 Backlog

| # | Initiative | Reach | Impact | Confidence | Effort (pm) | RICE | Adj. | Final | Rationale |
|---|------------|:-----:|:------:|:----------:|:-----------:|:----:|:----:|:-----:|-----------|
| 1 | In-app checklist | 300 | 2 | 80% | 2 | 240 | +20% (theme) | 288 | «300 акк/кв × 80% уверенность из 5 пилотов» |
| 2 | Custom branding | 180 | 1 | 50% | 3 | 30 | ×0 (indifferent) | 0 | «Слабый сигнал» |

## Топ-5 рекомендованных (Now)
...

## Adjustments Applied
- Kano must-have: ×1.5
- Theme-aligned: +20%
- Indifferent: ×0
```

## Worked Example — TeamFlow Q2 Backlog RICE Scoring

**Контекст:** TeamFlow. После Kano classification (18 features across 3 segments) команда scores initiatives для Q2 implementation. Period: one quarter (13 weeks). Baseline RICE + Kano adjustments + theme fit.

### Backlog Scoring (Top 18 items)

| # | Initiative | Reach (accts / quarter) | Impact | Confidence | Effort (pm) | RICE | Kano Adj | Theme Adj | **Final** | Rationale |
|---|------------|:----------------------:|:------:|:----------:|:-----------:|:----:|:--------:|:---------:|:---------:|-----------|
| 1 | AI Summary (core) | 200 (base) | 3 (Massive) | 80% (wizard-of-oz validated) | 3 | **160** | Performance ×1.0 | Theme1 +20% | **192** | «Ключевая AI-фича, сильные доказательства discovery, подтверждена инженерами» |
| 2 | Auto Action Items Extraction | 200 | 2 | 80% | 1.5 | **213** | Performance ×1.0 | Theme1 +20% | **256** | «Наивысший RICE — широкий reach, низкий effort как расширение AI summary» |
| 3 | Action Items Reminders | 200 | 2 | 90% (rule-based, no AI) | 0.5 | **720** | Must (enterprise) ×1.5 | Theme1 +20% | **1296** | «Быстрая победа — минимальный effort, уже готовый стек уведомлений» |
| 4 | Per-Meeting AI Toggle | 200 | 1 | 100% | 0.5 | **400** | Must ×1.5 | Theme3 +20% | **720** | «Must-have для приватности, простой UI» |
| 5 | Data Retention Controls | 200 | 1 | 100% | 1 | **200** | Must ×1.5 | Theme3 +20% | **360** | «Must-have для compliance» |
| 6 | Inline Summary Edit | 200 | 1 | 100% | 0.5 | **400** | Must ×1.5 | Theme1 +20% | **720** | «Must-have, простой UX» |
| 7 | Aggregate Dashboard MVP | 80 (mid+ accts) | 3 | 70% (design partners ready) | 3 | **56** | Performance ×1.0 | Theme2 +20% | **67** | «Enabler для enterprise-тарифа» |
| 8 | Manager Health Score | 80 | 2 | 60% (formula unclear) | 4 | **24** | Performance (ent) ×1.0 | Theme2 +20% | **29** | «Требует валидации допущений» |
| 9 | Quarterly Exec Report Generator | 80 | 2 | 80% | 2 | **64** | Must (mid+) ×1.5 | Theme2 +20% | **115** | «Потребность VP HR в отчётности» |
| 10 | SSO SAML | 27 (enterprise) | 3 | 100% | 1 | **81** | Must (ent) ×1.5 | Theme2 +20% | **146** | «Блокер enterprise-контракта» |
| 11 | Audit Log Enhancements | 27 | 2 | 100% | 1.5 | **36** | Must (ent) ×1.5 | Theme3 +20% | **65** | «Соответствие SOC 2» |
| 12 | Calendar Integration v2 | 150 (mid+) | 2 | 90% | 2 | **135** | Must (mid+) ×1.5 | Theme1 +20% | **243** | «Разблокирует mid-market adoption» |
| 13 | Slack Notifications | 150 | 1 | 90% | 0.5 | **270** | Delighter ×1.3 | Theme1 +20% | **421** | «Delighter в SMB + mid, быстрая сборка» |
| 14 | Zoom/Meet Import | 70 (mid) | 1 | 60% (integration risk) | 3 | **14** | Delighter (mid) ×1.3 | — | **18** | «Низкий RICE, отложить на Q3» |
| 15 | AI Discussion Prompts | 120 (SMB primary) | 1 | 50% (novelty — adoption unclear) | 1 | **60** | Delighter (SMB) ×1.3 | Theme1 +10% | **86** | «SMB delighter» |
| 16 | Meeting Templates | 120 | 1 | 80% | 1 | **96** | Delighter (SMB) ×1.3 | Theme1 +10% | **137** | «Помощь при онбординге SMB» |
| 17 | Sentiment Tracking | 0 (Reverse in SMB!) | 0 | 100% | 2 | **0** | Reverse ×0 | — | **0** | «❌ ИСКЛЮЧЕНО — Reverse signal в Kano» |
| 18 | Real-time Transcription | 150 (mid+) | 2 | 75% | 4 | **56** | Performance ×1.0 | Theme1 +20% | **68** | «Высокий effort, рассмотреть в Q3» |

### Наблюдения по Sanity Check

1. **Пункт 3 (Action Items Reminders) — наивысший RICE** — поначалу кажется подозрительным. Но обоснование держится: очень низкий effort (0.5 pm = 2 недели), широкий reach, высокая confidence (на правилах, без неопределённости AI). Зелёный свет как quick-win Q2.
2. **Пункт 17 (Sentiment Tracking) исключён** множителем Kano Reverse — в наивном RICE-only подходе был бы запущен (базовый 60). Интеграция Kano это предотвратила.
3. **Пункт 8 (Manager Health Score) низкий** из-за штрафа за confidence — формула неясна. Инициирует решение: **spike** на 1 неделю для определения формулы, ЗАТЕМ пересчёт.
4. **Пункт 14 (Zoom/Meet) отложен** — низкий абсолютный RICE, высокий риск интеграции.

### Топ-10 рекомендованных для Now (отсортировано по Final)

1. **Action Items Reminders** (1296) — P0 быстрая победа
2. **Auto Action Items Extraction** (256) — P0 ядро
3. **Calendar Integration v2** (243) — P0 enabler для mid-market
4. **AI Summary core** (192) — P0 флагман
5. **Per-Meeting AI Toggle** (720) — P0 обязательный для приватности
6. **Inline Summary Edit** (720) — P0 обязательный для UX
7. **Data Retention Controls** (360) — P0 соответствие требованиям
8. **Slack Notifications** (421) — P1 SMB delighter
9. **Data Retention Controls** — также P0 соответствие требованиям
10. **SSO SAML** (146) — P0 разблокировщик enterprise

### Суммарный Effort (Top 10)

**Must-haves (P0):** 14.5 person-months  
**Should-haves + Delighters:** 1.5 person-months  
**Итого Now bucket:** 16 person-months в 13-недельном квартале = ~5 инженеров с полной загрузкой. Совпадает с ёмкостью команды (8 инж.) при 3 зарезервированных для Темы 2 + 3.

### Отложено на Q3

- Real-time Transcription (пункт 18) — слишком высокий effort для Q2, поставлен в очередь на Q3 когда AI-инфраструктура стабилизируется
- Zoom/Meet Import (пункт 14) — зависит от работ по интеграционной платформе

> **Урок RICE:** Kano multipliers **изменили порядок** — без них Sentiment Tracking был бы запущен. Бонус за соответствие теме сконцентрировал работу в 3 стратегических темах — избежал разрозненного backlog. Штраф за confidence на пункте 8 (Manager Health Score) предотвратил принятие обязательства без валидации формулы — конвертировал в spike сначала. Scoring — отправная точка для обсуждения; топ-10 — это обязательство после согласования, не вывод алгоритма.
