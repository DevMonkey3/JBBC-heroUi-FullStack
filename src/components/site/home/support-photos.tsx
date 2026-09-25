import { CdnImage } from "@/components/site/cdn-image";
import { support } from "@/content/home";

export function SupportPhotos() {
  return (
    <div className="relative">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-5 z-0 text-center text-[clamp(2rem,8vw,4.5rem)] font-bold tracking-wide text-white/75 drop-shadow-sm select-none md:-top-6"
      >
        {support.word}
      </p>
      <div className="relative z-10 grid gap-3 sm:grid-cols-2 md:gap-4">
        {support.images.map((path, i) => (
          <div
            key={path}
            className={
              i === 0
                ? "relative h-[220px] overflow-hidden rounded-2xl md:h-[300px]"
                : "relative h-[220px] overflow-hidden rounded-2xl rounded-t-none rounded-br-[60px] md:h-[300px]"
            }
          >
            <CdnImage
              path={path}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
