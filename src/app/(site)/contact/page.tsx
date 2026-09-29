import { Phone } from "lucide-react";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { ContactForm } from "@/components/site/contact/contact-form";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <Container>
        <PageHeader pill="inquiry" title="お問い合わせ" crumbs={[{ label: "お問い合わせ" }]} />
        <BgTitle word="Inquiry" title="お問い合わせ" />

        <div className="bg-brand-soft mx-auto mt-6 max-w-3xl rounded-xl p-5 text-center md:p-6">
          <p className="text-lg font-bold">お電話でのお問い合わせ</p>
          <p className="mt-1 text-sm text-gray-700">法人受付窓口 Not for job search purposes</p>
          <div className="mt-3 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneJp.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 text-3xl font-bold text-gray-800 md:text-4xl"
            >
              <Phone className="text-brand size-7" aria-hidden />
              {siteConfig.contact.phoneJp}
            </a>
            <p className="text-lg font-medium text-gray-700">受付時間: 平日9:00~17:00</p>
          </div>
        </div>

        <p className="mt-6 text-center font-medium md:mt-8">
          お問い合わせありがとうございます。下記の項目をご入力ください。
        </p>
      </Container>

      <div className="bg-brand-soft mt-8 px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-4xl rounded-tl-[40px] rounded-br-[40px] bg-white px-4 py-8 shadow-lg md:rounded-tl-[110px] md:rounded-br-[110px] md:px-12 md:py-12">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
