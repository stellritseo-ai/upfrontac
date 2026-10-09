import { createFileRoute } from "@tanstack/react-router";
import { AirConditioningPageDetail } from "@/components/site/AirConditioningPageDetail";

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
            "name": "Air Conditioning",
            "item": "https://www.upfrontac.com/services/air-conditioning"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Air Conditioning Services",
        "serviceType": "Air Conditioning Services",
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
        "description": "Complete high-efficiency air conditioning solutions: rapid cooling repairs, SEER2 system replacements, compressor troubleshooting, and preventative tune-ups in Greater Houston."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AirConditioningPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/air-conditioning")({
  head: () => ({
    meta: [
      { title: "Air Conditioning Services Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "High-efficiency AC repairs, new system installations, and routine maintenance across Tomball, Cypress, Katy, & Greater Houston. 24/7 emergency cooling dispatch." },
      { property: "og:title", content: "Air Conditioning Repair, Installation & Maintenance | Upfront AC" },
      { property: "og:description", content: "EPA-certified, licensed, and insured. Transparent upfront pricing and 24/7 emergency dispatch. Call (713) 819-7908." },
      { property: "og:url", content: "https://www.upfrontac.com/services/air-conditioning" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/air-conditioning" }
    ],
  }),
  component: Page,
});
