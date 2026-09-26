"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoReady(true);
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[560px] sm:min-h-[750px] sm:h-[100dvh] max-h-[900px] w-full pt-24 pb-12 sm:pt-36 sm:pb-24 overflow-hidden flex items-center bg-[#07090e]"
    >
      {/* Background Visual Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-[#07090e]">
        {/* Layer 1: Instant Fallback Image */}
        <Image
          src="/hero.webp"
          alt="Stellaris Dev Hero Background"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-[80%_center] sm:object-[68%_center] lg:object-[65%_center] transition-opacity duration-1000 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Layer 2: Seamless Background Video with smooth fade-in */}
        <video
          ref={videoRef}
          src="/hero.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[80%_center] sm:object-[68%_center] lg:object-[65%_center] transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Shadow Mask: Full dark veil on mobile for perfect readability, smooth left-gradient on desktop */}
        <div className="absolute inset-0 bg-[#07090e]/75 sm:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/50 via-transparent to-[#07090e] sm:bg-gradient-to-r sm:from-[#07090e] sm:via-[#07090e]/95 sm:via-35% md:sm:via-42% sm:to-transparent sm:to-70% lg:sm:to-65%" />
        {/* Top and Bottom soft fades */}
        <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-[#07090e] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-t from-[#07090e] to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
          {/* Minimalist Line & Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="h-[1px] w-8 bg-gradient-to-r from-cyan-400 to-cyan-400/20" />
            </div>
            <span className="font-michroma text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          {/* Heading with Michroma and Cyan Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] sm:leading-[1.25]"
          >
            {t.hero.titlePart1}
            <span className="text-gradient-cyan">{t.hero.titlePart2}</span>
            {t.hero.titlePart3}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs in Cyan Brand Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full btn-cyan-glow transition-all duration-300 active:scale-95 shadow-lg shadow-cyan-500/25"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#servicios"
              className="inline-flex items-center justify-center font-medium text-xs sm:text-sm text-slate-300 hover:text-cyan-300 px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 hover:border-cyan-500/40 backdrop-blur-md transition-all active:scale-95"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
