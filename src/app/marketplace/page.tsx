import React from "react";
import type { Metadata } from "next";
import { getAllMarketplaceProducts } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MarketplaceCatalog } from "@/components/sections/MarketplaceCatalog";

export const metadata: Metadata = {
  title: "Marketplace de Plantillas & Sistemas Web",
  description:
    "Compra código fuente profesional listo para producción con Next.js, React y PostgreSQL. Plantillas modernas y optimizadas para conversión.",
  alternates: {
    canonical: "/marketplace",
  },
};

export default async function MarketplaceListPage() {
  const products = await getAllMarketplaceProducts();

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#E6FF2A] selection:text-[#0C4651]">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        <MarketplaceCatalog initialProducts={products} />
      </main>

      <Footer />
    </div>
  );
}
