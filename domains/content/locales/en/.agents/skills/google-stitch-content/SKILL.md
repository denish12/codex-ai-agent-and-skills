---
name: google-stitch-content
description: Visual content concepts generation via Google Stitch (AI) with MCP — carousels, covers, banners, social media visuals
metadata:
  version: "1.0"
  last_verified: "2026-04-04"
  mcp_server: "StitchMCP"
  adapted_from: ".agents/skills/google-stitch-skill (UX/UI domain, v3.0)"
---

# Skill: Google Stitch for Content Visuals (MCP-Integrated)

## Purpose

Describes **how and when** Visual Concept uses Google Stitch to generate visual concepts for content:
- Fast generation of visual layouts for social media, banners, carousel slides.
- Rapid ideation: 2-3 visual variants in minutes.
- HTML/CSS code generation for email templates and landing pages.

> [!IMPORTANT]
> Stitch is accessible **directly via MCP** — the agent generates, iterates, and manages screens without manual copying.
> Stitch is a tool for **rapid prototyping of visual concepts**, not final design.
> The output requires brand compliance checking and adaptation to `$brand-guidelines`.

> Adapted from `.agents/skills/google-stitch-skill` (UX/UI domain) for the content domain.

---

## What is Google Stitch

Google Stitch is an AI tool from Google Labs. It turns text prompts into UI layouts with export to Figma and HTML/CSS/React code.

**Engine:** Gemini 3 Pro / Gemini 3 Flash.
**URL:** https://stitch.withgoogle.com
**Access:** Google account + StitchMCP server connected to the agent.

---

## When to Use in Content Pipeline

### ✅ Use for
- Generating **visual layouts** for carousel slides (Instagram, LinkedIn PDF).
- Generating **covers** for posts, videos, articles.
- Generating **banners** and visual blocks for email newsletters.
- Fast creation of **layout variants** for A/B testing visuals.
- **Email templates** — HTML/CSS scaffold for `$email-copywriting`.
- **Landing page** sections — visual blocks for landing pages.

### ❌ Do NOT use for
- **Photo content** — Stitch generates UI, not photographs. For photos → `$image-prompt-engineering` (Midjourney/DALL-E).
- **Illustrations and art visuals** — Stitch ≠ Midjourney. For art → `$image-prompt-engineering`.
- Content requiring a **pixel-perfect** result — Stitch = concept, not final.
- **Video** — Stitch does not support animations and video.

### Place in the Pipeline

```
$content-brief (topic, visual requirements)
       ↓
$moodboard (style, palette, mood)
       ↓
$visual-brief (detailed spec)
       ↓
[STITCH MCP: Rapid Visual Ideation]    ← this skill
  generate_screen_from_text → edit_screens → generate_variants
       ↓
$brand-compliance (visual check)
       ↓
$content-review-checklist → $content-release-gate
```

---

## StitchMCP — API Reference (brief)

| Tool | Purpose | When |
|------|-----------|-------|
| `create_project` | Create a project | New campaign / series of visuals |
| `list_projects` / `get_project` | Find existing | Iteration of an existing campaign |
| `list_screens` / `get_screen` | Get screens / code | Viewing results |
| `generate_screen_from_text` | 🎯 **Generate visual from prompt** | Main tool |
| `edit_screens` | Editing | Refining after initial generation |
| `generate_variants` | Generate variants | A/B visuals, layout exploration |

### Models

| ID | When |
|----|-------|
| `GEMINI_3_FLASH` | First iterations, exploring variants (faster) |
| `GEMINI_3_PRO` | Final variants, complex layouts (higher quality) |

### Device Types for Content

| DeviceType | Content Usage |
|------------|----------------------|
| `MOBILE` | Instagram Stories/Reels (9:16), mobile banners |
| `DESKTOP` | LinkedIn carousel (16:9), email templates, landing sections |
| `AGNOSTIC` | Square visuals (1:1), OG images, universal |

---

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Visual brief | ✅ | From `$visual-brief` — what to depict, composition, mood |
| Brand guidelines | ✅ | From `$brand-guidelines` — palette (HEX), fonts, style |
| Platform + dimensions | ✅ | From `$platform-visual-specs` — to select deviceType |
| Text for visual | ⬚ | Headline, CTA — if there is text on the visual |
| Moodboard | ⬚ | From `$moodboard` — style, references |

