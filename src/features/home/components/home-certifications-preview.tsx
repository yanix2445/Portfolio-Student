import { Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { homeCertifications, homeRoutes } from "../home.data";

export function HomeCertificationsPreview() {
  return (
    <section id="certifications" className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="section-label">Certifications</p>
        <h2 className="mt-6 max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
          Des acquis vérifiables, du support à la cybersécurité.
        </h2>

        <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {homeCertifications.map((certification) => (
            <article key={certification.title} className="border-b border-r border-white/10 p-6 sm:p-8">
              <Award aria-hidden="true" className="size-6 text-brand" />
              <p className="mt-8 font-mono text-[0.68rem] tracking-[0.12em] text-white/40 uppercase">
                {certification.kind}
              </p>
              <h3 className="mt-3 text-xl font-medium">{certification.title}</h3>
              <p className="mt-2 text-sm text-white/48">{certification.issuer}</p>
            </article>
          ))}
        </div>

        <Link href={homeRoutes.certifications} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
          Consulter les six badges
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
