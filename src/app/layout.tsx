import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { InteractiveStars } from "@/components/canvas/InteractiveStars";

export const metadata: Metadata = {
  title: "Stellaris Dev | Modern Web Design & Development",
  description:
    "Professional web design and high-performance development powered by Artificial Intelligence. Fast, responsive, and high-converting websites.",
  keywords: [
    "Web design agency",
    "Next.js development",
    "AI powered websites",
    "Custom web design",
    "E-commerce development",
    "Landing pages",
  ],
  authors: [{ name: "Stellaris Dev" }],
  openGraph: {
    title: "Stellaris Dev | Modern Web Design & Development",
    description:
      "We build websites that attract clients and grow your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Michroma&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#07090e] text-slate-100 relative">
        <LanguageProvider>
          <SmoothScrollProvider>
            <InteractiveStars />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
