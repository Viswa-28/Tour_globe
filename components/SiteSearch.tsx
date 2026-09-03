"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { searchSite } from "@/lib/search";

/**
 * Search icon button + modal overlay. Client-side only — the catalogue is
 * ~120 entries (places + categories), so a fetch/index service would be
 * overkill.
 *
 * Motion pattern 3 (tab/panel change) — crossfade + rise, offset collapsed
 * under prefers-reduced-motion per claude.md's animation hard rules.
 */
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  const results = searchSite(query);
  const trimmed = query.trim();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search destinations"
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-on-navy transition-colors hover:bg-on-navy/10"
      >
        <SearchIcon />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            role="presentation"
            className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/80 px-5 pt-24 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Search destinations"
              className="w-full max-w-lg rounded-2xl bg-cream shadow-2xl"
              initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
                <span className="flex-none text-ink-body/60" aria-hidden="true">
                  <SearchIcon size={18} />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations or categories"
                  className="w-full bg-transparent text-ink outline-none placeholder:text-ink-body/50"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="flex-none text-ink-body/60 hover:text-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {trimmed.length > 0 && results.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-ink-body/70">
                    No matches for &ldquo;{trimmed}&rdquo;
                  </p>
                )}
                {trimmed.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-ink-body/70">
                    Type to search destinations and categories.
                  </p>
                )}
                <ul>
                  {results.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 hover:bg-sand"
                      >
                        <span className="font-semibold text-ink">{r.title}</span>
                        <span className="flex-none text-xs uppercase tracking-[0.06em] text-ink-body/60">
                          {r.subtitle}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
