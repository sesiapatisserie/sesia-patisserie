/**
 * Contenu éditorial du site Sesia Pâtisserie.
 *
 * Tout le texte, les coordonnées, les tarifs et les photos sont centralisés
 * ici : modifier ce fichier suffit à mettre le site à jour, sans toucher aux
 * composants.
 */

export const site = {
  name: "Sesia Pâtisserie",
  shortName: "Sesia",
  legalName: "Sesia Pâtisserie",
  tagline: "Pâtisserie artisanale faite maison",
  city: "Landeronde",
  region: "Vendée",
  /** Titre d'accueil, repris de l'ancien site avec la nouvelle localité. */
  homeTitle: "Sesia Pâtisserie | Pâtisserie | Landeronde, Vendée",
  description:
    "Sesia Pâtisserie, découvrez nos diverses créations pour vos évènements : number cakes, tartes, pavlovas et mignardises faits maison à Landeronde, en Vendée.",
  url: "https://www.sesia-patisserie.com",
  /** Validation Google Search Console, conservée depuis le site Wix. */
  googleSiteVerification: "na4UL_kqY0btPs7vEMgkUvV_-rITlXASe_kUCMyObTw",
};

export const contact = {
  addressLines: ["19 rue des Bergeronnettes", "85150 Landeronde"],
  addressStreet: "19 rue des Bergeronnettes",
  addressLocality: "Landeronde",
  addressRegion: "Pays de la Loire",
  addressPostalCode: "85150",
  addressCountry: "FR",
  phoneDisplay: "07 81 55 86 07",
  phoneHref: "+33781558607",
  email: "sesiapatisserie@gmail.com",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/sesia.patisserie", handle: "@sesia.patisserie" },
  { label: "TikTok", href: "https://www.tiktok.com/@sesiapatisserie", handle: "@sesiapatisserie" },
  { label: "Facebook", href: "https://www.facebook.com/share/1EVnvADmFR/", handle: "Sesia Pâtisserie" },
];

export const photoCredit = {
  name: "Chloé Français",
  href: "https://www.instagram.com/les.photos.de_chloe",
};

/* -------------------------------------------------------------------------- */
/* Photos                                                                     */
/* -------------------------------------------------------------------------- */

export type Photo = { src: string; alt: string; width: number; height: number };

const photo = (name: string, alt: string, width: number, height: number): Photo => ({
  src: `/photos/${name}.jpg`,
  alt,
  width,
  height,
});

export const photos = {
  chloePortrait: photo("chloe-portrait", "Chloé, pâtissière de Sesia Pâtisserie", 1800, 1800),
  chloeApropos: photo("chloe-apropos", "Chloé en veste de pâtissière, un fouet à la main", 1200, 1800),
  chloeAssise: photo("chloe-assise", "Chloé assise dans un fauteuil, fouet à la main", 1200, 1800),
  chloeSourire: photo("chloe-sourire", "Portrait souriant de Chloé", 1200, 1800),
  chloeTarte: photo("chloe-tarte", "Chloé présentant une pavlova aux fruits", 1202, 1800),
  chloeDressage: photo("chloe-dressage", "Chloé décorant une pavlova de fruits frais", 1150, 1800),
  dressagePoche: photo("dressage-poche", "Dressage de la meringue à la poche", 1200, 1800),
  pavlovaDressage: photo("pavlova-dressage", "Couronne de meringue dressée à la poche", 1035, 1800),
  tarteDressageMains: photo("tarte-dressage-mains", "Finitions d'une pavlova aux fruits", 1800, 1200),
  tarteCitronMeringuee: photo("tarte-citron-meringuee", "Tarte citron meringuée dans sa boîte", 1012, 1800),
  tarteCitronDetail: photo("tarte-citron-detail", "Détail d'une pavlova aux agrumes et citron vert", 1145, 1800),
  partTarteCitron: photo("part-tarte-citron", "Part de tarte citron meringuée à l'assiette", 1013, 1800),
  tartesFraises: photo("tartes-fraises", "Tartes aux fraises fraîches", 1800, 1800),
  numberCakeChocolatCitron: photo("number-cake-chocolat-citron", "Number cake chocolat et citron", 1012, 1800),
  numberCakesFleurs: photo("number-cakes-fleurs", "Number cakes et letter cakes décorés de fleurs et de fruits rouges", 1350, 1800),
  numberCakesChocolat: photo("number-cakes-chocolat", "Number cakes tout chocolat", 1013, 1800),
  numberCake50: photo("number-cake-50", "Number cake « 50 » aux fraises et agrumes", 1800, 1350),
  numberCake18: photo("number-cake-18", "Number cake aux trois parfums", 1013, 1800),
  numberCakeCaramel: photo("number-cake-caramel", "Création vanille et caramel beurre salé", 1350, 1800),
  mignardisesPlateau: photo("mignardises-plateau", "Plateau de chouquettes, mini donuts et choux", 1012, 1800),
  mignardisesCoffret: photo("mignardises-coffret", "Coffret de mignardises : choux, mini donuts et crèmes", 1012, 1800),
};

