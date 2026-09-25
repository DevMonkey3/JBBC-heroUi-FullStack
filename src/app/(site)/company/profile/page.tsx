import { pageMetadata } from "@/config/seo";
import { companyHub, companyProfile, type ProfileRow } from "@/content/company";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { CdnImage } from "@/components/site/cdn-image";

export const metadata = pageMetadata("companyProfile");

export default function CompanyProfilePage() {
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill={companyProfile.pill}
        title={companyProfile.title}
        crumbs={[{ label: companyHub.title, href: "/company" }, { label: companyProfile.title }]}
      />
      <BgTitle word={companyProfile.bgWord} title={companyProfile.title} />

      <div className="mt-6 grid items-start gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-tl-[60px] rounded-br-[60px]">
          <CdnImage
            path={companyProfile.image}
            alt="本社ビル"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <dl className="divide-y rounded-xl border">
          {companyProfile.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-3 gap-2 px-4 py-3">
              <dt className="text-muted-foreground col-span-1 text-sm font-medium">{row.label}</dt>
              <dd className="col-span-2 text-sm text-gray-800">
                <RowValue row={row} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  );
}

function RowValue({ row }: { row: ProfileRow }) {
  return (
    <>
      {row.blocks?.map((b) => (
        <p key={b.heading} className="mb-2 last:mb-0">
          <strong>{b.heading}</strong>
          {b.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      ))}
      {row.lines?.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
      {row.ordered && (
        <ol className="list-decimal space-y-1 pl-5">
          {row.ordered.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      )}
      {row.bullets && (
        <ul className="list-disc space-y-1 pl-5">
          {row.bullets.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
      {row.link && (
        <a
          href={row.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand block underline"
        >
          {row.link.label}
        </a>
      )}
    </>
  );
}
