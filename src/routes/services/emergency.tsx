import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, ShieldCheck, Clock, Award, ChevronRight, AlertTriangle } from "lucide-react";
import img from "@/assets/service-industrial.jpg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/emergency")({
  head: () => ({
    meta: [
      { title: "24/7 Emergency Electrical Services | R&E Electrical Contractor Corp" },
      { name: "description", content: "On-call 24/7 emergency electricians in Florida. Rapid response for power outages, breaker box failures, electrical fires, and hazards." },
      { property: "og:title", content: "24/7 Emergency Electrical | R&E Electrical" },
      { property: "og:description", content: "Rapid emergency electrical response across Florida." },
    ],
    links: [
      { rel: "canonical", href: "https://www.randeelectrical.com/services/emergency" }
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { t } = useLanguage();

  const serviceList = [
    t("Partial or Complete Home Power Outages", "Cortes de Energía Parciales o Completos en el Hogar"),
    t("Crackling, Humming, or Smoking Breaker Boxes", "Cajas de Disyuntores con Humo, Zumbidos o Crujidos"),
    t("Storm Damage & Flooded Electrical Equipment", "Daños por Tormentas y Equipos Eléctricos Inundados"),
    t("Faulty Main Breakers & Blown Service Fuses", "Disyuntores Principales Defectuosos y Fusibles de Servicio Quemados"),
    t("Commercial & Retail Emergency Response", "Respuesta de Emergencia Comercial y Minorista"),
    t("Industrial Machinery Electrical Fault Repair", "Reparación de Fallas Eléctricas en Maquinaria Industrial"),
    t("Burnt Receptacles & Wiring Melted insulation", "Receptáculos Quemados y Aislamiento de Cableado Derretido"),
    t("Short Circuit Diagnostics & Load Stabilization", "Diagnóstico de Cortocircuitos y Estabilización de Carga"),
  ];

  const faqs = [
    {
      q: t("What constitutes an electrical emergency?", "¿Qué constituye una emergencia eléctrica?"),
      a: t("If you hear buzzing/crackling inside walls, smell a fishy or chemical burning odor, see sparks, experience smoking outlets, or lose power to essential medical equipment, you should immediately turn off the main breaker and contact us.", "Si escucha zumbidos o chasquidos dentro de las paredes, huele un olor a quemado químico o a pescado, ve chispas, experimenta tomacorrientes con humo o pierde energía en equipos médicos esenciales, debe apagar inmediatamente el disyuntor principal y contactarnos.")
    },
    {
      q: t("How fast do you dispatch technicians?", "¿Qué tan rápido despachan a los técnicos?"),
      a: t("We operate a dedicated 24/7 emergency dispatch line. For high-hazard calls inside our service areas in South Florida, we aim to have a technician on-site within 60 minutes.", "Operamos una línea de despacho de emergencia dedicada las 24 horas, los 7 días de la semana. Para llamadas de alto peligro dentro de nuestras áreas de servicio en el sur de Florida, nuestro objetivo es tener un técnico en el lugar en un plazo de 60 minutos.")
    },
    {
      q: t("What should I do before the electrician arrives?", "¿Qué debo hacer antes de que llegue el electricista?"),
      a: t("If safe to do so, locate your main breaker box and turn off power to the affected room or the entire property. Do not touch wet areas or sparking wires. Stay clear of the panel if it is actively sparking or smoking.", "Si es seguro hacerlo, localice su caja de disyuntores principal y apague la energía de la habitación afectada o de toda la propiedad. No toque áreas mojadas ni cables con chispas. Manténgase alejado del panel si está echando chispas o humo activamente.")
    }
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Emergency Support", "Soporte de Emergencia")}
        title={t("24/7 Rapid Emergency Response", "Respuesta de Emergencia Rápida 24/7")}
        subtitle={t("Sparks? Smoke? Complete power loss? Call our emergency line immediately at (786) 307-5933. On-call master electricians are ready for immediate dispatch.", "¿Chispas? ¿Humo? ¿Pérdida completa de energía? Llame a nuestra línea de emergencia de inmediato al (786) 307-5933. Los electricistas maestros de guardia están listos para el despacho inmediato.")}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            {/* Left Column: Details */}
            <div className="space-y-10">
              <div className="rounded-3xl bg-destructive/10 border border-destructive/20 p-6 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-extrabold text-destructive">{t("Electrical Hazard Warning", "Advertencia de Peligro Eléctrico")}</h3>
                  <p className="mt-1 text-sm text-secondary/80 leading-relaxed">
                    {t("If you detect smoke, active sparking, or a strong chemical/burning smell, please vacate the premises and contact 911 immediately before calling our emergency line. Do not attempt to touch or repair electrical failures yourself.", "Si detecta humo, chispas activas o un fuerte olor químico/a quemado, vacíe las instalaciones y comuníquese con el 911 de inmediato antes de llamar a nuestra línea de emergencia. No intente tocar ni reparar fallas eléctricas usted mismo.")}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl font-extrabold text-secondary">
                  {t("Ready to Restore Safety & Power Around the Clock", "Listos para Restaurar la Seguridad y la Energía las 24 Horas")}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {t("Electrical emergencies don't wait for business hours, and neither do we. R&E Electrical Contractor Corp operates a fully staffed night and weekend dispatch division. Our emergency vans are stocked with common panels, breakers, and conduits to ensure we can complete repairs and restore power on the first visit.", "Las emergencias eléctricas no esperan a las horas de oficina, y nosotros tampoco. R&E Electrical Contractor Corp opera una división de despacho nocturna y de fin de semana con personal completo. Nuestras camionetas de emergencia están equipadas con paneles, disyuntores y conductos comunes para garantizar que podamos completar las reparaciones y restaurar la energía en la primera visita.")}
                </p>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-display text-xl font-extrabold text-secondary">{t("Common Emergency Calls We Handle", "Llamadas de Emergencia Comunes que Manejamos")}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {serviceList.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-secondary">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="border-t border-border pt-8">
                <h3 className="font-display text-xl font-extrabold text-secondary mb-6">{t("Frequently Asked Questions", "Preguntas Frecuentes")}</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group border border-border rounded-2xl bg-muted/20 p-5 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-display text-base font-bold text-secondary">
                        {faq.q}
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 text-primary" />
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-3">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: CTA Sidebar */}
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-3xl border border-border">
                <img
                  src={img}
                  alt="On-site emergency repair truck"
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">{t("R&E Electrical Dispatch", "Despacho R&E Electrical")}</div>
                  <div className="mt-1 font-display text-xl font-extrabold">{t("24/7 Rapid Emergency Response", "Respuesta de Emergencia Rápida 24/7")}</div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 shadow-sm">
                <h3 className="font-display text-2xl font-extrabold text-secondary">{t("Need immediate service?", "¿Necesita servicio inmediato?")}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {t("Call our dispatch hotline directly for priority queue processing.", "Llame a nuestra línea directa de despacho directamente para el procesamiento prioritario.")}
                </p>

                <div className="mt-6 space-y-3.5">
                  <a
                    href="tel:+17863075933"
                    className="flex items-center justify-center gap-2.5 rounded-full bg-primary text-primary-foreground px-4 py-4 text-base font-bold shadow-lg hover:bg-primary/95 transition btn-glow animate-pulse-glow"
                  >
                    <Phone className="h-5 w-5" /> {t("Call Hotline: (786) 307-5933", "Llamar Línea Directa: (786) 307-5933")}
                  </a>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link to="/contact">{t("Request Estimate", "Solicitar Presupuesto")}</Link>
                  </Button>
                </div>

                <div className="mt-6 space-y-2 text-xs font-semibold text-secondary/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" /> {t("Fully Licensed & Insured", "Totalmente Autorizado y Asegurado")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> {t("60-Minute Response Target", "Objetivo de Respuesta en 60 Minutos")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" /> {t("100% Satisfaction Guaranteed", "Garantía de Satisfacción del 100%")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}
