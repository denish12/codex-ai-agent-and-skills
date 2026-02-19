---
name: system_design_checklist
description: System design checklist: functional/non-functional requirements, technical design, operations (deployment/monitoring/backup/rollback), so as not to forget anything.
---

# Skill: System Design Checklist

## Target
Self-checking of the completeness of the architecture before transfer to development.

## Checklist

### Functional Requirements
- [ ] User stories are documented
- [ ] UI/UX flows are mapped
- [ ] API contracts defined
- [ ] Data models defined

### Non-Functional Requirements
- [ ] Performance targets (latency/throughput) defined
- [ ] Scalability requirements are described
- [ ] Security requirements identified
- [ ] Availability targets (uptime %) defined

### Technical Design
- [ ] Architectural diagram (text) created
- [ ] Component responsibilities are defined
- [ ] Data flow documented
- [ ] Integration points identified
- [ ] Error handling strategy defined
- [ ] Testing strategy planned (unit/integration, boundaries)

### Operations
- [ ] Deployment strategy defined
- [ ] Monitoring/alerting scheduled
- [ ] Backup/recovery strategy is described (if there is a database)
- [ ] Rollback plan is documented

### Red Flags Check
- [ ] No Big Ball of Mud
- [ ] No God Object
- [ ] No Tight Coupling
- [ ] No “Magic” behavior without documentation
- [ ] No analysis paralysis (there is an MVP path)

## Exit
- “PASS” list
- “MISSING” list with recommendations and ARCH-xx tasks
