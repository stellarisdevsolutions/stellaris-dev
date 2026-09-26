"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TechDeco } from "@/components/ui/TechDeco";
import {
  PhoneCall,
  Paintbrush,
  Zap,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { t } = useLanguage();

  const stepIcons = [
    <PhoneCall key="phone" className="h-5 w-5 text-cyan-400" />,
    <Paintbrush key="brush" className="h-5 w-5 text-indigo-400" />,
    <Zap key="zap" className="h-5 w-5 text-cyan-400" />,
    <Rocket key="rocket" className="h-5 w-5 text-emerald-400" />,
  ];

  return (
    <section
      id="proceso"
      className="relative w-full py-20 md:py-28 bg-[#07090e] text-slate-100 overflow-hidden"
    >
      {/* Tech Geometric HUD Vectors & 3x3 Dots */}
      <TechDeco theme="dark" />

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full" />

      <Container className="relative z-10">
        {/* Eyebrow & Headline */}
        <div className="max-w-3xl flex flex-col items-start text-left mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="h-[1px] w-6 bg-cyan-400" />
            </div>
            <span className="font-michroma text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              {t.process.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase leading-[1.25]"
          >
            {t.process.titlePart1}
            <span className="text-gradient-cyan">{t.process.titlePart2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal"
          >
            {t.process.subtitle}
          </motion.p>
        </div>

        {/* Continuous Vertical Trust Bar */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical Connector Line */}
          <div className="absolute top-6 bottom-6 left-5 md:left-7 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-emerald-500 shadow-[0_0_12px_rgba(0,240,255,0.4)] z-0" />

          <div className="flex flex-col gap-6 md:gap-7 relative z-10">
            {t.process.steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative flex items-start gap-4 md:gap-6"
              >
                {/* Node */}
                <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0d1322] border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300">
                  <span className="font-michroma text-base md:text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-slate-800/80 bg-[#0d121f]/90 p-5 sm:p-6 shadow-lg backdrop-blur-xl group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                        {stepIcons[idx] || <PhoneCall className="h-5 w-5 text-cyan-400" />}
                      </div>
                      <h3 className="font-michroma text-sm sm:text-base font-bold text-white">
                        {step.stepNumber}. {step.title}
                      </h3>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800/70">
                    {step.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-3xl border border-cyan-500/30 bg-[#0c1424] p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto"
        >
          <div className="text-left">
            <h4 className="font-michroma text-base sm:text-lg font-bold text-white mb-1">
              {t.process.bottomCardTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.process.bottomCardSubtitle}
            </p>
          </div>

          <Link
            href="#contacto"
            className="inline-flex shrink-0 items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full btn-cyan-glow active:scale-95 transition-all w-full sm:w-auto text-center"
          >
            <span>{t.process.bottomCardCta}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
