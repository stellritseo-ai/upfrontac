import { createFileRoute } from "@tanstack/react-router";
import { AcRepairCypressPageDetail } from "@/components/site/AcRepairCypressPageDetail";

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
            "name": "AC Repair Cypress",
            "item": "https://www.upfrontac.com/services/ac-repair-cypress"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "AC Repair Services Cypress, TX",
        "serviceType": "Air Conditioning Repair",
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
        "areaServed": {
          "@type": "City",
          "name": "Cypress",
          "sameAs": "https://en.wikipedia.org/wiki/Cypress,_Texas"
        },
        "description": "Fast, reliable emergency AC repair, compressor diagnostics, and Freon leak detection in Cypress, TX including Towne Lake, Bridgeland, and Fairfield."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AcRepairCypressPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/ac-repair-cypress")({
  head: () => ({
    meta: [
      { title: "Best AC Repair Services in Cypress, TX | Upfront AC & Heating" },
      { name: "description", content: "Fast, reliable AC repair in Cypress, TX. 24/7 emergency dispatch, capacitor & freon fixes, transparent upfront pricing. Serving Bridgeland, Towne Lake & Fairfield." },
      { property: "og:title", content: "Emergency AC Repair Services in Cypress, TX – Upfront AC" },
      { property: "og:description", content: "BBB-accredited local HVAC repair, air conditioning troubleshooting, and 24/7 emergency response in Cypress, TX. Call (713) 819-7908." },
      { property: "og:url", content: "https://www.upfrontac.com/services/ac-repair-cypress" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/ac-repair-cypress" }
    ],
  }),
  component: Page,
});
