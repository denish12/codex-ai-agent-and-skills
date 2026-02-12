---
name: qa_security_smoke_tests
description: Базовые security smoke тесты: auth/authz, валидация, утечки в ошибках/логах, rate limiting (если включен), SSRF/XSS где релевантно.
---

# Skill: QA Security Smoke Tests

## Проверить минимум
- 401 без токена/сессии
- 403 для недостаточных прав
- 422/400 для невалидного ввода
- Ошибки не содержат stack/SQL/секретов
- Логи не содержат PII/секретов (по возможности проверить sample)
- 429 при превышении лимита (если rate limit включен)
