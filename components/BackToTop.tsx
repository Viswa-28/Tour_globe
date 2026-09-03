"use client";

import { useEffect, useState } from "react";

/**
 * Appears once the visitor has scrolled past the hero, disappears again near
 * the top. Conditionally rendered (not just hidden with CSS) so it's never a
 * stray, invisible tab-stop when not in use.
 *
 * Bottom-left, deliberately — WhatsAppButton owns bottom-right.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-on-navy shadow-lg transition-transform hover:scale-105 motion-reduce:hover:scale-100"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
