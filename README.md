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
2. **Formulaire de contact** — pour recevoir les messages par email, crée un
   compte gratuit sur [Formspree](https://formspree.io) et remplace `VOTRE_ID`
   dans `src/components/Contact.astro`. Les boutons Téléphone et Email
   fonctionnent déjà sans configuration.
3. **Email** — vérifie l'adresse `attrape.moisi.tubooth@outlook.com` dans
   `src/data/site.js` (lecture approximative de la carte de visite).

## Déployer (GitHub Pages)

Le site est en ligne ici : **https://ayrazia.github.io/AttrapeMoiSiTuBooth/**

Pour **publier une mise à jour** (par ex. après avoir ajouté des photos de
prestations ou modifié un texte), une seule commande :

```bash
npm run deploy
```

Elle build le site et l'envoie sur la branche `gh-pages`. Le site est à jour
en ~1 minute.

> ℹ️ Le sous-dossier d'URL (`/AttrapeMoiSiTuBooth/`) est configuré dans
> `astro.config.mjs` via `base`. Si tu ajoutes un jour un nom de domaine perso,
> remets `base: '/'`.

### (Optionnel) Déploiement automatique à chaque push

Un workflow GitHub Actions est prêt dans `.github/workflows/deploy.yml`. Pour
l'activer (déploiement auto sans lancer `npm run deploy`), autorise une fois le
scope `workflow` puis pousse-le :

```bash
gh auth refresh -h github.com -s workflow
git add .github && git commit -m "Ajout du déploiement automatique" && git push
```

Ensuite, dans **Settings → Pages**, choisis la source « GitHub Actions ».

## Crédits photos

Les images de la galerie proviennent du compte Instagram
[@attrape.moisi.tubooth](https://www.instagram.com/attrape.moisi.tubooth/).
