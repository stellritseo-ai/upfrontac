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
import { ContactIllustrationSection } from "@/components/site/ContactIllustrationSection";
import { ServiceArea } from "@/components/site/ServiceArea";
import { GetInTouch } from "@/components/site/GetInTouch";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
// import { Estimate } from "@/components/site/Estimate";
// import { CTASection } from "@/components/site/CTASection";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Licensed Electrician Miami & South Florida | R&E Electrical" },
      { name: "description", content: "Need a reliable electrician in Miami or South Florida? R&E Electrical Contractor Corp is licensed & insured. Call (786) 307-5933 for 24/7 emergency service, commercial wiring, panel upgrades, and EV charger installs." },
      { name: "keywords", content: "miami electrician, emergency electrician miami, residential electrician broward, commercial electrician south florida, panel upgrade miami, ev charger install miami, generator services florida" },
      { property: "og:title", content: "Licensed Electrician Miami & South Florida | R&E Electrical" },
      { property: "og:description", content: "R&E Electrical Contractor Corp: 24/7 electrical repairs, commercial projects, panel upgrades, and Level 2 EV charging setup in Florida." },
    ],
    links: [
      { rel: "canonical", href: "https://www.randeelectrical.com/" }
    ],
  }),
  component: Index,
});

function Index() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "name": "R&E Electrical Contractor Corp",
    "image": "https://www.randeelectrical.com/assets/logo.png",
    "@id": "https://www.randeelectrical.com/#organization",
    "url": "https://www.randeelectrical.com",
    "telephone": "+17863075933",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving Miami-Dade and Broward Counties",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "postalCode": "33101",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.7617",
      "longitude": "-80.1918"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/electricalcontractorcrop",
      "https://www.instagram.com/randeelectricalcontractorcrop/"
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero />
      <TrustBar />
      <Welcome />
      <FastHVAC />
      <Services />
      <EmergencyCTA />
      <Process />
      <WhyChooseUs />
      <Projects isLanding={true} />
      <Testimonials />
      <ContactIllustrationSection />
      <ServiceArea />
      <GetInTouch />
      {/* <Estimate /> */}
      {/* <CTASection /> */}
      <Toaster />
    </SiteLayout>
  );
}
