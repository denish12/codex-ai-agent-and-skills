---
name: react_beast_practices
description: React best practices: композиция, контейнер/презентер, хуки, контекст, производительность (memo/useMemo/useCallback), code splitting, error boundaries, a11y.
---

# Skill: React Beast Practices

## Компонентные паттерны
- Composition over inheritance
- Compound components (где уместно)
- Container/Presenter (разделение данных и отображения)
- Custom hooks для переиспользуемой stateful-логики

## Производительность
- useMemo/useCallback по делу
- React.memo для чистых компонентов
- Code splitting/lazy для тяжёлых частей
- Виртуализация длинных списков (через TanStack Virtual)

## Надёжность
- Error boundary для предотвращения падения всего UI
- Управление focus, клавиатурная навигация, aria-атрибуты (a11y baseline)

## Формы
- controlled components + валидация
- ошибки и состояния формы — явные и тестируемые

## См. также
- Примеры: `$dev_reference_snippets`