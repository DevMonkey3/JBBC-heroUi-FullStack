import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { ikuseiPage as c } from "@/content/ikusei";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { CtaButton } from "@/components/site/cta-button";
import { FaqAccordion } from "@/components/site/faq-accordion";

export const metadata = pageMetadata("ikusei");

const h2 = "text-2xl font-bold md:text-3xl";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: c.faq.items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: c.title,
  inLanguage: "ja",
  author: { "@type": "Organization", name: siteConfig.legalNameJa },
  publisher: { "@type": "Organization", name: siteConfig.legalNameJa, url: siteConfig.url },
  mainEntityOfPage: `${siteConfig.url}/ikusei-shuro`,
};

export default function IkuseiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Container>
        <PageHeader pill={c.pill} title={c.title} crumbs={[{ label: "育成就労制度とは" }]} />
        <BgTitle word={c.bgWord} title="育成就労制度" />
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">{c.lead}</p>
        <p className="text-muted-foreground mt-3 text-center text-xs">最終更新: {c.updated}</p>
      </Container>

      {/* Summary */}
      <Container className="py-10 md:py-14">
        <div className="bg-brand-soft mx-auto max-w-4xl rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold md:text-2xl">{c.summary.title}</h2>
          <ol className="mt-4 space-y-3">
            {c.summary.points.map((p, i) => (
              <li key={p} className="flex items-start gap-3">
                <span className="bg-brand grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="leading-relaxed text-gray-800">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {/* Comparison table */}
      <Container className="pb-12 md:pb-16">
        <h2 className={`${h2} mb-6 text-center`}>{c.compare.title}</h2>
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-bold">
                  項目
                </th>
                <th scope="col" className="px-4 py-3 text-left font-bold">
                  技能実習（現行）
                </th>
                <th scope="col" className="text-brand-dark px-4 py-3 text-left font-bold">
                  育成就労（2027年4月〜）
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {c.compare.rows.map(([k, a, b]) => (
                <tr key={k}>
                  <th scope="row" className="w-28 bg-gray-50/60 px-4 py-3 text-left font-semibold">
                    {k}
                  </th>
                  <td className="px-4 py-3 text-gray-700">{a}</td>
                  <td className="px-4 py-3 text-gray-900">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {/* Timeline */}
      <div className="bg-brand-soft/60 py-12 md:py-16">
        <Container>
          <h2 className={`${h2} mb-8 text-center`}>{c.timeline.title}</h2>
          <ol className="border-brand/40 mx-auto max-w-3xl space-y-4 border-l-2 pl-6">
            {c.timeline.items.map((t) => (
              <li key={t.date} className="relative">
                <span
                  className="bg-brand absolute top-1.5 -left-[31px] size-3 rounded-full ring-4 ring-white"
                  aria-hidden
                />
                <p className="text-brand-dark font-bold">{t.date}</p>
                <p className="text-gray-700">{t.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* Employer checklist */}
      <Container className="py-12 md:py-16">
        <h2 className={`${h2} mb-8 text-center`}>{c.employer.title}</h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.employer.items.map((e) => (
            <li key={e.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="flex items-start gap-2 font-bold">
                <CheckCircle2 className="text-brand mt-0.5 size-5 shrink-0" aria-hidden />
                {e.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{e.text}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* JBBC */}
      <div className="bg-brand-soft/60 py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 md:p-8">
            <h2 className="text-xl font-bold md:text-2xl">{c.jbbc.title}</h2>
            <p className="mt-3 leading-relaxed text-gray-700">{c.jbbc.text}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {c.jbbc.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-brand inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  >
                    {l.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* FAQ */}
      <Container className="py-12 md:py-16">
        <h2 className={`${h2} mb-6 text-center`}>{c.faq.title}</h2>
        <div className="mx-auto max-w-4xl">
          <FaqAccordion items={[...c.faq.items]} />
        </div>
        <p className="text-muted-foreground mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed">
          {c.reviewNote}
        </p>
      </Container>

      {/* CTA */}
      <div className="bg-brand-dark py-12 text-center text-white md:py-14">
        <Container>
          <h2 className="text-2xl font-bold md:text-3xl">{c.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85 md:text-base">{c.cta.lead}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CtaButton href={c.cta.primary.href} size="lg">
              {c.cta.primary.label}
            </CtaButton>
            <CtaButton href={c.cta.secondary.href} size="lg" variant="outline">
              {c.cta.secondary.label}
            </CtaButton>
          </div>
          <p className="mt-8 text-xs text-white/70">
            出典:{" "}
            {c.sources.map((s, i) => (
              <span key={s.href}>
                {i > 0 && " ／ "}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        </Container>
      </div>
    </>
  );
}
