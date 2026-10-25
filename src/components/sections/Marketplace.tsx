"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MARKETPLACE_PRODUCTS, MarketplaceProduct, getMarketplaceTitle } from "@/data/marketplace";

export function Marketplace({ items = MARKETPLACE_PRODUCTS }: { items?: MarketplaceProduct[] }) {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const productsList = items || MARKETPLACE_PRODUCTS;

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
  const existingCategoryIds = new Set(productsList.map((p) => p.category));

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

  // Filtrar productos por la categoría seleccionada
  const filteredProducts = productsList.filter((product) => {
    if (selectedFilter === "all") return true;
    return product.category === selectedFilter;
  });

  // Mostrar un máximo de 6 productos (2 filas en cuadrícula de 3 columnas)
  const displayedProducts = filteredProducts.slice(0, 6);

  // Verificar si hay más productos para mostrar el botón de ver más
  const hasMoreProducts = filteredProducts.length > 6 || productsList.length > 6;


  // Preset mockup colors matching the cards
  const cardPresets: Record<string, { blockColor: string; pillColor: string }> = {
    "saas-starter-pro": { blockColor: "bg-[#FF532A]", pillColor: "bg-[#FF532A]" },
    "omnistore-ecommerce": { blockColor: "bg-white", pillColor: "bg-white" },
    "nova-agency-template": { blockColor: "bg-[#737373]", pillColor: "bg-[#737373]" },
    "leadmagnet-funnel": { blockColor: "bg-[#FF532A]", pillColor: "bg-[#FF532A]" },
  };

  return (
    <section
      id="marketplace"
      className="w-full bg-[#141416] text-white py-20 sm:py-28 relative overflow-hidden"
    >
      {/* Resplandor cálido en la esquina superior derecha */}
      <div
        className="absolute -top-8 -right-8 sm:-top-16 sm:-right-16 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-[#FF532A]/25 sm:bg-[#FF532A]/35 rounded-full blur-[45px] sm:blur-[65px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Heading Centrado */}
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto mb-10 sm:mb-12">
          <h2 className="hd text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12] m-0">
            {lang === "es" ? "Marketplace de " : "Marketplace of "}
            <span className="text-[#FF532A]">
              {lang === "es" ? "Sistemas & Plantillas Web" : "Systems & Web Templates"}
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-[620px]">
            {lang === "es"
              ? "Sitios listos para personalizar y lanzar. Elige una solución, cómprala en línea y empieza a usarla hoy mismo."
              : "Production-ready sites to customize and launch. Choose a template, buy online, and deploy today."}
          </p>
        </div>

        {/* Filter Pills Flex-Wrap Centradas (Solo categorías que contienen productos) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14 w-full">
          {dynamicFilterTabs.map((tab) => {
            const active = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                type="button"
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-[#FF532A] text-white shadow-md shadow-[#FF532A]/25"
                    : "bg-[#202024] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Product Cards Grid (Máximo 2 filas / 6 productos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {displayedProducts.map((product) => {
            const preset = cardPresets[product.id] || {
              blockColor: "bg-[#FF532A]",
              pillColor: "bg-[#FF532A]",
            };

            const catLabel =
              typeof product.categoryLabel === "object"
                ? product.categoryLabel[lang] || product.categoryLabel.es || product.categoryLabel.en || product.category
                : categoryLabels[product.category]?.[lang] || categoryLabels[product.category]?.es || product.category;

            return (
              <div
                key={product.id}
                className="group rounded-[28px] bg-[#202024] border border-neutral-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Browser Window Mockup o Imagen Real limpia */}
                  <Link
                    href={`/marketplace/${product.slug}`}
                    className="block rounded-2xl bg-[#171717] border border-neutral-800/90 overflow-hidden mb-5 cursor-pointer group-hover:border-neutral-700 transition-colors"
                  >
                    {product.image ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                        <img
                          src={product.image}
                          alt={getMarketplaceTitle(product.title, lang)}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="p-4 sm:p-5">
                        {/* 3 Window Top Dots (1 orange, 2 grey) */}
                        <div className="flex items-center gap-1.5 mb-4">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF532A]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                        </div>

                        {/* Window UI Layout (Left Bars + Right Solid Block) */}
                        <div className="grid grid-cols-12 gap-3 items-center min-h-[110px]">
                          {/* Left: Wireframe Bars */}
                          <div className="col-span-7 flex flex-col justify-center">
                            <div className="w-[90%] h-3.5 bg-white rounded-full mb-2" />
                            <div className="w-[70%] h-2 bg-neutral-600 rounded-full mb-3" />
                            <div className={`w-20 h-5 rounded-full ${preset.pillColor} opacity-90`} />
                          </div>

                          {/* Right: Solid Square Block */}
                          <div className="col-span-5 flex justify-end">
                            <div className={`w-20 sm:w-22 h-20 sm:h-22 rounded-2xl ${preset.blockColor} shadow-md`} />
                          </div>
                        </div>

                        {/* Full-width bottom bar */}
                        <div className="w-full h-4 rounded-lg bg-neutral-800/90 mt-4" />
                      </div>
                    )}
                  </Link>

                  {/* Title & Category with Short Description */}
                  <div className="mb-6 flex flex-col">
                    {/* Etiqueta de Categoría - Tipográfica y limpia */}
                    <span className="text-xs font-semibold text-[#FF532A] uppercase tracking-wider mb-1.5">
                      {catLabel}
                    </span>

                    {/* Título - Máximo 2 filas */}
                    <Link href={`/marketplace/${product.slug}`}>
                      <h3 className="hd text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#FF532A] transition-colors line-clamp-2 leading-snug m-0">
                        {getMarketplaceTitle(product.title, lang)}
                      </h3>
                    </Link>

                    {/* Descripción corta - Máximo 2 filas */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2 m-0">
                      {product.shortDesc ? product.shortDesc[lang] || product.shortDesc.es : ""}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Price + Single Action Button */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  {/* Price */}
                  <div className="hd text-2xl sm:text-[26px] font-extrabold text-white">
                    {product.price}
                  </div>

                  {/* Single Action Button: Ver detalle */}
                  <Link
                    href={`/marketplace/${product.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-[#FF532A] text-[#171717] hover:text-white text-xs sm:text-[13px] font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap group/btn"
                  >
                    <span>{lang === "es" ? "Ver detalle" : "View details"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Ver más productos si hay más de 6 */}
        {hasMoreProducts && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-[#FF532A] hover:bg-[#E5451D] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#FF532A]/25 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>
                {lang === "es" ? "Ver más productos" : "View All Products"}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
