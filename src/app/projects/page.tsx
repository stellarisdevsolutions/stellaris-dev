"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/data/projects";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function ProyectosListPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: lang === "es" ? "Todos los Proyectos" : "All Projects" },
    { id: "landing", label: lang === "es" ? "Landing Pages" : "Landing Pages" },
    { id: "web", label: lang === "es" ? "Sitios Web" : "Websites" },
    { id: "ecommerce", label: lang === "es" ? "E-Commerce" : "E-Commerce" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = activeTab === "all" || p.category === activeTab;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8">
          {/* Breadcrumb / Regresar al Inicio */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#FF532A] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Volver al inicio</span>
            </Link>
          </div>

          {/* Header Principal con título y párrafo al lado derecho */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF532A]" />
                <span>CASOS DE ÉXITO & PORTAFOLIO</span>
              </div>
              <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.08] m-0">
                Nuestros{" "}
                <span className="inline-block relative text-white bg-[#FF532A] px-3.5 sm:px-5 py-0.5 rounded-xl shadow-sm shadow-[#FF532A]/25 -rotate-1 mx-1">
                  Proyectos
                </span>
              </h1>
            </div>

            {/* Párrafo al lado derecho aprovechando el espacio */}
            <p className="m-0 text-sm sm:text-base text-neutral-600 max-w-[460px] leading-relaxed">
              {lang === "es"
                ? "Explora nuestras implementaciones web reales: desde landing pages de alta conversión hasta tiendas online y plataformas a medida."
                : "Explore our real client work: high-conversion landing pages, automated online stores, and custom web platforms."}
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              MISMA FILA: BOTONES DE FILTRO + BUSCADOR TIPO PILL
              ══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            {/* Botones de Filtro (Todos, Landing Pages, etc.) */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  type="button"
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === cat.id
                      ? "bg-[#171717] text-white shadow-md shadow-neutral-900/20"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Buscador Tipo Pill Exacto a la Imagen */}
            <div className="w-full md:w-[380px] lg:w-[420px] flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm shadow-neutral-100 focus-within:border-[#FF532A] focus-within:shadow-md transition-all shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "es" ? "Buscar proyectos..." : "Search projects..."}
                className="flex-1 px-4 py-1.5 text-xs sm:text-sm text-[#171717] placeholder-neutral-400 bg-transparent outline-hidden"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm shadow-[#FF532A]/25 transition-all cursor-pointer hover:scale-102 active:scale-95 shrink-0"
              >
                <span>{lang === "es" ? "Buscar" : "Search"}</span>
              </button>
            </div>
          </div>

          {/* Grid de Proyectos */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
              <p className="text-neutral-500 text-sm sm:text-base m-0">
                No se encontraron proyectos para esta búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col rounded-3xl bg-neutral-50/80 hover:bg-white p-5 transition-all duration-300 border border-neutral-200/80 hover:border-[#FF532A]/50 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Banner Preview */}
                  <div
                    className={`w-full h-[220px] rounded-2xl ${project.bgPreview} p-5 flex flex-col justify-between text-white relative overflow-hidden mb-4`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                        {project.categoryLabel[lang]}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white text-[#171717] flex items-center justify-center group-hover:bg-[#FF532A] group-hover:text-white transition-all shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    <div className="z-10 mt-auto">
                      <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider block mb-1">
                        {project.client}
                      </span>
                      <div className="text-xs font-mono text-white/90">
                        {project.stack.slice(0, 3).join(" • ")}
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex flex-col gap-1.5 flex-1 justify-between">
                    <div>
                      <h2 className="hd text-lg sm:text-xl font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-1 m-0">
                        {project.title}
                      </h2>
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed m-0">
                        {project.tagline[lang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Año {project.year}
                      </span>
                      <span className="text-xs font-bold text-[#FF532A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        <span>Ver caso</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Banner CTA Final */}
          <div className="rounded-[36px] sm:rounded-[44px] bg-[#FF532A] text-white p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-xl shadow-[#FF532A]/20">
            <h2 className="hd text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-[700px] leading-[1.15] mb-3">
              ¿Tienes una idea en mente? Platiquemos
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-[520px] mb-6 font-normal">
              Sin compromisos ni presiones. Cuéntanos qué buscas y te compartimos ideas o una cotización inicial sin costo.
            </p>
            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full bg-white text-[#171717] hover:bg-neutral-100 text-sm sm:text-base font-bold shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Conversar sobre mi proyecto</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF532A]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
