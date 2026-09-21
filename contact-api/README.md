# Relais mail du formulaire de contact (Brevo)

Le site est **statique** (GitHub Pages) : il ne peut pas envoyer d'email
lui-même, et le SMTP ne fonctionne pas depuis un navigateur. Il faut donc **un
petit serveur** entre le formulaire et Brevo. Ce dossier contient ce relais.

> 🔒 Ton mot de passe SMTP ne va **jamais** dans le code du site (public). Il
> reste uniquement dans les variables d'environnement du serveur.

## Variables d'environnement

Toujours les mêmes, quel que soit l'hébergement (voir **`.env.dist`**) :

| Nom | Valeur |
|-----|--------|
| `BREVO_SMTP_USER` | `ba654f001@smtp-brevo.com` |
| `BREVO_SMTP_PASS` | ta **clé SMTP Brevo** (Brevo → SMTP & API → SMTP) |
| `CONTACT_TO` | l'email qui **reçoit** les demandes |
| `CONTACT_FROM` | un **expéditeur vérifié** dans Brevo (Expéditeurs, domaines & IP) |
| `ALLOWED_ORIGIN` | `https://ayrazia.github.io` |
| `PORT` | *(serveur autonome uniquement, ex. 3000)* |

## Choisis UN hébergement

### Option A — Netlify (comme Vercel, sans Vercel)
1. Compte sur https://netlify.com → **Add new site → Import** le dépôt.
2. **Base directory** : `contact-api`. Publish directory : vide. Functions
   directory : `api`.
3. Renseigne les variables d'env (Site settings → Environment variables).
4. Ton endpoint : `https://ton-site.netlify.app/api/contact`.

### Option B — Render / Railway / ton propre serveur (serveur autonome)
Utilise `server.js` (aucune dépendance à une plateforme précise) :
```bash
cd contact-api
npm install
cp .env.dist .env     # puis remplis .env
npm start             # démarre sur http://localhost:3000 (route POST /api/contact)
```
- **Render** : New → Web Service → repo, Root Directory `contact-api`,
  Build `npm install`, Start `node server.js`, ajoute les variables d'env.
- **Railway / VPS / o2switch (Node)** : pareil, lance `node server.js` avec les
  variables d'env, et note l'URL publique → endpoint `.../api/contact`.

### Option C — Vercel
1. https://vercel.com → New Project → import le dépôt.
2. **Root Directory** : `contact-api`. Framework : Other.
3. Ajoute les variables d'env, puis Deploy.
4. Endpoint : `https://ton-projet.vercel.app/api/contact`.

## Brancher l'URL au site
Quel que soit l'hébergement, colle l'URL de l'endpoint dans
`src/data/site.js` :
```js
formEndpoint: 'https://.../api/contact',
```
Puis republie le site : `npm run deploy`.

## Tester en local (sans rien héberger)
```bash
cd contact-api && npm install && cp .env.dist .env   # remplis .env
npm start
# dans un autre terminal :
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@exemple.com","message":"Coucou"}'
```
Le mail doit arriver sur `CONTACT_TO`.

## Notes
- Plan gratuit Brevo : ~300 emails/jour, largement suffisant.
- Répondre au mail reçu écrit directement au visiteur (`Reply-To` réglé dessus).
- Un champ piège anti-spam (« honeypot ») est déjà en place.
- `server.js` nécessite **Node ≥ 20.6** (pour `--env-file`). Sinon, installe
  `dotenv` et ajoute `import 'dotenv/config'` en haut de `server.js`.
