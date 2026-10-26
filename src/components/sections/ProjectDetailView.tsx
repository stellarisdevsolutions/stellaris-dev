"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between mb-8 sm:mb-10"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#0C4651] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{lang === "es" ? "Volver a proyectos" : "Back to projects"}</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C4651]/10 text-[#0C4651] text-xs font-bold uppercase tracking-wider">
          {categoryText}
        </span>
      </motion.div>

      {/* Project Title & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="max-w-[880px] mb-8 sm:mb-12"
      >
        <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.08] mb-4">
          {projectTitle}
        </h1>
        {taglineText && (
          <p className="text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
            {taglineText}
          </p>
        )}
      </motion.div>

      {/* Project Meta Details Strip (Cliente, Año, Servicio, Enlace) */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-10"
      >
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#0C4651]" />
            <span>{lang === "es" ? "Cliente" : "Client"}</span>
          </div>
          <div className="text-sm font-semibold text-[#0C4651]">
            {project.client || (lang === "es" ? "Confidencial" : "Confidential")}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0C4651]" />
            <span>{lang === "es" ? "Año" : "Year"}</span>
          </div>
          <div className="text-sm font-semibold text-[#0C4651]">
            {project.year || "2026"}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0C4651]" />
            <span>{lang === "es" ? "Servicio" : "Service"}</span>
          </div>
          <div className="text-sm font-semibold text-[#0C4651]">
            {categoryText}
          </div>
        </div>

        {project.liveUrl ? (
          <div className="flex items-center justify-start sm:justify-end col-span-2 sm:col-span-1">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0C4651] hover:bg-[#145C6A] text-[#E6FF2A] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-md shadow-[#0C4651]/20 transition-all hover:scale-105"
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
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          1. IMAGEN PRINCIPAL (Debajo de Cliente / Año / Servicio)
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="rounded-[32px] sm:rounded-[40px] bg-[#0C4651] overflow-hidden border border-[#145C6A] shadow-2xl relative mb-14 group"
      >
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
              project.bgPreview || "bg-gradient-to-br from-[#0C4651] to-[#08343D]"
            } flex flex-col items-center justify-center text-center p-8 text-white relative z-10`}
          >
            <div className="w-20 h-20 rounded-3xl bg-[#08343D] text-[#E6FF2A] border border-[#145C6A] flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-105 group-hover:bg-[#E6FF2A] group-hover:text-[#0C4651] transition-all shadow-md">
              ✦
            </div>
            <h3 className="hd text-2xl sm:text-3xl font-bold max-w-[600px] mb-2">
              {projectTitle}
            </h3>
            <span className="text-xs font-mono text-slate-300">
              {lang === "es"
                ? "Preview oficial del desarrollo"
                : "Official development preview"}
            </span>
          </div>
        )}
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          2. VISIÓN GENERAL (Debajo de la Imagen Principal)
          ══════════════════════════════════════════════════════════════════ */}
      {hasOverview && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] bg-neutral-50 border border-neutral-200/90 p-8 sm:p-12 mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C4651]/10 text-[#0C4651] text-xs font-bold uppercase tracking-wider mb-4">
            {lang === "es" ? "✦ Visión General" : "✦ Overview"}
          </span>
          <h2 className="hd text-2xl sm:text-3xl font-bold text-[#0C4651] mb-4">
            {lang === "es" ? "Acerca del Proyecto" : "About the Project"}
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal max-w-4xl">
            {overviewText}
          </p>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3. EL DESAFÍO Y LA SOLUCIÓN (Opcionales - si existen)
          ══════════════════════════════════════════════════════════════════ */}
      {(hasChallenge || hasSolution) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
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
            <div className="rounded-[32px] bg-[#0C4651] text-white p-8 sm:p-10 flex flex-col justify-between border border-[#145C6A] shadow-xl">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6FF2A]/20 text-[#E6FF2A] text-xs font-bold uppercase tracking-wider mb-4">
                  {lang === "es" ? "Nuestra Solución" : "Our Solution"}
                </span>
                <h3 className="hd text-2xl font-bold text-white mb-4">
                  {lang === "es"
                    ? "Arquitectura & Ejecución"
                    : "Architecture & Execution"}
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {solutionText}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          4. STACK TECNOLÓGICO (Debajo de El Desafío y La Solución)
          ══════════════════════════════════════════════════════════════════ */}
      {hasStack && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] bg-[#0C4651] text-white border border-[#145C6A] p-8 sm:p-10 mb-14 shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6FF2A]/20 text-[#E6FF2A] text-xs font-bold uppercase tracking-wider mb-2">
                <Code2 className="w-3.5 h-3.5" />
                {lang === "es" ? "Stack Tecnológico" : "Tech Stack"}
              </span>
              <h3 className="hd text-2xl sm:text-3xl font-bold text-white">
                {lang === "es"
                  ? "Tecnologías & Herramientas"
                  : "Technologies & Tools"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              {lang === "es"
                ? "Arquitectura robusta seleccionada específicamente para este proyecto."
                : "Tailored architecture selected specifically for this project."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-[#08343D] text-white text-xs sm:text-sm font-mono border border-[#145C6A] hover:border-[#E6FF2A] hover:bg-[#0A3942] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          5. SECCIÓN DE IMPACTO & RESULTADOS (Opcional)
          ══════════════════════════════════════════════════════════════════ */}
      {hasMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="rounded-[36px] sm:rounded-[44px] bg-[#0C4651] text-white p-8 sm:p-12 lg:p-14 mb-16 border border-[#145C6A] shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6FF2A] block mb-2">
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
                  className="rounded-3xl border border-[#145C6A] bg-[#08343D] p-6 sm:p-8 flex flex-col justify-between hover:border-[#E6FF2A]/60 transition-colors"
                >
                  <div className="hd text-4xl sm:text-5xl font-extrabold text-[#E6FF2A] mb-2 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-slate-200 leading-snug">
                    {metric.label?.[lang] || metric.label?.es}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          6. CARACTERÍSTICAS FUNCIONALES (Opcional)
          ══════════════════════════════════════════════════════════════════ */}
      {hasFeatures && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C4651]/10 text-[#0C4651] text-xs font-bold uppercase tracking-wider mb-4">
            {lang === "es" ? "Capacidades" : "Capabilities"}
          </span>
          <h2 className="hd text-2xl sm:text-3xl font-bold text-[#0C4651] mb-6">
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
                <div className="w-6 h-6 rounded-full bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-medium text-neutral-700 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] sm:rounded-[36px] bg-[#0C4651] text-white p-8 sm:p-12 mb-16 border border-[#145C6A] shadow-xl relative overflow-hidden text-center flex flex-col items-center"
        >
          <Quote className="w-10 h-10 text-[#E6FF2A] mb-4 opacity-80" />

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
                <span className="text-xs text-[#E6FF2A] font-bold tracking-wide uppercase mt-0.5">
                  {roleText}
                </span>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          9. CARRUSEL / EXPLORADOR DE LOS DEMÁS PROYECTOS
          ══════════════════════════════════════════════════════════════════ */}
      {otherProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0C4651] block mb-1">
                {lang === "es" ? "MÁS CASOS DE ÉXITO" : "MORE CASE STUDIES"}
              </span>
              <h3 className="hd text-2xl sm:text-3xl font-bold text-[#0C4651] m-0">
                {lang === "es" ? "Explora otros proyectos" : "Explore other projects"}
              </h3>
            </div>

            <Link
              href="/projects"
              className="text-xs sm:text-sm font-bold text-[#0C4651] hover:text-[#145C6A] flex items-center gap-1 transition-colors"
            >
              <span>{lang === "es" ? "Ver todos" : "View all"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Carrusel horizontal deslizable */}
          <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-[#145C6A]">
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
                  className="snap-start shrink-0 w-[290px] sm:w-[340px] group flex flex-col rounded-3xl bg-neutral-50/90 hover:bg-white p-4 sm:p-5 transition-all duration-300 border border-neutral-200/80 hover:border-[#0C4651]/50 hover:shadow-xl hover:-translate-y-1"
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
                      <div className="w-8 h-8 rounded-full bg-white text-[#0C4651] flex items-center justify-center group-hover:bg-[#0C4651] group-hover:text-[#E6FF2A] transition-all shadow-md">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="z-10 mt-auto">
                      <span className="text-[11px] font-mono text-neutral-200 uppercase tracking-wider block font-bold drop-shadow-sm">
                        {item.client || "Kano Dev"}
                      </span>
                    </div>
                  </div>

                  <h4 className="hd text-base sm:text-lg font-bold text-[#0C4651] group-hover:text-[#145C6A] transition-colors line-clamp-1 mb-1">
                    {itemTitle}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed m-0">
                    {itemTagline}
                  </p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          10. BANNER CTA PETROL TEAL & LIME
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5 }}
        className="rounded-[36px] sm:rounded-[44px] bg-[#0C4651] text-white p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-xl border border-[#145C6A]"
      >
        <h2 className="hd text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-[700px] leading-[1.15] mb-3">
          {lang === "es"
            ? "¿Tienes una idea en mente? Platiquemos"
            : "Have an idea in mind? Let's talk"}
        </h2>
        <p className="text-slate-200 text-sm sm:text-base max-w-[520px] mb-6 font-normal">
          {lang === "es"
            ? "Sin compromisos ni presiones. Cuéntanos qué buscas y te compartimos ideas o una cotización inicial sin costo."
            : "No pressure or commitments. Tell us what you need and we'll share ideas or a free initial estimate."}
        </p>
        <Link
          href="/#contact"
          className="px-8 py-3.5 rounded-full bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-sm sm:text-base font-bold shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>
            {lang === "es"
              ? "Conversar sobre mi proyecto"
              : "Discuss my project"}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#0C4651]" />
        </Link>
      </motion.div>
    </div>
  );
}
