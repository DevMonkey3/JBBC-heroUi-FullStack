import { cdn } from "@/config/cdn";

type Props = Omit<React.ComponentProps<"img">, "src"> & { path: string };

/**
 * Plain <img> from the CDN for small decorative graphics such as logos and
 * icons, where the element is sized by CSS and next/image adds nothing.
 */
export function CdnImg({ path, alt = "", loading = "lazy", ...rest }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={cdn(path)} alt={alt} loading={loading} {...rest} />;
}
