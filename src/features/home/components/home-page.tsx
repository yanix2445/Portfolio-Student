import { HomeCertificationsPreview } from "./home-certifications-preview";
import { HomeContactCta } from "./home-contact-cta";
import { HomeE5Preview } from "./home-e5-preview";
import { HomeE6Preview } from "./home-e6-preview";
import { HomeHero } from "./home-hero";
import { HomeProjectsPreview } from "./home-projects-preview";
import { HomeProofStrip } from "./home-proof-strip";
import { HomeSkillsPreview } from "./home-skills-preview";
import { HomeWatchPreview } from "./home-watch-preview";

export function HomePage() {
  return (
    <main className="overflow-x-hidden bg-[#070707] text-[#f7f3ec]">
      <HomeHero />
      <HomeProofStrip />
      <HomeSkillsPreview />
      <HomeE5Preview />
      <HomeE6Preview />
      <HomeProjectsPreview />
      <HomeCertificationsPreview />
      <HomeWatchPreview />
      <HomeContactCta />
    </main>
  );
}
