---
name: kano-model
description: Классификация фич — must-have / performance / delighters / indifferent / reverse
---
# Kano Model

> **Категория:** Strategy  ·  **Slug:** `kano-model`

## Когда использовать

- При планировании релиза — проверка баланса фич.
- При appraising feature requests от customers.
- При competitive analysis — что делает продукт magical vs table-stakes.
- В Full Pipeline B (`/shape-prioritize`) — Kano как filter для scope.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Набор фич (существующие + планируемые) | ✅ | Список фич для классификации |
| Исследование клиентов | ✅ | Для опроса или вывода |
| Карта фич конкурентов | ⬚ | Что является table stakes в категории |

## Источники данных

1. Опрос клиентов (Kano questionnaire — формат двойного вопроса).
2. Интервью — что восхищает vs расстраивает.
3. Support tickets — что отсутствие создаёт боль.
4. Конкурентный анализ — базовые ожидания.

### Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| `jtbd-canvas` | Jobs → функциональный vs эмоциональный impact | Перед Kano |
| `rice-scoring` | Score × Kano категория = финальный приоритет | После Kano |
| `product-roadmap` | Проверка баланса | Для валидации roadmap |

## Пять категорий Kano

| Категория | Когда есть | Когда нет | Стратегия |
|-----------|-----------|-----------|-----------|
| **Must-have (Basic)** | Ожидается, не восхищает | Высокая неудовлетворённость | Обязательно включить. Table stakes |
| **Performance (Linear)** | Удовлетворённость растёт пропорционально | Неудовлетворённость | Конкурировать по этой оси |
| **Delighters (Excitement)** | Wow, неожиданно | Не замечается | Дифференциаторы. Несколько на релиз |
| **Indifferent** | Нейтрально | Нейтрально | Пропустить, не тратить усилия |
| **Reverse** | Вызывает неудовлетворённость (перегрузка) | Удовлетворяет | Вырезать или сделать опциональным |

## Протокол

### Шаг 0 — Feature List

Собрать все фичи (существующие + планируемые) в единый список. 10-30 фич оптимально.

### Шаг 1 — Classification Method

Два метода:

**A. Опрос (золотой стандарт)**

Для каждой фичи — 2 вопроса:
- Функциональный: «Если бы фича X была — как вы себя чувствовали?» (1-5 от Dislike до Like)
- Дисфункциональный: «Если бы фичи X НЕ БЫЛО — как бы себя чувствовали?» (1-5)

Матрица ответов → Kano категория.

**B. Вывод (быстрее, менее строго)**

Командный воркшоп: классифицировать по интуиции + доказательствам (тикеты, интервью).

### Шаг 2 — Kano Matrix

```
Дисфункциональный (без фичи)
              Like  Neutral  Dislike
Functional    ┌───────┬─────────┬──────────┐
Like          │ Rev.  │ Delight │ Perform. │
Neutral       │ Rev.  │ Indiff. │ Must     │
Dislike       │ -     │ -       │ Must     │
              └───────┴─────────┴──────────┘
```

### Шаг 3 — Classify Features

| # | Фича | Функц. оценка | Дисфункц. оценка | Kano Категория |
|---|---------|:-----------:|:--------------:|:-------------:|
| 1 | SSO | Нейтрально | Dislike | **Must-have** |
| 2 | Пользовательские дашборды | Like | Dislike | **Performance** |
| 3 | Голосовые команды | Like | Нейтрально | **Delighter** |
| 4 | Кастомизация аватара | Нейтрально | Нейтрально | **Indifferent** |

### Шаг 4 — Portfolio Balance Check

Здоровый релиз:
- **Must-haves:** все присутствуют (даже если невидимые). Без них = релиз заблокирован.
- **Performance:** 2-3 ключевых, по которым конкурируем.
- **Delighters:** 1-3. Больше не нужно — перегрузка.
- **Indifferent:** убрать.
- **Reverse:** вырезать или сделать опциональными.

### Шаг 5 — Evolve Over Time

Важно: **Delighters становятся Performance → Must-have** со временем.
- iPhone camera: delighter (2007) → performance (2012) → must-have (2020)
- SSO: delighter (2010) → performance (2016) → must-have в B2B (2022)

