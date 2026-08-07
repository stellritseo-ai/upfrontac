import { createFileRoute } from "@tanstack/react-router";
import { IndoorAirQualityPageDetail } from "@/components/site/IndoorAirQualityPageDetail";

function Page() {
  return <IndoorAirQualityPageDetail />;
}

export const Route = createFileRoute("/services/indoor-air-quality")({
  head: () => ({
    meta: [
      { title: "Indoor Air Quality & Whole-Home Purification | Upfront AC" },
      { name: "description", content: "Duct cleaning, UV germicidal lights, whole-home dehumidifiers, and MERV 11-16 filtration in Tomball, Cypress, Katy, & Houston, TX." },
      { property: "og:title", content: "Indoor Air Quality · Tomball & Cypress, TX | Upfront AC" },
      { property: "og:description", content: "Breathe cleaner air done right the first time. Diagnoses, treats, and verifies your home air quality with 100% itemized pricing." },
    ],
  }),
  component: Page,
});
