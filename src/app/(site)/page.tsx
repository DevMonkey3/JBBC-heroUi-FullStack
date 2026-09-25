import Script from "next/script";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/section";
import { Hero } from "@/components/site/home/hero";
import { NewsSection } from "@/components/site/home/news-section";
import { StatsStrip } from "@/components/site/home/stats-strip";
import { ServicesGrid } from "@/components/site/home/services-grid";
import { Achievements } from "@/components/site/home/achievements";
import { SupportPhotos } from "@/components/site/home/support-photos";
import { FiveReasons } from "@/components/site/home/five-reasons";
import { SixReasons } from "@/components/site/home/six-reasons";
import { Industries } from "@/components/site/home/industries";
import { BlogPreview } from "@/components/site/home/blog-preview";
import { CompanyIntro } from "@/components/site/home/company-intro";
import { ClientLogos } from "@/components/site/home/client-logos";
import { FaqPreview } from "@/components/site/home/faq-preview";

export const revalidate = 300;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.png`,
  description: siteConfig.description,
  address: { "@type": "PostalAddress", addressCountry: "JP", addressLocality: "Tokyo" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: siteConfig.contact.phoneJp,
    availableLanguage: ["Japanese", "Bengali", "English"],
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Section inner="pt-5 md:pt-6">
        <Hero />
      </Section>

      <Section inner="pt-8 md:pt-10">
        <Suspense fallback={null}>
          <NewsSection />
        </Suspense>
      </Section>

      <Section inner="pt-8 md:pt-10">
        <StatsStrip />
      </Section>

      <Section inner="pt-8 md:pt-10">
        <ServicesGrid />
      </Section>

      <Section inner="pt-12 md:pt-16">
        <Achievements />
      </Section>

      <Section inner="pt-14 md:pt-16">
        <SupportPhotos />
      </Section>

      <Section inner="pt-8 md:pt-10">
        <FiveReasons />
      </Section>

      <Section bleed="bg-brand-soft mt-10 md:mt-12" inner="py-10 md:py-12">
        <SixReasons />
      </Section>

      <Section inner="pt-10 md:pt-12">
        <Industries />
      </Section>

      <Section inner="pt-10 md:pt-12">
        <Suspense fallback={null}>
          <BlogPreview />
        </Suspense>
      </Section>

      <Section inner="pt-12 md:pt-16">
        <CompanyIntro />
      </Section>

      <Section inner="pt-12 md:pt-16">
        <ClientLogos />
      </Section>

      <Section bleed="bg-brand-soft mt-10 md:mt-12" inner="py-10 md:py-14">
        <FaqPreview />
      </Section>
    </>
  );
}
