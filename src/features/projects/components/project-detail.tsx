import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { PortfolioProject } from "../project.types";

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  return (
    <article>
      <header className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <Link href="/projets" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/58 hover:text-brand">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Retour aux projets
          </Link>
          <p className="section-label mt-8">{project.kind} · {project.status}</p>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">{project.problem}</p>
        </div>
      </header>

      <div className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-12">
            <ProjectSection title="Ma contribution" items={project.contribution} />
            <ProjectSection title="Démarche" items={project.approach} />
            <section>
              <h2 className="text-3xl font-medium tracking-[-0.03em]">Résultat disponible</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">{project.result}</p>
            </section>
          </div>
          <aside className="grid content-start gap-5 lg:sticky lg:top-24">
            <section className="border border-white/12 bg-[#0b0b0b] p-6">
              <h2 className="text-xl font-medium">Technologies</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <li key={tool} className="border border-white/12 px-2.5 py-1.5 font-mono text-xs text-white/62">{tool}</li>
                ))}
              </ul>
            </section>
            <section className="border border-brand/30 bg-brand/5 p-6">
              <h2 className="text-xl font-medium">Preuves consultables</h2>
              <div className="mt-4 grid gap-2">
                {project.evidence.map((evidence) => (
                  <a
                    key={evidence.href}
                    href={evidence.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-between gap-3 text-sm text-brand"
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
      <ul className="mt-5 grid gap-4 text-base leading-7 text-white/64">
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
