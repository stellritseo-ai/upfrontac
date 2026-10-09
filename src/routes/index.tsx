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
      { title: "Upfront AC & Heating | Tomball & Cypress TX HVAC Repair & Install" },
      { name: "description", content: "Upfront AC & Heating delivers honest, high-efficiency HVAC repair, system replacement, and maintenance in Tomball, Cypress, and Greater NW Houston. TACLA133609C licensed. Call (713) 819-7908." },
      { name: "keywords", content: "ac repair tomball tx, ac repair cypress tx, hvac contractor tomball, emergency ac repair houston, air conditioning install cypress, upfront pricing ac" },
      { property: "og:title", content: "Upfront AC & Heating | Tomball & Cypress TX HVAC Repair & Install" },
      { property: "og:description", content: "Upfront AC & Heating: 7 AM - 5 PM M-F & emergency weekend dispatch. Honest HVAC service, transparent pricing, TACLA133609C licensed." },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/" }
    ],
  }),
  component: Index,
});

function Index() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": "Upfront AC & Heating",
    "image": "https://www.upfrontac.com/assets/logo.png",
    "@id": "https://www.upfrontac.com/#organization",
    "url": "https://www.upfrontac.com/",
    "telephone": "+17138197908",
    "email": "allen@upfrontac.com",
    "priceRange": "$$",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Texas HVAC Contractor License",
      "recognizedBy": {
        "@type": "State",
        "name": "Texas Department of Licensing and Regulation"
      },
      "identifier": "TACLA133609C"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving Tomball, Cypress, and Greater NW Houston",
      "addressLocality": "Tomball",
      "addressRegion": "TX",
      "postalCode": "77375",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.0972",
      "longitude": "-95.6161"
    },
    "areaServed": [
      { "@type": "City", "name": "Tomball", "sameAs": "https://en.wikipedia.org/wiki/Tomball,_Texas" },
      { "@type": "City", "name": "Cypress", "sameAs": "https://en.wikipedia.org/wiki/Cypress,_Texas" },
      { "@type": "City", "name": "Houston", "sameAs": "https://en.wikipedia.org/wiki/Houston" },
      { "@type": "City", "name": "Katy" },
      { "@type": "City", "name": "Spring" },
      { "@type": "City", "name": "Magnolia" },
      { "@type": "City", "name": "The Woodlands" },
      { "@type": "City", "name": "Sugar Land" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
        ],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59",
        "description": "24/7 Emergency AC & Heating Dispatch"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/upfrontac",
      "https://www.instagram.com/upfrontac/",
      "https://www.bbb.org/us/tx/tomball/profile/heating-and-air-conditioning/upfront-ac-0915-90074209"
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
