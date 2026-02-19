---
name: docker_kubernetes_architecture
description: Containerization and Kubernetes architecture: Dockerfile best practices, k8s manifests, security, scaling, rollout, observability, CI/CD.
---

#Skill: Docker & Kubernetes Architecture

## Goal
Design and document containerization and deployment in Kubernetes so that:
- the builds were reproducible and safe,
- environments (dev/staging/prod) were consistent,
- the application was scaled and updated without downtime (according to the chosen strategy),
- there were clear runbooks, rollback and observability.

## When to use
- The project is deployed in Docker / Kubernetes (self-hosted, cloud k8s, on-prem).
- There are microservices/multiple components.
- Need horizontal scaling, HPA, blue-green/canary.
- Strict security/compliance measures required.

If the deployment will be without containers (Vercel-only, etc.), the skill is not required.

## Inputs
- Architecture Doc + ADR
- Deployment/CI Plan
- Non-functional requirements (SLA, perf, security, cost)
- Tech stack (FE/BE/DB/queues)

## Outputs (artifacts)
- Containerization plan:
  - basic Dockerfile rules and standards
  - build/run strategy (multi-stage, non-root)
- Kubernetes plan:
  - namespaces, ingress, service, deployment/statefulset
  - config/secrets strategy
  - health probes, resources, autoscaling
  - rollout/rollback strategy
- Ops plan:
  - logging/metrics/tracing
  - backups/DR
  - runbooks (deploy, rollback, incident)

## Checklist: Docker (must)
###Build
- Multi-stage build (builder → runtime)
- Reproducibility: lockfile + fixed versions
- Minimum runtime image (alpine/distroless - as appropriate)
- Cache-friendly layers (dependencies before sources)
- SBOM/scan (if there is a pipeline)

### Runtime security
- Non-root user (USER), minimal rights
- Read-only filesystem where possible
- Do not copy secrets to image
- Healthcheck (if applicable)
- Clear separation of build args vs runtime env

### Logging
- Logs to stdout/stderr (12-factor)
- No secrets/PII

## Checklist: Kubernetes (must)
### Workloads
- Deployment for stateless services
- StatefulSet for stateful (if it is impossible to place state in managed DB)
- Separation by namespaces (dev/staging/prod)
- Service (ClusterIP), Ingress/Gateway for external traffic

### Health & Resilience
- readinessProbe / livenessProbe are correct
- startupProbe for a hard start
- PodDisruptionBudget (if critical)
- graceful shutdown (terminationGracePeriodSeconds)
- retries/timeouts on clients

### Resources & Scaling
- requests/limits are defined
- HPA by CPU/Memory and/or custom metrics (if necessary)
- anti-affinity/topology spread (if HA)

### Config & Secrets
- ConfigMap for configs
- Secrets only through k8s secrets / external secret managers (preferably)
- Rotation strategy (especially for DB/3rd-party keys)
- Do not log secrets
- Split per-env values

### Network & Access
- NetworkPolicy (if the cluster supports it)
- RBAC least privilege (service accounts)
- Restrict access to metadata endpoints (if relevant)

###Security posture
- Pod Security Standards / admission policies (baseline/restricted)
- Drop capabilities, seccompProfile, runAsNonRoot
- ImagePullPolicy by release strategy
- Image scanning (in CI) if possible

### Rollout/Rollback
- Strategy: RollingUpdate / Blue-Green / Canary (fix ADR)
- MaxUnavailable/MaxSurge configured- Rollback plan is documented and realistically executable

## Checklist: Observability (must)
- Correlation id (request_id/trace_id)
- Metrics (latency, errors, saturation)
- Tracing (if provided)
- Alerts (errors/latency/degradation)
- Log retention (if required)

## Checklist: Data & DR (if there is a DB/data)
- Backups + retention
- PITR (if necessary)
- Recovery test (periodically)
- RPO/RTO (if specified)

## ADRs (must be recorded)
Create ADR if selected/changed:
- cluster/provider
- rollout strategy (canary/blue-green)
- ingress (nginx/traefik/gateway)
- secrets manager
- security policies (PSS/restricted)
- scaling (HPA/metrics)

## Red flags (P0/P1)
🔴P0:
- containers are launched by root
- secrets got into image/repo
- no readiness/liveness on critical services
- no rollback plan for production deployment
- there are no resource restrictions (requests/limits) and the service is critical

🟠P1:
- no HPA at expected load
- no network policy/RBAC restrictions (if required)

## Response format
### Containerization Plan
### Kubernetes Topology
###Security Posture
### Rollout/Rollback
### Observability
### Required ADRs
### Risks (P0/P1/P2)