---
objective: "La veille publique du portfolio doit presenter partout le nouveau sujet SISR et deux syntheses coherentes, sourcees et accessibles sans conserver de contenu editorial centre sur le developpement applicatif."
status: in-progress
---

# Plan: Réalignement de la veille technologique sur le BTS SIO SISR

## Overview

| Field      | Value |
| ---------- | ----- |
| **Goal**   | Aligner l'accueil, le hub de veille, les synthèses, les métadonnées et les e-mails sur l'administration des systèmes, des réseaux et la cybersécurité. |
| **Source** | Demande utilisateur et commentaires navigateur du 5 octobre 2026 sur l'accueil et `/veille`. |

## Phases

| #   | Phase | File |
| --- | ----- | ---- |
| 1   | Réécriture éditoriale SISR et vérification du parcours | [`phase-1.md`](./phase-1.md) |

## Resources

| Source | Verified |
| ------ | -------- |
| https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center/articles/cisco-catalyst-center-ai-assistant.html | Capacités de supervision, diagnostic et documentation de l'assistant IA de Catalyst Center, ainsi que la nécessité de valider ses suggestions. |
| https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center-assurance/3-2-x/cisco-catalyst-assurance-user-guide-3-2-x/b_cisco_catalyst_assurance_3_2_x_ug_chapter_010.html | Fonctionnement, dépendance cloud et usages de Cisco AI Network Analytics. |
| https://learn.microsoft.com/en-us/intune/copilot/ | Usages de Security Copilot dans Intune et respect des rôles RBAC et des scope tags. |
| https://learn.microsoft.com/en-us/copilot/security/authentication | Séparation entre les rôles Security Copilot et les autorisations d'accès aux données des produits Microsoft. |
| https://messervices.cyber.gouv.fr/guides/recommandations-de-securite-pour-un-systeme-dia-generative | Posture de prudence recommandée par l'ANSSI pour intégrer une IA générative dans un système d'information. |
| node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md | Les métadonnées statiques restent déclarées dans les Server Components de route. |
| node_modules/next/dist/docs/01-app/02-guides/redirecting.md | Les anciennes URL connues peuvent être conservées avec des redirections permanentes dans `next.config.ts`. |

## Decisions

| Decision | Why |
| -------- | --- |
| Remplacer les deux anciennes synthèses par deux synthèses SISR plutôt que modifier uniquement les titres | Un simple changement de titre laisserait les articles, les sources et les analyses centrés sur le développement applicatif. |
| Donner de nouveaux slugs aux synthèses et rediriger les anciennes URL de façon permanente | Les URL canoniques doivent décrire le nouveau contenu tout en évitant de casser les liens déjà diffusés. |
