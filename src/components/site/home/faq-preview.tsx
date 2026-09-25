import { CtaButton } from "@/components/site/cta-button";
import { faqPreview } from "@/content/home";

export function FaqPreview() {
  const f = faqPreview;
  return (
    <div>
      <p className="text-muted-foreground mb-5 text-center text-sm md:text-base">{f.eyebrow}</p>
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <span className="bg-accent-brand inline-block rounded-r-[40px] px-6 py-3 text-lg font-bold text-white md:px-8 md:text-xl">
          {f.badge}
        </span>
        <div className="grid gap-6 p-5 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">{f.title}</h2>
            <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">{f.body}</p>
            <CtaButton href={f.cta.href} size="lg">
              {f.cta.label}
            </CtaButton>
          </div>
          <ul className="space-y-3">
            {f.questions.map((q) => (
              <li
                key={q}
                className="border-brand/25 flex items-center gap-3 rounded-[20px] border-2 p-3"
              >
                <span className="bg-brand grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold text-white">
                  ?
                </span>
                <span className="text-base text-gray-800 md:text-lg">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
