---
name: analytics-pipeline-rules
description: Абсолютные правила аналитического пайплайна — гейты, дисциплина, межсессионный протокол
---

# Правила аналитического пайплайна

> [!CAUTION]
> **🔴 АБСОЛЮТНОЕ ПРАВИЛО №1:** Пайплайн запрещено пропускать. Без исключений.
> Каждый гейт → читать агента → deliverable → `$gates` PASS → `$handoff` → **User sign-off** → следующий гейт.

---

## Три режима пайплайна

### 🔵 Full Pipeline (`/analyze`) — 5 сессий
Полный аналитический цикл с двумя конкурирующими командами, медиацией и PDF-отчётом.

```
Сессия 1: CONDUCTOR → INTERVIEWER
Сессия 2: CONDUCTOR → АНАЛИТИКИ (RESEARCHER → DATA_ANALYST → STRATEGIST)
Сессия 3: CONDUCTOR → КРИТИКИ   (RESEARCHER → DATA_ANALYST → STRATEGIST)
Сессия 4: CONDUCTOR → MEDIATOR
Сессия 5: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE GATE
```

### 🟢 Quick Pipeline (`/quick-insight`) — 1 сессия
Одна команда, без критиков. Для простых вопросов, когда состязательный анализ избыточен.

```
CONDUCTOR → INTERVIEWER → RESEARCHER → DATA_ANALYST → STRATEGIST → MEDIATOR → DESIGNER → LAYOUTER → RELEASE GATE
```

---

## Decision Tree — выбор режима

```
Задача пользователя
       │
       ├── Сложный стратегический вопрос? Высокие ставки? Нужен devil's advocate?
       │   └── ДА → /analyze (Full Pipeline, 5 сессий)
       │
       ├── Простой аналитический вопрос? Один фреймворк? Quick check?
       │   └── ДА → /quick-insight (Quick Pipeline, 1 сессия)
       │
       ├── Пользователь явно указал режим?
       │   └── Использовать указанный
       │
       └── Сомнение?
           └── /analyze (лучше перестраховаться)
```

---

## Обязательная дисциплина (MANDATORY ENFORCEMENT)

### Правило 1: Гейты нельзя пропускать
- Порядок гейтов определён воркфлоу режима.
- Каждый гейт требует: deliverable + `$gates` PASS + `$handoff` + user sign-off.
- Пропуск гейта → 🔴 **P0 / BLOCKER**.

**Применяющие скилы:** `$gates` (проверка готовности), `$board` (отслеживание статусов), `$handoff` (передача контекста).

### Правило 2: User sign-off на каждом гейте
- Переход к следующему гейту — **только** после явного "Approved" от пользователя.
- При sign-off пользователь **верифицирует**, что AI правильно загрузил агента и его скиллы.
- `ShouldAutoProceed = false` ВСЕГДА.

**Применяющие скилы:** `$gates` (запрашивает Approved), `$handoff` (ожидает Approved перед передачей).

### Правило 3: Агентский протокол — пошагово
- Каждый § (параграф) в `agents/<role>.md` — отдельное действие.
- Нельзя «сворачивать» несколько шагов в один.
- Перед написанием deliverable — пройти ВСЕ шаги протокола.

### Правило 4: Веб-поиск обязателен
- Исследователь **обязан** использовать `$web-research` при каждом запуске.
- Данные пользователя **обязательно** верифицируются через внешние источники.
- Без веб-поиска deliverable считается **INCOMPLETE**.

**Применяющий скил:** `$web-research` (протокол поиска), `$gates` (RES-xx без web-research = автоматический Blocker).

### Правило 5: Team Mode строго определён
- Conductor определяет team mode (Alpha/Beta) в Handoff Envelope.
- Исследователь, Аналитик и Стратег обязаны следовать назначенному режиму.
- Критики (Beta) **обязаны** получить полный отчёт Аналитиков (Alpha) как вход.

**Применяющие скилы:** `$handoff` (team mode в конверте), `$gates` (team mode check).

### Правило 6: Межсессионный протокол
- В Full Pipeline каждая сессия завершается сохранением `docs/analytics/session-N-handoff.md`.
- Файл handoff содержит **полный текст артефактов** (не ссылки — следующая сессия не имеет контекста).
- Генерируется готовый промпт для следующей сессии (`$session-prompt-generator`).
- Без handoff файла сессия считается **INCOMPLETE**.

**Применяющие скилы:** `$handoff` (Session тип, полный текст), `$session-prompt-generator` (промпт), `$board` (сохранение состояния).

### Правило 7: Медиатор — беспристрастность
- Медиатор оценивает качество аргументов и доказательной базы, **не объём текста**.
- Режим оценки (скоринг/качественный/синтез) определяется на интервью.
- Синтез (Appendix D) — только по предложению Медиатора и одобрению пользователя.

---

## Маппинг «Правило → Скил → Проверка»

