import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

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
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Content1 />
      <Content2 />
      <Content4 />
      <Content5 />
      <Content6 />
      <Content7 />
      <Content8 />
      <Content9 />
      <Content10 />
      <Content11 />
    </section>
  );
}
