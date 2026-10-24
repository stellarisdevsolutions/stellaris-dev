"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MarketplaceProduct, getMarketplaceTitle } from "@/data/marketplace";
import { saveMarketplaceProductAction, deleteBlobsAction } from "@/app/admin/actions";
import { ImageUploader } from "./ImageUploader";
import {
  ArrowLeft,
  Save,
  Sparkles,
  ShoppingBag,
  Cpu,
  Layers,
  Code2,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Images,
  ExternalLink,
  HelpCircle,
  Globe,
  Tag,
  ShieldCheck,
} from "lucide-react";

interface MarketplaceFormProps {
  initialData?: MarketplaceProduct | null;
  isNew?: boolean;
}

export function MarketplaceForm({
  initialData,
  isNew = false,
}: MarketplaceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Slug locking state: readOnly when editing by default
  const [isSlugUnlocked, setIsSlugUnlocked] = useState(isNew);
  const [manualSlugEdited, setManualSlugEdited] = useState(false);
  const [pendingBlobDeletions, setPendingBlobDeletions] = useState<string[]>([]);

  const [formData, setFormData] = useState<MarketplaceProduct>(() => {
    if (initialData) {
      return {
        ...initialData,
        title:
          typeof initialData.title === "object"
            ? initialData.title
            : {
                en: (initialData.title as string) || "",
                es: (initialData.title as string) || "",
              },
        image: initialData.image || "",
        gallery: initialData.gallery || [],
        tag: {
          en: initialData.tag?.en || initialData.tag?.es || "🔥 Best Seller",
          es: initialData.tag?.es || initialData.tag?.en || "🔥 Más Vendido",
        },
        shortDesc: {
          en: initialData.shortDesc?.en || initialData.shortDesc?.es || "",
          es: initialData.shortDesc?.es || initialData.shortDesc?.en || "",
        },
        fullDesc: {
          en: initialData.fullDesc?.en || initialData.fullDesc?.es || "",
          es: initialData.fullDesc?.es || initialData.fullDesc?.en || "",
        },
        architecture: initialData.architecture || {
          frontend: "Next.js 16 (App Router) + React 19",
          backend: "Next.js Server Actions & Route Handlers",
          database: "PostgreSQL (Supabase o Vercel Postgres)",
          styling: "Tailwind CSS v4 + Lucide Icons",
          auth: "Supabase Auth / NextAuth con roles",
          deployment: "Listo para desplegar en Vercel con 1 clic",
        },
        features: {
          en: initialData.features?.en || [],
          es: initialData.features?.es || [],
        },
        includedFiles: {
          en: initialData.includedFiles?.en || [],
          es: initialData.includedFiles?.es || [],
        },
        stack: initialData.stack || ["Next.js 16", "React 19", "Tailwind CSS"],
        demoUrl: initialData.demoUrl || "https://stellaris-dev.vercel.app",
        faqs: initialData.faqs || [],
      };
    }

    return {
      id: "product-" + Date.now(),
      slug: "",
      title: { en: "", es: "" },
      image: "",
      gallery: [],
      category: "saas",
      categoryLabel: { en: "SaaS & Dashboard", es: "SaaS & Dashboard" },
      tag: { en: "🔥 Best Seller", es: "🔥 Más Vendido" },
      price: "$189",
      originalPrice: "$299",
      rating: "4.9",
      salesCount: 1,
      shortDesc: {
        en: "",
        es: "",
      },
      fullDesc: {
        en: "",
        es: "",
      },
      architecture: {
        frontend: "Next.js 16 (App Router) + React 19",
        backend: "Next.js Server Actions & Route Handlers",
        database: "PostgreSQL (Supabase o Vercel Postgres)",
        styling: "Tailwind CSS v4 + Lucide Icons",
        auth: "Supabase Auth / NextAuth con roles",
        deployment: "Listo para desplegar en Vercel con 1 clic",
      },
      features: {
        en: [
          "Complete sign up & login flow (Google, GitHub, Email)",
          "Official Stripe Checkout & Customer Portal integration",
          "Interactive analytics and user metrics dashboard",
        ],
        es: [
          "Flujo completo de registro y login (Google, GitHub, Email)",
          "Integración oficial de Stripe Checkout & Portal de Clientes",
          "Panel de control para usuarios con gráficos interactivos",
        ],
      },
      includedFiles: {
        en: [
          "Complete clean TypeScript source code",
          "SQL migrations and database schema",
          "Step-by-step PDF & Markdown installation guide",
        ],
        es: [
          "Código fuente completo en TypeScript sin dependencias ocultas",
          "Esquema SQL con migraciones y semillas incluidas",
          "Guía de instalación paso a paso en PDF y Markdown",
        ],
      },
      stack: ["Next.js 16", "React 19", "Tailwind CSS", "Postgres", "Stripe"],
      demoUrl: "https://stellaris-dev.vercel.app",
      faqs: [],
    };
  });

  // Auto-generate slug from English title if isNew and not manually modified
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

  // Features (Bilingual: EN first, then ES)
  const handleFeatureChange = (
    index: number,
    lang: "en" | "es",
    val: string
  ) => {
    const currentList = [...(formData.features?.[lang] || [])];
    currentList[index] = val;
    setFormData({
      ...formData,
      features: {
        en: formData.features?.en || [],
        es: formData.features?.es || [],
        [lang]: currentList,
      },
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: {
        en: [...(formData.features?.en || []), "New feature in English"],
        es: [...(formData.features?.es || []), "Nueva característica en español"],
      },
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: {
        en: (formData.features?.en || []).filter((_, i) => i !== index),
        es: (formData.features?.es || []).filter((_, i) => i !== index),
      },
    });
  };

  // Included Files (Bilingual: EN first, then ES)
  const handleIncludedFileChange = (
    index: number,
    lang: "en" | "es",
    val: string
  ) => {
    const currentList = [...(formData.includedFiles?.[lang] || [])];
    currentList[index] = val;
    setFormData({
      ...formData,
      includedFiles: {
        en: formData.includedFiles?.en || [],
        es: formData.includedFiles?.es || [],
        [lang]: currentList,
      },
    });
  };

  const addIncludedFile = () => {
    setFormData({
      ...formData,
      includedFiles: {
        en: [...(formData.includedFiles?.en || []), "Full unminified source code"],
        es: [...(formData.includedFiles?.es || []), "Código fuente completo y sin ofuscar"],
      },
    });
  };

  const removeIncludedFile = (index: number) => {
    setFormData({
      ...formData,
      includedFiles: {
        en: (formData.includedFiles?.en || []).filter((_, i) => i !== index),
        es: (formData.includedFiles?.es || []).filter((_, i) => i !== index),
      },
    });
  };

  // Stack (item-by-item chips)
  const handleStackChange = (index: number, val: string) => {
    const updated = [...(formData.stack || [])];
    updated[index] = val;
    setFormData({ ...formData, stack: updated });
  };

  const addStackTech = () => {
    setFormData({
      ...formData,
      stack: [...(formData.stack || []), "Nueva Tecnología"],
    });
  };

  const removeStackTech = (index: number) => {
    setFormData({
      ...formData,
      stack: (formData.stack || []).filter((_, i) => i !== index),
    });
  };

  // FAQs (Bilingual: EN first, then ES)
  const handleFaqChange = (
    index: number,
    type: "q" | "a",
    lang: "en" | "es",
    val: string
  ) => {
    const currentFaqs = [...(formData.faqs || [])];
    const currentFaq = currentFaqs[index] || {
      q: { en: "", es: "" },
      a: { en: "", es: "" },
    };

    currentFaqs[index] = {
      ...currentFaq,
      [type]: {
        ...currentFaq[type],
        [lang]: val,
      },
    };

    setFormData({ ...formData, faqs: currentFaqs });
  };

  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [
        ...(formData.faqs || []),
        {
          q: {
            en: "What is included with this template?",
            es: "¿Qué incluye esta plantilla?",
          },
          a: {
            en: "Full source code, step-by-step setup documentation, and lifetime updates.",
            es: "Código fuente completo, guía paso a paso y actualizaciones de por vida.",
          },
        },
      ],
    });
  };

  const removeFaq = (index: number) => {
    setFormData({
      ...formData,
      faqs: (formData.faqs || []).filter((_, i) => i !== index),
    });
  };

  // Cover Image change
  const handleCoverChange = (newUrl: string) => {
    // If replacing or clearing an existing Vercel Blob image, queue the old one for physical deletion on Save
    if (
      formData.image &&
      formData.image !== newUrl &&
      formData.image.includes(".blob.vercel-storage.com")
    ) {
      setPendingBlobDeletions((prev) => [...prev, formData.image!]);
    }
    setFormData((prev) => ({ ...prev, image: newUrl }));
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

    // Strict validation
    if (!titleObj.en?.trim() || !titleObj.es?.trim()) {
      setError(
        "El título de la solución es obligatorio en ambos idiomas (Inglés y Español)."
      );
      return;
    }
    if (!formData.slug?.trim()) {
      setError("El slug de la URL es obligatorio.");
      return;
    }
    if (!formData.price?.trim()) {
      setError("El precio de la solución es obligatorio.");
      return;
    }
    if (!formData.shortDesc?.en?.trim() || !formData.shortDesc?.es?.trim()) {
      setError(
        "La descripción corta / tagline es obligatoria en ambos idiomas (Inglés y Español)."
      );
      return;
    }
    if (!formData.fullDesc?.en?.trim() || !formData.fullDesc?.es?.trim()) {
      setError(
        "La descripción detallada es obligatoria en ambos idiomas (Inglés y Español)."
      );
      return;
    }
    if (!formData.image?.trim()) {
      setError("Debes subir la imagen de portada principal de la solución.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await saveMarketplaceProductAction(formData);

      // Clean up physically deleted images from Vercel Blob only upon saving
      if (pendingBlobDeletions.length > 0) {
        try {
          await deleteBlobsAction(pendingBlobDeletions);
        } catch (cleanupErr) {
          console.warn("Error eliminando blobs antiguos de Vercel Blob:", cleanupErr);
        }
      }

      router.push("/admin/marketplace");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Ocurrió un error al guardar el producto.");
      setLoading(false);
    }
  };

  const displayTitle = getMarketplaceTitle(formData.title, "es") || "Nueva Solución";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 sticky top-0 bg-[#0d0d0e]/90 backdrop-blur-md z-30 pt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/marketplace"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Volver al catálogo"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF532A]" />
              {isNew ? "Crear Nueva Solución" : `Editar: ${displayTitle}`}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Gestión bilingüe: contenido en Inglés (principal) y versión en Español.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/marketplace"
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
            {loading ? "Guardando..." : "Guardar Solución"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid: 2 columns left, 1 column right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Core Info, Descriptions, Features, Files, Specs, FAQs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Identificación y Datos Básicos (OBLIGATORIO) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Globe className="w-4 h-4 text-[#FF532A]" />
              Datos Principales <span className="text-[#FF532A] text-xs">* (Obligatorio)</span>
            </h2>

            <div className="space-y-4">
              {/* TÍTULO BILINGÜE: EN PRIMERO, LUEGO ES */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-white">
                  Título del Producto / Solución <span className="text-[#FF532A]">*</span>
                </label>

                {/* Title EN */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                      🇺🇸 EN
                    </span>
                    <span>Product Title in English (Primary)</span>
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
                    placeholder="e.g. Stellaris SaaS Starter Pro"
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-[#FF532A] transition-colors"
                  />
                </div>

                {/* Title ES */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                      🇪🇸 ES
                    </span>
                    <span>Título del Producto en Español</span>
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
                    placeholder="Ej: Stellaris SaaS Starter Pro - Plantilla Completa"
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
                    placeholder="saas-starter-pro"
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
                <p className="text-[10px] text-neutral-500 mt-1">
                  Ruta pública: <code>/marketplace/{formData.slug || "nombre-del-producto"}</code>
                </p>
              </div>

              {/* Categoría & Precio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Categoría <span className="text-[#FF532A]">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const labels: Record<string, { es: string; en: string }> = {
                        saas: { es: "SaaS & Dashboard", en: "SaaS & Dashboard" },
                        ecommerce: { es: "E-Commerce", en: "E-Commerce" },
                        agencies: { es: "Agencia & Portafolio", en: "Agency & Portfolio" },
                        landing: { es: "Landing Page", en: "Landing Page" },
                      };
                      setFormData({
                        ...formData,
                        category: cat,
                        categoryLabel: labels[cat] || {
                          en: "Software Template",
                          es: "Plantilla de Software",
                        },
                      });
                    }}
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2.5 text-white text-xs outline-none focus:border-[#FF532A]"
                  >
                    <option value="saas">SaaS & Dashboard</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="agencies">Agencia & Portafolio</option>
                    <option value="landing">Landing Page</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Precio de Venta <span className="text-[#FF532A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="$189"
                    className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2.5 text-white text-xs outline-none focus:border-[#FF532A] font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Resumen y Visión General (OBLIGATORIO - BILINGÜE) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF532A]" />
                Descripciones <span className="text-[#FF532A] text-xs">* (Obligatorio)</span>
              </h2>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">
                Bilingüe (EN primero, luego ES)
              </span>
            </div>

            {/* SHORT DESCRIPTION / TAGLINE */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-white">
                Descripción Corta / Tagline <span className="text-[#FF532A]">*</span>
              </label>

              {/* ShortDesc EN */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    🇺🇸 EN
                  </span>
                  <span>Short description in English</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc?.en || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDesc: {
                        en: e.target.value,
                        es: formData.shortDesc?.es || "",
                      },
                    })
                  }
                  placeholder="Production-ready SaaS boilerplate with Auth, Stripe subscriptions, and modern user dashboard."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              {/* ShortDesc ES */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                    🇪🇸 ES
                  </span>
                  <span>Descripción corta en Español</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDesc: {
                        en: formData.shortDesc?.en || "",
                        es: e.target.value,
                      },
                    })
                  }
                  placeholder="Plataforma SaaS lista para producción con autenticación, suscripciones Stripe y panel de control."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>
            </div>

            {/* FULL DESCRIPTION */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              <label className="text-xs font-bold text-white">
                Descripción Completa y Visión General <span className="text-[#FF532A]">*</span>
              </label>

              {/* FullDesc EN */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    🇺🇸 EN
                  </span>
                  <span>Full product description in English</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDesc?.en || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDesc: {
                        en: e.target.value,
                        es: formData.fullDesc?.es || "",
                      },
                    })
                  }
                  placeholder="Launch your startup weeks faster. Includes Google and Email authentication, monthly/annual Stripe subscription billing..."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl p-3.5 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                />
              </div>

              {/* FullDesc ES */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                    🇪🇸 ES
                  </span>
                  <span>Descripción completa en Español</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDesc?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDesc: {
                        en: formData.fullDesc?.en || "",
                        es: e.target.value,
                      },
                    })
                  }
                  placeholder="Acelera el lanzamiento de tu startup semanas antes. Incluye autenticación completa con Google y Email, planes de suscripción..."
                  className="w-full bg-[#202024] border border-white/10 rounded-xl p-3.5 text-white text-xs outline-none focus:border-[#FF532A] resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Características del Producto / Features (OPCIONAL - BILINGÜE) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#FF532A]" />
                  Características Principales <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Lista de funcionalidades incluidas. Cada ítem tiene su versión en Inglés y Español.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF532A]" />
                Añadir Característica
              </button>
            </div>

            <div className="space-y-3">
              {(formData.features?.en || []).map((_, idx) => (
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
                        value={formData.features?.en?.[idx] || ""}
                        onChange={(e) =>
                          handleFeatureChange(idx, "en", e.target.value)
                        }
                        placeholder="Complete sign up & login flow (Google, GitHub, Magic Links)..."
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
                        value={formData.features?.es?.[idx] || ""}
                        onChange={(e) =>
                          handleFeatureChange(idx, "es", e.target.value)
                        }
                        placeholder="Flujo completo de registro y login (Google, GitHub, Email)..."
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

            {(!formData.features?.en || formData.features.en.length === 0) && (
              <p className="text-xs text-neutral-500 py-3 text-center">
                Sin características añadidas. Haz clic en &ldquo;Añadir Característica&rdquo;.
              </p>
            )}
          </div>

          {/* Card 4: Archivos Incluidos / Included Files (OPCIONAL - BILINGÜE) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF532A]" />
                  Qué Recibe el Comprador <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Lista de entregables (código fuente, documentación, soporte).
                </p>
              </div>

              <button
                type="button"
                onClick={addIncludedFile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF532A]" />
                Añadir Entregable
              </button>
            </div>

            <div className="space-y-3">
              {(formData.includedFiles?.en || []).map((_, idx) => (
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
                        <span>Deliverable in English</span>
                      </label>
                      <input
                        type="text"
                        value={formData.includedFiles?.en?.[idx] || ""}
                        onChange={(e) =>
                          handleIncludedFileChange(idx, "en", e.target.value)
                        }
                        placeholder="Complete clean TypeScript source code..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                        <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                          🇪🇸 ES
                        </span>
                        <span>Entregable en Español</span>
                      </label>
                      <input
                        type="text"
                        value={formData.includedFiles?.es?.[idx] || ""}
                        onChange={(e) =>
                          handleIncludedFileChange(idx, "es", e.target.value)
                        }
                        placeholder="Código fuente completo en TypeScript sin dependencias ocultas..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeIncludedFile(idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer mt-1"
                    title="Eliminar entregable"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {(!formData.includedFiles?.en ||
              formData.includedFiles.en.length === 0) && (
              <p className="text-xs text-neutral-500 py-3 text-center">
                Sin entregables añadidos. Haz clic en &ldquo;Añadir Entregable&rdquo;.
              </p>
            )}
          </div>

          {/* Card 5: Arquitectura & Ficha Técnica (OPCIONAL) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="border-b border-white/5 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FF532A]" />
                Arquitectura & Ficha Técnica <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
              </h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Especificaciones técnicas del paquete (dejar vacío si no aplica).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Frontend Core
                </label>
                <input
                  type="text"
                  value={formData.architecture?.frontend || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      architecture: {
                        frontend: e.target.value,
                        backend: formData.architecture?.backend || "",
                        database: formData.architecture?.database || "",
                        styling: formData.architecture?.styling || "",
                        auth: formData.architecture?.auth || "",
                        deployment: formData.architecture?.deployment || "",
                      },
                    })
                  }
                  placeholder="Next.js 16 (App Router) + React 19"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Backend & API
                </label>
                <input
                  type="text"
                  value={formData.architecture?.backend || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      architecture: {
                        frontend: formData.architecture?.frontend || "",
                        backend: e.target.value,
                        database: formData.architecture?.database || "",
                        styling: formData.architecture?.styling || "",
                        auth: formData.architecture?.auth || "",
                        deployment: formData.architecture?.deployment || "",
                      },
                    })
                  }
                  placeholder="Next.js Server Actions & Route Handlers"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Base de Datos
                </label>
                <input
                  type="text"
                  value={formData.architecture?.database || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      architecture: {
                        frontend: formData.architecture?.frontend || "",
                        backend: formData.architecture?.backend || "",
                        database: e.target.value,
                        styling: formData.architecture?.styling || "",
                        auth: formData.architecture?.auth || "",
                        deployment: formData.architecture?.deployment || "",
                      },
                    })
                  }
                  placeholder="PostgreSQL (Supabase o Vercel Postgres)"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Estilos & UI
                </label>
                <input
                  type="text"
                  value={formData.architecture?.styling || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      architecture: {
                        frontend: formData.architecture?.frontend || "",
                        backend: formData.architecture?.backend || "",
                        database: formData.architecture?.database || "",
                        styling: e.target.value,
                        auth: formData.architecture?.auth || "",
                        deployment: formData.architecture?.deployment || "",
                      },
                    })
                  }
                  placeholder="Tailwind CSS v4 + Lucide Icons"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Autenticación
                </label>
                <input
                  type="text"
                  value={formData.architecture?.auth || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      architecture: {
                        frontend: formData.architecture?.frontend || "",
                        backend: formData.architecture?.backend || "",
                        database: formData.architecture?.database || "",
                        styling: formData.architecture?.styling || "",
                        auth: e.target.value,
                        deployment: formData.architecture?.deployment || "",
                      },
                    })
                  }
                  placeholder="Supabase Auth / NextAuth con roles"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Despliegue Recomendado
                </label>
                <input
                  type="text"
                  value={formData.architecture?.deployment || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      architecture: {
                        frontend: formData.architecture?.frontend || "",
                        backend: formData.architecture?.backend || "",
                        database: formData.architecture?.database || "",
                        styling: formData.architecture?.styling || "",
                        auth: formData.architecture?.auth || "",
                        deployment: e.target.value,
                      },
                    })
                  }
                  placeholder="Listo para desplegar en Vercel con 1 clic"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>
            </div>
          </div>

          {/* Card 6: Preguntas Frecuentes / FAQs (OPCIONAL - BILINGÜE) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#FF532A]" />
                  Preguntas Frecuentes (FAQs) <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Resuelve dudas antes de la compra (código fuente, licencias, despliegue).
                </p>
              </div>

              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF532A]" />
                Añadir Pregunta
              </button>
            </div>

            <div className="space-y-4">
              {(formData.faqs || []).map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#202024] p-4 rounded-xl border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#FF532A]/20 text-[#FF532A] flex items-center justify-center text-[10px] font-mono">
                        Q{idx + 1}
                      </span>
                      Pregunta #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="p-1 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Eliminar pregunta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pregunta EN */}
                  <div>
                    <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                      <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono">
                        🇺🇸 EN
                      </span>
                      <span>Question in English</span>
                    </label>
                    <input
                      type="text"
                      value={faq.q?.en || ""}
                      onChange={(e) =>
                        handleFaqChange(idx, "q", "en", e.target.value)
                      }
                      placeholder="Does it include the full source code?"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                    />
                  </div>

                  {/* Pregunta ES */}
                  <div>
                    <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                      <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                        🇪🇸 ES
                      </span>
                      <span>Pregunta en Español</span>
                    </label>
                    <input
                      type="text"
                      value={faq.q?.es || ""}
                      onChange={(e) =>
                        handleFaqChange(idx, "q", "es", e.target.value)
                      }
                      placeholder="¿Incluye el código fuente completo?"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#FF532A]"
                    />
                  </div>

                  {/* Respuesta EN */}
                  <div>
                    <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                      <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono">
                        🇺🇸 EN
                      </span>
                      <span>Answer in English</span>
                    </label>
                    <textarea
                      rows={2}
                      value={faq.a?.en || ""}
                      onChange={(e) =>
                        handleFaqChange(idx, "a", "en", e.target.value)
                      }
                      placeholder="Yes, you will receive the complete clean TypeScript repository..."
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white text-xs outline-none focus:border-[#FF532A] resize-none"
                    />
                  </div>

                  {/* Respuesta ES */}
                  <div>
                    <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 mb-0.5">
                      <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                        🇪🇸 ES
                      </span>
                      <span>Respuesta en Español</span>
                    </label>
                    <textarea
                      rows={2}
                      value={faq.a?.es || ""}
                      onChange={(e) =>
                        handleFaqChange(idx, "a", "es", e.target.value)
                      }
                      placeholder="Sí, recibirás el repositorio completo de código fuente en TypeScript..."
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white text-xs outline-none focus:border-[#FF532A] resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {(!formData.faqs || formData.faqs.length === 0) && (
              <p className="text-xs text-neutral-500 py-3 text-center">
                Sin preguntas frecuentes añadidas. Haz clic en &ldquo;Añadir Pregunta&rdquo;.
              </p>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Media, Pricing Badges, Links & Stack */}
        <div className="space-y-6">
          {/* Card: Imagen Principal (OBLIGATORIA) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Sparkles className="w-4 h-4 text-[#FF532A]" />
              Portada Principal <span className="text-[#FF532A] text-xs">* (Obligatorio)</span>
            </h2>

            <ImageUploader
              label="Portada / Captura Principal (Vercel Blob)"
              value={formData.image?.startsWith("http") ? formData.image : ""}
              onChange={handleCoverChange}
            />
            <p className="text-[10px] text-neutral-400 leading-relaxed">
              Esta imagen se utilizará en la tarjeta del catálogo y como portada visual principal en la página de compra.
            </p>
          </div>

          {/* Card: Galería de Imágenes Adicionales (OPCIONAL) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Images className="w-4 h-4 text-[#FF532A]" />
                  Galería Adicional <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Para el visor interactivo de capturas. Si no se suben, la sección no se mostrará.
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
                    <img
                      src={imgUrl}
                      alt={`Galería ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
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

          {/* Card: Datos Comerciales & Badges (OPCIONAL - BILINGÜE) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Tag className="w-4 h-4 text-[#FF532A]" />
              Configuración Comercial <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
            </h2>

            {/* TAG / BADGE BILINGÜE */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-300">
                Badge / Etiqueta Destacada
              </label>

              <div>
                <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-400 mb-0.5">
                  <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono">
                    🇺🇸 EN
                  </span>
                  <span>Badge in English</span>
                </label>
                <input
                  type="text"
                  value={formData.tag?.en || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tag: {
                        en: e.target.value,
                        es: formData.tag?.es || "",
                      },
                    })
                  }
                  placeholder="🔥 Best Seller"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-[10px] font-semibold text-neutral-400 mb-0.5">
                  <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                    🇪🇸 ES
                  </span>
                  <span>Etiqueta en Español</span>
                </label>
                <input
                  type="text"
                  value={formData.tag?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tag: {
                        en: formData.tag?.en || "",
                        es: e.target.value,
                      },
                    })
                  }
                  placeholder="🔥 Más Vendido"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>
            </div>

            {/* PRECIO ORIGINAL */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Precio Original Tachado (Opcional)
              </label>
              <input
                type="text"
                value={formData.originalPrice || ""}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                placeholder="$299"
                className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A] font-mono"
              />
            </div>

            {/* RATING & SALES */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Calificación (Rating)
                </label>
                <input
                  type="text"
                  value={formData.rating || "4.9"}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  placeholder="4.9"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Ventas / Licencias
                </label>
                <input
                  type="number"
                  value={formData.salesCount ?? 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salesCount: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="84"
                  className="w-full bg-[#202024] border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#FF532A] font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card: Enlace de Demostración (OPCIONAL) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <ExternalLink className="w-4 h-4 text-[#FF532A]" />
              Demo en Vivo <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                URL de Demostración en Línea
              </label>
              <input
                type="url"
                value={formData.demoUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, demoUrl: e.target.value })
                }
                placeholder="https://saas-demo.stellaris.dev..."
                className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
              />
              <p className="text-[10px] text-neutral-500 mt-1">
                Aparecerá como botón secundario &ldquo;Ver Demo en Vivo&rdquo;.
              </p>
            </div>
          </div>

          {/* Card: Stack Tecnológico (OPCIONAL) */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FF532A]" />
                  Stack Tecnológico <span className="text-neutral-500 font-normal text-xs">(Opcional)</span>
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Insignias de tecnologías principales.
                </p>
              </div>

              <button
                type="button"
                onClick={addStackTech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF532A]" />
                Añadir
              </button>
            </div>

            <div className="space-y-2">
              {(formData.stack || []).map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleStackChange(idx, e.target.value)}
                    placeholder="Ej: Next.js 16"
                    className="flex-1 bg-[#202024] border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs font-mono outline-none focus:border-[#FF532A]"
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

            {(!formData.stack || formData.stack.length === 0) && (
              <p className="text-xs text-neutral-500 py-2 text-center">
                Sin tecnologías añadidas. Haz clic en &ldquo;Añadir&rdquo;.
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
