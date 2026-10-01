# Forms

## Current state

- `/contact` expose un formulaire professionnel piloté côté client et soumis à une Server Action.
- La section veille de l'accueil expose un formulaire d'inscription à la newsletter.
- Les deux formulaires utilisent Zod côté serveur. Le formulaire de contact applique aussi la même validation avant l'envoi afin de conserver les valeurs et de focaliser le premier champ invalide.
- Cloudflare Turnstile est rendu explicitement avec les actions stables `contact` et `newsletter`. Chaque tentative exécute un nouveau challenge et réinitialise son widget après la réponse.
- Le serveur valide le jeton auprès de Siteverify, ferme l'accès en cas d'erreur réseau et contrôle l'action ainsi que le nom d'hôte en production.
- Resend envoie la notification propriétaire et l’accusé de réception du formulaire de contact à partir de modèles distants publiés. Le code source React Email de ces modèles reste versionné dans `src/emails/`.
- Les modèles utilisent les alias stables `portfolio-contact-owner-v2`, `portfolio-contact-receipt-v2` et `portfolio-watch-digest`. L’application envoie avec leurs identifiants Resend afin d’éviter toute ambiguïté entre brouillon et version publiée.
- Les variables personnalisées évitent les noms réservés de Resend (`FIRST_NAME`, `LAST_NAME`, `EMAIL`, `UNSUBSCRIBE_URL`, `contact`, `this`). Les données du visiteur utilisent le préfixe `VISITOR_`.
- Une clé d’idempotence fondée sur un UUID unique protège chaque soumission. Les variables de modèle sont neutralisées avant l’envoi et les champs `Reply-To` restent orientés vers la bonne personne.
- La newsletter ajoute ou réactive le contact dans le segment et le topic configurés.
- Le champ `website` est un honeypot : une valeur non vide retourne une réponse neutre sans appeler les fournisseurs.

## Environment contract

- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `RESEND_SEGMENT_ID`, `RESEND_TOPIC_ID`
- `RESEND_CONTACT_OWNER_TEMPLATE_ID`, `RESEND_CONTACT_RECEIPT_TEMPLATE_ID`, `RESEND_WATCH_DIGEST_TEMPLATE_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, `TURNSTILE_HOSTNAMES`
- `TURNSTILE_TEST_MODE=1` est réservé aux tests automatisés construits en mode production et ne doit jamais être défini dans Vercel Preview ou Production.
- Les secrets restent exclusivement côté serveur et les fichiers `.env*`, sauf `.env.example`, sont ignorés par Git.

## Template workflow

- `src/emails/` est la source de vérité. Ne pas modifier le contenu ou les styles directement dans l’éditeur web Resend ; il sert seulement à la prévisualisation, au test et à l’historique des versions.
- `pnpm email:dev` ouvre la prévisualisation React Email locale.
- `pnpm email:render` génère les versions HTML et texte dans `.resend/`, qui reste ignoré par Git.
- `pnpm email:sync` met à jour les brouillons distants sans toucher à la version publiée.
- `pnpm email:publish` synchronise puis publie explicitement les trois modèles après validation.
- Les trois identifiants doivent être présents dans Vercel Preview et Production avant de déployer une version qui les consomme.
