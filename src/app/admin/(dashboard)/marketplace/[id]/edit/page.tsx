import React from "react";
import { notFound } from "next/navigation";
import { getAllMarketplaceProducts } from "@/db/service";
import { MarketplaceForm } from "@/components/admin/MarketplaceForm";

export const metadata = {
  title: "Editar Solución | Admin Kano Dev",
};

export default async function EditMarketplacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getAllMarketplaceProducts();
  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  return <MarketplaceForm initialData={product} isNew={false} />;
}
