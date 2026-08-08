import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
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
  Building2,
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
  FileText,
  Percent,
  Wind,
  Sun
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-residential-hvac.png";

export function ResidentialHvacPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const residentialServices = [
    {
      title: "Home HVAC Repair",
      desc: "AC not cooling, warm air, frozen coils, leaks, capacitor/contactor failure, compressor diagnosis — same-day on most calls."
    },
    {
      title: "Heating System Repairs",
      desc: "Furnace ignition issues, heat pump performance problems, blower motor, heat exchanger, gas valve, and pressure switch diagnosis."
    },
    {
      title: "Airflow & Duct Repairs",
      desc: "Uneven room temperatures, weak airflow, collapsed attic ductwork, and return-air imbalances corrected at the source."
    },
    {
      title: "Thermostat & Controls",
      desc: "Smart thermostat calibration, control board diagnosis, and indoor/outdoor unit communication repair."
    },
    {
      title: "Home System Replacement",
      desc: "Manual J load calculation, ductwork assessment, equipment matched to your home, commissioning, and airflow verification."
    },
    {
      title: "New Home HVAC Installation",
      desc: "Builder-grade system corrections and true new-construction HVAC design across Tomball and Cypress communities."
    },
    {
      title: "Residential Maintenance",
      desc: "Seasonal tune-ups and ongoing maintenance plans with priority scheduling, twice-yearly visits, and discounted repair rates."
    },
    {
      title: "Ductless Mini-Split Installation",
      desc: "Targeted comfort for garages, sunrooms, additions, home offices, and problem rooms central systems can't reach."
    },
    {
      title: "Whole-Home Dehumidification",
      desc: "Solutions for homes where humidity stays high despite the AC running — engineered for Houston-area conditions."
    },
    {
      title: "Indoor Air Quality Solutions",
      desc: "UV light systems, high-efficiency filtration upgrades, whole-home purification, and professional duct cleaning."
    },
    {
      title: "Load Calculations & Sizing",
      desc: "Manual J on every replacement — the only accurate way to size for Tomball's heat, humidity, and run season."
    },
    {
      title: "Financing Available",
      desc: "Flexible monthly payments and 0% promotional financing on qualifying replacements with same-day approval."
    }
  ];

  const replacementTriggers = [
    { symptom: "System is 12–15+ years old & needs major repair", cause: "Replacement is almost always the smarter financial decision" },
    { symptom: "Energy bills climbed steadily without usage change", cause: "Declining system efficiency — replacement ROI is often 2–3 years" },
    { symptom: "Home can't stay cool during peak July–August heat", cause: "System capacity or duct problem that replacement + duct correction fixes" },
    { symptom: "Two or more significant repairs in the past 2 years", cause: "Pattern of component failure — end-of-life system behavior" },
    { symptom: "The system uses R-22 Freon refrigerant", cause: "Phased out; recharge costs now make replacement significantly cheaper" },
    { symptom: "Buying a home with an aging system", cause: "Unknown condition + unknown lifespan — replacement planning makes sense early" }
  ];

  const pricingFramework = [
    { service: "Diagnostic Inspection", price: "$80 – $150+", note: "Flat rate before work begins" },
    { service: "Minor Residential Repairs", price: "$150 – $400+", note: "Capacitors, contactors, drain lines, thermostats" },
    { service: "Intermediate Repairs", price: "$400 – $900+", note: "Blower motors, coil cleaning, refrigerant recharge" },
    { service: "Major Repairs", price: "$900 – $1,500+", note: "Compressors, control boards, leak repairs" },
    { service: "Seasonal Maintenance Tune-Up", price: "$120 – $300+", note: "Pre-summer or pre-winter tune-ups" },
    { service: "Full Home HVAC Replacement", price: "$5,500 – $12,000+", note: "Matched system + Manual J sizing" },
    { service: "Ductless Mini-Split Installation", price: "$2,500 – $6,500+", note: "Zoned room comfort setups" },
    { service: "New Construction HVAC", price: "Project-Based", note: "Custom architectural design & duct layout" }
  ];

  const whyChooseUs = [
    { title: "10+ Years of Local Experience", desc: "Deep knowledge of Tomball's housing stock — from FM 2920 subdivisions to established older homes." },
    { title: "In-House Technicians — No Subs", desc: "Every technician who comes to your home is part of our team: consistent quality and direct accountability." },
    { title: "Transparent, Itemized Pricing", desc: "Clear price by labor, equipment, and added work before anything begins. Final invoice matches the quote." },
    { title: "Manual J Sizing Guarantee", desc: "Every system replacement gets an itemized load calculation to ensure long-term comfort & humidity removal." }
  ];

  const localCoverage = [
    { name: "Tomball, TX (77375, 77377)", desc: "Neighborhoods along FM 2920, SH 249, Old Town Tomball, and surrounding subdivisions." },
    { name: "Cypress, TX (77433, 77429)", desc: "Bridgeland, Towne Lake, Fairfield, Copper Lakes and Cy-Fair communities." },
    { name: "Houston, TX", desc: "North Houston, West Houston, Energy Corridor, and residential districts across Harris County." },
    { name: "Katy, TX", desc: "Fast-growing residential subdivisions along I-10 corridor and Grand Parkway." },
    { name: "The Woodlands, TX", desc: "Master-planned communities with diverse residential HVAC system types." },
    { name: "Spring, TX (77373, 77379)", desc: "Established neighborhoods with varied system ages and maintenance needs." },
    { name: "Magnolia, TX", desc: "Rural residential, custom homes, and acreage properties." },
    { name: "Sugar Land, TX", desc: "Southwest Houston suburbs — residential and commercial." },
    { name: "Greater Houston Metro", desc: "Same-day residential HVAC service across the metro." }
  ];

  const faqs = [
    {
      q: "What are residential HVAC services in Tomball, TX?",
      a: "Residential HVAC services cover everything your home's heating and cooling system needs — repair, full system replacement, new installation, preventive maintenance, and indoor air quality improvements."
    },
    {
      q: "How much does home HVAC replacement cost in Houston, TX?",
      a: "Complete residential replacements typically range from $5,500 to $12,000+ depending on tonnage, SEER2 rating, and ductwork modifications."
    },
    {
      q: "How long does a residential HVAC system last in Texas?",
      a: "In Texas, well-maintained residential systems last 15–18 years. Unmaintained systems or improperly sized units often fail between 10–12 years."
    },
    {
      q: "When should I replace my AC unit in Tomball, TX?",
      a: "Consider replacement if your unit is 12+ years old, uses phased-out R-22 Freon, requires major compressor work, or if utility bills have spiked consistently."
    },
    {
      q: "What is the best HVAC system for Texas homes?",
      a: "High-efficiency SEER2 variable-speed central split systems combined with whole-home dehumidifiers or dual-fuel gas furnace/heat pump hybrids."
    },
    {
      q: "Why is my home AC not cooling in Cypress or Tomball?",
      a: "Common causes are frozen evaporator coils, low refrigerant from a slow leak, bad outdoor capacitors, or clogged condensate drain lines."
    },
    {
      q: "How do I choose a residential HVAC contractor near Tomball, Houston?",
      a: "Look for Texas TDLR licensing (TACLA133609C), EPA Section 608 certification, in-house technicians (no sub-contractors), upfront itemized pricing, and verified local reviews."
    },
    {
      q: "How often should home HVAC be serviced in Texas?",
      a: "Twice per year — once in spring before summer heat, and once in fall before heating season."
    },
    {
      q: "Can residential HVAC be repaired the same day in Tomball?",
      a: "Yes. Our service trucks carry common capacitors, fan motors, contactors, and control boards so most repairs finish in one visit."
    },
    {
      q: "What size HVAC system do I need for my Tomball home?",
      a: "System size must be determined by a Manual J load calculation considering square footage, window exposure, insulation R-values, and attic duct design."
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
        eyebrow="Professional Indoor HVAC Install Services"
        title="Residential HVAC Services in Tomball, TX"
        subtitle="Complete home heating & cooling done right for Texas. When your home’s HVAC system stops keeping up with Texas heat, Upfront AC delivers honest diagnostics, upfront pricing, and work that actually holds."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>10+ Years Serving Tomball & Northwest Houston</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 (50+ Verified Reviews)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Complete Home Heating & Cooling Built for{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Texas Extreme Climate
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                In Tomball, where summers push past 100°F and humidity makes every degree feel worse, comfortable isn’t a luxury — it’s a necessity. We provide same-day repairs, precision Manual J sizing, and long-term maintenance.
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
                  alt="Residential HVAC Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">Residential HVAC Specialists</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Tomball, Cypress, Katy & The Woodlands
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHAT RESIDENTIAL HVAC MEANS FOR TOMBALL ─ */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Built for Business & Homeowners
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What residential HVAC services mean for Tomball homeowners — and why it's different here
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block">The Local Conditions</span>
              <p>
                Tomball sits in Harris and Montgomery County, right at the edge of the Houston metro’s most demanding climate zone. Systems here run nearly nonstop from late April through mid-October. Outdoor humidity regularly exceeds 80%, which pushes moisture into ductwork, air handlers, and wall cavities.
              </p>
              <p>
                Cold fronts in winter can drop temperatures 30–40 degrees overnight, forcing heating systems that have been sitting idle to fire up at full capacity with no warning.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#005CE6] uppercase tracking-wider block mb-2">The Homes We Work In Most</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Along FM 2920 and SH 249, you’ll find newer subdivisions where builder-grade systems were installed quickly. Closer to Downtown Tomball, systems from the 1990s and 2000s are at or past their expected lifespan — running on phased-out R-22 refrigerants.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#005CE6] uppercase">Honest Assessment First</span>
                <span className="text-xs font-black text-slate-900">TACLA133609C</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT WE PROVIDE ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              WHAT WE PROVIDE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Complete residential HVAC services in Tomball, TX
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              Repair, replace, install, maintain, and improve air quality — every service backed by honest diagnostics and itemized pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialServices.map((srv, idx) => (
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
                  Residential Grade
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: REPLACEMENT TRIGGERS TABLE ───────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              SYSTEM REPLACEMENT DECISION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              When does home HVAC replacement make sense?
            </h2>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md mb-16">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-5">Issue Homeowners Notice</div>
              <div className="col-span-7">What’s Actually Causing It</div>
            </div>
            <div className="divide-y divide-slate-100">
              {replacementTriggers.map((item, i) => (
                <div key={i} className="grid grid-cols-12 p-4 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  <div className="col-span-5 font-bold text-slate-900">{item.symptom}</div>
                  <div className="col-span-7 text-slate-600">{item.cause}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Framework Table */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              PRICING FRAMEWORK
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Residential HVAC pricing in the Tomball & Houston area
            </h3>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 text-xs font-black uppercase tracking-widest">
              <div className="col-span-5">Service Type</div>
              <div className="col-span-4 text-[#005CE6]">Typical Cost Range</div>
              <div className="col-span-3 text-slate-400">Notes</div>
            </div>
            <div className="divide-y divide-slate-100">
              {pricingFramework.map((pf, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="col-span-5 font-bold text-slate-900">{pf.service}</div>
                  <div className="col-span-4 font-black text-[#005CE6]">{pf.price}</div>
                  <div className="col-span-3 text-slate-500 text-xs font-medium">{pf.note}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: WHY CHOOSE UPFRONT AC & OUR APPROACH ── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why Upfront AC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Tomball homeowners choose Upfront AC
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        </div>
      </section>

      {/* ── SECTION 5: CUSTOMER VOICES & LOCAL CASE STUDY ──── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Customer Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              What our customers say
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

          {/* Local Case Study */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Real Situation · Tomball Home Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
              Tomball home that kept breaking down every summer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Homeowner called in May — third summer in a row their AC required repairs. 13-year-old system had a slow leak, dirty coil, and had been oversized, short-cycling for years.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  We installed a correctly sized high-efficiency system, repaired two sections of separated attic ductwork, and replaced the thermostat with a smart model.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  First summer in four years without a service call. Energy bills dropped. House held temperature consistently through peak August heat.
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
              Residential HVAC service areas — Tomball & Northwest Houston
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Serving Tomball, Cypress, Houston, Katy & surrounding Texas communities.
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
              Answers to common residential HVAC questions
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
              <span>Schedule Your Residential HVAC Service in Tomball, TX Today</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Get fast, reliable residential HVAC services
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Same-day service available on most calls · Free diagnostic estimate before any work begins · Financing on qualifying replacements · Licensed, insured, and EPA-certified.
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
