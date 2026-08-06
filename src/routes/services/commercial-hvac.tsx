import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, Building2 } from "lucide-react";
import img from "@/assets/service-commercial-hvac.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/commercial-hvac")({
  head: () => ({
    meta: [
      { title: "Commercial HVAC Services | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Heavy-duty commercial HVAC rooftop unit installation, repair, and maintenance contracts in Cypress & Tomball, TX." },
    ],
  }),
  component: CommercialHVACPage,
});

function CommercialHVACPage() {
  const { t } = useLanguage();

  const features = [
    t("Rooftop package unit (RTU) replacement & repair", "Reemplazo y reparación de unidades paquete de techo (RTU)"),
    t("Commercial chiller & VRF multi-zone system support", "Soporte para enfriadores comerciales y sistemas multizona VRF"),
    t("Custom commercial maintenance contracts & priority dispatch", "Contratos de mantenimiento comercial y despacho prioritario"),
    t("Commercial air balancing & ductwork fabrication", "Balanceo de aire comercial y fabricación de ductos"),
    t("Economizer, damper, and BAS control automation", "Automatización de economizadores, dampers y controles BAS"),
    t("Licensed & Insured TACLA133609C commercial contractors", "Contratistas comerciales calificados con licencia TACLA133609C"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Commercial HVAC", "HVAC Comercial")}
        title={t("Commercial HVAC Solutions for Businesses", "Soluciones HVAC Comerciales Para Empresas")}
        subtitle={t("Heavy-duty heating, cooling, and ventilation engineering for office buildings, retail centers, schools, and commercial facilities in Tomball & Cypress, TX.", "Ingeniería de calefacción, refrigeración y ventilación de servicio pesado para edificios de oficinas, centros comerciales e instalaciones.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Building2 className="w-4 h-4" /> {t("Commercial Experts", "Expertos Comerciales")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Keep Your Business Comfortable & Compliant", "Mantenga Su Empresa Cómoda y en Cumplimiento")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "Unplanned commercial HVAC downtime impacts customers, employees, and profits. Upfront AC provides fast emergency response, custom rooftop system replacements, and scheduled maintenance contracts.",
                  "El tiempo de inactividad de HVAC comercial afecta a clientes, empleados y ganancias. Upfront AC brinda respuesta rápida de emergencia y reemplazos de unidades."
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
                  <Link to="/contact">{t("Request Commercial Quote", "Solicitar Cotización Comercial")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Commercial HVAC Services" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}
