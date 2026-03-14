import { describe, expect, it } from "vitest";
import { getPlatformAdapter } from "../platforms/adapters.js";
import type { TargetId } from "../types.js";

/** All supported target identifiers for parameterized testing. */
const ALL_TARGETS: TargetId[] = [
  "vscode-copilot",
  "claude",
  "qwen-3.5",
  "google-antugravity",
  "gpt-codex",
];

describe("getPlatformAdapter", () => {
  it.each(ALL_TARGETS)(
    "should return the same cached instance for target '%s'",
    (target) => {
      // Arrange & Act
      const first = getPlatformAdapter(target);
      const second = getPlatformAdapter(target);

      // Assert — referential equality proves cache hit
      expect(first).toBe(second);
      expect(first.id).toBe(target);
    },
  );

  it("should throw for unsupported target", () => {
    // Act & Assert
    expect(() => getPlatformAdapter("nonexistent" as any)).toThrow(
      "Unsupported target",
    );
  });
});
