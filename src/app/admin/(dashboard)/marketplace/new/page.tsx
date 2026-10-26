import React from "react";
import { MarketplaceForm } from "@/components/admin/MarketplaceForm";

export const metadata = {
  title: "Nueva Solución Marketplace | Admin Kano Dev",
};

export default function NewMarketplaceProductPage() {
  return <MarketplaceForm isNew={true} />;
}
