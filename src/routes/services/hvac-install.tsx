import { createFileRoute } from "@tanstack/react-router";
import { HvacInstallPageDetail } from "@/components/site/HvacInstallPageDetail";

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
            "name": "HVAC Installation",
            "item": "https://www.upfrontac.com/services/hvac-install"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "HVAC Installation & AC Replacement",
        "serviceType": "HVAC Installation Services",
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
        "areaServed": ["Cypress", "Tomball", "Houston", "Katy", "Spring", "The Woodlands"],
        "description": "Complete new HVAC system installation and AC replacement: Manual J load calculation, SEER2 compliant systems, ductwork design, and full warranty commissioning."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HvacInstallPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/hvac-install")({
  head: () => ({
    meta: [
      { title: "HVAC Installation & AC Replacement Houston & Cypress | Upfront AC" },
      { name: "description", content: "From Manual J load calculations to final commissioning, Upfront AC installs energy-efficient SEER2 systems engineered for Texas heat in Cypress, Tomball, Katy, & Houston." },
      { property: "og:title", content: "HVAC Installation & AC Replacement · Cypress & Houston, TX | Upfront AC" },
      { property: "og:description", content: "Built for Texas heat — efficient, affordable & built to last. Free itemized estimates & flexible financing available." },
      { property: "og:url", content: "https://www.upfrontac.com/services/hvac-install" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/hvac-install" }
    ],
  }),
  component: Page,
});