| Правило | Скилы | Что проверяется | При нарушении |
|---------|-------|-----------------|---------------|
| 1. Гейты нельзя пропускать | `$gates`, `$board`, `$handoff` | Статусы на доске идут подряд, нет пропусков | 🔴 P0 Blocker |
| 2. User sign-off | `$gates`, `$handoff` | Явное "Approved" перед каждым переходом | 🔴 P0 Blocker |
| 3. Агентский протокол | `$gates` (dependency check) | Все шаги протокола агента выполнены | 🔴 P0 Blocker |
| 4. Веб-поиск обязателен | `$web-research`, `$gates` (RES-xx) | WebSearch/WebFetch выполнены, аудит-трейл заполнен | 🔴 P0 Blocker |
| 5. Team mode | `$handoff`, `$gates` (team mode check) | Агент работает в назначенном режиме Alpha/Beta | 🟠 P1 Important |
| 6. Межсессионный протокол | `$handoff` (Session), `$session-prompt-generator` | Файл сохранён, промпт сгенерирован, артефакты полным текстом | 🔴 P0 Blocker |
| 7. Беспристрастность Медиатора | `$gates` (MED-xx) | Scoring/qualitative по критериям, не по объёму | 🟠 P1 Important |

---

## Mechanical Blocks (принудительные проверки)

| # | Блок | Когда | Что проверяет | При провале |
|---|------|-------|---------------|-------------|
| 1 | **Pre-flight check** | Перед записью deliverable | Процитировать последний "Approved" пользователя | Остановиться, запросить Approved |
| 2 | **Skill read check** | Перед применением скилла | Прочитать SKILL.md через `view_file` | Прочитать, затем применять |
| 3 | **Data verification check** | Каждый факт в deliverable | Source URL + date + confidence (✅/⚠️/🔮) | Пометить как 🔮 Assumed или удалить |
| 4 | **Handoff file check** | Перед закрытием сессии (Full) | `docs/analytics/session-N-handoff.md` сохранён, самодостаточен | Не закрывать сессию, сохранить файл |
| 5 | **Team mode check** | Conductor при каждом handoff | Агент работает в назначенном team mode | Вернуть и переназначить |

---

## Протокол эскалации

### При отсутствии user sign-off
1. Показать deliverable и запросить "Approved".
2. Если нет ответа — **ожидать**. Не переходить к следующему гейту.
3. Напомнить: «Ожидаю "Approved" для перехода к [следующий гейт]».
4. **Никогда** не auto-proceed. `ShouldAutoProceed = false` ВСЕГДА.

### При повторных FAIL на `$gates`
| Итерация | Действие |
|:--------:|----------|
| 1-й FAIL | Стандартный возврат: список gap'ов → агент дорабатывает |
| 2-й FAIL | Расширенный возврат + конкретные инструкции «как исправить» |
| 3+ FAIL | **Эскалация пользователю** через протокол `$gates` (варианты: пересмотр scope / возврат на предыдущий гейт / принудительный CONDITIONAL PASS) |

> Подробный протокол эскалации — в `$gates` → «Протокол эскалации при повторных FAIL».

### При обнаружении проблемы на последующем гейте (Reverse Handoff)
1. Агент формирует Reverse Handoff с описанием проблемы через `$handoff`.
2. Conductor маршрутизирует возврат к нужному гейту.
3. Доска (`$board`) обновляется: текущий гейт → `[↩]`, возвратный → `[→]`.
4. После исправления — повторная проверка через `$gates`.

> Подробный протокол reverse handoff — в `$handoff` → «Обратный Handoff (Reverse)».

---

## Метрики здоровья пайплайна

`$board` рассчитывает и отображает при каждом обновлении:

| Метрика | Формула | Здоровый | Проблемный |
|---------|---------|:--------:|:----------:|
| Прогресс (%) | Завершённые / Всего × 100 | Растёт | Стагнирует |
| Ср. время/гейт | Σ время / завершённые | ≤ 15 мин | > 30 мин |
| Блокеры (total) | Кол-во [!] за всё время | 0-1 | ≥ 3 |
| Возвраты (total) | Кол-во [↩] за всё время | 0-1 | ≥ 3 |
| FAIL rate | FAILs / gate checks × 100 | < 20% | > 40% |

**При FAIL rate > 40%:** Conductor эскалирует пользователю — возможно, scope слишком широкий или данные недостаточны.

> Подробные метрики — в `$board` → «Метрики прогресса».

---

## Формат приоритетов

| Приоритет | Описание | Действие |
|:---------:|----------|----------|
| 🔴 **P0 / BLOCKER** | Блокирует прогресс / публикацию отчёта | Немедленно: fix или эскалация |
| 🟠 **P1 / IMPORTANT** | Важно исправить до финализации | До Release Gate |
| 🟡 **P2 / NICE-TO-HAVE** | Можно включить в следующую итерацию | Backlog |

---

## Артефакты пайплайна

### Full Pipeline

