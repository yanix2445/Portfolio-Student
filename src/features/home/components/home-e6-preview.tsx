import { ArrowUpRight } from "lucide-react";
import { homeE6Projects } from "../home.data";

export function HomeE6Preview() {
  return (
    <section id="e6" className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[90rem]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label">Épreuve E6</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
              Administrer, automatiser, prouver.
            </h2>
          </div>
          <p className="max-w-lg leading-7 text-white/58">
            Les deux réalisations sont publiées avec leur état réel. Les résultats seront ajoutés seulement après validation des preuves.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {homeE6Projects.map((project, index) => (
            <article key={project.title} className="group relative overflow-hidden border border-white/12 p-7 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                <span className="border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand uppercase">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-14 max-w-xl text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-xl leading-7 text-white/58">{project.summary}</p>
              <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white/45">
                Dossier détaillé à venir
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
