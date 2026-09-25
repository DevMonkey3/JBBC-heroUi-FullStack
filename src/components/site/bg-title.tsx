/**
 * Large pale English word behind a centred Japanese title, as used on the
 * old site's inner pages.
 */
export function BgTitle({ word, title }: { word: string; title: string }) {
  return (
    <div className="relative my-4 text-center md:my-6">
      <p
        aria-hidden
        className="leading-none font-bold text-[#f3f3f3] select-none"
        style={{ fontSize: "clamp(80px, 14vw, 200px)" }}
      >
        {word}
      </p>
      <h2 className="absolute inset-0 flex items-center justify-center px-2 text-2xl leading-tight font-bold text-[#4e4e4e] sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
