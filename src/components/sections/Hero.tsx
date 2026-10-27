"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full bg-white text-[#0C4651] pt-[92px] sm:pt-28 pb-5 sm:pb-16 overflow-hidden flex flex-col justify-center min-h-0 sm:min-h-[calc(100dvh-20px)] max-h-[960px]"
    >
      {/* ══════════════════════════════════════════════════════════════════
          FORMAS SÓLIDAS EN EL FONDO (INTEGRADAS EN TODO EL HERO)
          ══════════════════════════════════════════════════════════════════ */}

      {/* Crosshairs arquitectónicos en las esquinas */}
      <div className="absolute top-20 left-4 sm:left-12 text-[#0C4651]/30 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute top-20 right-4 sm:right-12 text-[#0C4651]/30 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute bottom-8 left-4 sm:left-12 text-[#0C4651]/30 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute bottom-8 right-4 sm:right-12 text-[#0C4651]/30 font-mono text-xs select-none pointer-events-none">
        +
      </div>

      {/* Formas sólidas superiores (detrás del titular) */}
      <div
        className="hidden md:block absolute -top-10 left-8 lg:left-24 w-28 h-28 rounded-full bg-[#E6FF2A]/15 border border-[#E6FF2A]/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute top-20 left-16 w-3 h-3 rounded-full bg-[#E6FF2A] pointer-events-none"
        aria-hidden="true"
      />

      {/* Semicírculo sólido superior derecho */}
      <div
        className="absolute -top-6 right-6 sm:right-10 lg:right-28 w-20 sm:w-28 lg:w-32 h-10 sm:h-14 lg:h-16 rounded-b-full bg-[#0C4651] shadow-md shadow-[#0C4651]/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute top-20 right-20 w-3.5 h-3.5 rounded-full bg-[#E6FF2A] pointer-events-none"
        aria-hidden="true"
      />

      {/* Destellos sólidos '✦' que equilibran el fondo */}
      <span
        className="absolute right-6 sm:right-1/4 top-14 sm:top-16 text-[#0C4651] text-base sm:text-xl font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="hidden sm:block absolute left-1/4 top-16 text-[#E6FF2A] text-lg font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="absolute left-5 sm:left-10 bottom-14 sm:bottom-20 text-[#0C4651]/60 text-sm sm:text-base font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="hidden sm:block absolute right-12 bottom-20 text-[#E6FF2A] text-lg font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* ══════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL (COMPACTO Y AJUSTADO A VIEWPORT)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col items-center text-center relative z-10 my-0 sm:my-auto">
        {/* Etiqueta superior compacta */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C4651] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mb-1.5 sm:mb-3 shadow-xs border border-[#145C6A]"
        >
          <span className="w-4 h-4 rounded-full bg-[#E6FF2A] text-[#0C4651] font-black text-[10px] flex items-center justify-center font-mono leading-none shrink-0 select-none">
            K
          </span>
          <span>{lang === "es" ? "Estudio de Software & Web" : "Product & Web Studio"}</span>
          <span className="text-[#E6FF2A]">✦</span>
        </motion.div>

        {/* Titular Principal optimizado en tamaño */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hd font-bold text-[28px] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] leading-[1.15] sm:leading-[1.08] tracking-[-0.5px] sm:tracking-[-1.5px] max-w-[980px] text-[#0C4651] mx-auto"
        >
          <span>{lang === "es" ? "Somos " : "We are "}</span>
          <span className="inline-block relative text-[#0C4651] bg-[#E6FF2A] px-3 sm:px-5 py-0.5 rounded-xl sm:rounded-2xl shadow-sm -rotate-1 mx-1 font-black">
            Kano Dev,
          </span>
          <br />
          <span className="font-extrabold text-[#0C4651]">
            {lang === "es" ? "Desarrollo Web & Software" : "Digital Experience Studio"}
          </span>
        </motion.h1>

        {/* Subtítulo dinámico para dar vida y contexto */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xs sm:text-base text-slate-600 max-w-[540px] mx-auto mt-1 sm:mt-3 leading-relaxed font-normal"
        >
          {lang === "es"
            ? "Diseñamos y programamos plataformas web, tiendas online y sistemas a medida que impulsan tu negocio."
            : "We engineer high-impact web platforms, online stores, and bespoke software that scale your business."}
        </motion.p>

        {/* Social Proof Badges en Móvil */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex sm:hidden items-center justify-center gap-2 mt-1.5 mb-0"
        >
          <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1 rounded-full border border-slate-200 shadow-xs text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#E6FF2A] border border-[#0C4651]/30 animate-pulse" />
            <span className="font-bold text-[#0C4651]">100%</span>
            <span className="text-slate-500 font-medium">
              {lang === "es" ? "A Medida" : "Custom"}
            </span>
          </div>
          <div className="inline-flex items-center gap-1 bg-[#F8FAFC] px-3 py-1 rounded-full border border-slate-200 shadow-xs text-[11px]">
            <div className="flex items-center text-[#0C4651]">
              <Star className="w-3 h-3 fill-[#E6FF2A] text-[#0C4651]" />
            </div>
            <span className="font-bold text-[#0C4651]">5.0</span>
            <span className="text-slate-500 font-medium">
              {lang === "es" ? "(2 Años)" : "(2 Yrs)"}
            </span>
          </div>
        </motion.div>

        {/* ══════════ ZONA VISUAL CON ARCO ══════════ */}
        <div className="relative mt-1 sm:mt-6 w-full max-w-[1180px] flex justify-center items-end min-h-[215px] sm:min-h-[400px] lg:min-h-[440px]">
          {/* Capa 1: Gran arco sólido exterior */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[720px] md:w-[860px] lg:w-[1020px] h-[215px] sm:h-[310px] lg:h-[375px] bg-[#F4F8F9] rounded-t-full border-2 border-slate-200 pointer-events-none"
            aria-hidden="true"
          />

          {/* Capa 2: Arco con trazo verde petróleo */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[600px] md:w-[720px] lg:w-[850px] h-[190px] sm:h-[265px] lg:h-[315px] rounded-t-full border-2 border-[#0C4651]/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Formas sólidas circulares a los lados (Desktop) */}
          <div
            className="hidden lg:block absolute left-10 xl:left-14 top-4 w-16 h-16 rounded-full bg-[#E6FF2A] shadow-md shadow-[#E6FF2A]/20 pointer-events-none border border-[#0C4651]/15"
            aria-hidden="true"
          />
          <div
            className="hidden lg:block absolute right-12 xl:right-16 bottom-8 w-20 h-20 rounded-full bg-[#0C4651] shadow-md shadow-[#0C4651]/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* ══════════ BADGES Y TARJETAS FLOTANTES (DESKTOP) ══════════ */}
          {/* Tarjeta Izquierda 1: Cita Testimonial (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex flex-col gap-2 absolute left-2 lg:left-6 xl:left-8 top-2 z-20 max-w-[210px] lg:max-w-[240px] text-left bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-[0_10px_25px_rgba(12,70,81,0.06)]"
          >
            <div className="w-7 h-7 rounded-full bg-[#E6FF2A] text-[#0C4651] flex items-center justify-center font-bold">
              <Quote className="w-3.5 h-3.5 fill-[#0C4651]" />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed m-0 font-medium">
              {lang === "es"
                ? "El desarrollo web de Kano Dev aseguró el éxito y la velocidad de nuestra plataforma."
                : "Kano Dev's modern web development ensured our digital platform scaled smoothly."}
            </p>
          </motion.div>

          {/* Tarjeta Izquierda 2: Satisfacción y Calidad */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:flex flex-col text-left absolute left-4 lg:left-8 xl:left-12 bottom-5 z-20 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-[0_10px_25px_rgba(12,70,81,0.06)]"
          >
            <div className="hd text-xl sm:text-2xl font-bold text-[#0C4651] tracking-tight">
              100%
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
              {lang === "es" ? "Satisfacción Garantizada" : "Satisfaction Guaranteed"}
            </div>
          </motion.div>

          {/* Tarjeta Derecha: Experiencia & Estrellas */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden sm:flex flex-col items-end text-right absolute right-4 lg:right-8 xl:right-12 top-2 z-20 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-[0_10px_25px_rgba(12,70,81,0.06)]"
          >
            <div className="flex items-center gap-0.5 text-[#0C4651] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#E6FF2A] text-[#0C4651]" />
              ))}
            </div>
            <div className="hd text-lg sm:text-xl font-bold text-[#0C4651] tracking-tight">
              2 {lang === "es" ? "Años" : "Years"}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
              {lang === "es" ? "De Experiencia" : "Experience"}
            </div>
          </motion.div>

          {/* ══════════ CENTRO: EL GRAN ARCO VERDE PETRÓLEO & ILUSTRACIÓN ══════════ */}
          <div className="relative flex flex-col items-center justify-end z-10 w-full max-w-[850px] mx-auto">
            {/* Semicírculo Verde Petróleo de Fondo */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[420px] lg:w-[500px] h-[180px] sm:h-[240px] lg:h-[280px] bg-[#0C4651] rounded-t-full shadow-2xl shadow-[#0C4651]/30 z-0 overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Ilustración Hero en primer plano */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 w-[300px] sm:w-[540px] lg:w-[680px] xl:w-[740px] h-[200px] sm:h-[310px] lg:h-[380px] xl:h-[410px] -mb-1 flex items-end justify-center"
            >
              <Image
                src="/hero-main.webp"
                alt="Plataforma de desarrollo web y software moderno por Kano Dev"
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 540px, 740px"
                className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                priority
              />
            </motion.div>

            {/* Dual Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="relative z-30 -mt-1 sm:-mt-3 flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-[0_12px_28px_rgba(12,70,81,0.12)]"
            >
              <Link
                href="/projects"
                className="flex items-center gap-1.5 bg-[#E6FF2A] hover:bg-[#d8f219] text-[#0C4651] font-extrabold text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-[#E6FF2A]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono"
              >
                <span>{lang === "es" ? "Portafolio" : "Portfolio"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-[#0C4651] font-bold text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{lang === "es" ? "Cotizar" : "Hire Us"}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
