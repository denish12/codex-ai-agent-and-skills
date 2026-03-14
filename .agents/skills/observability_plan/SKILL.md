---
name: observability_plan
description: План наблюдаемости — какие логи/метрики/трейсы собирать, корреляция запросов, уровни логов, алерты. Без утечки PII/секретов.
---

# Skill: Observability Plan

Архитектурный план наблюдаемости: что логировать, что измерять, когда алертить.

**Разделы:**
1. [Logging Plan](#1-logging)
2. [Metrics Plan](#2-metrics)
3. [Alerting Plan](#3-alerting)
4. [Tracing](#4-tracing)
5. [UX Error Mapping](#5-ux-mapping)
6. [Dashboard Layout](#6-dashboard)
7. [Пример](#7-пример)
8. [Output Template](#8-output)

---

## 1. Logging Plan

### Log Events Registry

| Event | Level | When | Fields | Example message |
|-------|-------|------|--------|----------------|
| `server_started` | info | App startup | port, env, version | "Server started" |
| `server_shutdown` | info | Graceful shutdown | reason, uptime | "Server shutting down" |
| `http_request` | info | Every request (finish) | method, url, status, durationMs, requestId | "HTTP request" |
| `slow_request` | warn | durationMs > 2000 | method, url, durationMs | "Slow request detected" |
| `item_created` | info | POST /items success | itemId, ownerId | "Item created" |
| `item_duplicate` | warn | POST /items 409 | name, ownerId | "Duplicate item" |
| `settings_updated` | info | PUT /settings success | ownerId, changedFields | "Settings updated" |
| `webhook_received` | info | Webhook received | eventType, sourceId | "Processing webhook" |
| `content_served` | info | Public content served | contentId, durationMs | "Content served" |
| `content_not_found` | warn | GET /content/:id 404 | contentId | "Content not found" |
| `validation_error` | warn | Input validation failed | endpoint, fields, requestId | "Validation failed" |
| `auth_failed` | warn | Auth check failed | endpoint, reason, ip | "Authentication failed" |
| `db_error` | error | DB operation failed | operation, err | "Database error" |
| `db_connected` | info | DB connection established | host, dbName | "MongoDB connected" |
| `db_disconnected` | warn | DB connection lost | — | "MongoDB disconnected" |
| `unhandled_error` | error | Uncaught exception | err, requestId | "Unhandled error" |

### Correlation

```
Every request gets:
  requestId: UUID (from X-Request-ID header or generated)
  → Attached to child logger: req.log = logger.child({ requestId })
  → All logs in request chain include requestId automatically
  → Propagated to external calls via X-Request-ID header
```

### Log levels by environment

| Env | Level | Reason |
|-----|-------|--------|
| Production | `info` | Business events + errors |
| Staging | `debug` | Debugging without overload |
| Development | `debug` | Full visibility |
| Test | `silent` | Don't clutter test output |

### PII/Secrets — never log

| Field | Rule |
|-------|------|
| `password` | pino redact |
| `token` / `secret` / `apiKey` | pino redact |
| `authorization` header | pino redact |
| `cookie` header | pino redact |
| `email` | mask: `a****@example.com` |
| `creditCard` | pino redact |
| Connection string | pino redact `DATABASE_URL` |

---

## 2. Metrics Plan

### Key Metrics

| Metric | Type | Labels | Purpose |
|--------|------|--------|---------|
| `http_requests_total` | Counter | method, route, status | Request volume |
| `http_request_duration_seconds` | Histogram | method, route, status | Latency (p50/p95/p99) |
| `http_errors_total` | Counter | method, route, status | Error rate |
| `db_query_duration_seconds` | Histogram | operation, collection | DB performance |
| `db_connections_active` | Gauge | — | Connection pool usage |
| `content_requests_total` | Counter | status | Public content traffic |
| `webhook_processed_total` | Counter | type, status | Webhook processing |

### Latency targets

| Endpoint | p50 | p95 | p99 | Alert threshold (p95) |
|----------|-----|-----|-----|-----------------------|
| GET /content/:id | 10ms | 50ms | 100ms | > 200ms |
| PUT /settings | 20ms | 100ms | 500ms | > 1000ms |
| POST /items | 20ms | 100ms | 500ms | > 1000ms |
| POST /webhooks | 50ms | 500ms | 2000ms | > 5000ms |

---

## 3. Alerting Plan

### Alert Rules

| Alert | Condition | Severity | Channel | Response |
|-------|-----------|----------|---------|----------|
| **High error rate** | 5xx > 5% of requests (5 min window) | 🔴 Critical | Slack/PagerDuty | Check logs, identify failing endpoint |
| **Latency spike** | p95 > 2x target (5 min window) | 🟠 Warning | Slack | Check DB performance, slow queries |
| **DB down** | Health check /ready fails 3 consecutive | 🔴 Critical | Slack/PagerDuty | Check MongoDB, restart if needed |
| **Webhook failures** | Webhook processing fail > 3/hour | 🟠 Warning | Slack | Check external API, retry manually |
| **Disk space** | > 85% used | 🟠 Warning | Slack | Clean logs, expand volume |
| **No traffic** | 0 requests for 10 min (production) | 🟠 Warning | Slack | Check gateway, DNS, upstream services |

### Silence rules

| Condition | Silence |
|-----------|---------|
| Deployment in progress | 10 min after deploy |
| Planned maintenance | Duration of maintenance window |
| Known upstream outage | Until resolved |

---

## 4. Tracing

### Span structure (if implementing distributed tracing)

```
[HTTP Request] ← parent span
  ├── [Auth Check]
  ├── [Validation]
  ├── [Service Call]
  │   ├── [DB Query: findOne]
  │   └── [DB Query: updateOne]
  └── [Response Serialization]
```

### MVP approach (без full tracing infra)

For MVP, structured logs with `requestId` correlation provide 80% of tracing value:

```
# Find all logs for a specific request:
grep "requestId":"abc-123" app.log

# Trace request flow:
13:00:01 INFO  requestId=abc-123 msg="HTTP request started" method=PUT url=/api/v1/settings/app-1
13:00:01 DEBUG requestId=abc-123 msg="Validation passed"
13:00:01 DEBUG requestId=abc-123 msg="DB query" operation=updateOne durationMs=5
13:00:01 INFO  requestId=abc-123 msg="HTTP request" status=200 durationMs=12
```

---

## 5. UX Error Mapping

### API errors → UI states

| API Error | HTTP | UI State | User sees |
|-----------|------|----------|-----------|
| Validation | 400 | Form error | Red field borders + messages |
| Not Found | 404 | Empty state | "Not found" illustration |
| Duplicate | 409 | Form error | "Code already exists" |
| Auth | 401 | Redirect | Login page / re-auth |
| Forbidden | 403 | Error state | "Access denied" |
| Rate limit | 429 | Toast | "Too many requests, try later" |
| Server error | 500 | Error state | "Something went wrong" + retry button |
| Widget 404 | 404 | No render | Embedded script silently fails (no popup) |
| Widget 500 | 500 | No render | Embedded script silently fails |

### Rule: Embedded script NEVER shows errors to visitors

```
Widget errors → console.error('[App] ...') → no UI
Dashboard errors → toast or inline error → clear user message
```

---

## 6. Dashboard Layout

### Recommended observability dashboard sections

```
┌─────────────────────────────────────────────┐
│               OVERVIEW                       │
│  Request Rate ▏ Error Rate ▏ p95 Latency    │
│  [sparkline]  ▏ [sparkline]▏ [sparkline]    │
├─────────────────────────────────────────────┤
│               ENDPOINTS                      │
│  Table: route, requests, errors, p95, p99   │
├─────────────────────────────────────────────┤
│               ERRORS                         │
│  Top errors by: code, endpoint, message     │
├─────────────────────────────────────────────┤
│               DATABASE                       │
│  Query duration ▏ Connections ▏ Slow queries │
├─────────────────────────────────────────────┤
│               INTEGRATIONS                   │
│  External API: success/fail │ Webhook: rate   │
└─────────────────────────────────────────────┘
```

---

## 7. Пример

```markdown
# Observability Plan: SaaS Admin Panel

## Logging
- Structured JSON (pino), level: info (prod), debug (dev)
- requestId correlation on all requests
- Redact: authorization, password, token, cookie, DATABASE_URL

## Key Metrics
- http_requests_total (method, route, status)
- http_request_duration_seconds (p50, p95, p99)
- Public content serve rate + latency
- Webhook processing rate + success/fail

## Alerts
- 🔴 Error rate > 5% → immediate
- 🔴 DB health check fail → immediate
- 🟠 p95 latency > 2x target → investigation
- 🟠 Webhook fail > 3/hour → manual retry

## UX Error Mapping
- Dashboard: toast/inline errors with clear messages
- Public content: graceful fallback (no error UI)
```

---

## 8. Output Template

```markdown
# Observability Plan: <project-name>

**Date:** YYYY-MM-DD

## Logging
### Events Registry
<section 1 event table>

### Correlation
<requestId strategy>

### Redaction
<PII/secrets list>

## Metrics
<section 2 metrics table + latency targets>

## Alerting
<section 3 alert rules>

## Tracing
<section 4 strategy>

## UX Error Mapping
<section 5 table>

## Dashboard
<section 6 layout>
```

---

## См. также
- `$observability_logging` — implementation (pino setup, middleware, redaction code)
- `$architecture_doc` — Architecture Document (observability section)
- `$api_contracts` — error codes (map to UI states)
- `$threat_model_baseline` — audit logging requirements
