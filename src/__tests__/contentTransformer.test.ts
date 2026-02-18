import { describe, expect, it } from "vitest";
import { transformContentForTarget } from "../contentTransformer.js";

describe("contentTransformer", () => {
  it("maps codex reasoning to claude thinking", () => {
    const input = "<!-- codex: reasoning=extra_high; note=\"deep architecture analysis\" -->\n# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(output.includes("<!-- codex:")).toBe(false);
    expect(output.includes("<!-- claude: thinking=max; note=\"deep architecture analysis\" -->")).toBe(true);
  });

  it("keeps native target hint when present", () => {
    const input = "<!-- claude: thinking=high -->\n<!-- codex: reasoning=low -->\n# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(output.includes("<!-- claude: thinking=high -->")).toBe(true);
    expect(output.includes("thinking=low")).toBe(false);
  });

  it("maps codex reasoning to qwen effort", () => {
    const input = "<!-- codex: reasoning=high -->\n# Agent\n";
    const output = transformContentForTarget(input, "qwen-3.5", "agent");

    expect(output.includes("<!-- qwen: reasoning_effort=high -->")).toBe(true);
  });

  it("adds default target hint when source has no model hint", () => {
    const input = "# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(output.includes("<!-- claude: thinking=medium; note=\"auto-adapted default\" -->")).toBe(true);
  });

  it("maps codex hint to copilot hint for vscode-copilot target", () => {
    const input = "<!-- codex: reasoning=high; note=\"review carefully\" -->\n# Agent\n";
    const output = transformContentForTarget(input, "vscode-copilot", "agent");

    expect(output.includes("<!-- copilot: reasoning=high; note=\"review carefully\" -->")).toBe(true);
    expect(output.includes("<!-- codex:")).toBe(false);
  });
});
