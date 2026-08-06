import { motion } from "framer-motion";
import {
  PhoneCall,
  Navigation,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Zap,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: PhoneCall,
      title: t("Request Service", "Solicitar Servicio"),
      desc: t("Call or book online — 24/7.", "Llamar o reservar en línea — 24/7."),
    },
    {
      icon: Navigation,
      title: t("Fast Dispatch", "Despacho Rápido"),
      desc: t("Technicians dispatched across the Houston metro.", "Técnicos despachados en todo el metro de Houston."),
    },
    {
      icon: Wrench,
      title: t("On-Site Diagnosis", "Diagnóstico en Sitio"),
      desc: t("Full inspection and HVAC system check.", "Inspección completa y revisión del sistema HVAC."),
    },
    {
      icon: ShieldCheck,
      title: t("Upfront Pricing", "Precios Transparentes"),
      desc: t("Transparent quote before work begins.", "Cotización transparente antes de comenzar el trabajo."),
    },
    {
      icon: CheckCircle2,
      title: t("Same-Day Repair", "Reparación Mismo Día"),
      desc: t("Most jobs completed the same day.", "La mayoría de los trabajos se completan el mismo día."),
    },
  ];

  const desktopPositions = [
    { left: "20%", top: "50px" },
    { left: "50%", top: "50px" },
    { left: "80%", top: "50px" },
    { left: "20%", top: "310px" },
    { left: "50%", top: "310px" },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-white border-y border-slate-100">

      {/* Background grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #005CE6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes electricFlow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 30; }
        }
        @keyframes sparkFlow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -45; }
        }
        @keyframes verticalElectricFlow {
          0%   { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes pulseGlow {
          0%,100% { transform: scale(0.96); opacity: 0.2; }
          50%     { transform: scale(1.08); opacity: 0.45; }
        }
        @keyframes pulseGlowLarge {
          0%,100% { transform: scale(0.98); opacity: 0.08; }
          50%     { transform: scale(1.03); opacity: 0.22; }
        }
        @keyframes spinFanSlow {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes breezeFlow {
          0%   { stroke-dashoffset: -24; opacity: 0.4; }
          50%  { opacity: 1; }
          100% { stroke-dashoffset: 24; opacity: 0.4; }
        }
        .pulse-glow      { animation: pulseGlow 2s infinite ease-in-out; transform-origin: center; }
        .pulse-glow-large{ animation: pulseGlowLarge 3s infinite ease-in-out; transform-origin: center; }
        .electric-flow   { stroke-dasharray: 6 6; animation: electricFlow 0.5s infinite linear; }
        .spark-flow      { stroke-dasharray: 12 24; animation: sparkFlow 1.8s infinite linear; }
        .mobile-electric-flow {
          background: linear-gradient(to bottom,#005CE6 0%,#005CE6 30%,#38bdf8 50%,#005CE6 70%,#005CE6 100%);
          background-size: 100% 40px;
          animation: verticalElectricFlow 1.2s infinite linear;
        }
        .fan-spin { animation: spinFanSlow 2.5s linear infinite; transform-origin: 30px 30px; }
        .breeze-wave { stroke-dasharray: 8 8; animation: breezeFlow 1.2s linear infinite; }
      `}</style>

      <div className="mx-auto w-[90%] max-w-7xl relative z-10">

        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrows */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-2 bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#005CE6] fill-[#005CE6]" />
              {t("How Upfront AC Works", "Cómo Funciona Upfront AC")}
            </span>

            <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {t("Emergency HVAC Service in Texas", "Servicio HVAC de Emergencia en Texas")}
            </span>
          </div>

          <h2 
            className="text-[#0F172A] tracking-tight leading-[1.15]"
            style={{ fontSize: "36px", marginTop: "0px", marginBottom: "10px", fontWeight: 700 }}
          >
            {t("Fast, transparent ", "Servicio rápido y transparente en ")}
            <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-[#005CE6] bg-clip-text text-transparent">
              {t("service in 5 simple steps", "5 sencillos pasos")}
            </span>
          </h2>

          <p 
            className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed"
            style={{ marginBottom: "-50px" }}
          >
            {t(
              "From your initial call to same-day cooling restoration, we deliver reliable, upfront HVAC service with zero hidden surprises across Houston, Tomball, and Cypress, TX.",
              "Desde su llamada inicial hasta la restauración del enfriamiento el mismo día, ofrecemos un servicio HVAC confiable sin sorpresas ocultas."
            )}
          </p>
        </motion.div>

        {/* ── 1. DESKTOP: S-Curve SVG Layout ──────────────── */}
        <div className="hidden lg:block relative w-full h-[500px] select-none">
          <svg
            viewBox="0 0 1200 360"
            className="absolute top-0 left-0 w-full h-[360px] pointer-events-none z-0"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#1E293B" />
                <stop offset="40%"  stopColor="#475569" />
                <stop offset="60%"  stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Ultra-Premium HVAC & AC Gradients */}
              <radialGradient id="hvacGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#005CE6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#005CE6" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="acGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#005CE6" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="hvacBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              <linearGradient id="acBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#005CE6" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#005CE6" />
              </linearGradient>
            </defs>

            {/* Drop shadow */}
            <path d="M 120 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 920 310"
              stroke="#0f172a" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.07" />
            {/* Outer conduit */}
            <path d="M 120 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 920 310"
              stroke="#334155" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Animated blue core */}
            <motion.path
              d="M 120 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 920 310"
              stroke="#005CE6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Cyan breeze spark flow */}
            <path d="M 120 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 920 310"
              stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              opacity="0.8" className="spark-flow" />
            {/* Glossy highlight */}
            <motion.path
              d="M 120 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 920 310"
              stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              opacity="0.75"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />

            {/* LEFT SIDE: Ultra-Premium Smart HVAC System Hub (Node 1) */}
            <g transform="translate(25, 0)">
              {/* Multi-Layer Radial Glow Aura */}
              <circle cx="45" cy="45" r="42" fill="url(#hvacGlow)" opacity="0.3" className="pulse-glow-large" />
              <circle cx="45" cy="45" r="32" fill="#005CE6" opacity="0.18" className="pulse-glow" />

              {/* Outer Metallic Bevel Frame */}
              <rect x="12" y="8" width="66" height="74" rx="14" fill="url(#hvacBody)" stroke="#005CE6" strokeWidth="2.5" />
              <rect x="15" y="11" width="60" height="68" rx="11" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.5" />

              {/* Fan Grille Top Section with Spinning Blades */}
              <rect x="19" y="16" width="52" height="24" rx="6" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />
              <g transform="translate(45, 28)">
                <g className="fan-spin">
                  <circle cx="0" cy="0" r="3" fill="#38BDF8" />
                  <path d="M 0 -8 C 4 -8, 4 -2, 0 0 C -4 -2, -4 -8, 0 -8 Z" fill="#005CE6" />
                  <path d="M 8 0 C 8 4, 2 4, 0 0 C 2 -4, 8 -4, 8 0 Z" fill="#005CE6" />
                  <path d="M 0 8 C -4 8, -4 2, 0 0 C 4 2, 4 8, 0 8 Z" fill="#005CE6" />
                  <path d="M -8 0 C -8 -4, -2 -4, 0 0 C -2 4, -8 4, -8 0 Z" fill="#005CE6" />
                </g>
              </g>

              {/* OLED Smart Thermostat Touch Panel */}
              <rect x="19" y="44" width="52" height="30" rx="6" fill="#090D16" stroke="#005CE6" strokeWidth="1.5" />
              <text x="24" y="60" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">68°</text>
              <text x="47" y="54" fill="#38BDF8" fontSize="7" fontWeight="800" fontFamily="sans-serif">COOL</text>
              
              {/* Live Animated Equalizer Bars */}
              <rect x="47" y="58" width="3" height="10" rx="1" fill="#38BDF8" className="animate-pulse" />
              <rect x="52" y="61" width="3" height="7" rx="1" fill="#005CE6" className="animate-pulse" />
              <rect x="57" y="56" width="3" height="12" rx="1" fill="#10B981" className="animate-pulse" />

              {/* Status Light */}
              <circle cx="65" cy="49" r="2" fill="#10B981" className="animate-ping" />
            </g>

            <rect x="100" y="40" width="8" height="20" rx="1" fill="#1E293B" />
            <rect x="108" y="46" width="12" height="8" fill="#475569" />

            {/* RIGHT SIDE: Ultra-Premium Smart Split AC Unit (Node 2) */}
            <g transform="translate(895, 245)">
              {/* Multi-Layer Cool Frost Glow */}
              <circle cx="50" cy="38" r="45" fill="url(#acGlow)" opacity="0.25" className="pulse-glow-large" />
              <circle cx="50" cy="38" r="32" fill="#38BDF8" opacity="0.2" className="pulse-glow" />

              {/* Main White Metallic AC Split Body */}
              <rect x="5" y="10" width="90" height="48" rx="12" fill="url(#acBody)" stroke="#005CE6" strokeWidth="2.5" />
              <rect x="8" y="13" width="84" height="42" rx="9" fill="none" stroke="#E2E8F0" strokeWidth="1" opacity="0.8" />

              {/* Chrome Finish Brand Accent Strip */}
              <path d="M 5 22 L 95 22" stroke="url(#chromeGrad)" strokeWidth="2.5" />
              
              {/* OLED Status Indicator & Temp */}
              <rect x="68" y="14" width="22" height="6" rx="2" fill="#0F172A" />
              <circle cx="73" cy="17" r="1.5" fill="#10B981" className="animate-pulse" />
              <circle cx="78" cy="17" r="1.5" fill="#38BDF8" />
              <circle cx="83" cy="17" r="1.5" fill="#005CE6" />

              {/* Motorized Louver Air Vent */}
              <rect x="12" y="42" width="76" height="10" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              <line x1="16" y1="47" x2="84" y2="47" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

              {/* Animated Flowing Breeze Waves (Cyan & Electric Blue) */}
              <path d="M 20 58 C 32 66, 44 54, 56 62" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" className="breeze-wave" />
              <path d="M 40 62 C 52 70, 64 58, 76 66" stroke="#005CE6" strokeWidth="2.5" strokeLinecap="round" fill="none" className="breeze-wave" />
              <path d="M 60 56 C 70 63, 80 55, 90 61" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" className="breeze-wave" />
            </g>
          </svg>

          {/* Step nodes */}
          {steps.map((s, i) => {
            const pos = desktopPositions[i];
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="absolute group cursor-default"
                style={{ left: pos.left, top: pos.top }}
              >
                {/* Circle node */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[78px] h-[78px] rounded-full bg-white shadow-[0_10px_32px_rgba(15,23,42,0.08)] border border-slate-100 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_20px_40px_-6px_rgba(255,107,0,0.25)] group-hover:border-[#005CE6]/30">
                  {/* Step number badge */}
                  <div className="absolute -top-2.5 -right-1 w-5 h-5 rounded-full bg-[#005CE6] flex items-center justify-center shadow-md border-2 border-white">
                    <span className="text-white text-[9px] font-black leading-none">{i + 1}</span>
                  </div>
                  {/* Outer halo */}
                  <div className="absolute -inset-3 rounded-full border border-[#005CE6]/15 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400" />
                  {/* Inner ring */}
                  <div className="absolute inset-1 rounded-full border border-transparent group-hover:border-[#005CE6]/30 transition-all duration-300" />
                  {/* Icon */}
                  <Icon className="h-7 w-7 text-slate-400 group-hover:text-[#005CE6] transition-colors duration-300" />
                </div>

                {/* Text block below node */}
                <div className="absolute top-[48px] -translate-x-1/2 text-center w-[220px] flex flex-col items-center pt-1">
                  <h3 className="font-extrabold text-[15px] text-[#0F172A] leading-tight mt-1 mb-1.5 group-hover:text-[#005CE6] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium px-1">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 2. MOBILE: Vertical Timeline (Pixel-Perfect Alignment) ────────────────── */}
        <div className="relative pt-20 pb-20 pl-16 lg:hidden">
          {/* Top Animated HVAC System Hub (Exact Desktop Icon) */}
          <div className="absolute left-[24px] top-0 -translate-x-1/2 pointer-events-auto z-10 w-[64px] h-[68px] flex flex-col items-center justify-center">
            <svg viewBox="0 0 90 90" className="w-full h-full drop-shadow-lg" fill="none">
              {/* Outer Metallic Bevel Frame */}
              <rect x="12" y="8" width="66" height="74" rx="14" fill="#1E293B" stroke="#005CE6" strokeWidth="2.5" />
              <rect x="15" y="11" width="60" height="68" rx="11" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.5" />

              {/* Fan Grille Top Section with Spinning Blades */}
              <rect x="19" y="16" width="52" height="24" rx="6" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />
              <g transform="translate(45, 28)">
                <g className="fan-spin">
                  <circle cx="0" cy="0" r="3" fill="#38BDF8" />
                  <path d="M 0 -8 C 4 -8, 4 -2, 0 0 C -4 -2, -4 -8, 0 -8 Z" fill="#005CE6" />
                  <path d="M 8 0 C 8 4, 2 4, 0 0 C 2 -4, 8 -4, 8 0 Z" fill="#005CE6" />
                  <path d="M 0 8 C -4 8, -4 2, 0 0 C 4 2, 4 8, 0 8 Z" fill="#005CE6" />
                  <path d="M -8 0 C -8 -4, -2 -4, 0 0 C -2 4, -8 4, -8 0 Z" fill="#005CE6" />
                </g>
              </g>

              {/* OLED Smart Thermostat Touch Panel */}
              <rect x="19" y="44" width="52" height="30" rx="6" fill="#090D16" stroke="#005CE6" strokeWidth="1.5" />
              <text x="24" y="60" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">68°</text>
              <text x="47" y="54" fill="#38BDF8" fontSize="7" fontWeight="800" fontFamily="sans-serif">COOL</text>
              
              {/* Live Animated Equalizer Bars */}
              <rect x="47" y="58" width="3" height="10" rx="1" fill="#38BDF8" className="animate-pulse" />
              <rect x="52" y="61" width="3" height="7" rx="1" fill="#005CE6" className="animate-pulse" />
              <rect x="57" y="56" width="3" height="12" rx="1" fill="#10B981" className="animate-pulse" />

              {/* Status Light */}
              <circle cx="65" cy="49" r="2" fill="#10B981" className="animate-ping" />
            </svg>
          </div>

          {/* Animated vertical conduit */}
          <div className="absolute left-[24px] -translate-x-1/2 top-[58px] bottom-[58px] w-2.5 pointer-events-none z-0">
            <div className="absolute inset-0 bg-slate-900/10 rounded-full blur-[2px]" />
            <div className="absolute inset-0 bg-[#334155] rounded-full" />
            <div className="absolute inset-[2px] rounded-full mobile-electric-flow" />
            <div className="absolute left-[3px] top-[2px] bottom-[2px] w-[1.5px] bg-white/75 rounded-full" />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-10">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col group text-left"
                >
                  {/* Circle node centered on conduit line */}
                  <div className="absolute left-[-40px] top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#005CE6]/30">
                    {/* Step badge */}
                    <div className="absolute -top-1.5 -right-0.5 w-4 h-4 rounded-full bg-[#005CE6] flex items-center justify-center border border-white shadow-sm">
                      <span className="text-white text-[8px] font-black">{i + 1}</span>
                    </div>
                    <div className="absolute inset-0.5 rounded-full border border-transparent group-hover:border-[#005CE6]/40 transition-colors duration-300" />
                    <div className="absolute -inset-2 rounded-full border border-[#005CE6]/20 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                    <Icon className="h-5 w-5 text-slate-400 group-hover:text-[#005CE6] transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="pl-2 py-0.5">
                    <h3 className="font-extrabold text-base text-[#0F172A] leading-tight mt-0 mb-1 group-hover:text-[#005CE6] transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-sm">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Animated Smart Split AC Unit (Exact Desktop Icon) */}
          <div className="absolute left-[24px] bottom-0 -translate-x-1/2 pointer-events-auto z-10 w-[72px] h-[54px] flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 70" className="w-full h-full drop-shadow-lg overflow-visible" fill="none">
              {/* Main White Metallic AC Split Body */}
              <rect x="5" y="10" width="90" height="48" rx="12" fill="#FFFFFF" stroke="#005CE6" strokeWidth="2.5" />
              <rect x="8" y="13" width="84" height="42" rx="9" fill="none" stroke="#E2E8F0" strokeWidth="1" opacity="0.8" />

              {/* Chrome Finish Brand Accent Strip */}
              <path d="M 5 22 L 95 22" stroke="#005CE6" strokeWidth="2.5" />
              
              {/* OLED Status Indicator & Temp */}
              <rect x="68" y="14" width="22" height="6" rx="2" fill="#0F172A" />
              <circle cx="73" cy="17" r="1.5" fill="#10B981" className="animate-pulse" />
              <circle cx="78" cy="17" r="1.5" fill="#38BDF8" />
              <circle cx="83" cy="17" r="1.5" fill="#005CE6" />

              {/* Motorized Louver Air Vent */}
              <rect x="12" y="42" width="76" height="10" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              <line x1="16" y1="47" x2="84" y2="47" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

              {/* Animated Flowing Breeze Waves (Cyan & Electric Blue) */}
              <path d="M 20 58 C 32 66, 44 54, 56 62" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" className="breeze-wave" />
              <path d="M 40 62 C 52 70, 64 58, 76 66" stroke="#005CE6" strokeWidth="2.5" strokeLinecap="round" fill="none" className="breeze-wave" />
              <path d="M 60 56 C 70 63, 80 55, 90 61" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" className="breeze-wave" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
