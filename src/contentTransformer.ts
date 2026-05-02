import type { TargetId } from "./types.js";

interface ModelHint {
  model: "codex" | "copilot" | "claude" | "qwen" | "gemini" | "kimi";
  payload: string;
}

const hintRegex = /<!--\s*(codex|copilot|claude|qwen|gemini|kimi)\s*:\s*([\s\S]*?)-->\s*\n?/gi;

/**
 * Transforms markdown content for selected AI target.
 * @param input Original file content.
 * @param target Target AI identifier.
 * @param assetType Installed asset type.
 * @returns Target-normalized markdown content.
 */
export function transformContentForTarget(
  input: string,
  target: TargetId,
  assetType: "orchestrator" | "agent" | "skill",
): string {
  const normalizedInput = stripBom(input).replace(/\r\n/g, "\n");

  const parsedHints: ModelHint[] = [];
  const foundHints = new Set<string>();
  const cleaned = normalizedInput.replace(hintRegex, (_match, model, payload) => {
      const normalizedModel = String(model).toLowerCase() as ModelHint["model"];
      foundHints.add(normalizedModel);
      parsedHints.push({ model: normalizedModel, payload: String(payload).trim() });
      return "";
    });

  const marker = buildMarker(target, assetType, [...foundHints]);
  const mappedHint = buildMappedHint(target, parsedHints);
  const output = cleaned.trimStart();
  return `${marker}${mappedHint}${output.endsWith("\n") ? output : `${output}\n`}`;
}

/**
 * Returns content without UTF-8 BOM prefix.
 * @param value Raw content.
 * @returns BOM-free content.
 */