---

## Operating Protocol

### Step 1 — Project Preparation

```
IF campaign/series → create_project(title: "[Brand] — [Campaign]")
IF single visual → use existing project or create a new one
→ remember projectId
```

### Step 2 — Prompt Formulation

Prompt structure for content visuals:

```
[Visual Type] + [Platform/Dimensions] + [Content Elements] + [Brand Style] + [Constraints]
```

#### Content Prompt Checklist

- [ ] **Type:** Carousel slide / Banner / Email block / Post cover / OG image / Landing section
- [ ] **Dimensions:** Exact px or ratio (1080×1080, 1080×1350, 1200×627)
- [ ] **Content Elements:** Headline (text), subheadline, CTA button, icons, placeholder image
- [ ] **Brand:** Colors (HEX), font, logo (position), style (minimal / bold / editorial)
- [ ] **Mood:** From `$moodboard` or `$visual-brief`
- [ ] **Constraints:** "No stock photos", "No illustrations", "Text only", safe zones

#### Prompt Examples for Content

**Instagram carousel (slide):**
```
Social media carousel slide, 1080×1080px.
Bold headline "5 Email Marketing Mistakes" in white, 48px, Inter Bold.
Background: solid dark navy (#1A1A2E). Accent: teal (#00C9A7).
Subtext: "Mistake #1: No segmentation" in 20px, light gray.
Bottom: page indicator dots (5 dots, first active).
Minimal style, no illustrations, no stock photos.
Logo small bottom-right corner.
```

**Email banner:**
```
Email header banner, 600×200px, desktop.
Left: headline "Your Weekly Digest" in 24px Inter Bold, dark text (#1A1A2E).
Right: abstract geometric shape, teal (#00C9A7) accent.
Background: light gray (#F5F5F5). Bottom border: 2px teal line.
Clean, minimal, SaaS-style. No photos.
```

**LinkedIn post image:**
```
Social media post image, 1200×627px, desktop.
Center: large stat "340%" in bold 72px, accent color (#4361EE).
Below: "Growth in AI-generated content in 2026" in 18px, dark gray.
Background: white with subtle grid pattern.
Bottom-left: small logo. Bottom-right: source attribution "McKinsey, 2026" in 12px gray.
Data visualization style, minimal, professional.
```

### Step 3 — Generation

```
generate_screen_from_text(
  projectId: "<id>",
  prompt: "<prompt>",
  deviceType: "MOBILE" | "DESKTOP" | "AGNOSTIC",
  modelId: "GEMINI_3_FLASH"  // Flash for first iterations
)
→ remember screenId
```

> ⚠️ Generation can take up to a few minutes. **DO NOT repeat the call** — wait for the response.

### Step 4 — Iteration (edit_screens)

2-3 iterations for refinement:

```
edit_screens(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Change headline color to #00C9A7, move CTA button to bottom-center",
  modelId: "GEMINI_3_FLASH"
)
```

**Types of edits for content visuals:**
- **Color:** `"Change [element] color to [HEX]"`
- **Text:** `"Replace headline with '[new text]'"`
- **Position:** `"Move [element] to [position]"`
- **Size:** `"Make headline larger, 56px"`
- **Remove:** `"Remove [element]"`
- **Add:** `"Add CTA button '[text]' at bottom-center, teal background"`

### Step 5 — Variants for A/B

```
generate_variants(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Generate layout variations with different text placement",
  variantOptions: { numberOfVariants: 3 }
)
```

### Step 6 — Result Retrieval

```
get_screen(projectId, screenId, name)
→ code / metadata
→ for carousel: repeat for each slide
```

---

## Carousels — Special Workflow

For Instagram / LinkedIn carousels (multiple slides):

```
1. create_project(title: "[Brand] — Carousel: [topic]")
2. For each slide:
   generate_screen_from_text(prompt: "Slide [N] of [total]: [slide content]")
3. Important: specify a consistent style in every prompt:
   "Same style as previous: [colors, font, size, style]"
4. edit_screens for each slide → brand consistency
5. get_screen for each → save
```

