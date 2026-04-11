import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";
import type { DomainId, DomainDescriptor, TemplateLanguage } from "./types.js";

/** Zod schema for domain.json manifest. */
const domainManifestSchema = z.object({
  id: z.enum(["development", "content", "analytics"]),
  name: z.string().min(1),
  description: z.string().min(1),
});

/** All valid domain identifiers for normalization. */
const VALID_DOMAIN_IDS: DomainId[] = ["development", "content", "analytics"];

/**
 * Scans domains/ directory and returns available domain descriptors.
 * Returns empty array if domains/ doesn't exist or has no valid entries.
 * @param packageRoot Resolved package root path.
 * @returns Sorted array of domain descriptors with computed counts.
 */
export async function listDomains(packageRoot: string): Promise<DomainDescriptor[]> {
  const domainsDir = path.join(packageRoot, "domains");

  if (!(await fs.pathExists(domainsDir))) {
    return [];
  }

  const entries = await fs.readdir(domainsDir);
  const descriptors: DomainDescriptor[] = [];

  for (const entry of entries) {
    const domainDir = path.join(domainsDir, entry);
    const manifestPath = path.join(domainDir, "domain.json");

    if (!(await fs.pathExists(manifestPath))) {
      continue;
    }

    const raw: unknown = await fs.readJson(manifestPath);
    const parsed = domainManifestSchema.safeParse(raw);
    if (!parsed.success) {
      console.warn(`[domain] Invalid domain.json in ${manifestPath}: ${parsed.error.message}`);
      continue;
    }

    const agentCount = await countAgentFiles(domainDir);
    const skillCount = await countSkillFiles(domainDir);

    descriptors.push({
      id: parsed.data.id,
      name: parsed.data.name,
      description: parsed.data.description,
      rootDir: domainDir,
      agentCount,
      skillCount,
    });
  }

  return descriptors.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Resolves domain source root path, accounting for language.
 * ru: domains/<id>/   |   en: domains/<id>/locales/en/
 * @param args Resolution arguments.
 * @returns Absolute domain source root path.
 */
export async function resolveDomainSourceRoot(args: {
  packageRoot: string;
  domainId: DomainId;
  language: TemplateLanguage;
}): Promise<string> {
  const domainDir = path.join(args.packageRoot, "domains", args.domainId);

  if (!(await fs.pathExists(domainDir))) {
    throw new Error(`Domain directory not found: ${domainDir}`);
  }

  if (args.language === "en") {
    return path.join(domainDir, "locales", "en");
  }

  return domainDir;
}

/**
 * Validates raw user input and returns strict DomainId.
 * @param rawDomain User input string.
 * @returns Validated DomainId.
 * @throws Error with available domains list if invalid.
 */
export function normalizeDomain(rawDomain: string): DomainId {
  const normalized = rawDomain.trim().toLowerCase();
  if (VALID_DOMAIN_IDS.includes(normalized as DomainId)) {
    return normalized as DomainId;
  }
  throw new Error(`Unknown domain ${JSON.stringify(rawDomain.trim())}. Available: ${VALID_DOMAIN_IDS.join(", ")}`);
}

/**
 * Resolves effective source root and optional domain id considering domain mode.
 * @param pkgRoot Resolved package root.
 * @param rawDomain Optional raw domain from CLI.
 * @param language Template language.
 * @returns Effective source root path and domain id (undefined for legacy).
 */
export async function resolveDomainAwareRootWithId(
  pkgRoot: string,
  rawDomain: string | undefined,
  language: TemplateLanguage,
): Promise<{ effectiveRoot: string; domainId?: DomainId }> {
  const domains = await listDomains(pkgRoot);

  if (domains.length === 0) {
    if (rawDomain) {
      throw new Error("--domain specified but no domains found in source. Remove --domain for legacy mode.");
    }
    return { effectiveRoot: pkgRoot };
  }

  let domainId: DomainId;
  if (rawDomain) {
    domainId = normalizeDomain(rawDomain);
  } else if (domains.length === 1) {
    domainId = domains[0].id;
  } else {
    const available = domains.map((d) => d.id).join(", ");
    throw new Error(`Multiple domains available. Specify --domain. Available: ${available}`);
  }

  const effectiveRoot = await resolveDomainSourceRoot({ packageRoot: pkgRoot, domainId, language });
  return { effectiveRoot, domainId };
}

/**
 * Counts .md files in agents/ subdirectory of a domain.
 * @param domainDir Domain root directory.
 * @returns Number of agent markdown files.
 */
async function countAgentFiles(domainDir: string): Promise<number> {
  const agentsDir = path.join(domainDir, "agents");
  if (!(await fs.pathExists(agentsDir))) {
    return 0;
  }
  const entries = await fs.readdir(agentsDir);
  return entries.filter((e) => e.endsWith(".md")).length;
}

/**
 * Counts skill directories containing SKILL.md in .agents/skills/.
 * @param domainDir Domain root directory.
 * @returns Number of skill directories with SKILL.md.
 */
async function countSkillFiles(domainDir: string): Promise<number> {
  const skillsDir = path.join(domainDir, ".agents", "skills");
  if (!(await fs.pathExists(skillsDir))) {
    return 0;
  }
  const entries = await fs.readdir(skillsDir);
  let count = 0;
  for (const entry of entries) {
    if (await fs.pathExists(path.join(skillsDir, entry, "SKILL.md"))) {
      count++;
    }
  }
  return count;
}
