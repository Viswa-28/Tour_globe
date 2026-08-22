"use client";

import { useState } from "react";

/**
 * The strip under the hero, from the export: one line repeating behind an
 * infinite horizontal scroll, gold dot between repeats.
 *
 * Implementation notes (claude.md):
 * - CSS translateX only, `will-change: transform`, duplicated track for a
 *   seamless -50% loop.
 * - Pauses on hover and focus (CSS) and via an explicit control — an
 *   auto-scrolling strip with no stop is a WCAG 2.2.2 failure.
 * - Under prefers-reduced-motion the CSS turns it into static text and
 *   hides both the duplicate track and the pause button.
 */
const LINE =
  "You have entered a “Robot Free” zone, priding ourselves on a genuine human-human approach.";

const REPEATS_PER_TRACK = 2;

export function Marquee() {
  const [paused, setPaused] = useState(false);

  // Two identical tracks; the animation shifts by -50% so the second one
  // lands exactly where the first started.
  const track = (duplicate: boolean) => (
    <div
      aria-hidden={duplicate || undefined}
      className="marquee-track items-center"
    >
      {Array.from({ length: REPEATS_PER_TRACK }, (_, i) => (
        <span key={i} className="flex items-center gap-14 pr-14">
          <span className="italic text-on-navy">{LINE}</span>
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] flex-none rounded-full bg-gold"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-ground="dark"
      className="relative border-t border-on-navy/15 bg-navy/60 py-5 text-[clamp(16px,1.3vw,19px)] leading-relaxed"
    >
      <div className="marquee" data-paused={paused}>
        {track(false)}
        {track(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        className="marquee-pause absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-on-navy/25 bg-navy p-2 text-on-navy-mut hover:text-on-navy"
      >
        <span className="sr-only">
          {paused ? "Play scrolling message" : "Pause scrolling message"}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          {paused ? (
            <path d="M4 2l8 5-8 5V2z" fill="currentColor" />
          ) : (
            <path d="M3 2h3v10H3V2zm5 0h3v10H8V2z" fill="currentColor" />
          )}
        </svg>
      </button>
    </div>
  );
}
