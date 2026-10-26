"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
  const { lang } = useLanguage();

  return (
    <div className="w-full px-0 sm:px-6 py-0 sm:py-6 bg-white">
      {/* Outer Dark Bento Container (Full width on mobile, rounded on desktop) */}
      <section
        id="services"
        className="w-full max-w-[1240px] mx-auto bg-[#0C4651] text-white rounded-none sm:rounded-[48px] px-6 py-14 sm:p-14 lg:p-16 shadow-2xl border border-[#145C6A] overflow-hidden"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="flex flex-col gap-2">
            <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white m-0">
              {lang === "es" ? "Nuestros " : "Our "}
              <span className="text-[#E6FF2A]">
                {lang === "es" ? "Servicios" : "Services"}
              </span>
            </h2>
          </div>
          <p className="m-0 text-sm sm:text-base text-slate-200 max-w-[440px] leading-relaxed">
            {lang === "es"
              ? "Diseñamos y programamos soluciones digitales a medida que convierten visitas en clientes y automatizan tu negocio."
              : "We design and engineer bespoke digital solutions that convert visitors into clients and automate operations."}
          </p>
        </motion.div>

        {/* 3 Folder-Style Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Sitios Web */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-col"
          >
            <Link
              href="#contact"
              className="group rounded-[28px] bg-[#08343D] hover:bg-[#0A3942] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border border-[#145C6A] hover:border-[#E6FF2A]/50 hover:-translate-y-1.5 shadow-lg h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                    {lang === "es" ? "Sitios Web" : "Websites"}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 mb-6 leading-relaxed">
                  {lang === "es"
                    ? "Sitios corporativos, landing pages y portales institucionales de alto impacto, rápidos, seguros y posicionados en Google."
                    : "High-impact corporate websites, landing pages, and web portals optimized for speed, security, and SEO ranking."}
                </p>
              </div>

              {/* Real WebP Image Preview Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] w-full bg-[#05252C] border border-[#145C6A] shadow-md">
                <Image
                  src="/services/sitios-web.webp"
                  alt={lang === "es" ? "Sitios Web & Landing Pages" : "Websites & Landing Pages"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C4651]/80 via-transparent to-transparent pointer-events-none" />

                {/* Circular Action Arrow Button */}
                <div className="absolute right-3.5 bottom-3.5 w-10 h-10 rounded-full bg-[#08343D]/90 backdrop-blur-md border border-[#145C6A] text-white flex items-center justify-center group-hover:bg-[#E6FF2A] group-hover:text-[#0C4651] group-hover:border-[#E6FF2A] transition-all shadow-lg z-20">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 2: E-Commerce */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="flex flex-col"
          >
            <Link
              href="#contact"
              className="group rounded-[28px] bg-[#08343D] hover:bg-[#0A3942] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl border-2 border-[#E6FF2A]/80 hover:border-[#E6FF2A] hover:-translate-y-2 relative h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                    {lang === "es" ? "Tienda Online" : "E-Commerce"}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#E6FF2A] text-[#0C4651] text-[10px] font-black uppercase tracking-wider font-mono">
                    {lang === "es" ? "Popular" : "Popular"}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 mb-6 leading-relaxed">
                  {lang === "es"
                    ? "Tiendas online diseñadas para vender: catálogo interactivo, carrito persistente, pasarelas de pago y pedidos directos a WhatsApp."
                    : "Sales-driven online stores: interactive product catalogs, persistent cart, payment gateways, and automated WhatsApp checkout."}
                </p>
              </div>

              {/* Real WebP Image Preview Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] w-full bg-[#05252C] border border-[#145C6A] shadow-lg group/img">
                <Image
                  src="/services/ecommerce.webp"
                  alt={lang === "es" ? "Tienda Online" : "E-Commerce & Online Stores"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C4651]/80 via-transparent to-transparent pointer-events-none" />

                {/* Circular Action Arrow Button */}
                <div className="absolute right-3.5 bottom-3.5 w-10 h-10 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg z-20 font-bold">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 3: Sistemas Personalizados */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.19 }}
            className="flex flex-col"
          >
            <Link
              href="#contact"
              className="group rounded-[28px] bg-[#08343D] hover:bg-[#0A3942] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border border-[#145C6A] hover:border-[#E6FF2A]/50 hover:-translate-y-1.5 shadow-lg h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="hd text-xl sm:text-2xl font-bold text-white m-0">
                    {lang === "es" ? "Sistemas Personalizados" : "Custom Systems"}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 mb-6 leading-relaxed">
                  {lang === "es"
                    ? "Plataformas web a la medida, aplicaciones SaaS, paneles administrativos, bases de datos y automatización para tu negocio."
                    : "Tailor-made web applications, SaaS platforms, internal management portals, databases, and automated workflows."}
                </p>
              </div>

              {/* Real WebP Image Preview Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] w-full bg-[#05252C] border border-[#145C6A] shadow-md group/img">
                <Image
                  src="/services/sistemas-personalizados.webp"
                  alt={lang === "es" ? "Sistemas Web Personalizados" : "Custom Web Systems"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C4651]/80 via-transparent to-transparent pointer-events-none" />

                {/* Circular Action Arrow Button */}
                <div className="absolute right-3.5 bottom-3.5 w-10 h-10 rounded-full bg-[#08343D]/90 backdrop-blur-md border border-[#145C6A] text-white flex items-center justify-center group-hover:bg-[#E6FF2A] group-hover:text-[#0C4651] group-hover:border-[#E6FF2A] transition-all shadow-lg z-20">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Why Choose Kano Dev - 4 Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 pt-12 border-t border-[#145C6A] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Entrega Puntual" : "On-Time Delivery"}
              </div>
              <p className="text-xs text-slate-300 mt-1 m-0">
                {lang === "es" ? "Fechas de lanzamiento estrictas." : "Guaranteed delivery deadlines."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Diseño a Medida" : "Custom Design"}
              </div>
              <p className="text-xs text-slate-300 mt-1 m-0">
                {lang === "es" ? "Sin plantillas genéricas." : "100% unique handcrafted UI."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Rendimiento Máximo" : "Maximum Speed"}
              </div>
              <p className="text-xs text-slate-300 mt-1 m-0">
                {lang === "es" ? "Puntuación de 95+ en PageSpeed." : "95+ Google PageSpeed score."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
              ✓
            </span>
            <div>
              <div className="font-semibold text-white text-base">
                {lang === "es" ? "Soporte Continuo" : "Direct Support"}
              </div>
              <p className="text-xs text-slate-300 mt-1 m-0">
                {lang === "es" ? "Acompañamiento post-lanzamiento." : "Post-launch maintenance."}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
