/**
 * Construction de l'e-mail de commande reçu par la pâtisserie.
 * Fichier sans dépendance (testable sous Node) : worker/index.js l'envoie.
 */

const BRAND = {
  name: "Sesia Pâtisserie",
  site: "sesia-patisserie.com",
  ink: "#1b1613",
  cream: "#f8f4ee",
  sand: "#efe7dc",
  gold: "#b38a5b",
  goldLight: "#dcc4a2",
  muted: "#6c5f55",
};

const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "Arial,Helvetica,sans-serif";

export const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Retire les retours à la ligne (anti-injection d'en-têtes) et borne la longueur. */
export const clean = (value, max = 200) =>
  String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);

export const isEmail = (value) => /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/.test(value);

const toBase64 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const wrap76 = (text) => text.replace(/(.{76})/g, "$1\r\n");

/** En-tête encodé RFC 2047, découpé en mots de 75 caractères maximum. */
export function encodeHeader(text) {
  if (/^[\x20-\x7e]*$/.test(text)) return text;
  const words = [];
  let chunk = "";
  for (const char of Array.from(text)) {
    if (new TextEncoder().encode(chunk + char).length > 42) {
      words.push(chunk);
      chunk = "";
    }
    chunk += char;
  }
  if (chunk) words.push(chunk);
  return words.map((word) => `=?UTF-8?B?${toBase64(word)}?=`).join("\r\n ");
}

