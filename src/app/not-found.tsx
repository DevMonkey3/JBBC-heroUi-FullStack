import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { CtaButton } from "@/components/site/cta-button";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <p className="text-muted-foreground text-sm">404</p>
        <h1 className="text-2xl font-bold">ページが見つかりません</h1>
        <p className="text-muted-foreground">
          お探しのページは移動または削除された可能性があります。
        </p>
        <CtaButton href="/" arrow={false}>
          ホームへ戻る
        </CtaButton>
      </main>
      <SiteFooter />
    </>
  );
}
