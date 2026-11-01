/**
 * Worker du site : sert les fichiers statiques (dossier out/) et traite
 * l'envoi du formulaire de commande (POST /api/contact) par e-mail, via
 * Cloudflare Email Routing (binding EMAIL, destinataire vérifié).
 */
import { EmailMessage } from "cloudflare:email";
import { buildIcs, buildMime, formatReceivedAt, parseOrder } from "./email.js";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

/** Origines autorisées à appeler l'API : le site lui-même et l'adresse de test workers.dev. */
const isAllowedOrigin = (origin, host) => {
  if (!origin) return true;
  try {
    const { hostname } = new URL(origin);
    return hostname === host || hostname.endsWith("sesia-patisserie.com") || hostname.endsWith(".workers.dev");
  } catch {
    return false;
  }
};

async function handleContact(request, env) {
  const url = new URL(request.url);
  if (request.method !== "POST") return json({ ok: false, error: "Méthode non autorisée." }, 405);
  if (!isAllowedOrigin(request.headers.get("Origin"), url.hostname)) {
    return json({ ok: false, error: "Origine refusée." }, 403);
  }

  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Requête invalide." }, 400);
  }

  // Champ piège : un robot le remplit, on répond « succès » sans rien envoyer.
  if (raw.botcheck) return json({ ok: true });

  const { data, error } = parseOrder(raw);
  if (error) return json({ ok: false, error }, 422);

  if (!env.EMAIL) return json({ ok: false, error: "Envoi indisponible." }, 503);

  try {
    const mime = buildMime({
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      order: data,
      receivedAt: formatReceivedAt(),
    });
    await env.EMAIL.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, mime));
    return json({ ok: true });
  } catch (cause) {
    console.error("Envoi e-mail impossible", cause);
    return json({ ok: false, error: "Envoi impossible." }, 502);
  }
}

/** GET /api/agenda?… : renvoie le fichier .ics de la commande (bouton « Ajouter à mon agenda »). */
function handleAgenda(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Méthode non autorisée.", { status: 405 });
  }
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const { data } = parseOrder(params);
  const ics = data && buildIcs(data);
  if (!ics) return new Response("Date de commande manquante ou invalide.", { status: 400 });

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="commande-sesia.ics"',
      "Cache-Control": "no-store",
    },
  });
}

const worker = {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return handleContact(request, env);
    if (pathname === "/api/agenda") return handleAgenda(request);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
