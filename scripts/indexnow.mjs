/**
 * IndexNow ping — tells Bing (which ChatGPT search uses), Yandex, Seznam
 * and other IndexNow engines that the site's pages have changed, instead
 * of waiting for them to recrawl. Google does not use IndexNow; Search
 * Console covers Google.
 *
 * Run AFTER a production deploy is live:   npm run indexnow
 *
 * It reads the LIVE sitemap, so it always submits exactly what is deployed.
 * The key below is public by design: IndexNow proves ownership by fetching
 * https://www.tourglobe.in/<key>.txt, which lives in public/.
 */
const HOST = "www.tourglobe.in";
const KEY = "bdefb96845dcdd899846518841257fe6";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned ${r.status}`);
  return r.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("No URLs found in sitemap.xml");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted pending key verification (normal on the
// first run). Anything else is a real problem.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs submitted`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
