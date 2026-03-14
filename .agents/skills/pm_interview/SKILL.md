---
name: pm_interview
description: Структурированное интервью/разбор документации — собрать цели, аудиторию, MVP, ограничения, интеграции и критерии успеха, чтобы можно было написать PRD.
---

# Skill: PM Interview / Discovery

Собрать минимально достаточную информацию для PRD.

**Разделы:**
1. [Workflow](#1-workflow)
2. [Question Bank](#2-questions)
3. [Priority & Assumptions](#3-priority)
4. [Output Template](#5-output)

---

## 1. Workflow

```
1. Прочитай то, что уже есть:
   ├── User brief / описание идеи
   ├── Существующий код / README
   └── Предыдущие документы (если есть)

2. Извлеки факты (что уже известно)

3. Определи пробелы (что нужно уточнить)
   └── Используй Question Bank (section 2)

4. Приоритизируй вопросы:
   ├── 🔴 Blocking — без ответа нельзя писать PRD
   ├── 🟠 Important — влияет на PRD, но можно допустить
   └── 🟡 Nice-to-know — можно отложить

5. Задай вопросы (только blocking + important)
   └── Остальное → допущения с пометкой ASSUMPTION

6. Сформируй Interview Summary (section 5)
   └── Передай в → $pm_prd
```

### Когда НЕ нужен interview

| Ситуация | Действие |
|----------|---------|
| User дал детальный brief с ответами на всё | Пропустить → сразу $pm_prd |
| Итерация над существующим PRD | Минимальный interview (только новые вопросы) |
| Bugfix / patch | Не нужен |

---

## 2. Question Bank

### A) Продукт и пользователи

| # | Вопрос | Зачем | Priority |
|---|--------|-------|:--------:|
| Q-01 | Кто целевые пользователи? | Определяет user stories и UX | 🔴 |
| Q-02 | Какая главная боль/задача? | Core value proposition | 🔴 |
| Q-03 | Как пользователь решает это сейчас? | Competitive context | 🟠 |
| Q-04 | Какие роли и различия в правах? | Auth/ACL scope | 🔴 |

### B) MVP и границы

| # | Вопрос | Зачем | Priority |
|---|--------|-------|:--------:|
| Q-05 | Что обязательно в MVP (3-7 пунктов)? | Scope control | 🔴 |
| Q-06 | Что точно НЕ входит (out-of-scope)? | Prevent scope creep | 🔴 |
| Q-07 | Какие сценарии самые частые/критичные? | Priority of user flows | 🟠 |

### C) Успех и метрики

| # | Вопрос | Зачем | Priority |
|---|--------|-------|:--------:|
| Q-08 | Как поймём что продукт успешен? | Success criteria | 🟠 |
| Q-09 | Есть ли KPI (скорость, конверсия, retention)? | Measurable goals | 🟡 |

### D) Данные и интеграции

| # | Вопрос | Зачем | Priority |
|---|--------|-------|:--------:|
| Q-10 | Какие данные храним? | Data model scope | 🔴 |
| Q-11 | Нужны ли внешние интеграции? | Architecture dependencies | 🔴 |
| Q-12 | Есть ли внешние API и ограничения? | API constraints | 🟠 |

### E) NFR (нефункциональные)

| # | Вопрос | Зачем | Priority |
|---|--------|-------|:--------:|
| Q-13 | Есть ли требования по безопасности/compliance? | Security scope | 🟠 |
| Q-14 | Ожидаемая нагрузка? | Scaling strategy | 🟡 |
| Q-15 | Локализация / языки? | i18n scope | 🟡 |

### F) Технологии и деплой

| # | Вопрос | Зачем | Priority |
|---|--------|-------|:--------:|
| Q-16 | Предпочтительный стек? | Tech decisions | 🟠 |
| Q-17 | Где деплоим? | Infrastructure | 🟠 |
| Q-18 | Нужна ли админка? | Additional scope | 🟡 |

---

## 3. Priority & Assumptions

### Правило минимизации вопросов

| Ситуация | Действие |
|----------|---------|
| Ответ критичен для архитектуры/UX | 🔴 Обязательно спросить |
| Можно двигаться с безопасным допущением | 🟠 Допустить + пометить ASSUMPTION |
| Можно отложить до PRD review | 🟡 Добавить в Open Questions |

### Assumption format

```markdown
**ASSUMPTION-XX:** <Statement>
- Основание: <Why this is safe to assume>
- Риск: Low / Medium / High
- Подтвердить до: <milestone>
```

---


---

## 5. Output Template

```markdown
# PM Interview Summary

**Date:** YYYY-MM-DD
**Interviewer:** Product Manager Agent
**Source:** <user brief / existing docs / conversation>

## Facts (confirmed)
| # | Fact | Source |
|---|------|--------|
| F-01 | ... | User brief |
| F-02 | ... | README.md |

## Questions & Answers
| # | Question | Priority | Answer | Status |
|---|----------|:--------:|--------|:------:|
| Q-01 | ... | 🔴 | ... | ✅ Answered |
| Q-05 | ... | 🔴 | ... | ✅ Answered |
| Q-09 | ... | 🟡 | — | ASSUMED |

## Assumptions
| ID | Assumption | Risk | Confirm by |
|----|-----------|:----:|-----------|
| ASSUMPTION-01 | ... | Low | MVP review |

## Open Questions (deferred)
| # | Question | Why deferred | Address at |
|---|----------|-------------|-----------|
| Q-14 | Expected load? | Not critical for MVP | Pre-launch |

## Next Step
→ Proceed to $pm_prd
```

---

## См. также
- `$pm_prd` — PRD (output of interview)
- `$pm_backlog` — Backlog decomposition
- `$ux_discovery` — UX-specific discovery