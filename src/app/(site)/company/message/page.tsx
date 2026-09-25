import { pageMetadata } from "@/config/seo";
import { companyHub, companyMessage } from "@/content/company";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { CdnImage } from "@/components/site/cdn-image";

export const metadata = pageMetadata("companyMessage");

export default function CompanyMessagePage() {
  const m = companyMessage;
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill={m.pill}
        title={m.title}
        crumbs={[{ label: companyHub.title, href: "/company" }, { label: m.title }]}
      />
      <BgTitle word={m.bgWord} title={m.title} />

      <div className="mt-6 grid items-center gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <h3 className="mb-2 text-lg font-semibold md:text-xl">{m.heading}</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            {m.signature.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="leading-relaxed text-gray-700">{m.intro}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border">
          <CdnImage
            path={m.image}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-10 space-y-5 leading-relaxed text-gray-700">
        {m.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Container>
  );
}
