import Link from "next/link";
import { ArrowRight, ExternalLink, ListChecks, RadioTower } from "lucide-react";
import { NewsletterForm, subscribeNewsletter } from "@/features/newsletter";
import { watchArticles, watchSources, watchTopic } from "../tech-watch.data";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function WatchHub() {
  const categories = [...new Set(watchSources.map((source) => source.category))];

  return (
    <main>
      <header className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">Veille technologique</p>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            {watchTopic.title}
          </h1>
          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/62">{watchTopic.question}</p>
          <p className="mt-5 max-w-3xl border-l border-brand pl-5 text-sm leading-7 text-white/48">
            Collecte manuelle et analyse personnelle : aucun flux RSS ni automatisation de publication n’est encore activé.
          </p>
        </div>
      </header>

      <section className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="watch-method">
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">Méthode</p>
            <h2 id="watch-method" className="mt-6 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Sélectionner, recouper, restituer.
            </h2>
            <p className="mt-6 leading-8 text-white/58">{watchTopic.cadence}</p>
          </div>
          <ul className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2">
            {watchTopic.selectionCriteria.map((criterion) => (
              <li key={criterion} className="flex gap-3 bg-[#0b0b0b] p-6 text-sm leading-6 text-white/68">
                <ListChecks aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="watch-syntheses">
        <div className="mx-auto w-full max-w-[90rem]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Synthèses</p>
              <h2 id="watch-syntheses" className="mt-6 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Ce que je retiens et pourquoi.
              </h2>
            </div>
            <p className="font-mono text-xs text-white/42">{watchArticles.length} publications</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {watchArticles.map((article) => (
              <article key={article.slug} className="flex min-h-full flex-col border border-white/12 bg-[#0b0b0b] p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/42">
                  <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(article.publishedAt))}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>
                <h3 className="mt-6 text-3xl font-medium leading-tight tracking-[-0.03em]">{article.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-white/58">{article.excerpt}</p>
                <Link href={`/veille/${article.slug}`} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
                  Lire la synthèse
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="watch-sources">
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="section-label">Sources suivies</p>
            <h2 id="watch-sources" className="mt-6 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Des références identifiables.
            </h2>
            <p className="mt-6 leading-8 text-white/58">
              Je privilégie les documentations et publications des éditeurs. Chaque synthèse indique les pages réellement consultées.
            </p>
          </div>
          <div className="grid gap-8">
            {categories.map((category) => (
              <section key={category}>
                <h3 className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-brand uppercase">
                  <RadioTower aria-hidden="true" className="size-4" />
                  {category}
                </h3>
                <ul className="mt-4 grid gap-3">
                  {watchSources
                    .filter((source) => source.category === category)
                    .map((source) => (
                      <li key={source.url} className="border border-white/12 p-5">
                        <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium hover:text-brand">
                          {source.name} · {source.publisher}
                          <ExternalLink aria-hidden="true" className="size-3.5" />
                        </a>
                        <p className="mt-2 text-sm leading-6 text-white/52">{source.rationale}</p>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="watch-newsletter">
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 border border-white/12 bg-[#0b0b0b] p-7 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
          <div>
            <p className="section-label">Newsletter</p>
            <h2 id="watch-newsletter" className="mt-6 max-w-3xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Recevoir les prochaines synthèses.
            </h2>
            <p className="mt-6 max-w-2xl leading-8 text-white/58">
              Un e-mail uniquement lorsqu’une nouvelle analyse sur l’IA et le développement mérite d’être partagée.
            </p>
          </div>
          <NewsletterForm action={subscribeNewsletter} />
        </div>
      </section>
    </main>
  );
}
