---
name: cloud-infrastructure-security
description: Security ревью облака/инфры/CI/CD — IAM, secrets manager, сеть, логирование/мониторинг, supply chain, CDN/WAF, backup/DR.
---

# Skill: Cloud & Infrastructure Security

Ревью безопасности облачной инфраструктуры, CI/CD и edge.

**Разделы:**
1. [Когда активировать](#1-когда)
2. [Checklist](#2-checklist)
3. [Platform-Specific Examples](#3-examples)
4. [CI/CD Security Pipeline](#4-cicd)
5. [Pre-Deployment Gate](#5-pre-deploy)
6. [Output Template](#6-output)

---

## 1. Когда активировать

| Триггер | Focus |
|---------|-------|
| Deploy on AWS / GCP / Azure / Vercel / Railway | Full review |
| IAM policies / roles changed | IAM section |
| CI/CD pipeline modified | CI/CD section |
| New infrastructure (Terraform / CloudFormation) | Full review |
| Secrets management setup | Secrets section |
| CDN / WAF configuration | CDN/WAF section |
| Disaster recovery planning | Backup/DR section |
| Docker / K8s deployment | → also apply `$docker-kubernetes-architecture` |

---

## 2. Checklist

### 2.1 IAM & Access Control

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-01 | Least privilege (no `*` in policies) | 🔴 P0 | ☐ |
| INF-02 | MFA for privileged accounts (admin, deploy) | 🔴 P0 | ☐ |
| INF-03 | No root account usage in production | 🔴 P0 | ☐ |
| INF-04 | Service accounts: one per app, minimal scope | 🟠 P1 | ☐ |
| INF-05 | Access review: quarterly, remove stale users | 🟠 P1 | ☐ |
| INF-06 | SSO / federated identity (if org > 5 people) | 🟡 P2 | ☐ |

### 2.2 Secrets Management

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-07 | Platform secret manager (AWS SSM, GCP Secret Manager, Vault, Doppler) | 🟠 P1 | ☐ |
| INF-08 | Rotation plan for DB credentials (90 days max) | 🟠 P1 | ☐ |
| INF-09 | Audit log on secret access | 🟠 P1 | ☐ |
| INF-10 | No secrets in CI logs, build output, Docker images | 🔴 P0 | ☐ |
| INF-11 | `.env` files gitignored, `.env.example` committed | 🔴 P0 | ☐ |

### 2.3 Network Security

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-12 | Database not publicly accessible | 🔴 P0 | ☐ |
| INF-13 | SSH/RDP only through VPN/bastion | 🟠 P1 | ☐ |
| INF-14 | Security groups / firewalls: least privilege (no 0.0.0.0/0 on DB) | 🔴 P0 | ☐ |
| INF-15 | TLS/HTTPS everywhere (no plain HTTP in prod) | 🔴 P0 | ☐ |
| INF-16 | Internal services: private network only | 🟠 P1 | ☐ |

### 2.4 Logging & Monitoring

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-17 | Admin actions audited (who did what, when) | 🟠 P1 | ☐ |
| INF-18 | Log retention ≥ 90 days (or per compliance) | 🟠 P1 | ☐ |
| INF-19 | Alerts on: failed auth attempts, permission changes, unusual traffic | 🟠 P1 | ☐ |
| INF-20 | No PII/secrets in infrastructure logs | 🔴 P0 | ☐ |

### 2.5 CI/CD Pipeline Security

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-21 | OIDC for deploy (no long-lived credentials) | 🟠 P1 | ☐ |
| INF-22 | Secret scanning in CI (secretlint, gitleaks) | 🟠 P1 | ☐ |
| INF-23 | Dependency audit in CI (`npm audit --audit-level=high`) | 🟠 P1 | ☐ |
| INF-24 | Container image scanning (trivy, grype) | 🟠 P1 | ☐ |
| INF-25 | Branch protection: required reviews, no force push | 🟠 P1 | ☐ |
| INF-26 | CI env isolated from production | 🔴 P0 | ☐ |

### 2.6 CDN / WAF / Edge

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-27 | WAF managed rules enabled (OWASP Core Rule Set) | 🟠 P1 | ☐ |
| INF-28 | Rate limiting on public endpoints | 🟠 P1 | ☐ |
| INF-29 | Bot protection / challenge mode | 🟡 P2 | ☐ |
| INF-30 | Security headers at edge (HSTS, X-Frame-Options, CSP) | 🟠 P1 | ☐ |
| INF-31 | Strict TLS 1.2+ (no SSL v3, TLS 1.0/1.1) | 🔴 P0 | ☐ |
| INF-32 | Origin server not directly accessible (CDN proxy only) | 🟠 P1 | ☐ |

### 2.7 Backup & DR

| # | Check | Severity | Status |
|---|-------|----------|--------|
| INF-33 | Automated backups (DB, configs) | 🟠 P1 | ☐ |
| INF-34 | Backup retention defined (30+ days) | 🟠 P1 | ☐ |
| INF-35 | Restore tested (at least once) | 🟠 P1 | ☐ |
| INF-36 | RPO / RTO documented | 🟠 P1 | ☐ |
| INF-37 | PITR enabled (if available) | 🟡 P2 | ☐ |

---

## 3. Platform-Specific Examples

### AWS IAM Policy (least privilege)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-app-uploads/*"
    }
  ]
}
```

```
// ❌ DON'T
"Action": "*"
"Resource": "*"

// ✅ DO
"Action": ["s3:GetObject", "s3:PutObject"]
"Resource": "arn:aws:s3:::specific-bucket/*"
```

### Cloudflare WAF Rule

```
Expression: (http.request.uri.path contains "/api/" and
             not http.request.uri.path contains "/health/")
Action: Challenge
Rate limit: 100 req/min per IP
```

### Security Headers (Cloudflare / Caddy)

```
# Caddy security headers
header {
    X-Content-Type-Options    "nosniff"
    X-Frame-Options           "SAMEORIGIN"
    X-XSS-Protection          "1; mode=block"
    Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Referrer-Policy            "strict-origin-when-cross-origin"
    Permissions-Policy         "camera=(), microphone=(), geolocation=()"
}
```

### Docker Compose Network Isolation

```yaml
services:
  api:
    networks: [frontend, backend]
  gateway:
    networks: [frontend]
  mongo:
    networks: [backend]    # Not accessible from gateway!

networks:
  frontend:
  backend:
    internal: true  # No external access
```

---

## 4. CI/CD Security Pipeline

```yaml
# GitHub Actions security job
security:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    # Secret scanning
    - name: Gitleaks
      uses: gitleaks/gitleaks-action@v2

    # Dependency audit
    - name: npm audit
      run: npm audit --audit-level=high

    # Container scanning
    - name: Trivy
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'app-api:latest'
        severity: 'CRITICAL,HIGH'
        exit-code: '1'

    # SAST (static analysis)
    - name: CodeQL
      uses: github/codeql-action/analyze@v3
```

---

## 5. Pre-Deployment Gate

### Security sign-off checklist

| # | Category | Check | Status |
|---|----------|-------|--------|
| 1 | IAM | Least privilege verified | ☐ |
| 2 | Secrets | All in secret manager, rotation documented | ☐ |
| 3 | Network | DB private, TLS everywhere, firewalls set | ☐ |
| 4 | Logging | Audit logging enabled, no PII | ☐ |
| 5 | CI/CD | Secret scan + dep audit + image scan pass | ☐ |
| 6 | CDN/WAF | WAF rules active, rate limits set | ☐ |
| 7 | Encryption | TLS 1.2+, data at rest encrypted | ☐ |
| 8 | Backup | Backups scheduled, restore tested | ☐ |
| 9 | Runbooks | Deploy, rollback, incident docs exist | ☐ |
| 10 | Incident plan | Contact list, escalation path defined | ☐ |

---

## 6. Output Template

```markdown
# Cloud & Infrastructure Security Review

**Scope:** <infrastructure/platform>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD

## Findings

| # | Severity | Category | Finding | Fix | Status |
|---|----------|----------|---------|-----|--------|
| 1 | 🔴 P0 | Network | MongoDB port 27017 publicly accessible | Restrict to private network | ☐ |
| 2 | 🟠 P1 | CI/CD | No secret scanning in pipeline | Add gitleaks step | ☐ |
| 3 | 🟠 P1 | CDN | No WAF rules configured | Enable OWASP Core Rule Set | ☐ |

## Checklist Summary
| Section | Pass | Fail | Total |
|---------|:----:|:----:|:-----:|
| IAM | 5 | 1 | 6 |
| Secrets | 4 | 1 | 5 |
| Network | 3 | 2 | 5 |
| Logging | 3 | 1 | 4 |
| CI/CD | 4 | 2 | 6 |
| CDN/WAF | 3 | 3 | 6 |
| Backup | 4 | 1 | 5 |

## Pre-Deployment Gate
<section 5 checklist with status>

## Verdict
- ✅ SECURE — all P0 passed, P1 tracked
- ⚠️ CONDITIONAL — fix P0 items before deploy
- ❌ BLOCKED — critical infrastructure vulnerabilities
```

---

## См. также
- `$docker-kubernetes-architecture` — container/K8s security details
- `$k8s-manifests-conventions` — K8s security policies
- `$threat-model-baseline` — application-level threat model
- `$deployment-ci-plan` — CI pipeline setup
