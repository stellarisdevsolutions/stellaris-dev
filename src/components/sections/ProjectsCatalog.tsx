"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/data/projects";

interface ProjectsCatalogProps {
  initialProjects: ProjectItem[];
}

export function ProjectsCatalog({ initialProjects }: ProjectsCatalogProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: lang === "es" ? "Todos los Proyectos" : "All Projects" },
    { id: "landing", label: lang === "es" ? "Landing Pages" : "Landing Pages" },
    { id: "web", label: lang === "es" ? "Sitios Web" : "Websites" },
    { id: "ecommerce", label: lang === "es" ? "E-Commerce" : "E-Commerce" },
  ];

  const filteredProjects = initialProjects.filter((p) => {
    const matchesCategory = activeTab === "all" || p.category === activeTab;
    const q = searchQuery.toLowerCase();
    const titleEn = typeof p.title === "object" ? p.title.en : p.title || "";
    const titleEs = typeof p.title === "object" ? p.title.es : p.title || "";
    const matchesSearch =
      titleEn.toLowerCase().includes(q) ||
      titleEs.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      (p.tagline?.es && p.tagline.es.toLowerCase().includes(q)) ||
      (p.tagline?.en && p.tagline.en.toLowerCase().includes(q)) ||
      p.stack?.some((s) => s.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
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

      {/* MISMA FILA: BOTONES DE FILTRO + BUSCADOR TIPO PILL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        {/* Botones de Filtro */}
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

        {/* Buscador Tipo Pill */}
        <div className="w-full md:w-[380px] lg:w-[420px] flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm shadow-neutral-100 focus-within:border-[#FF532A] focus-within:shadow-md transition-all shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "es"
                ? "Buscar por nombre, cliente o tecnología..."
                : "Search by project, client or stack..."
            }
            className="flex-1 bg-transparent border-0 px-4 py-2 text-xs sm:text-sm text-[#171717] placeholder-neutral-400 outline-none"
          />
          <button
            type="button"
            className="px-5 py-2.5 bg-[#FF532A] hover:bg-[#e0451e] text-white text-xs sm:text-sm font-semibold rounded-full transition-all shrink-0 shadow-sm shadow-[#FF532A]/25 cursor-pointer"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group flex flex-col rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300"
          >
            {/* Visual Preview Frame */}
            <div
              className={`w-full aspect-[16/10] rounded-[22px] p-4 flex flex-col justify-between relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] ${
                project.bgPreview?.startsWith("http")
                  ? "bg-cover bg-center"
                  : project.bgPreview || "bg-neutral-900"
              }`}
              style={
                project.bgPreview?.startsWith("http")
                  ? { backgroundImage: `url(${project.bgPreview})` }
                  : {}
              }
            >
              {/* Simulated browser window bar */}
              <div className="w-full flex items-center justify-between pb-2 border-b border-white/10 z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] text-white/50 font-mono">
                  {project.slug}.stellaris.dev
                </span>
              </div>

              {/* Central Badge */}
              <div className="my-auto text-center z-10">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  {project.client}
                </span>
              </div>

              {/* Bottom pill row */}
              <div className="flex items-center justify-between text-xs text-white/80 z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-medium">
                  {project.categoryLabel?.[lang as "es" | "en"] || project.category}
                </span>
                <span className="font-mono text-[11px]">{project.year}</span>
              </div>

              {/* Gradient overlay for readibility if custom image */}
              {project.bgPreview?.startsWith("http") && (
                <div className="absolute inset-0 bg-black/35 z-0" />
              )}
            </div>

            {/* Info Card Body */}
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="font-bold text-lg text-[#171717] group-hover:text-[#FF532A] transition-colors leading-tight flex items-center justify-between">
                  <span>
                    {typeof project.title === "object"
                      ? project.title[lang as "es" | "en"] || project.title.es
                      : project.title}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FF532A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                  {project.tagline?.[lang as "es" | "en"] || project.tagline?.es}
                </p>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                {project.stack?.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 text-[11px] font-medium text-neutral-600"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack?.length > 3 && (
                  <span className="text-[11px] text-neutral-400 font-medium">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200 mt-6">
          <p className="text-neutral-500 text-sm">
            No se encontraron proyectos para los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
}
