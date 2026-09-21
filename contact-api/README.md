# Relais mail du formulaire de contact (Vercel + Brevo)

Le site est statique (GitHub Pages) : il ne peut pas envoyer d'email lui-même.
Cette petite fonction serverless reçoit le formulaire et envoie le mail via ton
compte **Brevo** (SMTP). Elle s'héberge gratuitement sur **Vercel**.

> 🔒 Ton mot de passe SMTP ne va **jamais** dans le code du site. Il se met
> uniquement dans les variables d'environnement de Vercel (côté serveur).

## Étapes de mise en place (~10 min)

### 1. Récupérer ta clé SMTP Brevo
Dans Brevo → **SMTP & API** → onglet **SMTP** → copie le **mot de passe SMTP**
(la longue clé). C'est lui qui servira de mot de passe.

### 2. Vérifier un expéditeur dans Brevo
Brevo → **Expéditeurs, domaines & IP** → **Expéditeurs** → ajoute et **vérifie**
une adresse que tu possèdes (par ex. ton Gmail ou ton Outlook). Brevo n'enverra
qu'au nom d'un expéditeur vérifié.

### 3. Créer le projet sur Vercel
1. Crée un compte sur https://vercel.com (connexion avec GitHub, c'est plus simple).
2. **Add New… → Project** → importe le dépôt `Ayrazia/AttrapeMoiSiTuBooth`.
3. **IMPORTANT — Root Directory** : clique « Edit » et choisis **`contact-api`**.
4. Framework Preset : **Other**. Laisse la commande de build vide.

### 4. Ajouter les variables d'environnement (dans Vercel, écran du projet → Settings → Environment Variables)

| Nom | Valeur |
|-----|--------|
| `BREVO_SMTP_USER` | `ba654f001@smtp-brevo.com` |
| `BREVO_SMTP_PASS` | *(ta clé SMTP Brevo de l'étape 1)* |
| `CONTACT_TO` | l'email qui **reçoit** les demandes (ex. `attrape.moisi.tubooth@outlook.com`) |
| `CONTACT_FROM` | l'**expéditeur vérifié** de l'étape 2 |
| `ALLOWED_ORIGIN` | `https://ayrazia.github.io` |

Puis **Deploy**.

### 5. Récupérer l'URL et la brancher au site
Vercel te donne une URL du type `https://ton-projet.vercel.app`.
Ton endpoint est donc : **`https://ton-projet.vercel.app/api/contact`**

Ouvre `src/data/site.js` du site, et colle cette URL dans :
```js
formEndpoint: 'https://ton-projet.vercel.app/api/contact',
```
Puis republie le site : `npm run deploy`.

## Tester
Va sur le site, remplis le formulaire, envoie. Le mail doit arriver sur l'adresse
`CONTACT_TO`. En cas de souci, regarde les **Logs** du projet dans Vercel.

## Notes
- Le plan gratuit Brevo permet ~300 emails/jour — largement suffisant.
- La réponse au visiteur : quand tu réponds au mail reçu, ça part vers son adresse
  (le `Reply-To` est réglé sur l'email du visiteur).
- Un champ piège anti-spam (« honeypot ») est déjà en place.
