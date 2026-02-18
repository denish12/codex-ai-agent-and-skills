---
name: deployment_ci_plan
description: План деплоя и CI: окружения, конфиги, секреты, миграции, проверки в CI (tests/lint/security), стратегия релизов и откатов.
---

# Skill: Deployment & CI Plan

## Цель
Сделать воспроизводимый build/test/deploy процесс.

## Добавить (Operations)
- Monitoring/alerting (минимум)
- Backup & recovery (если есть БД)
- Rollback plan (обязателен)

## Входы
- Ограничения деплоя (Vercel/Docker/AWS/etc)
- Стек
- Требования безопасности (секреты)

## Выход (структура)
## 1) Environments
- local
- staging (если есть)
- production

## 2) Config & Secrets
- env vars перечень
- где храним секреты (secret storage)
- политика логов (не печатать секреты)

## 3) CI pipeline (минимум)
- install
- lint/format (если есть)
- unit tests
- integration tests
- (опц.) dependency audit

## 4) DB migrations (если есть БД)
- когда и как применяются миграции
- rollback стратегия (если нужна)

## 5) Release strategy
- versioning
- feature flags (если нужно)
- rollback plan

## DoD связка
- без зелёного CI релиз не разрешён
- миграции применены и протестированы
- smoke test пройден после деплоя