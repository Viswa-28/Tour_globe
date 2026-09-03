"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SiteSearch } from "@/components/SiteSearch";

/**
 * Header — logo, search, and a single CTA, as in the export.
 *
 * NOTE: claude.md non-negotiable #5 says "Nav must exist", treating the
 * export's lack of navigation as a defect to fix. The client asked for the
 * links removed (2026-08-22), so the export wins here. Wayfinding is carried
 * by the logo (→ home), the hero CTAs, the theme tiles, the breadcrumbs on
 * /product pages, and the footer. SiteSearch (added 2026-09-03) is a utility
 * control, not a link list, so it doesn't reopen that decision.
 *
 * Motion pattern 4 — nav background opacity on scroll, done as a CSS colour
 * transition rather than a JS animation.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Only the homepage opens on a dark hero. Everywhere else the page starts
  // on a light ground, so the header needs its navy fill from the top or the
  // white logo would sit invisible on cream.
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-ground="dark"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-5 py-4 md:px-8"
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-white.png"
            alt="Tourglobe — home"
            width={720}
            height={242}
            priority
            className="h-10 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:h-12"
          />
        </Link>

        <div className="flex items-center gap-2">
          <SiteSearch />
          <Link
            href="/#enquire"
            className="whitespace-nowrap rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-hover"
          >
            Enquire now
          </Link>
        </div>
      </nav>
    </header>
  );
}
