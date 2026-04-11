---
name: quick-insight
description: Быстрый аналитический пайплайн — 1 сессия, одна команда, медиация качества, PDF-отчёт
---

# Воркфлоу: /quick-insight — Быстрый аналитический пайплайн (1 сессия)

## Описание
Упрощённый аналитический пайплайн в одной сессии. Одна команда Аналитиков (без Критиков), Медиатор верифицирует логическую цепочку, верстальщики готовят PDF-отчёт. Подходит для простых вопросов и быстрых проверок.

> **Правила пайплайна:** Этот воркфлоу подчиняется `analytics-pipeline-rules.md` — все 7 правил, mechanical blocks и протокол эскалации применяются полностью, как и в /analyze.

## Когда использовать

| Критерий | /quick-insight (Quick) | /analyze (Full) |
|----------|:----------------------:|:---------------:|
| Сложность вопроса | Низкая: один фреймворк, quick check | Высокая: многофакторный, стратегический |
| Ставки | Низкие: внутренний отчёт, exploration | Высокие: инвестиции, выход на рынок |
| Devil's advocate нужен? | Нет | Да |
| PDF-отчёт | Да (упрощённый) | Да (полный с Appendix A-D) |
| Бюджет времени | 1 сессия (30-60 мин) | 5 сессий (2-4 часа) |
| Предварительная проверка | ✅ Гипотеза перед полным /analyze | |

## Когда НЕ использовать
- Сложный стратегический вопрос с высокими ставками → `/analyze`.
- Нужна проверка аргументов второй командой → `/analyze`.
- Решение влияет на критические бизнес-процессы → `/analyze`.
- При сомнении → `/analyze` (лучше перестраховаться).

> Full Pipeline описан в `analyze.md`.

## Вход воркфлоу

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Вопрос / тема | ✅ | Что нужно проанализировать |
| Данные пользователя | ⬚ | Имеющиеся данные, метрики |
| Отрасль / рынок | ⬚ | Если известно |

---

## Пайплайн (1 сессия)

```
COND-01 → INT-01 → RES-01 → AN-01 → ST-01 → MED-01 → DS-01 → LY-01
```

Все 8 гейтов — в одной сессии. Межсессионный handoff не нужен.

### Параллелизм

| Гейты | Параллельно? | Причина |
|-------|:------------:|---------|
| COND-01 → LY-01 | ❌ Строго последовательно | Каждый зависит от предыдущего |

---

## Гейты и deliverables

### COND-01: Conductor
**Вход:** Задача пользователя
**Действия:**
1. Определить scope и подтвердить режим `/quick-insight` (или переключить на `/analyze`).
2. Инициализировать доску (`$board` — Quick Pipeline, 8 гейтов).
3. Сформулировать задачу для Interviewer.
4. `$gates` → `$handoff` → INT-01.
**Обязательные скилы:** `$board`, `$gates`, `$handoff`
**Deliverable:** Board (Quick Pipeline) + Handoff Envelope → INT-01
**→ Ждать "Approved"**

### INT-01: Interviewer
**Вход:** `$handoff` от COND-01
**Действия:**
1. Краткое адаптивное интервью (3-5 вопросов, фокус на scope и цель).
2. Определить: вопрос, отрасль, данные, цель, метод оценки Медиатора.
3. Сформировать Research Brief (компактный).
4. `$gates` → `$handoff` → RES-01.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Research Brief (scope, ключевые вопросы, источники данных, метод оценки)
**→ Ждать "Approved"**

### RES-01: Researcher
**Вход:** Research Brief
**Действия:**
1. Сбор фактов и данных по ключевым вопросам Research Brief.
2. **Обязательный** веб-поиск (`$web-research`) — верификация + дополнение.
3. Формирование Research Package (факты + источники + Tier + достоверность).
4. `$gates` → `$handoff` → AN-01.
**Обязательные скилы:** `$web-research`, `$gates`, `$handoff`
**Deliverable:** Research Package (данные с URL, датами, уровнем достоверности ✅/⚠️/🔮)
**→ Ждать "Approved"**

### AN-01: Data Analyst
**Вход:** Research Package + Research Brief
**Действия:**
1. Выбор 1-3 релевантных фреймворков (из каталога ниже).
2. Применение фреймворков к собранным данным.
3. Структурирование результатов, выявление паттернов.
4. `$gates` (dependency check: данные RES-01 процитированы) → `$handoff` → ST-01.
**Обязательные скилы:** выбранные фреймворки, `$gates`, `$handoff`
**Deliverable:** Analytical Report (compact: фреймворки + паттерны + инсайты)
**→ Ждать "Approved"**

