"use client";

import React, { useState } from "react";
import { Star, ChevronDown, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FAQ() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const testimonials = [
    {
      id: 1,
      quote:
        lang === "es"
          ? "Stellaris Dev transformó completamente nuestra presencia online. Nuestro tráfico y ventas se duplicaron tras el rediseño."
          : "Stellaris Dev completely transformed our online presence. Our conversions doubled right after the launch.",
      name: "Carlos Mendoza",
      role: lang === "es" ? "Fundador, Nova Retail" : "Founder, Nova Retail",
      rating: 5,
    },
    {
      id: 2,
      quote:
        lang === "es"
          ? "Entrega puntual, código de altísima calidad y un diseño que impresionó a nuestros inversores. 100% recomendados."
          : "On-time delivery, exceptional code quality, and an interface that impressed our investors. 100% recommended.",
      name: "Sofía Arze",
      role: lang === "es" ? "Directora de Operaciones, Aura App" : "COO, Aura App",
      rating: 5,
    },
  ];

  const faqs =
    lang === "es"
      ? [
          {
            q: "¿Cuánto tarda en estar listo mi sitio web?",
            a: "Depende del alcance del proyecto. Una Landing Page suele entregarse en 3 a 5 días hábiles, mientras que un sitio corporativo o tienda online toma entre 7 y 14 días con revisiones incluidas.",
          },
          {
            q: "¿Mi sitio web se verá perfecto en celulares?",
            a: "Totalmente. Diseñamos con enfoque Mobile-First: todos los botones, textos e imágenes se adaptan automáticamente a cualquier pantalla (móvil, tablet, laptop o monitor 4K).",
          },
          {
            q: "¿Puedo solicitar cambios durante el diseño?",
            a: "Sí. Primero compartimos el prototipo interactivo para que apruebes la estética antes de escribir una sola línea de código.",
          },
          {
            q: "¿Ofrecen soporte técnico y mantenimiento?",
            a: "Sí. Brindamos soporte continuo, copias de seguridad automáticas y optimización de velocidad para que tu negocio nunca se detenga.",
          },
        ]
      : [
          {
            q: "How long does it take to launch my website?",
            a: "A high-conversion landing page is typically delivered within 3 to 5 business days, while corporate platforms take 7 to 14 days with full revisions included.",
          },
          {
            q: "Will my website look great on mobile devices?",
            a: "Absolutely. We follow a strict Mobile-First approach: every interaction, button, and layout is tested across smartphones, tablets, and desktop displays.",
          },
          {
            q: "Can I request changes during development?",
            a: "Yes. You review and approve the design prototype in Figma before we proceed with the actual coding phase.",
          },
          {
            q: "Do you offer post-launch maintenance?",
            a: "Yes. We offer continuous support, automatic backups, and performance updates to keep your website fast and secure.",
          },
        ];

  return (
    <div className="w-full px-4 sm:px-6 py-6 bg-white">
      <section
        id="faq"
        className="w-full max-w-[1240px] mx-auto bg-[#171717] text-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden"
      >
        {/* Testimonials Header matching exact reference */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#FF532A] uppercase font-bold tracking-widest mb-3">
            <span>✦</span>
            <span>{lang === "es" ? "PRUEBA SOCIAL" : "SOCIAL PROOF"}</span>
          </div>
          <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white m-0">
            {lang === "es" ? "Testimonios que hablan de " : "Testimonials that Speak to "}
            <span className="text-[#FF532A]">
              {lang === "es" ? "Nuestros Resultados" : "My Results"}
            </span>
          </h2>
        </div>

        {/* 2 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-[#242427] border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-[#FF532A]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF532A]" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-neutral-300 italic leading-relaxed m-0">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-neutral-400">{t.role}</div>
                </div>
                <Quote className="w-6 h-6 text-neutral-700" />
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordions Area */}
        <div className="pt-10 border-t border-neutral-800/80 flex flex-col items-center">
          <div className="text-center mb-8">
            <h3 className="hd text-2xl sm:text-3xl font-bold text-white m-0">
              {lang === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h3>
          </div>

          <div className="w-full max-w-[800px] flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-[#242427] border border-neutral-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="hd font-semibold text-base sm:text-lg text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FF532A] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-neutral-400 text-sm sm:text-[15px] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}