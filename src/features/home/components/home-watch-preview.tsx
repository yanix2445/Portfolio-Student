import { ArrowRight, Bot, Rss } from "lucide-react";

export function HomeWatchPreview() {
  return (
    <section id="veille" className="border-b border-white/10 bg-[#0b0b0b] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="section-label">Veille technologique</p>
          <h2 className="mt-6 max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
            L’IA appliquée au développement web et applicatif.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/58">
            Je collecte, compare et synthétise des sources techniques pour comprendre comment l’IA transforme la conception, le développement et la maintenance des applications.
          </p>
        </div>

        <div className="grid gap-4">
          <article className="border border-white/12 p-7">
            <Bot aria-hidden="true" className="size-7 text-brand" />
            <h3 className="mt-7 text-2xl font-medium">Une méthode documentée</h3>
            <p className="mt-3 leading-7 text-white/55">
              Problématique, critères de sélection, sources et synthèses seront consultables dans un espace dédié.
            </p>
          </article>
          <article className="border border-white/12 p-7">
            <Rss aria-hidden="true" className="size-7 text-brand" />
            <h3 className="mt-7 text-2xl font-medium">Une diffusion régulière</h3>
            <p className="mt-3 leading-7 text-white/55">
              La newsletter permettra de recevoir les nouvelles synthèses lorsqu’elles seront publiées.
            </p>
          </article>
          <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
            Espace de veille en préparation
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