/* -------------------------------------------------------------------------- */
/* Accueil                                                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Pâtisserie artisanale · Vendée",
  text: "Toutes nos pâtisseries sont uniques et entièrement personnalisables.",
  primaryCta: { label: "Commandez dès maintenant", href: "/commander" },
  secondaryCta: { label: "Nos créations", href: "/creations" },
};

export const productsIntro = {
  eyebrow: "Nos produits",
  title: "Une sélection gourmande, pour petits et grands",
  text: "Découvrez notre sélection de produits gourmands, conçus pour ravir petits et grands. Des Number Cakes innovants aux mignardises raffinées, chaque création est préparée avec soin et passion. Laissez-vous tenter par des saveurs uniques, réalisées à partir d'ingrédients de qualité et un savoir-faire artisanal.",
};

/* -------------------------------------------------------------------------- */
/* Créations                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Un parfum. `colors` sert à la pastille visuelle de la carte (1 ou 2 teintes
 * évoquant les ingrédients) ; `notes` liste les ingrédients clés.
 */
export type Flavor = {
  name: string;
  description?: string;
  notes?: string[];
  colors: [string] | [string, string];
};

export type PriceLine = { label: string; value: string; unit?: string };

export type Category = {
  slug: "number-cake" | "nos-gateaux" | "nos-migniardises";
  href: string;
  /** Libellé court (navigation, cartes). */
  label: string;
  eyebrow: string;
  title: string;
  teaser: string;
  intro: string[];
  flavorsTitle: string;
  flavors: Flavor[];
  prices: PriceLine[];
  priceNote?: string;
  priceFrom: string;
  outro: string;
  /** Teinte d'ambiance de la page. */
  accent: { bg: string; soft: string; ink: string };
  hero: Photo;
  cover: Photo;
  gallery: Photo[];
  seo: { title: string; description: string };
};

const C = {
  chocolat: "#4a2c21",
  chocolatNoir: "#2b1a14",
  vanille: "#f1e3c2",
  citron: "#f2d65b",
  coco: "#f7f3ea",
  fruitsRouges: "#c8424d",
  fruitsJaunes: "#f0b43c",
  speculoos: "#b5763d",
  caramel: "#c98a3a",
  oreo: "#1f1b1a",
  pomme: "#d9a55a",
  meringue: "#f4e7cf",
  fruitsSaison: "#d9534f",
  creme: "#f3e6cc",
};

