import { pageMetadata } from "@/config/seo";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata = pageMetadata("seminar");

export default function Page() {
  return <PlaceholderPage title="セミナー" />;
}
