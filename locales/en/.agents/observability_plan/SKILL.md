---
name: observability_plan
description: Plan observability — which logs/metrics/traces collect, correlation requests, levels logs, alerts. Without leaks PII/secrets.
---

#Skill: Observability Plan

Architectural plan observability: what log, what to measure, when to alert.

**Sections:**
1. [Logging Plan](#1-logging)
2. [Metrics Plan](#2-metrics)
3. [Alerting Plan](#3-alerting)
4. [Tracing](#4-tracing)
5. [UX Error Mapping](#5-ux-mapping)
6. [Dashboard Layout](#6-dashboard)
7. [Example: Smart Cart Rescue](#7-example)
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
| `coupon_created` | info | POST /coupons success | couponId, code, appInstanceId | "Coupon created" |
| `coupon_duplicate` | warn | POST /coupons 409 | code, appInstanceId | "Duplicate coupon code" |
| `settings_updated` | info | PUT /settings success | appInstanceId, changedFields | "Settings updated" |
| `install_webhook` | info | Webhook received | appInstanceId, siteUrl | "Processing install webhook" |
| `embed_script_ok` | info | Embed script success | appInstanceId | "Embed script registered" |
| `embed_script_fail` | error | Embed script failed | appInstanceId, err | "Failed to embed script" |
| `widget_served` | info | GET /widget/:id | appInstanceId, durationMs | "Widget config served" |
| `widget_not_found` | warn | GET /widget/:id 404 | appInstanceId | "App not found for script" |
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
  → All logs in request chainclude requestId automatically
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
| `widget_requests_total` | Counter | status | Embedded script traffic |
| `webhook_processed_total` | Counter | type, status | Webhook processing |
| `embed_script_calls_total` | Counter | status | Embed API calls |

### Latency targets

| Endpoint | p50 | p95 | p99 | Alert threshold (p95) |
|----------|-----|-----|-----|-----------------------|
| GET /widget/:id | 10ms | 50ms | 100ms | > 200ms |
| PUT /settings | 20ms | 100ms | 500ms | > 1000ms |
| POST /coupons | 20ms | 100ms | 500ms | > 1000ms |
| POST /webhooks/install | 50ms | 500ms | 2000ms | > 5000ms |

---

## 3. Alerting Plan

### Alert Rules

| Alert | Condition | Severity | Channel | Response |
|-------|-----------|----------|---------|----------|
| **High error rate** | 5xx > 5% of requests (5 min window) | 🔴 Critical | Slack/PagerDuty | Check logs, identify failing endpoint |
| **Latency spike** | p95 > 2x target (5 min window) | 🟠 Warning | Slack | Check DB performance, slow queries |
| **DB down** | Health check /ready fails 3 consecutive | 🔴 Critical | Slack/PagerDuty | Check MongoDB, restart if needed |
| **Webhook failures** | Embed script fail > 3/hour | 🟠 Warning | Slack | Check Wix API, manual re-embed |
| **Disk space** | > 85% used | 🟠 Warning | Slack | Clean logs, expand volume |
| **No traffic** | 0 requests for 10 min (production) | 🟠 Warning | Slack | Check gateway, DNS, Wix status |

### Silence rules

| Condition | Silence |
|-----------|---------|
| Deployment in progress | 10 min after deploy |
| Planned maintenance | Duration of maintenance window |
| Known Wix outage | Until resolved |

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

### MVP approach (without full tracing infra)

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
Widget errors → console.error('[SCR] ...') → no UI
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
│  Wix API: success/fail ▏ Webhook: rate      │
└─────────────────────────────────────────────┘
```

---

## 7. Example: Smart Cart Rescue

```markdown
# Observability Plan: Smart Cart Rescue

## Logging
- Structured JSON (pino), level: info (prod), debug (dev)
- requestId correlation on all requests
- Redact: authorization, password, token, cookie, DATABASE_URL

## Key Metrics
- http_requests_total (method, route, status)
- http_request_duration_seconds (p50, p95, p99)
- Widget serve rate + latency
- Webhook processing rate + success/fail

## Alerts
- 🔴 Error rate > 5% → immediate
- 🔴 DB health check fail → immediate
- 🟠 p95 latency > 2x target → investigation
- 🟠 Embed script fail > 3/hour → manual re-embed

## UX Error Mapping
- Dashboard: toast/inline errors with clear messages
- Widget: silent fail (console.error only)
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

## See also
- `$observability_logging` — implementation (pino setup, middleware, redaction code)
- `$architecture_doc` — Architecture Document (observability section)
- `$api_contracts` — error codes (map to UI states)
- `$threat_model_baseline` — audit logging requirements
