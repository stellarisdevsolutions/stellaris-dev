"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function RibbonTicker() {
  const { t } = useLanguage();
  const words = t.ribbon;

  // Repeat for continuous marquee
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="relative w-full bg-amber-400 text-slate-950 py-3.5 sm:py-4 overflow-hidden border-y border-amber-500 shadow-md select-none">
      <div className="flex w-max animate-marquee">
        {repeatedWords.map((word, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-6 shrink-0">
            <span className="font-michroma text-xs sm:text-sm font-black tracking-widest uppercase">
              {word}
            </span>
            <Sparkles className="h-3.5 w-3.5 fill-slate-950 text-slate-950 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
