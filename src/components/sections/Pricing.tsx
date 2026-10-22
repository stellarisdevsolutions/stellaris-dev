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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#EBEBEF] text-[#171717] border border-[#DDDDE2]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
          {lang === "es" ? "PRECIOS" : "PRICING"}
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#171717] m-0">
          {lang === "es" ? "Planes " : "Plans "}
          <span className="highlight-badge">
            {lang === "es" ? "para cada etapa" : "for every stage"}
          </span>
        </h2>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Card 1: Landing Page */}
        <div className="lt rounded-[24px] p-8 flex flex-col gap-5">
          <h3 className="hd text-[22px] font-bold text-[#171717] m-0">Landing page</h3>
          <div>
            <span className="text-[15px] text-[#666666]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#171717]">
              $100 <span className="text-[18px] font-medium text-[#666666]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[15px] text-[#666666] flex-1">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Una página enfocada en convertir" : "Single high-conversion page"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Diseño responsive" : "Responsive mobile design"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Formulario de contacto" : "Direct inquiry form"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Despliegue incluido" : "Deployment included"}</span>
            </div>
          </div>
          <Link
            href="#contacto"
            className="btn-outline-light text-center py-3.5 text-[15px] font-medium mt-2"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>

        {/* Card 2: Sitio Web (Highlighted in Dark #171717 with Solar Accent) */}
        <div className="bg-[#171717] text-[#F5F5F7] rounded-[24px] p-8 flex flex-col gap-5 shadow-2xl relative border-2 border-[#FF6A00] hover:shadow-[#FF6A00]/20 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="hd text-[22px] font-bold text-white m-0">
              {lang === "es" ? "Sitio web" : "Multi-Page Website"}
            </h3>
            <span className="bg-[#FF6A00] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {lang === "es" ? "Popular" : "Popular"}
            </span>
          </div>
          <div>
            <span className="text-[15px] text-[#A3A3A3]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#FFC928]">
              $150 <span className="text-[18px] font-medium text-[#A3A3A3]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[15px] text-[#A3A3A3] flex-1">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Varias páginas" : "Up to 5 custom pages"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Diseño responsive" : "Responsive mobile design"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Optimización SEO básica" : "Essential Google SEO"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Despliegue incluido" : "Deployment included"}</span>
            </div>
          </div>
          <Link
            href="#contacto"
            className="btn-accent text-center py-3.5 text-[15px] font-medium mt-2 shadow-lg shadow-[#FF6A00]/25"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>

        {/* Card 3: E-commerce */}
        <div className="lt rounded-[24px] p-8 flex flex-col gap-5">
          <h3 className="hd text-[22px] font-bold text-[#171717] m-0">E-commerce</h3>
          <div>
            <span className="text-[15px] text-[#666666]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#171717]">
              $500 <span className="text-[18px] font-medium text-[#666666]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[15px] text-[#666666] flex-1">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Catálogo de productos" : "Interactive catalog"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Carrito y pagos en línea" : "Cart & secure payments"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Panel de administración" : "Admin dashboard"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#171717] text-[#FFC928] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Despliegue incluido" : "Deployment included"}</span>
            </div>
          </div>
          <Link
            href="#contacto"
            className="btn-outline-light text-center py-3.5 text-[15px] font-medium mt-2"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>
      </div>

      {/* Solar Warm Banner */}
      <div className="bg-gradient-to-r from-[#FF6A00] via-[#FF8C00] to-[#FFC928] rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl shadow-[#FF6A00]/20">
        <div className="max-w-[620px] text-left">
          <h3 className="hd text-2xl sm:text-[28px] font-bold leading-[1.2] text-[#171717] m-0 mb-2">
            {lang === "es" ? "¿Tienes requerimientos especiales o una idea única?" : "Have custom requirements or a unique vision?"}
          </h3>
          <p className="text-[#171717]/90 text-base leading-[1.6] m-0 font-medium">
            {lang === "es"
              ? "Escríbenos y te armamos una cotización a medida para tu proyecto."
              : "Message us and we'll craft a tailor-made proposal for your exact needs."}
          </p>
        </div>
        <Link
          href="#contacto"
          className="bg-[#171717] text-white hover:bg-[#262626] px-7 py-4 rounded-full text-[15px] font-medium shrink-0 transition-all shadow-md active:scale-95"
        >
          {lang === "es" ? "Escríbenos" : "Message Us"}
        </Link>
      </div>
    </section>
  );
}
