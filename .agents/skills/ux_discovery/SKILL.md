---
name: ux_discovery
description: Уточнить UX вводные по PRD — роли, основные потоки, навигация, платформы (responsive), бренд/референсы, локализация, edge cases.
---

# Skill: UX Discovery

Собрать недостающий UX контекст перед UX Spec.

**Разделы:**
1. [Workflow](#1-workflow)
2. [Question Bank](#2-questions)
3. [Priority Matrix](#3-priority)
4. [Assumptions Framework](#4-assumptions)
5. [Пример](#5-пример)
6. [Output Template](#6-output)

---

## 1. Workflow

```
1. Прочитай PRD (из $pm_prd)
   └── Выдели: цели, user stories, acceptance criteria, constraints

2. Проверь: что уже известно vs что нужно уточнить
   ├── Известно → отметь как факт
   └── Неизвестно → добавь в список вопросов

3. Приоритизируй вопросы (section 3):
   ├── 🔴 Blocking: без ответа нельзя выбрать подход
   ├── 🟠 Important: влияет на UX Spec, но можно допустить
   └── 🟡 Nice-to-know: полезно, но не критично

4. Если ответ критичен → задай вопрос пользователю
   Если можно допустить → зафиксируй допущение + отметь "ASSUMPTION"

5. Сформируй Discovery Report (section 6)

6. Передай в → $ux_spec
```

### Когда НЕ нужен discovery

| Ситуация | Действие |
|----------|---------|
| PRD уже содержит все ответы | Пропустить discovery → сразу $ux_spec |
| Итерация над существующим UI | Минимальный discovery (только новые вопросы) |
| Bugfix / hotfix | Не нужен |

---

## 2. Question Bank

### A) Платформа и layout

| # | Вопрос | Зачем |
|---|--------|-------|
| Q-01 | Desktop-first, mobile-first или responsive? | Определяет breakpoints и layout strategy |
| Q-02 | Минимальные поддерживаемые разрешения? | Влияет на grid и responsive rules |
| Q-03 | Встраивается в iframe или standalone? | Критично для размеров, scrolling, navigation |
| Q-04 | Есть ли dark mode / theme switching? | Влияет на design tokens и CSS strategy |

### B) Роли и права

| # | Вопрос | Зачем |
|---|--------|-------|
| Q-05 | Какие роли пользователей? | Определяет navigation и permissions logic |
| Q-06 | Что каждая роль может / не может делать? | Влияет на UI visibility и server-side auth |
| Q-07 | Нужна ли админка / модерация? | Может потребовать отдельный layout |
| Q-08 | Есть ли onboarding для new users? | Дополнительные экраны/flow |

### C) Навигация и структура

| # | Вопрос | Зачем |
|---|--------|-------|
| Q-09 | Основные разделы / tabs / pages? | Определяет IA (Information Architecture) |
| Q-10 | Есть ли deep linking (URL sharing)? | Влияет на routing strategy |
| Q-11 | Breadcrumbs / back navigation нужны? | UX navigation pattern |
| Q-12 | Single page or multi-page? | Routing, state management |

### D) Бренд и визуал

| # | Вопрос | Зачем |
|---|--------|-------|
| Q-13 | Есть ли Figma / mockup / дизайн-система? | Определяет «источник правды» по UI |
| Q-14 | Есть визуальные референсы / вдохновение? | Direction для дизайн-решений |
| Q-15 | Логотип / фирменные цвета / шрифты? | Brand compliance |
| Q-16 | Тёмная / светлая тема? | Design tokens scope |

### E) Данные и состояния

| # | Вопрос | Зачем |
|---|--------|-------|
| Q-17 | Что показываем при пустых данных? | Empty state design |
| Q-18 | Какие операции потенциально долгие? | Loading/skeleton strategy |
| Q-19 | Что делаем при ошибках сети/сервера? | Error state design |
| Q-20 | Есть ли real-time updates? | WebSocket / polling strategy |
| Q-21 | Максимальные объёмы данных (списки/таблицы)? | Pagination/virtualization |

### F) Локализация и i18n

| # | Вопрос | Зачем |
|---|--------|-------|
| Q-22 | Один язык или несколько? | i18n setup |
| Q-23 | RTL поддержка? | CSS direction strategy |
| Q-24 | Формат дат / времени / валют? | Locale-specific formatting |

---

## 3. Priority Matrix

| Priority | Meaning | Action |
|----------|---------|--------|
| 🔴 **Blocking** | Без ответа нельзя начать UX Spec | Обязательно спросить пользователя |
| 🟠 **Important** | Влияет на UX, но можно сделать допущение | Спросить или зафиксировать ASSUMPTION |
| 🟡 **Nice-to-know** | Полезно для polish, не для MVP | Отложить или допустить |

### Типичная приоритизация

| Категория | Типичный приоритет |
|-----------|:------------------:|
| Platform (iframe / responsive) | 🔴 |
| Roles & permissions | 🔴 |
| Navigation / IA | 🟠 |
| Brand / design system | 🟠 |
| Empty / error states | 🟠 |
| Localization | 🟡 |
| Real-time updates | 🟡 |

---

## 4. Assumptions Framework

Когда нет ответа, зафиксируй допущение:

```markdown
### ASSUMPTION-01: Desktop-first layout
**Вопрос:** Q-01 — responsive strategy
**Допущение:** Desktop-first, min-width 1024px
**Обоснование:** PRD описывает dashboard, типичный use case — десктоп
**Риск:** Low — легко добавить mobile breakpoints позже
**Нужно подтвердить:** До v1.0
```

---

## 5. Пример

```markdown
# UX Discovery: SaaS Admin Panel

## Факты из PRD
- Admin dashboard для настройки контента
- Roles: Admin (полный доступ), Viewer (только чтение)
- Features: Settings, Content CRUD, Preview

## Уточнено
- Q-01: Desktop-first, responsive later → 🔴 confirmed
- Q-13: Дизайн-система — shadcn/ui → 🟠 confirmed
- Q-17: Empty state — показать "Create your first item" CTA → 🟠 confirmed

## Допущения
- ASSUMPTION-01: Desktop-first (admin panel = десктоп) → Low risk
- ASSUMPTION-02: Один язык (english) для MVP → Low risk
- ASSUMPTION-03: Нет real-time updates (static config) → Low risk
```

---

## 6. Output Template

```markdown
# UX Discovery Report

**PRD:** <reference>
**Date:** YYYY-MM-DD
**Author:** UX/UI Designer Agent

## Facts (confirmed from PRD)
| # | Fact | Source |
|---|------|--------|
| F-01 | Desktop-first, standalone app | PRD §1 |
| F-02 | Two roles: Admin, Viewer | PRD §2.1 |

## Questions
| # | Question | Priority | Answer | Status |
|---|----------|:--------:|--------|:------:|
| Q-01 | Responsive or desktop only? | 🔴 | Desktop-first | ✅ Answered |
| Q-13 | Design system? | 🟠 | shadcn/ui | ✅ Answered |
| Q-20 | Real-time? | 🟡 | — | ASSUMED: No |

## Assumptions
| ID | Assumption | Risk | Confirm by |
|----|-----------|:----:|-----------:|
| ASSUMPTION-01 | Desktop-first | Low | v1.0 |
| ASSUMPTION-02 | English only | Low | v1.0 |

## Screen / Flow Inventory (draft)
1. Admin Panel → Settings (tabs: General, Appearance, Notifications)
2. Admin Panel → Items list (CRUD)
3. Public UI → Content display (end-user facing)

## Next Step
→ Proceed to $ux_spec with confirmed facts + assumptions
```

---

## См. также
- `$pm_prd` — PRD (input for discovery)
- `$ux_spec` — UX Spec (output of discovery)
- `$design_intake` — design materials analysis