import { FileCheck2, Mail } from "lucide-react";
import { siteConfig } from "@/shared/config/site.config";
import { HomeReveal } from "./home-reveal";

export function HomeContactCta() {
  return (
    <section className="px-4 pb-24 pt-8 sm:px-6">
      <HomeReveal className="mx-auto grid max-w-7xl gap-7 rounded-2xl bg-[var(--home-accent)] p-7 text-center text-black sm:p-10">
        <div className="mx-auto">
          <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Un besoin en support systèmes et réseaux ? Échangeons pendant 30 minutes.
          </h2>
          <p className="mt-3 text-sm text-black/70">Disponible dès maintenant à Paris et en Île-de-France.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-xl bg-black px-5 text-sm font-bold text-white transition-transform duration-150 ease-out active:scale-[0.97]">
            Réserver un échange
          </a>
          <a href={siteConfig.cvUrl} download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/75 px-5 text-sm font-bold">
            <FileCheck2 className="size-4" aria-hidden="true" /> CV
          </a>
          <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-bold underline underline-offset-8">
            <Mail className="size-4" aria-hidden="true" /> Courriel
          </a>
        </div>
      </HomeReveal>
    </section>
  );
}