const formatDate = (iso) => {
  if (!iso) return "";
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  const text = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/** Valide et normalise les données du formulaire. Renvoie { error } ou { data }. */
export function parseOrder(raw) {
  const data = {
    prenom: clean(raw.prenom, 60),
    nom: clean(raw.nom, 60),
    email: clean(raw.email, 120),
    telephone: clean(raw.telephone, 30),
    produit: clean(raw.produit, 60),
    parfum: clean(raw.parfum, 80),
    quantiteLabel: clean(raw.quantiteLabel, 40),
    quantite: clean(raw.quantite, 10),
    date: clean(raw.date, 10),
    heure: clean(raw.heure, 5),
    estimation: clean(raw.estimation, 120),
    message: String(raw.message ?? "").trim().slice(0, 3000),
  };
  if (!data.prenom || !data.nom) return { error: "Nom et prénom requis." };
  if (!isEmail(data.email)) return { error: "Adresse e-mail invalide." };
  return { data };
}

const sectionTitle = (text) =>
  `<div style="font:600 11px/1 ${SANS};letter-spacing:.3em;text-transform:uppercase;color:${BRAND.ink};padding-bottom:6px;border-bottom:2px solid ${BRAND.ink}">${text}</div>`;

const cellLabel = `padding:14px 0;border-bottom:1px solid #e7ddd0;font:600 11px/1.4 ${SANS};letter-spacing:.16em;text-transform:uppercase;color:${BRAND.muted};width:38%;vertical-align:top`;
const cellValue = `padding:14px 0;border-bottom:1px solid #e7ddd0;font:400 16px/1.5 ${SERIF};color:${BRAND.ink};vertical-align:top`;

const row = (label, valueHtml) =>
  valueHtml
    ? `<tr><td style="${cellLabel}">${escapeHtml(label)}</td><td style="${cellValue}">${valueHtml}</td></tr>`
    : "";

function button(href, label, primary) {
  const style = primary
    ? `background:${BRAND.ink};color:#ffffff;border:1px solid ${BRAND.ink}`
    : `background:#ffffff;color:${BRAND.ink};border:1px solid #cdbfae`;
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 10px 0;padding:14px 26px;border-radius:999px;font:600 12px/1 ${SANS};letter-spacing:.16em;text-transform:uppercase;text-decoration:none;${style}">${escapeHtml(label)}</a>`;
}

export function renderHtml(order, receivedAt) {
  const fullName = `${order.prenom} ${order.nom}`;
  const replySubject = encodeURIComponent(`Votre demande — ${BRAND.name}`);
  const phoneHref = order.telephone.replace(/[^\d+]/g, "");
  const messageHtml = escapeHtml(order.message).replace(/\n/g, "<br>");
  const link = (href, text) =>
    `<a href="${escapeHtml(href)}" style="color:${BRAND.ink};text-decoration:underline">${escapeHtml(text)}</a>`;

  const estimation = order.estimation
    ? `<div style="margin-top:22px;padding:20px 24px;background:${BRAND.cream};border-radius:16px;border:1px solid #eadfce">
        <div style="font:600 10px/1 ${SANS};letter-spacing:.24em;text-transform:uppercase;color:${BRAND.muted}">Estimation indicative (tarifs du site)</div>
        <div style="margin-top:10px;font:400 26px/1.2 ${SERIF};color:${BRAND.ink}">${escapeHtml(order.estimation)}</div>
      </div>`
    : "";

  const message = order.message
    ? `<tr><td style="padding:34px 40px 0">
      ${sectionTitle("Son message")}
      <div style="margin-top:20px;padding:6px 0 6px 22px;border-left:3px solid ${BRAND.gold};font:italic 400 18px/1.75 ${SERIF};color:${BRAND.ink}">${messageHtml}</div>
    </td></tr>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Nouvelle demande de devis</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.sand}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(fullName)} souhaite un devis : ${escapeHtml(order.produit)}${order.quantite ? `, ${escapeHtml(order.quantite)}` : ""}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.sand}">
<tr><td align="center" style="padding:32px 14px">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:24px;overflow:hidden">

    <tr><td align="center" style="background:${BRAND.ink};padding:40px 32px 34px">
      <div style="font:400 34px/1 ${SERIF};letter-spacing:.08em;color:${BRAND.cream}">Sesia</div>
      <div style="margin-top:10px;font:600 10px/1 ${SANS};letter-spacing:.5em;text-transform:uppercase;color:${BRAND.goldLight}">Pâtisserie</div>
      <div style="width:44px;height:1px;background:${BRAND.gold};margin:26px auto 0"></div>
    </td></tr>

    <tr><td style="padding:44px 40px 8px">
      <div style="font:600 11px/1 ${SANS};letter-spacing:.3em;text-transform:uppercase;color:${BRAND.gold}">Nouvelle demande de devis</div>
      <div style="margin-top:16px;font:400 34px/1.12 ${SERIF};color:${BRAND.ink}">${escapeHtml(fullName)}<br><span style="color:${BRAND.gold};font-style:italic">souhaite une création.</span></div>
      <div style="margin-top:14px;font:400 15px/1.7 ${SANS};color:${BRAND.muted}">Bonjour Chloé, une demande vient d'arriver depuis le site. Répondez simplement à cet e-mail : votre réponse partira directement chez ${escapeHtml(order.prenom)}.</div>
    </td></tr>

    <tr><td style="padding:22px 40px 6px">
      ${button(`mailto:${order.email}?subject=${replySubject}`, `Répondre à ${order.prenom}`, true)}
      ${order.telephone ? button(`tel:${phoneHref}`, "Appeler", false) : ""}
    </td></tr>

    <tr><td style="padding:26px 40px 0">
      ${sectionTitle("La commande")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Création", escapeHtml(order.produit))}
        ${row("Parfum", escapeHtml(order.parfum))}
        ${row(order.quantiteLabel || "Quantité", escapeHtml(order.quantite))}
        ${row("Date souhaitée", escapeHtml(formatDate(order.date)))}
        ${row("Heure souhaitée", escapeHtml(order.heure))}
      </table>
      ${estimation}
    </td></tr>

    <tr><td style="padding:34px 40px 0">
      ${sectionTitle("Le client")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Nom", escapeHtml(fullName))}
        ${row("E-mail", link(`mailto:${order.email}`, order.email))}
        ${order.telephone ? row("Téléphone", link(`tel:${phoneHref}`, order.telephone)) : ""}
      </table>
    </td></tr>

    ${message}

    <tr><td style="padding:44px 40px 40px">
      <div style="border-top:1px solid #e7ddd0;padding-top:22px;font:400 12px/1.7 ${SANS};color:${BRAND.muted}">
        Demande reçue le ${escapeHtml(receivedAt)} depuis <a href="https://www.${BRAND.site}/commander" style="color:${BRAND.muted}">${BRAND.site}</a>.<br>
        Les commandes se font uniquement sur devis.
      </div>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}

export function renderText(order, receivedAt) {
  const lines = [
    "NOUVELLE DEMANDE DE DEVIS",
    "",
    `Client : ${order.prenom} ${order.nom}`,
    `E-mail : ${order.email}`,
    order.telephone && `Téléphone : ${order.telephone}`,
    "",
    `Création : ${order.produit}`,
    order.parfum && `Parfum : ${order.parfum}`,
    order.quantite && `${order.quantiteLabel || "Quantité"} : ${order.quantite}`,
    order.date && `Date souhaitée : ${formatDate(order.date)}`,
    order.heure && `Heure souhaitée : ${order.heure}`,
    order.estimation && `Estimation indicative : ${order.estimation}`,
    "",
    order.message && "Message :",
    order.message,
    "",
    `Reçu le ${receivedAt} depuis ${BRAND.site}`,
  ];
  return lines.filter((line) => line !== undefined && line !== false && line !== null).join("\n");
}

/** Message MIME complet (multipart/alternative, UTF-8), prêt pour EmailMessage. */
export function buildMime({ from, to, order, receivedAt }) {
  const boundary = `sesia_${crypto.randomUUID().replace(/-/g, "")}`;
  const fullName = `${order.prenom} ${order.nom}`.replace(/["<>\\]/g, "");
  const subject = `Nouvelle demande de devis — ${order.produit} — ${fullName}`;
  const part = (type, body) =>
    [
      `--${boundary}`,
      `Content-Type: ${type}; charset=UTF-8`,
      "Content-Transfer-Encoding: base64",
      "",
      wrap76(toBase64(body)),
      "",
    ].join("\r\n");

  return [
    `From: ${encodeHeader(BRAND.name)} <${from}>`,
    `To: ${to}`,
    `Reply-To: ${encodeHeader(fullName)} <${order.email}>`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${BRAND.site}>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    part("text/plain", renderText(order, receivedAt)),
    part("text/html", renderHtml(order, receivedAt)),
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

export function formatReceivedAt(date = new Date()) {
  return date.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "full",
    timeStyle: "short",
  });
}