export const numberCakes: Category = {
  slug: "number-cake",
  href: "/number-cake",
  label: "Number cakes",
  eyebrow: "Notre best-seller",
  title: "Nos Number Cakes",
  teaser: "Découvrez notre best-seller : le Number Cake, une explosion de saveurs uniques.",
  intro: [
    "Chez SESIA Pâtisserie, notre Number Cake est notre véritable best-seller, une création qui ravit à chaque bouchée.",
    "Composé d'une base de pâte sucrée et d'une crème onctueuse, chaque gâteau est une véritable œuvre d'art pâtissière. La crème varie selon le parfum choisi et apporte une touche de gourmandise supplémentaire, pour un équilibre parfait entre textures et saveurs.",
  ],
  flavorsTitle: "Nos parfums proposés",
  flavors: [
    {
      name: "Chocolat / Vanille",
      description: "Un mariage classique, mais inégalé, alliant la richesse du chocolat et la douceur de la vanille.",
      notes: ["Chocolat", "Vanille"],
      colors: [C.chocolat, C.vanille],
    },
    {
      name: "Tout Chocolat",
      description: "Pour les amoureux du chocolat, un véritable voyage au cœur de la gourmandise.",
      notes: ["100 % chocolat"],
      colors: [C.chocolatNoir],
    },
    {
      name: "Citron",
      description: "Légèrement acidulé, frais et léger, idéal pour apporter une touche de fraîcheur à vos événements.",
      notes: ["Acidulé", "Frais"],
      colors: [C.citron],
    },
    {
      name: "Chocolat / Coco",
      description: "L'union parfaite entre l'intensité du chocolat et la douceur de la noix de coco.",
      notes: ["Chocolat", "Noix de coco"],
      colors: [C.chocolat, C.coco],
    },
    {
      name: "Multi Fruits",
      description: "Un mélange fruité, frais et coloré qui met en valeur les saveurs de chaque saison, sur une crème onctueuse à la vanille.",
      notes: ["Fruits de saison", "Vanille"],
      colors: [C.fruitsRouges, C.fruitsJaunes],
    },
    {
      name: "Vanille / Spéculoos",
      description: "Une vanille délicate de Madagascar, sublimée par l'arôme épicé du spéculoos.",
      notes: ["Vanille de Madagascar", "Spéculoos"],
      colors: [C.vanille, C.speculoos],
    },
    {
      name: "Vanille / Caramel Beurre Salé",
      description: "Un incontournable, avec la douceur du caramel et la petite touche de sel qui le rend irrésistible.",
      notes: ["Vanille", "Caramel beurre salé"],
      colors: [C.vanille, C.caramel],
    },
    {
      name: "Oreo",
      description: "L'alliance gourmande d'une crème vanille onctueuse et de brisures d'Oreo, pour un parfum à la fois doux et croquant.",
      notes: ["Crème vanille", "Brisures d'Oreo"],
      colors: [C.oreo, C.coco],
    },
    {
      name: "Façon Tatin",
      description: "Une création chaleureuse aux saveurs de pommes caramélisées, caramel beurre salé et crème vanille, pour un goût authentique et réconfortant.",
      notes: ["Pommes caramélisées", "Caramel", "Vanille"],
      colors: [C.pomme, C.caramel],
    },
  ],
  prices: [{ label: "Le prix à la part", value: "3,80 €", unit: "/ part" }],
  priceNote: "Le nombre de parts est défini avec vous selon votre événement.",
  priceFrom: "3,80 € la part",
  outro: "Faites-nous part de vos idées et nous créerons ensemble un number cake à la hauteur de vos envies.",
  accent: { bg: "#f3e4dd", soft: "#f9f0eb", ink: "#8d4f45" },
  hero: photos.numberCake50,
  cover: photos.numberCakesFleurs,
  gallery: [photos.numberCakeChocolatCitron, photos.numberCakesChocolat, photos.numberCakeCaramel, photos.numberCake18],
  seo: {
    title: "Number cake",
    description:
      "Le Number Cake, best-seller de Sesia Pâtisserie : pâte sucrée et crème onctueuse, 9 parfums au choix (chocolat, citron, Oreo, façon Tatin…). 3,80 € la part, sur devis, à Landeronde.",
  },
};

export const cakes: Category = {
  slug: "nos-gateaux",
  href: "/nos-gateaux",
  label: "Tartes & pavlova",
  eyebrow: "Tartes & pavlova",
  title: "Nos gâteaux",
  teaser: "Découvrez nos tartes et notre pavlova.",
  intro: [
    "Chez SESIA Pâtisserie, chaque gâteau est une création raffinée, pensée pour allier gourmandise, élégance et équilibre des saveurs.",
  ],
  flavorsTitle: "Nos créations",
  flavors: [
    {
      name: "Tarte citron meringuée",
      description: "Pâte sucrée, crémeux citron acidulé et meringue italienne dorée. Un équilibre parfait entre fraîcheur et douceur.",
      notes: ["Crémeux citron", "Meringue italienne"],
      colors: [C.citron, C.meringue],
    },
    {
      name: "Tarte tout chocolat",
      description: "Pâte sucrée et ganache chocolat noir, légèrement relevée de fleur de sel, accompagnée d'une ganache montée au chocolat. Un plaisir 100 % chocolaté.",
      notes: ["Ganache chocolat noir", "Fleur de sel"],
      colors: [C.chocolatNoir],
    },
    {
      name: "Tarte aux fruits de saison",
      description: "Crème pâtissière traditionnelle et fruits frais de saison sur une pâte sucrée. Une explosion de fraîcheur et de couleurs.",
      notes: ["Crème pâtissière", "Fruits frais"],
      colors: [C.fruitsSaison, C.creme],
    },
    {
      name: "Tarte chocolat coco",
      description: "Ganache chocolat noir et crème coco onctueuse sur une pâte croustillante. Une alliance exotique et gourmande.",
      notes: ["Chocolat noir", "Crème coco"],
      colors: [C.chocolat, C.coco],
    },
    {
      name: "Pavlova",
      description: "Meringue croquante, crème légère et fruits frais de saison. Un dessert aérien et plein de fraîcheur.",
      notes: ["Meringue", "Fruits de saison"],
      colors: [C.meringue, C.fruitsJaunes],
    },
  ],
  prices: [
    { label: "Tarte 6 parts", value: "19,20 €" },
    { label: "Tarte 8 parts", value: "25,60 €" },
  ],
  priceFrom: "dès 19,20 €",
  outro: "Faites-nous part de vos idées et nous créerons ensemble une création à la hauteur de vos envies.",
  accent: { bg: "#f1e8d2", soft: "#f8f3e6", ink: "#7d6428" },
  hero: photos.tarteDressageMains,
  cover: photos.tarteCitronMeringuee,
  gallery: [photos.chloeTarte, photos.tartesFraises, photos.partTarteCitron, photos.tarteCitronDetail],
  seo: {
    title: "Nos gateaux",
    description:
      "Tarte citron meringuée, tout chocolat, fruits de saison, chocolat coco et pavlova : les gâteaux faits maison de Sesia Pâtisserie, en 6 ou 8 parts, dès 19,20 €.",
  },
};

