import nodemailer from 'nodemailer';

// Origine autorisée pour les appels cross-origin (le site lui-même est servi
// par le même domaine, donc same-origin). Modifiable via variable d'env.
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://attrapemoisitubooth.fr';

export function escapeHtml(s = '') {
  return String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

/**
 * Valide les données du formulaire et envoie l'email via le SMTP Brevo.
 * En cas de données invalides, lève une erreur avec `.status = 400`.
 * @param {Record<string, string>} body
 * @returns {Promise<{ok: true, skipped?: boolean}>}
 */
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

export async function sendContactMail(body = {}) {
  const { name, email, phone, event, date, message, company } = body;
  const marketing = body.marketing === 'oui';

  // Anti-spam : le champ "company" est un piège (honeypot). Si rempli → bot.
  if (company) return { ok: true, skipped: true };

  if (!name || !email || !message) {
    const err = new Error('Champs requis manquants.');
    err.status = 400;
    throw err;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    const err = new Error('Adresse email invalide.');
    err.status = 400;
    throw err;
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

  const to = process.env.CONTACT_TO;
  // Doit être un expéditeur VÉRIFIÉ dans Brevo
  const from = process.env.CONTACT_FROM || process.env.CONTACT_TO;

  const subject = `Nouvelle demande — ${event || 'Contact'} — ${name}`;

  const textLines = [
    `Nom : ${name}`,
    `Email : ${email}`,
    phone ? `Téléphone : ${phone}` : null,
    event ? `Type d'événement : ${event}` : null,
    date ? `Date souhaitée : ${date}` : null,
    `Accepte de recevoir les offres : ${marketing ? 'OUI' : 'non'}`,
    '',
    'Message :',
    message,
  ].filter((l) => l !== null);

  await transporter.sendMail({
    from: `Attrape Moi Si Tu Booth <${from}>`,
    to,
    replyTo: `${name} <${email}>`,
    subject,
    text: textLines.join('\n'),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#201e1b;line-height:1.6">
      <h2 style="color:#0e0d0c;margin:0 0 12px">Nouvelle demande de contact</h2>
      <p style="margin:4px 0"><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p style="margin:4px 0"><strong>Email :</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p style="margin:4px 0"><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ''}
      ${event ? `<p style="margin:4px 0"><strong>Type d'événement :</strong> ${escapeHtml(event)}</p>` : ''}
      ${date ? `<p style="margin:4px 0"><strong>Date souhaitée :</strong> ${escapeHtml(date)}</p>` : ''}
      <p style="margin:4px 0"><strong>Accepte de recevoir les offres :</strong> ${marketing ? '✅ Oui' : 'Non'}</p>
      <p style="margin:12px 0 4px"><strong>Message :</strong></p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`,
  });

  // L'ajout à la liste ne doit jamais faire échouer l'envoi de la demande
  if (marketing) {
    await addToBrevoList(email).catch((err) =>
      console.error('Ajout liste Brevo impossible :', err.message)
    );
  }

  return { ok: true };
}
