import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Wrench,
  Snowflake,
  Flame,
  Building2,
  Home,
  Activity,
  HeartHandshake,
  Compass,
  TrendingUp,
  Zap,
  Check,
  Phone,
  ChevronRight,
  Sun,
  Star
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import aboutTeamImg from "@/assets/service-residential-hvac.png";

export function About() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"company" | "vision" | "values">("company");

  // Advantages List
  const advantages = [
    {
      icon: Clock,
      title: t("24/7 Emergency Services", "Servicios de Emergencia 24/7"),
      desc: t("Round-the-clock rapid response when Texas heat or cold strikes unexpectedly.", "Respuesta rápida las 24 horas cuando el calor o frío azota inesperadamente."),
      badge: "24/7 Active"
    },
    {
      icon: CheckCircle2,
      title: t("Free Estimates", "Presupuestos Gratis"),
      desc: t("Upfront, transparent quotes with zero hidden fees before any work begins.", "Cotizaciones transparentes por adelantado sin cargos ocultos."),
      badge: "Transparent"
    },
    {
      icon: TrendingUp,
      title: t("Low Price Guarantee", "Garantía de Precio Bajo"),
      desc: t("Top-tier equipment and master craftsmanship delivered at fair, competitive rates.", "Equipos de primera calidad y mano de obra experta a tarifas competitivas."),
      badge: "Value Guaranteed"
    },
    {
      icon: ShieldCheck,
      title: t("Licensed & Insured Experts", "Expertos Licenciados y Asegurados"),
      desc: t("Certified TACLA133609C specialists trained on leading industry standards.", "Especialistas certificados TACLA133609C capacitados con los más altos estándares."),
      badge: "TACLA133609C"
    },
    {
      icon: Zap,
      title: t("Fast & Reliable Response Times", "Tiempos de Respuesta Rápida"),
      desc: t("Prompt arrival from local Tomball & Cypress technicians ready with full inventory.", "Llegada rápida de técnicos locales de Tomball y Cypress listos con inventario."),
      badge: "Same-Day"
    }
  ];

  // Upfront AC Choice HVAC Services
  const servicesList = [
    { icon: Activity, title: t("HVAC Repair", "Reparación HVAC"), desc: t("Diagnostic & fix for compressors, coils, leaks, and electrical faults.", "Diagnóstico y reparación de compresores, serpentines y fallas eléctricas.") },
    { icon: Wrench, title: t("HVAC Service", "Servicio HVAC"), desc: t("Comprehensive check-ups and system tuning for optimal airflow.", "Revisiones integrales y puesta a punto del sistema para un flujo de aire óptimo.") },
    { icon: Home, title: t("Attic Insulation", "Aislamiento de Ático"), desc: t("Blown-in radiant barrier insulation to minimize heat transfer.", "Aislamiento de barrera radiante para minimizar la transferencia de calor.") },
    { icon: Snowflake, title: t("HVAC Replacement", "Reemplazo HVAC"), desc: t("SEER2 high-efficiency unit upgrades and complete system installs.", "Actualizaciones de unidades de alta eficiencia SEER2 e instalaciones completas.") },
    { icon: Sparkles, title: t("Indoor Air Quality Upgrades", "Mejoras de Calidad de Aire"), desc: t("HEPA filtration and whole-home air purification setups.", "Filtración HEPA y purificación de aire para todo el hogar.") },
    { icon: Flame, title: t("Heating & Cooling Services", "Servicios de Calefacción y AC"), desc: t("Dual heat pump and gas furnace year-round temperature management.", "Gestión de temperatura todo el año con bombas de calor y hornos de gas.") },
    { icon: Compass, title: t("Indoor Air Quality Evaluations", "Evaluaciones de Calidad de Aire"), desc: t("Airborne particle, humidity, and allergen testing for healthier homes.", "Pruebas de partículas en aire, humedad y alérgenos para hogares más saludables.") },
    { icon: Sun, title: t("Ultraviolet Air Treatment System", "Tratamiento de Aire Ultravioleta"), desc: t("UV-C germicidal light installation eliminating airborne pathogens.", "Luz germicida UV-C para eliminar patógenos en el aire.") },
    { icon: HeartHandshake, title: t("Indoor Home Health Consultation", "Consulta de Salud del Hogar"), desc: t("Custom comfort assessment to align system performance with family needs.", "Evaluación de confort personalizada adaptada a la salud de su familia.") }
  ];

  // Quality Influence Pillars
  const qualityPillars = [
    { title: t("Quality Products", "Productos de Calidad"), desc: t("Only top-rated, Energy Star certified equipment built to withstand Texas heat.", "Solo equipos de primera calidad certificados por Energy Star para soportar el calor.") },
    { title: t("Quality Technicians", "Técnicos de Calidad"), desc: t("Rigorously vetted, background-checked, and continuous factory-trained specialists.", "Especialistas evaluados rigurosamente y con capacitación continua de fábrica.") },
    { title: t("Quality Installations", "Instalaciones de Calidad"), desc: t("Custom load calculations, precision duct sizing, and airtight sealing.", "Cálculos de carga personalizados, ductos a medida y sellado hermético.") },
    { title: t("Quality Service & Repairs", "Servicio y Reparaciones de Calidad"), desc: t("Long-lasting solutions backed by warranty — never temporary quick patches.", "Soluciones duraderas respaldadas por garantía — nunca parches temporales.") },
    { title: t("Quality Energy Evaluations", "Evaluaciones Energéticas de Calidad"), desc: t("In-depth home thermal inspections to cut monthly utility expenditure.", "Inspecciones térmicas profundas para reducir el gasto mensual en luz.") },
    { title: t("Commercial HVAC Repair", "Reparación HVAC Comercial"), desc: t("Heavy-duty rooftop package units and commercial building climate support.", "Unidades de techo pesadas y soporte de clima para edificios comerciales.") }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none">

      {/* ── SECTION 1: HERO & COMPANY HISTORY ────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>{t("Excellence Has Been Our Hallmark Since 2010", "La Excelencia ha Sido Nuestra Marca Desde 2010")}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <Check className="h-3 w-3 text-emerald-600" />
              <span>BBB Accredited A+</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Story Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
                {t("History of Our ", "Historia de Nuestra ")}
                <span className="bg-gradient-to-r from-[#005CE6] to-cyan-600 bg-clip-text text-transparent">
                  {t("Company", "Empresa")}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                {t(
                  "We have been a family-owned company since 2005. We are a BBB-accredited residential HVAC contractor located in TX. We specialize in the custom design and installation of quality comfort systems in New Construction Development and Residential Replacements.",
                  "Hemos sido una empresa familiar desde 2005. Somos un contratista de HVAC residencial acreditado por la BBB en TX. Nos especializamos en el diseño personalizado e instalación de sistemas de confort de calidad en Nuevas Construcciones y Reemplazos Residenciales."
                )}
              </p>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-lg shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#005CE6]" />
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic font-semibold pl-2">
                  "{t(
                    "Air Innovations and Upfront AC take pride in quality over quantity — we believe that ease of use, comfort, and health should take priority when recommending and designing your system. We have many options available to suit both budget and desire, as well as a qualified team of professionals to help you make the best decision for you personally. Not every homeowner is the same, why should every system be?",
                    "Air Innovations y Upfront AC se enorgullecen de la calidad sobre la cantidad — creemos que la facilidad de uso, la comodidad y la salud deben ser prioridad al recomendar y diseñar su sistema. No todos los propietarios son iguales, ¿por qué debería serlo cada sistema?"
                  )}"
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                    — {t("Our Motto: Your Comfort Matters", "Nuestro Lema: Su Confort Importa")}
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {t("Our experts are ready to help today!", "¡Nuestros expertos están listos para ayudar hoy!")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Media Grid Spotlight */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/80 group">
                <img
                  src={aboutTeamImg}
                  alt="Upfront AC HVAC Specialists Team"
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Floating Glass Stats Bar */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl grid grid-cols-2 gap-3 text-center">
                  <div className="border-r border-slate-200 pr-2">
                    <span className="block text-2xl font-black text-slate-900">2005+</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#005CE6]">{t("Family Owned", "Empresa Familiar")}</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-slate-900">100%</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#005CE6]">{t("Custom Systems", "Diseños a Medida")}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: OUR ADVANTAGES ────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-[#005CE6] mb-3">
              <Zap className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>{t("Why Choose Upfront AC", "Por Qué Elegir Upfront AC")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t("Our Advantages", "Nuestras Ventajas")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-medium">
              {t(
                "Upfront AC Choice HVAC is your single source for a complete range of high-quality services, including design/build, engineering, construction, start-up, commissioning, operation, and maintenance.",
                "Upfront AC Choice HVAC es su fuente única para una gama completa de servicios de alta calidad, que incluyen diseño/construcción, ingeniería, construcción, puesta en marcha, operación y mantenimiento."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between hover:border-[#005CE6]/60 transition-all duration-300 shadow-md hover:shadow-xl shadow-slate-200/50 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 border border-[#005CE6]/20 flex items-center justify-center text-[#005CE6] group-hover:bg-[#005CE6] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        {adv.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-[#005CE6] transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-[#005CE6] group-hover:translate-x-1 transition-transform">
                    <span>{t("Verified Advantage", "Ventaja Verificada")}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: SERVICES CATALOG ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-[#005CE6] mb-3">
              <Wrench className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>{t("Full-Spectrum HVAC Capabilities", "Capacidades HVAC Integrales")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t("Upfront AC Choice HVAC Services", "Servicios Upfront AC Choice HVAC")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-medium">
              {t(
                "No matter what type of system or setup you have in your home, you can count on the team to provide you with the services you need and deserve. Our technicians have the skills and knowledge to repair and maintain any type of heating or cooling system.",
                "No importa qué tipo de sistema o configuración tenga en su hogar, puede contar con nuestro equipo para brindarle los servicios que necesita y merece. Nuestros técnicos tienen las habilidades y conocimientos para reparar y mantener cualquier sistema."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-5 hover:bg-white hover:border-[#005CE6]/40 transition-all duration-300 flex items-start gap-4 shadow-sm hover:shadow-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] flex items-center justify-center shrink-0 group-hover:bg-[#005CE6] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#005CE6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: COMPANY VALUES & VISION TABS ─────────── */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              {t("Our Foundation", "Nuestra Base")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              {t("Company Values & Vision", "Valores y Visión de la Empresa")}
            </h2>
          </div>

          {/* Tab Switcher Buttons */}
          <div className="flex justify-center mb-10">
            <div className="p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-2 max-w-md w-full">
              {[
                { id: "company", label: t("Our Company", "Nuestra Empresa") },
                { id: "vision", label: t("Company Vision", "Nuestra Visión") },
                { id: "values", label: t("Our Values", "Nuestros Valores") },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#005CE6] text-white shadow-md shadow-[#005CE6]/30"
                      : "text-slate-600 hover:text-[#005CE6] hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Panel */}
          <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "company" && (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-[#005CE6] font-extrabold text-sm uppercase tracking-wider">
                    <Building2 className="w-5 h-5" />
                    <span>{t("Built on Local Trust", "Construido sobre Confianza Local")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t("A Premier Texas HVAC Contractor", "Un Contratista HVAC de Primera en Texas")}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {t(
                      "Upfront AC was established with one core mission: to provide home and business owners across Tomball, Cypress, and the Greater Houston area with honest, reliable, and high-efficiency heating and air conditioning solutions. We take zero shortcuts on quality.",
                      "Upfront AC se estableció con una misión principal: ofrecer a los propietarios de viviendas y empresas de Tomball, Cypress y el área metropolitana de Houston soluciones de calefacción y aire acondicionado honestas, confiables y de alta eficiencia."
                    )}
                  </p>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-[#005CE6] font-extrabold text-sm uppercase tracking-wider">
                    <Compass className="w-5 h-5" />
                    <span>{t("Long-Term Excellence", "Excelencia a Largo Plazo")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t("Our Company Vision", "Nuestra Visión de Empresa")}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {t(
                      "Our vision is to continue innovating indoor climate design, air purification, and energy efficiency. We strive to empower every homeowner with sustainable, cost-effective, and whisper-quiet HVAC systems engineered specifically for Texas summer heat and winter freezes.",
                      "Nuestra visión es continuar innovando en diseño de clima interior, purificación de aire y eficiencia energética. Nos esforzamos por capacitar a cada propietario con sistemas HVAC sostenibles y silenciosos."
                    )}
                  </p>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-[#005CE6] font-extrabold text-sm uppercase tracking-wider">
                    <HeartHandshake className="w-5 h-5" />
                    <span>{t("Uncompromised Integrity", "Integridad Sin Concesiones")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t("Our Core Values", "Nuestros Valores Fundamentales")}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {t(
                      "Quality over quantity, absolute price transparency, safety compliance, and family-first care guide every single service call. We treat your property with the utmost respect and care.",
                      "Calidad sobre cantidad, transparencia de precios absoluta, cumplimiento de seguridad y atención centrada en la familia guían cada llamada de servicio."
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Long-Term Relationship Banner */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-[#005CE6]/5 -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-6 sm:p-8 border-b-0 rounded-b-3xl">
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-extrabold">
                "{t(
                  "We hope to continue our relationship long after your new equipment is installed. Our ongoing services are designed to keep your unit operating at peak efficiency without disruptive breakdowns.",
                  "Esperamos continuar nuestra relación mucho después de que se instale su nuevo equipo. Nuestros servicios continuos están diseñados para mantener su unidad operando con la máxima eficiencia sin averías."
                )}"
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: WHY CHOOSE QUALITY? ──────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">

          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              {t("Uncompromising Standards", "Estándares Innegociables")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              {t("Why Choose Quality?", "¿Por Qué Elegir Calidad?")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed font-medium">
              {t(
                "Our name says it all. We’re committed to quality in everything we do. The quality of our work lies in our craftsmanship and experience. Our technicians are specialists who take pride in the work they do. We’re not satisfied until our customers are satisfied.",
                "Nuestro nombre lo dice todo. Estamos comprometidos con la calidad en todo lo que hacemos. La calidad de nuestro trabajo radica en nuestra artesanía y experiencia. Nuestros técnicos son especialistas que se enorgullecen de lo que hacen."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityPillars.map((pil, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6 hover:border-[#005CE6]/40 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4 group-hover:bg-[#005CE6] group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#005CE6] transition-colors">
                  {pil.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: MAINTENANCE & CONTACT EMERGENCY CTA ── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-red-400">
              <PhoneCall className="h-3.5 w-3.5 text-red-400 animate-pulse" />
              <span>{t("Do You Need Help with Maintenance?", "¿Necesita Ayuda con el Mantenimiento?")}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t("Air Conditioning & Heating Maintenance", "Mantenimiento de Aire Acondicionado y Calefacción")}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              {t(
                "Contact us — our technicians are ready to help you solve that issue immediately with 24/7 rapid dispatch across Tomball, Cypress, and Greater Houston.",
                "Contáctenos — nuestros técnicos están listos para ayudarle a resolver ese problema de inmediato con despacho rápido las 24 horas."
              )}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+17138197908"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/40 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>{t("Call Us: +1 (713) 819-7908", "Llámenos: +1 (713) 819-7908")}</span>
              </a>

              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-7 py-4 text-sm transition-all"
              >
                <span>{t("Contact Us Online", "Contáctenos en Línea")}</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
