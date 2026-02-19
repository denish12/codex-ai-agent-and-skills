---
name: node_express_beast_practices
description: Node.js + Express: REST API, middleware, service layer, repositories, centralized error handling, retries, rate limiting, background tasks, structured logs.
---

# Skill: Node/Express Beast Practices

## Architecture
- REST resources and predictable URLs
- Middleware for cross-sections (auth, rate limit, logging)
- Service layer (business logic)
- Repository layer (data access)

## Errors
- Centralized error handler
- Error validation: 400/401/403/404/409/422/500 per contract
- Secure messages, no leaks

## Reliability
- Retry with backoff for external calls
- Rate limiting for public endpoints
- Background jobs for long operations

## Performance
- avoid N+1
- pagination/batches
- caching (by architecture)

## See also
- Examples: `$dev_reference_snippets`