# Forms

## Current state

- `/contact` expose un formulaire professionnel piloté côté client et soumis à une Server Action.
- La section veille de l'accueil expose un formulaire d'inscription à la newsletter.
- Les deux formulaires utilisent Zod côté serveur. Le formulaire de contact applique aussi la même validation avant l'envoi afin de conserver les valeurs et de focaliser le premier champ invalide.
- Cloudflare Turnstile est rendu explicitement avec les actions stables `contact` et `newsletter`. Chaque tentative exécute un nouveau challenge et réinitialise son widget après la réponse.
- Le serveur valide le jeton auprès de Siteverify, ferme l'accès en cas d'erreur réseau et contrôle l'action ainsi que le nom d'hôte en production.
- Resend envoie la notification propriétaire et l'accusé de réception du formulaire de contact. Une clé d'idempotence fondée sur un UUID unique protège chaque soumission.
- La newsletter ajoute ou réactive le contact dans le segment et le topic configurés.
- Le champ `website` est un honeypot : une valeur non vide retourne une réponse neutre sans appeler les fournisseurs.

## Environment contract

- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `RESEND_SEGMENT_ID`, `RESEND_TOPIC_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, `TURNSTILE_HOSTNAMES`
- `TURNSTILE_TEST_MODE=1` est réservé aux tests automatisés construits en mode production et ne doit jamais être défini dans Vercel Preview ou Production.
- Les secrets restent exclusivement côté serveur et les fichiers `.env*`, sauf `.env.example`, sont ignorés par Git.
