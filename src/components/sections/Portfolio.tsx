"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="relative w-full py-20 md:py-28 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
            {t.portfolio.eyebrow}
          </span>
          <h2 className="font-michroma text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 uppercase leading-tight">
            {t.portfolio.titlePart1}
            <span className="highlight-pill ml-1">
              {t.portfolio.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Project 1: Creative Agency Dark UI with Yellow Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300"
          >
            <div>
              {/* Visual Mockup 1 */}
              <div className="h-44 w-full rounded-2xl bg-[#0a0f1d] border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner mb-5 group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500" />
                    <div className="h-2 w-2 rounded-full bg-amber-400" />
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">agency.live</span>
                </div>
                {/* Yellow Bar Banner */}
                <div className="h-4 w-full rounded bg-amber-400 flex items-center px-2">
                  <span className="text-[7px] font-extrabold text-slate-950 uppercase">CREATIVE PORTFOLIO 2026</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-8 rounded-lg bg-slate-800/80 p-1.5 flex items-center justify-between">
                    <div className="h-2 w-16 bg-slate-600 rounded" />
                    <div className="h-3 w-8 bg-amber-400 rounded" />
                  </div>
                  <div className="h-2 w-3/4 bg-slate-800 rounded" />
                </div>
              </div>

              <span className="inline-block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                {t.portfolio.projects[0].category}
              </span>
              <h3 className="font-michroma text-base font-bold text-slate-950 mb-2 group-hover:text-amber-600 transition-colors">
                {t.portfolio.projects[0].title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.portfolio.projects[0].tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {t.portfolio.projects[0].metric}
              </span>
              <Link href="#contacto" className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Project 2: SaaS Minimalist Modular Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300"
          >
            <div>
              {/* Visual Mockup 2 */}
              <div className="h-44 w-full rounded-2xl bg-[#0a0f1d] border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner mb-5 group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-700" />
                    <div className="h-2 w-2 rounded-full bg-slate-700" />
                    <div className="h-2 w-2 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">nexus.app</span>
                </div>
                {/* 2x2 Geometric Bento Layout */}
                <div className="grid grid-cols-2 gap-2 my-auto">
                  <div className="h-10 rounded-lg bg-amber-400 p-1.5 flex flex-col justify-end">
                    <span className="text-[8px] font-bold text-slate-950">Analytics</span>
                  </div>
                  <div className="h-10 rounded-lg bg-[#0e172a] border border-slate-700 p-1.5" />
                  <div className="h-10 rounded-lg bg-[#0e172a] border border-slate-700 p-1.5" />
                  <div className="h-10 rounded-lg bg-amber-400 p-1.5 flex flex-col justify-end">
                    <span className="text-[8px] font-bold text-slate-950">Active Users</span>
                  </div>
                </div>
              </div>

              <span className="inline-block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                {t.portfolio.projects[1].category}
              </span>
              <h3 className="font-michroma text-base font-bold text-slate-950 mb-2 group-hover:text-amber-600 transition-colors">
                {t.portfolio.projects[1].title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.portfolio.projects[1].tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {t.portfolio.projects[1].metric}
              </span>
              <Link href="#contacto" className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Project 3: Real Estate Luxury Minimal UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300"
          >
            <div>
              {/* Visual Mockup 3 */}
              <div className="h-44 w-full rounded-2xl bg-[#0a0f1d] border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner mb-5 group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[9px] font-bold text-amber-400">VANGUARD LIVING</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                {/* Clean lines & dark card */}
                <div className="rounded-xl bg-[#0e172a] border border-slate-700 p-2 space-y-1.5">
                  <div className="h-3 w-2/3 bg-slate-600 rounded" />
                  <div className="h-1.5 w-full bg-slate-800 rounded" />
                  <div className="h-4 w-14 bg-amber-400 rounded flex items-center justify-center text-[7px] font-bold text-slate-950">
                    VIEW HOME
                  </div>
                </div>
                <div className="flex justify-between items-center text-[8px] text-slate-500 font-mono">
                  <span>RESIDENTIAL</span>
                  <span className="text-amber-400 font-bold">$450K+</span>
                </div>
              </div>

              <span className="inline-block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                {t.portfolio.projects[2].category}
              </span>
              <h3 className="font-michroma text-base font-bold text-slate-950 mb-2 group-hover:text-amber-600 transition-colors">
                {t.portfolio.projects[2].title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.portfolio.projects[2].tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {t.portfolio.projects[2].metric}
              </span>
              <Link href="#contacto" className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Project 4: E-Commerce Store with Bar Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-[#f8fafc] p-5 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300"
          >
            <div>
              {/* Visual Mockup 4 */}
              <div className="h-44 w-full rounded-2xl bg-[#0a0f1d] border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner mb-5 group-hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400">aura.store</span>
                  <span className="text-[9px] font-bold text-emerald-400">Checkout Live</span>
                </div>
                {/* Bar chart representation */}
                <div className="flex items-end justify-between h-16 px-2 pb-1 gap-1.5">
                  <div className="w-1/4 h-8 bg-slate-800 rounded-t" />
                  <div className="w-1/4 h-11 bg-slate-700 rounded-t" />
                  <div className="w-1/4 h-6 bg-slate-800 rounded-t" />
                  <div className="w-1/4 h-14 bg-amber-400 rounded-t shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                </div>
                <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono">
                  <span>Weekly Sales</span>
                  <span className="text-amber-400 font-bold">$12.4K</span>
                </div>
              </div>

              <span className="inline-block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                {t.portfolio.projects[3].category}
              </span>
              <h3 className="font-michroma text-base font-bold text-slate-950 mb-2 group-hover:text-amber-600 transition-colors">
                {t.portfolio.projects[3].title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.portfolio.projects[3].tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {t.portfolio.projects[3].metric}
              </span>
              <Link href="#contacto" className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Portfolio CTA */}
        <div className="mt-14 text-center">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full bg-[#0a0f1d] hover:bg-slate-900 text-white shadow-lg shadow-black/10 hover:border-amber-400 border border-transparent transition-all active:scale-95"
          >
            <span>¿Quieres una web similar para tu marca? Hablemos</span>
            <ExternalLink className="h-4 w-4 text-amber-400" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
