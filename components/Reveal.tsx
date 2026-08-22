import type { CSSProperties } from "react";

/**
 * Animation pattern 1 — scroll reveal: 24px rise + fade.
 *
 * There is deliberately no JavaScript here. The whole effect lives in
 * `[data-reveal]` in globals.css, driven by a CSS scroll timeline, so:
 *
 * - the content is visible on the first painted frame and can never be left
 *   hidden by slow hydration, a failed bundle, or a missed observer;
 * - it costs nothing in the client bundle — this is a server component;
 * - `prefers-reduced-motion` and unsupported browsers fall back to plain
 *   visible content via CSS, with no JS branch to get wrong.
 *
 * `stagger` shifts an item's scroll range slightly so a row of cards rises
 * left-to-right rather than all at once. Pass the column index.
 */
export function Reveal({
  children,
  className,
  stagger = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shift = Math.min(Math.max(stagger, 0), 3) * 2;

  return (
    <div
      data-reveal
      className={className}
      style={
        shift
          ? ({
              "--reveal-from": `${shift}%`,
              "--reveal-to": `${18 + shift}%`,
            } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
