import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { loadSourceCatalog, listAgentNames, listSkillNames, resolveSelection } from "../catalog.js";

describe("catalog", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-catalog-"));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  it("should load catalog with agents and skills from valid structure", async () => {
    // Arrange: create valid project structure
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "conductor.md"), "# Conductor\n");
    await fs.writeFile(path.join(tmpDir, "agents", "developer.md"), "# Developer\n");
    await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "tdd_workflow"));
    await fs.writeFile(
      path.join(tmpDir, ".agents", "skills", "tdd_workflow", "SKILL.md"),
      "---\nname: tdd_workflow\ndescription: TDD skill\n---\n# TDD\n",
    );

    // Act
    const catalog = await loadSourceCatalog(tmpDir);
    const agents = listAgentNames(catalog);
    const skills = listSkillNames(catalog);

    // Assert
    expect(agents).toContain("conductor");
    expect(agents).toContain("developer");
    expect(skills).toContain("tdd_workflow");
    expect(catalog.orchestratorPath).toBe(path.join(tmpDir, "AGENTS.md"));
  });

  it("should throw when AGENTS.md is missing", async () => {
    // Arrange: structure without AGENTS.md
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "test.md"), "# Test\n");
    await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "test_skill"));
    await fs.writeFile(
      path.join(tmpDir, ".agents", "skills", "test_skill", "SKILL.md"),
      "---\nname: test_skill\ndescription: Test\n---\n# Test\n",
    );

    // Act + Assert
    await expect(loadSourceCatalog(tmpDir)).rejects.toThrow("Missing AGENTS.md");
  });

  it("should throw when agents directory is missing", async () => {
    // Arrange: structure without agents/
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "test_skill"));
    await fs.writeFile(
      path.join(tmpDir, ".agents", "skills", "test_skill", "SKILL.md"),
      "---\nname: test_skill\ndescription: Test\n---\n# Test\n",
    );

    // Act + Assert
    await expect(loadSourceCatalog(tmpDir)).rejects.toThrow("Missing agents directory");
  });

  it("should throw when .agents directory is missing", async () => {
    // Arrange: structure without .agents/
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "test.md"), "# Test\n");

    // Act + Assert
    await expect(loadSourceCatalog(tmpDir)).rejects.toThrow("Missing .agents directory");
  });

  it("should throw when skills directory is missing and no legacy skills exist", async () => {
    // Arrange: structure with no skills at all
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "test.md"), "# Test\n");
    await fs.ensureDir(path.join(tmpDir, ".agents"));

    // Act + Assert
    await expect(loadSourceCatalog(tmpDir)).rejects.toThrow("Missing skills directory");
  });

  it("should load catalog when SKILL.md has no frontmatter", async () => {
    // Arrange: SKILL.md without --- frontmatter delimiters
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "test.md"), "# Test\n");
    await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "no_frontmatter"));
    await fs.writeFile(
      path.join(tmpDir, ".agents", "skills", "no_frontmatter", "SKILL.md"),
      "# Skill without frontmatter\nThis skill has no YAML frontmatter.\n",
    );

    // Act: should load without crashing
    const catalog = await loadSourceCatalog(tmpDir);
    const skills = listSkillNames(catalog);

    // Assert
    expect(skills).toContain("no_frontmatter");
  });

  it("should ignore non-.md files in agents directory", async () => {
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "valid.md"), "# Valid\n");
    await fs.writeFile(path.join(tmpDir, "agents", "readme.txt"), "Not an agent\n");
    await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "test_skill"));
    await fs.writeFile(
      path.join(tmpDir, ".agents", "skills", "test_skill", "SKILL.md"),
      "---\nname: test_skill\ndescription: Test\n---\n# Test\n",
    );

    const catalog = await loadSourceCatalog(tmpDir);
    const agents = listAgentNames(catalog);

    expect(agents).toEqual(["valid"]);
    expect(agents).not.toContain("readme");
  });

  it("should return empty workflows when workflows directory is missing", async () => {
    // Arrange: valid project without .agents/workflows/
    await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(tmpDir, "agents"));
    await fs.writeFile(path.join(tmpDir, "agents", "test.md"), "# Test\n");
    await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "test_skill"));
    await fs.writeFile(
      path.join(tmpDir, ".agents", "skills", "test_skill", "SKILL.md"),
      "---\nname: test_skill\ndescription: Test\n---\n# Test\n",
    );

    // Act
    const catalog = await loadSourceCatalog(tmpDir);

    // Assert
    expect(catalog.workflowFiles).toEqual({});
  });

  describe("resolveSelection", () => {
    it("should return all items when 'all' is specified", () => {
      const result = resolveSelection("all", ["a", "b", "c"], "items");
      expect(result).toEqual(["a", "b", "c"]);
    });

    it("should throw for unknown items", () => {
      expect(() => resolveSelection("unknown_item", ["a", "b"], "items")).toThrow("Unknown items");
    });

    it("should split comma-separated values and trim whitespace", () => {
      // Arrange
      const available = ["alpha", "beta", "gamma"];

      // Act
      const result = resolveSelection("alpha , gamma", available, "items");

      // Assert
      expect(result).toEqual(["alpha", "gamma"]);
    });
  });
});
