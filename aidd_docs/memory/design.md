# Design

## System

- shadcn `base-nova` fournit les primitives; les composants du projet vivent dans `src/components/ui`.
- Tailwind CSS et les variables CSS de `src/app/globals.css` portent le style.

## Tokens

- Les couleurs, rayons et états clair/sombre sont définis dans `src/app/globals.css`.
- La palette de marque, la typographie finale et la ligne éditoriale ne sont pas encore définies; les valeurs neutres et Geist restent des valeurs de démarrage.

## Components

- Les variantes partagées utilisent `class-variance-authority`; les icônes utilisent Lucide.
- Base UI porte le comportement des primitives interactives.

## Accessibility

- Les composants doivent conserver focus clavier, contrastes lisibles et libellés accessibles.
- Aucun contrôle d'accessibilité automatisé propre au projet n'est encore configuré.
