---
name: docker_kubernetes_architecture
description: Архитектура контейнеризации и Kubernetes: Dockerfile best practices, k8s manifests, security, scaling, rollout, observability, CI/CD.
---

# Skill: Docker & Kubernetes Architecture

## Цель
Спроектировать и задокументировать контейнеризацию и деплой в Kubernetes так, чтобы:
- сборки были воспроизводимыми и безопасными,
- окружения (dev/staging/prod) были консистентны,
- приложение масштабировалось и обновлялось без простоя (по выбранной стратегии),
- были понятные runbooks, rollback и observability.

## Когда применять
- Проект деплоится в Docker / Kubernetes (self-hosted, cloud k8s, on-prem).
- Есть микросервисы/несколько компонентов.
- Нужны горизонтальное масштабирование, HPA, blue-green/canary.
- Требуются строгие меры безопасности/комплаенса.

Если деплой будет без контейнеров (Vercel-only и т.п.) — skill не обязателен.

## Входы
- Architecture Doc + ADR
- Deployment/CI Plan
- Non-functional requirements (SLA, perf, security, cost)
- Tech stack (FE/BE/DB/queues)

## Выходы (артефакты)
- Containerization plan:
  - базовые Dockerfile правила и стандарты
  - стратегия build/run (multi-stage, non-root)
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
### Build
- Multi-stage build (builder → runtime)
- Reproducibility: lockfile + фиксированные версии
- Минимальный runtime image (alpine/distroless — по уместности)
- Cache-friendly слои (dependencies раньше исходников)
- SBOM/скан (если есть пайплайн)

### Runtime security
- Non-root user (USER), минимальные права
- Read-only filesystem где возможно
- Не копировать секреты в image
- Healthcheck (если применимо)
- Чёткое разделение build args vs runtime env

### Logging
- Логи в stdout/stderr (12-factor)
- Никаких секретов/PII

## Checklist: Kubernetes (must)
### Workloads
- Deployment для stateless сервисов
- StatefulSet для stateful (если нельзя вынести state в managed DB)
- Разделение по namespaces (dev/staging/prod)
- Service (ClusterIP), Ingress/Gateway для внешнего трафика

### Health & Resilience
- readinessProbe / livenessProbe корректны
- startupProbe для тяжёлого старта
- PodDisruptionBudget (если критично)
- graceful shutdown (terminationGracePeriodSeconds)
- retries/timeouts на клиентах

### Resources & Scaling
- requests/limits определены
- HPA по CPU/Memory и/или custom metrics (если нужно)
- anti-affinity/topology spread (если HA)

### Config & Secrets
- ConfigMap для конфигов
- Secrets только через k8s secrets / внешние secret managers (желательно)
- Rotation стратегия (особенно для DB/3rd-party keys)
- Не логировать секреты
- Разделить per-env значения

### Network & Access
- NetworkPolicy (если кластер поддерживает)
- RBAC least privilege (service accounts)
- Ограничить доступ к metadata endpoints (если актуально)

### Security posture
- Pod Security Standards / admission policies (baseline/restricted)
- Drop capabilities, seccompProfile, runAsNonRoot
- ImagePullPolicy по стратегии релиза
- Image scanning (в CI) по возможности

### Rollout / Rollback
- Стратегия: RollingUpdate / Blue-Green / Canary (зафиксировать ADR)
- MaxUnavailable/MaxSurge настроены
- Rollback plan документирован и реально исполним

## Checklist: Observability (must)
- Correlation id (request_id/trace_id)
- Metrics (latency, errors, saturation)
- Tracing (если предусмотрено)
- Alerts (ошибки/latency/деградация)
- Log retention (если требования)

## Checklist: Data & DR (если есть БД/данные)
- Backups + retention
- PITR (если нужно)
- Тест восстановления (периодически)
- RPO/RTO (если задано)

## ADRs (обязательно фиксировать)
Создать ADR если выбирается/меняется:
- кластер/провайдер
- стратегия rollout (canary/blue-green)
- ingress (nginx/traefik/gateway)
- secrets manager
- политики безопасности (PSS/restricted)
- масштабирование (HPA/metrics)

## Red flags (P0/P1)
🔴 P0:
- контейнеры запускаются root
- секреты попали в image/репо
- нет readiness/liveness на критичных сервисах
- нет rollback plan при прод-деплое
- нет ограничений ресурсов (requests/limits) и сервис критичен

🟠 P1:
- нет HPA при ожидаемой нагрузке
- нет network policy/RBAC ограничений (если требуется)

## Формат ответа
### Containerization Plan
### Kubernetes Topology
### Security Posture
### Rollout/Rollback
### Observability
### Required ADRs
### Risks (P0/P1/P2)
