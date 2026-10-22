"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-20 md:py-28 bg-[#0a0f1d] text-white overflow-hidden">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px]" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              <HelpCircle className="h-4 w-4" />
              <span>{t.faq.eyebrow}</span>
            </div>

            <h2 className="font-michroma text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
              {t.faq.titlePart1}
              <span className="text-amber-400">
                {t.faq.titleHighlight}
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {t.faq.subtitle}
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3.5">
            {t.faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-amber-400/40 bg-[#0d1324] shadow-lg shadow-black/20"
                      : "border-slate-800 bg-[#090e1c] hover:border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-michroma text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
                  >
                    <span className="pr-4">{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-amber-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 font-normal">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
