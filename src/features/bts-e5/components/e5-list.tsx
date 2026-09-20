import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { e5Missions } from "../e5.data";

const organizations = ["EDLearn", "Secours Catholique-Caritas France"] as const;

export function E5List() {
  return (
    <div className="grid gap-12">
      {organizations.map((organization) => {
        const missions = e5Missions.filter(
          (mission) => mission.organization === organization,
        );
        const organizationId =
          organization === "EDLearn" ? "organization-edlearn" : "organization-secours-catholique";

        return (
          <section key={organization} aria-labelledby={organizationId}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-5">
              <h2 id={organizationId} className="inline-flex items-center gap-3 text-3xl font-medium tracking-[-0.03em]">
                <Building2 aria-hidden="true" className="size-6 text-brand" />
                {organization}
              </h2>
              <p className="font-mono text-xs text-white/42">3 réalisations</p>
            </div>

            <div className="grid border-l border-white/10 lg:grid-cols-3">
              {missions.map((mission) => (
                <article key={mission.slug} className="flex flex-col border-b border-r border-white/10 p-6 sm:p-8">
                  <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-brand uppercase">
                    <CheckCircle2 aria-hidden="true" className="size-4" />
                    {mission.status}
                  </p>
                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{mission.title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-white/55">{mission.need}</p>
                  <Link
                    href={`/epreuves/e5/${mission.slug}`}
                    className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
                  >
                    Consulter la fiche
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
