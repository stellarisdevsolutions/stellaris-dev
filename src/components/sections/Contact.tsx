"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Contact() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Landing page");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      lang === "es"
        ? `Hola Stellaris Dev! Mi nombre es ${name}. Correo/Teléfono: ${email}. Me interesa: "${projectType}". Mensaje: ${message}`
        : `Hi Stellaris Dev! My name is ${name}. Email/Phone: ${email}. Interested in: "${projectType}". Message: ${message}`;

    window.open(`https://wa.me/59169991245?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contacto" className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-24 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
      {/* Left Column */}
      <div className="flex flex-col gap-6 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#E8EEF9] text-[#222E54] border border-[#D5DFEE] self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] shadow-[0_0_6px_rgba(255,90,54,0.6)]" />
          {lang === "es" ? "CONTACTO" : "GET IN TOUCH"}
        </div>

        <h2 className="hd text-4xl sm:text-5xl font-bold leading-[1.1] tracking-[-1px] text-[#0B1020] m-0">
          {lang === "es" ? "Hablemos de tu " : "Let's talk about your "}
          <span className="highlight-badge">
            {lang === "es" ? "proyecto" : "project"}
          </span>
        </h2>

        <p className="m-0 text-[#4A5373] text-[17px] leading-[1.6] max-w-[480px]">
          {lang === "es"
            ? "Cuéntanos tu idea y te enviamos una propuesta clara y sin compromiso."
            : "Tell us about your idea and we'll send a clear, no-obligation proposal."}
        </p>

        {/* 3 Contact Cards exactly like reference */}
        <div className="flex flex-col gap-3.5 mt-2">
          {/* Card 1: Email */}
          <div className="lt rounded-[16px] p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#0B1020] text-[#FF5A36] flex items-center justify-center shrink-0 border border-[#2A3560] shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] text-[#4A5373]">{lang === "es" ? "Correo" : "Email"}</div>
              <a
                href="mailto:stellarisdev.us@gmail.com"
                className="font-medium text-[#0B1020] hover:text-[#FF5A36] transition-colors mt-0.5 block text-[15px]"
              >
                stellarisdev.us@gmail.com
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="lt rounded-[16px] p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#0B1020] text-[#FF5A36] flex items-center justify-center shrink-0 border border-[#2A3560] shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] text-[#4A5373]">WhatsApp</div>
              <a
                href="https://wa.me/59169991245"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0B1020] hover:text-[#FF5A36] transition-colors mt-0.5 block text-[15px]"
              >
                +591 69991245
              </a>
            </div>
          </div>

          {/* Card 3: Hours */}
          <div className="lt rounded-[16px] p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#0B1020] text-[#FF5A36] flex items-center justify-center shrink-0 border border-[#2A3560] shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] text-[#4A5373]">{lang === "es" ? "Horario de atención" : "Office Hours"}</div>
              <div className="font-medium text-[#0B1020] mt-0.5 text-[15px]">
                {lang === "es" ? "Lunes a sábado, 9:00 – 19:00" : "Monday to Saturday, 9:00 – 19:00"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dark Form Card exactly matching reference */}
      <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[28px] p-8 sm:p-9 flex flex-col gap-5 shadow-2xl border border-[#2A3560] hover:border-[#FF5A36]/40 transition-colors">
        <h3 className="hd text-2xl font-bold text-white m-0">
          {lang === "es" ? "Envíanos un mensaje" : "Send us a message"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="n" className="text-[14px] text-[#A9B3CF]">
              {lang === "es" ? "Nombre" : "Your Name"}
            </label>
            <input
              id="n"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "es" ? "Tu nombre" : "Your name"}
              className="bg-[#121A33] border border-[#2A3560] rounded-[12px] px-4 py-3.5 text-base text-[#E8ECF8] focus:border-[#FF5A36] focus:outline-hidden transition-colors"
            />
          </div>

          {/* Email or Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="e" className="text-[14px] text-[#A9B3CF]">
              {lang === "es" ? "Correo o WhatsApp" : "Email or WhatsApp"}
            </label>
            <input
              id="e"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com o +591..."
              className="bg-[#121A33] border border-[#2A3560] rounded-[12px] px-4 py-3.5 text-base text-[#E8ECF8] focus:border-[#FF5A36] focus:outline-hidden transition-colors"
            />
          </div>

          {/* Project Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="t" className="text-[14px] text-[#A9B3CF]">
              {lang === "es" ? "Tipo de proyecto" : "Project Type"}
            </label>
            <select
              id="t"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="bg-[#121A33] border border-[#2A3560] rounded-[12px] px-4 py-3.5 text-base text-[#E8ECF8] focus:border-[#FF5A36] focus:outline-hidden transition-colors"
            >
              <option value="Landing page">Landing page</option>
              <option value="Sitio web">Sitio web / Multi-página</option>
              <option value="E-commerce">E-commerce / Tienda online</option>
              <option value="Otro / idea especial">Otro / idea especial</option>
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="m" className="text-[14px] text-[#A9B3CF]">
              {lang === "es" ? "Cuéntanos tu idea" : "Tell us your vision"}
            </label>
            <textarea
              id="m"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={lang === "es" ? "Describe brevemente lo que necesitas" : "Briefly describe what you're looking to build"}
              className="bg-[#121A33] border border-[#2A3560] rounded-[12px] px-4 py-3.5 text-base text-[#E8ECF8] focus:border-[#FF5A36] focus:outline-hidden transition-colors resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="btn-accent border-0 py-4 px-7 text-base font-semibold mt-2 cursor-pointer w-full"
          >
            {lang === "es" ? "Enviar mensaje" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
