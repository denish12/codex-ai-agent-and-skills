import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { auditMetadataLayer } from "../metadataAudit.js";
import { loadSourceCatalog } from "../catalog.js";
import { listDomains, resolveDomainSourceRoot } from "../domainResolver.js";
import type { SourceCatalog, TargetId } from "../types.js";

const projectRoot = path.resolve(__dirname, "..", "..");

const ALL_TARGETS: TargetId[] = [
  "claude",
  "gpt-codex",
  "qwen-3.5",
  "vscode-copilot",
  "google-antugravity",
  "moonshot-kimi",
];

describe("metadata audit", () => {
  it("should keep skill names aligned with folder names for gpt-codex", async () => {
    const catalog = await loadSourceCatalog(projectRoot);
    const result = await auditMetadataLayer(projectRoot, catalog, "gpt-codex");

    expect(result.errors).toEqual([]);
  });

  // Regression guard for v2.0.2: the legacy single-root test above only covers
  // the development domain (mirrored at repo root). When v2.0.0 introduced the
  // domains/ layout, the content domain became invisible to tests, and 30
  // skills shipped in v2.0.1 with description mismatches between SKILL.md
  // frontmatter and skill.yaml/vendor sidecars. This test audits every domain
  // discovered under domains/ against every supported target.
  it("should pass audit for every domain × every target (ru locale)", async () => {
    const domains = await listDomains(projectRoot);
    expect(domains.length, "domains/ must contain at least one domain").toBeGreaterThan(0);

    const failures: string[] = [];
    for (const domain of domains) {
      const sourceRoot = await resolveDomainSourceRoot({
        packageRoot: projectRoot,
        domainId: domain.id,
        language: "ru",
      });
      const catalog = await loadSourceCatalog(sourceRoot);
      for (const target of ALL_TARGETS) {
        const result = await auditMetadataLayer(sourceRoot, catalog, target);
        if (result.errors.length > 0) {
          failures.push(`[${domain.id} / ${target}]\n  ${result.errors.join("\n  ")}`);
        }
      }
    }

    expect(failures, `\n${failures.join("\n\n")}`).toEqual([]);
  });

  describe("YAML parsing via yaml package", () => {
    let tmpDir: string;
    let catalog: SourceCatalog;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "code-ai-audit-"));
      // Create minimal project structure for catalog
      await fs.writeFile(path.join(tmpDir, "AGENTS.md"), "# Agents\n");
      await fs.ensureDir(path.join(tmpDir, "agents"));
      await fs.writeFile(path.join(tmpDir, "agents", "test_agent.md"), "# Test Agent\n");
      await fs.ensureDir(path.join(tmpDir, ".agents", "skills", "test_skill"));
      await fs.writeFile(
        path.join(tmpDir, ".agents", "skills", "test_skill", "SKILL.md"),
        "---\nname: test_skill\ndescription: A test skill\n---\n# Test Skill\n",
      );
      catalog = await loadSourceCatalog(tmpDir);
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    it("should parse YAML with multi-line string values", async () => {
      // Create a vendor sidecar (claude.json) with valid fields so audit proceeds to portable check
      const vendorDir = path.join(tmpDir, ".agents", "skills", "test_skill", "agents");
      await fs.ensureDir(vendorDir);
      await fs.writeJson(path.join(vendorDir, "claude.json"), {
        name: "test_skill",
        display_name: "Test Skill",
        description: "A test skill",
        default_prompt: "test it",
      });
      // Create a portable sidecar (skill.yaml) with multi-line description
      await fs.writeFile(
        path.join(vendorDir, "skill.yaml"),
        [
          "name: test_skill",
          "display_name: Test Skill",
          "description: |-",
          "  A test skill that spans",
          "  multiple lines of description",
          "default_prompt: test it",
        ].join("\n"),
      );

      const result = await auditMetadataLayer(tmpDir, catalog, "claude");

      // The multi-line value should parse correctly without errors about description
      const descriptionErrors = result.errors.filter((e) => e.includes("Missing") && e.includes("description"));
      expect(descriptionErrors).toEqual([]);
    });

    it("should report graceful error for invalid YAML without crashing", async () => {
      const vendorDir = path.join(tmpDir, ".agents", "skills", "test_skill", "agents");
      await fs.ensureDir(vendorDir);
      // Valid vendor sidecar so audit proceeds to check portable
      await fs.writeJson(path.join(vendorDir, "claude.json"), {
        name: "test_skill",
        display_name: "Test Skill",
        description: "A test skill",
        default_prompt: "test",
      });
      // Invalid YAML in portable sidecar
      await fs.writeFile(path.join(vendorDir, "skill.yaml"), "name: test_skill\n  invalid: yaml: syntax: [\n");

      const result = await auditMetadataLayer(tmpDir, catalog, "claude");

      // Should report error, not crash
      const yamlErrors = result.errors.filter((e) => e.includes("Invalid YAML"));
      expect(yamlErrors.length).toBeGreaterThan(0);
    });

    it("should report errors for missing required fields in vendor sidecar", async () => {
      const vendorDir = path.join(tmpDir, ".agents", "skills", "test_skill", "agents");
      await fs.ensureDir(vendorDir);
      // Vendor sidecar with missing required fields (only name)
      await fs.writeJson(path.join(vendorDir, "claude.json"), {
        name: "test_skill",
      });

      const result = await auditMetadataLayer(tmpDir, catalog, "claude");

      const missingErrors = result.errors.filter((e) => e.includes("Missing"));
      expect(missingErrors.length).toBeGreaterThan(0);
    });

    it("should report error when frontmatter name does not match skill folder name", async () => {
      // Rewrite SKILL.md with a mismatched name
      await fs.writeFile(
        path.join(tmpDir, ".agents", "skills", "test_skill", "SKILL.md"),
        "---\nname: wrong_name\ndescription: A test skill\n---\n# Test Skill\n",
      );
      // Reload catalog with new content
      catalog = await loadSourceCatalog(tmpDir);

      const result = await auditMetadataLayer(tmpDir, catalog, "claude");

      const nameErrors = result.errors.filter((e) => e.includes("name mismatch"));
      expect(nameErrors.length).toBeGreaterThan(0);
    });
  });
});
