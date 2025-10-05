// SEO Configuration for JBBC Website
import { Metadata } from 'next';

export const siteConfig = {
  name: 'JBBC - Japan Bangla Bridge Company',
  description: '外国人材紹介・特定技能人材・高度人材の採用支援サービス。バングラデシュIT人材を中心に、日本企業のグローバル人材活用をサポートします。',
  url: 'https://jbbc.co.jp',
  ogImage: '/og-image.jpg',
  keywords: [
    '外国人材',
    '特定技能',
    '高度人材',
    'バングラデシュ',
    'IT人材',
    '人材紹介',
    '技能実習生',
    '留学生',
    'グローバル人材',
    'DX',
    'オフショア開発',
  ],
};

export const defaultMetadata: Metadata = {
  title: {
    default: 'JBBC - Japan Bangla Bridge Company | 外国人材紹介・特定技能人材採用支援',
    template: '%s | JBBC',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'JBBC' }],
  creator: 'JBBC',
  publisher: 'JBBC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@jbbc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

// Page-specific metadata generators
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
