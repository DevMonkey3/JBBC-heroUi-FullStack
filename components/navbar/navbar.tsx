"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Image } from "@heroui/image";

export const Navbar = (props: any) => {
  // NEW: control mobile menu so we can close it after click
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { label: "ホーム", key: "Home", href: "/" },
    { label: "選ばれる理由", key: "inquiry", href: "/Why" },
    { label: "サービス紹介", key: "Service", href: "/jbbc/services" },
    { label: "導入実績", key: "Track_Record", href: "/jbbc/cases" },
    { label: "会社概要", key: "Profile", href: "/jbbc/Info" },
    { label: "セミナー", key: "Seminar", href: "/seminar" },
    { label: "ブログ", key: "Blog", href: "/blog" },
    { label: "お役立ち情報", key: "Information_Related", href: "/jbbc/faq" },
  ];

  return (
    <HeroUINavbar
      className="z-50" // keep toggle on top
      maxWidth="xl"
      // position="sticky"
      isMenuOpen={isMenuOpen}                // NEW
      onMenuOpenChange={setIsMenuOpen}       // NEW
    >
      <Image
        radius="none"
        width={120}
        height={90}
        className="topMenu_Icon 
             w-[80px] sm:w-[50px] md:w-[52px] lg:w-[100px]
             mt-9 lg:mt-10
             lg:ml-5
             cursor-pointer
             transition-all duration-300 ease-in-out"
        src="/home/jbbcIcon.png"
        alt="JBBC"
        onClick={() => {
          // navigate to home
          router.push("/");
          // close mobile menu if open
          if (isMenuOpen) {
            setIsMenuOpen(false);
          }
        }}
      />

      <NavbarContent
        style={{ justifyContent: "end" }}
        className="basis-1/5 sm:basis-full justify-end"
        justify="center"
      >
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {items.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Button
            className="font-bold"
            as={NextLink}
            href="/jbbc/contact/inquiry"
            variant="bordered"
            color="warning"
          >
            お問い合わせ
          </Button>
          <Button
            className="bg-[#f89834] text-white font-bold"
            as={NextLink}
            href="/download"
          >
            ダウンロード
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle aria-label="メニューを開く" />
      </NavbarContent>

      {/* Mobile drawer */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {items.map((item) => (
            <NavbarMenuItem key={item.href} isActive={pathname === item.href}>
              <NextLink
                href={item.href}
                className={clsx("w-full py-2 text-lg", {
                  "text-primary font-medium": pathname === item.href,
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}

          {/* mobile CTA */}
          <NavbarMenuItem>
            <NextLink
              href="/jbbc/contact/inquiry"
              className="w-full py-2 text-lg text-warning"
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink
              href="/download"
              className="w-full py-2 text-lg text-orange-500 font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              ダウンロード
            </NextLink>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
