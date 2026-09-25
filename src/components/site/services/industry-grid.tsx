import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CdnImage } from "@/components/site/cdn-image";
import { industries } from "@/content/services";

export function IndustryGrid() {
  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
          {industries.kicker}
        </p>
        <h2 className="text-2xl font-bold md:text-3xl">{industries.title}</h2>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {industries.items.map((it) => (
          <li key={it.title}>
            <Link
              href={industries.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl shadow-sm"
            >
              <CdnImage
                path={it.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2.5 text-white">
                <span className="font-bold">{it.title}</span>
                <ChevronRight
                  className="size-5 rounded-full border border-white/80 p-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
