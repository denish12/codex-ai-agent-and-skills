---
name: cloud_infrastructure_security
description: Security ревью облака/инфры/CI/CD: IAM, secrets manager, сеть, логирование/мониторинг, supply chain, CDN/WAF, backup/DR.
---

# Skill: Cloud & Infrastructure Security

## Когда активировать
- Deploy на AWS/Vercel/Railway/Cloudflare и т.п.
- IAM политики/роли
- CI/CD пайплайны
- IaC (Terraform/CloudFormation)
- Secrets management в облаке
- CDN/WAF/edge security
- Backup/Recovery/DR

## Cloud Security Checklist
1) IAM & Access Control
- least privilege, без wildcard
- MFA для privileged аккаунтов
- без root usage в prod
- регулярный access review

2) Secrets Management
- secrets manager платформы
- rotation для DB credentials (если применимо)
- аудит доступа к секретам
- запрет утечек в логи/ошибки

3) Network Security
- DB не публичная
- SSH/RDP только через VPN/bastion
- security groups/NACL least privilege
- flow logs (если доступно)

4) Logging & Monitoring
- аудит админ-действий
- лог retention (например 90+ дней при необходимости)
- алерты на аномалии/failed auth

5) CI/CD Pipeline Security
- OIDC вместо long-lived credentials
- secret scanning
- dependency audit
- image scanning (если контейнеры)
- branch protection / required reviews

6) CDN/WAF (Cloudflare и аналоги)
- WAF managed rules (OWASP)
- rate limiting/bot protection
- security headers
- strict TLS

7) Backup & Disaster Recovery
- automated backups + retention
- PITR (если нужно)
- периодическое тестирование восстановления
- documented RPO/RTO

## Pre-Deployment Checklist (коротко)
IAM / Secrets / Network / Logging / Monitoring / CI/CD / WAF / Encryption / Backups / Runbooks / Incident plan

## Выход
- Findings P0/P1/P2 + конкретные фиксы/настройки
- Что добавить в CI и какие проверки обязательны

## См. также
- Примеры и анти-примеры: $review_reference_snippets
