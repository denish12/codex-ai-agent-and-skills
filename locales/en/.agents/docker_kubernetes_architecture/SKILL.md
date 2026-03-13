---
name: docker_kubernetes_architecture
description: Containerization and Kubernetes architecture — Dockerfile best practices, k8s manifests, security, scaling, rollout, observability, CI/CD.
---

#Skill: Docker & Kubernetes Architecture

Containerization and orchestration: from Dockerfile to production K8s.

**Sections:**
1. [When apply](#1-when)
2. [Docker: Containerization](#2-docker)
3. [Kubernetes: Orchestration](#3-kubernetes)
4. [Security Posture](#4-security)
5. [Observability](#5-observability)
6. [Data & DR](#6-data--dr)
7. [Red Flags](#7-red-flags)
8. [Output Template](#8-output)

---

## 1. When apply

| Scenario | Apply? |
|---------|:---------:|
| Docker Compose (dev + small prod) | ✅ Docker section |
| Kubernetes (cloud, self-hosted) | ✅ Full skill |
| Vercel/Netlify/serverless only | ⬜ Not needed |
| Microservices / several components | ✅ Full skill |
| Horizontal scaling | ✅ K8s section |

---

## 2. Docker: Containerization

### Checklist

| # | Check | Status |
|---|-------|--------|
| 2.1 | Multi-stage build (builder → runtime) | ☐ |
| 2.2 | Lockfile + deterministic installs (`npm ci`) | ☐ |
| 2.3 | Minimal runtime image (alpine / distroless) | ☐ |
| 2.4 | Cache-friendly layers (deps before source) | ☐ |
| 2.5 | Non-root user (`USER appuser`) | ☐ |
| 2.6 | No secrets in image (use env_file / secrets) | ☐ |
| 2.7 | HEALTHCHECK defined | ☐ |
| 2.8 | `.dockerignore` configured | ☐ |
| 2.9 | Logs to stdout/stderr (12-factor) | ☐ |

### Dockerfile template (Node.js API)

```dockerfile
# ── Build ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# ── Runtime ──
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser

# Copy only production artifacts
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

USER appuser
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:3000/health/live || exit 1

CMD ["node", "dist/server.js"]
```

### Dockerfile template (React SPA / Vite)

```dockerfile
# ── Build ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Serve ──
FROM caddy:2-alpine AS runtime
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 3001
```

### .dockerignore

```
node_modules
.git
.env
*.log
dist
.DS_Store
coverage
```

---

## 3. Kubernetes: Orchestration

### 3.1 Workloads

| Workload | Type | When |
|----------|------|------|
| Stateless API | Deployment | Default for services |
| Stateful DB | StatefulSet | Only if self-hosting DB (prefer managed) |
| One-off tasks | Job | Migrations, backfill |
| Scheduled tasks | CronJob | Cleanup, reports |

### 3.2 Deployment manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: smart-cart
  labels:
    app.kubernetes.io/name: api
    app.kubernetes.io/part-of: smart-cart-rescue
    app.kubernetes.io/component: backend
    app.kubernetes.io/version: "1.0.0"
spec:
  replicas: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
  template:
    metadata:
      labels:
        app.kubernetes.io/name: api
        app.kubernetes.io/part-of: smart-cart-rescue
    spec:
      serviceAccountName: api-sa
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: api
          image: registry.example.com/smart-cart/api:1.0.0
          ports:
            - containerPort: 3000
              protocol: TCP
          envFrom:
            - configMapRef:
                name: api-config
            - secretRef:
                name: api-secrets
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /health/live
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20
            failureThreshold: 3
          startupProbe:
            httpGet:
              path: /health/live
              port: 3000
            failureThreshold: 10
            periodSeconds: 5
      terminationGracePeriodSeconds: 30
```

### 3.3 Service & Ingress

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: smart-cart
spec:
  selector:
    app.kubernetes.io/name: api
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  namespace: smart-cart
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts: [api.example.com]
      secretName: api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80
```

### 3.4 HPA (Horizontal Pod Autoscaler)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
  namespace: smart-cart
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 1
          periodSeconds: 60
```

### 3.5 PodDisruptionBudget

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
  namespace: smart-cart
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: api
```

---

## 4. Security Posture

### Container security checklist

| # | Check | How | Status |
|---|-------|-----|--------|
| 4.1 | Non-root | `runAsNonRoot: true`, `runAsUser: 1001` | ☐ |
| 4.2 | Drop capabilities | `drop: [ALL]` | ☐ |
| 4.3 | Read-only root FS | `readOnlyRootFilesystem: true` (+ tmpdir emptyDir) | ☐ |
| 4.4 | Seccomp profile | `seccompProfile: RuntimeDefault` | ☐ |
| 4.5 | No privilege escalation | `allowPrivilegeEscalation: false` | ☐ |
| 4.6 | Image from trusted registry | Private registry with scanning | ☐ |
| 4.7 | No secrets in image | Env vars / mounted secrets only | ☐ |
| 4.8 | RBAC least privilege | Dedicated ServiceAccount per app | ☐ |
| 4.9 | NetworkPolicy | Restrict ingress/egress | ☐ |

### Security context snippet

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1001
  runAsGroup: 1001
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop: [ALL]
  seccompProfile:
    type: RuntimeDefault
```

### NetworkPolicy example

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: smart-cart
spec:
  podSelector:
    matchLabels:
      app.kubernetes.io/name: api
  policyTypes: [Ingress, Egress]
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app.kubernetes.io/name: gateway
      ports:
        - port: 3000
  egress:
    - to:
        - podSelector:
            matchLabels:
              app.kubernetes.io/name: mongo
      ports:
        - port: 27017
    - to:  # Wix API
        - ipBlock:
            cidr: 0.0.0.0/0
      ports:
        - port: 443
```

---

## 5. Observability

### K8s-level checklist

| # | What | How | Status |
|---|------|-----|--------|
| 5.1 | Structured logs to stdout | pino JSON → collected by K8s | ☐ |
| 5.2 | Request correlation | `requestId` in all log entries | ☐ |
| 5.3 | Metrics (Prometheus) | `/metrics` endpoint or sidecar | ☐ |
| 5.4 | Key metrics | latency, error rate, throughput, saturation | ☐ |
| 5.5 | Alerts | Error rate > 5%, p95 > 2x target, pod restarts | ☐ |
| 5.6 | Log retention | Define days/storage limit | ☐ |
| 5.7 | Health endpoints | `/health/live`, `/health/ready` | ☐ |

---

## 6. Data & DR

### Backup checklist

| # | What | How | Status |
|---|------|-----|--------|
| 6.1 | DB backups scheduled | `mongodump` CronJob or managed backup | ☐ |
| 6.2 | Backup retention | N days (e.g. 30 days) | ☐ |
| 6.3 | Restore tested | Restore from backup to test DB | ☐ |
| 6.4 | RPO defined | Max data loss acceptable (e.g. 1 hour) | ☐ |
| 6.5 | RTO defined | Max downtime acceptable (e.g. 30 min) | ☐ |
| 6.6 | PITR (if needed) | Oplog-based point-in-time recovery | ☐ |

### Observability

| Strategy | How | When |
|----------|-----|------|
| **RollingUpdate** (default) | `maxUnavailable: 0, maxSurge: 1` | Normal releases |
| **Blue-Green** | Two deployments, switch service selector | Critical releases |
| **Canary** | Progressive rollout (10% → 50% → 100%) | High-risk features |
| **Rollback** | `kubectl rollout undo deployment/api` | On failure |

---

## 7. Red Flags

### 🔴 P0 (must fix before production)

| Flag | Description |
|------|------------|
| Containers run as root | `runAsNonRoot: true` missing |
| Secrets in image/repo | Secrets in Dockerfile, values.yaml, git |
| No readiness/liveness probes | Traffic sent to unhealthy pods |
| No rollback plan | Can't revert failed deployment |
| No resource limits | Pod can consume all node resources |

### 🟠 P1 (fix in current iteration)

| Flag | Description |
|------|------------|
| No HPA | Can't scale under load |
| No NetworkPolicy/RBAC | Lateral movement possible |
| No CI validation on manifests | Invalid YAML deployed |
| No backup tested | Backup exists but restore never verified |

---

## 8. Output Template

```markdown
# Docker & Kubernetes Architecture: <project-name>

**Date:** YYYY-MM-DD

## Containerization Plan
- Dockerfile strategy (multi-stage, non-root)
- Base images used
- .dockerignore

## Kubernetes Topology
- Namespaces, workloads, services, ingress
- Deployment manifests

## Resources & Scaling
- requests/limits per service
- HPA config

## Security Posture
- Security context (non-root, seccomp, capabilities)
- NetworkPolicy
- RBAC

## Rollout/Rollback
- Strategy (RollingUpdate/Blue-Green/Canary)
- Rollback command + procedure

## Observability
- Logging, metrics, alerts in K8s context

## Data & DR
- Backup strategy, RPO/RTO

## Required ADRs
- [ ] ADR-xxx: K8s vs Docker Compose
- [ ] ADR-xxx: Ingress controller choice
- [ ] ADR-xxx: Rollout strategy

## Risks (P0/P1/P2)
<red flags table>
```

---

## See also
- `$deployment_ci_plan` — CI pipeline, environments, migrations
- `$k8s_manifests_conventions` — manifest naming, labels, repo structure
- `$observability_plan` — detailed logging/metrics plan
- `$threat_model_baseline` — security requirements
