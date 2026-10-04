import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CdnImage } from "@/components/site/cdn-image";
import type { Block, ServiceDetail as Detail } from "@/content/services";

export function ServiceDetail({ service, index }: { service: Detail; index: number }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="scroll-mt-24 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 [contain-intrinsic-size:auto_1400px] [content-visibility:auto]"
    >
      {/* Intro */}
      <div className="grid items-center gap-6 p-5 md:grid-cols-2 md:gap-10 md:p-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <CdnImage
            path={service.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-brand mb-1 text-sm font-bold">
            Service {String(index + 1).padStart(2, "0")}
          </p>
          <h2 id={`${service.id}-title`} className="text-2xl font-bold md:text-3xl">
            {service.title}
          </h2>
          <p className="mt-1 text-lg font-semibold text-gray-800">{service.heading}</p>
          <p className="border-brand mt-4 border-t pt-4 leading-relaxed text-gray-700">
            {service.description}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-6 md:px-8 md:pb-8">
        <div className="bg-brand-soft/60 grid gap-x-10 gap-y-4 rounded-lg p-5 md:grid-cols-2 md:p-6">
          {service.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>
        {(service.links || service.source) && (
          <div className="mt-4 flex flex-col gap-3 text-sm md:flex-row md:items-start md:justify-between">
            {service.links && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {service.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-brand inline-flex items-center gap-1 font-semibold hover:underline"
                    >
                      {l.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {service.source && (
              <p className="text-muted-foreground text-xs">
                出典:{" "}
                <a
                  href={service.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {service.source.label}
                </a>
                （{service.source.checked}確認）
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sectors */}
      <div className="bg-brand-soft px-5 py-8 md:px-8">
        <p className="text-muted-foreground text-center text-sm md:text-base">
          {service.sectorsTitle}
        </p>
        <h3 className="mb-6 text-center text-xl font-bold md:text-2xl">
          {service.sectorsSubtitle}
        </h3>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {service.sectors.map((sec) => (
            <li key={sec.title} className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="relative aspect-[3/2]">
                <CdnImage
                  path={sec.image}
                  alt={sec.en}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-brand-dark px-2 py-2 text-center text-white">
                <p className="text-sm font-bold md:text-base">{sec.title}</p>
                <p className="text-[11px] opacity-80">{sec.en}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h":
      return <h4 className="text-brand-dark text-base font-bold md:col-span-2">{block.text}</h4>;
    case "p":
      return <p className="leading-relaxed text-gray-700 md:col-span-2">{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-1.5 md:col-span-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-700">
              <span className="bg-accent-brand mt-2 size-1.5 shrink-0 rounded-full" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}
