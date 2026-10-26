"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Zap, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { lang } = useLanguage();

  const techChips = ["Next.js", "NestJS", "Laravel", "PostgreSQL", "MySQL", "SQLite"];

  return (
    <section id="about" className="w-full bg-white text-[#171717] pt-8 sm:pt-20 pb-16 sm:pb-20 border-b border-neutral-100">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF532A]" />
            <span>{lang === "es" ? "Sobre Nosotros" : "About Us"}</span>
            <span className="text-[#FF532A]">✦</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full">
            <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#171717] leading-[1.15] m-0 max-w-[680px]">
              {lang === "es" ? "Creamos software con " : "We engineer digital products with "}
              <span className="inline-block relative text-white bg-[#FF532A] px-3 sm:px-4 py-0.5 rounded-xl shadow-sm shadow-[#FF532A]/25 -rotate-1 mx-1">
                {lang === "es" ? "precisión técnica" : "technical precision"}
              </span>{" "}
              {lang === "es" ? "y visión de negocio." : "and business acumen."}
            </h2>

            <p className="m-0 text-sm sm:text-base text-neutral-600 max-w-[440px] leading-relaxed">
              {lang === "es"
                ? "Somos un estudio boutique de desarrollo web. Combinamos diseño de interfaz moderno con arquitecturas ultrarrápidas y robustas para convertir visitantes en clientes reales."
                : "We are a boutique software & web engineering studio. We combine modern interface craft with ultra-fast, robust architectures to turn visitors into paying customers."}
            </p>
          </div>
        </motion.div>

        {/* Compact Bento Grid: 3 Pillars with subtle staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Código Propio & Stack Completo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-[28px] bg-neutral-50 border border-neutral-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#FF532A]/50 transition-all duration-300 shadow-xs hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF532A]/10 text-[#FF532A] flex items-center justify-center mb-5">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="hd text-xl font-bold text-[#171717] mb-2">
                {lang === "es" ? "100% Código Propio" : "100% Handcrafted Code"}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {lang === "es"
                  ? "Cero plantillas pesadas de WordPress o Elementor. Escribimos código nativo, ultrarrápido y seguro."
                  : "Zero bloated WordPress builders. We write pure, scalable, ultra-fast native code."}
              </p>
            </div>

            {/* Chips de Tecnologías */}
            <div className="pt-4 border-t border-neutral-200/60">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2.5">
                {lang === "es" ? "Stack que dominamos" : "Our core stack"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {techChips.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-neutral-800 border border-neutral-200 shadow-2xs hover:border-[#FF532A]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Obsesión por la Velocidad */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="rounded-[28px] bg-neutral-50 border border-neutral-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#FF532A]/50 transition-all duration-300 shadow-xs hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF532A]/10 text-[#FF532A] flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="hd text-xl font-bold text-[#171717] mb-2">
                {lang === "es" ? "Obsesión por la Velocidad" : "Speed Obsessed"}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {lang === "es"
                  ? "Tiempos de carga menores a 1 segundo. Sitios calificados con 95+ en Google PageSpeed para que no pierdas ningún cliente."
                  : "Sub-second load times. Sites scoring 95+ on Google PageSpeed to guarantee maximum conversion."}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between">
              <div>
                <div className="hd text-2xl font-bold text-[#FF532A]">95+</div>
                <div className="text-xs text-neutral-500">Google PageSpeed</div>
              </div>
              <div className="text-right">
                <div className="hd text-2xl font-bold text-[#171717]">&lt; 1s</div>
                <div className="text-xs text-neutral-500">{lang === "es" ? "Tiempo de carga" : "Load time"}</div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Trato Directo sin Vueltas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.19 }}
            className="rounded-[28px] bg-neutral-50 border border-neutral-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#FF532A]/50 transition-all duration-300 shadow-xs hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF532A]/10 text-[#FF532A] flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="hd text-xl font-bold text-[#171717] mb-2">
                {lang === "es" ? "Trato Directo sin Vueltas" : "Direct Communication"}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {lang === "es"
                  ? "Hablas directamente con el desarrollador que construye tu producto. Sin intermediarios, con respuestas en minutos y entregas a tiempo."
                  : "Speak straight to the developer building your platform. No middlemen, swift answers, and on-schedule deliveries."}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/60">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF532A] hover:text-[#E5451D] uppercase tracking-wider group"
              >
                <span>{lang === "es" ? "Inicia una conversación" : "Start a conversation"}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
