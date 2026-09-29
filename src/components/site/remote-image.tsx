import Image, { type ImageProps } from "next/image";
import { isOptimizableImage } from "@/config/cdn";

type Props = Omit<ImageProps, "src"> & { src: string };

/**
 * Image whose URL comes from the database. Known hosts go through the
 * optimizer; anything else renders as a plain <img> so an unexpected host
 * degrades to an unoptimized picture instead of a 500.
 */
export function RemoteImage({ src, alt, fill, className, sizes, priority, ...rest }: Props) {
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
