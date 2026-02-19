---
name: cloud_infrastructure_security
description: Security review of cloud/infra/CI/CD: IAM, secrets manager, network, logging/monitoring, supply chain, CDN/WAF, backup/DR.
---

#Skill: Cloud & Infrastructure Security

## When to activate
- Deploy to AWS/Vercel/Railway/Cloudflare, etc.
- IAM policies/roles
- CI/CD pipelines
- IaC (Terraform/CloudFormation)
- Secrets management in the cloud
- CDN/WAF/edge security
- Backup/Recovery/DR

## Cloud Security Checklist
1) IAM & Access Control
- least privilege, no wildcard
- MFA for privileged accounts
- no root usage in prod
- regular access review

2) Secrets Management
- platform secrets manager
- rotation for DB credentials (if applicable)
- audit of access to secrets
- prohibition of leaks in logs/errors

3) Network Security
- DB is not public
- SSH/RDP only via VPN/bastion
- security groups/NACL least privilege
- flow logs (if available)

4) Logging & Monitoring
- audit of admin actions
- log retention (for example 90+ days if necessary)
- alerts for anomalies/failed auth

5) CI/CD Pipeline Security
- OIDC instead of long-lived credentials
- secret scanning
- dependency audit
- image scanning (if containers)
- branch protection / required reviews

6) CDN/WAF (Cloudflare and analogues)
- WAF managed rules (OWASP)
- rate limiting/bot protection
- security headers
- strict TLS

7) Backup & Disaster Recovery
- automated backups + retention
- PITR (if necessary)
- periodic recovery testing
- documented RPO/RTO

## Pre-Deployment Checklist (short)
IAM / Secrets / Network / Logging / Monitoring / CI/CD / WAF / Encryption / Backups / Runbooks / Incident plan

## Exit
- Findings P0/P1/P2 + specific fixes/settings
- What to add to CI and what checks are required

## See also
- Examples and anti-examples: $review_reference_snippets