import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getPlatformAdapter } from "../platforms/adapters.js";
import { runInstall } from "../installer.js";
import type { SourceCatalog, TargetId } from "../types.js";

/* ─── Shared Helpers ──────────────────────────────────────────────── */

const tempRoots: string[] = [];

/**
 * Creates minimal fixture project with two skills for integration tests.
 * @returns Absolute fixture root path.
 */
async function createFixtureProject(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "gemini-nested-skill-"));
  tempRoots.push(root);

  await fs.outputFile(path.join(root, "AGENTS.md"), "# orchestrator\n", "utf8");
  await fs.outputFile(path.join(root, "AGENTS.yaml"), 'name: "orchestrator"\n', "utf8");
  await fs.outputFile(path.join(root, "agents", "reviewer.md"), "# reviewer\n", "utf8");
  await fs.outputJson(
    path.join(root, "agents", "orchestrator.gemini.json"),
    { name: "orchestrator" },
    { spaces: 2 },
  );

  // Skill 1: board — with full sidecar metadata
  await fs.outputFile(path.join(root, ".agents", "skills", "board", "SKILL.md"), "# board\n", "utf8");
  await fs.outputFile(
    path.join(root, ".agents", "skills", "board", "agents", "skill.yaml"),
    'name: "board"\n',
    "utf8",
  );
  await fs.outputJson(
    path.join(root, ".agents", "skills", "board", "agents", "gemini.json"),
    { name: "board" },
    { spaces: 2 },
  );

  // Skill 2: a11y_baseline — with partial sidecar metadata
  await fs.outputFile(
    path.join(root, ".agents", "skills", "a11y_baseline", "SKILL.md"),
    "# a11y_baseline\n",
    "utf8",
  );
  await fs.outputFile(
    path.join(root, ".agents", "skills", "a11y_baseline", "agents", "skill.yaml"),
    'name: "a11y_baseline"\n',
    "utf8",
  );
  await fs.outputJson(
    path.join(root, ".agents", "skills", "a11y_baseline", "agents", "gemini.json"),
    { name: "a11y_baseline" },
    { spaces: 2 },
  );

  return root;
}

/**
 * Builds a minimal SourceCatalog for unit-level adapter tests.
 * @param root Project root path.
 * @param skillNames Skill names to include.
 * @returns SourceCatalog with the given skills.
 */
function buildCatalog(root: string, skillNames: string[]): SourceCatalog {
  const skillFiles: Record<string, string> = {};
  for (const name of skillNames) {
    skillFiles[name] = path.join(root, ".agents", "skills", name, "SKILL.md");
  }
  return {
    rootDir: root,
    orchestratorPath: path.join(root, "AGENTS.md"),
    agentFiles: { reviewer: path.join(root, "agents", "reviewer.md") },
    skillFiles,
    workflowFiles: {},
  };
}

afterEach(async () => {
  for (const root of tempRoots.splice(0, tempRoots.length)) {
    await fs.remove(root);
  }
});

/* ─── Unit Tests: planOperations path structure ───────────────────── */

