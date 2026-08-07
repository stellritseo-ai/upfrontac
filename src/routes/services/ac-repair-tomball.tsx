import { createFileRoute } from "@tanstack/react-router";
import { AcRepairTomballPageDetail } from "@/components/site/AcRepairTomballPageDetail";

function Page() {
  return <AcRepairTomballPageDetail />;
}

export const Route = createFileRoute("/services/ac-repair-tomball")({
  head: () => ({
    meta: [
      { title: "Trusted AC Repair Tomball, TX | Upfront Air Conditioning" },
      { name: "description", content: "Dependable AC repair Tomball homeowners trust. Fast communication, honest diagnostics, and 1-year repair warranty across Old Town Tomball & FM 2920." },
      { property: "og:title", content: "Emergency AC Repair Services in Tomball, TX – Upfront AC" },
      { property: "og:description", content: "Family-owned hometown HVAC team since 2005. TACLA133609C licensed, EPA-certified, flat-rate pricing." },
    ],
  }),
  component: Page,
});
