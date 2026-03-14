import fs from "fs-extra";
import { parse as parseYaml } from "yaml";
import { getOrchestratorPortableSourcePath, getOrchestratorVendorSourcePath, getSkillPortableSourcePath, getSkillVendorSourcePath } from "./platforms/metadataSidecars.js";
import type { SourceCatalog, TargetId } from "./types.js";

interface MetadataAuditResult {
  errors: string[];
  warnings: string[];
  info: string[];
}



/**
 * Audits portable and vendor metadata sidecars for orchestrator and skills.
 * @param projectDir Source root.
 * @param catalog Loaded source catalog.
 * @param target Target id used to choose vendor sidecars.
 * @returns Categorized audit messages.
 */
export async function auditMetadataLayer(
  projectDir: string,
  catalog: SourceCatalog,
  target: TargetId,
): Promise<MetadataAuditResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  await auditOrchestrator(projectDir, target, errors, warnings);
  await auditSkills(catalog, target, errors, warnings);

  info.push(`Metadata audit target: ${target}.`);
  info.push(`Metadata audit checked ${Object.keys(catalog.skillFiles).length} skills.`);

  return { errors, warnings, info };
}

async function auditOrchestrator(
  projectDir: string,
  target: TargetId,
  errors: string[],
  warnings: string[],
): Promise<void> {
  const portablePath = getOrchestratorPortableSourcePath(projectDir);
  const vendorPath = getOrchestratorVendorSourcePath(projectDir, target);
  const portableLabel = "[metadata:orchestrator]";

  const portable = await readYamlSidecar(portablePath, portableLabel, warnings, errors);
  if (portable) {
    ensureValue(portable, "name", "web_development_orchestra", portablePath, errors, portableLabel);
    ensureRequired(portable, ["display_name", "description", "default_prompt"], portablePath, errors, portableLabel);
  }

  if (!(await fs.pathExists(vendorPath))) {
    warnings.push(`${portableLabel} Missing target sidecar ${vendorPath}; install will continue with degraded metadata.`);
    return;
  }

  if (target === "gpt-codex") {
    const payload = await readYamlSidecar(vendorPath, portableLabel, warnings, errors);
    if (!payload) {
      return;
    }
    const interfaceSection = asObject(payload.interface);
    if (!interfaceSection) {
      errors.push(`${portableLabel} Missing interface section in ${vendorPath}.`);
      return;
    }
    ensureRequired(interfaceSection, ["display_name", "short_description", "default_prompt"], vendorPath, errors, portableLabel, "interface.");
    if (portable) {
      compareValues(interfaceSection, portable, ["display_name", "default_prompt"], vendorPath, portablePath, errors, portableLabel);
    }
    return;
  }

  const payload = await readJsonSidecar(vendorPath, portableLabel, errors);
  if (!payload) {
    return;
  }
  ensureValue(payload, "name", "web_development_orchestra", vendorPath, errors, portableLabel);
  ensureRequired(payload, ["display_name", "description", "default_prompt"], vendorPath, errors, portableLabel);
  if (portable) {
    compareValues(payload, portable, ["display_name", "description", "default_prompt"], vendorPath, portablePath, errors, portableLabel);
  }
}

async function auditSkills(
  catalog: SourceCatalog,
  target: TargetId,
  errors: string[],
  warnings: string[],
): Promise<void> {
  const skillNames = Object.keys(catalog.skillFiles).sort((left, right) => left.localeCompare(right));

  for (const skillName of skillNames) {
    const skillFile = catalog.skillFiles[skillName];
    if (!skillFile) {
      continue;
    }

    const label = `[metadata:skill:${skillName}]`;
    const frontmatter = parseFrontmatter(await fs.readFile(skillFile, "utf8"));
    if (frontmatter.name !== skillName) {
      errors.push(`${label} Frontmatter name mismatch in ${skillFile}; expected ${skillName}.`);
    }

    const portablePath = getSkillPortableSourcePath(skillFile);
    const vendorPath = getSkillVendorSourcePath(skillFile, target);
    const portable = await readYamlSidecar(portablePath, label, warnings, errors);

    if (portable) {
      ensureValue(portable, "name", skillName, portablePath, errors, label);
      ensureRequired(portable, ["display_name", "description", "default_prompt"], portablePath, errors, label);
      if (frontmatter.description && portable.description !== frontmatter.description) {
        errors.push(`${label} description mismatch between ${skillFile} and ${portablePath}.`);
      }
    }

    if (!(await fs.pathExists(vendorPath))) {
      warnings.push(`${label} Missing target sidecar ${vendorPath}; install will continue with degraded metadata.`);
      continue;
    }

    if (target === "gpt-codex") {
      const payload = await readYamlSidecar(vendorPath, label, warnings, errors);
      if (!payload) {
        continue;
      }
      const interfaceSection = asObject(payload.interface);
      if (!interfaceSection) {
        errors.push(`${label} Missing interface section in ${vendorPath}.`);
        continue;
      }
      ensureRequired(interfaceSection, ["display_name", "short_description", "default_prompt"], vendorPath, errors, label, "interface.");
      if (portable) {
        compareValues(interfaceSection, portable, ["display_name", "default_prompt"], vendorPath, portablePath, errors, label);
      }
      continue;
    }

    const payload = await readJsonSidecar(vendorPath, label, errors);
    if (!payload) {
      continue;
    }
    ensureValue(payload, "name", skillName, vendorPath, errors, label);
    ensureRequired(payload, ["display_name", "description", "default_prompt"], vendorPath, errors, label);
    if (portable) {
      compareValues(payload, portable, ["display_name", "description", "default_prompt"], vendorPath, portablePath, errors, label);
    }
  }
}

