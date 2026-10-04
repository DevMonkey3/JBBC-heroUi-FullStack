import { describe, expect, it } from "vitest";
import {
  CDN_BASE_URL,
  VARIANT_WIDTHS,
  cdnPathFromUrl,
  variantKey,
  variantUrl,
  variantWidth,
} from "@/config/cdn";

describe("image variants", () => {
  it("picks the smallest generated width that covers the request", () => {
    expect(variantWidth(1)).toBe(160);
    expect(variantWidth(160)).toBe(160);
    expect(variantWidth(161)).toBe(320);
    expect(variantWidth(700)).toBe(828);
    expect(variantWidth(5000)).toBe(VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1]);
  });

  it("builds keys without the original extension", () => {
    expect(variantKey("home/Slider (6).avif", 640)).toBe("_opt/home/Slider (6)/640.webp");
    expect(variantKey("/uploads/123-photo.webp", 160)).toBe("_opt/uploads/123-photo/160.webp");
  });

  it("builds encoded CDN urls", () => {
    expect(variantUrl("home/Slider (6).avif", 700)).toBe(
      `${CDN_BASE_URL}/_opt/home/Slider%20(6)/828.webp`,
    );
  });

  it("recognises our CDN and nothing else", () => {
    expect(cdnPathFromUrl(`${CDN_BASE_URL}/home/Slider%20(6).avif`)).toBe("home/Slider (6).avif");
    expect(cdnPathFromUrl("https://jbbra.com/wp-content/x.jpg")).toBeNull();
    expect(cdnPathFromUrl("not a url")).toBeNull();
  });
});