function stripBom(value: string): string {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

/**
 * Builds target marker block for transformed files.
 * @param target Target AI identifier.
 * @param assetType Installed asset type.
 * @param foundHints Removed model-specific hints.
 * @returns Marker prefix.
 */
function buildMarker(
  target: TargetId,
  assetType: "orchestrator" | "agent" | "skill",
  foundHints: string[],
): string {
  const hints = foundHints.length > 0 ? foundHints.join(",") : "none";
  return `<!-- code-ai: target=${target}; asset=${assetType}; normalized_hints=${hints} -->\n`;
}

/**
 * Builds target model hint from available source hints.
 * @param target Target AI identifier.
 * @param hints Parsed source hints.
 * @returns Target-specific hint marker or empty string.
 */
function buildMappedHint(target: TargetId, hints: ModelHint[]): string {
  const targetModel = targetToModel(target);
  const native = hints.find((hint) => hint.model === targetModel);
  if (native) {
    return `<!-- ${targetModel}: ${native.payload} -->\n`;
  }

  const codex = hints.find((hint) => hint.model === "codex");
  if (!codex) {
    return `<!-- ${targetModel}: ${defaultPayloadForTarget(targetModel)} -->\n`;
  }

  const mappedPayload = mapCodexPayload(codex.payload, targetModel);
  return `<!-- ${targetModel}: ${mappedPayload} -->\n`;
}

/**
 * Returns fallback payload when source markdown has no model hints.
 * @param targetModel Destination model label.
 * @returns Default target-model payload.
 */
function defaultPayloadForTarget(targetModel: ModelHint["model"]): string {
  if (targetModel === "copilot") {
    return "reasoning=medium; note=\"auto-adapted default\"";
  }
  if (targetModel === "claude") {
    return "thinking=medium; note=\"auto-adapted default\"";
  }
  if (targetModel === "qwen") {
    return "reasoning_effort=medium; note=\"auto-adapted default\"";
  }
  if (targetModel === "gemini") {
    return "reasoning=medium; note=\"auto-adapted default\"";
  }
  if (targetModel === "kimi") {
    return "reasoning=medium; note=\"auto-adapted default\"";
  }
  return "reasoning=medium; note=\"auto-adapted default\"";
}

/**
 * Maps target id to hint model label.
 * @param target Target AI identifier.
 * @returns Target model name used in markdown hints.
 */
function targetToModel(target: TargetId): ModelHint["model"] {
  if (target === "vscode-copilot") {
    return "copilot";
  }
  if (target === "claude") {
    return "claude";
  }
  if (target === "qwen-3.5") {
    return "qwen";
  }
  if (target === "google-antugravity") {
    return "gemini";
  }
  if (target === "moonshot-kimi") {
    return "kimi";
  }
  return "codex";
}

/**
 * Converts codex hint payload to a target-model hint payload.
 * @param payload Codex payload (for example: reasoning=high; note="..." ).
 * @param targetModel Destination model.
 * @returns Converted payload string.
 */
function mapCodexPayload(payload: string, targetModel: ModelHint["model"]): string {
  const reasoning = extractValue(payload, "reasoning");
  const note = extractValue(payload, "note");
  const normalizedReasoning = normalizeReasoning(reasoning);

  if (targetModel === "claude") {
    const thinking = mapReasoningToClaude(normalizedReasoning);
    return withNote(`thinking=${thinking}`, note);
  }
  if (targetModel === "qwen") {
    const effort = mapReasoningToQwen(normalizedReasoning);
    return withNote(`reasoning_effort=${effort}`, note);
  }
  if (targetModel === "gemini") {
    const effort = mapReasoningToGemini(normalizedReasoning);
    return withNote(`reasoning=${effort}`, note);
  }
  if (targetModel === "copilot") {
    return withNote(`reasoning=${normalizedReasoning}`, note);
  }
  if (targetModel === "kimi") {
    const effort = mapReasoningToKimi(normalizedReasoning);
    return withNote(`reasoning=${effort}`, note);
  }

  return withNote(`reasoning=${normalizedReasoning}`, note);
}

/**
 * Maps normalized reasoning to Kimi reasoning levels.
 * @param reasoning Normalized codex reasoning.
 * @returns Kimi reasoning level.
 */
function mapReasoningToKimi(reasoning: "low" | "medium" | "high" | "extra_high"): "low" | "medium" | "high" {
  if (reasoning === "extra_high") {
    return "high";
  }
  return reasoning;
}

/**
 * Reads one key value from semicolon-separated payload.
 * @param payload Input payload string.
 * @param key Value key name.
 * @returns Extracted value without quotes.
 */
function extractValue(payload: string, key: string): string {
  const pattern = new RegExp(`${key}\\s*=\\s*("([^"]*)"|[^;]+)`, "i");
  const match = payload.match(pattern);
  if (!match) {
    return "";
  }
  const raw = match[2] ?? match[1] ?? "";
  return raw.trim();
}

/**
 * Normalizes codex reasoning aliases into low/medium/high/extra_high.
 * @param value Raw reasoning value.
 * @returns Normalized reasoning value.
 */
function normalizeReasoning(value: string): "low" | "medium" | "high" | "extra_high" {
  const normalized = value.trim().toLowerCase();
  if (normalized === "xhigh" || normalized === "very_high" || normalized === "extra-high") {
    return "extra_high";
  }
  if (normalized === "extra_high") {
    return "extra_high";
  }
  if (normalized === "high") {
    return "high";
  }
  if (normalized === "low") {
    return "low";
  }
  return "medium";
}

/**
 * Maps normalized reasoning to Claude thinking levels.
 * @param reasoning Normalized codex reasoning.
 * @returns Claude thinking level.
 */
function mapReasoningToClaude(reasoning: "low" | "medium" | "high" | "extra_high"): "low" | "medium" | "high" | "max" {
  if (reasoning === "extra_high") {
    return "max";
  }
  return reasoning;
}

/**
 * Maps normalized reasoning to Qwen effort levels.
 * @param reasoning Normalized codex reasoning.
 * @returns Qwen reasoning effort.
 */
function mapReasoningToQwen(reasoning: "low" | "medium" | "high" | "extra_high"): "low" | "medium" | "high" {
  if (reasoning === "extra_high") {
    return "high";
  }
  return reasoning;
}

/**
 * Maps normalized reasoning to Gemini reasoning levels.
 * @param reasoning Normalized codex reasoning.
 * @returns Gemini reasoning level.
 */
function mapReasoningToGemini(reasoning: "low" | "medium" | "high" | "extra_high"): "low" | "medium" | "high" {
  if (reasoning === "extra_high") {
    return "high";
  }
  return reasoning;
}

/**
 * Appends optional note to mapped hint payload.
 * @param base Base payload.
 * @param note Optional note value.
 * @returns Payload with optional quoted note.
 */
function withNote(base: string, note: string): string {
  if (!note) {
    return base;
  }
  return `${base}; note="${note}"`;
}
