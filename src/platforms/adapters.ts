import path from "node:path";
import type { InstallOperation, PlatformAdapter, SourceCatalog, TargetId } from "../types.js";
import { appendOrchestratorMetadataOperations, appendSkillMetadataOperations } from "./metadataSidecars.js";

interface PlatformLayout {
  instructionFile: string;
  orchestratorMirrorFile: string;
  agentsDir: string;
  skillsDir: string;
  notes: string;
}

const targetLayouts: Record<TargetId, PlatformLayout> = {
  "vscode-copilot": {
    instructionFile: ".github/copilot-instructions.md",
    orchestratorMirrorFile: "AGENTS.md",
    agentsDir: ".github/agents",
    skillsDir: ".github/skills",
    notes: "Uses copilot-instructions.md and stores role/skill docs in .github.",
  },
  claude: {
    instructionFile: "CLAUDE.md",
    orchestratorMirrorFile: "AGENTS.md",
    agentsDir: ".claude/agents",
    skillsDir: ".claude/skills",
    notes: "Uses CLAUDE.md and local .claude folder for role/skill docs.",
  },
  "qwen-3.5": {
    instructionFile: "QWEN.md",
    orchestratorMirrorFile: "AGENTS.md",
    agentsDir: ".qwen/agents",
    skillsDir: ".qwen/skills",
    notes: "Uses QWEN.md convention and .qwen folder for role/skill docs.",
  },
  "google-antugravity": {
    instructionFile: "GEMINI.md",
    orchestratorMirrorFile: "AGENTS.md",
    agentsDir: ".gemini/agents",
    skillsDir: ".gemini/skills",
    notes: "Uses AGENTS.md with GEMINI.md compatibility alias and antugravity-style layout with per-agent folders and script-oriented skills.",
  },
  "gpt-codex": {
    instructionFile: "CODEX.md",
    orchestratorMirrorFile: "AGENTS.md",
    agentsDir: "agents",
    skillsDir: ".agents",
    notes: "Uses AGENTS.md/agents/.agents layout compatible with Codex agent and skills discovery.",
  },
};

/**
 * Returns all supported platform adapters.
 * @returns Array of platform adapters.
 */
export function getPlatformAdapters(): PlatformAdapter[] {
  return [
    buildAdapter("vscode-copilot", "VS Code Copilot"),
    buildAdapter("claude", "Claude AI"),
    buildAdapter("qwen-3.5", "Qwen 3.5"),
    buildAdapter("google-antugravity", "Google Antugravity"),
    buildAdapter("gpt-codex", "GPT Codex"),
  ];
}

/**
 * Returns a single platform adapter by identifier.
 * @param target Target id.
 * @returns Platform adapter.
 */
export function getPlatformAdapter(target: TargetId): PlatformAdapter {
  const found = getPlatformAdapters().find((adapter) => adapter.id === target);
  if (!found) {
    throw new Error(`Unsupported target: ${target}`);
  }
  return found;
}

/**
 * Builds one adapter from target layout metadata.
 * @param id Target id.
 * @param label Human-readable label.
 * @returns Configured platform adapter.
 */
function buildAdapter(id: TargetId, label: string): PlatformAdapter {
  const layout = targetLayouts[id];
  return {
    id,
    label,
    description: layout.notes,
    defaultDestination(projectDir: string): string {
      return projectDir;
    },
    validateDestination(destinationDir: string): string[] {
      const warnings: string[] = [];
      const normalized = path.resolve(destinationDir);
      if (normalized.length < 3) {
        warnings.push("Destination path looks suspiciously short.");
      }
      return warnings;
    },
    planOperations(args: {
      catalog: SourceCatalog;
      destinationDir: string;
      selectedAgents: string[];
      selectedSkills: string[];
    }): InstallOperation[] {
      return planForLayout(layout, args.catalog, args.destinationDir, args.selectedAgents, args.selectedSkills, id);
    },
  };
}

/**
 * Plans copy and generated instruction operations for one platform layout.
 * @param layout Platform layout.
 * @param catalog Source catalog.
 * @param destinationDir Destination root.
 * @param selectedAgents Selected agent names.
 * @param selectedSkills Selected skill names.
 * @param target Target id.
 * @returns Planned operations list.
 */
function planForLayout(
  layout: PlatformLayout,
  catalog: SourceCatalog,
  destinationDir: string,
  selectedAgents: string[],
  selectedSkills: string[],
  target: TargetId,
): InstallOperation[] {
  if (target === "google-antugravity") {
    return planForGeminiLayout(layout, catalog, destinationDir, selectedAgents, selectedSkills, target);
  }

  const operations: InstallOperation[] = [];

  operations.push({
    sourcePath: catalog.orchestratorPath,
    destinationPath: path.join(destinationDir, layout.orchestratorMirrorFile),
    generated: false,
    transform: {
      target,
      assetType: "orchestrator",
    },
  });

  appendOrchestratorMetadataOperations(operations, {
    sourceRoot: catalog.rootDir,
    destinationDir,
    target,
  });

  const instructionContent = renderInstructionFile(target, selectedAgents, selectedSkills);
  operations.push({
    sourcePath: "<generated>",
    destinationPath: path.join(destinationDir, layout.instructionFile),
    generated: true,
    content: instructionContent,
  });

  if (target === "qwen-3.5") {
    operations.push({
      sourcePath: "<generated>",
      destinationPath: path.join(destinationDir, ".qwen", "settings.json"),
      generated: true,
      content: renderQwenSettings(),
    });
  }

  for (const agentName of selectedAgents) {
    const sourcePath = catalog.agentFiles[agentName];
    if (!sourcePath) {
      continue;
    }
    operations.push({
      sourcePath,
      destinationPath: path.join(destinationDir, layout.agentsDir, `${agentName}.md`),
      generated: false,
      transform: {
        target,
        assetType: "agent",
      },
    });
  }

  for (const skillName of selectedSkills) {
    const sourcePath = catalog.skillFiles[skillName];
    if (!sourcePath) {
      continue;
    }
    operations.push({
      sourcePath,
      destinationPath: path.join(destinationDir, layout.skillsDir, skillName, "SKILL.md"),
      generated: false,
      transform: {
        target,
        assetType: "skill",
      },
    });
    appendSkillMetadataOperations(operations, {
      sourceSkillFile: sourcePath,
      destinationDir,
      skillsDir: layout.skillsDir,
      skillName,
      target,
    });
  }

  return operations;
}

