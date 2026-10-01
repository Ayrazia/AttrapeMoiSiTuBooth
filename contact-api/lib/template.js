// Template de l'email de notification reçu à chaque demande de contact.
// HTML "email-compatible" : mise en page en tableaux + styles en ligne
// (rendu correct dans Outlook, Gmail, Apple Mail et sur mobile).

const SITE_URL = process.env.SITE_URL || 'https://attrapemoisitubooth.fr';
const SITE_HOST = new URL(SITE_URL).host;
const BRAND = 'Attrape Moi Si Tu Booth';

// Charte du site
const C = {
  noir: '#0e0d0c',
  or: '#c8a15a',
  orClair: '#e0c48c',
  creme: '#f6f1e9',
  texte: '#201e1b',
  doux: '#6b655d',
  bord: '#ece5d8',
  blanc: '#ffffff',
};
const SANS = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

export function escapeHtml(s = '') {
  return String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/** "2027-03-14" → { long: "samedi 14 mars 2027", court: "14/03/2027" } */
function formatEventDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
  const fmt = (opts) => new Intl.DateTimeFormat('fr-FR', { ...opts, timeZone: 'UTC' }).format(d);
  return {
    long: fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    court: fmt({ day: '2-digit', month: '2-digit', year: 'numeric' }),
  };
}

function receivedAt() {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date());
}

function button(href, label, primary) {
  const bg = primary ? C.noir : C.blanc;
  const fg = primary ? C.blanc : C.noir;
  return `<td bgcolor="${bg}" style="background:${bg};border:2px solid ${C.noir};border-radius:999px;">
      <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 20px;white-space:nowrap;font-family:${SANS};font-size:14px;font-weight:bold;line-height:1;color:${fg};text-decoration:none;border-radius:999px;">${label}</a>
    </td>`;
}

/**
 * Construit l'email de notification.
 * @returns {{ subject: string, html: string, text: string }}
 */
export function renderNotification({ name, email, phone, event, date, message, marketing }) {
  const d = formatEventDate(date);
  const firstName = String(name).trim().split(/\s+/)[0];
  const received = receivedAt();
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null;
  const replySubject = `Votre demande${event ? ` (${event})` : ''} — ${BRAND}`;
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(replySubject)}`;

  const subject = ['Nouvelle demande', event, d && d.court, name].filter(Boolean).join(' · ');
  const preheader = `${event || 'Demande'}${d ? ` le ${d.court}` : ''} — ${message.slice(0, 90)}`;

  const muted = (t) => `<span style="color:${C.doux};">${t}</span>`;
  const link = (href, t) =>
    `<a href="${escapeHtml(href)}" style="color:${C.texte};text-decoration:underline;">${escapeHtml(t)}</a>`;

  const rows = [
    ['Nom', escapeHtml(name)],
    ['Email', link(`mailto:${email}`, email)],
    ['Téléphone', phone ? link(telHref, phone) : muted('Non renseigné')],
    ['Événement', event ? escapeHtml(event) : muted('Non précisé')],
    ['Date souhaitée', d ? escapeHtml(cap(d.long)) : muted('Non précisée')],
    [
      'Offres & actualités',
      marketing
        ? `<span style="color:#1c7a3f;font-weight:bold;">✓ Accepte de les recevoir</span>`
        : muted('Non'),
    ],
  ]
    .map(
      ([label, value]) => `<tr>
        <td width="150" style="padding:11px 12px 11px 0;border-bottom:1px solid ${C.bord};font-family:${SANS};font-size:13px;font-weight:bold;color:${C.doux};vertical-align:top;">${label}</td>
        <td style="padding:11px 0;border-bottom:1px solid ${C.bord};font-family:${SANS};font-size:15px;line-height:1.5;color:${C.texte};vertical-align:top;">${value}</td>
      </tr>`
    )
    .join('');

  const buttons = `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      ${button(replyHref, firstName.length <= 8 ? `Répondre à ${escapeHtml(firstName)}` : "Répondre", true)}
      ${telHref ? `<td width="10" style="font-size:0;line-height:0;">&nbsp;</td>${button(telHref, 'Appeler', false)}` : ''}
    </tr></table>`;

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.creme};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.creme}" style="background:${C.creme};">
  <tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.blanc};border-radius:16px;overflow:hidden;">

      <!-- En-tête -->
      <tr><td bgcolor="${C.noir}" style="background:${C.noir};padding:20px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="44" style="vertical-align:middle;">
            <img src="${SITE_URL}/images/logo.jpg" width="44" height="44" alt="" style="display:block;border:0;border-radius:50%;">
          </td>
          <td style="vertical-align:middle;padding-left:12px;font-family:${SERIF};font-size:18px;font-weight:bold;color:${C.creme};">${BRAND}</td>
          <td align="right" style="vertical-align:middle;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.orClair};">Nouvelle demande</td>
        </tr></table>
      </td></tr>

      <!-- Titre -->
      <tr><td style="padding:30px 28px 4px;">
        <div style="font-family:${SANS};font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.or};">${escapeHtml(event || 'Contact')}</div>
        <h1 style="margin:8px 0 6px;font-family:${SERIF};font-size:26px;line-height:1.25;font-weight:bold;color:${C.noir};">${escapeHtml(name)} vous a écrit</h1>
        <p style="margin:0;font-family:${SANS};font-size:13px;color:${C.doux};">Reçue le ${escapeHtml(received)} via ${escapeHtml(SITE_HOST)}</p>
      </td></tr>

      <!-- Fiche -->
      <tr><td style="padding:16px 28px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
      </td></tr>

      <!-- Message -->
      <tr><td style="padding:22px 28px 4px;">
        <div style="font-family:${SANS};font-size:13px;font-weight:bold;color:${C.doux};padding-bottom:8px;">Message</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td bgcolor="${C.creme}" style="background:${C.creme};border-left:3px solid ${C.or};border-radius:8px;padding:16px 18px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.texte};">
            ${escapeHtml(message).replace(/\r?\n/g, '<br>')}
          </td>
        </tr></table>
      </td></tr>

      <!-- Actions -->
      <tr><td style="padding:24px 28px 30px;">${buttons}</td></tr>

      <!-- Pied -->
      <tr><td style="padding:18px 28px 22px;border-top:1px solid ${C.bord};font-family:${SANS};font-size:12px;line-height:1.6;color:${C.doux};">
        Email envoyé automatiquement par le formulaire de contact de
        <a href="${SITE_URL}" style="color:${C.doux};">${escapeHtml(SITE_HOST)}</a>.<br>
        Répondre à cet email écrit directement à ${escapeHtml(email)}.
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const pad = (s) => s.padEnd(20);
  const text = [
    'NOUVELLE DEMANDE DE CONTACT',
    `Reçue le ${received} via ${SITE_HOST}`,
    '',
    `${pad('Nom')}: ${name}`,
    `${pad('Email')}: ${email}`,
    `${pad('Téléphone')}: ${phone || 'Non renseigné'}`,
    `${pad('Événement')}: ${event || 'Non précisé'}`,
    `${pad('Date souhaitée')}: ${d ? cap(d.long) : 'Non précisée'}`,
    `${pad('Offres & actualités')}: ${marketing ? 'Accepte de les recevoir' : 'Non'}`,
    '',
    'MESSAGE',
    message,
    '',
    '—',
    `Répondre à cet email écrit directement à ${email}.`,
  ].join('\n');

  return { subject, html, text };
}
