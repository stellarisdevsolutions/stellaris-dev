"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
  const { lang } = useLanguage();

  return (
    <>
      {/* SERVICIOS CLARO */}
      <section id="servicios" className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-24 sm:pt-28 pb-24 flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3 items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#E8EEF9] text-[#222E54] border border-[#D5DFEE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_rgba(139,92,246,0.6)]" />
            {lang === "es" ? "LO QUE HACEMOS" : "WHAT WE DO"}
          </div>
          <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#0B1020]">
            {lang === "es" ? "Nuestros " : "Our "}
            <span className="highlight-badge">
              {lang === "es" ? "servicios" : "services"}
            </span>
          </h2>
        </div>

        {/* 3 White Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1 */}
          <div className="lt rounded-[24px] p-8 flex flex-col gap-4 group">
            <div className="w-[52px] h-[52px] rounded-full bg-[#0B1020] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform border border-[#2A3560] group-hover:border-[#8B5CF6]/50">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
              </svg>
            </div>
            <h3 className="hd text-2xl font-bold text-[#0B1020] mt-1">
              {lang === "es" ? "Sitios a medida" : "Custom Websites"}
            </h3>
            <p className="text-[#4A5373] leading-[1.6] text-[15px] m-0">
              {lang === "es"
                ? "Páginas corporativas y landing pages diseñadas desde cero para tu marca."
                : "Corporate websites and landing pages designed from scratch for your brand."}
            </p>
            <div className="flex flex-col gap-2.5 text-[15px] text-[#4A5373] pt-2">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Diseño responsive" : "Responsive design"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Optimizado para SEO" : "Optimized for SEO"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Carga ultrarrápida" : "Ultra-fast loading speed"}</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lt rounded-[24px] p-8 flex flex-col gap-4 group">
            <div className="w-[52px] h-[52px] rounded-full bg-[#0B1020] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform border border-[#2A3560] group-hover:border-[#8B5CF6]/50">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 6h15l-2 9H8zM6 6L5 3H2M9 20h.01M18 20h.01" />
              </svg>
            </div>
            <h3 className="hd text-2xl font-bold text-[#0B1020] mt-1">
              {lang === "es" ? "Tiendas online" : "Online Stores"}
            </h3>
            <p className="text-[#4A5373] leading-[1.6] text-[15px] m-0">
              {lang === "es"
                ? "E-commerce con catálogo, carrito y pagos para vender las 24 horas."
                : "E-commerce platforms with catalog, cart, and automated checkout."}
            </p>
            <div className="flex flex-col gap-2.5 text-[15px] text-[#4A5373] pt-2">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Catálogo de productos" : "Interactive catalog"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Pagos seguros" : "Secure payments"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Panel de administración" : "Admin dashboard"}</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="lt rounded-[24px] p-8 flex flex-col gap-4 group">
            <div className="w-[52px] h-[52px] rounded-full bg-[#0B1020] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform border border-[#2A3560] group-hover:border-[#8B5CF6]/50">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M8 21h8M12 18v3" />
              </svg>
            </div>
            <h3 className="hd text-2xl font-bold text-[#0B1020] mt-1">
              {lang === "es" ? "Apps web" : "Web Apps"}
            </h3>
            <p className="text-[#4A5373] leading-[1.6] text-[15px] m-0">
              {lang === "es"
                ? "Paneles, sistemas y herramientas internas para automatizar tu negocio."
                : "Portals, dashboards, and internal tools to automate your workflows."}
            </p>
            <div className="flex flex-col gap-2.5 text-[15px] text-[#4A5373] pt-2">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Sistemas a medida" : "Bespoke systems"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Paneles y reportes" : "Dashboards & reports"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span>{lang === "es" ? "Mantenimiento continuo" : "Continuous support"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÉ NOSOTROS: OSCURO REDONDEADO */}
      <section className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pb-24">
        <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[36px] p-8 sm:p-14 lg:p-16 flex flex-col gap-12 shadow-2xl border border-[#2A3560]/40">
          <h2 className="hd text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-1px] max-w-[520px]">
            {lang === "es" ? "Por qué elegir " : "Why choose "}
            <span className="text-[#A78BFA] drop-shadow-[0_0_12px_rgba(167,139,250,0.4)]">Stellaris Dev</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="flex flex-col gap-3">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <h3 className="hd text-xl font-bold text-white m-0">
                {lang === "es" ? "Entrega puntual" : "On-Time Delivery"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es" ? "Cumplimos los plazos que acordamos contigo." : "Strict schedules with firm launch dates."}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col gap-3">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3h12l4 6-10 12L2 9z" />
              </svg>
              <h3 className="hd text-xl font-bold text-white m-0">
                {lang === "es" ? "Diseño moderno" : "Modern Design"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es" ? "Interfaces limpias y fáciles de usar." : "Clean, thumb-friendly interfaces."}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col gap-3">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
              </svg>
              <h3 className="hd text-xl font-bold text-white m-0">
                {lang === "es" ? "Enfocado en resultados" : "Results-Driven"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es" ? "Cada decisión busca que tu web genere clientes." : "Engineered to convert visitors into clients."}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col gap-3">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1z" />
              </svg>
              <h3 className="hd text-xl font-bold text-white m-0">
                {lang === "es" ? "Soporte continuo" : "Continuous Support"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es" ? "Te acompañamos incluso después del lanzamiento." : "Dedicated guidance before and after launch."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
