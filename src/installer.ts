import path from "node:path";
import fs from "fs-extra";
import type { DomainId, InstallOperation, InstallOptions, InstallState } from "./types.js";
import { getPlatformAdapter } from "./platforms/adapters.js";
import { loadSourceCatalog } from "./catalog.js";
import { transformContentForTarget } from "./contentTransformer.js";

interface ApplyResult {
  plannedFiles: string[];
  writtenFiles: string[];
  skippedFiles: string[];
  backupDir?: string;
}

/**
 * Runs installation for selected target with optional dry-run and backup.
 * @param options Install options.
 * @returns Install state and write summary.
 */
export async function runInstall(options: InstallOptions): Promise<{ state: InstallState; result: ApplyResult }> {
  const catalog = await loadSourceCatalog(options.projectDir);
  const adapter = getPlatformAdapter(options.target);

  const operations = adapter.planOperations({
    catalog,
    destinationDir: options.destinationDir,
    selectedAgents: options.selectedAgents,
    selectedSkills: options.selectedSkills,
  });

  const state: InstallState = {
    target: options.target,
    ...(options.domain ? { domain: options.domain } : {}),
    installedAt: new Date().toISOString(),
    destinationDir: options.destinationDir,
    projectDir: options.projectDir,
    files: operations.map((op) => op.destinationPath),
    selectedAgents: options.selectedAgents,
    selectedSkills: options.selectedSkills,
  };

  const result = await applyOperations({
    operations,
    overwriteMode: options.overwriteMode,
    dryRun: options.dryRun,
    destinationDir: options.destinationDir,
    target: options.target,
    strictHints: options.strictHints,
  });

  if (!options.dryRun) {
    await writeInstallState(state);
  }

  return { state, result };
}

/**
 * Executes uninstall by reading and deleting previously installed files.
 * @param destinationDir Destination root where state is stored.
 * @param target Target id.
 * @param dryRun Dry-run flag.
 * @returns Deleted files list.
 */
export async function runUninstall(
  destinationDir: string,
  target: InstallState["target"],
  dryRun: boolean,
  domain?: DomainId,
): Promise<{ removed: string[]; missing: string[] }> {
  const state = await readInstallState(destinationDir, target, domain);
  if (!state) {
    const label = domain ? `target ${target}, domain ${domain}` : `target ${target}`;
    throw new Error(`No install state found for ${label}.`);
  }

  const removed: string[] = [];
  const missing: string[] = [];

  for (const filePath of state.files) {
    if (!(await fs.pathExists(filePath))) {
      missing.push(filePath);
      continue;
    }
    if (!dryRun) {
      await fs.remove(filePath);
    }
    removed.push(filePath);
  }

  if (!dryRun) {
    await deleteInstallState(destinationDir, target, domain);
  }

  return { removed, missing };
}

/**
 * Reads installation state file for target.
 * @param destinationDir Destination root.
 * @param target Target id.
 * @param domain Optional domain id for domain-aware state lookup.
 * @returns Install state or null.
 */
export async function readInstallState(
  destinationDir: string,
  target: InstallState["target"],
  domain?: DomainId,
): Promise<InstallState | null> {
  const stateFile = getStateFilePath(destinationDir, target, domain);
  if (!(await fs.pathExists(stateFile))) {
    return null;
  }
  return fs.readJson(stateFile) as Promise<InstallState>;
}

/**
 * Performs planned operations with backup and rollback semantics.
 * @param args Execution settings.
 * @returns Apply result summary.
 */
