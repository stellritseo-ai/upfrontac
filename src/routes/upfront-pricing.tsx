import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UpfrontPricingPageDetail } from "@/components/site/UpfrontPricingPageDetail";

function Page() {
  return (
    <SiteLayout>
      <UpfrontPricingPageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/upfront-pricing")({
  head: () => ({
    meta: [
      { title: "100% Upfront Pricing Guide | AC & Heating Repair | Upfront AC" },
      { name: "description", content: "Transparent flat-rate pricing menu for AC repair, capacitors, Freon recharges, fan motors, thermostats, and HVAC maintenance across Tomball, Cypress, & Houston." },
      { property: "og:title", content: "Upfront Pricing Guide | Upfront AC" },
      { property: "og:description", content: "No hidden fees, no sales gimmicks. Published flat-rate pricing for all heating & cooling repairs. Call (713) 819-7908." },
    ],
  }),
  component: Page,
});
