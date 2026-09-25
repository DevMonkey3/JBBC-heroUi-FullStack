import Link from "next/link";
import { mainNav } from "@/config/nav";
import { CdnImg } from "@/components/site/cdn-img";
import { Container } from "@/components/site/container";
import { HeaderCta } from "@/components/site/header-cta";
import { MobileNav } from "@/components/site/mobile-nav";

export function SiteHeader() {
  return (
    <header className="bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="JBBC ホーム">
          <CdnImg
            path="home/jbbcIcon.avif"
            alt="JBBC"
            height={48}
            loading="eager"
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="メインナビゲーション">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-brand text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderCta className="hidden sm:flex" />
        <MobileNav />
      </Container>
    </header>
  );
}
