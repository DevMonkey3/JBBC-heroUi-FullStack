import { pageMetadata } from "@/config/seo";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata = pageMetadata("contact");

export default function Page() {
  return <PlaceholderPage title="お問い合わせ" />;
}
