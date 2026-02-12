---
name: security_review_baseline
description: Security ревью по baseline: OWASP-риски, authz, валидация, SSRF/XSS/CSRF, секреты, безопасные логи/ошибки, least privilege.
---

# Skill: Security Review Baseline

## Проверить (минимум)
- Input validation на границах (API/forms)
- AuthN/AuthZ: сервер проверяет права, нет доверия клиенту
- Ошибки: без утечки stacktrace/SQL/конфигов/PII
- Secrets: нет ключей/токенов в репо и логах
- SSRF: если есть fetch внешних URL → allowlist/блок внутренних адресов
- XSS: экранирование/санитизация (если есть пользовательский HTML)
- CSRF: если cookie-based sessions → защита (tokens/sameSite)
- Rate limiting / brute force для чувствительных эндпоинтов (если нужно)
- Audit trail для критичных операций (если требуется threat model)

## Выход
- P0 security blockers
- P1 security issues
- Рекомендованные меры (конкретно)

## См. также
- Примеры и анти-примеры: $review_reference_snippets