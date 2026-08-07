import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowRight,
  Star,
  MapPin,
  AlertTriangle,
  Wrench,
  Activity,
  Flame,
  Building2,
  Home,
  Check,
  ChevronDown,
  HelpCircle,
  TrendingUp,
  Sparkles,
  Users,
  Quote,
  DollarSign,
  Zap,
  Sliders,
  XCircle,
  ThumbsUp,
  ShieldAlert
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-air-conditioning.png";

export function AirConditioningPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const includedServices = [
    {
      title: "AC Repair",
      desc: "Cooling failures, airflow issues, and full system breakdowns fixed fast with upfront quotes."
    },
    {
      title: "New AC Installation",
      desc: "Central systems and ductless mini splits sized for your home with Manual J precision."
    },
    {
      title: "System Replacement",
      desc: "Energy-efficient SEER2 upgrades that lower long-term cooling costs and utility bills."
    },
    {
      title: "Preventive Maintenance",
      desc: "Routine service plans that reduce breakdown risk all summer long in Texas heat."
    },
    {
      title: "Seasonal Tune-Ups",
      desc: "Pre-summer performance tuning so peak 100°F heat doesn't catch you off guard."
    },
    {
      title: "24/7 Emergency Repair",
      desc: "Around-the-clock dispatch when your AC quits at the worst possible time."
    }
  ];

  const warningSigns = [
    {
      title: "Humid or Sticky Air",
      desc: "Home feels muggy even when the AC is running continuously.",
      icon: Snowflake
    },
    {
      title: "Uneven Cooling",
      desc: "Some rooms stay warm while others feel ice cold or drafty.",
      icon: Sliders
    },
    {
      title: "Unusual Sounds",
      desc: "Buzzing, rattling, screeching, or grinding from indoor/outdoor unit.",
      icon: AlertTriangle
    },
    {
      title: "Musty or Bad Smells",
      desc: "Unpleasant, stale, or burning odor when the system kicks on.",
      icon: ShieldAlert
    },
    {
      title: "Short Cycling",
      desc: "System turning on and off more frequently than usual without cooling.",
      icon: Clock
    }
  ];

  const commonFixes = [
    { problem: "AC not cooling properly", cause: "Low refrigerant, dirty coils, or restricted airflow" },
    { problem: "Warm air from vents", cause: "Thermostat miscalibration or compressor startup issue" },
    { problem: "Water leaking from the unit", cause: "Blocked condensate drain line or frozen evaporator coil" },
    { problem: "Strange noises when running", cause: "Loose components, worn fan motor, or debris inside" },
    { problem: "Bad smell when running", cause: "Mold buildup in ductwork or clogged air filters" }
  ];

  const transparentPricing = [
    { service: "AC Diagnostic Service", price: "$120 – $350", desc: "Comprehensive system check & leak detection" },
    { service: "AC Component Repair", price: "$150 – $1,500", desc: "Capacitors, motors, relays, leak repairs" },
    { service: "New AC Installation", price: "$3,500 – $9,000+", desc: "Full central split or mini-split setup" },
    { service: "Annual Maintenance", price: "$150 – $300", desc: "Seasonal tune-up & preventative care plan" }
  ];

  const systemComparison = [
    {
      title: "Central AC System",
      coverage: "Whole-home cooling",
      bestFor: "Larger suburban homes in Cypress, Katy & Tomball",
      efficiency: "High SEER2 Rating",
      installPrice: "$3,500 – $9,000+",
      maintenance: "Annual servicing required",
      icon: Home
    },
    {
      title: "Ductless Mini Split",
      coverage: "Individual room & zone control",
      bestFor: "Older homes, garage conversions & sunroom additions",
      efficiency: "Ultra-High Zoned Efficiency",
      installPrice: "$3,100 – $6,500+",
      maintenance: "Lower but routine filter cleaning",
      icon: Building2
    }
  ];

  const whyChooseUs = [
    {
      title: "Real Field Experience",
      desc: "12,000+ AC jobs completed across Houston since 2013 — older units and modern high-efficiency systems."
    },
    {
      title: "Root-Cause Fixes",
      desc: "Certified technicians who diagnose the real problem — no guesswork, no unnecessary replacements."
    },
    {
      title: "Built for Houston Heat",
      desc: "Systems optimized for extreme 100°F heat and humidity to reduce long-term wear and energy waste."
    },
    {
      title: "Honest Upfront Service",
      desc: "Clear explanations before any work begins. No pressure, no upselling — just what your system needs."
    },
    {
      title: "100% In-House Team",
      desc: "Real Upfront AC technicians on every job — never subcontracted, always fully accountable."
    }
  ];

  const comparisonRows = [
    { feature: "Response Time", upfront: "Same-Day Dispatch", typical: "2–3 Day Delays" },
    { feature: "Diagnostics", upfront: "Honest, Root-Cause Fix", typical: "Upselling & Guesswork" },
    { feature: "Technicians", upfront: "In-House Certified Techs", typical: "Third-Party Subcontractors" },
    { feature: "Pricing Model", upfront: "Transparent & Upfront", typical: "Hidden Fees & Surcharges" }
  ];

  const localCoverage = [
    { name: "Tomball, TX (77375, 77377)", desc: "Residential neighborhoods along FM 2920, SH 249 and surrounding subdivisions." },
    { name: "Cypress, TX (77433, 77429)", desc: "Bridgeland, Towne Lake, Fairfield, Copper Lakes and Cy-Fair communities." },
    { name: "Houston, TX", desc: "North Houston, West Houston, Energy Corridor and surrounding metro areas." },
    { name: "Katy, TX", desc: "Rapidly growing western suburbs with high residential and commercial HVAC demand." },
    { name: "The Woodlands, TX", desc: "Master-planned communities with diverse residential and commercial system types." },
    { name: "Spring, TX (77373, 77379)", desc: "Established neighborhoods with varied system ages and maintenance needs." },
    { name: "Magnolia, TX", desc: "Rural residential, custom homes and acreage properties." },
    { name: "Sugar Land, TX", desc: "Southwest Houston suburbs — residential and commercial." },
    { name: "Greater Houston Metro", desc: "Same-day commercial & residential HVAC service across the metro." }
  ];

  const faqs = [
    {
      q: "How much does AC service cost in Houston, TX?",
      a: "AC service typically ranges from $120 to $350+. Repairs depend on the issue and usually cost between $150 and $1,500+. Regular maintenance helps reduce overall costs by preventing major breakdowns."
    },
    {
      q: "How often should AC be serviced in Texas?",
      a: "Because of Texas's long, hot summers, AC systems should be serviced at least once a year in spring before peak heat hits. High-use systems or homes with pets benefit from bi-annual tune-ups."
    },
    {
      q: "Why is my AC not cooling properly?",
      a: "Common culprits include clogged air filters, low refrigerant levels from a leak, dirty evaporator/condenser coils, or a miscalibrated thermostat."
    },
    {
      q: "Can AC be repaired the same day?",
      a: "Yes. At Upfront AC, our service trucks carry stocked OEM capacitors, fan motors, contactors, and refrigerant so 90%+ of repairs are fixed on the spot."
    },
    {
      q: "What is emergency AC repair?",
      a: "Emergency AC repair is 24/7 priority service dispatched when your cooling fails during extreme heat, pose health risks, or water leaks threaten interior ceiling damage."
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="EPA-Certified · Licensed · Insured in Texas"
        title="Same-Day AC Repair, Installation & Maintenance You Can Trust"
        subtitle="When your AC stops working in 100°F Houston heat, waiting isn’t an option. Since 2013, Upfront AC has completed 12,000+ AC jobs across Houston, Cypress, Katy, and The Woodlands — fast, certified, and upfront."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>12,000+ Jobs Completed Since 2013</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 (50+ Verified Reviews)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Fast, Reliable Cooling Restores with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Upfront Pricing
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Air conditioning services include everything needed to keep your cooling system running efficiently — inspection, repair, installation, replacement, and routine maintenance. In Houston’s extreme heat, we get your air cold fast.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+17138197908"
                  className="inline-flex items-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>Call (713) 819-7908</span>
                </a>

                <a
                  href="#get-in-touch"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 font-bold px-7 py-4 text-sm transition-all"
                >
                  <span>Request Free Estimate</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={serviceImg}
                  alt="Air Conditioning Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">Air Conditioning Excellence</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Houston, Cypress, Katy & The Woodlands
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHY AC SERVICES MATTER IN HOUSTON ────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Houston Climate Factor
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What are AC services & why they matter in Houston, TX?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                Air conditioning services include everything needed to keep your cooling system running efficiently — inspection, repair, installation, replacement, and routine maintenance.
              </p>
              <p>
                In Houston’s extreme heat and humidity, AC systems run longer and face more stress than in most cities. Over time, this leads to performance issues and unexpected breakdowns — especially during peak summer.
              </p>
            </div>

            <div className="space-y-3 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block mb-1">
                Common Signs Houston Homeowners Notice:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Home taking longer to cool even when AC runs continuously</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Warm or inconsistent airflow blowing from registers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Energy bills spiking without a clear explanation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Sudden breakdowns during the hottest afternoon hours</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT'S INCLUDED ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              WHAT'S INCLUDED
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Complete indoor cooling & air quality solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              Designed specifically for Houston’s climate and real-world usage — from quick fixes to full installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((srv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-6 hover:bg-white hover:border-[#005CE6]/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4 group-hover:bg-[#005CE6] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#005CE6] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                    {srv.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Upfront Verified
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: BEYOND THE BASICS ────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              BEYOND THE BASICS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              System optimization, diagnostics & full-property solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">System Optimization & Diagnostics</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Full system performance checks and static pressure tests</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Refrigerant leak detection & electronic sniffer inspection</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Airflow balancing across supply and return registers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Electrical contactor, capacitor, and motor diagnostics</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Smart thermostat setup, programming, and phone pairing</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Residential & Commercial Property Solutions</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Cooling for single-family homes, apartments & multi-family units</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Commercial HVAC support for offices, retail & warehouses</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Scalable cooling systems for larger properties and facilities</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Diagnosis to final testing — handled end to end</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Certified, in-house technicians (never subcontracted)</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: WARNING SIGNS & FREEZE-UP CALLOUT ──── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              WARNING SIGNS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Signs your AC needs attention before it breaks down
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Most AC problems give warning signs first. Catch them early to avoid expensive repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {warningSigns.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-5 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">{w.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">{w.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Freeze Up Alert Box */}
          <div className="rounded-3xl bg-amber-50/80 border border-amber-200 p-7 sm:p-8 flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-amber-900">Why does an AC system freeze up in Houston?</h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
                AC systems typically freeze due to restricted airflow, clogged filters, or low refrigerant levels. In Houston’s humid climate, this can happen quickly and reduce cooling performance. If ignored, it may lead to compressor damage and costly repairs.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: DIAGNOSTICS & COMMON FIXES ───────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              DIAGNOSTICS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Common AC problems we fix in Houston
            </h2>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-5">Problem</div>
              <div className="col-span-7">What’s Actually Causing It</div>
            </div>
            <div className="divide-y divide-slate-100">
              {commonFixes.map((item, i) => (
                <div key={i} className="grid grid-cols-12 p-4 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  <div className="col-span-5 font-bold text-slate-900">{item.problem}</div>
                  <div className="col-span-7 text-slate-600">{item.cause}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: TRANSPARENT PRICING & SYSTEM SELECTION ── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              AC service cost in Houston, TX
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              You always get clear, upfront pricing before any work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {transparentPricing.map((p, idx) => (
              <div key={idx} className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block mb-1">{p.service}</span>
                  <span className="text-2xl font-black text-slate-900">{p.price}</span>
                  <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Flat-Rate Guarantee
                </div>
              </div>
            ))}
          </div>

          {/* Central vs Ductless Comparison */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              CHOOSE THE RIGHT SYSTEM
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Central vs ductless AC: what's best for Houston homes?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systemComparison.map((sys, idx) => {
              const Icon = sys.icon;
              return (
                <div key={idx} className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-4">{sys.title}</h4>
                    
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Coverage:</span>
                        <span className="font-extrabold text-slate-900">{sys.coverage}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Best For:</span>
                        <span className="font-extrabold text-slate-900">{sys.bestFor}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Efficiency:</span>
                        <span className="font-extrabold text-slate-900">{sys.efficiency}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Estimated Install:</span>
                        <span className="font-black text-[#005CE6]">{sys.installPrice}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-500 font-bold">Maintenance:</span>
                        <span className="font-extrabold text-slate-900">{sys.maintenance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 7: WHY UPFRONT AC & DIFFERENCE TABLE ───── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              WHY UPFRONT AC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              How we actually deliver better results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {whyChooseUs.map((w, idx) => (
              <div key={idx} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{w.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              THE DIFFERENCE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Upfront AC vs typical HVAC companies in Houston
            </h3>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-4">Feature</div>
              <div className="col-span-4 text-[#005CE6] flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                Upfront AC
              </div>
              <div className="col-span-4 text-slate-400">Typical HVAC Companies</div>
            </div>
            <div className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="col-span-4 font-bold text-slate-900">{row.feature}</div>
                  <div className="col-span-4 font-black text-[#005CE6]">{row.upfront}</div>
                  <div className="col-span-4 text-slate-500 font-medium">{row.typical}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 8: LOCAL CASE STUDY ─────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Local Case Study</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
              Same-day cooling restored in Cypress
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  A homeowner in Cypress called when their AC stopped cooling during peak afternoon heat — warm air blowing from every vent and rising indoor temperatures.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  We found the evaporator coil partially frozen from a slow refrigerant leak. We thawed the coil, repaired the leak, recharged to manufacturer spec and cleaned the coil surface.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  Cooling fully restored within hours with improved airflow and noticeably lower energy usage over the next utility bill.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 9: LOCAL COVERAGE ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Service Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Local HVAC service across Greater Houston
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Family-owned and locally rooted — fast response across every corner of the metro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localCoverage.map((loc, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm flex items-start gap-3.5"
              >
                <MapPin className="w-5 h-5 text-[#005CE6] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{loc.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">{loc.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 10: FREQUENTLY ASKED QUESTIONS ─────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Answers to common questions about HVAC service in Houston, TX
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left text-slate-900 font-extrabold text-base hover:text-[#005CE6] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#005CE6] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-200/60 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 11: DIRECT EMERGENCY CTA ───────────────── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" />
              <span>Need Fast AC Service in Houston, TX?</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Book your AC service in Houston today
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              “Don't wait until your AC completely fails during peak heat. Get fast, reliable air conditioning services from Upfront AC.”
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+17138197908"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/40 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-5 h-5 fill-white" />
                <span>Call (713) 819-7908</span>
              </a>

              <a
                href="#get-in-touch"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-7 py-4 text-sm transition-all"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
