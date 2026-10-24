import React from "react";
import { notFound } from "next/navigation";
import { MARKETPLACE_PRODUCTS } from "@/data/marketplace";
import { getMarketplaceProductBySlug, getAllMarketplaceProducts } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MarketplaceDetailView } from "@/components/sections/MarketplaceDetailView";

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
