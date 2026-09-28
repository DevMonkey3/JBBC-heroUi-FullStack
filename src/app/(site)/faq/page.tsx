import Script from "next/script";
import { pageMetadata } from "@/config/seo";
import { faqPage, faqSections } from "@/content/faq";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { FaqAccordion } from "@/components/site/faq-accordion";

export const metadata = pageMetadata("faq");

// Structured data so Google can show questions directly in search results.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSections.flatMap((s) =>
    s.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.bullets ? `${i.a} ${i.bullets.join("、")}` : i.a,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <Container className="pb-12 md:pb-16">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader pill={faqPage.pill} title={faqPage.title} crumbs={[{ label: faqPage.title }]} />
      <BgTitle word={faqPage.bgWord} title={faqPage.title} />

      <p className="text-muted-foreground text-center text-sm">{faqPage.hint}</p>
      <nav aria-label="質問カテゴリ" className="mt-3 flex flex-wrap justify-center gap-2">
        {faqSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="border-brand text-brand hover:bg-brand-soft rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mx-auto mt-10 max-w-4xl space-y-12">
        {faqSections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
            <h2 id={`${s.id}-title`} className="mb-5 text-center text-2xl font-bold md:text-3xl">
              {s.title}
            </h2>
            <FaqAccordion items={s.items} />
          </section>
        ))}
      </div>
    </Container>
  );
}
