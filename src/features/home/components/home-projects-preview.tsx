import { Code2, GitBranch } from "lucide-react";
import Link from "next/link";
import { EditorialMedia } from "@/shared/components/editorial-media";
import { editorialMedia } from "@/shared/config/editorial-media.config";
import { homeProjects, homeRoutes } from "../home.data";

export function HomeProjectsPreview() {
  return (
    <section id="projets" className="bg-surface-raised/35">
      <div className="page-shell page-section grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="section-label">Projets</p>
          <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
            Apprendre en construisant.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <EditorialMedia
            media={editorialMedia.development}
            imageClassName="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 32vw"
          />
          {homeProjects.map((project) => (
            <article key={project.title} className="editorial-card p-7 sm:p-10 lg:mb-10">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-brand uppercase">
                  <Code2 aria-hidden="true" className="size-4" />
                  {project.kind}
                </span>
                <GitBranch aria-hidden="true" className="size-5 text-white/32" />
              </div>
              <h3 className="mt-8 text-3xl font-medium tracking-[-0.035em]">{project.title}</h3>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{project.summary}</p>
              <p className="mt-6 border-l border-brand pl-4 text-sm leading-6 text-white/72">
                {project.evidence}
              </p>
              <Link
                href={`${homeRoutes.projects}/${project.slug}`}
                className="mt-7 inline-flex min-h-11 items-center rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14"
              >
                Consulter le projet
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
