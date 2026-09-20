import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EditorialMedia } from "@/shared/components/editorial-media";
import { editorialMedia } from "@/shared/config/editorial-media.config";
import { homeE6Projects, homeRoutes } from "../home.data";

export function HomeE6Preview() {
  return (
    <section id="e6" className="page-shell page-section">
      <div>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label">Épreuve E6</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
              Administrer, automatiser, prouver.
            </h2>
          </div>
          <p className="max-w-lg leading-7 text-muted-foreground">
            Les deux réalisations sont publiées avec leur état réel. Les résultats seront ajoutés seulement après validation des preuves.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:items-start">
          <EditorialMedia
            media={editorialMedia.infrastructure}
            className="lg:col-span-7"
            imageClassName="aspect-[16/10]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="grid gap-5 lg:col-span-5 lg:pt-16">
          {homeE6Projects.map((project, index) => (
            <article key={project.title} className="editorial-card group relative overflow-hidden p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand uppercase">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-10 max-w-xl text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">{project.summary}</p>
              <Link
                href={`${homeRoutes.e6}/${project.slug}`}
                className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
              >
                Voir l’état de la réalisation
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
          </div>
        </div>
        <Link href={homeRoutes.e6} className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14">
          Consulter l’espace E6
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
