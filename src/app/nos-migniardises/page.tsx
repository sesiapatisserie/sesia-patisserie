import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { mignardises } from "@/content/site";

export const metadata: Metadata = {
  title: mignardises.seo.title,
  description: mignardises.seo.description,
  alternates: { canonical: mignardises.href },
  openGraph: { title: `${mignardises.seo.title} | Sesia Pâtisserie`, description: mignardises.seo.description, url: mignardises.href, images: [mignardises.cover.src] },
};

export default function MignardisesPage() {
  return <CategoryPage category={mignardises} />;
}
