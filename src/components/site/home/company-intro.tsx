import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { companyIntro } from "@/content/home";

export function CompanyIntro() {
  const c = companyIntro;
  return (
    <div>
      <div className="bg-brand-soft/70 rounded-tl-[60px] rounded-br-[60px] px-5 py-10 text-center md:px-10 md:py-14">
        <CtaButton href={c.badge.href} size="lg" arrow={false} className="mb-5">
          {c.badge.label}
        </CtaButton>
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">{c.title}</h2>
        <p className="mx-auto max-w-3xl text-left text-base leading-relaxed text-gray-700 md:text-lg">
          {c.body}
        </p>
      </div>

      <div className="relative z-10 -mt-8 grid items-center gap-6 px-2 md:-mt-12 md:grid-cols-12 md:px-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-tl-[60px] rounded-br-[60px] shadow-md md:col-span-5">
          <CdnImage
            path={c.compliance.image}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="md:col-span-7 md:pl-4">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">{c.compliance.title}</h2>
          <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
            {c.compliance.body}
          </p>
          <CtaButton href={c.compliance.cta.href} size="lg">
            {c.compliance.cta.label}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
