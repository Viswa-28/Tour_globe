/**
 * Sanity schema entry point. These schemas are ready to drop into a Sanity
 * Studio (`npx sanity dev`) once the client's Sanity project exists — import
 * `schemaTypes` in sanity.config.ts. The `sanity` package is intentionally
 * not installed in this repo yet; the Studio should live in its own
 * workspace or be added when the project ID is available.
 */
export { place } from "./place";
export { category } from "./category";
export { service } from "./service";

import { place } from "./place";
import { category } from "./category";
import { service } from "./service";

export const schemaTypes = [place, category, service];
