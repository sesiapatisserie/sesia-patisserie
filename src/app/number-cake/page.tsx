import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { numberCakes } from "@/content/site";

export const metadata: Metadata = {
  title: numberCakes.seo.title,
  description: numberCakes.seo.description,
  alternates: { canonical: numberCakes.href },
  openGraph: { title: `${numberCakes.seo.title} | Sesia Pâtisserie`, description: numberCakes.seo.description, url: numberCakes.href, images: [numberCakes.cover.src] },
};

export default function NumberCakesPage() {
  return <CategoryPage category={numberCakes} />;
}
