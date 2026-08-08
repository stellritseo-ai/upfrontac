import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowRight,
  Star,
  AlertTriangle,
  Wind,
  Sun,
  Droplets,
  Filter,
  Activity,
  Check,
  MapPin,
  ChevronDown,
  TrendingUp,
  ShieldAlert,
  Users,
  Quote,
  Zap,
  Sliders,
  UserCheck
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-indoor-air-quality.png";

export function IndoorAirQualityPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const includedServices = [
    {
      title: "Air Duct Cleaning",
      desc: "HEPA negative-pressure extraction with before/after photos. Residential and commercial across Tomball, Cypress, Katy, and Houston."
    },
    {
      title: "Whole-Home Air Purifiers",
      desc: "Reme Halo, Aprilaire, and iWave systems integrated directly with your existing HVAC for whole-house air purification."
    },
    {
      title: "UV Light Systems",
      desc: "Single and dual-lamp UV-C systems mounted directly on the evaporator coil to stop mold & bacterial regrowth at the source."
    },
    {
      title: "Whole-Home Humidifiers",
      desc: "Bypass, fan-powered, and steam humidifier installation matched to your HVAC system and smart thermostat."
    },
    {
      title: "Whole-Home Dehumidifiers",
      desc: "Properly sized standalone dehumidifiers that work with your HVAC — not against it — to control Houston moisture."
    },
    {
      title: "Filtration Upgrades",
      desc: "1-inch to 4–5-inch media filter upgrades, MERV 11–16 duct-integrated systems, and housing retrofits."
    },
    {
      title: "IAQ Testing & Assessment",
      desc: "Particulate counts, VOC screening, CO2, humidity, and mold spore sampling — with written, prioritized findings."
    },
    {
      title: "HVAC Odor & Mold Removal",
      desc: "Coil cleaning, duct sanitization, and UV treatment to eliminate musty, burning, or chemical smells."
    },
    {
      title: "Ongoing IAQ Maintenance",
      desc: "UV lamp replacement, media filter changes, humidifier pad service, and dehumidifier drain checks on schedule."
    }
  ];

  const iaqSigns = [
    "Musty or stale smell when AC or furnace turns on (mold on coil/ducts)",
    "Dust builds up quickly on furniture & surfaces (duct leaks pulling attic air)",
    "Allergies or asthma symptoms worse indoors than outside",
    "Air feels heavy, humid, or stuffy when the system runs",
    "Some rooms feel stale, dry, or inconsistent in temperature",
    "Frequent headaches, throat irritation, or fatigue indoors",
    "Visible dust or soot blowing from vents upon startup",
    "Kids coughing or sneezing more frequently at night"
  ];

  const whyChooseUs = [
    {
      title: "Diagnose Before Recommend",
      desc: "We inspect ductwork, measure humidity, and check filtration before quoting a single piece of equipment."
    },
    {
      title: "10+ Years in Houston Homes",
      desc: "Deep experience with Bridgeland, Towne Lake, Fairfield, and homes along FM 2920 and SH 249."
    },
    {
      title: "EPA & Texas Licensed",
      desc: "EPA Section 608 certified, licensed Texas HVAC contractors (TACLA133609C), fully insured."
    },
    {
      title: "Honest, Itemized Pricing",
      desc: "Workmanship warranty, no bundle pricing, no upsells on equipment that won't make a difference."
    }
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
      q: "What causes poor indoor air quality in Houston-area homes?",
      a: "The most common causes are mold growth on HVAC coils and inside ductwork (driven by high humidity), inadequate filtration, duct leaks pulling contaminated attic air into living spaces, and insufficient fresh-air ventilation in tightly constructed homes."
    },
    {
      q: "How do I know if I need indoor air quality service in Tomball or Cypress?",
      a: "Warning signs include musty odors when your AC starts, dust accumulating quickly on surfaces, stubborn allergy or asthma symptoms indoors, and humidity staying above 60%."
    },
    {
      q: "Is duct cleaning worth it in Houston, TX?",
      a: "Yes, especially if your ducts haven't been cleaned in 5+ years, if you've done home renovations, or if you suspect mold/dust buildup inside the attic duct runs."
    },
    {
      q: "How often should air ducts be cleaned in Texas?",
      a: "Air ducts should typically be inspected every 2–3 years and deep cleaned every 4–5 years."
    },
    {
      q: "Does an HVAC system improve indoor air quality?",
      a: "Standard filters catch large dust particles, but whole-home purifiers, MERV 11–16 media filters, and UV-C lamps actively kill bacteria, virus particles, and mold spores."
    },
    {
      q: "What does a whole-home air purifier do that a regular filter doesn't?",
      a: "Regular filters only capture what passes directly through them. Air purifiers like Reme Halo send ionized purifiers into living spaces to neutralize odors, VOCs, and surface contaminants."
    },
    {
      q: "How much does indoor air quality service cost in Houston, TX?",
      a: "Services range from $250 for high-efficiency media filter retrofits up to $1,500–$3,000 for whole-home UV purifiers and dedicated dehumidifier installations."
    },
    {
      q: "What is UV light for HVAC, and is it worth it?",
      a: "UV-C germicidal lamps shine on the evaporator coil to prevent algae and mold spores from reproducing in moist coil drain pans, keeping airflow clean and odor-free."
    },
    {
      q: "Can HVAC improve allergy and asthma symptoms indoors?",
      a: "Yes. High-MERV filtration, humidity control below 55%, and coil UV treatment drastically reduce airborne pollen, dust mites, and fungal spores."
    },
    {
      q: "Can you fix the musty smell from my AC vents?",
      a: "Yes. Musty smells ('Dirty Sock Syndrome') are resolved by coil cleaning, drain line flush, and installing a UV germicidal lamp."
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
        eyebrow="Indoor Air Quality · Tomball & Cypress, TX"
        title="Breathe Cleaner Air Done Right the First Time"
        subtitle="Houston-area air inside your home can be 2–5x more polluted than outside. Upfront AC diagnoses, treats, and verifies your home’s air across Tomball, Cypress, Katy, and Greater Houston — no packages, just what your home actually needs."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Whole-Home Purification & Humidity Control</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 (50+ Verified Reviews)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Licensed · Insured · Family Owned</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Eliminate Mold, Dust & Allergens with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Custom Air Purification
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Gulf Coast humidity and tightly sealed Texas construction trap airborne contaminants. We assess your ductwork, static pressure, and air quality to deliver real allergen relief.
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
                  <span>Request Air Evaluation</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={serviceImg}
                  alt="Indoor Air Quality Service"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">Indoor Air Quality Specialists</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Tomball, Cypress, Katy & Greater Houston
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHY IAQ MATTERS IN HOUSTON ──────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Why IAQ Matters in Houston
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What is indoor air quality — and why it's a bigger issue here
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                Indoor air quality (IAQ) is the condition of the air inside your home as it relates to the health and comfort of the people living there. It covers pollutant levels, humidity balance, airflow, and biological contaminants like mold, bacteria, and allergens.
              </p>
              <p>
                In most of the country, IAQ is a seasonal concern. In Houston, Tomball, and Cypress, TX, it’s a year-round reality. Gulf Coast humidity fuels mold growth on coils and inside ducts. Year-round HVAC operation recirculates the same air for months.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <p>
                Newer master-planned homes in Bridgeland, Towne Lake, and Fairfield are sealed tight — efficient, but they trap pollutants. Older homes near Tomball and Magnolia have aging ductwork full of accumulated dust. The result: stuffy homes, worsening allergy symptoms, and mystery odors on startup.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#005CE6] uppercase">No Packages — Just What You Need</span>
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
              WHAT'S INCLUDED
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Our Indoor Air Quality Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              We assess first and recommend only what your home actually needs — no bundled packages.
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
                  Tested & Verified
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: MULTI-POINT SERVICE - IAQ SIGNS ─────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Multi-Point Service
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Signs your home may have an IAQ problem
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Any one of these is worth a professional assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {iaqSigns.map((sign, idx) => (
              <div key={idx} className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{sign}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: SCOPE & WHY CHOOSE US ───────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Scope & Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Tomball & Cypress trust Upfront AC for Air Quality
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
              <span>Local Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
              Asthma relief in a 2018 Tomball home
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  A family near FM 2920 noticed their daughter's asthma worsened over two summers. The HVAC ran fine, but indoor air clearly wasn't right. Found biological coil fouling, MERV 4 filter, and 67% humidity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-black text-[#005CE6] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Completed full duct cleaning, treated and cleaned coil, installed coil UV-C lamp, upgraded to a 4-inch MERV 11 media filter, and installed a whole-home dehumidifier.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-sm font-black text-emerald-700 uppercase tracking-wider mb-2">The Result</h4>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  Noticeable improvement within two weeks. Indoor asthma symptoms significantly reduced and the home held humidity below 55%.
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
              Service areas across Greater Houston
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
              Answers to common indoor air quality questions
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
              <span>Book Your Indoor Air Quality Service in Cypress & Tomball Today</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Breathe cleaner, healthier air in your home
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Upfront AC has been serving Houston-area homeowners for more than 10 years. 100% upfront pricing, EPA-certified technicians, and guaranteed solutions.
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
