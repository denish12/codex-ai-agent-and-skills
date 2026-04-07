# Stitch Generation Budget Planner

## Monthly limits

| Mode | Limit | Average spend per screen | Screens per month |
|------|-------|--------------------------|-------------------|
| Standard (Flash) | ~350 | 3–6 generations | ~60–115 screens |
| Experimental (Pro) | ~50 | 3–5 generations | ~10–16 screens |

## Recommended allocation for SCR

| Task | Mode | Generations | Notes |
|------|------|-------------|-------|
| New popup template | Standard | ~5 | Initial pass + 2 iterations + 2 states |
| Final popup version | Experimental | ~3 | With HTML reference as input |
| Dashboard page | Standard | ~8 | More complex than a popup |
| State coverage | Standard | ~8 | 4 × (generation + iteration) |

## Cost-saving strategy
1. Standard first, Experimental last
2. Save prompts for predictable reruns
3. Batch state generation per screen
4. Reuse the same style block for consistency
