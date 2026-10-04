"use client";

import Image, { type ImageProps } from "next/image";
import { cdnPathFromUrl, isOptimizableImage, variantUrl } from "@/config/cdn";

type Props = Omit<ImageProps, "src"> & { src: string };

/**
 * Image whose URL comes from the database (blog covers, seminar photos).
 * - On our CDN: served from the pre-resized variants, no server work.
 * - Other known hosts (the old WordPress site): Next's optimizer.
 * - Anything else: a plain <img>, so an unexpected host degrades to an
 *   unoptimized picture instead of a 500.
 */
export function RemoteImage({ src, alt, fill, className, sizes, priority, ...rest }: Props) {
  const cdnPath = cdnPathFromUrl(src);
  if (cdnPath) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        loader={({ width }) => variantUrl(cdnPath, width)}
        {...rest}
      />
    );
  }
  if (isOptimizableImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        {...rest}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className}
    />
  );
}
