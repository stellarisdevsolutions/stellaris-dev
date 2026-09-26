"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TechDeco } from "@/components/ui/TechDeco";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layout,
  Globe,
  ShoppingBag,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
  const { t } = useLanguage();

  const planIcons: Record<string, React.ReactNode> = {
    "landing-page": <Layout className="h-6 w-6 text-cyan-400" />,
    "sitio-web-completo": <Globe className="h-6 w-6 text-cyan-300" />,
    "tienda-ecommerce": <ShoppingBag className="h-6 w-6 text-emerald-400" />,
  };

  return (
    <section
      id="servicios"
      className="relative w-full py-24 md:py-32 bg-[#e5e9ef] text-slate-900 overflow-hidden"
    >
      {/* Tech Geometric HUD Vectors & 3x3 Dots */}
      <TechDeco theme="light" />

      {/* Subtle Ambient Light Glows */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-200/50 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-0 w-[500px] h-[500px] bg-indigo-200/40 blur-[140px] rounded-full" />

      <Container className="relative z-10">
        {/* Eyebrow & Headline */}
        <div className="max-w-3xl flex flex-col items-start text-left mb-16 md:mb-20">
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
              <span className="h-[1px] w-8 bg-gradient-to-r from-cyan-600 to-cyan-600/20" />
            </div>
            <span className="font-michroma text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-cyan-700 uppercase">
              {t.services.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 uppercase leading-[1.2] sm:leading-[1.25]"
          >
            {t.services.titlePart1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600">
              {t.services.titlePart2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* 3 Dark Plan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {t.services.plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-cyan-400 bg-[#0a0f1d] shadow-[0_15px_45px_rgba(0,240,255,0.25)] lg:-translate-y-2"
                  : "border border-slate-800 bg-[#0d121f] shadow-2xl hover:border-cyan-500/50"
              }`}
            >
              {/* Popular Tag on Top */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header: Icon & Plan Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                    {planIcons[plan.id] || <Globe className="h-6 w-6 text-cyan-400" />}
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider ${plan.badgeColor}`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Plan Title & Tagline */}
                <h3 className="font-michroma text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-[#060911] border border-slate-800/90">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      {t.services.from}
                    </span>
                    <span className="font-michroma text-3xl sm:text-4xl font-extrabold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-xs font-semibold text-cyan-400">
                      {t.services.currency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t.services.pricingTagline}
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.services.includesTitle}
                  </p>
                  {plan.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-800/90">
                <Link
                  href={plan.ctaLink}
                  className={`inline-flex w-full items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-full transition-all duration-300 active:scale-95 text-center ${
                    plan.popular
                      ? "btn-cyan-glow"
                      : "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-cyan-400/60"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Project Banner (Dark on Light) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0d121f] p-8 md:p-10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-michroma text-base sm:text-lg font-bold text-white mb-1">
                {t.services.customBannerTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.services.customBannerSubtitle}
              </p>
            </div>
          </div>

          <Link
            href="#contacto"
            className="inline-flex shrink-0 items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all w-full sm:w-auto text-center"
          >
            <span>{t.services.customBannerCta}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
