"use client";

import { useState } from "react";
import { cakes, contact, mignardises, numberCakes, orderPage } from "@/content/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-cream-50 px-4 py-3.5 text-[0.95rem] text-ink transition-colors placeholder:text-ink-400 focus:border-gold focus:bg-white focus:outline-none";

const labelClass = "block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink-500";

const euro = (value: number) =>
  value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

/** Lit un tarif affiché (« 3,80 € ») sous forme de nombre. */
const amount = (value: string) => Number.parseFloat(value.replace(",", ".").replace(/[^\d.]/g, ""));

/** Estimation indicative à partir des tarifs publiés — le devis fait foi. */
function estimate(product: string, people: number): string | null {
  if (!people || people < 1) return null;
  if (product === "Number cake") {
    return `${euro(people * amount(numberCakes.prices[0].value))} pour ${people} parts`;
  }
  if (product === "Mignardises") {
    const qty = Math.max(30, people);
    return `${euro(qty * amount(mignardises.prices[0].value))} pour ${qty} pièces${people < 30 ? " (minimum 30)" : ""}`;
  }
  if (product === "Gâteau / tarte / pavlova") {
    const size = cakes.prices.find((p) => people <= amount(p.label));
    return size ? `${size.value} — ${size.label.toLowerCase()}` : "Sur devis au-delà de 8 parts";
  }
  return null;
}

/** Clé publique Web3Forms (envoi direct vers la boîte mail). Voir .env.example. */
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "success" | "error";

/**
 * Le formulaire envoie la demande directement à la boîte mail de la pâtisserie
 * via Web3Forms, sans quitter le site. Si aucune clé n'est configurée, il
 * retombe sur un e-mail pré-rempli ouvert dans la messagerie du visiteur.
 */
