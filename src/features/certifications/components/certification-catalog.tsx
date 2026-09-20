import { CertificationCard } from "./certification-card";
import { certifications } from "../certifications.data";

export function CertificationCatalog() {
  const featured = certifications.filter((certification) => certification.featured);
  const additional = certifications.filter((certification) => !certification.featured);

  return (
    <div className="grid gap-20">
      <section aria-labelledby="featured-certifications">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/12 pb-5">
          <h2 id="featured-certifications" className="text-3xl font-medium tracking-[-0.03em]">
            Certifications principales
          </h2>
          <p className="font-mono text-xs text-white/42">3 badges</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {featured.map((certification) => (
            <CertificationCard key={certification.slug} certification={certification} />
          ))}
        </div>
      </section>

      <section aria-labelledby="additional-certifications">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/12 pb-5">
          <h2 id="additional-certifications" className="text-3xl font-medium tracking-[-0.03em]">
            Formations Anthropic
          </h2>
          <p className="font-mono text-xs text-white/42">3 badges</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {additional.map((certification) => (
            <CertificationCard key={certification.slug} certification={certification} />
          ))}
        </div>
      </section>

      <p className="max-w-3xl border-l border-brand pl-5 text-sm leading-7 text-white/52">
        Cette page affiche des badges de parcours et de formation. Les documents PDF des certificats ne sont pas publiés sur le portfolio.
      </p>
    </div>
  );
}
