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
