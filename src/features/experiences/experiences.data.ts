import type { Experience } from "./experience.types";

export const experiences: readonly Experience[] = [
  {
    slug: "secours-catholique",
    organization: "Secours Catholique-Caritas France",
    period: "Juin — septembre 2026",
    role: "Technicien helpdesk N1/N2",
    location: "Île-de-France",
    type: "Stage",
    domain: "Support informatique",
    context: "BTS SIO SISR",
    summary:
      "Support utilisateurs, gestion des comptes et des accès, maintenance du parc et suivi des incidents dans un contexte associatif national.",
    highlights: [
      "Qualifier et résoudre les tickets N1/N2 dans le respect des SLA",
      "Administrer les comptes et droits d’accès dans Active Directory",
      "Déployer, configurer et maintenir les postes du parc informatique",
    ],
    tools: ["Windows", "Microsoft 365", "Active Directory", "VPN"],
    missionSlugs: [
      "enrolement-postes-suivi-parc",
      "vpn-acces-distant",
      "migration-serveur-fichiers-cloud",
    ],
  },
  {
    slug: "edlearn",
    organization: "EDLearn",
    period: "Février — avril 2026",
    role: "Technicien support systèmes et réseaux",
    location: "Île-de-France",
    type: "Stage",
    domain: "Systèmes et réseaux",
    context: "BTS SIO SISR",
    summary:
      "Support utilisateurs, administration de Google Workspace, audit Wi-Fi et participation à la migration de services d’impression.",
    highlights: [
      "Accompagner les utilisateurs et administrer Google Workspace",
      "Auditer le réseau Wi-Fi et documenter les constats",
      "Préparer la migration d’un service d’impression vers le cloud",
    ],
    tools: ["Google Workspace", "Zendesk", "Wi-Fi", "Cloud"],
    missionSlugs: [
      "migration-serveur-impression-cloud",
      "audit-reseau-wifi",
      "support-n1-n2-google-workspace",
    ],
  },
  {
    slug: "iut-meaux",
    organization: "IUT de Meaux",
    period: "2025",
    role: "Consultant IT junior & développeur",
    location: "Meaux",
    type: "Projet universitaire",
    domain: "Système d’information",
    context: "Projet livré",
    summary:
      "Refonte d’un système d’information hybride, de l’analyse du besoin jusqu’à la livraison et à la formation des utilisateurs.",
    highlights: [
      "Analyser les besoins métier et cadrer le projet en méthode agile",
      "Modéliser les données et automatiser les flux du système",
      "Tester, documenter, livrer puis former les utilisateurs",
    ],
    tools: ["Airtable", "n8n", "JavaScript", "Python"],
    evidenceNote: "Système livré, documentation produite et utilisateurs formés.",
  },
  {
    slug: "coco-rocco",
    organization: "Coco Rocco",
    period: "2023 — 2025",
    role: "Chef de rang",
    type: "Emploi",
    domain: "Service client",
    context: "Compétences transférables",
    summary:
      "Une expérience de service exigeante qui a renforcé ma communication, ma coordination et ma capacité à traiter plusieurs demandes en parallèle.",
    highlights: [
      "Accueillir, conseiller et assurer la satisfaction client",
      "Coordonner le service avec la cuisine et maintenir un rythme fluide",
      "Encadrer les commis et les accompagner dans leurs missions",
    ],
    tools: ["Relation client", "Coordination", "Priorisation", "Encadrement"],
    evidenceNote: "Contexte détaillé et retour d’expérience disponibles en entretien.",
  },
  {
    slug: "fibrouss",
    organization: "Fibrouss",
    period: "2022 — 2023",
    role: "Technicien fibre optique",
    type: "Emploi",
    domain: "Réseaux télécoms",
    context: "Interventions terrain",
    summary:
      "Déploiement et maintenance d’infrastructures FTTH, mise en service des équipements réseau et assistance technique aux utilisateurs.",
    highlights: [
      "Installer et maintenir les infrastructures FTTH",
      "Configurer les Freebox, ONT, routeurs et modems",
      "Diagnostiquer les incidents de connectivité, débit et matériel",
    ],
    tools: ["FTTH", "ONT", "Routeurs", "Diagnostic réseau"],
    evidenceNote: "Contexte détaillé et retour d’expérience disponibles en entretien.",
  },
];
