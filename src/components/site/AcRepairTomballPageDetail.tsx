import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
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
  UserCheck,
  Check
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-ac-tomball.png";

export function AcRepairTomballPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whyChoosePoints = [
    "Family-owned HVAC contractor serving Tomball-area customers since 2005",
    "Strong experience with home AC repair, air conditioning service, and HVAC service in Tomball",
    "Skilled in diagnostics for compressors, coils, contactors, thermostats, drain systems, and electrical faults",
    "Clear recommendations for repair, maintenance, or AC replacement in Tomball",
    "Support for both Residential HVAC Services and Commercial HVAC Services in Tomball",
    "Familiar with local comfort demands near Old Town Tomball, Historic Depot, and Hooks Airport"
  ];

  const includedServices = [
    {
      title: "Full System Operating Check",
      desc: "Complete testing of thermostat response, indoor air handler, outdoor condenser, and safety controls."
    },
    {
      title: "Temperature Split & Airflow Testing",
      desc: "Measuring temperature drop across evaporator coils and checking register airflow balance."
    },
    {
      title: "Electrical & Capacitor Testing",
      desc: "Testing motor running amps, dual-run capacitors, contactor pitting, and breaker safety."
    },
    {
      title: "Condensate Drain Line Review",
      desc: "Clearing algae blockages, inspecting primary/secondary drain pans, and testing safety float switches."
    },
    {
      title: "Refrigerant & Pressure Check",
      desc: "Electronic leak detection, checking AC pressure sensors, and precision R-410A factory charge."
    },
    {
      title: "Mini-Split & Ductless Diagnostics",
      desc: "Evaluating ductless mini split systems in Tomball additions, garages, and historic homes."
    }
  ];

  const benefits = [
    "Restores cool, stable indoor comfort faster during hot Tomball weather",
    "Prevents minor issues from becoming major compressor or coil failures",
    "Helps lower unnecessary energy use caused by struggling equipment",
    "Improves airflow and more consistent room-to-room temperatures",
    "Protects sensitive components like the AC sensor, contactor, and blower motor",
    "Supports better indoor air quality when airflow and filtration improve",
    "Extends system lifespan when combined with routine AC maintenance",
    "Helps you decide whether repair, replacement, or new installation is the smarter move"
  ];

  const technicianRequirements = [
    "3–5 years of hands-on HVAC experience in residential & commercial systems",
    "Background and drug screening – every technician passes a thorough check",
    "Registered with the State of Texas as a Licensed HVAC Technician",
    "EPA Universal Certification – qualified to handle all types of refrigerants",
    "Customer-first mindset – friendly, respectful, and focused on your comfort"
  ];

  const localCoverage = [
    { name: "Tomball & Magnolia, TX", desc: "Hometown team serving Old Town Tomball, FM 2920, SH 249, and Magnolia custom homes." },
    { name: "Cypress, TX (77433, 77429)", desc: "Bridgeland, Towne Lake, Fairfield, and Cy-Fair master-planned communities." },
    { name: "Katy, TX", desc: "Cinco Ranch, Seven Meadows, Firethorne, and western suburb residential corridors." },
    { name: "Houston, TX", desc: "The Heights, Memorial, Westchase, Energy Corridor, and Central Houston." },
    { name: "The Woodlands & Spring (77373, 77379)", desc: "Carlton Woods, Grogan’s Mill, and established Spring neighborhoods." },
    { name: "Sugar Land, TX", desc: "Comprehensive HVAC maintenance for First Colony, Greatwood, and southwest suburbs." }
  ];

  const testimonials = [
    {
      quote: "Allen responded quickly to our urgent a/c problem and was very professional and respectful of our property. His shoes came off as soon as he stepped inside. Allen inspected the area and explained the procedure to resolve the problem along with pictures of the problem to show us what was happening. Mission accomplished.",
      author: "M.A. Williams",
      role: "Homeowner in Tomball, TX"
    },
    {
      quote: "I have been reaching out to Allen for years, almost a decade and he has never let me down. Even after the warranty company sends someone and the techs do not find anything - I reach out to Allen and he will find the issue. Very honest and flexible.",
      author: "Priscilla Garcia",
      role: "Property Owner in Tomball"
    },
    {
      quote: "Very knowledgeable & gave upfront pricing. No surprises. Explained recommendations for upgrades to the builder grade materials on my 20yr old system. New AC is great & cleanliness is a plus.",
      author: "Lance Vincent",
      role: "Homeowner in Tomball, TX"
    }
  ];

  const faqs = [
    {
      q: "What is AC repair Tomball?",
      a: "AC repair Tomball means diagnosing and fixing cooling problems in homes or businesses in the Tomball area. That can include thermostat issues, low airflow, frozen coils, electrical faults, drain line problems, or worn parts to restore reliable cooling."
    },
    {
      q: "How fast can I get air conditioning repair Tomball?",
      a: "We offer same-day priority dispatch across Tomball, Old Town Tomball, and surrounding 77375/77377 neighborhoods."
    },
    {
      q: "Why is my air conditioner Tomball home not cooling evenly?",
      a: "Uneven cooling is often caused by leaky attic ductwork, undersized return air vents, dirty filters, or low refrigerant levels."
    },
    {
      q: "What causes AC failure most often?",
      a: "In Tomball, continuous summer run times, high humidity corroding contactors, failed capacitors, and clogged condensate drain lines are the primary causes of AC failure."
    },
    {
      q: "What is the $5000 rule for AC?",
      a: "The $5,000 rule states that if you multiply the age of your AC system by the estimated cost of repair, and the total exceeds $5,000, replacement is generally more financial sense than repair."
    },
    {
      q: "What is the 3 minute rule for air conditioners?",
      a: "The 3-minute rule is a built-in thermostat delay that protects the compressor from short cycling and pressure imbalances when the unit turns on and off."
    },
    {
      q: "Why is AC so expensive to fix sometimes?",
      a: "Major component costs (compressors, evaporator coils, R-410A refrigerant) and hard-to-access attic setups require specialized labor and EPA-certified handling."
    },
    {
      q: "Do you offer Emergency AC Repair and heating help?",
      a: "Yes. Upfront AC provides 24/7 emergency repair response across Tomball with no hidden fees."
    },
    {
      q: "Should I repair or replace my system?",
      a: "If your system is under 10 years old with minor component wear, repair is recommended. If it is 12+ years old, uses R-22, or requires major compressor work, replacement is usually smarter."
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
        eyebrow="Emergency AC Repair Services in Tomball, TX"
        title="Dependable AC Repair Tomball Homeowners Trust"
        subtitle="If your home or small business in Tomball is dealing with weak airflow, warm vents, short cycling, or a system that suddenly stops cooling, Upfront AC is ready to help with honest diagnostics and fast communication."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Hometown Tomball Service Since 2005</span>
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
                Repair-First AC Service in Tomball with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  1-Year Repair Warranty
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                From Old Town Tomball to homes near the Historic Depot and Hooks Airport, Upfront AC focuses on real fixes, not guesswork. Repair-first service, clear recommendations, and long-term value.
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
                  alt="AC Repair Tomball TX"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">AC Repair Tomball, TX</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Old Town Tomball, SH 249 & FM 2920
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHAT IS AC REPAIR IN TOMBALL? ────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Tomball Local Focus
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Is AC Repair in Tomball, TX?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                AC repair is the process of finding and correcting problems that stop your cooling system from working the way it should. That can include faulty capacitors, clogged drain lines, worn contactors, dirty evaporator coils, thermostat issues, low refrigerant, damaged fan motors, or sensor-related shutdowns.
              </p>
              <p>
                In Tomball, cooling equipment works hard because the area experiences hot, humid conditions for much of the year. Local landmarks like Old Town Tomball, the Historic Depot, and the Tomball Farmers Market reflect a city with strong community life where reliable HVAC is essential.
              </p>
            </div>

            <div className="space-y-3 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block mb-1">
                Why Tomball Homeowners Choose Upfront AC:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-bold">
                {whyChoosePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT'S INCLUDED IN TOMBALL AC REPAIR ── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Detailed Diagnostics
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What’s Included in Our AC Repair in Tomball, TX?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              Our Tomball AC repair service is designed to solve the actual cooling problem, not just silence the symptom.
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
                  Tomball Verified
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: BENEFITS OF AC REPAIR TOMBALL ──────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Real Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Are the Benefits of AC Repair Tomball TX?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#005CE6] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">{b}</p>
              </div>
            ))}
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
                <h3 className="text-2xl font-extrabold">1-Year Repair Warranty</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                  Texas Choice HVAC at Upfront AC has been repairing AC systems for more than 10 years. We want you to be cool and comfortable, and we’ll guarantee any repairs we make through a one-year warranty.
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

      {/* ── SECTION 5: LOCAL COVERAGE & TESTIMONIALS ────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Tomball & Cypress customers say about Allen & Upfront AC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic font-bold leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs">
                  <span className="font-black text-[#005CE6] block">{t.author}</span>
                  <span className="text-slate-500 font-semibold">{t.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Local Coverage Grid */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Service Areas
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Service areas across Tomball & Greater Houston
            </h3>
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

      {/* ── SECTION 6: FREQUENTLY ASKED QUESTIONS ─────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Frequently asked questions for AC repair in Tomball
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

      {/* ── SECTION 7: SPECIALIZATIONS ─────────────────────── */}
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

      {/* ── SECTION 8: DIRECT EMERGENCY CTA ────────────────── */}
      <section className="py-16 lg:py-20 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <PhoneCall className="h-3.5 w-3.5 text-cyan-300" />
              <span>Book Emergency AC Repair Tomball Today</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Need reliable AC repair in Tomball?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Upfront AC is ready to help with air conditioning repair, diagnostics, and honest next-step advice across Old Town Tomball, Depot, and surrounding areas.
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
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
