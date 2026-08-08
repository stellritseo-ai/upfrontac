import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  CheckCircle2,
  Clock,
  Award,
  PhoneCall,
  ArrowRight,
  Star,
  MapPin,
  Flame,
  Snowflake,
  ShieldCheck,
  Zap,
  Check,
  ChevronDown,
  HelpCircle,
  Building2,
  Home,
  Sparkles,
  Users,
  Quote,
  TrendingUp,
  Sliders,
  DollarSign
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-hvac-install.png";

export function HvacInstallPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const includedServices = [
    {
      title: "Manual Load Calculation",
      desc: "Industry-standard sizing based on your actual home — insulation, layout, ceiling height, and sun exposure — not just square footage."
    },
    {
      title: "Central Split System Installation",
      desc: "Carrier, Trane, Lennox, Goodman, Rheem, American Standard. Clear SEER2 explanation and matched equipment."
    },
    {
      title: "Heat Pump Systems",
      desc: "High-efficiency year-round comfort — ideal for Cypress and Houston's mild winters and brutal summers."
    },
    {
      title: "Ductless Mini-Split Installation",
      desc: "Perfect for additions, garages, sunrooms, and rooms without existing ductwork."
    },
    {
      title: "Package & Multi-Zone Systems",
      desc: "Package units for homes without interior air handler space; dual-zone setups for two-story and large properties."
    },
    {
      title: "Ductwork Inspection & Modification",
      desc: "Addressed before the system goes in — not after. Rebalancing, sealing, and dedicated returns where needed."
    },
    {
      title: "Old System Removal & Disposal",
      desc: "Clean teardown of your existing system, proper refrigerant recovery, and full haul-away."
    },
    {
      title: "Thermostat Setup & Smart Controls",
      desc: "Standard, programmable, or smart Wi-Fi thermostats — installed, configured, and paired to your phone."
    },
    {
      title: "Startup, Testing & Commissioning",
      desc: "Refrigerant charge verification, airflow measured at each register, temperature differential testing."
    },
    {
      title: "Permits & Code Compliance",
      desc: "Fully compliant Harris County permits, safety shutoffs, and strict code adherence."
    },
    {
      title: "Itemized Pricing & Financing",
      desc: "Equipment, labor, permits, and ductwork separated. Flexible financing with 0% promotional periods."
    },
    {
      title: "New Construction HVAC Design",
      desc: "Full system design and installation for new builds in Cypress, Tomball, Katy, and surrounding areas."
    }
  ];

  const pricingSystems = [
    { name: "Central Split System (AC + Furnace)", target: "Most Cypress homes 1,500–4,000 sq ft", price: "$4,500 – $10,000+" },
    { name: "Heat Pump System", target: "Homes prioritizing year-round energy efficiency", price: "$4,000 – $9,500+" },
    { name: "Ductless Mini-Split", target: "Additions, garages, and rooms without existing ducts", price: "$2,500 – $6,500" },
    { name: "Package Unit", target: "Homes without interior space for an air handler", price: "$3,500 – $8,000" },
    { name: "Dual-Zone or Multi-Zone Systems", target: "Two-story homes and larger properties", price: "$7,000 – $16,000+" },
    { name: "New Construction HVAC", target: "New builds in Cypress, Tomball, and surrounding areas", price: "Project-based quote" }
  ];

  const sizingGuides = [
    { range: "1,200–1,800 sq ft", tons: "2 – 2.5 Ton", note: "Adjust for insulation quality and floor plan layout." },
    { range: "1,800–2,500 sq ft", tons: "2.5 – 3.5 Ton", note: "Two-story factor and duct condition matter." },
    { range: "2,500–3,500 sq ft", tons: "3.5 – 4 Ton", note: "Open floor plans and high ceilings change the math." },
    { range: "3,500+ sq ft", tons: "4 – 5 Ton / Dual", note: "Multi-zone strongly recommended for larger homes." }
  ];

  const whyChooseUs = [
    { title: "10+ Years Local Field Experience", desc: "We've installed and serviced systems across Cypress, Tomball, and Houston — and we know what fails when corners get cut." },
    { title: "Manual Load Calc — Every Time", desc: "Most contractors size by square footage or what was there before. We don't. Correctly sized systems last longer and dehumidify properly." },
    { title: "Transparent, Itemized Pricing", desc: "Equipment, labor, permits, and ductwork listed separately. If anything changes mid-install, we stop and tell you first." },
    { title: "EPA Certified · Licensed · Insured", desc: "EPA Section 608 certified, licensed Texas HVAC contractor (TACLA133609C), fully insured with liability and workers' comp." },
    { title: "Dedicated Family First Integrity", desc: "Owner Allen Swindell double-checks installations personally to ensure your family gets long-term reliability." }
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
      q: "How much does HVAC installation cost in Cypress, TX?",
      a: "For most residential homes in Cypress and the surrounding Houston metro, HVAC installation typically ranges from $4,500 to $12,000+. A standard central split system for a 2,000 sq ft home usually falls between $5,500 and $8,500 installed, including equipment, labor, and permits. Larger homes, multi-zone systems, or homes needing significant ductwork run higher. Every quote is itemized so you see exactly what goes into the price."
    },
    {
      q: "How long does HVAC installation take in Texas?",
      a: "Most standard residential HVAC replacements in Cypress are completed in 1 full day (6 to 9 hours). Complex multi-zone systems, new ductwork installations, or custom new construction builds may take 2 to 3 days."
    },
    {
      q: "What size HVAC system do I need for my home in Cypress, TX?",
      a: "System size is determined by a Manual J load calculation taking into account square footage, window placement, ceiling height, insulation, and Texas sun exposure. As a general rule, Cypress homes need 1 ton for every 500–700 sq ft, but an exact calculation is performed before recommending tonnage."
    },
    {
      q: "What HVAC system is best for Texas weather?",
      a: "A high-efficiency central split system (16+ SEER2) or a dual-fuel heat pump system with variable-speed compressors offers the best combination of humidity control, rapid cooling, and low monthly energy bills."
    },
    {
      q: "Is it worth replacing my HVAC before summer in Texas?",
      a: "Yes. Replacing your system before summer avoids peak emergency wait times, prevents mid-summer breakdowns when temperatures exceed 95°F, and lowers summer electric bills immediately."
    },
    {
      q: "Do you pull permits for HVAC installation in Harris County?",
      a: "Yes. Upfront AC pulls all required municipal and Harris County permits and ensures strict code compliance on every installation."
    },
    {
      q: "Can I finance a new HVAC system in Cypress, TX?",
      a: "Yes. We offer flexible financing options with promotional 0% APR terms on qualifying systems, allowing you to pay in low monthly installments."
    },
    {
      q: "What HVAC brands do you install in Cypress and Houston?",
      a: "We install all major leading brands including Carrier, Trane, Lennox, Goodman, Rheem, American Standard, and Daikin."
    },
    {
      q: "How do I know if my ductwork needs replacement when I install a new system?",
      a: "During our pre-install inspection, we measure static pressure and check for duct leaks. If ductwork is undersized, leaking, or collapsing in the attic, we modify or seal it before connecting the new unit."
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
        eyebrow="Emergency HVAC Installation · Cypress, TX"
        title="Built for Texas Heat — Efficient, Affordable & Built to Last"
        subtitle="From load calculations to final commissioning, Upfront AC installs HVAC systems engineered for Houston’s climate. Honest pricing, properly sized equipment, and warranties you can actually use."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Emergency HVAC Installation • Cypress, TX</span>
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
                Engineered for Texas Climate with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  100% Upfront Pricing
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                From load calculations to final commissioning, Upfront AC installs HVAC systems engineered for Houston’s harsh summers and sudden winter freezes. Properly sized equipment, sealed ducts, and warranties you can trust.
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
                  <span>Request Free Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={serviceImg}
                  alt="HVAC Installation Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">HVAC Installation & Replacement</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Cypress, Tomball & Greater Houston Metro
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHY INSTALLATION QUALITY MATTERS ─────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why Installation Quality Matters
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What HVAC installation actually involves — and why it's different in Cypress
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                If you’re planning a new HVAC installation in Cypress, TX, you already know one thing: doing it halfway isn’t an option when summer arrives and the Texas heat shows up uninvited. Whether you’re putting in a system for the first time, replacing an aging unit, or building from scratch, how the system gets installed determines how efficiently it runs, how long it lasts, and how much it costs you year after year.
              </p>
              <p>
                At Upfront AC, we’ve been doing HVAC installations across Cypress and the broader Houston metro for over a decade. We work with homeowners in Bridgeland, Towne Lake, and Fairfield, commercial property owners along Highway 290, and builders putting up new homes between Cypress and Tomball. Every installation is treated the same way: sized correctly, sealed tightly, and tested before we leave.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                <strong className="text-slate-900 font-extrabold">The Cypress climate factor.</strong> Summers routinely hit 95–100°F, humidity stays elevated for months, and even winters bring cold fronts that drop temperatures 40 degrees overnight. Systems here don’t get a break — they run harder, longer, and under more stress than units in drier regions. That means your system must be sized for actual local conditions, not just square footage. A proper Manual J load calculation — not a guess — is the only way to get this right.
              </p>
              <p>
                <strong className="text-slate-900 font-extrabold">Cypress housing.</strong> New construction runs heavily toward larger two-story homes between 2,000 and 4,500 sq ft, often requiring multi-zone or dual-system setups. Older homes in 77433 and 77429 frequently have outdated ductwork that will undercut even a brand-new system if it isn’t addressed during installation. For additions, sunrooms, and converted garages, a ductless mini-split is often the better answer. We assess the actual space before recommending anything.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT'S INCLUDED IN OUR SERVICES ──────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              WHAT'S INCLUDED IN OUR HVAC INSTALL SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What's included in an Upfront AC installation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              Every installation follows a structured process — from load calculation through commissioning and homeowner walkthrough.
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

      {/* ── SECTION 3: SYSTEM PRICING & SIZING GUIDE ────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Multi-Point Service
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              HVAC systems we install in Cypress & Houston metro
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              Pricing varies by system size, efficiency level, brand, ductwork condition, and permits. Every Upfront AC quote is itemized — you see exactly what you’re paying for.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {pricingSystems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#005CE6]/10 px-3 py-1 text-[10px] font-black uppercase text-[#005CE6] mb-3">
                    <DollarSign className="w-3 h-3" />
                    <span>Itemized Quote</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">{item.target}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Estimated Range</span>
                  <span className="text-base font-black text-[#005CE6]">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sizing Guide Title */}
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl font-extrabold text-slate-900">
              Cypress Tonnage & Sizing Quick Reference
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizingGuides.map((guide, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">Square Footage</span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">{guide.range}</h4>
                  <div className="my-3 inline-block rounded-xl bg-[#005CE6] text-white px-3 py-1.5 text-sm font-black">
                    {guide.tons}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{guide.note}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: WHY CHOOSE UPFRONT AC ────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why Upfront AC
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Cypress homeowners choose Upfront AC for HVAC installation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((point, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-7 shadow-sm hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-sm mb-4">
                    <ShieldCheck className="w-5 h-5 text-[#005CE6]" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{point.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: CUSTOMER VOICES & LOCAL CASE STUDY ───── */}
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
            <div className="rounded-3xl bg-white p-8 border border-slate-200/90 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 italic font-bold leading-relaxed">
                  “I have been reaching out to Allen for years, almost a decade and he has never let me down. Even after the warranty company sends someone and the techs do not find anything – I reach out to Allen and he will find the issue. Very honest and flexible.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-black text-[#005CE6]">
                — Homeowner in Tomball, TX
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-slate-200/90 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 italic font-bold leading-relaxed">
                  “Allen has been our service tech for many moons. He has always been reliable, fair, upfront, and honest. He communicates well, does extremely solid work and super friendly. Its hard to find someone who treats you like family and does such amazing work.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-black text-[#005CE6]">
                — Rental property owner, Cypress & Tomball
              </div>
            </div>
          </div>

          {/* Local Case Study */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Local Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
              Recent install: Bridgeland, Cypress, TX
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  A homeowner contacted us in late April. Their 14-year-old 3.5-ton split system was struggling to maintain temperature upstairs, and electric bills had climbed noticeably over the past two summers. System was slightly oversized, return air path was undersized, and attic ductwork had separated in several sections.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Installed a new 3-ton, 18 SEER2 heat pump properly sized to the corrected load calculation. Resealed and rebalanced the attic ductwork, added a dedicated return in the upstairs master bedroom, and installed a smart thermostat the homeowner could control from their phone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  Installation completed in one day. Summer was the first in years with consistent temperatures upstairs and downstairs, and energy bills dropped noticeably compared to the previous year.
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
              Service areas across Cypress, Tomball & Greater Houston
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

      {/* ── SECTION 7: FREQUENTLY ASKED QUESTIONS ──────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Frequently asked questions
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
              <span>Emergency HVAC Installation</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready for a properly installed HVAC system?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Trust Upfront AC for fast, honest, professional installation across Katy, Cypress and Houston. Free estimates available.
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
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
