import path from "node:path";
import fs from "fs-extra";
import { describe, expect, it } from "vitest";
import { listDomains, resolveDomainSourceRoot } from "../domainResolver.js";
import type { TemplateLanguage } from "../types.js";

const projectRoot = path.resolve(__dirname, "..", "..");

const SKILL_REF_PATTERN = /\$([a-z][a-z0-9-]*)/g;
const LANGUAGES: TemplateLanguage[] = ["ru", "en"];

async function listAgentFiles(sourceRoot: string): Promise<string[]> {
  const agentsDir = path.join(sourceRoot, "agents");
  if (!(await fs.pathExists(agentsDir))) {
    return [];
  }
  const entries = await fs.readdir(agentsDir);
  return entries.filter((e) => e.endsWith(".md")).map((e) => path.join(agentsDir, e));
}

async function extractSkillRefs(filePath: string): Promise<Set<string>> {
  const content = await fs.readFile(filePath, "utf8");
  const refs = new Set<string>();
  for (const match of content.matchAll(SKILL_REF_PATTERN)) {
    refs.add(match[1]);
  }
  return refs;
}

describe("agent skill reference resolution", () => {
  it("every $skill-name referenced by an agent must resolve to a SKILL.md inside its domain (ru + en)", async () => {
    const domains = await listDomains(projectRoot);
    expect(domains.length, "domains/ must contain at least one domain").toBeGreaterThan(0);

    const failures: string[] = [];

    for (const domain of domains) {
      for (const language of LANGUAGES) {
        const sourceRoot = await resolveDomainSourceRoot({
          packageRoot: projectRoot,
          domainId: domain.id,
          language,
        });
        const skillsDir = path.join(sourceRoot, ".agents", "skills");
        const agentFiles = await listAgentFiles(sourceRoot);

        for (const agentFile of agentFiles) {
          const refs = await extractSkillRefs(agentFile);
          for (const skillName of refs) {
            const skillFile = path.join(skillsDir, skillName, "SKILL.md");
            if (!(await fs.pathExists(skillFile))) {
              const relAgent = path.relative(projectRoot, agentFile);
              failures.push(`[${domain.id}/${language}] ${relAgent} references $${skillName} but ${skillName}/SKILL.md is missing`);
            }
          }
        }
      }
    }

    expect(failures, `\n${failures.join("\n")}`).toEqual([]);
  });
});
