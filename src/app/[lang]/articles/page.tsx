import { notFound } from "next/navigation";
import ArticleCards from "@/components/sections/ArticleCards";
import ContactButton from "@/components/contact/ContactButton";
import StructuredData from "@/components/seo/StructuredData";
import { articles, articlesPath, articlesTitle, articlesDescription, articlePath } from "@/content/articles";
import { georgianMetadata } from "@/lib/georgian-metadata";
import { siteName, siteUrl } from "@/lib/site";
import { businessId } from "@/lib/structured-data";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  if ((await params).lang !== "ka") notFound();
  return georgianMetadata(articlesTitle, articlesDescription, articlesPath);
}

export default async function ArticlesPage({ params }: Props) {
  if ((await params).lang !== "ka") notFound();
  const url = `${siteUrl}${articlesPath}`;
  const data = {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: articlesTitle,
        description: articlesDescription, inLanguage: "ka", breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#collection` },
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName },
      },
      {
        "@type": "CollectionPage", "@id": `${url}#collection`, url, name: articlesTitle, inLanguage: "ka",
        publisher: { "@id": businessId, "@type": "Organization", name: siteName, url: `${siteUrl}/ka` },
        mainEntity: {
          "@type": "ItemList", itemListElement: articles.map((article, index) => ({
            "@type": "ListItem", position: index + 1, name: article.title, url: `${siteUrl}${articlePath(article)}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "მთავარი", item: `${siteUrl}/ka` },
          { "@type": "ListItem", position: 2, name: "სტატიები", item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <StructuredData data={data} />
      <section className="bg-brand-950 px-6 pt-36 pb-12 text-white sm:pt-40 lg:px-10 lg:pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl">
          <nav aria-label="გვერდის მდებარეობა" className="mb-7 text-sm text-slate-300"><ol className="flex flex-wrap gap-3"><li><a href="/ka" className="underline-offset-4 hover:underline">მთავარი</a></li><li aria-hidden="true">/</li><li aria-current="page">სტატიები</li></ol></nav>
          <p className="text-sm font-semibold text-brand-300">GB Valuation · სასარგებლო ინფორმაცია</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-snug sm:text-4xl lg:text-5xl">{articlesTitle}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">ბინისა და მიწის შეფასებიდან ბიზნესის ღირებულებასა და აზომვით ნახაზამდე — იპოვეთ პასუხები, რომლებიც მომსახურების სწორად შერჩევაში დაგეხმარებათ.</p>
        </div>
      </section>
      <section aria-label="ყველა სტატია" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <ArticleCards items={articles} />
      </section>
      <section className="border-t border-slate-200 bg-brand-50 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div><h2 className="text-2xl font-bold text-brand-900">თქვენს ობიექტზე კონკრეტული კითხვა გაქვთ?</h2><p className="mt-3 text-base leading-8 text-slate-600">მოგვწერეთ ქონების მდებარეობა ან ბიზნესის მოკლე აღწერა და მომსახურების მიზანი.</p></div>
          <ContactButton source="articles_index" className="btn-action min-h-12 shrink-0 px-6 text-base">კონსულტაციის მიღება</ContactButton>
        </div>
      </section>
    </main>
  );
}
