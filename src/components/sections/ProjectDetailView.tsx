"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  User,
  Layers,
  Quote,
  Check,
  Code2,
} from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectGallery } from "./ProjectGallery";

interface ProjectDetailViewProps {
  project: ProjectItem;
  otherProjects: ProjectItem[];
}

export function ProjectDetailView({
  project,
  otherProjects,
}: ProjectDetailViewProps) {
  const { lang } = useLanguage();

  // Contenido localizado
  const projectTitle =
    typeof project.title === "object"
      ? project.title[lang] || project.title.es || project.title.en
      : project.title;

  const categoryText =
    project.categoryLabel?.[lang] || project.categoryLabel?.es || "Project";
  const taglineText = project.tagline?.[lang] || project.tagline?.es || "";
  const overviewText = project.overview?.[lang] || project.overview?.es || "";
  const challengeText =
    project.challenge?.[lang] || project.challenge?.es || "";
  const solutionText = project.solution?.[lang] || project.solution?.es || "";
  const featuresList =
    project.features?.[lang] || project.features?.es || [];

  const quoteText =
    typeof project.testimonial?.quote === "object"
      ? project.testimonial.quote[lang] || project.testimonial.quote.es
      : project.testimonial?.quote;

  const roleText =
    typeof project.testimonial?.role === "object"
      ? project.testimonial.role[lang] || project.testimonial.role.es
      : project.testimonial?.role;

  // Condiciones de visibilidad
  const hasOverview = Boolean(overviewText?.trim());
  const hasChallenge = Boolean(challengeText?.trim());
  const hasSolution = Boolean(solutionText?.trim());
  const hasStack = Boolean(project.stack && project.stack.length > 0);
  const hasMetrics = Boolean(project.metrics && project.metrics.length > 0);
  const hasFeatures = Boolean(featuresList && featuresList.length > 0);
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const hasTestimonial = Boolean(quoteText?.trim());

  const isImageBlob =
    project.bgPreview?.startsWith("http") ||
    project.bgPreview?.startsWith("/");

  // Etiqueta del botón en vivo
  const buttonLabel =
    project.liveUrlLabel === "Ver Diseño"
      ? lang === "es"
        ? "Ver Diseño"
        : "View Design"
      : lang === "es"
      ? "Demo en Vivo"
      : "Live Demo";

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8">
      {/* Breadcrumb & Back Link */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#FF532A] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{lang === "es" ? "Volver a proyectos" : "Back to projects"}</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider">
          {categoryText}
        </span>
      </div>

      {/* Project Title & Tagline */}
      <div className="max-w-[880px] mb-8 sm:mb-12">
        <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.08] mb-4">
          {projectTitle}
        </h1>
        {taglineText && (
          <p className="text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            {taglineText}
          </p>
        )}
      </div>

      {/* Project Meta Details Strip (Cliente, Año, Servicio, Enlace) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-10">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#FF532A]" />
            <span>{lang === "es" ? "Cliente" : "Client"}</span>
          </div>
          <div className="text-sm font-semibold text-[#171717]">
            {project.client || (lang === "es" ? "Confidencial" : "Confidential")}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#FF532A]" />
            <span>{lang === "es" ? "Año" : "Year"}</span>
          </div>
          <div className="text-sm font-semibold text-[#171717]">
            {project.year || "2026"}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#FF532A]" />
            <span>{lang === "es" ? "Servicio" : "Service"}</span>
          </div>
          <div className="text-sm font-semibold text-[#171717]">
            {categoryText}
          </div>
        </div>

        {project.liveUrl ? (
          <div className="flex items-center justify-start sm:justify-end col-span-2 sm:col-span-1">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-md shadow-[#FF532A]/25 transition-all hover:scale-105"
            >
              <span>{buttonLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="hidden sm:flex items-center justify-end">
            <span className="text-xs font-mono text-neutral-400">
              {lang === "es" ? "Caso Privado" : "Private Case"}
            </span>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          1. IMAGEN PRINCIPAL (Debajo de Cliente / Año / Servicio)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="rounded-[32px] sm:rounded-[40px] bg-[#171717] overflow-hidden border border-neutral-800 shadow-2xl relative mb-14 group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF532A]/15 rounded-full blur-3xl pointer-events-none" />

        {isImageBlob ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.bgPreview}
            alt={projectTitle}
            className="w-full h-auto max-h-[680px] object-cover object-top relative z-10 transition-transform duration-700 group-hover:scale-[1.01]"
          />
        ) : (
          <div
            className={`w-full h-[360px] sm:h-[480px] ${
              project.bgPreview || "bg-gradient-to-br from-neutral-900 to-[#171717]"
            } flex flex-col items-center justify-center text-center p-8 text-white relative z-10`}
          >
            <div className="w-20 h-20 rounded-3xl bg-neutral-800/80 text-white flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-105 group-hover:bg-[#FF532A] transition-all shadow-md">
              ✦
            </div>
            <h3 className="hd text-2xl sm:text-3xl font-bold max-w-[600px] mb-2">
              {projectTitle}
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              {lang === "es"
                ? "Preview oficial del desarrollo"
                : "Official development preview"}
            </span>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. VISIÓN GENERAL (Debajo de la Imagen Principal)
          ══════════════════════════════════════════════════════════════════ */}
      {hasOverview && (
        <div className="rounded-[32px] bg-neutral-50 border border-neutral-200/90 p-8 sm:p-12 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-4">
            {lang === "es" ? "✦ Visión General" : "✦ Overview"}
          </span>
          <h2 className="hd text-2xl sm:text-3xl font-bold text-[#171717] mb-4">
            {lang === "es" ? "Acerca del Proyecto" : "About the Project"}
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal max-w-4xl">
            {overviewText}
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3. EL DESAFÍO Y LA SOLUCIÓN (Opcionales - si existen)
          ══════════════════════════════════════════════════════════════════ */}
      {(hasChallenge || hasSolution) && (
        <div
          className={`grid gap-8 mb-14 ${
            hasChallenge && hasSolution
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* The Challenge */}
          {hasChallenge && (
            <div className="rounded-[32px] bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-4">
                  {lang === "es" ? "El Desafío" : "The Challenge"}
                </span>
                <h3 className="hd text-2xl font-bold text-[#171717] mb-4">
                  {lang === "es"
                    ? "El Problema del Negocio"
                    : "The Business Problem"}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {challengeText}
                </p>
              </div>
            </div>
          )}

          {/* The Solution */}
          {hasSolution && (
            <div className="rounded-[32px] bg-[#171717] text-white p-8 sm:p-10 flex flex-col justify-between border border-neutral-800 shadow-xl">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/20 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-4">
                  {lang === "es" ? "Nuestra Solución" : "Our Solution"}
                </span>
                <h3 className="hd text-2xl font-bold text-white mb-4">
                  {lang === "es"
                    ? "Arquitectura & Ejecución"
                    : "Architecture & Execution"}
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {solutionText}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          4. STACK TECNOLÓGICO (Debajo de El Desafío y La Solución)
          ══════════════════════════════════════════════════════════════════ */}
      {hasStack && (
        <div className="rounded-[32px] bg-[#171717] text-white border border-neutral-800 p-8 sm:p-10 mb-14 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/20 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-2">
                <Code2 className="w-3.5 h-3.5" />
                {lang === "es" ? "Stack Tecnológico" : "Tech Stack"}
              </span>
              <h3 className="hd text-2xl sm:text-3xl font-bold text-white">
                {lang === "es"
                  ? "Tecnologías & Herramientas"
                  : "Technologies & Tools"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm">
              {lang === "es"
                ? "Arquitectura robusta seleccionada específicamente para este proyecto."
                : "Tailored architecture selected specifically for this project."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-neutral-800/90 text-white text-xs sm:text-sm font-mono border border-neutral-700/80 hover:border-[#FF532A] hover:bg-neutral-800 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          5. SECCIÓN DE IMPACTO & RESULTADOS (Opcional)
          ══════════════════════════════════════════════════════════════════ */}
      {hasMetrics && (
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#171717] text-white p-8 sm:p-12 lg:p-14 mb-16 border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div
            className="absolute -top-12 -right-12 w-[320px] h-[320px] bg-[#FF532A]/20 rounded-full blur-[80px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF532A] block mb-2">
                {lang === "es"
                  ? "✦ RENDIMIENTO COMPROBADO"
                  : "✦ PROVEN PERFORMANCE"}
              </span>
              <h2 className="hd text-2xl sm:text-4xl font-bold text-white m-0">
                {lang === "es"
                  ? "Impacto & Resultados Clave"
                  : "Impact & Key Results"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-neutral-800 bg-[#242427] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF532A]/60 transition-colors"
                >
                  <div className="hd text-4xl sm:text-5xl font-extrabold text-[#FF532A] mb-2 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-neutral-300 leading-snug">
                    {metric.label?.[lang] || metric.label?.es}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          6. CARACTERÍSTICAS FUNCIONALES (Opcional)
          ══════════════════════════════════════════════════════════════════ */}
      {hasFeatures && (
        <div className="rounded-[32px] bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-4">
            {lang === "es" ? "Capacidades" : "Capabilities"}
          </span>
          <h2 className="hd text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
            {lang === "es"
              ? "Características Implementadas"
              : "Key Features Implemented"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuresList.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF532A]/10 text-[#FF532A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-medium text-neutral-700 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          7. ASÍ SE VE (SOLO si hay capturas adicionales en galería)
          ══════════════════════════════════════════════════════════════════ */}
      {hasGallery && (
        <ProjectGallery
          mainImage={project.bgPreview}
          gallery={project.gallery}
          title={projectTitle}
          lang={lang}
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════
          8. COMENTARIO / TESTIMONIO DEL CLIENTE (SOLO si tiene quote)
          ══════════════════════════════════════════════════════════════════ */}
      {hasTestimonial && (
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#171717] text-white p-8 sm:p-12 mb-16 border border-neutral-800 shadow-xl relative overflow-hidden text-center flex flex-col items-center">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[200px] bg-[#FF532A]/10 rounded-full blur-[70px] pointer-events-none"
            aria-hidden="true"
          />

          <Quote className="w-10 h-10 text-[#FF532A] mb-4 opacity-80" />

          <p className="hd text-lg sm:text-2xl font-semibold text-neutral-100 max-w-[760px] leading-relaxed mb-6 italic relative z-10">
            &ldquo;{quoteText}&rdquo;
          </p>

          {(project.testimonial?.name || roleText) && (
            <div className="relative z-10 flex flex-col items-center">
              {project.testimonial?.name && (
                <span className="font-bold text-white text-base">
                  {project.testimonial.name}
                </span>
              )}
              {roleText && (
                <span className="text-xs text-[#FF532A] font-medium tracking-wide uppercase mt-0.5">
                  {roleText}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          9. CARRUSEL / EXPLORADOR DE LOS DEMÁS PROYECTOS
          ══════════════════════════════════════════════════════════════════ */}
      {otherProjects.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF532A] block mb-1">
                {lang === "es" ? "MÁS CASOS DE ÉXITO" : "MORE CASE STUDIES"}
              </span>
              <h3 className="hd text-2xl sm:text-3xl font-bold text-[#171717] m-0">
                {lang === "es" ? "Explora otros proyectos" : "Explore other projects"}
              </h3>
            </div>

            <Link
              href="/projects"
              className="text-xs sm:text-sm font-semibold text-[#FF532A] hover:text-[#E5451D] flex items-center gap-1 transition-colors"
            >
              <span>{lang === "es" ? "Ver todos" : "View all"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Carrusel horizontal deslizable */}
          <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-neutral-300">
            {otherProjects.map((item) => {
              const itemTitle =
                typeof item.title === "object"
                  ? item.title[lang] || item.title.es || item.title.en
                  : item.title;

              const itemIsImg =
                item.bgPreview?.startsWith("http") ||
                item.bgPreview?.startsWith("/");
              const itemCategory =
                item.categoryLabel?.[lang] || item.categoryLabel?.es || "Project";
              const itemTagline =
                item.tagline?.[lang] || item.tagline?.es || "";

              return (
                <Link
                  key={item.id}
                  href={`/projects/${item.slug}`}
                  className="snap-start shrink-0 w-[290px] sm:w-[340px] group flex flex-col rounded-3xl bg-neutral-50/90 hover:bg-white p-4 sm:p-5 transition-all duration-300 border border-neutral-200/80 hover:border-[#FF532A]/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div
                    className={`w-full h-[180px] rounded-2xl ${
                      !itemIsImg ? item.bgPreview : "bg-neutral-900"
                    } p-4 flex flex-col justify-between text-white relative overflow-hidden mb-4`}
                    style={
                      itemIsImg
                        ? {
                            backgroundImage: `url(${item.bgPreview})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    {itemIsImg && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    )}

                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold">
                        {itemCategory}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white text-[#171717] flex items-center justify-center group-hover:bg-[#FF532A] group-hover:text-white transition-all shadow-md">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="z-10 mt-auto">
                      <span className="text-[11px] font-mono text-neutral-200 uppercase tracking-wider block font-bold drop-shadow-sm">
                        {item.client || "Stellaris"}
                      </span>
                    </div>
                  </div>

                  <h4 className="hd text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-1 mb-1">
                    {itemTitle}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed m-0">
                    {itemTagline}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          10. BANNER CTA NARANJA
          ══════════════════════════════════════════════════════════════════ */}
      <div className="rounded-[36px] sm:rounded-[44px] bg-[#FF532A] text-white p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-xl shadow-[#FF532A]/20">
        <h2 className="hd text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-[700px] leading-[1.15] mb-3">
          {lang === "es"
            ? "¿Tienes una idea en mente? Platiquemos"
            : "Have an idea in mind? Let's talk"}
        </h2>
        <p className="text-white/90 text-sm sm:text-base max-w-[520px] mb-6 font-normal">
          {lang === "es"
            ? "Sin compromisos ni presiones. Cuéntanos qué buscas y te compartimos ideas o una cotización inicial sin costo."
            : "No pressure or commitments. Tell us what you need and we'll share ideas or a free initial estimate."}
        </p>
        <Link
          href="/#contact"
          className="px-8 py-3.5 rounded-full bg-white text-[#171717] hover:bg-neutral-100 text-sm sm:text-base font-bold shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
        >
          <span>
            {lang === "es"
              ? "Conversar sobre mi proyecto"
              : "Discuss my project"}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#FF532A]" />
        </Link>
      </div>
    </div>
  );
}
