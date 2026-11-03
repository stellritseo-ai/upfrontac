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
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "Magnolia", "The Woodlands", "Sugar Land"],
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

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/hvac-maintenance")({
  head: () =>
    pageHead({
      title: "HVAC Maintenance & Seasonal Tune-Ups in Tomball & Cypress, TX | Upfront AC",
      description:
        "Systematic 16-point HVAC tune-ups built for Texas weather: coil cleaning, capacitor & refrigerant checks, drain line clearing, and written reports across Tomball, Cypress & Houston.",
      path: "/services/hvac-maintenance",
    }),
  component: Page,
});