Plan для каждой delighter: когда она станет must-have → нужна новая delighter.

### Шаг 6 — Segment Differences

Разные сегменты → разные Kano классификации.
- SMB: SSO = indifferent
- Enterprise: SSO = must-have

Обязательно делать per-segment анализ для B2B.

### Шаг 7 — Kano × RICE

Умножить RICE на Kano коэффициент:
- Must-have: если отсутствует, фича критична (RICE × 2)
- Performance: стандартно (RICE × 1)
- Delighter: буст для дифференциации (RICE × 1.3)
- Indifferent: вырезать (RICE × 0)
- Reverse: отрицательный (избегать)

## Валидация (Quality Gate)

- [ ] 10-30 фич классифицированы
- [ ] Метод (опрос или вывод) явен
- [ ] Per-segment анализ (SMB vs enterprise)
- [ ] Баланс портфеля: все must-haves ✅, 2-3 performance, 1-3 delighters
- [ ] Indifferent фичи идентифицированы для вырезания
- [ ] План эволюции delighter
- [ ] Kano × RICE интегрированы

## Handoff

Результат является входом для:
- **`product-roadmap`** — feature balance в Now/Next
- **`rice-scoring`** — adjusted scores
- **PM** → scope decisions
- **Mediator** (Full B) — Build/Cut camp evidence

Формат: Kano classification table + portfolio chart. Через `$handoff`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| Все delighters | Нет основы + перегрузка | Must-haves обязательны в первую очередь |
| Нет проверки must-have | Релиз блокируется | Must-haves = фундамент |
| Indifferent запущены | Трата усилий | Вырезать рано |
| Нет разделения по сегментам | B2B SMB ≠ Enterprise | Per-segment анализ |
| Статичный Kano | Миграция не учитывается | Планировать delighter → must-have |
| Survey N=5 | Не статистически значимо | N ≥ 100 для опроса |

## Worked Example — TeamFlow Kano Survey (AI 1:1 Summarization release)

**Контекст:** TeamFlow (B2B SaaS HR-tech, $8M ARR). После Discovery + OST + PRD draft — команда обдумывает финальный scope для AI summarization release. 18 feature candidates рассмотрены. Goal: ship strong MVP без overwhelm, с clear delighters для competitive differentiation.

### Feature List (18 candidates)

```
CORE AI (from main initiative):
1. Real-time transcription during 1:1
2. Auto-generated summary (post-meeting)
3. Auto-extracted action items
4. Action items reminders (before next 1:1)
5. Manager inline edit of summary

BUYER DASHBOARD:
6. Aggregate 1:1 cadence dashboard (org-level)
7. Manager-level 1:1 health score
8. Exportable quarterly report for Board

INTEGRATIONS:
9. Calendar integration (auto-pull 1:1 events)
10. Slack notification integration
11. Zoom / Google Meet recording import
12. SSO (SAML) — required for enterprise

PRIVACY / CONTROL:
13. Per-meeting AI on/off toggle
14. Data retention controls (30 / 90 / 365 days)
15. Audit log (who accessed summaries)

NICE-TO-HAVE:
16. AI-suggested discussion prompts
17. Sentiment tracking (aggregated, over time)
18. Meeting template library
```

### Метод Kano-опроса

Двухвопросный опрос отправлен **247 клиентам TeamFlow** (стратифицированная выборка: 140 SMB, 80 mid-market, 27 enterprise контактов). Показатель ответов: 52% = 129 ответов.

**Формат вопроса для каждой фичи:**
- **Функциональный:** «Если бы у TeamFlow БЫЛА [фича], как бы вы себя чувствовали?» (1 = Dislike, 5 = Like)
- **Дисфункциональный:** «Если бы у TeamFlow НЕ БЫЛО [фичи], как бы вы себя чувствовали?» (1 = Dislike, 5 = Like)

### Результаты классификации (по сегментам)

#### Сегмент SMB (N=70)

