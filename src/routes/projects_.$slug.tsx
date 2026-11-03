import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { getProjectCase, PROJECT_CASES } from "@/data/projects";
import { pageHead, breadcrumbSchema, BUSINESS_ID, graph, jsonLd } from "@/lib/seo";
import {
  MapPin,
  Calendar,
  Wrench,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export const Route = createFileRoute("/projects_/$slug")({
  loader: ({ params }) => {
    const project = getProjectCase(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => {
    const p = loaderData ?? getProjectCase(params.slug);
    if (!p) {
      return pageHead({
        title: "HVAC Project | Upfront AC",
        description: "HVAC project portfolio from Upfront AC & Heating.",
        path: `/projects/${params.slug}`,
        noindex: true,
      });
    }
    return pageHead({
      title: `${p.title} | Upfront AC Projects`,
      description: `${p.customerProblem.slice(0, 145)}`,
      path: `/projects/${p.slug}`,
      image: p.images[0]?.large,
      imageAlt: p.images[0]?.alt,
    });
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const project = Route.useLoaderData();
  const otherProjects = PROJECT_CASES.filter((p) => p.slug !== project.slug).slice(0, 3);

  const schema = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.title, path: `/projects/${project.slug}` },
    ]),
    {
      "@type": "CreativeWork",
      "@id": `https://www.upfrontac.com/projects/${project.slug}#project`,
      headline: project.title,
      name: project.title,
      description: project.customerProblem,
      datePublished: project.projectDate,
      url: `https://www.upfrontac.com/projects/${project.slug}`,
      author: { "@id": BUSINESS_ID },
      publisher: { "@id": BUSINESS_ID },
      image: project.images.map((im) => im.large),
    }
  );

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <PageHeader
        eyebrow="Field Project Portfolio · Upfront AC & Heating"
        title={project.title}
        subtitle={`${project.equipmentType} — ${project.location}`}
      />

      <section className="py-14 lg:py-20 bg-white border-b border-slate-200/80 text-left">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#005CE6] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All HVAC Projects</span>
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#005CE6]" />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#005CE6]" />
                Archived: {project.projectDate}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Equipment Serviced / Installed
              </h2>
              <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                {project.equipmentType}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 md:col-span-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Problem & Technical Scope
              </h2>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {project.customerProblem}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Work Completed by Our Technicians
              </h2>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                {project.workCompleted.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#005CE6] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 mb-3">
                  Technical Outcome
                </h2>
                <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                  {project.result}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-200/80">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2.5">
                  Related HVAC Services
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.serviceLinks.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-300 hover:border-[#005CE6] px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:text-[#005CE6] transition"
                    >
                      <Wrench className="w-3.5 h-3.5 text-[#005CE6]" />
                      <span>{s.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Original Project Photographs */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              Original Field Photographs ({project.images.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.images.map((im, i) => (
                <figure
                  key={i}
                  className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs"
                >
                  <img
                    src={im.large}
                    alt={im.alt}
                    width={960}
                    height={720}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <figcaption className="p-4 text-xs font-semibold text-slate-700 bg-white border-t border-slate-200">
                    {im.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Need Similar HVAC Work in Tomball, Cypress, or Houston?
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Contact Upfront AC & Heating (License TACLA133609C) for upfront flat-rate repair pricing or a free replacement estimate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="tel:+17138197908"
                className="inline-flex items-center gap-2 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold px-5 py-3.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call (713) 819-7908</span>
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

          {otherProjects.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                More Documented HVAC Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherProjects.map((op) => (
                  <Link
                    key={op.slug}
                    to="/projects/$slug"
                    params={{ slug: op.slug }}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#005CE6] bg-slate-50 hover:bg-white transition block"
                  >
                    <span className="text-[11px] font-bold uppercase text-[#005CE6] block">
                      {op.category}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 mt-1 block">
                      {op.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

