---
name: node_express_beast_practices
description: Node.js + Express: REST API, middleware, сервисный слой, репозитории, централизованная обработка ошибок, retries, rate limiting, фоновые задачи, структурированные логи.
---

# Skill: Node/Express Beast Practices

## Архитектура
- REST ресурсы и предсказуемые URL
- Middleware для кросс-сечений (auth, rate limit, logging)
- Service layer (бизнес-логика)
- Repository layer (доступ к данным)

## Ошибки
- Централизованный error handler
- Валидация ошибок: 400/401/403/404/409/422/500 по контракту
- Безопасные сообщения, без утечек

## Надёжность
- Retry с backoff для внешних вызовов
- Rate limiting для публичных эндпоинтов
- Background jobs для долгих операций

## Производительность
- избегать N+1
- пагинация/батчи
- кэширование (по архитектуре)

## См. также
- Примеры: `$dev_reference_snippets`