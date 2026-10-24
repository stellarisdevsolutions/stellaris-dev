"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MarketplaceProduct, getMarketplaceTitle } from "@/data/marketplace";

interface MarketplaceCatalogProps {
  initialProducts: MarketplaceProduct[];
}

export function MarketplaceCatalog({ initialProducts }: MarketplaceCatalogProps) {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filterTabs = [
    { id: "all", label: lang === "es" ? "Todas" : "All" },
    { id: "negocios", label: lang === "es" ? "Negocios & SaaS" : "Business & SaaS" },
    { id: "tiendas", label: lang === "es" ? "Tiendas Online" : "Online Stores" },
    { id: "portafolios", label: lang === "es" ? "Agencias & Portafolios" : "Agencies & Portfolios" },
  ];

  const cardPresets: Record<string, { blockColor: string; pillColor: string }> = {
    "saas-starter-pro": { blockColor: "bg-[#FF532A]", pillColor: "bg-[#FF532A]" },
    "omnistore-ecommerce": { blockColor: "bg-[#171717]", pillColor: "bg-[#171717]" },
    "nova-agency-template": { blockColor: "bg-[#737373]", pillColor: "bg-[#737373]" },
    "leadmagnet-funnel": { blockColor: "bg-[#FF532A]", pillColor: "bg-[#FF532A]" },
  };

  const filteredProducts = initialProducts.filter((product) => {
    let matchesCategory = true;
    if (selectedFilter === "negocios") matchesCategory = product.category === "saas" || product.category === "landing";
    if (selectedFilter === "tiendas") matchesCategory = product.category === "ecommerce";
    if (selectedFilter === "portafolios") matchesCategory = product.category === "agencies";

    const q = searchQuery.toLowerCase();
    const titleEn = getMarketplaceTitle(product.title, "en").toLowerCase();
    const titleEs = getMarketplaceTitle(product.title, "es").toLowerCase();

    const matchesSearch =
      titleEn.includes(q) ||
      titleEs.includes(q) ||
      (product.shortDesc?.es && product.shortDesc.es.toLowerCase().includes(q)) ||
      (product.shortDesc?.en && product.shortDesc.en.toLowerCase().includes(q)) ||
      product.stack?.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
      {/* Breadcrumb / Regresar al Inicio */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#FF532A] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Header Principal con título y párrafo al lado derecho */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-neutral-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF532A]" />
            <span>CATÁLOGO DE PLANTILLAS & SISTEMAS</span>
          </div>
          <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.08] m-0">
            Marketplace de{" "}
            <span className="inline-block relative text-white bg-[#FF532A] px-3.5 sm:px-5 py-0.5 rounded-xl shadow-sm shadow-[#FF532A]/25 -rotate-1 mx-1">
              Sistemas Web
            </span>
          </h1>
        </div>

        {/* Párrafo al lado derecho aprovechando el espacio */}
        <p className="m-0 text-sm sm:text-base text-neutral-600 max-w-[460px] leading-relaxed">
          {lang === "es"
            ? "Sitios y aplicaciones web listos para personalizar y lanzar. Elige tu solución, adquiere el código con licencia comercial y ahorra semanas de desarrollo."
            : "Production-ready templates and boilerplates. Buy the source code with commercial rights and deploy in hours."}
        </p>
      </div>

      {/* MISMA FILA: BOTONES DE FILTRO + BUSCADOR TIPO PILL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        {/* Botones de Filtro */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              type="button"
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[#171717] text-white shadow-md shadow-neutral-900/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Buscador Tipo Pill */}
        <div className="w-full md:w-[380px] lg:w-[420px] flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm shadow-neutral-100 focus-within:border-[#FF532A] focus-within:shadow-md transition-all shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "es"
                ? "Buscar plantilla, tecnología o nicho..."
                : "Search template, stack or niche..."
            }
            className="flex-1 bg-transparent border-0 px-4 py-2 text-xs sm:text-sm text-[#171717] placeholder-neutral-400 outline-none"
          />
          <button
            type="button"
            className="px-5 py-2.5 bg-[#FF532A] hover:bg-[#e0451e] text-white text-xs sm:text-sm font-semibold rounded-full transition-all shrink-0 shadow-sm shadow-[#FF532A]/25 cursor-pointer"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Grid de Productos / Soluciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10">
        {filteredProducts.map((product) => {
          const preset = cardPresets[product.slug] || {
            blockColor: "bg-[#FF532A]",
            pillColor: "bg-[#FF532A]",
          };

          return (
            <div
              key={product.id}
              className="flex flex-col rounded-[32px] border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 group justify-between"
            >
              <div>
                {/* Visual Preview / Wireframe Frame */}
                <div
                  className={`w-full aspect-[16/10] rounded-[22px] border border-neutral-200 bg-neutral-900 mb-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:scale-[1.01] ${
                    product.image?.startsWith("http") || product.image?.startsWith("/")
                      ? "bg-cover bg-center"
                      : ""
                  }`}
                  style={
                    product.image?.startsWith("http") || product.image?.startsWith("/")
                      ? { backgroundImage: `url(${product.image})` }
                      : {}
                  }
                >
                  {/* Browser top controls */}
                  <div className="w-full flex items-center justify-between p-3.5 bg-black/40 backdrop-blur-xs border-b border-white/10 z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF532A]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                    </div>
                    <span className="text-[10px] text-neutral-300 font-mono">
                      stellaris.dev/templates/{product.slug}
                    </span>
                  </div>

                  {/* Fallback wireframe when no image */}
                  {(!product.image || (!product.image.startsWith("http") && !product.image.startsWith("/"))) && (
                    <div className="flex-1 my-3 flex flex-col justify-center gap-2 px-4 z-10">
                      <div className="h-6 w-1/3 bg-neutral-800 rounded-lg animate-pulse" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className={`h-16 rounded-xl ${preset.blockColor} opacity-90`} />
                        <div className="h-16 rounded-xl bg-neutral-800" />
                        <div className="h-16 rounded-xl bg-neutral-800/60" />
                      </div>
                      <div className="h-3 w-4/5 bg-neutral-800 rounded-md mt-1" />
                    </div>
                  )}

                  {/* Bottom details bar */}
                  <div className="w-full flex items-center justify-between text-xs text-neutral-300 p-3 bg-black/40 backdrop-blur-xs border-t border-white/10 z-10">
                    <span className="flex items-center gap-1 font-semibold text-white">
                      ⭐ {product.rating || "4.9"} ({product.salesCount || 0} {lang === "es" ? "ventas" : "sales"})
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      Next.js 16 • React 19
                    </span>
                  </div>
                </div>

                {/* Product Title and Price */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    {product.tag && (
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#FF532A] mb-1">
                        {product.tag?.[lang as "es" | "en"] || product.tag?.es}
                      </span>
                    )}
                    <h3 className="font-bold text-xl sm:text-2xl text-[#171717] group-hover:text-[#FF532A] transition-colors leading-tight">
                      {getMarketplaceTitle(product.title, lang)}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                      {product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-neutral-400 line-through font-mono">
                        {product.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {product.shortDesc?.[lang as "es" | "en"] || product.shortDesc?.es}
                </p>

                {/* Architecture Bullets (if exists) */}
                {product.architecture && (
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 mb-6 space-y-1.5 text-xs text-neutral-600">
                    {product.architecture.frontend && (
                      <div>
                        <span className="font-semibold text-neutral-900">Frontend: </span>
                        {product.architecture.frontend}
                      </div>
                    )}
                    {product.architecture.backend && (
                      <div>
                        <span className="font-semibold text-neutral-900">Backend: </span>
                        {product.architecture.backend}
                      </div>
                    )}
                    {product.architecture.database && (
                      <div>
                        <span className="font-semibold text-neutral-900">
                          {lang === "es" ? "Base de Datos: " : "Database: "}
                        </span>
                        {product.architecture.database}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <Link
                  href={`/marketplace/${product.slug}`}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#171717] hover:bg-[#FF532A] text-white text-xs sm:text-sm font-semibold text-center transition-all shadow-md group-hover:shadow-lg flex items-center justify-center gap-1.5"
                >
                  <span>{lang === "es" ? "Ver Detalles & Comprar" : "View Details & Buy"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200 mt-6">
          <p className="text-neutral-500 text-sm">
            No se encontraron plantillas para los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
}
