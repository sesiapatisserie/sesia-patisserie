# Sesia Pâtisserie — site vitrine

Refonte complète du site de **Sesia Pâtisserie**, pâtisserie artisanale à Essarts-en-Bocage
(Vendée). Site statique rendu côté serveur, pensé pour être rapide, accessible et
entièrement modifiable depuis un seul fichier de contenu.

## Stack

| Brique | Choix |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styles | Tailwind CSS v4 (thème et tokens définis dans `src/app/globals.css`) |
| Typographies | Cormorant Garamond (titres) + Jost (textes), via `next/font` — auto-hébergées |
| Animations | CSS + IntersectionObserver, aucune librairie tierce |
| Rendu | 100 % statique (SSG) — aucune base de données, aucun service externe |

Toutes les pages sont prérendues à la compilation : le site peut être hébergé sur Vercel,
Netlify, ou n'importe quel hébergeur Node.

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres commandes :

```bash
npm run build      # build de production
npm run start      # sert le build de production
npm run lint       # ESLint (config Next flat)
npm run typecheck  # TypeScript sans émission
```

Copier `.env.example` vers `.env.local` et renseigner `NEXT_PUBLIC_SITE_URL` avec l'URL
définitive : elle alimente les métadonnées SEO, le sitemap et les données structurées.

## En cas de souci à l'installation

**`Cannot find module '../lightningcss.win32-x64-msvc.node'` (ou l'équivalent
`@tailwindcss/oxide`) au premier `npm run dev`.**

Tailwind v4 s'appuie sur des binaires natifs compilés par plateforme, installés
comme dépendances optionnelles. npm les saute parfois quand l'arbre `node_modules`
a été construit en plusieurs passes ([npm/cli#4828](https://github.com/npm/cli/issues/4828)).
Le correctif est une réinstallation propre :

```bash
rm -rf node_modules && npm install      # PowerShell : Remove-Item -Recurse -Force node_modules
```

Ne pas supprimer `package-lock.json` : il référence déjà les binaires de toutes les
plateformes (Windows, macOS, Linux, x64 et arm64). Le regénérer ferait seulement
perdre les versions verrouillées.

## Modifier le contenu

**Tout le texte du site est dans `src/content/site.ts`.** Aucune connaissance de React
n'est nécessaire pour le faire évoluer :

| Bloc | Ce qu'il pilote |
| --- | --- |
| `site`, `contact` | Nom, description, adresse, téléphone, e-mail, coordonnées GPS |
| `openingHours`, `openingHoursCompact`, `openingHoursSchema` | Horaires affichés et horaires transmis à Google |
| `socials` | Réseaux sociaux — laisser `href: ""` masque le lien |
| `creations` | Catalogue : nom, catégorie, description, notes, prix, badges « signature » / « de saison » |
| `bespoke` | Page Sur mesure : occasions, déroulé, délais |
| `story`, `savoirFaire`, `pillars` | Page La Maison et sections éditoriales de l'accueil |
| `testimonials`, `faq` | Avis clients et questions fréquentes |

Ajouter une création revient à ajouter un objet dans le tableau `creations` — la page
et les filtres se mettent à jour automatiquement.

### Données à confirmer

Le site a été reconstruit à partir du contenu public de l'ancien site et des
informations de l'établissement. Trois blocs sont à **valider ou corriger** par la
maison avant mise en ligne, tous dans `src/content/site.ts` :

1. `openingHours` / `openingHoursCompact` — horaires donnés à titre d'hypothèse.
2. `creations` — noms, compositions et prix des pièces, à ajuster à la carte réelle.
3. `socials` — liens Instagram / Facebook (vides par défaut, donc masqués).

Les mentions légales (`src/app/mentions-legales/page.tsx`) attendent le SIRET et la
forme juridique.

## Passer aux photographies

Les visuels sont pour l'instant des **illustrations vectorielles au trait**
(`src/components/PastryArt.tsx`), volontairement sobres et sans dépendance externe.
Pour basculer sur des photos :

1. Déposer les images dans `public/images/`.
2. Ajouter un champ `image` à chaque entrée de `creations`.
3. Dans `src/components/CreationCard.tsx`, remplacer `<PastryArt … />` par
   `<Image src={creation.image} alt={creation.name} fill className="object-cover" />`
   (`next/image` optimise et sert automatiquement en AVIF/WebP).

Faire de même dans `Hero.tsx`, `src/app/page.tsx` et `src/app/maison/page.tsx` pour les
blocs décoratifs.

## Structure

```
src/
├── app/
│   ├── layout.tsx            en-tête, pied de page, métadonnées, données structurées
│   ├── page.tsx              accueil
│   ├── creations/            la carte, avec filtres par catégorie
│   ├── maison/               histoire, valeurs, savoir-faire
│   ├── sur-mesure/           mariages, anniversaires, délais
│   ├── contact/              coordonnées, formulaire, plan, FAQ
│   ├── mentions-legales/
│   ├── sitemap.ts robots.ts  SEO technique
│   └── opengraph-image.tsx   image de partage générée à la compilation
├── components/               composants d'interface réutilisables
├── content/site.ts           ► tout le contenu éditorial
└── lib/                      utilitaires et données structurées schema.org
```

## Formulaire de contact

Le formulaire compose un e-mail prérempli et l'ouvre dans la messagerie du visiteur :
aucun backend, aucun service tiers, aucune donnée collectée côté serveur. Pour un envoi
direct (sans passer par le client mail), brancher une route API dans
`src/components/ContactForm.tsx` — le point d'insertion est commenté dans le fichier.

## SEO & accessibilité

- Métadonnées et URL canoniques par page, Open Graph et image de partage générée.
- Données structurées `schema.org/Bakery` (adresse, horaires, contact) et `FAQPage`.
- `sitemap.xml` et `robots.txt` générés automatiquement.
- Navigation au clavier, lien d'évitement, contrastes conformes, `prefers-reduced-motion`
  respecté, contenu entièrement lisible sans JavaScript.
