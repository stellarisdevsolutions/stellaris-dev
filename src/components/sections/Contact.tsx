"use client";

import React, { useState } from "react";
import { Mail, Phone, Clock, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { submitContactFormAction } from "@/app/admin/actions";

export function Contact() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Landing Page");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleDetailedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await submitContactFormAction({
        name,
        email,
        projectType,
        details: message,
        lang,
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("Contact form fallback:", err);
      setSubmitted(true);
    } finally {
      setSending(false);
    }

    if (lang === "es") {
      const text = `Hola Stellaris Dev! Mi nombre es ${name}. Correo: ${email}. Proyecto: ${projectType}. Mensaje: ${message}`;
      window.open(`https://wa.me/59169991245?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <section id="contact" className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Top Banner Callout */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] m-0 max-w-[700px]">
          {lang === "es" ? "¿Tienes una idea increíble en mente? " : "Have An Awesome Project Idea? "}
          <span className="inline-block relative text-white bg-[#FF532A] px-3 sm:px-4 py-0.5 rounded-xl shadow-sm shadow-[#FF532A]/25 -rotate-1 mx-1">
            {lang === "es" ? "Hablemos de ella" : "Let's Discuss"}
          </span>
        </h2>
        <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-[500px]">
          {lang === "es"
            ? "Escríbenos directamente o completa el formulario para armar una propuesta personalizada."
            : "Drop us a line or fill out the form to receive a tailor-made proposal."}
        </p>
      </div>

      {/* Grid: Direct Contact Channels & Detailed Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
        {/* Left Column: Direct channels */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF532A] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#FF532A]/25">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                {lang === "es" ? "Correo Electrónico" : "Email Address"}
              </div>
              <a
                href="mailto:contact@tiendastellaris.com"
                className="font-bold text-[#171717] hover:text-[#FF532A] transition-colors text-base"
              >
                contact@tiendastellaris.com
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#171717] text-[#FF532A] flex items-center justify-center shrink-0 shadow-md">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                {lang === "es" ? "WhatsApp Directo" : "Direct Phone / Mobile"}
              </div>
              <a
                href={lang === "es" ? "https://wa.me/59169991245" : "tel:+59169991245"}
                target={lang === "es" ? "_blank" : undefined}
                rel={lang === "es" ? "noopener noreferrer" : undefined}
                className="font-bold text-[#171717] hover:text-[#FF532A] transition-colors text-base"
              >
                +591 69991245
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                {lang === "es" ? "Horario de Atención" : "Availability"}
              </div>
              <div className="font-semibold text-[#171717] text-sm">
                {lang === "es" ? "Lunes a Sábado, 9:00 – 19:00" : "Monday to Saturday, 9:00 – 19:00"}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Contact Form */}
        <div className="lg:col-span-7 rounded-[32px] bg-[#171717] text-white p-8 sm:p-10 shadow-xl border border-neutral-800">
          <h3 className="hd text-2xl font-bold text-white mb-6">
            {lang === "es" ? "Cuéntanos sobre tu proyecto" : "Tell us about your project"}
          </h3>

          <form onSubmit={handleDetailedSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {lang === "es" ? "Nombre o Empresa" : "Name / Company"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "es" ? "Tu nombre..." : "Your name..."}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#242427] border border-neutral-800 text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {lang === "es" ? "Correo Electrónico" : "Email Address"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === "es" ? "tu@correo.com" : "you@email.com"}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#242427] border border-neutral-800 text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {lang === "es" ? "Tipo de Proyecto" : "Project Type"}
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#242427] border border-neutral-800 text-white focus:border-[#FF532A] outline-hidden text-sm cursor-pointer"
              >
                <option value="Landing Page">Landing Page</option>
                <option value="Sitio Web">Sitio Web Completo</option>
                <option value="E-Commerce">Tienda Online / E-Commerce</option>
                <option value="App Web / Sistema">App Web / Sistema a Medida</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {lang === "es" ? "¿Qué necesitas lograr?" : "Project Details"}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === "es" ? "Describe brevemente tus objetivos..." : "Briefly describe your goals..."}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#242427] border border-neutral-800 text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-2 w-full py-4 rounded-full bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-sm shadow-lg shadow-[#FF532A]/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-101 active:scale-98 disabled:opacity-50"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{lang === "es" ? "Enviar Mensaje a WhatsApp" : "Send Inquiry"}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            {submitted && (
              <p className="text-center text-xs text-emerald-400 mt-1 font-medium">
                {lang === "es"
                  ? "✓ Solicitud registrada en el sistema. Redirigiendo a WhatsApp..."
                  : "✓ Inquiry submitted successfully. We will get in touch shortly."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
