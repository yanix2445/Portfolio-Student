import { siteConfig } from "@/shared/config/site.config";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--portfolio-canvas)] px-4 pb-8 sm:px-6">
      <div className="portfolio-shell flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-[var(--portfolio-text-subtle)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {siteConfig.name} · BTS SIO SISR</p>
        <div className="flex flex-wrap gap-2">
          <a className="inline-flex min-h-11 items-center px-2 hover:text-[var(--portfolio-text)]" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a className="inline-flex min-h-11 items-center px-2 hover:text-[var(--portfolio-text)]" href={siteConfig.linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          <Link className="inline-flex min-h-11 items-center px-2 hover:text-[var(--portfolio-text)]" href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
