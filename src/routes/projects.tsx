import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectsPageDetail } from "@/components/site/ProjectsPageDetail";
import { loadGalleryPhotos } from "@/lib/gallery.functions";
import { pageHead, breadcrumbSchema, BUSINESS_ID, graph, jsonLd } from "@/lib/seo";
import { PROJECT_CASES } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  loader: async () => {
    try {
      return await loadGalleryPhotos();
    } catch {
      return [];
    }
  },
  head: () =>
    pageHead({
      title: "HVAC Projects Gallery & Workmanship | Upfront AC | Tomball, TX",
      description:
        "Inspect real HVAC project portfolios and 80+ original field photographs of residential AC installations, commercial rooftop units, brazing, and coil cleanings across Tomball, Cypress & Houston.",
      path: "/projects",
    }),
  component: Page,
});

function Page() {
  const initialPhotos = Route.useLoaderData();

  const schema = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]),
    {
      "@type": "CollectionPage",
      "@id": "https://www.upfrontac.com/projects#webpage",
      name: "HVAC Projects & Field Work Gallery",
      url: "https://www.upfrontac.com/projects",
      description:
        "Documented HVAC project portfolios and original field photographs from residential AC installations, commercial rooftop units, custom ductwork, and repairs across Greater Houston.",
      provider: { "@id": BUSINESS_ID },
      hasPart: PROJECT_CASES.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        url: `https://www.upfrontac.com/projects/${p.slug}`,
        datePublished: p.projectDate,
        image: p.images[0]?.large,
      })),
    }
  );

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <ProjectsPageDetail initialPhotos={initialPhotos} />
    </SiteLayout>
  );
}
