import { ArrowRight } from "lucide-react";
import { homeSkills } from "../home.data";

export function HomeSkillsPreview() {
  return (
    <section id="competences" className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[90rem]">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="section-label">Compétences remarquables</p>
            <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
              Opérationnel sur le terrain.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/58 lg:justify-self-end">
            Des niveaux lisibles, fondés sur des réalisations concrètes plutôt
            que sur des pourcentages arbitraires.
          </p>
        </div>

        <div className="mt-14 grid border-l border-t border-white/10 md:grid-cols-2 xl:grid-cols-3">
          {homeSkills.map((skill) => (
            <article key={skill.title} className="border-b border-r border-white/10 p-7 sm:p-9">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                {skill.level}
              </p>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">
                {skill.title}
              </h3>
              <p className="mt-3 leading-7 text-white/55">{skill.summary}</p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Outils pour ${skill.title}`}>
                {skill.tools.map((tool) => (
                  <li key={tool} className="border border-white/12 px-2.5 py-1 font-mono text-[0.68rem] text-white/54">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <a href="#e5" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
          Voir les compétences en situation
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </section>
  );
}
