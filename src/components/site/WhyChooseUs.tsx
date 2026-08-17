import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import whyChooseVideo from "@/assets/videowhychooseus.mp4";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Zap, CheckCircle2, ShieldCheck, Clock, Award, PhoneCall, Sparkles } from "lucide-react";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

export function WhyChooseUs() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();

  const features = [
    {
      icon: Clock,
      title: t("Same-day HVAC service", "Servicio HVAC el mismo día"),
      desc: t(
        "In extreme Houston heat — usually low refrigerant, dirty coils or compressor strain.",
        "En el calor extremo de Houston — generalmente por bajo refrigerante, bobinas sucias o esfuerzo del compresor."
      ),
    },
    {
      icon: Award,
      title: t("EPA-certified in-house techs", "Técnicos internos certificados por la EPA"),
      desc: t(
        "Real employees — never subcontractors. Trained, vetted and accountable.",
        "Empleados reales — nunca subcontratistas. Capacitados, evaluados y responsables."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("Transparent pricing", "Precios transparentes"),
      desc: t(
        "Upfront quotes before any work begins. No surprises, no hidden fees.",
        "Cotizaciones por adelantado antes de comenzar cualquier trabajo. Sin sorpresas ni tarifas ocultas."
      ),
    },
    {
      icon: Zap,
      title: t("24/7 emergency response", "Respuesta de emergencia 24/7"),
      desc: t(
        "Around-the-clock dispatch across the Houston metro for urgent breakdowns.",
        "Despacho las 24 horas en todo el metro de Houston para averías urgentes."
      ),
    },
    {
      icon: CheckCircle2,
      title: t("No upselling, ever", "Sin ventas adicionales, nunca"),
      desc: t(
        "We diagnose and fix what’s broken — only necessary repairs, every time.",
        "Diagnosticamos y reparamos lo que está roto — solo reparaciones necesarias, siempre."
      ),
    },
    {
      icon: Sparkles,
      title: t("Workmanship warranty", "Garantía de mano de obra"),
      desc: t(
        "Every repair is backed by a workmanship guarantee for total peace of mind.",
        "Cada reparación está respaldada por una garantía de mano de obra para total tranquilidad."
      ),
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16 items-center">

          {/* Left Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center h-full w-full order-2 lg:order-1"
          >
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#005CE6]/20 bg-[#005CE6]/5 text-[#005CE6] text-[11px] font-black uppercase tracking-widest mb-5 shadow-sm select-none">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005CE6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005CE6]"></span>
                </span>
                <span>{t("Why Upfront AC", "Por Qué Upfront AC")}</span>
              </div>

              {/* Main Headline */}
              <h2 className="leading-[1.2] text-[#0F172A] tracking-tight font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-6">
                {t("Why Upfront AC is ", "Por qué Upfront AC es ")}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {t("better than other HVAC companies", "mejor que otras empresas de HVAC")}
                </span>
                {t(" in Houston", " en Houston")}
              </h2>

              {/* 6 Feature Items Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full text-left">
                {features.map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="group/item flex items-start gap-3.5 bg-slate-50/70 hover:bg-[#005CE6]/5 border border-slate-100 hover:border-[#005CE6]/20 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0 group-hover/item:bg-[#005CE6] group-hover/item:text-white transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <h3 className="font-extrabold text-[#0F172A] text-sm group-hover/item:text-[#005CE6] transition-colors">
                          {f.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                          {f.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1e293b] text-white text-xs font-extrabold uppercase tracking-widest rounded-full px-7 py-3.5 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:scale-[1.03] active:scale-[0.97]"
                >
                  {t("Explore Services", "Explorar Servicios")}
                </Link>
                
                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold uppercase tracking-widest rounded-full px-7 py-3.5 transition-all duration-300 shadow-lg shadow-[#005CE6]/30 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-300" />
                  <span>{settings.officePhone || "(713) 819-7908"}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Video Showcase Card */}
          <div className="relative w-full order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 h-[420px] sm:h-[520px] lg:h-[640px] lg:sticky lg:top-[100px] w-full bg-slate-950"
            >
              {/* Background Video */}
              <AutoPlayVideo
                src={whyChooseVideo}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out pointer-events-none"
              />

              {/* Ambient Dark Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Glassmorphic Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center justify-between select-none transition-all duration-300 group-hover:bottom-6 group-hover:bg-slate-900/95">
                <div className="text-left">
                  <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">
                    {t("Upfront Quality", "Calidad Upfront")}
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                    {t("EPA-Certified Texas HVAC Techs", "Técnicos HVAC Certificados por EPA en Texas")}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-cyan-300 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t("Active Dispatch", "Despacho Activo")}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
