import { CalendarDays, Menu } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site.config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-sm text-sm font-semibold tracking-[0.12em] uppercase"
          aria-label={`${siteConfig.name}, accueil`}
        >
          <span
            className="grid size-9 place-items-center border border-white/20 text-xs text-brand"
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
            <summary className="grid size-11 cursor-pointer list-none place-items-center border border-white/15 text-white/80 marker:content-none">
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Ouvrir la navigation</span>
            </summary>
            <nav
              aria-label="Navigation mobile"
              className="absolute right-0 top-13 grid min-w-52 gap-1 border border-white/15 bg-[#0b0b0b] p-2 shadow-2xl"
            >
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>

          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 bg-brand px-4 text-sm font-semibold text-brand-foreground transition-colors hover:bg-[#ffad61]"
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
