import { Link, useLocation } from "@tanstack/react-router";
import { PhoneCall, Calculator } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { useLanguage } from "@/hooks/useLanguage";

export function MobileStickyCallBar() {
  const { t } = useLanguage();
  const location = useLocation();

  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Quick Contact Actions"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.35)]"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          data-track-cta="mobile-sticky-phone"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#005CE6] active:bg-[#0047B3] text-white font-extrabold text-xs py-3 px-3 shadow-md"
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span>{t(`Call ${BUSINESS.phoneDisplay}`, `Llamar ${BUSINESS.phoneDisplay}`)}</span>
        </a>

        <Link
          to="/request-free-estimate"
          data-track-cta="mobile-sticky-estimate"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white text-slate-950 font-extrabold text-xs py-3 px-3 shadow-md"
        >
          <Calculator className="w-4 h-4 text-[#005CE6] shrink-0" />
          <span>{t("Free Estimate", "Presupuesto Gratis")}</span>
        </Link>
      </div>
    </div>
  );
}

