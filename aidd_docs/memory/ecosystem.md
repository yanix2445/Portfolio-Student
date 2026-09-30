# Ecosystem

```mermaid
flowchart LR
    Browser[Visiteur]
    App[Next.js sur Vercel]
    GitHub["GitHub · vcs.md"]
    Vercel["Vercel"]
    Resend["Resend"]
    Cal["Cal.com"]
    Turnstile["Cloudflare Turnstile"]
    Infomaniak["Infomaniak Mail"]

    GitHub -- déploiements Git --> Vercel
    Vercel --> App
    Browser --> App
    App -- Siteverify --> Turnstile
    App -- e-mails et contacts --> Resend
    Resend -- livraison --> Infomaniak
    Browser -- réservation --> Cal
```

## Production ownership

- Vercel héberge l'application Next.js et ses Server Actions.
- Cloudflare fournit le DNS du domaine et Turnstile; il n'héberge pas l'application.
- Infomaniak reste le fournisseur de réception pour `yanis-harrat.com`.
- Resend envoie les messages transactionnels et maintient le segment/topic de veille.
