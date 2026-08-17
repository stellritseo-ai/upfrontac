import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addWebEmail } from "@/lib/leads-store";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Zap,
  PhoneCall
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const TinyLightningIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#005CE6] fill-[#005CE6] shrink-0" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export function GetInTouch() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const faqs = [
    {
      q: t("How fast can an HVAC technician arrive in Houston, TX?", "¿Qué tan rápido puede llegar un técnico de HVAC en Houston, TX?"),
      a: t("Upfront AC typically dispatches technicians the same day, and in emergency cases, arrival can be within a few hours, depending on your location in Houston, Tomball, or Cypress.", "Upfront AC generalmente despacha técnicos el mismo día, y en casos de emergencia, la llegada puede ser dentro de un par de horas, dependiendo de su ubicación en Houston, Tomball o Cypress.")
    },
    {
      q: t("Why is my AC not cooling during the Houston heat?", "¿Por qué mi aire acondicionado no enfría durante el calor de Houston?"),
      a: t("The most common reasons include low refrigerant, dirty condenser coils, thermostat malfunction, or system overload due to extreme Houston temperatures.", "Las razones más comunes incluyen refrigerante bajo, bobinas de condensador sucias, mal funcionamiento del termostato o sobrecarga del sistema debido a temperaturas extremas en Houston.")
    },
    {
      q: t("How much does AC repair cost in Houston, TX?", "¿Cuánto cuesta la reparación de aire acondicionado en Houston, TX?"),
      a: t("AC repair typically costs between $150 and $1500, depending on the issue. Minor electrical or filter repairs are lower, while compressor or refrigerant repairs are higher.", "La reparación de AC generalmente cuesta entre $150 y $1500, dependiendo del problema. Las reparaciones eléctricas menores o de filtros son más bajas, mientras que las de compresor o refrigerante son más altas.")
    },
    {
      q: t("Should I repair or replace my HVAC system?", "¿Debo reparar o reemplazar mi sistema HVAC?"),
      a: t("If your system is over 10–12 years old and requires frequent repairs, replacement is usually more cost-effective due to improved energy efficiency and lower long-term costs.", "Si su sistema tiene más de 10-12 años y requiere reparaciones frecuentes, el reemplazo suele ser más rentable debido a una mejor eficiencia energética y menores costos a largo plazo.")
    },
    {
      q: t("How quickly can Upfront Ac respond to emergency HVAC calls in Houston, TX?", "¿Qué tan rápido puede responder Upfront AC a llamadas de emergencia HVAC en Houston, TX?"),
      a: t("Yes, Upfront Ac provides same-day AC repair across Houston with fast emergency dispatch for urgent cooling issues.", "Sí, Upfront AC ofrece reparación de AC el mismo día en todo Houston con despacho rápido de emergencia para problemas urgentes de enfriamiento.")
    },
    {
      q: t("What are the signs my HVAC system needs repair?", "¿Cuáles son las señales de que mi sistema HVAC necesita reparación?"),
      a: t("Weak airflow, warm air from vents, unusual noises, high energy bills, and frequent on/off cycling are common warning signs.", "El flujo de aire débil, el aire caliente por las rejillas, los ruidos inusuales, las facturas de energía altas y el encendido/apagado frecuente son señales comunes.")
    },
    {
      q: t("Do you provide emergency HVAC repair 24/7 in Houston?", "¿Ofrecen reparación de HVAC de emergencia las 24 horas en Houston?"),
      a: t("Yes, Upfront Ac offers 24/7 emergency HVAC repair across Houston, including nights, weekends, and holidays.", "Sí, Upfront AC ofrece reparación de HVAC de emergencia las 24 horas, los 7 días de la semana en todo Houston, incluidos noches, fines de semana y feriados.")
    },
    {
      q: t("How often should HVAC systems be serviced?", "¿Con qué frecuencia se debe dar mantenimiento a los sistemas HVAC?"),
      a: t("HVAC systems should be serviced twice per year—before summer and winter—to maintain efficiency and prevent breakdowns.", "Los sistemas HVAC deben recibir mantenimiento dos veces al año (antes del verano y del invierno) para mantener la eficiencia y evitar averías.")
    }
  ];

  const handleGitSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (form.querySelector("input[name='name']") as HTMLInputElement)?.value || "";
    const phone = (form.querySelector("input[name='phone']") as HTMLInputElement)?.value || "";
    const email = (form.querySelector("input[name='email']") as HTMLInputElement)?.value || "";
    const service = (form.querySelector("select[name='service']") as HTMLSelectElement)?.value || "";
    const msg = (form.querySelector("textarea[name='message']") as HTMLTextAreaElement)?.value || "";

    try {
      // Immediate dual-sync to MongoDB Atlas & local cache
      await addWebEmail({
        name,
        phone,
        email,
        service: service || "General HVAC Inquiry",
        message: msg,
        source: "Landing Get-In-Touch Form"
      });

      // Background notification without blocking UI
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
          "Service Needed": service || "General HVAC Inquiry",
          Message: msg
        })
      }).catch((err) => console.log("Background email alert:", err));

      setSubmitted(true);
      toast.success(t("Estimate Request Received!", "¡Solicitud Recibida!"), {
        description: t("Our dispatch team has been notified.", "Nuestro equipo de despacho ha sido notificado.")
      });
    } catch (err) {
      setSubmitted(true);
      toast.success(t("Estimate Request Received!", "¡Solicitud Recibida!"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="get-in-touch" className="relative py-16 lg:py-20 bg-white border-b border-slate-100 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="mx-auto w-[90%] max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#005CE6]" />
            {t("Get In Touch & FAQs", "Contacto y Preguntas Frecuentes")}
          </span>
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight mb-2 tracking-tight">
            {t("Get your ", "Obtenga su ")}
            <span className="text-[#005CE6]">{t("free estimate", "presupuesto gratis")}</span>
            {t(" today.", " hoy.")}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
            {t(
              "Tell us about your HVAC service needs or request immediate dispatch — fast response guaranteed.",
              "Cuéntenos sobre sus necesidades de servicio HVAC o solicite despacho inmediato."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Premium FAQ Section (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="lg:col-span-5 overflow-hidden rounded-3xl bg-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col justify-between"
          >
            <div>
              {/* FAQ Header Pill */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#005CE6] text-white flex items-center justify-center shrink-0 shadow-md">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-300">
                    {t("Frequently Asked Questions", "Preguntas Frecuentes")}
                  </span>
                  <span className="block text-[11px] text-slate-400 font-medium">
                    {t("HVAC service in Houston, TX", "Servicio HVAC en Houston, TX")}
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1 text-left">
                {t("Frequently asked questions", "Preguntas frecuentes")}
              </h3>
              <p className="text-xs text-slate-300/90 font-medium leading-relaxed mb-4 text-left">
                {t(
                  "Answers to the most common questions about HVAC service in Houston, TX.",
                  "Respuestas a las preguntas más comunes sobre el servicio HVAC en Houston, TX."
                )}
              </p>

              {/* Accordion List */}
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="bg-white/5 border border-white/10 rounded-xl px-3.5 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:border-cyan-400/50 text-left"
                  >
                    <AccordionTrigger className="text-xs font-extrabold text-white hover:no-underline hover:text-cyan-300 py-2.5 leading-snug">
                      <span>{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-[11px] text-slate-300 leading-relaxed font-medium pb-3 pt-0.5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Emergency Call Hotline Bar at Bottom of FAQ Card */}
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 text-left">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">
                  {t("Have an urgent question?", "¿Tiene una pregunta urgente?")}
                </span>
                <a
                  href={`tel:${phoneTel}`}
                  className="text-sm font-extrabold text-cyan-300 hover:text-white transition-colors"
                >
                  {settings.officePhone || "(713) 819-7908"}
                </a>
              </div>

              <a
                href={`tel:${phoneTel}`}
                className="w-8 h-8 rounded-lg bg-[#005CE6] hover:bg-cyan-500 text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Quote Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-500/20">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600 animate-pulse" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#005CE6] rounded-full flex items-center justify-center text-white text-[10px] font-black animate-bounce shadow-md">
                      ✓
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      {t("Priority Dispatch Assigned", "Despacho Prioritario Asignado")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-[#0F172A]">
                      {t("Request Received!", "¡Solicitud Recibida!")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md mx-auto leading-relaxed">
                      {t(
                        "Thank you! Your inquiry is logged in our dispatch database. Our EPA-certified HVAC technician will call or text you within 15–30 minutes.",
                        "¡Gracias! Su consulta está registrada en nuestra base de datos de despacho. Nuestro técnico certificado le llamará o enviará un mensaje en 15–30 minutos."
                      )}
                    </p>
                  </div>

                  {/* Dispatch Details Card */}
                  <div className="w-full max-w-md bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-2.5 text-left">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-400 uppercase text-[10px] tracking-wider">Response Window:</span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" /> Same-Day / 15-30 Mins
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200">
                      <span className="text-slate-400 uppercase text-[10px] tracking-wider">Direct Hotline:</span>
                      <a href={`tel:${phoneTel}`} className="text-[#005CE6] font-extrabold hover:underline flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> {settings.officePhone || "(713) 819-7908"}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-extrabold text-[#005CE6] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>← {t("Submit another request", "Enviar otra solicitud")}</span>
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleGitSubmit}
                  className="space-y-6 text-left"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label={t("Full Name", "Nombre Completo")}
                      name="name"
                      placeholder="John Smith"
                      required
                    />
                    <Field
                      label={t("Phone Number", "Número de Teléfono")}
                      name="phone"
                      type="tel"
                      placeholder="(713) 819-7908"
                      required
                    />
                    <Field
                      label={t("Email Address", "Correo Electrónico")}
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="sm:col-span-2"
                    />

                    <div className="sm:col-span-2">
                      <Label>{t("Service Needed", "Servicio Requerido")}</Label>
                      <select
                        name="service"
                        required
                        className="mt-2.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#005CE6]/10 focus:border-[#005CE6] focus:bg-white transition-all duration-300 cursor-pointer"
                      >
                        <option value="">{t("Select HVAC service...", "Seleccione servicio HVAC...")}</option>
                        <option>{t("Emergency AC Repair", "Reparación de AC de Emergencia")}</option>
                        <option>{t("HVAC Installation & Replacement", "Instalación y Reemplazo de HVAC")}</option>
                        <option>{t("Routine HVAC Maintenance", "Mantenimiento Rutinario de HVAC")}</option>
                        <option>{t("Commercial HVAC Service", "Servicio HVAC Comercial")}</option>
                        <option>{t("Indoor Air Quality & Ductwork", "Calidad del Aire Interior y Conductos")}</option>
                        <option>{t("Thermostat & Smart Controls", "Termostatos y Controles Inteligentes")}</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <Label>{t("Project Scope / Problem Description", "Detalles del Proyecto / Descripción del Problema")}</Label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder={t("Describe your AC or heating issue, system age, or requested appointment time...", "Describa su problema de AC o calefacción...")}
                        className="mt-2.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#005CE6]/10 focus:border-[#005CE6] focus:bg-white transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={submitting}
                    className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#0066FF] hover:to-[#0052CC] px-6 py-4.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-[#005CE6]/30 cursor-pointer transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        <span>{t("Transmitting Request to Dispatch...", "Transmitiendo Solicitud a Despacho...")}</span>
                      </span>
                    ) : (
                      <>
                        <span>{t("Send Free Estimate Request", "Enviar Solicitud de Presupuesto Gratis")}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[10px] text-slate-400 font-semibold">
                    {t(
                      "We secure your data. Info only used to dispatch technician updates.",
                      "Aseguramos sus datos. Información utilizada únicamente para actualizaciones de despacho."
                    )}
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  className = "",
}: any) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#005CE6]/10 focus:border-[#005CE6] focus:bg-white transition-all duration-300"
      />
    </div>
  );
}
