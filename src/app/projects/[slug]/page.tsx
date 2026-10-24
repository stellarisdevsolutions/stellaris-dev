import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, User, Layers, Quote } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { getProjectBySlug, getAllProjects } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Filtrar los otros proyectos para el carrusel de proyectos
  const otherProjects = PROJECTS.filter((p) => p.slug !== slug);

  // Testimonio del cliente adaptado a cada proyecto
  const projectTestimonials: Record<
    string,
    { quote: string; name: string; role: string }
  > = {
    "food-express": {
      quote:
        "Stellaris Dev entendió exactamente la urgencia de nuestro negocio. En menos de dos semanas teníamos el sistema de pedidos corriendo al 100% y nuestras ventas por canal propio aumentaron exponencialmente.",
      name: "Rodrigo Morales",
      role: "Director de Operaciones, Food Express",
    },
    "nexus-saas": {
      quote:
        "La arquitectura y velocidad que lograron para Nexus SaaS dejó asombrados a nuestros inversores. La plataforma no titubea ni un milisegundo al procesar miles de registros simultáneos.",
      name: "Elena Vázquez",
      role: "Co-Founder & CTO, Nexus Analytics",
    },
    "aura-boutique": {
      quote:
        "Buscábamos un diseño editorial que pudiera competir con las mejores marcas europeas y lo superaron con creces. El feedback de nuestros clientes sobre la experiencia de compra ha sido insuperable.",
      name: "Camila De La Torre",
      role: "Directora Creativa, Aura Boutique",
    },
  };

  const currentTestimonial = projectTestimonials[project.slug] || {
    quote:
      "El equipo de Stellaris Dev entregó un producto de primer nivel, cuidando cada detalle visual, rendimiento y facilidad de uso.",
    name: project.client,
    role: "Cliente",
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#FF532A] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Volver a proyectos</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider">
              {project.categoryLabel.es}
            </span>
          </div>

          {/* Project Title & Tagline */}
          <div className="max-w-[880px] mb-8 sm:mb-12">
            <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.08] mb-4">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-neutral-600 leading-relaxed font-normal">
              {project.tagline.es}
            </p>
          </div>

          {/* Project Meta Details Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-10">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#FF532A]" />
                <span>Cliente</span>
              </div>
              <div className="text-sm font-semibold text-[#171717]">{project.client}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF532A]" />
                <span>Año</span>
              </div>
              <div className="text-sm font-semibold text-[#171717]">{project.year}</div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FF532A]" />
                <span>Servicio</span>
              </div>
              <div className="text-sm font-semibold text-[#171717]">{project.categoryLabel.es}</div>
            </div>

            <div className="flex items-center justify-start sm:justify-end col-span-2 sm:col-span-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-md shadow-[#FF532A]/25 transition-all hover:scale-105"
              >
                <span>Demo en Vivo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              IMAGEN / PREVIEW PRINCIPAL SUPERIOR (Simulated Browser Frame)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#171717] p-6 sm:p-12 mb-14 overflow-hidden border border-neutral-800 shadow-2xl text-white">
            {/* Ambient orange glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF532A]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Simulated Browser Frame */}
            <div className="relative rounded-2xl bg-[#242427] border border-neutral-700/80 p-4 sm:p-8 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-700/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF532A]" />
                  <span className="w-3 h-3 rounded-full bg-neutral-600" />
                  <span className="w-3 h-3 rounded-full bg-neutral-600" />
                </div>
                <div className="text-xs font-mono text-neutral-400 bg-neutral-800 px-4 py-1 rounded-full border border-neutral-700">
                  {project.slug}.stellarisdev.com
                </div>
                <div className="text-xs text-neutral-400 hidden sm:block">HTTPS / Secure 🔒</div>
              </div>

              {/* Showcase content mockup */}
              <div className="py-10 sm:py-16 flex flex-col items-center justify-center text-center px-4">
                <span className="text-xs font-bold text-[#FF532A] tracking-widest uppercase mb-2">
                  ✦ Caso de Éxito Digital ✦
                </span>
                <h3 className="hd text-2xl sm:text-4xl font-extrabold max-w-[650px] mb-4">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 max-w-[550px] leading-relaxed mb-6">
                  {project.overview.es}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1 rounded-full bg-neutral-800 text-white text-xs font-mono border border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              1. EL DESAFÍO Y LA SOLUCIÓN (ARRIBA DE IMPACTO Y RESULTADOS)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* The Challenge */}
            <div className="rounded-[32px] bg-neutral-50 border border-neutral-200/90 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-4">
                  El Desafío
                </span>
                <h3 className="hd text-2xl font-bold text-[#171717] mb-4">
                  El Problema del Negocio
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {project.challenge.es}
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="rounded-[32px] bg-[#171717] text-white p-8 sm:p-10 flex flex-col justify-between border border-neutral-800 shadow-xl">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/20 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-4">
                  Nuestra Solución
                </span>
                <h3 className="hd text-2xl font-bold text-white mb-4">
                  Arquitectura & Ejecución
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {project.solution.es}
                </p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              2. SECCIÓN DE IMPACTO & RESULTADOS (FONDO OSCURO #171717)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="rounded-[36px] sm:rounded-[44px] bg-[#171717] text-white p-8 sm:p-12 lg:p-14 mb-16 border border-neutral-800 shadow-2xl relative overflow-hidden">
            {/* Ambient orange glow */}
            <div
              className="absolute -top-12 -right-12 w-[320px] h-[320px] bg-[#FF532A]/20 rounded-full blur-[80px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF532A] block mb-2">
                  ✦ RENDIMIENTO COMPROBADO
                </span>
                <h2 className="hd text-2xl sm:text-4xl font-bold text-white m-0">
                  Impacto & Resultados Clave
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
                      {metric.label.es}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              3. ASÍ SE VE (IMAGEN GRANDE Y 2 IMÁGENES SECUNDARIAS)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <h2 className="hd text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mb-8">
              Así <span className="text-[#FF532A]">se ve</span>
            </h2>

            {/* Imagen Grande Principal del Proyecto */}
            <div className="w-full h-[320px] sm:h-[480px] lg:h-[540px] rounded-3xl bg-[#E5E5E8] flex flex-col items-center justify-center text-center p-8 mb-6 border border-neutral-200/90 shadow-sm relative overflow-hidden group">
              <div className="w-20 h-20 rounded-3xl bg-neutral-300/80 text-neutral-600 flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-105 group-hover:bg-[#FF532A] group-hover:text-white transition-all shadow-md">
                ✦
              </div>
              <span className="text-neutral-500 font-semibold text-sm sm:text-base max-w-[420px]">
                [Imagen grande del proyecto {project.title}]
              </span>
              <span className="text-xs font-mono text-neutral-400 mt-2">
                1920 × 1080 • Alta resolución • Preview interfaz completa
              </span>
            </div>

            {/* Grid con 2 Imágenes Secundarias [Imagen 2] y [Imagen 3] */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-[220px] sm:h-[260px] rounded-3xl bg-[#E5E5E8] flex flex-col items-center justify-center text-center p-6 border border-neutral-200/90 shadow-sm relative overflow-hidden">
                <span className="text-neutral-500 font-semibold text-sm sm:text-base">
                  [Imagen 2]
                </span>
                <span className="text-xs font-mono text-neutral-400 mt-1">
                  Detalle de panel / checkout / navegación móvil
                </span>
              </div>

              <div className="h-[220px] sm:h-[260px] rounded-3xl bg-[#E5E5E8] flex flex-col items-center justify-center text-center p-6 border border-neutral-200/90 shadow-sm relative overflow-hidden">
                <span className="text-neutral-500 font-semibold text-sm sm:text-base">
                  [Imagen 3]
                </span>
                <span className="text-xs font-mono text-neutral-400 mt-1">
                  Flujo de conversión y experiencia de usuario
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              4. COMENTARIO / TESTIMONIO DE COLOR OSCURO
              ══════════════════════════════════════════════════════════════════ */}
          <div className="rounded-[32px] sm:rounded-[36px] bg-[#171717] text-white p-8 sm:p-12 mb-16 border border-neutral-800 shadow-xl relative overflow-hidden text-center flex flex-col items-center">
            {/* Subtle warm glow inside testimonial */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[200px] bg-[#FF532A]/10 rounded-full blur-[70px] pointer-events-none"
              aria-hidden="true"
            />

            <Quote className="w-10 h-10 text-[#FF532A] mb-4 opacity-80" />

            <p className="hd text-lg sm:text-2xl font-semibold text-neutral-100 max-w-[760px] leading-relaxed mb-6 italic relative z-10">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </p>

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-bold text-white text-base">
                {currentTestimonial.name}
              </span>
              <span className="text-xs text-[#FF532A] font-medium tracking-wide uppercase mt-0.5">
                {currentTestimonial.role}
              </span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              5. CARRUSEL / EXPLORADOR DE LOS DEMÁS PROYECTOS (ARRIBA DEL CTA)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF532A] block mb-1">
                  MÁS CASOS DE ÉXITO
                </span>
                <h3 className="hd text-2xl sm:text-3xl font-bold text-[#171717] m-0">
                  Explora otros proyectos
                </h3>
              </div>

              <Link
                href="/projects"
                className="text-xs sm:text-sm font-semibold text-[#FF532A] hover:text-[#E5451D] flex items-center gap-1 transition-colors"
              >
                <span>Ver todos</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Carrusel horizontal deslizable en móvil y desktop */}
            <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-neutral-300">
              {otherProjects.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.slug}`}
                  className="snap-start shrink-0 w-[290px] sm:w-[340px] group flex flex-col rounded-3xl bg-neutral-50/90 hover:bg-white p-4 sm:p-5 transition-all duration-300 border border-neutral-200/80 hover:border-[#FF532A]/50 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Preview Banner */}
                  <div
                    className={`w-full h-[180px] rounded-2xl ${item.bgPreview} p-4 flex flex-col justify-between text-white relative overflow-hidden mb-4`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold">
                        {item.categoryLabel.es}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white text-[#171717] flex items-center justify-center group-hover:bg-[#FF532A] group-hover:text-white transition-all shadow-md">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="z-10 mt-auto">
                      <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider block">
                        {item.client}
                      </span>
                    </div>
                  </div>

                  <h4 className="hd text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed m-0">
                    {item.tagline.es}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              6. BANNER CTA NARANJA (TEXTO CONVERSACIONAL Y NO COMPROMETEDOR)
              ══════════════════════════════════════════════════════════════════ */}
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
