import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, ShieldAlert, Wrench } from "lucide-react";
import type { E6Realization } from "../e6.types";

export function E6Detail({ realization }: { realization: E6Realization }) {
  return (
    <article>
      <header className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <Link href="/epreuves/e6" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/58 hover:text-brand">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Retour aux réalisations E6
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="section-label">BTS SIO SISR · E6</p>
            <span className="inline-flex items-center gap-2 border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand uppercase">
              <Clock3 aria-hidden="true" className="size-3.5" />
              {realization.status}
            </span>
          </div>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            {realization.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">{realization.summary}</p>
        </div>
      </header>

      <div className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-12">
            <ContentSection title="Contexte">
              <p>{realization.context}</p>
            </ContentSection>
            <ContentSection title="Objectif">
              <p>{realization.objective}</p>
            </ContentSection>
            <ContentSection title="Périmètre prévu">
              <ItemList items={realization.plannedScope} />
            </ContentSection>
            <ContentSection title="Travaux en cours">
              <ItemList items={realization.currentWork} />
            </ContentSection>
            <section className="border border-brand/35 bg-brand/5 p-6 sm:p-8">
              <h2 className="inline-flex items-center gap-3 text-2xl font-medium">
                <ShieldAlert aria-hidden="true" className="size-6 text-brand" />
                Résultat non publié
              </h2>
              <p className="mt-4 leading-7 text-white/62">
                Cette réalisation est en cours. Aucun test final, impact, conformité ou niveau d’achèvement n’est affirmé avant la production de preuves vérifiables.
              </p>
            </section>
          </div>

          <aside className="grid content-start gap-5 lg:sticky lg:top-24">
            {realization.tools.length > 0 ? (
              <section className="border border-white/12 bg-[#0b0b0b] p-6">
                <h2 className="inline-flex items-center gap-2 text-xl font-medium">
                  <Wrench aria-hidden="true" className="size-5 text-brand" />
                  Outils prévus
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {realization.tools.map((tool) => (
                    <li key={tool} className="border border-white/12 px-2.5 py-1.5 font-mono text-xs text-white/62">
                      {tool}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className="border border-white/12 bg-[#0b0b0b] p-6">
              <h2 className="text-xl font-medium">Compétences visées</h2>
              <ItemList items={realization.competencies} />
            </section>
            <section className="border border-white/12 bg-[#0b0b0b] p-6">
              <h2 className="text-xl font-medium">Preuves disponibles</h2>
              <ItemList items={realization.availableEvidence} />
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}

function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-3xl font-medium tracking-[-0.03em]">{title}</h2>
      <div className="mt-5 max-w-3xl text-base leading-8 text-white/64">{children}</div>
    </section>
  );
}

function ItemList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/68">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}
