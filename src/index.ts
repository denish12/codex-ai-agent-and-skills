#!/usr/bin/env node
import path from "node:path";
import prompts from "prompts";
import { Command } from "commander";
import { loadSourceCatalog, listAgentNames, listSkillNames, resolveSelection } from "./catalog.js";
import { runDoctor } from "./doctor.js";
import { runInstall, runUninstall } from "./installer.js";
import { error, info, success, warn } from "./logger.js";
import { getPlatformAdapters } from "./platforms/adapters.js";
import type { TargetId } from "./types.js";

const program = new Command();

program
  .name("code-ai")
  .description("Install code-ai agents and skills for AI coding assistants")
  .version("1.0.0");

program
  .command("targets")
  .description("List supported AI targets")
  .action(() => {
    const adapters = getPlatformAdapters();
    for (const adapter of adapters) {
      info(`${adapter.id} - ${adapter.label}`);
      info(`  ${adapter.description}`);
    }
  });

program
  .command("list")
  .description("List available agents and skills from current repository")
  .option("--project-dir <path>", "Project root path", process.cwd())
  .action(async (options: { projectDir: string }) => {
    try {
      const projectDir = path.resolve(options.projectDir);
      const catalog = await loadSourceCatalog(projectDir);
      const agents = listAgentNames(catalog);
      const skills = listSkillNames(catalog);

      info(`Agents (${agents.length}): ${agents.join(", ")}`);
      info(`Skills (${skills.length}): ${skills.join(", ")}`);
    } catch (err) {
      error((err as Error).message);
      process.exitCode = 1;
    }
  });

program
  .command("doctor")
  .description("Check source and destination health before install")
  .requiredOption("--target <id>", "Target AI id")
  .option("--project-dir <path>", "Project root path", process.cwd())
  .option("--destination <path>", "Destination root (default: project root)")
  .action(async (options: { target: string; projectDir: string; destination?: string }) => {
    try {
      const target = normalizeTarget(options.target);
      const projectDir = path.resolve(options.projectDir);
      const destinationDir = path.resolve(options.destination ?? projectDir);
      const report = await runDoctor(projectDir, destinationDir, target);

      for (const line of report.info) {
        info(line);
      }
      for (const line of report.warnings) {
        warn(line);
      }
      for (const line of report.errors) {
        error(line);
      }

      if (report.errors.length > 0) {
        process.exitCode = 1;
      } else {
        success("Doctor checks passed.");
      }
    } catch (err) {
      error((err as Error).message);
      process.exitCode = 1;
    }
  });

program
  .command("install")
  .description("Install selected agents and skills for target AI")
  .requiredOption("--target <id>", "Target AI id")
  .option("--project-dir <path>", "Project root path", process.cwd())
  .option("--destination <path>", "Destination root (default: project root)")
  .option("--agents <list>", "Comma list of agents or 'all'", "all")
  .option("--skills <list>", "Comma list of skills or 'all'", "all")
  .option("--overwrite", "Overwrite existing files", false)
  .option("--strict-hints", "Require explicit target-native hints in agent/skill files", false)
  .option("--apply", "Execute file writes (default is dry-run)", false)
  .action(
    async (options: {
      target: string;
      projectDir: string;
      destination?: string;
      agents: string;
      skills: string;
      overwrite: boolean;
      strictHints: boolean;
      apply: boolean;
    }) => {
      try {
        const target = normalizeTarget(options.target);
        const projectDir = path.resolve(options.projectDir);
        const destinationDir = path.resolve(options.destination ?? projectDir);
        const catalog = await loadSourceCatalog(projectDir);

        const selectedAgents = resolveSelection(options.agents, listAgentNames(catalog), "agents");
        const selectedSkills = resolveSelection(options.skills, listSkillNames(catalog), "skills");

        const dryRun = !options.apply;
        const overwriteMode = options.overwrite ? "overwrite" : "skip";
        if (dryRun) {
          warn("Running in dry-run mode. Use --apply to write files.");
        }

        const { state, result } = await runInstall({
          target,
          projectDir,
          destinationDir,
          selectedAgents,
          selectedSkills,
          dryRun,
          overwriteMode,
          strictHints: options.strictHints,
        });

        info(`Target: ${state.target}`);
        info(`Destination: ${state.destinationDir}`);
        info(`Files planned: ${result.plannedFiles.length}`);
        if (dryRun) {
          info(`Files would write: ${result.writtenFiles.length}`);
        } else {
          info(`Files written: ${result.writtenFiles.length}`);
        }
        info(`Files skipped: ${result.skippedFiles.length}`);
        if (result.backupDir) {
          info(`Backup: ${result.backupDir}`);
        }

        if (dryRun) {
          success("Dry-run completed.");
        } else {
          success("Install completed.");
        }
      } catch (err) {
        error((err as Error).message);
        process.exitCode = 1;
      }
    },
  );

program
  .command("uninstall")
  .description("Uninstall previously installed files for target")
  .requiredOption("--target <id>", "Target AI id")
  .option("--destination <path>", "Destination root", process.cwd())
  .option("--apply", "Execute delete operations (default is dry-run)", false)
  .action(async (options: { target: string; destination: string; apply: boolean }) => {
    try {
      const target = normalizeTarget(options.target);
      const destinationDir = path.resolve(options.destination);
      const dryRun = !options.apply;
      if (dryRun) {
        warn("Running in dry-run mode. Use --apply to remove files.");
      }

      const result = await runUninstall(destinationDir, target, dryRun);
      info(`Files removed/planned: ${result.removed.length}`);
      info(`Files missing: ${result.missing.length}`);
      if (dryRun) {
        success("Uninstall dry-run completed.");
      } else {
        success("Uninstall completed.");
      }
    } catch (err) {
      error((err as Error).message);
      process.exitCode = 1;
    }
  });

