import { CheckCircle2 } from "lucide-react";
import { skillDomains } from "../skills.data";

export function SkillsCatalog() {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {skillDomains.map((domain, index) => (
        <article
          key={domain.slug}
          id={domain.slug}
          className={`editorial-card scroll-mt-28 p-7 sm:p-10 ${index < 2 ? "lg:col-span-6" : "lg:col-span-4"}`}
        >
          <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand uppercase">
            {domain.level}
          </p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
            {domain.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            {domain.summary}
          </p>
          <ul className="mt-7 grid gap-3">
            {domain.practices.map((practice) => (
              <li key={practice} className="flex gap-3 text-sm leading-6 text-white/72">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                {practice}
              </li>
            ))}
          </ul>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Technologies pour ${domain.title}`}>
            {domain.tools.map((tool) => (
              <li key={tool} className="rounded-full border border-white/12 bg-white/[0.025] px-3 py-1 font-mono text-[0.68rem] text-white/58">
                {tool}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