/**
 * Plans google-antugravity specific layout with per-agent folders and script-first skills.
 * @param layout Platform layout.
 * @param catalog Source catalog.
 * @param destinationDir Destination root.
 * @param selectedAgents Selected agent names.
 * @param selectedSkills Selected skill names.
 * @param target Target id.
 * @returns Planned operations list.
 */
function planForGeminiLayout(
  layout: PlatformLayout,
  catalog: SourceCatalog,
  destinationDir: string,
  selectedAgents: string[],
  selectedSkills: string[],
  target: TargetId,
): InstallOperation[] {
  const operations: InstallOperation[] = [];

  operations.push({
    sourcePath: catalog.orchestratorPath,
    destinationPath: path.join(destinationDir, layout.orchestratorMirrorFile),
    generated: false,
    transform: {
      target,
      assetType: "orchestrator",
    },
  });

  appendOrchestratorMetadataOperations(operations, {
    sourceRoot: catalog.rootDir,
    destinationDir,
    target,
  });

  operations.push({
    sourcePath: catalog.orchestratorPath,
    destinationPath: path.join(destinationDir, layout.instructionFile),
    generated: false,
    transform: {
      target,
      assetType: "orchestrator",
    },
  });

  for (const agentName of selectedAgents) {
    const sourcePath = catalog.agentFiles[agentName];
    if (!sourcePath) {
      continue;
    }

    operations.push({
      sourcePath,
      destinationPath: path.join(destinationDir, layout.agentsDir, agentName, "prompt.md"),
      generated: false,
      transform: {
        target,
        assetType: "agent",
      },
    });

    operations.push({
      sourcePath: "<generated>",
      destinationPath: path.join(destinationDir, layout.agentsDir, agentName, "config.json"),
      generated: true,
      content: renderGeminiAgentConfig(agentName),
    });
  }

  for (const skillName of selectedSkills) {
    const sourcePath = catalog.skillFiles[skillName];
    if (!sourcePath) {
      continue;
    }

    operations.push({
      sourcePath,
      destinationPath: path.join(destinationDir, layout.skillsDir, `${skillName}.md`),
      generated: false,
      transform: {
        target,
        assetType: "skill",
      },
    });

    operations.push({
      sourcePath: "<generated>",
      destinationPath: path.join(destinationDir, layout.skillsDir, `${skillName}.py`),
      generated: true,
      content: renderGeminiSkillStub(skillName),
    });

    appendSkillMetadataOperations(operations, {
      sourceSkillFile: sourcePath,
      destinationDir,
      skillsDir: layout.skillsDir,
      skillName,
      target,
    });
  }

  return operations;
}

/**
 * Renders a platform-level instruction file with selected assets.
 * @param target Target id.
 * @param selectedAgents Selected agent list.
 * @param selectedSkills Selected skill list.
 * @returns Instruction markdown.
 */
function renderInstructionFile(target: TargetId, selectedAgents: string[], selectedSkills: string[]): string {
  const lines: string[] = [];
  lines.push(`# ${target} Instructions`);
  lines.push("");
  lines.push("This file was generated by code-ai installer.");
  lines.push("Use AGENTS.md as orchestration baseline.");
  lines.push("");
  lines.push("## Enabled Agents");
  for (const agentName of selectedAgents) {
    lines.push(`- ${agentName}`);
  }
  lines.push("");
  lines.push("## Enabled Skills");
  for (const skillName of selectedSkills) {
    lines.push(`- ${skillName}`);
  }
  lines.push("");
  lines.push("## Local Paths");
  lines.push("- Agents: see platform-specific agents directory.");
  lines.push("- Skills: see platform-specific skills directory.");
  return `${lines.join("\n")}\n`;
}

/**
 * Renders default antugravity agent config file.
 * @param agentName Agent identifier.
 * @returns Config JSON.
 */
function renderGeminiAgentConfig(agentName: string): string {
  return `${JSON.stringify(
    {
      name: agentName,
      model: "gemini-2.5-pro",
      promptFile: "prompt.md",
      reasoning: "medium",
      temperature: 0.2,
    },
    null,
    2,
  )}\n`;
}

/**
 * Renders python stub for gemini skill file.
 * @param skillName Skill identifier.
 * @returns Python source code.
 */
function renderGeminiSkillStub(skillName: string): string {
  return `\"\"\"Auto-generated skill stub for ${skillName}.\\nSee ${skillName}.md for behavior details.\"\"\"\\n\\n\\ndef run(input_text: str) -> str:\\n    \"\"\"Execute ${skillName} skill logic.\"\"\"\\n    return f\"${skillName}: {input_text}\"\\n`;
}

/**
 * Renders default Qwen settings.json.
 * @returns Qwen settings JSON.
 */
function renderQwenSettings(): string {
  return `${JSON.stringify(
    {
      model: {
        name: "qwen3-coder-plus",
      },
      context: {
        fileName: ["QWEN.md", "AGENTS.md"],
      },
    },
    null,
    2,
  )}\n`;
}
