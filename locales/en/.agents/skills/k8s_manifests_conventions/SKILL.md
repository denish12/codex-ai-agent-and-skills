---
name: k8s_manifests_conventions
description: Kubernetes manifests conventions — repo structure, Helm/Kustomize, overlays per env, naming/labels, secrets/config, policy, validation, GitOps.
---

# Skill: K8s Manifests Conventions

Standards for Kubernetes manifests: naming, structure, overlays, validation.

**Sections:**
1. [Tooling Decision](#1-tooling-decision)
2. [Repo Structure](#2-repo-structure)
3. [Naming & Labels](#3-naming--labels)
4. [Config & Secrets](#4-config--secrets)
5. [Ingress & Gateway](#5-ingress--gateway)
6. [Probes & Resources](#6-probes--resources)
7. [Security Policy](#7-security-policy)
8. [CI Validation](#8-ci-validation)
9. [GitOps](#9-gitops)
10. [Red Flags](#10-red-flags)
11. [Output Template](#11-output-template)

---

## 1. Tooling Decision

Choose one approach and record an ADR:

| Approach | Best for | Pros | Cons |
|----------|---------|------|------|
| **Kustomize** | Small-medium, few services | Native kubectl, easy diffs, no templating | Limited composition for complex charts |
| **Helm** | Complex, many services, shared charts | Powerful templating, reusable charts | Template debugging, chart maintenance |
| **Raw manifests** | Tiny projects (1-2 services) | No learning curve | Doesn't scale, env duplication |

---

## 2. Repo Structure

### Kustomize layout

```
k8s/
├── base/
│   ├── kustomization.yaml
│   ├── namespace.yaml
│   ├── deployment-api.yaml
│   ├── deployment-dashboard.yaml
│   ├── service-api.yaml
│   ├── service-dashboard.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   ├── hpa.yaml
│   └── pdb.yaml
└── overlays/
    ├── dev/
    │   ├── kustomization.yaml
    │   ├── patch-deployment.yaml
    │   └── patch-ingress.yaml
    ├── staging/
    │   ├── kustomization.yaml
    │   └── patch-deployment.yaml
    └── prod/
        ├── kustomization.yaml
        ├── patch-deployment.yaml
        ├── patch-ingress.yaml
        └── patch-hpa.yaml
```

### kustomization.yaml (base)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: smart-cart

resources:
  - namespace.yaml
  - deployment-api.yaml
  - deployment-dashboard.yaml
  - service-api.yaml
  - service-dashboard.yaml
  - ingress.yaml
  - configmap.yaml
  - hpa.yaml
  - pdb.yaml

commonLabels:
  app.kubernetes.io/part-of: smart-cart-rescue
  app.kubernetes.io/managed-by: kustomize
```

### kustomization.yaml (overlay — prod)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

namePrefix: prod-

patches:
  - path: patch-deployment.yaml
    target:
      kind: Deployment
      name: api
  - path: patch-ingress.yaml
    target:
      kind: Ingress
      name: api-ingress
  - path: patch-hpa.yaml
    target:
      kind: HorizontalPodAutoscaler
      name: api-hpa

configMapGenerator:
  - name: api-config
    behavior: merge
    literals:
      - NODE_ENV=production
      - LOG_LEVEL=info
```

### patch-deployment.yaml (prod overlay)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
            limits:
              cpu: 1000m
              memory: 1Gi
```

---

### Helm layout

```
k8s/
├── charts/
│   └── smart-cart/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── _helpers.tpl
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── ingress.yaml
│           ├── configmap.yaml
│           ├── hpa.yaml
│           └── pdb.yaml
└── env/
    ├── dev.yaml
    ├── staging.yaml
    └── prod.yaml
```

### values.yaml (defaults)

```yaml
replicaCount: 2

image:
  repository: registry.example.com/smart-cart/api
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  className: nginx
  host: api.example.com
  tls: true

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilization: 70

env:
  NODE_ENV: production
  LOG_LEVEL: info
```

### prod.yaml (override)

```yaml
replicaCount: 3

image:
  tag: "1.0.0"
  pullPolicy: Always

resources:
  requests:
    cpu: 200m
    memory: 256Mi
  limits:
    cpu: 1000m
    memory: 1Gi

autoscaling:
  minReplicas: 3
  maxReplicas: 20

ingress:
  host: api.smart-cart.com
```

---

## 3. Naming & Labels

### Recommended labels (K8s standard)

| Label | Purpose | Example |
|-------|---------|---------|
| `app.kubernetes.io/name` | App name | `api` |
| `app.kubernetes.io/instance` | Instance / release | `smart-cart-prod` |
| `app.kubernetes.io/component` | Component role | `backend`, `frontend`, `database` |
| `app.kubernetes.io/part-of` | Parent application | `smart-cart-rescue` |
| `app.kubernetes.io/version` | Version | `1.0.0` |
| `app.kubernetes.io/managed-by` | Tool | `kustomize`, `helm` |

### Naming conventions

| Resource | Pattern | Example |
|----------|---------|---------|
| Namespace | `<project>` | `smart-cart` |
| Deployment | `<component>` | `api`, `dashboard` |
| Service | `<component>` | `api`, `dashboard` |
| ConfigMap | `<component>-config` | `api-config` |
| Secret | `<component>-secrets` | `api-secrets` |
| Ingress | `<component>-ingress` | `api-ingress` |
| HPA | `<component>-hpa` | `api-hpa` |
| PDB | `<component>-pdb` | `api-pdb` |
| ServiceAccount | `<component>-sa` | `api-sa` |
| NetworkPolicy | `<component>-netpol` | `api-netpol` |

---

## 4. Config & Secrets

### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
  namespace: smart-cart
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  PORT: "3000"
```

### Secrets strategy

| Approach | Security | Complexity | Best for |
|----------|----------|-----------|---------|
| **K8s Secrets** (base64) | Low | Low | Dev/staging |
| **Sealed Secrets** | Medium | Medium | Git-managed secrets |
| **External Secrets Operator** | High | Medium | AWS/GCP/Azure managed |
| **Vault** | High | High | Enterprise |

### Rules

| ✅ Do | ❌ Don't |
|-------|---------|
| Store in secret manager | Store plaintext in git |
| Use secretRef in pod spec | Use env vars in deployment YAML |
| Rotate secrets periodically | "Set and forget" |
| RBAC restrict secret access | Let all pods read all secrets |
| Mount as volume if file-based | Expose in container logs |

---

## 5. Ingress & Gateway

### Convention

| Rule | Value |
|------|-------|
| TLS | Required for staging + prod (cert-manager) |
| Ingress controller | Decide and ADR: nginx / traefik / Gateway API |
| Rate limiting | Enable on public endpoints |
| Security headers | `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security` |

### Ingress example

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  namespace: smart-cart
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    nginx.ingress.kubernetes.io/server-snippet: |
      add_header X-Content-Type-Options "nosniff" always;
      add_header X-Frame-Options "SAMEORIGIN" always;
      add_header Strict-Transport-Security "max-age=31536000" always;
spec:
  ingressClassName: nginx
  tls:
    - hosts: [api.example.com]
      secretName: api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api
                port: { number: 80 }
          - path: /
            pathType: Prefix
            backend:
              service:
                name: dashboard
                port: { number: 80 }
```

---

## 6. Probes & Resources

### Probes convention

| Probe | Path | Purpose | Timing |
|-------|------|---------|--------|
| `readinessProbe` | `/health/ready` | Ready to receive traffic (DB connected) | initialDelay: 5s, period: 10s |
| `livenessProbe` | `/health/live` | App is alive (not deadlocked) | initialDelay: 15s, period: 20s |
| `startupProbe` | `/health/live` | Slow-starting apps | failureThreshold: 10, period: 5s |

### Resources guideline

| Env | requests.cpu | requests.memory | limits.cpu | limits.memory |
|-----|:---:|:---:|:---:|:---:|
| dev | 50m | 64Mi | 200m | 256Mi |
| staging | 100m | 128Mi | 500m | 512Mi |
| prod | 200m | 256Mi | 1000m | 1Gi |

> Always set `requests`. Set `limits` for prod. Start low, tune based on actual usage.

---

## 7. Security Policy

### Pod Security Standards

| Level | Description | When |
|-------|-------------|------|
| **Restricted** | Most secure: non-root, no caps, read-only FS | Prod (target) |
| **Baseline** | No known privilege escalations | Staging |
| **Privileged** | No restrictions | Never in production |

### Security context template

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    runAsGroup: 1001
    fsGroup: 1001
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: api
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: [ALL]
        volumeMounts:
          - name: tmp
            mountPath: /tmp
  volumes:
    - name: tmp
      emptyDir: {}
```

---

## 8. CI Validation

### Pipeline checks

```yaml
# GitHub Actions example
validate-k8s:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    # Build manifests
    - name: Kustomize build
      run: kubectl kustomize k8s/overlays/prod > /tmp/manifests.yaml

    # Schema validation
    - name: Kubeconform
      uses: yannh/kubeconform-action@v0.6
      with:
        files: /tmp/manifests.yaml
        kubernetes-version: "1.29.0"

    # Dry-run
    - name: Dry run
      run: kubectl apply --dry-run=server -f /tmp/manifests.yaml

    # Policy check (optional)
    - name: Conftest
      run: conftest test /tmp/manifests.yaml -p policy/
```

### Validation checks summary

| Check | Tool | What it catches |
|-------|------|-----------------|
| YAML syntax | `yamllint` | Indentation, structure |
| K8s schema | `kubeconform` | Invalid fields, wrong API versions |
| Dry-run | `kubectl --dry-run=server` | Namespace conflicts, name collisions |
| Lint (Helm) | `helm lint` | Template errors, missing values |
| Policy | `conftest` / `kyverno` / OPA | No root, resource limits, labels |

---

## 9. GitOps

### Approach (if applicable)

| Tool | Description |
|------|-------------|
| **ArgoCD** | Declarative CD, UI, sync status |
| **Flux** | Git-native, lightweight |
| **Manual** | CI deploys with `kubectl apply` |

### Promotion flow

```
dev (auto-sync) → staging (auto/manual) → prod (manual approval)

Git branches:
  main → deploys to dev
  staging → deploys to staging
  tags → deploys to prod (with approval)
```

---

## 10. Red Flags

### 🔴 P0

| Flag | Description |
|------|------------|
| Secrets in repo/values/image | Security breach risk |
| No probes on traffic-receiving service | Traffic to unhealthy pods |
| No resource requests/limits in prod | Pod can starve/OOM others |
| Inconsistent labels | Monitoring, selectors, HPA broken |
| No rollback plan | Can't recover from bad deploy |

### 🟠 P1

| Flag | Description |
|------|------------|
| Env differences are manual edits (not overlays) | Config drift, incidents |
| No CI validation on manifests | Invalid YAML deployed |
| No NetworkPolicy | Lateral movement possible |

---

## 11. Output Template

```markdown
# K8s Manifests Conventions: <project-name>

**Date:** YYYY-MM-DD
**Approach:** Kustomize / Helm / Raw (ADR-xxx)

## Repo Structure
<section 2 tree>

## Naming & Labels
<section 3 tables>

## Config & Secrets Strategy
<section 4 approach + rules>

## Ingress
<section 5 config>

## Probes & Resources
<section 6 tables>

## Security Policy
<PSS level + security context>

## CI Validation
<pipeline checks>

## GitOps
<promotion flow>

## Risks
<red flags>
```

---

## See also
- `$docker_kubernetes_architecture` — containerization + K8s architecture
- `$deployment_ci_plan` — CI pipeline, environments, rollback
- `$security_baseline_dev` — secrets management patterns
- `$observability_plan` — logging/metrics in K8s context
