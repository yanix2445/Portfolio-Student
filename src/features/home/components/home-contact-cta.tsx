import { ArrowUpRight, CalendarDays, Download, Mail } from "lucide-react";
import { siteConfig } from "@/shared/config/site.config";

export function HomeContactCta() {
  return (
    <section aria-labelledby="contact-title" className="px-5 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-[90rem] bg-brand px-6 py-12 text-brand-foreground sm:px-10 sm:py-16 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.18em] uppercase">
              Disponible dès maintenant
            </p>
            <h2 id="contact-title" className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
              Mon profil correspond à votre besoin&nbsp;?
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-black/68">
              Échangeons sur une alternance ou un CDI en support systèmes et réseaux, en Île-de-France ou à distance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-between gap-8 bg-[#111] px-5 text-sm font-semibold text-white hover:bg-white hover:text-black"
            >
              <span className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="size-4" />
                Réserver 30 minutes
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-black/35 px-5 text-sm font-semibold hover:bg-black/10"
            >
              <Mail aria-hidden="true" className="size-4" />
              Écrire un courriel
            </a>
            <a
              href={siteConfig.cvUrl}
              download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-black/35 px-5 text-sm font-semibold hover:bg-black/10"
            >
              <Download aria-hidden="true" className="size-4" />
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
