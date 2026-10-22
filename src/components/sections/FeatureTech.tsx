"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, Sparkles, Cpu, Zap, Shield, Server, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureTech() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#0a0f1d] text-white overflow-hidden">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px]" />

      <Container>
        <div className="rounded-3xl border border-slate-800 bg-[#0d1324] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-3">
                {t.featureTech.eyebrow}
              </span>

              <h2 className="font-michroma text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
                {t.featureTech.titlePart1}
                <span className="text-amber-400">
                  {t.featureTech.titleHighlight}
                </span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {t.featureTech.description}
              </p>

              {/* Bullets List */}
              <div className="mt-8 space-y-3 w-full">
                {t.featureTech.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Central Node Interactive Visual (Exactly matching reference) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                {/* Radial Connection Rings */}
                <div className="absolute inset-4 rounded-full border border-slate-800/80 animate-pulse-slow" />
                <div className="absolute inset-14 rounded-full border border-slate-800/60" />
                <div className="absolute inset-24 rounded-full border border-amber-400/20" />

                {/* Satellite Nodes */}
                {/* Top Node */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-700 px-3 py-1 shadow-lg text-[10px] font-mono text-slate-300"
                >
                  <Cpu className="h-3 w-3 text-amber-400" />
                  <span>Next.js 16</span>
                </motion.div>

                {/* Top Right Star */}
                <div className="absolute top-12 right-10">
                  <Sparkles className="h-4 w-4 text-amber-400/80 animate-spin" style={{ animationDuration: "12s" }} />
                </div>

                {/* Right Node */}
                <motion.div
                  animate={{ x: [3, -3, 3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-700 px-3 py-1 shadow-lg text-[10px] font-mono text-slate-300"
                >
                  <Zap className="h-3 w-3 text-emerald-400" />
                  <span>Turbopack</span>
                </motion.div>

                {/* Bottom Right Node */}
                <div className="absolute bottom-6 right-8">
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                </div>

                {/* Bottom Node */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-700 px-3 py-1 shadow-lg text-[10px] font-mono text-slate-300"
                >
                  <Shield className="h-3 w-3 text-indigo-400" />
                  <span>SSL Security</span>
                </motion.div>

                {/* Left Node */}
                <motion.div
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-700 px-3 py-1 shadow-lg text-[10px] font-mono text-slate-300"
                >
                  <Rocket className="h-3 w-3 text-amber-400" />
                  <span>100% SEO</span>
                </motion.div>

                {/* Center "AI" Core Node with Golden Glow */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex flex-col items-center justify-center h-28 w-28 rounded-3xl bg-gradient-to-br from-[#121b33] to-[#090e1c] border-2 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.35)]"
                >
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400" />
                  <span className="font-michroma text-2xl font-black text-amber-400 tracking-wider">
                    AI
                  </span>
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
                    POWERED
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
