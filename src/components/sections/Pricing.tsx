"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Pricing() {
  const { lang } = useLanguage();

  return (
    <section id="pricing" className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="text-center flex flex-col gap-3 items-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#0C4651]/5 text-[#0C4651] border border-[#0C4651]/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0C4651]" />
          {lang === "es" ? "PRECIOS TRANSPARENTES" : "TRANSPARENT PRICING"}
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0C4651] m-0">
          {lang === "es" ? "Planes para cada " : "Plans for every "}
          <span className="inline-block relative text-[#0C4651] bg-[#E6FF2A] px-3 sm:px-4 py-0.5 rounded-xl shadow-sm shadow-[#E6FF2A]/30 -rotate-1 mx-1 border border-[#0C4651]/20">
            {lang === "es" ? "etapa de tu negocio" : "business stage"}
          </span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-500 max-w-[620px] mx-auto leading-relaxed m-0">
          {lang === "es"
            ? "Inversión clara y sin costos ocultos. Desde páginas de lanzamiento rápido hasta plataformas completas diseñadas para vender."
            : "Clear pricing with zero hidden fees. From fast product launch pages to full platforms engineered to drive sales."}
        </p>
      </motion.div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Card 1: Landing Page */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-[28px] border border-neutral-200/90 bg-white p-7 sm:p-8 flex flex-col gap-6 shadow-xs hover:shadow-xl hover:border-[#0C4651]/50 transition-all hover:-translate-y-1"
        >
          <div>
            <h3 className="hd text-xl sm:text-2xl font-bold text-[#0C4651] m-0">Landing Page</h3>
            <p className="text-xs text-neutral-500 mt-1 m-0">
              {lang === "es" ? "Para campañas y validación rápida" : "For fast product validation"}
            </p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 uppercase font-semibold">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-4xl sm:text-5xl font-bold text-[#0C4651] mt-0.5">
              $100 <span className="text-base font-semibold text-neutral-400">USD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 text-sm text-neutral-600 flex-1 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Página única orientada a convertir" : "Single high-conversion landing page"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Diseño 100% adaptado a celulares" : "100% mobile-friendly responsive"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Formulario y botón directo a WhatsApp" : "Direct WhatsApp and contact form"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Despliegue y configuración de dominio" : "Live deployment & domain setup"}</span>
            </div>
          </div>

          <Link
            href="#contact"
            className="w-full text-center py-3.5 rounded-full border border-[#0C4651]/20 hover:border-[#0C4651] text-[#0C4651] font-semibold text-sm hover:bg-[#0C4651]/5 transition-all mt-4 inline-flex items-center justify-center gap-1.5"
          >
            <span>{lang === "es" ? "Cotizar Landing Page" : "Get Quote"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Card 2: Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="rounded-[28px] bg-[#0C4651] text-white p-7 sm:p-8 flex flex-col gap-6 shadow-2xl relative border-2 border-[#E6FF2A] hover:border-[#E6FF2A] transition-all -translate-y-1 sm:-translate-y-2 hover:-translate-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                {lang === "es" ? "Sitio Web Completo" : "Full Website"}
              </h3>
              <p className="text-xs text-[#E6FF2A]/80 mt-1 m-0">
                {lang === "es" ? "Ideal para empresas y marcas" : "Best for businesses & brands"}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E6FF2A] text-[#0C4651] text-[11px] font-extrabold uppercase tracking-wider">
              {lang === "es" ? "Popular" : "Popular"}
            </span>
          </div>

          <div>
            <span className="text-xs text-neutral-300 uppercase font-semibold">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-4xl sm:text-5xl font-bold text-[#E6FF2A] mt-0.5">
              $150 <span className="text-base font-semibold text-neutral-300">USD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 text-sm text-neutral-200 flex-1 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 shadow-sm shadow-[#E6FF2A]/20">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Hasta 5 secciones y páginas exclusivas" : "Up to 5 custom-designed sections"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 shadow-sm shadow-[#E6FF2A]/20">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Diseño a medida con identidad de marca" : "Bespoke brand-aligned custom design"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 shadow-sm shadow-[#E6FF2A]/20">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Optimización para posicionamiento en Google" : "Google SEO & analytics setup"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 shadow-sm shadow-[#E6FF2A]/20">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Correos corporativos y soporte continuo" : "Corporate emails & direct support"}</span>
            </div>
          </div>

          <Link
            href="#contact"
            className="w-full text-center py-3.5 rounded-full bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] font-bold text-sm shadow-lg shadow-[#E6FF2A]/20 transition-all hover:scale-102 mt-4 inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{lang === "es" ? "Empezar Proyecto" : "Get Started"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Card 3: E-Commerce */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, delay: 0.19 }}
          className="rounded-[28px] border border-neutral-200/90 bg-white p-7 sm:p-8 flex flex-col gap-6 shadow-xs hover:shadow-xl hover:border-[#0C4651]/50 transition-all hover:-translate-y-1"
        >
          <div>
            <h3 className="hd text-xl sm:text-2xl font-bold text-[#0C4651] m-0">E-Commerce</h3>
            <p className="text-xs text-neutral-500 mt-1 m-0">
              {lang === "es" ? "Tienda online para vender 24/7" : "Automated 24/7 online store"}
            </p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 uppercase font-semibold">{lang === "es" ? "Desde" : "From"}</span>
            <div className="hd text-4xl sm:text-5xl font-bold text-[#0C4651] mt-0.5">
              $500 <span className="text-base font-semibold text-neutral-400">USD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 text-sm text-neutral-600 flex-1 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Catálogo y carrito de compras" : "Interactive products & checkout"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Pasarelas de pago seguras y QR" : "Secure card, transfer & QR payments"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Panel de administración autogestionable" : "Self-managed admin dashboard"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>{lang === "es" ? "Capacitación y soporte incluido" : "Full team training included"}</span>
            </div>
          </div>

          <Link
            href="#contact"
            className="w-full text-center py-3.5 rounded-full border border-[#0C4651]/20 hover:border-[#0C4651] text-[#0C4651] font-semibold text-sm hover:bg-[#0C4651]/5 transition-all mt-4 inline-flex items-center justify-center gap-1.5"
          >
            <span>{lang === "es" ? "Cotizar E-Commerce" : "Get Quote"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
