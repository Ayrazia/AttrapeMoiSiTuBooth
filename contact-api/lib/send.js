import nodemailer from 'nodemailer';
import { renderNotification } from './template.js';

// Origine autorisée pour les appels cross-origin (le site lui-même est servi
// par le même domaine, donc same-origin). Modifiable via variable d'env.
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://attrapemoisitubooth.fr';

const EMAIL_RE = /^[^\s@<>"'?&,;]+@[^\s@<>"'?&,;]+\.[a-z]{2,}$/i;

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

/** Champ sur une ligne : sans retour à la ligne (anti-injection d'en-têtes), tronqué. */
const oneLine = (v, max) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
/** Champ multiligne (message), tronqué. */
const multiLine = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);

/**
 * (Optionnel) Ajoute le contact à une liste Brevo — uniquement s'il a donné
 * son consentement à la prospection. Inactif si BREVO_API_KEY / BREVO_LIST_ID
 * ne sont pas définis.
 */
async function addToBrevoList(email) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) return;

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
  });
  if (!res.ok) {
    throw new Error(`Brevo contacts ${res.status}: ${await res.text()}`);
  }
}

/**
 * Valide les données du formulaire et envoie l'email via le SMTP Brevo.
 * En cas de données invalides, lève une erreur avec `.status = 400`.
 * @param {Record<string, string>} body
 * @returns {Promise<{ok: true, skipped?: boolean}>}
 */
export async function sendContactMail(body = {}) {
  // Anti-spam : le champ "company" est un piège (honeypot). Si rempli → bot.
  if (body.company) return { ok: true, skipped: true };

  const data = {
    name: oneLine(body.name, 100),
    email: oneLine(body.email, 254),
    phone: oneLine(body.phone, 30),
    event: oneLine(body.event, 60),
    date: oneLine(body.date, 10),
    message: multiLine(body.message, 5000),
    marketing: body.marketing === 'oui',
  };

  if (!data.name || !data.email || !data.message) {
    throw badRequest('Champs requis manquants.');
  }
  if (!EMAIL_RE.test(data.email)) {
    throw badRequest('Adresse email invalide.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.BREVO_SMTP_PORT || 587),
    secure: false, // STARTTLS sur le port 587
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  // Expéditeur : adresse du domaine authentifié dans Brevo
  const from = process.env.CONTACT_FROM || process.env.CONTACT_TO;
  const { subject, html, text } = renderNotification(data);

  await transporter.sendMail({
    from: { name: 'Attrape Moi Si Tu Booth', address: from },
    to: process.env.CONTACT_TO,
    replyTo: { name: data.name, address: data.email },
    subject,
    text,
    html,
  });

  // L'ajout à la liste ne doit jamais faire échouer l'envoi de la demande
  if (data.marketing) {
    await addToBrevoList(data.email).catch((err) =>
      console.error('Ajout liste Brevo impossible :', err.message)
    );
  }

  return { ok: true };
}
