---
name: observability_plan
description: План наблюдаемости: какие логи/метрики/трейсы собирать, корреляция запросов, уровни логов, алерты. Без утечки PII/секретов.
---

# Skill: Observability Plan

## Цель
Чтобы можно было диагностировать проблемы и измерять качество сервиса.

## Дополнительно
- Audit events для критичных операций (если релевантно)
- Ошибки должны маппиться на UX состояния (error state) по UX Spec

## Выход
## 1) Logging
- формат (структурированные логи)
- корреляция (request_id/trace_id)
- уровни (debug/info/warn/error)
- запрет логирования секретов/PII

## 2) Metrics
- latency (p50/p95/p99)
- error rate
- throughput
- DB metrics (если применимо)

## 3) Tracing (если применимо)
- ключевые спаны: web→service→db→external
- sampling стратегия (минимум для MVP)

## 4) Alerts (минимум)
- рост 5xx
- деградация p95 latency
- недоступность критичных интеграций

## 5) UX mapping (если нужно)
- какие ошибки должны отражаться как “error state” в UI (из UX Spec)
