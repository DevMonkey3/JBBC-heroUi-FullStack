import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World Post")).toBe("hello-world-post");
  });

  it("keeps Japanese characters", () => {
    expect(slugify("特定技能 セミナー 2026")).toBe("特定技能-セミナー-2026");
  });

  it("strips punctuation and collapses hyphens", () => {
    expect(slugify("  a -- b!! c  ")).toBe("a-b-c");
  });
});
