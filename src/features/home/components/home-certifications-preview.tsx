import Image from "next/image";
import Link from "next/link";
import { certifications } from "@/features/certifications/certifications.data";
import { homeRoutes } from "../home.data";
import { HomeReveal } from "./home-reveal";

const featuredCertification = certifications.find((item) => item.slug === "google-it-support") ?? certifications[0];
const supportingCertifications = certifications.filter(
  (item) => item.slug !== featuredCertification.slug && item.issuer !== "Anthropic",
);

export function HomeCertificationsPreview() {
  return (
    <section id="certifications" className="px-4 py-20 sm:px-6 lg:py-24" aria-labelledby="home-certifications-title">
      <HomeReveal className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14">
          <h2 id="home-certifications-title" className="max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Des acquis alignés avec le support, les systèmes et les réseaux.
          </h2>
          <div>
            <p className="max-w-2xl text-base leading-7 text-[var(--home-text-muted)] text-pretty">
              Google IT Support reste la certification principale. Le catalogue complet accueillera les prochaines validations sans alourdir l’accueil.
            </p>
            <Link href={homeRoutes.certifications} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--home-accent-hover)] underline decoration-[var(--home-accent)]/40 underline-offset-8">
              Catalogue complet
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="grid gap-6 rounded-2xl bg-[var(--home-accent)] p-6 text-black sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div>
              <p className="text-sm font-semibold">Certification principale · {featuredCertification.issued}</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{featuredCertification.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-black/75 text-pretty">{featuredCertification.description}</p>
            </div>
            {featuredCertification.badge.type === "image" && (
              <Image src={featuredCertification.badge.src} alt={featuredCertification.badge.alt} width={180} height={180} className="size-32 justify-self-center object-contain sm:size-40" />
            )}
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {supportingCertifications.map((item) => (
              <article key={item.slug} className="grid gap-4 rounded-2xl bg-[var(--home-surface-raised)] p-5 ring-1 ring-white/[0.08] min-[380px]:grid-cols-[4.5rem_1fr] min-[380px]:items-center sm:p-6">
                {item.badge.type === "image" && (
                  <Image src={item.badge.src} alt={item.badge.alt} width={120} height={120} className="size-16 justify-self-start object-contain min-[380px]:size-[4.5rem]" />
                )}
                <div className="min-w-0">
                  <p className="text-xs text-[var(--home-text-subtle)]">{item.issuer} · {item.issued}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-pretty">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </HomeReveal>
    </section>
  );
}
