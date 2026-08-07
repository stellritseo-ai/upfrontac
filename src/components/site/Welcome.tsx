import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Award, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import hvacWelcomeVideo from "@/assets/hvacwelcome.mp4";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

export function Welcome() {
  const { t } = useLanguage();

  const focusPoints = [
    t("Fast-Response HVAC Service", "Servicio HVAC de respuesta rápida"),
    t("Accurate Diagnostics", "Diagnósticos precisos"),
    t("Long-term HVAC Solutions", "Soluciones HVAC a largo plazo"),
    t("Honest Pricing", "Precios honestos"),
    t("Professional Workmanship", "Mano de obra profesional"),
  ];

  return (
    <section id="welcome" className="relative bg-gradient-to-b from-white via-slate-50/40 to-white overflow-hidden py-16 sm:py-20 border-b border-slate-100">
      {/* Background Decorative Blur Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#005CE6]/5 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Main layout: 2-column responsive grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">

          {/* Left Column: Copy & Focus Points (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Top Pill Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#005CE6] shrink-0" />
              <span>{t("About Upfront AC", "Acerca de Upfront AC")}</span>
            </div>

            {/* Heading */}
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] font-extrabold text-slate-900 tracking-tight">
              {t("Built to Solve One Problem in Houston: ", "Creado para resolver un problema en Houston: ")}
              <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t("Reliable HVAC Service.", "el servicio de HVAC poco confiable.")}
              </span>
            </h2>

            {/* History & Mission Copy */}
            <div className="mt-5 space-y-4 font-medium text-slate-600 text-sm sm:text-base leading-relaxed sm:leading-[28px]">
              <p>
                {t(
                  "Upfront AC operates as a local HVAC service provider with trained in-house technicians, fast dispatch systems, and deep expertise in central air conditioning, ductwork, thermostat calibration and modern HVAC efficiency technologies.",
                  "Upfront AC opera como un proveedor de servicios HVAC local con técnicos internos capacitados, sistemas de despacho rápido y amplia experiencia en aire acondicionado central, conductos, calibración de termostatos y tecnologías modernas de eficiencia HVAC."
                )}
              </p>
              <p>
                {t(
                  "We follow industry-standard repair protocols and manufacturer-approved diagnostic procedures to ensure safe and efficient system performance. Homeowners and businesses across Houston trust our team for fast, honest, and reliable HVAC service — every time.",
                  "Seguimos protocolos de reparación estándar de la industria y procedimientos de diagnóstico aprobados por el fabricante para garantizar un rendimiento seguro y eficiente del sistema. Los propietarios y empresas de todo Houston confían en nuestro equipo para un servicio HVAC rápido, honesto y confiable — siempre."
                )}
              </p>
            </div>

            {/* Focus Points Section */}
            <div className="mt-7 w-full">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-[#005CE6]" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
                  {t("What we focus on", "En lo que nos enfocamos")}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {focusPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-xl bg-white border border-slate-200/80 p-3 shadow-sm hover:border-[#005CE6]/40 hover:shadow-md transition-all duration-300">
                    <div className="w-7 h-7 rounded-lg bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#005CE6]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild variant="hero" size="lg" className="font-extrabold rounded-full px-8 py-3.5 bg-[#005CE6] hover:bg-[#0047B3] shadow-[0_10px_30px_-5px_rgba(0,92,230,0.45)] transition-all duration-300 hover:scale-[1.02]">
                <Link to="/request-free-estimate" className="flex items-center gap-2">
                  <span>{t("Get Free Estimate", "Obtener Presupuesto Gratis")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column: Ultra-Premium Video Showcase Frame (5 cols on desktop) */}
          <div className="lg:col-span-5 relative group w-full flex justify-center items-center">

            {/* Ambient Background Radial Glow */}
            <div className="absolute -inset-2 rounded-[40px] bg-gradient-to-tr from-[#005CE6] via-cyan-400 to-indigo-600 opacity-20 blur-3xl group-hover:opacity-35 transition-opacity duration-700 pointer-events-none" />

            {/* Outer Glass Border Frame */}
            <div className="relative w-full rounded-[32px] bg-slate-900/90 p-2 sm:p-3 border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.25)]">

              {/* Inner Video Container */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] min-h-[460px] sm:min-h-[540px] rounded-[24px] overflow-hidden bg-slate-950">
                <AutoPlayVideo
                  src={hvacWelcomeVideo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />

                {/* Subtle Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

                {/* Top Floating Glassmorphism Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/20 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005CE6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005CE6]" />
                  </span>
                  {t("Upfront HVAC Operations", "Operaciones Upfront HVAC")}
                </div>

                {/* Bottom Right Floating Badge: EPA Certified Rating */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-2.5 shadow-xl border border-white/50 text-slate-900">
                  <div className="w-8 h-8 rounded-xl bg-[#005CE6] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[11px] font-black uppercase text-[#005CE6] tracking-wider">{t("EPA Certified", "Certificado por EPA")}</span>
                    <span className="text-xs font-extrabold text-slate-800 mt-0.5">{t("In-House Specialists", "Especialistas Internos")}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
