---
name: analytics-pipeline-rules
description: Абсолютные правила аналитического пайплайна — гейты, дисциплина, межсессионный протокол
---

# Правила аналитического пайплайна

> [!CAUTION]
> **🔴 АБСОЛЮТНОЕ ПРАВИЛО №1:** Пайплайн запрещено пропускать. Без исключений.
> Каждый гейт → читать агента → deliverable → HANDOFF → **User sign-off** → следующий гейт.

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
- Каждый гейт требует: deliverable + `$handoff` + `$gates` PASS + user sign-off.
- Пропуск гейта → 🔴 **P0 / BLOCKER**.

### Правило 2: User sign-off на каждом гейте
- Переход к следующему гейту — **только** после явного "Approved" от пользователя.
- При sign-off пользователь **верифицирует**, что AI правильно загрузил агента и его скиллы.
- `ShouldAutoProceed = false` ВСЕГДА.

### Правило 3: Агентский протокол — пошагово
- Каждый § (параграф) в `agents/<role>.md` — отдельное действие.
- Нельзя "сворачивать" несколько шагов в один.
- Перед написанием deliverable — пройти ВСЕ шаги протокола.

### Правило 4: Веб-поиск обязателен
- Исследователь **обязан** использовать `$web-research` при каждом запуске.
- Данные пользователя **обязательно** верифицируются через внешние источники.
- Без веб-поиска deliverable считается **INCOMPLETE**.

### Правило 5: Team Mode строго определён
- Conductor определяет team mode (Alpha/Beta) в Handoff Envelope.
- Исследователь, Аналитик и Стратег обязаны следовать назначенному режиму.
- Критики (Beta) **обязаны** получить полный отчёт Аналитиков (Alpha) как вход.

### Правило 6: Межсессионный протокол
- В Full Pipeline каждая сессия завершается сохранением `docs/analytics/session-N-handoff.md`.
- Файл handoff содержит **полный текст артефактов** (не ссылки — следующая сессия не имеет контекста).
- Генерируется готовый промпт для следующей сессии (`$session-prompt-generator`).
- Без handoff файла сессия считается **INCOMPLETE**.

### Правило 7: Медиатор — беспристрастность
- Медиатор оценивает качество аргументов и доказательной базы, **не объём текста**.
- Режим оценки (скоринг/качественный/синтез) определяется на интервью.
- Синтез (Appendix D) — только по предложению Медиатора и одобрению пользователя.

---

## Handoff Envelope — обязательный формат

```markdown
---
## HANDOFF ENVELOPE
From: <Gate>
To: <Gate>
Team: Alpha | Beta | N/A
Session: N of M
Date: YYYY-MM-DD

### Context Pack
- Goal: [Цель анализа]
- Scope: [In / Out]
- Constraints: [Ограничения]
- Inputs: [Что получено]
- Decisions: [Решения на этом гейте]
- Open Questions: [Нерешённые вопросы]
- Data Sources: [Использованные источники]
- DoD: [Критерии готовности]
- Output Format: [Формат deliverable]
---
```

---

## Протокол возврата (Reverse Handoff)

При обнаружении проблемы на последующем гейте:
1. Агент формирует Reverse Handoff с описанием проблемы.
2. Conductor маршрутизирует возврат к нужному гейту.
3. Доска (`$board`) обновляется: текущий гейт → `[↩]`, возвратный → `[→]`.
4. После исправления — повторная проверка через `$gates`.

---

## Формат приоритетов

- 🔴 **P0 / BLOCKER** — блокирует прогресс / публикацию отчёта
- 🟠 **P1 / IMPORTANT** — важно исправить до финализации
- 🟡 **P2 / NICE-TO-HAVE** — можно включить в следующую итерацию

---

## Mechanical Blocks (принудительные проверки)

1. **Pre-flight check:** перед записью deliverable — процитировать последний "Approved" пользователя.
2. **Skill read check:** перед применением скилла — прочитать его SKILL.md через `view_file`.
3. **Data verification check:** каждый факт в deliverable должен иметь source URL + date + confidence.
4. **Handoff file check (Full Pipeline):** перед закрытием сессии — убедиться что `docs/analytics/session-N-handoff.md` сохранён.
5. **Team mode check:** Conductor верифицирует что агент работает в назначенном team mode (Alpha/Beta).

---

## Артефакты пайплайна

| Сессия | Артефакт | Формат | Кто создаёт |
|--------|----------|--------|-------------|
| 1 | Interview Brief | Markdown | Interviewer |
| 1 | Session 1 Handoff | `docs/analytics/session-1-handoff.md` | Conductor |
| 2 | Alpha Research Package | Markdown (в handoff) | Researcher (Alpha) |
| 2 | Alpha Analytical Report | Markdown (в handoff) | Data Analyst (Alpha) |
| 2 | Alpha Strategy | Markdown (в handoff) | Strategist (Alpha) |
| 2 | Session 2 Handoff | `docs/analytics/session-2-handoff.md` | Conductor |
| 3 | Beta Research Package | Markdown | Researcher (Beta) |
| 3 | Beta Analytical Report | Markdown | Data Analyst (Beta) |
| 3 | Beta Strategy + Critique | Markdown | Strategist (Beta) |
| 3 | Session 3 Handoff | `docs/analytics/session-3-handoff.md` | Conductor |
| 4 | Mediated Conclusion | Markdown | Mediator |
| 4 | Session 4 Handoff | `docs/analytics/session-4-handoff.md` | Conductor |
| 4.5 | Synthesis (optional) | Markdown | Mediator |
| 5 | Report Design Spec | Markdown | Designer |
| 5 | Final PDF Report | HTML → PDF | Layouter |
