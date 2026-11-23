import ArticleCards from "@/components/sections/ArticleCards";
import { articles, articlesPath } from "@/content/articles";

export default function ArticlesPreview() {
  const featured = [articles[0], articles.find((item) => item.extraServiceSlug === "property-measurement"), articles.find((item) => item.extraServiceSlug === "business-valuation")]
    .filter((item): item is (typeof articles)[number] => Boolean(item));
  return (
    <section id="articles" className="border-t border-slate-200 bg-slate-50 px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-brand-700">GB Valuation-ის გზამკვლევები</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-relaxed text-brand-900 sm:text-3xl">ქონების შეფასება, ბიზნესი და აზომვა</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">რა განსაზღვრავს ღირებულებას, რომელი დოკუმენტები გჭირდებათ და როგორ მოემზადოთ მომსახურების შეკვეთისთვის.</p>
          </div>
          <a href={articlesPath} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border border-brand-700 px-5 text-base font-semibold text-brand-800 hover:bg-brand-50">ყველა სტატია</a>
        </div>
        <ArticleCards items={featured} />
      </div>
    </section>
  );
}
