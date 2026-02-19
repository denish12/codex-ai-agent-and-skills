---
name: performance_review_baseline
description: Basic perf review: N+1, pagination, batches, extra requests, architectural cache, heavy operations in the request-path.
---

#Skill: Performance Review Baseline

## Check
- N+1 queries / non-optimal selections
- No pagination where the list can be large
- Extra round-trips (can be batch)
- Heavy operations in synchronous request-path (need async/queue?) - only if the architecture allows
- Caching is applied where it was intended (and safe)

## Exit
- Bottlenecks (P1/P2 usually, P0 if it breaks SLA/UX)
- Optimization recommendations without premature optimization