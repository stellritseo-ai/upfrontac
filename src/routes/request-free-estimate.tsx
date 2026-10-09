import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RequestFreeEstimatePageDetail } from "@/components/site/RequestFreeEstimatePageDetail";

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
            "name": "Request Free Estimate",
            "item": "https://www.upfrontac.com/request-free-estimate"
          }
        ]
      },
      {
        "@type": "WebPage",
        "name": "Request a Free HVAC Estimate",
        "url": "https://www.upfrontac.com/request-free-estimate",
        "description": "Request a free in-home estimate for AC installation, heating replacement, or emergency repair in Greater Houston.",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "telephone": "+17138197908",
          "url": "https://www.upfrontac.com/"
        }
      }
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RequestFreeEstimatePageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/request-free-estimate")({
  head: () => ({
    meta: [
      { title: "Request a Free HVAC Estimate | Upfront AC | Tomball & Houston, TX" },
      { name: "description", content: "Request a free, no-obligation estimate for AC repair, furnace maintenance, or new HVAC installation in Tomball, Cypress, Katy, & Greater Houston. Call (713) 819-7908." },
      { property: "og:title", content: "Request a Free HVAC Estimate | Upfront AC" },
      { property: "og:description", content: "Fast 60-minute emergency dispatch. Licensed TACLA133609C and 100% upfront transparent pricing." },
      { property: "og:url", content: "https://www.upfrontac.com/request-free-estimate" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/request-free-estimate" }
    ],
  }),
  component: Page,
});
