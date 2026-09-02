import { CO_BRANDS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/**
 * Section 6 — Our brands. Brown ground, the export's sister brands (plus one
 * unlinked specialization credential) as a divided row instead of one
 * "·"-joined line, each linked entry an arrow-reveal link (same hover/focus
 * pattern as Services and PlaceCard).
 *
 * Text stays --cream throughout: --gold is only verified safe on --navy
 * (see Services.tsx), and this ground is --brown, so hover/focus brighten to
 * cream rather than reaching for gold on an unverified pairing.
 */
export function CoBrands() {
  return (
    <section
      aria-labelledby="cobrands-heading"
      data-ground="dark"
      className="bg-brown py-20 text-cream md:py-24"
    >
      <Reveal className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="eyebrow text-cream/60" id="cobrands-heading">
          Our brands
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap">
          {CO_BRANDS.map((b, i) => (
            <div
              key={b.name}
              className={`py-6 sm:py-0 sm:pr-8 ${
                i > 0 ? "border-t border-cream/20 sm:border-t-0 sm:border-l sm:pl-8" : ""
              }`}
            >
              {b.url ? (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight text-cream/90 transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                >
                  {b.name}
                  <span
                    aria-hidden="true"
                    className="opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:group-hover:translate-x-0"
                  >
                    →
                  </span>
                </a>
              ) : (
                <span className="font-[family-name:var(--font-fraunces)] text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight text-cream/90">
                  {b.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
