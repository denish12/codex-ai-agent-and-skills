---
name: image-prompt-engineering
description: Prompt engineering for AI images — tool templates, style library, composition, brand palette, artifact workarounds
---
# Image Prompt Engineering

## When to Use
- When creating **AI-generated images** for content (Midjourney, DALL-E, Stable Diffusion, Flux).
- When **iterating** — the result doesn't meet expectations, the prompt needs refinement.
- As part of **`$visual-brief`** — the prompt is created based on the visual brief.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Visual brief | ✅ | From `$visual-brief` — what should be in the image, mood, style |
| Brand palette | ✅ | From `$brand-guidelines` — colors (HEX), photography/illustration style |
| Platform | ✅ | Determines aspect ratio and style |
| Tool | ✅ | Midjourney / DALL-E 3 / Stable Diffusion / Flux — different syntax |
| Mood | ⬚ | If not specified in the visual brief — determine from the content context |
| References | ⬚ | Examples of the desired style — URL or description |
| Text on image | ⬚ | If text is needed — specify (or avoid AI text generation) |

> If the visual brief is not provided — **request** it or point to `$visual-brief`. A prompt without a brief = a random result.

## Prompt Anatomy

A prompt is built from blocks, from specific to general:

```
[1. Subject] + [2. Action/Pose] + [3. Environment] + [4. Style/Medium] + 
[5. Lighting] + [6. Color Palette] + [7. Composition/Angle] + 
[8. Mood] + [9. Technical Parameters]
```

| Block | Description | Keyword Examples |
|------|----------|----------------------|
| **1. Subject** | Who/what is in the center. As specific as possible. | "young woman in a navy blazer", "abstract geometric shapes", "coffee cup on marble table" |
| **2. Action/Pose** | What the subject is doing | "working on laptop", "looking at camera", "floating in mid-air" |
| **3. Environment** | Where it is located, background | "modern office", "white studio background", "autumn forest" |
| **4. Style/Medium** | How it looks (see library) | "editorial photography", "flat illustration", "3D render" |
| **5. Lighting** | Type of light | "soft natural light", "dramatic side lighting", "golden hour" |
| **6. Palette** | Colors (tie to brand) | "teal and coral color scheme", "monochrome blue tones" |
| **7. Composition** | Angle and framing (see table) | "close-up", "bird's eye view", "rule of thirds" |
| **8. Mood** | Emotion / atmosphere | "calm and professional", "energetic and bold", "minimalist and clean" |
| **9. Parameters** | Technical (depends on the tool) | `--ar 4:5 --v 6.1 --q 2` (MJ), size (DALL-E) |

## Style Library

### Photography

| Style | Keywords | When to Use |
|-------|---------------|-------------------|
| **Editorial** | editorial photography, magazine style, high fashion | Image content, brand |
| **Lifestyle** | lifestyle photography, candid, authentic, natural | Social media, everyday scenes |
| **Product** | product photography, studio lighting, clean background | E-commerce, goods |
| **Documentary** | documentary style, photojournalism, raw, unfiltered | Case studies, behind the scenes |
| **Cinematic** | cinematic, anamorphic, film grain, shallow depth of field | YouTube thumbnails, hero images |
| **Minimal** | minimalist photography, negative space, clean composition | B2B, tech, premium |
| **Aerial** | drone shot, aerial view, bird's eye perspective | Landscapes, large-scale scenes |

### Illustration

| Style | Keywords | When to Use |
|-------|---------------|-------------------|
| **Flat** | flat illustration, vector style, clean lines, solid colors | UI, infographics, tech |
| **Isometric** | isometric illustration, 3D isometric, technical | Diagrams, processes, tech |
| **Watercolor** | watercolor painting, soft edges, flowing colors | Lifestyle, wellness, premium |
| **Line art** | line drawing, ink illustration, hand-drawn | Minimalism, education |
| **Retro/Vintage** | retro illustration, 70s style, vintage poster | Entertainment, nostalgia |
| **Cartoon** | cartoon style, character design, playful | Humor, youth, mascot |
| **Geometric** | geometric abstract, shapes, bauhaus style | Tech, modern, branding |

### 3D and Digital

| Style | Keywords | When to Use |
|-------|---------------|-------------------|
| **3D Render** | 3D render, octane render, cinema 4D, glossy | Tech, product, hero images |
| **Clay/Soft 3D** | clay render, soft 3D, pastel, rounded shapes | Friendly tech, SaaS, startup |
| **Glassmorphism** | frosted glass, translucent, glassmorphism | UI style, modern tech |
| **Neon/Cyberpunk** | neon lights, cyberpunk, futuristic, dark | Gaming, nightlife, tech events |
| **Paper craft** | paper cut art, layered paper, shadow depth | Creative, craft, eco |

## Composition and Angles

