---
objective: "Le portfolio multipage permet à un recruteur de comprendre le profil de Yanis en moins de trente secondes, d'en vérifier les preuves et de le contacter par les parcours validés."
status: blocked
---

# Plan: Portfolio multipage orienté recrutement et BTS SIO SISR

## Overview

| Field      | Value |
| ---------- | ----- |
| **Goal**   | Transformer la landing page actuelle en portfolio multipage accessible, crédible, documenté et orienté conversion recruteur. |
| **Source** | [`spec.md`](./spec.md) |

## Phases

| #   | Phase | File |
| --- | ----- | ---- |
| 1 | Fondations visuelles, conventions et shell public | [`phase-1.md`](./phase-1.md) |
| 2 | Accueil complet orienté décision recruteur | [`phase-2.md`](./phase-2.md) |
| 3 | Compétences, expériences et six réalisations E5 | [`phase-3.md`](./phase-3.md) |
| 4 | Deux réalisations E6 et projets démontrables | [`phase-4.md`](./phase-4.md) |
| 5 | Catalogue de certifications et preuves publiables | [`phase-5.md`](./phase-5.md) |
| 6 | Veille technologique et inscription newsletter | [`phase-6.md`](./phase-6.md) |
| 7 | CV, contact, SEO, accessibilité et validation de production | [`phase-7.md`](./phase-7.md) |

## Resources

| Source | Verified |
| ------ | -------- |
| https://nextjs.org/docs/app/getting-started/project-structure | Les conventions réservées à `app`, la colocalisation et l'usage du dossier `src`. |
| https://nextjs.org/docs/app/getting-started/server-and-client-components | Les Server Components par défaut et la réduction des frontières clientes aux interactions. |
| https://nextjs.org/docs/app/getting-started/metadata-and-og-images | Les métadonnées statiques et dynamiques ainsi que les fichiers SEO spéciaux. |
| https://nextjs.org/docs/app/guides/forms | Le traitement progressif des formulaires avec Server Actions, validation serveur et `useActionState`. |
| https://nextjs.org/docs/app/getting-started/route-handlers | Les Route Handlers sont réservés aux contrats HTTP publics et ne sont pas nécessaires aux appels internes. |

## Decisions

| Decision | Why |
| -------- | --- |
| Organiser le produit par features avec des pages App Router fines et des API publiques explicites via `index.ts`. | Cette frontière suit l'article de référence fourni, limite le couplage au routage et garde chaque domaine compréhensible. |
| Conserver les contenus publics sous forme de données TypeScript typées, sans base de données ni authentification. | Le volume, la fréquence de mise à jour et la cible de trafic ne justifient pas un stockage applicatif. |
| Traiter l'inscription newsletter avec une Server Action et une intégration Resend protégée côté serveur. | Le formulaire reste progressif et aucun endpoint HTTP public supplémentaire n'est nécessaire. |
| Ne créer aucun dossier API pour Cal.com ou les lectures internes. | Cal.com est une destination externe et les données statiques sont importées directement par les Server Components. |
| Publier les noms et marques d'EDLearn et du Secours Catholique-Caritas France, dont l'autorisation a été confirmée, tout en expurgeant les preuves sensibles. | L'autorisation de marque ne supprime pas les obligations de confidentialité sur les comptes, tickets, topologies, personnes et documents internes. |
| Garder les deux réalisations E6 au statut public « En cours » jusqu'à disponibilité de preuves vérifiables. | Le portfolio ne doit présenter aucun résultat ou niveau d'achèvement non démontré. |
| N'activer le téléchargement du CV qu'après fourniture et validation du document final. | Le propriétaire a confirmé qu'il transmettra le fichier au moment de cette phase. |
| Présenter les six certifications sous forme de badges sans publier leurs certificats PDF. | Le propriétaire souhaite valoriser les acquis sans exposer les documents eux-mêmes ; les images officielles disponibles sont utilisées et les formations Anthropic reçoivent un badge d'interface textuel. |
