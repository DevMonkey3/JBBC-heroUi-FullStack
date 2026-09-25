import Image, { type ImageProps } from "next/image";
import { cdn } from "@/config/cdn";

type Props = Omit<ImageProps, "src" | "loader"> & {
  /** CDN path such as "home/hero.avif" */
  path: string;
};

/**
 * Photo served from the DigitalOcean CDN through Next's image optimizer.
 * The originals are 5000 to 7000 pixels wide, so the optimizer resizes each
 * one to the width it is actually displayed at and caches the result.
 * Always pass an accurate `sizes` with `fill`, or explicit width/height.
 */
export function CdnImage({ path, alt, ...rest }: Props) {
  return <Image src={cdn(path)} alt={alt} {...rest} />;
}
