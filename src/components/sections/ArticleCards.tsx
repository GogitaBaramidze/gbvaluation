import { BookOpen, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { articlePath, getArticleUI, type Article } from "@/content/articles";

export default function ArticleCards({ items, lang }: { items: Article[]; lang: Locale }) {
  const ui = getArticleUI(lang);
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((article) => (
        <article key={article.slug} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-400 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">{article.category}</span>
            <span className="inline-flex items-center gap-1.5 text-slate-500"><Clock size={15} aria-hidden="true" />{article.readingMinutes} {ui.minutes}</span>
          </div>
          <h2 className="mt-6 text-xl font-bold leading-relaxed text-brand-900">
            <a href={articlePath(article, lang)} className="decoration-brand-400 underline-offset-4 group-hover:underline">{article.title}</a>
          </h2>
          <p className="mt-4 grow text-base leading-8 text-slate-600">{article.description}</p>
          <a href={articlePath(article, lang)} className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-base font-semibold text-brand-700 underline-offset-4 hover:underline">
            <BookOpen size={18} aria-hidden="true" />{ui.readArticle}
            <span className="sr-only">: {article.title}</span>
          </a>
        </article>
      ))}
    </div>
  );
}
