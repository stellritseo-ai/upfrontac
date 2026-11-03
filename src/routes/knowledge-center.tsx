import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { ARTICLES } from "@/data/articles";
import { BUSINESS, SITE_URL } from "@/data/business";
import { pageHead, breadcrumbSchema, BUSINESS_ID, graph, jsonLd } from "@/lib/seo";
import {
  BookOpen,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  PhoneCall,
  Calendar,
} from "lucide-react";

export const ARTICLE_PHOTOS: Record<string, { url: string; alt: string }> = {
  "ac-running-not-cooling": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998868/upfrontac/residential/maims1yfhnep37ua8gdu.jpg",
    alt: "Manifold gauge set connected to a residential outdoor condenser to check refrigerant pressures",
  },
  "ac-repair-cost-houston": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998865/upfrontac/residential/lpgpm6ubzbdqpalpv2ve.jpg",
    alt: "Digital refrigerant gauges and electrical clamp meter connected to an outdoor AC condenser during diagnosis",
  },
  "repair-or-replace-air-conditioner": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998857/upfrontac/residential/fgfz0rrrrtb3rmqd0yco.webp",
    alt: "Two matching residential condensing units installed on concrete pads beside a brick home",
  },
  "houston-hvac-maintenance-checklist": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998766/upfrontac/residential/mdc6hw2crpnthzqo64dj.webp",
    alt: "Upfront AC technician washing an outdoor condenser coil during seasonal HVAC maintenance",
  },
  "ac-leaking-water": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1790721081/upfrontac/residential/ogfkfygyx5fxlw8abd1k.jpg",
    alt: "Technician cleaning a removed A-frame evaporator coil assembly to restore proper condensate drainage",
  },
  "frozen-evaporator-coil-causes": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1790721078/upfrontac/residential/pycbaintitwy8ery5nt0.jpg",
    alt: "Evaporator coil inside an air handler being cleaned to restore airflow and prevent icing",
  },
  "how-often-change-hvac-filter": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1790721074/upfrontac/residential/fg78l4f5gfid0zj6gzfs.jpg",
    alt: "Galvanized sheet-metal air handler plenum installed in an interior utility chase",
  },
  "rooms-hotter-than-others": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998819/upfrontac/residential/har83ehr6dsgppcrzeh8.webp",
    alt: "Honeywell multi-zone control panel wired with status LEDs lit to balance room temperatures",
  },
  "how-heat-pump-works": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998863/upfrontac/residential/nknpznxzbreczqwb4tjz.jpg",
    alt: "Goodman split-system outdoor unit installed beside a residential brick wall",
  },
  "seer2-vs-seer": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998859/upfrontac/residential/jckmqk4cw20oeblhurnn.webp",
    alt: "Lennox residential outdoor condensing unit installed on an equipment pad",
  },
  "professional-hvac-tune-up": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998812/upfrontac/residential/q2honx2c4z0dexfpiczq.webp",
    alt: "Digital manifold gauge reading refrigerant pressures and temperatures during an HVAC tune-up",
  },
  "choose-right-hvac-system": {
    url: "https://res.cloudinary.com/swvkivle/image/upload/f_auto,q_auto,c_limit,w_800/v1786998861/upfrontac/residential/zuj9xjcmbvknjnmuznfw.jpg",
    alt: "New residential condensing unit installed on a level pad beside a Texas home",
  },
};

export const Route = createFileRoute("/knowledge-center")({
  head: () =>
    pageHead({
      title: "HVAC Knowledge Center & Homeowner Guides | Upfront AC",
      description:
        "Straightforward HVAC troubleshooting guides, Houston AC repair cost breakdowns, SEER2 explanations, and maintenance checklists reviewed by licensed Texas HVAC technician Allen Swindell (TACLA133609C).",
      path: "/knowledge-center",
    }),
  component: KnowledgeCenterPage,
});

const CATEGORIES = ["All", "Cooling", "Costs", "Maintenance", "Buying Guide", "Heating"] as const;

function KnowledgeCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return ARTICLES;
    return ARTICLES.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  const schema = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "HVAC Knowledge Center", path: "/knowledge-center" },
    ]),
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/knowledge-center#webpage`,
      name: "Upfront AC & Heating — HVAC Knowledge Center",
      description:
        "Educational HVAC troubleshooting, maintenance, SEER2 efficiency, and cost guides for Greater Houston homeowners.",
      url: `${SITE_URL}/knowledge-center`,
      publisher: { "@id": BUSINESS_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ARTICLES.map((a, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE_URL}/knowledge-center/${a.slug}`,
          name: a.title,
        })),
      },
    }
  );

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <PageHeader
        eyebrow="HVAC Knowledge Center · TACLA133609C"
        title="Practical HVAC Guides for Houston Homeowners"
        subtitle="Clear, technical answers to common air conditioning and heating questions — written for homeowners in Tomball, Cypress, and Greater Houston and reviewed by founder Allen Swindell (15+ years HVAC trade experience)."
      />

      {/* Author & Editorial Standards Bar */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                Technical Reviewer: {BUSINESS.owner.name}, {BUSINESS.owner.jobTitle}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                15+ Years HVAC Trade Experience · Texas TDLR License{" "}
                <span className="font-bold text-slate-800">{BUSINESS.licenseNumber}</span> ·{" "}
                <Link to="/about-owner" className="text-[#005CE6] font-bold hover:underline">
                  About the Owner
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#005CE6] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-slate-200/80 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((article) => {
              const photo = ARTICLE_PHOTOS[article.slug];
              return (
                <article
                  key={article.slug}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {photo && (
                      <Link
                        to="/knowledge-center/$slug"
                        params={{ slug: article.slug }}
                        className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100"
                      >
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          width={640}
                          height={400}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-slate-950/85 text-cyan-300 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                          {article.category}
                        </span>
                      </Link>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#005CE6]" />
                          {article.readingMinutes} min read
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#005CE6]" />
                          Updated {article.dateModified}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                        <Link
                          to="/knowledge-center/$slug"
                          params={{ slug: article.slug }}
                          className="hover:text-[#005CE6] transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-4">
                        {article.answer}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Reviewed by {BUSINESS.owner.name}
                    </span>
                    <Link
                      to="/knowledge-center/$slug"
                      params={{ slug: article.slug }}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#005CE6] hover:underline"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-950 text-white text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
              <BookOpen className="w-4 h-4" />
              <span>Need Hands-On Diagnostic Help?</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Talk Directly With a Licensed Texas HVAC Technician
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              If safe homeowner checks do not solve the issue, we provide flat-rate diagnostics and upfront repair pricing across Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands, and Sugar Land.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+17138197908"
              className="inline-flex items-center gap-2 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs sm:text-sm font-extrabold px-6 py-4 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call (713) 819-7908</span>
            </a>
            <Link
              to="/upfront-pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold px-6 py-4"
            >
              <span>View Upfront Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

