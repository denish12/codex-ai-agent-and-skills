---
name: moodboard
description: Moodboard — visual concept tied to a brand, persona, and platform — references, palette, typography, Do's/Don'ts
---
# Moodboard

## When to use
- When creating a **visual concept** for a campaign, content series, or rebranding.
- At the **start of Visual Concept work** — before `$visual-brief` and `$image-prompt-engineering`.
- When there is a **divergence in vision** — syncing between the user and agent on "how this should look."
- When **expanding to a new platform** — adapting the visual style to the channel.

## Inputs

| Field | Required | Description |
|-------|:--------:|-------------|
| Task Context | ✅ | What the moodboard is for: campaign, post series, rebranding, specific content unit |
| Brand Guidelines | ✅ | From `$brand-guidelines` — palette, style, typography. The moodboard expands on these, it does not contradict them |
| Target Audience Persona| ✅ | From `$audience-analysis` — visual expectations of the audience |
| Platform | ✅ | Influences the visual style and formats |
| Mood / Emotion | ⬚ | If not provided — infer from the content and brand context |
| User References | ⬚ | URLs, descriptions, screenshots — if the user already has a vision |
| Result of `$competitor-content-analysis` | ⬚ | Competitors' visual style — for differentiation |

> If brand guidelines are not provided — **request them** or direct to `$brand-guidelines`. A moodboard without a brand = arbitrary style.

## Link to `$brand-guidelines`

A moodboard **does not replace** brand guidelines — it **expands** them for a specific context:

| Aspect | `$brand-guidelines` | Moodboard |
|--------|---------------------|---------|
| Palette | Fixed brand palette | Extended palette for the campaign (within brand boundaries) |
| Typography| Approved fonts | Accent techniques (sizes, positioning) |
| Photo Style | General style rules | Specific references for this particular task |
| Mood | Brand character (archetype) | Mood of the specific campaign |

> **Rule:** If the moodboard contradicts `$brand-guidelines` — the moodboard is wrong. Brand guidelines take priority.

## Protocol

### Step 1 — Context and Constraints
1. Determine **what** the moodboard is for (campaign / series / content unit).
2. Load `$brand-guidelines` — lock in the palette, style, and typography as constraints.
3. Define the persona → what visual style resonates with the target audience.
4. Define the platform → visual expectations of the channel.

### Step 2 — Mood and Emotion
1. Define the **primary emotion** (1 word): confidence, inspiration, calmness, energy, warmth, provocation, premium, playfulness.
2. Define the **secondary emotion** (nuance): professionalism + warmth, energy + minimalism.
3. Describe the **atmosphere** in 2-3 sentences — as if describing a movie frame.

### Step 3 — Color Palette
1. Take the **primary brand colors** from `$brand-guidelines`.
2. Expand for the campaign: add 1-2 **complementary colors** harmonious with the brand.
3. Determine **roles**: dominant (60%), secondary (30%), accent (10%).
4. Provide HEX + descriptive name.

### Step 4 — References
1. Select **6-10 references** (describe them in text, do not attach files).
2. Categorize each — what exactly are we taking from it:

| Category | What we take | Example |
|-----------|----------|--------|
| **Palette** | Color scheme | "Muted earth tones from this shot" |
| **Composition**| Element placement, framing| "Lots of negative space, subject shifted to the right" |
| **Style** | Medium, post-processing | "Matte finish, soft light, editorial feel" |
| **Typography** | Font application | "Bold sans-serif on a contrasting background" |
| **Mood** | Overall feeling | "Calmness + confidence, like the Aesop brand" |
| **Texture / Pattern**| Background elements | "Subtle film grain, grain effect" |

