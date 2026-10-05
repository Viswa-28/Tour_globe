import Link from "next/link";
import { formatDuration } from "@/lib/data";
import { TOUR_RAJASTHAN, type RajasthanItinerary } from "@/lib/rajasthan-itineraries";

/**
 * Tour Rajasthan itinerary card — the text-only PlaceCard layout (eyebrow →
 * name → route → nights/days footer) so the brand section reads as part of
 * the same site. No photography: none was supplied with the itineraries.
 */
export function ItineraryCard({ tour }: { tour: RajasthanItinerary }) {
  return (
    <Link
      href={`${TOUR_RAJASTHAN.path}/${tour.slug}`}
      className="group flex min-h-[260px] w-full flex-col gap-5 border border-[#E5DCD0] bg-cream p-7 pt-8 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-gold-ink motion-reduce:hover:translate-y-0"
    >
      <span className="eyebrow text-gold-ink">{tour.days} days · Rajasthan</span>

      <h3 className="font-[family-name:var(--font-fraunces)] text-[30px] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
        {tour.name}
      </h3>

      <p className="text-[14.5px] leading-relaxed text-ink-body">
        {tour.route.join(" – ")}
      </p>

      <span className="mt-auto flex items-center justify-between gap-3 border-t border-[#E5DCD0] pt-[18px] text-[13px] font-semibold tracking-[0.06em] text-brown">
        {formatDuration(tour.nights, tour.days)}
        <span
          aria-hidden="true"
          className="opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          →
        </span>
      </span>
    </Link>
  );
}
