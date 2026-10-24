export interface MarketplaceProduct {
  id: string;
  slug: string;
  title: { en: string; es: string } | string;
  image?: string;
  gallery?: string[];
  category: "all" | "saas" | "ecommerce" | "agencies" | "landing";
  categoryLabel?: { es: string; en: string };
  tag?: { es: string; en: string };
  price: string;
  originalPrice?: string;
  rating?: string;
  salesCount?: number;
  shortDesc: { es: string; en: string };
  fullDesc: { es: string; en: string };
  architecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    styling?: string;
    auth?: string;
    deployment?: string;
  };
  features?: { es: string[]; en: string[] };
  includedFiles?: { es: string[]; en: string[] };
  stack?: string[];
  demoUrl?: string;
  faqs?: {
    q: { es: string; en: string };
    a: { es: string; en: string };
  }[];
}

export function getMarketplaceTitle(
  title: { en: string; es: string } | string | undefined,
  lang: "en" | "es" = "es"
): string {
  if (!title) return "";
  if (typeof title === "string") return title;
  return title[lang] || title.en || title.es || "";
}

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: "saas-starter-pro",
    slug: "saas-starter-pro",
    title: {
      en: "Stellaris SaaS Starter Pro",
      es: "Stellaris SaaS Starter Pro",
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    category: "saas",
    categoryLabel: { es: "SaaS & Dashboard", en: "SaaS & Dashboard" },
    tag: { es: "🔥 Más Vendido", en: "🔥 Best Seller" },
    price: "$189",
    originalPrice: "$299",
    rating: "4.9",
    salesCount: 84,
    shortDesc: {
      es: "Plataforma SaaS lista para producción con autenticación, suscripciones Stripe y panel de control.",
      en: "Production-ready SaaS boilerplate with Auth, Stripe subscriptions, and modern user dashboard.",
    },
    fullDesc: {
      es: "Acelera el lanzamiento de tu startup semanas antes. Incluye autenticación completa con Google y Email, planes de suscripción mensual y anual con Stripe, base de datos Postgres/Supabase con migraciones listas, panel de métricas y modo oscuro/claro.",
      en: "Launch your startup weeks faster. Includes Google and Email authentication, monthly/annual Stripe subscription billing, configured Postgres/Supabase database with ready migrations, user dashboard, and dark/light mode.",
    },
    architecture: {
      frontend: "Next.js 16 (App Router) + React 19",
      backend: "Next.js Server Actions & Route Handlers",
      database: "PostgreSQL (Supabase o Vercel Postgres)",
      styling: "Tailwind CSS v4 + Lucide Icons",
      auth: "Supabase Auth / NextAuth con roles de usuario",
      deployment: "Listo para desplegar en Vercel con 1 clic",
    },
    features: {
      es: [
        "Flujo completo de registro y login (Google, GitHub, Email)",
        "Integración oficial de Stripe Checkout & Portal de Clientes",
        "Manejo robusto de Webhooks de facturación (renovación, cancelación)",
        "Panel de control para usuarios con gráficos interactivos",
        "Panel de administración maestro para gestionar clientes",
        "Esquema SQL con migraciones y semillas (seeders) incluidas",
        "Soporte multi-idioma (Español / Inglés) preconfigurado",
      ],
      en: [
        "Complete sign up & login flow (Google, GitHub, Magic Links)",
        "Official Stripe Checkout & Customer Portal integration",
        "Robust billing webhook handling (renewals, cancellations)",
        "Interactive analytics and user metrics dashboard",
        "Master admin panel to manage users and subscriptions",
        "SQL schema with migrations and seeders included",
        "Pre-configured bilingual support (Spanish / English)",
      ],
    },
    includedFiles: {
      es: [
        "Código fuente completo en TypeScript sin dependencias ocultas",
        "Archivo .env.example con todas las claves explicadas",
        "Guía de instalación paso a paso en PDF y Markdown",
        "Migraciones SQL para PostgreSQL / Supabase",
        "Acceso a futuras actualizaciones del sistema",
      ],
      en: [
        "Complete clean TypeScript source code",
        ".env.example with thorough documentation",
        "Step-by-step PDF & Markdown installation guide",
        "SQL migrations for PostgreSQL / Supabase",
        "Lifetime access to future system updates",
      ],
    },
    stack: ["Next.js 16", "Supabase", "Stripe", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://stellaris-dev.vercel.app",
    faqs: [
      {
        q: {
          es: "¿Incluye el código fuente completo?",
          en: "Does it include the full source code?",
        },
        a: {
          es: "Sí, recibirás el repositorio completo de código fuente en TypeScript, limpio, modular y sin ofuscaciones ni licencias limitantes.",
          en: "Yes, you will receive the full unminified TypeScript repository, cleanly structured and without restrictive locks.",
        },
      },
      {
        q: {
          es: "¿Puedo usarlo para proyectos comerciales de mis clientes?",
          en: "Can I use it for commercial client projects?",
        },
        a: {
          es: "¡Por supuesto! La licencia comercial te permite utilizar el sistema tanto para tus propios proyectos como para desarrollos de tus clientes.",
          en: "Absolutely! The commercial license grants you rights to use the system for both your own ventures and client deliverables.",
        },
      },
      {
        q: {
          es: "¿Qué tan difícil es desplegarlo en Vercel?",
          en: "How difficult is it to deploy to Vercel?",
        },
        a: {
          es: "Toma menos de 5 minutos: conectas el repositorio a Vercel, pegas las variables de Supabase y Stripe, y queda en línea de inmediato con SSL gratis.",
          en: "It takes under 5 minutes: connect the repo to Vercel, paste your Supabase and Stripe keys, and it goes live with automatic SSL.",
        },
      },
    ],
  },
  {
    id: "omnistore-ecommerce",
    slug: "omnistore-ecommerce",
    title: {
      en: "OmniStore - Modern E-Commerce & WhatsApp CRM",
      es: "OmniStore - Tienda Online & WhatsApp CRM",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    category: "ecommerce",
    categoryLabel: { es: "E-Commerce", en: "E-Commerce" },
    tag: { es: "⚡ Nuevo", en: "⚡ New" },
    price: "$240",
    originalPrice: "$350",
    rating: "5.0",
    salesCount: 62,
    shortDesc: {
      es: "E-Commerce ultrarrápido con carrito flotante, pagos con tarjeta y envío de pedidos a WhatsApp.",
      en: "Ultra-fast E-commerce store with sticky cart, card checkout, and automated WhatsApp order routing.",
    },
    fullDesc: {
      es: "Diseñado para maximizar ventas en teléfonos móviles. Incluye catálogo interactivo con filtros, carrito de compra persistente, pasarela de tarjetas y la opción de cerrar ventas directo al chat de WhatsApp del vendedor con el pedido detallado.",
      en: "Engineered to maximize conversions on mobile devices. Features interactive catalog with filters, persistent cart, card payments, and automatic WhatsApp order forwarding with full checkout details.",
    },
    architecture: {
      frontend: "Next.js 16 + React 19 (App Router)",
      backend: "Next.js Server Actions & API Handlers",
      database: "PostgreSQL (Vercel Postgres o Supabase)",
      styling: "Tailwind CSS v4 + Lucide Icons",
      auth: "Panel Admin con contraseña y JWT seguro",
      deployment: "Optimizado para Vercel Blob & Serverless",
    },
    features: {
      es: [
        "Catálogo responsivo con filtros por categoría, marca y precio",
        "Carrito persistente con cálculo automático de envío",
        "Botón de compra directa por WhatsApp con mensaje estructurado",
        "Pasarela de pago online para tarjetas de crédito/débito",
        "Panel administrativo privado para crear productos y subir fotos",
        "Subida de imágenes directo a la nube (Vercel Blob / Supabase)",
        "Control básico de inventario y alertas de stock",
      ],
      en: [
        "Responsive catalog with category, brand and price filters",
        "Persistent cart with automatic shipping calculation",
        "Direct WhatsApp checkout button with formatted order text",
        "Online credit/debit card payment integration",
        "Private admin dashboard to create products and upload photos",
        "Direct cloud image uploads (Vercel Blob / Supabase)",
        "Inventory management and low stock warnings",
      ],
    },
    includedFiles: {
      es: [
        "Código fuente completo del frontend y backend en Next.js",
        "Panel de administración `/admin` listo para usar",
        "Componentes de subida de imágenes con drag & drop",
        "Instrucciones de configuración paso a paso",
      ],
      en: [
        "Full frontend and backend Next.js codebase",
        "Ready-to-use `/admin` dashboard",
        "Drag & drop image upload components",
        "Step-by-step setup documentation",
      ],
    },
    stack: ["Next.js 16", "Vercel Blob", "Postgres", "WhatsApp API", "Tailwind"],
    demoUrl: "https://stellaris-dev.vercel.app",
    faqs: [
      {
        q: {
          es: "¿Mis clientes necesitan tarjeta de crédito para comprar?",
          en: "Do customers need a credit card to purchase?",
        },
        a: {
          es: "No necesariamente: el sistema cuenta con el botón de 'Pedir por WhatsApp', ideal para mercados donde el pago contra entrega, transferencia o QR es habitual.",
          en: "Not at all: the system includes a direct 'Order via WhatsApp' button, ideal for markets with cash-on-delivery or bank transfers.",
        },
      },
      {
        q: {
          es: "¿Cómo administro los productos?",
          en: "How do I manage products?",
        },
        a: {
          es: "Incluye una ruta privada `/admin` donde puedes agregar fotos, cambiar precios, nombres y categorías sin tocar una sola línea de código.",
          en: "It includes a private `/admin` route where you can add photos, update prices, and edit inventory without touching code.",
        },
      },
    ],
  },
  {
    id: "nova-agency-template",
    slug: "nova-agency-template",
    title: {
      en: "Nova Agency - Creative Studio Bento Template",
      es: "Nova Agency - Studio Bento Template",
    },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    category: "agencies",
    categoryLabel: { es: "Agencia & Portafolio", en: "Agency & Portfolio" },
    tag: { es: "⭐ Destacado", en: "⭐ Featured" },
    price: "$89",
    originalPrice: "$149",
    rating: "4.8",
    salesCount: 118,
    shortDesc: {
      es: "Plantilla de agencia digital de alta gama con estética Bento, animaciones fluidas y cotizador.",
      en: "High-end creative agency template with Bento design, smooth micro-interactions, and instant quote builder.",
    },
    fullDesc: {
      es: "La plantilla definitiva para agencias, diseñadores y estudios de desarrollo. Presenta tus casos de éxito con tarjetas interactivas, testimonios en carrusel, cotizador de servicios paso a paso y formulario con notificación a correo y WhatsApp.",
      en: "The definitive template for studios, freelancers, and dev agencies. Showcase case studies with interactive cards, testimonials carousel, interactive service estimator, and instant lead notifications.",
    },
    architecture: {
      frontend: "Next.js 16 + React 19 + Framer Motion",
      backend: "Next.js Route Handlers para formularios",
      database: "Opcional (Postgres) o datos tipados en TypeScript",
      styling: "Tailwind CSS v4 con variables CSS temáticas",
      auth: "No requerida (Sitio de alta conversión)",
      deployment: "Despliegue instantáneo en Vercel",
    },
    features: {
      es: [
        "Estética visual Bento con paleta Naranja Solar y Carbón",
        "Animaciones pulidas y micro-interacciones con Framer Motion",
        "Cotizador interactivo para captar leads calificados",
        "Soporte bilingüe Español e Inglés con selector instantáneo",
        "Formularios con envío directo por correo electrónico y WhatsApp",
        "100/100 en Core Web Vitals y SEO optimizado",
      ],
      en: [
        "Modern Bento layout with Solar Orange & Charcoal accents",
        "Polished micro-interactions powered by Framer Motion",
        "Interactive cost estimator to pre-qualify leads",
        "Bilingual Spanish/English instant language switch",
        "Contact form with instant email and WhatsApp delivery",
        "100/100 Core Web Vitals and SEO optimization",
      ],
    },
    includedFiles: {
      es: [
        "Código fuente completo de la plantilla",
        "Componentes modulares reutilizables",
        "Gráficos vectoriales e iconos SVG incluidos",
        "Manual de personalización de marca",
      ],
      en: [
        "Complete template source code",
        "Modular reusable components",
        "Bundled vector graphics & SVG icons",
        "Brand customization manual",
      ],
    },
    stack: ["React 19", "Framer Motion", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://stellaris-dev.vercel.app",
    faqs: [
      {
        q: {
          es: "¿Puedo cambiar los colores fácilmente?",
          en: "Can I easily customize the colors?",
        },
        a: {
          es: "Sí, todos los colores principales están centralizados en variables CSS dentro de `globals.css` para que cambies la paleta completa en 1 minuto.",
          en: "Yes, all key brand tokens are centralized in CSS variables in `globals.css` so you can change the theme in seconds.",
        },
      },
    ],
  },
  {
    id: "leadmagnet-funnel",
    slug: "leadmagnet-funnel",
    title: {
      en: "LeadMagnet - High-Converting Paid Ads Funnel",
      es: "LeadMagnet - Funnel de Conversión Ads",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    category: "landing",
    categoryLabel: { es: "Landing Page", en: "Landing Page" },
    tag: { es: "🚀 Conversión", en: "🚀 High-ROI" },
    price: "$69",
    originalPrice: "$119",
    rating: "4.9",
    salesCount: 145,
    shortDesc: {
      es: "Landing page diseñada para campañas de Meta Ads y Google Ads con alta tasa de captura de leads.",
      en: "High-converting landing page optimized for paid ad campaigns with instant lead notification.",
    },
    fullDesc: {
      es: "Especialmente estructurada según principios de psicología de ventas y neuromarketing. Incluye sección de prueba social con contadores, comparativas de precio, formulario de 2 pasos y conexión directa con Google Sheets o CRM.",
      en: "Engineered following conversion psychology principles. Features social proof counters, pricing comparison table, 2-step lead capture form, and direct webhook sync to Google Sheets or CRM.",
    },
    architecture: {
      frontend: "Next.js 16 + React 19",
      backend: "Server Actions con validación Zod",
      database: "Webhook a CRM / Google Sheets / Email",
      styling: "Tailwind CSS v4 ultraligero",
      auth: "Sin auth necesaria",
      deployment: "Despliegue estático ultra-rápido en Vercel",
    },
    features: {
      es: [
        "Velocidad de carga inferior a 0.8 segundos",
        "Formulario de 2 pasos que triplica la tasa de conversión",
        "Pixel de Meta, Google Tag Manager y GA4 preconfigurados",
        "Módulo de testimonios y prueba social de alta confianza",
        "Garantía de satisfacción y preguntas frecuentes con acordeón",
      ],
      en: [
        "Sub-second load times under 0.8s",
        "2-step form engineered to maximize completion rate",
        "Pre-configured Meta Pixel, GTM, and GA4 tracking",
        "High-trust social proof and testimonial section",
        "Risk-reversal guarantee badge and interactive FAQ accordion",
      ],
    },
    includedFiles: {
      es: [
        "Código fuente listo para producción",
        "Script de integración para Google Sheets",
        "Guía de configuración de campañas publicitarias",
      ],
      en: [
        "Production-ready source code",
        "Google Sheets webhook sync script",
        "Ad tracking setup guide",
      ],
    },
    stack: ["Next.js 16", "Tailwind CSS", "Resend API", "Analytics"],
    demoUrl: "https://stellaris-dev.vercel.app",
    faqs: [
      {
        q: {
          es: "¿Funciona bien en celulares?",
          en: "Does it perform well on mobile devices?",
        },
        a: {
          es: "El diseño es 100% Mobile-First, optimizado específicamente para el tráfico que llega desde Instagram, TikTok y Facebook Ads.",
          en: "The architecture is 100% mobile-first, engineered for traffic originating from Instagram, TikTok, and Meta Ads.",
        },
      },
    ],
  },
];
