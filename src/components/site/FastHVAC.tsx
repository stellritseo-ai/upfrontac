import { motion } from "framer-motion";
import { PhoneCall, Zap, Clock, ShieldCheck, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import hvacVideo from "@/assets/hvacwelcome.mp4";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

export function FastHVAC() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();

  return (
    <section id="fast-hvac" className="relative w-full overflow-hidden py-[20px] text-white bg-slate-950 border-y border-white/10 select-none">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden translate-z-0">
        <AutoPlayVideo
          src={hvacVideo}
          className="h-full w-full object-cover opacity-90 scale-105 pointer-events-none"
        />
        {/* Soft Vignette Overlay for Maximum Video Clarity & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />

        {/* Glow Spheres for Dynamic Ambient Lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#005CE6]/30 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/25 rounded-full blur-[130px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-[92%] max-w-7xl">
        <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid gap-8 lg:grid-cols-12 items-center">

            {/* Left Column: Headline & Content */}
            <div className="lg:col-span-8 space-y-5 text-left">
              
              {/* Eyebrow Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/40 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-red-300 shadow-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                  </span>
                  <span>{t("Immediate Dispatch Ready", "Despacho Inmediato Listo")}</span>
                </motion.div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-cyan-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Houston & Nearby Suburbs</span>
                </div>
              </div>

              {/* Main Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug text-white"
              >
                {t("Need fast HVAC service in Houston, TX? ", "¿Necesita servicio HVAC rápido en Houston, TX? ")}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                  {t("We’re ready for immediate dispatch.", "Estamos listos para despacho inmediato.")}
                </span>
              </motion.h2>

              {/* Body Text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed font-medium"
              >
                {t(
                  "If your AC or heating system has stopped working, don’t wait. Same-day repair, free estimates and 24/7 emergency service across Houston and nearby suburbs.",
                  "Si su sistema de aire acondicionado o calefacción dejó de funcionar, no espere. Reparación el mismo día, presupuestos gratuitos y servicio de emergencia 24/7 en Houston y suburbios cercanos."
                )}
              </motion.p>

              {/* Micro Features */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-300">
                  <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  <span>{t("Same-Day Repair", "Reparación Mismo Día")}</span>
                </div>
                <span className="text-white/30 hidden sm:inline">•</span>
                <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>{t("Free Estimates", "Presupuestos Gratuitos")}</span>
                </div>
                <span className="text-white/30 hidden sm:inline">•</span>
                <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{t("24/7 Emergency Service", "Servicio de Emergencia 24/7")}</span>
                </div>
              </div>

            </div>

            {/* Right Column: CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-4 w-full"
            >
              {/* Primary Call Button */}
              <a
                href={`tel:${phoneTel}`}
                className="group relative flex items-center justify-center gap-3 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] p-4 sm:p-5 font-black text-white shadow-xl shadow-[#005CE6]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-cyan-200 font-extrabold">
                    {t("Call Now for Dispatch", "Llamar Ahora para Despacho")}
                  </span>
                  <span className="block text-xl font-extrabold tracking-tight text-white mt-0.5">
                    {settings.officePhone || "(713) 819-7908"}
                  </span>
                </div>
              </a>

              {/* Secondary Request Quote Button */}
              <Link
                to="/request-free-estimate"
                className="inline-flex items-center justify-center gap-2 rounded-2xl font-extrabold py-4 px-6 bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full text-center text-xs uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>{t("Request a free quote", "Solicitar un presupuesto gratis")}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
