import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/**
 * Native <details> accordion: no JavaScript, keyboard accessible, and the
 * answers are in the HTML for search engines.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="border-brand/30 flex cursor-pointer list-none items-center gap-3 rounded-full border bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md [&::-webkit-details-marker]:hidden">
            <span className="bg-brand-dark grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white">
              Q
            </span>
            <span className="flex-1 text-left text-base font-medium text-gray-800 md:text-lg">
              {item.q}
            </span>
            <Plus
              className="text-brand-dark size-5 shrink-0 transition-transform group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <div className="mt-2 flex items-start gap-3 rounded-2xl bg-gray-50 px-4 py-4 md:px-5">
            <span className="bg-brand-dark mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white">
              A
            </span>
            <div className="text-base leading-relaxed text-gray-700">
              <p>{item.a}</p>
              {item.bullets && (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
