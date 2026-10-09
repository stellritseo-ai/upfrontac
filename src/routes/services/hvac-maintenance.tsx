import { createFileRoute } from "@tanstack/react-router";
import { HvacMaintenancePageDetail } from "@/components/site/HvacMaintenancePageDetail";

function Page() {
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
            "name": "Services",
            "item": "https://www.upfrontac.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "HVAC Maintenance",
            "item": "https://www.upfrontac.com/services/hvac-maintenance"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "HVAC Maintenance & Tune-Up Services",
        "serviceType": "HVAC Preventative Maintenance",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "telephone": "+17138197908",
          "url": "https://www.upfrontac.com/",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Texas HVAC Contractor License",
            "identifier": "TACLA133609C"
          }
        },
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "The Woodlands"],
        "description": "Comprehensive 16-point HVAC seasonal tune-ups: condenser coil cleaning, electrical safety testing, refrigerant pressure verification, and written performance reports."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HvacMaintenancePageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/hvac-maintenance")({
  head: () => ({
    meta: [
      { title: "HVAC Maintenance & Tune-Up Services Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "Systematic HVAC tune-ups built for Texas weather. Coil cleaning, refrigerant checks, 16-point checklists, and written reports across Tomball, Cypress, & Houston." },
      { property: "og:title", content: "HVAC Maintenance Tomball, TX | Upfront AC" },
      { property: "og:description", content: "Keep your HVAC running all year long. Extended lifespan to 15–18 years with bi-annual Texas-tailored tune-ups." },
      { property: "og:url", content: "https://www.upfrontac.com/services/hvac-maintenance" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/hvac-maintenance" }
    ],
  }),
  component: Page,
});

