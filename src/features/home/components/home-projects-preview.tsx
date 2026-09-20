import { Code2, GitBranch } from "lucide-react";
import { homeProjects } from "../home.data";

export function HomeProjectsPreview() {
  return (
    <section id="projets" className="border-b border-white/10 bg-[#0b0b0b] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="section-label">Projets</p>
          <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
            Apprendre en construisant.
          </h2>
        </div>
        <div className="grid gap-5">
          {homeProjects.map((project) => (
            <article key={project.title} className="border border-white/12 p-7 sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-brand uppercase">
                  <Code2 aria-hidden="true" className="size-4" />
                  {project.kind}
                </span>
                <GitBranch aria-hidden="true" className="size-5 text-white/32" />
              </div>
              <h3 className="mt-8 text-3xl font-medium tracking-[-0.035em]">{project.title}</h3>
              <p className="mt-4 max-w-2xl leading-7 text-white/58">{project.summary}</p>
              <p className="mt-6 border-l border-brand pl-4 text-sm leading-6 text-white/72">
                {project.evidence}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
