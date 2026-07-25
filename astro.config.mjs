// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Déploiement GitHub Pages (dépôt projet) :
//   URL finale → https://ayrazia.github.io/AttrapeMoiSiTuBooth/
//   - site : l'origine (ton compte github.io)
//   - base : le nom du dépôt (sensible à la casse !)
// Si un jour tu ajoutes un nom de domaine perso, remets base à '/'.
export default defineConfig({
  site: 'https://ayrazia.github.io',
  base: '/AttrapeMoiSiTuBooth/',
});
