import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinancePageDetail } from "@/components/site/FinancePageDetail";

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
            "name": "Financing",
            "item": "https://www.upfrontac.com/finance"
          }
        ]
      },
      {
        "@type": "WebPage",
        "name": "Air Conditioning & Heating Financing",
        "url": "https://www.upfrontac.com/finance",
        "description": "Flexible residential HVAC financing options: low monthly payments, 0% promotional APR, and fast approvals via Synchrony, Microf, JBFin, and Acorn.",
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
      <FinancePageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Air Conditioning & Heating Financing | Flexible Payment Plans | Upfront AC" },
      { name: "description", content: "Flexible HVAC financing options with zero-down payments, 0% promotional APR, and quick approvals through Synchrony, Microf, JBFin & Acorn in Tomball, Cypress, & Houston." },
      { property: "og:title", content: "Air Conditioning & Heating Financing | Upfront AC" },
      { property: "og:description", content: "Home comfort without financial stress. Fast approval and flexible monthly terms for new AC & heating systems. Call (713) 819-7908." },
      { property: "og:url", content: "https://www.upfrontac.com/finance" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/finance" }
    ],
  }),
  component: Page,
});
