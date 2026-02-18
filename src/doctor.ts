import fs from "fs-extra";
import { getPlatformAdapter } from "./platforms/adapters.js";
import { loadSourceCatalog } from "./catalog.js";
import type { TargetId } from "./types.js";

/**
 * Runs local diagnostics for source and destination readiness.
 * @param projectDir Repository root.
 * @param destinationDir Install destination.
 * @param target Target id.
 * @returns Diagnostic messages categorized by severity.
 */
export async function runDoctor(projectDir: string, destinationDir: string, target: TargetId): Promise<{
  errors: string[];
  warnings: string[];
  info: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  try {
    const catalog = await loadSourceCatalog(projectDir);
    info.push(`Found ${Object.keys(catalog.agentFiles).length} agents.`);
    info.push(`Found ${Object.keys(catalog.skillFiles).length} skills.`);
  } catch (error) {
    errors.push((error as Error).message);
  }

  const adapter = getPlatformAdapter(target);
  warnings.push(...adapter.validateDestination(destinationDir));

  try {
    await fs.ensureDir(destinationDir);
    const probeFile = `${destinationDir}/.code-ai-installer/.write-probe`;
    await fs.ensureDir(`${destinationDir}/.code-ai-installer`);
    await fs.writeFile(probeFile, "ok", "utf8");
    await fs.remove(probeFile);
    info.push("Destination is writable.");
  } catch (error) {
    errors.push(`Destination is not writable: ${(error as Error).message}`);
  }

  return { errors, warnings, info };
}
