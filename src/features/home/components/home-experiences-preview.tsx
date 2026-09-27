import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experiences } from "@/features/experiences";
import { HomeReveal } from "./home-reveal";
import styles from "./home-experiences-preview.module.css";

const cvExperienceSlugs = new Set([
  "secours-catholique",
  "iut-meaux",
  "coco-rocco",
  "fibrouss",
]);

const chronologicalExperiences = experiences
  .filter((experience) => cvExperienceSlugs.has(experience.slug))
  .toReversed();

export function HomeExperiencesPreview() {
  return (
    <section id="experiences" className={styles.section} aria-labelledby="home-experiences-title">
      <HomeReveal className="portfolio-shell">
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Expériences professionnelles</p>
            <h2 id="home-experiences-title">Un seul rail, quatre étapes qui construisent le même profil.</h2>
          </div>
          <div className={styles.intro}>
            <p>
              Ces quatre jalons sont une sélection, pas l’intégralité de mon parcours. La page Expériences rassemble toutes mes expériences et leur détail.
            </p>
            <Link href="/parcours" className={styles.moreLink}>
              Voir toutes mes expériences
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </header>

        <ol className={styles.timeline} aria-label="Chronologie des expériences professionnelles">
          {chronologicalExperiences.map((experience, index) => (
            <li key={experience.slug} className={styles.step}>
              <div className={styles.date}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{experience.period}</time>
              </div>
              <div className={styles.node} aria-hidden="true"><span /></div>
              <article>
                <div>
                  <p>{experience.organization}</p>
                  <h3>{experience.role}</h3>
                </div>
                <p>{experience.summary}</p>
                <ul aria-label={`Outils et acquis associés à ${experience.role}`}>
                  {experience.tools.slice(0, 3).map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </HomeReveal>
    </section>
  );
}
