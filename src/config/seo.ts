import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Per-page SEO. One entry per route so titles and descriptions are written
 * once, in one place, and stay consistent. Titles are under 60 characters,
 * descriptions between 120 and 160.
 */
export const pageSeo = {
  home: {
    path: "/",
    title: "Foreign Talent Recruitment & Specified Skilled Workers in Japan",
    description:
      "JBBC connects Japanese companies with skilled workers from Bangladesh: Specified Skilled Worker (SSW) recruitment, technical intern training, and highly skilled professionals with full onboarding support.",
  },
  why: {
    path: "/why",
    title: "Why Choose Us for Foreign Talent Recruitment",
    description:
      "Six reasons Japanese employers choose JBBC: proven track record, fast placement, compliance-first operations, retention support, safety culture, and precise candidate matching.",
  },
  services: {
    path: "/services",
    title: "Recruitment Services: SSW, Highly Skilled & Technical Interns",
    description:
      "Explore JBBC services: Specified Skilled Worker recruitment, highly skilled professional placement, Technical Intern Training Program support, and international student hiring.",
  },
  cases: {
    path: "/cases",
    title: "Case Studies: Foreign Workers Placed in Japanese Industry",
    description:
      "Real placements by JBBC across manufacturing, garments, construction, logistics and more. See how Japanese companies solved labor shortages with skilled workers from Bangladesh.",
  },
  company: {
    path: "/company",
    title: "Company Information",
    description:
      "About Japan Bangla Bridge Corporation (JBBC): a message from the president and the full company profile, from Tokyo headquarters to the Dhaka office.",
  },
  companyProfile: {
    path: "/company/profile",
    title: "Company Profile: Japan Bangla Bridge Co., Ltd.",
    description:
      "Company overview of Japan Bangla Bridge Co., Ltd. (JBBC): Shinjuku headquarters, Dhaka subsidiary, founded 2010, business lines, licenses, group companies and memberships.",
  },
  companyMessage: {
    path: "/company/message",
    title: "Message from the President",
    description:
      "A message from Tahmid Moinul, President of Japan Bangla Bridge Corporation, on building bridges between Japan and Bangladesh through people, skills and opportunity.",
  },
  seminar: {
    path: "/seminar",
    title: "Seminars & Events on Hiring Foreign Workers in Japan",
    description:
      "Upcoming JBBC seminars for Japanese employers on Specified Skilled Worker visas, technical intern training and hiring talent from Bangladesh. Free registration.",
  },
  blog: {
    path: "/blog",
    title: "Blog: Guides to Working and Hiring in Japan",
    description:
      "Practical guides on Japanese work visas, Specified Skilled Worker exams, technical intern training, and life in Japan for Bangladeshi workers and their employers.",
  },
  faq: {
    path: "/faq",
    title: "FAQ: Hiring Foreign Workers in Japan",
    description:
      "Answers to common questions about hiring foreign workers in Japan: contract periods, lead times, costs per worker, working hour rules and post-placement support.",
  },
  notices: {
    path: "/notices",
    title: "News & Announcements",
    description:
      "Latest news, newsletters and announcements from Japan Bangla Bridge Corporation on recruitment, skills testing and Japan-Bangladesh employment.",
  },
  contact: {
    path: "/contact",
    title: "Contact Us: Inquiries for Employers and Job Seekers",
    description:
      "Get in touch with Japan Bangla Bridge Corporation about hiring foreign workers, Specified Skilled Worker recruitment or job opportunities in Japan. Tokyo: 03-6279-1289.",
  },
  download: {
    path: "/download",
    title: "Download the JBBC Recruitment Guide",
    description:
      "Download free materials on hiring Specified Skilled Workers and foreign talent in Japan, including visa types, costs and the JBBC recruitment process.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How Japan Bangla Bridge Corporation collects, uses and protects personal information submitted through this website.",
  },
} as const satisfies Record<string, { path: string; title: string; description: string }>;

export type PageKey = keyof typeof pageSeo;

/** Build Next.js metadata for a page defined in pageSeo. */
export function pageMetadata(key: PageKey, extra: Metadata = {}): Metadata {
  const page = pageSeo[key];
  const url = `${siteConfig.url}${page.path}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      url,
      type: "website",
    },
    twitter: {
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
    },
    ...extra,
  };
}
