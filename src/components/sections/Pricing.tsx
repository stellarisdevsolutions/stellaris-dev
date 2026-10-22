"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="precios" className="relative w-full py-20 md:py-28 bg-[#f8fafc] text-slate-900 overflow-hidden border-b border-slate-200/80">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
            {t.pricing.eyebrow}
          </span>
          <h2 className="font-michroma text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 uppercase leading-tight">
            {t.pricing.titlePart1}
            <span className="highlight-pill ml-1">
              {t.pricing.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* 3 Pricing Cards Grid (Center card highlighted in dark exactly as reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {t.pricing.plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-amber-400 bg-[#0a0f1d] text-white shadow-2xl shadow-amber-500/10 lg:-translate-y-2"
                  : "border border-slate-200/90 bg-white text-slate-900 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-slate-950 px-4 py-1 text-[11px] font-black uppercase tracking-wider shadow-md">
                    <Sparkles className="h-3 w-3 fill-slate-950" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-michroma text-xl font-bold mb-2">
                  {plan.name}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 ${plan.popular ? "text-slate-400" : "text-slate-600"}`}>
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className={`mb-6 p-4 rounded-2xl border ${
                  plan.popular ? "bg-[#060a14] border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.pricing.from}
                    </span>
                    <span className={`font-michroma text-4xl font-black ${
                      plan.popular ? "text-amber-400" : "text-slate-950"
                    }`}>
                      ${plan.price}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {t.pricing.currency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pago único • Sin mensualidades
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${
                        plan.popular ? "text-amber-400" : "text-amber-600"
                      }`} />
                      <span className={plan.popular ? "text-slate-300" : "text-slate-700 font-medium"}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-200/40">
                <Link
                  href="#contacto"
                  className={`inline-flex w-full items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all duration-300 text-center ${
                    plan.popular
                      ? "btn-amber-glow"
                      : "bg-[#0a0f1d] hover:bg-slate-800 text-white shadow-md active:scale-95"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Yellow Custom Project Banner (Exactly matching reference) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-amber-400 text-slate-950 p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left max-w-2xl">
            <h4 className="font-michroma text-lg sm:text-xl font-black mb-1.5 uppercase">
              {t.pricing.bannerTitle}
            </h4>
            <p className="text-xs sm:text-sm font-medium text-slate-900">
              {t.pricing.bannerSubtitle}
            </p>
          </div>

          <Link
            href="#contacto"
            className="inline-flex shrink-0 items-center justify-center gap-2 font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full bg-[#0a0f1d] text-white hover:bg-slate-900 shadow-xl active:scale-95 transition-all text-center"
          >
            <span>{t.pricing.bannerCta}</span>
            <ArrowRight className="h-4 w-4 text-amber-400" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
