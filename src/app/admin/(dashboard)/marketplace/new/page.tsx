import React from "react";
import { MarketplaceForm } from "@/components/admin/MarketplaceForm";

export const metadata = {
  title: "Nueva Solución Marketplace | Admin Stellaris",
};

export default function NewMarketplaceProductPage() {
  return <MarketplaceForm isNew={true} />;
}
