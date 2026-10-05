# Portfolio de Yanis Harrat

Portfolio professionnel Next.js de Yanis Harrat, technicien support systèmes et réseaux en BTS SIO SISR.

## Développement local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

L'application est disponible sur `http://localhost:3000`. En développement, Turnstile utilise automatiquement les clés de test officielles Cloudflare.

## Variables requises

Consultez `.env.example` pour le contrat complet. Les secrets Resend et Turnstile restent côté serveur; seule la clé publique Turnstile porte le préfixe `NEXT_PUBLIC_`.

Les e-mails transactionnels utilisent quatre modèles Resend **pilotés par le code** et versionnés dans `src/emails/`. Les composants React Email, leur texte brut, leurs variables et leur identité visuelle constituent la source de vérité ; l’éditeur web Resend sert uniquement à contrôler le rendu et l’historique. Leurs identifiants sont fournis par `RESEND_CONTACT_OWNER_TEMPLATE_ID`, `RESEND_CONTACT_RECEIPT_TEMPLATE_ID`, `RESEND_NEWSLETTER_CONFIRMATION_TEMPLATE_ID` et `RESEND_WATCH_DIGEST_TEMPLATE_ID`. Pour synchroniser les brouillons puis les publier :

```bash
pnpm email:dev
pnpm email:render
pnpm email:sync
pnpm email:publish
```

`email:dev` ouvre la prévisualisation React Email locale. `email:render` génère les versions HTML et texte dans le dossier ignoré `.resend/`. La synchronisation met à jour les brouillons distants ; la publication reste une étape séparée afin de préserver la version active tant que le nouveau rendu n’est pas validé.

Les alias publiés sont `portfolio-contact-owner-v2`, `portfolio-contact-receipt-v2`, `portfolio-newsletter-confirmation` et `portfolio-watch-digest`. Le modèle de confirmation newsletter est envoyé depuis la fonction d’inscription commune, que l’accord soit donné sur la page d’accueil ou dans le formulaire de contact. Les noms `FIRST_NAME`, `LAST_NAME`, `EMAIL`, `UNSUBSCRIBE_URL`, `contact` et `this` sont réservés par Resend et ne doivent pas être déclarés comme variables personnalisées.

`TURNSTILE_TEST_MODE=1` est réservé à la suite Playwright. Cette variable ne doit jamais être créée dans Vercel Preview ou Production.

## Validation

```bash
git diff --check
pnpm lint
pnpm exec tsc --noEmit
pnpm test:run
pnpm build
pnpm test:e2e
```

Playwright reconstruit une version de production isolée avec Turnstile de test et sans accès au compte Resend réel.

Pour rejouer les contrôles non destructifs sur une Preview ou la production, définir `E2E_BASE_URL` avec l’URL cible. Une Preview protégée accepte en plus `VERCEL_AUTOMATION_BYPASS_SECRET`. Dans ce mode, Playwright ne démarre aucun serveur local et n’injecte aucune clé de test.

## Production

- Hébergement et Server Actions : Vercel, projet `yanis`
- Domaine et protection anti-robot : Cloudflare DNS et Turnstile
- Envoi applicatif : Resend
- Réception professionnelle : Infomaniak Mail

Les branches publient une Preview Vercel. La branche `main` publie `https://www.yanis-harrat.com` et `https://yanis-harrat.com`.
