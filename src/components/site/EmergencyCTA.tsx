import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Users, Star, ShieldCheck, ThermometerSun, MapPin, ArrowRight } from "lucide-react";
import heroVideo from "@/assets/herovideo.mp4";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";

export function EmergencyCTA() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const highlights = [
    {
      icon: Users,
      title: t("Hundreds Served Monthly", "Cientos de Clientes Mensuales"),
      desc: t(
        "Homeowners and businesses across the Houston metro trust our team every day.",
        "Propietarios y empresas en todo el metro de Houston confían en nuestro equipo todos los días."
      ),
    },
    {
      icon: Star,
      title: t("5-Star Service Standard", "Estándar de Servicio de 5 Estrellas"),
      desc: t(
        "Consistent quality on residential split systems, commercial units and high-efficiency setups.",
        "Calidad constante en sistemas divididos residenciales, unidades comerciales y equipos de alta eficiencia."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("In-House Technicians", "Técnicos Internos Especializados"),
      desc: t(
        "EPA-certified specialists — never subcontractors. Trained on every major brand.",
        "Especialistas certificados por la EPA — nunca subcontratistas. Capacitados en las principales marcas."
      ),
    },
    {
      icon: ThermometerSun,
      title: t("Built for Houston Heat", "Diseñado para el Calor de Houston"),
      desc: t(
        "Diagnostics and tune-ups designed specifically for Southeast Texas humidity and load.",
        "Diagnósticos y puestas a punto diseñados específicamente para la humedad y carga del sureste de Texas."
      ),
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-20 text-white bg-slate-950 border-y border-white/10">
      {/* Background Video with Dark Glass Vignette Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden translate-z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover [will-change:transform] translate-z-0 opacity-85 scale-105 pointer-events-none"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Lighter Gradient Vignette Overlay for High Video Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/40" />

        {/* Glow Spheres for Dynamic Lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#005CE6]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/25 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-[92%] max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-cyan-300 shadow-md"
            >
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t("TRUSTED Texas HVAC Contractor", "Contratista HVAC de Confianza en Texas")}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight leading-snug text-white"
            >
              <span className="block xl:whitespace-nowrap">
                {t("Houston’s reliable HVAC partner —", "Socio de HVAC confiable en Houston —")}
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-[#005CE6] to-cyan-300 bg-clip-text text-transparent drop-shadow-sm block mt-1 xl:whitespace-nowrap">
                {t("built for Texas climate", "diseñado para el clima de Texas")}
              </span>
            </motion.h2>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed font-medium"
            >
              {t(
                "Upfront AC serves hundreds of HVAC customers monthly across Houston and nearby suburbs with consistent performance, fast response times, and dependable solutions tailored to local conditions.",
                "Upfront AC atiende a cientos de clientes de HVAC mensualmente en todo Houston y los suburbios cercanos con un rendimiento constante, tiempos de respuesta rápidos y soluciones confiables adaptadas a las condiciones locales."
              )}
            </motion.p>

            {/* 4 Feature Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3"
            >
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 hover:bg-white/20 hover:border-white/35 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-cyan-300 group-hover:bg-[#005CE6] group-hover:text-white transition-all duration-300 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-200/80 leading-relaxed font-medium mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Action Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center gap-5 w-full"
          >
            {/* Call Action Glass Banner */}
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-[#005CE6] to-blue-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>

              <a
                href="tel:7138197908"
                className="relative flex items-center justify-between gap-4 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/30 p-6 font-semibold text-white shadow-2xl hover:bg-white/20 transition-all duration-300 w-full"
              >
                <div className="flex items-center gap-4">
                  <span className="relative grid place-items-center h-14 w-14 rounded-2xl bg-[#005CE6] text-white shadow-xl shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-[#005CE6] opacity-50"></span>
                    <Phone className="h-6 w-6 text-white relative z-10" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[11px] uppercase tracking-widest text-cyan-300 font-extrabold">
                      {t("24/7 HVAC Hotline", "Línea Directa HVAC 24/7")}
                    </span>
                    <span className="block text-2xl sm:text-3xl font-display font-black leading-tight tracking-tight mt-0.5 text-white">
                      (713) 819-7908
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5 text-cyan-300" />
                </div>
              </a>
            </div>

            {/* Micro-trust glass dispatch badge */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3.5 text-xs text-slate-200 w-full justify-center shadow-lg">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="font-extrabold text-white">
                {t("Technicians active across Houston & Tomball Metro", "Técnicos activos en el metro de Houston y Tomball")}
              </span>
            </div>

            {/* Online Booking Button */}
            <a
              href="#get-in-touch"
              className="w-full text-center rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-black uppercase tracking-widest py-4 px-6 shadow-xl shadow-[#005CE6]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("Book Service Online", "Reservar Servicio en Línea")}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
