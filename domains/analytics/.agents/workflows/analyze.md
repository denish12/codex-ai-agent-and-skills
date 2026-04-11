---
name: analyze
description: Полный аналитический пайплайн — 5 сессий, состязательный подход, медиация, PDF-отчёт
---

# Воркфлоу: /analyze — Полный аналитический пайплайн (5 сессий)

## Описание
Полный аналитический пайплайн с состязательным подходом. Две конкурирующие команды (Аналитики и Критики) независимо исследуют вопрос, Медиатор оценивает результаты, верстальщики готовят PDF-отчёт. Разбит на 5 сессий для управления контекстным окном.

> **Правила пайплайна:** Этот воркфлоу подчиняется `analytics-pipeline-rules.md` — 7 обязательных правил, mechanical blocks, метрики здоровья, протокол эскалации.

## Когда использовать

| Критерий | /analyze (Full) | /quick-insight (Quick) |
|----------|:---------------:|:----------------------:|
| Сложность вопроса | Высокая: стратегический, многофакторный | Низкая: один фреймворк, quick check |
| Ставки | Высокие: инвестиции, выход на рынок, M&A | Низкие: внутренний отчёт, exploration |
| Devil's advocate нужен? | Да — критика усиливает результат | Нет — одной точки зрения достаточно |
| PDF-отчёт | Да — для презентации | Нет — markdown достаточно |
| Бюджет времени | 5 сессий (суммарно 2-4 часа) | 1 сессия (30-60 мин) |
| При сомнении | ✅ **Использовать /analyze** | |

## Когда НЕ использовать
- Простой аналитический вопрос → `/quick-insight`.
- Нужен быстрый ответ без PDF → `/quick-insight`.

> Quick Pipeline описан в `quick-insight.md`. Все гейты в одной сессии, без конкурирующих команд.

## Вход воркфлоу

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Вопрос / тема | ✅ | Что нужно проанализировать — от пользователя |
| Данные пользователя | ⬚ | Любые имеющиеся данные, отчёты, метрики |
| Отрасль / рынок | ⬚ | Если известно заранее. Если нет — определит Interviewer |
| Бюджет / ресурсы | ⬚ | Контекст для стратегических рекомендаций |
| Дедлайн | ⬚ | Влияет на глубину исследования |

---

## Пайплайн (5 сессий)

```
┌─────────── Сессия 1 ───────────┐
│ COND-01 → INT-01               │ → session-1-handoff.md
└─────────────────────────────────┘

┌─────────── Сессия 2 ───────────┐
│ COND-02 → RES-01(α)            │
│         → AN-01(α)             │
│         → ST-01(α)             │ → session-2-handoff.md
└─────────────────────────────────┘

┌─────────── Сессия 3 ───────────┐
│ COND-03 → RES-02(β)            │
│         → AN-02(β)             │
│         → ST-02(β)             │ → session-3-handoff.md
└─────────────────────────────────┘

┌─────────── Сессия 4 ───────────┐
│ COND-04 → MED-01               │ → session-4-handoff.md
│ (opt: MED-01 Synthesis)         │
└─────────────────────────────────┘

┌─────────── Сессия 5 ───────────┐
│ COND-05 → DS-01 → LY-01        │ → PDF report
│         → RG-01                 │
└─────────────────────────────────┘
```

### Параллелизм

| Сессии | Параллельно? | Причина |
|--------|:------------:|---------|
| Сессии 1-5 | ❌ Строго последовательно | Каждая зависит от handoff предыдущей |
| Внутри сессии: гейты | ❌ Последовательно | Researcher → Data Analyst → Strategist |
| Сессия 5: DS-01 → LY-01 | ❌ Последовательно | Layouter реализует дизайн-спек |

---

## Гейты и deliverables по сессиям

### Сессия 1: Интервью

