import { pageMetadata } from "@/config/seo";
import { casesPage, caseCards } from "@/content/cases";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { CaseCard } from "@/components/site/cases/case-card";

export const metadata = pageMetadata("cases");

export default function CasesPage() {
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader pill={casesPage.pill} title="導入実績" crumbs={[{ label: "導入実績" }]} />
      <BgTitle word={casesPage.bgWord} title={casesPage.title} />
      <p className="text-center leading-relaxed">
        {casesPage.intro[0]}
        <br />
        {casesPage.intro[1]}
      </p>
      <ul className="bg-brand-soft mt-5 grid grid-cols-1 gap-5 rounded-xl p-4 sm:p-8 md:grid-cols-2 lg:grid-cols-3">
        {caseCards.map((c) => (
          <li key={c.id}>
            <CaseCard item={c} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
