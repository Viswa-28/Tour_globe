import { CO_BRANDS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/**
 * Section 6 — Co-brands. Brown ground, the export's three sister brands on
 * one line with the team note alongside.
 *
 * Client spelling "even-minded" is kept as written. claude.md reads it as a
 * typo for "like-minded" — flagged, not silently corrected.
 */
export function CoBrands() {
  return (
    <section
      aria-labelledby="cobrands-heading"
      data-ground="dark"
      className="bg-brown py-20 text-cream"
    >
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-5 md:px-8">
        <div>
          <p className="eyebrow text-cream/70">Our co brands</p>
          <h2
            id="cobrands-heading"
            className="mt-3 font-[family-name:var(--font-fraunces)] text-[clamp(26px,3vw,38px)] leading-tight"
          >
            {CO_BRANDS.map((b, i) => (
              <span key={b.name}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                {b.url ? (
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener"
                    className="underline-offset-8 hover:underline"
                  >
                    {b.name}
                  </a>
                ) : (
                  b.name
                )}
              </span>
            ))}
          </h2>
        </div>
        <p className="max-w-[300px] text-cream/80">
          We affectionately embrace even-minded people on our Team.
        </p>
      </Reveal>
    </section>
  );
}
