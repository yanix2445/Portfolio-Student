import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, ShieldAlert } from "lucide-react";
import type { WatchArticle as WatchArticleType } from "../tech-watch.types";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function WatchArticle({ article }: { article: WatchArticleType }) {
  return (
    <article>
      <header className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <Link href="/veille" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/58 hover:text-brand">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Retour à la veille
          </Link>
          <p className="section-label mt-8">Synthèse de veille</p>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            {article.title}
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-xs text-white/44">
            <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(article.publishedAt))}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} de lecture</span>
          </div>
        </div>
      </header>

      <div className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-12">
            <ContentSection title="Question suivie">
              <p>{article.question}</p>
            </ContentSection>
            <ContentSection title="Points à retenir">
              <ul className="grid gap-3">
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </ContentSection>
            <ContentSection title="Mon analyse">
              {article.analysis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </ContentSection>
            <section className="border border-brand/35 bg-brand/5 p-6 sm:p-8">
              <h2 className="inline-flex items-center gap-3 text-2xl font-medium">
                <ShieldAlert aria-hidden="true" className="size-6 text-brand" />
                Limites et vigilance
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-white/64">
                {article.limits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section className="border border-white/12 bg-[#0b0b0b] p-6 sm:p-8">
              <h2 className="text-2xl font-medium">Sources consultées</h2>
              <ul className="mt-6 grid gap-4">
                {article.sources.map((source) => (
                  <li key={source.url} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                    <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/75 hover:text-brand">
                      {source.name}
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                    <p className="font-mono text-xs text-white/38">{source.publisher}</p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}

function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-3xl font-medium tracking-[-0.03em]">{title}</h2>
      <div className="mt-5 grid max-w-3xl gap-5 text-base leading-8 text-white/64">{children}</div>
    </section>
  );
}
