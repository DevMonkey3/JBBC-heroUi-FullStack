import { pageMetadata } from "@/config/seo";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata = pageMetadata("blog");

export default function Page() {
  return <PlaceholderPage title="ブログ" />;
}
