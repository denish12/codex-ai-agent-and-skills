---
name: threat_model_baseline
description: Базовая модель угроз (threat baseline) для MVP: активы, векторы атак, меры. Учитывает OWASP-риски и роли/права.
---

# Skill: Threat Model Baseline

## Цель
Встроить безопасность в дизайн до кода.

## Принципы
- Defense in depth
- Least privilege
- Input validation at boundaries
- Secure by default
- Audit trail для критичных операций (если применимо)

## Входы
- PRD (PII/платежи/критичные операции)
- Роли/права
- Интеграции
- API Contracts

## Выход (структура)
- Assets
- Attack surfaces
- Threats → mitigations
- Security requirements для реализации и тестов

## 1) Assets (что защищаем)
- аккаунты/сессии
- данные пользователя (PII)
- платежи/заказы (если есть)
- админ-доступ

## 2) Attack surfaces
- публичные эндпоинты
- загрузка файлов
- вебхуки
- auth flows

## 3) Основные угрозы → меры (минимум)
- Injection (SQL/NoSQL/command) → валидация/параметризация
- XSS → экранирование/санитизация/Content Security Policy (если применимо)
- CSRF → CSRF tokens / sameSite cookies (если применимо)
- Auth bypass → строгая authz-проверка на сервере
- SSRF → allowlist/запрет внутренних адресов (если есть fetch внешних URL)
- Secrets leakage → secret storage + запрет логирования
- Rate limiting / brute force → лимиты/блокировки/капча (по необходимости)

## 4) Security requirements для реализации
- где обязательно audit logging
- требования к паролям/сессиям/токенам
- политика хранения/удаления данных

## Примечание
Если есть комплаенс (GDPR и т.п.) — зафиксировать обязательные меры и сроки хранения.
