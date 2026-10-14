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
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "The Woodlands"],
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

export const Route = createFileRoute("/services/hvac-repairs")({
  head: () => ({
    meta: [
      { title: "Same-Day Emergency HVAC Repair Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "Fast, reliable emergency HVAC repair across Tomball, Cypress and Houston. 15+ years industry experience, EPA-certified, 1-year repair warranty." },
      { property: "og:title", content: "Emergency HVAC Repair · Tomball & Cypress, TX | Upfront AC" },
      { property: "og:description", content: "Same-day HVAC repair & emergency AC service. Certified in-house technicians, 100% upfront flat-rate pricing." },
      { property: "og:url", content: "https://www.upfrontac.com/services/hvac-repairs" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/hvac-repairs" }
    ],
  }),
  component: Page,
});
