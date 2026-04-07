import path from "node:path";
import { describe, expect, it } from "vitest";
import { listDomains, resolveDomainSourceRoot } from "../domainResolver.js";
import { loadSourceCatalog, listAgentNames, listSkillNames } from "../catalog.js";

const packageRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1"), "../..");

describe("domain integration (real filesystem)", () => {
  it("discovers both bundled domains", async () => {
    const domains = await listDomains(packageRoot);
    expect(domains.length).toBe(2);

    const ids = domains.map((d) => d.id);
    expect(ids).toContain("development");
    expect(ids).toContain("content");
  });

  it("loads development domain catalog with expected counts", async () => {
    const root = await resolveDomainSourceRoot({
      packageRoot,
      domainId: "development",
      language: "ru",
    });
    const catalog = await loadSourceCatalog(root);
    const agents = listAgentNames(catalog);
    const skills = listSkillNames(catalog);

    expect(agents.length).toBe(8);
    expect(skills.length).toBe(71);
  });

  it("loads content domain catalog with expected counts", async () => {
    const root = await resolveDomainSourceRoot({
      packageRoot,
      domainId: "content",
      language: "ru",
    });
    const catalog = await loadSourceCatalog(root);
    const agents = listAgentNames(catalog);
    const skills = listSkillNames(catalog);

    expect(agents.length).toBe(6);
    expect(skills.length).toBeGreaterThanOrEqual(25);
  });

  it("domain descriptors have correct agent and skill counts", async () => {
    const domains = await listDomains(packageRoot);
    const dev = domains.find((d) => d.id === "development");
    const content = domains.find((d) => d.id === "content");

    expect(dev).toBeDefined();
    expect(dev!.agentCount).toBe(8);
    expect(dev!.skillCount).toBe(71);

    expect(content).toBeDefined();
    expect(content!.agentCount).toBe(6);
    expect(content!.skillCount).toBeGreaterThanOrEqual(25);
  });
});
