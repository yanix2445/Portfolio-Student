import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { PortfolioProject } from "../project.types";

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  return (
    <article>
      <header className="page-shell page-section">
        <div className="page-intro lg:grid-cols-[1fr_.9fr]">
          <div className="self-end">
          <Link href="/projets" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-white/60 hover:bg-white/5 hover:text-brand">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Retour aux projets
          </Link>
          <p className="section-label mt-8">{project.kind} · {project.status}</p>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{project.problem}</p>
          </div>
          <figure>
            <div className="overflow-hidden rounded-[var(--radius-media)] border border-white/10 shadow-[var(--shadow-soft)]">
              <Image
                src={project.visual.src}
                alt={project.visual.alt}
                width={project.visual.width}
                height={project.visual.height}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-[16/10] size-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase">
              Capture réelle du projet · version locale
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="page-shell pb-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-12">
            <ProjectSection title="Ma contribution" items={project.contribution} />
            <ProjectSection title="Démarche" items={project.approach} />
            <section>
              <h2 className="text-3xl font-medium tracking-[-0.03em]">Résultat disponible</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">{project.result}</p>
            </section>
          </div>
          <aside className="grid content-start gap-5 lg:sticky lg:top-24">
            <section className="editorial-card p-6">
              <h2 className="text-xl font-medium">Technologies</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <li key={tool} className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-xs text-white/62">{tool}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-[var(--radius)] border border-brand/30 bg-brand/5 p-6">
              <h2 className="text-xl font-medium">Preuves consultables</h2>
              <div className="mt-4 grid gap-2">
                {project.evidence.map((evidence) => (
                  <a
                    key={evidence.href}
                    href={evidence.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-brand/20 px-3 text-sm text-brand hover:bg-brand/10"
                  >
                    {evidence.label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}

function ProjectSection({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section>
      <h2 className="text-3xl font-medium tracking-[-0.03em]">{title}</h2>
      <ul className="mt-5 grid gap-4 text-base leading-7 text-white/68">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
