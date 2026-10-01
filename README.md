# Attrape Moi Si Tu Booth — Site vitrine

Site vitrine one-page (Astro) pour **Attrape Moi Si Tu Booth** — location de
photobooth et animations événementielles en Centre-Val de Loire & Île-de-France.

## Démarrer

```bash
npm install      # installe les dépendances
npm run dev      # serveur local → http://localhost:4321
npm run build    # génère le site statique dans /dist
npm run preview  # prévisualise le build de production
```

## Structure

```
public/images/          Logo + photos (galerie) récupérées depuis Instagram
src/
  data/site.js          ⭐ TOUT le contenu du site (à éditer en priorité)
  layouts/Layout.astro  Structure HTML, <head>, polices
  components/           Header, Hero, Services, Gallery, Testimonials, Contact, Footer
  pages/index.astro     Assemble la page
  styles/global.css     Design system (couleurs, typos, boutons)
```

## Personnaliser

Tout le contenu est centralisé dans **`src/data/site.js`** :
coordonnées, prestations, tarifs, galerie, avis, références.

### Photos des prestations (modal)

Un clic sur une animation ouvre une modal avec ses photos. Chaque animation a
son dossier dans **`src/prestations/<slug>/`** : dépose une image dedans, elle
s'ajoute automatiquement à la modal. Voir [src/prestations/README.md](src/prestations/README.md).

### 3 points à finaliser

1. **Avis clients** — les 3 témoignages de `testimonials` sont des exemples.
   Remplace-les par de vrais avis (nom, événement, citation).
2. **Formulaire de contact (via Brevo)** — les envois passent par le relais
   `contact-api/` qui tourne sur le VPS (route `/api/contact`) et utilise ton
   SMTP Brevo. Les secrets sont dans `/etc/attrape-contact.env` sur le VPS —
   voir [deploy/README.md](deploy/README.md).
3. **Email** — vérifie l'adresse `attrape.moisi.tubooth@outlook.com` dans
   `src/data/site.js` (lecture approximative de la carte de visite).

## Déployer (VPS OVH)

Le site et le relais du formulaire sont hébergés sur un VPS OVH (Debian 13)
derrière Caddy : **https://attrapemoisitubooth.fr**

Pour **publier une mise à jour** (photos de prestations, textes…) :

```bash
npm run deploy
```

Elle build le site, l'envoie sur le VPS (rsync) et redémarre le relais.
Installation du serveur, architecture et dépannage : voir
[deploy/README.md](deploy/README.md).

## Crédits photos

Les images de la galerie proviennent du compte Instagram
[@attrape.moisi.tubooth](https://www.instagram.com/attrape.moisi.tubooth/).
