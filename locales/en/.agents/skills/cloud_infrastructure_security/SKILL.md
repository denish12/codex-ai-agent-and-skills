---
name: cloud_infrastructure_security
description: Cloud/Infra/CI/CD Security Review — IAM, secrets manager, network, logging/monitoring, supply chain, CDN/WAF, backup/DR.
---

# Skill: Cloud Infrastructure Security Review

Security review for cloud environments, infrastructure as code, and CI/CD pipelines.

**Sections:**
1. [Workflow](#1-workflow)
2. [Checklist (Cloud Security Baseline)](#2-checklist)
3. [Verification Methods](#3-methods)
4. [Red Flags](#4-red-flags)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Get the architecture context (from $architecture_doc & $deployment_ci_plan)
   └── Hosting platform, CI/CD tools, external services

2. For each cloud security domain:
   a. IAM & Authentication
   b. Secrets Management
   c. Network Security & Boundaries
   d. Logging & Monitoring
   e. Compute & Container Security
   f. CI/CD Supply Chain Security

3. Review configuration files (IaC, manifests, workflow files)
   └── Search for hardcoded secrets, misconfigurations

4. Formulate the Security Gap Report (Output Template)
```

---

## 2. Checklist (Cloud Security Baseline)

### 2.1 IAM & Authentication

| # | Check | Severity | Status |
|---|-------|----------|--------|
| CLOUD-01 | Principle of Least Privilege (PoLP) enforced for all roles | 🔴 P0 | ☐ |
| CLOUD-02 | No shared accounts/credentials used | 🔴 P0 | ☐ |
| CLOUD-03 | MFA enforced for all console access | 🔴 P0 | ☐ |
| CLOUD-04 | Service Accounts instead of user credentials for automation | 🔴 P0 | ☐ |

### 2.2 Secrets Management

| # | Check | Severity | Status |
|---|-------|----------|--------|
| CLOUD-05 | Secrets stored in a dedicated Secret Manager (Vault, AWS Secrets, GitHub Secrets) | 🔴 P0 | ☐ |
| CLOUD-06 | NO hardcoded credentials in source code or `Dockerfile` | 🔴 P0 | ☐ |
| CLOUD-07 | Environment variables not exposing secrets (e.g., in React frontend code) | 🔴 P0 | ☐ |
| CLOUD-08 | Audit trail for secret access enabled | 🟠 P1 | ☐ |

### 2.3 Network Security & Boundaries

| # | Check | Severity | Status |
|---|-------|----------|--------|
| CLOUD-09 | Default deny inbound traffic rules | 🔴 P0 | ☐ |
| CLOUD-10 | Databases NOT exposed to the public internet | 🔴 P0 | ☐ |
| CLOUD-11 | WAF / DDoS protection active for public endpoints | 🟠 P1 | ☐ |
| CLOUD-12 | TLS 1.2+ enforced for all in-transit data (HTTPS) | 🔴 P0 | ☐ |
| CLOUD-13 | Private network/VPC/Subnets used to isolate layers | 🟠 P1 | ☐ |

### 2.4 Logging & Monitoring

| # | Check | Severity | Status |
|---|-------|----------|--------|
| CLOUD-14 | Centralized logging for all infrastructure components | 🟠 P1 | ☐ |
| CLOUD-15 | Access logs enabled on storage buckets / databases | 🟡 P2 | ☐ |
| CLOUD-16 | Alerts configured for critical security events (failed logins, root access) | 🟠 P1 | ☐ |

### 2.5 Compute & Container Security

| # | Check | Severity | Status |
|---|-------|----------|--------|
| CLOUD-17 | Containers do NOT run as `root` user | 🔴 P0 | ☐ |
| CLOUD-18 | Minimal base images used (e.g., `alpine`, `distroless`) | 🟠 P1 | ☐ |
| CLOUD-19 | Read-only root filesystem where possible | 🟡 P2 | ☐ |

### 2.6 CI/CD & Supply Chain

| # | Check | Severity | Status |
|---|-------|----------|--------|
| CLOUD-20 | Dependency scanning (SCA) active in CI | 🔴 P0 | ☐ |
| CLOUD-21 | SAST (Static Analysis) tools running on PRs | 🟠 P1 | ☐ |
| CLOUD-22 | Secrets scanning active (preventing commits with secrets) | 🔴 P0 | ☐ |
| CLOUD-23 | Branch protection rules: Require PR reviews, disallow direct commits to `main` | 🔴 P0 | ☐ |

---

## 3. Verification Methods

### Grep patterns for misconfigurations

```bash
# 🔴 P0: Detect Hardcoded Secrets (General patterns)
grep_search: Query="password\s*=\s*[\"'][^\"']+[\"']" IsRegex=true
grep_search: Query="secret\s*=\s*[\"'][^\"']+[\"']" IsRegex=true
grep_search: Query="token\s*=\s*[\"'][a-zA-Z0-9_\-]+[\"']" IsRegex=true
grep_search: Query="api[_-]?key\s*=\s*[\"'][a-zA-Z0-9_\-]+[\"']" IsRegex=true

# 🔴 P0: Dockerfile running as root
grep_search: Query="USER root" Includes=["Dockerfile*"]
# Verify if there is a 'USER node' (or similar non-root) at the end of Dockerfile

# 🔴 P0: Exposed database ports in Docker Compose
grep_search: Query="\"27017:27017\"" Includes=["docker-compose.yml"]
grep_search: Query="\"5432:5432\"" Includes=["docker-compose.yml"]

# 🟠 P1: Missing SCA/vuln checks in GitHub Actions
grep_search: Query="npm audit" Includes=[".github/workflows/*"]
grep_search: Query="dependabot" Includes=[".github/workflows/*"]
```

---

## 4. Red Flags

| Red Flag | Description | Severity | Fix |
|----------|-------------|----------|-----|
| **Public Database** | DB port (e.g., 5432, 27017) bound to `0.0.0.0` or open in Security Group | 🔴 P0 | Bind to localhost (`127.0.0.1`) or inside private VPC. |
| **Secrets in code** | AWS keys, API tokens committed to repository | 🔴 P0 | Revoke immediately. Use `.env` file + secret manager. |
| **Full Admin IAM** | Workloads or user roles have `AdministratorAccess` wildcard (`*`) | 🔴 P0 | Scope down to specific actions and resources (PoLP). |
| **Root Containers** | Docker images running as default `root` | 🔴 P0 | Add `USER node` (or equivalent) in Dockerfile. |
| **No Branch Protection** | Main branch accepts direct commits without review | 🔴 P0 | Enforce PRs and 1+ reviewers in GitHub settings. |

---

## 5. Output Template

```markdown
# Cloud Infrastructure Security Review

**Scope:** <Infrastructure repo / CI/CD pipeline / Module>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD
**Reference:** $deployment_ci_plan, $docker_kubernetes_architecture

## Findings Summary

- **Total Checks Assessed:** X
- **P0 Blockers:** Y
- **P1 Concerns:** Z
- **P2 Recommendations:** W

## Detailed Findings

| # | Severity | Check Code | File/Component | Finding Description | Fix Recommended |
|---|----------|------------|----------------|---------------------|-----------------|
| 1 | 🔴 P0 | CLOUD-06 | `docker-compose.yml` | DB password hardcoded (`MYSQL_PASSWORD=root`) | Inject via `.env` file and Docker Secrets. |
| 2 | 🔴 P0 | CLOUD-17 | `Dockerfile` | Image runs as root | Add `USER node` before `CMD`. |
| 3 | 🟠 P1 | CLOUD-21 | `.github/workflows/ci.yml` | No SAST/SCA step in pipeline | Add `npm audit` or CodeQL step to CI. |
| 4 | 🟡 P2 | CLOUD-19 | `deployment.yaml` | Root FS is writable | Mount specific paths as writeable, set `readOnlyRootFilesystem: true`. |

## Compliance Overview (by Domain)

| Domain | Status |
|--------|:------:|
| IAM & Auth | ✅ |
| Secrets Management | ❌ |
| Network Security | ✅ |
| Logging & Monitoring | ⚠️ |
| Compute/Containers | ❌ |
| CI/CD & Supply Chain | ⚠️ |

## Verdict
- [ ] **PASS** - Cloud baseline met. Safe to deploy.
- [ ] **WARN** - Minor deviations (P1/P2). Fix before next release.
- [x] **FAIL** - Critical P0 issues found. Do NOT deploy until fixed.
```

---

## See also
- `$deployment_ci_plan` — The plan this review acts upon.
- `$docker_kubernetes_architecture` — Best practices for containerization.
- `$dependency_supply_chain_review` — Deeper dive into SCA and dependencies.
- `$security_review_baseline` — AppSec layer (complementary to this Cloud/Infra layer).
