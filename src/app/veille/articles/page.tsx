import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { watchArticles } from "@/features/tech-watch";

export const metadata: Metadata = {
  title: "Articles de veille technologique",
  description:
    "Les synthèses de veille de Yanis Harrat sur l’intelligence artificielle appliquée au développement web et applicatif.",
  alternates: { canonical: "/veille/articles" },
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function WatchArticlesPage() {
  const articles = [...watchArticles].reverse();

  return (
    <main className="portfolio-surface min-h-screen px-5 pb-24 pt-16 text-[var(--portfolio-text)] sm:px-8 lg:px-12 lg:pb-32 lg:pt-24">
      <div className="portfolio-shell">
        <Link
          href="/veille"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-white/58 transition-colors hover:text-brand"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Retour à la démarche de veille
        </Link>

        <header className="grid gap-8 border-b border-white/10 pb-12 pt-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:pb-16 lg:pt-16">
          <div>
            <p className="section-label">Registre des publications</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.94] tracking-[-0.055em] text-balance sm:text-7xl lg:text-8xl">
              Synthèses de veille technologique.
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/58 lg:pb-2">
            Chaque article condense une période de veille : les informations retenues, mon analyse, les limites identifiées et les sources réellement consultées.
          </p>
        </header>

        <section className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2" aria-labelledby="watch-articles-heading">
          <h2 id="watch-articles-heading" className="sr-only">Toutes les synthèses publiées</h2>
          {articles.map((article, index) => (
            <article key={article.slug} className="group flex min-h-[22rem] flex-col bg-[var(--portfolio-panel)] p-7 sm:p-9 lg:p-11">
              <div className="flex items-center justify-between gap-4 font-mono text-xs text-white/42">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{article.readingTime} de lecture</span>
              </div>
              <div className="mt-auto pt-16">
                <time className="text-xs text-brand" dateTime={article.publishedAt}>
                  {dateFormatter.format(new Date(article.publishedAt))}
                </time>
                <h3 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
                  {article.title}
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{article.excerpt}</p>
                <Link
                  href={`/veille/${article.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand transition-colors group-hover:text-[var(--portfolio-accent-hover)]"
                >
                  Lire la synthèse
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
