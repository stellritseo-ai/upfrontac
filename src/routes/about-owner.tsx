import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { AboutOwner } from "@/components/site/AboutOwner";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";
import { pageHead } from "@/lib/seo";

function AboutOwnerPage() {
  const { t } = useLanguage();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            "name": "About The Owner",
            "item": "https://www.upfrontac.com/about-owner"
          }
        ]
      },
      {
        "@type": "Person",
        "@id": "https://www.upfrontac.com/about-owner#allen-swindell",
        "name": "Allen Swindell",
        "jobTitle": "Owner & Lead HVAC Technician",
        "url": "https://www.upfrontac.com/about-owner",
        "worksFor": {
          "@type": "HVACBusiness",
          "@id": "https://www.upfrontac.com/#business",
          "name": "Upfront AC & Heating",
          "url": "https://www.upfrontac.com/"
        },
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Texas HVAC Contractor License",
          "identifier": "TACLA133609C"
        },
        "description": "Founder and lead technician of Upfront AC & Heating with 15+ years of personal HVAC trade and mechanical experience serving Tomball, Cypress, and Greater Houston."
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
        eyebrow={t("Leadership & Legacy", "Liderazgo y Legado")}
        title={t("About The Owner — Allen Swindell", "Sobre El Propietario — Allen Swindell")}
        subtitle={t("Meet Allen Swindell — licensed Texas HVAC contractor (TACLA133609C) with 15+ years of hands-on trade experience, oilfield grit, and a commitment to honest family service.", "Conozca a Allen Swindell — técnico maestro autodidacta de HVAC con experiencia petrolera y pasión por su familia.")}
      />
      <AboutOwner />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about-owner")({
  head: () =>
    pageHead({
      title: "About The Owner — Allen Swindell (TACLA133609C) | Upfront AC & Heating",
      description:
        "Meet Allen Swindell, founder and lead technician of Upfront AC & Heating in Tomball, TX. 15+ years of HVAC & mechanical experience, licensed TACLA133609C.",
      path: "/about-owner",
    }),
  component: AboutOwnerPage,
});
