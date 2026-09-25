import Link from "next/link";
import { CdnImg } from "@/components/site/cdn-img";
import { Container } from "@/components/site/container";
import { HeaderCta } from "@/components/site/header-cta";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavLinks } from "@/components/site/nav-links";

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

        <NavLinks className="hidden items-center gap-6 lg:flex" linkClassName="text-sm" />

        <HeaderCta className="hidden sm:flex" />
        <MobileNav />
      </Container>
    </header>
  );
}
