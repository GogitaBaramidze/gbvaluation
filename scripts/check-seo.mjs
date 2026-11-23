import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Check real, server-rendered HTTP responses. Run against `next start` or a deployment.
const base = new URL(process.argv[2] || "http://127.0.0.1:3100");
const locales = ["ka", "en", "ru", "ar", "tr", "ja"];
const pages = new Map();
const images = new Set();
const titles = new Set();
const descriptions = new Set();
const articleContent = JSON.parse(await readFile(new URL("../src/content/articles/ka.json", import.meta.url), "utf8"));
const articles = Array.isArray(articleContent) ? articleContent : articleContent.articles;
assert(Array.isArray(articles) && articles.length > 0, "Published Georgian articles are required");
assert(articles.every((article) => typeof article.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)), "Articles need valid URL slugs");
assert.equal(new Set(articles.map((article) => article.slug)).size, articles.length, "Duplicate article slugs");
const articlePaths = articles.map((article) => `/ka/articles/${article.slug}`);
const extraServiceSlugs = ["property-measurement", "business-valuation"];
const extraServicePaths = extraServiceSlugs.map((slug) => `/ka/services/${slug}`);
const georgianOnlyPaths = new Set(["/ka/articles", ...articlePaths, ...extraServicePaths]);
const legacyServiceSlugs = ["residential-property-valuation", "commercial-property-valuation", "industrial-property-valuation", "land-valuation", "business-asset-valuation", "valuation-for-legal-proceedings"];
const expectedPaths = new Set([
  ...locales.flatMap((locale) => [`/${locale}`, ...legacyServiceSlugs.map((slug) => `/${locale}/services/${slug}`)]),
  ...georgianOnlyPaths,
]);
const publicationDate = "2026-11-23";
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0]));
const hasType = (item, type) => [item?.["@type"]].flat().includes(type);
const plainText = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
async function get(path) {
  const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${path}: blocked by header`);
  return response;
}

const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
assert.equal(urls.length, expectedPaths.size, "Sitemap must contain the 42 existing pages, the Georgian article index, published articles and two additional services");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const origin = new URL(urls[0]).origin;
assert.deepEqual(new Set(urls.map((url) => new URL(url).pathname)), expectedPaths, "Sitemap must list exactly the published routes");
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
    const isGeorgianOnly = georgianOnlyPaths.has(route.pathname);
    const expectedLanguages = isGeorgianOnly ? ["ka"] : [...locales, "x-default"];
    const languageLinks = links.filter((tag) => tag.hreflang);
    const entry = sitemapEntries[urls.indexOf(url)];
    const sitemapLanguageLinks = tags(entry, "xhtml:link");
    assert.deepEqual(languageLinks.map((tag) => tag.hreflang).sort(), [...expectedLanguages].sort(), `${url}: unexpected or duplicate hreflang`);
    assert.deepEqual(sitemapLanguageLinks.map((tag) => tag.hreflang).sort(), [...expectedLanguages].sort(), `${url}: unexpected or duplicate sitemap hreflang`);
    for (const alternate of expectedLanguages) {
      const expected = `${origin}/${alternate === "x-default" ? "ru" : alternate}${suffix ? `/${suffix}` : ""}`;
      assert.equal(links.find((tag) => tag.hreflang === alternate)?.href, expected, `${url}: hreflang ${alternate}`);
      assert(sitemapLanguageLinks.some((tag) => tag.hreflang === alternate && tag.href === expected), `${url}: sitemap hreflang ${alternate}`);
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.equal(schemas.length, 1, `${url}: structured data`);
    const graph = schemas[0]["@graph"];
    assert(Array.isArray(graph), `${url}: structured data graph`);
    const webPage = graph.find((item) => hasType(item, "WebPage"));
    assert.equal(webPage?.url, url, `${url}: WebPage URL`);
    assert.equal(webPage?.inLanguage, lang, `${url}: WebPage language`);
    if (suffix) {
      const crumbs = graph.find((item) => hasType(item, "BreadcrumbList"))?.itemListElement;
      const isArticle = articlePaths.includes(route.pathname);
      const expectedCrumbPaths = isArticle ? ["/ka", "/ka/articles", route.pathname] : [`/${lang}`, route.pathname];
      assert.equal(crumbs?.length, expectedCrumbPaths.length, `${url}: breadcrumb count`);
      expectedCrumbPaths.forEach((path, index) => {
        assert.equal(crumbs[index].position, index + 1, `${url}: breadcrumb position`);
        assert.equal(crumbs[index].item, `${origin}${path}`, `${url}: breadcrumb URL`);
      });
      if (isArticle) {
        const article = graph.find((item) => hasType(item, "Article"));
        assert(article, `${url}: missing Article schema`);
        assert.equal(article.url, url, `${url}: Article URL`);
        assert.equal(article.inLanguage, "ka", `${url}: Article language`);
        assert.equal(article.datePublished?.slice(0, 10), publicationDate, `${url}: Article publication date`);
        assert.equal(article.headline, plainText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || ""), `${url}: Article headline must match visible H1`);
        const author = [article.author].flat().find((item) => item?.name === "GB Valuation" || (item?.["@id"] && graph.some((node) => node["@id"] === item["@id"] && node.name === "GB Valuation")));
        assert(author, `${url}: Article author must identify GB Valuation`);
        const visibleTime = [...html.matchAll(/<time\b([^>]*)>([\s\S]*?)<\/time>/gi)].find((match) => attrs(`<time ${match[1]}>`).datetime?.slice(0, 10) === publicationDate && plainText(match[2]));
        assert(visibleTime, `${url}: publication date must be visible in a time element`);
        assert.equal(meta.find((tag) => tag.property === "og:type")?.content, "article", `${url}: article Open Graph type`);
      } else if (route.pathname === "/ka/articles") {
        const collection = graph.find((item) => hasType(item, "CollectionPage"));
        assert.equal(collection?.url, url, `${url}: CollectionPage URL`);
      } else {
        assert.equal(graph.find((item) => hasType(item, "Service"))?.url, url, `${url}: service URL`);
      }
    } else {
      assert.equal(graph.find((item) => item["@type"] === "Person")?.hasCredential?.identifier, "A-1777", `${url}: valuer credential`);
      assert.equal(tags(html, "details").length, 6, `${url}: certification and 5 FAQs`);
    }
    if (isGeorgianOnly) {
      for (const locale of locales.filter((item) => item !== "ka")) {
        const switchLinks = tags(html, "a").filter((tag) => tag.hreflang === locale);
        assert(switchLinks.length > 0, `${url}: missing ${locale} language switcher`);
        assert(switchLinks.every((tag) => new URL(tag.href, url).pathname === `/${locale}`), `${url}: ${locale} switcher must fall back to its homepage`);
      }
    }
    pages.set(route.pathname, html);
  }));
}

// Check actual crawlable internal links, including anchors and reciprocal languages.
for (const [path, html] of pages) {
  for (const { href } of tags(html, "a")) {
    if (!href) continue;
    const target = new URL(href, `${origin}${path}`);
    if (target.origin !== origin) continue;
    assert(pages.has(target.pathname), `${path}: unlisted internal destination ${href}`);
    if (target.hash) assert(tags(pages.get(target.pathname), "[a-z][a-z0-9]*").some((tag) => tag.id === target.hash.slice(1)), `${path}: broken fragment ${href}`);
  }
}
const indexLinks = tags(pages.get("/ka/articles"), "a").filter((tag) => tag.href).map((tag) => new URL(tag.href, origin)).filter((url) => url.origin === origin).map((url) => url.pathname);
for (const path of articlePaths) assert(indexLinks.includes(path), `${path}: article index must contain a crawlable link`);
assert(tags(pages.get("/ka"), "a").some((tag) => tag.href && new URL(tag.href, origin).href === `${origin}/ka/articles`), "Georgian homepage must link to the article index");
for (const path of ["/ka/services/land-valuation", "/ka/articles", articlePaths[0], ...extraServicePaths]) {
  const queryHtml = await (await get(`${path}?utm_source=seo-check`)).text();
  assert.equal(tags(queryHtml, "link").find((tag) => tag.rel === "canonical")?.href, `${origin}${path}`, `${path}: tracking parameters must not enter canonicals`);
}
const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots sitemap origin");
assert(!/^Disallow:\s*\/$/m.test(robots), "robots blocks the site");
const missingPaths = [
  "/ka/services/nonexistent-service", "/ka/nonexistent-page", "/ka/articles/nonexistent-article",
  ...locales.filter((locale) => locale !== "ka").flatMap((locale) => [
    `/${locale}/articles`, `/${locale}/articles/${articles[0].slug}`,
    ...extraServiceSlugs.map((slug) => `/${locale}/services/${slug}`),
  ]),
];
for (const path of missingPaths) {
  const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 404, `${path}: expected real 404`);
  assert(tags(await response.text(), "meta").some((tag) => tag.name === "robots" && /noindex/.test(tag.content)), `${path}: 404 must be noindex`);
}
for (const url of images) {
  const image = await get(new URL(url).pathname + new URL(url).search);
  assert(image.headers.get("content-type")?.startsWith("image/"), `${url}: invalid share image`);
  const bytes = Buffer.from(await image.arrayBuffer());
  assert(bytes.length > 1000 && bytes.subarray(1, 4).toString() === "PNG", `${url}: broken image body`);
}
console.log(`SEO checks passed: ${pages.size} pages including ${articles.length} published Georgian articles, unique metadata, canonical URLs, accurate hreflang, Article/CollectionPage/Service schemas, visible publication dates, crawlable article links, locale fallbacks, internal links, FAQs, robots, query URLs, ${missingPaths.length} real 404s and ${images.size} share images.`);
