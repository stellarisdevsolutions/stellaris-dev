"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
  const { lang } = useLanguage();

  return (
    <div className="w-full px-4 sm:px-6 py-6 bg-white">
      {/* Outer Slate 900 Bento Container */}
      <section
        id="servicios"
        className="w-full max-w-[1240px] mx-auto bg-[#0F172A] text-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden border border-slate-800"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex flex-col gap-2">
            <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white m-0">
              {lang === "es" ? "Nuestros " : "My "}
              <span className="text-[#2563EB]">
                {lang === "es" ? "Servicios" : "Services"}
              </span>
            </h2>
          </div>
          <p className="m-0 text-sm sm:text-base text-slate-400 max-w-[420px] leading-relaxed">
            {lang === "es"
              ? "Diseñamos y programamos plataformas digitales que convierten visitas en clientes leales y aceleran tu negocio."
              : "We design and develop high-converting digital experiences that turn visitors into loyal customers."}
          </p>
        </div>

        {/* 3 Folder-Style Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: UI/UX Design (Slate 800) */}
          <Link
            href="#contacto"
            className="group rounded-[28px] bg-[#1E293B] hover:bg-[#24334A] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border border-slate-700/80 hover:border-[#2563EB]/60 hover:-translate-y-1.5 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                  {lang === "es" ? "Diseño UI/UX" : "UI/UX Design"}
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-400 mb-6 leading-relaxed">
                {lang === "es"
                  ? "Prototipos interactivos, diseño en Figma y sistemas visuales hechos a la medida de tu marca."
                  : "Interactive prototypes, user flows, and bespoke Figma design systems."}
              </p>
            </div>

            {/* Folder Mockup Preview Box */}
            <div className="relative rounded-2xl bg-[#0F172A] p-4 border border-slate-700 flex flex-col justify-between min-h-[190px] overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
              <div className="w-[75%] h-3 rounded-full bg-slate-600 mb-2" />
              <div className="w-[50%] h-2 rounded-full bg-slate-700 mb-4" />
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="h-14 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                  Dashboard
                </div>
                <div className="h-14 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                  Mobile App
                </div>
              </div>

              {/* Circular Action Arrow Button */}
              <div className="absolute right-3.5 bottom-3.5 w-10 h-10 rounded-full bg-[#0F172A] border border-slate-600 text-white flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-all shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Web Design & Development (FEATURED ELECTRIC BLUE CARD) */}
          <Link
            href="#contacto"
            className="group rounded-[28px] bg-[#2563EB] hover:bg-[#1D4ED8] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-blue-600/30 hover:-translate-y-2 relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                  {lang === "es" ? "Desarrollo Web" : "Web Design & Code"}
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  {lang === "es" ? "Popular" : "Popular"}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-blue-100 mb-6 leading-relaxed">
                {lang === "es"
                  ? "Sitios corporativos y tiendas online con Next.js 16, React 19 y velocidad ultrarrápida."
                  : "Ultra-fast corporate platforms and e-commerce stores built on Next.js & React."}
              </p>
            </div>

            {/* Folder Mockup Preview Box */}
            <div className="relative rounded-2xl bg-white p-4 flex flex-col justify-between min-h-[190px] shadow-lg overflow-hidden text-slate-900">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
              <div className="w-[60%] h-3 rounded-full bg-[#0F172A] mb-2" />
              <div className="w-[85%] h-2 rounded-full bg-slate-200 mb-4" />
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] text-slate-700 font-semibold">
                  E-Commerce
                </div>
                <div className="h-14 rounded-xl bg-[#0F172A] text-[#10B981] flex items-center justify-center text-[10px] font-bold">
                  Next.js 16 ✦
                </div>
              </div>

              {/* Circular Action Arrow Button in Emerald Green */}
              <div className="absolute right-3.5 bottom-3.5 w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>

          {/* Card 3: Landing Pages & Web Apps (Slate 800) */}
          <Link
            href="#contacto"
            className="group rounded-[28px] bg-[#1E293B] hover:bg-[#24334A] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border border-slate-700/80 hover:border-[#2563EB]/60 hover:-translate-y-1.5 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                  {lang === "es" ? "Landing Pages" : "Landing Pages"}
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-400 mb-6 leading-relaxed">
                {lang === "es"
                  ? "Páginas de alta conversión orientadas a captar leads, ventas y clientes desde el primer día."
                  : "High-conversion single pages built specifically to generate qualified leads and sales."}
              </p>
            </div>

            {/* Folder Mockup Preview Box */}
            <div className="relative rounded-2xl bg-[#0F172A] p-4 border border-slate-700 flex flex-col justify-between min-h-[190px] overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
              <div className="w-[70%] h-3 rounded-full bg-[#2563EB] mb-2" />
              <div className="w-[90%] h-2 rounded-full bg-slate-600 mb-4" />
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="h-14 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                  Lead Funnel
                </div>
                <div className="h-14 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] text-[#10B981] font-mono font-semibold">
                  WhatsApp CRM
                </div>
              </div>

              {/* Circular Action Arrow Button */}
              <div className="absolute right-3.5 bottom-3.5 w-10 h-10 rounded-full bg-[#0F172A] border border-slate-600 text-white flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-all shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Why Choose Stellaris Dev - 4 Pillars with Emerald Green Checks */}
        <div className="mt-16 pt-12 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Entrega Puntual" : "On-Time Delivery"}
              </div>
              <p className="text-xs text-slate-400 mt-1 m-0">
                {lang === "es" ? "Fechas de lanzamiento estrictas." : "Guaranteed delivery deadlines."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Diseño a Medida" : "Custom Design"}
              </div>
              <p className="text-xs text-slate-400 mt-1 m-0">
                {lang === "es" ? "Sin plantillas genéricas." : "100% unique handcrafted UI."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Alto Rendimiento" : "Top Performance"}
              </div>
              <p className="text-xs text-slate-400 mt-1 m-0">
                {lang === "es" ? "Optimizado para Google y SEO." : "100 Google PageSpeed score."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Soporte Continuo" : "Direct Support"}
              </div>
              <p className="text-xs text-slate-400 mt-1 m-0">
                {lang === "es" ? "Acompañamiento post-lanzamiento." : "Reliable long-term maintenance."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}