"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TechDeco } from "@/components/ui/TechDeco";
import {
  Bot,
  Smartphone,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { t } = useLanguage();

  const highlightIcons = [
    <Bot key="bot" className="h-5 w-5 text-cyan-600" />,
    <Smartphone key="phone" className="h-5 w-5 text-indigo-600" />,
    <MessageCircle key="msg" className="h-5 w-5 text-emerald-600" />,
  ];

  return (
    <section
      id="nosotros"
      className="relative w-full py-16 md:py-24 bg-[#e5e9ef] text-slate-900 overflow-hidden"
    >
      {/* Tech Geometric Vectors, 3x3 Dots & HUD Brackets */}
      <TechDeco theme="light" />

      {/* Soft atmospheric ambient light */}
      <div className="pointer-events-none absolute top-1/3 -right-20 w-96 h-96 bg-cyan-200/50 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 -left-20 w-96 h-96 bg-indigo-200/40 blur-[120px] rounded-full" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Story & Trust Badges */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-600 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
                </span>
                <span className="h-[1px] w-6 bg-cyan-600" />
              </div>
              <span className="font-michroma text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-cyan-700 uppercase">
                {t.about.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-michroma text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 uppercase leading-[1.25]"
            >
              {t.about.titlePart1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-700 to-indigo-600">
                {t.about.titlePart2}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              {t.about.description}
            </motion.p>

            {/* CTAs & Trust Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-col gap-5 w-full"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider text-white px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 shadow-lg shadow-slate-950/15 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>{t.about.cta}</span>
                  <ArrowRight className="h-4 w-4 text-cyan-400" />
                </Link>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-4 border-t border-slate-300/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0" />
                  <span>{t.about.badge1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>{t.about.badge2}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Numbered Feature Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {t.about.highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group relative flex items-start gap-4 rounded-2xl border border-slate-300/80 bg-white/95 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300"
              >
                {/* Icon Container with subtle glow */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-cyan-50 border border-slate-200 group-hover:border-cyan-200 transition-colors shadow-xs">
                  {highlightIcons[idx] || <Bot className="h-5 w-5 text-cyan-600" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-michroma text-xs sm:text-sm font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
