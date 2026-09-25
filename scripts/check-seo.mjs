import assert from "node:assert/strict";

// Check real, server-rendered HTTP responses. Run against `next start` or a deployment.
const base = new URL(process.argv[2] || "http://127.0.0.1:3100");
const locales = ["ka", "en", "ru", "ar", "tr", "ja"];
const pages = new Map();
const images = new Set();
const titles = new Set();
const descriptions = new Set();
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0]));
async function get(path) {
  const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${path}: blocked by header`);
  return response;
}

const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
assert.equal(urls.length, 42, "Sitemap must contain 6 homepages and 36 service pages");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const origin = new URL(urls[0]).origin;
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);

for (let start = 0; start < urls.length; start += 6) {
  await Promise.all(urls.slice(start, start + 6).map(async (url) => {
    const route = new URL(url);
    assert.equal(route.origin, origin);
    const html = await (await get(route.pathname)).text();
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
    assert(head, `${url}: missing head`);
    const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1] || "");
    const meta = tags(head, "meta");
    const description = meta.find((tag) => tag.name === "description")?.content;
    const links = tags(head, "link");
    assert(title && !titles.has(title), `${url}: missing or duplicate title`);
    assert(description && !descriptions.has(description), `${url}: missing or duplicate description`);
    titles.add(title); descriptions.add(description);
    assert.equal(links.filter((tag) => tag.rel === "canonical").length, 1, `${url}: canonical count`);
    assert.equal(links.find((tag) => tag.rel === "canonical")?.href, url, `${url}: canonical`);
    assert.equal(meta.find((tag) => tag.property === "og:url")?.content, url, `${url}: og:url`);
    assert.equal(meta.find((tag) => tag.property === "og:title")?.content, title, `${url}: og:title`);
    assert(meta.some((tag) => tag.name === "robots" && /index/.test(tag.content) && !/noindex/.test(tag.content)), `${url}: robots`);
    const image = meta.find((tag) => tag.property === "og:image")?.content;
    assert(image?.startsWith(origin), `${url}: share image origin`);
    images.add(image);
    const lang = route.pathname.split("/")[1];
    const suffix = route.pathname.split("/").slice(2).join("/");
    const htmlAttrs = tags(html, "html")[0];
    assert.equal(htmlAttrs.lang, lang, `${url}: html language`);
    assert.equal(htmlAttrs.dir, lang === "ar" ? "rtl" : "ltr", `${url}: direction`);
    assert.equal(tags(html, "h1").length, 1, `${url}: expected one H1`);
    for (const alternate of [...locales, "x-default"]) {
      const expected = `${origin}/${alternate === "x-default" ? "ru" : alternate}${suffix ? `/${suffix}` : ""}`;
      assert.equal(links.find((tag) => tag.hreflang === alternate)?.href, expected, `${url}: hreflang ${alternate}`);
      const entry = sitemapEntries[urls.indexOf(url)];
      assert(tags(entry, "xhtml:link").some((tag) => tag.hreflang === alternate && tag.href === expected), `${url}: sitemap hreflang ${alternate}`);
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.equal(schemas.length, 1, `${url}: structured data`);
    const graph = schemas[0]["@graph"];
    const webPage = graph.find((item) => item["@type"] === "WebPage");
    assert.equal(webPage?.url, url, `${url}: WebPage URL`);
    assert.equal(webPage?.inLanguage, lang, `${url}: WebPage language`);
    if (suffix) {
      assert.equal(graph.find((item) => item["@type"] === "Service")?.url, url, `${url}: service URL`);
      const crumbs = graph.find((item) => item["@type"] === "BreadcrumbList")?.itemListElement;
      assert.equal(crumbs?.[1]?.item, url, `${url}: breadcrumb`);
    } else {
      assert.equal(graph.find((item) => item["@type"] === "Person")?.hasCredential?.identifier, "A-1777", `${url}: valuer credential`);
      assert.equal(tags(html, "details").length, 6, `${url}: certification and 5 FAQs`);
    }
    pages.set(route.pathname, html);
  }));
}

// Check actual crawlable internal links, including anchors and reciprocal languages.
for (const [path, html] of pages) {
  for (const { href } of tags(html, "a")) {
    if (!href?.startsWith("/") && !href?.startsWith("#")) continue;
    const target = new URL(href, `${origin}${path}`);
    assert(pages.has(target.pathname), `${path}: unlisted internal destination ${href}`);
    if (target.hash) assert(tags(pages.get(target.pathname), "[a-z][a-z0-9]*").some((tag) => tag.id === target.hash.slice(1)), `${path}: broken fragment ${href}`);
  }
}
const queryHtml = await (await get("/ka/services/land-valuation?utm_source=seo-check")).text();
assert.equal(tags(queryHtml, "link").find((tag) => tag.rel === "canonical")?.href, `${origin}/ka/services/land-valuation`, "Tracking parameters must not enter canonicals");
const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots sitemap origin");
assert(!/^Disallow:\s*\/$/m.test(robots), "robots blocks the site");
for (const path of ["/ka/services/nonexistent-service", "/ka/nonexistent-page"]) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, `${path}: expected real 404`);
  assert(tags(await response.text(), "meta").some((tag) => tag.name === "robots" && /noindex/.test(tag.content)), `${path}: 404 must be noindex`);
}
for (const url of images) {
  const image = await get(new URL(url).pathname + new URL(url).search);
  assert(image.headers.get("content-type")?.startsWith("image/"), `${url}: invalid share image`);
  const bytes = Buffer.from(await image.arrayBuffer());
  assert(bytes.length > 1000 && bytes.subarray(1, 4).toString() === "PNG", `${url}: broken image body`);
}
console.log(`SEO checks passed: ${pages.size} pages, unique metadata, canonical URLs, reciprocal hreflang, schemas, internal links, FAQs, robots, query URLs, 404s and ${images.size} share images.`);
