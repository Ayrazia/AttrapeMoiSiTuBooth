#!/usr/bin/env bash
# Déploiement du site sur GitHub Pages (branche gh-pages).
# Usage : npm run deploy
set -e

REPO_URL="https://github.com/Ayrazia/AttrapeMoiSiTuBooth.git"
cd "$(dirname "$0")/.."

echo "▶ Build du site…"
npm run build

echo "▶ Préparation de la publication…"
cd dist
# Empêche GitHub Pages d'ignorer le dossier _astro/ (traitement Jekyll)
touch .nojekyll

# Dépôt temporaire pour pousser uniquement le contenu de dist/ sur gh-pages
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Déploiement du $(date '+%Y-%m-%d %H:%M:%S')"
echo "▶ Envoi vers gh-pages…"
git push -f -q "$REPO_URL" gh-pages
rm -rf .git

echo "✅ Déployé ! Le site sera à jour dans ~1 minute :"
echo "   https://ayrazia.github.io/AttrapeMoiSiTuBooth/"
