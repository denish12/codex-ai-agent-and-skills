#!/usr/bin/env node
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";
import { Command } from "commander";
import { loadSourceCatalog, listAgentNames, listSkillNames, resolveSelection } from "./catalog.js";
import { listDomains, resolveDomainSourceRoot, normalizeDomain, resolveDomainAwareRootWithId } from "./domainResolver.js";
import { runDoctor } from "./doctor.js";
import { runInstall, runUninstall } from "./installer.js";
import { error, info, success, warn } from "./logger.js";
import { getPlatformAdapters } from "./platforms/adapters.js";
import { resolveSourceRoot } from "./sourceResolver.js";
import type { DomainId, TargetId, TemplateLanguage } from "./types.js";
import { printBanner } from "./banner.js";

const program = new Command();
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requireJson = createRequire(import.meta.url);
const pkg = requireJson("../package.json") as { version: string };

interface WizardText {
  cancelled: string;
  selectTemplateLanguage: string;
  languageRu: string;
  languageEn: string;
  selectDomain: string;
  domainAutoSelected: string;
  noDomainError: string;
  selectAiTarget: string;
  installWhere: string;
  currentFolder: string;
  newFolder: string;
  newFolderName: string;
  newFolderNameRequired: string;
  selectAgents: string;
  selectSkills: string;
  selectHint: string;
  overwritePrompt: string;
  applyPrompt: string;
  strictHintsPrompt: string;
  runDoctor: string;
  doctorFailed: string;
  dryRunMode: string;
  previewCompleted: string;
}

const WIZARD_TEXT: Record<TemplateLanguage, WizardText> = {
  en: {
    cancelled: "Installation cancelled.",
    selectTemplateLanguage: "Select template language:",
    languageRu: "Russian (ru)",
    languageEn: "English (en)",
    selectDomain: "Select domain:",
    domainAutoSelected: "Using domain: %s",
    noDomainError: "No domains found.",
    selectAiTarget: "Select AI target:",
    installWhere: "Where should files be installed?",
    currentFolder: "Current folder",
    newFolder: "New folder",
    newFolderName: "New folder name:",
    newFolderNameRequired: "Please provide folder name",
    selectAgents: "Select agents:",
    selectSkills: "Select skills:",
    selectHint: "space: toggle, enter: submit",
    overwritePrompt: "Overwrite existing files?",
    applyPrompt: "Run installation now?",
    strictHintsPrompt: "Enforce strict target-hint adaptation?",
    runDoctor: "Running doctor before install...",
    doctorFailed: "Doctor checks failed. Fix issues and run again.",
    dryRunMode: "Preview mode selected (no file writes).",
    previewCompleted: "Preview completed.",
  },
  ru: {
    cancelled: "Установка отменена.",
    selectTemplateLanguage: "Выбери язык шаблонов:",
    languageRu: "Русский (ru)",
    languageEn: "English (en)",
    selectDomain: "Выбери домен:",
    domainAutoSelected: "Домен: %s (единственный)",
    noDomainError: "Домены не найдены.",
    selectAiTarget: "Выбери AI для установки:",
    installWhere: "Куда устанавливать?",
    currentFolder: "Текущая папка",
    newFolder: "Новая папка",
    newFolderName: "Название новой папки:",
    newFolderNameRequired: "Укажи название папки",
    selectAgents: "Выбери агентов:",
    selectSkills: "Выбери skills:",
    selectHint: "space: выбрать, enter: подтвердить",
    overwritePrompt: "Перезаписывать существующие файлы?",
    applyPrompt: "Сразу выполнить установку?",
    strictHintsPrompt: "Требовать явные target-hints в agent/skill файлах?",
    runDoctor: "Запускаю doctor перед установкой...",
    doctorFailed: "Doctor не пройден. Исправь ошибки и запусти снова.",
    dryRunMode: "Выбран preview-режим без записи файлов.",
    previewCompleted: "Preview completed.",
  },
};

