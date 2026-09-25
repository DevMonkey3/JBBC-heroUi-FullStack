import { CdnImg } from "@/components/site/cdn-img";
import { Marquee } from "@/components/site/marquee";
import { clientLogos } from "@/content/home";
import { cn } from "@/lib/utils";

/** Pure CSS marquee: the list is rendered twice and the track scrolls by half. */
export function ClientLogos({ className }: { className?: string }) {
  const doubled = [...clientLogos.items, ...clientLogos.items];
  return (
    <div className={cn("text-center", className)}>
      <h2 className="mb-5 text-xl font-bold md:text-2xl">{clientLogos.title}</h2>
      <div className="overflow-hidden bg-white py-3 shadow-sm">
        <Marquee className="flex w-max items-center gap-10 md:gap-12">
          {doubled.map((path, i) => (
            <CdnImg
              key={`${path}-${i}`}
              path={path}
              alt={i < clientLogos.items.length ? `企業ロゴ ${i + 1}` : ""}
              aria-hidden={i >= clientLogos.items.length}
              height={56}
              className="h-11 w-auto object-contain opacity-90 md:h-14"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
