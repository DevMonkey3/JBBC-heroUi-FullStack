import { pageMetadata } from "@/config/seo";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata = pageMetadata("privacy");

export default function Page() {
  return <PlaceholderPage title="プライバシーポリシー" />;
}
