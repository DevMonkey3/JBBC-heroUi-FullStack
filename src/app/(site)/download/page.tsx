import { FileText, CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/config/seo";
import { downloadMaterial } from "@/content/download";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { DownloadForm } from "@/components/site/download/download-form";

export const metadata = pageMetadata("download");

const points = [
  "特定技能・技能実習・高度人材の制度の違い",
  "JBBCの採用サポートと受け入れまでの流れ",
  "バングラデシュ人材の特徴と受け入れ実績",
];

export default function DownloadPage() {
  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill="download"
        title="資料ダウンロード"
        crumbs={[{ label: "資料ダウンロード" }]}
      />
      <BgTitle word="Download" title="資料ダウンロード" />

      <div className="mx-auto mt-6 grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-12">
        <section className="bg-brand-soft rounded-2xl p-6 md:p-8">
          <div className="text-brand mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold">
            <FileText className="size-4" aria-hidden />
            無料
          </div>
          <h2 className="text-2xl font-bold">{downloadMaterial.title}</h2>
          <p className="mt-3 leading-relaxed text-gray-700">{downloadMaterial.description}</p>
          <ul className="mt-5 space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-gray-800">
                <CheckCircle2 className="text-brand mt-0.5 size-5 shrink-0" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold">お問い合わせ</h2>
          <p className="mt-1 mb-5 text-sm text-gray-600">
            ご興味をお持ちいただきありがとうございます。
            <br />
            下記フォームにご記入ください。
          </p>
          <DownloadForm fileLabel={downloadMaterial.fileLabel} />
        </section>
      </div>
    </Container>
  );
}
