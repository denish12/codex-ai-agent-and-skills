import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { runDoctor } from "../doctor.js";

const tempRoots: string[] = [];

interface FixtureOptions {
  omitPortableSkill?: boolean;
  omitVendorSkill?: boolean;
  mismatchPortableSkillName?: boolean;
  invalidVendorSkillJson?: boolean;
  invalidOrchestratorVendorJson?: boolean;
}

async function createFixtureProject(options: FixtureOptions = {}): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-doctor-"));
  tempRoots.push(root);

  const skillDescription = "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0437\u0430\u0434\u0430\u0447 \u043d\u0430 \u0443\u0440\u043e\u0432\u043d\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u043d\u043e\u0439 \u0434\u043e\u0441\u043a\u0438.";
  const portablePrompt = '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 $board, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0441\u044f \u043a \u043d\u0430\u0432\u044b\u043a\u0443 "\u041f\u0440\u043e\u0435\u043a\u0442\u043d\u0430\u044f \u0434\u043e\u0441\u043a\u0430".';
  const skillPortable = [
    'version: 1',
    'name: "board"',
    'display_name: "\u041f\u0440\u043e\u0435\u043a\u0442\u043d\u0430\u044f \u0434\u043e\u0441\u043a\u0430"',
    `description: "${skillDescription}"`,
    `default_prompt: '${portablePrompt}'`,
  ].join("\n");

  await fs.outputFile(path.join(root, "AGENTS.md"), "# AGENTS.md - Test Orchestrator\n", "utf8");
  await fs.outputFile(
    path.join(root, "AGENTS.yaml"),
    [
      'version: 1',
      'name: "web_development_orchestra"',
      'display_name: "\u0422\u0435\u0441\u0442\u043e\u0432\u044b\u0439 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0442\u043e\u0440"',
      'description: "\u0411\u0430\u0437\u043e\u0432\u044b\u0439 \u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0434\u043b\u044f \u0442\u0435\u0441\u0442\u043e\u0432."',
      'default_prompt: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 AGENTS.md \u0434\u043b\u044f \u0442\u0435\u0441\u0442\u043e\u0432\u043e\u0439 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438."',
    ].join("\n"),
    "utf8",
  );
  await fs.outputFile(path.join(root, "agents", "reviewer.md"), "# reviewer\n", "utf8");

  if (options.invalidOrchestratorVendorJson) {
    await fs.outputFile(path.join(root, "agents", "orchestrator.claude.json"), "{bad json", "utf8");
  } else {
    await fs.outputJson(
      path.join(root, "agents", "orchestrator.claude.json"),
      {
        name: "web_development_orchestra",
        display_name: "\u0422\u0435\u0441\u0442\u043e\u0432\u044b\u0439 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0442\u043e\u0440",
        description: "\u0411\u0430\u0437\u043e\u0432\u044b\u0439 \u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0434\u043b\u044f \u0442\u0435\u0441\u0442\u043e\u0432.",
        default_prompt: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 AGENTS.md \u0434\u043b\u044f \u0442\u0435\u0441\u0442\u043e\u0432\u043e\u0439 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438.",
      },
      { spaces: 2 },
    );
  }

  await fs.outputFile(
    path.join(root, ".agents", "board", "SKILL.md"),
    [
      '---',
      'name: board',
      `description: ${skillDescription}`,
      '---',
      '',
      '# Skill: Board',
    ].join("\n"),
    "utf8",
  );

  if (!options.omitPortableSkill) {
    const portableText = options.mismatchPortableSkillName ? skillPortable.replace('name: "board"', 'name: "wrong_board"') : skillPortable;
    await fs.outputFile(path.join(root, ".agents", "board", "agents", "skill.yaml"), portableText, "utf8");
  }

  if (!options.omitVendorSkill) {
    if (options.invalidVendorSkillJson) {
      await fs.outputFile(path.join(root, ".agents", "board", "agents", "claude.json"), "{bad json", "utf8");
    } else {
      await fs.outputJson(
        path.join(root, ".agents", "board", "agents", "claude.json"),
        {
          name: "board",
          display_name: "\u041f\u0440\u043e\u0435\u043a\u0442\u043d\u0430\u044f \u0434\u043e\u0441\u043a\u0430",
          description: skillDescription,
          default_prompt: portablePrompt,
        },
        { spaces: 2 },
      );
    }
  }

  return root;
}

afterEach(async () => {
  for (const root of tempRoots.splice(0, tempRoots.length)) {
    await fs.remove(root);
  }
});

describe("doctor metadata audit", () => {
  it("passes on valid metadata sidecars", async () => {
    const projectDir = await createFixtureProject();
    const report = await runDoctor(projectDir, path.join(projectDir, "out"), "claude");

    expect(report.errors).toEqual([]);
    expect(report.warnings).toEqual([]);
    expect(report.info).toContain("Metadata audit target: claude.");
  });

  it("warns when portable skill metadata is missing", async () => {
    const projectDir = await createFixtureProject({ omitPortableSkill: true });
    const report = await runDoctor(projectDir, path.join(projectDir, "out"), "claude");

    expect(report.errors).toEqual([]);
    expect(report.warnings.some((line) => line.includes("[metadata:skill:board] Missing portable sidecar"))).toBe(true);
  });

  it("warns when target vendor metadata is missing", async () => {
    const projectDir = await createFixtureProject({ omitVendorSkill: true });
    const report = await runDoctor(projectDir, path.join(projectDir, "out"), "claude");

    expect(report.errors).toEqual([]);
    expect(report.warnings.some((line) => line.includes("[metadata:skill:board] Missing target sidecar"))).toBe(true);
  });

  it("errors on invalid vendor json", async () => {
    const projectDir = await createFixtureProject({ invalidVendorSkillJson: true });
    const report = await runDoctor(projectDir, path.join(projectDir, "out"), "claude");

    expect(report.errors.some((line) => line.includes("[metadata:skill:board] Invalid JSON"))).toBe(true);
  });

  it("errors on portable metadata name mismatch", async () => {
    const projectDir = await createFixtureProject({ mismatchPortableSkillName: true });
    const report = await runDoctor(projectDir, path.join(projectDir, "out"), "claude");

    expect(report.errors.some((line) => line.includes("[metadata:skill:board] name mismatch in") || line.includes("skill.yaml name mismatch"))).toBe(true);
  });

  it("errors on broken orchestrator metadata", async () => {
    const projectDir = await createFixtureProject({ invalidOrchestratorVendorJson: true });
    const report = await runDoctor(projectDir, path.join(projectDir, "out"), "claude");

    expect(report.errors.some((line) => line.includes("[metadata:orchestrator] Invalid JSON"))).toBe(true);
  });
});
