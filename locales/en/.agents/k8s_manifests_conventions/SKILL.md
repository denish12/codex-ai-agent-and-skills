---
name: k8s_manifests_conventions
description: Kubernetes manifest conventions: repo structure, Helm/Kustomize, overlays per env, naming/labels, secrets/config, policy, validation, GitOps.
---

# Skill: K8s Manifests Conventions

## Goal
Set uniform conventions for Kubernetes manifests and their maintenance so that:
- the infrastructure was predictable and repeatable,
- dev/staging/prod differed only in overlays/values,
- it was easy to do review/rollout/rollback,
- security and policy were observed.

## When to use
- The project is being deployed in Kubernetes or migration there is planned.
- There are several components/services or several environments.

## Inputs
- Architecture Doc + ADR
- Deployment/CI Plan
- Environment requirements (dev/staging/prod), domains, ingress
- Requirements for secrets and security policy

## Outputs
- Selected approach: Helm / Kustomize / raw manifests (with justification)
- Directory structure in the repo
- Naming/labels/annotations standards
- Rules for Config/Secrets
- Rules for Ingress/Gateway
- Minimum set of policies/validators
- GitOps/CI checks (dry-run, lint, schema validation)

## Tool selection (mandatory decision)
The architect must choose one of the approaches and fix the ADR:

### Option A: Customize (often the best default)
- overlays for env (dev/staging/prod)
- patchesStrategicMerge / json6902 patches
- easy reading of diffs

### Option B: Helm
- templating, values.yaml per env
- convenient for complex charts/modules
- you need to ensure the readability of templates

### Option C: Raw manifests
- only acceptable for very small projects
- quickly degrades as env/services grow

## Recommended repo structure (example)

###If Customize
```txt
k8s/
  base/
    namespace.yaml
    deployment.yaml
    service.yaml
    ingress.yaml
    hpa.yaml
    pdb.yaml
    configmap.yaml
  overlays/
    dev/
      kustomization.yaml
      patch-deployment.yaml
      patch-ingress.yaml
    staging/
      kustomization.yaml
      patch-deployment.yaml
    prod/
      kustomization.yaml
      patch-deployment.yaml
      patch-ingress.yaml
```

###If Helm
```txt
k8s/
  charts/
    app/
      Chart.yaml
      values.yaml
      templates/
        deployment.yaml
        service.yaml
        ingress.yaml
        hpa.yaml
  env/
    dev.yaml
    staging.yaml
    prod.yaml
```

## Naming / Labels (mandatory conventions)
Use Kubernetes recommended labels:
- app.kubernetes.io/name
- app.kubernetes.io/instance
- app.kubernetes.io/component
- app.kubernetes.io/part-of
- app.kubernetes.io/version
- app.kubernetes.io/managed-by

Minimum:
- all resources must have a single set of labels for selectors, alerts and search.

## Secrets / Config (strictly)
###Config
- ConfigMap for configs without secrets
- separate per-env only overlays/values

###Secrets
- do not store plaintext secrets in the repo
- preference: external secret manager (AWS Secrets Manager, GCP Secret Manager, Vault, Doppler, etc.)
- if you use k8s Secrets:
  - base64 is not considered security
  - restrict RBAC access
  - enable rotation plan

### Ban
- secrets in Docker image
- secrets in Helm values in plaintext in git
- logging secrets

## Ingress / Gateway (required)
- fix ingress controller (nginx/traefik/gateway api) to ADR
- TLS is required for prod
- rate limiting / WAF - if security baseline is provided
- security headers - if this is part of the edge policy

##Probes/Resources (must)
- readinessProbe + livenessProbe are required for services that receive traffic
- requests/limits are required for prod
- terminationGracePeriodSeconds + graceful shutdown
- HPA if variable load or SLA is expected

## Policy / Security (must)
- Pod Security Standards (baseline/restricted) — fix the level
- runAsNonRoot, seccompProfile, drop capabilities
- RBAC least privilege (service account per app)
- NetworkPolicy (if the cluster supports it) - define the minimum

## CI / Validation (must)Add checks (if possible):
- `kubectl apply --dry-run=server` (or equivalent)
- schema validation (kubeconform/kubeval)
- lint (helm lint / customize build)
- policy checks (conftest/OPA, kyverno validate) - if you use policies
- image scanning/SBOM - if in the pipeline

## GitOps (optional, but recommended)
- ArgoCD / Flux, if you need to manage envs as declarative state
- document the process promotion dev→staging→prod

## Red Flags
🔴P0:
- secrets in repo/values/image
- no probes on critical services
- no requests/limits in prod
- there is no single labels/naming (it will break ops/monitoring)
- it’s not clear how to do rollback

🟠P1:
- envs are distinguished by “manual edits” instead of overlays/values
- no CI validation for manifests

## Architect response format
### Chosen Approach (Helm/Kustomize/Raw) + ADR reference
### Repo Structure
### Naming & Labels
### Secrets/Config Strategy
### Ingress Strategy
### Policy & Security Baseline
### CI Validation Checklist
### Risks (P0/P1/P2)