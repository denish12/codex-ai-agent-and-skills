---
name: brand-guidelines
description: Complete brand guideline — identity, visual, ToV, messaging, legal, platform adaptations, Do/Don't
---
# Brand Guidelines

## When to use
- Upon **creating a brand from scratch** — forming the complete guideline.
- Upon **onboarding** — handing over guidelines to a new copywriter, designer, contractor.
- Upon **rebranding** — updating an existing guideline and outlining changes.
- Upon **audit** — checking the completeness and relevance of the current guideline.
- As a **benchmark** for `$brand-compliance` — without this document, compliance verification is impossible.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Brand name | ✅ | Legal and communication name |
| Niche / industry | ✅ | Industry in which the brand operates |
| Existing materials | ✅ | Figma, PDF guideline, website, socials — any visual and style sources |
| Mission / values | ⬚ | Provide if already formulated; if not, will be defined in Step 1 |
| Target audience | ⬚ | Result of `$audience-analysis` or TA description |
| Competitors | ⬚ | For positioning and differentiation |

> If there are no existing materials (brand from scratch) — the agent builds the guideline via a user interview. Do not invent details without confirmation.

## Data Sources
1. **Existing brand assets** — website, social networks, presentations, packaging.
2. **Figma / Sketch / PDF** — design system, if available.
3. **User interview** — mission, values, positioning, tone (if not documented).
4. **`$audience-analysis`** — who we speak to, in what language.
5. **`$competitor-content-analysis`** — what we stand apart from.

## Protocol

### Step 1 — Brand Identity (Core)
1. Record or formulate the **mission** (why the brand exists).
2. Define **values** (3-5 key principles).
3. Formulate **positioning** (for whom, what it does, how it differs).
4. Identify the **brand archetype** (if applicable: Hero, Sage, Rebel, etc.).
5. Document **key messages** (3-5 theses that the brand always broadcasts).

### Step 2 — Naming & Verbal Identity
1. Rules for writing the brand name (case, language, permissible abbreviations).
2. Slogan / tagline (if any).
3. Tone for product / service names.
4. Transliteration rules (for multilingual brands).

### Step 3 — Tone of Voice
1. Define tone characteristics (4 axes: formality, emotionality, humor, expertise).
2. For each axis — a scale from 1 to 5 with the brand's current position.
3. Forbidden words and clichés (stop-list).
4. Mandatory speech patterns (if any).
5. Link to `$tone-of-voice` — this skill provides a detailed development of tone.

> The ToV section in the guideline is a brief summary. Detailed elaboration is done via `$tone-of-voice`.

### Step 4 — Visual Identity
1. **Color palette** — primary, accent, neutral colors (HEX, RGB, CMYK).
2. **Typography** — fonts for headings, body text, CTA, captions.
3. **Logo** — variants, minimum sizes, clear space, forbidden transformations.
4. **Visual style** — photography, illustrations, icons, patterns/textures.
5. **Composition** — grid, paddings, element hierarchy.
6. **Graphical devices** — signature frames, shapes, overlays (if any).

### Step 5 — Do / Don't
For every key element (logo, colors, tone, photos) — specific examples:
- ✅ **Do:** proper usage with description.
- ❌ **Don't:** improper usage with an explanation of why it is forbidden.

> Minimum 2 Do's and 2 Don'ts for each element: logo, colors, typography, ToV.

### Step 6 — Platform Adaptations
For every priority platform (from `$platform-strategy`):
- Sizes and aspect ratios for visuals.
- Permissible logo variant.
- Typography adaptations (mobile sizes, web-safe fonts).
- Tone specifics (if the platform requires adaptation — LinkedIn is more formal than TikTok).

### Step 7 — Legal and Trademark
1. Trademark symbol (™ / ®) — when and where to use.
2. Copyright — format, year, mandatory inclusion.
3. Rules for third-party use (partners, media, influencers).
4. Restrictions: what is strictly forbidden to do with brand elements.

### Step 8 — Versioning
1. Assign a guideline version.
2. Record the date and author.
3. If an update — describe what changed (changelog).

## Validation (Quality Gate)

The guideline is considered complete if:

- [ ] Brand Identity is filled (mission, values, positioning, key messages)
- [ ] Verbal Identity is recorded (name writing, slogan)
- [ ] ToV is defined (4 axes + stop-list) or linked to `$tone-of-voice`
- [ ] Visual identity is comprehensive (palette, typography, logo, style)
- [ ] Do / Don't are present for: logo, colors, typography, ToV (minimum 2 each)
- [ ] Platform adaptations exist for all priority platforms
- [ ] Legal section is populated (trademark, copyright, third-party rules)
- [ ] Version and date are recorded
- [ ] Guideline is approved by the user

## Handoff

The result of this skill serves as the **benchmark** for:

| Consumer | How it's used |
|-------------|---------------|
| `$brand-compliance` | Checks content against the guideline — **primary consumer** |
| `$tone-of-voice` | Uses the ToV section as a starting point for detailed elaboration |
| `$visual-brief` | Takes visual specifications for specific tasks |
| `$content-brief` | Links to the guideline in the "Style" section |
| Copywriter (agent) | Follows ToV and messaging when writing texts |
| Visual Concept (agent) | Follows visual identity when creating creatives |

