import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { resolveSourceRoot } from "../sourceResolver.js";

describe("sourceResolver", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-resolver-"));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  /**
   * Creates a minimal valid source root structure in the given directory.
   * @param dir Target directory to populate.
   */
  async function createValidSourceRoot(dir: string): Promise<void> {
    await fs.writeFile(path.join(dir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(dir, "agents"));
    await fs.writeFile(path.join(dir, "agents", "test.md"), "# Test\n");
    await fs.ensureDir(path.join(dir, ".agents", "skills", "test_skill"));
    await fs.writeFile(
      path.join(dir, ".agents", "skills", "test_skill", "SKILL.md"),
      "---\nname: test_skill\ndescription: Test\n---\n# Test\n",
    );
  }

  it("should resolve from explicit valid path", async () => {
    await createValidSourceRoot(tmpDir);

    const result = await resolveSourceRoot({
      projectDirOption: tmpDir,
      cwd: os.tmpdir(),
      packageRoot: os.tmpdir(),
      language: "ru",
    });

    expect(result).toBe(path.resolve(tmpDir));
  });

  it("should throw descriptive error for invalid explicit path", async () => {
    const invalidDir = path.join(tmpDir, "nonexistent");
    await fs.ensureDir(invalidDir);

    await expect(
      resolveSourceRoot({
        projectDirOption: invalidDir,
        cwd: os.tmpdir(),
        packageRoot: os.tmpdir(),
        language: "ru",
      }),
    ).rejects.toThrow("Invalid --project-dir");
  });

  it("should resolve from cwd when no explicit path and cwd is valid", async () => {
    await createValidSourceRoot(tmpDir);

    const result = await resolveSourceRoot({
      cwd: tmpDir,
      packageRoot: os.tmpdir(), // invalid package root, so falls back to cwd
      language: "ru",
    });

    expect(result).toBe(path.resolve(tmpDir));
  });

  it("should prefer bundled path for language 'en'", async () => {
    // Arrange: create valid source root inside a simulated bundled locales/en dir
    const bundledRoot = path.join(tmpDir, "bundled");
    const bundledEnDir = path.join(bundledRoot, "locales", "en");
    await fs.ensureDir(bundledEnDir);
    await createValidSourceRoot(bundledEnDir);

    // Also put valid source root in cwd so both paths are valid
    const cwdDir = path.join(tmpDir, "cwdproject");
    await fs.ensureDir(cwdDir);
    await createValidSourceRoot(cwdDir);

    // Act: language='en' should prefer bundled path first
    const result = await resolveSourceRoot({
      cwd: cwdDir,
      packageRoot: bundledRoot,
      language: "en",
    });

    // Assert: bundled path should be resolved, not cwd
    expect(result).toBe(path.resolve(bundledEnDir));
  });

  it("should throw when neither cwd nor bundled path is valid", async () => {
    const emptyDir1 = path.join(tmpDir, "empty1");
    const emptyDir2 = path.join(tmpDir, "empty2");
    await fs.ensureDir(emptyDir1);
    await fs.ensureDir(emptyDir2);

    await expect(
      resolveSourceRoot({
        cwd: emptyDir1,
        packageRoot: emptyDir2,
        language: "ru",
      }),
    ).rejects.toThrow("Could not find source templates");
  });
});
