"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/data/projects";

export function Portfolio() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: lang === "es" ? "Todos" : "All" },
    { id: "landing", label: lang === "es" ? "Landing Pages" : "Landing Pages" },
    { id: "web", label: lang === "es" ? "Sitios Web" : "Websites" },
    { id: "ecommerce", label: lang === "es" ? "E-Commerce" : "E-Commerce" },
  ];

  return (
    <section id="portfolio" className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Header matching reference layout */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] m-0 max-w-[540px]">
          {lang === "es" ? "Echa un vistazo a nuestro " : "Have a Look at our "}
          <span className="inline-block relative text-white bg-[#FF532A] px-3 sm:px-4 py-0.5 rounded-xl shadow-sm shadow-[#FF532A]/25 -rotate-1 mx-1">
            {lang === "es" ? "Portafolio" : "Portfolio"}
          </span>
        </h2>

        {/* Top-Right "Cotizar" Button */}
        <Link
          href="#contact"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-[#FF532A]/25 transition-all hover:scale-105 active:scale-95"
        >
          <span>{lang === "es" ? "Cotizar Proyecto" : "Hire Us"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            type="button"
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === cat.id
                ? "bg-[#171717] text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid / Cards (Diseño más sencillo, sin párrafos y sin tantos bordes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {PROJECTS.filter((p) => activeTab === "all" || p.category === activeTab).map(
          (project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-3xl bg-neutral-50/80 hover:bg-white p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
            >
              {/* Imagen/Preview Limpia sin tantos bordes */}
              <div
                className={`w-full h-[230px] rounded-2xl ${project.bgPreview} p-5 flex flex-col justify-between text-white relative overflow-hidden mb-4`}
              >
                {/* Categoría y Botón de flecha circular */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                    {project.categoryLabel[lang]}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white text-[#171717] flex items-center justify-center group-hover:bg-[#FF532A] group-hover:text-white transition-all shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Sutil resplandor de fondo limpio */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Título integrado sobre el preview visual limpio */}
                <div className="z-10 mt-auto">
                  <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider block mb-1">
                    {project.client}
                  </span>
                  <div className="text-sm font-mono text-white/90 flex items-center gap-2">
                    {project.stack.slice(0, 3).join(" • ")}
                  </div>
                </div>
              </div>

              {/* Título y Enlace directo (sin párrafo largo de texto) */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <h3 className="hd text-lg sm:text-xl font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-1 m-0">
                  {project.title}
                </h3>
                <span className="text-xs font-semibold text-[#FF532A] shrink-0 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  <span>{lang === "es" ? "Ver caso" : "View"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}
