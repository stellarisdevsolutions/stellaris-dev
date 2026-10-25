import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARKETPLACE_PRODUCTS } from "@/data/marketplace";
import { getMarketplaceProductBySlug, getAllMarketplaceProducts } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MarketplaceDetailView } from "@/components/sections/MarketplaceDetailView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getMarketplaceProductBySlug(slug);

  if (!product) {
    return {
      title: "Plantilla no encontrada",
    };
  }

  const rawTitle =
    typeof product.title === "string"
      ? product.title
      : product.title?.es || product.title?.en || "Plantilla";
  const title = `${rawTitle} | Plantilla & Código Fuente`;
  const rawDesc =
    typeof product.shortDesc === "object"
      ? product.shortDesc?.es || product.shortDesc?.en
      : "";
  const description =
    rawDesc ||
    `Adquiere la plantilla web profesional de ${rawTitle} desarrollada con Next.js, React y PostgreSQL lista para producción.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/marketplace/${product.slug}`,
    },
    openGraph: {
      title: `${title} | Stellaris Dev`,
      description,
      url: `https://tiendastellaris.com/marketplace/${product.slug}`,
      images: product.image ? [{ url: product.image, alt: rawTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Stellaris Dev`,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const allProds = await getAllMarketplaceProducts();
  const prods = allProds && allProds.length > 0 ? allProds : MARKETPLACE_PRODUCTS;
  return prods.map((prod) => ({
    slug: prod.slug,
  }));
}

export default async function MarketplaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getMarketplaceProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllMarketplaceProducts();
  const pool = allProducts && allProducts.length > 0 ? allProducts : MARKETPLACE_PRODUCTS;
  const relatedProducts = pool.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <MarketplaceDetailView
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>

      <Footer />
    </div>
  );
}
