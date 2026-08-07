import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectsPageDetail } from "@/components/site/ProjectsPageDetail";

function Page() {
  return (
    <SiteLayout>
      <ProjectsPageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "HVAC Projects Gallery & Workmanship | Upfront AC | Tomball, TX" },
      { name: "description", content: "Explore our gallery of completed AC installations, commercial HVAC systems, ductwork, and emergency repairs across Tomball, Cypress, Katy, & Greater Houston. Call (713) 819-7908." },
      { property: "og:title", content: "HVAC Projects Gallery | Upfront AC" },
      { property: "og:description", content: "12,000+ completed HVAC jobs since 2013. TACLA133609C licensed and 100% in-house technicians." },
    ],
  }),
  component: Page,
});
