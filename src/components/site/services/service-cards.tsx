import Link from "next/link";
import { CdnImage } from "@/components/site/cdn-image";
import { serviceCards } from "@/content/services";

export function ServiceCards() {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {serviceCards.map((s, i) => {
        const body = (
          <>
            <div className="relative aspect-[16/10]">
              <CdnImage
                path={s.image}
                alt={s.title}
                fill
                priority={i < 3}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="bg-brand-dark px-4 py-3 text-center font-bold text-white">
              {s.title}
            </div>
          </>
        );
        const cls = "block overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5";
        return (
          <li key={s.title}>
            {s.detail ? (
              <Link href={`#${s.detail}`} className={cls}>
                {body}
              </Link>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
