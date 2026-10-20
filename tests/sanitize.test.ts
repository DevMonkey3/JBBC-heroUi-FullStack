import { describe, expect, it } from "vitest";
import { sanitizeContent } from "@/server/sanitize";

describe("sanitizeContent", () => {
  it("keeps an empty figcaption so the editor's figure node round-trips", () => {
    const html = '<figure><img src="https://x.test/a.webp" alt="a"><figcaption></figcaption></figure>';
    expect(sanitizeContent(html)).toContain("<figcaption></figcaption>");
  });

  it("keeps a figure that already lacks a figcaption", () => {
    const html = '<figure><img src="https://x.test/a.webp" alt="a"></figure>';
    expect(sanitizeContent(html)).toBe('<figure><img src="https://x.test/a.webp" alt="a" /></figure>');
  });

  it("still drops empty paragraphs", () => {
    expect(sanitizeContent("<p></p><p> </p><p>x</p>")).toBe("<p>x</p>");
  });

  it("strips scripts and inline handlers", () => {
    expect(sanitizeContent('<p onclick="x()">hi</p><script>alert(1)</script>')).toBe("<p>hi</p>");
  });
});
