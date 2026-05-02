/**
 * Supported AI target identifiers.
 */
export type TargetId =
  | "vscode-copilot"
  | "claude"
  | "qwen-3.5"
  | "google-antugravity"
  | "gpt-codex"
  | "moonshot-kimi";
export type TemplateLanguage = "ru" | "en";

/**
 * Supported domain identifiers.
 */
export type DomainId = "development" | "content" | "analytics" | "product";

/**
 * Domain metadata loaded from domain.json manifest + dynamic counts.
 */
export interface DomainDescriptor {
  id: DomainId;
  name: string;
  description: string;
  rootDir: string;
  agentCount: number;
  skillCount: number;
}

/**
 * Defines one source file and destination path copy action.
 */
export interface InstallOperation {
  sourcePath: string;
  destinationPath: string;
  generated: boolean;
  content?: string;
  optional?: boolean;
  transform?: {
    target: TargetId;
    assetType: "orchestrator" | "agent" | "skill";
  };
}

/**
 * Represents discovered local assets that can be installed.
 */
export interface SourceCatalog {
  rootDir: string;
  orchestratorPath: string;
  agentFiles: Record<string, string>;
  skillFiles: Record<string, string>;
  workflowFiles: Record<string, string>;
  extraFiles: Record<string, string>;
}

/**
 * Contains runtime options for install command.
 */
export interface InstallOptions {
  target: TargetId;
  domain?: DomainId;
  projectDir: string;
  destinationDir: string;
  selectedAgents: string[];
  selectedSkills: string[];
  dryRun: boolean;
  overwriteMode: "skip" | "overwrite";
  strictHints: boolean;
}

/**
 * Stores install output metadata for uninstall and audit.
 */
export interface InstallState {
  target: TargetId;
  domain?: DomainId;
  installedAt: string;
  destinationDir: string;
  projectDir: string;
  files: string[];
  selectedAgents: string[];
  selectedSkills: string[];
}

/**
 * Represents platform-specific destination layout and generated instruction files.
 */
export interface PlatformAdapter {
  id: TargetId;
  label: string;
  description: string;
  defaultDestination(projectDir: string): string;
  validateDestination(destinationDir: string): string[];
  planOperations(args: {
    catalog: SourceCatalog;
    destinationDir: string;
    selectedAgents: string[];
    selectedSkills: string[];
  }): InstallOperation[];
}
