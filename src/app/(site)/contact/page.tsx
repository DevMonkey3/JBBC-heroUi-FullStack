import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = { title: "お問い合わせ" };

export default function Page() {
  return <PlaceholderPage title="お問い合わせ" />;
}
