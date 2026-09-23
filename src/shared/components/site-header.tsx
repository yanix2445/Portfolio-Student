import { Download } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site.config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#050505] px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Navigation principale"
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[rgba(13,13,13,0.92)] shadow-[0_18px_50px_rgba(0,0,0,0.38)] ring-1 ring-white/10 backdrop-blur-xl"
      >
        <div className="flex min-h-14 items-center justify-between gap-3 px-3 sm:px-5">
          <Link
            href="/"
            aria-label={`${siteConfig.name}, accueil`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-xl sm:min-w-0 sm:justify-start"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#ff7a00] text-sm font-bold text-black" aria-hidden="true">
              {siteConfig.initials}
            </span>
            <span className="hidden text-sm font-semibold sm:block">{siteConfig.name}</span>
          </Link>

          <div className="hidden items-center gap-5 text-sm text-[#b5b5b5] lg:flex">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.cvUrl}
              download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
              className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#b5b5b5] hover:text-white sm:inline-flex"
            >
              <Download className="size-4" aria-hidden="true" /> CV
            </a>
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl bg-[#ff7a00] px-3 text-sm font-bold text-black transition-[transform,background-color] duration-150 ease-out hover:bg-[#ff9838] active:scale-[0.97] sm:px-4"
            >
              Réserver{" "}<span className="hidden sm:inline">un échange</span>
            </a>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-white/[0.07] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          <div className="flex min-w-max items-center px-2">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center px-3 text-xs font-medium text-[#b5b5b5] hover:text-white">
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.cvUrl}
              download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
              className="inline-flex min-h-11 min-w-11 items-center gap-1.5 px-3 text-xs font-semibold text-[#ff9838] sm:hidden"
            >
              <Download className="size-3.5" aria-hidden="true" /> CV
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
