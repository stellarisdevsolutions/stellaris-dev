import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos generales de contratación de servicios y adquisición de software en Stellaris Dev Solutions.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsPage() {
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
              <FileText className="w-3.5 h-3.5 text-[#FF532A]" />
              <span>CONDICIONES DE SERVICIO</span>
            </div>
            <h1 className="hd text-3xl sm:text-5xl font-bold tracking-tight text-[#171717] m-0">
              Términos y Condiciones
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Última actualización: 24 de octubre de 2026
            </p>
          </div>

          <div className="prose prose-neutral max-w-none text-sm sm:text-base text-neutral-600 leading-relaxed space-y-8">
            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                1. Aceptación de los Términos
              </h2>
              <p>
                Al acceder y utilizar este sitio web o contratar los servicios de desarrollo web y software de <strong>Stellaris Dev Solutions</strong>, aceptas cumplir con los presentes Términos y Condiciones de Servicio.
              </p>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                2. Servicios a Medida y Entregas
              </h2>
              <p>
                Cada proyecto a medida se rige bajo un alcance, cronograma de hitos y presupuesto acordado previamente. Los tiempos de entrega estimados comienzan una vez recibidos los insumos necesarios por parte del cliente (contenidos, accesos o especificaciones requeridas).
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Se incluye fase de revisión y aprobación de prototipos interactivos antes del código definitivo.</li>
                <li>Los cambios fuera del alcance original se presupuestan de mutuo acuerdo.</li>
              </ul>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                3. Licencias del Marketplace
              </h2>
              <p>
                Al adquirir una plantilla o sistema en nuestro Marketplace:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Obtienes una <strong>licencia comercial de por vida</strong> para utilizar, personalizar y desplegar el código en proyectos propios o de tus clientes.</li>
                <li>No está permitida la reventa directa o redistribución pública del código fuente original como plantilla competidora.</li>
                <li>Las compras son de pago único sin cuotas mensuales ocultas.</li>
              </ul>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                4. Garantía y Soporte Técnico
              </h2>
              <p>
                Ofrecemos garantía contra errores de código atribuibles a nuestra programación por un periodo de 30 días post-lanzamiento. El soporte continuo o mantenimientos adicionales pueden contratarse bajo planes mensuales dedicados.
              </p>
            </section>

            <section>
              <h2 className="hd text-xl sm:text-2xl font-bold text-[#171717] mb-3">
                5. Contacto Legal
              </h2>
              <p>
                Para cualquier aclaración sobre estos términos, escríbenos a:
              </p>
              <p className="font-semibold text-[#171717] mt-2">
                contact@tiendastellaris.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
