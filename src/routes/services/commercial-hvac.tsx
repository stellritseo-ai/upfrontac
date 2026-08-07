import { createFileRoute } from "@tanstack/react-router";
import { CommercialHvacPageDetail } from "@/components/site/CommercialHvacPageDetail";

function Page() {
  return <CommercialHvacPageDetail />;
}

export const Route = createFileRoute("/services/commercial-hvac")({
  head: () => ({
    meta: [
      { title: "24/7 Commercial HVAC Repair & Maintenance Houston | Upfront AC" },
      { name: "description", content: "Heavy-duty commercial HVAC solutions, rooftop package units (RTUs), VAV multi-zone systems, and commercial maintenance contracts across Tomball, Cypress, & Houston." },
      { property: "og:title", content: "24/7 Commercial HVAC · Houston, TX | Upfront AC" },
      { property: "og:description", content: "Reliable commercial heating & cooling for offices, restaurants, retail, and warehouses. Texas TDLR licensed & EPA 608 certified." },
    ],
  }),
  component: Page,
});
