import { motion } from "framer-motion";
import {
  Wrench,
  Snowflake,
  Activity,
  MapPin,
  Flame,
  CheckCircle2,
  Sparkles,
  Building2,
  Home,
  ShieldCheck,
  Award,
  PhoneCall,
  ArrowRight,
  Clock,
  Zap,
  Check,
  Phone,
  FileText,
  Star,
  ChevronRight,
  HelpCircle,
  LucideIcon
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";

export interface ServiceDetailData {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: LucideIcon;
  leadParagraph: string;
  featuresTitle: string;
  features: { title: string; desc: string }[];
  specs: string[];
  whyUsPoints: string[];
  processSteps: { num: string; title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
}

export function ServiceDetailPage({ data }: { data: ServiceDetailData }) {
  const { t } = useLanguage();
  const Icon = data.icon;

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* ── SECTION 1: HERO SPOTLIGHT & OVERVIEW ──────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Icon className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>{data.badge}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-700 shadow-sm">
              <Clock className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>{t("24/7 Rapid Dispatch", "Despacho Rápido 24/7")}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {t("Comprehensive HVAC Excellence in ", "Excelencia HVAC Integral en ")}
                <span className="bg-gradient-to-r from-[#005CE6] to-cyan-600 bg-clip-text text-transparent">
                  Tomball & Cypress, TX
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
                {data.leadParagraph}
              </p>

              {/* Specs Bullets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {data.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 px-3.5 py-3 text-xs font-extrabold text-slate-800 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Immediate Call Action Pill */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+17138197908"
                  className="inline-flex items-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-7 py-3.5 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>{t("Call (713) 819-7908", "Llamar al (713) 819-7908")}</span>
                </a>

                <a
                  href="/request-free-estimate"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 font-bold px-7 py-4 text-sm transition-all"
                >
                  <span>{t("Get Free Estimate", "Obtener Presupuesto")}</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>

            </div>

            {/* Right Media Spotlight Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/80 group">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">{data.title}</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    TACLA133609C • Tomball & Greater Houston
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: FEATURES GRID ───────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              {t("Service Highlights", "Aspectos Destacados del Servicio")}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {data.featuresTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4 group-hover:bg-[#005CE6] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#005CE6] transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#005CE6]">
                  <span>{t("Quality Standard", "Estándar de Calidad")}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: HOW OUR PROCESS WORKS ──────────────── */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              {t("Streamlined Execution", "Ejecución Eficiente")}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {t("Our 4-Step Service Process", "Nuestro Proceso de Servicio en 4 Pasos")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.processSteps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 flex flex-col justify-between shadow-sm relative group"
              >
                <div>
                  <span className="text-3xl font-black text-[#005CE6]/30 group-hover:text-[#005CE6] transition-colors">
                    {step.num}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-3">{step.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">{step.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Step {step.num}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: DIRECT EMERGENCY CTA ───────────────── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" />
              <span>{t("Direct Response Service", "Servicio de Respuesta Directa")}</span>
            </span>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t("Ready to Experience Upfront Quality?", "¿Listo para Probar la Calidad Upfront?")}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              {t(
                "Contact our master technicians today for fast scheduling, upfront pricing, and 24/7 emergency support across Tomball and Cypress, TX.",
                "Contáctenos hoy mismo para programación rápida, precios transparentes y soporte de emergencia las 24 horas."
              )}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+17138197908"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/40 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-5 h-5 fill-white" />
                <span>{t("Call (713) 819-7908", "Llamar al (713) 819-7908")}</span>
              </a>

              <a
                href="/request-free-estimate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-7 py-4 text-sm transition-all"
              >
                <span>{t("Get Free Estimate Online", "Obtener Presupuesto Gratis")}</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
