import { HomeCertificationsPreview } from "./home-certifications-preview";
import { HomeContactCta } from "./home-contact-cta";
import { HomeEvidencePreview } from "./home-evidence-preview";
import { HomeExperiencesPreview } from "./home-experiences-preview";
import { HomeFaq } from "./home-faq";
import { HomeHero } from "./home-hero";
import { HomeProjectsPreview } from "./home-projects-preview";
import { HomeProofStrip } from "./home-proof-strip";
import { HomeScrollAnchor } from "./home-scroll-anchor";
import { HomeSkillsPreview } from "./home-skills-preview";
import { HomeStatement } from "./home-statement";
import { HomeWatchPreview } from "./home-watch-preview";

export function HomePage() {
  return (
    <main className="home-page overflow-x-hidden bg-[var(--home-bg)] text-[var(--home-text)]">
      <HomeScrollAnchor />
      <HomeHero />
      <HomeProofStrip />
      <HomeStatement />
      <HomeSkillsPreview />
      <HomeEvidencePreview />
      <HomeExperiencesPreview />
      <HomeProjectsPreview />
      <HomeCertificationsPreview />
      <HomeWatchPreview />
      <HomeFaq />
      <HomeContactCta />
    </main>
  );
}
