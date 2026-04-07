---
name: visual-brief
description: Visual Brief — detailed visual specs including composition, moodboard/brand alignment, AI prompt connections, A/B options, and accessibility
---
# Visual Brief

## When to Use
- When creating **any visual content** — post, banner, Stories, cover, carousel, thumbnail.
- As a **specification of the `$moodboard`** — the moodboard sets the style, the visual brief describes the specific task.
- As **input for `$image-prompt-engineering`** — brief → prompt for AI generation.
- As a **spec document for a designer** — a complete specification without the need for clarifying questions.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Content Brief | ✅ | From `$content-brief` — topic, key points, CTA, persona, platform |
| Brand Guidelines | ✅ | From `$brand-guidelines` — palette, typography, logo, visual style |
| Moodboard | ⬚ | From `$moodboard` — if created for a campaign/series (mood, references, extended palette) |
| Platform & Format | ✅ | From `$platform-visual-specs` — dimensions, ratio, safe zones |
| Text on Visual | ⬚ | If text will be on the image — the exact headline, CTA |
| Executor | ⬚ | Designer / AI generation / Canva template — affects the level of detail |

> If brand guidelines are missing — **request them**. A visual brief without a brand = a random visual.

## Connection with other skills

```
$moodboard (campaign style)
       ↓
$visual-brief (Spec for specific visual) ← $content-brief (topic, CTA)
       ↓                                 ← $brand-guidelines (palette, logo)
       ↓                                 ← $platform-visual-specs (dimensions)
       ↓
$image-prompt-engineering (AI prompt)
       ↓
Visual Concept (agent) → generation / creation
       ↓
$content-review-checklist (#20-25) → check
```

## Protocol

### Step 1 — Context and Goal
1. Load `$content-brief` — understand the topic, persona, and CTA.
2. Determine the **goal of the visual**:
   - **Grab attention** — hook, stop the scroll.
   - **Convey information** — infographic, scheme, data.
   - **Evoke emotion** — mood, atmosphere, inspiration.
   - **Amplify CTA** — button, arrow, focus on action.
3. Define **what the viewer must understand in 1-3 seconds** (the main idea of the visual).

### Step 2 — Central Subject
1. Describe the **main element** of the visual — what is in focus.
2. Describe **subject details** — specifically, not abstractly:
   - ❌ "Person working"
   - ✅ "Young woman in a navy blazer working on a laptop in a bright office, smiling"
3. If there are multiple elements — describe the **hierarchy**: what is primary, what is secondary, what is background.

### Step 3 — Composition
Determine the arrangement of elements:

| Composition Element | Description | When to use |
|---------------------|-------------|-------------|
| **Focal point** | Where the viewer's eye should land first | Always — define the main anchor |
| **Rule of thirds** | Subject on the intersection of thirds | Dynamic, editorial photos |
| **Central** | Subject in the center, symmetry | Minimalism, product, logo |
| **Negative space** | Empty space for text or breathing room | If there is text on the image |
| **Text placement** | Where text will be: top / bottom / left / right / overlay | If there is a headline/CTA on the visual |
| **Z-pattern / F-pattern**| Eye movement across the visual | Complex visuals with multiple elements |
| **Grid** | Carousel or series — uniform grid | Carousels, post series |

### Step 4 — Brand Elements
From `$brand-guidelines`:
1. **Colors** — specific HEX codes. Roles: primary, accent, background.
2. **Typography** — font, size, weight (for text on the visual).
3. **Logo** — is it needed? Which variant? Position? Size?
4. **Graphic elements** — signature frames, overlays, patterns (if present in guidelines).

From `$moodboard` (if applicable):
5. **Style** — medium (photo / illustration / 3D), treatment, textures.
6. **Mood** — emotion derived from the moodboard.

### Step 5 — Text on Image
If the visual contains text:

| Element | Text | Size | Position | Style |
|---------|------|------|----------|-------|
| **Headline** | [text or "none"] | [large / medium] | [where on visual] | [weight, color] |
| **Subheadline** | [text or "none"] | [medium / small] | [where] | [style] |
| **CTA** | [text or "none"] | [size] | [where] | [button / text / arrow] |
| **Watermark / ©**| [text or "none"] | [small] | [corner] | [semi-transparent] |

**Text Rules:**
- Readability: contrast ≥ 4.5:1 (use a background shape/overlay if needed).
- Size: ≥ 16px on mobile (≈ 24px+ on source file).
- Word count: headline ≤ 7 words, subheadline ≤ 15 words.

### Step 6 — Constraints (Do / Don't)

| ✅ Mandatory | ❌ Forbidden |
|--------------|--------------|
| [what must be there] | [what is not allowed] |
| [element / style] | [element / style — reason why] |

### Step 7 — References
1. From `$moodboard` — select the **2-3 most relevant** for this specific task.
2. For each — **what exactly to take** (palette? composition? style?).
3. If there is no moodboard — describe the style with words + provide 1-2 references.

### Step 8 — Technical Specs
From `$platform-visual-specs`:
1. Dimensions (W×H px).
2. Ratio.
3. File format.
4. Safe zones.
5. For AI generation: Midjourney `--ar` parameter.

### Step 9 — Variants (A/B)
If testing visuals is required:
1. **Variant A** — primary (based on brief).
2. **Variant B** — alternative (different composition / color accent / different subject).
3. Specify the **test variable**: exactly what is different.

### Step 10 — Accessibility
1. **Alt text** — description of the image for screen readers.
2. **Contrast** — text on the image ≥ 4.5:1.
3. **Dark mode** — how will the visual look on a dark background?
4. **Not just color** — information is not conveyed by color alone (use icons, labels).

## Validation (Quality Gate)

The Visual Brief is considered complete if:

- [ ] Visual goal is defined (what the viewer understands in 1-3 seconds)
- [ ] Central subject is described specifically (not "person", but detailed)
- [ ] Composition is defined (focal point, placement, negative space for text)
- [ ] Brand elements from `$brand-guidelines` are included (HEX colors, font, logo — position and variant)
- [ ] Text on image is defined: content + size + position (or explicitly "no text")
- [ ] Tech specs from `$platform-visual-specs` are included (size, ratio, format, safe zone)
- [ ] Do/Don't constraints are listed
- [ ] References are provided (from `$moodboard` or descriptively)
- [ ] Alt text is prepared
- [ ] Text contrast is ≥ 4.5:1 (if text is on the visual)
- [ ] If A/B — the test variable is specified

## Handoff

| Consumer | How it is used |
|----------|----------------|
| `$image-prompt-engineering` | **Primary:** brief → prompt for AI generation |
| Visual Concept (agent) | Spec for creating the visual (designer or AI) |
| `$content-review-checklist` | Reviewer checks the visual against points #20-25 |
| `$content-release-gate` | Visual as part of the publication package |

When transferring — use `$handoff` and attach the full brief.

## Integration with other skills

| Skill | Interaction |
|-------|-------------|
| `$content-brief` | **Source:** topic, CTA, persona → visual goal and content |
| `$brand-guidelines` | **Source:** palette, typography, logo, visual style |
| `$moodboard` | **Source:** mood, references, extended palette |
| `$platform-visual-specs` | **Source:** dimensions, ratio, safe zones |
| `$image-prompt-engineering`| **Consumer:** brief → prompt |
| `$content-review-checklist` | **Consumer:** verifying the visual |
| `$headline-formulas` | **Source:** headline for the text on the visual |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|--------------|--------------------|
| "A pretty picture about marketing"| Abstract — designer/AI won't know what to do | Concrete subject, composition, mood |
| Brief missing brand elements| Visual will not be recognizable as the brand | Always: HEX colors, font, logo from `$brand-guidelines` |
| Text without position | Text covers a face / key element | Text placement + negative space in composition |
| No safe zones | Text hidden behind platform UI | Safe zones from `$platform-visual-specs` |
| Only 1 variant, no alternative | No options — if it fails, start from scratch | A/B: min 2 variants for key visuals |
| Brief for AI = brief for designer| Different levels of specificity are needed | For AI → use `$image-prompt-engineering` with technical parameters |
| No alt text | Inaccessible to screen readers, worse SEO | Always prepare alt text |
| Small text on visual | Unreadable on mobile | ≥ 24px on source file, verify on a phone screen |