/**
 * Reads and parses a YAML sidecar file, collecting errors and warnings.
 * @param filePath Absolute path to the YAML sidecar file.
 * @param label Label prefix for audit messages.
 * @param warnings Mutable warnings array.
 * @param errors Mutable errors array.
 * @returns Parsed YAML object or null.
 */
async function readYamlSidecar(
  filePath: string,
  label: string,
  warnings: string[],
  errors: string[],
): Promise<Record<string, unknown> | null> {
  if (!(await fs.pathExists(filePath))) {
    warnings.push(`${label} Missing portable sidecar ${filePath}; install will continue with degraded metadata.`);
    return null;
  }

  try {
    const text = await fs.readFile(filePath, "utf8");
    const parsed: unknown = parseYaml(text);
    if (!isObject(parsed)) {
      errors.push(`${label} Expected YAML mapping in ${filePath}.`);
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch (error) {
    errors.push(`${label} Invalid YAML in ${filePath}: ${(error as Error).message}`);
    return null;
  }
}

async function readJsonSidecar(filePath: string, label: string, errors: string[]): Promise<Record<string, unknown> | null> {
  try {
    const payload = JSON.parse(await fs.readFile(filePath, "utf8")) as unknown;
    if (!isObject(payload)) {
      errors.push(`${label} Expected JSON object in ${filePath}.`);
      return null;
    }
    return payload as Record<string, unknown>;
  } catch (error) {
    errors.push(`${label} Invalid JSON in ${filePath}: ${(error as Error).message}`);
    return null;
  }
}

function parseFrontmatter(text: string): { name?: string; description?: string } {
  const normalized = text.replace(/\r\n/g, "\n");
  const match = normalized.match(/^\ufeff?---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return {};
  }

  const result: { name?: string; description?: string } = {};
  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();
    if (!line || !line.includes(":")) {
      continue;
    }
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim().replace(/^['"]|['"]$/g, "");
    if (key.trim() === "name") {
      result.name = value;
    }
    if (key.trim() === "description") {
      result.description = value;
    }
  }
  return result;
}

function ensureRequired(
  payload: Record<string, unknown>,
  keys: string[],
  filePath: string,
  errors: string[],
  label: string,
  prefix = "",
): void {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${label} Missing ${prefix}${key} in ${filePath}.`);
    }
  }
}

function ensureValue(
  payload: Record<string, unknown>,
  key: string,
  expected: string,
  filePath: string,
  errors: string[],
  label: string,
): void {
  if (payload[key] !== expected) {
    errors.push(`${label} ${key} mismatch in ${filePath}; expected ${expected}.`);
  }
}

/**
 * Compares values between vendor and portable sidecars for specified keys.
 * @param payload Vendor sidecar data.
 * @param source Portable sidecar data.
 * @param keys Keys to compare.
 * @param vendorPath Vendor file path (for error messages).
 * @param portablePath Portable file path (for error messages).
 * @param errors Mutable errors array.
 * @param label Label prefix for audit messages.
 */
function compareValues(
  payload: Record<string, unknown>,
  source: Record<string, unknown>,
  keys: string[],
  vendorPath: string,
  portablePath: string,
  errors: string[],
  label: string,
): void {
  for (const key of keys) {
    if (payload[key] !== source[key]) {
      errors.push(`${label} ${key} mismatch between ${portablePath} and ${vendorPath}.`);
    }
  }
}



function asObject(value: unknown): Record<string, unknown> | null {
  return isObject(value) ? (value as Record<string, unknown>) : null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
