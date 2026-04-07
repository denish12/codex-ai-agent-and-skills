import path from "node:path";
import fs from "fs-extra";
import type { TemplateLanguage } from "./types.js";

/**
 * Resolves source root with agent templates.
 * @param args Resolution arguments.
 * @returns Absolute source root path.
 */
export async function resolveSourceRoot(args: {
  projectDirOption?: string;
  cwd: string;
  packageRoot: string;
  language: TemplateLanguage;
}): Promise<string> {
  if (args.projectDirOption) {
    const explicitPath = path.resolve(args.projectDirOption);
    if (await isValidSourceRoot(explicitPath)) {
      return explicitPath;
    }
    throw new Error(
      `Invalid --project-dir: ${explicitPath}. Required: AGENTS.md, agents/, and .agents/ with .agents/skills/, .agents/workflows/, or a legacy flat skill layout.`,
    );
  }

  const bundledPath = getBundledPath(args.packageRoot, args.language);
  const cwdPath = path.resolve(args.cwd);

  if (args.language === "en") {
    if (await isValidSourceRoot(bundledPath)) {
      return bundledPath;
    }
    if (await isValidSourceRoot(cwdPath)) {
      return cwdPath;
    }
  } else {
    if (await isValidSourceRoot(cwdPath)) {
      return cwdPath;
    }
    if (await isValidSourceRoot(bundledPath)) {
      return bundledPath;
    }
  }

  throw new Error(
    `Could not find source templates in current directory or bundled package. Checked: ${cwdPath} and ${bundledPath}`,
  );
}

/**
 * Checks whether directory contains required source assets.
 * Accepts legacy root layout (AGENTS.md + agents/ + .agents/) OR
 * domain layout (domains/ with at least one valid domain.json) OR both.
 * @param rootDir Candidate root directory.
 * @returns True when required assets are present.
 */
async function isValidSourceRoot(rootDir: string): Promise<boolean> {
  if (await hasLegacyLayout(rootDir)) {
    return true;
  }
  return hasDomainsLayout(rootDir);
}

/**
 * Checks for legacy root layout: AGENTS.md + agents/ + .agents/ with skills.
 * @param rootDir Candidate root directory.
 * @returns True when legacy assets are present.
 */
async function hasLegacyLayout(rootDir: string): Promise<boolean> {
  const orchestratorPath = path.join(rootDir, "AGENTS.md");
  const agentsDir = path.join(rootDir, "agents");
  const dotAgentsDir = path.join(rootDir, ".agents");

  if (!(await fs.pathExists(orchestratorPath)) || !(await fs.pathExists(agentsDir)) || !(await fs.pathExists(dotAgentsDir))) {
    return false;
  }

  const nestedSkillsDir = path.join(dotAgentsDir, "skills");
  const workflowsDir = path.join(dotAgentsDir, "workflows");
  if ((await fs.pathExists(nestedSkillsDir)) || (await fs.pathExists(workflowsDir))) {
    return true;
  }

  const entries = await fs.readdir(dotAgentsDir);
  for (const entry of entries) {
    const legacySkillFile = path.join(dotAgentsDir, entry, "SKILL.md");
    if (await fs.pathExists(legacySkillFile)) {
      return true;
    }
  }

  return false;
}

/**
 * Checks for domain layout: domains/ with at least one valid domain.json.
 * @param rootDir Candidate root directory.
 * @returns True when at least one valid domain exists.
 */
async function hasDomainsLayout(rootDir: string): Promise<boolean> {
  const domainsDir = path.join(rootDir, "domains");
  if (!(await fs.pathExists(domainsDir))) {
    return false;
  }

  const entries = await fs.readdir(domainsDir);
  for (const entry of entries) {
    const manifestPath = path.join(domainsDir, entry, "domain.json");
    if (await fs.pathExists(manifestPath)) {
      return true;
    }
  }

  return false;
}

/**
 * Returns bundled templates root for selected language.
 * @param packageRoot Installed package root.
 * @param language Template language.
 * @returns Absolute bundled source path.
 */
function getBundledPath(packageRoot: string, language: TemplateLanguage): string {
  if (language === "en") {
    return path.resolve(packageRoot, "locales", "en");
  }
  return path.resolve(packageRoot);
}