async function applyOperations(args: {
  operations: InstallOperation[];
  overwriteMode: "skip" | "overwrite";
  dryRun: boolean;
  destinationDir: string;
  target: InstallState["target"];
  strictHints: boolean;
}): Promise<ApplyResult> {
  const plannedFiles: string[] = [];
  const writtenFiles: string[] = [];
  const skippedFiles: string[] = [];
  const backupMap = new Map<string, string>();
  let backupDir: string | undefined;

  if (!args.dryRun) {
    backupDir = await createBackupDir(args.destinationDir, args.target);
  }

  try {
    for (const operation of args.operations) {
      const destination = operation.destinationPath;
      plannedFiles.push(destination);

      if (!operation.generated && operation.optional && !(await fs.pathExists(operation.sourcePath))) {
        skippedFiles.push(destination);
        continue;
      }

      const exists = await fs.pathExists(destination);
      if (exists && args.overwriteMode === "skip") {
        skippedFiles.push(destination);
        continue;
      }

      if (!args.dryRun && exists && backupDir) {
        const rel = path.relative(args.destinationDir, destination);
        const backupPath = path.join(backupDir, rel);
        await fs.ensureDir(path.dirname(backupPath));
        await fs.copy(destination, backupPath, { overwrite: true });
        backupMap.set(destination, backupPath);
      }

      if (!args.dryRun) {
        await fs.ensureDir(path.dirname(destination));
        if (operation.generated) {
          await fs.writeFile(destination, operation.content ?? "", "utf8");
        } else if (operation.transform) {
          const sourceContent = await fs.readFile(operation.sourcePath, "utf8");
          const transformed = transformContentForTarget(
            sourceContent,
            operation.transform.target,
            operation.transform.assetType,
          );
          await fs.writeFile(destination, transformed, "utf8");
        } else {
          await fs.copy(operation.sourcePath, destination, { overwrite: true });
        }
      }
      writtenFiles.push(destination);
    }
  } catch (error) {
    if (!args.dryRun) {
      await rollbackWrites(writtenFiles, backupMap);
    }
    throw error;
  }

  return { plannedFiles, writtenFiles, skippedFiles, backupDir };
}

/**
 * Rolls back written files from backup map when apply fails.
 * @param writtenFiles Files that were written in current transaction.
 * @param backupMap Existing-file backup mapping.
 */
async function rollbackWrites(writtenFiles: string[], backupMap: Map<string, string>): Promise<void> {
  for (const destination of writtenFiles.slice().reverse()) {
    const backupPath = backupMap.get(destination);
    if (backupPath && (await fs.pathExists(backupPath))) {
      await fs.copy(backupPath, destination, { overwrite: true });
      continue;
    }
    if (await fs.pathExists(destination)) {
      await fs.remove(destination);
    }
  }
}

/**
 * Writes install state for future uninstall operations.
 * @param state Install state.
 */
async function writeInstallState(state: InstallState): Promise<void> {
  const stateFile = getStateFilePath(state.destinationDir, state.target, state.domain);
  await fs.ensureDir(path.dirname(stateFile));
  await fs.writeJson(stateFile, state, { spaces: 2 });
}

/**
 * Deletes stored state file for the given target.
 * @param destinationDir Destination root.
 * @param target Target id.
 * @param domain Optional domain id for domain-aware state lookup.
 */
async function deleteInstallState(destinationDir: string, target: InstallState["target"], domain?: DomainId): Promise<void> {
  const stateFile = getStateFilePath(destinationDir, target, domain);
  if (await fs.pathExists(stateFile)) {
    await fs.remove(stateFile);
  }
}

/**
 * Returns absolute path to state file for the target.
 * @param destinationDir Destination root.
 * @param target Target id.
 * @param domain Optional domain id for domain-aware state file naming.
 * @returns State file path.
 */
function getStateFilePath(destinationDir: string, target: InstallState["target"], domain?: DomainId): string {
  const fileName = domain ? `${target}--${domain}.json` : `${target}.json`;
  return path.join(destinationDir, ".code-ai-installer", "state", fileName);
}

/**
 * Creates a timestamped backup directory for one install run.
 * @param destinationDir Destination root.
 * @param target Target id.
 * @returns Backup directory path.
 */
async function createBackupDir(destinationDir: string, target: InstallState["target"]): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(destinationDir, ".code-ai-installer", "backups", target, timestamp);
  await fs.ensureDir(backupDir);
  return backupDir;
}
