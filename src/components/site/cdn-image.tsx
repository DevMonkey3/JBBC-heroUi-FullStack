import Image, { type ImageProps } from "next/image";
import { cdn } from "@/config/cdn";

type Props = Omit<ImageProps, "src" | "loader"> & {
  /** CDN path such as "home/hero.avif" */
  path: string;
};

/**
 * Image served straight from the DigitalOcean CDN. Files there are already
 * AVIF and sized, so Next's optimizer is skipped to keep the server idle.
 * Always pass width/height or fill so nothing shifts while loading.
 */
export function CdnImage({ path, alt, ...rest }: Props) {
  return <Image src={cdn(path)} alt={alt} unoptimized {...rest} />;
}