/**
 * Runs interactive installer workflow when no subcommand is provided.
 */
async function runInteractiveWizard(): Promise<void> {
  const projectDir = process.cwd();
  const catalog = await loadSourceCatalog(projectDir);
  const adapters = getPlatformAdapters();

  const targetAnswer = await prompts({
    type: "select",
    name: "target",
    message: "Выбери AI для установки:",
    choices: adapters.map((adapter) => ({
      title: `${adapter.label} (${adapter.id})`,
      value: adapter.id,
      description: adapter.description,
    })),
  });
  if (!targetAnswer.target) {
    warn("Установка отменена.");
    return;
  }

  const destinationAnswer = await prompts({
    type: "text",
    name: "destination",
    message: "Папка установки:",
    initial: projectDir,
    validate: (value: string) => (value.trim().length === 0 ? "Укажи путь" : true),
  });
  if (!destinationAnswer.destination) {
    warn("Установка отменена.");
    return;
  }

  const agents = listAgentNames(catalog);
  const skills = listSkillNames(catalog);

  const agentsAnswer = await prompts({
    type: "multiselect",
    name: "selectedAgents",
    message: "Выбери агентов:",
    choices: agents.map((agentName) => ({ title: agentName, value: agentName, selected: true })),
    min: 1,
    hint: "space: выбрать, enter: подтвердить",
  });
  if (!agentsAnswer.selectedAgents || agentsAnswer.selectedAgents.length === 0) {
    warn("Установка отменена.");
    return;
  }

  const skillsAnswer = await prompts({
    type: "multiselect",
    name: "selectedSkills",
    message: "Выбери skills:",
    choices: skills.map((skillName) => ({ title: skillName, value: skillName, selected: true })),
    min: 1,
    hint: "space: выбрать, enter: подтвердить",
  });
  if (!skillsAnswer.selectedSkills || skillsAnswer.selectedSkills.length === 0) {
    warn("Установка отменена.");
    return;
  }

  const optionsAnswer = await prompts([
    {
      type: "toggle",
      name: "overwrite",
      message: "Перезаписывать существующие файлы?",
      initial: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "apply",
      message: "Сразу выполнить установку?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "strictHints",
      message: "Требовать явные target-hints в agent/skill файлах?",
      initial: false,
      active: "yes",
      inactive: "no",
    },
  ]);

  const target = targetAnswer.target as TargetId;
  const destinationDir = path.resolve(destinationAnswer.destination as string);

  info("Запускаю doctor перед установкой...");
  const doctor = await runDoctor(projectDir, destinationDir, target);
  for (const line of doctor.info) {
    info(line);
  }
  for (const line of doctor.warnings) {
    warn(line);
  }
  for (const line of doctor.errors) {
    error(line);
  }
  if (doctor.errors.length > 0) {
    throw new Error("Doctor не пройден. Исправь ошибки и запусти снова.");
  }

  const dryRun = !Boolean(optionsAnswer.apply);
  const overwriteMode = optionsAnswer.overwrite ? "overwrite" : "skip";
  if (dryRun) {
    warn("Выбран preview-режим без записи файлов.");
  }

  const { state, result } = await runInstall({
    target,
    projectDir,
    destinationDir,
    selectedAgents: agentsAnswer.selectedAgents as string[],
    selectedSkills: skillsAnswer.selectedSkills as string[],
    dryRun,
    overwriteMode,
    strictHints: Boolean(optionsAnswer.strictHints),
  });

  info(`Target: ${state.target}`);
  info(`Destination: ${state.destinationDir}`);
  info(`Files planned: ${result.plannedFiles.length}`);
  if (dryRun) {
    info(`Files would write: ${result.writtenFiles.length}`);
    success("Preview completed.");
  } else {
    info(`Files written: ${result.writtenFiles.length}`);
    if (result.backupDir) {
      info(`Backup: ${result.backupDir}`);
    }
    success("Install completed.");
  }
}

/**
 * Normalizes user target aliases into strict target identifiers.
 * @param rawTarget Raw target value from CLI.
 * @returns Normalized target id.
 */
function normalizeTarget(rawTarget: string): TargetId {
  const value = rawTarget.trim().toLowerCase();
  const aliasMap: Record<string, TargetId> = {
    "vscode-copilot": "vscode-copilot",
    copilot: "vscode-copilot",
    "gpt-codex": "gpt-codex",
    codex: "gpt-codex",
    gptcodex: "gpt-codex",
    claude: "claude",
    "qwen-3.5": "qwen-3.5",
    qwen: "qwen-3.5",
    "google-antugravity": "google-antugravity",
    "google-antigravity": "google-antugravity",
    antugravity: "google-antugravity",
    antigravity: "google-antugravity",
    google: "google-antugravity",
  };
  const normalized = aliasMap[value];
  if (!normalized) {
    throw new Error(`Unsupported target '${rawTarget}'. Run 'code-ai targets' for full list.`);
  }
  return normalized;
}

if (process.argv.length <= 2) {
  runInteractiveWizard().catch((err) => {
    error((err as Error).message);
    process.exit(1);
  });
} else {
  program.parseAsync(process.argv).catch((err) => {
    error((err as Error).message);
    process.exit(1);
  });
}
