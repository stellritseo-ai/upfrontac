import { createFileRoute, redirect } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Careers } from "@/components/site/Careers";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

function CareersPage() {
  const { t } = useLanguage();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.upfrontac.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Careers",
        "item": "https://www.upfrontac.com/careers"
      }
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader
        eyebrow={t("Careers at Upfront AC", "Carreras en Upfront AC")}
        title={t("Join the Upfront AC & Heating Team", "Únase al Equipo de Upfront AC & Heating")}
        subtitle={t("We are always looking for honest, skilled HVAC service technicians and installers across Tomball, Cypress, and Greater Houston, TX.", "Siempre estamos buscando técnicos de servicio e instaladores de HVAC calificados y honestos en Tomball, Cypress y Greater Houston, TX.")}
      />
      <Careers />
      <EmergencyCTA />
    </SiteLayout>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  head: () =>
    pageHead({
      title: "HVAC Careers & Technician Jobs in Tomball & Houston, TX | Upfront AC",
      description:
        "Join Upfront AC & Heating in Tomball & Greater Houston, TX. Hiring licensed HVAC service technicians, system installers, and apprentices.",
      path: "/careers",
    }),
  component: CareersPage,
});

