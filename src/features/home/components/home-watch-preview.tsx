import { ArrowRight, Bot, Rss } from "lucide-react";
import Link from "next/link";
import { EditorialMedia } from "@/shared/components/editorial-media";
import { editorialMedia } from "@/shared/config/editorial-media.config";
import { homeRoutes } from "../home.data";

export function HomeWatchPreview() {
  return (
    <section id="veille" className="bg-surface-raised/35">
      <div className="page-shell page-section grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="section-label">Veille technologique</p>
          <h2 className="mt-6 max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
            L’IA appliquée au développement web et applicatif.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">
            Je collecte, compare et synthétise des sources techniques pour comprendre comment l’IA transforme la conception, le développement et la maintenance des applications.
          </p>
          <EditorialMedia
            media={editorialMedia.artificialIntelligence}
            className="mt-10"
            imageClassName="aspect-[16/9]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>

        <div className="grid gap-4 lg:pt-20">
          <article className="editorial-card p-7">
            <Bot aria-hidden="true" className="size-7 text-brand" />
            <h3 className="mt-7 text-2xl font-medium">Une méthode documentée</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              Problématique, critères de sélection, sources et synthèses seront consultables dans un espace dédié.
            </p>
          </article>
          <article className="editorial-card p-7 lg:ml-10">
            <Rss aria-hidden="true" className="size-7 text-brand" />
            <h3 className="mt-7 text-2xl font-medium">Une diffusion régulière</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              La newsletter permettra de recevoir les nouvelles synthèses lorsqu’elles seront publiées.
            </p>
          </article>
          <Link
            href={homeRoutes.watch}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14 lg:ml-10 lg:justify-self-start"
          >
            Explorer la veille
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
