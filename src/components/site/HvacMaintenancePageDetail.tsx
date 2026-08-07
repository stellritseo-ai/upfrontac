import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowRight,
  Star,
  AlertTriangle,
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
  DollarSign,
  Heart,
  UserCheck,
  Check,
  ClipboardCheck,
  MapPin
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-hvac-maintenance.png";

export function HvacMaintenancePageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const includedServices = [
    {
      title: "Coil Cleaning",
      desc: "Evaporator and condenser coils cleaned to restore heat transfer and stop your system from working overtime."
    },
    {
      title: "Refrigerant & Leak Check",
      desc: "Charge verified to spec and a full leak inspection — low refrigerant is the most overlooked cause of poor cooling."
    },
    {
      title: "Capacitor & Contactor Testing",
      desc: "These fail without warning and shut systems down. Catching them early is the clearest return on a tune-up."
    },
    {
      title: "Blower & Airflow Tuning",
      desc: "RPM, amperage and bearings checked. Supply and return airflow measured to find imbalances and duct leakage."
    },
    {
      title: "Condensate Drain Flush",
      desc: "Critical for Tomball and Cypress homes — clogged drain lines cause water damage and system shutdowns."
    },
    {
      title: "Heating System Check",
      desc: "Burner inspection, heat exchanger, ignition, gas pressure and heat pump performance — tested and verified."
    },
    {
      title: "Thermostat Calibration",
      desc: "Confirms setpoint temperatures actually match system performance across every cooling and heating cycle."
    },
    {
      title: "Electrical & Mechanical Scan",
      desc: "Connections tightened, voltage/amperage read on motors & compressors, control board scanned for fault codes."
    },
    {
      title: "Written Inspection Report",
      desc: "Every visit ends with a documented summary of what was inspected, corrected, and what to watch for — zero pressure."
    }
  ];

  const multiPointChecklist = [
    "Evaporator & condenser coil chemical cleaning",
    "Refrigerant level check & leak inspection",
    "Capacitor and contactor microfarad testing",
    "Blower motor inspection & bearing lubrication",
    "Condensate drain line flush & pan treatment",
    "Thermostat calibration & staging check",
    "Furnace burner & heat exchanger safety check",
    "Gas pressure & control valve safety testing",
    "Heat pump performance verification",
    "Safety control & limit switch testing",
    "Electrical connections tightened across terminals",
    "Motor & compressor voltage/amperage readings",
    "Control board diagnostic fault code scan",
    "Supply & return airflow static pressure measurement",
    "Accessible attic ductwork visual inspection",
    "Filter condition review & airflow type match"
  ];

  const frequencyGuide = [
    { situation: "Standard Tomball / Cypress Home", freq: "2x per year (spring + fall)" },
    { situation: "Home with Pets or Dusty Attic", freq: "2x per year, filter check every 1–2 months" },
    { situation: "System Older than 10 Years", freq: "2x per year minimum; annual duct inspection" },
    { situation: "Commercial or High-Occupancy Property", freq: "Quarterly or per manufacturer spec" },
    { situation: "Rental Property / Landlord-Managed", freq: "Annual minimum; bi-annual recommended" },
    { situation: "New System (First 2 Years)", freq: "Annual — warranty compliance baseline" }
  ];

  const warningSigns = [
    "Home takes longer than usual to reach setpoint on hot days",
    "Higher energy bills without a change in usage patterns",
    "Unusual noises — rattling, grinding or squealing bearings",
    "Musty or stale smell when the blower kicks on",
    "Inconsistent temperatures with hot & cold spots in rooms",
    "Short cycling — system turns on and off in quick intervals",
    "Water standing around the indoor air handler unit"
  ];

  const credentials = [
    "EPA Section 608 Certified — required for all refrigerant handling",
    "Fully Insured — liability and workers' compensation coverage",
    "Harris County and Montgomery County permit-compliant",
    "Licensed HVAC Contractor in Texas (TACLA133609C)",
    "Manufacturer warranty compliance maintained"
  ];

  const localCoverage = [
    { name: "Tomball, TX (77375, 77377)", desc: "Residential neighborhoods along FM 2920, SH 249 and surrounding subdivisions." },
    { name: "Cypress, TX (77433, 77429)", desc: "Bridgeland, Towne Lake, Fairfield, Copper Lakes and Cy-Fair communities." },
    { name: "Houston, TX", desc: "North Houston, West Houston, Energy Corridor and surrounding metro areas." },
    { name: "Katy, TX", desc: "Rapidly growing western suburbs with high residential and commercial HVAC demand." },
    { name: "The Woodlands, TX", desc: "Master-planned communities with diverse residential and commercial system types." },
    { name: "Spring, TX (77373, 77379, 77386)", desc: "Established neighborhoods with varied system ages and maintenance needs." },
    { name: "Magnolia, TX", desc: "Rural residential, custom homes and acreage properties." },
    { name: "Sugar Land, TX", desc: "Southwest Houston suburbs — residential and commercial." }
  ];

  const faqs = [
    {
      q: "How often should HVAC be maintained in Texas?",
      a: "Twice per year is the standard recommendation in Texas — once in spring before summer heat arrives, and once in fall before heating season. For older systems or homes with pets, filter checks every 1–2 months are advisable."
    },
    {
      q: "What is included in HVAC maintenance?",
      a: "A full tune-up includes coil cleaning, checking refrigerant charge, electrical contactor/capacitor testing, flushing condensate drain lines, blower motor amperage check, thermostat calibration, and a written report."
    },
    {
      q: "How much does HVAC maintenance cost in Texas?",
      a: "Standard seasonal tune-ups range from $120 to $300 annually depending on system count and maintenance plan coverage."
    },
    {
      q: "Is HVAC maintenance worth it?",
      a: "Yes. Regular maintenance extends system lifespan from 11 years to 15–18 years, lowers summer electric bills by up to 20%, and prevents sudden 100°F emergency breakdowns."
    },
    {
      q: "What happens during an AC tune-up?",
      a: "Technicians inspect electrical parts, wash outdoor condenser coils, clear drain lines, test refrigerant pressures, and verify temperature drop across evaporator coils."
    },
    {
      q: "How long does HVAC maintenance take?",
      a: "A thorough single-system maintenance visit takes between 60 to 90 minutes."
    },
    {
      q: "What is the best time for HVAC maintenance in Texas?",
      a: "Spring (March–April) for cooling tune-ups and Autumn (October–November) for furnace tune-ups."
    },
    {
      q: "Do landlords need HVAC maintenance in Texas?",
      a: "Yes. Landlord maintenance prevents tenant emergency calls, avoids costly water damage claims from clogged drains, and preserves property value."
    },
    {
      q: "What's the difference between HVAC repair and maintenance?",
      a: "Maintenance is scheduled proactive care to prevent breakdowns. Repair is reactive fixing when a component has already failed."
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
        eyebrow="HVAC Maintenance Tomball, TX"
        title="Keep Your HVAC System Running Smoothly All Year Long"
        subtitle="In Tomball, where summer pushes past 100°F for weeks and humidity never lets up, your HVAC isn’t a comfort appliance — it’s critical infrastructure. Upfront AC delivers systematic tune-ups built for Texas conditions."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Texas-Built Maintenance Checklists</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 (40+ Verified Reviews)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Licensed · Insured · Family Owned</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Thorough HVAC Tune-Ups that Extend Lifespan to{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  15–18 Years
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Sustained Texas heat and humidity accelerate coil corrosion, drain line algae, and capacitor fatigue. Our structured maintenance visits catch early-stage failures before they force emergency repairs.
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
                  <span>Request Maintenance Plan</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={serviceImg}
                  alt="HVAC Maintenance Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">HVAC Maintenance Specialists</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Tomball, Cypress, Katy & The Woodlands
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHY MAINTENANCE MATTERS ─────────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why Maintenance Matters
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What HVAC maintenance really means — and why Texas changes everything
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                HVAC preventive maintenance is a scheduled inspection and service visit that keeps your heating and cooling system operating at its best. It goes well beyond changing the filter — a proper tune-up includes checking refrigerant levels, cleaning coils, testing electrical components, inspecting ductwork, and verifying efficiency.
              </p>
              <p>
                Tomball and Cypress sit in one of the most demanding HVAC climate zones in the country. Sustained heat and humidity accelerate wear on coils, drain lines, blower motors and electrical connections in ways drier climates never see.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <p>
                Add the fact that many homes here were built between the late 1990s and 2010s with original ductwork, and seasonal maintenance stops being optional. It’s the difference between a system that lasts 15–18 years and one that fails at year 11.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#005CE6] uppercase">10+ Years in Northwest Houston</span>
                <span className="text-xs font-black text-slate-900">TACLA133609C</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT'S INCLUDED ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              What's Included
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What's included in an Upfront AC maintenance visit
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              Structured around the actual failure modes we see in Texas homes — not a generic national checklist.
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
                  Verified Protocol
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: 16-POINT CHECKLIST & FREQUENCY ───────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Multi-Point Service
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              The full multi-point Texas-built checklist
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {multiPointChecklist.map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-800 leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Recommended Frequency Table */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              DIAGNOSTICS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Recommended maintenance frequency for Texas properties
            </h3>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-6">Situation / Property Type</div>
              <div className="col-span-6 text-[#005CE6]">Recommended Frequency</div>
            </div>
            <div className="divide-y divide-slate-100">
              {frequencyGuide.map((fg, i) => (
                <div key={i} className="grid grid-cols-12 p-4 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  <div className="col-span-6 font-bold text-slate-900">{fg.situation}</div>
                  <div className="col-span-6 text-slate-600 font-bold">{fg.freq}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: SCOPE & OVERDUE WARNING SIGNS ───────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                Scope of Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Residential vs Commercial Maintenance
              </h2>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5 text-[#005CE6]" />
                    <h3 className="text-base font-extrabold text-slate-900">Residential HVAC Maintenance</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Central split systems, heat pumps and mini-splits serving 1,500–4,000+ sq ft homes across Tomball and Cypress. Focus on whole-home comfort, energy efficiency and preventing mid-summer failures.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-[#005CE6]" />
                    <h3 className="text-base font-extrabold text-slate-900">Commercial HVAC Maintenance</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Office, retail and multi-tenant properties with rooftop package units or VAV setups. For landlords, we provide full documentation supporting lease compliance and property inspections.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-xl space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-cyan-300 block">
                  Warning Signs
                </span>
                <h3 className="text-xl font-extrabold">Signs your system is overdue for maintenance</h3>
                <div className="space-y-2.5 pt-2">
                  {warningSigns.map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Credentials */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 shadow-sm">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6] block mb-2">
              Certifications & Credentials
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: CUSTOMER VOICES & CASE STUDY ──────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Customer Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              What customers say about Upfront AC maintenance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic font-bold leading-relaxed">
                  “I have been reaching out to Allen for years, almost a decade and he has never let me down. Even after the warranty company sends someone and the techs do not find anything – I reach out to Allen and he will find the issue. Very honest and flexible.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs">
                <span className="font-black text-[#005CE6] block">Homeowner in Tomball, TX</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic font-bold leading-relaxed">
                  “Allen has been our service tech for many moons. He has always been reliable, fair, upfront, and honest. He communicates well, does extremely solid work and super friendly. Its hard to find someone who treats you like family and does such amazing work.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs">
                <span className="font-black text-[#005CE6] block">Rental Property Owner</span>
              </div>
            </div>
          </div>

          {/* Bridgeland Case Study */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Local Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
              Real maintenance, real result — Bridgeland, Cypress, TX
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  A homeowner called in late April. The system was running, but the house had been slightly warmer than usual for weeks and the March electric bill had jumped noticeably without explanation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  During the visit we found significant grime buildup on the evaporator coil and a low refrigerant charge from a slow leak developing for months. We cleaned coils, repaired leak, recharged refrigerant, and cleared drain line.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  System started hitting setpoint noticeably faster and next month's utility bill returned to normal. Saved the customer from a total compressor breakdown.
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
              HVAC maintenance across Tomball, Cypress & Greater Houston
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Daily service across Northwest Houston with Harris and Montgomery County coverage — Fort Bend on request.
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
              Answers to common questions about HVAC maintenance
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
              <span>Schedule Your HVAC Maintenance in Tomball, TX Today</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Don’t wait for the first 95-degree day to find out what’s wrong
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Annual and bi-annual maintenance plans, priority scheduling, and written inspection reports — serving Tomball, Cypress, Katy, The Woodlands and Houston.
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

