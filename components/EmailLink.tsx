"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A mailto: link that also copies the address on click.
 *
 * mailto: only does something if the visitor's browser/OS has a mail client
 * registered as the default handler — plenty of desktop visitors have none,
 * and clicking then does nothing at all, with no error and no feedback. This
 * keeps the mailto: attempt (so it still works instantly where a handler
 * exists) and adds a copy-to-clipboard fallback with a visible confirmation,
 * so every visitor gets *something* to happen when they click.
 */
export function EmailLink({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Clipboard permission denied or unavailable — the mailto: attempt
        // above already fired, so there's nothing more to fall back to.
      });
  };

  return (
    <>
      <a href={`mailto:${email}`} className={className} onClick={handleClick}>
        {email}
      </a>
      <span
        role="status"
        aria-live="polite"
        className={copied ? "ml-2 text-xs opacity-70" : ""}
      >
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}