| Technique | Keywords | Effect |
|-------|---------------|--------|
| **Close-up** | close-up shot, macro, detailed | Focus on details, emotion |
| **Medium shot** | medium shot, waist-up, half-body | Balance of subject and context |
| **Wide shot** | wide shot, full-body, establishing shot | Context, environment |
| **Bird's eye** | bird's eye view, top-down, flat lay | Overview, flat lay photos |
| **Low angle** | low angle shot, worm's eye view | Power, dominance |
| **Rule of thirds** | rule of thirds composition, off-center | Dynamics, professionalism |
| **Symmetry** | symmetrical composition, centered | Order, premium |
| **Negative space** | lots of negative space, minimalist | Room for text, cleanliness |
| **Dutch angle** | dutch angle, tilted, dynamic | Tension, energy |
| **Over the shoulder** | over the shoulder shot, POV | Engagement, perspective |

## Prompt Structure by Tool

### Midjourney

```
[subject], [action], [environment], [style], [lighting], [palette], [composition], [mood] --ar [ratio] --v 6.1 --q 2 --s [stylize 0-1000]
```

| Parameter | Description | Values |
|----------|----------|----------|
| `--ar` | Aspect ratio | `1:1`, `4:5`, `16:9`, `9:16` |
| `--v` | Model version | `6.1` (current) |
| `--q` | Quality | `1` (standard), `2` (high) |
| `--s` | Stylization | `0` (strictly follows prompt) — `1000` (highly artistic) |
| `--no` | Negative prompt | `--no text, watermark, blur` |
| `--chaos` | Variance | `0` (predictable) — `100` (chaotic) |

### DALL-E 3

```
Descriptive text in natural language. Detailed description of the scene, style, mood.
Size: 1024x1024, 1792x1024, 1024x1792.
```

**Features:**
- Accepts natural language (not tags).
- Describe the scene entirely, like a story.
- No negative prompt — instead, explicitly state "without text", "no people".
- Better at handling text in images (but not perfect).

### Stable Diffusion / Flux

```
[subject], [action], [environment], [style], [lighting], [palette], [quality tags]

Negative prompt: [what to exclude]
Steps: 30-50, CFG: 7-12, Sampler: DPM++ 2M Karras
```

**Features:**
- Comma-separated tags, quality tags at the end: `masterpiece, best quality, 8k`.
- Negative prompt — a separate field, critically important.
- More control via ControlNet, LoRA, img2img.

## Tying to the Brand Palette

How to embed brand colors from `$brand-guidelines`:

| Method | Example | Reliability |
|-------|--------|------------|
| **Direct HEX Specification** | `color palette of #1A73E8 and #FFC107` | Medium (AI interprets approximately) |
| **Color Description** | `deep ocean blue and warm amber tones` | High (AI understands descriptions better) |
| **Mood Reference** | `corporate blue and gold, professional` | High |
| **Palette Restriction** | `monochrome using only shades of teal` | High |
| **Negative Control** | `--no red, green, warm colors` (MJ) | High |

> Best approach: **color description + negative exclusion** of unwanted colors.

## Typical AI Issues and Workarounds

| Issue | Symptom | Workaround |
|----------|---------|------------|
| **Hands / fingers** | 6 fingers, deformation | Hide hands: "hands behind back", "hands in pockets", "close-up of face only" |
| **Text on image** | Garbage text, distorted letters | Add to negative: `--no text, letters, words`. Add text in an editor. For DALL-E 3: you can try, but verify |
| **Faces** | Uncanny valley, asymmetrical | Specify: `natural facial features, photorealistic portrait`. Or turn away: `back view, silhouette` |
| **Symmetry** | Asymmetrical objects | Add: `perfectly symmetrical, mirror symmetry` |
| **Too literal** | AI interprets a metaphor as an object | Add: `artistic interpretation, conceptual` |
| **Oversaturation** | Colors are too bright, acidic | Add: `muted tones, desaturated, soft palette`. Negative: `--no oversaturated, neon` |
| **Too many details** | Chaotic composition | Add: `minimalist, clean, simple composition, negative space` |
| **Wrong style** | AI doesn't understand the style | Use reference: `in the style of [specific style]`, add 2-3 style tags |
| **AI artifacts** | Blurry areas, compression artifacts | Upscale, inpaint problem areas, or regenerate with `--q 2` |

## Protocol

### Step 1 — Context Gathering
1. Get the visual brief (`$visual-brief`) — what to depict, mood, style.
2. Load the brand palette (`$brand-guidelines`) — colors, style.
3. Determine platform → aspect ratio.
4. Determine the generation tool.

### Step 2 — Prompt Assembly
1. Fill all 9 blocks of the prompt anatomy.
2. Choose a style from the library.
3. Choose composition/angle.
4. Embed brand palette (description + negative).
5. Add technical tool parameters.

### Step 3 — Negative Prompt
1. Base set: `ugly, blurry, low quality, watermark, distorted, deformed`.
2. Add contextual exclusions: unwanted colors, objects, styles.
3. Add workarounds (text, hands — if relevant).

### Step 4 — Variants
1. Create **3 variants** with different focuses:
   - Variant A — primary (exactly to brief).
   - Variant B — different style (alternative medium).
   - Variant C — different composition (different angle).
2. If a version for another tool is needed — adapt the syntax.

