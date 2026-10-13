"use client";

import { useState } from "react";

/**
 * Office map — click-to-load (client request 2026-10-13).
 *
 * Why not a plain Google Maps iframe: it pulls ~1MB of Google script on
 * every page view and sets Google cookies, which would break the Privacy
 * Policy's "this website sets no cookies" and slow every page's footer.
 * So nothing from Google loads until the visitor asks for the map.
 *
 * The pin is NOT COMPANY.geo: those "verified" coordinates (9.9252,
 * 78.1198) are central Madurai, ~8 km east of the office. Searching the
 * street address failed the same way (Google fell back to the city
 * centre, 2026-10-13). So the pin is SVN College on Theni Main Road
 * (OpenStreetMap: 9.9349, 78.0445) — the office is "Opp. SVN College".
 * TODO(client): replace with the exact office pin, or the Google Business
 * Profile place, once supplied.
 */
const OFFICE_PIN = "9.9349,78.0445";
const MAP_QUERY = OFFICE_PIN;

const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mt-6">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-on-navy/15 bg-navy-soft">
        {loaded ? (
          <iframe
            src={EMBED_URL}
            title="Map showing the Tourglobe office in Nagamalaipudukottai, Madurai"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-on-navy"
          >
            {/* Faint street-grid pattern so the placeholder reads as "map". */}
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--on-navy)_1px,transparent_1px),linear-gradient(90deg,var(--on-navy)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <svg
              aria-hidden="true"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="relative text-gold transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <span className="relative rounded-full border border-on-navy/30 px-4 py-1.5 text-sm font-semibold transition-colors group-hover:border-gold group-hover:text-gold">
              Show map
            </span>
            <span className="relative text-xs text-on-navy-mut">
              Loads Google Maps
            </span>
          </button>
        )}
      </div>
      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener"
        className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold-link underline-offset-4 hover:underline"
      >
        Open in Google Maps
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
