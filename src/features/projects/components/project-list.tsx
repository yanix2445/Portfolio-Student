import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { portfolioProjects } from "../projects.data";

export function ProjectList() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {portfolioProjects.map((project) => (
        <article key={project.slug} className="border border-white/12 bg-[#0b0b0b] p-7 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 font-mono text-xs text-brand uppercase">
              <Code2 aria-hidden="true" className="size-4" />
              {project.kind}
            </p>
            <span className="font-mono text-xs text-white/42">{project.status}</span>
          </div>
          <h2 className="mt-10 text-4xl font-medium tracking-[-0.04em]">{project.title}</h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/58">{project.problem}</p>
          <Link href={`/projets/${project.slug}`} className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
            Consulter le projet
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </div>
  );
}
