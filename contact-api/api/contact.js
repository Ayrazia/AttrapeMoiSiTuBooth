// Handler compatible Vercel / Netlify Functions (signature req/res).
import { sendContactMail, ALLOWED_ORIGIN } from '../lib/send.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée.' });
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    await sendContactMail(body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    const status = err.status || 500;
    console.error('Contact form error:', err);
    return res.status(status).json({
      ok: false,
      error: err.status ? err.message : 'Envoi impossible pour le moment.',
    });
  }
}
