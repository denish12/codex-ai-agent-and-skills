import path from "node:path";
import type { InstallOperation, TargetId } from "../types.js";

const targetVendorFileNames: Record<TargetId, string> = {
  "vscode-copilot": "copilot.json",
  claude: "claude.json",
  "qwen-3.5": "qwen.json",
  "google-antugravity": "gemini.json",
  "gpt-codex": "openai.yaml",
};

const orchestratorVendorDestinationPaths: Record<TargetId, string> = {
  "vscode-copilot": path.join(".github", "orchestrator.copilot.json"),
  claude: path.join(".claude", "orchestrator.claude.json"),
  "qwen-3.5": path.join(".qwen", "orchestrator.qwen.json"),
  "google-antugravity": path.join(".gemini", "orchestrator.gemini.json"),
  "gpt-codex": path.join("agents", "orchestrator.openai.yaml"),
};

/**
 * Appends optional orchestrator metadata operations for the selected target.
 * @param operations Mutable operations list.
 * @param args Metadata planning arguments.
 */
export function appendOrchestratorMetadataOperations(
  operations: InstallOperation[],
  args: {
    sourceRoot: string;
    destinationDir: string;
    target: TargetId;
  },
): void {
  operations.push({
    sourcePath: getOrchestratorPortableSourcePath(args.sourceRoot),
    destinationPath: path.join(args.destinationDir, "AGENTS.yaml"),
    generated: false,
    optional: true,
  });

  operations.push({
    sourcePath: getOrchestratorVendorSourcePath(args.sourceRoot, args.target),
    destinationPath: path.join(args.destinationDir, orchestratorVendorDestinationPaths[args.target]),
    generated: false,
    optional: true,
  });
}

/**
 * Appends optional skill metadata operations for the selected target.
 * @param operations Mutable operations list.
 * @param args Metadata planning arguments.
 */
export function appendSkillMetadataOperations(
  operations: InstallOperation[],
  args: {
    sourceSkillFile: string;
    destinationDir: string;
    skillsDir: string;
    skillName: string;
    target: TargetId;
  },
): void {
  const destinationMetadataDir = path.join(args.destinationDir, args.skillsDir, args.skillName, "agents");

  operations.push({
    sourcePath: getSkillPortableSourcePath(args.sourceSkillFile),
    destinationPath: path.join(destinationMetadataDir, "skill.yaml"),
    generated: false,
    optional: true,
  });

  operations.push({
    sourcePath: getSkillVendorSourcePath(args.sourceSkillFile, args.target),
    destinationPath: path.join(destinationMetadataDir, getVendorMetadataFileName(args.target)),
    generated: false,
    optional: true,
  });
}

/**
 * Returns portable orchestrator metadata path in source templates.
 * @param sourceRoot Source root path.
 * @returns AGENTS.yaml absolute path.
 */
export function getOrchestratorPortableSourcePath(sourceRoot: string): string {
  return path.join(sourceRoot, "AGENTS.yaml");
}

/**
 * Returns target-specific orchestrator metadata path in source templates.
 * @param sourceRoot Source root path.
 * @param target Target id.
 * @returns Absolute vendor metadata path.
 */
export function getOrchestratorVendorSourcePath(sourceRoot: string, target: TargetId): string {
  return path.join(sourceRoot, "agents", `orchestrator.${getVendorMetadataFileName(target)}`);
}

/**
 * Returns portable skill metadata path in source templates.
 * @param sourceSkillFile Absolute SKILL.md source path.
 * @returns Absolute skill.yaml path.
 */
export function getSkillPortableSourcePath(sourceSkillFile: string): string {
  return path.join(path.dirname(sourceSkillFile), "agents", "skill.yaml");
}

/**
 * Returns target-specific skill metadata path in source templates.
 * @param sourceSkillFile Absolute SKILL.md source path.
 * @param target Target id.
 * @returns Absolute vendor metadata path.
 */
export function getSkillVendorSourcePath(sourceSkillFile: string, target: TargetId): string {
  return path.join(path.dirname(sourceSkillFile), "agents", getVendorMetadataFileName(target));
}

/**
 * Returns vendor-specific metadata file name for a target.
 * @param target Target id.
 * @returns File name used in skill and orchestrator metadata sidecars.
 */
export function getVendorMetadataFileName(target: TargetId): string {
  return targetVendorFileNames[target];
}
