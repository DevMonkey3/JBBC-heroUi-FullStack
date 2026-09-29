import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { UnsubscribeForm } from "@/components/site/unsubscribe-form";

export const metadata: Metadata = {
  title: "Unsubscribe from the JBBC Newsletter",
  description: "Stop receiving newsletters, announcements and seminar emails from JBBC.",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill="newsletter"
        title="ニュースレター配信停止"
        crumbs={[{ label: "配信停止" }]}
      />
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm md:p-8">
        <p className="mb-5 text-center text-sm text-gray-600">
          ニュースレターの配信を停止する場合は、登録されているメールアドレスを入力してください。
        </p>
        <UnsubscribeForm initialEmail={email ?? ""} />
      </div>
    </Container>
  );
}
