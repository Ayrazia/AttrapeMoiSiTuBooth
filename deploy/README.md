# Hébergement sur le VPS (OVH, Debian 13)

Le site **et** le relais du formulaire tournent sur le même VPS :

```
Internet ──HTTPS──► Caddy (ports 80/443, certificat automatique)
                     ├── /api/*  ──► relais Node (127.0.0.1:3000, service systemd)
                     └── le reste ─► fichiers du site (/var/www/attrapemoisitubooth)
```

| Fichier | Rôle | Sur le VPS |
|---|---|---|
| `Caddyfile` | Serveur web + HTTPS + redirection www | `/etc/caddy/Caddyfile` |
| `attrape-contact.service` | Service du relais de contact | `/etc/systemd/system/` |
| `setup-vps.sh` | Installation initiale (une fois) | lancé avec sudo |
| `vps.conf` | Adresse SSH du VPS pour le déploiement | (local) |

Les **secrets** (mot de passe SMTP Brevo…) sont dans `/etc/attrape-contact.env`
sur le VPS (droits 600, root) — **jamais dans Git**.

## Installation initiale (une fois)
1. DNS (OVH → Domaines → attrapemoisitubooth.fr → Zone DNS) : enregistrements
   `A` pour `@` et `www` → IP du VPS.
2. Copier la clé SSH du Mac sur le VPS : `ssh-copy-id utilisateur@IP`.
3. Envoyer et lancer le script :
   ```bash
   scp -r deploy utilisateur@IP:~/
   ssh -t utilisateur@IP 'sudo bash ~/deploy/setup-vps.sh'
   ```
4. Renseigner les secrets puis redémarrer le relais :
   ```bash
   ssh -t utilisateur@IP 'sudo nano /etc/attrape-contact.env && sudo systemctl restart attrape-contact'
   ```
5. Premier déploiement : `npm run deploy`.

## Mises à jour du site
```bash
npm run deploy
```
Build local → envoi du site et du relais en rsync → redémarrage du relais.

## Dépannage
```bash
ssh utilisateur@IP 'systemctl status attrape-contact caddy'
ssh utilisateur@IP 'sudo journalctl -u attrape-contact -n 50'   # logs du relais
ssh utilisateur@IP 'sudo journalctl -u caddy -n 50'             # logs HTTPS/Caddy
```
