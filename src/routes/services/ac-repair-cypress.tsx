import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, MapPin } from "lucide-react";
import img from "@/assets/service-ac-cypress.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/ac-repair-cypress")({
  head: () => ({
    meta: [
      { title: "AC Repair Services Cypress, TX | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Top-rated local AC repair, compressor diagnostics, and cooling tune-ups in Cypress, TX." },
    ],
  }),
  component: ACCypressPage,
});

function ACCypressPage() {
  const { t } = useLanguage();

  const features = [
    t("Dedicated Cypress, TX local HVAC technician team", "Equipo técnico local dedicado en Cypress, TX"),
    t("Fast arrival times across Cypress subdivisions & neighborhoods", "Tiempos de llegada rápidos en subdivisiones de Cypress"),
    t("Capacitor, fan motor, and compressor diagnostic checks", "Diagnóstico de capacitores, motores de ventilador y compresores"),
    t("Freon leak sealing & system pressure restoration", "Sellado de fugas de freón y restauración de presión"),
    t("No travel fees for Cypress homeowners", "Sin cargos de viaje para propietarios en Cypress"),
    t("Licensed & Insured TACLA133609C master technicians", "Técnicos calificados con licencia TACLA133609C"),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Cypress, TX Service Area"
        title={t("AC Repair Services in Cypress, TX", "Servicio de Reparación de AC en Cypress, TX")}
        subtitle={t("Fast, reliable local air conditioner repair and system tune-ups for homeowners throughout Cypress and surrounding North Houston communities.", "Reparación rápida y confiable de aire acondicionado y puestas a punto para propietarios en todo Cypress, TX.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <MapPin className="w-4 h-4" /> Cypress Local Specialists
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Cypress's Trusted Local Air Conditioning Experts", "Expertos Locales de Confianza en Aire Acondicionado en Cypress")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "Living in Cypress means experiencing extreme Texas summers. When your AC unit breaks down or struggles to maintain comfortable temperatures, Upfront AC provides fast local response with transparent, upfront pricing.",
                  "Vivir en Cypress significa experimentar veranos intensos en Texas. Cuando su unidad de AC se avería o lucha por mantener temperaturas cómodas, Upfront AC brinda una respuesta rápida y local."
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
                  <Link to="/contact">{t("Book Cypress AC Repair", "Reservar Reparación en Cypress")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Cypress AC Repair" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}
