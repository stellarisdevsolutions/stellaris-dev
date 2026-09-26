"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { TechDeco } from "@/components/ui/TechDeco";
import {
  Send,
  MessageCircle,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Contact() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    plan: "multi-pagina",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const greeting =
      lang === "es"
        ? `Hola Stellaris Dev! Mi nombre es ${formData.name}. Me interesa el plan "${formData.plan}". Mensaje: ${formData.message}`
        : `Hi Stellaris Dev! My name is ${formData.name}. I am interested in the plan "${formData.plan}". Message: ${formData.message}`;

    const whatsappMessage = encodeURIComponent(greeting);
    window.open(
      `https://wa.me/59169991245?text=${whatsappMessage}`,
      "_blank"
    );
  };

  return (
    <section
      id="contacto"
      className="relative w-full py-24 md:py-32 bg-[#07090e] text-slate-100 overflow-hidden"
    >
      {/* Tech Geometric HUD Vectors & 3x3 Dots */}
      <TechDeco theme="dark" />

      {/* Radiant Background Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[450px] bg-cyan-500/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[450px] bg-indigo-600/10 blur-[150px] rounded-full" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct Info & WhatsApp CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="h-[1px] w-8 bg-gradient-to-r from-cyan-400 to-cyan-400/20" />
              </div>
              <span className="font-michroma text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-cyan-400 uppercase drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                {t.contact.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-michroma text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] sm:leading-[1.25]"
            >
              {t.contact.titlePart1}
              <span className="text-gradient-cyan">{t.contact.titlePart2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
            >
              {t.contact.subtitle}
            </motion.p>

            {/* Direct WhatsApp & Email Callout Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 w-full space-y-3"
            >
              {/* WhatsApp Card */}
              <div className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-michroma text-xs sm:text-sm font-bold text-white">
                      {t.contact.whatsappCardTitle}
                    </h3>
                    <p className="text-xs text-emerald-300 font-mono font-semibold">
                      +591 69991245
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/59169991245?text=${encodeURIComponent(
                    lang === "es"
                      ? "Hola Stellaris Dev, me gustaría cotizar un sitio web"
                      : "Hi Stellaris Dev, I would like to get a quote for a website"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <span>{t.contact.whatsappBtnText}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Email Card */}
              <div className="w-full rounded-2xl border border-cyan-500/20 bg-[#0c1424]/70 p-4 backdrop-blur-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {t.contact.emailTitle}
                    </p>
                    <a
                      href="mailto:stellarisdev.us@gmail.com"
                      className="text-xs font-mono font-semibold text-cyan-300 hover:underline"
                    >
                      stellarisdev.us@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Checkmarks */}
            <div className="mt-7 space-y-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>{t.contact.bullet1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>{t.contact.bullet2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>{t.contact.bullet3}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-[#0d121f]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl"
            >
              {/* Card Ambient Glow */}
              <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 bg-cyan-500/10 blur-3xl rounded-full" />

              <div className="relative z-10 mb-6">
                <h3 className="font-michroma text-lg sm:text-xl font-bold text-white mb-1">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.contact.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t.contact.namePlaceholder}
                    className="w-full rounded-2xl border border-slate-800 bg-[#07090e]/90 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* WhatsApp / Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.contactLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    placeholder={t.contact.contactPlaceholder}
                    className="w-full rounded-2xl border border-slate-800 bg-[#07090e]/90 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    {t.contact.planLabel}
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-800 bg-[#07090e]/90 px-4 py-3.5 text-sm text-white focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400 transition-all"
                  >
                    <option value="landing-page">
                      {t.contact.planOption1}
                    </option>
                    <option value="multi-pagina">
                      {t.contact.planOption2}
                    </option>
                    <option value="tienda-ecommerce">
                      {t.contact.planOption3}
                    </option>
                    <option value="personalizado">
                      {t.contact.planOption4}
                    </option>
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
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full rounded-2xl border border-slate-800 bg-[#07090e]/90 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-full btn-cyan-glow transition-all duration-300 active:scale-95 shadow-lg shadow-cyan-500/25 cursor-pointer"
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