| Сессия | Артефакт | Формат | Кто создаёт | Скил |
|:------:|----------|--------|-------------|------|
| 1 | Interview Brief | Markdown | Interviewer | — |
| 1 | Session 1 Handoff | `docs/analytics/session-1-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 2 | Alpha Research Package | Markdown (в handoff) | Researcher (Alpha) | `$web-research` |
| 2 | Alpha Analytical Report | Markdown (в handoff) | Data Analyst (Alpha) | Фреймворк-скилы |
| 2 | Alpha Strategy | Markdown (в handoff) | Strategist (Alpha) | — |
| 2 | Session 2 Handoff | `docs/analytics/session-2-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 3 | Beta Research Package | Markdown | Researcher (Beta) | `$web-research` |
| 3 | Beta Analytical Report | Markdown | Data Analyst (Beta) | Фреймворк-скилы (контр) |
| 3 | Beta Strategy + Critique | Markdown | Strategist (Beta) | — |
| 3 | Session 3 Handoff | `docs/analytics/session-3-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 4 | Mediated Conclusion | Markdown | Mediator | — |
| 4 | Synthesis (optional) | Markdown | Mediator | — |
| 4 | Session 4 Handoff | `docs/analytics/session-4-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 5 | Report Design Spec | Markdown | Designer | `$report-design` |
| 5 | Final HTML Report | HTML → PDF | Layouter | `$html-pdf-report` |

### Quick Pipeline

| Артефакт | Формат | Кто создаёт | Скил |
|----------|--------|-------------|------|
| Interview Brief | Markdown | Interviewer | — |
| Research Package | Markdown | Researcher | `$web-research` |
| Analytical Report | Markdown | Data Analyst | Фреймворк-скилы |
| Strategy | Markdown | Strategist | — |
| Conclusion | Markdown | Mediator | — |
| Report Design Spec | Markdown | Designer | `$report-design` |
| Final HTML Report | HTML → PDF | Layouter | `$html-pdf-report` |

---

## Пример — Full Pipeline mid-flight (сессия 2, блокер разрешён)

```
Сессия 1 (завершена):
  COND-01 [✓] → Decision Tree → Full Pipeline
  INT-01  [✓] → Brief: 12 вопросов, scoring mode, scope = EdTech корп. обучение РФ
  → session-1-handoff.md сохранён ✅

Сессия 2 (в процессе):
  COND-02 [✓] → Контекст загружен из session-1-handoff.md
  RES-01  [✓] → CONDITIONAL PASS (2 gap'а: TAM 2 источника, IDC 14 мес)
                 $web-research: 38 запросов, 48 источников, Verified 62% 🟡
                 $handoff: конверт с gap'ами передан AN-01
  AN-01   [→] → В работе: TAM/SAM/SOM + Competitive Analysis + PEST
                 $gates dependency check: данные RES-01 процитированы ✅
  ST-01   [ ] → Ожидает

Метрики: Прогресс 33% (5/15) | Ср. время/гейт: 9 мин | Блокеры: 0 | Возвраты: 0
```

**Что произошло:**
1. COND-01: Decision Tree → Full Pipeline. User: "Approved" ✅
2. INT-01: 12 вопросов, scoring mode. User: "Approved" ✅
3. Session 1 Handoff: файл сохранён, промпт сгенерирован. User: "Approved" ✅
4. COND-02: контекст загружен, верифицирован. User: "Approved" ✅
5. RES-01: `$web-research` выполнен (38 запросов). `$gates`: CONDITIONAL PASS (2 gap'а). User: "Approved" (с пометкой gap'ов) ✅
6. AN-01: в работе. `$gates` dependency check: данные RES-01 задействованы.

**Блокер-сценарий (пример):**
Если бы RES-01 не выполнил `$web-research`:
- `$gates` → автоматический 🔴 Blocker (Правило 4).
- `$board` → RES-01 [!] Блокер.
- Эскалация: «⚠️ Researcher не выполнил веб-поиск. Это обязательное требование.»
- Возврат: RES-01 [↩] → выполнить `$web-research` → повторная `$gates` проверка.

---

## Чек-лист запуска пайплайна (для Conductor)

Conductor выполняет при инициализации:

- [ ] Режим определён по Decision Tree (Full / Quick)
- [ ] Доска создана через `$board` с корректными ID гейтов
- [ ] Первый гейт активирован (COND-01 → [→])
- [ ] User sign-off получен на режим и scope
- [ ] Для продолжающейся сессии: handoff файл загружен и верифицирован (протокол восстановления `$handoff`)

## Чек-лист закрытия сессии (для Conductor)

Conductor выполняет перед завершением:

- [ ] Все гейты текущей сессии в [✓] или [⊘] (нет [→] или [!])
- [ ] `$board` сохранена в handoff файле
- [ ] Все артефакты включены **полным текстом** в handoff
- [ ] `$session-prompt-generator` вызван, промпт сгенерирован
- [ ] Handoff файл сохранён: `docs/analytics/session-N-handoff.md`
- [ ] Файл самодостаточен (тест: можно начать работу без внешнего контекста)
- [ ] User sign-off получен на закрытие сессии

## Чек-лист Release Gate (для Conductor, сессия 5)

- [ ] Все гейты всех сессий в [✓] на `$board`
- [ ] PDF-отчёт сгенерирован и визуально проверен (`$html-pdf-report` протокол тестирования)
- [ ] Данные в отчёте актуальны на дату публикации
- [ ] User sign-off получен
- [ ] Итоговая доска + лог показаны пользователю
