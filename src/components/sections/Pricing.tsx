"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Pricing() {
  const { lang } = useLanguage();

  return (
    <section id="precios" className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Header */}
      <div className="text-center flex flex-col gap-3 items-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-blue-50 text-[#2563EB] border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          {lang === "es" ? "PRECIOS TRANSPARENTES" : "TRANSPARENT PRICING"}
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] m-0">
          {lang === "es" ? "Planes para cada " : "Plans for every "}
          <span className="text-[#2563EB]">
            {lang === "es" ? "etapa de tu negocio" : "business stage"}
          </span>
        </h2>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Card 1: Landing Page */}
        <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl hover:border-[#2563EB]/50 transition-all">
          <div>
            <h3 className="hd text-xl sm:text-2xl font-bold text-[#0F172A] m-0">Landing Page</h3>
            <p className="text-xs text-slate-500 mt-1 m-0">
              {lang === "es" ? "Para campañas y validación rápida" : "For fast product validation"}
            </p>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-4xl sm:text-5xl font-bold text-[#0F172A] mt-0.5">
              $100 <span className="text-base font-semibold text-slate-400">USD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-600 flex-1 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Una página orientada a convertir" : "Single high-conversion landing page"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Diseño 100% responsive en celular" : "100% mobile-friendly responsive"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Formulario y botón a WhatsApp" : "Direct WhatsApp and contact form"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Despliegue y dominio incluidos" : "Live deployment included"}</span>
            </div>
          </div>

          <Link
            href="#contacto"
            className="w-full text-center py-3.5 rounded-full border border-slate-300 hover:border-[#0F172A] text-[#0F172A] font-semibold text-sm hover:bg-slate-50 transition-all mt-4"
          >
            {lang === "es" ? "Cotizar Landing Page" : "Get Quote"}
          </Link>
        </div>

        {/* Card 2: Featured Slate 900 Card with Emerald Price & Button */}
        <div className="rounded-[28px] bg-[#0F172A] text-white p-7 sm:p-8 flex flex-col gap-6 shadow-2xl relative border border-slate-700 hover:border-[#2563EB] transition-all -translate-y-1 sm:-translate-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                {lang === "es" ? "Sitio Web Completo" : "Full Website"}
              </h3>
              <p className="text-xs text-slate-400 mt-1 m-0">
                {lang === "es" ? "Ideal para empresas y marcas" : "Best for businesses & brands"}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-bold uppercase tracking-wider">
              {lang === "es" ? "Popular" : "Popular"}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-4xl sm:text-5xl font-bold text-[#10B981] mt-0.5">
              $150 <span className="text-base font-semibold text-slate-400">USD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-300 flex-1 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Hasta 5 páginas personalizadas" : "Up to 5 custom-designed pages"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Diseño a medida en Next.js 16" : "Next.js 16 modern stack"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Optimización SEO para Google" : "Google SEO & analytics setup"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Correos corporativos y soporte" : "Corporate emails & support"}</span>
            </div>
          </div>

          <Link
            href="#contacto"
            className="w-full text-center py-3.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-102 mt-4"
          >
            {lang === "es" ? "Empezar Proyecto ↗" : "Get Started ↗"}
          </Link>
        </div>

        {/* Card 3: E-Commerce */}
        <div className="rounded-[28px] border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl hover:border-[#2563EB]/50 transition-all">
          <div>
            <h3 className="hd text-xl sm:text-2xl font-bold text-[#0F172A] m-0">E-Commerce</h3>
            <p className="text-xs text-slate-500 mt-1 m-0">
              {lang === "es" ? "Tienda online para vender 24/7" : "Automated 24/7 online store"}
            </p>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-4xl sm:text-5xl font-bold text-[#0F172A] mt-0.5">
              $500 <span className="text-base font-semibold text-slate-400">USD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-600 flex-1 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Catálogo y carrito de compras" : "Interactive products & checkout"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Pasarelas de pago seguras" : "Stripe, PayPal & local payments"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Panel de administración de stock" : "Admin dashboard for orders"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <span>{lang === "es" ? "Capacitación y soporte incluido" : "Full team training included"}</span>
            </div>
          </div>

          <Link
            href="#contacto"
            className="w-full text-center py-3.5 rounded-full border border-slate-300 hover:border-[#0F172A] text-[#0F172A] font-semibold text-sm hover:bg-slate-50 transition-all mt-4"
          >
            {lang === "es" ? "Cotizar E-Commerce" : "Get Quote"}
          </Link>
        </div>
      </div>
    </section>
  );
}