describe("planForGeminiLayout — skill path structure", () => {
  const TARGET: TargetId = "google-antugravity";
  const ROOT = "/fake/project";
  const DEST = "/fake/dest";

  let adapter: ReturnType<typeof getPlatformAdapter>;

  beforeEach(() => {
    adapter = getPlatformAdapter(TARGET);
  });

  it("should place SKILL.md inside nested subfolder, not flat", () => {
    const catalog = buildCatalog(ROOT, ["board"]);

    const operations = adapter.planOperations({
      catalog,
      destinationDir: DEST,
      selectedAgents: [],
      selectedSkills: ["board"],
    });

    const skillMdOp = operations.find((op) => op.destinationPath.endsWith("SKILL.md"));
    expect(skillMdOp).toBeDefined();
    expect(skillMdOp!.destinationPath).toBe(
      path.join(DEST, ".gemini", "skills", "board", "SKILL.md"),
    );
  });

  it("should place .py stub inside nested subfolder, not flat", () => {
    const catalog = buildCatalog(ROOT, ["board"]);

    const operations = adapter.planOperations({
      catalog,
      destinationDir: DEST,
      selectedAgents: [],
      selectedSkills: ["board"],
    });

    const pyOp = operations.find((op) => op.destinationPath.endsWith(".py"));
    expect(pyOp).toBeDefined();
    expect(pyOp!.destinationPath).toBe(
      path.join(DEST, ".gemini", "skills", "board", "board.py"),
    );
  });

  it("should reference SKILL.md (not skillName.md) in .py stub content", () => {
    const catalog = buildCatalog(ROOT, ["board"]);

    const operations = adapter.planOperations({
      catalog,
      destinationDir: DEST,
      selectedAgents: [],
      selectedSkills: ["board"],
    });

    const pyOp = operations.find((op) => op.destinationPath.endsWith(".py"));
    expect(pyOp).toBeDefined();
    expect(pyOp!.content).toContain("See SKILL.md for behavior details");
    expect(pyOp!.content).not.toContain("See board.md for behavior details");
  });

  it("should NOT produce flat {skillName}.md files at skillsDir root", () => {
    const catalog = buildCatalog(ROOT, ["board", "a11y_baseline"]);

    const operations = adapter.planOperations({
      catalog,
      destinationDir: DEST,
      selectedAgents: [],
      selectedSkills: ["board", "a11y_baseline"],
    });

    const flatMd = operations.filter(
      (op) =>
        op.destinationPath === path.join(DEST, ".gemini", "skills", "board.md") ||
        op.destinationPath === path.join(DEST, ".gemini", "skills", "a11y_baseline.md"),
    );
    expect(flatMd).toHaveLength(0);
  });

  it("should produce consistent nested structure for multiple skills", () => {
    const catalog = buildCatalog(ROOT, ["board", "a11y_baseline"]);

    const operations = adapter.planOperations({
      catalog,
      destinationDir: DEST,
      selectedAgents: [],
      selectedSkills: ["board", "a11y_baseline"],
    });

    for (const skillName of ["board", "a11y_baseline"]) {
      const nestedSkillMd = operations.find(
        (op) => op.destinationPath === path.join(DEST, ".gemini", "skills", skillName, "SKILL.md"),
      );
      expect(nestedSkillMd, `SKILL.md should exist for ${skillName}`).toBeDefined();

      const nestedPy = operations.find(
        (op) =>
          op.destinationPath === path.join(DEST, ".gemini", "skills", skillName, `${skillName}.py`),
      );
      expect(nestedPy, `.py stub should exist for ${skillName}`).toBeDefined();
    }
  });
});

/* ─── Integration Tests: real filesystem install ──────────────────── */

describe("integration: google-antugravity nested skill install", () => {
  it("should write SKILL.md and .py stub inside skill subfolder", async () => {
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

    // Nested paths MUST exist
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board", "SKILL.md"))).toBe(true);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board", "board.py"))).toBe(true);

    // Flat paths MUST NOT exist
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board.md"))).toBe(false);
    expect(await fs.pathExists(path.join(destinationDir, ".gemini", "skills", "board.py"))).toBe(false);
  });

  it("should place sidecar metadata alongside SKILL.md in agents/ subfolder", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "google-antugravity",
      projectDir,
      destinationDir,
      selectedAgents: [],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    // Metadata sidecars should live at .gemini/skills/board/agents/
    const agentsDir = path.join(destinationDir, ".gemini", "skills", "board", "agents");
    expect(await fs.pathExists(path.join(agentsDir, "skill.yaml"))).toBe(true);
    expect(await fs.pathExists(path.join(agentsDir, "gemini.json"))).toBe(true);
  });

  it("should correctly install multiple skills with nested structure", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "google-antugravity",
      projectDir,
      destinationDir,
      selectedAgents: [],
      selectedSkills: ["board", "a11y_baseline"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    for (const skill of ["board", "a11y_baseline"]) {
      const skillDir = path.join(destinationDir, ".gemini", "skills", skill);

      expect(await fs.pathExists(path.join(skillDir, "SKILL.md"))).toBe(true);
      expect(await fs.pathExists(path.join(skillDir, `${skill}.py`))).toBe(true);
      expect(await fs.pathExists(path.join(skillDir, "agents", "skill.yaml"))).toBe(true);
      expect(await fs.pathExists(path.join(skillDir, "agents", "gemini.json"))).toBe(true);
    }
  });

  it("should produce .py stub that references SKILL.md", async () => {
    const projectDir = await createFixtureProject();
    const destinationDir = path.join(projectDir, "out");

    await runInstall({
      target: "google-antugravity",
      projectDir,
      destinationDir,
      selectedAgents: [],
      selectedSkills: ["board"],
      dryRun: false,
      overwriteMode: "overwrite",
      strictHints: false,
    });

    const pyContent = await fs.readFile(
      path.join(destinationDir, ".gemini", "skills", "board", "board.py"),
      "utf8",
    );
    expect(pyContent).toContain("See SKILL.md for behavior details");
    expect(pyContent).not.toContain("See board.md for behavior details");
  });
});
