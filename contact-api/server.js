// Serveur autonome (sans Vercel) : à héberger sur Render, Railway, un VPS,
// ou à lancer en local. Démarrage :  node --env-file=.env server.js
// (le fichier .env se crée à partir de .env.dist)
import http from 'node:http';
import { sendContactMail, ALLOWED_ORIGIN } from './lib/send.js';

const PORT = Number(process.env.PORT || 3000);
const ROUTE = '/api/contact';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  cors(res);
  const path = (req.url || '').split('?')[0].replace(/\/+$/, '') || '/';

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  // Petit point de santé pratique
  if (req.method === 'GET' && (path === '/' || path === '/health')) {
    return json(res, 200, { ok: true, service: 'attrape-contact-api' });
  }
  if (path !== ROUTE) {
    return json(res, 404, { ok: false, error: 'Not found' });
  }
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Méthode non autorisée.' });
  }

  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > 1e6) req.destroy(); // garde-fou (1 Mo max)
  });
  req.on('end', async () => {
    try {
      const body = raw ? JSON.parse(raw) : {};
      await sendContactMail(body);
      json(res, 200, { ok: true });
    } catch (err) {
      const status = err.status || 500;
      if (!err.status) console.error('Contact form error:', err);
      json(res, status, {
        ok: false,
        error: err.status ? err.message : 'Envoi impossible pour le moment.',
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Relais contact démarré sur le port ${PORT} (route POST ${ROUTE})`);
});
