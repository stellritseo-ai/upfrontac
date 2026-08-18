import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, CheckCircle2, Phone, ShieldCheck, Clock, Award,
  FileText, Send, DollarSign, GraduationCap, Calendar, ShieldAlert, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { addWebEmail } from "@/lib/leads-store";

export function Careers() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [job, setJob] = useState("");
  const [exp, setExp] = useState("");
  const [license, setLicense] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const form = e.currentTarget;
    const name = (form.querySelector("#app-name") as HTMLInputElement)?.value || "";
    const phone = (form.querySelector("#app-phone") as HTMLInputElement)?.value || "";
    const email = (form.querySelector("#app-email") as HTMLInputElement)?.value || "";
    const msg = (form.querySelector("#app-msg") as HTMLTextAreaElement)?.value || "";

    try {
      // 1. Save to MongoDB database
      await addWebEmail({
        name,
        phone,
        email,
        service: `Job Application: ${job || "General Application"}`,
        message: `License: ${license}\nExperience: ${exp}\n\nSummary:\n${msg}`,
        source: "Careers Form"
      });

      // 2. Email backup (background notification)
      fetch("https://formsubmit.co/ajax/allen@upfrontac.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: name,
          Phone: phone,
          Email: email,
          "Position of Interest": job || "General Application",
          "Years of Experience": exp || "Not Specified",
          "License Status": license || "Not Specified",
          Message: msg
        })
      }).catch((err) => console.log("Background email alert:", err));

      toast.success(t("Application received! We'll review your details and contact you soon.", "¡Solicitud recibida! Revisaremos sus datos y nos pondremos en contacto pronto."));
      form.reset();
      setJob("");
      setExp("");
      setLicense("");
    } catch (err) {
      toast.error(t("Connection error. Please try again.", "Error de conexión. Por favor, inténtelo de nuevo."));
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: t("Competitive Weekly Pay", "Pago Semanal Competitivo"),
      desc: t("Top-tier hourly rates or salary depending on license class and field experience.", "Tarifas por hora o salario de primer nivel según la clase de licencia y experiencia en el campo.")
    },
    {
      icon: ShieldCheck,
      title: t("Premium Health Benefits", "Beneficios de Salud Premium"),
      desc: t("Comprehensive medical, dental, and vision insurance options for you and your family.", "Opciones integrales de seguro médico, dental y de la vista para usted y su familia.")
    },
    {
      icon: Calendar,
      title: t("Paid Time Off & Holidays", "Tiempo Libre y Vacaciones Pagadas"),
      desc: t("Accrue PTO from day one. Enjoy paid national holidays and flexible time-off policies.", "Acumule tiempo libre pagado desde el primer día. Disfrute de días feriados nacionales pagados y políticas flexibles.")
    },
    {
      icon: GraduationCap,
      title: t("Paid Training & NEC Support", "Formación Pagada y Soporte NEC"),
      desc: t("We pay for safety certifications, continuing education, and electrical licensing exam preps.", "Pagamos por certificaciones de seguridad, educación continua y preparación para exámenes de licencia eléctrica.")
    },
    {
      icon: Clock,
      title: t("401(k) Retirement Match", "Aporte Equivalente al 401(k)"),
      desc: t("Secure your financial future with our company-sponsored matching retirement plan.", "Asegure su futuro financiero con nuestro plan de jubilación patrocinado por la empresa con aporte equivalente.")
    },
    {
      icon: Award,
      title: t("Modern Vans & Fuel Cards", "Camionetas Modernas y Tarjetas de Combustible"),
      desc: t("Take-home fully equipped response vans with top-quality Milwaukee/Klein tools and company iPads.", "Camionetas de respuesta totalmente equipadas para llevar a casa con herramientas Milwaukee/Klein e iPads.")
    }
  ];

  const jobs = [
    {
      title: t("Lead Master Electrician", "Electricista Maestro Líder"),
      type: t("Full-Time / Commercial & Industrial", "Tiempo Completo / Comercial e Industrial"),
      experience: t("7+ Years", "Más de 7 Años"),
      desc: t("Overseeing commercial projects, scheduling safety inspections, reading blueprints, managing site crews, and wiring advanced 3-phase systems.", "Supervisión de proyectos comerciales, programación de inspecciones de seguridad, lectura de planos, gestión de equipos en el sitio y cableado de sistemas trifásicos avanzados."),
      reqs: [
        t("Active Florida Master Electrician License (or Journeyman equivalent state license)", "Licencia activa de electricista maestro de Florida (o equivalente estatal)"),
        t("Clean driving record & background check", "Historial de conducción limpio y verificación de antecedentes"),
        t("Proven leadership experience supervising 3+ apprentices", "Experiencia de liderazgo demostrada supervisando a más de 3 aprendices")
      ]
    },
    {
      title: t("Commercial Journeyman Electrician", "Electricista Jornalero Comercial"),
      type: t("Full-Time / Commercial", "Tiempo Completo / Comercial"),
      experience: t("4+ Years", "Más de 4 Años"),
      desc: t("Installing conduits, routing circuits, pulling wires, fitting panels, and executing tenant improvements and retail build-outs safely and efficiently.", "Instalación de conductos, enrutamiento de circuitos, tracción de cables, montaje de paneles y ejecución de mejoras de inquilinos y remodelaciones comerciales de manera segura.")
      ,
      reqs: [
        t("Journeyman license or card preferred", "Se prefiere licencia o tarjeta de electricista"),
        t("Strong proficiency in bending conduit (EMT/Rigid)", "Gran habilidad en doblado de conductos (EMT/Rígido)"),
        t("Ability to work from commercial schematics and wiring drawings", "Capacidad para trabajar con esquemas comerciales y planos de cableado")
      ]
    },
    {
      title: t("Residential Service Electrician", "Electricista de Servicio Residencial"),
      type: t("Full-Time / Residential", "Tiempo Completo / Residencial"),
      experience: t("3+ Years", "Más de 3 Años"),
      desc: t("Diagnosing home electrical faults, conducting panel upgrades, installing smart lighting systems, vehicle chargers, and delivering top-tier customer care.", "Diagnóstico de fallas eléctricas en el hogar, actualizaciones de paneles, instalación de iluminación inteligente, cargadores de vehículos y atención al cliente de primer nivel."),
      reqs: [
        t("Strong diagnostics and residential panel troubleshooting skills", "Sólidas habilidades de diagnóstico y solución de problemas de paneles residenciales"),
        t("Excellent client communication and presentation skills", "Excelentes habilidades de comunicación y presentación con el cliente"),
        t("Familiarity with residential NEC compliance standards", "Familiaridad con los estándares de cumplimiento NEC residenciales")
      ]
    },
    {
      title: t("Electrical Helper / Apprentice", "Ayudante / Aprendiz de Electricista"),
      type: t("Full-Time / Hybrid", "Tiempo Completo / Híbrido"),
      experience: t("0-2 Years", "0 a 2 Años"),
      desc: t("Supporting lead technicians on residential, commercial, and solar jobs. Learn tool handling, safety protocols, and NEC standards on-the-job.", "Apoyo a técnicos líderes en trabajos residenciales, comerciales y solares. Aprenda el manejo de herramientas, protocolos de seguridad y normas NEC en el trabajo."),
      reqs: [
        t("Enrolled or interested in an accredited electrical apprenticeship program", "Inscrito o interesado en un programa acreditado de aprendizaje eléctrico"),
        t("High reliability, strong physical endurance, and eagerness to learn", "Alta confiabilidad, fuerte resistencia física y entusiasmo por aprender"),
        t("Basic hand tools and clean background check", "Herramientas manuales básicas y verificación de antecedentes limpia")
      ]
    }
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Culture Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            {t("Join R&E Team", "Únase al Equipo de R&E")}
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
            {t("Build a Career, Not Just a Job", "Construya una Carrera, No Solo un Trabajo")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("We are looking for licensed master electricians, journeymen, and eager apprentices. Power your future with competitive pay, outstanding benefits, and a team that respects your craftsmanship.", "Buscamos electricistas maestros autorizados, jornaleros y aprendices entusiastas. Impulse su futuro con un pago competitivo, excelentes beneficios y un equipo que respeta su oficio.")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <h3 className="text-center font-display text-2xl font-extrabold text-secondary mb-10">
            {t("Why Electricians Choose R&E", "Por Qué los Electricistas Eligen R&E")}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-secondary text-base leading-tight">{b.title}</h4>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Two Column Section: Jobs & Application Form */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Job Roles (Accordion list) */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="font-display text-2xl font-extrabold text-secondary mb-2 text-left">
              {t("Active Openings", "Puestos Activos")}
            </h3>
            <p className="text-sm text-muted-foreground text-left mb-6 font-medium">
              {t("Click on a position below to view details and requirements. Then apply using the form.", "Haga clic en un puesto a continuación para ver detalles y requisitos. Luego postule usando el formulario.")}
            </p>

            <div className="space-y-4 text-left">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
                    activeJob === idx
                      ? "border-primary/30 shadow-md ring-1 ring-primary/10"
                      : "border-border hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setActiveJob(activeJob === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <div>
                      <h4 className="font-display text-base sm:text-lg font-extrabold text-secondary leading-snug">
                        {job.title}
                      </h4>
                      <p className="text-xs text-primary font-bold mt-1 tracking-wider uppercase">
                        {job.type} • {job.experience} {t("Exp", "Exp")}
                      </p>
                    </div>
                    <span className={`text-2xl transition-transform duration-300 font-light text-slate-400 select-none ${activeJob === idx ? "rotate-45 text-primary" : ""}`}>
                      +
                    </span>
                  </button>

                  {activeJob === idx && (
                    <div className="p-5 border-t border-border bg-slate-50/50 animate-zoom-in space-y-4">
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">{t("Role Overview", "Resumen del Rol")}</h5>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{job.desc}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">{t("Key Requirements", "Requisitos Clave")}</h5>
                        <ul className="space-y-2">
                          {job.reqs.map((req, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              <CheckCircle2 className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-2xl font-extrabold text-secondary mb-6 text-left">
              {t("Apply Today", "Postularse Hoy")}
            </h3>
            
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-card)] text-left space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="app-name" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Full Name", "Nombre Completo")}
                  </Label>
                  <Input id="app-name" required placeholder={t("Jane Smith", "Juan Pérez")} className="mt-1.5" />
                </div>

                <div>
                  <Label htmlFor="app-phone" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Phone Number", "Número de Teléfono")}
                  </Label>
                  <Input id="app-phone" type="tel" required placeholder="(713) 819-7908" className="mt-1.5" />
                </div>

                <div>
                  <Label htmlFor="app-email" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Email Address", "Correo Electrónico")}
                  </Label>
                  <Input id="app-email" type="email" required placeholder="jane@example.com" className="mt-1.5" />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="app-job" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Position of Interest", "Puesto de Interés")}
                  </Label>
                  <Select required value={job} onValueChange={setJob}>
                    <SelectTrigger id="app-job" className="h-11 mt-1.5">
                      <SelectValue placeholder={t("Select a position", "Seleccione un puesto")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="master">{t("Lead Master Electrician", "Electricista Maestro Líder")}</SelectItem>
                      <SelectItem value="journeyman">{t("Commercial Journeyman Electrician", "Electricista Jornalero Comercial")}</SelectItem>
                      <SelectItem value="residential">{t("Residential Service Electrician", "Electricista de Servicio Residencial")}</SelectItem>
                      <SelectItem value="apprentice">{t("Electrical Helper / Apprentice", "Ayudante / Aprendiz de Electricista")}</SelectItem>
                      <SelectItem value="other">{t("Other / Office Roles", "Otro / Puestos de Oficina")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="app-exp" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Years of Experience", "Años de Experiencia")}
                  </Label>
                  <Select required value={exp} onValueChange={setExp}>
                    <SelectTrigger id="app-exp" className="h-11 mt-1.5">
                      <SelectValue placeholder={t("Select experience", "Seleccione experiencia")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 {t("Year", "Año")}</SelectItem>
                      <SelectItem value="2-4">2-4 {t("Years", "Años")}</SelectItem>
                      <SelectItem value="5-8">5-8 {t("Years", "Años")}</SelectItem>
                      <SelectItem value="9+">9+ {t("Years", "Años")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="app-license" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Electrical License Status", "Estado de Licencia Eléctrica")}
                  </Label>
                  <Select required value={license} onValueChange={setLicense}>
                    <SelectTrigger id="app-license" className="h-11 mt-1.5">
                      <SelectValue placeholder={t("Select license", "Seleccione licencia")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="master">{t("State Licensed Master", "Maestro con Licencia Estatal")}</SelectItem>
                      <SelectItem value="journeyman">{t("Licensed Journeyman", "Jornalero con Licencia")}</SelectItem>
                      <SelectItem value="registered">{t("Registered Apprentice", "Aprendiz Registrado")}</SelectItem>
                      <SelectItem value="none">{t("No License / Helper", "Sin Licencia / Ayudante")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="app-msg" className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {t("Brief Experience Summary & Bio", "Breve Resumen de Experiencia y Biografía")}
                  </Label>
                  <Textarea
                    id="app-msg"
                    rows={4}
                    placeholder={t("Briefly tell us about your experience, past employers, or tools you master...", "Cuéntenos brevemente sobre su experiencia, empleadores anteriores o herramientas que domina...")}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full">
                {submitting ? t("Submitting Application...", "Enviando Solicitud...") : (
                  <>
                    {t("Submit Job Application", "Enviar Solicitud de Empleo")}
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
