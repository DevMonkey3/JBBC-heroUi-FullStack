"use client";

import Image, { type ImageProps } from "next/image";
import { cdn, variantUrl } from "@/config/cdn";

type Props = Omit<ImageProps, "src" | "loader"> & {
  /** CDN path such as "home/hero.avif" */
  path: string;
};

/**
 * Photo from the DigitalOcean CDN, served from the pre-resized WebP variants
 * (see `npm run images:build`). Nothing is resized on the server: next/image
 * only picks the right width for the viewport and lazy-loads.
 * Always pass an accurate `sizes` with `fill`, or explicit width/height.
 *
 * Client component because the loader is a function and next/image itself
 * runs on the client.
 */
export function CdnImage({ path, alt, ...rest }: Props) {
  return (
    <Image src={cdn(path)} alt={alt} loader={({ width }) => variantUrl(path, width)} {...rest} />
  );
}
