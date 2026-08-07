import { createFileRoute } from "@tanstack/react-router";
import { HeatingPageDetail } from "@/components/site/HeatingPageDetail";

function Page() {
  return <HeatingPageDetail />;
}

export const Route = createFileRoute("/services/heating")({
  head: () => ({
    meta: [
      { title: "Furnace Repair & Emergency Heating Services | Upfront AC" },
      { name: "description", content: "Gas furnace repair, heat pump maintenance, CO safety inspections, and emergency heating solutions across Tomball, Cypress, and Northwest Houston." },
      { property: "og:title", content: "Emergency Heating Services · Tomball, TX | Upfront AC" },
      { property: "og:description", content: "12,000+ heating repairs completed since 2013. TACLA133609C licensed, EPA-certified, flat-rate pricing." },
    ],
  }),
  component: Page,
});
