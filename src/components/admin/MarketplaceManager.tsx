"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketplaceProduct, getMarketplaceTitle } from "@/data/marketplace";
import { deleteMarketplaceProductAction } from "@/app/admin/actions";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Check,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

interface MarketplaceManagerProps {
  initialProducts: MarketplaceProduct[];
}

export function MarketplaceManager({ initialProducts }: MarketplaceManagerProps) {
  const [products, setProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    const titleEn = getMarketplaceTitle(p.title, "en").toLowerCase();
    const titleEs = getMarketplaceTitle(p.title, "es").toLowerCase();
    return (
      titleEn.includes(q) ||
      titleEs.includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar de marketplace "${title}"?`)) return;

    setLoading(true);
    try {
      await deleteMarketplaceProductAction(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage({ text: `Solución "${title}" eliminada.`, type: "success" });
    } catch (err: any) {
      setMessage({ text: "Error al eliminar producto.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-[#FF532A]" />
            Catálogo Marketplace
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Administra las plantillas de software y productos listos para la venta en{" "}
            <code className="text-[#FF532A]">/marketplace</code>.
          </p>
        </div>

        <Link
          href="/admin/marketplace/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FF532A] hover:bg-[#e0451e] text-white transition-all shadow-lg shadow-[#FF532A]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Nueva Solución
        </Link>
      </div>

      {/* Feedback Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, categoría o slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#171719] border border-white/10 focus:border-[#FF532A] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none placeholder:text-neutral-500"
          />
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          {filteredProducts.length} productos
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#171719] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202024] border-b border-white/10 text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-3.5">Producto</th>
                <th className="px-6 py-3.5">Precio</th>
                <th className="px-6 py-3.5">Categoría</th>
                <th className="px-6 py-3.5">Calificación</th>
                <th className="px-6 py-3.5">Ventas</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => {
                const titleDisplay = getMarketplaceTitle(p.title, "es");
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{titleDisplay}</div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        /marketplace/{p.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-white text-sm">{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-neutral-500 line-through text-[11px] ml-1.5 font-mono">
                          {p.originalPrice}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-neutral-300">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-amber-400 font-medium">★ {p.rating}</td>
                    <td className="px-6 py-4 text-neutral-300 font-mono">{p.salesCount}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/marketplace/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Ver en tienda"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/admin/marketplace/${p.id}/edit`}
                          title="Editar en página completa"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, titleDisplay)}
                          disabled={loading}
                          title="Eliminar"
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
