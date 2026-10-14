import { createFileRoute } from "@tanstack/react-router";
import { AcRepairTomballPageDetail } from "@/components/site/AcRepairTomballPageDetail";

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
            "name": "AC Repair Tomball",
            "item": "https://www.upfrontac.com/services/ac-repair-tomball"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "AC Repair Tomball, TX",
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
          "name": "Tomball",
          "sameAs": "https://en.wikipedia.org/wiki/Tomball,_Texas"
        },
        "description": "Dependable, repair-first AC service in Tomball, TX. Fast diagnostic response, 1-year repair warranty, transparent flat-rate pricing. Serving Old Town, Northpointe, and FM 2920."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AcRepairTomballPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/ac-repair-tomball")({
  head: () => ({
    meta: [
      { title: "Trusted AC Repair Tomball, TX | Upfront AC & Heating" },
      { name: "description", content: "Dependable AC repair Tomball homeowners trust. Fast communication, honest diagnostics, and 1-year repair warranty across Old Town Tomball, Northpointe & FM 2920." },
      { property: "og:title", content: "Emergency AC Repair Services in Tomball, TX – Upfront AC" },
      { property: "og:description", content: "Family-owned hometown HVAC team backed by 15+ years of industry experience. TACLA133609C licensed, EPA-certified, flat-rate pricing. Call (713) 819-7908." },
      { property: "og:url", content: "https://www.upfrontac.com/services/ac-repair-tomball" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/ac-repair-tomball" }
    ],
  }),
  component: Page,
});
