import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

/**
 * Section 4 — What we handle. Navy ground, the export's 8 services.
 * Gold is safe here: the ground is dark (6.16:1).
 * The 01–08 numbering is dropped, and the export supplies no descriptions,
 * so none are invented (claude.md non-negotiable #1).
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
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="services-heading" className="h2">
              What we <em className="text-gold">handle</em>
            </h2>
            <Link
              href="/#enquire"
              className="eyebrow border-b border-gold pb-1 text-gold transition-colors hover:text-gold-hover"
            >
              Enquire about a programme
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="grid grid-cols-1 gap-px bg-on-navy/15 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <li
                key={s.name}
                className="bg-navy px-6 py-9 transition-colors hover:bg-navy-soft"
              >
                <span className="text-lg font-semibold">{s.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
