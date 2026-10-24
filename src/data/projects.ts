export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: "landing" | "web" | "ecommerce";
  categoryLabel: { es: string; en: string };
  tagline: { es: string; en: string };
  overview: { es: string; en: string };
  challenge: { es: string; en: string };
  solution: { es: string; en: string };
  metrics: { value: string; label: { es: string; en: string } }[];
  features: { es: string[]; en: string[] };
  stack: string[];
  liveUrl: string;
  accent: string;
  bgPreview: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    slug: "food-express",
    title: "Food Express - Delivery & Restaurant App",
    client: "Food Express Latam",
    year: "2026",
    category: "landing",
    categoryLabel: {
      es: "Landing Page / E-commerce",
      en: "Landing Page / Delivery",
    },
    tagline: {
      es: "Plataforma de delivery ultrarrápida con pedidos automatizados a cocina y pasarela de pago en línea.",
      en: "High-speed online delivery platform with direct kitchen order routing and automated card payments.",
    },
    overview: {
      es: "Food Express necesitaba renovar completamente su presencia digital para competir con grandes aplicaciones de delivery, reduciendo las comisiones de terceros y permitiendo que sus clientes hagan pedidos en menos de 45 segundos desde cualquier celular.",
      en: "Food Express required a complete digital transformation to compete with food aggregators, eliminating high third-party commissions and enabling customers to place orders in under 45 seconds from any mobile device.",
    },
    challenge: {
      es: "El sitio web anterior tardaba más de 4 segundos en cargar en conexiones 4G, perdiendo más del 40% de los visitantes antes de ver el menú. Además, no contaban con sincronización de stock en tiempo real.",
      en: "The previous site took over 4 seconds to load on mobile networks, losing over 40% of visitors before viewing the menu. Additionally, inventory had no real-time sync with kitchen POS.",
    },
    solution: {
      es: "Desarrollamos una Web App con Next.js 16 (App Router) y React 19 optimizada con renderizado estático y Server Actions. Integramos un menú interactivo con filtros inmediatos, checkout en 2 clics y envío instantáneo de la orden a la comanda de cocina y WhatsApp.",
      en: "We engineered an ultra-fast Web App using Next.js 16 and React 19 with Server Actions. We integrated an instant filterable menu, 2-click checkout, and real-time order dispatch to kitchen printers and WhatsApp.",
    },
    metrics: [
      {
        value: "+185%",
        label: {
          es: "Incremento en pedidos móviles",
          en: "Increase in mobile orders",
        },
      },
      {
        value: "0.6s",
        label: {
          es: "Tiempo de carga promedio",
          en: "Average load speed",
        },
      },
      {
        value: "100/100",
        label: {
          es: "Puntuación Google PageSpeed",
          en: "Google PageSpeed score",
        },
      },
    ],
    features: {
      es: [
        "Catálogo de comida con variantes (tamaños, ingredientes extras)",
        "Carrito persistente guardado en el dispositivo del cliente",
        "Pasarela de cobro con tarjeta y confirmación por QR",
        "Notificación automática del pedido directo a WhatsApp del restaurante",
        "Panel de administración para cambiar precios y platillos agotados al instante",
      ],
      en: [
        "Interactive food catalog with custom addons & sizes",
        "Persistent cart preserved across browser tabs and sessions",
        "Online card payment gateway and QR instant confirmation",
        "Automated instant dispatch to restaurant WhatsApp & kitchen",
        "Real-time admin dashboard to toggle 86'd items and prices",
      ],
    },
    stack: ["Next.js 16", "React 19", "Tailwind CSS", "Postgres", "WhatsApp API"],
    liveUrl: "https://stellaris-dev.vercel.app",
    accent: "#FF532A",
    bgPreview: "bg-gradient-to-br from-neutral-900 to-[#171717]",
  },
  {
    id: "2",
    slug: "nexus-saas",
    title: "Nexus SaaS - Analytics Dashboard",
    client: "Nexus Cloud Corp",
    year: "2026",
    category: "web",
    categoryLabel: {
      es: "Portal Web & Dashboard",
      en: "Corporate Web & Dashboard",
    },
    tagline: {
      es: "Portal corporativo con panel de analíticas en tiempo real y gestión de equipos para empresas B2B.",
      en: "Enterprise web portal with real-time analytics telemetry and multi-tenant team management.",
    },
    overview: {
      es: "Nexus Cloud requería una plataforma web moderna con arquitectura multi-inquilino para que sus clientes corporativos monitoreen métricas de servidores, costos de infraestructura en la nube y consumo de API en gráficos interactivos.",
      en: "Nexus Cloud required an enterprise-grade digital portal allowing B2B customers to monitor server telemetry, cloud infrastructure spending, and API consumption via interactive charts.",
    },
    challenge: {
      es: "Manejar grandes volúmenes de eventos por segundo sin congelar la interfaz de usuario en el navegador y con un sistema estricto de roles de seguridad (Admin, Editor, Visor).",
      en: "Handling high-frequency telemetry events without browser thread lag while enforcing strict role-based access control (RBAC).",
    },
    solution: {
      es: "Implementamos una interfaz reactiva con Tailwind y gráficos vectoriales ligeros, conectada a PostgreSQL mediante consultas optimizadas y caché perimetral en Vercel Edge para respuestas en milisegundos.",
      en: "We developed a responsive UI with Tailwind and lightweight vector charts, connected to PostgreSQL via optimized queries and Vercel Edge caching for sub-millisecond responses.",
    },
    metrics: [
      {
        value: "4.2x",
        label: {
          es: "Más rápido que la versión previa",
          en: "Faster than legacy version",
        },
      },
      {
        value: "99.99%",
        label: {
          es: "Disponibilidad en producción",
          en: "Uptime on production",
        },
      },
      {
        value: "12k+",
        label: {
          es: "Usuarios activos mensuales",
          en: "Monthly active users",
        },
      },
    ],
    features: {
      es: [
        "Gráficos interactivos de consumo y analíticas en tiempo real",
        "Control de acceso por roles y membresías de equipo",
        "Exportación de reportes automáticos en PDF y CSV",
        "Modo oscuro profundo (#171717) y modo claro de alto contraste",
        "Autenticación segura con doble factor (2FA)",
      ],
      en: [
        "Interactive real-time consumption and latency graphs",
        "Role-based access control and team workspace invitations",
        "Automated report generation in PDF and CSV",
        "Deep charcoal dark mode (#171717) and high-contrast light mode",
        "Enterprise Two-Factor Authentication (2FA)",
      ],
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "Recharts"],
    liveUrl: "https://stellaris-dev.vercel.app",
    accent: "#171717",
    bgPreview: "bg-gradient-to-br from-[#242428] to-[#171717]",
  },
  {
    id: "3",
    slug: "aura-boutique",
    title: "Aura Boutique - Luxury E-Commerce",
    client: "Aura Fashion House",
    year: "2026",
    category: "ecommerce",
    categoryLabel: {
      es: "Tienda Online de Alta Gama",
      en: "Luxury E-Commerce Store",
    },
    tagline: {
      es: "Experiencia de compra editorial de lujo con pasarelas internacionales y catálogo en alta resolución.",
      en: "Editorial luxury shopping experience with international checkout and ultra-crisp imagery.",
    },
    overview: {
      es: "Aura Boutique es una marca de moda contemporánea que buscaba una tienda virtual que transmitiera la misma sofisticación que sus tiendas físicas en París y Madrid, con navegación fluida y tiempos de carga instantáneos.",
      en: "Aura Boutique is a contemporary fashion brand seeking an online flagship reflecting the sophistication of their physical boutiques, featuring instant page transitions and high-end visual storytelling.",
    },
    challenge: {
      es: "Exhibir imágenes en altísima resolución de prendas de vestir y desfiles sin penalizar la velocidad de carga ni consumir el plan de datos móviles de los compradores.",
      en: "Displaying rich high-resolution photography without degrading performance or exceeding mobile bandwidth quotas.",
    },
    solution: {
      es: "Configuramos optimización de imágenes en formato WebP/AVIF mediante Next.js Image y Vercel Blob Storage, logrando imágenes nítidas con una reducción del 78% en peso de archivo y un checkout simplificado en un solo paso.",
      en: "Configured automated WebP/AVIF image transformations via Next.js Image and Vercel Blob Storage, resulting in crisp visuals with 78% reduced file weights and single-step checkout.",
    },
    metrics: [
      {
        value: "+210%",
        label: {
          es: "Aumento en ventas internacionales",
          en: "Increase in international sales",
        },
      },
      {
        value: "< 1s",
        label: {
          es: "Carga de fotos de productos",
          en: "Product image load speed",
        },
      },
      {
        value: "3.4%",
        label: {
          es: "Tasa de conversión de visita a compra",
          en: "Visitor to purchase conversion rate",
        },
      },
    ],
    features: {
      es: [
        "Galería de imágenes con zoom táctil y vista previa de tallas",
        "Pasarela multi-moneda (USD, EUR, moneda local)",
        "Integración con inventario físico y alertas de pocas unidades",
        "Diseño editorial minimalista con micro-animaciones refinadas",
        "Filtros instantáneos por colección, color y precio",
      ],
      en: [
        "Tactile zoom image gallery with interactive size guide",
        "Multi-currency payment processing (USD, EUR, Local)",
        "Real-time warehouse inventory sync with low stock alerts",
        "Editorial minimalist aesthetic with refined micro-animations",
        "Instant facets by collection, color, and price range",
      ],
    },
    stack: ["Next.js 16", "Vercel Blob", "Stripe Checkout", "Framer Motion"],
    liveUrl: "https://stellaris-dev.vercel.app",
    accent: "#FF532A",
    bgPreview: "bg-gradient-to-br from-[#FF532A] to-[#E0451F]",
  },
];