export const mignardises: Category = {
  slug: "nos-migniardises",
  href: "/nos-migniardises",
  label: "Mignardises",
  eyebrow: "Bouchées sucrées",
  title: "Nos mignardises",
  teaser: "Découvrez nos mignardises, parfaites pour vos buffets et réceptions.",
  intro: [
    "Chez SESIA Pâtisserie, chaque gâteau est une création raffinée, pensée pour allier gourmandise, élégance et équilibre des saveurs — jusque dans le format bouchée.",
  ],
  flavorsTitle: "Nos créations",
  flavors: [
    { name: "Mini tarte citron", description: "Pâte sucrée, crémeux citron acidulé.", notes: ["Citron"], colors: [C.citron] },
    { name: "Mini tarte chocolat", description: "Pâte sucrée et ganache montée chocolat noir.", notes: ["Chocolat noir"], colors: [C.chocolatNoir] },
    {
      name: "Mini tarte aux fruits de saison",
      description: "Crème pâtissière traditionnelle et fruits frais de saison sur une pâte sucrée.",
      notes: ["Fruits frais"],
      colors: [C.fruitsSaison, C.creme],
    },
    { name: "Chouquettes", colors: [C.speculoos, C.coco] },
    { name: "Cookies", colors: [C.caramel, C.chocolat] },
    { name: "Mini donuts", colors: [C.chocolat, "#e9a6b4"] },
  ],
  prices: [{ label: "La mignardise", value: "1,20 €", unit: "/ pièce" }],
  priceNote: "Commande de 30 pièces minimum.",
  priceFrom: "1,20 € la pièce",
  outro: "Faites-nous part de vos idées et nous composerons ensemble un assortiment à la hauteur de vos envies.",
  accent: { bg: "#ece6dc", soft: "#f6f2ec", ink: "#6a5a45" },
  hero: photos.mignardisesCoffret,
  cover: photos.mignardisesCoffret,
  gallery: [photos.mignardisesPlateau],
  seo: {
    title: "Nos migniardises",
    description:
      "Mini tartes citron, chocolat et fruits de saison, chouquettes, cookies et mini donuts : les mignardises de Sesia Pâtisserie à 1,20 € pièce (30 minimum), pour vos buffets.",
  },
};

export const categories = [numberCakes, cakes, mignardises];

export const goodToKnow = {
  eyebrow: "À savoir",
  title: "L'exigence, jusque dans les détails",
  items: [
    {
      title: "Vanille de Madagascar",
      text: "Pour tous nos produits à la vanille, nous utilisons de la vanille de Madagascar de chez Madadélices, une qualité d'exception qui donne à chaque création une profondeur de goût inégalée.",
    },
    {
      title: "Personnalisation à la carte",
      text: "Ce processus de personnalisation nous permet de vous offrir un gâteau sur mesure, en termes de design et de saveurs.",
    },
    {
      title: "Uniquement sur devis",
      text: "Les commandes se font uniquement sur devis, afin de vous garantir une création parfaitement adaptée à vos attentes.",
    },
  ],
  closing:
    "Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé et laissez-vous séduire par l'authenticité et la gourmandise de nos créations !",
};

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "Accueil", href: "/" },
  {
    label: "Nos créations",
    href: "/creations",
    children: categories.map((category) => ({
      label: category.label,
      href: category.href,
      text: category.priceFrom,
    })),
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "À propos", href: "/a-propos" },
];

/* -------------------------------------------------------------------------- */
/* Portfolio                                                                  */
/* -------------------------------------------------------------------------- */

