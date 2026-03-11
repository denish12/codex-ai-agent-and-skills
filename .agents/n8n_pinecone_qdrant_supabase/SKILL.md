---
name: n8n_pinecone_qdrant_supabase
description: Практический skill для архитектора и разработчика по проектированию и реализации production-сценариев с n8n, Pinecone, Qdrant и Supabase (auth, RLS, data flow, observability, reliability).
---

# Skill: n8n + Pinecone/Qdrant + Supabase

Используй этот skill, когда нужно спроектировать или реализовать интеграции, где:
- `n8n` оркестрирует процессы и интеграции,
- `Pinecone` или `Qdrant` используется как vector DB,
- `Supabase` используется как Postgres/Auth/Storage/Realtime слой.

## Scope
- Архитектура потоков: webhook/event-driven/scheduled.
- Выбор vector DB: Pinecone vs Qdrant по требованиям продукта.
- Supabase: Auth, RLS, schema design, migrations, Edge Functions/DB functions.
- Надёжность: retry, idempotency, DLQ-подход, таймауты, backoff.
- Наблюдаемость: correlation id, структурные логи, техметрики, алерты.
- Безопасность: least privilege, secrets hygiene, tenant isolation.

## Workflow
1. Уточни контекст:
- объём данных, latency/SLA, multi-tenant, регион/комплаенс, бюджет.
- managed-only или допускается self-hosted инфраструктура.
2. Выбери vector DB:
- `Pinecone`: managed-first, быстрый старт, меньше ops.
- `Qdrant`: self-hosted/гибрид, контроль инфраструктуры и стоимости.
3. Спроектируй интеграционный контур:
- n8n как orchestrator, app backend как domain owner.
- чёткие границы ответственности: ingestion/search/authz/audit.
4. Спроектируй Supabase-слой:
- явные таблицы/индексы/политики RLS,
- service-role только в backend/automation boundaries,
- migrations как единственный путь изменения схемы.
5. Зафиксируй контракт потоков:
- входные/выходные payload schema,
- idempotency key,
- retry policy, failure handling, reconciliation job.
6. Передай в реализацию:
- задачи вертикальными срезами,
- checklist по безопасности, тестам, observability.

## Decision Rules
- Не использовать одновременно Pinecone и Qdrant в одном production-контуре без явного ADR.
- Не давать `service_role` в клиентские приложения.
- Для multi-tenant всегда фиксировать tenant boundary в schema + RLS + API layer.
- n8n не должен подменять доменную бизнес-логику приложения; только orchestration/integration.

## Minimum Deliverables
- ADR: выбор vector DB и deployment model.
- API/data contracts для ingestion/search/update/delete.
- Supabase RLS policy list и auth model.
- n8n workflow map (trigger -> transform -> action -> error path).
- Observability план (logs/metrics/traces + alert conditions).

## Boundaries
- Не использовать mock functions/mock data для рабочих сценариев и demo.
- Не выпускать изменения без failure path (retry/timeout/error handling).
- Для high-risk flows блокировать релиз при отсутствии security или parity evidence.