#### COND-01: Conductor
**Вход:** Задача пользователя
**Действия:**
1. Определить scope и сложность вопроса.
2. Подтвердить режим `/analyze` (или переключить на `/quick-insight`).
3. Инициализировать доску (`$board` — Full Pipeline, 15 гейтов).
4. Сформулировать задачу для Interviewer.
5. `$gates` → `$handoff` → Interviewer.
**Обязательные скилы:** `$board`, `$gates`, `$handoff`
**Deliverable:** Board + Handoff Envelope → Interviewer
**→ Ждать "Approved"**

#### INT-01: Interviewer
**Вход:** `$handoff` от COND-01
**Действия:**
1. Адаптивное интервью — задавать вопросы до достаточного контекста.
2. Определить: вопрос, отрасль, данные, цель, timeline, метод оценки Медиатора.
3. Сформировать Research Brief.
4. `$gates` → `$handoff` → Conductor.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Research Brief (scope, ограничения, ключевые вопросы, источники данных, метод оценки)
**→ Ждать "Approved"**

#### Завершение сессии 1
Conductor:
1. Сохраняет `docs/analytics/session-1-handoff.md` (полный текст Research Brief).
2. Генерирует промпт для сессии 2 (`$session-prompt-generator`).
3. Показывает промпт пользователю.

---

### Сессия 2: Команда Аналитиков (Alpha)

#### COND-02: Conductor (инициализация)
**Вход:** `docs/analytics/session-1-handoff.md` (пользователь вставляет промпт)
**Действия:**
1. Парсинг handoff файла — восстановление контекста.
2. Верификация целостности (`$handoff` → протокол восстановления, если файл неполон).
3. Загрузка Research Brief.
4. Объявить: «Сессия 2 — Команда Аналитиков (Alpha)».
5. Назначить team mode: `Alpha`.
6. `$gates` → `$handoff` → RES-01.
**→ Ждать "Approved"**

#### RES-01: Researcher (Alpha)
**Вход:** Research Brief + `team: Alpha`
**Действия:**
1. Сбор фактов и данных по ключевым вопросам Research Brief.
2. **Обязательный** веб-поиск (`$web-research`) — верификация + дополнение.
3. Формирование Research Package (факты + источники + Tier + достоверность).
4. `$gates` → `$handoff` → AN-01.
**Обязательные скилы:** `$web-research`, `$gates`, `$handoff`
**Deliverable:** Alpha Research Package (данные с URL, датами, уровнем достоверности ✅/⚠️/🔮)
**→ Ждать "Approved"**

#### AN-01: Data Analyst (Alpha)
**Вход:** Alpha Research Package + Research Brief
**Действия:**
1. Выбор релевантных фреймворков (минимум 2 из доступных).
2. Применение фреймворков к собранным данным.
3. Структурирование результатов, выявление паттернов.
4. `$gates` (dependency check: данные RES-01 процитированы) → `$handoff` → ST-01.
**Обязательные скилы:** выбранные фреймворки (из каталога: `$swot-analysis`, `$tam-sam-som`, `$competitive-analysis`, `$pest-analysis`, `$porters-five-forces`, `$bcg-matrix`, `$ansoff-matrix`, `$blue-ocean-strategy`, `$value-chain-analysis`, `$cohort-analysis`, `$rfm-analysis`, `$unit-economics`, `$trend-analysis`, `$customer-journey-mapping`, `$icp-buyer-persona`, `$jtbd-analysis`), `$gates`, `$handoff`
**Deliverable:** Alpha Analytical Report (фреймворки + паттерны + инсайты)
**→ Ждать "Approved"**

#### ST-01: Strategist (Alpha)
**Вход:** Alpha Research Package + Alpha Analytical Report
**Действия:**
1. Синтез данных и аналитики в стратегию.
2. Формирование рекомендаций с привязкой к доказательствам.
3. Оценка рисков + план действий.
4. `$gates` (dependency check: evidence из AN-01 и RES-01) → `$handoff` → Conductor.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Alpha Strategy Report (executive summary + insights + strategy + risks + action plan + KPIs)
**→ Ждать "Approved"**

