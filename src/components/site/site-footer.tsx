import Link from "next/link";
import { Mail, Download, CalendarDays, Phone, MapPin } from "lucide-react";
import { footerNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { company } from "@/content/company";
import { featuresBanner, newsletter, contactBlock, footerAbout } from "@/content/footer";
import { Container } from "@/components/site/container";
import { CdnImage } from "@/components/site/cdn-image";
import { CdnImg } from "@/components/site/cdn-img";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Marquee } from "@/components/site/marquee";

const icons = { mail: Mail, download: Download, calendar: CalendarDays } as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const banner = [...featuresBanner.images, ...featuresBanner.images];

  return (
    <footer>
      {/* Features banner with scrolling photos */}
      <div className="relative overflow-hidden bg-sky-50 py-10">
        <Marquee speed="slow" className="flex w-max gap-4">
          {banner.map((path, i) => (
            <div key={`${path}-${i}`} className="relative h-40 w-80 shrink-0">
              <CdnImage
                path={path}
                alt=""
                fill
                sizes="320px"
                className="rounded-xl object-cover shadow-md"
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-0 bg-white/45" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-base opacity-90 md:text-lg">{featuresBanner.eyebrow}</p>
          <p className="mx-auto mb-6 max-w-4xl text-xl font-bold md:text-2xl lg:text-3xl">
            {featuresBanner.title}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {featuresBanner.buttons.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="border-brand text-brand hover:bg-brand-soft rounded-full border bg-white px-8 py-2.5 font-semibold shadow-sm transition-colors"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-100 py-10">
        <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="max-w-xl text-center text-2xl font-bold md:text-left md:text-3xl">
            <span className="text-brand">{newsletter.titlePrefix}</span>
            {newsletter.title}
          </h2>
          <div className="w-full md:w-[420px]">
            <NewsletterForm />
          </div>
        </Container>
      </div>

      {/* Contact block */}
      <div className="bg-brand-dark py-10 text-center text-white md:py-12">
        <Container className="space-y-5">
          <h2 className="text-2xl font-bold md:text-3xl">{contactBlock.title}</h2>
          <p className="text-lg md:text-xl">{contactBlock.lead}</p>
          <a
            href={`tel:${contactBlock.tel}`}
            className="block text-4xl font-black tracking-tight md:text-5xl"
          >
            TEL: {contactBlock.tel}
          </a>
          <div className="relative mx-auto inline-block">
            <span className="inline-block rounded-md bg-[#f0562d] px-4 py-2 text-sm whitespace-nowrap md:text-base">
              {contactBlock.bubble}
            </span>
            <svg
              className="absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 fill-[#f0562d]"
              viewBox="0 0 256 256"
              aria-hidden
            >
              <path d="M128 256L0 128h256z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row sm:flex-wrap">
            {contactBlock.buttons.map((b) => {
              const Icon = icons[b.icon];
              return (
                <Link
                  key={b.href}
                  href={b.href}
                  className="text-brand flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium shadow-md transition-shadow hover:shadow-lg"
                >
                  <Icon className="size-5" aria-hidden />
                  {b.label}
                </Link>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Columns */}
      <div className="bg-[#E4EFF4] py-12">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="space-y-5 md:col-span-5 lg:col-span-4">
              <CdnImg
                path="home/jbbcIcon.avif"
                alt="JBBC"
                height={90}
                className="h-[90px] w-auto"
              />
              <p className="text-sm leading-relaxed text-gray-700">
                <span className="mb-1 block text-base font-bold text-gray-900">
                  {footerAbout.name}
                </span>
                {footerAbout.description}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <Phone className="text-brand size-4" aria-hidden />
                  <a href={`tel:${siteConfig.contact.phoneJp}`} className="hover:text-brand">
                    TEL: {siteConfig.contact.phoneJp}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-brand size-4" aria-hidden />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand mt-0.5 size-4" aria-hidden />
                  <span>{company.address.join(" ")}</span>
                </li>
              </ul>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-sm font-semibold">Follow Us:</span>
                {footerAbout.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="bg-brand grid size-9 place-items-center rounded-full transition-transform hover:scale-110"
                  >
                    <CdnImg path={s.icon} alt="" height={18} className="size-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-8">
              {footerNav.map((group) => (
                <div key={group.heading}>
                  <h3 className="border-brand mb-4 border-b-2 pb-2 text-base font-bold">
                    {group.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="hover:text-brand text-sm text-gray-700 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-300 pt-6 text-xs text-gray-600 md:flex-row">
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-brand">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="hover:text-brand">
                お問い合わせ
              </Link>
            </div>
            <p>
              © {year} {siteConfig.legalName} Ltd. All Rights Reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
