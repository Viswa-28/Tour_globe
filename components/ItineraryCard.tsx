import Link from "next/link";
import Image from "next/image";
import { formatDuration } from "@/lib/data";
import { TOUR_RAJASTHAN, type RajasthanItinerary } from "@/lib/rajasthan-itineraries";

/**
 * Tour Rajasthan itinerary card — the PlaceCard layout (photo → eyebrow →
 * name → route → footer) so the brand section matches the rest of the site.
 *
 * Client feedback 2026-10-08:
 * - Duration leads, zero-padded ("05 Nights / 06 Days"), instead of
 *   "6 days" — so the footer now reads "View itinerary" rather than
 *   repeating it.
 * - The last card in the grid inverts to navy, as on every theme page
 *   (PlaceCard's `invert`).
 *
 * Eyebrow colour follows the contrast rule: --gold-ink on cream, --gold
 * only on navy.
 */
export function ItineraryCard({
  tour,
  invert = false,
}: {
  tour: RajasthanItinerary;
  invert?: boolean;
}) {
  return (
    <Link
      href={`${TOUR_RAJASTHAN.path}/${tour.slug}`}
      data-ground={invert ? "dark" : undefined}
      className={`group flex min-h-[260px] w-full flex-col overflow-hidden border transition-[transform,border-color] duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
        invert
          ? "border-navy bg-navy hover:border-gold"
          : "border-[#E5DCD0] bg-cream hover:border-gold-ink"
      }`}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-sand-deep">
        <Image
          src={tour.image.src}
          alt={tour.image.alt}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-7 pt-8">
        <span className={`eyebrow ${invert ? "text-gold" : "text-gold-ink"}`}>
          {formatDuration(tour.nights, tour.days)}
        </span>

        <h3
          className={`font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-[1.08] tracking-[-0.01em] ${
            invert ? "text-on-navy" : "text-ink"
          }`}
        >
          {tour.name}
        </h3>

        <p
          className={`text-[14.5px] leading-relaxed ${
            invert ? "text-on-navy-mut" : "text-ink-body"
          }`}
        >
          {tour.route.join(" – ")}
        </p>

        <span
          className={`mt-auto flex items-center justify-between gap-3 border-t pt-[18px] text-[13px] font-semibold tracking-[0.06em] ${
            invert ? "border-on-navy/20 text-gold" : "border-[#E5DCD0] text-brown"
          }`}
        >
          View itinerary
          <span
            aria-hidden="true"
            className="opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
