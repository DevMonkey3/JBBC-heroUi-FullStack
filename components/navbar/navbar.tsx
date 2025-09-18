// components/navbar.tsx
"use client";

import {useState} from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import {Button, ButtonGroup} from "@heroui/button";
import {link as linkStyles} from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {Image} from "@heroui/image";
import {MenuOutlined} from "@ant-design/icons";

export const Navbar = () => {
  // NEW: control mobile menu so we can close it after click
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    {label: "ホーム",         key: "Home",               href: "/"},
    {label: "選ばれる理由",   key: "inquiry",            href: "/Why"},
    {label: "サービス紹介",   key: "Service",            href: "/jbbc/services"},
    {label: "導入実績",       key: "Track_Record",       href: "/jbbc/cases"},
    {label: "会社概要",       key: "Profile",            href: "/jbbc/Info"},
    {label: "セミナー",       key: "Seminar",            href: "/seminar"},
    {label: "ブログ",         key: "Blog",               href: "/blog"},
    {label: "お役立ち情報",   key: "Information_Related",href: "/jbbc/faq"},
  ];

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}                // NEW
      onMenuOpenChange={setIsMenuOpen}       // NEW
    >
      <Image
        radius="none"
        width={120}
        className="topMenu_Icon w-12 sm:w-16 md:w-14 lg:w-12 transition-all duration-300 ease-in-out"
        src="/home/jbbcIcon.png"
        alt="JBBC"
      />

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {items.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({color: "foreground"}),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ButtonGroup>
            <Button as={NextLink} href="/jbbc/contact/inquiry" color="warning">
              お問い合わせ
            </Button>
            <Button className="bg-black text-white">
              <MenuOutlined />
            </Button>
          </ButtonGroup>
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
            <NavbarMenuItem key={item.href}>
              {/* FIX: use NextLink + real href, and close the menu on click */}
              <NextLink
                href={item.href}
                className="w-full py-2 text-lg"
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
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
