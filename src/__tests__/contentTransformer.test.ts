import { describe, expect, it } from "vitest";
import { transformContentForTarget } from "../contentTransformer.js";

describe("contentTransformer", () => {
  it("should map codex reasoning to claude thinking", () => {
    const input = "<!-- codex: reasoning=extra_high; note=\"deep architecture analysis\" -->\n# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(output.includes("<!-- codex:")).toBe(false);
    expect(output.includes("<!-- claude: thinking=max; note=\"deep architecture analysis\" -->")).toBe(true);
  });

  it("should keep native target hint when present", () => {
    const input = "<!-- claude: thinking=high -->\n<!-- codex: reasoning=low -->\n# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(output.includes("<!-- claude: thinking=high -->")).toBe(true);
    expect(output.includes("thinking=low")).toBe(false);
  });

  it("should map codex reasoning to qwen effort", () => {
    const input = "<!-- codex: reasoning=high -->\n# Agent\n";
    const output = transformContentForTarget(input, "qwen-3.5", "agent");

    expect(output.includes("<!-- qwen: reasoning_effort=high -->")).toBe(true);
  });

  it("should add default target hint when source has no model hint", () => {
    const input = "# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(output.includes("<!-- claude: thinking=medium; note=\"auto-adapted default\" -->")).toBe(true);
  });

  it("should map codex hint to copilot hint for vscode-copilot target", () => {
    const input = "<!-- codex: reasoning=high; note=\"review carefully\" -->\n# Agent\n";
    const output = transformContentForTarget(input, "vscode-copilot", "agent");

    expect(output.includes("<!-- copilot: reasoning=high; note=\"review carefully\" -->")).toBe(true);
    expect(output.includes("<!-- codex:")).toBe(false);
  });

  // Edge cases (DEV-01.11)

  it("should handle empty input without crashing", () => {
    const output = transformContentForTarget("", "claude", "agent");

    expect(typeof output).toBe("string");
    expect(output.length).toBeGreaterThan(0); // should at least add default hint
  });

  it("should handle malformed hint comment without crashing", () => {
    const input = "<!-- codex: malformed -->\n# Agent\n";
    const output = transformContentForTarget(input, "claude", "agent");

    expect(typeof output).toBe("string");
    // Should not throw, should produce some output
    expect(output.includes("# Agent")).toBe(true);
  });

  it("should apply default behavior for unknown target fields", () => {
    const input = "<!-- codex: reasoning=medium -->\n# Agent\n";
    // google-antugravity is a valid target with its own mapping
    const output = transformContentForTarget(input, "google-antugravity", "agent");

    expect(typeof output).toBe("string");
    expect(output.includes("# Agent")).toBe(true);
  });
});
