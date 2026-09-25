import { Container } from "@/components/site/container";

/** Temporary page body used while a section is being rebuilt. */
export function PlaceholderPage({ title, note }: { title: string; note?: string }) {
  return (
    <Container className="py-16 md:py-24">
      <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="text-muted-foreground mt-4">{note ?? "このページは現在リニューアル中です。"}</p>
    </Container>
  );
}
