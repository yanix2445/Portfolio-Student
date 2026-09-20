import { ArrowUpRight, Download, Mail } from "lucide-react";
import { siteConfig } from "@/shared/config/site.config";

export function SiteFooter() {
  return (
    <footer className="px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[90rem] gap-8 rounded-[1.5rem] border border-white/10 bg-surface-raised/72 p-7 shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:items-end lg:p-10">
        <div>
          <p className="font-heading text-3xl font-medium tracking-[-0.035em]">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
            Technicien support systèmes et réseaux, disponible en Île-de-France.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-brand"
          >
            <Mail aria-hidden="true" className="size-4" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-brand"
          >
            Réserver un échange
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href={siteConfig.cvUrl}
            download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
            className="inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-brand"
          >
            <Download aria-hidden="true" className="size-4" />
            Télécharger mon CV
          </a>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/55 sm:col-span-2 sm:flex-row sm:justify-between">
          <p>© 2026 {siteConfig.name}</p>
          <p>Portfolio étudiant · BTS SIO SISR</p>
        </div>
      </div>
    </footer>
  );
}
