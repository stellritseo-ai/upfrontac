import { createFileRoute } from "@tanstack/react-router";
import { AcRepairCypressPageDetail } from "@/components/site/AcRepairCypressPageDetail";

function Page() {
  return <AcRepairCypressPageDetail />;
}

export const Route = createFileRoute("/services/ac-repair-cypress")({
  head: () => ({
    meta: [
      { title: "Best AC Repair Services in Cypress, TX | Upfront AC" },
      { name: "description", content: "Fast, reliable, and affordable AC repair services in Cypress, TX. Family-oriented approach since 2005 for Towne Lake, Bridgeland, & Fairfield." },
      { property: "og:title", content: "Emergency AC Repair Services in Cypress, TX – Upfront AC" },
      { property: "og:description", content: "BBB-accredited local HVAC repair, air conditioning troubleshooting, and 24/7 emergency response in Cypress, TX." },
    ],
  }),
  component: Page,
});
