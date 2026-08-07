import { createFileRoute } from "@tanstack/react-router";
import { AirConditioningPageDetail } from "@/components/site/AirConditioningPageDetail";

function Page() {
  return <AirConditioningPageDetail />;
}

export const Route = createFileRoute("/services/air-conditioning")({
  head: () => ({
    meta: [
      { title: "Same-Day Air Conditioning Services Houston & Cypress | Upfront AC" },
      { name: "description", content: "Since 2013, Upfront AC has completed 12,000+ AC repairs, installations, and tune-ups across Houston, Cypress, Katy, and The Woodlands." },
      { property: "og:title", content: "Air Conditioning Repair, Installation & Maintenance | Upfront AC" },
      { property: "og:description", content: "EPA-certified, licensed, and insured. Transparent upfront pricing and 24/7 emergency dispatch." },
    ],
  }),
  component: Page,
});
