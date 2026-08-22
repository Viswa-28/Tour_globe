import Link from "next/link";
import { CATEGORIES, getPlacesForCategory } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

/**
 * Section 3 — Aspiration & focus. Sand ground, the export's 11 themes plus
 * "& Much more", laid out as a hairline grid (1px gaps over a rule-coloured
 * backing).
 *
 * Ported deliberately, not copied (claude.md § Fix list):
 * - Tiles are links, not <div>s.
 * - The 01–11 numbering is dropped — the order carries no meaning.
 * - The eyebrow is --brown, not --gold: gold on cream measures 2.54:1.
 * - Columns pinned 1 / 2 / 3 so the 12 cells never leave an orphan row.
 */
export function Themes() {
  return (
    <section
      id="themes"
      aria-labelledby="themes-heading"
      className="bg-sand py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-brown">Aspiration &amp; focus</p>
          <h2 id="themes-heading" className="h2 mt-4 max-w-3xl text-ink">
            Counselling, consulting, <em className="text-brown">curating</em>
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => {
              const count = getPlacesForCategory(c.slug).length;
              return (
                <li key={c.slug} className="bg-sand">
                  <Link
                    href={`/product/${c.slug}`}
                    className="group flex h-full items-center justify-between gap-4 px-6 py-7 transition-colors hover:bg-cream"
                  >
                    <span className="font-semibold text-ink">{c.name}</span>
                    <span className="flex items-center gap-3">
                      {count > 0 && (
                        <span className="text-[13px] font-semibold text-gold-ink">
                          {count}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="text-gold-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
            {/* Spans the row so 12 themes never leave an orphan cell. */}
            <li className="flex items-center bg-sand-deep px-6 py-7 md:col-span-2 lg:col-span-3">
              <span className="font-[family-name:var(--font-fraunces)] text-xl text-brown">
                &amp; Much more
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
