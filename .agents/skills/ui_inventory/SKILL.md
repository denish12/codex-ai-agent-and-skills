---
name: ui_inventory
description: Составить инвентарь UI компонентов и правила переиспользования: базовые компоненты, композиционные компоненты, паттерны (forms, tables, dialogs), дизайн-токены (минимум).
---

# Skill: UI Components Inventory

## Цель
Снизить стоимость разработки и поддерживать консистентность UI.

## Выход
Список компонентов в виде каталога:

## 1) Базовые (atoms)
- Button (variants: primary/secondary/ghost/destructive, sizes)
- Input / Textarea
- Select / Combobox
- Checkbox / Radio / Switch
- Badge / Tag
- Spinner / Skeleton
- Icon
- Tooltip

## 2) Составные (molecules/organisms)
- FormField (label + control + help + error)
- Modal / Dialog
- Toast / Notification
- Table (sorting/filter/pagination если нужно)
- EmptyState (иконка + текст + CTA)
- ErrorState (сообщение + retry)
- Pagination
- Navbar / Sidebar
- Breadcrumbs (если нужно)

## 3) Паттерны
- Loading strategy (skeleton vs spinner)
- Empty vs zero-results
- Ошибки: уровни (inline / page / toast)
- Подтверждение destructive действий
- Обработка долгих операций (progress, optimistic UI)

## 4) Минимальные design tokens (если нет дизайн-системы)
- Spacing scale (например: 4/8/12/16/24/32)
- Border radius уровни
- Typography: заголовки/текст/подписи
- Цвета состояний: success/warn/error/info (без конкретных hex, если не задано)

## Правило
Если есть готовая дизайн-система — inventory привязывается к её компонентам/вариантам.
Если нет — описывать компоненты с минимальными параметрами, достаточными для реализации и тестирования UX Spec.