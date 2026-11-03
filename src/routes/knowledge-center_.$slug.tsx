import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ARTICLES } from "@/data/articles";
import { ARTICLE_PHOTOS } from "./knowledge-center";
import { BUSINESS, SITE_URL } from "@/data/business";
import { pageHead, breadcrumbSchema, BUSINESS_ID, graph, jsonLd } from "@/lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  UserCheck,
  AlertTriangle,
  Wrench,
  PhoneCall,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

const SLUG_ALIASES: Record<string, string> = {
  "why-is-my-ac-running-but-not-cooling": "ac-running-not-cooling",
  "how-much-does-ac-repair-cost-in-houston-tx": "ac-repair-cost-houston",
  "when-should-you-repair-or-replace-your-air-conditioner": "repair-or-replace-air-conditioner",
  "why-is-my-ac-leaking-water": "ac-leaking-water",
  "what-causes-an-ac-evaporator-coil-to-freeze": "frozen-evaporator-coil-causes",
  "how-often-should-you-change-your-hvac-filter": "how-often-change-hvac-filter",
  "why-are-some-rooms-hotter-than-others": "rooms-hotter-than-others",
  "how-does-a-heat-pump-work": "how-heat-pump-works",
  "what-is-the-difference-between-seer2-and-older-seer-ratings": "seer2-vs-seer",
  "what-happens-during-a-professional-hvac-tune-up": "professional-hvac-tune-up",
  "how-to-choose-the-right-hvac-system-for-your-home": "choose-right-hvac-system",
};

const getArticle = (slug: string) => {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  return ARTICLES.find((a) => a.slug === canonical);
};

