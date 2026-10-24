"use client";

import React, { useState } from "react";
import { MarketplaceProduct } from "@/data/marketplace";
import {
  saveMarketplaceProductAction,
  deleteMarketplaceProductAction,
} from "@/app/admin/actions";
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
  Sparkles,
} from "lucide-react";

interface MarketplaceManagerProps {
  initialProducts: MarketplaceProduct[];
}

export function MarketplaceManager({ initialProducts }: MarketplaceManagerProps) {
  const [products, setProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<MarketplaceProduct | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState<Partial<MarketplaceProduct>>({});

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const openCreateModal = () => {
    setFormData({
      id: "product-" + Date.now(),
      slug: "",
      title: "",
      category: "saas",
      categoryLabel: { es: "SaaS & App", en: "SaaS & App" },
      tag: { es: "✨ Nuevo", en: "✨ New" },
      price: "$149",
      originalPrice: "$249",
      rating: "5.0",
      salesCount: 1,
      shortDesc: { es: "", en: "" },
      fullDesc: { es: "", en: "" },
      architecture: {
        frontend: "Next.js 16 (App Router) + React 19",
        backend: "Server Actions & Vercel Postgres",
        database: "PostgreSQL con Drizzle ORM",
        styling: "Tailwind CSS v4",
        auth: "Cookie Session / NextAuth",
        deployment: "Optimizado para Vercel",
      },
      features: {
        es: ["Código 100% limpio y modular", "Licencia comercial perpetua"],
        en: ["100% clean and modular code", "Perpetual commercial license"],
      },
      includedFiles: {
        es: ["Código fuente completo Next.js 16", "Esquemas de Base de Datos"],
        en: ["Full Next.js 16 source code", "Database Schemas"],
      },
      stack: ["Next.js 16", "React 19", "Tailwind CSS", "Postgres"],
      demoUrl: "https://stellaris-dev.vercel.app",
      accent: "#FF532A",
      faqs: [],
    });
    setIsCreating(true);
    setEditingProduct(null);
  };

  const openEditModal = (product: MarketplaceProduct) => {
    setFormData({ ...product });
    setEditingProduct(product);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.price) return;

    setLoading(true);
    setMessage(null);

    try {
      const saved = await saveMarketplaceProductAction(formData as MarketplaceProduct);
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === saved.id ? saved : p))
        );
      } else {
        setProducts((prev) => [saved, ...prev]);
      }
      setIsCreating(false);
      setEditingProduct(null);
      setMessage({ text: "Solución guardada exitosamente.", type: "success" });
    } catch (err: any) {
      setMessage({ text: err?.message || "Error al guardar el producto.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar de marketplace "${title}"?`)) return;

    setLoading(true);
    try {
      await deleteMarketplaceProductAction(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage({ text: "Producto eliminado.", type: "success" });
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
            Administra las plantillas de software y productos listos para la venta en <code className="text-[#FF532A]">/marketplace</code>.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FF532A] hover:bg-[#e0451e] text-white transition-all shadow-lg shadow-[#FF532A]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Nueva Solución
        </button>
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
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{p.title}</div>
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
                      <button
                        onClick={() => openEditModal(p)}
                        title="Editar"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        title="Eliminar"
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Editor */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#171719] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF532A]" />
                {isCreating ? "Crear Producto Marketplace" : `Editar: ${editingProduct?.title}`}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Título del Producto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                    placeholder="Ej. SaaS Starter Pro"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Slug (URL limpia) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A] font-mono"
                    placeholder="ej. saas-starter-pro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Precio ($) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price || "$189"}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Precio Anterior
                  </label>
                  <input
                    type="text"
                    value={formData.originalPrice || ""}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.category || "saas"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                        categoryLabel: {
                          es: e.target.value.toUpperCase(),
                          en: e.target.value.toUpperCase(),
                        },
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  >
                    <option value="saas">SaaS</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="agencies">Agencias</option>
                    <option value="landing">Landing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Etiqueta / Badge
                  </label>
                  <input
                    type="text"
                    value={formData.tag?.es || "🔥 Más Vendido"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tag: { es: e.target.value, en: e.target.value },
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Descripción Corta (para el Card)
                </label>
                <input
                  type="text"
                  value={formData.shortDesc?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDesc: { es: e.target.value, en: e.target.value },
                    })
                  }
                  className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Descripción Completa (para la página de detalle)
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDesc?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDesc: { es: e.target.value, en: e.target.value },
                    })
                  }
                  className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#FF532A]"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#FF532A] hover:bg-[#e0451e] text-white shadow-lg shadow-[#FF532A]/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {loading && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  Guardar Solución
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
