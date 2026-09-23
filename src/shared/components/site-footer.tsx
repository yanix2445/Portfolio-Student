import { siteConfig } from "@/shared/config/site.config";

export function SiteFooter() {
  return (
    <footer className="bg-[#050505] px-4 pb-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 py-7 text-sm text-[#8c8c8c] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {siteConfig.name} · BTS SIO SISR</p>
        <div className="flex flex-wrap gap-2">
          <a className="inline-flex min-h-11 items-center px-2 hover:text-white" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a className="inline-flex min-h-11 items-center px-2 hover:text-white" href={siteConfig.linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="inline-flex min-h-11 items-center px-2 hover:text-white" href={`mailto:${siteConfig.email}`}>Contact</a>
        </div>
      </div>
    </footer>
  );
}
