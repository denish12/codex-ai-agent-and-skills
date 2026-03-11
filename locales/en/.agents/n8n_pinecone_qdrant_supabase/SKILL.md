---
name: n8n_pinecone_qdrant_supabase
description: Practical skill for architect and developer to design and implement production scenarios with n8n, Pinecone, Qdrant, and Supabase (auth, RLS, data flow, observability, reliability).
---

# Skill: n8n + Pinecone/Qdrant + Supabase

Use this skill when you need to design or implement integrations where:
- `n8n` orchestrates workflows and integrations,
- `Pinecone` or `Qdrant` is used as a vector DB,
- `Supabase` is used for Postgres/Auth/Storage/Realtime capabilities.

## Scope
- Flow architecture: webhook/event-driven/scheduled.
- Vector DB selection: Pinecone vs Qdrant based on product constraints.
- Supabase: Auth, RLS, schema design, migrations, Edge Functions/DB functions.
- Reliability: retry, idempotency, DLQ approach, timeouts, backoff.
- Observability: correlation id, structured logs, technical metrics, alerts.
- Security: least privilege, secrets hygiene, tenant isolation.

## Workflow
1. Clarify context:
- data volume, latency/SLA, multi-tenant needs, region/compliance, budget.
- managed-only vs self-hosted options.
2. Choose vector DB:
- `Pinecone`: managed-first, fast onboarding, lower ops load.
- `Qdrant`: self-hosted/hybrid, stronger infra and cost control.
3. Design integration boundaries:
- n8n as orchestrator, app backend as domain owner.
- clear ownership for ingestion/search/authz/audit.
4. Design Supabase layer:
- explicit tables/indexes/RLS policies,
- service-role only inside backend/automation boundaries,
- migrations as the only schema-change path.
5. Define flow contracts:
- input/output payload schemas,
- idempotency key,
- retry policy, failure handling, reconciliation job.
6. Handoff to implementation:
- work in vertical slices,
- security/testing/observability checklist per slice.

## Decision Rules
- Do not run Pinecone and Qdrant in the same production path without an explicit ADR.
- Never expose `service_role` to client apps.
- For multi-tenant systems, enforce tenant boundaries in schema + RLS + API layer.
- n8n should not replace core domain logic; use it for orchestration/integration only.

## Minimum Deliverables
- ADR: vector DB choice and deployment model.
- API/data contracts for ingestion/search/update/delete.
- Supabase RLS policy list and auth model.
- n8n workflow map (trigger -> transform -> action -> error path).
- Observability plan (logs/metrics/traces + alert conditions).

## Boundaries
- No mock functions/mock data for real production/demo flows.
- Do not ship without failure paths (retry/timeout/error handling).
- For high-risk flows, block release if security or parity evidence is missing.
