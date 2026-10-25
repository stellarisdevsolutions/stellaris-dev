import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

const siteUrl = "https://tiendastellaris.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stellaris Dev | Desarrollo Web a Medida & Sistemas de Alto Rendimiento",
    template: "%s | Stellaris Dev",
  },
  description:
    "Agencia especializada en desarrollo web de alto rendimiento, aplicaciones a medida, e-commerce y marketplace de plantillas listas para producción con Next.js y React.",
  keywords: [
    "Desarrollo web a medida",
    "Agencia de desarrollo web",
    "Páginas web modernas",
    "Tiendas online e-commerce",
    "Next.js desarrollo",
    "React 19",
    "Marketplace de plantillas web",
    "Software a medida",
    "SaaS para empresas",
    "Stellaris Dev Solutions",
    "tiendastellaris.com",
  ],
  authors: [{ name: "Stellaris Dev Solutions", url: siteUrl }],
  creator: "Stellaris Dev Solutions",
  publisher: "Stellaris Dev Solutions",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.webp", type: "image/webp" },
      { url: "/favicon.webp", type: "image/webp" },
    ],
    apple: "/icon.webp",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Stellaris Dev Solutions",
    title: "Stellaris Dev | Desarrollo Web a Medida & Sistemas de Alto Rendimiento",
    description:
      "Diseñamos y desarrollamos páginas web ultrarrápidas, modernas y listas para convertir visitas en clientes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellaris Dev | Desarrollo Web a Medida & Sistemas de Alto Rendimiento",
    description:
      "Diseñamos y desarrollamos páginas web ultrarrápidas, modernas y listas para convertir visitas en clientes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Stellaris Dev Solutions",
      url: siteUrl,
      logo: `${siteUrl}/opengraph-image`,
      email: "contact@tiendastellaris.com",
      description:
        "Agencia de desarrollo web y software de alto rendimiento, comercio electrónico y marketplace de código fuente profesional.",
      sameAs: ["https://github.com/stellarisdevsolutions"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Stellaris Dev",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "es-ES",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Stellaris Dev Solutions",
      url: siteUrl,
      email: "contact@tiendastellaris.com",
      priceRange: "$$",
      serviceType: [
        "Desarrollo Web Full-Stack",
        "Creación de Tiendas Online",
        "Desarrollo SaaS",
        "Optimización de Rendimiento Web",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F4F6FB] text-[#0B1020] relative">
        <LanguageProvider>
          <SmoothScrollProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
