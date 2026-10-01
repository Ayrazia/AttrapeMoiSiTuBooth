// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Hébergement : VPS OVH (Debian 13) derrière Caddy.
// Le site est servi à la racine du domaine.
export default defineConfig({
  site: 'https://attrapemoisitubooth.fr',
  base: '/',
});
