import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";
import type { SourceCatalog } from "./types.js";

const fileNameSchema = z.string().min(1);

/**
 * Builds source catalog from repository folders and validates required paths.
 * @param projectDir Absolute path to repository root.
 * @returns Source catalog including orchestrator, agents, skills, and workflows.
 */
export async function loadSourceCatalog(projectDir: string): Promise<SourceCatalog> {
  const orchestratorPath = path.join(projectDir, "AGENTS.md");
  const agentsDir = path.join(projectDir, "agents");
  const dotAgentsDir = path.join(projectDir, ".agents");
  const nestedSkillsDir = path.join(dotAgentsDir, "skills");
  const workflowsDir = path.join(dotAgentsDir, "workflows");

  if (!(await fs.pathExists(orchestratorPath))) {
    throw new Error(`Missing AGENTS.md at ${orchestratorPath}`);
  }
  if (!(await fs.pathExists(agentsDir))) {
    throw new Error(`Missing agents directory at ${agentsDir}`);
  }
  if (!(await fs.pathExists(dotAgentsDir))) {
    throw new Error(`Missing .agents directory at ${dotAgentsDir}`);
  }

  const agentFiles = await mapAgentFiles(agentsDir);
  const skillFiles: Record<string, string> = {};

  if (await fs.pathExists(nestedSkillsDir)) {
    Object.assign(skillFiles, await mapSkillFilesFromNestedRoot(nestedSkillsDir));
  }

  Object.assign(skillFiles, await mapSkillFilesFromFlatRoot(dotAgentsDir));

  if (Object.keys(skillFiles).length === 0) {
    throw new Error(
      `Missing skills directory. Checked ${nestedSkillsDir} and legacy flat skill folders inside ${dotAgentsDir}`,
    );
  }

  const workflowFiles = await mapWorkflowFiles(workflowsDir);
  const extraFiles = await mapExtraFiles(projectDir);

  return {
    rootDir: projectDir,
    orchestratorPath,
    agentFiles,
    skillFiles,
    workflowFiles,
    extraFiles,
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
 * Maps skills from legacy flat .agents folders that contain SKILL.md.
 * @param agentsRoot Absolute .agents directory path.
 * @returns Skill name to SKILL.md path mapping.
 */
async function mapSkillFilesFromFlatRoot(agentsRoot: string): Promise<Record<string, string>> {
  const entries = await fs.readdir(agentsRoot);
  const result: Record<string, string> = {};

  for (const entry of entries) {
    fileNameSchema.parse(entry);
    if (entry === "skills" || entry === "workflows") {
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

/**
 * Maps workflow markdown files from .agents/workflows.
 * @param workflowsDir Absolute workflow directory path.
 * @returns Workflow file name to absolute path mapping.
 */
async function mapWorkflowFiles(workflowsDir: string): Promise<Record<string, string>> {
  if (!(await fs.pathExists(workflowsDir))) {
    return {};
  }

  const entries = await fs.readdir(workflowsDir);
  const result: Record<string, string> = {};

  for (const entry of entries) {
    fileNameSchema.parse(entry);
    if (!entry.endsWith(".md")) {
      continue;
    }
    result[entry] = path.join(workflowsDir, entry);
  }

  return result;
}

/**
 * Known root-level extra files to include in install.
 */
const EXTRA_FILE_NAMES = ["prompt-examples.md", "CONTEXT.md"];

/**
 * Maps optional root-level extra files for installation.
 * @param projectDir Absolute project root path.
 * @returns Extra file name to absolute path mapping.
 */
async function mapExtraFiles(projectDir: string): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  for (const fileName of EXTRA_FILE_NAMES) {
    const filePath = path.join(projectDir, fileName);
    if (await fs.pathExists(filePath)) {
      result[fileName] = filePath;
    }
  }

  return result;
}

