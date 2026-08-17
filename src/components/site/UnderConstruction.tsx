import { motion } from "framer-motion";
import { Mail, ShieldCheck, Zap, Phone, ArrowRight, Lock } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "@tanstack/react-router";

export function UnderConstruction() {
  const { settings, phoneTel } = useSiteSettings();

  const phoneDisplay = settings.officePhone || "(713) 819-7908";
  const emailDisplay = settings.alertEmail || "allen@upfrontac.com";

  return (
    <div className="min-h-screen w-full bg-[#080E1E] relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden font-sans text-white select-none">
      
      {/* ── AMBIENT GLOWS & BACKGROUND GRID ─────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#005CE6]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* ── MAIN CARD CONTAINER ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[640px] w-full bg-[#0E172A]/90 backdrop-blur-2xl border border-white/[0.09] rounded-[36px] sm:rounded-[44px] p-7 sm:p-12 md:p-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.7)] flex flex-col items-center gap-6 sm:gap-7"
      >
        
        {/* Glowing Lightning/Power Badge */}
        <div className="relative flex items-center justify-center">
          {/* Ambient pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#005CE6]/30 blur-xl animate-pulse" />
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#132244] border border-[#005CE6]/40 flex items-center justify-center shadow-[inset_0_2px_12px_rgba(0,92,230,0.4)]">
            <Zap className="w-11 h-11 sm:w-13 sm:h-13 text-[#005CE6] fill-[#005CE6] drop-shadow-[0_0_16px_rgba(0,92,230,0.8)]" />
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#005CE6]/15 border border-[#005CE6]/35 shadow-[0_0_15px_rgba(0,92,230,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#005CE6] animate-ping" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#38BDF8]">
            System Update in Progress
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2.5">
          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight text-white leading-tight">
            Under <span className="text-[#005CE6] drop-shadow-[0_0_20px_rgba(0,92,230,0.35)]">Construction</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-md mx-auto">
            We are currently optimizing Upfront Air Conditioning &amp; Heating's portal to serve you better. We'll be back online shortly.
          </p>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-white/[0.08]" />

        {/* ── 24/7 EMERGENCY DISPATCH ACTION CARD ─────────────── */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#091124]/90 border border-white/[0.08] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-left shadow-inner">
          <div className="text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#005CE6] sm:text-[#38BDF8]">
              24/7 Emergency Dispatch
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-300 font-semibold mt-1 leading-snug">
              HVAC emergencies don't wait. We remain fully open.
            </p>
          </div>

          <a
            href={`tel:${phoneTel}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl transition-all duration-300 shadow-[0_0_28px_rgba(0,92,230,0.55)] hover:shadow-[0_0_40px_rgba(0,92,230,0.85)] hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap text-center"
          >
            <Phone className="w-4 h-4 fill-white shrink-0" />
            <span>CALL {phoneDisplay}</span>
          </a>
        </div>

        {/* ── FOOTER PILLARS (EMAIL & LICENSING) ────────────────── */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-300 px-1">
          <a
            href={`mailto:${emailDisplay}`}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#005CE6]/15 border border-[#005CE6]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="truncate max-w-[240px] sm:max-w-none">{emailDisplay}</span>
          </a>

          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>Licensed &amp; Insured</span>
          </div>
        </div>

      </motion.div>

      {/* ── COPYRIGHT & ADMIN PORTAL LINK ───────────────────── */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
        <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-slate-400 text-center">
          &copy; {new Date().getFullYear()} Upfront Air Conditioning &amp; Heating LLC. All rights reserved.
        </span>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors font-semibold"
        >
          <Lock className="w-3 h-3" />
          <span>Admin Portal Access</span>
        </Link>
      </div>

    </div>
  );
}
