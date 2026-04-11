import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { listDomains, resolveDomainSourceRoot, normalizeDomain } from "../domainResolver.js";

describe("domainResolver", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-domain-"));
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  /**
   * Creates a valid domain directory with domain.json and minimal assets.
   * @param packageRoot Package root path.
   * @param domainId Domain identifier.
   * @param meta Domain metadata overrides.
   */
  async function createDomain(
    packageRoot: string,
    domainId: string,
    meta?: { name?: string; description?: string },
  ): Promise<void> {
    const domainDir = path.join(packageRoot, "domains", domainId);
    await fs.outputJson(
      path.join(domainDir, "domain.json"),
      {
        id: domainId,
        name: meta?.name ?? `${domainId} domain`,
        description: meta?.description ?? `Description for ${domainId}`,
      },
      { spaces: 2 },
    );
    await fs.outputFile(path.join(domainDir, "AGENTS.md"), "# Agents\n");
    await fs.ensureDir(path.join(domainDir, "agents"));
    await fs.outputFile(path.join(domainDir, "agents", "conductor.md"), "# Conductor\n");
    await fs.ensureDir(path.join(domainDir, ".agents", "skills", "test_skill"));
    await fs.outputFile(
      path.join(domainDir, ".agents", "skills", "test_skill", "SKILL.md"),
      "---\nname: test_skill\ndescription: Test\n---\n# Test\n",
    );
    await fs.ensureDir(path.join(domainDir, ".agents", "workflows"));
  }

  describe("listDomains", () => {
    it("returns empty array when domains/ directory does not exist", async () => {
      const result = await listDomains(tmpDir);
      expect(result).toEqual([]);
    });

    it("returns empty array when domains/ exists but has no valid subdirectories", async () => {
      await fs.ensureDir(path.join(tmpDir, "domains"));
      const result = await listDomains(tmpDir);
      expect(result).toEqual([]);
    });

    it("discovers single domain with correct counts", async () => {
      await createDomain(tmpDir, "development", {
        name: "Software Development",
        description: "Full-stack development agents",
      });

      const result = await listDomains(tmpDir);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("development");
      expect(result[0].name).toBe("Software Development");
      expect(result[0].description).toBe("Full-stack development agents");
      expect(result[0].agentCount).toBe(1);
      expect(result[0].skillCount).toBe(1);
      expect(result[0].rootDir).toBe(path.join(tmpDir, "domains", "development"));
    });

    it("discovers two domains sorted by id", async () => {
      await createDomain(tmpDir, "development");
      await createDomain(tmpDir, "content");

      const result = await listDomains(tmpDir);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("content");
      expect(result[1].id).toBe("development");
    });

    it("ignores directories without domain.json", async () => {
      await createDomain(tmpDir, "development");
      await fs.ensureDir(path.join(tmpDir, "domains", "unknown"));

      const result = await listDomains(tmpDir);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("development");
    });

    it("ignores directories with invalid domain.json id", async () => {
      await createDomain(tmpDir, "development");
      const badDir = path.join(tmpDir, "domains", "badone");
      await fs.ensureDir(badDir);
      await fs.outputJson(path.join(badDir, "domain.json"), {
        id: "badone",
        name: "Bad",
        description: "Bad domain",
      });

      const result = await listDomains(tmpDir);
      expect(result).toHaveLength(1);
    });
  });

  describe("resolveDomainSourceRoot", () => {
    it("resolves ru language to domain root", async () => {
      await createDomain(tmpDir, "content");

      const result = await resolveDomainSourceRoot({
        packageRoot: tmpDir,
        domainId: "content",
        language: "ru",
      });

      expect(result).toBe(path.join(tmpDir, "domains", "content"));
    });

    it("resolves en language to locales/en/ subdirectory", async () => {
      await createDomain(tmpDir, "content");
      const enDir = path.join(tmpDir, "domains", "content", "locales", "en");
      await fs.ensureDir(enDir);
      await fs.outputFile(path.join(enDir, "AGENTS.md"), "# Agents EN\n");

      const result = await resolveDomainSourceRoot({
        packageRoot: tmpDir,
        domainId: "content",
        language: "en",
      });

      expect(result).toBe(enDir);
    });

    it("throws when domain directory does not exist", async () => {
      await expect(
        resolveDomainSourceRoot({
          packageRoot: tmpDir,
          domainId: "content",
          language: "ru",
        }),
      ).rejects.toThrow();
    });
  });

  describe("normalizeDomain", () => {
    it("accepts valid domain id 'development'", () => {
      expect(normalizeDomain("development")).toBe("development");
    });

    it("accepts valid domain id 'content'", () => {
      expect(normalizeDomain("content")).toBe("content");
    });

    it("accepts valid domain id 'analytics'", () => {
      expect(normalizeDomain("analytics")).toBe("analytics");
    });

    it("trims whitespace", () => {
      expect(normalizeDomain("  content  ")).toBe("content");
    });

    it("is case-insensitive", () => {
      expect(normalizeDomain("Content")).toBe("content");
      expect(normalizeDomain("DEVELOPMENT")).toBe("development");
    });

    it("throws for unknown domain", () => {
      expect(() => normalizeDomain("unknown")).toThrow("Unknown domain");
      expect(() => normalizeDomain("unknown")).toThrow("development, content, analytics");
    });

    it("throws for empty string", () => {
      expect(() => normalizeDomain("")).toThrow("Unknown domain");
    });
  });
});
