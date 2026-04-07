---
description: Auto-restart affected Docker containers after code changes
---

# Auto-Restart Affected Containers

After any code change inside one of the application source directories, the corresponding Docker container must be restarted automatically.

## Source → Container Mapping

| Source directory | Docker service name | Container name |
|-----------------|---------------------|----------------|
| `apps/api/` | `api` | `smart-cart-api` |
| `apps/dashboard/` | `dashboard` | `smart-cart-dashboard` |
| `apps/widget/` | `widget` | `smart-cart-widget` |

Infrastructure files (`infra/`, `docker-compose.yml`) and config/env-only changes do not trigger auto-restart.

## Steps
1. Determine which `apps/` directory changed.
2. Map it to the Docker service.
3. Run `docker compose restart <service_name>` from the project root.
4. If multiple services changed, restart them together.
5. Wait for restart completion before reporting results.
