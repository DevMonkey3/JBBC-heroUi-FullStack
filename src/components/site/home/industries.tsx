import { CdnImage } from "@/components/site/cdn-image";
import { industries } from "@/content/home";

export function Industries() {
  return (
    <div className="rounded-xl border bg-white p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-1 text-base">{industries.kicker}</p>
          <h2 className="text-brand mb-3 text-xl font-bold md:text-2xl">{industries.title}</h2>
          <p className="text-sm md:text-base">{industries.lead}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
          {industries.items.map((it) => (
            <li key={it.title} className="overflow-hidden rounded-lg shadow-md">
              <div className="relative aspect-[4/3]">
                <CdnImage
                  path={it.image}
                  alt={it.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="bg-brand py-2 text-center text-base font-bold text-white md:text-lg">
                {it.title}
              </h3>
              <p className="bg-brand-soft min-h-[96px] p-3 text-sm text-gray-700 md:text-base">
                {it.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