export const galleryCategories = ["Tout", "Number cakes", "Tartes & pavlova", "Mignardises", "En cuisine"] as const;
export type GalleryCategory = Exclude<(typeof galleryCategories)[number], "Tout">;

export const gallery: Array<Photo & { category: GalleryCategory; title: string }> = [
  { ...photos.numberCake50, category: "Number cakes", title: "Number cake" },
  { ...photos.tarteCitronMeringuee, category: "Tartes & pavlova", title: "Tarte citron meringuée" },
  { ...photos.mignardisesCoffret, category: "Mignardises", title: "Mignardises" },
  { ...photos.numberCakesFleurs, category: "Number cakes", title: "Number cakes" },
  { ...photos.chloeDressage, category: "En cuisine", title: "Finitions" },
  { ...photos.tartesFraises, category: "Tartes & pavlova", title: "Tarte aux fraises" },
  { ...photos.numberCakeChocolatCitron, category: "Number cakes", title: "Number cake" },
  { ...photos.tarteCitronDetail, category: "Tartes & pavlova", title: "Pavlova aux agrumes" },
  { ...photos.numberCakeCaramel, category: "Number cakes", title: "Vanille / caramel" },
  { ...photos.dressagePoche, category: "En cuisine", title: "Dressage" },
  { ...photos.numberCakesChocolat, category: "Number cakes", title: "Tout chocolat" },
  { ...photos.partTarteCitron, category: "Tartes & pavlova", title: "Tarte citron" },
  { ...photos.numberCake18, category: "Number cakes", title: "Number cake" },
  { ...photos.tarteDressageMains, category: "En cuisine", title: "Pavlova" },
  { ...photos.pavlovaDressage, category: "En cuisine", title: "Meringue" },
];

/* -------------------------------------------------------------------------- */
/* À propos                                                                   */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: "À propos de moi",
  title: "Rencontrez notre pâtissière",
  lead: "Jeune pâtissière de 20 ans spécialisée dans les number cakes, et pâtisseries diverses et variées.",
  paragraphs: [
    "Je m'appelle Chloé, j'ai 20 ans et la pâtisserie est bien plus qu'un métier pour moi : c'est une véritable passion. Après avoir obtenu mon CAP pâtissier et mon CAP chocolatier-confiseur, j'ai eu l'opportunité de passer une année en Italie, où j'ai travaillé dans de grands hôtels en dessert à l'assiette. Une expérience enrichissante qui m'a permis d'affiner ma technique et de découvrir une nouvelle approche de la pâtisserie.",
    "Aujourd'hui, je poursuis mes études en BTM chocolatier-confiseur tout en développant mon auto-entreprise. Chaque pièce que je réalise est le fruit de mon amour pour les beaux et bons produits, avec une attention particulière portée aux saveurs et à l'esthétique.",
  ],
  signature: "Bienvenue dans mon univers sucré, où chaque bouchée raconte une histoire de passion et de gourmandise !",
  journey: [
    { title: "CAP Pâtissier", text: "Les fondamentaux du métier : pâtes, crèmes, cuissons et montages." },
    { title: "CAP Chocolatier-confiseur", text: "Le travail du chocolat et de la confiserie." },
    { title: "Une année en Italie", text: "Dessert à l'assiette dans de grands hôtels." },
    { title: "BTM Chocolatier-confiseur", text: "En cours, en parallèle de Sesia Pâtisserie." },
  ],
};

/* -------------------------------------------------------------------------- */
/* Commander                                                                  */
/* -------------------------------------------------------------------------- */

export const orderPage = {
  eyebrow: "Commander",
  title: "Formulaire de commande",
  intro:
    "Décrivez-nous votre projet : nous revenons vers vous avec un devis personnalisé, adapté à vos envies et à votre événement.",
  steps: [
    { title: "Votre demande", text: "Choisissez votre création, le parfum et le nombre de personnes." },
    { title: "Votre devis", text: "Nous vous recontactons avec un devis personnalisé." },
    { title: "Votre création", text: "Votre pâtisserie est réalisée à la main, rien que pour vous." },
  ],
  products: [
    { value: "Number cake", flavors: numberCakes.flavors.map((f) => f.name) },
    { value: "Gâteau / tarte / pavlova", flavors: cakes.flavors.map((f) => f.name) },
    { value: "Mignardises", flavors: ["Assortiment au choix", ...mignardises.flavors.map((f) => f.name)] },
    { value: "Autre demande", flavors: [] },
  ],
};

export const legal = {
  publisher: "Sesia Pâtisserie",
  hostingNote:
    "Site hébergé par Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis.",
};
