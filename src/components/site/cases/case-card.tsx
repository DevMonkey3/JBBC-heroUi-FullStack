import Link from "next/link";
import type { CaseCard as CaseCardData } from "@/content/cases";
import { CdnImage } from "@/components/site/cdn-image";

export function CaseCard({ item, soft = false }: { item: CaseCardData; soft?: boolean }) {
  const href = `/cases/${item.id}`;
  return (
    <article
      className={
        soft
          ? "bg-brand-soft overflow-hidden border-b border-gray-200 shadow-sm"
          : "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
      }
    >
      <Link href={href} className="relative block aspect-[16/10]">
        <CdnImage
          path={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="border-brand text-brand absolute top-3 left-3 rounded-2xl border bg-white px-2 py-1 text-xs">
          {item.tag}
        </span>
      </Link>
      <div className="p-4 text-left">
        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
          <Link href={href}>{item.title}</Link>
        </h3>
        <p className="mb-2 line-clamp-2 font-semibold text-gray-900">{item.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-6 text-xs">
          <Link href={href} className="text-brand hover:text-brand-dark">
            業界・業種
          </Link>
          <span>{item.industry}</span>
        </div>
      </div>
    </article>
  );
}
