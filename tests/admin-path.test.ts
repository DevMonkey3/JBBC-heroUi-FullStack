import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { ADMIN_PATH, adminUrl } from "@/config/admin";

const root = path.resolve(__dirname, "..");

describe("admin path", () => {
  it("is long and does not contain the word admin", () => {
    expect(ADMIN_PATH.length).toBeGreaterThanOrEqual(12);
    expect(ADMIN_PATH.toLowerCase()).not.toContain("admin");
  });

  it("matches the route folder", () => {
    expect(existsSync(path.join(root, "src/app/(admin)", ADMIN_PATH.slice(1)))).toBe(true);
  });

  it("matches the proxy matcher literal", () => {
    const proxy = readFileSync(path.join(root, "src/proxy.ts"), "utf8");
    expect(proxy).toContain(`"${ADMIN_PATH}/:path*"`);
  });

  it("is not disclosed in robots.txt", () => {
    const robots = readFileSync(path.join(root, "src/app/robots.ts"), "utf8");
    expect(robots).not.toContain(ADMIN_PATH);
  });

  it("builds urls", () => {
    expect(adminUrl()).toBe(ADMIN_PATH);
    expect(adminUrl("blog")).toBe(`${ADMIN_PATH}/blog`);
    expect(adminUrl("/blog/1")).toBe(`${ADMIN_PATH}/blog/1`);
  });
});
