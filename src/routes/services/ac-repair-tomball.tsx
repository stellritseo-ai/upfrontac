import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, MapPin } from "lucide-react";
import img from "@/assets/service-ac-tomball.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/ac-repair-tomball")({
  head: () => ({
    meta: [
      { title: "AC Repair Services Tomball, TX | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Expert air conditioning diagnostics, freon recharges, and cooling repairs for Tomball, TX homeowners." },
    ],
  }),
  component: ACTomballPage,
});

function ACTomballPage() {
  const { t } = useLanguage();

  const features = [
    t("Tomball, TX local office & master technician team", "Oficina local en Tomball, TX y equipo de maestros técnicos"),
    t("Comprehensive AC system pressure & freon level testing", "Prueba integral de presión del sistema de AC y niveles de freón"),
    t("Condenser coil cleaning & electrical connection tightening", "Limpieza de serpentín y ajuste de conexiones eléctricas"),
    t("Blower motor & thermostat calibration", "Calibración de motor de ventilador y termostato"),
    t("Free diagnostic with any approved repair", "Diagnóstico gratis con cualquier reparación aprobada"),
    t("Licensed TACLA133609C master HVAC contractor", "Contratista HVAC calificado con licencia TACLA133609C"),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Tomball, TX Service Area"
        title={t("AC Repair Services in Tomball, TX", "Servicio de Reparación de AC en Tomball, TX")}
        subtitle={t("Expert AC diagnostic, refrigerant refill, and repair services tailored for homeowners in Tomball, Tx. 77377 and Northpointe.", "Servicio experto de diagnóstico de AC, recarga de refrigerante y reparación adaptado para propietarios en Tomball, TX.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <MapPin className="w-4 h-4" /> Tomball Local Specialists
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Tomball's Preferred HVAC Contractor Since 2005", "El Contratista HVAC Preferido de Tomball Desde 2005")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "Located right in Tomball, Tx. 77377, Upfront AC takes pride in delivering quality over quantity. We provide honest AC diagnostics, upfront flat-rate pricing, and long-lasting cooling solutions.",
                  "Ubicados en Tomball, Tx. 77377, Upfront AC se enorgullece de ofrecer calidad sobre cantidad. Brindamos diagnósticos honestos y precios fijos transparentes."
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#005CE6] shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-800 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full font-extrabold px-8 bg-[#005CE6] hover:bg-[#0047B3]">
                  <Link to="/contact">{t("Book Tomball AC Repair", "Reservar Reparación en Tomball")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Tomball AC Repair" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}
