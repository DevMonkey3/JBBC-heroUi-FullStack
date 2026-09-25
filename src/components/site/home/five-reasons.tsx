import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { fiveReasons } from "@/content/home";

export function FiveReasons() {
  return (
    <div className="rounded-2xl bg-white px-5 py-8 shadow-lg ring-1 ring-black/5 md:px-10 md:py-12">
      <header className="mb-8 space-y-2 text-center md:mb-10">
        <p className="text-lg text-gray-800 md:text-xl">{fiveReasons.kicker}</p>
        <h2 className="text-brand text-3xl leading-tight font-extrabold md:text-5xl">
          {fiveReasons.title}
        </h2>
        <p className="text-base text-gray-700 md:text-lg">{fiveReasons.lead}</p>
      </header>

      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <ol className="space-y-5">
            {fiveReasons.items.map((r, i) => (
              <li key={r.title} className="flex items-start gap-4">
                <span className="bg-brand-mid grid size-10 shrink-0 place-items-center rounded-full text-lg font-bold text-white md:size-12 md:text-xl">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-bold md:text-xl">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {r.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-7 text-center md:text-right">
            <CtaButton href={fiveReasons.cta.href} size="lg" arrow={false}>
              {fiveReasons.cta.label}
            </CtaButton>
          </div>
        </div>
        <div className="relative h-[280px] md:col-span-5 md:h-[400px]">
          <CdnImage
            path={fiveReasons.image}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-contain object-left-bottom"
          />
        </div>
      </div>
    </div>
  );
}
