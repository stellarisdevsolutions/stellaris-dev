"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="relative w-full py-20 md:py-28 bg-[#0a0f1d] text-white overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px]" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3">
            {t.process.eyebrow}
          </span>
          <h2 className="font-michroma text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
            {t.process.titlePart1}
            <span className="text-amber-400">
              {t.process.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed font-normal">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4 Process Steps in Horizontal Grid with Yellow Number Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {t.process.steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col items-start text-left rounded-3xl border border-slate-800 bg-[#0d1324] p-7 shadow-xl hover:border-amber-400/50 transition-all group"
            >
              {/* Yellow Number Badge Circle (Exactly as in reference) */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-michroma font-black text-lg mb-6 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                {step.num}
              </div>

              <h3 className="font-michroma text-base font-bold text-white mb-3">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
