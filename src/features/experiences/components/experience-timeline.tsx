import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { experiences } from "../experiences.data";
import { getE5MissionBySlug } from "@/features/bts-e5";

export function ExperienceTimeline() {
  return (
    <div className="relative grid gap-8 before:absolute before:bottom-0 before:left-[0.45rem] before:top-2 before:w-px before:bg-white/12">
      {experiences.map((experience) => (
        <article key={experience.slug} className="relative pl-10">
          <span className="absolute left-0 top-2 size-4 rounded-full border-4 border-[#070707] bg-brand" aria-hidden="true" />
          <div className="border border-white/12 bg-[#0b0b0b] p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start">
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-xs text-brand uppercase">
                  <BriefcaseBusiness aria-hidden="true" className="size-4" />
                  Stage
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em]">
                  {experience.organization}
                </h2>
                <p className="mt-2 text-white/70">{experience.role}</p>
              </div>
              <div className="text-sm sm:text-right">
                <p className="font-mono text-brand">{experience.period}</p>
                <p className="mt-1 text-white/42">{experience.location}</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl leading-7 text-white/58">{experience.summary}</p>
            <div className="mt-7 grid gap-3">
              {experience.missionSlugs.map((slug) => {
                const mission = getE5MissionBySlug(slug);
                return mission ? (
                  <Link
                    key={slug}
                    href={`/epreuves/e5/${slug}`}
                    className="group flex min-h-12 items-center justify-between gap-4 border-t border-white/10 py-4 text-sm font-medium hover:text-brand"
                  >
                    {mission.title}
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