| # | Фича | Функц. | Дисфункц. | Категория |
|---|---------|:-----:|:-----:|:--------:|
| 1 | Транскрипция в реальном времени | Like | Нейтрально | **Delighter** |
| 2 | Автосгенерированное summary | Like | Dislike | **Performance** |
| 3 | Автоизвлечение action items | Like | Dislike | **Performance** |
| 4 | Напоминания о action items | Like | Нейтрально | **Delighter** |
| 5 | Inline редактирование менеджером | Нейтрально | Dislike | **Must-have** |
| 6 | Агрегированный дашборд | Нейтрально | Нейтрально | **Indifferent** (SMB не нужен орг-уровень) |
| 7 | Оценка здоровья менеджера | Нейтрально | Нейтрально | **Indifferent** |
| 8 | Квартальный экспорт | Нейтрально | Нейтрально | **Indifferent** |
| 9 | Интеграция с календарём | Like | Dislike | **Performance** |
| 10 | Уведомления Slack | Like | Нейтрально | **Delighter** |
| 11 | Импорт из Zoom/Meet | Нейтрально | Нейтрально | **Indifferent** |
| 12 | SSO SAML | Нейтрально | Нейтрально | **Indifferent** (SMB используют Google auth) |
| 13 | Переключатель AI на встречу | Нейтрально | Dislike | **Must-have** |
| 14 | Управление хранением данных | Нейтрально | Dislike | **Must-have** |
| 15 | Журнал аудита | Нейтрально | Нейтрально | **Indifferent** |
| 16 | AI подсказки для обсуждения | Like | Нейтрально | **Delighter** |
| 17 | Трекинг настроений | Нейтрально | Like | **Reverse** (SMB реагируют негативно) |
| 18 | Шаблоны встреч | Like | Нейтрально | **Delighter** |

#### Сегмент Mid-market (N=45)

| # | Фича | Функц. | Дисфункц. | Категория |
|---|---------|:-----:|:-----:|:--------:|
| 1 | Транскрипция в реальном времени | Like | Dislike | **Performance** |
| 2 | Автосгенерированное summary | Like | Dislike | **Performance** |
| 3 | Автоизвлечение action items | Like | Dislike | **Performance** |
| 4 | Напоминания о action items | Like | Dislike | **Performance** |
| 5 | Inline редактирование менеджером | Нейтрально | Dislike | **Must-have** |
| 6 | Агрегированный дашборд | Like | Dislike | **Performance** |
| 7 | Оценка здоровья менеджера | Like | Нейтрально | **Delighter** |
| 8 | Квартальный экспорт | Нейтрально | Dislike | **Must-have** |
| 9 | Интеграция с календарём | Нейтрально | Dislike | **Must-have** |
| 10 | Уведомления Slack | Нейтрально | Нейтрально | **Indifferent** |
| 11 | Импорт из Zoom/Meet | Like | Нейтрально | **Delighter** |
| 12 | SSO SAML | Нейтрально | Dislike | **Must-have** |
| 13 | Переключатель AI на встречу | Нейтрально | Dislike | **Must-have** |
| 14 | Управление хранением данных | Нейтрально | Dislike | **Must-have** |
| 15 | Журнал аудита | Нейтрально | Нейтрально | **Indifferent** |
| 16 | AI подсказки для обсуждения | Нейтрально | Нейтрально | **Indifferent** |
| 17 | Трекинг настроений | Нейтрально | Нейтрально | **Indifferent** |
| 18 | Шаблоны встреч | Нейтрально | Нейтрально | **Indifferent** |

#### Сегмент Enterprise (N=14)