### Step 5 — Pre-generation Checklist
Before generating, verify:
1. Is the subject specific? (Not "person", but "young woman in navy blazer, short dark hair")
2. Is the style defined? (Not "beautiful", but "editorial photography, soft natural light")
3. Does the palette match the brand?
4. Is the aspect ratio correct for the platform?
5. Is the negative prompt adequate?
6. No request for text (if the tool handles it poorly)?

## Validation (Quality Gate)

A prompt is considered ready if:

- [ ] All 9 anatomy blocks are filled (or consciously omitted)
- [ ] Style is chosen from the library and matches `$brand-guidelines`
- [ ] Palette is tied to the brand (description + negative)
- [ ] Aspect ratio matches the platform
- [ ] Negative prompt includes the base set + contextual exclusions
- [ ] Created ≥ 3 variants with different focuses
- [ ] Pre-generation checklist is passed
- [ ] Prompt is adapted for a specific tool (syntax, parameters)

## Handoff

| Consumer | How it's used |
|-------------|---------------|
| `$visual-brief` | Prompt as part of the visual brief |
| Visual Concept (agent) | Generates images from prompts |
| `$content-review-checklist` | Reviewer checks generation results (item #25 — AI artifacts) |
| `$content-release-gate` | AI prompts attached to the publication package |

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$visual-brief` | **Source:** WHAT to depict → prompt describes HOW |
| `$brand-guidelines` | **Source:** palette, photo/illustration style |
| `$platform-visual-specs` | **Source:** sizes and aspect ratios |
| `$moodboard` | **Source:** mood and style references |
| `$content-review-checklist` | **Consumer:** verifies results for AI artifacts |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| "Beautiful image of marketing" | Too abstract, AI doesn't know what to generate | Specific subject: "woman presenting data on screen in modern office" |
| 3-word prompt | Insufficient context | Fill all 9 anatomy blocks |
| 200-word prompt | AI loses focus, erratic result | 40-80 words — optimal for MJ/SD |
| Ignoring negative prompt | Artifacts, text, watermarks | Always add base + contextual negative |
| Requesting text on image | AI handles text poorly (except DALL-E 3) | Add text in an image editor |
| Brand colors via HEX | AI interprets approximately | Describe color with words + negative for unwanted |
| One prompt without variants | No choice, first result might not fit | ≥ 3 variants with different focuses |
| Copying prompts between tools | Different syntax — MJ ≠ DALL-E ≠ SD | Adapt for each tool |

## Aspect Ratios by Platform

| Platform | Format | Ratio | MJ Parameter |
|-----------|--------|-------|-------------|
| Instagram Feed | Square | 1:1 | `--ar 1:1` |
| Instagram Feed | Portrait | 4:5 | `--ar 4:5` |
| Instagram Stories/Reels | Vertical | 9:16 | `--ar 9:16` |
| LinkedIn Post | Horizontal | 1.91:1 | `--ar 191:100` |
| YouTube Thumbnail | Horizontal | 16:9 | `--ar 16:9` |
| Twitter/X Post | Horizontal | 16:9 | `--ar 16:9` |
| Telegram Post | Horizontal | 2:1 | `--ar 2:1` |
| Pinterest | Vertical | 2:3 | `--ar 2:3` |
| OG Image (Web) | Horizontal | 1.91:1 | `--ar 191:100` |

## Output Template

```
### AI Image Prompts — [Content Name]

**Visual brief:** [link / brief description from $visual-brief]
**Tool:** [Midjourney / DALL-E 3 / Stable Diffusion / Flux]
**Platform:** [platform]
**Size:** [ratio]
**Brand palette:** [colors from $brand-guidelines — descriptively]

---

#### Prompt Anatomy

| Block | Value |
|------|----------|
| Subject | [specific description] |
| Action/Pose | [what they do] |
| Environment | [where, background] |
| Style | [from library] |
| Lighting | [type of light] |
| Palette | [brand colors description] |
| Composition | [angle, technique] |
| Mood | [emotion, atmosphere] |

---

#### Variant A — Primary (exactly to brief)

**Midjourney:**
\```
[full prompt] --ar [ratio] --v 6.1 --q 2 --s [value]
\```

**Negative:** `--no [exclusions]`

**DALL-E 3:**
"[descriptive prompt in natural language]"

---

#### Variant B — Alternative Style

**Midjourney:**
\```
[full prompt with different style] --ar [ratio] --v 6.1 --q 2
\```

---

#### Variant C — Alternative Composition

**Midjourney:**
\```
[full prompt with different angle] --ar [ratio] --v 6.1 --q 2
\```

---

#### Workarounds (if needed)
| Potential Issue | Applied Workaround |
|-----------------------|----------------------|
| [hands / text / faces] | [what was added to the prompt] |

#### Iteration Tips
- If too literal → add "artistic interpretation, conceptual"
- If wrong style → clarify: "in the style of [style]", add 2-3 style tags
- If oversaturated → add "muted tones, desaturated" + negative `--no oversaturated`
- If chaotic → add "minimalist, simple composition, negative space"

**→ Next step:** generation → review against `$content-review-checklist` (#25) → `$content-release-gate`
```
