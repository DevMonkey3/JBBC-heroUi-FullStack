import type { Metadata } from "next";
import { RemoteImage } from "@/components/site/remote-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, User, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getSeminarBySlug, getPublishedSeminarSlugs } from "@/server/queries/seminars";
import { formatDateWeekday, formatTime, hasEnded } from "@/lib/dates";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { RegistrationForm } from "@/components/site/seminar/registration-form";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const rows = await getPublishedSeminarSlugs().catch(() => []);
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSeminarBySlug(decodeURIComponent(slug));
  if (!s) return { title: "セミナー" };
  const description =
    s.excerpt ??
    `${formatDateWeekday(s.startsAt)} ${s.location}で開催。${s.description.slice(0, 90)}`;
  const url = `${siteConfig.url}/seminar/${encodeURIComponent(s.slug)}`;
  return {
    title: s.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: s.title,
      description,
      url,
      type: "article",
      ...(s.heroImage ? { images: [{ url: s.heroImage }] } : {}),
    },
  };
}

export default async function SeminarDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = await getSeminarBySlug(decodeURIComponent(slug));
  if (!s) notFound();
  const ended = hasEnded(s.endsAt);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: s.title,
    description: s.excerpt ?? s.description.slice(0, 200),
    startDate: s.startsAt,
    endDate: s.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: s.location },
    organizer: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    ...(s.heroImage ? { image: [s.heroImage] } : {}),
  };

  return (
    <Container className="pb-12 md:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <PageHeader
        pill="seminar"
        title={s.title}
        crumbs={[{ label: "セミナー", href: "/seminar" }, { label: s.title }]}
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Details */}
        <div className="lg:col-span-7">
          {s.heroImage && (
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl">
              <RemoteImage
                src={s.heroImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <dl className="bg-brand-soft mb-6 divide-y divide-white rounded-xl p-4">
            <Row icon={<CalendarDays className="text-brand size-5" aria-hidden />} label="開催日時">
              {formatDateWeekday(s.startsAt)}
              <br />
              {formatTime(s.startsAt)}〜{formatTime(s.endsAt)}
            </Row>
            <Row icon={<MapPin className="text-brand size-5" aria-hidden />} label="開催場所">
              {s.location}
            </Row>
            {(s.speakerName || s.speakerTitle || s.speakerOrg) && (
              <Row icon={<User className="text-brand size-5" aria-hidden />} label="登壇者">
                {s.speakerName}
                {s.speakerTitle && (
                  <span className="block text-sm text-gray-600">{s.speakerTitle}</span>
                )}
                {s.speakerOrg && (
                  <span className="block text-sm text-gray-600">{s.speakerOrg}</span>
                )}
              </Row>
            )}
          </dl>

          <h2 className="mb-3 border-b border-black pb-2 text-xl font-bold">セミナー概要</h2>
          <div className="leading-relaxed whitespace-pre-wrap text-gray-800">{s.description}</div>
        </div>

        {/* Registration */}
        <aside className="lg:col-span-5">
          <div className="sticky top-20 rounded-2xl bg-blue-50 p-5 md:p-6">
            {ended ? (
              <div className="py-6 text-center">
                <p className="text-lg font-bold">このセミナーは終了しました</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  次回の開催情報はセミナー一覧をご覧ください。
                </p>
                <Link href="/seminar" className="text-brand mt-4 inline-block text-sm underline">
                  セミナー一覧へ
                </Link>
              </div>
            ) : (
              <>
                <h2 className="mb-5 text-center text-xl font-bold">お申し込みフォーム</h2>
                {s.registrationUrl && (
                  <div className="mb-5 rounded-lg bg-white p-3 text-center text-sm">
                    <p className="text-muted-foreground mb-2">
                      外部サイトからもお申し込みいただけます
                    </p>
                    <a
                      href={s.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-brand text-brand hover:bg-brand-soft inline-flex items-center gap-1 rounded-full border px-4 py-1.5 font-semibold"
                    >
                      外部サイトで申し込む
                      <ExternalLink className="size-4" aria-hidden />
                    </a>
                  </div>
                )}
                <RegistrationForm seminarId={s.id} />
              </>
            )}
          </div>
        </aside>
      </div>
    </Container>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <dt className="text-sm font-bold">{label}</dt>
        <dd>{children}</dd>
      </div>
    </div>
  );
}
