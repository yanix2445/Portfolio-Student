"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Globe2,
  GraduationCap,
  Headphones,
  Minus,
  ServerCog,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { e5Missions } from "../e5.data";
import styles from "../e5-system.module.css";

const competencyColumns = [
  {
    key: "patrimoine",
    code: "C1",
    label: "Gérer le patrimoine",
    fullLabel: "Gérer le patrimoine informatique",
    match: "Gérer le patrimoine informatique",
    detail: "Inventorier, suivre et maintenir les équipements et services.",
    Icon: Boxes,
  },
  {
    key: "incidents",
    code: "C2",
    label: "Incidents et demandes",
    fullLabel: "Répondre aux incidents et aux demandes d’assistance et d’évolution",
    match: "Répondre aux incidents et aux demandes d’assistance et d’évolution",
    detail: "Qualifier une demande, diagnostiquer et assurer son suivi.",
    Icon: Headphones,
  },
  {
    key: "presence",
    code: "C3",
    label: "Présence en ligne",
    fullLabel: "Développer la présence en ligne de l’organisation",
    match: "Développer la présence en ligne de l’organisation",
    detail: "Faire évoluer une présence numérique au service de l’organisation.",
    Icon: Globe2,
  },
  {
    key: "projet",
    code: "C4",
    label: "Travailler en mode projet",
    fullLabel: "Travailler en mode projet",
    match: "Travailler en mode projet",
    detail: "Planifier, coordonner et rendre compte d’une réalisation.",
    Icon: Workflow,
  },
  {
    key: "service",
    code: "C5",
    label: "Mettre à disposition",
    fullLabel: "Mettre à disposition des utilisateurs un service informatique",
    match: "Mettre à disposition des utilisateurs un service informatique",
    detail: "Déployer un service, le tester et accompagner son usage.",
    Icon: ServerCog,
  },
  {
    key: "developpement",
    code: "C6",
    label: "Développement professionnel",
    fullLabel: "Organiser son développement professionnel",
    match: "Organiser son développement professionnel",
    detail: "Documenter ses acquis et faire évoluer sa pratique.",
    Icon: GraduationCap,
  },
] as const;

const organizationFilters = [
  { label: "Toutes les missions", value: "all" },
  { label: "EDLearn", value: "EDLearn" },
  { label: "Secours Catholique", value: "Secours Catholique-Caritas France" },
] as const;

const proofReading = [
  {
    label: "Une situation",
    detail: "Le contexte professionnel, le besoin rencontré et les contraintes à respecter.",
  },
  {
    label: "Une action",
    detail: "Les choix, les outils et les opérations réellement menées pendant la mission.",
  },
  {
    label: "Une preuve",
    detail: "Un résultat vérifiable, documenté sans exposer les données internes de l’organisation.",
  },
] as const;

type OrganizationFilter = (typeof organizationFilters)[number]["value"];

