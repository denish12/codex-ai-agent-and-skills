---
name: api_contracts
description: API контракты по UX flows: эндпоинты, схемы, ошибки, валидация, авторизация, perf/scalability соображения, идемпотентность и интеграционные паттерны.
---

# Skill: API Contracts

## Цель
Сделать API предсказуемым, безопасным и эффективным для клиента и тестов.

## Входы
- UX Spec (экраны/действия/состояния)
- PRD (acceptance criteria)
- Роли/права

## Выход
### Общие правила
- Единый формат ошибок (error_code, message, details)
- 401 vs 403 различать
- Валидация на границах
- Пагинация/фильтры/сортировки — если UI требует
- Идемпотентность для create/операций риска (где нужно)
- Версионирование (если ожидается рост публичного API)

### Для каждого endpoint
- Method + Path
- AuthN/AuthZ: required? роли?
- Request schema (типы + ограничения)
- Response schema
- Errors:
  - status
  - error_code
  - safe message
- Perf/scalability notes:
  - лимиты, пагинация, batch, минимизация round-trips

### Интеграции
- Вебхуки/внешние API: retry/backoff, подпись/верификация, идемпотентность
- Async если оправдано (event-driven)

## Trade-offs
Если есть спорные места (например CQRS/async) — фиксировать как ADR.
