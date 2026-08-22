"use client";

import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { Marquee } from "@/components/Marquee";
import { COMPANY } from "@/lib/site";

/**
 * Hero — the only load animation on the site: the eyebrow fades, the two
 * headline lines rise out of their masks in a 70ms stagger, then the
 * paragraph and CTAs follow.
 *
 * Runs on Motion rather than GSAP. GSAP was carrying ~50KB for this one
 * sequence; Motion is already in the bundle for every other animation, so
 * the timeline was ported and GSAP dropped.
 *
 * Reduced motion: offsets collapse to zero so nothing travels, but the fade
 * still runs — a real fallback rather than a dead page. `m` comes from the
 * LazyMotion provider, so only the DOM feature set is loaded.
 *
 * Background: /public/images/hero.avif, re-encoded from the 1.9MB source PNG
 * (claude.md § Performance) and served through next/image.
 * TODO(client): image is AI-generated — replace with licensed photography
 * before launch, imageSource + imageLicence recorded.
 */

// Approximates GSAP's power3.out.
const EASE = [0.215, 0.61, 0.355, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  /** Start state for a masked headline line, a rising block, or a plain fade. */
  const from = (offset: string | number = 0) =>
    reduced ? { opacity: 0 } : { opacity: 0, y: offset };
  const to = { opacity: 1, y: 0 };

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
        <m.p
          className="eyebrow text-gold"
          initial={from()}
          animate={to}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Travel counselling &amp; consultancy · Madurai, Tamil Nadu
        </m.p>

        <h1 className="h1 mt-6 max-w-4xl">
          <span className="block overflow-hidden">
            <m.span
              className="block"
              initial={from("110%")}
              animate={to}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              Catapulting our focus
            </m.span>
          </span>
          <span className="block overflow-hidden">
            <m.span
              className="block"
              initial={from("110%")}
              animate={to}
              transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            >
              towards <em className="text-gold">Quality Tourism</em>
            </m.span>
          </span>
        </h1>

        <m.p
          className="body-copy mt-8 max-w-xl text-on-navy-mut"
          initial={from(20)}
          animate={to}
          transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
        >
          We at &ldquo;Tourglobe&rdquo; are a premium Tourism consultancy
          organization aiming on increasing exponentially Tourist income and
          outflow. Our focus is diversifying Tourist&rsquo;s interest towards
          concentrated Tourism areas
        </m.p>

        <m.div
          className="mt-10 flex flex-wrap gap-4"
          initial={from(20)}
          animate={to}
          transition={{ duration: 0.6, delay: 0.69, ease: EASE }}
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
        </m.div>
      </div>

      <Marquee />
    </section>
  );
}