export function E5System() {
  const [organization, setOrganization] = useState<OrganizationFilter>("all");
  const filteredMissions = useMemo(
    () => e5Missions.filter((mission) => organization === "all" || mission.organization === organization),
    [organization],
  );
  const mobilizedCompetencies = competencyColumns.filter((column) =>
    e5Missions.some((mission) => mission.competencies.includes(column.match)),
  ).length;

  return (
    <main className={`${styles.e5SystemPage} portfolio-surface`}>
      <section className={styles.e5SystemHero}>
        <p>Épreuve E5 · BTS SIO SISR</p>
        <h1>Des situations réelles aux compétences démontrées.</h1>
        <div>
          <p>
            L’épreuve de support et de mise à disposition de services informatiques s’appuie ici sur six missions
            réalisées en stage. Chacune relie un besoin, une intervention et des preuves aux compétences du Bloc 1.
          </p>
          <a href="#e5-competences">Comprendre l’épreuve <ArrowDown aria-hidden="true" /></a>
        </div>
      </section>

      <section className={styles.e5SystemCompetencies} id="e5-competences" aria-labelledby="e5-competences-title">
        <header>
          <div>
            <span>Le référentiel E5</span>
            <h2 id="e5-competences-title">Six compétences structurent la lecture du parcours.</h2>
          </div>
          <p>
            La page ne présente pas une simple liste d’outils. Elle montre où chaque compétence apparaît et dans
            quelles missions elle peut être vérifiée.
          </p>
        </header>
        <ul>
          {competencyColumns.map(({ code, label, detail, match, Icon }) => {
            const coverage = e5Missions.filter((mission) => mission.competencies.includes(match)).length;
            return (
              <li key={code} data-empty={coverage === 0 || undefined}>
                <span>{code}</span>
                <Icon aria-hidden="true" />
                <strong>{label}</strong>
                <p>{detail}</p>
                <small>{coverage === 0 ? "À documenter" : `${coverage} mission${coverage > 1 ? "s" : ""}`}</small>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.e5SystemReading}>
        <p className={styles.e5SystemReadingLabel}>Ce que le jury peut vérifier</p>
        <ol>
          {proofReading.map((item, index) => (
            <li key={item.label}>
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>
        <div>
          <h2>Une compétence n’est pas seulement citée : elle est reliée à ce que j’ai réellement fait.</h2>
          <p>{mobilizedCompetencies}/{competencyColumns.length} compétences sont actuellement reliées aux missions présentées.</p>
        </div>
      </section>

      <section className={styles.e5SystemMissions} aria-labelledby="e5-missions-title">
        <header>
          <div>
            <span>Situations professionnelles</span>
            <h2 id="e5-missions-title">Six missions, deux environnements.</h2>
          </div>
          <p>
            Chaque fiche détaille le contexte, le besoin, ma contribution, les outils utilisés et les compétences
            mobilisées. Les éléments sensibles restent volontairement anonymisés.
          </p>
        </header>

        <div className={styles.e5SystemFilters} aria-label="Filtrer les missions par organisation">
          {organizationFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={organization === filter.value}
              onClick={() => setOrganization(filter.value)}
            >
              {filter.label}
              <span>{filter.value === "all" ? e5Missions.length : e5Missions.filter((mission) => mission.organization === filter.value).length}</span>
            </button>
          ))}
        </div>

        <div className={styles.e5SystemMissionGrid}>
          {filteredMissions.map((mission) => {
            const missionIndex = e5Missions.findIndex((entry) => entry.slug === mission.slug);
            const codes = competencyColumns
              .filter((column) => mission.competencies.includes(column.match))
              .map((column) => column.code);

            return (
              <Link href={`/epreuves/e5/${mission.slug}`} key={mission.slug}>
                <div className={styles.e5SystemMissionMeta}>
                  <span>Mission {String(missionIndex + 1).padStart(2, "0")}</span>
                  <small><i aria-hidden="true" />{mission.status}</small>
                </div>
                <div className={styles.e5SystemMissionBody}>
                  <p>{mission.organization}</p>
                  <h3>{mission.title}</h3>
                  <p className={styles.e5SystemMissionNeed}>{mission.need}</p>
                  <span>{mission.period}</span>
                </div>
                <div className={styles.e5SystemMissionFooter}>
                  <ul aria-label="Compétences mobilisées">
                    {codes.map((code) => <li key={code}>{code}</li>)}
                  </ul>
                  <span>Voir la mission <ArrowUpRight aria-hidden="true" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.e5SystemMatrix} aria-labelledby="e5-matrix-title">
        <header>
          <div>
            <span>Lecture transversale</span>
            <h2 id="e5-matrix-title">La matrice rend les liens visibles en un regard.</h2>
          </div>
          <div>
            <p>{filteredMissions.length} mission{filteredMissions.length > 1 ? "s" : ""} affichée{filteredMissions.length > 1 ? "s" : ""}</p>
            <div className={styles.matrixLegend} aria-label="Légende de la matrice">
              <span><Check aria-hidden="true" /> Mobilisée</span>
              <span><Minus aria-hidden="true" /> À relier</span>
            </div>
          </div>
        </header>

        <div className={styles.matrixDesktop}>
          <table>
            <caption className="sr-only">Correspondance entre les missions professionnelles E5 et les six compétences du Bloc 1</caption>
            <thead>
              <tr>
                <th scope="col">Mission professionnelle</th>
                {competencyColumns.map((column) => {
                  const coverage = e5Missions.filter((mission) => mission.competencies.includes(column.match)).length;
                  return (
                    <th key={column.key} scope="col" data-empty={coverage === 0 || undefined}>
                      <b>{column.code}</b>
                      <span>{column.label}</span>
                      <small>{coverage === 0 ? "À documenter" : `${coverage}/6 missions`}</small>
                    </th>
                  );
                })}
                <th scope="col"><span className="sr-only">Accéder à la fiche détaillée</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredMissions.map((mission) => {
                const missionIndex = e5Missions.findIndex((entry) => entry.slug === mission.slug);
                const coverage = competencyColumns.filter((column) => mission.competencies.includes(column.match)).length;
                return (
                  <tr key={mission.slug}>
                    <th scope="row">
                      <div className={styles.matrixMissionCell}>
                        <span>{String(missionIndex + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{mission.title}</strong>
                          <small>{mission.organization} · {mission.period}</small>
                        </div>
                      </div>
                    </th>
                    {competencyColumns.map((column) => (
                      <td key={column.key} data-covered={mission.competencies.includes(column.match) || undefined}>
                        <span className={styles.matrixCellState}>
                          {mission.competencies.includes(column.match)
                            ? <Check aria-label={`${column.fullLabel} : compétence mobilisée`} />
                            : <Minus aria-label={`${column.fullLabel} : compétence non reliée à cette mission`} />}
                        </span>
                      </td>
                    ))}
                    <td>
                      <span className={styles.matrixCoverage}>{coverage}/{competencyColumns.length}</span>
                      <Link href={`/epreuves/e5/${mission.slug}`} aria-label={`Consulter la fiche détaillée : ${mission.title}`}>
                        <span>Voir</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ol className={styles.matrixCards} aria-label="Missions et compétences mobilisées">
          {filteredMissions.map((mission) => {
            const missionIndex = e5Missions.findIndex((entry) => entry.slug === mission.slug);
            const coverage = competencyColumns.filter((column) => mission.competencies.includes(column.match)).length;
            return (
              <li key={mission.slug}>
                <header>
                  <span>{String(missionIndex + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{mission.title}</h3>
                    <p>{mission.organization} · {mission.period}</p>
                  </div>
                  <strong>{coverage}/{competencyColumns.length}</strong>
                </header>
                <dl>
                  {competencyColumns.map((column) => {
                    const isCovered = mission.competencies.includes(column.match);
                    return (
                      <div key={column.key} data-covered={isCovered || undefined}>
                        <dt><span>{column.code}</span>{column.label}</dt>
                        <dd>
                          {isCovered
                            ? <><Check aria-hidden="true" /><span>Mobilisée</span></>
                            : <><Minus aria-hidden="true" /><span>À relier</span></>}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <Link href={`/epreuves/e5/${mission.slug}`}>
                  Consulter la fiche détaillée
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