export function OrderForm() {
  const [product, setProduct] = useState(orderPage.products[0].value);
  const [people, setPeople] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const flavors = orderPage.products.find((p) => p.value === product)?.flavors ?? [];
  const peopleLabel = product === "Mignardises" ? "Nombre de pièces" : "Nombre de parts";
  const price = estimate(product, Number(people));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = `${data.get("prenom")} ${data.get("nom")}`.trim();
    const subject = `[Commande] ${product} — ${fullName}`;
    const body = [
      `Prénom : ${data.get("prenom")}`,
      `Nom : ${data.get("nom")}`,
      `E-mail : ${data.get("email")}`,
      `Téléphone : ${data.get("telephone") || "—"}`,
      "",
      `Création souhaitée : ${product}`,
      `Parfum : ${data.get("parfum") || "—"}`,
      `${peopleLabel} : ${data.get("personnes") || "—"}`,
      `Date souhaitée : ${data.get("date") || "—"}`,
      `Heure souhaitée : ${data.get("heure") || "—"}`,
      price ? `Estimation indicative : ${price}` : "",
      "",
      "Informations complémentaires :",
      String(data.get("message") ?? ""),
    ]
      .filter((line, i, all) => line !== "" || all[i - 1] !== "")
      .join("\n");

    // Sans clé : repli sur la messagerie du visiteur.
    if (!accessKey) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      return;
    }

    // Champ piège anti-spam : seuls les robots le remplissent.
    if (data.get("botcheck")) return;

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: "Site Sesia Pâtisserie",
          name: fullName,
          email: String(data.get("email") ?? ""),
          phone: String(data.get("telephone") ?? ""),
          message: body,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("envoi refusé");
      form.reset();
      setPeople("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl text-gold-light">
          ✓
        </span>
        <h3 className="mt-8 text-4xl text-ink">Merci pour votre demande&nbsp;!</h3>
        <p className="mx-auto mt-5 max-w-md text-[1rem] leading-[1.8] text-ink-500">
          Elle est bien arrivée. Je reviens vers vous très vite avec un devis personnalisé.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-9 rounded-full border border-ink/20 px-7 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <fieldset>
        <legend className="flex items-center gap-4 font-display text-[1.7rem] text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-sans text-xs text-cream">1</span>
          Que souhaitez-vous&nbsp;?
        </legend>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {orderPage.products.map((option) => {
            const active = option.value === product;
            return (
              <label
                key={option.value}
                className={cn(
                  "relative flex min-h-20 cursor-pointer items-center rounded-2xl border px-5 py-4 text-[0.92rem] leading-snug transition-all duration-300",
                  active
                    ? "border-ink bg-ink text-cream shadow-[0_12px_30px_-12px_rgba(27,22,19,0.45)]"
                    : "border-ink/12 bg-cream-50 text-ink-700 hover:border-ink/35",
                )}
              >
                <input
                  type="radio"
                  name="produit"
                  value={option.value}
                  checked={active}
                  onChange={() => setProduct(option.value)}
                  className="sr-only"
                />
                {option.value}
                <span
                  aria-hidden
                  className={cn(
                    "absolute right-4 top-4 h-2 w-2 rounded-full transition-colors",
                    active ? "bg-gold-light" : "bg-ink/10",
                  )}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {flavors.length ? (
            <div>
              <label className={labelClass} htmlFor="parfum">
                Parfum
              </label>
              <select id="parfum" name="parfum" className={`mt-2.5 ${fieldClass}`}>
                {flavors.map((flavor) => (
                  <option key={flavor}>{flavor}</option>
                ))}
              </select>
            </div>
          ) : null}
          {product !== "Autre demande" ? (
            <div>
              <label className={labelClass} htmlFor="personnes">
                {peopleLabel}
              </label>
              <input
                id="personnes"
                name="personnes"
                type="number"
                min={1}
                inputMode="numeric"
                value={people}
                onChange={(event) => setPeople(event.target.value)}
                placeholder={product === "Mignardises" ? "30 minimum" : "Ex. 12"}
                className={`mt-2.5 ${fieldClass}`}
              />
            </div>
          ) : null}
        </div>

        <div
          aria-live="polite"
          className={cn(
            "grid transition-all duration-500",
            price ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-sand px-5 py-4 text-sm text-ink-500">
              <span>Estimation indicative</span>
              <span className="font-display text-2xl text-ink">{price}</span>
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="flex items-center gap-4 font-display text-[1.7rem] text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-sans text-xs text-cream">2</span>
          Pour quand&nbsp;?
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="date">
              Date souhaitée
            </label>
            <input id="date" name="date" type="date" className={`mt-2.5 ${fieldClass}`} />
          </div>
          <div>
            <label className={labelClass} htmlFor="heure">
              Heure souhaitée
            </label>
            <input id="heure" name="heure" type="time" step={900} className={`mt-2.5 ${fieldClass}`} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="flex items-center gap-4 font-display text-[1.7rem] text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-sans text-xs text-cream">3</span>
          Vos coordonnées
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="prenom">
              Prénom *
            </label>
            <input id="prenom" name="prenom" required autoComplete="given-name" className={`mt-2.5 ${fieldClass}`} />
          </div>
          <div>
            <label className={labelClass} htmlFor="nom">
              Nom *
            </label>
            <input id="nom" name="nom" required autoComplete="family-name" className={`mt-2.5 ${fieldClass}`} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              E-mail *
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={`mt-2.5 ${fieldClass}`} />
          </div>
          <div>
            <label className={labelClass} htmlFor="telephone">
              Téléphone
            </label>
            <input id="telephone" name="telephone" type="tel" autoComplete="tel" className={`mt-2.5 ${fieldClass}`} />
          </div>
        </div>
        <div className="mt-5">
          <label className={labelClass} htmlFor="message">
            Informations complémentaires
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Thème, couleurs, chiffre ou lettre souhaités, allergies, inscription…"
            className={`mt-2.5 resize-y ${fieldClass}`}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-ink-400">
          Les commandes se font uniquement sur devis. Vos informations servent seulement à traiter votre demande.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-9 py-4.5 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-gold-dark disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            &rarr;
          </span>
        </button>
      </div>

      <p aria-live="polite" className="min-h-6 text-sm text-red-800">
        {status === "error"
          ? `L'envoi a échoué. Réessayez, ou contactez-moi directement au ${contact.phoneDisplay} ou à ${contact.email}.`
          : ""}
      </p>
    </form>
  );
}
