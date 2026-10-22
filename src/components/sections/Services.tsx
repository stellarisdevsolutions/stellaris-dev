"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Layout, Globe, ShoppingBag, CheckCircle2, Clock, Sparkles, TrendingUp, Headphones, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const SERVICE_ICONS = [
  <Layout key="layout" className="h-6 w-6 text-amber-400" />,
  <Globe key="globe" className="h-6 w-6 text-amber-400" />,
  <ShoppingBag key="shop" className="h-6 w-6 text-amber-400" />,
];

const WHY_US_ICONS = [
  <Clock key="clock" className="h-5 w-5 text-amber-400" />,
  <Sparkles key="sparkles" className="h-5 w-5 text-amber-400" />,
  <TrendingUp key="trending" className="h-5 w-5 text-amber-400" />,
  <Headphones key="support" className="h-5 w-5 text-amber-400" />,
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="relative w-full py-20 md:py-28 bg-[#f8fafc] text-slate-900 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
            {t.services.eyebrow}
          </span>
          <h2 className="font-michroma text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 uppercase leading-tight">
            {t.services.titlePart1}
            <span className="highlight-pill ml-1">
              {t.services.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {t.services.subtitle}
          </p>
        </div>

        {/* 3 White Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {t.services.items.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300"
            >
              <div>
                {/* Dark Circle Icon Container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a0f1d] border border-slate-800 shadow-md mb-6 group-hover:scale-105 transition-transform">
                  {SERVICE_ICONS[idx]}
                </div>

                <h3 className="font-michroma text-lg sm:text-xl font-bold text-slate-950 mb-3 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-amber-600 transition-colors"
                >
                  <span>Cotizar este servicio</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Dark Card: "Por qué elegir Stellaris Dev" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-slate-800 bg-[#0a0f1d] p-8 sm:p-12 shadow-2xl text-white overflow-hidden"
        >
          {/* Subtle Ambient Light Glow inside the card */}
          <div className="pointer-events-none absolute -top-24 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 mb-10 text-left">
            <h3 className="font-michroma text-2xl sm:text-3xl font-bold tracking-tight uppercase">
              {t.whyUs.titlePart1}
              <span className="text-amber-400">{t.whyUs.titleHighlight}</span>
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              {t.whyUs.subtitle}
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyUs.pillars.map((pillar, idx) => (
              <div key={pillar.title} className="flex flex-col items-start text-left">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/30 mb-4">
                  {WHY_US_ICONS[idx]}
                </div>
                <h4 className="font-michroma text-sm font-bold text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
