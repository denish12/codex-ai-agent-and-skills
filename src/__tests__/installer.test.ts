import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { runInstall, runUninstall } from "../installer.js";

const tempRoots: string[] = [];

/**
 * Creates isolated fixture project with one agent, one skill, and sidecar metadata.
 * @returns Absolute fixture root path.
 */
async function createFixtureProject(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-installer-"));
  tempRoots.push(root);

  await fs.outputFile(path.join(root, "AGENTS.md"), "# orchestrator\n", "utf8");
  await fs.outputFile(path.join(root, "AGENTS.yaml"), 'name: "orchestrator"\n', "utf8");
  await fs.outputFile(
    path.join(root, "agents", "reviewer.md"),
    '<!-- codex: reasoning=high; note="strict review" -->\n# reviewer\n',
    "utf8",
  );
  await fs.outputFile(
    path.join(root, "agents", "orchestrator.openai.yaml"),
    'interface:\n  display_name: "Orchestrator"\n',
    "utf8",
  );
  await fs.outputJson(path.join(root, "agents", "orchestrator.claude.json"), { name: "orchestrator" }, { spaces: 2 });
  await fs.outputJson(path.join(root, "agents", "orchestrator.gemini.json"), { name: "orchestrator" }, { spaces: 2 });
  await fs.outputJson(path.join(root, "agents", "orchestrator.copilot.json"), { name: "orchestrator" }, { spaces: 2 });
  await fs.outputJson(path.join(root, "agents", "orchestrator.qwen.json"), { name: "orchestrator" }, { spaces: 2 });

  await fs.outputFile(path.join(root, ".agents", "skills", "board", "SKILL.md"), "# board\n", "utf8");
  await fs.outputFile(path.join(root, ".agents", "skills", "board", "agents", "skill.yaml"), 'name: "board"\n', "utf8");
  await fs.outputFile(
    path.join(root, ".agents", "skills", "board", "agents", "openai.yaml"),
    'interface:\n  display_name: "Board"\n',
    "utf8",
  );
  await fs.outputJson(path.join(root, ".agents", "skills", "board", "agents", "claude.json"), { name: "board" }, { spaces: 2 });
  await fs.outputJson(path.join(root, ".agents", "skills", "board", "agents", "gemini.json"), { name: "board" }, { spaces: 2 });
  await fs.outputJson(path.join(root, ".agents", "skills", "board", "agents", "copilot.json"), { name: "board" }, { spaces: 2 });
  await fs.outputJson(path.join(root, ".agents", "skills", "board", "agents", "qwen.json"), { name: "board" }, { spaces: 2 });
  await fs.outputFile(path.join(root, ".agents", "workflows", "start-task.md"), "# start-task\n", "utf8");
  await fs.outputFile(path.join(root, "CONTEXT.md"), "# \ud83c\udfaf \u041e\u0431\u0437\u043e\u0440 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\n", "utf8");

  return root;
}

afterEach(async () => {
  for (const root of tempRoots.splice(0, tempRoots.length)) {
    await fs.remove(root);
  }
});

