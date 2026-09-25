import { Plus } from "lucide-react";

type Props = { title: string; items: { question: string; answer: string }[] };

export default function FAQ({ title, items }: Props) {
  return (
    <section className="bg-slate-50 px-6 py-16 lg:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="mb-8 text-balance text-2xl font-extrabold text-brand-900 sm:text-3xl">{title}</h2>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-start text-base font-semibold leading-relaxed text-brand-900 [&::-webkit-details-marker]:hidden">
                {question}<Plus size={19} className="shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
