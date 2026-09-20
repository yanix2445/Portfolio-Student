import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EditorialMedia } from "@/shared/components/editorial-media";
import { editorialMedia } from "@/shared/config/editorial-media.config";
import { homeRoutes, homeSkills } from "../home.data";

export function HomeSkillsPreview() {
  return (
    <section id="competences" className="page-shell page-section">
      <div>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-label">Compétences remarquables</p>
            <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
              Opérationnel sur le terrain.
            </h2>
          </div>
          <div className="grid gap-7 lg:grid-cols-[1fr_.75fr] lg:items-end">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Des niveaux lisibles, fondés sur des réalisations concrètes plutôt
              que sur des pourcentages arbitraires.
            </p>
            <EditorialMedia
              media={editorialMedia.support}
              className="hidden lg:block"
              imageClassName="aspect-[4/3]"
              sizes="25vw"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
          {homeSkills.map((skill, index) => (
            <article
              key={skill.title}
              className={`editorial-card p-7 sm:p-9 ${index < 2 ? "xl:col-span-6" : "xl:col-span-3"}`}
            >
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                {skill.level}
              </p>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">
                {skill.title}
              </h3>
              <p className="mt-3 leading-7 text-muted-foreground">{skill.summary}</p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Outils pour ${skill.title}`}>
                {skill.tools.map((tool) => (
                  <li key={tool} className="rounded-full border border-white/12 bg-white/[0.025] px-3 py-1 font-mono text-[0.68rem] text-white/58">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Link href={homeRoutes.skills} className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14">
          Consulter toutes mes compétences
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
