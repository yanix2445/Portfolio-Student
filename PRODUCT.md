# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Recruteurs et responsables techniques qui évaluent rapidement l’adéquation de Yanis Harrat avec un poste de technicien support systèmes et réseaux.
- Entreprises susceptibles de proposer une alternance ou un CDI en Île-de-France.
- Enseignants et jurys du BTS SIO SISR qui vérifient les réalisations, compétences et preuves des épreuves E5 et E6.

## Product Purpose

Présenter un profil professionnel unique et donner accès, depuis un même portfolio, aux compétences techniques, expériences, missions E5, dossiers E6, projets personnels, certifications et travaux de veille de Yanis Harrat. Le produit réussit lorsqu’un visiteur comprend rapidement ce que Yanis sait prendre en charge et peut consulter les preuves correspondantes sans ambiguïté.

## Positioning

Chaque compétence annoncée est reliée à un contexte réel ou à un laboratoire identifié, aux outils employés et à une preuve consultable. Le portfolio ne remplace pas les livrables du BTS : il les organise et rend leur lecture plus simple pour un recruteur comme pour un jury.

## Operating Context

- Consultation publique sur ordinateur et mobile, souvent avant un premier entretien.
- Navigation entre l’accueil, les compétences, les missions E5, les dossiers E6, les projets, les certifications et la veille.
- Téléchargement du CV, prise de rendez-vous via Cal.com et contact professionnel par e-mail.
- Les six missions E5 proviennent des stages chez EDLearn et au Secours Catholique-Caritas France.
- Les deux dossiers E6 sont encore en cours de construction et doivent être présentés comme tels.

## Capabilities and Constraints

- Application Next.js avec rendu statique ou serveur selon les pages, TypeScript, React et Tailwind CSS.
- Les contenus doivent rester factuels et distinguer clairement les missions réalisées, les laboratoires, les projets personnels et les dossiers encore en cours.
- Les collections doivent pouvoir grandir sans rendre les pages d’accueil illisibles.
- La newsletter de veille utilise une vraie action serveur et ne doit pas simuler une inscription réussie.
- La langue principale est le français.

## Brand Commitments

- Nom public : Yanis Harrat.
- Voix professionnelle, directe et concrète, sans exagérer le niveau de maîtrise ni inventer de résultats.
- Le portrait personnel, les badges de certification, le CV et les preuves techniques existantes sont les actifs de référence.

## Evidence on Hand

- Missions et données E5 : `src/features/bts-e5/`.
- Réalisations E6 : `src/features/bts-e6/`.
- Compétences et preuves associées : `src/features/home/home.data.ts` et `src/features/skills/`.
- Projets personnels : `src/features/projects/`.
- Certifications et badges : `src/features/certifications/` et `public/images/certifications/`.
- Veille technologique : `src/features/tech-watch/`.
- CV : `public/documents/cv-yanis-harrat.pdf`.
- Aucune recommandation client, statistique d’impact ou certification future ne doit être fabriquée.

## Product Principles

1. Prouver avant d’affirmer.
2. Ne jamais mélanger les contextes E5, E6, projets personnels et veille.
3. Montrer l’état réel d’avancement des travaux.
4. Permettre une lecture rapide sans cacher le détail utile.
5. Prévoir la croissance future des projets, certifications et preuves.

## Accessibility & Inclusion

Le portfolio doit rester utilisable au clavier, conserver des libellés accessibles, respecter des contrastes lisibles, réduire les animations lorsque l’utilisateur le demande et maintenir une composition claire sur mobile.
