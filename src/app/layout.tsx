import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Stellaris Dev | Desarrollo Web a Medida",
  description:
    "Diseñamos y desarrollamos páginas web rápidas, modernas y listas para convertir visitas en clientes.",
  keywords: [
    "Desarrollo web a medida",
    "Páginas web",
    "Tiendas online",
    "Next.js",
    "Landing pages",
    "Stellaris Dev",
  ],
  authors: [{ name: "Stellaris Dev" }],
  openGraph: {
    title: "Stellaris Dev | Sitios web que brillan en tu propio universo digital",
    description:
      "Diseñamos y desarrollamos páginas rápidas, modernas y listas para convertir visitas en clientes.",
    type: "website",
  },
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
