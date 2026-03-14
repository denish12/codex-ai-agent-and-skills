---
description: Auto-restart affected Docker containers after code changes
---

# Auto-Restart Affected Containers

After **any code change** to a file inside one of the application source directories, the corresponding Docker service **must be restarted** automatically without asking the user.

## Source -> Service Mapping

Do not hardcode service or container names from a specific product.

For the current repository:

1. Inspect the active Docker Compose file (`docker-compose.yml`, `docker-compose.yaml`, `compose.yml`, or `compose.yaml`).
2. Identify which service owns the changed source path by checking:
   - `build.context`
   - bind-mounted `volumes`
   - existing service naming conventions in the repo
3. Restart the matching Compose service name, not a project-specific container name.

Infrastructure-only changes (`infra/`, compose files, reverse proxy config) do **not** trigger an app-service restart by this workflow.
Config/env-only changes do **not** trigger an app-service restart by this workflow.

## Steps

1. After editing file(s), determine which app or package directory was affected.
2. Map that path to the Docker Compose service for the current project.
3. Run the restart command:

// turbo
```
docker compose restart <service_name>
```

Example: if `apps/frontend/src/components/SomeComponent.jsx` belongs to the `frontend` service:
```
docker compose restart frontend
```

4. If **multiple** services were affected, restart all of them in one command:

// turbo
```
docker compose restart <service_one> <service_two>
```

5. Do **not** ask the user for permission - this is a turbo step.
6. Wait for the restart to complete before reporting results.

## Important Notes

- The working directory for `docker compose` must be the project root that contains the active Compose file.
- Use Compose service names, not Docker container names, because container names are project-specific.
- Shared infrastructure services such as a gateway, proxy, or database usually do **not** need restart for ordinary app-level code changes unless the edited files directly affect them.
- This workflow is **implicit** - it runs as part of any development task, not as a standalone action.
