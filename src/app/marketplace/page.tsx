"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MARKETPLACE_PRODUCTS } from "@/data/marketplace";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function MarketplaceListPage() {
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

  const filteredProducts = MARKETPLACE_PRODUCTS.filter((product) => {
    let matchesCategory = true;
    if (selectedFilter === "negocios") matchesCategory = product.category === "saas" || product.category === "landing";
    if (selectedFilter === "tiendas") matchesCategory = product.category === "ecommerce";
    if (selectedFilter === "portafolios") matchesCategory = product.category === "agencies";

    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 relative overflow-hidden">
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

          {/* ══════════════════════════════════════════════════════════════════
              MISMA FILA: BOTONES DE FILTRO + BUSCADOR TIPO PILL
              ══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            {/* Botones de Filtro (Todas, Negocios, etc.) */}
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

            {/* Buscador Tipo Pill Exacto a la Imagen */}
            <div className="w-full md:w-[380px] lg:w-[420px] flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm shadow-neutral-100 focus-within:border-[#FF532A] focus-within:shadow-md transition-all shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "es" ? "Buscar plantillas..." : "Search templates..."}
                className="flex-1 px-4 py-1.5 text-xs sm:text-sm text-[#171717] placeholder-neutral-400 bg-transparent outline-hidden"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm shadow-[#FF532A]/25 transition-all cursor-pointer hover:scale-102 active:scale-95 shrink-0"
              >
                <span>{lang === "es" ? "Buscar" : "Search"}</span>
              </button>
            </div>
          </div>

          {/* Grid de Plantillas / Sistemas en Cards Claras */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
              <p className="text-neutral-500 text-sm sm:text-base m-0">
                No se encontraron plantillas para esta búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
              {filteredProducts.map((product) => {
                const preset = cardPresets[product.slug] || {
                  blockColor: "bg-[#FF532A]",
                  pillColor: "bg-[#FF532A]",
                };

                return (
                  <div
                    key={product.id}
                    className="rounded-[28px] bg-white border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-[#FF532A]/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
                  >
                    {/* Browser Window UI Preview optimizado */}
                    <div className="rounded-2xl bg-[#171717] p-4 sm:p-5 mb-5 flex flex-col gap-3 w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF532A]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                      </div>

                      {/* Wireframe Mockup UI */}
                      <div className="flex gap-3 sm:gap-4 items-center justify-between pt-1">
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="h-3.5 bg-neutral-200 rounded-sm w-4/5" />
                          <div className="h-2.5 bg-neutral-600 rounded-xs w-3/5" />
                          <div className={`h-4 ${preset.pillColor} rounded-full w-2/5 mt-1`} />
                        </div>
                        <div className={`w-20 h-16 sm:w-24 sm:h-20 ${preset.blockColor} rounded-xl shrink-0 shadow-md`} />
                      </div>

                      {/* Bottom 3 placeholder bars */}
                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-neutral-800">
                        <div className="h-5 bg-neutral-800 rounded-md" />
                        <div className="h-5 bg-neutral-800 rounded-md" />
                        <div className="h-5 bg-neutral-800 rounded-md" />
                      </div>
                    </div>

                    {/* Content Info */}
                    <div className="flex flex-col gap-1.5 mb-5 flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF532A]">
                            {product.categoryLabel.es}
                          </span>
                          <span className="text-xs font-semibold text-neutral-500">
                            ★ {product.rating}
                          </span>
                        </div>

                        <h2 className="hd text-xl font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-1 m-0">
                          {product.title}
                        </h2>
                        <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 leading-relaxed m-0">
                          {product.shortDesc.es}
                        </p>
                      </div>

                      {/* Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-100">
                        {product.stack.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-mono border border-neutral-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                          Precio licencia
                        </span>
                        <span className="hd text-2xl font-extrabold text-[#171717] tracking-tight">
                          {product.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/marketplace/${product.slug}`}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold shadow-md shadow-[#FF532A]/20 transition-all hover:scale-105"
                        >
                          <span>Ver detalle</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Banner CTA Final */}
          <div className="rounded-[36px] sm:rounded-[44px] bg-[#FF532A] text-white p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-xl shadow-[#FF532A]/20">
            <h2 className="hd text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-[700px] leading-[1.15] mb-3">
              ¿Quieres un desarrollo 100% a medida?
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-[520px] mb-6 font-normal">
              Si tu modelo de negocio necesita una arquitectura personalizada desde cero, nuestro equipo lo diseña y programa para ti.
            </p>
            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full bg-white text-[#171717] hover:bg-neutral-100 text-sm sm:text-base font-bold shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Conversar sobre mi proyecto</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF532A]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
