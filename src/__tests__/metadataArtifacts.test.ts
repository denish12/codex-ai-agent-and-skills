import path from "node:path";
import fs from "fs-extra";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "..", "..");

describe("generated metadata artifacts", () => {
  it("keeps Russian skill metadata human-facing fields localized", async () => {
    const skillYaml = await fs.readFile(path.join(root, ".agents", "skills", "a11y-baseline", "agents", "skill.yaml"), "utf8");
    const openaiYaml = await fs.readFile(
      path.join(root, ".agents", "skills", "api-contract-compliance-review", "agents", "openai.yaml"),
      "utf8",
    );

    expect(skillYaml).toContain('display_name: "\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u044c UI"');
    expect(skillYaml).toContain('default_prompt: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 $a11y-baseline, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0441\u044f \u043a \u043d\u0430\u0432\u044b\u043a\u0443');
    expect(openaiYaml).toContain('display_name: "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044f API-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u0430\u043c"');
  });

  it("keeps English metadata localized to English", async () => {
    const skillYaml = await fs.readFile(path.join(root, "locales", "en", ".agents", "skills", "a11y-baseline", "agents", "skill.yaml"), "utf8");

    expect(skillYaml).toContain('display_name: "Minimum baseline accessibility for web UI"');
    expect(skillYaml).toContain('default_prompt: "Use $a11y-baseline when the task matches the \\"Minimum baseline accessibility for web UI\\" skill."');
  });

  it("keeps orchestrator metadata localized in each locale", async () => {
    const ruYaml = await fs.readFile(path.join(root, "AGENTS.yaml"), "utf8");
    const enYaml = await fs.readFile(path.join(root, "locales", "en", "AGENTS.yaml"), "utf8");

    expect(ruYaml).toContain('default_prompt: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 AGENTS.md, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438');
    expect(enYaml).toContain('default_prompt: "Use AGENTS.md when the task needs repository-level orchestration across roles, skills, and delivery gates."');
  });
});
