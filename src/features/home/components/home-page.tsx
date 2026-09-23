import { HomeCertificationsPreview } from "./home-certifications-preview";
import { HomeContactCta } from "./home-contact-cta";
import { HomeEvidencePreview } from "./home-evidence-preview";
import { HomeFaq } from "./home-faq";
import { HomeHero } from "./home-hero";
import { HomeProjectsPreview } from "./home-projects-preview";
import { HomeProofStrip } from "./home-proof-strip";
import { HomeSkillsPreview } from "./home-skills-preview";
import { HomeStatement } from "./home-statement";
import { HomeWatchPreview } from "./home-watch-preview";

export function HomePage() {
  return (
    <main className="home-page overflow-x-hidden bg-[var(--home-bg)] text-[var(--home-text)]">
      <HomeHero />
      <HomeProofStrip />
      <HomeStatement />
      <HomeSkillsPreview />
      <HomeEvidencePreview />
      <HomeProjectsPreview />
      <HomeCertificationsPreview />
      <HomeWatchPreview />
      <HomeFaq />
      <HomeContactCta />
    </main>
  );
}
