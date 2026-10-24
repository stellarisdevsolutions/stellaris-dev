import React from "react";
import { getAllMarketplaceProducts } from "@/db/service";
import { MarketplaceManager } from "@/components/admin/MarketplaceManager";

export const metadata = {
  title: "Gestión Marketplace | Admin Stellaris",
};

export default async function AdminMarketplacePage() {
  const products = await getAllMarketplaceProducts();

  return <MarketplaceManager initialProducts={products} />;
}