### ST-01: Strategist
**Вход:** Research Package + Analytical Report
**Действия:**
1. Синтез данных и аналитики в стратегические рекомендации.
2. Краткая оценка рисков.
3. Action plan (top-3 приоритета с метриками).
4. `$gates` (dependency check: evidence из AN-01 и RES-01) → `$handoff` → MED-01.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Strategy Report (compact: рекомендации + risks + action plan)
**→ Ждать "Approved"**

### MED-01: Mediator
**Вход:** Research Brief + Research Package + Analytical Report + Strategy Report
**Действия:**
1. Верификация логической цепочки по чек-листу:

   | # | Проверка | Результат |
   |---|----------|:---------:|
   | 1 | Данные Research → подтверждены через `$web-research`? | ✅ / ⚠️ / ❌ |
   | 2 | Выводы Analyst → основаны на данных Research (не на допущениях)? | ✅ / ⚠️ / ❌ |
   | 3 | Стратегия Strategist → следует из аналитики (не оторвана)? | ✅ / ⚠️ / ❌ |
   | 4 | Фреймворки применены корректно (Quality Gate каждого пройден)? | ✅ / ⚠️ / ❌ |
   | 5 | Рекомендации actionable (действие + метрика + срок)? | ✅ / ⚠️ / ❌ |
   | 6 | Риски идентифицированы и адресованы? | ✅ / ⚠️ / ❌ |
   | 7 | Нет логических противоречий между секциями? | ✅ / ⚠️ / ❌ |

2. Формирование заключения:
   - Общая оценка качества анализа.
   - Ключевые findings (3-5).
   - Итоговая рекомендация.
   - Оговорки и ограничения (что не покрыто из-за Quick-режима).
3. `$gates` → `$handoff` → DS-01.
**Обязательные скилы:** `$gates`, `$handoff`
**Deliverable:** Quick Conclusion (верификация цепочки + findings + рекомендации + ограничения)
**→ Ждать "Approved"**

### DS-01: Designer
**Вход:** Quick Conclusion + Research Package + Analytical Report + Strategy Report
**Действия:**
1. Проектирование упрощённого отчёта (`$report-design`).
2. Выбор визуализаций (decision tree из `$report-design`).
3. Определение палитры и иерархии.
4. Executive summary.
5. `$gates` → `$handoff` → LY-01.
**Обязательные скилы:** `$report-design`, `$gates`, `$handoff`
**Deliverable:** Report Design Spec (compact: structure + visualization map + palette + executive summary)
**→ Ждать "Approved"**

### LY-01: Layouter
**Вход:** Report Design Spec + все данные для отчёта
**Действия:**
1. HTML-файл с inline CSS (`$html-pdf-report`).
2. Chart.js графики и Mermaid-диаграммы.
3. Упрощённая структура (без Appendix B — нет Критиков, без Appendix D — нет Synthesis).
4. Протокол тестирования PDF (8 проверок из `$html-pdf-report`).
5. `$gates` → Release Gate check:
   - [ ] Все гейты [✓] на `$board`
   - [ ] PDF содержит: Title, TOC, Executive Summary, Main Section, Appendix A (Analytics), Appendix B (Mediator reasoning)
   - [ ] Данные верифицированы (source URLs present)
   - [ ] Визуализации корректны (animation: false, Mermaid rendered)

**Решение:** GO ✅ / NO-GO ❌ / GO-with-conditions ⚠️
**Обязательные скилы:** `$html-pdf-report`, `$gates`, `$handoff`
**Deliverable:** Self-contained HTML файл (→ Print-to-PDF)
**→ Ждать "Approved"**

---

## Reverse Handoff — протокол возврата

| Из гейта | Причина | Возврат к | Действие |
|----------|---------|-----------|----------|
| AN-01 | Недостаточно данных для фреймворка | RES-01 | Доисследовать конкретные вопросы |
| ST-01 | Аналитика не покрывает scope | AN-01 | Добавить фреймворк или расширить |
| MED-01 | Логическая цепочка разорвана | RES-01 или AN-01 | Зависит от того, где разрыв |
| DS-01 | Нет визуализируемых данных | MED-01 | Уточнить findings |
| LY-01 | Дизайн-спек неполный | DS-01 | Доработать спек |

### Протокол
1. Агент формирует Reverse Handoff через `$handoff` (что исправить + что НЕ трогать).
2. `$board` обновляется: текущий → [↩], возвратный → [→].
3. После исправления — повторная `$gates` проверка.

