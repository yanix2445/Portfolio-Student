import { CalendarDays, Download, Menu } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site.config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex min-h-16 w-full max-w-[90rem] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-background/88 px-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-5">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-xl text-sm font-semibold tracking-[0.12em] uppercase"
          aria-label={`${siteConfig.name}, accueil`}
        >
          <span
            className="grid size-9 place-items-center rounded-xl border border-brand/35 bg-brand/8 text-xs text-brand"
            aria-hidden="true"
          >
            {siteConfig.initials}
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 text-sm text-white/70 lg:flex"
        >
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <details className="relative lg:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-xl border border-white/15 bg-white/[0.035] text-white/80 marker:content-none">
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Ouvrir la navigation</span>
            </summary>
            <nav
              aria-label="Navigation mobile"
              className="absolute top-13 right-0 grid min-w-52 gap-1 rounded-2xl border border-white/15 bg-surface-raised p-2 shadow-2xl"
            >
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>

          <a
            href={siteConfig.cvUrl}
            download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/18 bg-white/[0.035] px-3 text-sm font-semibold text-white/78 transition-colors hover:border-brand/70 hover:bg-brand/8 hover:text-brand sm:px-4"
            aria-label="Télécharger mon CV"
          >
            <Download aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Télécharger mon CV</span>
          </a>

          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/10 transition-all hover:-translate-y-0.5 hover:bg-[#ffad61]"
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Prendre rendez-vous</span>
            <span className="sm:hidden">Rendez-vous</span>
          </a>
        </div>
      </div>
    </header>
  );
}
