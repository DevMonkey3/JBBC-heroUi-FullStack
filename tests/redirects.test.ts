import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

/**
 * next.config redirects match case-insensitively, so a source that equals its
 * destination ignoring case redirects to itself forever. Such entries must go
 * in proxy.ts instead (see "/Why").
 */
describe("legacy redirects", () => {
  it("never redirect a path to itself ignoring case", async () => {
    const redirects = await nextConfig.redirects!();
    for (const r of redirects) {
      expect(r.source.toLowerCase(), `${r.source} → ${r.destination}`).not.toBe(
        r.destination.toLowerCase(),
      );
    }
  });

  it("are all permanent", async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects.every((r) => r.permanent)).toBe(true);
  });
});
