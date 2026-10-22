"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const TECHS = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "HTML & CSS",
  "JavaScript",
  "WordPress",
  "Shopify",
  "Figma",
];

export function TechStack() {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-16 pb-4 flex flex-col items-center gap-6 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#EBEBEF] text-[#171717] border border-[#DDDDE2]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
        {lang === "es" ? "TECNOLOGÍAS QUE USAMOS" : "TECHNOLOGIES WE USE"}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {TECHS.map((tech) => (
          <span
            key={tech}
            className="lt rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-medium text-[#171717] flex items-center gap-2 cursor-default hover:border-[#FF6A00]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC928]" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
