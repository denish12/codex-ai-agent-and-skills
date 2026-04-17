---
name: acceptance-criteria
description: Acceptance criteria — Gherkin (Given / When / Then) or scenario-based
---
# Acceptance Criteria

> **Category:** Specification  ·  **Slug:** `acceptance-criteria`

## When to Use

- For each user story in the PRD.
- As a contract between PM and Engineering.
- For QA test cases (AC → test scenarios).
- When disputes arise about "is the story done?" — AC = the oracle.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| User story | ✅ | Via `$user-story` |
| UX flow / wireframe | ⬚ | If flow is complex |
| Edge cases | ⬚ | Error states, limits |
| Data constraints | ⬚ | Validation rules |

## Data Sources

1. User story — as starting point.
2. UX wireframes — visual cues for scenarios.
3. NFR requirements — for non-functional AC.
4. Customer interviews — user edge cases.

### Related Skills

| Skill | What we take | When to call |
|-------|-------------|--------------|
| `user-story` | Story → AC scenarios | Parent skill |
| `user-flow` | Flow steps → scenarios | For complex flows |
| `prd-template` | Where in PRD | Embedded in stories |
| `hypothesis-template` | Testable behavior | For experiment stories |

## Two Formats

### A. Gherkin (Given / When / Then)

```gherkin
Scenario: [Short descriptive name]
  Given [initial context / precondition]
  When [action / event]
  Then [expected outcome]
  And [additional outcome]
```

Pros: structured, test-tool-friendly (Cucumber), BDD-style.  
Cons: verbose, not flexible for complex data.

### B. Scenario-based checklist

```
## Scenario: [Name]
- Precondition: [state]
- Action: [user does X]
- Expected: [outcome]
- Error case: [what happens when X fails]
```

Pros: flexible, readable for non-tech stakeholders.  
Cons: less rigorous, not directly automatable.

**Choice:** Gherkin for complex behavior (especially API / backend), scenario for UX-heavy stories.

## Protocol

### Step 1 — Happy Path First

Sketch happy path scenario. This is the primary flow that 80% of users experience.

```gherkin
Scenario: Admin creates a new team role
  Given an admin is on the Teams settings page
  When they click "New role template"
  And fill in name "Senior Engineer" and select 12 permissions
  And click "Save"
  Then the role is saved
  And appears in roles list
  And is selectable when adding new team members
```

### Step 2 — Preconditions

Each scenario — what must be true before it. Avoid implicit assumptions.

Preconditions to capture:
- User auth state (logged in, role, permissions)
- Data state (existing entities, counts)
- Feature flags
- Time / date (for time-sensitive features)

### Step 3 — Edge Cases

For each story — think about:
- **Empty state:** no data, first-time user
- **Boundary values:** 0, 1, max, max+1
- **Concurrency:** two users act simultaneously
- **Permissions:** user without permission attempts action
- **Network:** offline, slow, timeout
- **Validation:** invalid input, XSS, injection
- **Idempotency:** same action twice

B2B-specific edge cases:
- SSO edge cases (user deprovisioned in IdP)
- Admin without permission attempts restricted action
- Integration failures (3rd party down)
- Rate limits / quotas

### Step 4 — Error Scenarios

For each user-facing failure mode:
- What triggers it
- What the user sees (error message, recovery action)
- System state afterwards (logged? retryable?)

```gherkin
Scenario: Save fails due to name conflict
  Given a role named "Senior Engineer" exists
  When admin tries to create role with same name
  Then display error "Role name already exists"
  And do not save
  And focus name field for correction
```

### Step 5 — Non-functional Scenarios

Separate AC for NFR if applicable:

```gherkin
Scenario: Role creation — performance
  Given a team with 500 existing roles
  When admin adds a new role
  Then response returns < 500ms p95
```

```gherkin
Scenario: Role creation — audit
  When any role is created, updated, or deleted
  Then an audit log entry is written with user id, timestamp, before/after diff
```

### Step 6 — Data Variation

For data-driven AC, use tables:

```gherkin
Scenario Outline: Role validation rejects invalid names
  Given admin is creating a role
  When they enter name "<name>"
  Then they see error "<error>"

Examples:
  | name                          | error                           |
  | ""                            | Name is required                |
  | [255 char string]             | Name must be < 255 characters   |
  | "admin"                       | Name conflicts with system role |
  | "<script>alert(1)</script>"   | Name has invalid characters     |
```

### Step 7 — "Ready" Checklist

