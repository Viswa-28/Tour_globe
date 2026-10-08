import type { NextConfig } from "next";

/**
 * claude.md specifies `output: 'export'` AND a POST Route Handler for the
 * enquiry form. Those are mutually exclusive — static export cannot run POST
 * handlers. The form is the site's only conversion, so we keep it: every page
 * is still fully static (SSG, verified by `dynamic = "error"` on each page),
 * and on Vercel they are served as static HTML from the CDN exactly as an
 * export would be. Only /api/enquiry runs as a function.
 *
 * If the form ever moves to an external endpoint, re-enable:
 *   output: "export",
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Lint in CI and locally (`npm run lint`), not inside `next build`.
   * The build-time lint pass pulls in eslint-config-next's native resolver
   * (`unrs-resolver`), whose postinstall script npm 11 now blocks by default
   * — one of the two blocked scripts in the Vercel log. Keeping ESLint out of
   * the deploy path removes that dependency and shortens the build.
   */
  eslint: { ignoreDuringBuilds: true },

  /**
   * Security headers on every response (audit 2026-10-08 — there were
   * none). The CSP is deliberately limited to directives that cannot break
   * the page: it blocks framing (clickjacking), plugins, <base> hijacking
   * and off-site form posts, but does not restrict scripts/styles — Next's
   * inline hydration scripts and the static JSON-LD would need nonces or
   * hashes first. Tighten to a full script-src policy later if wanted.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },

  /**
   * Theme slugs changed on 2026-08-24: "Pilgrimage Tourism" was renamed, and
   * "Wellness" and "Yoga" were merged. `dynamicParams = false` makes the old
   * paths hard 404s, so redirect them — cheap insurance for any preview link
   * or sitemap submission that already pointed at them.
   */
  async redirects() {
    return [
      {
        source: "/product/pilgrimage-tourism",
        destination: "/product/pilgrimage-divine",
        permanent: true,
      },
      {
        source: "/product/pilgrimage-tourism/:place",
        destination: "/product/pilgrimage-divine/:place",
        permanent: true,
      },
      {
        source: "/product/wellness",
        destination: "/product/wellness-yoga",
        permanent: true,
      },
      {
        source: "/product/yoga",
        destination: "/product/wellness-yoga",
        permanent: true,
      },
      {
        source: "/product/architectural-significance",
        destination: "/",
        permanent: true,
      },
      {
        source: "/product/astrology-natural-science",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
