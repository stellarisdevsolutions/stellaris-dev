"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
  Code2,
  Cpu,
  Star,
  Zap,
  Lock,
  Headphones,
  HelpCircle,
  ChevronDown,
  Layers,
} from "lucide-react";
import { MarketplaceProduct, getMarketplaceTitle } from "@/data/marketplace";
import { useLanguage } from "@/context/LanguageContext";
import { MarketplaceGallery } from "./MarketplaceGallery";

interface MarketplaceDetailViewProps {
  product: MarketplaceProduct;
  relatedProducts: MarketplaceProduct[];
}

export function MarketplaceDetailView({
  product,
  relatedProducts,
}: MarketplaceDetailViewProps) {
  const { lang } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const title = getMarketplaceTitle(product.title, lang);
  const shortDesc = product.shortDesc?.[lang] || product.shortDesc?.es || "";
  const fullDesc = product.fullDesc?.[lang] || product.fullDesc?.es || "";
  const tagText = product.tag?.[lang] || product.tag?.es || "";
  const categoryLabel =
    product.categoryLabel?.[lang] ||
    product.categoryLabel?.es ||
    product.category;

  const featuresList = product.features?.[lang] || product.features?.es || [];
  const includedFilesList =
    product.includedFiles?.[lang] || product.includedFiles?.es || [];
  const faqsList = product.faqs || [];

  const hasArchitecture =
    product.architecture &&
    Object.values(product.architecture).some((v) => Boolean(v?.trim()));

  const getWhatsAppBuyLink = () => {
    const message =
      lang === "es"
        ? `¡Hola Stellaris Dev! Me interesa adquirir el sistema "${title}" (${product.price}). ¿Cuáles son los métodos de pago y el proceso de entrega del repositorio y despliegue?`
        : `Hi Stellaris Dev! I'd like to acquire the system "${title}" (${product.price}). What are the payment methods and repository/deployment delivery process?`;
    return `https://wa.me/59169991245?text=${encodeURIComponent(message)}`;
  };

  // Buyer reviews (Bilingual)
  const buyerReviews = [
    {
      quote:
        lang === "es"
          ? "Compramos esta plantilla y pudimos lanzar el MVP de nuestro negocio en menos de 48 horas. El código está impecable y bien documentado."
          : "We bought this template and launched our business MVP in under 48 hours. The codebase is pristine and thoroughly documented.",
      name: "Andrés Silva",
      business: "Founder, TechFlow Latam",
      rating: 5,
    },
    {
      quote:
        lang === "es"
          ? "Ahorramos al menos dos meses de desarrollo frontend y backend. La integración de pagos y base de datos funcionó a la primera sin errores."
          : "Saved at least two months of full-stack engineering. Database migrations and payment hooks worked flawlessly on first run.",
      name: "Mariana Rivas",
      business: "CEO, Studio Pulse",
      rating: 5,
    },
    {
      quote:
        lang === "es"
          ? "Excelente soporte directo por WhatsApp. Nos ayudaron a configurar el dominio y la base de datos en pocos minutos."
          : "Outstanding direct WhatsApp support. They guided us through custom domain and database setup in minutes.",
      name: "Gabriel Oporto",
      business: "E-Commerce Manager, Nova Store",
      rating: 5,
    },
  ];

  const cardPresets: Record<string, { blockColor: string; pillColor: string }> = {
    "saas-starter-pro": { blockColor: "bg-[#FF532A]", pillColor: "bg-[#FF532A]" },
    "omnistore-ecommerce": { blockColor: "bg-[#171717]", pillColor: "bg-[#171717]" },
    "nova-agency-template": { blockColor: "bg-[#737373]", pillColor: "bg-[#737373]" },
    "leadmagnet-funnel": { blockColor: "bg-[#FF532A]", pillColor: "bg-[#FF532A]" },
  };

  const isCoverBlob =
    product.image?.startsWith("http") || product.image?.startsWith("/");

  return (
    <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8">
      {/* Breadcrumb & Back Link */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#FF532A] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>
            {lang === "es" ? "Volver al Marketplace" : "Back to Marketplace"}
          </span>
        </Link>

        {categoryLabel && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider">
            {categoryLabel}
          </span>
        )}
      </div>

      {/* Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left Column: Product Information & Sections (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Product Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              {tagText && (
                <span className="px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-bold uppercase tracking-wider">
                  {tagText}
                </span>
              )}
              {product.rating && (
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <span>★ {product.rating}</span>
                  {product.salesCount !== undefined && (
                    <span className="text-neutral-400 font-normal">
                      ({product.salesCount}{" "}
                      {lang === "es" ? "licencias vendidas" : "licenses sold"})
                    </span>
                  )}
                </div>
              )}
            </div>

            <h1 className="hd text-3xl sm:text-5xl font-bold tracking-tight text-[#171717] leading-[1.12] mb-4">
              {title}
            </h1>
            {shortDesc && (
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                {shortDesc}
              </p>
            )}
          </div>

          {/* Main Visual / Cover Image */}
          <div className="relative rounded-[32px] bg-[#171717] border border-neutral-800 shadow-xl overflow-hidden text-white">
            {/* Top Browser Dots Bar */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-neutral-800 bg-[#171717]/90 backdrop-blur-xs z-10 relative">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF532A]" />
                <span className="w-3 h-3 rounded-full bg-neutral-700" />
                <span className="w-3 h-3 rounded-full bg-neutral-700" />
              </div>
              <div className="text-xs font-mono text-neutral-400 bg-neutral-800 px-3 py-1 rounded-md">
                {product.slug} • production-ready
              </div>
            </div>

            {isCoverBlob ? (
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="relative p-6 sm:p-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF532A]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF532A] flex items-center justify-center text-white mb-4 shadow-lg shadow-[#FF532A]/30">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h3 className="hd text-2xl sm:text-3xl font-bold mb-2">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-[480px] leading-relaxed mb-6">
                    {shortDesc}
                  </p>

                  {product.stack && product.stack.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {product.stack.map((item) => (
                        <span
                          key={item}
                          className="px-3.5 py-1 rounded-full bg-neutral-800 text-neutral-200 text-xs font-mono border border-neutral-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sección de Descripción Completa */}
          {fullDesc && (
            <div className="rounded-[32px] border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-4">
                {lang === "es"
                  ? "Descripción del Producto"
                  : "Product Overview"}
              </h3>
              <div className="text-sm sm:text-base text-neutral-600 leading-relaxed space-y-4">
                <p>{fullDesc}</p>
                <p>
                  {lang === "es"
                    ? "Diseñada meticulosamente para ofrecer una base de código robusta, escalable y sin código espagueti. Olvídate de configurar autenticación, pasarelas de pago y temas desde cero; todo el flujo crítico de negocio ya está probado y listo para conectar con tu base de datos."
                    : "Meticulously engineered to deliver a robust, modular, production-ready codebase. Skip setting up auth flows, payment webhooks, and responsive themes from scratch; all critical infrastructure is pre-tested and ready to wire into your database."}
                </p>
              </div>
            </div>
          )}

          {/* Interactive Additional Gallery Viewer (Omitted if no additional images) */}
          <MarketplaceGallery
            mainImage={product.image || ""}
            gallery={product.gallery || []}
            title={title}
            lang={lang}
          />

          {/* Ficha Técnica & Arquitectura (Omitted if empty) */}
          {hasArchitecture && (
            <div className="rounded-[32px] border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-[#FF532A]" />
                <h3 className="hd text-xl sm:text-2xl font-bold text-[#171717] m-0">
                  {lang === "es"
                    ? "Ficha Técnica & Arquitectura"
                    : "Technical Specs & Architecture"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.architecture?.frontend && (
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Frontend Core
                    </div>
                    <div className="text-sm font-semibold text-[#171717]">
                      {product.architecture.frontend}
                    </div>
                  </div>
                )}

                {product.architecture?.backend && (
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Backend & API
                    </div>
                    <div className="text-sm font-semibold text-[#171717]">
                      {product.architecture.backend}
                    </div>
                  </div>
                )}

                {product.architecture?.database && (
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      {lang === "es" ? "Base de Datos" : "Database"}
                    </div>
                    <div className="text-sm font-semibold text-[#171717]">
                      {product.architecture.database}
                    </div>
                  </div>
                )}

                {product.architecture?.styling && (
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      {lang === "es" ? "Estilos & UI" : "Styling & UI"}
                    </div>
                    <div className="text-sm font-semibold text-[#171717]">
                      {product.architecture.styling}
                    </div>
                  </div>
                )}

                {product.architecture?.auth && (
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      {lang === "es" ? "Autenticación" : "Authentication"}
                    </div>
                    <div className="text-sm font-semibold text-[#171717]">
                      {product.architecture.auth}
                    </div>
                  </div>
                )}

                {product.architecture?.deployment && (
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      {lang === "es"
                        ? "Despliegue Recomendado"
                        : "Recommended Deployment"}
                    </div>
                    <div className="text-sm font-semibold text-[#171717]">
                      {product.architecture.deployment}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Características Funcionales / Features (Omitted if empty) */}
          {featuresList.length > 0 && (
            <div className="rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-[#FF532A]" />
                <h3 className="hd text-xl sm:text-2xl font-bold text-[#171717] m-0">
                  {lang === "es"
                    ? "Características Principales"
                    : "Key Features & Capabilities"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuresList.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF532A] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qué Recibirás con tu Compra / Included Files (Omitted if empty) */}
          {includedFilesList.length > 0 && (
            <div className="rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5 text-[#FF532A]" />
                <h3 className="hd text-xl sm:text-2xl font-bold text-[#171717] m-0">
                  {lang === "es"
                    ? "Qué Recibirás con tu Compra"
                    : "What is Included in Your Purchase"}
                </h3>
              </div>

              <div className="space-y-3">
                {includedFilesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF532A] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-800 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preguntas Frecuentes / FAQs (Omitted if empty) */}
          {faqsList.length > 0 && (
            <div className="rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[#FF532A]" />
                <h3 className="hd text-xl sm:text-2xl font-bold text-[#171717] m-0">
                  {lang === "es"
                    ? "Preguntas Frecuentes"
                    : "Frequently Asked Questions"}
                </h3>
              </div>

              <div className="space-y-3">
                {faqsList.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const question = faq.q?.[lang] || faq.q?.es || "";
                  const answer = faq.a?.[lang] || faq.a?.es || "";

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-neutral-200/90 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-[#171717] hover:bg-neutral-50 cursor-pointer"
                      >
                        <span>{question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-400 transition-transform ${
                            isOpen ? "rotate-180 text-[#FF532A]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                          {answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Purchase Box (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8 shadow-xl shadow-neutral-200/50">
            {/* Price block */}
            <div className="mb-6">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                {lang === "es"
                  ? "Licencia Comercial Ilimitada"
                  : "Unlimited Commercial License"}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="hd text-4xl sm:text-5xl font-extrabold text-[#171717]">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-neutral-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold">
                  {lang === "es" ? "Ahorra 35%" : "Save 35%"}
                </span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {lang === "es"
                  ? "Pago único. Sin cargos mensuales sorpresa."
                  : "One-time purchase. No monthly recurring fees."}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-3 mb-6">
              <a
                href={getWhatsAppBuyLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-sm shadow-lg shadow-[#FF532A]/30 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {lang === "es" ? "Adquirir vía WhatsApp" : "Buy via WhatsApp"}
                </span>
              </a>

              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full border border-neutral-300 hover:border-[#171717] text-[#171717] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-center hover:bg-neutral-50"
                >
                  <span>
                    {lang === "es" ? "Ver Demo en Vivo" : "Live Demo"}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Garantías de Compra & Confianza Comercial */}
            <div className="space-y-3 pt-6 pb-6 border-t border-neutral-100">
              <div className="flex items-center gap-2.5 text-xs text-neutral-700">
                <Zap className="w-4 h-4 text-[#FF532A] shrink-0" />
                <span className="font-medium">
                  {lang === "es"
                    ? "Entrega inmediata del código tras el pago"
                    : "Instant code repository access after checkout"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-700">
                <Lock className="w-4 h-4 text-[#FF532A] shrink-0" />
                <span className="font-medium">
                  {lang === "es"
                    ? "Licencia de por vida sin cuotas mensuales"
                    : "Lifetime license with zero subscription fees"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-[#FF532A] shrink-0" />
                <span className="font-medium">
                  {lang === "es"
                    ? "100% código propio sin ataduras externas"
                    : "100% clean source code with full ownership"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-700">
                <Headphones className="w-4 h-4 text-[#FF532A] shrink-0" />
                <span className="font-medium">
                  {lang === "es"
                    ? "Soporte post-compra directo de nuestro equipo"
                    : "Direct engineer-level setup support included"}
                </span>
              </div>
            </div>

            {/* Customization Callout: Fondo Oscuro #171717 */}
            <div className="rounded-2xl bg-[#171717] text-white p-5 border border-neutral-800 text-center shadow-md">
              <div className="text-sm font-bold text-white mb-1.5">
                {lang === "es"
                  ? "¿Deseas que lo personalicemos?"
                  : "Need us to customize it for you?"}
              </div>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                {lang === "es"
                  ? "Podemos instalarlo en tu cuenta de Vercel y adaptar tu marca, logotipo, catálogo y pasarela de cobro."
                  : "We can deploy it to your cloud infrastructure, integrate your brand identity, product catalog, and payment gateway."}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-full bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold shadow-md transition-all hover:scale-102"
              >
                <span>
                  {lang === "es"
                    ? "Solicitar personalización"
                    : "Request Customization"}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN: LO QUE DICEN QUIENES LA COMPRARON */}
      <div className="rounded-[36px] sm:rounded-[44px] bg-[#171717] text-white p-8 sm:p-12 mb-16 border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-[300px] h-[300px] bg-[#FF532A]/20 rounded-full blur-[70px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h2 className="hd text-2xl sm:text-4xl font-bold text-white tracking-tight m-0">
              {lang === "es" ? (
                <>
                  Lo que dicen quienes la{" "}
                  <span className="text-[#FF532A]">compraron</span>
                </>
              ) : (
                <>
                  What verified buyers{" "}
                  <span className="text-[#FF532A]">are saying</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buyerReviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#242427] border border-neutral-800 p-6 flex flex-col justify-between hover:border-[#FF532A]/50 transition-colors"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1 text-[#FF532A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF532A]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic m-0">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80">
                  <div className="font-bold text-white text-sm">{rev.name}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {rev.business}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OTRAS SOLUCIONES DISPONIBLES */}
      {relatedProducts.length > 0 && (
        <div className="pt-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF532A] block mb-1">
                MARKETPLACE
              </span>
              <h3 className="hd text-2xl sm:text-3xl font-bold text-[#171717] m-0">
                {lang === "es"
                  ? "Otras Soluciones Disponibles"
                  : "Other Available Solutions"}
              </h3>
            </div>
            <Link
              href="/marketplace"
              className="text-xs sm:text-sm font-semibold text-[#FF532A] hover:text-[#E5451D] inline-flex items-center gap-1 transition-colors"
            >
              <span>{lang === "es" ? "Ver todas" : "View all"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => {
              const relTitle = getMarketplaceTitle(rel.title, lang);
              const relShortDesc =
                rel.shortDesc?.[lang] || rel.shortDesc?.es || "";
              const relCategory =
                rel.categoryLabel?.[lang] ||
                rel.categoryLabel?.es ||
                rel.category;
              const preset = cardPresets[rel.slug] || {
                blockColor: "bg-[#FF532A]",
                pillColor: "bg-[#FF532A]",
              };

              const isRelImage =
                rel.image?.startsWith("http") || rel.image?.startsWith("/");

              return (
                <div
                  key={rel.id}
                  className="rounded-[28px] bg-white border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-[#FF532A]/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
                >
                  {/* Browser Window UI Preview */}
                  <div className="rounded-2xl bg-[#171717] p-4 sm:p-5 mb-5 flex flex-col gap-3 w-full overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF532A]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                    </div>

                    {isRelImage ? (
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rel.image}
                          alt={relTitle}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="flex gap-3 sm:gap-4 items-center justify-between pt-1">
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="h-3.5 bg-neutral-200 rounded-sm w-4/5" />
                          <div className="h-2.5 bg-neutral-600 rounded-xs w-3/5" />
                          <div
                            className={`h-4 ${preset.pillColor} rounded-full w-2/5 mt-1`}
                          />
                        </div>
                        <div
                          className={`w-20 h-16 sm:w-24 sm:h-20 ${preset.blockColor} rounded-xl shrink-0 shadow-md`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="flex flex-col gap-1 mb-4">
                    <h4 className="hd text-lg font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-1 m-0">
                      {relTitle}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-1 m-0">
                      {relCategory} • {relShortDesc}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="hd text-xl font-bold text-[#171717] tracking-tight">
                      {rel.price}
                    </span>

                    <Link
                      href={`/marketplace/${rel.slug}`}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold shadow-md shadow-[#FF532A]/20 transition-all hover:scale-105"
                    >
                      <span>
                        {lang === "es" ? "Ver detalle" : "View detail"}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* BANNER CTA NARANJA */}
      <div className="rounded-[36px] sm:rounded-[44px] bg-[#FF532A] text-white p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-xl shadow-[#FF532A]/20">
        <h2 className="hd text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-[700px] leading-[1.15] mb-3">
          {lang === "es"
            ? "¿Tienes una idea en mente? Platiquemos"
            : "Have a project in mind? Let's talk"}
        </h2>
        <p className="text-white/90 text-sm sm:text-base max-w-[520px] mb-6 font-normal">
          {lang === "es"
            ? "Sin compromisos ni presiones. Cuéntanos qué buscas y te compartimos ideas o una cotización inicial sin costo."
            : "No pressure or commitments. Tell us what you need and we will share architectural ideas and a free initial quote."}
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
