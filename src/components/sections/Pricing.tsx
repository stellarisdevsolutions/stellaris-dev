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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#E8EEF9] text-[#222E54] border border-[#D5DFEE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
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
        <div className="lt rounded-[24px] p-8 flex flex-col gap-5">
          <h3 className="hd text-[22px] font-bold text-[#0B1020] m-0">Landing page</h3>
          <div>
            <span className="text-[15px] text-[#4A5373]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#0B1020]">
              $100 <span className="text-[18px] font-medium text-[#4A5373]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[15px] text-[#4A5373] flex-1">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Una página enfocada en convertir" : "Single high-conversion page"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Diseño responsive" : "Responsive mobile design"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Formulario de contacto" : "Direct inquiry form"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
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

        {/* Card 2: Sitio Web (Highlighted in Dark #0B1020) */}
        <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[24px] p-8 flex flex-col gap-5 shadow-2xl relative border border-[#00F0FF]/40 hover:border-[#00F0FF] transition-all shadow-[0_0_30px_rgba(0,240,255,0.12)]">
          <div className="flex items-center justify-between">
            <h3 className="hd text-[22px] font-bold text-white m-0">
              {lang === "es" ? "Sitio web" : "Multi-Page Website"}
            </h3>
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#0B1020] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              {lang === "es" ? "Popular" : "Popular"}
            </span>
          </div>
          <div>
            <span className="text-[15px] text-[#A9B3CF]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#00F0FF] drop-shadow-[0_0_12px_rgba(0,240,255,0.35)]">
              $150 <span className="text-[18px] font-medium text-[#A9B3CF]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[15px] text-[#A9B3CF] flex-1">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#00F0FF] text-[#0B1020] flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.5)]">✓</span>
              <span>{lang === "es" ? "Varias páginas" : "Up to 5 custom pages"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#00F0FF] text-[#0B1020] flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.5)]">✓</span>
              <span>{lang === "es" ? "Diseño responsive" : "Responsive mobile design"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#00F0FF] text-[#0B1020] flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.5)]">✓</span>
              <span>{lang === "es" ? "Optimización SEO básica" : "Essential Google SEO"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#00F0FF] text-[#0B1020] flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.5)]">✓</span>
              <span>{lang === "es" ? "Despliegue incluido" : "Deployment included"}</span>
            </div>
          </div>
          <Link
            href="#contacto"
            className="btn-accent text-center py-3.5 text-[15px] font-semibold mt-2"
          >
            {lang === "es" ? "Cotizar" : "Get Quote"}
          </Link>
        </div>

        {/* Card 3: E-commerce */}
        <div className="lt rounded-[24px] p-8 flex flex-col gap-5">
          <h3 className="hd text-[22px] font-bold text-[#0B1020] m-0">E-commerce</h3>
          <div>
            <span className="text-[15px] text-[#4A5373]">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-[46px] sm:text-[52px] font-bold leading-[1.1] text-[#0B1020]">
              $500 <span className="text-[18px] font-medium text-[#4A5373]">USD</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[15px] text-[#4A5373] flex-1">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Catálogo de productos" : "Interactive catalog"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Carrito y pagos en línea" : "Cart & secure payments"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Panel de administración" : "Admin dashboard"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#00F0FF] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
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

      {/* Cyan-Tech Dark Banner */}
      <div className="bg-gradient-to-r from-[#0B152B] via-[#122347] to-[#0B152B] border border-[#00F0FF]/40 rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl shadow-[#00F0FF]/10">
        <div className="max-w-[620px] text-left">
          <h3 className="hd text-2xl sm:text-[28px] font-bold leading-[1.2] text-[#E8ECF8] m-0 mb-2">
            {lang === "es" ? "¿Tienes requerimientos especiales o una idea única?" : "Have custom requirements or a unique vision?"}
          </h3>
          <p className="text-[#A9B3CF] text-base leading-[1.6] m-0 font-normal">
            {lang === "es"
              ? "Escríbenos y te armamos una cotización a medida para tu proyecto."
              : "Message us and we'll craft a tailor-made proposal for your exact needs."}
          </p>
        </div>
        <Link
          href="#contacto"
          className="btn-accent px-7 py-4 rounded-full text-[15px] font-semibold shrink-0 transition-all shadow-lg shadow-[#00F0FF]/30 active:scale-95"
        >
          {lang === "es" ? "Escríbenos" : "Message Us"}
        </Link>
      </div>
    </section>
  );
}
