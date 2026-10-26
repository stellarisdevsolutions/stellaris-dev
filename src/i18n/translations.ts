export type Language = "en" | "es";

export const TRANSLATIONS = {
  en: {
    navbar: {
      home: "HOME",
      services: "SERVICES",
      projects: "PROJECTS",
      process: "HOW WE WORK",
      pricing: "PRICING",
      faq: "FAQ",
      contact: "CONTACT",
      ctaBtn: "START PROJECT",
    },
    hero: {
      eyebrow: "PROFESSIONAL WEB STUDIO",
      titlePart1: "Websites that ",
      titleHighlight: "shine",
      titlePart2: " in your own digital universe.",
      subtitle:
        "We design and build modern, ultra-fast websites and online stores crafted to convert visitors into paying clients.",
      ctaPrimary: "Start My Project",
      ctaSecondary: "View Projects",
      badgeLive: "Accepting new projects this month",
    },
    techStack: {
      label: "Modern technologies & frameworks powering your project",
    },
    services: {
      eyebrow: "WHAT WE DO",
      titlePart1: "Our ",
      titleHighlight: "services",
      subtitle:
        "High-performance digital solutions tailored to the stage and ambition of your brand.",
      items: [
        {
          id: "landing",
          title: "Landing Pages & High-Conversion Sites",
          description:
            "Sleek single-page sites designed with one clear goal: driving visitors to book a call or purchase immediately.",
          features: [
            "Tailored UI/UX design matching your brand",
            "Ultra-fast loading speed (<0.8s)",
            "Direct WhatsApp click-to-chat integration",
            "Direct inquiry form sent to your inbox",
          ],
        },
        {
          id: "corporate",
          title: "Corporate Multi-Page Websites",
          description:
            "Comprehensive, structured web experiences built to position your company as the authoritative leader in your sector.",
          features: [
            "Multi-page structure (About, Services, Team, Case Studies)",
            "SEO optimization to rank high on Google search",
            "Interactive contact forms & location maps",
            "Fully responsive across all mobile screens",
          ],
        },
        {
          id: "ecommerce",
          title: "Online Stores & Web Applications",
          description:
            "Sell products 24/7 with seamless carts, automated payments, and custom backends that scale with your sales.",
          features: [
            "Modern product catalog with fast checkout",
            "Card payments, transfers, or WhatsApp orders",
            "Easy admin panel to manage products & orders",
            "Bank-level SSL security certificates",
          ],
        },
      ],
    },
    whyUs: {
      titlePart1: "Why choose ",
      titleHighlight: "Kano Dev",
      subtitle: "A digital partner focused on tangible business growth, not tech headaches.",
      pillars: [
        {
          title: "On-Time Delivery",
          description: "Strict project roadmaps with clear launch dates. Zero endless delays.",
        },
        {
          title: "Exclusive Design",
          description: "100% bespoke design created for your brand. Zero cheap generic templates.",
        },
        {
          title: "Results-Driven",
          description: "Engineered for speed, clear navigation, and maximum lead conversion.",
        },
        {
          title: "Continuous Support",
          description: "Dedicated guidance before, during, and long after your official launch.",
        },
      ],
    },
    ribbon: [
      "DESIGN",
      "DEVELOP",
      "LAUNCH",
      "SCALE",
      "AUTOMATE",
      "INNOVATE",
    ],
    portfolio: {
      eyebrow: "PORTFOLIO",
      titlePart1: "Recent ",
      titleHighlight: "projects",
      subtitle: "A preview of experiences, platforms, and digital storefronts we've crafted.",
      projects: [
        {
          id: "aurora",
          title: "Kroma Studios • Creative Agency",
          category: "Corporate & Showcase Web",
          tags: ["Next.js", "Framer Motion", "Tailwind"],
          metric: "+180% Inquiries",
        },
        {
          id: "lumina",
          title: "Nexus Analytics • SaaS Dashboard",
          category: "Web Application & Cloud UI",
          tags: ["React 19", "TypeScript", "Charts"],
          metric: "0.6s Load Time",
        },
        {
          id: "velox",
          title: "Vanguard Living • Luxury Real Estate",
          category: "Property Showcase & Leads",
          tags: ["Next.js", "Responsive", "Interactive Map"],
          metric: "100% Mobile Ready",
        },
        {
          id: "zenith",
          title: "Aura Botanicals • D2C E-Commerce",
          category: "Online Store & Automated Cart",
          tags: ["E-Commerce", "Payments", "WhatsApp Checkout"],
          metric: "+42% Conversion Rate",
        },
      ],
    },
    featureTech: {
      eyebrow: "CUTTING-EDGE INFRASTRUCTURE",
      titlePart1: "Modern tech stack, ",
      titleHighlight: "always up to date",
      description:
        "We build exclusively with industry-standard stacks (Next.js 16, React 19, Tailwind CSS v4, and modern AI pipelines) ensuring your website remains lightning-fast, ultra-secure, and easy to maintain for years.",
      bullets: [
        "Instant page loads powered by server-side rendering",
        "Clean, semantic code that Google search loves",
        "AI-assisted design refinement and optimization",
        "Zero bulky, vulnerable WordPress plugins",
      ],
      aiBadge: "AI POWERED CORE",
    },
    featureMobile: {
      eyebrow: "RESPONSIVE BY DEFAULT",
      titlePart1: "Mobile-first ",
      titleHighlight: "experience",
      description:
        "Over 80% of your potential clients will discover your website directly on their smartphones. We obsess over touch targets, instant tap feedback, and thumb-friendly navigation.",
      bullets: [
        "Flawless visual adaptation across iPhone, Android, tablets & laptops",
        "Smooth touch gestures and fluid micro-animations",
        "Direct one-tap WhatsApp and phone call triggers",
      ],
    },
    process: {
      eyebrow: "STEP BY STEP",
      titlePart1: "How we ",
      titleHighlight: "work",
      subtitle: "A transparent, structured workflow so you always know what's happening.",
      steps: [
        {
          num: "1",
          title: "Discovery & Plan",
          description: "We review your goals, brand assets, and deliver a transparent fixed proposal.",
        },
        {
          num: "2",
          title: "Design & Prototype",
          description: "We design a high-fidelity visual layout. You approve every visual detail first.",
        },
        {
          num: "3",
          title: "Development & AI",
          description: "We code clean, high-speed pages and link your WhatsApp and lead forms.",
        },
        {
          num: "4",
          title: "Deployment & Growth",
          description: "We publish your domain with SSL certificates and provide walkthrough support.",
        },
      ],
    },
    pricing: {
      eyebrow: "CLEAR INVESTMENT",
      titlePart1: "Plans for ",
      titleHighlight: "every stage",
      subtitle: "Transparent fixed pricing with no surprise monthly retainers.",
      from: "From",
      currency: "USD",
      plans: [
        {
          id: "landing",
          name: "Landing Page",
          price: "100",
          popular: false,
          tagline: "Perfect for launching a campaign or validating an offer quickly.",
          features: [
            "Bespoke high-converting single page",
            "100% mobile-friendly responsive layout",
            "Direct WhatsApp click-to-chat integration",
            "Direct email capture form",
            "Sub-second loading speed",
            "Free SSL security padlock",
          ],
          cta: "Select Landing Page",
        },
        {
          id: "complete",
          name: "Multi-Page Website",
          price: "150",
          popular: true,
          tagline: "The complete digital flagship for companies & professionals.",
          badge: "MOST POPULAR",
          features: [
            "Up to 5 custom pages (Home, About, Services, etc.)",
            "Exclusive visual design tailored to your brand",
            "Google SEO structure to attract organic search leads",
            "Interactive location map & social media links",
            "WhatsApp buttons across all high-intent sections",
            "Full delivery walkthrough & training",
          ],
          cta: "Select Multi-Page",
        },
        {
          id: "ecommerce",
          name: "E-Commerce Store",
          price: "300",
          popular: false,
          tagline: "Sell products 24/7 with automated cart & seamless checkout.",
          features: [
            "Interactive product catalog with shopping cart",
            "Credit card, bank transfer, or WhatsApp checkout",
            "Intuitive admin panel to add and update products",
            "Automated shipping and promo discount engine",
            "Optimized 1-click mobile checkout",
            "Continuous priority support",
          ],
          cta: "Select E-Commerce",
        },
      ],
      bannerTitle: "Have custom requirements or a unique vision?",
      bannerSubtitle: "Tell us about your project and we'll craft a bespoke proposal within 24 hours.",
      bannerCta: "Message Us",
    },
    faq: {
      eyebrow: "FREQUENT QUESTIONS",
      titlePart1: "Frequently asked ",
      titleHighlight: "questions",
      subtitle: "Everything you need to know before kicking off your web project with us.",
      items: [
        {
          q: "How long does it take to launch my website?",
          a: "Landing pages are typically delivered in 3 to 5 business days. Complete multi-page websites take 7 to 10 days, and custom e-commerce platforms take 12 to 18 days depending on your catalog size.",
        },
        {
          q: "What do I need to provide to get started?",
          a: "Just your brand logo (if you have one), a brief description of what you sell, and your contact info. If you don't have final texts or photos, we assist with copywriting and high-resolution assets.",
        },
        {
          q: "Are there any hidden monthly fees?",
          a: "None. All our plans are one-time payments for development. You own 100% of your website. The only external costs are your domain and hosting provider (we guide you to the most reliable, affordable options).",
        },
        {
          q: "Will my website look great on mobile phones?",
          a: "Absolutely. We design mobile-first. Your website will open immediately, scale smoothly to any screen resolution, and look like a native app on iOS and Android.",
        },
        {
          q: "Can I update products and content in the future?",
          a: "Yes. We build clean, modular architectures and guide you step-by-step so you or your team can easily update prices, photos, and texts without needing coding knowledge.",
        },
      ],
    },
    contact: {
      eyebrow: "GET IN TOUCH",
      titlePart1: "Let's talk about your ",
      titleHighlight: "project",
      subtitle:
        "Ready to build or upgrade your digital presence? Send us a message and receive a free, no-obligation quote today.",
      directWhatsapp: "Direct Phone / Mobile",
      whatsappNumber: "+591 69991245",
      whatsappBtn: "Direct Call / Contact (+591 69991245)",
      emailLabel: "Official Email",
      emailAddress: "contact@tiendastellaris.com",
      guarantees: [
        "Response in under 24 hours",
        "Free proposal with 100% no obligation",
        "Friendly, zero-jargon communication",
      ],
      formTitle: "Send Us a Message",
      formSubtitle: "Tell us about your idea and we'll reply right away.",
      nameLabel: "Your Name or Business",
      namePlaceholder: "e.g. Alex Johnson / TechCorp",
      contactLabel: "Phone Number or Email",
      contactPlaceholder: "e.g. +1 555 123 4567 or alex@company.com",
      planLabel: "Plan or Service of Interest",
      planOptions: [
        "Landing Page ($100 USD)",
        "Multi-Page Website ($150 USD) - Recommended",
        "E-Commerce Store ($300 USD)",
        "Custom Tailored Project",
      ],
      messageLabel: "Tell us briefly about your business or goals",
      messagePlaceholder: "What does your business sell and what would you like your website to achieve?",
      submitBtn: "Send Message",
    },
    footer: {
      tagline:
        "High-performance modern web design studio. We build digital experiences that attract clients and elevate brands.",
      rights: "All rights reserved.",
      techText: "Crafted with Next.js & Artificial Intelligence.",
    },
  },
  es: {
    navbar: {
      home: "INICIO",
      services: "SERVICIOS",
      projects: "PROYECTOS",
      process: "CÓMO TRABAJAMOS",
      pricing: "PRECIOS",
      faq: "PREGUNTAS",
      contact: "CONTACTO",
      ctaBtn: "INICIA TU PROYECTO",
    },
    hero: {
      eyebrow: "ESTUDIO DE DESARROLLO WEB",
      titlePart1: "Sitios web que ",
      titleHighlight: "brillan",
      titlePart2: " en tu propio universo digital.",
      subtitle:
        "Diseñamos y desarrollamos páginas y tiendas online modernas, ultra rápidas y pensadas para hacer crecer tu marca y conseguir más clientes.",
      ctaPrimary: "Comenzar mi proyecto",
      ctaSecondary: "Ver proyectos",
      badgeLive: "Aceptando nuevos proyectos este mes",
    },
    techStack: {
      label: "Tecnologías y herramientas modernas que impulsan tu web",
    },
    services: {
      eyebrow: "LO QUE HACEMOS",
      titlePart1: "Nuestros ",
      titleHighlight: "servicios",
      subtitle:
        "Soluciones digitales de alto rendimiento adaptadas a la etapa y ambición de tu negocio.",
      items: [
        {
          id: "landing",
          title: "Landing Pages & Páginas de Alta Conversión",
          description:
            "Páginas de una sola sección estructuradas con un único objetivo: lograr que tus visitantes te escriban o compren de inmediato.",
          features: [
            "Diseño 100% exclusivo adaptado a tu marca",
            "Velocidad de carga instantánea (<0.8s)",
            "Botón directo de WhatsApp integrado",
            "Formulario de contacto directo a tu correo",
          ],
        },
        {
          id: "corporate",
          title: "Sitios Web Corporativos Multi-Página",
          description:
            "Una presencia digital sólida, profesional y estructurada para posicionar tu empresa como líder en su rubro.",
          features: [
            "Múltiples páginas (Inicio, Nosotros, Servicios, Casos de éxito)",
            "Optimización SEO para aparecer en los primeros resultados de Google",
            "Múltiples formularios de contacto y mapa interactivo",
            "Adaptación impecable para computadoras y celulares",
          ],
        },
        {
          id: "ecommerce",
          title: "Tiendas Online & Aplicaciones Web",
          description:
            "Vende tus productos las 24 horas con carrito interactivo, cobros automatizados o pedidos directos a tu WhatsApp.",
          features: [
            "Catálogo interactivo con carrito de compras",
            "Cobros con tarjeta, transferencia o WhatsApp",
            "Panel sencillo para gestionar productos y pedidos",
            "Seguridad y candado SSL para compras protegidas",
          ],
        },
      ],
    },
    whyUs: {
      titlePart1: "Por qué elegir ",
      titleHighlight: "Kano Dev",
      subtitle: "Un socio digital enfocado en resultados reales, sin tecnicismos confusos.",
      pillars: [
        {
          title: "Entrega puntual",
          description: "Cronogramas claros con fechas de entrega fijas. Sin retrasos interminables.",
        },
        {
          title: "Diseño exclusivo",
          description: "100% hecho a la medida de tu marca. Cero plantillas genéricas baratas.",
        },
        {
          title: "Enfocado en resultados",
          description: "Páginas ágiles optimizadas para convertir visitantes en clientes reales.",
        },
        {
          title: "Soporte continuo",
          description: "Acompañamiento y asesoría antes, durante y después del lanzamiento oficial.",
        },
      ],
    },
    ribbon: [
      "DISEÑAR",
      "DESARROLLAR",
      "LANZAR",
      "ESCALAR",
      "AUTOMATIZAR",
      "INNOVAR",
    ],
    portfolio: {
      eyebrow: "PORTAFOLIO",
      titlePart1: "Proyectos ",
      titleHighlight: "recientes",
      subtitle: "Una muestra de experiencias, plataformas y tiendas creadas para nuestros clientes.",
      projects: [
        {
          id: "aurora",
          title: "Kroma Studios • Agencia Creativa",
          category: "Sitio Web Corporativo & Portafolio",
          tags: ["Next.js", "Framer Motion", "Tailwind"],
          metric: "+180% Solicitudes",
        },
        {
          id: "lumina",
          title: "Nexus Analytics • Plataforma SaaS",
          category: "Aplicación Web & Dashboard Cloud",
          tags: ["React 19", "TypeScript", "Charts"],
          metric: "0.6s Carga",
        },
        {
          id: "velox",
          title: "Vanguard Living • Inmobiliaria Premium",
          category: "Catálogo Inmobiliario & Captación",
          tags: ["Next.js", "Responsive", "Mapa"],
          metric: "100% Móvil",
        },
        {
          id: "zenith",
          title: "Aura Botanicals • E-Commerce D2C",
          category: "Tienda Online con Checkout Ágil",
          tags: ["E-Commerce", "Pagos", "WhatsApp"],
          metric: "+42% Conversión",
        },
      ],
    },
    featureTech: {
      eyebrow: "TECNOLOGÍA DE VANGUARDIA",
      titlePart1: "Tecnología de punta, ",
      titleHighlight: "siempre actualizada",
      description:
        "Construimos exclusivamente con las tecnologías más modernas del sector (Next.js 16, React 19, Tailwind CSS v4 e Inteligencia Artificial). Tu página web será ultra rápida, impenetrable en seguridad y lista para escalar sin problemas.",
      bullets: [
        "Apertura instantánea gracias al renderizado moderno",
        "Código limpio y optimizado que Google ama para posicionarte",
        "Diseño acelerado y pulido al píxel con Inteligencia Artificial",
        "Cero plugins pesados o vulnerabilidades de WordPress",
      ],
      aiBadge: "NÚCLEO POTENCIADO CON IA",
    },
    featureMobile: {
      eyebrow: "RESPONSIVE DE VERDAD",
      titlePart1: "Diseños aptos para ",
      titleHighlight: "celulares",
      description:
        "Más del 80% de tus clientes te visitarán desde su teléfono móvil. Cuidamos cada botón táctil, tipografía y animación para que la experiencia en celular sea tan fluida como usar una app de primera categoría.",
      bullets: [
        "Adaptación perfecta en iPhone, Android, tablets y computadoras",
        "Navegación táctil ágil sin zoom molesto ni textos pequeños",
        "Botones directos para llamar o abrir WhatsApp con un solo toque",
      ],
    },
    process: {
      eyebrow: "PASO A PASO",
      titlePart1: "Cómo ",
      titleHighlight: "trabajamos",
      subtitle: "Un proceso transparente y ágil para que siempre sepas qué estamos construyendo.",
      steps: [
        {
          num: "1",
          title: "Contacto y plan",
          description: "Analizamos tu negocio y te entregamos un plan claro con presupuesto cerrado.",
        },
        {
          num: "2",
          title: "Diseño y prototipo",
          description: "Diseñamos la propuesta visual exclusiva. Pruebas y apruebas el diseño primero.",
        },
        {
          num: "3",
          title: "Desarrollamos",
          description: "Programamos con carga instantánea y conectamos tus botones de WhatsApp y correo.",
        },
        {
          num: "4",
          title: "Despliegue",
          description: "Publicamos tu web en vivo con dominio y candado SSL, listos para recibir clientes.",
        },
      ],
    },
    pricing: {
      eyebrow: "INVERSIÓN TRANSPARENTE",
      titlePart1: "Planes ",
      titleHighlight: "para cada etapa",
      subtitle: "Precios cerrados, pago único y sin mensualidades obligatorias.",
      from: "Desde",
      currency: "USD",
      plans: [
        {
          id: "landing",
          name: "Landing Page",
          price: "100",
          popular: false,
          tagline: "Ideal para promocionar un producto, servicio o campaña puntual.",
          features: [
            "Página de una sola sección de alta conversión",
            "Diseño moderno y 100% adaptable a celulares",
            "Botón directo de WhatsApp click-to-chat",
            "Formulario de captura directo a tu correo",
            "Velocidad de carga menor a 1 segundo",
            "Candado de seguridad SSL incluido",
          ],
          cta: "Elegir Landing Page",
        },
        {
          id: "complete",
          name: "Sitio Web Multi-Página",
          price: "150",
          popular: true,
          tagline: "La opción más completa para empresas, estudios y profesionales.",
          badge: "MÁS SOLICITADO",
          features: [
            "Hasta 5 páginas (Inicio, Nosotros, Servicios, etc.)",
            "Diseño exclusivo adaptado a tu identidad de marca",
            "Estructura SEO para aparecer en Google",
            "Mapa interactivo y enlaces directos a redes",
            "Botones de WhatsApp en puntos clave de venta",
            "Capacitación y entrega completa del proyecto",
          ],
          cta: "Elegir Sitio Completo",
        },
        {
          id: "ecommerce",
          name: "Tienda Online / E-Commerce",
          price: "300",
          popular: false,
          tagline: "Vende las 24 horas con carrito interactivo y pagos automáticos.",
          features: [
            "Catálogo interactivo con carrito de compras",
            "Cobros con tarjeta, transferencia o WhatsApp",
            "Panel sencillo para gestionar productos y stock",
            "Cálculo de envíos y promociones con cupones",
            "Checkout ultra rápido pensado para el celular",
            "Soporte prioritario continuo",
          ],
          cta: "Elegir Tienda Online",
        },
      ],
      bannerTitle: "¿Tienes requerimientos específicos o una idea única?",
      bannerSubtitle: "Escríbenos y te armamos una propuesta a la medida de tu proyecto en menos de 24h.",
      bannerCta: "Escríbenos",
    },
    faq: {
      eyebrow: "DUDAS FRECUENTES",
      titlePart1: "Preguntas ",
      titleHighlight: "frecuentes",
      subtitle: "Resolvemos tus dudas principales antes de comenzar a trabajar juntos.",
      items: [
        {
          q: "¿Cuánto tiempo tarda en estar lista mi página web?",
          a: "Las Landing Pages suelen entregarse entre 3 y 5 días hábiles. Un sitio multi-página corporativo toma de 7 a 10 días, y una tienda online completa de 12 a 18 días según la cantidad de productos.",
        },
        {
          q: "¿Qué necesito entregarles para comenzar el proyecto?",
          a: "Solo tu logo (si lo tienes), una idea general de tus servicios o productos y tus datos de contacto. Si no tienes los textos listos o imágenes profesionales, te ayudamos a redactarlos y optimizarlos.",
        },
        {
          q: "¿Tendré costos mensuales o pagos ocultos obligatorios?",
          a: "Ninguno. Nuestros precios son de pago único por el desarrollo completo. La página es 100% tuya. Los únicos costos externos anuales son tu dominio y tu hosting (te guiamos para elegir las opciones más accesibles y seguras).",
        },
        {
          q: "¿La página web se verá bien y rápida en celulares?",
          a: "Totalmente. Diseñamos bajo el principio Mobile-First. Tu página abrirá al instante, los textos se leerán perfectamente sin hacer zoom y tus clientes podrán chatear a tu WhatsApp con un toque.",
        },
        {
          q: "¿Puedo actualizar o añadir contenido en el futuro?",
          a: "Sí. Diseñamos con una estructura limpia y modular, y te brindamos una guía sencilla para que tú o tu equipo puedan actualizar precios, textos e imágenes sin complicaciones técnicas.",
        },
      ],
    },
    contact: {
      eyebrow: "CONTACTO DIRECTO",
      titlePart1: "Hablemos de tu ",
      titleHighlight: "proyecto",
      subtitle:
        "¿Listo para renovar tu presencia digital? Escríbenos y te preparamos una propuesta clara, sin costo y sin compromiso.",
      directWhatsapp: "WhatsApp Oficial",
      whatsappNumber: "+591 69991245",
      whatsappBtn: "Chatear al WhatsApp (+591 69991245)",
      emailLabel: "Correo Electrónico",
      emailAddress: "contact@tiendastellaris.com",
      guarantees: [
        "Respuesta en menos de 24 horas",
        "Presupuesto gratuito y 100% sin compromiso",
        "Trato cercano y explicaciones sin tecnicismos",
      ],
      formTitle: "Envíanos un mensaje",
      formSubtitle: "Cuéntanos sobre tu idea y te responderemos enseguida.",
      nameLabel: "Tu Nombre o Empresa",
      namePlaceholder: "Ej. Carlos Mendoza / Restaurante Los Pinos",
      contactLabel: "Teléfono (WhatsApp) o Correo Electrónico",
      contactPlaceholder: "Ej. +591 69991245 o carlos@ejemplo.com",
      planLabel: "Plan o Servicio que te interesa",
      planOptions: [
        "Landing Page ($100 USD)",
        "Sitio Web Multi-Página ($150 USD) - Recomendado",
        "Tienda Online / E-Commerce ($300 USD)",
        "Proyecto Especial / A Medida",
      ],
      messageLabel: "¿De qué trata tu negocio o idea?",
      messagePlaceholder: "Cuéntanos brevemente qué vendes o qué te gustaría que tenga tu página web...",
      submitBtn: "Enviar Mensaje",
    },
    footer: {
      tagline:
        "Estudio boutique de desarrollo y diseño web moderno. Creamos experiencias digitales que atraen clientes y hacen crecer marcas.",
      rights: "Todos los derechos reservados.",
      techText: "Creado con Next.js e Inteligencia Artificial.",
    },
  },
};
