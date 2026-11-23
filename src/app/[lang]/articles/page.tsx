import { notFound } from "next/navigation";
import ArticleCards from "@/components/sections/ArticleCards";
import ContactButton from "@/components/contact/ContactButton";
import StructuredData from "@/components/seo/StructuredData";
import { getArticles, getArticleUI, articlesPath, articlePath } from "@/content/articles";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";
import { businessId } from "@/lib/structured-data";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getArticleUI(lang);
  return { ...pageMetadata(lang, `${ui.title} | ${siteName}`, ui.description, "/articles"), authors: [{ name: siteName, url: `${siteUrl}/${lang}` }] };
}

export default async function ArticlesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const articles = getArticles(lang);
  const ui = getArticleUI(lang);
  const articlesTitle = ui.title;
  const articlesDescription = ui.description;
  const url = `${siteUrl}${articlesPath(lang)}`;
  const data = {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: articlesTitle,
        description: articlesDescription, inLanguage: lang, breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#collection` },
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName },
      },
      {
        "@type": "CollectionPage", "@id": `${url}#collection`, url, name: articlesTitle, inLanguage: lang,
        publisher: { "@id": businessId, "@type": "Organization", name: siteName, url: `${siteUrl}/${lang}` },
        mainEntity: {
          "@type": "ItemList", itemListElement: articles.map((article, index) => ({
            "@type": "ListItem", position: index + 1, name: article.title, url: `${siteUrl}${articlePath(article, lang)}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${siteUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: ui.navTitle, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <StructuredData data={data} />
      <section className="bg-brand-950 px-6 pt-36 pb-12 text-white sm:pt-40 lg:px-10 lg:pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl">
          <nav aria-label={ui.breadcrumbLabel} className="mb-7 text-sm text-slate-300"><ol className="flex flex-wrap gap-3"><li><a href={`/${lang}`} className="underline-offset-4 hover:underline">{ui.home}</a></li><li aria-hidden="true">/</li><li aria-current="page">{ui.navTitle}</li></ol></nav>
          <p className="text-sm font-semibold text-brand-300">{ui.indexEyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-snug sm:text-4xl lg:text-5xl">{articlesTitle}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">{ui.indexIntro}</p>
        </div>
      </section>
      <section aria-label={ui.allArticles} className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <ArticleCards items={articles} lang={lang} />
      </section>
      <section className="border-t border-slate-200 bg-brand-50 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div><h2 className="text-2xl font-bold text-brand-900">{ui.indexCtaTitle}</h2><p className="mt-3 text-base leading-8 text-slate-600">{ui.indexCtaText}</p></div>
          <ContactButton source="articles_index" className="btn-action min-h-12 shrink-0 px-6 text-base">{ui.consultation}</ContactButton>
        </div>
      </section>
    </main>
  );
}
