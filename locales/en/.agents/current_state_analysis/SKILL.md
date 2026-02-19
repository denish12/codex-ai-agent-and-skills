---
name: current_state_analysis
description: Analysis of the current repository architecture: conventions, patterns, technical debt, scaling bottlenecks, security risks and consistency.
---

#Skill: Current State Analysis

## Goal
Understand the current system so that new solutions do not break conventions and actually reduce technical debt.

## When to use
- The project already exists / there is a repository with code
- There are legacy or partially implemented features

## Exit (Deliverables)
- Current Architecture Summary
- Patterns & Conventions
- Technical Debt (top 5–15)
- Scalability limitations
- Security baseline issues (if visible)
- Recommendations (quick wins + strategic)

## Algorithm
1) Overview of the repo structure (folders, layers, boundaries)
2) Define key patterns (FE/BE/data) and style
3) Find bottlenecks:
   - statefulness
   - N+1/slow queries
   - strong connectivity
   - no caching (if needed)
   - lack of observability
4) Record technical debt and risks
5) Suggest a fix plan: quick wins vs later

## Response format
### Summary
### Deliverables
### Findings
- Patterns/Conventions
- Tech Debt
- Scalability Limits
- Security Notes
### Recommendations
### Next Actions (IDs: ARCH-xx)