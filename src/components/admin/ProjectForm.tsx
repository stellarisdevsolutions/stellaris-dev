"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";
import { saveProjectAction, deleteBlobsAction } from "@/app/admin/actions";
import { ImageUploader } from "./ImageUploader";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Layers,
  BarChart3,
  ListChecks,
  Code2,
  Globe,
  AlertCircle,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Images,
  ExternalLink,
  Quote,
} from "lucide-react";

interface ProjectFormProps {
  initialData?: ProjectItem | null;
  isNew?: boolean;
}

export function ProjectForm({ initialData, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Slug editing control (locked by default on edit mode)
  const [isSlugUnlocked, setIsSlugUnlocked] = useState(isNew);
  const [manualSlugEdited, setManualSlugEdited] = useState(!isNew);
  const [pendingBlobDeletions, setPendingBlobDeletions] = useState<string[]>([]);

  const [formData, setFormData] = useState<ProjectItem>(
    initialData
      ? {
          ...initialData,
          title:
            typeof initialData.title === "object"
              ? initialData.title
              : {
                  en: (initialData.title as string) || "",
                  es: (initialData.title as string) || "",
                },
          tagline: {
            en: initialData.tagline?.en || initialData.tagline?.es || "",
            es: initialData.tagline?.es || initialData.tagline?.en || "",
          },
          overview: {
            en: initialData.overview?.en || initialData.overview?.es || "",
            es: initialData.overview?.es || initialData.overview?.en || "",
          },
          challenge: {
            en: initialData.challenge?.en || initialData.challenge?.es || "",
            es: initialData.challenge?.es || initialData.challenge?.en || "",
          },
          solution: {
            en: initialData.solution?.en || initialData.solution?.es || "",
            es: initialData.solution?.es || initialData.solution?.en || "",
          },
          testimonial: {
            quote:
              typeof initialData.testimonial?.quote === "object"
                ? initialData.testimonial.quote
                : {
                    en: (initialData.testimonial?.quote as string) || "",
                    es: (initialData.testimonial?.quote as string) || "",
                  },
            name: initialData.testimonial?.name || "",
            role:
              typeof initialData.testimonial?.role === "object"
                ? initialData.testimonial.role
                : {
                    en: (initialData.testimonial?.role as string) || "",
                    es: (initialData.testimonial?.role as string) || "",
                  },
          },
        }
      : {
          id: "project-" + Date.now(),
          slug: "",
          title: { en: "", es: "" },
          client: "",
          year: "2026",
          category: "web",
          categoryLabel: {
            en: "Web Portal & Dashboard",
            es: "Portal Web & Dashboard",
          },
          tagline: { en: "", es: "" },
          overview: { en: "", es: "" },
          challenge: { en: "", es: "" },
          solution: { en: "", es: "" },
          metrics: [
            {
              value: "+185%",
              label: {
                en: "Increase in mobile orders",
                es: "Incremento en pedidos móviles",
              },
            },
            {
              value: "0.6s",
              label: {
                en: "Average load speed",
                es: "Tiempo de carga promedio",
              },
            },
            {
              value: "100/100",
              label: {
                en: "Google PageSpeed score",
                es: "Puntuación PageSpeed",
              },
            },
          ],
          features: {
            en: [
              "Built with Next.js 16 and React 19",
              "Ultralight responsive design",
              "Real-time API integration",
            ],
            es: [
              "Desarrollado con Next.js 16 y React 19",
              "Diseño ultraligero y responsivo",
              "Integración con API en tiempo real",
            ],
          },
          stack: ["Next.js 16", "React 19", "Tailwind CSS", "Postgres"],
          liveUrl: "https://stellaris-dev.vercel.app",
          liveUrlLabel: "Demo en Vivo",
          gallery: [],
          testimonial: {
            quote: { en: "", es: "" },
            name: "",
            role: { en: "", es: "" },
          },
          bgPreview: "",
        }
  );

  // Auto-generate slug from English title (or Spanish) if creating and not manually modified
  const handleTitleChange = (lang: "en" | "es", val: string) => {
    setFormData((prev) => {
      const currentTitle =
        typeof prev.title === "object"
          ? { ...prev.title }
          : { en: prev.title || "", es: prev.title || "" };

      currentTitle[lang] = val;

      const sourceForSlug = lang === "en" ? val : (currentTitle.en || val);
      const generatedSlug =
        isNew && !manualSlugEdited
          ? sourceForSlug
              .toLowerCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
          : prev.slug;

      return { ...prev, title: currentTitle, slug: generatedSlug };
    });
  };

  // Metrics (Bilingual: EN & ES)
  const handleMetricChange = (
    index: number,
    field: "value" | "labelEn" | "labelEs",
    val: string
  ) => {
    const updated = [...formData.metrics];
    if (field === "value") {
      updated[index] = { ...updated[index], value: val };
    } else if (field === "labelEn") {
      updated[index] = {
        ...updated[index],
        label: {
          en: val,
          es: updated[index].label?.es || "",
        },
      };
    } else if (field === "labelEs") {
      updated[index] = {
        ...updated[index],
        label: {
          en: updated[index].label?.en || "",
          es: val,
        },
      };
    }
    setFormData({ ...formData, metrics: updated });
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      metrics: [
        ...formData.metrics,
        {
          value: "+50%",
          label: {
            en: "New business outcome metric",
            es: "Nueva métrica de resultado",
          },
        },
      ],
    });
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index),
    });
  };

  // Features (Bilingual: EN first, then ES)
  const handleFeatureChange = (
    index: number,
    lang: "en" | "es",
    val: string
  ) => {
    const currentList = [...(formData.features[lang] || [])];
    currentList[index] = val;
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: currentList,
      },
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: {
        en: [...(formData.features.en || []), "New feature in English"],
        es: [...(formData.features.es || []), "Nueva característica en español"],
      },
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: {
        en: (formData.features.en || []).filter((_, i) => i !== index),
        es: (formData.features.es || []).filter((_, i) => i !== index),
      },
    });
  };

  // Stack (item-by-item)
  const handleStackChange = (index: number, val: string) => {
    const updated = [...formData.stack];
    updated[index] = val;
    setFormData({ ...formData, stack: updated });
  };

  const addStackTech = () => {
    setFormData({
      ...formData,
      stack: [...formData.stack, "Nueva Tecnología"],
    });
  };

  const removeStackTech = (index: number) => {
    setFormData({
      ...formData,
      stack: formData.stack.filter((_, i) => i !== index),
    });
  };

  // Main Cover Image change
  const handleCoverChange = (newUrl: string) => {
    // If replacing or clearing a Vercel Blob image, queue the old one for physical deletion on Save
    if (
      formData.bgPreview &&
      formData.bgPreview !== newUrl &&
      formData.bgPreview.includes(".blob.vercel-storage.com")
    ) {
      setPendingBlobDeletions((prev) => [...prev, formData.bgPreview]);
    }
    setFormData((prev) => ({ ...prev, bgPreview: newUrl }));
  };

  // Gallery (Additional Images)
  const addGalleryImage = (url: string) => {
    if (!url) return;
    const current = formData.gallery || [];
    setFormData({
      ...formData,
      gallery: [...current, url],
    });
  };

  const removeGalleryImage = (index: number) => {
    const current = formData.gallery || [];
    const removedUrl = current[index];
    // Queue for physical deletion on Save only if it belongs to Vercel Blob
    if (removedUrl && removedUrl.includes(".blob.vercel-storage.com")) {
      setPendingBlobDeletions((prev) => [...prev, removedUrl]);
    }
    setFormData({
      ...formData,
      gallery: current.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleObj =
      typeof formData.title === "object"
        ? formData.title
        : { en: formData.title || "", es: formData.title || "" };

    // Validation
    if (!titleObj.en?.trim() || !titleObj.es?.trim()) {
      setError("El título del proyecto es obligatorio en ambos idiomas (Inglés y Español).");
      return;
    }
    if (!formData.slug?.trim()) {
      setError("El slug del proyecto es obligatorio.");
      return;
    }
    if (!formData.tagline?.en?.trim() || !formData.tagline?.es?.trim()) {
      setError("El Tagline es obligatorio en ambos idiomas (Inglés y Español).");
      return;
    }
    if (!formData.overview?.en?.trim() || !formData.overview?.es?.trim()) {
      setError("La Visión General es obligatoria en ambos idiomas (Inglés y Español).");
      return;
    }
    if (!formData.bgPreview?.trim()) {
      setError("Debes subir o asignar una Imagen Principal para el proyecto (obligatorio).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await saveProjectAction(formData);

      // Clean up physically deleted images from Vercel Blob only upon saving
      if (pendingBlobDeletions.length > 0) {
        try {
          await deleteBlobsAction(pendingBlobDeletions);
        } catch (cleanupErr) {
          console.warn("Error eliminando blobs antiguos de Vercel Blob:", cleanupErr);
        }
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al guardar el proyecto.");
      setLoading(false);
    }
  };

  const displayTitle =
    typeof formData.title === "object"
      ? formData.title.es || formData.title.en || ""
      : formData.title || "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF532A]" />
              {isNew ? "Crear Nuevo Proyecto" : `Editar Proyecto: ${displayTitle}`}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Gestión bilingüe: contenido en Inglés (principal) y versión en Español.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF532A]/20 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {loading ? "Guardando..." : "Guardar Proyecto"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Core Info, Story, Features, Testimonial */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Identificación y Datos Básicos */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Globe className="w-4 h-4 text-[#FF532A]" />
              Datos Principales
            </h2>

            <div className="space-y-4">
              {/* TÍTULO BILINGÜE: EN PRIMERO, LUEGO ES */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-white">
                  Título del Proyecto <span className="text-[#FF532A]">*</span>
                </label>

                {/* Title EN */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                      🇺🇸 EN
                    </span>
                    <span>Project Title in English (Primary)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={
                      typeof formData.title === "object"
                        ? formData.title.en
                        : formData.title || ""
                    }
                    onChange={(e) => handleTitleChange("en", e.target.value)}
                    placeholder="e.g. Food Express - Delivery & Restaurant App"
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-[#FF532A] transition-colors"
                  />
                </div>

                {/* Title ES */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                      🇪🇸 ES
                    </span>
                    <span>Título del Proyecto en Español</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={
                      typeof formData.title === "object"
                        ? formData.title.es
                        : formData.title || ""
                    }
                    onChange={(e) => handleTitleChange("es", e.target.value)}
                    placeholder="Ej: Food Express - App de Delivery & Restaurantes"
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-[#FF532A] transition-colors"
                  />
                </div>
              </div>

              {/* Slug with lock/unlock on edit */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Slug de la URL <span className="text-[#FF532A]">*</span>
                  </label>
                  {!isNew && (
                    <button
                      type="button"
                      onClick={() => setIsSlugUnlocked(!isSlugUnlocked)}
                      className="text-[11px] text-[#FF532A] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      {isSlugUnlocked ? (
                        <>
                          <Lock className="w-3 h-3" /> Bloquear Slug
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3" /> Editar Slug
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    readOnly={!isSlugUnlocked}
                    value={formData.slug}
                    onChange={(e) => {
                      setManualSlugEdited(true);
                      setFormData({
                        ...formData,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-"),
                      });
                    }}
                    placeholder="food-express"
                    className={`w-full bg-[#202024] border rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none transition-colors ${
                      !isSlugUnlocked
                        ? "text-neutral-400 border-white/5 bg-neutral-900/50 cursor-not-allowed"
                        : "text-white border-[#FF532A]/50 focus:border-[#FF532A]"
                    }`}
                  />
                  {!isSlugUnlocked && (
                    <Lock className="w-3.5 h-3.5 text-neutral-500 absolute right-3.5 top-3" />
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  URL pública:{" "}
                  <span className="text-neutral-300 font-mono">
                    /projects/{formData.slug || "slug-del-proyecto"}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Cliente / Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Ej: Food Express Latam"
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Año
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as "landing" | "web" | "ecommerce";
                      const labels: Record<string, { es: string; en: string }> = {
                        landing: {
                          en: "Landing Page / Conversion",
                          es: "Landing Page / Conversión",
                        },
                        web: {
                          en: "Web Portal & Dashboard",
                          es: "Portal Web & Dashboard",
                        },
                        ecommerce: {
                          en: "Online Store / E-Commerce",
                          es: "Tienda Online / E-Commerce",
                        },
                      };
                      setFormData({
                        ...formData,
                        category: cat,
                        categoryLabel: labels[cat] || {
                          en: "Web App",
                          es: "Web App",
                        },
                      });
                    }}
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                  >
                    <option value="landing">Landing Page</option>
                    <option value="web">Portal Web / SaaS</option>
                    <option value="ecommerce">E-Commerce</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Tagline y Visión General (Bilingüe: Primero EN, luego ES) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF532A]" />
                Resumen & Visión General
              </h2>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">
                Bilingüe (EN primero, luego ES)
              </span>
            </div>

            {/* TAGLINE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white">
                  Tagline (Resumen de Impacto en 1 frase) <span className="text-[#FF532A]">*</span>
                </label>
              </div>

              {/* Tagline EN */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    🇺🇸 EN
                  </span>
                  <span>Versión en Inglés (Primary)</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline.en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tagline: { ...formData.tagline, en: e.target.value },
                    })
                  }
                  placeholder="High-speed online delivery platform with direct kitchen order routing..."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              {/* Tagline ES */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                    🇪🇸 ES
                  </span>
                  <span>Versión en Español</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline.es}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tagline: { ...formData.tagline, es: e.target.value },
                    })
                  }
                  placeholder="Plataforma de delivery ultrarrápida con pedidos automatizados a cocina..."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>
            </div>

            {/* OVERVIEW */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              <label className="block text-xs font-bold text-white">
                Visión General / Contexto Completo <span className="text-[#FF532A]">*</span>
              </label>

              {/* Overview EN */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    🇺🇸 EN
                  </span>
                  <span>Overview in English (Primary)</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.overview.en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      overview: { ...formData.overview, en: e.target.value },
                    })
                  }
                  placeholder="Explain what the client needed, the initial scope, and why development started..."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                />
              </div>

              {/* Overview ES */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                    🇪🇸 ES
                  </span>
                  <span>Visión General en Español</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.overview.es}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      overview: { ...formData.overview, es: e.target.value },
                    })
                  }
                  placeholder="Explica qué necesitaba el cliente, el alcance inicial y por qué se inició el desarrollo..."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 3: El Desafío y Nuestra Solución (Opcionales - Bilingüe) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="border-b border-white/5 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#FF532A]" />
                El Desafío & Nuestra Solución <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Ingresa primero la versión en inglés y luego en español. Si no se especifican, se omitirá la sección.
              </p>
            </div>

            {/* EL DESAFÍO (EN & ES) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-white">
                El Desafío / The Challenge
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono font-bold">
                      🇺🇸 EN
                    </span>
                    <span>The Challenge (English)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.challenge?.en || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        challenge: {
                          en: e.target.value,
                          es: formData.challenge?.es || "",
                        },
                      })
                    }
                    placeholder="The legacy site was slow and lost 40% of mobile users..."
                    className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                      🇪🇸 ES
                    </span>
                    <span>El Desafío (Español)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.challenge?.es || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        challenge: {
                          en: formData.challenge?.en || "",
                          es: e.target.value,
                        },
                      })
                    }
                    placeholder="El sitio web anterior tardaba más de 4s en cargar y perdía clientes..."
                    className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* NUESTRA SOLUCIÓN (EN & ES) */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              <label className="block text-xs font-bold text-white">
                Nuestra Solución / Our Solution
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono font-bold">
                      🇺🇸 EN
                    </span>
                    <span>Our Solution (English)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.solution?.en || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        solution: {
                          en: e.target.value,
                          es: formData.solution?.es || "",
                        },
                      })
                    }
                    placeholder="We engineered an ultra-fast Web App using Next.js 16 and Server Actions..."
                    className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                      🇪🇸 ES
                    </span>
                    <span>Nuestra Solución (Español)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.solution?.es || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        solution: {
                          en: formData.solution?.en || "",
                          es: e.target.value,
                        },
                      })
                    }
                    placeholder="Desarrollamos una Web App con Next.js 16 y React 19 optimizada con Server Actions..."
                    className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Métricas de Impacto (Opcional - Bilingüe) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#FF532A]" />
                  Métricas de Impacto <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Cifras cuantificables con descripción en inglés y español.
                </p>
              </div>
              <button
                type="button"
                onClick={addMetric}
                className="inline-flex items-center gap-1.5 text-xs text-[#FF532A] hover:underline font-semibold cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir Métrica
              </button>
            </div>

            <div className="space-y-3">
              {formData.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#202024] p-3.5 rounded-xl border border-white/5 relative group flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                >
                  <div className="w-full sm:w-28 shrink-0">
                    <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                      Valor
                    </label>
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                      placeholder="+100%"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-bold text-sm outline-none focus:border-[#FF532A]"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div>
                      <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-1">
                        <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono">
                          🇺🇸 EN
                        </span>
                        <span>Description (English)</span>
                      </label>
                      <input
                        type="text"
                        value={m.label.en}
                        onChange={(e) => handleMetricChange(idx, "labelEn", e.target.value)}
                        placeholder="Increase in mobile sales"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs outline-none focus:border-[#FF532A]"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-1">
                        <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                          🇪🇸 ES
                        </span>
                        <span>Descripción (Español)</span>
                      </label>
                      <input
                        type="text"
                        value={m.label.es}
                        onChange={(e) => handleMetricChange(idx, "labelEs", e.target.value)}
                        placeholder="Incremento en ventas móviles"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs outline-none focus:border-[#FF532A]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeMetric(idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer self-start sm:self-center"
                    title="Eliminar métrica"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {formData.metrics.length === 0 && (
              <p className="text-xs text-neutral-500 py-3 text-center">
                Sin métricas añadidas. Haz clic en &ldquo;Añadir Métrica&rdquo;.
              </p>
            )}
          </div>

          {/* Card 5: Características Funcionales (Opcional - Bilingüe) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-[#FF532A]" />
                  Características Funcionales Incluidas <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Cada característica tiene su versión en inglés arriba y en español abajo.
                </p>
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 text-xs text-[#FF532A] hover:underline font-semibold cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir Característica
              </button>
            </div>

            <div className="space-y-3">
              {formData.features.es.map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#202024] p-3 rounded-xl border border-white/5 flex items-start gap-2.5"
                >
                  <span className="w-6 h-6 rounded-lg bg-white/5 text-neutral-400 flex items-center justify-center text-xs shrink-0 font-mono mt-1">
                    {idx + 1}
                  </span>

                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                        <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono">
                          🇺🇸 EN
                        </span>
                        <span>Feature in English</span>
                      </label>
                      <input
                        type="text"
                        value={formData.features.en?.[idx] || ""}
                        onChange={(e) => handleFeatureChange(idx, "en", e.target.value)}
                        placeholder="Interactive food catalog with custom addons & sizes..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                        <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                          🇪🇸 ES
                        </span>
                        <span>Característica en Español</span>
                      </label>
                      <input
                        type="text"
                        value={formData.features.es?.[idx] || ""}
                        onChange={(e) => handleFeatureChange(idx, "es", e.target.value)}
                        placeholder="Catálogo interactivo con variantes e ingredientes..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer mt-1"
                    title="Eliminar característica"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {formData.features.es.length === 0 && (
              <p className="text-xs text-neutral-500 py-3 text-center">
                Sin características añadidas. Haz clic en &ldquo;Añadir Característica&rdquo;.
              </p>
            )}
          </div>

          {/* Card 6: Testimonio / Comentario del Cliente (Opcional - Bilingüe) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="border-b border-white/5 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#FF532A]" />
                Comentario / Reseña del Cliente <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Cita bilingüe. Puede ir con o sin nombre ni cargo.
              </p>
            </div>

            {/* CITA EN INGLÉS */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-1.5">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                  🇺🇸 EN
                </span>
                <span>Client Quote (English)</span>
              </label>
              <textarea
                rows={2}
                value={
                  typeof formData.testimonial?.quote === "object"
                    ? formData.testimonial.quote.en
                    : (formData.testimonial?.quote as string) || ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonial: {
                      ...formData.testimonial,
                      quote: {
                        en: e.target.value,
                        es:
                          typeof formData.testimonial?.quote === "object"
                            ? formData.testimonial.quote.es
                            : (formData.testimonial?.quote as string) || "",
                      },
                    },
                  })
                }
                placeholder="Stellaris Dev understood our business urgency. In less than two weeks our system was running 100%..."
                className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
              />
            </div>

            {/* CITA EN ESPAÑOL */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-1.5">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                  🇪🇸 ES
                </span>
                <span>Cita / Reseña en Español</span>
              </label>
              <textarea
                rows={2}
                value={
                  typeof formData.testimonial?.quote === "object"
                    ? formData.testimonial.quote.es
                    : (formData.testimonial?.quote as string) || ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonial: {
                      ...formData.testimonial,
                      quote: {
                        en:
                          typeof formData.testimonial?.quote === "object"
                            ? formData.testimonial.quote.en
                            : (formData.testimonial?.quote as string) || "",
                        es: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Stellaris Dev entendió exactamente la urgencia de nuestro negocio. En menos de dos semanas..."
                className="w-full bg-[#202024] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Nombre del Cliente <span className="text-neutral-500 font-normal text-[10px]">(Opcional)</span>
                </label>
                <input
                  type="text"
                  value={formData.testimonial?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonial: {
                        ...formData.testimonial,
                        name: e.target.value,
                      },
                    })
                  }
                  placeholder="Ej: Rodrigo Morales"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono">
                    🇺🇸 EN
                  </span>
                  <span>Role / Company</span>
                </label>
                <input
                  type="text"
                  value={
                    typeof formData.testimonial?.role === "object"
                      ? formData.testimonial.role.en
                      : ((formData.testimonial?.role as string) || "")
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonial: {
                        ...formData.testimonial,
                        role: {
                          en: e.target.value,
                          es:
                            typeof formData.testimonial?.role === "object"
                              ? formData.testimonial.role.es
                              : ((formData.testimonial?.role as string) || ""),
                        },
                      },
                    })
                  }
                  placeholder="Operations Director"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                    🇪🇸 ES
                  </span>
                  <span>Cargo / Empresa</span>
                </label>
                <input
                  type="text"
                  value={
                    typeof formData.testimonial?.role === "object"
                      ? formData.testimonial.role.es
                      : ((formData.testimonial?.role as string) || "")
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonial: {
                        ...formData.testimonial,
                        role: {
                          en:
                            typeof formData.testimonial?.role === "object"
                              ? formData.testimonial.role.en
                              : ((formData.testimonial?.role as string) || ""),
                          es: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Director de Operaciones"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Media, Links & Tech Stack */}
        <div className="space-y-6">
          {/* Card: Imagen Principal (Obligatoria) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Sparkles className="w-4 h-4 text-[#FF532A]" />
              Imagen Principal del Proyecto <span className="text-[#FF532A]">*</span>
            </h2>

            <ImageUploader
              label="Portada / Captura Principal (Vercel Blob)"
              value={formData.bgPreview?.startsWith("http") ? formData.bgPreview : ""}
              onChange={handleCoverChange}
            />
            <p className="text-[10px] text-neutral-400 leading-relaxed">
              Esta imagen se utilizará en la tarjeta del catálogo y como portada visual principal en el detalle del proyecto.
            </p>
          </div>

          {/* Card: Galería de Imágenes Adicionales (Opcional) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Images className="w-4 h-4 text-[#FF532A]" />
                  Galería Adicional <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Para la sección interactiva &ldquo;Así se ve&rdquo; (capturas secundarias).
                </p>
              </div>
            </div>

            {/* Existing gallery thumbnails */}
            {formData.gallery && formData.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {formData.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl bg-black/40 border border-white/10 overflow-hidden group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`Galería ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 text-red-400 hover:text-white transition-colors cursor-pointer"
                      title="Eliminar de galería"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload extra image */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1.5">
                Subir captura a la galería:
              </label>
              <ImageUploader
                label=""
                value=""
                onChange={(url) => {
                  if (url) addGalleryImage(url);
                }}
              />
            </div>
          </div>

          {/* Card: URL del Proyecto & Selector de Botón (Opcional) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <ExternalLink className="w-4 h-4 text-[#FF532A]" />
              Enlace del Proyecto <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                URL del Proyecto en Vivo
              </label>
              <input
                type="url"
                value={formData.liveUrl || ""}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://cliente.com..."
                className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Texto del Botón de Enlace
              </label>
              <select
                value={formData.liveUrlLabel || "Demo en Vivo"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    liveUrlLabel: e.target.value as "Demo en Vivo" | "Ver Diseño",
                  })
                }
                className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
              >
                <option value="Demo en Vivo">Demo en Vivo / Live Demo</option>
                <option value="Ver Diseño">Ver Diseño / View Design</option>
              </select>
              <p className="text-[10px] text-neutral-400 mt-1">
                Se traduce automáticamente a &ldquo;Live Demo&rdquo; o &ldquo;View Design&rdquo; cuando el visitante esté en inglés.
              </p>
            </div>
          </div>

          {/* Card: Stack Tecnológico */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FF532A]" />
                  Stack Tecnológico
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Herramientas y lenguajes empleados.
                </p>
              </div>
              <button
                type="button"
                onClick={addStackTech}
                className="inline-flex items-center gap-1.5 text-xs text-[#FF532A] hover:underline font-semibold cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir
              </button>
            </div>

            {/* List item by item */}
            <div className="space-y-2">
              {formData.stack.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-white/5 text-neutral-400 flex items-center justify-center text-[10px] shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleStackChange(idx, e.target.value)}
                    placeholder="Ej. Next.js 16"
                    className="flex-1 bg-[#202024] border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                  />
                  <button
                    type="button"
                    onClick={() => removeStackTech(idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Eliminar tecnología"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Live badge preview */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
              {formData.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
