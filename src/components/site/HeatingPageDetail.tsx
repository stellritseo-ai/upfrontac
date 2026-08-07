import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowRight,
  Star,
  AlertTriangle,
  Wrench,
  Snowflake,
  Building2,
  Home,
  ChevronDown,
  TrendingUp,
  Sparkles,
  Users,
  Quote,
  Zap,
  Sliders,
  DollarSign,
  Heart,
  Check,
  ShieldAlert,
  MapPin
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-heating.png";

export function HeatingPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const includedServices = [
    {
      title: "Furnace & Heater Diagnostics",
      desc: "Detailed diagnostics for gas & electric heating systems that won't start or keep cycling unexpectedly."
    },
    {
      title: "Heating Repair",
      desc: "Performance repairs when airflow drops, pilot lights flicker, or furnace ignition becomes inconsistent."
    },
    {
      title: "New Heating Installation",
      desc: "Full heating installation for systems that have reached end-of-life, sized for Texas freezes."
    },
    {
      title: "Furnace Replacement",
      desc: "Upgrade older, inefficient 80% AFUE systems to modern high-efficiency 96%+ AFUE gas furnaces."
    },
    {
      title: "Heating Maintenance",
      desc: "Scheduled preventative care to keep working units stable, safe, and reliable for cold snaps."
    },
    {
      title: "Seasonal Furnace Tune-Ups",
      desc: "Pre-winter burner cleaning, safety switch testing, and heat exchanger inspection before the first front."
    },
    {
      title: "24/7 Emergency Repair",
      desc: "Around-the-clock dispatch when your heating quits in the middle of a cold night."
    },
    {
      title: "Thermostat & Smart Controls",
      desc: "Calibration and setup for consistent, accurate temperature control and heat staging."
    },
    {
      title: "CO & Safety Inspections",
      desc: "Carbon monoxide leak checks and full system safety inspections for complete family peace of mind."
    }
  ];

  const warningSigns = [
    { title: "Heater On, No Warmth", desc: "System runs continuously but doesn't actually warm the house.", icon: Snowflake },
    { title: "Uneven Heating", desc: "Some rooms feel icy cold while others stay uncomfortably hot.", icon: Sliders },
    { title: "Banging or Rattling", desc: "Loud clicking, banging, popping, or rattling noises during startup.", icon: AlertTriangle },
    { title: "Strange Smells", desc: "Burning, musty, or chemical odors when the furnace kicks on.", icon: ShieldAlert },
    { title: "Short Cycling", desc: "System turns on and off too frequently without reaching target temperature.", icon: Clock },
    { title: "Energy Bills Rising", desc: "Sudden spike in winter gas or electric bills with no clear explanation.", icon: TrendingUp }
  ];

  const commonFixes = [
    { problem: "Furnace not heating", cause: "Ignition failure, clogged filter, or gas supply issue" },
    { problem: "Heater blowing cold air", cause: "Thermostat error, limit switch trip, or airflow restriction" },
    { problem: "Heater not working at all", cause: "Electrical failure, blown fuse, or worn blower motor" },
    { problem: "Strange noises from furnace", cause: "Loose components, cracked belt, or motor bearing wear" },
    { problem: "System won't turn on", cause: "Faulty wiring, dead thermostat, or control board issue" },
    { problem: "Gas smell near unit", cause: "Possible gas valve or line leak — urgent repair required" }
  ];

  const pricingList = [
    { service: "Basic Heating Inspection", price: "$80 – $150+", desc: "System safety & electrical check" },
    { service: "Minor Heating Repairs", price: "$150 – $400+", desc: "Flame sensors, igniters, limit switches" },
    { service: "Major Heating Repairs", price: "$400 – $1,500+", desc: "Blower motors, gas valves, control boards" },
    { service: "Furnace Installation", price: "$3,000 – $7,500+", desc: "High-efficiency gas or electric setup" },
    { service: "Full System Replacement", price: "$4,000 – $10,000+", desc: "Complete heating & cooling matched unit" },
    { service: "Annual Maintenance Plan", price: "$120 – $300+", desc: "Pre-winter tune-up & seasonal care" }
  ];

  const systemComparison = [
    {
      title: "Furnace System (Gas / Electric)",
      speed: "Faster Heating Output",
      efficiency: "Moderate to High (Up to 96%+ AFUE)",
      bestFor: "Sharp cold snaps & large Texas homes",
      cost: "Higher BTU Output / Long-Term Value",
      icon: Flame
    },
    {
      title: "Heat Pump / Mini-Split",
      speed: "Moderate Gentle Heating",
      efficiency: "Ultra-High Year-Round Efficiency",
      bestFor: "Mild winters & zoned room control",
      cost: "Lower Operating Cost Long-Term",
      icon: Snowflake
    }
  ];

  const whyChooseUs = [
    { title: "Proven Track Record", desc: "12,000+ HVAC jobs completed serving Tomball & Houston since 2013." },
    { title: "Skilled, Certified Techs", desc: "EPA-certified professionals trained on both modern high-efficiency & older systems." },
    { title: "Built for Texas Weather", desc: "Systems optimized for Texas weather swings — not temporary band-aids." },
    { title: "Faster Emergency Response", desc: "Same-day service in most cases, plus weekend & 24/7 emergency availability." },
    { title: "Honest Service Model", desc: "No upselling — clear explanations and flat-rate pricing before any work starts." },
    { title: "True Diagnostic Approach", desc: "We identify root causes — not temporary fixes or guesswork." }
  ];

  const comparisonRows = [
    { feature: "Response Time", upfront: "Same-Day Dispatch", typical: "2–3 Day Delays" },
    { feature: "Diagnostics", upfront: "Honest, Root-Cause Fix", typical: "Symptom-Only Patch" },
    { feature: "Technicians", upfront: "In-House Certified Techs", typical: "Third-Party Subcontractors" },
    { feature: "Pricing Model", upfront: "Transparent & Upfront", typical: "Hidden Fees & Surcharges" },
    { feature: "Recommendations", upfront: "Honest, No Upselling", typical: "Pushing Unneeded Replacements" }
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
    { name: "Greater Houston Metro", desc: "Same-day commercial HVAC service across the metro." }
  ];

  const faqs = [
    {
      q: "How much does heating repair cost in Tomball, TX?",
      a: "Heating repair typically ranges from $150 to $1,500+, depending on the issue. Minor fixes like igniter or flame sensor replacement cost less, while major repairs like blower motors or heat exchangers run higher. Regular maintenance helps prevent major breakdowns."
    },
    {
      q: "Why is my furnace not heating properly?",
      a: "Common causes include ignition failure, clogged air filters, a tripped safety limit switch, or a gas supply error."
    },
    {
      q: "Can the furnace be repaired the same day?",
      a: "Yes. Our service trucks carry common igniters, flame sensors, pressure switches, and gas valves so most heating repairs are finished during the initial visit."
    },
    {
      q: "How often should heating systems be serviced?",
      a: "Heating systems should be inspected and tuned up at least once a year in late autumn before the first Texas cold front."
    },
    {
      q: "What is an emergency heating repair Tomball?",
      a: "Emergency repair is 24/7 priority service dispatched when your heater fails during sub-freezing weather or when a gas odor/CO alert occurs."
    },
    {
      q: "Is a furnace tune-up necessary?",
      a: "Yes. A tune-up cleans soot buildup from burners, verifies proper carbon monoxide venting, and ensures safe ignition when cold weather arrives."
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
        eyebrow="Emergency Heating Services · Tomball, TX"
        title="Furnace Repair, Emergency Installation & Maintenance Done Right"
        subtitle="When your heater stops working on a cold Tomball night, waiting until morning isn’t an option. Since 2013, Upfront AC has completed 12,000+ heating repairs, installations, and tune-ups across Tomball, Cypress, and Northwest Houston."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>12,000+ Heating Jobs Since 2013</span>
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
                Fast, Certified Heating Restores with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Carbon Monoxide Safety Testing
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Real technicians, same-day solutions, and repairs that actually last. Upfront AC provides complete gas furnace repair, heat pump maintenance, heat exchanger checks, and emergency heating response across Tomball & Cypress.
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
                  alt="Heating & Furnace Repair Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">Heating & Furnace Excellence</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Tomball, Cypress & Northwest Houston
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: HOW HEATING SYSTEMS WORK & FAIL ──────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              How They Work & Fail
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              When your heating stops working in Tomball, you need it fixed fast
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                Heating systems in Tomball homes — whether furnaces, heat pumps, or central units — are designed to sit idle for long periods and then suddenly handle cold weather. That’s exactly where problems begin.
              </p>
              <p>
                In areas like Tomball, Magnolia, and Cypress, most systems stay unused for months. When temperatures drop, they’re forced to run immediately at full capacity — often exposing hidden issues.
              </p>
            </div>

            <div className="space-y-3 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block mb-1">
                Why Homeowners Call Us During Cold Fronts:
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-bold">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>The heater turns on, but the air feels cold or weak</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>System struggles or fails to start after months of summer inactivity</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>Some rooms stay warm while others remain icy cold</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>The unit shuts off unexpectedly during operation (limit switch trip)</span>
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
              Complete heating solutions we provide
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              We don’t approach heating as a ‘quick fix job.’ Most systems show warning signs long before they fail completely.
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
                  Heating Certified
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: WARNING SIGNS & DIAGNOSTICS TABLE ─────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              WARNING SIGNS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Early signs your heater is about to fail
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {warningSigns.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div key={idx} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{w.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Table */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              DIAGNOSTICS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Real heating problems we solve daily
            </h3>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-5">Issue Homeowners Notice</div>
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

      {/* ── SECTION 4: TRANSPARENT PRICING & SYSTEM COMPARISON ─ */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Heating service cost in Tomball, TX
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Realistic pricing based on common service requests in Tomball, Cypress, and Northwest Houston.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {pricingList.map((p, idx) => (
              <div key={idx} className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block mb-1">{p.service}</span>
                  <span className="text-2xl font-black text-slate-900">{p.price}</span>
                  <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Flat-Rate Upfront
                </div>
              </div>
            ))}
          </div>

          {/* Furnace vs Heat Pump Comparison */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              CHOOSE THE RIGHT SYSTEM
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Furnace vs heat pump: what works best in Tomball?
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
                    
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Heating Speed:</span>
                        <span className="font-extrabold text-slate-900">{sys.speed}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Energy Efficiency:</span>
                        <span className="font-extrabold text-slate-900">{sys.efficiency}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500 font-bold">Best For:</span>
                        <span className="font-extrabold text-slate-900">{sys.bestFor}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-500 font-bold">Operating Cost:</span>
                        <span className="font-black text-[#005CE6]">{sys.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: WHAT MAKES US DIFFERENT & COMPARISON ── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              WHAT MAKES US DIFFERENT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Beyond just 'service' — we solve the actual problem
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
              Upfront AC vs typical HVAC companies in Tomball
            </h3>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-4">Feature</div>
              <div className="col-span-4 text-[#005CE6]">Upfront AC</div>
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

      {/* ── SECTION 6: LOCAL CASE STUDY ─────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Local Case Study</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
              Same-day heating restored in Tomball
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Last winter, a homeowner near Tomball reported their heater blowing cold air late at night during a sharp cold front.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Same-day repair with ignition system replacement, gas valve calibration, and full burner cleaning to address airflow restrictions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  Heat fully restored within hours, with system efficiency immediately improved for the rest of the winter season.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 7: LOCAL COVERAGE ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Service Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Emergency heating services across Tomball & nearby areas
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

      {/* ── SECTION 8: FREQUENTLY ASKED QUESTIONS ─────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Answers to common questions about heating services in Tomball, TX
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

      {/* ── SECTION 9: SPECIALIZATIONS ─────────────────────── */}
      <section className="py-14 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-center max-w-4xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 w-full mb-2">
              We Specialize In
            </span>
            {specializations.map((spec, i) => (
              <span
                key={i}
                className="rounded-full bg-white border border-slate-200/90 px-4 py-2 text-xs font-extrabold text-slate-800 shadow-sm"
              >
                {spec}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 10: DIRECT EMERGENCY CTA ───────────────── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" />
              <span>Need Fast Heating Service in Tomball, TX?</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Book your heating service in Tomball today
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Don't wait until your heater completely fails during a cold snap. Get fast, reliable furnace & heating services from Upfront AC.
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