| # | Фича | Функц. | Дисфункц. | Категория |
|---|---------|:-----:|:-----:|:--------:|
| 1 | Транскрипция в реальном времени | Like | Dislike | **Performance** |
| 2 | Автосгенерированное summary | Like | Dislike | **Performance** |
| 3 | Автоизвлечение action items | Like | Dislike | **Performance** |
| 4 | Напоминания о action items | Нейтрально | Dislike | **Must-have** |
| 5 | Inline редактирование менеджером | Нейтрально | Dislike | **Must-have** |
| 6 | Агрегированный дашборд | Like | Dislike | **Performance** (высокая ценность) |
| 7 | Оценка здоровья менеджера | Like | Dislike | **Performance** |
| 8 | Квартальный экспорт | Нейтрально | Dislike | **Must-have** |
| 9 | Интеграция с календарём | Нейтрально | Dislike | **Must-have** |
| 10 | Уведомления Slack | Нейтрально | Нейтрально | **Indifferent** |
| 11 | Импорт из Zoom/Meet | Like | Dislike | **Performance** |
| 12 | SSO SAML | Нейтрально | Dislike | **Must-have** (требование контракта!) |
| 13 | Переключатель AI на встречу | Нейтрально | Dislike | **Must-have** |
| 14 | Управление хранением данных | Нейтрально | Dislike | **Must-have** |
| 15 | Журнал аудита | Нейтрально | Dislike | **Must-have** (требование соответствия!) |
| 16 | AI подсказки для обсуждения | Нейтрально | Нейтрально | **Indifferent** |
| 17 | Трекинг настроений | Нейтрально | Нейтрально | **Indifferent** |
| 18 | Шаблоны встреч | Нейтрально | Нейтрально | **Indifferent** |

### Согласование сегментов — финальная классификация

Используя правило «побеждает худший сегмент» (если фича Must-have для enterprise, но Indifferent для SMB — считаем Must-have для Enterprise tier; для общего релиза — высокий приоритет):

| # | Фича | SMB | Mid-market | Enterprise | **Финальный приоритет** | Обоснование |
|---|---------|:---:|:----------:|:----------:|:------------------:|-----------|
| 5 | Inline редактирование менеджером | Must | Must | Must | **MUST-HAVE** | Универсальный table stakes |
| 13 | Переключатель AI на встречу | Must | Must | Must | **MUST-HAVE** | Приватность для всех |
| 14 | Управление хранением данных | Must | Must | Must | **MUST-HAVE** | Приватность + соответствие |
| 9 | Интеграция с календарём | Perf | Must | Must | **MUST-HAVE** (mid+) | Блокер на mid-market+ |
| 12 | SSO SAML | Indiff | Must | Must | **MUST-HAVE** (mid+) | Требование enterprise контракта |
| 15 | Журнал аудита | Indiff | Indiff | Must | **MUST-HAVE** (enterprise) | SOC 2 соответствие |
| 8 | Квартальный экспорт | Indiff | Must | Must | **MUST-HAVE** (mid+) | Отчётность VP HR |
| 4 | Напоминания о action items | Delight | Perf | Must | **MUST-HAVE** (enterprise), **PERFORMANCE** (mid) | Варьируется по сегменту — запустить в MVP |
| 2 | Автосгенерированное summary | Perf | Perf | Perf | **PERFORMANCE** | Базовая фича, конкурентная ось |
| 3 | Автоизвлечение action items | Perf | Perf | Perf | **PERFORMANCE** | Базовая фича |
| 6 | Агрегированный дашборд | Indiff | Perf | Perf | **PERFORMANCE** (тир mid+) | Драйвер расширения |
| 1 | Транскрипция в реальном времени | Delight | Perf | Perf | **PERFORMANCE** (mid+), **DELIGHTER** (SMB) | Точка восхищения для SMB |
| 7 | Оценка здоровья менеджера | Indiff | Delight | Perf | **PERFORMANCE** (enterprise), **DELIGHTER** (mid) | Дифференциатор тира |
| 11 | Импорт из Zoom/Meet | Indiff | Delight | Perf | **DELIGHTER** (mid) | Интеграционный ров |
| 10 | Уведомления Slack | Delight | Indiff | Indiff | **DELIGHTER** (SMB основной) | Восхищение специфически для SMB |
| 16 | AI подсказки для обсуждения | Delight | Indiff | Indiff | **DELIGHTER** (SMB) | Новинка для SMB |
| 18 | Шаблоны встреч | Delight | Indiff | Indiff | **DELIGHTER** (SMB) | Помощь при онбординге |
| 17 | Трекинг настроений | Reverse | Indiff | Indiff | **ВЫРЕЗАТЬ** | Красный флаг для SMB! |

### Проверка баланса портфеля

