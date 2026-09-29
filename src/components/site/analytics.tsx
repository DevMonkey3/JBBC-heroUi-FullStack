import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_ID is set.
 * Loaded after the page is interactive so it never delays rendering, with IP
 * anonymisation and no advertising signals.
 */
export function Analytics() {
  if (!GA_ID || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
