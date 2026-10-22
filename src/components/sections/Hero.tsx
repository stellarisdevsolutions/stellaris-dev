"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative w-full bg-white text-[#171717] pt-28 sm:pt-36 pb-20 sm:pb-24 overflow-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
        {/* Top "Hello!" Speech Bubble with little rays */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neutral-200 bg-white shadow-xs text-xs sm:text-[13px] font-semibold text-neutral-800 mb-4"
        >
          <span>{lang === "es" ? "¡Hola!" : "Hello!"}</span>
          <span className="text-sm">👋</span>
          {/* Subtle hand-drawn sparkle */}
          <span className="absolute -top-2.5 -right-2 text-[#FF532A] text-xs font-bold select-none">
            ✦
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hd font-bold text-4xl sm:text-6xl lg:text-[70px] leading-[1.08] tracking-[-1.5px] max-w-[850px] text-[#171717]"
        >
          {lang === "es" ? "Somos " : "We are "}
          <span className="text-[#FF532A]">Stellaris,</span>
          <br className="hidden sm:inline" />
          <span className="font-extrabold">
            {lang === "es" ? "Desarrollo Web & Software" : "Product & Web Studio"}
          </span>
        </motion.h1>

        {/* Hero Visual Area with Big Orange Arch & Floating Cards */}
        <div className="relative mt-8 sm:mt-12 w-full max-w-[880px] flex justify-center items-end">
          {/* Left Floating Card: Client Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="hidden lg:flex flex-col gap-2 absolute left-0 top-12 z-20 max-w-[220px] text-left bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="text-[#FF532A]">
              <Quote className="w-5 h-5 fill-[#FF532A]" />
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed m-0 font-medium">
              {lang === "es"
                ? "El desarrollo web de Stellaris aseguró el éxito y la velocidad de nuestra tienda online."
                : "Stellaris' modern web development ensured our online store scaled smoothly."}
            </p>
          </motion.div>

          {/* Left Floating Card: Project Count */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="hidden sm:flex flex-col text-left absolute left-2 lg:left-6 bottom-10 z-20 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="hd text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
              450+
            </div>
            <div className="text-[12px] sm:text-[13px] text-neutral-500 font-medium">
              {lang === "es" ? "Clientes Atendidos" : "Clients Served"}
            </div>
          </motion.div>

          {/* Right Floating Card: Rating & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden sm:flex flex-col items-end text-right absolute right-2 lg:right-6 top-14 z-20 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center gap-1 text-[#FF532A] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#FF532A]" />
              ))}
            </div>
            <div className="hd text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
              10 {lang === "es" ? "Años" : "Years"}
            </div>
            <div className="text-[12px] sm:text-[13px] text-neutral-500 font-medium">
              {lang === "es" ? "De Experiencia" : "Experts"}
            </div>
          </motion.div>

          {/* Center Orange Semicircle Arch Backdrop */}
          <div className="relative flex flex-col items-center justify-end">
            <div className="w-[300px] sm:w-[420px] lg:w-[460px] h-[240px] sm:h-[310px] lg:h-[340px] bg-[#FF532A] rounded-t-full relative flex items-end justify-center overflow-hidden shadow-2xl shadow-[#FF532A]/30">
              {/* Inner ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />

              {/* Robot / Character Illustration Cutout emerging from arch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 w-[240px] sm:w-[320px] lg:w-[360px] h-[260px] sm:h-[340px] lg:h-[380px] -mb-2"
              >
                <Image
                  src="/robot.png"
                  alt="Stellaris Dev Robot"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 360px"
                  priority
                />
              </motion.div>
            </div>

            {/* Overlapping Dual Action Buttons pinned at bottom center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-30 -mt-6 sm:-mt-7 flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-neutral-200/80 shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
            >
              <Link
                href="#proyectos"
                className="flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-xs sm:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md shadow-[#FF532A]/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>{lang === "es" ? "Portafolio" : "Portfolio"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contacto"
                className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 text-[#171717] font-semibold text-xs sm:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-neutral-200 shadow-xs transition-all hover:scale-105 active:scale-95"
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