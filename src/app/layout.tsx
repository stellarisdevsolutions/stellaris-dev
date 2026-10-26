import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

const siteUrl = "https://tiendastellaris.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kano Dev | Desarrollo Web a Medida & Sistemas de Alto Rendimiento",
    template: "%s | Kano Dev",
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
    "Kano Dev Solutions",
    "tiendastellaris.com",
  ],
  authors: [{ name: "Kano Dev Solutions", url: siteUrl }],
  creator: "Kano Dev Solutions",
  publisher: "Kano Dev Solutions",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.webp", type: "image/webp" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Kano Dev Solutions",
    title: "Kano Dev | Desarrollo Web a Medida & Sistemas de Alto Rendimiento",
    description:
      "Diseñamos y desarrollamos páginas web ultrarrápidas, modernas y listas para convertir visitas en clientes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kano Dev | Desarrollo Web a Medida & Sistemas de Alto Rendimiento",
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
      name: "Kano Dev Solutions",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}/opengraph-image`,
      email: "contact@tiendastellaris.com",
      telephone: "+59169991245",
      description:
        "Agencia de desarrollo web y software de alto rendimiento, comercio electrónico y marketplace de código fuente profesional.",
      sameAs: ["https://github.com/stellarisdevsolutions"],
      contactPoint: {
        "@type": "ContactPoint",
        "telephone": "+59169991245",
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Kano Dev",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: ["es-ES", "en-US"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Stellaris Dev Solutions",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      email: "contact@tiendastellaris.com",
      telephone: "+59169991245",
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
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F4F6FB] text-[#0B1020] relative">
        <LanguageProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
