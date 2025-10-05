'use client'
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { usePathname } from 'next/navigation';
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Content1 from "@/components/homeComponents/content1";
import Content2 from "@/components/homeComponents/content2";

import Content4 from "@/components/homeComponents/content4";
import Content5 from "@/components/homeComponents/content5";
import Content6 from "@/components/homeComponents/content6";
import Content7 from "@/components/homeComponents/content7";
import Content8 from "@/components/homeComponents/content8";
import Content9 from "@/components/homeComponents/content9";
import Content10 from "@/components/homeComponents/content10";
import Content11 from "@/components/homeComponents/content11";
import Content12 from "@/components/footer/content12";
import NewsSection from "@/components/homeComponents/NewsSection";
import Script from 'next/script';

export default function Home() {
   const pathname = usePathname();

    // 判断是否是/admin下的页面
    const isAdminRoute = pathname.startsWith('/admin');
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Japan Bangla Bridge Company",
            "alternateName": "JBBC",
            "url": siteConfig.siteUrl,
            "logo": `${siteConfig.siteUrl}/favicon.png`,
            "description": siteConfig.description,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "JP",
              "addressLocality": "Tokyo"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": ["Japanese", "Bengali", "English"]
            }
          })
        }}
      />
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
       {!isAdminRoute ?   <> <Content1 />
      <NewsSection />
      <Content2 />
      <Content4 />
      <Content5 />
      <Content6 />
      <Content7 />
      <Content8 />
      <Content9 />
      <Content10 />
      <Content11 />
      </>:<>

      </>}

    </section>
    </>
  );
}