When handing off — use `$handoff` specifying the guideline version.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Guideline lacking mission/values | Visuals without a core — cosmetics without strategy | Always start with Brand Identity |
| Visuals only, no text | Copywriter doesn't know how to write | ToV + messaging are mandatory |
| Absent Do / Don't | Abstract rules — everyone misinterprets them | Specific examples of right and wrong |
| One size fits all platforms | A 1000px logo in stories looks different than in a header | Adaptations for each platform |
| No stop-list | Copywriter uses words foreign to the brand | Explicit list of forbidden words and clichés |
| No versioning | Updates leave ambiguity over what is current | Always version + date + changelog |
| Hallucinated guidelines | The agent fabricated a palette without the user | Confirm everything with the user |

## Output Template

```
### Brand Guidelines — [Brand]
**Version:** [N.N]
**Date:** [YYYY-MM-DD]
**Author:** [who created / updated]
**Changelog:** [what changed in this version or "First version"]

---

#### 1. Brand Identity

**Mission:** [why the brand exists — 1-2 sentences]

**Values:**
1. [Value 1] — [brief explanation]
2. [Value 2] — [brief explanation]
3. [Value 3] — [brief explanation]

**Positioning:**
> For [target audience], [brand] is a [category] that [key differentiator], because [reason to believe].

**Archetype:** [archetype, if applicable]

**Key messages:**
1. [Thesis 1]
2. [Thesis 2]
3. [Thesis 3]

---

#### 2. Naming & Verbal Identity

- **Writing:** [correct spelling of the name, case, variants]
- **Slogan:** [tagline]
- **Forbidden variants:** [how NOT to write the name]
- **Transliteration:** [rules for other languages, if applicable]

---

#### 3. Tone of Voice (Summary)

| Axis | 1 | 2 | 3 | 4 | 5 | Brand Position |
|-----|---|---|---|---|---|----------------|
| Formal ↔ Informal | | | | | | [●] on scale |
| Serious ↔ Playful | | | | | | [●] on scale |
| Restrained ↔ Emotional| | | | | | [●] on scale |
| Practitioner ↔ Visionary| | | | | | [●] on scale |

**Stop-list:** [forbidden words and clichés]
**Mandatory patterns:** [signature phrases, if they exist]

> Full tone elaboration → `$tone-of-voice`

---

#### 4. Visual Identity

**Color Palette:**
| Role | HEX | RGB | CMYK | Usage |
|------|-----|-----|------|---------------|
| Primary | #[hex] | [rgb] | [cmyk] | Headings, buttons |
| Accent | #[hex] | [rgb] | [cmyk] | CTA, accents |
| Neutral | #[hex] | [rgb] | [cmyk] | Background, text |
| Sub-color | #[hex] | [rgb] | [cmyk] | Decorative elements |

**Typography:**
| Element | Font | Size | Weight | Fallback |
|---------|-------|--------|------------|----------|
| H1 | [font] | [px/rem] | [Bold] | [web-safe] |
| H2 | [font] | [px/rem] | [SemiBold] | [web-safe] |
| Body | [font] | [px/rem] | [Regular] | [web-safe] |
| CTA | [font] | [px/rem] | [Bold] | [web-safe] |
| Caption | [font] | [px/rem] | [Light] | [web-safe] |

**Logo:**
- Primary variant: [description]
- Monochrome: [description]
- Inverted: [description]
- Favicon / icon: [description]
- Minimum size: [N px]
- Clear space: [N × logo element]
- Forbidden: [list of transformations]

**Visual Style:**
- Photography: [style, filters, image types, mood]
- Illustrations: [style, line thickness, fill]
- Icons: [style, size, stroke/fill]
- Patterns / textures: [description]
- Graphical devices: [signature shapes, frames, overlays]

---

#### 5. Do / Don't

**Logo:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [proper usage] | [improper usage] |
| [proper usage] | [improper usage] |

**Colors:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [proper usage] | [improper usage] |
| [proper usage] | [improper usage] |

**Typography:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [proper usage] | [improper usage] |
| [proper usage] | [improper usage] |

**Tone of Voice:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [example of correct tone + quote] | [example of incorrect tone + quote] |
| [example of correct tone + quote] | [example of incorrect tone + quote] |

---

#### 6. Platform Adaptations

| Platform | Logo (variant) | Visual sizes | Typography | Tone (adaptation) |
|-----------|---------------|------------------|-------------|-----------------|
| Instagram | [variant] | Feed: 1080×1080, Stories: 1080×1920, Reels: 1080×1920 | [adaptation] | [adaptation] |
| Telegram | [variant] | Post: 800×400, Avatar: 640×640 | [adaptation] | [adaptation] |
| LinkedIn | [variant] | Post: 1200×627, Banner: 1584×396 | [adaptation] | [adaptation] |
| Web | [variant] | Header, OG:1200×630, Favicon:32×32 | [adaptation] | [adaptation] |

---

#### 7. Legal and Trademark

- **Trademark:** [™ / ® — where and when to use]
- **Copyright:** © [year] [legal entity]. Format: [description]
- **Third parties:** [rules for influencers, partners, media]
- **Strictly forbidden:** [list of absolute bans]
```
