# Content Domain Orchestrator

## Overview
The Content Domain is an agent system for content production: social media, emails, blogs, and visual concepts.

## Pipeline
```
CONDUCTOR → STRATEGIST → RESEARCHER → COPYWRITER → VISUAL_CONCEPT → REVIEWER → RELEASE GATE
```

## Agents

| Role | File | Area of Responsibility |
|------|-------|---------------------|
| Conductor | agents/conductor.md | Orchestration, task routing, gate control |
| Strategist | agents/strategist.md | Content strategy, calendar, audience |
| Researcher | agents/researcher.md | Trends, fact-checking, sourcing |
| Copywriter | agents/copywriter.md | Texts, ToV, headlines, CTA |
| Visual Concept | agents/visual_concept.md | Visual concept, AI prompts, brand |
| Reviewer | agents/reviewer.md | Quality, fact-checking, compliance |

## Workflow

| Command | Mode | Gates |
|---------|-------|-------|
| `/start-content` | Full Pipeline | CONDUCTOR → STRATEGIST → RESEARCHER → COPYWRITER → VISUAL_CONCEPT → REVIEWER → RG |
| `/edit-content` | Edit Pipeline | CONDUCTOR → COPYWRITER → REVIEWER |
| `/quick-post` | Quick Pipeline | CONDUCTOR → COPYWRITER+REVIEWER |

## Skills

### Conductor
- `$board` — task board management
- `$handoff` — handoff between gates
- `$gates` — gate control
- `$content-release-gate` — final gate before publication

### Strategist
- `$content-calendar` — content calendar
- `$audience-analysis` — target audience analysis
- `$platform-strategy` — cross-platform strategy
- `$competitor-content-analysis` — competitor content analysis
- `$content-brief` — content creation brief

### Researcher
- `$trend-research` — trend research
- `$topic-research` — deep topic research
- `$source-verification` — source verification
- `$data-storytelling` — data-driven narratives

### Copywriter
- `$tone-of-voice` — brand tone of voice
- `$headline-formulas` — headline formulas
- `$social-media-formats` — social media formats
- `$email-copywriting` — email copywriting
- `$storytelling-framework` — storytelling framework
- `$cta-optimization` — CTA optimization
- `$seo-copywriting` — SEO copywriting

### Visual Concept
- `$visual-brief` — visual brief
- `$brand-guidelines` — brand guidelines
- `$image-prompt-engineering` — image prompt engineering
- `$platform-visual-specs` — platform visual specifications
- `$moodboard` — moodboard

### Reviewer
- `$content-review-checklist` — content review checklist
- `$brand-compliance` — brand compliance
- `$fact-checking` — fact-checking
- `$readability-scoring` — readability scoring
- `$platform-compliance` — platform compliance

### Cross-cutting / Quality (all agents in the domain)
- `$karpathy-guidelines` — mandatory before any non-trivial task
