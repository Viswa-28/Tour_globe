"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Route-level error boundary. Next.js requires this to be a client
 * component and to sit inside the tree it protects, so Nav/Footer are
 * rendered here directly rather than inherited from layout.tsx.
 *
 * Never renders `error.message` or a stack trace — only a log line for
 * whoever is watching the server/browser console. Visitors get the same
 * calm, on-brand message regardless of what actually broke.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <>
      <Nav />
      <main
        data-ground="dark"
        className="flex min-h-[70vh] flex-col items-center justify-center bg-navy px-5 text-center text-on-navy"
      >
        <p className="eyebrow text-gold">Something went wrong</p>
        <h1 className="h2 mt-4">
          This page hit a <em className="text-gold">snag</em>
        </h1>
        <p className="mt-4 max-w-md text-on-navy-mut">
          Nothing you did caused this. Try again, or head back to the
          homepage — the rest of the site is unaffected.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-gold px-7 py-3 font-semibold text-navy transition-colors hover:bg-gold-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-on-navy-mut px-7 py-3 font-semibold text-on-navy transition-colors hover:border-on-navy"
          >
            Back to the homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