#### Завершение сессии 2
Conductor:
1. Сохраняет `docs/analytics/session-2-handoff.md` (полный текст: Research Brief + Alpha Research Package + Alpha Analytical Report + Alpha Strategy).
2. Генерирует промпт для сессии 3 (`$session-prompt-generator`).

---

### Сессия 3: Команда Критиков (Beta)

#### COND-03: Conductor (инициализация)
**Вход:** `docs/analytics/session-2-handoff.md`
**Действия:**
1. Парсинг handoff — загрузка Research Brief + полного отчёта Alpha.
2. Верификация целостности.
3. Объявить: «Сессия 3 — Команда Критиков (Beta)».
4. Назначить team mode: `Beta`.
5. Передать Alpha output как обязательный вход для Beta.
6. `$gates` → `$handoff` → RES-02.
**→ Ждать "Approved"**

#### RES-02: Researcher (Beta)
**Вход:** Research Brief + Alpha full output + `team: Beta`
**Действия:**
1. Независимое исследование тех же вопросов (свои источники).
2. **Обязательный** веб-поиск (`$web-research`) — поиск counter-evidence.
3. Анализ Alpha: выявление gaps, слабых источников, пропущенных данных.
4. `$gates` → `$handoff` → AN-02.
**Обязательные скилы:** `$web-research`, `$gates`, `$handoff`
**Deliverable:** Beta Research Package (independent findings + Alpha gaps + counter-evidence)
**→ Ждать "Approved"**

#### AN-02: Data Analyst (Beta)
**Вход:** Beta Research Package + Alpha Analytical Report
**Действия:**
1. Критика аналитических выводов Alpha (методология, фреймворки, интерпретации).
2. Применение фреймворков, которые Alpha пропустила (контр-фреймворки).
3. Альтернативная аналитика с другого ракурса.
4. `$gates` (dependency check: данные RES-02 + critique Alpha AN-01) → `$handoff` → ST-02.
**Обязательные скилы:** контр-фреймворки из каталога, `$gates`, `$handoff`
**Deliverable:** Beta Analytical Report (critique of Alpha + alternative analysis)
**→ Ждать "Approved"**

#### ST-02: Strategist (Beta)
**Вход:** Beta Research + Beta Analysis + Alpha Strategy
**Действия:**
1. Point-by-point критика стратегии Alpha с доказательствами.
2. Идентификация рисков, которые Alpha пропустила.
3. Формирование альтернативной стратегии.
4. `$gates` → `$handoff` → Conductor.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Beta Strategy Report (critique of Alpha + alternative strategy + risks + action plan)
**→ Ждать "Approved"**

#### Завершение сессии 3
Conductor:
1. Сохраняет `docs/analytics/session-3-handoff.md` (Research Brief + Alpha Report полностью + Beta Report полностью).
2. Генерирует промпт для сессии 4.

---

### Сессия 4: Медиация

#### COND-04: Conductor (инициализация)
**Вход:** `docs/analytics/session-3-handoff.md`
**Действия:**
1. Парсинг handoff — загрузка Research Brief + Alpha + Beta отчётов.
2. Верификация целостности.
3. Объявить: «Сессия 4 — Медиация».
4. Подтвердить метод оценки (определён на интервью).
5. `$gates` → `$handoff` → MED-01.
**→ Ждать "Approved"**

#### MED-01: Mediator
**Вход:** Research Brief + Alpha full report + Beta full report + evaluation method
**Действия:**
1. Сравнительный анализ Alpha vs Beta.
2. Применение выбранного метода оценки (скоринг / качественный / оба).
3. Формирование финального заключения и рекомендаций.
4. Предложение синтеза (Appendix D) — пользователь решает.
5. `$gates` → `$handoff` → Conductor.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Mediated Conclusion (comparative analysis + scoring + recommendation + action items)
**→ Ждать "Approved"**

