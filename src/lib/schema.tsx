import { categories, contact, photos, site, socials } from "@/content/site";
import { absoluteUrl } from "./utils";

/** Données structurées schema.org — fiche entreprise et catalogue pour les moteurs de recherche. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${absoluteUrl("/")}#business`,
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icons/icon-512.png"),
    image: [absoluteUrl(photos.numberCake50.src), absoluteUrl(photos.chloePortrait.src)],
    telephone: contact.phoneHref,
    email: contact.email,
    priceRange: "€",
    servesCuisine: "Pâtisserie",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressStreet,
      addressLocality: contact.addressLocality,
      addressRegion: contact.addressRegion,
      postalCode: contact.addressPostalCode,
      addressCountry: contact.addressCountry,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Vendée" },
    founder: { "@type": "Person", name: "Chloé", jobTitle: "Pâtissière" },
    sameAs: socials.map((social) => social.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nos créations",
      itemListElement: categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.title,
        url: absoluteUrl(category.href),
        itemListElement: category.flavors.map((flavor) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: flavor.name, description: flavor.description },
        })),
      })),
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
