import { Check } from "lucide-react";
import { CdnImage } from "@/components/site/cdn-image";
import { CtaButton } from "@/components/site/cta-button";
import { SectionHeading } from "@/components/site/section";
import { ClientLogos } from "@/components/site/home/client-logos";
import { achievements, sixPoints } from "@/content/home";

export function Achievements() {
  return (
    <div>
      <SectionHeading title={achievements.title} lead={achievements.lead} className="mb-6" />

      <div className="bg-brand-soft rounded-2xl p-4 md:p-6">
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {achievements.items.map((a) => (
            <li key={a.industry} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg">
                <CdnImage
                  path={a.image}
                  alt={a.industry}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <dl className="space-y-1.5 text-sm md:text-base">
                <Row label={achievements.labels.industry} value={a.industry} />
                <Row label={achievements.labels.department} value={a.department} />
                <Row label={achievements.labels.employees} value={a.employees} />
              </dl>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <CtaButton href={achievements.cta.href}>{achievements.cta.label}</CtaButton>
        </div>
      </div>

      <ClientLogos className="mt-10" />

      <div className="bg-brand-soft/70 mt-10 rounded-2xl p-5 md:p-8">
        <div className="grid items-center gap-6 md:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-4">
            <CdnImage
              path={sixPoints.image}
              alt="ポイント図解"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-accent-brand text-6xl leading-none font-bold md:text-7xl">
                {sixPoints.number}
              </span>
              <div>
                <p className="text-accent-brand text-lg font-semibold md:text-xl">
                  {sixPoints.kicker}
                </p>
                <p className="text-2xl font-bold md:text-3xl">{sixPoints.title}</p>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {sixPoints.items.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="bg-accent-brand mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white">
                    <Check className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700 md:text-base">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-brand shrink-0 font-semibold">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
