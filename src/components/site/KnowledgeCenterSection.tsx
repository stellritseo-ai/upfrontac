import { Link } from "@tanstack/react-router";
import { BookOpen, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { BUSINESS } from "@/data/business";
import { useLanguage } from "@/hooks/useLanguage";

export function KnowledgeCenterSection({ limit = 6 }: { limit?: number }) {
  const { t } = useLanguage();
  const featured = ARTICLES.slice(0, limit);

  return (
    <section
      id="knowledge-center"
      className="py-16 lg:py-20 bg-white border-b border-slate-200/80 text-left select-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-[#005CE6]/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#005CE6] mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#005CE6]" />
              <span>{t("HVAC Knowledge Center", "Centro de Conocimiento HVAC")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {t("Answers to Common ", "Respuestas a preguntas comunes de ")}
              <span className="text-[#005CE6]">
                {t("Houston HVAC Questions", "HVAC en Houston")}
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              {t(
                `Practical troubleshooting checklists, Houston AC repair cost breakdowns, and SEER2 buying guides reviewed by founder ${BUSINESS.owner.name} (License ${BUSINESS.licenseNumber}).`,
                `Guías prácticas de diagnóstico, costos de reparación de AC en Houston y consejos de mantenimiento revisados por ${BUSINESS.owner.name} (Licencia ${BUSINESS.licenseNumber}).`
              )}
            </p>
          </div>

          <Link
            to="/knowledge-center"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl px-6 py-3.5 transition-all shrink-0 self-start lg:self-auto"
          >
            <span>{t(`Browse All ${ARTICLES.length} HVAC Guides`, `Ver las ${ARTICLES.length} Guías HVAC`)}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((article) => (
            <article
              key={article.slug}
              className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 flex flex-col justify-between hover:border-[#005CE6]/50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-slate-500 mb-3">
                  <span className="rounded-full bg-blue-50 text-[#005CE6] border border-blue-200 px-2.5 py-0.5 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#005CE6]" />
                    {article.readingMinutes} min read
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2.5">
                  <Link
                    to="/knowledge-center/$slug"
                    params={{ slug: article.slug }}
                    className="hover:text-[#005CE6] transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                  {article.answer}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  TDLR {BUSINESS.licenseNumber}
                </span>
                <Link
                  to="/knowledge-center/$slug"
                  params={{ slug: article.slug }}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#005CE6] hover:underline"
                >
                  <span>Read Answer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

