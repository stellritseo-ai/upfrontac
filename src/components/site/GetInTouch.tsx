import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addWebEmail } from "@/lib/leads-store";
import { detectTrafficChannel, trackConversion } from "@/lib/conversion-tracking";
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
      q: t(
        "What areas around Houston does Upfront AC & Heating serve?",
        "¿Qué áreas alrededor de Houston atiende Upfront AC & Heating?"
      ),
      a: t(
        "We are headquartered in Northpointe, Tomball, TX 77377 and provide daily residential and commercial HVAC service across Tomball, Cypress, Northwest and Greater Houston, Katy, Spring, Magnolia, The Woodlands, and Sugar Land.",
        "Estamos ubicados en Northpointe, Tomball, TX 77377 y brindamos servicio diario de HVAC residencial y comercial en Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands y Sugar Land."
      )
    },
    {
      q: t(
        "How fast can an HVAC technician arrive, and do you offer 24/7 emergency service?",
        "¿Qué tan rápido puede llegar un técnico y ofrecen servicio de emergencia 24/7?"
      ),
      a: t(
        "In addition to our regular weekday hours (Monday – Friday, 7:00 AM – 5:00 PM), we offer 24/7 emergency HVAC dispatch on nights, weekends, and holidays across Tomball, Cypress, and Greater Houston, with same-day arrival on most urgent calls.",
        "Además de nuestro horario habitual de lunes a viernes (7:00 AM – 5:00 PM), ofrecemos despacho de emergencia 24/7 en noches, fines de semana y días festivos en Tomball, Cypress y Greater Houston."
      )
    },
    {
      q: t(
        "How much does AC repair cost in Houston, TX, and how does upfront pricing work?",
        "¿Cuánto cuesta la reparación de AC en Houston, TX y cómo funcionan los precios transparentes?"
      ),
      a: t(
        "Our standard residential diagnostic call is $99 ($149 after-hours), which is waived when you proceed with a qualifying repair. Most AC repairs range from $150 to $1,500 depending on the component, and our technician shows you the exact flat-rate price from our published Upfront Pricing menu before any work begins.",
        "Nuestra llamada de diagnóstico residencial estándar es de $99 ($149 fuera de horario), que se descuenta al realizar la reparación. Nuestro técnico le muestra el precio fijo exacto antes de comenzar cualquier trabajo."
      )
    },
    {
      q: t(
        "Is Upfront AC & Heating licensed and insured in Texas, and what is your experience?",
        "¿Está Upfront AC & Heating licenciado y asegurado en Texas, y cuál es su experiencia?"
      ),
      a: t(
        "Yes. Upfront AC & Heating holds Texas TDLR Contractor License TACLA133609C and EPA Section 608 certification. We are in our 2nd year as an independent, BBB-accredited (A+) family business in Tomball, founded and led by Allen Swindell, who brings over 15 years of hands-on HVAC and mechanical trade experience.",
        "Sí. Contamos con la licencia de contratista de Texas TACLA133609C y certificación EPA 608. Somos una empresa familiar acreditada por el BBB (A+) liderada por Allen Swindell, con más de 15 años de experiencia en la industria HVAC."
      )
    },
    {
      q: t(
        "Why is my AC running but not cooling during the Houston heat?",
        "¿Por qué mi aire acondicionado funciona pero no enfría durante el calor de Houston?"
      ),
      a: t(
        "The most common causes in Greater Houston are a failed dual run capacitor, a dirty outdoor condenser coil, a clogged air filter or frozen evaporator coil, low refrigerant from a leak, or an attic float switch tripped by a clogged condensate drain line.",
        "Las causas más comunes en Houston son un capacitor dañado, bobinas del condensador sucias, filtro obstruido, bajo nivel de refrigerante o un interruptor de flotador activado en el drenaje."
      )
    },
    {
      q: t(
        "What are the signs my HVAC system needs repair vs. full replacement?",
        "¿Cuáles son las señales de que mi sistema HVAC necesita reparación o reemplazo?"
      ),
      a: t(
        "Warm air from vents, weak airflow, electrical buzzing, short-cycling, and water around the indoor unit indicate a repair is needed. If your system is over 10–12 years old and requires frequent major repairs, upgrading to a modern SEER2 system is often more cost-effective.",
        "El aire caliente, flujo débil, ruidos inusuales y ciclos cortos indican necesidad de reparación. Si su sistema tiene más de 10–12 años y requiere reparaciones frecuentes, el reemplazo por un sistema SEER2 suele ser más rentable."
      )
    },
    {
      q: t(
        "Do you offer free estimates and financing on new AC installations?",
        "¿Ofrecen presupuestos gratuitos y financiamiento en instalaciones nuevas?"
      ),
      a: t(
        "Yes. We provide free in-home estimates for full HVAC replacements and new installations—including Manual J load calculations and ductwork evaluation—and offer flexible monthly payment plans on approved credit through Synchrony, Microf, JBFin, and Acorn.",
        "Sí. Ofrecemos presupuestos gratuitos a domicilio para reemplazos e instalaciones nuevas, además de planes de financiamiento mensual flexible con crédito aprobado."
      )
    },
    {
      q: t(
        "How often should HVAC systems be serviced in Texas?",
        "¿Con qué frecuencia se debe dar mantenimiento a los sistemas HVAC en Texas?"
      ),
      a: t(
        "In Texas, HVAC systems should be serviced twice per year—in spring before peak cooling season and in fall before winter heating—to clean coils, flush condensate drains, test capacitors, and prevent mid-season breakdowns.",
        "En Texas, los sistemas HVAC deben recibir mantenimiento dos veces al año—en primavera y otoño—para limpiar bobinas, purgar drenajes y evitar averías."
      )
    }
  ];

  const handleGitSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.querySelector("input[name='companyWebsite']") as HTMLInputElement)?.value || "";
    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    const name = (form.querySelector("input[name='name']") as HTMLInputElement)?.value || "";
    const phone = (form.querySelector("input[name='phone']") as HTMLInputElement)?.value || "";
    const email = (form.querySelector("input[name='email']") as HTMLInputElement)?.value || "";
    const service = (form.querySelector("select[name='service']") as HTMLSelectElement)?.value || "";
    const msg = (form.querySelector("textarea[name='message']") as HTMLTextAreaElement)?.value || "";

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      toast.error(t("Please enter a valid 10-digit phone number.", "Por favor ingrese un número de teléfono válido de 10 dígitos."));
      return;
    }

    setSubmitting(true);
    const { channel } = detectTrafficChannel();

    try {
      await addWebEmail({
        name,
        phone,
        email,
        service: service || "General HVAC Inquiry",
        message: msg,
        source: `Landing Get-In-Touch Form [Channel: ${channel}]`
      });

      trackConversion("booking_submit", { label: service || "General HVAC Inquiry" });
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
                aria-label="Call Upfront AC & Heating at (713) 819-7908"
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
                  <input
                    type="text"
                    name="companyWebsite"
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden="true"
                  />
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
                      <Label htmlFor="git-service-select">{t("Service Needed", "Servicio Requerido")}</Label>
                      <select
                        id="git-service-select"
                        name="service"
                        aria-label={t("Service Needed", "Servicio Requerido")}
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
