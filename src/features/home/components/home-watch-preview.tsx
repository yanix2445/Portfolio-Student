import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { NewsletterForm, subscribeNewsletter } from "@/features/newsletter";
import { watchArticles, watchTopic } from "@/features/tech-watch/tech-watch.data";
import { HomeReveal } from "./home-reveal";

const latestWatchArticle = watchArticles.at(-1);

export function HomeWatchPreview() {
  if (!latestWatchArticle) return null;

  return (
    <section id="veille" className="bg-[var(--home-surface-warm)] px-4 py-20 sm:px-6" aria-labelledby="home-watch-title">
      <HomeReveal className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[var(--home-surface-raised)] ring-1 ring-white/[0.09] lg:grid-cols-[1.25fr_0.75fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-[var(--home-accent-hover)]">Veille technologique</span>
            <span className="text-[var(--home-text-subtle)]">{watchArticles.length} synthèses publiées</span>
          </div>
          <h2 id="home-watch-title" className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">{watchTopic.title}.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--home-text-muted)] text-pretty">{watchTopic.question}</p>
          <article className="mt-8 border-t border-white/[0.09] pt-6">
            <p className="text-xs font-semibold text-[var(--home-text-subtle)]">Dernière synthèse · {latestWatchArticle.readingTime}</p>
            <h3 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.02em] text-balance">{latestWatchArticle.title}</h3>
            <Link href={`/veille/${latestWatchArticle.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--home-accent-hover)] underline decoration-[var(--home-accent)]/40 underline-offset-8">
              Lire la synthèse <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        </div>

        <aside className="border-t border-white/[0.09] bg-[var(--home-chrome)] p-6 lg:border-t-0 lg:border-l sm:p-8 lg:p-10" aria-labelledby="home-newsletter-title">
          <h3 id="home-newsletter-title" className="text-2xl font-semibold tracking-[-0.02em] text-balance">Recevoir uniquement les nouvelles synthèses.</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--home-text-muted)]">Pas de calendrier artificiel : un message seulement lorsqu’une analyse utile est publiée.</p>
          <div className="mt-7">
            <NewsletterForm action={subscribeNewsletter} appearance="home" />
          </div>
        </aside>
      </HomeReveal>
    </section>
  );
}
