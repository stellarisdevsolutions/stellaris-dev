"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, Smartphone, Laptop, Tablet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureMobile() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#f8fafc] text-slate-900 overflow-hidden border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Responsive Devices Mockup (Laptop + Tablet + Smartphone) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[460px]"
            >
              {/* Laptop Shell */}
              <div className="rounded-2xl border border-slate-300 bg-[#0a0f1d] p-3 shadow-xl">
                {/* Screen Top Bar */}
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800">
                  <div className="h-2 w-2 rounded-full bg-slate-700" />
                  <div className="h-2 w-2 rounded-full bg-slate-700" />
                  <div className="h-2 w-2 rounded-full bg-slate-700" />
                </div>
                {/* Screen Content */}
                <div className="space-y-2">
                  <div className="h-5 w-full rounded bg-amber-400 flex items-center px-2">
                    <span className="text-[8px] font-bold text-slate-950">RESPONSIVE WORKSPACE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 rounded bg-[#11192e] border border-slate-800" />
                    <div className="h-16 rounded bg-[#11192e] border border-slate-800 col-span-2" />
                  </div>
                </div>
              </div>
              {/* Laptop Base Stand */}
              <div className="mx-auto h-2 w-48 rounded-b-lg bg-slate-400 shadow-md" />

              {/* Overlapping Smartphone on Right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-2 sm:-right-4 w-28 sm:w-32 rounded-2xl border-2 border-slate-700 bg-[#0a0f1d] p-1.5 shadow-2xl shadow-black/60"
              >
                <div className="h-2 w-8 mx-auto rounded-full bg-slate-800 mb-1.5" />
                <div className="rounded-xl bg-[#11192e] p-1.5 space-y-1.5">
                  <div className="h-3 w-full rounded bg-amber-400" />
                  <div className="h-8 rounded bg-slate-800" />
                  <div className="h-4 w-full rounded bg-emerald-500/20 text-[7px] text-emerald-400 font-bold flex items-center justify-center">
                    Touch Ready
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
              {t.featureMobile.eyebrow}
            </span>

            <h2 className="font-michroma text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-950 uppercase leading-tight">
              {t.featureMobile.titlePart1}
              <span className="highlight-pill ml-1">
                {t.featureMobile.titleHighlight}
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.featureMobile.description}
            </p>

            <div className="mt-8 space-y-3 w-full">
              {t.featureMobile.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
