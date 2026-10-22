"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Pricing() {
  const { lang } = useLanguage();

  return (
    <section id="precios" className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-24 sm:pt-28 pb-24 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center flex flex-col gap-3 items-center">
        <div className="text-[14px] font-medium tracking-[2px] text-[#4A5373] uppercase">
          {lang === "es" ? "PRECIOS" : "PRICING"}
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#0B1020] m-0">
          {lang === "es" ? "Planes " : "Plans "}
          <span className="highlight-badge">
            {lang === "es" ? "para cada etapa" : "for every stage"}
          </span>
        </h2>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Card 1: Landing Page */}
        <div className="lt rounded-[24px] p-8 flex flex-col gap-5 shadow-xs">
          <h3 className="hd text-[22px] font-bold text-[#0B1020] m-0">Landing page</h3>
          <div>
            <span className="text-[15px] text-[#4A5373]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#0B1020]">
              $100 <span className="text-[18px] font-medium text-[#4A5373]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] text-[#4A5373] flex-1">
            <div>✓ {lang === "es" ? "Una página enfocada en convertir" : "Single high-conversion page"}</div>
            <div>✓ {lang === "es" ? "Diseño responsive" : "Responsive mobile design"}</div>
            <div>✓ {lang === "es" ? "Formulario de contacto" : "Direct inquiry form"}</div>
            <div>✓ {lang === "es" ? "Despliegue incluido" : "Deployment included"}</div>
          </div>
          <Link
            href="#contacto"
            className="btn-outline-light text-center py-3.5 text-[15px] font-medium mt-2"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>

        {/* Card 2: Sitio Web (Highlighted in Dark #0B1020) */}
        <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[24px] p-8 flex flex-col gap-5 shadow-2xl">
          <h3 className="hd text-[22px] font-bold text-white m-0">
            {lang === "es" ? "Sitio web" : "Multi-Page Website"}
          </h3>
          <div>
            <span className="text-[15px] text-[#A9B3CF]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#FFC857]">
              $150 <span className="text-[18px] font-medium text-[#A9B3CF]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] text-[#A9B3CF] flex-1">
            <div>✓ {lang === "es" ? "Varias páginas" : "Up to 5 custom pages"}</div>
            <div>✓ {lang === "es" ? "Diseño responsive" : "Responsive mobile design"}</div>
            <div>✓ {lang === "es" ? "Optimización SEO básica" : "Essential Google SEO"}</div>
            <div>✓ {lang === "es" ? "Despliegue incluido" : "Deployment included"}</div>
          </div>
          <Link
            href="#contacto"
            className="btn-accent text-center py-3.5 text-[15px] font-medium mt-2 shadow-lg shadow-[#FFC857]/20"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>

        {/* Card 3: E-commerce */}
        <div className="lt rounded-[24px] p-8 flex flex-col gap-5 shadow-xs">
          <h3 className="hd text-[22px] font-bold text-[#0B1020] m-0">E-commerce</h3>
          <div>
            <span className="text-[15px] text-[#4A5373]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#0B1020]">
              $500 <span className="text-[18px] font-medium text-[#4A5373]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] text-[#4A5373] flex-1">
            <div>✓ {lang === "es" ? "Catálogo de productos" : "Interactive catalog"}</div>
            <div>✓ {lang === "es" ? "Carrito y pagos en línea" : "Cart & secure payments"}</div>
            <div>✓ {lang === "es" ? "Panel de administración" : "Admin dashboard"}</div>
            <div>✓ {lang === "es" ? "Despliegue incluido" : "Deployment included"}</div>
          </div>
          <Link
            href="#contacto"
            className="btn-outline-light text-center py-3.5 text-[15px] font-medium mt-2"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>
      </div>

      {/* Yellow Banner exactly matching reference */}
      <div className="bg-[#FFC857] rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="max-w-[620px] text-left">
          <h3 className="hd text-2xl sm:text-[28px] font-bold leading-[1.2] text-[#0B1020] m-0 mb-2">
            {lang === "es" ? "¿Tienes requerimientos especiales o una idea única?" : "Have custom requirements or a unique vision?"}
          </h3>
          <p className="text-[#0B1020] text-base leading-[1.6] m-0 font-normal">
            {lang === "es"
              ? "Escríbenos y te armamos una cotización a medida para tu proyecto."
              : "Message us and we'll craft a tailor-made proposal for your exact needs."}
          </p>
        </div>
        <Link
          href="#contacto"
          className="bg-[#0B1020] text-white hover:bg-slate-900 px-7 py-4 rounded-full text-[15px] font-medium shrink-0 transition-all shadow-md active:scale-95"
        >
          {lang === "es" ? "Escríbenos" : "Message Us"}
        </Link>
      </div>
    </section>
  );
}
