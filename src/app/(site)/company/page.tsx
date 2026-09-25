import Link from "next/link";
import { pageMetadata } from "@/config/seo";
import { companyHub } from "@/content/company";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { CdnImage } from "@/components/site/cdn-image";

export const metadata = pageMetadata("company");

export default function CompanyHubPage() {
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill={companyHub.pill}
        title={companyHub.title}
        crumbs={[{ label: companyHub.title }]}
      />
      <BgTitle word={companyHub.bgWord} title={companyHub.title} />

      <ul className="grid gap-4 sm:grid-cols-2 md:gap-6">
        {companyHub.cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-tl-[60px] rounded-br-[60px]">
                <CdnImage
                  path={c.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="p-4 text-center font-semibold text-gray-800">{c.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
