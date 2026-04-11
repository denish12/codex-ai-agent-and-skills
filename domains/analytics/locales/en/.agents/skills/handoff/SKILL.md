---
name: handoff
description: Context transfer between gates and sessions — Handoff Envelope, inter-session protocol, file generation
---
# Handoff — Context Transfer Between Gates and Sessions

## When to use
- At **each transition** between gates within a session — standard transfer (intra-session handoff).
- Upon **session completion** — inter-session transfer (multi-session handoff), saving to a file.
- Upon **return for revision** — reverse transfer (reverse handoff).
- **Mandatory** at every transition, in any pipeline mode. Without exceptions.

> **Distinction:** `$gates` checks readiness. `$handoff` transfers work. `$board` tracks status. Sequence: `$gates` PASS → `$handoff` → update `$board`.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Result of `$gates` | ✅ | PASS or CONDITIONAL PASS — handoff is impossible on FAIL |
| Sending Agent | ✅ | Who is transferring (current gate with ID) |
| Receiving Agent | ✅ | To whom it is transferred (next gate with ID) |
| Gate Artifacts | ✅ | Deliverables of the current gate (from `$gates` registry) |
| Pipeline Mode | ✅ | Full (`/analyze`) / Quick (`/quick-insight`) |
| Handoff Type | ✅ | Forward / Reverse / Session (inter-session) |
| Session Number | ⬚ | For inter-session handoff — current and next session |

> **Precondition:** Handoff is possible **only** after a `$gates` PASS or CONDITIONAL PASS. On FAIL — return to agent, handoff is not performed.

### Connection with other skills
| Skill | Interaction | When |
|-------|-------------|------|
| `$gates` | Precondition: PASS / CONDITIONAL PASS → allows handoff. Gate check is attached to the envelope | Before every handoff |
| `$board` | After handoff: update gate statuses (current → `[✓]`, next → `[→]`) | After every handoff |
| `$session-prompt-generator` | For Session handoff: generation of the next session's prompt, included in the file | Upon session completion |
| Framework skills | Framework artifacts (filled templates) — a part of the deliverables of AN-xx gates | Upon transfer from Data Analyst |

## Handoff Types

| Type | Description | File | Next Recipient's Context |
|------|-------------|------|--------------------------|
| **Forward** | Standard transfer between gates within a session | None (in memory) | Full session context is available |
| **Reverse** | Return for revision | None (in memory) | Full session context is available |
| **Session** | Inter-session transfer | `docs/analytics/session-N-handoff.md` | **ZERO** previous context — the file must be self-sufficient |

> **Key rule for inter-session handoff:** the next session starts with ZERO context. The handoff file is the sole source of information. No links referring to "see above" or "as discussed". Everything must be in the file.

## Transfer Registry — what to transfer

### Full Pipeline (inter-gate)

| Transition | Artifacts | Key Context |
|------------|-----------|-------------|
| **COND-01 → INT-01** | Task scope, mode, board | Business question, limitations, expectations |
| **INT-01 → Session Handoff** | Research brief, interview context, assessment mode | All user answers, selected metrics |
| **COND-02 → RES-01** | Session-1 handoff, research brief | Full context from the interview, questions for research |
| **RES-01 → AN-01** | Data, sources, facts | Verified data with URLs and dates |
| **AN-01 → ST-01** | Frameworks, analysis, patterns | Methodology, key insights |
| **ST-01 → Session Handoff** | Strategy, recommendations | Full Analysts' package for Critics and Mediator |
| **COND-03 → RES-02** | Session-2 handoff, Analysts' results | Data for criticism and alternative research |
| **RES-02 → AN-02** | Alternative data, criticism | Counter-data with sources |
| **AN-02 → ST-02** | Alternative analysis | Counter-frameworks, differences with Analysts |
| **ST-02 → Session Handoff** | Alternative strategy, criticism | Full Critics' package |
| **COND-04 → MED-01** | Session-2 + Session-3 handoff | Both packages (Analysts + Critics) |
| **MED-01 → Session Handoff** | Final conclusion, evaluations | Final verdict, justification |
| **COND-05 → DS-01** | Session-4 handoff | Mediator's conclusion for visualization |
| **DS-01 → LY-01** | Layout, visualization specs | Report structure, palette, fonts |

