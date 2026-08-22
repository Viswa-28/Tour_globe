import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Marquee } from "@/components/Marquee";
import { COMPANY } from "@/lib/site";

/**
 * Hero — the only load animation on the site: the eyebrow fades, the two
 * headline lines rise out of their masks 70ms apart, then the paragraph and
 * CTAs follow.
 *
 * There is no JavaScript here. The sequence is CSS keyframes on
 * `[data-hero]` (see globals.css), so it begins on the first painted frame
 * rather than waiting for React. This was a Motion timeline, which shipped
 * all five elements as `opacity: 0` — including the `<h1>`, the landing
 * page's LCP element — leaving the hero blank until hydration finished.
 * That is seconds against the dev server and a bad LCP on a slow connection.
 *
 * Being JS-free also makes this a server component, so none of it reaches
 * the client bundle.
 *
 * Background: /public/images/hero.avif, re-encoded from the 1.9MB source PNG
 * (claude.md § Performance) and served through next/image.
 * TODO(client): image is AI-generated — replace with licensed photography
 * before launch, imageSource + imageLicence recorded.
 */

/** Stagger, as a CSS custom property the keyframes read. */
const delay = (seconds: number) =>
  ({ "--hero-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      data-ground="dark"
      className="relative flex flex-col justify-end overflow-hidden bg-navy text-on-navy"
      style={{ minHeight: "min(94vh, 980px)" }}
    >
      <Image
        src="/images/hero.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility overlay — text sits on the darkened left side */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(15,30,46,0.88) 0%, rgba(15,30,46,0.55) 45%, rgba(15,30,46,0.25) 100%), linear-gradient(to top, rgba(15,30,46,0.85) 0%, rgba(15,30,46,0) 40%)",
        }}
      />
      {/* pt clears the fixed header (~72px mobile / ~80px desktop) with room
          to spare; keeping it tight stops the headline overflowing the 94vh
          hero and sliding under the header on laptop-height viewports. */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
        <p data-hero="eyebrow" className="eyebrow text-gold">
          Travel counselling &amp; consultancy · Madurai, Tamil Nadu
        </p>

        <h1 className="h1 mt-6 max-w-4xl">
          <span className="block overflow-hidden">
            <span data-hero="line" className="block" style={delay(0.15)}>
              Catapulting our focus
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero="line" className="block" style={delay(0.22)}>
              towards <em className="text-gold">Quality Tourism</em>
            </span>
          </span>
        </h1>

        <p
          data-hero="rise"
          className="body-copy mt-8 max-w-xl text-on-navy-mut"
          style={delay(0.45)}
        >
          We at &ldquo;Tourglobe&rdquo; are a premium Tourism consultancy
          organization aiming on increasing exponentially Tourist income and
          outflow. Our focus is diversifying Tourist&rsquo;s interest towards
          concentrated Tourism areas
        </p>

        <div
          data-hero="rise"
          className="mt-10 flex flex-wrap gap-4"
          style={delay(0.52)}
        >
          <Link
            href="/#enquire"
            className="rounded-full bg-gold px-7 py-3 font-semibold text-navy transition-colors hover:bg-gold-hover"
          >
            Plan my journey
          </Link>
          <a
            href={`mailto:${COMPANY.email}`}
            className="rounded-full border border-on-navy-mut px-7 py-3 font-semibold text-on-navy transition-colors hover:border-on-navy"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
