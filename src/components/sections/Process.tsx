"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { lang } = useLanguage();

  const steps = [
    {
      number: "1",
      title: lang === "es" ? "Contacto y plan" : "Contact & Plan",
      desc:
        lang === "es"
          ? "Hablamos de tu idea, definimos objetivos, alcance técnico y armamos el plan de entrega."
          : "We explore your goals, define scope, select the stack, and prepare a fixed roadmap.",
    },
    {
      number: "2",
      title: lang === "es" ? "Diseño y prototipo" : "Design & Prototype",
      desc:
        lang === "es"
          ? "Diseñamos interfaces interactivas en Figma para que apruebes el look antes de programar."
          : "We design high-fidelity mockups so you review and approve every visual detail first.",
    },
    {
      number: "3",
      title: lang === "es" ? "Construcción" : "Development",
      desc:
        lang === "es"
          ? "Programamos tu plataforma con código limpio, bases de datos rápidas y 100% responsive."
          : "We engineer your platform with clean, ultra-fast code and mobile-first optimization.",
    },
    {
      number: "4",
      title: lang === "es" ? "Despliegue y soporte" : "Launch & Support",
      desc:
        lang === "es"
          ? "Publicamos tu web en Vercel con SSL, configuramos el dominio y te acompañamos post-lanzamiento."
          : "We launch your live platform on global servers with SSL and continuous maintenance.",
    },
  ];

  return (
    <div className="w-full px-0 sm:px-6 py-6 sm:py-8 bg-white">
      {/* Dark Bento Container matching current palette & previous step pipeline */}
      <section
        id="process"
        className="w-full max-w-[1240px] mx-auto bg-[#171717] text-white rounded-none sm:rounded-[48px] px-6 py-16 sm:p-14 lg:p-16 shadow-2xl overflow-hidden relative"
      >
        {/* Resplandor sutil idéntico al de la sección Marketplace */}
        <div
          className="absolute -top-8 -right-8 sm:-top-16 sm:-right-16 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-[#FF532A]/25 sm:bg-[#FF532A]/35 rounded-full blur-[45px] sm:blur-[65px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-12 sm:gap-16">
          {/* Header (Sin etiqueta superior) */}
          <div className="text-center flex flex-col items-center gap-3">
            <h2 className="hd text-3xl sm:text-5xl lg:text-[48px] font-bold tracking-tight text-white m-0">
              {lang === "es" ? "Cómo " : "How we "}
              <span className="text-[#FF532A]">
                {lang === "es" ? "trabajamos" : "work"}
              </span>
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base max-w-[540px] mx-auto leading-relaxed m-0">
              {lang === "es"
                ? "Un flujo claro, transparente y sin sorpresas desde la idea inicial hasta el lanzamiento en producción."
                : "A transparent, milestone-driven development process from concept to live production."}
            </p>
          </div>

          {/* 4 Steps with Connector Lines and Orange Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-7 relative">
            {steps.map((item, index) => {
              const isLast = index === steps.length - 1;

              return (
                <div key={item.number} className="flex flex-col gap-4 group">
                  {/* Top: Step Number Badge + Connector Line */}
                  <div className="flex items-center gap-3">
                    <div className="hd w-[52px] h-[52px] rounded-2xl sm:rounded-full bg-[#FF532A] text-white font-extrabold text-[22px] flex items-center justify-center shrink-0 shadow-lg shadow-[#FF532A]/30 group-hover:scale-105 group-hover:bg-[#E5451D] transition-all">
                      {item.number}
                    </div>

                    {/* Connector line (visible on desktop between steps) */}
                    {!isLast && (
                      <div className="flex-1 h-[2px] bg-neutral-800 hidden lg:block relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF532A]/50 to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Step Title */}
                  <h3 className="hd text-xl sm:text-[22px] font-bold text-white m-0 group-hover:text-[#FF532A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-neutral-400 leading-[1.6] text-xs sm:text-[14px] m-0">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
