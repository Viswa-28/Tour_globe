import { CO_BRANDS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/**
 * Section 6 — Co-brands. Brown ground, the export's sister brands as a
 * divided row instead of one "·"-joined line, each an arrow-reveal link
 * (same hover/focus pattern as Services and PlaceCard).
 *
 * Text stays --cream throughout: --gold is only verified safe on --navy
 * (see Services.tsx), and this ground is --brown, so hover/focus brighten to
 * cream rather than reaching for gold on an unverified pairing.
 *
 * Client spelling "even-minded" is kept as written. claude.md reads it as a
 * typo for "like-minded" — flagged, not silently corrected.
 */
export function CoBrands() {
  return (
    <section
      aria-labelledby="cobrands-heading"
      data-ground="dark"
      className="bg-brown py-20 text-cream md:py-24"
    >
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-12 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="lg:flex-1">
          <h2 className="eyebrow text-cream/60" id="cobrands-heading">
            Our co-brands
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row">
            {CO_BRANDS.map((b, i) => (
              <div
                key={b.name}
                className={`py-6 sm:flex-1 sm:px-8 sm:py-0 ${
                  i > 0 ? "border-t border-cream/20 sm:border-t-0 sm:border-l" : "sm:pl-0"
                }`}
              >
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-[clamp(22px,2.4vw,30px)] italic leading-tight text-cream/90 transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                >
                  {b.name}
                  <span
                    aria-hidden="true"
                    className="opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:group-hover:translate-x-0"
                  >
                    →
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
        <p className="max-w-[300px] text-cream/80">
          We affectionately embrace even-minded people on our Team.
        </p>
      </Reveal>
    </section>
  );
}
