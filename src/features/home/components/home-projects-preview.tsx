import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { portfolioProjects } from "@/features/projects";
import { homeRoutes } from "../home.data";
import { HomeProjectVisual } from "./home-project-visual";
import { HomeReveal } from "./home-reveal";

const project = portfolioProjects[0];

export function HomeProjectsPreview() {
  return (
    <section id="projets" className="px-4 py-20 sm:px-6 lg:py-24" aria-labelledby="home-projects-title">
      <HomeReveal className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="home-projects-title" className="max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Un projet réel aujourd’hui, une collection prête à grandir.
          </h2>
          <Link href={homeRoutes.projects} className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[var(--home-accent-hover)] underline decoration-[var(--home-accent)]/40 underline-offset-8">
            Voir tous mes projets <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <article className="mt-10 grid overflow-hidden rounded-2xl bg-[var(--home-surface-raised)] ring-1 ring-white/[0.08] lg:grid-cols-[0.9fr_1.1fr]">
          <HomeProjectVisual title={project.title} />
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-[var(--home-accent-hover)]">{project.kind}</span>
              <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[var(--home-text-muted)]">{project.status}</span>
            </div>
            <h3 className="mt-8 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{project.title}</h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--home-text-muted)] text-pretty">{project.problem}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies du projet">
              {project.tools.map((tool) => (
                <li key={tool} className="rounded-full bg-white/[0.06] px-3 py-2 text-xs text-[var(--home-text-muted)]">{tool}</li>
              ))}
            </ul>
            <Link href={`/projets/${project.slug}`} className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[var(--home-accent)] px-5 text-sm font-bold text-black transition-transform duration-150 ease-out active:scale-[0.97]">
              Consulter le projet <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </HomeReveal>
    </section>
  );
}