#### MED-01 Synthesis (опциональный)
Если пользователь одобрил синтез:
1. Интеграция лучших элементов обеих команд.
2. Формирование синтезированной стратегии (Appendix D).
**Deliverable:** Synthesis Report
**→ Ждать "Approved"**

#### Завершение сессии 4
Conductor:
1. Сохраняет `docs/analytics/session-4-handoff.md` (Research Brief + Mediated Conclusion + Synthesis если есть).
2. Генерирует промпт для сессии 5.

---

### Сессия 5: Отчёт

#### COND-05: Conductor (инициализация)
**Вход:** `docs/analytics/session-4-handoff.md`
**Действия:**
1. Парсинг handoff — загрузка всех артефактов для отчёта.
2. Верификация целостности.
3. Объявить: «Сессия 5 — Подготовка отчёта».
4. `$gates` → `$handoff` → DS-01.
**→ Ждать "Approved"**

#### DS-01: Designer
**Вход:** Mediated Conclusion + Alpha Report + Beta Report + Research Brief
**Действия:**
1. Проектирование структуры отчёта (`$report-design`).
2. Выбор визуализаций для каждого блока данных (decision tree из `$report-design`).
3. Определение палитры и иерархии.
4. Написание executive summary.
5. `$gates` → `$handoff` → LY-01.
**Обязательные скилы:** `$report-design`, `$gates`, `$handoff`
**Deliverable:** Report Design Spec (structure + visualization map + palette + executive summary draft)
**→ Ждать "Approved"**

#### LY-01: Layouter
**Вход:** Report Design Spec + все данные для отчёта
**Действия:**
1. Генерация HTML-файла с inline CSS (`$html-pdf-report`).
2. Встраивание Chart.js графиков и Mermaid-диаграмм.
3. Вёрстка всех разделов + апендиксов A, B, C, D.
4. Протокол тестирования PDF (8 проверок из `$html-pdf-report`).
5. `$gates` → `$handoff` → Conductor.
**Обязательные скилы:** `$html-pdf-report`, `$gates`, `$handoff`
**Deliverable:** Self-contained HTML файл (→ Print-to-PDF)
**→ Ждать "Approved"**

#### RG-01: Release Gate
**Вход:** HTML-отчёт + все deliverables
**Проверка (чек-лист из `analytics-pipeline-rules.md`):**
- [ ] Все гейты всех сессий в [✓] на `$board`
- [ ] PDF-отчёт сгенерирован и визуально проверен
- [ ] Данные актуальны на дату публикации
- [ ] PDF содержит: Title Page, TOC, Executive Summary, Main Section, Appendix A-C (D optional)
- [ ] Все данные верифицированы (source URLs present)
- [ ] Executive summary отражает медиацию
- [ ] Визуализации корректны (Chart.js animation: false, Mermaid rendered)

**Решение:** GO ✅ / NO-GO ❌ / GO-with-conditions ⚠️
**→ Ждать "Approved"**

---

## Reverse Handoff — протокол возврата

### Типичные причины возврата

| Из гейта | Причина | Возврат к | Скил |
|----------|---------|-----------|------|
| AN-01/02 | Недостаточно данных | RES-01/02 | `$handoff` (Reverse) |
| ST-01/02 | Аналитика не покрывает вопрос | AN-01/02 | `$handoff` (Reverse) |
| MED-01 | Данные противоречат без объяснения | RES-01 или RES-02 | `$handoff` (Reverse) |
| DS-01 | Нет визуализируемых данных | MED-01 | `$handoff` (Reverse) |
| LY-01 | Дизайн-спек неполный | DS-01 | `$handoff` (Reverse) |

