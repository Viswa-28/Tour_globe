"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll — desktop only (>= 1024px, fine pointer) and never under
 * prefers-reduced-motion. Native momentum is better on touch.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const wantsSmooth = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!wantsSmooth.matches) return;

    const lenis = new Lenis();
    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
