import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { SectionHeading } from "@/components/site/section";
import { services } from "@/content/home";

export function ServicesGrid() {
  return (
    <div className="bg-brand-soft/60 rounded-2xl px-4 py-8 md:px-8 md:py-10">
      <SectionHeading title={services.title} lead={services.lead} className="mb-8" />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {services.items.map((s) => (
          <li key={s.title} className="relative aspect-[10/7] overflow-hidden rounded-lg">
            <CdnImage
              path={s.image}
              alt={s.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="bg-brand absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white shadow">
              {s.title}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <CtaButton href={services.cta.href}>{services.cta.label}</CtaButton>
      </div>
    </div>
  );
}
