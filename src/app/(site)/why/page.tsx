import { pageMetadata } from "@/config/seo";
import { why } from "@/content/why";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { CdnImage } from "@/components/site/cdn-image";

export const metadata = pageMetadata("why");

export default function WhyPage() {
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader pill={why.pill} title={why.title} crumbs={[{ label: why.title }]} />

      {/* Featured banner */}
      <div className="mb-10 overflow-hidden rounded-lg border-2 border-sky-300">
        <div className="relative aspect-[16/9] max-h-[32rem] w-full md:aspect-[21/9]">
          <CdnImage
            path={why.featured}
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1376px, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
      </div>

      {/* Reasons */}
      <section className="mb-12" aria-labelledby="reasons-heading">
        <h2 id="reasons-heading" className="sr-only">
          {why.title}
        </h2>
        <ol className="space-y-6">
          {why.reasons.map((r) => (
            <li key={r.title} className="grid grid-cols-1 gap-4 sm:grid-cols-[112px_1fr]">
              <div className="relative h-20 w-28 overflow-hidden rounded-md border">
                <CdnImage path={r.thumb} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div className="border-b pb-5">
                <h3 className="mb-1 font-bold text-gray-900">{r.title}</h3>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Gallery */}
      <section aria-label="活躍する人材の写真">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {why.gallery.map((path) => (
            <li key={path} className="relative aspect-[3/2]">
              <CdnImage
                path={path}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="rounded-md object-cover"
              />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
