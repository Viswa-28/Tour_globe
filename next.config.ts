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
};

export default nextConfig;
