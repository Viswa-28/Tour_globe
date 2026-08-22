import Link from "next/link";
import Image from "next/image";
import { formatDuration, type Place } from "@/lib/data";
import { getPlaceImage } from "@/lib/place-images";

/**
 * Destination card, ported from `Cultural Tourism.dc.html`:
 * country eyebrow → place name in Fraunces → itinerary line → a rule and the
 * nights/days footer pinned to the bottom. Every last card in a grid inverts
 * to navy, as the comp does with its Cairo tile.
 *
 * Departures from the comp:
 * - A 3:2 photograph sits above the text where one exists (see
 *   lib/place-images.ts). Themes with no artwork yet render the comp's
 *   original text-only card.
 * - The card is a link, not an inert <article>, so all 45 programmes are
 *   reachable and indexable (claude.md § Fix list).
 * - The comp's eyebrow is --gold, which measures 2.54:1 on cream and fails
 *   AA. On cream it becomes --gold-ink (5.26:1); on navy --gold is correct.
 *
 * `sizes` caps the request at ~400px: the source tiles were upscaled 2x from
 * ~500px and go soft above ~600px display width.
 */
export function PlaceCard({
  place,
  invert = false,
}: {
  place: Place;
  invert?: boolean;
}) {
  const duration = formatDuration(place.nights, place.days);
  const stops = place.itinerary.join(", ");
  const image = getPlaceImage(place);

  return (
    <Link
      href={`/product/${place.categorySlug}/${place.slug}`}
      data-ground={invert ? "dark" : undefined}
      className={`group flex min-h-[240px] w-full flex-col overflow-hidden border transition-[transform,border-color] duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
        invert
          ? "border-navy bg-navy hover:border-gold"
          : "border-[#E5DCD0] bg-cream hover:border-gold-ink"
      }`}
    >
      {image && (
        <div className="relative aspect-[3/2] overflow-hidden bg-sand-deep">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-7 pt-8">
        {place.country && (
          <span className={`eyebrow ${invert ? "text-gold" : "text-gold-ink"}`}>
            {place.country}
          </span>
        )}

        <h3
          className={`font-[family-name:var(--font-fraunces)] text-[34px] font-light leading-[1.06] tracking-[-0.01em] ${
            invert ? "text-on-navy" : "text-ink"
          }`}
        >
          {place.name}
        </h3>

        <p
          className={`text-[14.5px] leading-relaxed ${
            stops
              ? invert
                ? "text-on-navy-mut"
                : "text-ink-body"
              : invert
                ? "text-on-navy-mut/60"
                : "text-ink-body/55"
          }`}
        >
          {stops || "—"}
        </p>

        <span
          className={`mt-auto flex items-center justify-between gap-3 border-t pt-[18px] text-[13px] font-semibold tracking-[0.06em] ${
            invert ? "border-on-navy/20 text-gold" : "border-[#E5DCD0] text-brown"
          }`}
        >
          {duration}
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