program
  .name("code-ai")
  .description("Install code-ai agents and skills for AI coding assistants")
  .version(pkg.version);

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
  .description("List available bundled agents and skills")
  .option("--project-dir <path>", "Optional custom source root path")
  .option("--domain <name>", "Domain name (development | content)")
  .option("--lang <lang>", "Template language: ru | en", "ru")
  .action(async (options: { projectDir?: string; domain?: string; lang: string }) => {
    try {
      const language = normalizeLanguage(options.lang);
      const pkgRoot = await resolveSourceRoot({
        projectDirOption: options.projectDir,
        cwd: process.cwd(),
        packageRoot,
        language,
      });
      const { effectiveRoot: projectDir } = await resolveDomainAwareRootWithId(pkgRoot, options.domain, language);
      const catalog = await loadSourceCatalog(projectDir);
      const agents = listAgentNames(catalog);
      const skills = listSkillNames(catalog);

      info(`Source: ${projectDir}`);
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
  .option("--project-dir <path>", "Optional custom source root path")
  .option("--domain <name>", "Domain name (development | content)")
  .option("--destination <path>", "Destination root (default: current directory)")
  .option("--lang <lang>", "Template language: ru | en", "ru")
  .action(async (options: { target: string; projectDir?: string; domain?: string; destination?: string; lang: string }) => {
    try {
      const target = normalizeTarget(options.target);
      const language = normalizeLanguage(options.lang);
      const pkgRoot = await resolveSourceRoot({
        projectDirOption: options.projectDir,
        cwd: process.cwd(),
        packageRoot,
        language,
      });
      const { effectiveRoot: projectDir } = await resolveDomainAwareRootWithId(pkgRoot, options.domain, language);
      const destinationDir = path.resolve(options.destination ?? process.cwd());
      const report = await runDoctor(projectDir, destinationDir, target);

      info(`Source: ${projectDir}`);
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
  .option("--project-dir <path>", "Optional custom source root path")
  .option("--domain <name>", "Domain name (development | content)")
  .option("--destination <path>", "Destination root (default: current directory)")
  .option("--create-dir <name>", "Create child folder in current directory and install there")
  .option("--lang <lang>", "Template language: ru | en", "ru")
  .option("--agents <list>", "Comma list of agents or 'all'", "all")
  .option("--skills <list>", "Comma list of skills or 'all'", "all")
  .option("--overwrite", "Overwrite existing files", false)
  .option("--strict-hints", "Require explicit target-native hints in agent/skill files", false)
  .option("--apply", "Execute file writes (default is dry-run)", false)
  .action(
    async (options: {
      target: string;
      projectDir?: string;
      domain?: string;
      destination?: string;
      createDir?: string;
      lang: string;
      agents: string;
      skills: string;
      overwrite: boolean;
      strictHints: boolean;
      apply: boolean;
    }) => {
      try {
        const target = normalizeTarget(options.target);
        const language = normalizeLanguage(options.lang);
        const pkgRoot = await resolveSourceRoot({
          projectDirOption: options.projectDir,
          cwd: process.cwd(),
          packageRoot,
          language,
        });
        const { effectiveRoot: projectDir, domainId } = await resolveDomainAwareRootWithId(pkgRoot, options.domain, language);
        const baseDestination = path.resolve(options.destination ?? process.cwd());
        const destinationDir = options.createDir ? path.join(baseDestination, options.createDir) : baseDestination;
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
          ...(domainId ? { domain: domainId } : {}),
          projectDir,
          destinationDir,
          selectedAgents,
          selectedSkills,
          dryRun,
          overwriteMode,
          strictHints: options.strictHints,
        });

        info(`Source: ${projectDir}`);
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
  .option("--domain <name>", "Domain name (development | content)")
  .option("--destination <path>", "Destination root", process.cwd())
  .option("--apply", "Execute delete operations (default is dry-run)", false)
  .action(async (options: { target: string; domain?: string; destination: string; apply: boolean }) => {
    try {
      const target = normalizeTarget(options.target);
      const domainId = options.domain ? normalizeDomain(options.domain) : undefined;
      const destinationDir = path.resolve(options.destination);
      const dryRun = !options.apply;
      if (dryRun) {
        warn("Running in dry-run mode. Use --apply to remove files.");
      }

      const result = await runUninstall(destinationDir, target, dryRun, domainId);
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
  printBanner();

  const bootstrapText = WIZARD_TEXT.en;
  const languageAnswer = await prompts({
    type: "select",
    name: "language",
    message: bootstrapText.selectTemplateLanguage,
    choices: [
      { title: bootstrapText.languageEn, value: "en" },
      { title: bootstrapText.languageRu, value: "ru" },
    ],
    initial: 0,
  });
  if (!languageAnswer.language) {
    warn(bootstrapText.cancelled);
    return;
  }
  const language = normalizeLanguage(languageAnswer.language as string);
  const text = WIZARD_TEXT[language];
  const pkgRoot = await resolveSourceRoot({
    cwd: process.cwd(),
    packageRoot,
    language,
  });

  const domains = await listDomains(pkgRoot);
  let selectedDomainId: DomainId | undefined;
  let sourceRoot: string;

  if (domains.length === 0) {
    sourceRoot = pkgRoot;
  } else if (domains.length === 1) {
    selectedDomainId = domains[0].id;
    info(text.domainAutoSelected.replace("%s", domains[0].name));
    sourceRoot = await resolveDomainSourceRoot({ packageRoot: pkgRoot, domainId: selectedDomainId, language });
  } else {
    const domainAnswer = await prompts({
      type: "select",
      name: "domain",
      message: text.selectDomain,
      choices: domains.map((d) => ({
        title: `${d.name} — ${d.description} (${d.agentCount} agents, ${d.skillCount} skills)`,
        value: d.id,
      })),
    });
    if (!domainAnswer.domain) {
      warn(text.cancelled);
      return;
    }
    selectedDomainId = domainAnswer.domain as DomainId;
    sourceRoot = await resolveDomainSourceRoot({ packageRoot: pkgRoot, domainId: selectedDomainId, language });
  }

  const catalog = await loadSourceCatalog(sourceRoot);
  const adapters = getPlatformAdapters();

  const targetAnswer = await prompts({
    type: "select",
    name: "target",
    message: text.selectAiTarget,
    choices: adapters.map((adapter) => ({
      title: `${adapter.label} (${adapter.id})`,
      value: adapter.id,
      description: adapter.description,
    })),
  });
  if (!targetAnswer.target) {
    warn(text.cancelled);
    return;
  }

  const destinationModeAnswer = await prompts({
    type: "select",
    name: "mode",
    message: text.installWhere,
    choices: [
      { title: text.currentFolder, value: "current" },
      { title: text.newFolder, value: "new" },
    ],
  });
  if (!destinationModeAnswer.mode) {
    warn(text.cancelled);
    return;
  }

  let destinationDir = process.cwd();
  if (destinationModeAnswer.mode === "new") {
    const newFolderAnswer = await prompts({
      type: "text",
      name: "folderName",
      message: text.newFolderName,
      validate: (value: string) => (value.trim().length === 0 ? text.newFolderNameRequired : true),
    });
    if (!newFolderAnswer.folderName) {
      warn(text.cancelled);
      return;
    }
    destinationDir = path.join(process.cwd(), String(newFolderAnswer.folderName).trim());
  }

  const agents = listAgentNames(catalog);
  const skills = listSkillNames(catalog);

  const agentsAnswer = await prompts({
    type: "multiselect",
    name: "selectedAgents",
    message: text.selectAgents,
    choices: agents.map((agentName) => ({ title: agentName, value: agentName, selected: true })),
    min: 1,
    hint: text.selectHint,
  });
  if (!agentsAnswer.selectedAgents || agentsAnswer.selectedAgents.length === 0) {
    warn(text.cancelled);
    return;
  }

  const skillsAnswer = await prompts({
    type: "multiselect",
    name: "selectedSkills",
    message: text.selectSkills,
    choices: skills.map((skillName) => ({ title: skillName, value: skillName, selected: true })),
    min: 1,
    hint: text.selectHint,
  });
  if (!skillsAnswer.selectedSkills || skillsAnswer.selectedSkills.length === 0) {
    warn(text.cancelled);
    return;
  }

  const optionsAnswer = await prompts([
    {
      type: "toggle",
      name: "overwrite",
      message: text.overwritePrompt,
      initial: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "apply",
      message: text.applyPrompt,
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "strictHints",
      message: text.strictHintsPrompt,
      initial: false,
      active: "yes",
      inactive: "no",
    },
  ]);

  const target = targetAnswer.target as TargetId;

  info(text.runDoctor);
  const doctor = await runDoctor(sourceRoot, destinationDir, target);
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
    throw new Error(text.doctorFailed);
  }

  const dryRun = !Boolean(optionsAnswer.apply);
  const overwriteMode = optionsAnswer.overwrite ? "overwrite" : "skip";
  if (dryRun) {
    warn(text.dryRunMode);
  }

  const { state, result } = await runInstall({
    target,
    ...(selectedDomainId ? { domain: selectedDomainId } : {}),
    projectDir: sourceRoot,
    destinationDir,
    selectedAgents: agentsAnswer.selectedAgents as string[],
    selectedSkills: skillsAnswer.selectedSkills as string[],
    dryRun,
    overwriteMode,
    strictHints: Boolean(optionsAnswer.strictHints),
  });

  info(`Source: ${sourceRoot}`);
  info(`Target: ${state.target}`);
  info(`Destination: ${state.destinationDir}`);
  info(`Files planned: ${result.plannedFiles.length}`);
  if (dryRun) {
    info(`Files would write: ${result.writtenFiles.length}`);
    success(text.previewCompleted);
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

/**
 * Normalizes template language code.
 * @param rawLanguage Raw language value.
 * @returns Normalized template language.
 */
function normalizeLanguage(rawLanguage: string): TemplateLanguage {
  const value = rawLanguage.trim().toLowerCase();
  if (value === "ru" || value === "en") {
    return value;
  }
  throw new Error(`Unsupported language '${rawLanguage}'. Use 'ru' or 'en'.`);
}

if (process.argv.length <= 2) {
  runInteractiveWizard().catch((err) => {
    error((err as Error).message);
    process.exitCode = 1;
  });
} else {
  program.parseAsync(process.argv).catch((err) => {
    error((err as Error).message);
    process.exitCode = 1;
  });
}
