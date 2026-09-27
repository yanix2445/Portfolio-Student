import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileCode2, Files, MonitorCog, Network } from "lucide-react";
import { e6Realizations } from "../e6.data";
import styles from "../e6-system.module.css";

const icons = [Files, Network, MonitorCog, FileCode2] as const;

const examDay = [
  {
    label: "Comprendre la demande",
    detail: "Identifier les opérations attendues et retrouver rapidement les éléments utiles dans le dossier technique.",
  },
  {
    label: "Intervenir sur la solution",
    detail: "Configurer, tester ou dépanner les services demandés sur l’environnement virtuel préparé.",
  },
  {
    label: "Justifier et vérifier",
    detail: "Expliquer les choix réalisés, suivre la procédure et présenter des preuves de bon fonctionnement.",
  },
] as const;

const e6Deliverables = [
  {
    code: "D1",
    label: "Fiches de situation",
    detail: "Le contexte professionnel, le besoin, les contraintes et les objectifs de chaque réalisation.",
  },
  {
    code: "D2",
    label: "Documentation technique",
    detail: "Les schémas réseau, le plan d’adressage IP et les procédures de configuration pas à pas.",
  },
  {
    code: "D3",
    label: "Environnement de démonstration",
    detail: "Les machines virtuelles préconfigurées et prêtes pour les manipulations de l’épreuve.",
  },
  {
    code: "D4",
    label: "Scripts et preuves",
    detail: "Les automatisations, les tests et les résultats qui rendent le fonctionnement vérifiable.",
  },
] as const;

export function E6System() {
  return (
    <main className={`${styles.systemPage} portfolio-surface`}>
      <section className={styles.systemHero}>
        <p>Épreuve E6 · BTS SIO SISR</p>
        <h1>Une infrastructure ne se raconte pas. Elle se démontre.</h1>
        <div>
          <p>
            Deux réalisations techniques servent de support à une épreuve pratique. Le jury doit pouvoir comprendre
            la solution, suivre les opérations et contrôler le résultat.
          </p>
          <a href="#system-map">Voir la structure de l’épreuve <ArrowDown aria-hidden="true" /></a>
        </div>
      </section>

      <section className={styles.systemMap} id="system-map" aria-labelledby="system-map-title">
        <header>
          <h2 id="system-map-title">Chaque réalisation doit être comprise, manipulée et vérifiée.</h2>
          <p>
            Avant l’épreuve, je prépare le contexte, la documentation, l’environnement virtuel et les preuves
            techniques nécessaires à la manipulation.
          </p>
        </header>
        <div className={styles.systemDiagram}>
          <ul className={styles.systemOrbit}>
            {e6Deliverables.map((deliverable, index) => {
              const Icon = icons[index];
              return (
                <li key={deliverable.code}>
                  <span>{deliverable.code}</span>
                  <Icon aria-hidden="true" />
                  <strong>{deliverable.label}</strong>
                  <p>{deliverable.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.systemReading}>
        <p className={styles.systemReadingLabel}>Le jour de l’épreuve</p>
        <div className={styles.systemStatement}>
          <h2>Pendant 1 h 30, j’interviens sur l’environnement et je démontre ma maîtrise technique.</h2>
        </div>
        <ol>
          {examDay.map((stage, index) => (
            <li key={stage.label}>
              <span>0{index + 1}</span>
              <strong>{stage.label}</strong>
              <p>{stage.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.systemRealizations}>
        <header>
          <div><span>Support de l’épreuve</span><h2>Deux réalisations en préparation.</h2></div>
          <p>Ces pages détaillées rassemblent le contexte, le périmètre prévu, les travaux en cours et les preuves réellement disponibles.</p>
        </header>
        <div>
          {e6Realizations.map((realization, index) => (
            <Link href={`/epreuves/e6/${realization.slug}`} key={realization.slug}>
              <p className={styles.systemCardIndex}>
                <span>Dossier</span>
                <strong>0{index + 1}</strong>
              </p>
              <h3>{realization.title}</h3>
              <div className={styles.systemCardFooter}>
                <small><i aria-hidden="true" />{realization.status}</small>
                <span>Voir le dossier <ArrowUpRight aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
