import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button,ButtonGroup } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Image } from "@heroui/image";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { LeftOutlined, RightOutlined, MenuOutlined } from '@ant-design/icons';

export const Navbar = () => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );

  const items = [
    {
      label: 'ホーム',
      key: 'Home',
      href: "/",
    },
    {
      label: '選ばれる理由',
      key: 'inquiry',
      href: "/Why",
    },
    {
      label: 'サービス紹介',
      key: 'Service',
      href: "/jbbc/services",
    }, {
      label: '導入実績',
      key: 'Track_Record',
      href: "/jbbc/cases",
    }, {
      label: '会社概要',
      key: 'Profile',
      href: "/jbbc/Info",
    },
    {
      label: 'セミナー',
      key: 'Seminar',
      href: "/seminar",
    },
    {
      label: 'ブログ',
      key: 'Blog',
      href: "/blog",
    }, {
      label: 'お役立ち情報',
      key: 'Information_Related',
      href: "/jbbc/faq",
    }
  ];


  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <Image radius="none"
       width={120} 
       className="topMenu_Icon w-12 sm:w-16 md:w-14 lg:w-12 transition-all duration-300 ease-in-out"
        src="/home/jbbcIcon.png" />
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {items.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
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

        {/* <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem> */}
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        <NavbarItem className="hidden sm:flex gap-2">
          <ButtonGroup>
            <Button
  as={NextLink}
  href="/jbbc/contact/inquiry"
  color="warning"
>
  お問い合わせ
</Button>
            <Button className="bg-black text-white">
              <MenuOutlined />
            </Button>
          </ButtonGroup>

        </NavbarItem>
        </NavbarContent>


      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {items.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  "primary"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
