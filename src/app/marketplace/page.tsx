import React from "react";
import { getAllMarketplaceProducts } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MarketplaceCatalog } from "@/components/sections/MarketplaceCatalog";

export const metadata = {
  title: "Marketplace de Plantillas & Sistemas Web | Stellaris Dev",
  description: "Compra código fuente listo para producción con Next.js 16, React 19 y PostgreSQL.",
};

export default async function MarketplaceListPage() {
  const products = await getAllMarketplaceProducts();

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        <MarketplaceCatalog initialProducts={products} />
      </main>

      <Footer />
    </div>
  );
}
