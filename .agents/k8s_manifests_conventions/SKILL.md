---
name: k8s_manifests_conventions
description: Конвенции Kubernetes манифестов: структура репо, Helm/Kustomize, overlays per env, naming/labels, secrets/config, policy, validation, GitOps.
---

# Skill: K8s Manifests Conventions

## Цель
Задать единые конвенции для Kubernetes манифестов и их сопровождения, чтобы:
- инфраструктура была предсказуемой и повторяемой,
- dev/staging/prod отличались только overlays/values,
- было легко делать review/rollout/rollback,
- соблюдались security и policy.

## Когда применять
- Проект разворачивается в Kubernetes или планируется миграция туда.
- Есть несколько компонентов/сервисов или несколько окружений.

## Входы
- Architecture Doc + ADR
- Deployment/CI Plan
- Требования к окружениям (dev/staging/prod), домены, ingress
- Требования к секретам и политике безопасности

## Выходы
- Выбранный подход: Helm / Kustomize / raw manifests (с обоснованием)
- Структура каталогов в репо
- Naming/labels/annotations стандарты
- Правила для Config/Secrets
- Правила для Ingress/Gateway
- Минимальный набор policy/валидаторов
- GitOps/CI проверки (dry-run, lint, schema validation)

## Выбор инструмента (обязательное решение)
Архитектор должен выбрать один из подходов и зафиксировать ADR:

### Option A: Kustomize (часто лучший default)
- overlays для env (dev/staging/prod)
- patchesStrategicMerge / json6902 patches
- простое чтение diff'ов

### Option B: Helm
- шаблонизация, values.yaml per env
- удобно для комплексных чартов/модулей
- нужно следить за читаемостью шаблонов

### Option C: Raw manifests
- допустимо только для очень маленьких проектов
- быстро деградирует при росте env/сервисов

## Рекомендуемая структура репо (пример)

### Если Kustomize
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

### Если Helm
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

## Naming / Labels (обязательные конвенции)
Использовать Kubernetes recommended labels:
- app.kubernetes.io/name
- app.kubernetes.io/instance
- app.kubernetes.io/component
- app.kubernetes.io/part-of
- app.kubernetes.io/version
- app.kubernetes.io/managed-by

Минимум:
- все ресурсы должны иметь единый набор labels для селекторов, алертов и поиска.

## Secrets / Config (строго)
### Config
- ConfigMap для конфигов без секретов
- разделять per-env только overlays/values

### Secrets
- не хранить plaintext секреты в репо
- предпочтение: external secret manager (AWS Secrets Manager, GCP Secret Manager, Vault, Doppler и т.п.)
- если используете k8s Secrets:
  - base64 не считать безопасностью
  - ограничить доступ RBAC
  - включить rotation план

### Запрет
- секреты в Docker image
- секреты в Helm values в plaintext в git
- логирование секретов

## Ingress / Gateway (обязательное)
- зафиксировать ingress controller (nginx/traefik/gateway api) в ADR
- TLS обязателен для prod
- rate limiting / WAF — если предусмотрено security baseline
- security headers — если это часть edge политики

## Probes / Resources (must)
- readinessProbe + livenessProbe обязательны для сервисов, которые принимают трафик
- requests/limits обязательны для prod
- terminationGracePeriodSeconds + graceful shutdown
- HPA если ожидается переменная нагрузка или SLA

## Policy / Security (must)
- Pod Security Standards (baseline/restricted) — зафиксировать уровень
- runAsNonRoot, seccompProfile, drop capabilities
- RBAC least privilege (service account per app)
- NetworkPolicy (если кластер поддерживает) — определить минимум

## CI / Validation (must)
Добавить проверки (по возможности):
- `kubectl apply --dry-run=server` (или эквивалент)
- schema validation (kubeconform/kubeval)
- lint (helm lint / kustomize build)
- policy checks (conftest/OPA, kyverno validate) — если используете policies
- image scanning/SBOM — если в пайплайне

## GitOps (опционально, но рекомендовано)
- ArgoCD / Flux, если нужно управлять env'ами как декларативным состоянием
- задокументировать процесс promotion dev→staging→prod

## Red Flags
🔴 P0:
- секреты в репо/values/image
- нет probes на критичном сервисе
- нет requests/limits в prod
- отсутствует единый labels/naming (сломает ops/monitoring)
- непонятно, как делать rollback

🟠 P1:
- env различаются “ручными правками” вместо overlays/values
- нет CI validation на манифесты

## Формат ответа архитектора
### Chosen Approach (Helm/Kustomize/Raw) + ADR reference
### Repo Structure
### Naming & Labels
### Secrets/Config Strategy
### Ingress Strategy
### Policy & Security Baseline
### CI Validation Checklist
### Risks (P0/P1/P2)
