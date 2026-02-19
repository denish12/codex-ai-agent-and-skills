---
name: architecture_doc
description: Architectural document on PRD+UX: modules, flows, data, integrations, errors, testability, bottlenecks, growth plan and implementation plan.
---

# Skill: Architecture Document

## Goal
Make the architecture implementable, testable, and ready for growth.

## Inputs
-PRD
- UX Spec (flows/screens/states)
- Stack/deployment restrictions
- (if available) Current State Analysis

## Output (structure)

## 1) Overview
- What are we building (1 paragraph)
- Context and limitations
- Assumptions

## 2) System Context
- Actors
- External integrations
- System boundaries

## 3) High-level Architecture Diagram (text)
- FE → BE → DB/Cache/External
- Basic outlines of data and responsibilities

## 4) Modules / Components
For each component/module:
- responsibility
- public interfaces
- dependencies
- testing boundaries (unit vs integration)
- consistency rules (patterns/conventions)

## 5) Flow Mapping (from UX Spec)
- Flow → endpoints → services → repos → entities
- Where and why loading/empty/error states occur
- Error strategy on the UI (what to show to the user)

## 6) Integration Patterns
- Synchronous calls (HTTP)
- Asynchronous operations (events/queues) - if justified
- Idempotency for risky operations

## 7) Error Handling Strategy
- Unified error format (machine-readable code)
- 401/403/404/409/422/5xx policy
- Secure messages (no leaks)

## 8) Testing Strategy
- Boundaries of unit tests
- Integration tests (API/DB/integration contracts)
- A set of “must-have” scenarios for PRD/UX
- (optional) e2e / visual checks - if the design requires

## 9) Scalability Bottlenecks (anticipation)
- potential bottlenecks (DB hot spots, N+1, stateful sessions, heavy endpoints)
- measures: indexes, caching, background tasks, CDN, sharding (if ever needed)

## 10) Growth Plan
Describe the thresholds and what changes:
- 10K users: The current architecture is sufficient, but you need to monitor metrics and optimize database queries.
- 100K users: Implementation of Redis clustering and use of CDN for static resources
- 1M users: Transition to microservice architecture, dividing databases into reading and writing (Read/Write splitting)
- 10M users: Event-driven architecture, distributed caching, multi-region deployment

## 11) Implementation Plan
- Epics/subsystems
- Vertical slices MVP (minimum 1–3)
- Dependencies and order

## Quality (checklist)
- Any UX flow can be traced through modules/API/data
- Module boundaries reduce cohesion
- Testability is built in
- Observability/deployment is not forgotten

## Red Flags
- Big Ball of Mud: Lack of clear architecture
- Golden Hammer: Use the same solution for any task
- Premature Optimization: Optimization at too early stages
- Not Invented Here: Refusal of ready-made solutions
- Analysis Paralysis: Too much planning with little implementation
- Magic: Strange, undocumented behavior
- Tight Coupling: Too much dependence of components on each other
- God Object: One class or component that does everything