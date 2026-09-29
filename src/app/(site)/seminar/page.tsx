import { pageMetadata } from "@/config/seo";
import { getPublicSeminars } from "@/server/queries/seminars";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { SeminarCard } from "@/components/site/seminar/seminar-card";

export const metadata = pageMetadata("seminar");

export default async function SeminarListPage() {
  const { upcoming, past } = await getPublicSeminars();

  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader pill="seminar" title="セミナー・イベント" crumbs={[{ label: "セミナー" }]} />
      <BgTitle word="Seminar" title="セミナー・イベント" />
      <p className="text-muted-foreground mb-8 text-center">
        JBBC主催の最新セミナー・イベント情報をご覧いただけます
      </p>

      {upcoming.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="text-lg font-semibold text-gray-500">現在開催予定のセミナーはありません</p>
          <p className="text-muted-foreground mt-1 text-sm">新しいセミナーの情報をお待ちください</p>
        </div>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((s) => (
            <li key={s.id}>
              <SeminarCard seminar={s} />
            </li>
          ))}
        </ul>
      )}

      {past.length > 0 && (
        <section className="mt-14" aria-labelledby="past-heading">
          <h2 id="past-heading" className="mb-6 text-center text-2xl font-bold">
            終了したセミナー
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((s) => (
              <li key={s.id}>
                <SeminarCard seminar={s} ended />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
