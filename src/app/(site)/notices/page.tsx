import { pageMetadata } from "@/config/seo";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata = pageMetadata("notices");

export default function Page() {
  return <PlaceholderPage title="お知らせ" />;
}