## Output Template

```markdown
### Visual Brief — [Asset Name]

**Content Brief:** [ID / topic from $content-brief]
**Platform:** [platform]
**Dimensions:** [W × H px]
**Ratio:** [ratio]
**Format:** [JPG / PNG / WebP / MP4]
**Safe zone:** [margins — from $platform-visual-specs]
**Executor:** [designer / AI generation / template]
**Moodboard:** [link to $moodboard or "none"]

---

#### 1. Concept

- **Visual Goal:** [attract / inform / emotion / amplify CTA]
- **Main Idea (in 1-3 sec):** [what the viewer must understand]
- **Mood:** [emotion from $moodboard or description]

---

#### 2. Central Subject

**Main Element:**
[Detailed description of the subject — specifically, as if for a photographer or AI]

**Hierarchy of Elements:**
| Level | Element | Description |
|-------|---------|-------------|
| Primary | [subject] | [details] |
| Secondary | [element] | [details] |
| Background| [background]| [color / environment / texture] |

---

#### 3. Composition

| Parameter | Value |
|-----------|-------|
| Focal point | [where on visual — top-center / right third / ...] |
| Technique | [rule of thirds / central / symmetry / ...] |
| Negative space | [where to leave room for text / breathing room] |
| Text placement | [where text will be — top / bottom / left / overlay] |
| Eye movement | [from where → to where: headline → image → CTA] |

---

#### 4. Brand Elements

**Colors (from $brand-guidelines):**
| Role | HEX | Where used |
|------|-----|------------|
| Primary | #[hex] | [elements] |
| Accent | #[hex] | [elements] |
| Background | #[hex] | [background / overlay] |

**Typography (if text is on the visual):**
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Headline | [font] | [px] | [Bold] | [HEX] |
| CTA | [font] | [px] | [SemiBold] | [HEX] |

**Logo:**
- Needed: [yes / no]
- Variant: [primary / monochrome / inverted]
- Position: [corner / size]

**Graphic Elements:** [frames / overlays / patterns — from $brand-guidelines or $moodboard]

---

#### 5. Text on Image

| Element | Text | Size | Position | Style |
|---------|------|------|----------|-------|
| Headline | [text / "none"] | [large] | [top-center] | [Bold, #HEX] |
| Subheadline | [text / "none"] | [medium] | [below headline] | [Regular, #HEX] |
| CTA | [text / "none"] | [medium] | [bottom] | [button: bg #HEX, text #HEX] |

**Contrast:** [verified ≥ 4.5:1 / background overlay needed]

---

#### 6. Constraints

| ✅ Mandatory | ❌ Forbidden |
|--------------|--------------|
| [element] | [element — reason] |
| [element] | [element — reason] |

---

#### 7. References

| # | Description | From $moodboard? | What to borrow |
|---|-------------|:----------------:|----------------|
| 1 | [visual description] | ✅ / No | [palette / composition / style] |
| 2 | [description] | ✅ / No | [what to borrow] |

---

#### 8. Variants (if A/B testing)

| Variant | Difference from primary | Test Variable |
|---------|-------------------------|---------------|
| A (Primary) | — | — |
| B | [different composition / color / subject] | [what we are testing] |

---

#### 9. Accessibility

| Parameter | Value |
|-----------|-------|
| Alt text | [description for screen readers] |
| Text contrast | [≥ 4.5:1 ✅ / overlay needed] |
| Dark mode | [verified / adaptation needed] |
| Not just color | [✅ information is duplicated with icons/labels] |

---

**→ Next Step:** → `$image-prompt-engineering` (if AI) / → Designer (if manual) / → `$content-review-checklist` (after creation)
```
