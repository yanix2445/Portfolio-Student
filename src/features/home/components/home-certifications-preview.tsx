import { Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { certifications } from "@/features/certifications";
import { homeRoutes } from "../home.data";

export function HomeCertificationsPreview() {
  return (
    <section id="certifications" className="page-shell page-section">
      <div>
        <p className="section-label">Certifications</p>
        <h2 className="mt-6 max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
          Des acquis vérifiables, du support à la cybersécurité.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {certifications.map((certification, index) => (
            <article
              key={certification.title}
              className={`editorial-card flex min-h-64 flex-col p-6 sm:p-8 ${index < 3 ? "lg:col-span-4" : "lg:col-span-4"}`}
            >
              <div className="grid size-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.035]">
                {certification.badge.type === "image" ? (
                  <Image
                    src={certification.badge.src}
                    alt={certification.badge.alt}
                    width={96}
                    height={96}
                    className="size-16 object-contain"
                  />
                ) : (
                  <div role="img" aria-label={`Badge Anthropic ${certification.title}`} className="text-center">
                    <Award aria-hidden="true" className="mx-auto size-5 text-brand" />
                    <span className="mt-1 block font-mono text-sm font-bold text-white">{certification.badge.mark}</span>
                  </div>
                )}
              </div>
              <p className="mt-7 font-mono text-[0.68rem] tracking-[0.12em] text-white/45 uppercase">
                {certification.kind}
              </p>
              <h3 className="mt-3 text-xl font-medium">{certification.title}</h3>
              <p className="mt-auto pt-4 text-sm text-muted-foreground">{certification.issuer}</p>
            </article>
          ))}
        </div>

        <Link href={homeRoutes.certifications} className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14">
          Consulter les six badges
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
