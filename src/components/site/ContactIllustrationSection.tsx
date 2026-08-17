import { motion } from "framer-motion";
import { ThermometerSun, Wind, Volume2, TrendingUp, AlertTriangle, ShieldAlert, PhoneCall, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hvacwelcome.mp4";
import { useLanguage } from "@/hooks/useLanguage";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function ContactIllustrationSection() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();

  const warningSigns = [
    {
      icon: ThermometerSun,
      title: t("AC blowing warm air", "AC soplando aire caliente"),
      desc: t(
        "In extreme Houston heat — usually low refrigerant, dirty coils or compressor strain.",
        "En el calor extremo de Houston: generalmente refrigerante bajo, bobinas sucias o fatiga del compresor."
      ),
      badge: t("Refrigerant / Coil", "Refrigerante / Bobina"),
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      icon: Wind,
      title: t("Weak or uneven airflow", "Flujo de aire débil o desigual"),
      desc: t(
        "Some rooms cool, others stay hot — points to ductwork or blower issues.",
        "Algunas habitaciones se enfrían, otras permanecen calientes: indica problemas en conductos o soplador."
      ),
      badge: t("Duct & Blower", "Conductos y Soplador"),
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    {
      icon: Volume2,
      title: t("Unusual noises", "Ruidos inusuales"),
      desc: t(
        "Grinding, buzzing or rattling from your HVAC system signals worn components.",
        "Ruidos de chirrido, zumbido o traqueteo indican componentes desgastados."
      ),
      badge: t("Mechanical Wear", "Desgaste Mecánico"),
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    },
    {
      icon: TrendingUp,
      title: t("Sudden energy bill spike", "Aumento repentino en la factura"),
      desc: t(
        "Inefficient operation drives up electricity use — diagnose before it gets worse.",
        "La operación ineficiente aumenta el consumo de electricidad; diagnostique antes de empeorar."
      ),
      badge: t("Efficiency Loss", "Pérdida de Eficiencia"),
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    },
    {
      icon: AlertTriangle,
      title: t("Frequent short cycling", "Encendido y apagado frecuente"),
      desc: t(
        "System turning on and off frequently means electrical or sensor problems.",
        "El sistema que se enciende y apaga con frecuencia indica problemas eléctricos o de sensores."
      ),
      badge: t("Electrical / Sensor", "Eléctrico / Sensores"),
      iconColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    },
    {
      icon: ShieldAlert,
      title: t("Sudden system failure", "Falla repentina del sistema"),
      desc: t(
        "Total breakdowns in summer heat — we prioritize emergency dispatch.",
        "Averías totales en el calor de verano: priorizamos el despacho de emergencia."
      ),
      badge: t("24/7 Priority", "Prioridad 24/7"),
      iconColor: "text-[#005CE6] bg-[#005CE6]/15 border-[#005CE6]/40",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-y border-white/10 select-none">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden translate-z-0">
        <AutoPlayVideo
          src={heroVideo}
          className="h-full w-full object-cover opacity-85 scale-105 pointer-events-none"
        />
        {/* Soft Dark Overlay for High Video Visibility & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/70" />

        {/* Glow Spheres for Dynamic Ambient Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#005CE6]/30 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/25 rounded-full blur-[130px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/20 border border-[#005CE6]/40 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-cyan-300 shadow-md backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t("When to call Upfront AC", "Cuándo llamar a Upfront AC")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white"
          >
            {t("Signs your AC needs ", "Señales de que su AC necesita ")}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t("repair in Tomball, TX", "reparación en Tomball, TX")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-medium max-w-2xl mx-auto"
          >
            {t(
              "If you notice any of these warning signs, call Upfront AC for fast, same-day diagnostics across the Houston metro.",
              "Si nota cualquiera de estas señales de advertencia, llame a Upfront AC para diagnósticos rápidos el mismo día en todo el metro de Houston."
            )}
          </motion.p>
        </div>

        {/* 6 Warning Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warningSigns.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-7 flex flex-col justify-between hover:bg-white/15 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_15px_45px_rgba(0,92,230,0.25)] text-left"
              >
                <div>
                  {/* Top Bar: Icon & Category Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-200 transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Callout Accent */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {t("Need Inspection?", "¿Necesita Inspección?")}
                  </span>
                  <a
                    href={`tel:${phoneTel}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-300 hover:text-white transition-colors"
                  >
                    <span>{settings.officePhone || "(713) 819-7908"}</span>
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,92,230,0.35)]"
        >
          <div className="text-center sm:text-left space-y-2">
            <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t("Recognize any of these HVAC symptoms?", "¿Reconoce alguno de estos síntomas de HVAC?")}
            </h4>
            <p className="text-xs sm:text-sm text-cyan-100 font-medium max-w-xl mx-auto sm:mx-0">
              {t("Don't let minor issues turn into costly replacements. Get fast, honest repairs today.", "No permita que problemas menores se conviertan en reemplazos costosos.")}
            </p>
          </div>

          <Button asChild size="lg" className="w-full sm:w-auto rounded-full font-black px-8 py-6 bg-white hover:bg-slate-100 text-[#005CE6] shadow-xl hover:scale-[1.03] transition-all duration-300 shrink-0 text-sm uppercase tracking-wider">
            <Link to="/request-free-estimate" className="flex items-center justify-center gap-2">
              <span>{t("Schedule Diagnostics", "Programar Diagnóstico")}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
