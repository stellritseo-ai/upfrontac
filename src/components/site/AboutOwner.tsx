import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Wrench,
  Users,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Flame,
  Zap,
  GraduationCap,
  Heart,
  Anchor,
  Check,
  Quote,
  TrendingUp,
  MapPin,
  Calendar,
  Compass
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import ownerFamilyImg from "@/assets/allen-swindell-family.png";

export function AboutOwner() {
  const { t } = useLanguage();

  const stats = [
    { value: "55", label: t("Years of Integrity", "Años de Integridad"), desc: t("Leading with honest principles", "Liderando con principios honestos") },
    { value: "10+", label: t("Years in HVAC", "Años en HVAC"), desc: t("Industrial Oil & Gas background", "Experiencia en Petróleo y Gas") },
    { value: "85%", label: t("Self-Taught Master", "Maestro Autodidacta"), desc: t("Mastered from within", "Dominado desde adentro") },
    { value: "5 Yrs", label: t("Apprentice Mentor", "Mentor de Aprendices"), desc: t("Hands-on 2019–2024 mentorship", "Tutoría práctica 2019–2024") }
  ];

  const storyChapters = [
    {
      num: "01",
      icon: Anchor,
      tag: t("Oilfield Grit & Self-Taught Trade", "Carácter Petrolero y Oficio Autodidacta"),
      title: t("Forged in High-Pressure Environments", "Forjado en Entornos de Alta Presión"),
      body: t(
        "With over a decade in HVAC and a background in the high-pressure Oil and Gas industry, Allen Swindell brings a no-compromise approach to quality, safety, and service. Though HVAC was a trade passed down to him, Allen is 85% self-taught — learning the hard way, the honest way, and the right way. The companies he worked for gave him space to learn, but the drive to master the craft came from within.",
        "Con más de una década en HVAC y experiencia en la industria de Petróleo y Gas de alta presión, Allen Swindell aporta un enfoque sin concesiones a la calidad, la seguridad y el servicio. Aunque el HVAC fue un oficio transmitido por su familia, Allen es 85% autodidacta — aprendiendo de la manera honesta, difícil y correcta. Las empresas para las que trabajó le dieron espacio para aprender, pero el impulso para dominar el oficio vino de su interior."
      )
    },
    {
      num: "02",
      icon: ShieldCheck,
      tag: t("Integrity & Education at 55", "Integridad y Educación a los 55 Años"),
      title: t("Doing Things Right the First Time", "Hacer las Cosas Bien a la Primera"),
      body: t(
        "At 55 years old, Allen now leads Upfront AC with the kind of integrity you can feel from the first phone call to the final handshake. He believes in doing things right the first time, double-checking everything, and treating each home like it’s his own. He’s not just out to fix a unit — he’s out to educate, protect, and earn your trust.",
        "A sus 55 años, Allen dirige Upfront AC con una integridad que se siente desde la primera llamada hasta el apretón de manos final. Cree en hacer las cosas bien a la primera, revisando todo y tratando cada hogar como si fuera el suyo. No solo está aquí para reparar una unidad — está aquí para educar, proteger y ganarse su confianza."
      )
    },
    {
      num: "03",
      icon: GraduationCap,
      tag: t("Hands-On Mentorship (2019–2024)", "Tutoría Práctica (2019–2024)"),
      tagColor: "bg-[#005CE6]/10 text-[#005CE6] border-[#005CE6]/20",
      title: t("Passing the Skillset Down", "Transmitiendo el Oficio a Nuevas Generaciones"),
      body: t(
        "He’s also a hands-on mentor. From 2019 to 2024, Allen passed on his entire skillset to a young apprentice — not because he had to, but because he believes knowledge should be shared. His team is trained the way he wishes he had been: with real-life experience, high standards, and full accountability.",
        "También es un mentor práctico. De 2019 a 2024, Allen transmitió todo su conjunto de habilidades a un joven aprendiz — no porque tuviera que hacerlo, sino porque cree que el conocimiento debe compartirse. Su equipo está capacitado de la manera que él desearía haber sido capacitado: con experiencia de la vida real, altos estándares y total responsabilidad."
      )
    },
    {
      num: "04",
      icon: Heart,
      tag: t("Family & Community Mission", "Misión Familiar y Comunitaria"),
      title: t("A Family Legacy for Son (17) & Daughter (13)", "Un Legado Familiar para sus Hijos"),
      body: t(
        "But above all, Allen does this for his family and community. His mission is to provide a living wage for his employees, honest service for his customers, and eventually pass this business down to his 17-year-old son and 13-year-old daughter. Every system he installs, every call he takes — it’s all part of building something that lasts.",
        "Pero sobre todo, Allen hace esto por su familia y su comunidad. Su misión es proporcionar un salario digno a sus empleados, un servicio honesto a sus clientes y, eventualmente, heredar este negocio a su hijo de 17 años y a su hija de 13 años. Cada sistema que instala, cada llamada que atiende — todo forma parte de construir algo duradero."
      )
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">

      {/* ── HERO SPOTLIGHT SECTION ───────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">

          {/* Top Pill Badges */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>{t("Allen Swindell • Founder & Lead HVAC Pro", "Allen Swindell • Fundador y Técnico Principal HVAC")}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Headline & Main Lead Intro */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                {t("Self-Made HVAC Pro with ", "Técnico HVAC Autodidacta con ")}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t("Oilfield Grit", "Carácter Petrolero")}
                </span>
                {t(" & a Heart for Service", " y Pasión por Servir")}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                {t(
                  "With over a decade in HVAC and a background in the high-pressure Oil and Gas industry, Allen Swindell brings a no-compromise approach to quality, safety, and service. Though HVAC was a trade passed down to him, Allen is 85% self-taught — learning the hard way, the honest way, and the right way.",
                  "Con más de una década en HVAC y experiencia en la industria de Petróleo y Gas de alta presión, Allen Swindell aporta un enfoque sin concesiones a la calidad, la seguridad y el servicio."
                )}
              </p>

              {/* High-Impact Quote Callout Card */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#005CE6]" />
                <div className="flex items-start gap-3">
                  <Quote className="h-6 w-6 text-[#005CE6] shrink-0 opacity-40 mt-1" />
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed italic font-bold">
                      "{t(
                        "At 55 years old, Allen now leads Upfront AC with the kind of integrity you can feel from the first phone call to the final handshake. He believes in doing things right the first time, double-checking everything, and treating each home like it’s his own.",
                        "A sus 55 años, Allen dirige Upfront AC con una integridad que se siente desde la primera llamada hasta el apretón de manos final. Cree en hacer las cosas bien a la primera, revisando todo y tratando cada hogar como si fuera el suyo."
                      )}"
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/80 text-xs">
                      <span className="font-black uppercase tracking-widest text-[#005CE6]">
                        — Allen Swindell, Owner
                      </span>
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        {t("Educate, Protect & Earn Trust", "Educar, Proteger y Ganar Confianza")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Dedicated Family Photo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl shadow-slate-300/70 group bg-slate-900">
                <img
                  src={ownerFamilyImg}
                  alt="Allen Swindell, wife, son, and daughter"
                  className="w-full h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-[#005CE6] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md border border-white/20">
                    Upfront AC Family
                  </span>
                </div>

                {/* Bottom Glass Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-2xl text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-black text-slate-900 leading-tight">Allen Swindell & Family</h2>
                      <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                        {t("Building a Sustainable Legacy in Motion", "Construyendo un Legado Sostenible en Marcha")}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 fill-[#005CE6]" />
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-[#005CE6]" />
                      Tomball & Cypress, TX
                    </span>
                    <span className="text-emerald-700 font-black">100% Family Owned</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

          {/* 4 Stat Counter Badges Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-slate-50 border border-slate-200/90 p-6 text-left shadow-sm">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3.5 border-r last:border-r-0 border-slate-200 pr-4">
                <div className="text-3xl font-black text-[#005CE6] tracking-tight shrink-0">
                  {s.value}
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-slate-900 leading-tight">{s.label}</span>
                  <span className="text-[11px] text-slate-500 font-semibold line-clamp-1 mt-0.5">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 2: DETAILED STORY CHAPTERS ──────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">

          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              {t("The Journey & Commitment", "La Trayectoria y el Compromiso")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              {t("Real-Life Experience & High Standards", "Experiencia Real y Altos Estándares")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-medium">
              {t(
                "Learn how Allen's background in industrial oil and gas shaped the technical standards, apprentice training, and customer-first care at Upfront AC.",
                "Descubra cómo la experiencia de Allen en la industria petrolera moldeó los estándares técnicos y la atención de Upfront AC."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {storyChapters.map((chap, idx) => {
              const Icon = chap.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] flex items-center justify-center group-hover:bg-[#005CE6] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                        Chapter {chap.num}
                      </span>
                    </div>

                    <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                      {chap.tag}
                    </span>

                    <h3 className="text-xl font-extrabold text-slate-900 mt-1 mb-3 group-hover:text-[#005CE6] transition-colors">
                      {chap.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {chap.body}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{t("Verified Standard", "Estándar Verificado")}</span>
                    <span className="text-[#005CE6] font-black">Upfront AC Quality</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Core Banner Spotlight Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#005CE6] via-blue-600 to-[#0047B3] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
                {t("Upfront AC Core Motto", "Lema Principal de Upfront AC")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                "{t("Upfront AC isn’t just a business — it’s a legacy in motion.", "Upfront AC no es solo un negocio — es un legado en marcha.")}"
              </h3>
            </div>

            <a
              href="tel:+17138197908"
              className="shrink-0 inline-flex items-center gap-3 rounded-full bg-white text-[#005CE6] hover:bg-slate-100 font-extrabold px-8 py-4 text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-5 h-5 text-[#005CE6]" />
              <span>{t("Talk to Allen & Team", "Hablar con Allen y el Equipo")}</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 3: DIRECT CONTACT CTA ───────────────────── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" />
              <span>{t("Direct Contact with Upfront AC", "Contacto Directo con Upfront AC")}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t("Need Honest, Experienced HVAC Service?", "¿Necesita Servicio HVAC Honesto y Experimentado?")}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              {t(
                "Call Allen and the Upfront AC team today for 24/7 emergency response, custom replacement quotes, or preventative maintenance across Tomball, Cypress, and Greater Houston.",
                "Llame a Allen y al equipo de Upfront AC hoy mismo para respuesta de emergencia las 24 horas, presupuestos personalizados o mantenimiento preventivo."
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
                <span>{t("Get Free Estimate Online", "Obtener Presupuesto Gratis en Línea")}</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