> В Quick Pipeline — все возвраты внутри одной сессии (контекст сохранён).

---

## Структура Quick PDF-отчёта

```
Титульная страница
Оглавление
Executive Summary
Основной раздел (Заключение Медиатора)
  ├─ Ключевые выводы (3-5 findings)
  ├─ Визуализации
  ├─ Рекомендации + Action Plan
  └─ Ограничения Quick-режима
Апендикс А — Отчёт команды Аналитиков (Research + Analysis + Strategy)
Апендикс Б — Верификация Медиатора (чек-лист + reasoning)
Апендикс В — Источники (URL, даты, достоверность)
```

> Отсутствуют: Appendix Критиков (нет Team Beta) и Synthesis (нет конкурирующих команд).

---

## Каталог доступных фреймворков (для AN-01)

| Фреймворк | Скил | Когда использовать |
|-----------|------|-------------------|
| SWOT | `$swot-analysis` | Стратегическая позиция |
| TAM/SAM/SOM | `$tam-sam-som` | Размер рынка |
| Competitive Analysis | `$competitive-analysis` | Конкурентный ландшафт |
| PEST/PESTEL | `$pest-analysis` | Макросреда |
| Porter's 5 Forces | `$porters-five-forces` | Привлекательность отрасли |
| BCG Matrix | `$bcg-matrix` | Портфельный анализ |
| Ansoff Matrix | `$ansoff-matrix` | Стратегия роста |
| Blue Ocean | `$blue-ocean-strategy` | Новое рыночное пространство |
| Value Chain | `$value-chain-analysis` | Цепочка ценности |
| Cohort Analysis | `$cohort-analysis` | Retention по когортам |
| RFM Analysis | `$rfm-analysis` | Сегментация клиентов |
| Unit Economics | `$unit-economics` | CAC, LTV, маржа |
| Trend Analysis | `$trend-analysis` | Рыночные тренды |
| Customer Journey | `$customer-journey-mapping` | Путь клиента |
| ICP / Buyer Persona | `$icp-buyer-persona` | Целевая аудитория |
| JTBD | `$jtbd-analysis` | Задачи клиента |

**Правило Quick Pipeline:** 1-3 фреймворка (vs минимум 2 в Full Pipeline).

---

## Пример — Quick Pipeline mid-flight (AN-01 в работе)

```
📊 Прогресс: 38% (3/8) | Ср. время/гейт: 6 мин | Блокеры: 0 | Возвраты: 0

| # | ID | Гейт | Статус | Deliverable |
|---|----|------|:------:|-------------|
| 1 | COND-01 | Conductor | [✓] | Quick Pipeline, scope: Unit Economics стартапа |
| 2 | INT-01 | Interviewer | [✓] | Brief: 5 вопросов, SaaS B2B, $500K ARR |
| 3 | RES-01 | Researcher | [✓] | 18 источников, Verified 68% 🟡 |
| 4 | AN-01 | Data Analyst | [→] | В работе: unit-economics + competitive-analysis |
| 5 | ST-01 | Strategist | [ ] | — |
| 6 | MED-01 | Mediator | [ ] | — |
| 7 | DS-01 | Designer | [ ] | — |
| 8 | LY-01 | Layouter + RG | [ ] | — |
```

---

## Отличия Quick от Full Pipeline

| Аспект | Quick (`/quick-insight`) | Full (`/analyze`) |
|--------|:-----------------------:|:-----------------:|
| Сессий | 1 | 5 |
| Гейтов | 8 | 15 |
| Команд | 1 (Alpha only) | 2 (Alpha + Beta) |
| Межсессионный handoff | Нет | Да (session-N-handoff.md) |
| Фреймворков | 1-3 | Минимум 2 per team |
| Медиатор | Верификация цепочки | Сравнительный анализ Alpha vs Beta |
| PDF Appendices | A (Analytics) + B (Mediator) + C (Sources) | A (Alpha) + B (Beta) + C (Mediator) + D (Synthesis opt.) |
| `$session-prompt-generator` | Не нужен | Обязателен |
| Escalation при scope creep | → Переключиться на /analyze | — |

> **Scope creep rule:** Если в процессе Quick Pipeline выясняется, что вопрос сложнее, чем казалось (нужен devil's advocate, слишком много фреймворков, высокие ставки) — Conductor эскалирует пользователю: «Рекомендую переключиться на /analyze». Решение — за пользователем.

---

## Шаблон промпта для начала

```
Быстрый вопрос: [описание вопроса].

Данные: [если есть]
Отрасль: [если релевантно]

Запусти /quick-insight.
```
