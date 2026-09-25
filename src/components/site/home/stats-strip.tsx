import { stats } from "@/content/home";

export function StatsStrip() {
  return (
    <div className="bg-brand-soft rounded-xl p-4 md:p-6">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <dd className="text-accent-brand text-4xl font-extrabold md:text-5xl">{s.value}</dd>
            <dt className="mt-1 text-sm font-medium text-gray-700 md:text-base">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
