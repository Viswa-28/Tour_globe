import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * AI search and assistant crawlers are named explicitly (2026-10-08, for
 * GEO — being cited in ChatGPT, Gemini, Perplexity, Claude and Google AI
 * Overviews). `*` already allowed them; naming them makes the intent
 * unambiguous and survives anyone later tightening the `*` rule.
 * Google-Extended and Applebot-Extended are the opt-in tokens for Gemini /
 * Apple Intelligence use; they do not crawl separately.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
