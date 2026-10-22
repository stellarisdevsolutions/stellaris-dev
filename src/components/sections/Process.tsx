"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { lang } = useLanguage();

  const steps = [
    {
      step: "01",
      phase: lang === "es" ? "Paso 1 · Planificación" : "Phase 1 · Discovery",
      title: lang === "es" ? "Estrategia & Alcance" : "Strategy & Architecture",
      desc:
        lang === "es"
          ? "Analizamos tu negocio, definimos la estructura del sitio, el contenido clave y el plan de entrega."
          : "We define core user goals, site architecture, required integrations, and a firm timeline.",
    },
    {
      step: "02",
      phase: lang === "es" ? "Paso 2 · Prototipo" : "Phase 2 · Prototype",
      title: lang === "es" ? "Diseño UI/UX en Figma" : "Bespoke UI/UX Design",
      desc:
        lang === "es"
          ? "Diseñamos interfaces interactivas y pantallas completas para que apruebes el look antes de programar."
          : "We craft high-fidelity mockups in Figma for your full review and approval before writing code.",
    },
    {
      step: "03",
      phase: lang === "es" ? "Paso 3 · Construcción" : "Phase 3 · Development",
      title: lang === "es" ? "Desarrollo con Next.js 16" : "Next.js & React Build",
      desc:
        lang === "es"
          ? "Programamos con código limpio, carga instantánea, animaciones fluidas y optimización SEO al 100%."
          : "High-performance production build with responsive layout, zero bloat, and top Google SEO scores.",
    },
    {
      step: "04",
      phase: lang === "es" ? "Paso 4 · Despliegue" : "Phase 4 · Launch",
      title: lang === "es" ? "Lanzamiento & Soporte" : "Deployment & Support",
      desc:
        lang === "es"
          ? "Publicamos tu web en servidores ultra rápidos (Vercel/Cloud), configuramos dominio y te acompañamos."
          : "Live deployment on global CDN servers, domain setup, and ongoing technical maintenance.",
    },
  ];

  return (
    <section id="proceso" className="w-full max-w-[1000px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] m-0">
          {lang === "es" ? "Nuestro " : "Our "}
          <span className="text-[#FF532A]">
            {lang === "es" ? "Proceso de Trabajo" : "Work Process"}
          </span>
        </h2>
        <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-[500px] mx-auto">
          {lang === "es"
            ? "Un flujo claro, transparente y sin sorpresas desde la idea hasta el lanzamiento."
            : "A transparent, milestone-driven development process from concept to live deployment."}
        </p>
      </div>

      {/* Timeline matching "My Work Experience" reference */}
      <div className="relative flex flex-col gap-10 sm:gap-12 pl-4 sm:pl-0">
        {/* Continuous vertical timeline connector line */}
        <div className="hidden sm:block absolute left-[30%] top-3 bottom-3 w-[2px] bg-neutral-200 -translate-x-1/2" />

        {steps.map((item, index) => (
          <div
            key={item.step}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 relative group"
          >
            {/* Left Column: Step & Phase */}
            <div className="sm:w-[30%] sm:text-right pr-0 sm:pr-8 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
              <span className="hd text-2xl sm:text-3xl font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors">
                {item.step}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mt-1">
                {item.phase}
              </span>
            </div>

            {/* Middle: Orange Dot on Timeline */}
            <div className="hidden sm:flex absolute left-[30%] -translate-x-1/2 top-1.5 z-10 w-4 h-4 rounded-full bg-[#FF532A] ring-4 ring-[#FF532A]/20 group-hover:scale-125 transition-transform" />

            {/* Right Column: Title & Description */}
            <div className="sm:w-[70%] sm:pl-8 flex flex-col gap-1.5">
              <h3 className="hd text-xl sm:text-2xl font-bold text-[#171717] m-0 group-hover:text-[#FF532A] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-500 leading-relaxed m-0 max-w-[560px]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}