"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Smooth scroll — desktop only (>= 1024px, fine pointer) and never under
 * prefers-reduced-motion. Native momentum is better on touch.
 *
 * The `lenis` package is dynamically imported rather than statically, so its
 * JS is never fetched or parsed at all for the majority of visitors (mobile,
 * touch, reduced-motion) who bail out of the media query below — it only
 * loads for the desktop visitors who actually use it.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const wantsSmooth = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!wantsSmooth.matches) return;

    let lenis: Lenis | undefined;
    let frame: number;
    let cancelled = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor();
      const raf = (time: number) => {
        lenis!.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