### Quick Pipeline (inter-gate)

| Transition | Artifacts | Key Context |
|------------|-----------|-------------|
| **COND-01 → INT-01** | Task scope, mode, board | Business question, limitations |
| **INT-01 → RES-01** | Research brief, assessment mode | Questions for research, metrics |
| **RES-01 → AN-01** | Data, sources, facts | Verified data with URLs and dates |
| **AN-01 → ST-01** | Frameworks, analysis, patterns | Methodology, insights |
| **ST-01 → MED-01** | Strategy, recommendations | Conclusions and recommendations (without competing team) |
| **MED-01 → DS-01** | Final conclusion | Final verdict for visualization |
| **DS-01 → LY-01** | Layout, specifications | Report structure, palette |

## Inter-session Handoff (Session)

### File Structure `docs/analytics/session-N-handoff.md`

The file contains the **entire** necessary context. No links, no abbreviations.

```markdown
# Session [N] Handoff — [Project Name]

## Meta
- **Project:** [Name]
- **Date:** [YYYY-MM-DD]
- **Session:** [N] out of [M]
- **Mode:** Full / Quick
- **Completed Gates:** [list of IDs with deliverables]
- **Next Gate:** [ID] [Name]

## Brief Summary
[2-3 sentences: what was done in this session, the key result]

## Board State ($board)
[Full copy of the board table in its current state + progress metrics]

## Full Content of Artifacts

### [Artifact 1 — Name]
[FULL TEXT of the artifact, not a link and not a brief description]

### [Artifact 2 — Name]
[FULL TEXT of the artifact]

### [Artifact N — ...]
[FULL TEXT]

## Decisions and Context
| # | Decision | Justification | Decided by | Affects |
|---|----------|---------------|------------|---------|
| 1 | [What was decided] | [Why] | [User / Conductor] | [Which gates] |

## Open Questions and Blockers
| # | Question / Blocker | Severity | For which gate | Status |
|---|--------------------|:--------:|:--------------:|--------|
| 1 | [Description] | 🔴/🟡/🟢 | [Gate ID] | Open / Resolved |

## Cumulative Index
| Session | Gates | Key Artifacts | File |
|---------|-------|---------------|------|
| 1 | COND-01, INT-01 | Research brief, interview context | session-1-handoff.md |
| 2 | RES-01, AN-01, ST-01 | Data, analysis, Analysts' strategy | session-2-handoff.md |
| [N] | [...] | [...] | session-N-handoff.md |

## Prompt for the Next Session
[Generated via $session-prompt-generator — ready-to-paste prompt]

## Verification Checklist
- [ ] All artifacts are included entirely (not via links)
- [ ] Requirements board ($board) is saved in its current state
- [ ] Decisions and context are documented
- [ ] Open questions / blockers are documented
- [ ] Cumulative index is up-to-date
- [ ] Prompt for the next session is generated
- [ ] The file is self-sufficient — test: can be read without ANY previous context
```

### Recovery Protocol (corrupted / incomplete handoff)

Upon loading a session handoff in a new session — the Conductor performs a verification:

| Check | Action upon failure |
|-------|---------------------|
| File not found | Request path from the user or recreate from the previous session's memory |
| Artifacts incomplete (links present instead of content) | Mark as ⚠️, request missing items from the user |
| Cumulative index does not match the content | Rebuild the index from the actual file contents |
| Prompt is missing | Generate via `$session-prompt-generator` |
| Board is missing | Restore from the cumulative index + artifacts |

> For any recovery — explicitly notify the user that the handoff was incomplete and what has been restored.

## Reverse Handoff

