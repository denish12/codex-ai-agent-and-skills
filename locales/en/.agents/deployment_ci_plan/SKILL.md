---
name: deployment_ci_plan
description: Deployment and CI plan: environments, configs, secrets, migrations, CI checks (tests/lint/security), release and rollback strategy.
---

# Skill: Deployment & CI Plan

## Goal
Make a reproducible build/test/deploy process.

## Add (Operations)
- Monitoring/alerting (minimum)
- Backup & recovery (if there is a database)
- Rollback plan (required)

## Inputs
- Deployment restrictions (Vercel/Docker/AWS/etc)
- Stack
- Security requirements (secrets)

## Output (structure)
## 1) Environments
-local
- staging (if any)
- production

## 2) Config & Secrets
- env vars list
- where we store secrets (secret storage)
- log policy (do not print secrets)

## 3) CI pipeline (minimum)
- install
- lint/format (if available)
- unit tests
- integration tests
- (optional) dependency audit

## 4) DB migrations (if there is a database)
- when and how migrations are applied
- rollback strategy (if needed)

## 5) Release strategy
- versioning
- feature flags (if needed)
-rollback plan

## DoD link
- release is not allowed without green CI
- migrations applied and tested
- smoke test passed after deployment