"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  // Mapa de etiquetas bilingües para categorías
  const categoryLabels: Record<string, { es: string; en: string }> = {
    saas: { es: "SaaS & Dashboard", en: "SaaS & Dashboard" },
    ecommerce: { es: "Tienda Online", en: "Online Store" },
    "custom-systems": { es: "Sistemas a Medida", en: "Custom Systems" },
    cms: { es: "CMS", en: "CMS" },
    agencies: { es: "Agencias & Portafolios", en: "Agencies & Portfolios" },
    landing: { es: "Landing Pages", en: "Landing Pages" },
  };

  // Conjunto de categorías que realmente tienen productos registrados
  const existingCategoryIds = new Set(initialProducts.map((p) => p.category));

  // Generar pestañas dinámicas solo para categorías que tienen productos
  const dynamicFilterTabs: { id: string; label: string }[] = [
    { id: "all", label: lang === "es" ? "Todas" : "All" },
  ];

  Object.entries(categoryLabels).forEach(([id, labels]) => {
    if (existingCategoryIds.has(id)) {
      dynamicFilterTabs.push({
        id,
        label: labels[lang] || labels.es,
      });
    }
  });

  existingCategoryIds.forEach((id) => {
    if (!categoryLabels[id] && id) {
      dynamicFilterTabs.push({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      });
    }
  });

  // Preset mockup colors matching the cards
  const cardPresets: Record<string, { blockColor: string; pillColor: string }> = {
    "saas-starter-pro": { blockColor: "bg-[#E6FF2A]", pillColor: "bg-[#E6FF2A]" },
    "omnistore-ecommerce": { blockColor: "bg-[#0C4651]", pillColor: "bg-[#0C4651]" },
    "nova-agency-template": { blockColor: "bg-[#145C6A]", pillColor: "bg-[#145C6A]" },
  };

  // Filtrado de productos por categoría y búsqueda
  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedFilter === "all" || product.category === selectedFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const titleEn = getMarketplaceTitle(product.title, "en").toLowerCase();
    const titleEs = getMarketplaceTitle(product.title, "es").toLowerCase();

    const specsMatch = (product.specs || []).some(
      (s) =>
        s.title?.es?.toLowerCase().includes(q) ||
        s.title?.en?.toLowerCase().includes(q) ||
        s.detail?.es?.toLowerCase().includes(q) ||
        s.detail?.en?.toLowerCase().includes(q)
    );

    const matchesSearch =
      titleEn.includes(q) ||
      titleEs.includes(q) ||
      (product.shortDesc?.es && product.shortDesc.es.toLowerCase().includes(q)) ||
      (product.shortDesc?.en && product.shortDesc.en.toLowerCase().includes(q)) ||
      product.stack?.some((s) => s.toLowerCase().includes(q)) ||
      specsMatch;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8">
      {/* Breadcrumb / Regresar al Inicio */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#0C4651] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{lang === "es" ? "Volver al inicio" : "Back to home"}</span>
        </Link>
      </div>

      {/* Header Principal con título y párrafo al lado derecho */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-neutral-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-[#0C4651] mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C4651]" />
            <span>{lang === "es" ? "CATÁLOGO DE PLANTILLAS & SISTEMAS" : "TEMPLATES & SYSTEMS CATALOG"}</span>
          </div>
          <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0C4651] leading-[1.08] m-0">
            {lang === "es" ? "Marketplace de " : "Marketplace of "}
            <span className="inline-block relative text-[#0C4651] bg-[#E6FF2A] px-3.5 sm:px-5 py-0.5 rounded-xl shadow-sm shadow-[#E6FF2A]/30 -rotate-1 mx-1 border border-[#0C4651]/20">
              {lang === "es" ? "Sistemas Web" : "Web Systems"}
            </span>
          </h1>
        </div>

        {/* Párrafo al lado derecho */}
        <p className="m-0 text-sm sm:text-base text-neutral-600 max-w-[460px] leading-relaxed">
          {lang === "es"
            ? "Sitios y aplicaciones web listos para personalizar y lanzar. Elige tu solución, adquiere el código con licencia comercial y ahorra semanas de desarrollo."
            : "Production-ready templates and boilerplates. Buy the source code with commercial rights and deploy in hours."}
        </p>
      </div>

      {/* MISMA FILA: BOTONES DE FILTRO + BUSCADOR TIPO PILL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        {/* Botones de Filtro (Solo categorías que contienen productos) */}
        <div className="flex flex-wrap items-center gap-2">
          {dynamicFilterTabs.map((tab) => {
            const active = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                type="button"
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-[#0C4651] text-[#E6FF2A] shadow-md shadow-[#0C4651]/20 font-bold"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Buscador Tipo Pill */}
        <div className="w-full md:w-[380px] lg:w-[420px] flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm shadow-neutral-100 focus-within:border-[#0C4651] focus-within:shadow-md transition-all shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "es"
                ? "Buscar plantilla o tecnología..."
                : "Search template or tech..."
            }
            className="flex-1 bg-transparent border-0 px-4 py-2 text-xs sm:text-sm text-[#0C4651] placeholder-neutral-400 outline-none"
          />
          <button
            type="button"
            className="px-5 py-2.5 bg-[#0C4651] hover:bg-[#145C6A] text-[#E6FF2A] text-xs sm:text-sm font-bold rounded-full transition-all shrink-0 shadow-sm shadow-[#0C4651]/20 cursor-pointer"
          >
            {lang === "es" ? "Buscar" : "Search"}
          </button>
        </div>
      </div>

      {/* Grid de Productos - Modo Claro (3 columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const preset = cardPresets[product.slug] || {
            blockColor: "bg-[#0C4651]",
            pillColor: "bg-[#E6FF2A]",
          };

          const catLabel =
            typeof product.categoryLabel === "object"
              ? product.categoryLabel[lang] || product.categoryLabel.es || product.categoryLabel.en || product.category
              : categoryLabels[product.category]?.[lang] || categoryLabels[product.category]?.es || product.category;

          return (
            <div
              key={product.id}
              className="group rounded-[28px] bg-white border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xl transition-all duration-300 shadow-xs"
            >
              <div>
                {/* Mockup o Imagen Real Limpia */}
                <Link
                  href={`/marketplace/${product.slug}`}
                  className="block rounded-2xl bg-neutral-100 border border-neutral-200/80 overflow-hidden mb-5 cursor-pointer group-hover:border-neutral-300 transition-colors shadow-2xs"
                >
                  {product.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={product.image}
                        alt={getMarketplaceTitle(product.title, lang)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="p-4 sm:p-5 bg-[#0C4651] text-white">
                      {/* 3 Window Top Dots (1 lime, 2 teal) */}
                      <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E6FF2A]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#145C6A]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#145C6A]" />
                      </div>

                      {/* Window UI Layout (Left Bars + Right Solid Block) */}
                      <div className="grid grid-cols-12 gap-3 items-center min-h-[110px]">
                        {/* Left: Wireframe Bars */}
                        <div className="col-span-7 flex flex-col justify-center">
                          <div className="w-[90%] h-3.5 bg-white rounded-full mb-2" />
                          <div className="w-[70%] h-2 bg-[#145C6A] rounded-full mb-3" />
                          <div className={`w-20 h-5 rounded-full ${preset.pillColor} opacity-90`} />
                        </div>

                        {/* Right: Solid Square Block */}
                        <div className="col-span-5 flex justify-end">
                          <div className={`w-20 sm:w-22 h-20 sm:h-22 rounded-2xl ${preset.blockColor} shadow-md`} />
                        </div>
                      </div>

                      {/* Full-width bottom bar */}
                      <div className="w-full h-4 rounded-lg bg-[#08343D] mt-4" />
                    </div>
                  )}
                </Link>

                {/* Title & Category with Short Description */}
                <div className="mb-6 flex flex-col">
                  {/* Etiqueta de Categoría - Tipográfica y limpia (NO cápsula) */}
                  <span className="text-xs font-semibold text-[#0C4651] uppercase tracking-wider mb-1.5">
                    {catLabel}
                  </span>

                  {/* Título - Máximo 2 filas */}
                  <Link href={`/marketplace/${product.slug}`}>
                    <h3 className="hd text-xl sm:text-2xl font-bold text-[#0C4651] tracking-tight mb-2 group-hover:text-[#145C6A] transition-colors line-clamp-2 leading-snug m-0">
                      {getMarketplaceTitle(product.title, lang)}
                    </h3>
                  </Link>

                  {/* Descripción corta - Máximo 2 filas */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2 m-0">
                    {product.shortDesc ? product.shortDesc[lang] || product.shortDesc.es : ""}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Price + Single Action Button */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                {/* Price */}
                <div className="hd text-2xl sm:text-[26px] font-extrabold text-[#0C4651]">
                  {product.price}
                </div>

                {/* Single Action Button: Ver detalle */}
                <Link
                  href={`/marketplace/${product.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0C4651] hover:bg-[#145C6A] text-[#E6FF2A] text-xs sm:text-[13px] font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap group/btn"
                >
                  <span>{lang === "es" ? "Ver detalle" : "View details"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200 mt-6">
          <p className="text-neutral-500 text-sm">
            {lang === "es"
              ? "No se encontraron plantillas para los filtros seleccionados."
              : "No templates found for the selected filters."}
          </p>
        </div>
      )}
    </div>
  );
}
