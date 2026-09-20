import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2 } from "lucide-react";
import { portfolioProjects } from "../projects.data";

export function ProjectList() {
  return (
    <div className="grid gap-5">
      {portfolioProjects.map((project) => (
        <article key={project.slug} className="editorial-card grid overflow-hidden lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-72 overflow-hidden border-b border-white/10 lg:min-h-[32rem] lg:border-r lg:border-b-0">
            <Image
              src={project.visual.src}
              alt={project.visual.alt}
              width={project.visual.width}
              height={project.visual.height}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="size-full object-cover object-top transition duration-700 hover:scale-[1.015]"
            />
            <span className="absolute right-4 bottom-4 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[0.65rem] tracking-wide text-white/75 uppercase backdrop-blur">
              Capture réelle
            </span>
          </div>
          <div className="flex flex-col p-7 sm:p-10">
            <div className="flex items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 font-mono text-xs text-brand uppercase">
              <Code2 aria-hidden="true" className="size-4" />
              {project.kind}
            </p>
            <span className="font-mono text-xs text-white/42">{project.status}</span>
          </div>
            <h2 className="mt-10 text-4xl font-medium tracking-[-0.04em]">{project.title}</h2>
            <p className="mt-5 max-w-2xl flex-1 leading-7 text-muted-foreground">{project.problem}</p>
            <Link href={`/projets/${project.slug}`} className="group mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14">
            Consulter le projet
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
