import { CdnImage } from "@/components/site/cdn-image";
import { industries } from "@/content/services";

/** Static picture grid. No links or hover effects until case data exists. */
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
          <li key={it.title} className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <CdnImage
              path={it.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-2.5">
              <span className="font-bold text-white">{it.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
