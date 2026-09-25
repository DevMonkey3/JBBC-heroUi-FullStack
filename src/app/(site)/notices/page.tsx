import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/placeholder-page";

export const metadata: Metadata = { title: "お知らせ" };

export default function Page() {
  return <PlaceholderPage title="お知らせ" />;
}
