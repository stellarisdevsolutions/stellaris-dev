"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Sparkles, Layout, Smartphone, TrendingUp, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] lg:min-h-screen w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex items-center bg-[#0a0f1d] text-white"
    >
      {/* Background Subtle Gradient & Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Subtle dot matrix grid */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span>{t.hero.eyebrow}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-michroma text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] uppercase"
            >
              {t.hero.titlePart1}
              <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.35)]">
                {t.hero.titleHighlight}
              </span>
              {t.hero.titlePart2}
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full btn-amber-glow shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#proyectos"
                className="inline-flex items-center justify-center font-semibold text-xs sm:text-sm text-slate-200 hover:text-white px-6 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md transition-all active:scale-95"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>

            {/* Trust Mini-Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center gap-4 text-xs text-slate-400 font-medium"
            >
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>{t.hero.badgeLive}</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>100% Satisfacción</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Fidelity UI Mockup with Floating Smartphone */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[500px]"
            >
              {/* Glow Behind Mockup */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-indigo-500/10 to-transparent rounded-3xl blur-2xl opacity-70" />

              {/* Main Desktop Dashboard Window */}
              <div className="relative rounded-2xl border border-slate-800 bg-[#0d1324] p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
                {/* Window Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="h-5 px-3 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>stellaris.dev/preview</span>
                  </div>
                </div>

                {/* Yellow Highlight Banner on top of mockup */}
                <div className="h-6 w-full rounded-lg bg-amber-400/90 mb-4 flex items-center justify-between px-3">
                  <span className="text-[10px] font-extrabold text-slate-950 uppercase tracking-widest">
                    LIVE PRODUCTION • ACTIVE
                  </span>
                  <Sparkles className="h-3 w-3 text-slate-950 fill-slate-950" />
                </div>

                {/* Dashboard Mockup Grid */}
                <div className="space-y-3">
                  {/* Top Metric Bar */}
                  <div className="h-9 w-2/3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center px-3 justify-between">
                    <span className="text-[11px] font-medium text-slate-300">Conversion Rate</span>
                    <span className="text-xs font-bold text-amber-400">+24.8%</span>
                  </div>

                  {/* 2 Big Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-24 rounded-xl bg-[#090e1c] border border-slate-800 p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Visitas</span>
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">48,200</div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full w-3/4" />
                        </div>
                      </div>
                    </div>

                    <div className="h-24 rounded-xl bg-[#090e1c] border border-slate-800 p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Leads WhatsApp</span>
                        <CheckCircle className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">1,490</div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full w-4/5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lower Row: Table lines */}
                  <div className="rounded-xl bg-[#090e1c] border border-slate-800 p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-400" />
                        <span className="text-slate-300 font-medium">Next.js Speed Index</span>
                      </div>
                      <span className="text-emerald-400 font-bold">99/100</span>
                    </div>
                    <div className="h-1 w-full bg-slate-800/80 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Smartphone Mockup (Overlapping right bottom) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-36 sm:w-44 rounded-3xl border-2 border-slate-700 bg-[#090d18] p-2.5 shadow-2xl shadow-black/80"
              >
                {/* Phone Speaker/Island */}
                <div className="mx-auto h-3 w-14 rounded-full bg-slate-900 border border-slate-800 mb-2" />

                {/* Phone Screen Mockup */}
                <div className="rounded-2xl bg-[#0e1424] border border-slate-800 p-2 space-y-2">
                  <div className="h-4 w-full rounded bg-amber-400 flex items-center justify-center">
                    <span className="text-[8px] font-black text-slate-950 uppercase">ORDER SENT</span>
                  </div>
                  <div className="h-12 rounded-xl bg-slate-900 p-1.5 flex flex-col justify-between">
                    <div className="h-2 w-16 bg-slate-700 rounded-full" />
                    <div className="h-3 w-10 bg-amber-400/80 rounded" />
                  </div>
                  <div className="h-6 w-full rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[9px] font-bold text-emerald-400">
                    WhatsApp Connect ✓
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
