import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { runInstall, runUninstall } from "../installer.js";

const tempRoots: string[] = [];

/**
 * Creates isolated fixture project with one agent and one skill.
 * @returns Absolute fixture root path.
 */
async function createFixtureProject(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-installer-"));
  tempRoots.push(root);

  await fs.outputFile(path.join(root, "AGENTS.md"), "# orchestrator\n", "utf8");
  await fs.outputFile(
    path.join(root, "agents", "reviewer.md"),
    "<!-- codex: reasoning=high; note=\"strict review\" -->\n# reviewer\n",
    "utf8",
  );
  await fs.outputFile(path.join(root, ".agents", "skills", "board", "SKILL.md"), "# board\n", "utf8");

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
    expect(installedAgent.includes("<!-- claude: thinking=high; note=\"strict review\" -->")).toBe(true);
  });

  it("fails in strict-hints mode when native hint is missing", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await expect(
      runInstall({
        target: "claude",
        projectDir,
        destinationDir,
        selectedAgents: ["reviewer"],
        selectedSkills: [],
        dryRun: false,
        overwriteMode: "overwrite",
        strictHints: true,
      }),
    ).rejects.toThrow("Strict hints check failed");
  });

  it("fails in strict-hints mode during dry-run as well", async () => {
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
    ).rejects.toThrow("Strict hints check failed");
  });
});
