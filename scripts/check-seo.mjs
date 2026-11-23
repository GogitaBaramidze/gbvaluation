import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Check real, server-rendered HTTP responses. Run against `next start` or a deployment.
const base = new URL(process.argv[2] || "http://127.0.0.1:3100");
const locales = ["ka", "en", "ru", "ar", "tr", "ja"];
const pages = new Map();
const images = new Set();
const titles = new Set();
const descriptions = new Set();
const articlesByLocale = new Map(await Promise.all(locales.map(async (locale) => {
  const content = JSON.parse(await readFile(new URL(`../src/content/articles/${locale}.json`, import.meta.url), "utf8"));
  return [locale, Array.isArray(content) ? content : content.articles];
})));
const articles = articlesByLocale.get("ka");
assert(Array.isArray(articles) && articles.length > 0, "Published articles are required");
assert(articles.every((article) => typeof article.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)), "Articles need valid URL slugs");
assert.equal(new Set(articles.map((article) => article.slug)).size, articles.length, "Duplicate article slugs");
for (const [locale, translations] of articlesByLocale) {
  assert(Array.isArray(translations), `${locale}: translated articles are required`);
  assert.deepEqual(translations.map((article) => article.slug), articles.map((article) => article.slug), `${locale}: published article slugs must match`);
  for (const [index, article] of translations.entries()) {
    assert.equal(article.publishedAt, articles[index].publishedAt, `${locale}/${article.slug}: publication date must match`);
    assert.deepEqual(article.sections.map((section) => section.id), articles[index].sections.map((section) => section.id), `${locale}/${article.slug}: section IDs must match`);
  }
}
const articlePaths = locales.flatMap((locale) => articles.map((article) => `/${locale}/articles/${article.slug}`));
const articlePathSet = new Set(articlePaths);
const extraServiceSlugs = ["property-measurement", "business-valuation"];
const extraServicePaths = locales.flatMap((locale) => extraServiceSlugs.map((slug) => `/${locale}/services/${slug}`));
const legacyServiceSlugs = ["residential-property-valuation", "commercial-property-valuation", "industrial-property-valuation", "land-valuation", "business-asset-valuation", "valuation-for-legal-proceedings"];
const expectedPaths = new Set([
  ...locales.flatMap((locale) => [`/${locale}`, `/${locale}/articles`, ...legacyServiceSlugs.map((slug) => `/${locale}/services/${slug}`)]),
  ...articlePaths, ...extraServicePaths,
]);
assert.equal(expectedPaths.size, 108, "Expected 108 published routes across six locales");
const publicationDate = "2026-11-23";
const cityRestrictedHeadline = /ბათუმ|batum|батум|باتوم|バト(?:ゥー?|ウ)?ミ|バツミ/iu;
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
assert.equal(urls.length, expectedPaths.size, "Sitemap must contain all 108 localized home, service, article-index and article routes");
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
    const h1 = plainText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
    const meta = tags(head, "meta");
    const description = meta.find((tag) => tag.name === "description")?.content;
    const links = tags(head, "link");
    assert(title && !titles.has(title), `${url}: missing or duplicate title`);
    assert(!cityRestrictedHeadline.test(title), `${url}: title must not restrict the nationwide service to Batumi`);
    assert(!cityRestrictedHeadline.test(h1), `${url}: H1 must not restrict the nationwide service to Batumi`);
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
    const expectedLanguages = [...locales, "x-default"];
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
      const isArticle = articlePathSet.has(route.pathname);
      const expectedCrumbPaths = isArticle ? [`/${lang}`, `/${lang}/articles`, route.pathname] : [`/${lang}`, route.pathname];
      assert.equal(crumbs?.length, expectedCrumbPaths.length, `${url}: breadcrumb count`);
      expectedCrumbPaths.forEach((path, index) => {
        assert.equal(crumbs[index].position, index + 1, `${url}: breadcrumb position`);
        assert.equal(crumbs[index].item, `${origin}${path}`, `${url}: breadcrumb URL`);
      });
      if (isArticle) {
        const article = graph.find((item) => hasType(item, "Article"));
        const sourceArticle = articlesByLocale.get(lang).find((item) => route.pathname.endsWith(`/articles/${item.slug}`));
        assert(article, `${url}: missing Article schema`);
        assert(sourceArticle, `${url}: article must correspond to published locale content`);
        assert.equal(article.url, url, `${url}: Article URL`);
        assert.equal(article.inLanguage, lang, `${url}: Article language`);
        assert.equal(article.datePublished?.slice(0, 10), sourceArticle.publishedAt, `${url}: Article publication date`);
        assert.equal(sourceArticle.publishedAt, publicationDate, `${url}: expected publication date`);
        assert.equal(article.headline, h1, `${url}: Article headline must match visible H1`);
        assert.equal(h1, sourceArticle.title, `${url}: H1 must match translated article title`);
        const author = [article.author].flat().find((item) => item?.name === "GB Valuation" || (item?.["@id"] && graph.some((node) => node["@id"] === item["@id"] && node.name === "GB Valuation")));
        assert(author, `${url}: Article author must identify GB Valuation`);
        const visibleTime = [...html.matchAll(/<time\b([^>]*)>([\s\S]*?)<\/time>/gi)].find((match) => attrs(`<time ${match[1]}>`).datetime?.slice(0, 10) === publicationDate && plainText(match[2]));
        assert(visibleTime, `${url}: publication date must be visible in a time element`);
        assert.equal(meta.find((tag) => tag.property === "og:type")?.content, "article", `${url}: article Open Graph type`);
      } else if (route.pathname === `/${lang}/articles`) {
        const collection = graph.find((item) => hasType(item, "CollectionPage"));
        assert.equal(collection?.url, url, `${url}: CollectionPage URL`);
      } else {
        assert.equal(graph.find((item) => hasType(item, "Service"))?.url, url, `${url}: service URL`);
      }
    } else {
      assert.equal(graph.find((item) => item["@type"] === "Person")?.hasCredential?.identifier, "A-1777", `${url}: valuer credential`);
      assert.equal(tags(html, "details").length, 6, `${url}: certification and 5 FAQs`);
    }
    for (const locale of locales) {
      const switchLinks = tags(html, "a").filter((tag) => tag.hreflang === locale);
      const expectedPath = `/${locale}${suffix ? `/${suffix}` : ""}`;
      assert(switchLinks.length > 0, `${url}: missing ${locale} language switcher`);
      assert(switchLinks.every((tag) => new URL(tag.href, url).pathname === expectedPath), `${url}: ${locale} switcher must retain the translated page path`);
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
for (const locale of locales) {
  const indexPath = `/${locale}/articles`;
  const indexLinks = tags(pages.get(indexPath), "a").filter((tag) => tag.href).map((tag) => new URL(tag.href, origin)).filter((url) => url.origin === origin).map((url) => url.pathname);
  for (const article of articles) {
    const path = `/${locale}/articles/${article.slug}`;
    assert(indexLinks.includes(path), `${path}: localized article index must contain a crawlable link`);
  }
  assert(tags(pages.get(`/${locale}`), "a").some((tag) => tag.href && new URL(tag.href, origin).href === `${origin}${indexPath}`), `${locale}: homepage must link to its article index`);
  for (const path of [`/${locale}/services/land-valuation`, indexPath, `/${locale}/articles/${articles[0].slug}`, ...extraServiceSlugs.map((slug) => `/${locale}/services/${slug}`)]) {
    const queryHtml = await (await get(`${path}?utm_source=seo-check`)).text();
    assert.equal(tags(queryHtml, "link").find((tag) => tag.rel === "canonical")?.href, `${origin}${path}`, `${path}: tracking parameters must not enter canonicals`);
  }
}
const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots sitemap origin");
assert(!/^Disallow:\s*\/$/m.test(robots), "robots blocks the site");
for (const locale of locales) {
  const query = "utm_source=facebook&utm_medium=social&utm_campaign=valuation_guides";
  const legacyPath = `/${locale}/articles/binis-shefaseba-batumshi`;
  const response = await fetch(new URL(`${legacyPath}?${query}`, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 308, `${legacyPath}: expected permanent 308 redirect`);
  const location = response.headers.get("location");
  assert(location, `${legacyPath}: missing redirect destination`);
  const destination = new URL(location, base);
  assert.equal(destination.pathname, `/${locale}/articles/binis-shefaseba`, `${legacyPath}: redirect must use the current article slug`);
  assert.equal(destination.search, `?${query}`, `${legacyPath}: redirect must preserve UTM parameters`);
}
const missingPaths = locales.flatMap((locale) => [
  `/${locale}/services/nonexistent-service`, `/${locale}/nonexistent-page`, `/${locale}/articles/nonexistent-article`,
]);
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
console.log(`SEO checks passed: ${pages.size} pages including ${articles.length} articles in all ${locales.length} languages, unique nationwide metadata, canonical URLs, reciprocal hreflang and language switchers, Article/CollectionPage/Service schemas, visible publication dates, crawlable article links, legacy-slug 308 redirects preserving UTM parameters, internal links, FAQs, robots, query URLs, ${missingPaths.length} real 404s and ${images.size} share images.`);
