# Воркфлоу: /analyze — Полный аналитический пайплайн (5 сессий)

## Описание
Полный аналитический пайплайн с состязательным подходом. Две конкурирующие команды (Аналитики и Критики) независимо исследуют вопрос, Медиатор оценивает результаты, верстальщики готовят PDF-отчёт. Разбит на 5 сессий для управления контекстным окном.

## Когда использовать
- Сложный стратегический вопрос с высокими ставками.
- Нужен devil's advocate — проверка аргументов второй командой.
- Требуется PDF-отчёт с визуализациями для презентации.
- Решение влияет на бизнес-стратегию, инвестиции, выход на рынок.

## Когда НЕ использовать
- Простой аналитический вопрос → `/quick-insight`.
- Нужен быстрый ответ без PDF → `/quick-insight`.
- При сомнении → **использовать** `/analyze` (лучше перестраховаться).

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
│ CONDUCTOR → INTERVIEWER         │ → session-1-handoff.md
└─────────────────────────────────┘

┌─────────── Сессия 2 ───────────┐
│ CONDUCTOR → RESEARCHER(α)      │
│          → DATA_ANALYST(α)     │
│          → STRATEGIST(α)       │ → session-2-handoff.md
└─────────────────────────────────┘

┌─────────── Сессия 3 ───────────┐
│ CONDUCTOR → RESEARCHER(β)      │
│          → DATA_ANALYST(β)     │
│          → STRATEGIST(β)       │ → session-3-handoff.md
└─────────────────────────────────┘

┌─────────── Сессия 4 ───────────┐
│ CONDUCTOR → MEDIATOR            │ → session-4-handoff.md
│ (opt. 4.5: MEDIATOR Synthesis)  │
└─────────────────────────────────┘