**Scope MVP (Must-haves):**
- Inline редактирование менеджером, Переключатель AI на встречу, Управление хранением данных (универсальные)
- Календарь, SSO, Квартальный экспорт (mid-market / enterprise)
- Журнал аудита (enterprise)
- Напоминания о action items (зависит от тира)

**Performance фичи (ключевые конкурентные):**
- Авто summary, автоизвлечение action items, Транскрипция в реальном времени (mid+), Агрегированный дашборд (mid+), Оценка здоровья менеджера (enterprise)

**Delighters (опциональные для MVP, для конкурентной дифференциации и любви SMB):**
- Импорт из Zoom/Meet (mid-market) — выбрать 1-2
- Уведомления Slack (SMB)
- AI подсказки для обсуждения (SMB)

**ВЫРЕЗАТЬ:**
- Трекинг настроений — Reverse в сегменте SMB, Indifferent в mid+ → убрать из релиза
- Рассмотреть исследование после запуска если позже появятся запросы от enterprise

### Интеграция Kano × RICE

| Фича | RICE score | Kano корректировка | Финальный приоритет |
|---------|:----------:|:---------------:|:--------------:|
| Авто summary | 64 | Performance × 1.0 = 64 | P0 |
| Авто action items | 58 | Performance × 1.0 = 58 | P0 |
| Inline редактирование | 35 | Must × 1.5 = 52 | P0 |
| Переключатели приватности | 30 | Must × 1.5 = 45 | P0 |
| Интеграция с календарём | 40 | Must (mid+) × 1.5 = 60 | P0 |
| SSO SAML | 25 | Must (enterprise) × 1.5 = 37 | P0 |
| Агрегированный дашборд | 45 | Performance × 1.0 = 45 | P1 (тир mid+) |
| Импорт из Zoom/Meet | 20 | Delighter × 1.3 = 26 | P1 |
| Трекинг настроений | 15 | Reverse × 0 = 0 | **ВЫРЕЗАТЬ** |

### План эволюции Delighter (12-24 месяца вперёд)

| Delighter (сегодня) | → Performance (6-12 мес) | → Must-have (12-24 мес) |
|-------------------|-------------------------|-------------------------|
| Транскрипция в реальном времени (SMB) | 3-6 мес (после запуска конкурентами) | ~18 мес |
| AI подсказки для обсуждения | 9-12 мес | ~24 мес |
| Импорт из Zoom/Meet | 6-12 мес | ~18 мес |

**Выводы:**
- Запустить MVP с надёжными must-haves + 2-3 delighters = восприятие как лидера категории
- Roadmap 12-24 мес: добавить delighters «следующего поколения», чтобы не оказаться заблокированным table stakes (напр., коучинг инсайты, multi-meeting threads)

### Финальная рекомендация для PM

- **Запустить MVP:** все универсальные Must-haves + Авто summary + Авто action items + Транскрипция в реальном времени + (тирно-закрытый) Агрегированный дашборд + SSO/Журнал аудита для Enterprise
- **Вырезать из MVP:** Трекинг настроений (Reverse сигнал), Оценка здоровья менеджера (Delighter для mid, отложить)
- **Архитектура ценообразования:** 
  - **Core тир:** Авто summary, Авто action items, Транскрипция в реальном времени, Переключатели приватности
  - **Team тир +$8/место:** Календарь, Уведомления Slack, Квартальный экспорт
  - **Enterprise тир +$15/место:** Агрегированный дашборд, Оценка здоровья менеджера, SSO, Журнал аудита
- **Восхитить SMB:** Запустить Slack уведомления + AI подсказки для обсуждения в MVP — низкие затраты на разработку, большая воспринимаемая ценность

> **Урок Kano:** Per-segment analysis **changed scope**. Sentiment tracking was initially слот в MVP, но survey выявил **Reverse signal в SMB segment** — SMB customers would **dislike** if it existed. Ship would have damaged NPS в biggest customer segment. Without Kano survey, this would have launched и hurt.

> **Урок tier design:** Kano отражает buyer vs end-user value — SSO / Audit log Indifferent для SMB, но contract blocker для Enterprise. Perfect signal для tiered pricing architecture.
