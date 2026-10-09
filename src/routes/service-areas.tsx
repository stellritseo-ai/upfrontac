import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ServiceAreasPageDetail } from "@/components/site/ServiceAreasPageDetail";

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
            "name": "Service Areas",
            "item": "https://www.upfrontac.com/service-areas"
          }
        ]
      },
      {
        "@type": "HVACBusiness",
        "name": "Upfront AC & Heating",
        "telephone": "+17138197908",
        "email": "allen@upfrontac.com",
        "url": "https://www.upfrontac.com/",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Texas HVAC Contractor License",
          "identifier": "TACLA133609C"
        },
        "areaServed": [
          { "@type": "City", "name": "Tomball", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "Cypress", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "Houston", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "Katy", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "Spring", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "Magnolia", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "The Woodlands", "address": { "@type": "PostalAddress", "addressRegion": "TX" } },
          { "@type": "City", "name": "Sugar Land", "address": { "@type": "PostalAddress", "addressRegion": "TX" } }
        ],
        "description": "Licensed residential and commercial HVAC services across Tomball, Cypress, Katy, Spring, Magnolia, The Woodlands, Sugar Land, and Greater Houston."
      }
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceAreasPageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "HVAC Service Areas | Tomball, Cypress, Katy & Houston | Upfront AC" },
      { name: "description", content: "Upfront AC provides HVAC repairs, AC installation, and indoor air quality services across Tomball, Cypress, Katy, Houston, Spring, Magnolia, Sugar Land, & The Woodlands, TX." },
      { property: "og:title", content: "Our Service Areas – Upfront AC" },
      { property: "og:description", content: "Fast same-day AC repair and installation across Northwest Houston. Call (713) 819-7908." },
      { property: "og:url", content: "https://www.upfrontac.com/service-areas" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/service-areas" }
    ],
  }),
  component: Page,
});
