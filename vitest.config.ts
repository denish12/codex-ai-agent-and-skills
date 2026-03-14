import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/__tests__/**/*.test.ts"],
    testTimeout: 10_000,
    reporters: process.env.CI ? ["verbose", "junit"] : ["verbose"],
    ...(process.env.CI && {
      outputFile: { junit: "test-results.xml" },
    }),
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/__tests__/**", "src/banner.ts"],
      thresholds: {
        statements: 70,
        branches: 60,
      },
    },
  },
});
