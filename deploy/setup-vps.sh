#!/usr/bin/env bash
# Installation initiale du VPS (Debian 13) — à lancer UNE fois, avec sudo :
#   sudo bash setup-vps.sh <utilisateur_de_deploiement>
# Le script est idempotent : on peut le relancer sans risque.
set -euo pipefail

DEPLOY_USER="${1:-${SUDO_USER:-debian}}"
SITE_DIR=/var/www/attrapemoisitubooth
APP_DIR=/opt/attrape-contact
ENV_FILE=/etc/attrape-contact.env
HERE="$(cd "$(dirname "$0")" && pwd)"

if [ "$(id -u)" -ne 0 ]; then echo "À lancer avec sudo." >&2; exit 1; fi
id "$DEPLOY_USER" >/dev/null 2>&1 || { echo "Utilisateur $DEPLOY_USER introuvable." >&2; exit 1; }

echo "▶ Mise à jour du système…"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get -y -q upgrade

echo "▶ Paquets (Caddy, Node.js, pare-feu, mises à jour auto)…"
apt-get install -y -q caddy nodejs npm rsync ufw unattended-upgrades fail2ban

echo "▶ Pare-feu (SSH, HTTP, HTTPS uniquement)…"
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443/tcp >/dev/null
ufw allow 443/udp >/dev/null   # HTTP/3
ufw --force enable >/dev/null

echo "▶ Mises à jour de sécurité automatiques…"
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "▶ Utilisateur système du relais (sans shell, sans droits)…"
id attrape >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin attrape

echo "▶ Dossiers (déploiement par $DEPLOY_USER, sans sudo)…"
mkdir -p "$SITE_DIR" "$APP_DIR" /var/log/caddy
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$SITE_DIR" "$APP_DIR"
chmod 755 "$SITE_DIR" "$APP_DIR"

echo "▶ Fichier de secrets du relais…"
if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<'EOF'
# Secrets du relais de contact — à compléter : sudo nano /etc/attrape-contact.env
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=ba654f001@smtp-brevo.com
BREVO_SMTP_PASS=A_COMPLETER
CONTACT_TO=attrape.moisi.tubooth@outlook.com
CONTACT_FROM=A_COMPLETER_expediteur_verifie_Brevo
ALLOWED_ORIGIN=https://attrapemoisitubooth.fr
HOST=127.0.0.1
PORT=3000
# Optionnel : ajout auto à une liste Brevo (consentement prospection)
BREVO_API_KEY=
BREVO_LIST_ID=
EOF
  echo "  → créé : $ENV_FILE (à compléter)"
else
  echo "  → déjà présent, conservé"
fi
chown root:root "$ENV_FILE"
chmod 600 "$ENV_FILE"

echo "▶ Service systemd du relais…"
install -m 644 "$HERE/attrape-contact.service" /etc/systemd/system/attrape-contact.service
systemctl daemon-reload
systemctl enable attrape-contact >/dev/null

echo "▶ Autoriser $DEPLOY_USER à redémarrer le relais (et seulement ça)…"
cat > /etc/sudoers.d/attrape-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/bin/systemctl restart attrape-contact, /usr/bin/systemctl reload caddy
EOF
chmod 440 /etc/sudoers.d/attrape-deploy
visudo -cf /etc/sudoers.d/attrape-deploy >/dev/null

echo "▶ Configuration Caddy…"
install -m 644 "$HERE/Caddyfile" /etc/caddy/Caddyfile
chown caddy:caddy /var/log/caddy
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null
systemctl enable caddy >/dev/null
systemctl reload caddy || systemctl restart caddy

echo "▶ SSH : connexion par clé uniquement…"
AUTH_KEYS="$(getent passwd "$DEPLOY_USER" | cut -d: -f6)/.ssh/authorized_keys"
if [ -s "$AUTH_KEYS" ]; then
  cat > /etc/ssh/sshd_config.d/99-hardening.conf <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
EOF
  sshd -t && systemctl reload ssh
  echo "  → mots de passe SSH désactivés (clé obligatoire), root interdit"
else
  echo "  → ⚠️ aucune clé SSH pour $DEPLOY_USER : durcissement SSH NON appliqué"
fi

echo
echo "✅ VPS prêt."
echo "   Reste à faire : compléter $ENV_FILE  (sudo nano $ENV_FILE)"
echo "   puis :          sudo systemctl restart attrape-contact"