┌─────────── Сессия 5 ───────────┐
│ CONDUCTOR → DESIGNER → LAYOUTER │ → PDF report
│          → RELEASE GATE         │
└─────────────────────────────────┘
```

### Параллелизм

| Сессии | Параллельно? | Причина |
|--------|:------------:|---------|
| Сессии 1-5 | ❌ Строго последовательно | Каждая зависит от handoff предыдущей |
| Внутри сессии: гейты | ❌ Последовательно | Researcher → Data Analyst → Strategist |
| Сессия 5: Designer → Layouter | ❌ Последовательно | Layouter реализует дизайн-спек |

---

## Гейты и deliverables по сессиям

### Сессия 1: Интервью

#### Gate 1.1: Conductor
**Вход:** Задача пользователя
**Действия:**
1. Определить scope и сложность вопроса.
2. Подтвердить режим `/analyze` (или переключить на `/quick-insight`).
3. Инициализировать доску (`$board` — Full Pipeline).
4. Сформулировать задачу для Interviewer.
5. `$handoff` → Interviewer.
**Обязательные скилы:** `$board`, `$handoff`
**Deliverable:** Board + Handoff Envelope → Interviewer
**→ Ждать "Approved"**

#### Gate 1.2: Interviewer
**Вход:** `$handoff` от Conductor
**Действия:**
1. Адаптивное интервью — задавать вопросы до достаточного контекста.
2. Определить: вопрос, отрасль, данные, цель, timeline, метод оценки Медиатора.
3. Сформировать Research Brief.
4. `$handoff` → Conductor (для формирования межсессионного handoff).
**Обязательные скилы:** `$handoff`
**Deliverable:** Research Brief (scope, ограничения, ключевые вопросы, источники данных, метод оценки)
**→ Ждать "Approved"**

#### Завершение сессии 1
Conductor:
1. Сохраняет `docs/analytics/session-1-handoff.md` (полный текст Research Brief).
2. Генерирует промпт для сессии 2 (`$session-prompt-generator`).
3. Показывает промпт пользователю.

---

### Сессия 2: Команда Аналитиков (Alpha)

#### Gate 2.0: Conductor (инициализация)
**Вход:** `docs/analytics/session-1-handoff.md` (пользователь вставляет handoff)
**Действия:**
1. Парсинг handoff файла — восстановление контекста.
2. Загрузка Research Brief.
3. Объявить: «Сессия 2 — Команда Аналитиков (Alpha)».
4. Назначить team mode: `Alpha`.
5. `$handoff` → Researcher (Alpha).
**→ Ждать "Approved"**

#### Gate 2.1: Researcher (Alpha)
**Вход:** Research Brief + `team: Alpha`
**Действия:**
1. Сбор фактов и данных по ключевым вопросам.
2. **Обязательный** веб-поиск (`$web-research`) — верификация + дополнение.
3. Формирование Research Package (факты + источники + confidence).
4. `$handoff` → Data Analyst (Alpha).
**Обязательные скилы:** `$web-research`
**Опциональные:** `$trend-analysis`, `$competitive-analysis`
**Deliverable:** Research Package (Alpha)
**→ Ждать "Approved"**

#### Gate 2.2: Data Analyst (Alpha)
**Вход:** Research Package (Alpha) + Research Brief
**Действия:**
1. Выбор релевантных фреймворков (2-5 из 17 доступных).
2. Применение фреймворков к собранным данным.
3. Структурирование результатов, выявление паттернов.
4. `$handoff` → Strategist (Alpha).
**Обязательные скилы:** выбранные фреймворки (например `$swot-analysis`, `$tam-sam-som`)
**Deliverable:** Analytical Report (Alpha)
**→ Ждать "Approved"**

#### Gate 2.3: Strategist (Alpha)
**Вход:** Research Package + Analytical Report (Alpha)
**Действия:**
1. Синтез данных и аналитики в стратегию.
2. Формирование рекомендаций с привязкой к доказательствам.
3. Оценка рисков + план действий.
4. `$handoff` → Conductor.
**Deliverable:** Alpha Strategy Report (executive summary + insights + strategy + risks + action plan + KPIs)
**→ Ждать "Approved"**

#### Завершение сессии 2
Conductor:
1. Сохраняет `docs/analytics/session-2-handoff.md` (полный текст: Research Brief + Alpha Research Package + Alpha Analytical Report + Alpha Strategy).
2. Генерирует промпт для сессии 3 (`$session-prompt-generator`).

---

### Сессия 3: Команда Критиков (Beta)

#### Gate 3.0: Conductor (инициализация)
**Вход:** `docs/analytics/session-2-handoff.md`
**Действия:**
1. Парсинг handoff — загрузка Research Brief + полного отчёта Alpha.
2. Объявить: «Сессия 3 — Команда Критиков (Beta)».
3. Назначить team mode: `Beta`.
4. Передать Alpha output как обязательный вход для Beta.
5. `$handoff` → Researcher (Beta).
**→ Ждать "Approved"**

#### Gate 3.1: Researcher (Beta)
**Вход:** Research Brief + Alpha full output + `team: Beta`
**Действия:**
1. Независимое исследование тех же вопросов (свои источники).
2. **Обязательный** веб-поиск (`$web-research`) — поиск counter-evidence.
3. Анализ Alpha: выявление gaps, слабых источников, пропущенных данных.
4. `$handoff` → Data Analyst (Beta).
**Обязательные скилы:** `$web-research`
**Deliverable:** Beta Research Package (independent findings + Alpha gaps + counter-evidence)
**→ Ждать "Approved"**

#### Gate 3.2: Data Analyst (Beta)
**Вход:** Beta Research Package + Alpha Analytical Report
**Действия:**
1. Критика аналитических выводов Alpha (методология, фреймворки, интерпретации).
2. Применение фреймворков, которые Alpha пропустила.
3. Альтернативная аналитика с другого ракурса.
4. `$handoff` → Strategist (Beta).
**Deliverable:** Beta Analytical Report (critique + alternative analysis)
**→ Ждать "Approved"**

#### Gate 3.3: Strategist (Beta)
**Вход:** Beta Research + Beta Analysis + Alpha Strategy
**Действия:**
1. Point-by-point критика стратегии Alpha с доказательствами.
2. Идентификация рисков, которые Alpha пропустила.
3. Формирование альтернативной стратегии.
4. `$handoff` → Conductor.
**Deliverable:** Beta Strategy Report (critique of Alpha + alternative strategy + risks + action plan)
**→ Ждать "Approved"**

#### Завершение сессии 3
Conductor:
1. Сохраняет `docs/analytics/session-3-handoff.md` (Research Brief + Alpha Report полностью + Beta Report полностью).
2. Генерирует промпт для сессии 4.

---

### Сессия 4: Медиация

#### Gate 4.0: Conductor (инициализация)
**Вход:** `docs/analytics/session-3-handoff.md`
**Действия:**
1. Парсинг handoff — загрузка Research Brief + Alpha + Beta отчётов.
2. Объявить: «Сессия 4 — Медиация».
3. Подтвердить метод оценки (определён на интервью).
4. `$handoff` → Mediator.
**→ Ждать "Approved"**

#### Gate 4.1: Mediator
**Вход:** Research Brief + Alpha full report + Beta full report + evaluation method
**Действия:**
1. Сравнительный анализ Alpha vs Beta.
2. Применение выбранного метода оценки (скоринг / качественный / оба).
3. Формирование финального заключения и рекомендаций.
4. Предложение синтеза (Appendix D) — пользователь решает.
5. `$handoff` → Conductor.
**Deliverable:** Mediated Conclusion (comparative analysis + scoring + recommendation + action items)
**→ Ждать "Approved"**

#### Gate 4.5 (опциональный): Mediator — Synthesis
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

#### Gate 5.0: Conductor (инициализация)
**Вход:** `docs/analytics/session-4-handoff.md`
**Действия:**
1. Парсинг handoff — загрузка всех артефактов для отчёта.
2. Объявить: «Сессия 5 — Подготовка отчёта».
3. `$handoff` → Designer.
**→ Ждать "Approved"**

#### Gate 5.1: Designer
**Вход:** Mediated Conclusion + Alpha Report + Beta Report + Research Brief
**Действия:**
1. Проектирование структуры отчёта (`$report-design`).
2. Выбор визуализаций для каждого блока данных.
3. Определение палитры и иерархии.
4. Написание executive summary.
5. `$handoff` → Layouter.
**Обязательные скилы:** `$report-design`
**Deliverable:** Report Design Spec + Executive Summary
**→ Ждать "Approved"**

#### Gate 5.2: Layouter
**Вход:** Report Design Spec + все данные для отчёта
**Действия:**
1. Генерация HTML-файла с inline CSS (`$html-pdf-report`).
2. Встраивание Chart.js графиков и Mermaid-диаграмм.
3. Вёрстка всех разделов + апендиксов A, B, C, D.
4. Проверка print-ready форматирования.
5. `$handoff` → Conductor.
**Обязательные скилы:** `$html-pdf-report`
**Deliverable:** Self-contained HTML файл (→ Print-to-PDF)
**→ Ждать "Approved"**

#### Gate 5.3: Release Gate
**Вход:** HTML-отчёт + все deliverables
**Проверка:**
- [ ] Все сессии завершены
- [ ] Все гейты в статусе `[✓]`
- [ ] PDF содержит: Title Page, TOC, Main Section, Appendix A-C (D optional)
- [ ] Все данные верифицированы (source URLs present)
- [ ] Executive summary отражает медиацию
- [ ] Визуализации корректны

**Решение:** GO ✅ / NO-GO ❌ / GO-with-conditions ⚠️

---

## Reverse Handoff — протокол возврата

### Типичные причины возврата

| Из гейта | Причина | Возврат к |
|----------|---------|-----------|
| Data Analyst | Недостаточно данных | Researcher |
| Strategist | Аналитика не покрывает вопрос | Data Analyst |
| Mediator | Данные противоречат без объяснения | Researcher (Alpha или Beta) |
| Designer | Нет визуализируемых данных | Mediator |
| Layouter | Дизайн-спек неполный | Designer |

### Протокол
1. Агент формирует Reverse Handoff с описанием проблемы.
2. Conductor маршрутизирует к нужному гейту.
3. После исправления — повторная `$gates` проверка.
4. Если возврат межсессионный — Conductor формирует новый handoff файл.

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