3. For each reference — state **what we do NOT take** (if something in the ref doesn't fit).

### Step 5 — Typography
1. **Headlines** — font, weight, size, special features (caps, tracking).
2. **Body text** — font, weight.
3. **Accents** — quotes, callouts, CTAs.
4. Keep everything within `$brand-guidelines` (or provide reasoning for expansion).

### Step 6 — Image Type and Style
1. Determine the **primary medium**: photo / illustration / 3D / flat / mixed.
2. Describe **stylistic characteristics** in detail (lighting, grading, filters, textures).
3. Identify **visual patterns** — repeating elements (geometry, gradients, frames, overlays).

### Step 7 — Do / Don't
For every key aspect (palette, style, composition, typography):
- ✅ **Do:** A specific example of what works.
- ❌ **Don't:** A specific example of what is prohibited, and why.

### Step 8 — Platform Adaptation
If the moodboard is for multiple platforms — specify the differences:

| Platform | Visual Accent | Characteristics |
|-----------|------------------|-------------|
| **Instagram** | Vibrant, vertical, mobile-first | Large text, readable on phones, visual > text |
| **LinkedIn** | Professional, restrained | Infographics, data, minimalism |
| **Telegram** | Informative, compact | Horizontal images, not overloaded |
| **YouTube** | Clickable, high contrast | Thumbnails: face + text + emotion |

## Validation (Quality Gate)

The moodboard is considered ready if:

- [ ] Task context is defined (what the moodboard is for)
- [ ] Mood and atmosphere are described (primary + secondary emotion)
- [ ] Palette: 3-5 colors with roles, does not contradict `$brand-guidelines`
- [ ] References: 6-10 items, each categorized (what to take + what NOT to take)
- [ ] Typography is defined (within `$brand-guidelines`)
- [ ] Image type and style are detailed
- [ ] Do / Don't: at least 2 for palette, style, and composition
- [ ] Platform adaptations are listed (if multiple platforms)
- [ ] No contradictions with `$brand-guidelines`
- [ ] Approved by the user

## Handoff

| Consumer | How it's used |
|-------------|---------------|
| `$visual-brief` | **Primary consumer** — the moodboard defines the style, the visual brief specifies the task |
| `$image-prompt-engineering` | Style, palette, mood → keywords for the prompt |
| Visual Concept (agent) | General visual direction for creating creatives |
| `$brand-guidelines` | If the moodboard is highly successful — elements can be integrated into brand guidelines |

When handing off — use `$handoff` and attach the full moodboard.

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$brand-guidelines` | **Source + constraint:** palette, style, typography — moodboard expands them, doesn't contradict |
| `$audience-analysis` | **Source:** persona → visual expectations of the audience |
| `$competitor-content-analysis` | **Source:** competitors' visual style → differentiation |
| `$platform-strategy` | **Source:** platform → visual expectations of the channel |
| `$visual-brief` | **Consumer:** moodboard → visual brief for a specific task |
| `$image-prompt-engineering` | **Consumer:** style and palette → prompt for AI generation |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Moodboard contradicts brand | Visuals are not recognizable as the brand | Always verify compatibility with `$brand-guidelines` |
| References without categorization | "I like it" — but what specifically? | For each: what do we take (palette? style? composition?) |
| One emotion for everything| "Beautiful" is not a mood | Primary + secondary emotion, atmosphere description |
| 10-color palette | Chaos, no recognizability | 3-5 colors with clear roles (60/30/10) |
| No "banned" styles | The designer might go the wrong way | Do / Don't are mandatory |
| Moodboard without a persona| Visuals for yourself, not the audience | Leverage visual expectations from `$audience-analysis` |
| Same moodboard for all platforms| Instagram ≠ LinkedIn visually | Ensure platform adaptations |
| Copying a competitor | No differentiation | Competitor references are for understanding, not copying |

## Output Template

```
### Moodboard — [Campaign / Content]

**Context:** [what this moodboard is for]
**Brand:** [name]
**Persona:** [from $audience-analysis]
**Platform:** [platform(s)]

---

#### 1. Mood and Emotion
- **Primary emotion:** [one word]
- **Secondary emotion:** [nuance]
- **Atmosphere:** [2-3 sentences — like a movie frame]

---

#### 2. Color Palette

| Role | HEX | Name | Description | From brand? |
|------|-----|----------|----------|:----------:|
| Dominant (60%) | #[hex] | [color name] | [warm, muted, etc.] | ✅ / expansion |
| Secondary (30%)| #[hex] | [name] | [description] | ✅ / expansion |
| Accent (10%) | #[hex] | [name] | [description] | ✅ / expansion |
| Complementary | #[hex] | [name] | [description] | expansion |

---

#### 3. Typography

| Element | Font / Style | Weight | Features | From brand? |
|---------|--------------|------------|-------------|:----------:|
| Headlines | [font] | [Bold / Black] | [ALL CAPS, tracking +50] | ✅ |
| Body text | [font] | [Regular] | [standard] | ✅ |
| Accent / CTA | [font] | [SemiBold] | [description] | ✅ |

---

#### 4. Visual References

| # | Reference Description | Category | What we take | What we do NOT take |
|---|--------------------|-----------|-----------|--------------| 
| 1 | [What is pictured, style, source/brand] | Palette | [what specifically] | [what doesn't fit] |
| 2 | [description] | Composition| [what we take] | [what we do not take] |
| 3 | [description] | Style | [what we take] | — |
| 4 | [description] | Mood | [what we take] | [what we do not take] |
| 5 | [description] | Typography | [what we take] | — |
| 6 | [description] | Texture | [what we take] | — |

---

#### 5. Image Type and Style

- **Primary medium:** [photo / illustration / 3D / flat / mixed]
- **Style:** [detailed description: lighting, grading, filters]
- **Textures:** [grain, noise, smooth, matte, glossy]
- **Visual patterns:** [geometry, gradients, frames, overlays]

---

#### 6. Do / Don't

**Palette:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [example + description] | [example + why not] |
| [example] | [example] |

**Style:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [example + description] | [example + why not] |
| [example] | [example] |

**Composition:**
| ✅ Do | ❌ Don't |
|-------|---------|
| [example + description] | [example + why not] |
| [example] | [example] |

---

#### 7. Platform Adaptations (if multiple platforms)

| Platform | Visual Accent | Adaptation relative to core moodboard |
|-----------|------------------|------------------------------------------|
| [platform 1] | [accent] | [what changes] |
| [platform 2] | [accent] | [what changes] |

---

**Compatibility with `$brand-guidelines`:** [✅ Full / ⚠️ Expansions: [list]]

**→ Next step:** hand off to `$visual-brief` → `$image-prompt-engineering` → Visual Concept
```
