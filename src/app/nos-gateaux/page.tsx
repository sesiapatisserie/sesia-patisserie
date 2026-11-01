import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { cakes } from "@/content/site";

export const metadata: Metadata = {
  title: cakes.seo.title,
  description: cakes.seo.description,
  alternates: { canonical: cakes.href },
  openGraph: { title: `${cakes.seo.title} | Sesia Pâtisserie`, description: cakes.seo.description, url: cakes.href, images: [cakes.cover.src] },
};

export default function CakesPage() {
  return <CategoryPage category={cakes} />;
}