- [ ] Happy path scenario
- [ ] Edge cases covered (empty / boundary / concurrency / permission)
- [ ] Error scenarios with messages
- [ ] Preconditions explicit
- [ ] Data variation for validation rules
- [ ] NFR (if applicable) separately
- [ ] No ambiguous language ("fast", "user-friendly")

## Validation (Quality Gate)

- [ ] Each story has ≥ 1 AC
- [ ] Happy path covered
- [ ] ≥ 2 edge cases (unless trivial story)
- [ ] ≥ 1 error scenario
- [ ] Preconditions explicit
- [ ] No ambiguous verbs ("should work properly")
- [ ] NFR AC for performance/security/compliance-critical stories
- [ ] Format (Gherkin or scenario) consistent per PRD

## Handoff

The result is the input for:
- **Engineering** → implementation + test writing
- **QA** → automated test cases
- **Designer** → error state mockups

Format: AC embedded in user story card. Via `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Ambiguous ("fast", "easy") | Not testable | Specific thresholds |
| Only happy path | Bugs in edges | ≥ 2 edge cases |
| Implementation-specific | "Click blue button" | "When user saves" (UI-agnostic) |
| Mix AC with implementation notes | Confuses contract | Notes separate |
| Too many scenarios (20+) | Maintenance burden | Split story instead |
| Missing NFR AC | Deal-breaker bugs ship | NFR explicit |
| No error messages defined | Inconsistent UX | Specific copy per error |

## Template

```markdown
## Story: [Title]

### Acceptance Criteria

**Happy path:**
```gherkin
Scenario: [name]
  Given [precondition]
  When [action]
  Then [outcome]
  And [outcome]
```

**Edge cases:**
```gherkin
Scenario: [edge case name]
  Given [precondition]
  When [action]
  Then [outcome]
```

**Error scenarios:**
```gherkin
Scenario: [error name]
  Given [precondition]
  When [failing action]
  Then [error message]
  And [recovery]
```

**NFR (if applicable):**
```gherkin
Scenario: Performance
  When [action]
  Then response < 200ms p95
```
```

## Worked Example — TeamFlow AC: Story S2 "Receive AI Summary Within 60 Seconds"

**Context:** Full Gherkin AC for the flagship story (S2 from user-story skill). Demonstrates happy path + boundary + errors + NFR + data variation.

```gherkin
# Acceptance Criteria: S2 Receive AI Summary Within 60 Seconds

# ============ HAPPY PATH ============

Scenario: Manager ends 1:1, AI generates summary within 60 seconds
  Given Maria is on Team Tier account (AI Summarization enabled)
  And Maria has AI-enabled 1:1 meeting "Sarah weekly sync" starting 10:00 AM
  And meeting includes 23 minutes of recorded audio
  When Maria clicks "End meeting" at 10:23 AM
  Then within 60 seconds summary appears in meeting notes view
  And summary includes sections: "Topics discussed", "Decisions", "Action items"
  And action items list contains ≥ 1 extracted item (if discussion mentioned commitments)
  And summary status is "Draft (AI)" (not "Approved")
  And event "ai_summary_generated" logged with meeting_id, duration, summary_id


# ============ STREAMING / LOADING ============

Scenario: Summary streams progressively if generation exceeds 10 seconds
  Given Maria ended meeting successfully
  When summary generation takes 35 seconds
  Then loading indicator shows by 5th second
  And first "Topics discussed" section appears as soon as generated (streaming)
  And remaining sections populate progressively
  And manager can read early sections without waiting for complete summary


# ============ BOUNDARY: MEETING DURATION ============

Scenario Outline: Summary behavior by meeting duration
  Given Maria ended 1:1 meeting of <duration> minutes
  When summary generation completes
  Then summary section behavior is <behavior>

  Examples:
    | duration | behavior                                                              |
    | 0-4      | No summary generated — "Meeting too short for summary" message shown  |
    | 5-14     | Brief summary (2-3 topics, action items if explicit)                  |
    | 15-45    | Full standard summary (all sections populated)                        |
    | 46-120   | Extended summary with "Key themes" section added                      |
    | 121+     | Summary generated with note "Very long meeting — review carefully"    |


# ============ ERROR SCENARIOS ============

Scenario: LLM API timeout — user sees fallback
  Given Maria ended AI-enabled meeting
  When LLM API does not return summary within 120 seconds (hard timeout)
  Then manager sees message "Summary taking longer than expected — we'll email you when ready"
  And event "ai_summary_timeout_fallback" logged
  And background job continues attempting generation
  And on success, manager receives in-product notification + email with summary

