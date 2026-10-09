import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectsPageDetail } from "@/components/site/ProjectsPageDetail";

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
            "name": "Projects",
            "item": "https://www.upfrontac.com/projects"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "HVAC Projects Gallery & Workmanship",
        "url": "https://www.upfrontac.com/projects",
        "description": "Gallery of completed AC installations, commercial rooftop units, custom ductwork, and emergency heating repairs across Greater Houston.",
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
      { property: "og:description", content: "12,000+ completed HVAC jobs since 2005. TACLA133609C licensed and 100% in-house technicians." },
      { property: "og:url", content: "https://www.upfrontac.com/projects" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/projects" }
    ],
  }),
  component: Page,
});