export const Route = createFileRoute("/knowledge-center_/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData, params }) => {
    const a = loaderData ?? getArticle(params.slug);
    if (!a) {
      return pageHead({
        title: "HVAC Guide | Upfront AC",
        description: "HVAC guide from Upfront AC & Heating.",
        path: `/knowledge-center/${params.slug}`,
        noindex: true,
      });
    }
    const photo = ARTICLE_PHOTOS[a.slug];
    return pageHead({
      title: `${a.metaTitle} | Upfront AC`,
      description: a.metaDescription,
      path: `/knowledge-center/${a.slug}`,
      type: "article",
      image: photo?.url,
      imageAlt: photo?.alt,
      extraMeta: [
        { property: "article:published_time", content: a.datePublished },
        { property: "article:modified_time", content: a.dateModified },
        { property: "article:section", content: a.category },
      ],
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const photo = ARTICLE_PHOTOS[article.slug];
  const related = article.relatedArticles
    .map((slug) => getArticle(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const authorId = `${SITE_URL}/about-owner#allen-swindell`;

  const schema = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "HVAC Knowledge Center", path: "/knowledge-center" },
      { name: article.title, path: `/knowledge-center/${article.slug}` },
    ]),
    {
      "@type": "Person",
      "@id": authorId,
      name: BUSINESS.owner.name,
      jobTitle: BUSINESS.owner.jobTitle,
      url: BUSINESS.owner.url,
      worksFor: { "@id": BUSINESS_ID },
    },
    {
      "@type": "Article",
      "@id": `${SITE_URL}/knowledge-center/${article.slug}#article`,
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: { "@id": authorId },
      reviewedBy: { "@id": authorId },
      publisher: { "@id": BUSINESS_ID },
      mainEntityOfPage: `${SITE_URL}/knowledge-center/${article.slug}`,
      image: photo ? [photo.url] : undefined,
      articleSection: article.category,
      inLanguage: "en-US",
    }
  );

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <PageHeader
        eyebrow={`${article.category} Guide · Upfront AC Knowledge Center`}
        title={article.title}
        subtitle={`Reviewed by ${BUSINESS.owner.name} (${BUSINESS.licenseNumber}) · ${article.readingMinutes} min read`}
      />

      <article className="py-14 lg:py-20 bg-white border-b border-slate-200/80 text-left">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Top Navigation & Byline */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <Link
              to="/knowledge-center"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#005CE6] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All HVAC Guides</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#005CE6]" />
                By{" "}
                <Link to="/about-owner" className="font-bold text-slate-900 hover:text-[#005CE6]">
                  {BUSINESS.owner.name}
                </Link>{" "}
                (TDLR {BUSINESS.licenseNumber})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#005CE6]" />
                Published <time dateTime={article.datePublished}>{article.datePublished}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#005CE6]" />
                {article.readingMinutes} min read
              </span>
            </div>
          </div>

          {/* Direct Answer Box (AI & Featured Snippet Optimized) */}
          <div className="rounded-3xl bg-blue-50/70 border border-[#005CE6]/25 p-6 sm:p-8 mb-10">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#005CE6] block mb-2">
              Quick Answer
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {article.answer}
            </p>
          </div>

          {/* Original Field Photo */}
          {photo && (
            <figure className="mb-10 rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
              <img
                src={photo.url}
                alt={photo.alt}
                width={800}
                height={500}
                loading="eager"
                decoding="async"
                className="w-full max-h-[440px] object-cover"
              />
              <figcaption className="px-5 py-3 text-xs font-semibold text-slate-600 bg-white border-t border-slate-200">
                Upfront AC Field Photo: {photo.alt}
              </figcaption>
            </figure>
          )}

          {/* Article Body Blocks */}
          <div className="space-y-5 text-slate-700 leading-relaxed">
            {article.body.map((block, idx) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={idx}
                    className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-6 pb-1"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={idx}
                    className="text-lg sm:text-xl font-extrabold text-slate-900 pt-4"
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={idx} className="text-sm sm:text-base font-medium leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul
                    key={idx}
                    className="space-y-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 p-5 sm:p-6 text-sm sm:text-base font-medium"
                  >
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "ol") {
                return (
                  <ol
                    key={idx}
                    className="space-y-3 rounded-2xl bg-slate-50 border border-slate-200/80 p-5 sm:p-6 text-sm sm:text-base font-medium"
                  >
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#005CE6] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                );
              }
              if (block.type === "callout") {
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-amber-50/90 border border-amber-300 p-6 my-6"
                  >
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>{block.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-amber-950/90 leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Article FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-12 pt-10 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#005CE6] mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                Common Follow-Up Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {article.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`article-faq-${i}`}
                    className="rounded-2xl bg-slate-50 border border-slate-200 px-6 transition-all data-[state=open]:bg-white data-[state=open]:border-[#005CE6]/40 data-[state=open]:shadow-xs"
                  >
                    <AccordionTrigger className="text-base font-extrabold text-slate-900 hover:no-underline hover:text-[#005CE6] py-5 text-left">
                      <span>{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-700 font-medium leading-relaxed pb-5 pt-0">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Related Services Box */}
          <div className="mt-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">
              Related Upfront AC Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Explore our relevant HVAC services, published flat-rate repair menu, or request a free replacement estimate:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {article.relatedServices.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-300 hover:border-[#005CE6] px-4 py-2.5 text-xs font-extrabold text-slate-800 hover:text-[#005CE6] shadow-2xs transition"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#005CE6]" />
                  <span>{s.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-10 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#005CE6]">
                Technical Author & Reviewer
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {BUSINESS.owner.name} — {BUSINESS.owner.jobTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                Allen Swindell brings over 15 years of hands-on HVAC trade and oilfield mechanical experience to homeowners and businesses in Tomball, Cypress, and Greater Houston. Texas TDLR License{" "}
                <strong className="text-slate-900">{BUSINESS.licenseNumber}</strong>.
              </p>
            </div>
            <Link
              to="/about-owner"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-extrabold px-4 py-2.5 shrink-0"
            >
              <span>Meet Allen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Direct Service CTA */}
          <div className="mt-10 rounded-3xl bg-slate-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Need a Licensed HVAC Technician in Greater Houston?
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Call {BUSINESS.phoneDisplay} for upfront diagnostic and repair service, or request a free estimate on a system replacement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold px-5 py-3.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {BUSINESS.phoneDisplay}</span>
              </a>
              <Link
                to="/request-free-estimate"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-5 py-3.5"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-5">
                Related HVAC Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/knowledge-center/$slug"
                    params={{ slug: r.slug }}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#005CE6] transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#005CE6] block mb-1.5">
                        {r.category} · {r.readingMinutes} min read
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {r.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#005CE6] mt-4">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}