### When it occurs
- `$gates` — FAIL.
- Mediator found critical discrepancies in data.
- User requested a revision.
- Next gate found an issue with the previous one's artifact.

### Reverse handoff protocol
1. Indicate the **reason for return** — specific gaps / remarks.
2. Indicate **what exactly to revise** — not "redo", but "check source X: data is from 2023, need current data for 2025".
3. Indicate **what NOT to touch** — what is already approved and needs no changes.
4. Update `$board` — receiving gate → `[↩] Return`, sending gate → `[→] In Progress`.
5. After revision — repeat `$gates` check → forward handoff.

## Receive Acknowledgement

Upon receiving a handoff, the receiving agent must:

1. **Acknowledge loading:** "Handoff from [ID] received, [N] artifacts loaded".
2. **List what was received:** a list of artifacts with a brief description.
3. **Note the gaps:** if CONDITIONAL PASS — explicitly list the received gaps.
4. **Log issues:** if an artifact is incomplete or unclear — ask for clarification before starting work (do not guess).

> The Acknowledge is embedded at the start of the next gate's work. It is not a separate step, but the first paragraph of the deliverable.

## Protocol

### Step 0 — Determine handoff type
1. Forward (intra-session), Reverse (return), Session (inter-session).
2. For Session — define file path: `docs/analytics/session-N-handoff.md`.

### Step 1 — Preconditions
1. Ensure `$gates` gave a PASS or CONDITIONAL PASS (except Reverse).
2. Determine receiving agent by the registry.
3. Collect all artifacts from the transfer registry.

### Step 2 — Envelope formation
1. For Forward: fill out the standard envelope template.
2. For Session: fill out the file template, include FULL content of artifacts.
3. For Reverse: fill out the reverse envelope with gaps.
4. For CONDITIONAL PASS — explicitly state the gaps that are being transferred.

### Step 3 — User sign-off
1. Show the envelope to the user.
2. Wait for an explicit **"Approved"**.
3. Do not proceed without an Approved. Without exceptions.

### Step 4 — Save and activate
1. For Session: save the file to `docs/analytics/session-N-handoff.md`.
2. Update `$board`: current gate → `[✓] Completed`, next gate → `[→] In Progress`.
3. Add entry to transfer log.
4. For Session: call `$session-prompt-generator` to generate a prompt.

## Example — Forward Handoff RES-01 → AN-01 (CONDITIONAL PASS)

```
### Handoff Envelope — RES-01 Researcher (Analysts) → AN-01 Data Analyst (Analysts)

**Type:** Forward
**Mode:** Full Pipeline
**Session:** 2
**Gate Check:** CONDITIONAL PASS (iteration 1) — 2 Gaps
**Date:** 2026-04-12

---

**Artifacts:**

1. **Research Report** — 7 sections according to the INT-01 research brief:
   - EdTech Market Size in Russia (TAM $4.2B, SAM $1.8B, SOM $180M)
   - Key players: Skillbox, Netology, Yandex Praktikum, GeekBrains, Skyeng
   - Trends: AI personalization, corporate training, micro-certifications
   - Regulatory environment: licensing, accreditation
   - Customer segments: B2C (25-35), B2B (corp. training), B2G (Ministry of Education)
   - Pricing: subscription $15-80/m, corporate contracts $5K-50K/y
   - Entry barriers: brand, content, teachers

2. **Source Table** — 28 sources, URL, dates, credibility (✅/⚠️/🔮)

**Gaps (CONDITIONAL PASS):**
- ⚠️ EdTech TAM: 2 sources instead of 3 (Smart Ranking + HSE, missing third)
- ⚠️ IDC report on corp. training: 14 months old (Jan 2025), highly recommended to verify

---

**Task for AN-01 Data Analyst (Analysts):**
Apply competitive analysis and market dimensioning frameworks to RES-01 data. At least 2 frameworks. Take note of the gaps: TAM is marked as ⚠️ Estimated, mark IDC data as ⚠️.

**Expected deliverable:**
Filled frameworks tied to RES-01 data, patterns, insights, methodology.

**Blockers:** None

---

→ Waiting for **"Approved"** to transition to **AN-01 Data Analyst (Analysts)**
```

