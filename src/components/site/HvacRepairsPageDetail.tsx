import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
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
  Snowflake,
  Flame,
  Building2,
  Home,
  ChevronDown,
  TrendingUp,
  Sparkles,
  Users,
  Quote,
  Zap,
  Sliders,
  ShieldAlert,
  GraduationCap,
  UserCheck,
  Check
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-hvac-repairs.png";

export function HvacRepairsPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const failureReasons = [
    "Extended run times during peak summer heat cause component fatigue",
    "High humidity accelerates corrosion on coils and electrical connections",
    "Clogged condensate drain lines (a very common Houston-specific issue)",
    "Dirty filters left too long restrict airflow and cause the system to overheat",
    "Seasonal inactivity allows dust, debris, and pest activity to create internal blockages",
    "Aging systems that were never sized correctly for local heat and humidity loads"
  ];

  const fullServices = [
    {
      title: "Diagnostic Services",
      desc: "Every call starts with a full system inspection — electrical, refrigerant, airflow, thermostat and mechanical — before any pricing."
    },
    {
      title: "Cooling System Repair",
      desc: "Compressor diagnosis, refrigerant leak detection & recharge, coil cleaning, capacitor and contactor replacement."
    },
    {
      title: "Heating System Repair",
      desc: "Furnace ignition, heat pump performance, blower motor, heat exchanger, gas valve and pressure switch repair."
    },
    {
      title: "Airflow & Duct Repair",
      desc: "Diagnose uneven temperatures, seal collapsed or leaking attic ductwork, and correct return air restrictions."
    },
    {
      title: "Thermostat & Controls",
      desc: "Smart thermostat calibration, control board diagnosis, and wiring or communication faults between units."
    },
    {
      title: "24/7 Emergency HVAC Repair",
      desc: "Same-day priority dispatch in Tomball and Cypress with no after-hours surcharge for most service areas."
    }
  ];

  const symptomList = [
    { symptom: "HVAC not turning on", cause: "Tripped breaker, failed capacitor, or control board issue" },
    { symptom: "Blowing hot air", cause: "Low refrigerant, failed compressor, or thermostat miscalibration" },
    { symptom: "Loud noise or rattling", cause: "Loose components, worn blower motor, or debris in the system" },
    { symptom: "Leaking water", cause: "Blocked condensate drain or frozen evaporator coil" },
    { symptom: "Short cycling", cause: "Oversized unit, refrigerant issue, or dirty coil restricting airflow" },
    { symptom: "Burning smell", cause: "Electrical issue, overheating motor, or debris on heat exchanger" },
    { symptom: "System freezing up", cause: "Low refrigerant or restricted airflow — needs urgent repair" },
    { symptom: "Not cooling the house", cause: "Coil fouling, refrigerant loss, or an undersized system" },
    { symptom: "Thermostat not responding", cause: "Wiring fault, dead thermostat, or communication failure" },
    { symptom: "Compressor not working", cause: "Electrical failure, hard start issue, or end-of-life compressor" }
  ];

  const whyChooseUs = [
    {
      title: "10+ Years Local Experience",
      desc: "Field expertise across Tomball, Cypress, Bridgeland, Fairfield and 77377 / 77375 / 77433 / 77429."
    },
    {
      title: "Licensed & EPA-Certified",
      desc: "Licensed Texas HVAC contractor (TACLA133609C), fully insured with EPA-compliant refrigerant handling."
    },
    {
      title: "No Upselling Model",
      desc: "Honest assessments only — we don't recommend parts you don't need or push unnecessary replacements."
    },
    {
      title: "Same-Day Service & 1-Yr Warranty",
      desc: "Service trucks stocked with common parts. Most repairs finish the same visit with a full 1-year repair warranty."
    }
  ];

  const technicianRequirements = [
    "3–5 years of hands-on technical HVAC field experience",
    "Background and drug screening — every technician passes a thorough check",
    "Registered with the State of Texas as a Licensed HVAC Technician",
    "EPA Universal Certification — qualified to handle all types of refrigerants",
    "Customer-first mindset — friendly, respectful, and focused on your comfort"
  ];

  const localCoverage = [
    { name: "Houston, TX", desc: "North, West & Central Houston — Heights, Memorial, Westchase and beyond." },
    { name: "Tomball, TX (77375, 77377)", desc: "Neighborhoods along FM 2920, SH 249 and surrounding subdivisions." },
    { name: "Cypress, TX (77433, 77429)", desc: "Bridgeland, Towne Lake, Fairfield, Copper Lakes and Cy-Fair communities." },
    { name: "Katy, TX", desc: "Fast-growing western suburbs with high residential HVAC demand." },
    { name: "Sugar Land, TX", desc: "Southwest Houston suburbs — residential and commercial." },
    { name: "Spring, TX (77373, 77379)", desc: "Established neighborhoods with frequent repair needs." },
    { name: "Magnolia, TX", desc: "Reliable HVAC dispatch for north-metro residential customers." },
    { name: "The Woodlands, TX", desc: "Master-planned communities with varied system types." },
    { name: "Greater Houston Metro", desc: "Emergency commercial HVAC service across the metro." }
  ];

  const faqs = [
    {
      q: "Why is my HVAC system not working?",
      a: "The most common causes are a failed capacitor, tripped breaker, refrigerant loss, clogged filter, or thermostat issue. In Houston's climate, dirty coils and blocked condensate drains are also frequent culprits. A proper diagnosis is the only way to identify the actual cause."
    },
    {
      q: "How much does HVAC repair cost in Houston?",
      a: "Standard HVAC repairs typically range from $150 to $1,500 depending on the component (capacitors, fan motors, leak repairs, or hard start kits). We provide transparent, upfront quotes before starting any work."
    },
    {
      q: "Can HVAC be repaired the same day in Tomball or Cypress?",
      a: "Yes. Our service trucks are stocked with common OEM parts so 90%+ of repair calls are resolved during the first visit."
    },
    {
      q: "What causes HVAC system failure in Houston?",
      a: "Extended run times during 100°F summers, extreme humidity corroding electrical contactors, clogged condensate lines, and severe seasonal temperature swings."
    },
    {
      q: "Why is my HVAC blowing hot air?",
      a: "Blowing warm air usually indicates a loss of refrigerant, a frozen evaporator coil, a bad condenser capacitor, or a compressor failure."
    },
    {
      q: "What is emergency HVAC repair, and when do I need it?",
      a: "Emergency repair is 24/7 priority service when cooling fails during extreme heat advisories, heat stops working during winter freezes, or water leaks threaten ceiling damage."
    },
    {
      q: "How long does HVAC repair take?",
      a: "Most repairs take between 1 to 3 hours once on site."
    },
    {
      q: "Why is my HVAC making a loud noise?",
      a: "Rattling or buzzing often signals loose fan blades, a failing capacitor, or a worn motor bearing. Screeching indicates a damaged belt or motor."
    },
    {
      q: "Should I repair or replace my HVAC system?",
      a: "If your system is under 10 years old and the repair cost is reasonable, repair is recommended. If it is 12+ years old, uses R-22 Freon, or requires major compressor work, replacement is usually more cost-effective."
    }
  ];

  const specializations = [
    "HVAC Repair",
    "HVAC Service",
    "Attic Insulation",
    "Indoor Air Quality Upgrades",
    "Heating & Cooling Services",
    "Indoor Air Quality Evaluations",
    "Ultraviolet Air Treatment System",
    "Indoor Home Health Consultation",
    "HVAC Replacement"
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Emergency HVAC Repair · Tomball, TX"
        title="Same-Day HVAC Repair & Emergency AC Service"
        subtitle="When your HVAC system stops working in a Houston summer or fails on a cold Tomball night, every hour matters. Upfront AC delivers honest diagnostics, upfront pricing, and same-day repairs across Tomball, Cypress and Greater Houston."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Emergency Repair • Tomball & Cypress, TX</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 (40+ Verified Reviews)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Honest Diagnostics & Same-Day Dispatch with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  1-Year Repair Warranty
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Upfront AC delivers accurate, root-cause diagnostics and flat-rate pricing before any work begins. Fully stocked service trucks ready to restore cooling or heating immediately.
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
                  href="/request-free-estimate"
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
                  alt="HVAC Repairs Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">HVAC Repair Specialists</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Tomball, Cypress, Katy & Greater Houston
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHY HVAC SYSTEMS BREAK DOWN FAST ────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Climate Impact
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why HVAC systems in Tomball & Cypress break down faster than you'd expect
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                Most homeowners are surprised when their HVAC system develops problems — especially on a unit that’s only a few years old. But if you’ve lived in Northwest Houston, Tomball, or Cypress, you already know the conditions these systems deal with.
              </p>
              <p>
                Houston’s climate is one of the most demanding in the country for HVAC equipment. Summers push systems to run nearly non-stop from May through September. Humidity levels stay elevated for months, which accelerates wear on components like the evaporator coil, blower motor, and condensate drain. And when cold fronts roll through in winter — sometimes dropping temperatures 30–40 degrees overnight — heating systems that have been sitting idle suddenly have to work at full capacity.
              </p>
            </div>

            <div className="space-y-3 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block mb-1">
                Common Reasons HVAC Systems Break Down in This Area:
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-bold">
                {failureReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: FULL-SERVICE HVAC REPAIR ─────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Full-Service HVAC Repair
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What HVAC repair covers — every system, every problem
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              From a tripped breaker to a failed compressor, our in-house technicians handle the full range of cooling, heating, airflow and controls work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullServices.map((srv, idx) => (
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
                  Same-Day Verified
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: COMMON SYMPTOMS DIAGNOSED ────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Multi-Point Service
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What's actually wrong with your HVAC? Common symptoms we diagnose
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Each symptom usually points to a different cause — which is why a real diagnosis matters before any parts are replaced.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-5">Symptom You Notice</div>
              <div className="col-span-7">What’s Actually Causing It</div>
            </div>
            <div className="divide-y divide-slate-100">
              {symptomList.map((item, i) => (
                <div key={i} className="grid grid-cols-12 p-4 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  <div className="col-span-5 font-bold text-slate-900">{item.symptom}</div>
                  <div className="col-span-7 text-slate-600">{item.cause}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: TECHNICIAN STANDARDS & WARRANTY ───────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Certified Technician Standards</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Certified HVAC Technicians
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                At Upfront AC, our Certified HVAC Technicians are held to the highest standards in the industry. We don’t just hire based on experience — we invest in ongoing training and performance to ensure every technician delivers exceptional service.
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block">
                  Minimum Technician Requirements:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-slate-800">
                  {technicianRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5">
                      <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-[#005CE6] to-[#0047B3] text-white p-8 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold">1-Year Repair Guarantee</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                  Texas Choice HVAC at Upfront AC has been repairing AC systems for more than 10 years. We want you to be cool and comfortable, and we’ll guarantee any repairs we make through a full one-year warranty.
                </p>
                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-cyan-200">
                  <span>100% Workmanship Guarantee</span>
                  <span className="text-white font-black">TACLA133609C</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 5: WHY UPFRONT AC & CASE STUDY ──────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why Upfront AC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Tomball & Cypress homeowners choose Upfront AC
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              There’s no shortage of HVAC companies in the Houston metro. What’s harder to find is a company that shows up on time, diagnoses accurately, and fixes the problem without inventing additional ones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          {/* Local Case Study */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Local Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
              Real HVAC repair — a recent call from Cypress
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  A homeowner called on a Wednesday in July. Their system had been struggling for days — the house wouldn't get below 80°F with the thermostat set to 72. They'd already changed the filter.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Same-day dispatch. Our technician diagnosed a refrigerant leak and clogged coils, repaired the leak, recharged the system with refrigerant, and completed a full coil cleaning.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  Full cooling capacity restored before the technician left — under 3 hours on-site. The homeowner hadn't realized how long the problem had been developing.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: LOCAL COVERAGE ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Local Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              HVAC repair service areas — Tomball, Cypress & Greater Houston
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Family-owned and locally rooted — we serve the communities we live in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localCoverage.map((loc, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6 shadow-sm flex items-start gap-3.5"
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

      {/* ── SECTION 7: FREQUENTLY ASKED QUESTIONS ─────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
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
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden"
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
                        className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-4"
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

      {/* ── SECTION 8: SPECIALIZATIONS ─────────────────────── */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-center max-w-4xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 w-full mb-2">
              We Specialize In
            </span>
            {specializations.map((spec, i) => (
              <span
                key={i}
                className="rounded-full bg-slate-100 border border-slate-200/90 px-4 py-2 text-xs font-extrabold text-slate-800 shadow-sm"
              >
                {spec}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 9: DIRECT EMERGENCY CTA ────────────────── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" />
              <span>Need Fast Emergency AC Repair Service in Houston?</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Book your HVAC repair in Tomball or Cypress today
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Same-day service available · Free diagnostic estimate · Licensed, insured & EPA-certified · No upselling — only what your system actually needs.
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
                href="/request-free-estimate"
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
