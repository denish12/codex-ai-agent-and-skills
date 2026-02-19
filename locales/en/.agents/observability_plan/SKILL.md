---
name: observability_plan
description: Observability plan: what logs/metrics/traces to collect, query correlation, log levels, alerts. No leakage of PII/secrets.
---

#Skill: Observability Plan

## Goal
So that you can diagnose problems and measure the quality of service.

## Additional
- Audit events for critical operations (if relevant)
- Errors should be mapped to UX states (error state) according to UX Spec

## Exit
## 1) Logging
- format (structured logs)
- correlation (request_id/trace_id)
- levels (debug/info/warn/error)
- prohibition of logging secrets/PII

## 2) Metrics
- latency (p50/p95/p99)
- error rate
-throughput
- DB metrics (if applicable)

## 3) Tracing (if applicable)
- key spans: web→service→db→external
- sampling strategy (minimum for MVP)

## 4) Alerts (minimum)
- height 5xx
- p95 latency degradation
- unavailability of critical integrations

## 5) UX mapping (if necessary)
- what errors should be reflected as “error state” in the UI (from UX Spec)