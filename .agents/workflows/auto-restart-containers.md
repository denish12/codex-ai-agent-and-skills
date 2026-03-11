---
description: Auto-restart affected Docker containers after code changes
---

# Auto-Restart Affected Containers

After **any code change** to a file inside one of the application source directories, the corresponding Docker container **must be restarted** automatically — without asking the user.

## Source → Container Mapping

| Source directory | Docker service name | Container name |
|-----------------|---------------------|----------------|
| `apps/api/`     | `api`               | `smart-cart-api` |
| `apps/dashboard/` | `dashboard`       | `smart-cart-dashboard` |
| `apps/widget/`  | `widget`            | `smart-cart-widget` |

Infrastructure files (`infra/`, `docker-compose.yml`) do **not** trigger auto-restart.
Config/env-only changes do **not** trigger auto-restart.

## Steps

1. After editing file(s), determine which `apps/` subdirectory was affected.
2. Map to the Docker service using the table above.
3. Run the restart command:

// turbo
```
docker compose restart <service_name>
```

Example: if `apps/dashboard/src/components/SomeComponent.jsx` was changed:
```
docker compose restart dashboard
```

4. If **multiple** services were affected (e.g. API + Dashboard), restart all of them in one command:

// turbo
```
docker compose restart api dashboard
```

5. Do **not** ask the user for permission — this is a turbo step.
6. Wait for the restart to complete before reporting results.

## Important Notes

- The working directory for `docker compose` must be the project root: `e:\Light-Tech\Web\smart-cart-rescue`
- Gateway (`caddy`) does **not** need restart for app-level code changes.
- MongoDB does **not** need restart for code changes.
- This workflow is **implicit** — it runs as part of any development task, not as a standalone action.
