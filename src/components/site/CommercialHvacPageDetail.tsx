import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
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
  Flame,
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
  UserCheck,
  Check,
  MapPin,
  Utensils,
  ShoppingBag,
  Warehouse,
  Briefcase,
  ClipboardList
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-commercial-hvac.png";

export function CommercialHvacPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const commercialServices = [
    {
      title: "Commercial HVAC Repair",
      desc: "Same-day response, systematic diagnosis, and accurate repair on compressors, refrigerant leaks, electrical, and controls."
    },
    {
      title: "Rooftop Unit (RTU) Service",
      desc: "Packaged RTU repair and replacement, economizer calibration, condenser cleaning, and refrigerant verification."
    },
    {
      title: "Preventive Maintenance Contracts",
      desc: "Quarterly or monthly visits built around your equipment, occupancy schedule, and operational requirements."
    },
    {
      title: "Commercial AC Not Cooling",
      desc: "Systematic diagnosis of cooling failures in office buildings, retail spaces, and restaurants — root cause, not guesswork."
    },
    {
      title: "Electrical & Controls",
      desc: "Contactors, capacitors, control boards, VFDs, thermostats, and building automation interface repair."
    },
    {
      title: "Refrigerant & Coil Work",
      desc: "EPA-compliant leak detection, recharge (R-410A and legacy R-22), and condenser/evaporator coil cleaning."
    },
    {
      title: "Air Handler & Blower Repair",
      desc: "Restoring proper airflow across commercial duct networks — blower motors, belts, and balancing."
    },
    {
      title: "Restaurant & Food Service HVAC",
      desc: "Makeup air units, kitchen exhaust fans, and front-of-house vs back-of-house ventilation coordination."
    },
    {
      title: "Retail & Shopping Centers",
      desc: "Variable occupancy loads, display heat gain, and consistent comfort to support customer dwell time."
    },
    {
      title: "Warehouses & Light Industrial",
      desc: "Systems sized and zoned for high ceilings, cycling dock doors, and equipment heat loads."
    },
    {
      title: "Emergency HVAC for Businesses",
      desc: "Priority dispatch when a complete system failure threatens operations or occupant safety."
    },
    {
      title: "Permits & Compliance",
      desc: "Harris, Montgomery, and Fort Bend County permit compliance — TDLR licensed, EPA 608 certified."
    }
  ];

  const industryExpertise = [
    {
      icon: Briefcase,
      title: "Office Buildings",
      desc: "Multi-floor zoning, VAV box repairs, and building automation calibration. Keeping tenants comfortable with zero work disruption."
    },
    {
      icon: Utensils,
      title: "Restaurant & Food Service",
      desc: "Kitchen exhaust fans, makeup air units, grease-laden air systems, and dining room comfort cooling."
    },
    {
      icon: ShoppingBag,
      title: "Retail & Shopping Centers",
      desc: "High foot traffic, large open floor plans, constant door cycling, and display lighting heat gain."
    },
    {
      icon: Warehouse,
      title: "Warehouses & Light Industrial",
      desc: "High roof lines, dock doors that cycle constantly, and equipment-generated internal heat loads."
    }
  ];

  const whyChooseUs = [
    { title: "10+ Years Commercial Experience", desc: "Specializing in commercial HVAC systems across Tomball, Cypress, and Houston — not residential work with a commercial label." },
    { title: "True Diagnostic Process", desc: "We run systematic diagnostics to identify root causes so you pay for what is actually broken." },
    { title: "Transparent Service Agreements", desc: "Straightforward commercial contracts with documented visit frequency and zero hidden add-ons." },
    { title: "Facility Manager Friendly", desc: "Documented reports after every visit, working within your building schedule and compliance requirements." },
    { title: "Licensed, Certified & Insured", desc: "Texas TDLR Licensed, EPA 608 Certified, General Liability, Workers' Comp, and County permit compliance." },
    { title: "No Call-Center Operation", desc: "Direct access to experienced commercial HVAC professionals who understand your building systems." }
  ];

  const processSteps = [
    { num: "01", title: "Initial Contact & Triage", desc: "We ask the right questions upfront: building type, system tonnage, and urgency to dispatch the right equipment." },
    { num: "02", title: "Scheduled Dispatch", desc: "Specific arrival windows for standard calls and priority dispatch for active commercial emergencies." },
    { num: "03", title: "On-Site Diagnostic", desc: "Complete system check across electrical, refrigerant, mechanical, and building automation controls." },
    { num: "04", title: "Upfront Repair Quote", desc: "Clear price before any repair work begins with no surprise add-ons." },
    { num: "05", title: "Execution to Code", desc: "Work performed to ASHRAE and TDLR standards with attention to building occupancy constraints." },
    { num: "06", title: "Full Documentation", desc: "Detailed written service reports provided for property management and landlord records." }
  ];

  const localCoverage = [
    { name: "Tomball, TX (77375, 77377)", desc: "Commercial properties along FM 2920, SH 249, and Grand Parkway business corridors." },
    { name: "Cypress, TX (77433, 77429)", desc: "Retail centers, office parks, and restaurants throughout Cy-Fair and the 290 corridor." },
    { name: "Houston, TX", desc: "North Houston, West Houston, Energy Corridor, and commercial districts across Harris County." },
    { name: "Katy, TX", desc: "Fast-growing retail and office along the I-10 corridor and Grand Parkway." },
    { name: "The Woodlands, TX", desc: "Office parks, retail, medical facilities, and restaurants in Montgomery County." },
    { name: "Spring, TX (77373, 77379)", desc: "Established commercial properties and newer development along I-45 and FM 1960." },
    { name: "Magnolia, TX", desc: "Commercial properties in western Montgomery County." },
    { name: "Sugar Land, TX", desc: "Southwest Houston suburbs — residential and commercial." },
    { name: "Greater Houston Metro", desc: "Same-day commercial HVAC service across the metro." }
  ];

  const faqs = [
    {
      q: "How often should a commercial HVAC system be serviced?",
      a: "At minimum twice per year — before cooling season (spring) and before heating season (fall). High-use buildings, restaurant kitchens, and rooftop units in full sun typically benefit from quarterly service in Houston's climate."
    },
    {
      q: "How much does commercial HVAC maintenance cost in Houston, TX?",
      a: "Commercial maintenance contracts vary based on tonnage and RTU count, typically starting at $300–$800+ per quarter per building."
    },
    {
      q: "What causes commercial HVAC systems to fail?",
      a: "Continuous summer run times, extreme roof heat on flat commercial roofs, failed economizers pulling raw 100°F outdoor air, dirty condenser coils, and electrical contactor pitting."
    },
    {
      q: "What is a rooftop HVAC unit (RTU), and how long do they last?",
      a: "A rooftop unit is a self-contained heating & cooling package mounted on the roof. In Texas, well-maintained commercial RTUs last 15–20 years."
    },
    {
      q: "Why is my commercial AC not cooling the building properly?",
      a: "Common causes include stuck economizer dampers, refrigerant leaks, failed compressor capacitors, dirty coils, or VAV box control errors."
    },
    {
      q: "What is a commercial HVAC service agreement, and is it worth it?",
      a: "A commercial service agreement schedules periodic maintenance, provides priority dispatch, and lowers emergency repair rates."
    },
    {
      q: "Do restaurants need different HVAC systems than offices?",
      a: "Yes. Restaurants require dedicated kitchen makeup air units (MAU) and grease-rated exhaust fans synchronized with dining area cooling."
    },
    {
      q: "What size HVAC system does a commercial building need?",
      a: "Commercial buildings typically require 1 ton of cooling per 300 to 500 square feet, depending on window solar heat gain and internal occupant load."
    },
    {
      q: "How can I reduce HVAC costs for my business?",
      a: "Quarterly maintenance, programmable commercial thermostats, coil cleaning, and economizer tuning reduce energy bills by 15–25%."
    },
    {
      q: "What is emergency commercial HVAC repair and when should I call?",
      a: "Call immediately when cooling fails in server rooms, when restaurant kitchen ventilation shuts down, or during extreme heat advisories."
    }
  ];

  const specializations = [
    "HVAC Repair",
    "HVAC Service",
    "Attic Insulation",
    "Indoor Air Quality Upgrades",
    "Heating & Cooling Services",
    "Indoor Air Quality Evaluations",
    "Ultrviolet Air Treatment System",
    "Indoor Home Health Consultation",
    "HVAC Replacement"
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="24/7 Commercial HVAC · Houston, TX"
        title="Reliable Commercial Heating & Cooling for Every Houston Business"
        subtitle="When a commercial HVAC system fails in a Houston summer, it impacts productivity, customers, and operations. Upfront AC has been the go-to commercial contractor in Tomball for 10+ years — same-day response, accurate diagnosis, work done right."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>10+ Years Specializing in Commercial Systems</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 (50+ Verified Reviews)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>TDLR Licensed · EPA 608 Certified</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Heavy-Duty Rooftop & Package HVAC Solutions with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Priority Dispatch
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Rooftop units (RTUs), VAV multi-zone systems, kitchen makeup air units, and commercial cooling contracts. Servicing office buildings, restaurants, retail centers, and industrial facilities across Tomball & Houston.
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
                  <span>Request Service Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={serviceImg}
                  alt="Commercial HVAC Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">Commercial HVAC Specialists</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Tomball, Cypress & Greater Houston Metro
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: BUILT FOR BUSINESS ──────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Built for Business
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What commercial HVAC service covers — and why it's different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-slate-700 text-xs sm:text-sm font-medium">
            <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-sm space-y-2">
              <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block">System Scale & Complexity</span>
              <p className="leading-relaxed">
                Commercial buildings run 5 to 50+ ton systems with multi-zone controls, complex air handlers, and economizer dampers. Diagnosing a failure requires understanding component interaction, not just inspecting one condenser.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-sm space-y-2">
              <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block">Code & Compliance (ASHRAE 62.1)</span>
              <p className="leading-relaxed">
                Texas commercial buildings have specific requirements around ventilation rates, energy efficiency, and kitchen exhaust/makeup air. Our work is executed to exact TDLR & municipal code standards.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-sm space-y-2">
              <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block">Continuous Operation Demands</span>
              <p className="leading-relaxed">
                Commercial spaces cannot afford full-day work disruptions. We schedule intensive service off-hours and coordinate with facility managers to keep your business operating seamlessly.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-sm space-y-2">
              <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block">Texas Climate & Rooftop Heat</span>
              <p className="leading-relaxed">
                Rooftop units in direct sun on flat commercial roofs face extreme thermal stress along SH 249, FM 2920, and US 290. We build custom maintenance strategies around these heavy solar heat loads.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 text-center text-xs font-black text-[#005CE6] shadow-sm">
            ✓ 10+ Years Serving Commercial Clients Across Tomball, Cypress & Houston · Texas TDLR Licensed · EPA Section 608 Certified · Emergency Response Available
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
              Commercial HVAC services we provide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialServices.map((srv, idx) => (
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
                  Commercial Grade
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: INDUSTRY EXPERTISE ───────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Industry Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Specialized HVAC service by industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryExpertise.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">{ind.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: WHY CHOOSE UPFRONT AC & OUR PROCESS ─── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why Choose Upfront AC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What sets Upfront AC apart from other commercial contractors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {whyChooseUs.map((w, idx) => (
              <div key={idx} className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
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

          {/* Our 6-Step Process */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Our Process
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              What to expect when you call Upfront AC
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200/90 p-6 shadow-sm">
                <span className="text-xs font-black text-[#005CE6] block mb-2">{step.num}</span>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: LOCAL CASE STUDY ─────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Real Situation · Tomball Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
              Two-Story Office Building in Tomball, TX — Late August Call
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Second floor running hot for three weeks. Previous HVAC company cleared the call without finding root cause. Tenants complained continuously.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Technician found failed economizer damper stuck open pulling 98°F raw outside air past cooling coil + heavy dirty condenser coil. Repaired damper actuator and deep cleaned condenser.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  Second-floor temp normalized within one cycle. Zero tenant complaints over following two months. Property manager signed quarterly maintenance contract.
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
              Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Commercial HVAC service areas — Tomball, Cypress, Houston & Surrounding Cities
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Concentrated coverage along the SH 249, US 290, and Grand Parkway business corridors.
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
              Answers to common commercial HVAC questions
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
              <span>Book Commercial HVAC Quote in Tomball, TX — Or Schedule Emergency Repair</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Keep your business cool & operational
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Same-day response on most calls, emergency dispatch for urgent situations, and maintenance contracts with transparent itemized pricing.
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
                <span>Request Service Quote</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
