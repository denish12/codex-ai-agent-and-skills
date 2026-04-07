---
name: deployment-ci-plan
description: Deployment and CI plan — environments, configs, secrets, migrations, checks in CI (tests/lint/security), release and rollback strategy.
---

# Skill: Deployment & CI Plan

Reproducible build → test → deploy process.

**Sections:**
1. [Environments](#1-environments)
2. [Config & Secrets](#2-config-secrets)
3. [Docker Setup](#3-docker-setup)
4. [CI Pipeline](#4-ci-pipeline)
5. [DB Migrations](#5-db-migrations)
6. [Release Strategy](#6-release-strategy)
7. [Rollback Plan](#7-rollback-plan)
8. [Smoke Tests](#8-smoke-tests)
9. [Example](#9-example)
10. [Output Template](#10-output-template)

---

## 1. Environments

| Env | Purpose | URL | Deploy trigger | Infra |
|-----|---------|-----|---------------|-------|
| **local** | Development | `https://localhost:5173` | Manual (`docker compose up`) | Docker Compose |
| **staging** | Pre-release testing | `https://staging.example.com` | Push to `staging` branch | Docker Compose / K8s |
| **production** | Live users | `https://app.example.com` | Tag `v*` or manual approval | Docker Compose / K8s |

### Environment parity rule

> Dev, staging, and production use **the same Docker images**. Only env vars differ.

---

## 2. Config & Secrets

### Env vars registry

| Variable | Required | Default | Env | Description |
|----------|:--------:|---------|-----|-------------|
| `NODE_ENV` | ✅ | — | all | `development` / `production` |
| `PORT` | ⬜ | 3000 | all | API server port |
| `MONGODB_URI` | ✅ | — | all | MongoDB connection string |
| `VITE_API_URL` | ✅ | — | FE | API base URL for frontend |
| `EXTERNAL_API_KEY` | ⬜ | — | BE | External service API key (if applicable) |
| `EXTERNAL_API_SECRET` | ⬜ | — | BE | External service secret (sensitive!) |
| `LOG_LEVEL` | ⬜ | info | BE | pino log level |

### Secrets policy

| Rule | How |
|------|-----|
| **Storage** | `.env` local, Docker secrets / K8s secrets / Vault for prod |
| **Never in code** | grep check in CI |
| **Never in logs** | pino redact config |
| **Never in Docker image** | ARG for build, ENV for runtime only |
| **Rotation** | Document rotation procedure per secret |
| **.env.example** | Committed, no real values, all vars listed |

---

## 3. Docker Setup

### Dockerfile (multi-stage, Node.js)

```dockerfile
# ── Build stage ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# ── Runtime stage ──
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package.json ./
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health/live || exit 1
CMD ["node", "dist/server.js"]
```

### Docker Compose (development)

```yaml
version: "3.9"
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file: ./api/.env
    depends_on:
      mongo:
        condition: service_healthy
    restart: unless-stopped

  dashboard:
    build:
      context: ./dashboard
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    env_file: ./dashboard/.env
    restart: unless-stopped

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: mongosh --eval "db.adminCommand('ping')"
      interval: 10s
      timeout: 5s
      retries: 5

  gateway:
    image: caddy:2-alpine
    ports:
      - "5173:5173"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
    depends_on:
      - api
      - dashboard

volumes:
  mongo_data:
```

### Docker rules

| Rule | Description |
|------|-------------|
| **Multi-stage** | Builder → Runtime (smaller image, no dev deps) |
| **Non-root** | `USER appuser` (never root in runtime) |
| **Lockfile** | `npm ci` (deterministic installs) |
| **HEALTHCHECK** | Built into Dockerfile or docker-compose |
| **Cache-friendly** | Copy `package*.json` before source code |
| **No secrets** | Never `COPY .env`, use `env_file` in compose |
| **.dockerignore** | `node_modules`, `.env`, `.git`, `*.log` |

---

## 4. CI Pipeline

### GitHub Actions example

```yaml
name: CI
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx biome check .

  test:
    runs-on: ubuntu-latest
    needs: lint
    services:
      mongo:
        image: mongo:7
        ports: ["27017:27017"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
        env:
          MONGODB_URI: mongodb://localhost:27017/test

  security:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm audit --audit-level=high
      - run: npx secretlint "**/*"

  build:
    runs-on: ubuntu-latest
    needs: [test, security]
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app-api ./api
      - run: docker build -t app-dashboard ./dashboard
```

### Pipeline stages

```
┌────────┐    ┌──────┐    ┌──────────┐    ┌───────┐    ┌────────┐
│  Lint  │───▸│ Test │───▸│ Security │───▸│ Build │───▸│ Deploy │
└────────┘    └──────┘    └──────────┘    └───────┘    └────────┘
 biome check   vitest      npm audit        docker      compose
                           secretlint       build       up -d
```

### CI rules

| Rule | Description |
|------|-------------|
| **Block merge** | Failed CI = no merge |
| **Parallelism** | lint ∥ security, then test, then build |
| **Secrets** | GitHub Secrets / CI vars (never hardcoded) |
| **Deps cache** | `actions/cache` for node_modules |
| **Coverage** | Fail if < threshold (e.g. 70%) |

---

## 5. DB Migrations

### Strategy (MongoDB + migrate-mongo)

```bash
# Create migration
npx migrate-mongo create add-templateId-to-settings

# Apply pending migrations
npx migrate-mongo up

# Rollback last migration
npx migrate-mongo down

# Check status
npx migrate-mongo status
```

### Rules

| Rule | Description |
|------|-------------|
| **Run before deploy** | Migrations applied before new code starts |
| **Forward-compatible** | New code must work with old schema during rolling update |
| **Reversible** | Every `up()` has matching `down()` |
| **Tested** | Run against test DB in CI |
| **Idempotent** | Safe to run multiple times |

---

## 6. Release Strategy

### Versioning

```
SemVer: MAJOR.MINOR.PATCH
- MAJOR: breaking API changes
- MINOR: new features (backward compatible)
- PATCH: bug fixes

Git tags: v1.0.0, v1.1.0, v1.1.1
Docker tags: app-api:v1.0.0, app-api:latest
```

### Release flow

```
feature branch → PR → main (CI green) → tag vX.Y.Z → deploy
```

### Feature flags (if needed)

| Flag | Purpose | Default | How to toggle |
|------|---------|---------|---------------|
| `ENABLE_NEW_TEMPLATE` | Show new popup template | false | Env var |
| `ENABLE_ANALYTICS` | Send analytics events | false | Env var |

---

## 7. Rollback Plan

### Procedure

```markdown
## Rollback Checklist

1. ☐ **Identify issue** — what broke? Check logs, alerts, user reports
2. ☐ **Communicate** — inform team that rollback is starting
3. ☐ **Rollback code:**
   - Docker: `docker compose up -d --build` with previous image tag
   - K8s: `kubectl rollout undo deployment/<name>`
4. ☐ **Rollback DB (if migration applied):**
   - `npx migrate-mongo down`
   - Verify data integrity
5. ☐ **Verify** — run smoke tests, check health endpoints
6. ☐ **Post-mortem** — document what went wrong
```

### Time targets

| Action | Target |
|--------|--------|
| Detection | < 5 min (alerts) |
| Decision to rollback | < 10 min |
| Rollback execution | < 5 min |
| Verification | < 5 min |
| **Total MTTR** | **< 25 min** |

---

## 8. Smoke Tests

### Post-deploy smoke test checklist

| # | Test | How | Expected |
|---|------|-----|----------|
| 1 | Health check | `GET /health/live` | 200 OK |
| 2 | Ready check | `GET /health/ready` | 200 OK (DB connected) |
| 3 | Content endpoint | `GET /api/v1/content/<testId>` | 200 + valid payload |
| 4 | Dashboard loads | Open dashboard URL | Page renders |
| 5 | Settings CRUD | PUT, then GET settings | Values persisted |
| 6 | Public content | Check public content endpoint | Content served |

---

## 9. Example

```markdown
# Deployment & CI Plan: SaaS Admin Panel

## Environments
- local: Docker Compose + Caddy (https://localhost:5173)
- production: Docker Compose + Cloudflare Tunnel

## CI: GitHub Actions (lint → test → security → build)
## Migrations: migrate-mongo (run before deploy)
## Release: SemVer tags, manual production deploy
## Rollback: Previous Docker image + migrate-mongo down
```

---

## 10. Output Template

```markdown
# Deployment & CI Plan: <project-name>

**Date:** YYYY-MM-DD

## Environments
<section 1 table>

## Config & Secrets
<section 2 registry + policy>

## Docker Setup
<Dockerfile + docker-compose.yml>

## CI Pipeline
<pipeline stages + YAML config>

## Migrations
<strategy + commands>

## Release Strategy
<versioning + flow>

## Rollback Plan
<procedure + time targets>

## Smoke Tests
<post-deploy checklist>
```

---

## DoD (Definition of Done)

- ☐ CI is green (all stages pass)
- ☐ Migrations applied and tested
- ☐ Smoke tests passed after deploy
- ☐ Rollback procedure documented and executable
- ☐ No secrets in code/images/logs

---

## See also
- `$docker-kubernetes-architecture` — detailed Docker/K8s architecture
- `$k8s-manifests-conventions` — K8s manifest standards
- `$observability-plan` — logging/metrics/alerts
- `$security-baseline-dev` — secrets management
