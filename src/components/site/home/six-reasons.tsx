import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { sixReasons } from "@/content/home";

export function SixReasons() {
  return (
    <div>
      <div className="mb-8 grid gap-6 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <p className="mb-1 text-base md:text-lg">{sixReasons.kicker}</p>
          <h2 className="text-2xl font-bold md:text-3xl">
            {sixReasons.title}
            <br />
            <span className="text-red-500">{sixReasons.highlight}</span>
          </h2>
        </div>
        <div className="space-y-3 text-base md:col-span-8 md:text-lg">
          {sixReasons.lead.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1">
          {sixReasons.items.map((r, i) => (
            <li key={r.title}>
              <span className="bg-brand-mid mb-2 inline-block rounded-r-2xl px-3 py-1 text-sm text-white shadow-md">
                Reason {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-bold md:text-lg">{r.title}</h3>
              <p className="text-sm text-gray-600 md:text-base">{r.description}</p>
            </li>
          ))}
        </ol>
        <div className="relative lg:col-span-5">
          <p
            aria-hidden
            className="text-[100px] leading-none font-bold text-white select-none md:text-[140px]"
          >
            Reason
          </p>
          <div className="relative -mt-8 aspect-[4/3] overflow-hidden rounded-tl-[60px] rounded-br-[60px] shadow-lg">
            <CdnImage
              path={sixReasons.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <CtaButton href={sixReasons.cta.href} size="lg">
          {sixReasons.cta.label}
        </CtaButton>
      </div>
    </div>
  );
}
