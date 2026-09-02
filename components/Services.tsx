import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

/**
 * Section 4 — What we handle. Navy ground, the export's 8 services.
 *
 * Layout: the heading and CTA stick while the services travel up past them.
 * That is plain `position: sticky` rather than a scroll-driven animation, so
 * it works in every browser, never hijacks the scroll, and costs no JS. Each
 * row rises in on its own as it arrives, via the CSS scroll timeline in
 * Reveal.
 *
 * Sticky is disabled below 768px — claude.md sets that as the pinning
 * boundary, and on a phone the column would just sit in the way.
 *
 * The grid must keep its default `align-items: stretch`: the sticky element
 * can only travel inside a parent taller than itself, and `items-start`
 * would collapse the column to its content height and kill the effect.
 *
 * Gold is safe here — the ground is dark (6.16:1). The 01–08 numbering is
 * dropped, and the export supplies no service descriptions, so none are
 * invented (claude.md non-negotiable #1).
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      data-ground="dark"
      className="bg-navy py-24 text-on-navy"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          {/* Pinned column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 id="services-heading" className="h2">
                What we <em className="text-gold">handle</em>
              </h2>
              <Link
                href="/#enquire"
                className="eyebrow mt-8 inline-block border-b border-gold pb-1 text-gold transition-colors hover:text-gold-hover"
              >
                Enquire about a programme
              </Link>
            </div>
          </div>

          {/* Travelling column */}
          <ul className="md:col-span-7 lg:col-span-8">
            {SERVICES.map((s) => (
              <li key={s.name}>
                <Reveal>
                  <Link
                    href="/#enquire"
                    className="group flex items-center justify-between gap-6 border-b border-on-navy/15 py-7 transition-colors hover:border-gold"
                  >
                    <span className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2 motion-reduce:group-hover:translate-x-0">
                      <span className="font-[family-name:var(--font-fraunces)] text-[clamp(22px,2.2vw,30px)] font-semibold leading-tight">
                        {s.name}
                        <span className="sr-only"> — enquire</span>
                      </span>
                      {s.expansion && (
                        <span className="text-sm text-on-navy-mut">{s.expansion}</span>
                      )}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex-none text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
