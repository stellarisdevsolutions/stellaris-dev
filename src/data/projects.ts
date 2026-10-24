export interface ProjectItem {
  id: string;
  slug: string;
  title: { en: string; es: string } | string;
  client: string;
  year: string;
  category: "landing" | "web" | "ecommerce";
  categoryLabel: { es: string; en: string };
  tagline: { es: string; en: string };
  overview: { es: string; en: string };
  challenge?: { es: string; en: string };
  solution?: { es: string; en: string };
  metrics: { value: string; label: { es: string; en: string } }[];
  features: { es: string[]; en: string[] };
  stack: string[];
  liveUrl?: string;
  liveUrlLabel?: "Demo en Vivo" | "Ver Diseño";
  gallery?: string[];
  testimonial?: {
    quote?: { en: string; es: string } | string;
    name?: string;
    role?: { en: string; es: string } | string;
  };
  bgPreview: string;
}

export function getProjectTitle(
  title: { en: string; es: string } | string | undefined,
  lang: "en" | "es" = "es"
): string {
  if (!title) return "";
  if (typeof title === "string") return title;
  return title[lang] || title.en || title.es || "";
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    slug: "food-express",
    title: {
      en: "Food Express - Delivery & Restaurant App",
      es: "Food Express - App de Delivery & Restaurantes",
    },
    client: "Food Express Latam",
    year: "2026",
    category: "landing",
    categoryLabel: {
      es: "Landing Page / E-commerce",
      en: "Landing Page / Delivery",
    },
    tagline: {
      en: "High-speed online delivery platform with direct kitchen order routing and automated card payments.",
      es: "Plataforma de delivery ultrarrápida con pedidos automatizados a cocina y pasarela de pago en línea.",
    },
    overview: {
      en: "Food Express required a complete digital transformation to compete with food aggregators, eliminating high third-party commissions and enabling customers to place orders in under 45 seconds from any mobile device.",
      es: "Food Express necesitaba renovar completamente su presencia digital para competir con grandes aplicaciones de delivery, reduciendo las comisiones de terceros y permitiendo que sus clientes hagan pedidos en menos de 45 segundos desde cualquier celular.",
    },
    challenge: {
      en: "The previous site took over 4 seconds to load on mobile networks, losing over 40% of visitors before viewing the menu. Additionally, inventory had no real-time sync with kitchen POS.",
      es: "El sitio web anterior tardaba más de 4 segundos en cargar en conexiones 4G, perdiendo más del 40% de los visitantes antes de ver el menú. Además, no contaban con sincronización de stock en tiempo real.",
    },
    solution: {
      en: "We engineered an ultra-fast Web App using Next.js 16 and React 19 with Server Actions. We integrated an instant filterable menu, 2-click checkout, and real-time order dispatch to kitchen printers and WhatsApp.",
      es: "Desarrollamos una Web App con Next.js 16 (App Router) y React 19 optimizada con renderizado estático y Server Actions. Integramos un menú interactivo con filtros inmediatos, checkout en 2 clics y envío instantáneo de la orden a la comanda de cocina y WhatsApp.",
    },
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
          es: "Puntuación Google PageSpeed",
        },
      },
    ],
    features: {
      en: [
        "Interactive food catalog with custom addons & sizes",
        "Persistent cart preserved across browser tabs and sessions",
        "Online card payment gateway and QR instant confirmation",
        "Automated instant dispatch to restaurant WhatsApp & kitchen",
        "Real-time admin dashboard to toggle 86'd items and prices",
      ],
      es: [
        "Catálogo de comida con variantes (tamaños, ingredientes extras)",
        "Carrito persistente guardado en el dispositivo del cliente",
        "Pasarela de cobro con tarjeta y confirmación por QR",
        "Notificación automática del pedido directo a WhatsApp del restaurante",
        "Panel de administración para cambiar precios y platillos agotados al instante",
      ],
    },
    stack: ["Next.js 16", "React 19", "Tailwind CSS", "Postgres", "WhatsApp API"],
    liveUrl: "https://stellaris-dev.vercel.app",
    liveUrlLabel: "Demo en Vivo",
    bgPreview: "bg-gradient-to-br from-neutral-900 to-[#171717]",
    testimonial: {
      quote: {
        en: "Stellaris Dev understood the urgency of our business. In less than two weeks, our online order system was 100% live and direct channel sales grew exponentially.",
        es: "Stellaris Dev entendió exactamente la urgencia de nuestro negocio. En menos de dos semanas teníamos el sistema de pedidos corriendo al 100% y nuestras ventas por canal propio aumentaron exponencialmente.",
      },
      name: "Rodrigo Morales",
      role: {
        en: "Operations Director, Food Express",
        es: "Director de Operaciones, Food Express",
      },
    },
  },
  {
    id: "2",
    slug: "nexus-saas",
    title: {
      en: "Nexus SaaS - Analytics Dashboard",
      es: "Nexus SaaS - Dashboard de Analíticas",
    },
    client: "Nexus Cloud Corp",
    year: "2026",
    category: "web",
    categoryLabel: {
      en: "Corporate Web & Dashboard",
      es: "Portal Web & Dashboard",
    },
    tagline: {
      en: "Enterprise web portal with real-time analytics telemetry and multi-tenant team management.",
      es: "Portal corporativo con panel de analíticas en tiempo real y gestión de equipos para empresas B2B.",
    },
    overview: {
      en: "Nexus Cloud required an enterprise-grade digital portal allowing B2B customers to monitor server telemetry, cloud infrastructure spending, and API consumption via interactive charts.",
      es: "Nexus Cloud requería una plataforma web moderna con arquitectura multi-inquilino para que sus clientes corporativos monitoreen métricas de servidores, costos de infraestructura en la nube y consumo de API en gráficos interactivos.",
    },
    challenge: {
      en: "Handling high-frequency telemetry events without browser thread lag while enforcing strict role-based access control (RBAC).",
      es: "Manejar grandes volúmenes de eventos por segundo sin congelar la interfaz de usuario en el navegador y con un sistema estricto de roles de seguridad (Admin, Editor, Visor).",
    },
    solution: {
      en: "We developed a responsive UI with Tailwind and lightweight vector charts, connected to PostgreSQL via optimized queries and Vercel Edge caching for sub-millisecond responses.",
      es: "Implementamos una interfaz reactiva con Tailwind y gráficos vectoriales ligeros, conectada a PostgreSQL mediante consultas optimizadas y caché perimetral en Vercel Edge para respuestas en milisegundos.",
    },
    metrics: [
      {
        value: "4.2x",
        label: {
          en: "Faster than legacy version",
          es: "Más rápido que la versión previa",
        },
      },
      {
        value: "99.99%",
        label: {
          en: "Uptime on production",
          es: "Disponibilidad en producción",
        },
      },
      {
        value: "12k+",
        label: {
          en: "Monthly active users",
          es: "Usuarios activos mensuales",
        },
      },
    ],
    features: {
      en: [
        "Interactive real-time consumption and latency graphs",
        "Role-based access control and team workspace invitations",
        "Automated report generation in PDF and CSV",
        "Deep charcoal dark mode (#171717) and high-contrast light mode",
        "Enterprise Two-Factor Authentication (2FA)",
      ],
      es: [
        "Gráficos interactivos de consumo y analíticas en tiempo real",
        "Control de acceso por roles y membresías de equipo",
        "Exportación de reportes automáticos en PDF y CSV",
        "Modo oscuro profundo (#171717) y modo claro de alto contraste",
        "Autenticación segura con doble factor (2FA)",
      ],
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "Recharts"],
    liveUrl: "https://stellaris-dev.vercel.app",
    liveUrlLabel: "Ver Diseño",
    bgPreview: "bg-gradient-to-br from-[#242428] to-[#171717]",
    testimonial: {
      quote: {
        en: "The architecture and speed achieved for Nexus SaaS stunned our investors. The platform handles thousands of concurrent telemetry records with zero latency.",
        es: "La arquitectura y velocidad que lograron para Nexus SaaS dejó asombrados a nuestros inversores. La plataforma no titubea ni un milisegundo al procesar miles de registros simultáneos.",
      },
      name: "Elena Vázquez",
      role: {
        en: "Co-Founder & CTO, Nexus Analytics",
        es: "Co-Founder & CTO, Nexus Analytics",
      },
    },
  },
  {
    id: "3",
    slug: "aura-boutique",
    title: {
      en: "Aura Boutique - Luxury E-Commerce",
      es: "Aura Boutique - E-Commerce de Moda de Lujo",
    },
    client: "Aura Fashion House",
    year: "2026",
    category: "ecommerce",
    categoryLabel: {
      en: "Luxury E-Commerce Store",
      es: "Tienda Online de Alta Gama",
    },
    tagline: {
      en: "Editorial luxury shopping experience with international checkout and ultra-crisp imagery.",
      es: "Experiencia de compra editorial de lujo con pasarelas internacionales y catálogo en alta resolución.",
    },
    overview: {
      en: "Aura Boutique is a contemporary fashion brand seeking an online flagship reflecting the sophistication of their physical boutiques, featuring instant page transitions and high-end visual storytelling.",
      es: "Aura Boutique es una marca de moda contemporánea que buscaba una tienda virtual que transmitiera la misma sofisticación que sus tiendas físicas en París y Madrid, con navegación fluida y tiempos de carga instantáneos.",
    },
    challenge: {
      en: "Displaying rich high-resolution photography without degrading performance or exceeding mobile bandwidth quotas.",
      es: "Exhibir imágenes en altísima resolución de prendas de vestir y desfiles sin penalizar la velocidad de carga ni consumir el plan de datos móviles de los compradores.",
    },
    solution: {
      en: "Configured automated WebP/AVIF image transformations via Next.js Image and Vercel Blob Storage, resulting in crisp visuals with 78% reduced file weights and single-step checkout.",
      es: "Configuramos optimización de imágenes en formato WebP/AVIF mediante Next.js Image y Vercel Blob Storage, logrando imágenes nítidas con una reducción del 78% en peso de archivo y un checkout simplificado en un solo paso.",
    },
    metrics: [
      {
        value: "+210%",
        label: {
          en: "Increase in international sales",
          es: "Aumento en ventas internacionales",
        },
      },
      {
        value: "< 1s",
        label: {
          en: "Product image load speed",
          es: "Carga de fotos de productos",
        },
      },
      {
        value: "3.4%",
        label: {
          en: "Visitor to purchase conversion rate",
          es: "Tasa de conversión de visita a compra",
        },
      },
    ],
    features: {
      en: [
        "Tactile zoom image gallery with interactive size guide",
        "Multi-currency payment processing (USD, EUR, Local)",
        "Real-time warehouse inventory sync with low stock alerts",
        "Editorial minimalist aesthetic with refined micro-animations",
        "Instant facets by collection, color, and price range",
      ],
      es: [
        "Galería de imágenes con zoom táctil y vista previa de tallas",
        "Pasarela multi-moneda (USD, EUR, moneda local)",
        "Integración con inventario físico y alertas de pocas unidades",
        "Diseño editorial minimalista con micro-animaciones refinadas",
        "Filtros instantáneos por colección, color y precio",
      ],
    },
    stack: ["Next.js 16", "Vercel Blob", "Stripe Checkout", "Framer Motion"],
    liveUrl: "https://stellaris-dev.vercel.app",
    liveUrlLabel: "Demo en Vivo",
    bgPreview: "bg-gradient-to-br from-[#FF532A] to-[#E0451F]",
    testimonial: {
      quote: {
        en: "We were looking for an editorial eCommerce design competing with top European fashion houses, and they exceeded all expectations. Customer feedback on the buying experience has been stellar.",
        es: "Buscábamos un diseño editorial que pudiera competir con las mejores marcas europeas y lo superaron con creces. El feedback de nuestros clientes sobre la experiencia de compra ha sido insuperable.",
      },
      name: "Camila De La Torre",
      role: {
        en: "Creative Director, Aura Boutique",
        es: "Directora Creativa, Aura Boutique",
      },
    },
  },
];
