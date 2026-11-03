import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Welcome } from "@/components/site/Welcome";
import { FastHVAC } from "@/components/site/FastHVAC";
import { Services } from "@/components/site/Services";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { ServiceArea } from "@/components/site/ServiceArea";
import { GetInTouch } from "@/components/site/GetInTouch";
import { Process } from "@/components/site/Process";
import { KnowledgeCenterSection } from "@/components/site/KnowledgeCenterSection";
import { Toaster } from "@/components/ui/sonner";
import { loadGalleryPhotos } from "@/lib/gallery.functions";
import {
  pageHead,
  businessSchema,
  websiteSchema,
  graph,
  jsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await loadGalleryPhotos();
    } catch {
      return [];
    }
  },
  head: () =>
    pageHead({
      title: "HVAC Repair & AC Installation in Houston, TX | Upfront AC",
      description:
        "Need reliable AC repair or HVAC installation in Houston, Tomball or Cypress, TX? Contact Upfront AC for honest pricing, professional service and emergency HVAC assistance.",
      path: "/",
    }),
  component: Index,
});

function Index() {
  const initialPhotos = Route.useLoaderData();
  const schema = graph(businessSchema(), websiteSchema());

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <Hero />
      <TrustBar />
      <Welcome />
      <Services />
      <FastHVAC />
      <Process />
      <WhyChooseUs />
      <Projects isLanding={true} initialPhotos={initialPhotos} />
      <Testimonials />
      <ServiceArea />
      <KnowledgeCenterSection limit={6} />
      <GetInTouch />
      <Toaster />
    </SiteLayout>
  );
}
