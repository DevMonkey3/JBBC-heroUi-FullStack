import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { caseCards, caseDetail } from "@/content/cases";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { CaseCard } from "@/components/site/cases/case-card";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return caseCards.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const card = caseCards.find((c) => c.id === id);
  if (!card) return { title: "導入実績" };
  const title = caseDetail.title.join(" ");
  return {
    title: `${title} | Case Study`,
    description: `${card.title} ${card.excerpt}`,
    alternates: { canonical: `${siteConfig.url}/cases/${id}` },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const card = caseCards.find((c) => c.id === id);
  if (!card) notFound();
  const d = caseDetail;
  const title = d.title.join(" ");

  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill="solution"
        title={title}
        crumbs={[{ label: "導入実績", href: "/cases" }, { label: title }]}
      />

      <div className="grid gap-6 rounded-lg bg-white p-4 md:grid-cols-2 md:gap-8 md:p-8">
        <div className="relative aspect-[5/3] overflow-hidden rounded-lg shadow-md">
          <CdnImage
            path={d.image}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold">お客様プロフィール</h2>
          <dl className="border-t border-gray-400 py-2">
            {d.profile.map(([k, v]) => (
              <div key={k} className="flex gap-3 py-1">
                <dt className="w-24 shrink-0 font-bold">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-brand-soft/60 mt-6 rounded-lg p-6 md:rounded-tl-[120px] md:rounded-br-[120px] md:p-12 lg:p-20">
        <span className="bg-brand-dark inline-block rounded-tl-[10px] rounded-br-[10px] px-2 py-1 text-lg text-white">
          solution
        </span>
        {d.sections.map((s) => (
          <section key={s.heading} className="mt-6">
            <h2 className="text-2xl font-bold md:text-3xl">{s.heading}</h2>
            <h3 className="text-brand mt-1 text-lg font-semibold">{s.sub}</h3>
            <p className="mt-2 text-sm leading-relaxed md:text-base">{s.body}</p>
          </section>
        ))}
      </div>

      <h2 className="mt-10 text-center text-2xl font-bold">{d.relatedHeading}</h2>
      <ul className="mt-5 grid grid-cols-1 gap-5 p-4 sm:p-8 md:grid-cols-2 lg:grid-cols-3">
        {d.related.map((c) => (
          <li key={c.id}>
            <CaseCard item={c} soft />
          </li>
        ))}
      </ul>
      <div className="text-center">
        <CtaButton href={d.cta.href} variant="brand" size="lg">
          {d.cta.label}
        </CtaButton>
      </div>
    </Container>
  );
}
