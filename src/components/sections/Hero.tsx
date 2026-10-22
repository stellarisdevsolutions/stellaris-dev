"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative w-full bg-[#0B1020] text-[#E8ECF8] rounded-b-[48px] sm:rounded-b-[64px] pt-32 sm:pt-36 pb-24 sm:pb-28 overflow-hidden shadow-2xl shadow-[#0B1020]/25"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-7">
            {/* Tag capsule */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center border border-[#2A3560] rounded-full px-4 py-2 text-[13px] text-[#A9B3CF]"
            >
              Desarrollo web a medida
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hd font-bold text-4xl sm:text-5xl lg:text-[62px] leading-[1.05] tracking-[-1.5px] text-[#E8ECF8]"
            >
              {t.hero.titlePart1}
              <span className="text-[#FFC857]">{t.hero.titleHighlight}</span>
              {t.hero.titlePart2}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#A9B3CF] leading-[1.6] max-w-[520px] font-normal"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link
                href="#contacto"
                className="btn-accent px-7 py-4 text-[15px] font-medium"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href="#proyectos"
                className="btn-outline-dark px-7 py-4 text-[15px] font-medium"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Exact Visual Mockup from Design Reference */}
          <div className="lg:col-span-5 relative min-h-[380px] w-full flex items-center justify-center">
            {/* Background Constellation Lines & Stars SVG */}
            <svg
              viewBox="0 0 480 400"
              width="100%"
              className="max-w-[480px] absolute inset-0 m-auto select-none pointer-events-none"
              aria-hidden="true"
            >
              <g stroke="#2A3560" strokeWidth="1.2" fill="none">
                <path d="M30 60L150 20L270 60L400 15L460 90" />
                <path d="M40 360L180 385L320 350L450 380" />
              </g>
              <g fill="#FFC857">
                <circle cx="30" cy="60" r="4" />
                <circle cx="150" cy="20" r="3" />
                <circle cx="270" cy="60" r="5" />
                <circle cx="400" cy="15" r="3" />
                <circle cx="460" cy="90" r="4" />
              </g>
              <g fill="#8FA2FF">
                <circle cx="40" cy="360" r="3" />
                <circle cx="180" cy="385" r="4" />
                <circle cx="320" cy="350" r="3" />
                <circle cx="450" cy="380" r="5" />
              </g>
            </svg>

            {/* Desktop Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dk relative mr-10 mt-10 rounded-[20px] p-[18px] w-full max-w-[360px] sm:max-w-[390px] shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            >
              {/* Window dots */}
              <div className="flex gap-[7px] mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3A4678]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3A4678]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3A4678]" />
              </div>
              {/* Accent Banner Bar */}
              <div className="h-3.5 w-[70%] rounded-[7px] bg-[#FFC857] mb-3" />
              <div className="h-2.5 w-[90%] rounded-[5px] bg-[#2A3560] mb-2" />
              <div className="h-2.5 w-[60%] rounded-[5px] bg-[#2A3560] mb-4" />
              {/* Purple/Blue Pill Button */}
              <div className="h-7 w-[100px] rounded-full bg-[#8FA2FF] mb-5" />
              {/* 3 Grid Mini Cards */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="h-[70px] rounded-xl bg-[#1B2547]" />
                <div className="h-[70px] rounded-xl bg-[#1B2547]" />
                <div className="h-[70px] rounded-xl bg-[#1B2547]" />
              </div>
            </motion.div>

            {/* Overlapping Mobile Phone Screen */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 sm:right-2 -bottom-8 w-[120px] h-[210px] rounded-[26px] bg-[#0B1020] border-2 border-[#3A4678] p-3.5 box-border shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="h-2.5 w-[60%] rounded-[5px] bg-[#FFC857] my-2.5" />
              <div className="h-[7px] rounded-[4px] bg-[#2A3560] mb-[7px]" />
              <div className="h-[7px] w-[70%] rounded-[4px] bg-[#2A3560] mb-4" />
              <div className="h-[60px] rounded-[10px] bg-[#1B2547]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
