#!/usr/bin/env bash
# Déploiement du site + du relais de contact sur le VPS.
# Usage : npm run deploy
set -euo pipefail

cd "$(dirname "$0")/.."
# deploy/vps.conf définit VPS=utilisateur@adresse_du_vps
[ -f deploy/vps.conf ] && source deploy/vps.conf
: "${VPS:?Définis VPS=utilisateur@ip dans deploy/vps.conf}"

echo "▶ Build du site…"
npm run build

echo "▶ Envoi du site vers $VPS…"
rsync -az --delete dist/ "$VPS:/var/www/attrapemoisitubooth/"

echo "▶ Envoi du relais de contact…"
rsync -az --delete --exclude node_modules --exclude '.env' \
  contact-api/ "$VPS:/opt/attrape-contact/"
ssh "$VPS" 'cd /opt/attrape-contact \
  && npm ci --omit=dev --no-audit --no-fund --silent \
  && sudo systemctl restart attrape-contact'

echo "✅ Déployé : https://attrapemoisitubooth.fr"
