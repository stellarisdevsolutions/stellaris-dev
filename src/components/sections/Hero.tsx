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
      className="relative w-full bg-white text-[#171717] pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden flex flex-col justify-center min-h-[calc(100vh-20px)] max-h-[960px]"
    >
      {/* ══════════════════════════════════════════════════════════════════
          FORMAS SÓLIDAS EN EL FONDO (INTEGRADAS EN TODO EL HERO)
          ══════════════════════════════════════════════════════════════════ */}

      {/* Crosshairs arquitectónicos en las esquinas */}
      <div className="absolute top-20 left-6 sm:left-12 text-[#FF532A]/50 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute top-20 right-6 sm:right-12 text-[#FF532A]/50 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute bottom-8 left-6 sm:left-12 text-[#FF532A]/50 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute bottom-8 right-6 sm:right-12 text-[#FF532A]/50 font-mono text-xs select-none pointer-events-none">
        +
      </div>

      {/* Formas sólidas superiores (detrás del titular) */}
      <div
        className="hidden md:block absolute -top-10 left-8 lg:left-24 w-28 h-28 rounded-full bg-[#FF532A]/10 border-2 border-[#FF532A]/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute top-20 left-16 w-3 h-3 rounded-full bg-[#FF532A] pointer-events-none"
        aria-hidden="true"
      />

      {/* Semicírculo sólido superior derecho */}
      <div
        className="hidden md:block absolute -top-6 right-8 lg:right-28 w-32 h-16 rounded-b-full bg-[#FF532A] shadow-md shadow-[#FF532A]/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute top-20 right-20 w-3.5 h-3.5 rounded-full bg-[#171717] pointer-events-none"
        aria-hidden="true"
      />

      {/* Destellos sólidos '✦' que equilibran el fondo */}
      <span
        className="hidden lg:block absolute left-1/4 top-16 text-[#FF532A] text-lg font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="hidden lg:block absolute right-1/4 top-14 text-[#FF532A] text-xl font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="hidden sm:block absolute left-10 bottom-20 text-[#FF532A] text-base font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="hidden sm:block absolute right-12 bottom-20 text-[#FF532A] text-lg font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* ══════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL (COMPACTO Y AJUSTADO A VIEWPORT)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col items-center text-center relative z-10 my-auto">
        {/* Etiqueta superior compacta */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#171717] text-white text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF532A]" />
          <span>{lang === "es" ? "Estudio de Software & Web" : "Product & Web Studio"}</span>
          <span className="text-[#FF532A]">✦</span>
        </motion.div>

        {/* Titular Principal optimizado en tamaño */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hd font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] leading-[1.08] tracking-[-1.5px] max-w-[980px] text-[#171717] mx-auto"
        >
          {lang === "es" ? "Somos " : "We are "}
          <span className="inline-block relative text-white bg-[#FF532A] px-3.5 sm:px-5 py-0.5 rounded-xl sm:rounded-2xl shadow-md shadow-[#FF532A]/25 -rotate-1 mx-1">
            Stellaris,
          </span>
          <br className="hidden sm:inline" />
          <span className="font-extrabold text-[#171717]">
            {lang === "es" ? "Desarrollo Web & Software" : "Digital Experience Studio"}
          </span>
        </motion.h1>

        {/* ══════════ ZONA VISUAL CON ARCO MÁS GRANDE Y PROTAGÓNICO ══════════ */}
        <div className="relative mt-4 sm:mt-6 w-full max-w-[1180px] flex justify-center items-end min-h-[330px] sm:min-h-[400px] lg:min-h-[440px]">
          {/* Capa 1: Gran arco sólido exterior */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[660px] sm:w-[860px] lg:w-[1020px] h-[255px] sm:h-[335px] lg:h-[375px] bg-[#F7F7FA] rounded-t-full border-2 border-neutral-200/90 pointer-events-none"
            aria-hidden="true"
          />

          {/* Capa 2: Arco con trazo naranja geométrico sólido */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[540px] sm:w-[720px] lg:w-[850px] h-[215px] sm:h-[285px] lg:h-[315px] rounded-t-full border-2 border-[#FF532A]/40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Formas sólidas circulares naranja a los lados */}
          <div
            className="hidden lg:block absolute left-10 xl:left-14 top-4 w-16 h-16 rounded-full bg-[#FF532A] shadow-md shadow-[#FF532A]/20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="hidden lg:block absolute right-12 xl:right-16 bottom-8 w-20 h-20 rounded-full bg-[#FF532A] shadow-md shadow-[#FF532A]/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* ══════════ TARJETAS FLOTANTES LIMPIAS (PROPORCIONALES) ══════════ */}
          {/* Tarjeta Izquierda 1: Cita Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex flex-col gap-2 absolute left-2 lg:left-6 xl:left-8 top-2 z-20 max-w-[210px] lg:max-w-[240px] text-left bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-neutral-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
          >
            <div className="w-7 h-7 rounded-full bg-[#FF532A]/10 text-[#FF532A] flex items-center justify-center">
              <Quote className="w-3.5 h-3.5 fill-[#FF532A]" />
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed m-0 font-medium">
              {lang === "es"
                ? "El desarrollo web de Stellaris aseguró el éxito y la velocidad de nuestra tienda online."
                : "Stellaris' modern web development ensured our online store scaled smoothly."}
            </p>
          </motion.div>

          {/* Tarjeta Izquierda 2: Contador de Proyectos */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:flex flex-col text-left absolute left-4 lg:left-8 xl:left-12 bottom-5 z-20 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
          >
            <div className="hd text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
              450+
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">
              {lang === "es" ? "Clientes Atendidos" : "Clients Served"}
            </div>
          </motion.div>

          {/* Tarjeta Derecha: Experiencia & Estrellas */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden sm:flex flex-col items-end text-right absolute right-4 lg:right-8 xl:right-12 top-2 z-20 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-0.5 text-[#FF532A] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#FF532A]" />
              ))}
            </div>
            <div className="hd text-lg sm:text-xl font-bold text-[#171717] tracking-tight">
              10 {lang === "es" ? "Años" : "Years"}
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">
              {lang === "es" ? "De Experiencia" : "Experts"}
            </div>
          </motion.div>

          {/* ══════════ CENTRO: EL GRAN ARCO NARANJA SOLAR (MÁS GRANDE) & ROBOT ══════════ */}
          <div className="relative flex flex-col items-center justify-end z-10">
            {/* Center Orange Semicircle Arch Backdrop (AMPLIADO) */}
            <div className="w-[320px] sm:w-[420px] lg:w-[480px] h-[235px] sm:h-[300px] lg:h-[335px] bg-[#FF532A] rounded-t-full relative flex items-end justify-center overflow-hidden shadow-2xl shadow-[#FF532A]/30">
              {/* Inner subtle depth gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />

              {/* Robot Character emerging from arch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 w-[250px] sm:w-[330px] lg:w-[370px] h-[255px] sm:h-[330px] lg:h-[370px] -mb-1.5"
              >
                <Image
                  src="/robot.png"
                  alt="Stellaris Dev Robot"
                  fill
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 330px, 370px"
                  className="object-contain object-bottom drop-shadow-[0_20px_32px_rgba(0,0,0,0.32)]"
                  priority
                />
              </motion.div>
            </div>

            {/* Overlapping Dual Action Buttons pinned at bottom center */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="relative z-30 -mt-5 sm:-mt-6 flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-neutral-200/80 shadow-[0_12px_28px_rgba(0,0,0,0.1)]"
            >
              <Link
                href="/projects"
                className="flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-[#FF532A]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{lang === "es" ? "Portafolio" : "Portfolio"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 text-[#171717] font-semibold text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-neutral-200 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
