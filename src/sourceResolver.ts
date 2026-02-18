import path from "node:path";
import fs from "fs-extra";

/**
 * Resolves source root with agent templates.
 * @param args Resolution arguments.
 * @returns Absolute source root path.
 */
export async function resolveSourceRoot(args: {
  projectDirOption?: string;
  cwd: string;
  packageRoot: string;
}): Promise<string> {
  if (args.projectDirOption) {
    const explicitPath = path.resolve(args.projectDirOption);
    if (await isValidSourceRoot(explicitPath)) {
      return explicitPath;
    }
    throw new Error(`Invalid --project-dir: ${explicitPath}. Required: AGENTS.md, agents/, and .agents/.`);
  }

  const cwdPath = path.resolve(args.cwd);
  if (await isValidSourceRoot(cwdPath)) {
    return cwdPath;
  }

  const bundledPath = path.resolve(args.packageRoot);
  if (await isValidSourceRoot(bundledPath)) {
    return bundledPath;
  }

  throw new Error(
    `Could not find source templates in current directory or bundled package. Checked: ${cwdPath} and ${bundledPath}`,
  );
}

/**
 * Checks whether directory contains required source assets.
 * @param rootDir Candidate root directory.
 * @returns True when required assets are present.
 */
async function isValidSourceRoot(rootDir: string): Promise<boolean> {
  const orchestratorPath = path.join(rootDir, "AGENTS.md");
  const agentsDir = path.join(rootDir, "agents");
  const dotAgentsDir = path.join(rootDir, ".agents");

  return (await fs.pathExists(orchestratorPath)) && (await fs.pathExists(agentsDir)) && (await fs.pathExists(dotAgentsDir));
}