### Протокол
1. Агент формирует Reverse Handoff через `$handoff` (что исправить + что НЕ трогать).
2. Conductor маршрутизирует к нужному гейту.
3. `$board` обновляется: текущий → [↩], возвратный → [→].
4. После исправления — повторная `$gates` проверка.
5. Если возврат межсессионный — Conductor формирует новый handoff файл.

> Подробный протокол — в `$handoff` → «Обратный Handoff (Reverse)».

---

## Пример — пайплайн mid-flight (конец сессии 2)

```
📊 Прогресс: 40% (6/15) | Сессия: 2/5 | Ср. время/гейт: 10 мин | Блокеры: 0 | Возвраты: 0

| # | ID | Гейт | Сессия | Статус | Deliverable |
|---|----|------|:------:|:------:|-------------|
| 1 | COND-01 | Conductor | 1 | [✓] | Full Pipeline, scope: EdTech корп. обучение РФ |
| 2 | INT-01 | Interviewer | 1 | [✓] | Brief: 12 вопросов, scoring mode |
| 3 | COND-02 | Conductor (с.2) | 2 | [✓] | Контекст загружен, team Alpha |
| 4 | RES-01 | Researcher (α) | 2 | [✓] | 28 источников, Verified 62% 🟡 |
| 5 | AN-01 | Data Analyst (α) | 2 | [✓] | TAM/SAM/SOM + Competitive + PEST |
| 6 | ST-01 | Strategist (α) | 2 | [✓] | AI-first корп. обучение, 5 рекомендаций |
| 7 | COND-03 | Conductor (с.3) | 3 | [ ] | — |
| ... | ... | ... | ... | [ ] | — |
```

**Что далее:** Conductor сохраняет `session-2-handoff.md` с полным текстом Alpha Report (Research + Analysis + Strategy), генерирует промпт для сессии 3 (Team Beta: Критики).

---

## Каталог доступных фреймворков (для AN-01 / AN-02)

Data Analyst выбирает фреймворки по релевантности вопроса:

| Фреймворк | Скил | Когда использовать |
|-----------|------|-------------------|
| SWOT | `$swot-analysis` | Стратегическая позиция, S/W/O/T + перекрёстная матрица |
| TAM/SAM/SOM | `$tam-sam-som` | Размер рынка, потенциал выручки |
| Competitive Analysis | `$competitive-analysis` | Конкурентный ландшафт, threat score |
| PEST/PESTEL | `$pest-analysis` | Макросреда, внешние факторы |
| Porter's 5 Forces | `$porters-five-forces` | Привлекательность отрасли |
| BCG Matrix | `$bcg-matrix` | Портфельный анализ бизнес-единиц |
| Ansoff Matrix | `$ansoff-matrix` | Стратегия роста |
| Blue Ocean | `$blue-ocean-strategy` | Создание нового рыночного пространства |
| Value Chain | `$value-chain-analysis` | Цепочка ценности, make-or-buy |
| Cohort Analysis | `$cohort-analysis` | Retention, LTV по когортам |
| RFM Analysis | `$rfm-analysis` | Сегментация клиентов |
| Unit Economics | `$unit-economics` | CAC, LTV, payback, маржа |
| Trend Analysis | `$trend-analysis` | Рыночные тренды, timing |
| Customer Journey | `$customer-journey-mapping` | Путь клиента, точки оттока |
| ICP / Buyer Persona | `$icp-buyer-persona` | Целевая аудитория, персоны |
| JTBD | `$jtbd-analysis` | Задачи клиента, opportunity score |

**Правило:** минимум 2 фреймворка для Full Pipeline (AN-01 и AN-02 должны использовать разные).

---

## Шаблон промпта для начала

```
Мне нужно провести глубокий анализ: [описание вопроса].

Контекст:
- Отрасль: [отрасль]
- Имеющиеся данные: [что есть]
- Цель: [для чего нужен анализ]
- Дедлайн: [если есть]

Запусти /analyze.
```
