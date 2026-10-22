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
    <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-14 pb-4 flex flex-col items-center gap-5 text-center">
      <div className="text-[14px] font-medium tracking-[2px] text-[#4A5373] uppercase">
        {lang === "es" ? "TECNOLOGÍAS QUE USAMOS" : "TECHNOLOGIES WE USE"}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {TECHS.map((tech) => (
          <span
            key={tech}
            className="lt rounded-full px-5 py-2.5 text-[15px] font-normal text-[#0B1020] shadow-xs hover:border-[#FFC857] transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