describe("installer", () => {
  it("keeps filesystem unchanged in dry-run mode", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    const result = await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: true,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(result.result.plannedFiles.length).toBeGreaterThan(0);
    expect(await fs.pathExists(path.join(destinationDir, "CLAUDE.md"))).toBe(false);
  });

  it("writes files and supports uninstall", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "vscode-copilot",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, ".github", "copilot-instructions.md"))).toBe(true);

    const uninstallResult = await runUninstall(destinationDir, "vscode-copilot", false);
    expect(uninstallResult.removed.length).toBeGreaterThan(0);
    expect(await fs.pathExists(path.join(destinationDir, ".github", "copilot-instructions.md"))).toBe(false);
  });

  it("normalizes model hints for non-codex targets", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    const installedAgent = await fs.readFile(path.join(destinationDir, ".claude", "agents", "reviewer.md"), "utf8");
    expect(installedAgent.includes("<!-- codex: reasoning=high -->")).toBe(false);
    expect(installedAgent.includes("target=claude")).toBe(true);
    expect(installedAgent.includes("normalized_hints=codex")).toBe(true);
    expect(installedAgent.includes('<!-- claude: thinking=high; note="strict review" -->')).toBe(true);
  });

  it("installs skill and orchestrator metadata sidecars for claude", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, "AGENTS.yaml"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".claude", "orchestrator.claude.json"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".claude", "skills", "board", "agents", "skill.yaml"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".claude", "skills", "board", "agents", "claude.json"))).toBe(true);
  });

  it("auto-adapts in strict-hints mode when native hint is missing", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: [],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: true,
    });

    const installedAgent = await fs.readFile(path.join(destinationDir, ".claude", "agents", "reviewer.md"), "utf8");
    expect(installedAgent.includes('<!-- claude: thinking=high; note="strict review" -->')).toBe(true);
  });

  it("does not fail in strict-hints mode during dry-run", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await expect(
      runInstall({
        target: "claude",
        projectDir,
        destinationDir,
        selectedAgents: ["reviewer"],
        selectedSkills: [],
        dryRun: true,
        overwriteMode: "overwrite",
        strictHints: true,
      }),
    ).resolves.toBeDefined();
  });

  it("creates antugravity layout with per-agent folders and script skills", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "google-antugravity",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, "AGENTS.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, "GEMINI.md"))).toBe(true);

    const installedAgents = await fs.readFile(path.join(destinationDir, "AGENTS.md"), "utf8");
    const installedGemini = await fs.readFile(path.join(destinationDir, "GEMINI.md"), "utf8");
    expect(installedGemini).toBe(installedAgents);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "agents", "reviewer", "prompt.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "agents", "reviewer", "config.json"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board", "SKILL.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board", "board.py"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "orchestrator.gemini.json"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board", "agents", "skill.yaml"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board", "agents", "gemini.json"))).toBe(true);
  });

  it("installs codex skills into .agents/skills and copies workflows", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "gpt-codex",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, "CODEX.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, "agents", "reviewer.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".agents", "skills", "board", "SKILL.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".agents", "skills", "board", "agents", "skill.yaml"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".agents", "workflows", "start-task.md"))).toBe(true);
  });

  it("creates .qwen/settings.json for qwen target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "qwen-3.5",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    const settingsPath = path.join(destinationDir, ".qwen", "settings.json");
    expect(await fs.pathExists(settingsPath)).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".qwen", "orchestrator.qwen.json"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".qwen", "skills", "board", "agents", "qwen.json"))).toBe(true);

    const settings = JSON.parse(await fs.readFile(settingsPath, "utf8")) as {
      model: { name: string };
      context: { fileName: string[] };
    };
    expect(settings.model.name).toBe("qwen3-coder-plus");
    expect(settings.context.fileName).toEqual(["QWEN.md", "AGENTS.md"]);
  });

  it("copies workflows for vscode-copilot target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "vscode-copilot",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, ".github", "workflows", "start-task.md"))).toBe(true);
  });

  it("copies workflows for claude target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, ".claude", "workflows", "start-task.md"))).toBe(true);
  });

  it("copies workflows for qwen-3.5 target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "qwen-3.5",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, ".qwen", "workflows", "start-task.md"))).toBe(true);
  });

  it("copies workflows for google-antugravity target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "google-antugravity",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "workflows", "start-task.md"))).toBe(true);
  });

  it("installs CONTEXT.md extra file for gpt-codex target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "gpt-codex",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, "CONTEXT.md"))).toBe(true);
    const content = await fs.readFile(path.join(destinationDir, "CONTEXT.md"), "utf8");
    expect(content).toContain("\ud83c\udfaf");
  });

  it("installs CONTEXT.md extra file for claude target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, "CONTEXT.md"))).toBe(true);
  });

  it("installs CONTEXT.md extra file for google-antugravity target", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "google-antugravity",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    expect(await fs.pathExists(path.join(destinationDir, "CONTEXT.md"))).toBe(true);
  });

  it("saves domain-aware state file with double-dash separator", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      domain: "content",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    const stateFile = path.join(destinationDir, ".code-ai-installer", "state", "claude--content.json");
    expect(await fs.pathExists(stateFile)).toBe(true);

    const state = JSON.parse(await fs.readFile(stateFile, "utf8")) as { domain?: string };
    expect(state.domain).toBe("content");
  });

  it("saves legacy state file when domain is undefined", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    const legacyState = path.join(destinationDir, ".code-ai-installer", "state", "claude.json");
    expect(await fs.pathExists(legacyState)).toBe(true);

    const domainState = path.join(destinationDir, ".code-ai-installer", "state", "claude--content.json");
    expect(await fs.pathExists(domainState)).toBe(false);
  });

  it("uninstalls domain-aware install correctly", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "claude",
      domain: "development",
      projectDir,
      destinationDir,
      selectedAgents: ["reviewer"],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    const result = await runUninstall(destinationDir, "claude", false, "development");
    expect(result.removed.length).toBeGreaterThan(0);
  });
});
