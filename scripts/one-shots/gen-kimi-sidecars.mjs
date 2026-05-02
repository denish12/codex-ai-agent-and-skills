#!/usr/bin/env node
/**
 * One-shot generator for kimi.yaml sidecars introduced in v2.5.0.
 * Walks every skill agents/ dir and every orchestrator agents/ dir under
 * domains/ and the legacy repo root, reads claude.json (canonical model_json
 * shape), and writes a kimi.yaml mirror next to it. YAML emitter mirrors the
 * minimal one used by scripts/generate_metadata.py.
 *
 * Usage (from repo root):
 *   node scripts/one-shots/gen-kimi-sidecars.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");

const ROOTS = [
  REPO,
  path.join(REPO, "locales", "en"),
];

const domainsDir = path.join(REPO, "domains");
if (fs.existsSync(domainsDir)) {
  for (const entry of fs.readdirSync(domainsDir)) {
    const domainRoot = path.join(domainsDir, entry);
    if (!fs.statSync(domainRoot).isDirectory()) continue;
    ROOTS.push(domainRoot);
    const enRoot = path.join(domainRoot, "locales", "en");
    if (fs.existsSync(enRoot)) ROOTS.push(enRoot);
  }
}

let writtenSkill = 0;
let writtenOrchestrator = 0;
let skipped = 0;

for (const root of ROOTS) {
  const skillsRoot = path.join(root, ".agents", "skills");
  if (fs.existsSync(skillsRoot)) {
    for (const skillName of fs.readdirSync(skillsRoot)) {
      const agentsDir = path.join(skillsRoot, skillName, "agents");
      const claudePath = path.join(agentsDir, "claude.json");
      if (!fs.existsSync(claudePath)) {
        skipped++;
        continue;
      }
      const payload = JSON.parse(fs.readFileSync(claudePath, "utf8"));
      const target = path.join(agentsDir, "kimi.yaml");
      fs.writeFileSync(target, emitYaml(payload), "utf8");
      writtenSkill++;
    }
  }

  const orchestratorVendor = path.join(root, "agents", "orchestrator.claude.json");
  if (fs.existsSync(orchestratorVendor)) {
    const payload = JSON.parse(fs.readFileSync(orchestratorVendor, "utf8"));
    const target = path.join(root, "agents", "orchestrator.kimi.yaml");
    fs.writeFileSync(target, emitYaml(payload), "utf8");
    writtenOrchestrator++;
  }
}

console.log(`Wrote ${writtenSkill} skill kimi.yaml + ${writtenOrchestrator} orchestrator.kimi.yaml. Skipped ${skipped} skill dirs without claude.json.`);

function emitYaml(value, indent = 0) {
  const lines = renderLines(value, indent);
  return lines.join("\n") + "\n";
}

function renderLines(value, indent) {
  const prefix = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return [];
    const out = [];
    for (const item of value) {
      if (item !== null && typeof item === "object") {
        out.push(`${prefix}-`);
        out.push(...renderLines(item, indent + 1));
      } else {
        out.push(`${prefix}- ${scalar(item)}`);
      }
    }
    return out;
  }
  if (value !== null && typeof value === "object") {
    const out = [];
    for (const [key, nested] of Object.entries(value)) {
      if (Array.isArray(nested)) {
        if (nested.length === 0) {
          out.push(`${prefix}${key}: []`);
        } else {
          out.push(`${prefix}${key}:`);
          out.push(...renderLines(nested, indent + 1));
        }
      } else if (nested !== null && typeof nested === "object") {
        out.push(`${prefix}${key}:`);
        out.push(...renderLines(nested, indent + 1));
      } else {
        out.push(`${prefix}${key}: ${scalar(nested)}`);
      }
    }
    return out;
  }
  return [`${prefix}${scalar(value)}`];
}

function scalar(value) {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (value === null || value === undefined) return "null";
  if (typeof value === "number") return String(value);
  return JSON.stringify(String(value));
}
