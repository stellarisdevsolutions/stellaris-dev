"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function FAQ() {
  const { lang } = useLanguage();

  const faqs =
    lang === "es"
      ? [
          {
            q: "¿Cuánto tarda en estar listo mi sitio?",
            a: "Depende del tipo de proyecto. Te damos un plazo estimado junto con la cotización (usualmente entre 3 y 10 días).",
          },
          {
            q: "¿Mi sitio se verá bien en el celular?",
            a: "Sí. Todos nuestros diseños son responsive y los probamos exhaustivamente en distintos dispositivos.",
          },
          {
            q: "¿Puedo pedir cambios durante el proceso?",
            a: "Sí. Revisas y apruebas el prototipo antes de que empecemos a programar.",
          },
          {
            q: "¿Ofrecen mantenimiento después del lanzamiento?",
            a: "Sí, ofrecemos soporte y mejoras continuas para que tu web siempre rinda al máximo.",
          },
          {
            q: "¿Los precios son finales?",
            a: "Son precios “desde”. El valor final depende de los requerimientos específicos y te armamos una propuesta a medida sin sorpresas.",
          },
        ]
      : [
          {
            q: "How long does it take to launch my website?",
            a: "It depends on the project scope. We provide a firm deadline with your quote (usually 3 to 10 business days).",
          },
          {
            q: "Will my website look great on mobile phones?",
            a: "Yes. All our designs are responsive and rigorously tested on smartphones, tablets, and desktops.",
          },
          {
            q: "Can I request changes during development?",
            a: "Yes. You review and approve the visual prototype before coding begins.",
          },
          {
            q: "Do you offer post-launch support and updates?",
            a: "Yes, we provide ongoing maintenance and performance enhancements.",
          },
          {
            q: "Are the prices fixed?",
            a: "Prices start from the listed amounts. Final investment depends on your specific needs, with zero hidden fees.",
          },
        ];

  return (
    <div id="faq" className="w-full px-4 sm:px-6">
      <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[48px] sm:rounded-[56px] py-20 sm:py-24 shadow-2xl shadow-[#0B1020]/25 border border-[#2A3560]/40">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            <div className="text-[14px] font-medium tracking-[2px] text-[#A9B3CF] uppercase">
              FAQ
            </div>
            <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#E8ECF8] m-0">
              {lang === "es" ? "Preguntas " : "Frequently "}
              <span className="text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                {lang === "es" ? "frecuentes" : "asked questions"}
              </span>
            </h2>
            <p className="m-0 text-[#A9B3CF] text-base leading-[1.6]">
              {lang === "es"
                ? "¿No ves tu duda? Escríbenos y te respondemos de inmediato."
                : "Have another question? Reach out and we'll reply right away."}
            </p>
          </div>

          {/* Right Column: Details/Summary Accordion directly styled from reference */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="dk rounded-[16px] p-5 sm:p-6 transition-all duration-200 group border border-[#2A3560] hover:border-[#00F0FF]/40"
              >
                <summary className="hd cursor-pointer text-base sm:text-[18px] font-medium text-[#E8ECF8] select-none hover:text-[#00F0FF] transition-colors list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-[#00F0FF] text-lg font-mono ml-3 shrink-0">✦</span>
                </summary>
                <p className="mt-3.5 mb-0 text-[#A9B3CF] text-[15px] leading-[1.6]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
