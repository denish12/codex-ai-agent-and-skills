import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";
import type { SourceCatalog } from "./types.js";

const fileNameSchema = z.string().min(1);

/**
 * Builds source catalog from repository folders and validates required paths.
 * @param projectDir Absolute path to repository root.
 * @returns Source catalog including orchestrator, agents, and skills.
 */
export async function loadSourceCatalog(projectDir: string): Promise<SourceCatalog> {
  const orchestratorPath = path.join(projectDir, "AGENTS.md");
  const agentsDir = path.join(projectDir, "agents");
  const legacySkillsDir = path.join(projectDir, ".agents", "skills");
  const flatSkillsDir = path.join(projectDir, ".agents");

  if (!(await fs.pathExists(orchestratorPath))) {
    throw new Error(`Missing AGENTS.md at ${orchestratorPath}`);
  }
  if (!(await fs.pathExists(agentsDir))) {
    throw new Error(`Missing agents directory at ${agentsDir}`);
  }
  const hasLegacySkillsDir = await fs.pathExists(legacySkillsDir);
  const hasFlatSkillsDir = await fs.pathExists(flatSkillsDir);
  if (!hasLegacySkillsDir && !hasFlatSkillsDir) {
    throw new Error(
      `Missing skills directory. Checked ${legacySkillsDir} and ${flatSkillsDir}`,
    );
  }

  const agentFiles = await mapAgentFiles(agentsDir);
  const skillFiles: Record<string, string> = {};
  if (hasLegacySkillsDir) {
    Object.assign(skillFiles, await mapSkillFilesFromNestedRoot(legacySkillsDir));
  }
  if (hasFlatSkillsDir) {
    Object.assign(skillFiles, await mapSkillFilesFromFlatRoot(flatSkillsDir));
  }

  return {
    rootDir: projectDir,
    orchestratorPath,
    agentFiles,
    skillFiles,
  };
}

/**
 * Returns available role names from catalog map.
 * @param catalog Source catalog.
 * @returns Sorted agent names.
 */
export function listAgentNames(catalog: SourceCatalog): string[] {
  return Object.keys(catalog.agentFiles).sort((a, b) => a.localeCompare(b));
}

/**
 * Returns available skill names from catalog map.
 * @param catalog Source catalog.
 * @returns Sorted skill names.
 */
export function listSkillNames(catalog: SourceCatalog): string[] {
  return Object.keys(catalog.skillFiles).sort((a, b) => a.localeCompare(b));
}

/**
 * Resolves selected names, expanding "all" and validating values.
 * @param selected Comma-separated user selection string.
 * @param available List of available names.
 * @param entityLabel Human-readable entity label for errors.
 * @returns Validated selection array.
 */
export function resolveSelection(selected: string, available: string[], entityLabel: string): string[] {
  const normalized = selected
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  if (normalized.length === 0 || normalized.includes("all")) {
    return [...available];
  }

  const missing = normalized.filter((name) => !available.includes(name));
  if (missing.length > 0) {
    throw new Error(`Unknown ${entityLabel}: ${missing.join(", ")}`);
  }

  return normalized;
}

/**
 * Maps agent markdown files from agents directory.
 * @param agentsDir Absolute agents directory path.
 * @returns Agent name to file path mapping.
 */
async function mapAgentFiles(agentsDir: string): Promise<Record<string, string>> {
  const entries = await fs.readdir(agentsDir);
  const result: Record<string, string> = {};

  for (const entry of entries) {
    fileNameSchema.parse(entry);
    if (!entry.endsWith(".md")) {
      continue;
    }
    const key = entry.replace(/\.md$/i, "");
    result[key] = path.join(agentsDir, entry);
  }

  return result;
}

/**
 * Maps skills from nested skill directories ending with SKILL.md.
 * @param skillsDir Absolute skills directory path.
 * @returns Skill name to SKILL.md path mapping.
 */
async function mapSkillFilesFromNestedRoot(skillsDir: string): Promise<Record<string, string>> {
  const entries = await fs.readdir(skillsDir);
  const result: Record<string, string> = {};

  for (const entry of entries) {
    fileNameSchema.parse(entry);
    const skillFile = path.join(skillsDir, entry, "SKILL.md");
    if (!(await fs.pathExists(skillFile))) {
      continue;
    }
    result[entry] = skillFile;
  }

  return result;
}

/**
 * Maps skills from nested .agents folders that contain SKILL.md.
 * @param agentsRoot Absolute .agents directory path.
 * @returns Skill name to SKILL.md path mapping.
 */
async function mapSkillFilesFromFlatRoot(agentsRoot: string): Promise<Record<string, string>> {
  const entries = await fs.readdir(agentsRoot);
  const result: Record<string, string> = {};

  for (const entry of entries) {
    fileNameSchema.parse(entry);
    if (entry === "skills") {
      continue;
    }
    const skillFile = path.join(agentsRoot, entry, "SKILL.md");
    if (!(await fs.pathExists(skillFile))) {
      continue;
    }
    result[entry] = skillFile;
  }

  return result;
}
