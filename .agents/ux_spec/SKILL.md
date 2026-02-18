---
name: ux_spec
description: Сформировать UX Spec: user flows, IA, список экранов, спецификация каждого экрана (действия/секции/валидации/состояния), критерии UX качества для разработки и тестирования.
---

# Skill: UX Spec (Flows + Screens + States)

## Цель
Сделать спецификацию, по которой можно реализовать UI без “домыслов”.

## Выход
UX Spec в структуре:

## 1) Users & Roles
- Роли:
- Права/ограничения:

## 2) Key User Flows
Для каждого потока:
- Trigger (откуда старт)
- Steps (1..n)
- Success outcome
- Failure/edge outcomes

## 3) Information Architecture (IA)
- Карта навигации (разделы/экраны)
- Правила доступа (если роль влияет на видимость)

## 4) Screens Spec (по каждому экрану)
### Screen: <Название>
- Purpose:
- Primary actions:
- Sections/components:
- Forms & validation (если есть):
- States:
  - Loading:
  - Empty:
  - Error:
  - Success:
- Notifications (toasts/modals):
- Permissions notes:
- Analytics events (если нужны):
- Notes:

## 5) UI Rules (минимально)
- Соглашения: кнопки primary/secondary, destructive actions, подтверждения
- Таблицы/списки: сортировка/фильтры/пагинация (если применимо)
- Формы: inline errors, disabled submit, required markers

## Качество (чек-лист)
- Нет “дыр”: каждый критический сценарий из PRD покрыт flow + экраном
- Для экранов описаны состояния loading/empty/error/success
- Валидация форм конкретна
- Есть правила для destructive действий (confirm/undo)
- Указаны все секции/компоненты на экране (нет “и ещё там будет ...”)
- Указаны все действия пользователя (клики, навигация, формы)