> ⚠️ Stitch struggles with consistency > 3 screens. For long carousels (10 slides) — generate in batches of 2-3, explicitly repeating the style parameters.

---

## Brand Compliance After Stitch

Stitch **does not know** your brand. After generation — mandatory check:

| Element | Check | Action if it does not match |
|---------|----------|---------------------------|
| Colors | Do HEX match `$brand-guidelines`? | `edit_screens` → fix colors |
| Font | Correct font? | Stitch often uses system fonts. Mark for replacement |
| Logo | Correct variant, position? | `edit_screens` → add/move |
| Style | Matches `$moodboard`? | Iterate or re-generate |
| Text | Free of errors? Correct CTA? | `edit_screens` → fix |
| Safe zone | Is key content out of the safe zone? | `edit_screens` → move |

---

## Validation (Quality Gate)

A Stitch visual is considered ready for handoff if:

- [ ] Passed ≥ 2 iterations via `edit_screens`
- [ ] Colors conform to `$brand-guidelines` (HEX verified)
- [ ] Text on visual is error-free
- [ ] Dimensions conform to `$platform-visual-specs`
- [ ] Safe zones are respected
- [ ] For carousel: style is consistent across slides
- [ ] Screen ID documented
- [ ] Prompt saved (for reproducibility)
- [ ] A/B variants generated (if needed)

---

## Stitch Limitations for Content

| Limitation | Impact | Workaround |
|-------------|---------|------------|
| Does not generate photos | Only UI/layout, not photo-realistic images | For photos → `$image-prompt-engineering` (Midjourney/DALL-E) |
| Consistency > 3 screens is low | 10-slide carousels — varying styles | Explicitly repeat style in each prompt |
| No animations | Cannot make animated Stories/Reels | Only static visuals |
| Fonts are system default | Doesn't know your brand fonts | Mark for replacement, specify font in prompt |
| Doesn't know the brand | No auto-apply brand guidelines | Explicitly state HEX, font, style in each prompt |
| MCP generation is slow | Up to a few minutes per screen | Do not repeat call, wait |
| Copy to Figma — UI only | MCP doesn't support Figma export | Manual step via browser |

---

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Prompt "beautiful banner for Instagram" | Stitch won't guess the style, colors, content | Specific prompt: size + text + HEX colors + style |
| Accepting first generation without iterations | First result is rarely perfect | Minimum 2 iterations via `edit_screens` |
| Using Stitch for photos | Stitch generates UI, not photos | `$image-prompt-engineering` for photos |
| Failing to check brand compliance | Colors, fonts, logos may flagrantly fail | Check after every generation |
| Repeating call when "stuck" | Duplication of generations, budget loss | Wait. Check via `get_screen` |
| 10 edits in one `edit_screens` | Stitch loses context | Maximum 3-5 edits at a time |
| Stitch-output as final visual | Not brand-compliant, system fonts | Stitch = concept. Final = after brand check |
| Carousel without unified style | Every slide looks different | Repeat style parameters in every prompt |

---

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$visual-brief` | **Source:** Spec for generation → Stitch prompt |
| `$brand-guidelines` | **Source:** colors, fonts, style → prompt parameters |
| `$moodboard` | **Source:** mood, style → style parameters of the prompt |
| `$platform-visual-specs` | **Source:** dimensions, ratio → deviceType and size |
| `$image-prompt-engineering` | **Complement:** Stitch = UI/layout, image_prompt = photo/art |
| `$brand-compliance` | **Consumer:** checking Stitch-output for brand alignment |
| `$email-copywriting` | **Consumer:** HTML-scaffold from Stitch for email templates |

---

## Output (Deliverables)

```
### Stitch Output — [Content / Campaign]

**Project ID:** [id]
**Screen IDs:** [list]
**Prompt (saved):** [for reproducibility]
**Iterations:** [list of edit_screens]
**Brand Check:** [✅ colors / ✅ style / ⚠️ font — mark for replacement]
**Variants:** [A/B — which ones, for what]

→ Handoff to `$brand-compliance` → `$content-review-checklist` → `$content-release-gate`
```
