import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo protegemos y gestionamos tus datos personales y empresariales en Stellaris Dev Solutions.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="w-full max-w-[840px] mx-auto px-6 sm:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#FF532A] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Volver al inicio</span>
            </Link>
          </div>

          <div className="mb-10 pb-8 border-b border-neutral-100">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-[#FF532A]" />
              <span>LEGAL & TRANSPARENCIA</span>
            </div>
            <h1 className="hd text-3xl sm:text-5xl font-bold tracking-tight text-[#171717] m-0">
              Política de Privacidad
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Última actualización: 24 de octubre de 2026
            </p>
          </div>

          <div className="prose prose-neutral max-w-none text-sm sm:text-base text-neutral-600 leading-relaxed space-y-8">
            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                1. Información que Recopilamos
              </h2>
              <p>
                En <strong>Stellaris Dev Solutions</strong> valoramos y respetamos tu privacidad. Únicamente recopilamos la información que tú decides proporcionarnos de forma voluntaria al completar nuestro formulario de contacto, solicitar una cotización o adquirir una plantilla en nuestro Marketplace (nombre, dirección de correo electrónico, detalles generales del proyecto y número de contacto).
              </p>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                2. Uso de la Información
              </h2>
              <p>
                La información facilitada se emplea exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Responder a tus consultas de desarrollo web o software.</li>
                <li>Elaborar propuestas económicas y técnicas personalizadas.</li>
                <li>Entregar las licencias, repositorios y accesos de productos adquiridos.</li>
                <li>Brindar soporte técnico y mantenimiento post-lanzamiento.</li>
              </ul>
              <p className="mt-2">
                <strong>No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines publicitarios.</strong>
              </p>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                3. Propiedad del Código y Datos de Clientes
              </h2>
              <p>
                Todo el código desarrollado a medida para un cliente es de su exclusiva propiedad una vez completado el proyecto y liquidado el pago correspondiente. Los repositorios y bases de datos son transferidos en su totalidad al cliente, sin retención indebida de credenciales.
              </p>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                4. Cookies y Analíticas
              </h2>
              <p>
                Utilizamos cookies técnicas y herramientas de análisis anónimo para entender el rendimiento de nuestra plataforma (como tiempos de carga y páginas más visitadas) con el único objetivo de mejorar tu experiencia de usuario. Puedes configurar tu navegador para rechazar cookies en cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                5. Contacto sobre Privacidad
              </h2>
              <p>
                Si tienes preguntas sobre nuestras prácticas de privacidad o deseas que eliminemos tus datos de contacto de nuestros registros, contáctanos directamente a:
              </p>
              <p className="font-semibold text-[#171717] mt-2">
                contact@tiendastellaris.com • WhatsApp: +591 69991245
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