Scenario: LLM API hard error — graceful degradation
  Given Maria ended AI-enabled meeting
  When primary LLM provider returns 500 error after 3 retries
  Then system automatically switches to secondary provider (Anthropic)
  And event "ai_provider_failover" logged for ops review
  And summary generates using secondary with quality parity

Scenario: Complete LLM failure (both providers) — manual fallback
  Given Maria ended AI-enabled meeting
  When both LLM providers unavailable for > 2 minutes
  Then manager sees "AI summary unavailable this meeting — manual notes preserved"
  And existing meeting notes (if any) are not affected
  And event "ai_summary_unavailable" logged
  And within 24 hours manager receives email: "AI recovered — want to retry?"


# ============ PRIVACY & PERMISSION ============

Scenario: AI disabled org-wide — AI summary not generated
  Given Maria's account admin set "AI org policy: disabled"
  When Maria tries to enable AI for meeting
  Then toggle is greyed out with tooltip "AI disabled by admin — contact admin"
  And no AI summary generated after meeting end

Scenario: Meeting participant declined recording consent
  Given Maria starts AI-enabled meeting with Sarah
  When Sarah clicks "Decline AI recording" consent prompt
  Then AI disables for this meeting
  And Maria sees "Sarah declined AI — switching to manual notes"
  And event "ai_declined_by_participant" logged
  And Maria can take manual notes normally


# ============ NON-FUNCTIONAL REQUIREMENTS ============

Scenario: Summary generation p95 latency under 60 seconds
  Given 100 completed AI-enabled meetings in past 7 days
  When latency measured from "End meeting" event to "summary available" event
  Then p95 latency ≤ 60 seconds
  And p99 latency ≤ 90 seconds
  And p50 latency ≤ 30 seconds

Scenario: Summary data encryption at rest
  Given AI summary generated and stored
  When database queried directly (not via API)
  Then summary content encrypted with customer-specific key (AES-256)
  And cannot be decrypted without customer-managed key (BYOK for Enterprise)

Scenario: Audit log completeness
  Given any AI summary operation occurs (generate / edit / approve / delete)
  When audit log queried for that meeting_id
  Then every operation logged with timestamp, actor_id, action_type, meeting_id, summary_id
  And log retention ≥ 365 days
  And log entries immutable (tamper-evident)


# ============ DATA VARIATION: Action Items Extraction ============

Scenario Outline: Action items extraction confidence handling
  Given 1:1 transcript contains statement: "<statement>"
  When AI extracts action items
  Then extraction should be <extraction>
  And confidence should be <confidence>

  Examples:
    | statement                                     | extraction                       | confidence |
    | "Sarah, please review PR by Friday"           | "Sarah: review PR, due Friday"   | High (>90%)|
    | "Let's figure out the deployment plan"        | No extraction (no owner/clear action) | Low (<50%) |
    | "I'll send you docs soon"                     | "Maria: send docs, due TBD"      | Medium (70-90%) |
    | "We should probably talk to Dave about it"    | No extraction (speculative)      | Low (<50%) |
```

### AC Density Analysis

- **12 scenarios total** for single story S2
- **Breakdown:**
  - Happy path: 1
  - Streaming / loading: 1
  - Boundary (duration): 1 (with 5 outlines)
  - Error scenarios: 3
  - Privacy / permission: 2
  - NFR: 3 (latency, encryption, audit)
  - Data variation: 1 (with 4 outlines)

**Density appropriate for L-sized (8 point) story with safety-critical + NFR-heavy implications.** Compared to S1 (toggle) which has 4 simpler scenarios.

### Common AC Mistakes We Avoided

1. **Vague thresholds:** Not "fast" — "60s p95, 90s p99"
2. **Single happy path:** 11 non-happy-path scenarios because production is edges
3. **Missing privacy:** 2 explicit privacy scenarios (admin disable, participant consent) — B2B deal-breakers
4. **Missing NFR:** Latency + encryption + audit — all are requirements but easy to omit
5. **Implementation-specific:** "User clicks blue button" avoided — "User ends meeting" (UI-agnostic)

> **AC lesson:** L-story with AI + privacy + NFR demands 10+ scenarios. Without comprehensive AC:  
> 1. Eng ships happy path, encounters edge cases in prod  
> 2. QA doesn't know what to test → bugs in edge cases  
> 3. Privacy requirements (admin disable, participant consent) get lost  
>  
> Data Tables (Scenario Outline) compress data variation — 4 examples in 1 scenario vs 4 scenarios × duplicate scaffold. Keep AC maintainable.
