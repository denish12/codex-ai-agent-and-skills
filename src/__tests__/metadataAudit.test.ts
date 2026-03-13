import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadSourceCatalog } from "../catalog.js";
import { auditMetadataLayer } from "../metadataAudit.js";

const root = path.resolve(__dirname, "..", "..");

describe("metadata audit", () => {
  it("keeps skill names aligned with folder names for gpt-codex", async () => {
    const catalog = await loadSourceCatalog(root);
    const result = await auditMetadataLayer(root, catalog, "gpt-codex");

    expect(result.errors).toEqual([]);
  });
});
