import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { AboutOwner } from "@/components/site/AboutOwner";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

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
        "name": "Allen Swindell",
        "jobTitle": "Owner & Founder",
        "worksFor": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "url": "https://www.upfrontac.com/"
        },
        "description": "Founder and lead technician of Upfront AC & Heating, serving Tomball, Cypress, and Greater Houston with Texas HVAC license TACLA133609C."
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
        title={t("About The Owner", "Sobre El Propietario")}
        subtitle={t("Meet Allen Swindell — self-taught HVAC master pro with oilfield grit, hands-on mentorship, and a heart for family and community.", "Conozca a Allen Swindell — técnico maestro autodidacta de HVAC con experiencia petrolera y pasión por su familia.")}
      />
      <AboutOwner />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about-owner")({
  head: () => ({
    meta: [
      { title: "About The Owner — Allen Swindell | Upfront Air Conditioning" },
      { name: "description", content: "Allen Swindell — Self-made HVAC pro with oilfield grit, hands-on mentorship, and a commitment to family legacy at Upfront AC in Tomball & Cypress, TX." },
      { property: "og:title", content: "About The Owner — Allen Swindell | Upfront AC" },
      { property: "og:description", content: "Upfront AC isn't just a business — it's a legacy in motion." },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/about-owner" }
    ],
  }),
  component: AboutOwnerPage,
});
