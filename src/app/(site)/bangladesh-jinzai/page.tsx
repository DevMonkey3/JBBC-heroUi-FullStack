import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/config/seo";
import { bangladeshPage as c } from "@/content/bangladesh";
import { faqSections } from "@/content/faq";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { FaqAccordion } from "@/components/site/faq-accordion";

export const metadata = pageMetadata("bangladesh");

const h2 = "text-2xl font-bold md:text-3xl";

export default function BangladeshPage() {
  const faqItems = faqSections
    .flatMap((s) => s.items)
    .filter((i) => (c.faq.questions as readonly string[]).includes(i.q));

  return (
    <>
      <Container>
        <PageHeader
          pill={c.pill}
          title={c.title}
          crumbs={[{ label: "バングラデシュ人材の採用" }]}
        />
        <BgTitle word={c.bgWord} title="バングラデシュ人材" />
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">{c.lead}</p>
        <p className="text-muted-foreground mt-3 text-center text-xs">最終更新: {c.updated}</p>
      </Container>

      {/* Reasons */}
      <Container className="py-12 md:py-16">
        <h2 className={`${h2} mb-8 text-center`}>{c.reasons.title}</h2>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.reasons.items.map((r, i) => (
            <li key={r.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-brand text-sm font-bold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{r.text}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* Routes */}
      <div className="bg-brand-soft/60 py-12 md:py-16">
        <Container>
          <h2 className={`${h2} text-center`}>{c.routes.title}</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-center text-sm md:text-base">
            {c.routes.lead}
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {c.routes.items.map((r) => (
              <article
                key={r.title}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5"
              >
                <h3 className="text-xl font-bold">{r.title}</h3>
                <p className="text-brand-dark mt-1 text-sm font-semibold">{r.who}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="text-brand mt-0.5 size-4 shrink-0" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={r.href}
                  className="text-brand mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                >
                  {r.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </div>

      {/* Industries */}
      <Container className="py-12 md:py-16">
        <h2 className={`${h2} text-center`}>{c.industries.title}</h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-center text-sm md:text-base">
          {c.industries.lead}
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {c.industries.items.map((it) => (
            <li
              key={it.title}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="relative aspect-[3/2]">
                <CdnImage
                  path={it.image}
                  alt={it.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="py-2 text-center font-semibold">{it.title}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Process */}
      <div className="bg-brand-soft/60 py-12 md:py-16">
        <Container>
          <h2 className={`${h2} text-center`}>{c.process.title}</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-center text-sm md:text-base">
            {c.process.lead}
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.process.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                <span className="bg-brand grid size-10 shrink-0 place-items-center rounded-full font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* Cost + support */}
      <Container className="grid gap-8 py-12 md:grid-cols-2 md:py-16">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold md:text-2xl">{c.cost.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">{c.cost.text}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {c.cost.links.map((l) => (
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
        </section>
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold md:text-2xl">{c.support.title}</h2>
          <ul className="mt-3 space-y-2">
            {c.support.items.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-gray-700 md:text-base">
                <CheckCircle2 className="text-brand mt-0.5 size-4 shrink-0" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* FAQ */}
      <Container className="pb-12 md:pb-16">
        <h2 className={`${h2} mb-6 text-center`}>{c.faq.title}</h2>
        <div className="mx-auto max-w-4xl">
          <FaqAccordion items={faqItems} />
          <p className="mt-5 text-center">
            <Link
              href={c.faq.more.href}
              className="text-brand inline-flex items-center gap-1 font-semibold hover:underline"
            >
              {c.faq.more.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
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