## Envelope Validation (Quality Gate)

### Standard (Forward) envelope
- [ ] Result of `$gates` attached (PASS / CONDITIONAL PASS)
- [ ] Sending and receiving agents are indicated with gate IDs
- [ ] All artifacts from the transfer registry appended
- [ ] Task for the next agent formulated specifically
- [ ] Gaps (if CONDITIONAL) are explicitly listed
- [ ] Context is passed
- [ ] User Approved obtained
- [ ] `$board` updated

### Inter-session (Session) envelope — additionally
- [ ] File is saved to `docs/analytics/session-N-handoff.md`
- [ ] All artifacts are included in **full text** (no links or summaries)
- [ ] Board state is saved
- [ ] Decisions and context are documented
- [ ] Open questions / blockers are documented
- [ ] Cumulative index is up-to-date
- [ ] Prompt for the next session is generated
- [ ] File is self-sufficient — test: can be read without ANY previous context

## Handoff
The result of `$handoff` is input data for: the next agent in the pipeline, `$board` (status update), `$session-prompt-generator` (for inter-session handoffs).

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|--------------|--------------------|
| Handoff without `$gates` | Unverified artifacts → issues at the next gate | Always `$gates` PASS → then handoff |
| Handoff without Approved | Protocol violation, user unaware | Always wait for explicit Approved |
| Session handoff with links instead of content | Next session has no access to context | FULL text of artifacts in the file |
| "Do analysis" instead of task | Agent does not know root scope | Specific task with parameters and anticipated deliverable |
| Transfer without artifacts | Next agent works blindly | All registry artifacts are attached |
| Reverse handoff without details | Agent doesn't know what to fix | Explicit gaps + what NOT to touch |
| Failing to update `$board` | Board gets desynchronized | Update `$board` at every handoff |
| Context loss between sessions | Next session starts from scratch | Inter-session handoff with complete content |
| Recipient didn't acknowledge receipt | Unclear if all artifacts are received & understood | Receive Acknowledgement at the start of next gate |
| Corrupt session file | Next session works with incomplete data | Recovery protocol: verification upon loading |

## Output Templates

### Forward Handoff (intra-session)

```
### Handoff Envelope — [ID From] [Agent From] → [ID To] [Agent To]

**Type:** Forward
**Mode:** [Full / Quick]
**Session:** [N]
**Gate Check:** [PASS / CONDITIONAL PASS] (iteration [N])
**Date:** [YYYY-MM-DD]

---

**Artifacts:**
- [Artifact 1 — description]
- [Artifact 2 — description]

**Gaps (if CONDITIONAL):**
- [Gap 1 — what to consider]

---

**Task for [Agent To]:**
[Clear specific formulation]

**Expected deliverable:**
[What the next agent should return]

**Blockers:**
[List or "None"]

---

→ Waiting for **"Approved"** to transition to **[ID To] [Agent To]**
```

### Reverse Handoff

```
### Reverse Handoff — [ID From] [Agent From] → [ID To] [Agent To] (return)

**Type:** Reverse
**Reason:** [FAIL / feedback / data discrepancies]
**Date:** [YYYY-MM-DD]

---

**What to fix:**
| # | Gap / Remark | Sev | Specific Action |
|---|--------------|:---:|-----------------|
| 1 | [description] | [B] | [what to do] |

**What NOT to touch:**
- [Artifact / section that is already approved]

---

→ After revision — repeat `$gates` check (iteration [N+1])
→ Waiting for **"Approved"** for return
```

### Receive Acknowledgement (start of recipient's work)

```
**Handoff received:** [ID From] → [ID To]
**Artifacts loaded:** [N] pcs.
- [Artifact 1] — ✅ received
- [Artifact 2] — ✅ received

**Gaps accepted:** [list or "None"]
**Issues on loading:** [list or "None"]
```
