import { notFound } from "next/navigation";
import { BookOpen, Clock, Phone } from "lucide-react";
import ArticleCards from "@/components/sections/ArticleCards";
import ContactButton from "@/components/contact/ContactButton";
import StructuredData from "@/components/seo/StructuredData";
import { articles, getArticles, getArticleUI, getArticle, articlePath, articleDate, articlesPath } from "@/content/articles";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { phoneDisplay, phoneE164, whatsAppUrl } from "@/lib/contact";
import { serviceSlugs } from "@/lib/services";
import { siteName, siteUrl } from "@/lib/site";
import { businessId } from "@/lib/structured-data";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const article = getArticle(slug, lang);
  if (!article) notFound();
  const metadata = pageMetadata(lang, `${article.title} | ${siteName}`, article.description, `/articles/${article.slug}`);
  return {
    ...metadata,
    authors: [{ name: siteName, url: `${siteUrl}/${lang}` }],
    openGraph: {
      ...metadata.openGraph, type: "article" as const, publishedTime: `${article.publishedAt}T12:00:00+04:00`,
      authors: [siteName], section: article.category,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const article = getArticle(slug, lang);
  if (!article) notFound();
  const ui = getArticleUI(lang);
  const localizedArticles = getArticles(lang);
  const url = `${siteUrl}${articlePath(article, lang)}`;
  const servicePath = `/${lang}/services/${article.extraServiceSlug ?? serviceSlugs[article.serviceKey]}`;
  const related = article.relatedSlugs.map((slug) => getArticle(slug, lang)).filter((item): item is (typeof localizedArticles)[number] => Boolean(item));
  const data = {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Article", "@id": `${url}#article`, url, headline: article.title,
        description: article.description, inLanguage: lang, articleSection: article.category,
        datePublished: `${article.publishedAt}T12:00:00+04:00`,
        author: { "@type": "Organization", "@id": businessId, name: siteName, url: `${siteUrl}/${lang}` },
        publisher: { "@type": "Organization", "@id": businessId, name: siteName, url: `${siteUrl}/${lang}` },
        image: [`${siteUrl}/${lang}/opengraph-image`], mainEntityOfPage: { "@id": `${url}#webpage` },
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title,
        description: article.description, inLanguage: lang, mainEntity: { "@id": `${url}#article` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${siteUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: ui.navTitle, item: `${siteUrl}${articlesPath(lang)}` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <StructuredData data={data} />
      <article>
        <header className="bg-brand-950 px-6 pt-36 pb-12 text-white sm:pt-40 lg:px-10 lg:pb-16" style={{ background: "var(--gradient-hero)" }}>
          <div className="mx-auto max-w-5xl">
            <nav aria-label={ui.breadcrumbLabel} className="mb-8 text-sm leading-7 text-slate-300"><ol className="flex flex-wrap gap-x-3 gap-y-1"><li><a href={`/${lang}`} className="underline-offset-4 hover:underline">{ui.home}</a></li><li aria-hidden="true">/</li><li><a href={articlesPath(lang)} className="underline-offset-4 hover:underline">{ui.navTitle}</a></li><li aria-hidden="true">/</li><li aria-current="page">{article.category}</li></ol></nav>
            <p className="text-sm font-semibold text-brand-300">{article.category}</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-snug sm:text-4xl lg:text-5xl">{article.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-slate-200">{article.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <span>{siteName}</span><time dateTime={article.publishedAt}>{articleDate(article.publishedAt, lang)}</time>
              <span className="inline-flex items-center gap-2"><Clock size={16} aria-hidden="true" />{ui.readingTime.replace("{minutes}", String(article.readingMinutes))}</span>
            </div>
          </div>
        </header>
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-16 lg:px-10 lg:py-16">
          <div className="min-w-0 max-w-3xl">
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-7">
              <p className="text-base font-bold text-brand-900">{ui.keyTakeaway}</p>
              <p className="mt-3 text-base leading-8 text-brand-800">{article.takeaway}</p>
            </div>
            <nav aria-label={ui.toc} className="mt-9 rounded-2xl border border-slate-200 p-6 lg:hidden">
              <p className="flex items-center gap-2 text-base font-bold text-brand-900"><BookOpen size={18} aria-hidden="true" />{ui.toc}</p>
              <ul className="mt-4 space-y-3">{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-base leading-7 text-brand-700 underline decoration-brand-300 underline-offset-4">{section.title}</a></li>)}</ul>
            </nav>
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-10 scroll-mt-36">
                <h2 className="text-2xl font-bold leading-relaxed text-brand-900">{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-9 text-slate-700">{paragraph}</p>)}
                {section.bullets && <ul className="mt-5 list-disc space-y-3 ps-6 text-base leading-8 text-slate-700 marker:text-brand-600">{section.bullets.map((bullet) => <li key={bullet} className="ps-1">{bullet}</li>)}</ul>}
              </section>
            ))}
            <div className="mt-12 rounded-2xl bg-brand-900 p-6 text-white sm:p-8" data-contact-source={`article_${slug}`}>
              <h2 className="text-2xl font-bold leading-relaxed">{ui.ctaTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-200">{ui.ctaText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ContactButton source={`article_${slug}`} className="btn-action min-h-12 px-5 text-base">{ui.consultation}</ContactButton>
                <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 text-base font-semibold hover:bg-white/10">WhatsApp</a>
              </div>
              <a href={servicePath} className="mt-6 inline-flex min-h-11 items-center text-base font-semibold text-brand-300 underline underline-offset-4">{ui.serviceDetails}</a>
            </div>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-36">
            <nav aria-label={ui.toc} className="hidden rounded-2xl border border-slate-200 p-6 lg:block">
              <p className="flex items-center gap-2 text-base font-bold text-brand-900"><BookOpen size={18} aria-hidden="true" />{ui.toc}</p>
              <ul className="mt-5 space-y-4">{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-sm leading-7 text-slate-600 underline-offset-4 hover:text-brand-700 hover:underline">{section.title}</a></li>)}</ul>
            </nav>
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
              <p className="text-lg font-bold text-brand-900">{ui.questionTitle}</p>
              <p className="mt-3 text-base leading-8 text-slate-600">{ui.questionText}</p>
              <a href={`tel:${phoneE164}`} className="mt-5 flex min-h-12 items-center gap-2 text-base font-semibold text-brand-800"><Phone size={17} aria-hidden="true" /><span dir="ltr">{phoneDisplay}</span></a>
              <a href={servicePath} className="mt-3 block text-base font-semibold leading-7 text-brand-700 underline underline-offset-4">{ui.viewService}</a>
            </div>
          </aside>
        </div>
      </article>
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl"><h2 className="mb-8 text-2xl font-bold text-brand-900">{ui.related}</h2><ArticleCards items={related} lang={lang} /><a href={articlesPath(lang)} className="mt-8 inline-flex min-h-12 items-center text-base font-semibold text-brand-700 underline underline-offset-4">{ui.allArticles}</a></div>
      </section>
    </main>
  );
}
