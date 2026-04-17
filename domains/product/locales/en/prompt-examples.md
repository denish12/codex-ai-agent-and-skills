# Prompt Examples — Product Management Domain

## When to use which workflow

| Task | Workflow |
|--------|----------|
| New direction, need strategy + full plan → release + PDF | `/ship-right-thing` |
| Strategy is clear, need to decide **what and how much** to include in scope | `/shape-prioritize` |
| Write a PRD for a ready decision (strategy + scope are defined) | `/spec` |
| Quick product assessment, 1–2 hours | `/quick-pm` |

## Invocation templates

### Full A — `/ship-right-thing`
```
/ship-right-thing

Context: B2B SaaS, [product description, ARR, segment].
Question: Should we build [initiative]? For whom, why, what's the business case, and what's the full plan?

Attachments: [customer data, competitor info, revenue numbers]
```

### Full B — `/shape-prioritize`
```
/shape-prioritize

Context: [approved strategy + roadmap theme]
Question: What's the right MVP scope for [feature/initiative]? What do we cut?

Constraints: [team size, timeline, tech constraints]
```

### Spec — `/spec`
```
/spec

Initiative: [name]
Strategy context: [approved]
Scope decision: [approved]
Output: PRD with user stories, acceptance criteria, NFR, rollout plan
```

### Quick — `/quick-pm`
```
/quick-pm

Question: [focused PM question]
Depth: 1 session, no adversarial debate
```

## B2B SaaS request examples

1. **Discovery-heavy strategic:**
   > "We are a B2B SaaS in HR-tech, $5M ARR, 120 clients (SMB + mid-market). We see growing interest from enterprise. Should we pivot to enterprise or double down on SMB? We need a full plan with discovery, alternatives, and a PRD for the first step."
   → `/ship-right-thing`

2. **Scope debate:**
   > "We approved the feature: native Slack integration. Backend estimated 3–6 sprints. We need to finalize the scope for the Q2 launch while keeping the 5-week pipeline."
   → `/shape-prioritize`

3. **PRD for a ready decision:**
   > "Scope is approved: SSO via SAML + SCIM provisioning. We need a PRD with user stories, acceptance criteria, and a launch plan."
   → `/spec`

4. **Quick assessment:**
   > "Should we add dark mode? How many clients are requesting it, and what's the impact on retention?"
   → `/quick-pm`

## Anti-patterns

| Mistake | Correct approach |
|--------|-----------|
| Running `/ship-right-thing` for a simple fix | Use `/quick-pm` or go straight to `/spec` |
| Skipping Discovery and writing a PRD immediately | Discovery surfaces JTBD and assumptions — without them a PRD is built in a vacuum |
| Ignoring the adversarial result | Mediator synthesis is a mandatory input into the PM session |
| Mixing Customer-vs-Business and Build-vs-Cut in one session | Different pipelines, different axes — run them sequentially |
