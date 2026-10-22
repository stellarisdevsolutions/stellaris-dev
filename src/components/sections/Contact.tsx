"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Send, MessageCircle, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Contact() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    plan: "Sitio Web Multi-Página",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const greeting =
      lang === "es"
        ? `Hola Stellaris Dev! Mi nombre es ${formData.name}. Me interesa el plan "${formData.plan}". Contacto: ${formData.contact}. Mensaje: ${formData.message}`
        : `Hi Stellaris Dev! My name is ${formData.name}. I'm interested in "${formData.plan}". Contact: ${formData.contact}. Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/59169991245?text=${encodeURIComponent(greeting)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contacto" className="relative w-full py-20 md:py-28 bg-[#f8fafc] text-slate-900 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct Info & Trust */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
              {t.contact.eyebrow}
            </span>

            <h2 className="font-michroma text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 uppercase leading-tight">
              {t.contact.titlePart1}
              <span className="highlight-pill ml-1">
                {t.contact.titleHighlight}
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.contact.subtitle}
            </p>

            {/* Direct Contact Cards */}
            <div className="mt-8 space-y-3.5 w-full">
              {/* WhatsApp Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-michroma text-xs sm:text-sm font-bold text-slate-950">
                      {t.contact.directWhatsapp}
                    </h3>
                    <p className="text-xs text-emerald-600 font-mono font-bold">
                      {t.contact.whatsappNumber}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/59169991245?text=${encodeURIComponent(
                    lang === "es"
                      ? "Hola Stellaris Dev, me gustaría cotizar un sitio web para mi proyecto"
                      : "Hi Stellaris Dev, I would like to get a quote for a website project"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95"
                >
                  <span>{t.contact.whatsappBtn}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Email Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    {t.contact.emailLabel}
                  </p>
                  <a
                    href="mailto:stellarisdev.us@gmail.com"
                    className="text-xs font-mono font-bold text-slate-900 hover:text-amber-600 transition-colors"
                  >
                    {t.contact.emailAddress}
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Checkmarks */}
            <div className="mt-8 space-y-2 text-xs text-slate-600 font-medium">
              {t.contact.guarantees.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dark Form Card (Exactly as in reference) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0a0f1d] p-8 sm:p-10 shadow-2xl text-white"
            >
              {/* Card Ambient Glow */}
              <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 bg-amber-500/10 blur-3xl rounded-full" />

              <div className="relative z-10 mb-6 text-left">
                <h3 className="font-michroma text-lg sm:text-xl font-bold text-white mb-1">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.contact.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 text-left">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full rounded-2xl border border-slate-800 bg-[#060a14] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                {/* Contact: Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.contactLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder={t.contact.contactPlaceholder}
                    className="w-full rounded-2xl border border-slate-800 bg-[#060a14] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.planLabel}
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full rounded-2xl border border-slate-800 bg-[#060a14] px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 transition-all"
                  >
                    {t.contact.planOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a0f1d] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full rounded-2xl border border-slate-800 bg-[#060a14] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Button (Amber Button full width) */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-full btn-amber-glow shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer mt-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
