import { COMMITMENTS } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

/**
 * Section 5 — Paramount importance. Sand-deep ground, the export's seven
 * commitments, verbatim. Eyebrow and bullets use --gold-ink rather than
 * --gold: gold is a dark-ground colour only (claude.md non-negotiable #2).
 */
export function Commitments() {
  return (
    <section
      id="commitments"
      aria-labelledby="commitments-heading"
      className="bg-sand-deep py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-start gap-x-16 gap-y-10 px-5 md:px-8">
        <Reveal className="flex-[0_1_280px]">
          <p className="eyebrow text-brown">Paramount importance</p>
          <h2 id="commitments-heading" className="h2 mt-4 text-ink">
            Demand <em className="text-brown">Excellence</em>
          </h2>
        </Reveal>

        <Reveal className="flex-[1_1_440px]">
          <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <li
                key={c}
                className={`flex items-center gap-5 py-5 ${
                  i < COMMITMENTS.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] flex-none rounded-full bg-gold-ink"
                />
                <span className="font-semibold tracking-[0.02em] text-ink">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
