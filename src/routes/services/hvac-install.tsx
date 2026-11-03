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
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "Magnolia", "The Woodlands", "Sugar Land"],
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

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/hvac-install")({
  head: () =>
    pageHead({
      title: "HVAC Installation & AC Replacement in Houston, Tomball & Cypress | Upfront AC",
      description:
        "From Manual J load calculations to final commissioning, Upfront AC installs energy-efficient SEER2 systems engineered for Texas heat across Tomball, Cypress, Katy & Houston, TX.",
      path: "/services/hvac-install",
    }),
  component: Page,
});
