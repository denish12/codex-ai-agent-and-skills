---
name: security_review
description: AppSec ревью для эндпоинтов/авторизации/ввода/секретов/чувствительных фич. Чек-лист + паттерны (OWASP baseline).
---

# Skill: Security Review (AppSec)

## Когда активировать
- Новые API endpoints
- AuthN/AuthZ
- User input / file uploads
- Secrets/credentials
- Payments/PII/sensitive data
- Third-party integrations

## Checklist (минимум)
1) Secrets management
- Нет хардкода, нет секретов в логах/ошибках
- Secrets живут в env/secret manager, есть проверка наличия

2) Input validation
- Схемы на границах (whitelist validation)
- Ошибки не раскрывают внутренности

3) Injection
- SQL/NoSQL/command: без конкатенаций, только параметризация/ORM

4) AuthN/AuthZ
- Токены не в localStorage (если применимо), предпочтительно httpOnly cookies
- AuthZ проверки до критичных операций
- RLS/политики данных (если используете Supabase/аналог)

5) XSS / CSP
- Санитизация пользовательского HTML (если есть)
- CSP/headers если требуется архитектурой

6) CSRF (если cookie-based sessions)
- CSRF tokens / SameSite=Strict, double-submit pattern при необходимости

7) Rate limiting
- Базовые лимиты на API, stricter для expensive endpoints

8) Sensitive data exposure
- Нет PII/секретов в логах
- Нет stack trace для пользователя

9) Dependency security
- audit/lockfile/reproducible install

## Выход
- Findings P0/P1/P2 + конкретные фиксы
- Что добавить в тесты безопасности (auth/authz/validation/rate limiting)

## См. также
- Примеры и анти-примеры: $review_reference_snippets