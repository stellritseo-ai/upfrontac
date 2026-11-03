import { createFileRoute } from "@tanstack/react-router";
import { HvacRepairsPageDetail } from "@/components/site/HvacRepairsPageDetail";

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
            "name": "HVAC Repairs",
            "item": "https://www.upfrontac.com/services/hvac-repairs"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Emergency HVAC Repair Services",
        "serviceType": "HVAC Repair Services",
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
        "description": "24/7 same-day emergency HVAC repairs: compressor troubleshooting, capacitor replacements, fan motors, refrigerant leak repairs, and thermostat diagnostics."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HvacRepairsPageDetail />
    </>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/hvac-repairs")({
  head: () =>
    pageHead({
      title: "Same-Day Emergency HVAC Repair in Tomball, Cypress & Houston | Upfront AC",
      description:
        "Fast, reliable emergency HVAC repair across Tomball, Cypress, Katy & Houston, TX. Owner with 15+ years of industry experience, flat-rate pricing, and clear warranty terms.",
      path: "/services/hvac-repairs",
    }),
  component: Page,
});
