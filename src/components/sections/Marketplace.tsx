"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MARKETPLACE_PRODUCTS } from "@/data/marketplace";

export function Marketplace() {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: lang === "es" ? "Todas" : "All" },
    { id: "negocios", label: lang === "es" ? "Negocios" : "Business" },
    { id: "tiendas", label: lang === "es" ? "Tiendas" : "Stores" },
    { id: "portafolios", label: lang === "es" ? "Portafolios" : "Portfolios" },
  ];

  const filteredProducts = MARKETPLACE_PRODUCTS.filter((product) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "negocios") return product.category === "saas" || product.category === "landing";
    if (selectedFilter === "tiendas") return product.category === "ecommerce";
    if (selectedFilter === "portafolios") return product.category === "agencies";
    return true;
  });

  const getWhatsAppBuyLink = (productTitle: string, price: string) => {
    const message =
      lang === "es"
        ? `¡Hola Stellaris Dev! Me interesa comprar la plantilla "${productTitle}" (${price}). ¿Cuáles son los métodos de pago y el proceso de entrega?`
        : `Hi Stellaris Dev! I'd like to buy the "${productTitle}" (${price}) template. How can I complete the purchase and get the files?`;
    return `https://wa.me/59169991245?text=${encodeURIComponent(message)}`;
  };

  // Preset mockup colors matching the 3 cards in the user reference image
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
      {/* Resplandor cálido en la esquina superior derecha (calibrado más sutil y pequeño en mobile) */}
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

        {/* Filter Pills Flex-Wrap Centradas */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14 w-full">
          {filterTabs.map((tab) => {
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

        {/* 3-Column Product Cards Grid (Diseño de la imagen de referencia) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProducts.map((product) => {
            const preset = cardPresets[product.id] || {
              blockColor: "bg-[#FF532A]",
              pillColor: "bg-[#FF532A]",
            };

            const categoryName =
              product.category === "saas" || product.category === "landing"
                ? lang === "es" ? "Negocios" : "Business"
                : product.category === "ecommerce"
                ? lang === "es" ? "Tiendas" : "Stores"
                : lang === "es" ? "Portafolios" : "Portfolios";

            return (
              <div
                key={product.id}
                className="group rounded-[28px] bg-[#202024] border border-neutral-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Browser Window Mockup matching reference drawing */}
                  <Link
                    href={`/marketplace/${product.slug}`}
                    className="block rounded-2xl bg-[#171717] border border-neutral-800/90 p-4 sm:p-5 mb-5 cursor-pointer group-hover:border-neutral-700 transition-colors"
                  >
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

                      {/* Right: Solid Square Block (Orange, White or Grey) */}
                      <div className="col-span-5 flex justify-end">
                        <div className={`w-20 sm:w-22 h-20 sm:h-22 rounded-2xl ${preset.blockColor} shadow-md`} />
                      </div>
                    </div>

                    {/* Full-width bottom bar */}
                    <div className="w-full h-4 rounded-lg bg-neutral-800/90 mt-4" />
                  </Link>

                  {/* Title & Category with Short Description */}
                  <div className="mb-6">
                    <Link href={`/marketplace/${product.slug}`}>
                      <h3 className="hd text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5 group-hover:text-[#FF532A] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-1 m-0">
                      {categoryName} • {product.shortDesc[lang]}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Price + Dual Action Buttons */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  {/* Price */}
                  <div className="hd text-2xl sm:text-[26px] font-extrabold text-white">
                    {product.price}
                  </div>

                  {/* Dual Action Buttons (Ver demo + Comprar) */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/marketplace/${product.slug}`}
                      className="px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#171717] text-xs sm:text-[13px] font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                    >
                      {lang === "es" ? "Ver demo" : "Live demo"}
                    </Link>

                    <a
                      href={getWhatsAppBuyLink(product.title, product.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 sm:px-5 py-2.5 rounded-full bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs sm:text-[13px] font-semibold transition-all shadow-md shadow-[#FF532A]/25 cursor-pointer whitespace-nowrap"
                    >
                      {lang === "es" ? "Comprar" : "Buy now"}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
