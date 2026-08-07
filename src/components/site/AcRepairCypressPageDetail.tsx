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
  Check
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import serviceImg from "@/assets/service-ac-cypress.png";

export function AcRepairCypressPageDetail() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const includedServices = [
    {
      title: "System Inspection & Diagnostics",
      desc: "Thorough 21-point check of electrical contactors, motor amps, static pressure, and safety cutoffs."
    },
    {
      title: "AC Troubleshooting",
      desc: "Accurate root-cause diagnostics for short cycling, warm airflow, thermostat faults, and breaker trips."
    },
    {
      title: "Part Repair & Replacement",
      desc: "Replacing worn capacitors, contactors, fan motors, hard start kits, and control boards on the spot."
    },
    {
      title: "Refrigerant Recharging",
      desc: "Electronic leak detection, nitrogen pressure testing, and precision R-410A / R-32 factory recharge."
    },
    {
      title: "Coil & Filter Sanitation",
      desc: "Chemical washing of outdoor condenser coils and indoor evaporator coils to restore full heat transfer."
    },
    {
      title: "Energy Efficiency Optimization",
      desc: "Sub-cooling and superheat tuning to lower summer cooling power consumption."
    }
  ];

  const benefits = [
    {
      title: "Improved Air Quality",
      desc: "Clean filters and sanitized coils ensure healthier, allergen-free indoor air for your family."
    },
    {
      title: "Increased System Lifespan",
      desc: "Timely repairs prevent minor component wear from turning into catastrophic compressor failure."
    },
    {
      title: "Lower Energy Bills",
      desc: "Energy-efficient, properly charged AC systems consume significantly less power in 100°F heat."
    },
    {
      title: "Enhanced Home Comfort",
      desc: "A fully functional, balanced system keeps every room cool, dry, and comfortable."
    },
    {
      title: "Fewer Emergency Breakdowns",
      desc: "Catching issues early reduces sudden breakdowns during peak mid-summer heatwaves."
    }
  ];

  const localNeighborhoods = [
    { name: "Cypress (Towne Lake & Bridgeland)", desc: "High-quality AC repair for Towne Lake, Bridgeland, Fairfield, & Copper Lakes." },
    { name: "Katy, TX", desc: "Serving Old Town Katy, Cinco Ranch, Seven Meadows, and surrounding subdivisions." },
    { name: "Houston, TX", desc: "Full coverage for The Heights, River Oaks, Memorial, and the Energy Corridor." },
    { name: "Spring, TX (77373, 77379)", desc: "Reliable HVAC repair and furnace maintenance for Spring homeowners." },
    { name: "The Woodlands, TX", desc: "Specialized services for Carlton Woods, Grogan’s Mill, and master-planned villages." },
    { name: "Sugar Land, TX", desc: "Professional HVAC service for First Colony, Greatwood, and New Territory." },
    { name: "Tomball & Magnolia, TX", desc: "Expert HVAC repair in Tomball and rural custom properties in Magnolia." }
  ];

  const testimonials = [
    {
      quote: "Allen responded quickly to our urgent a/c problem and was very professional and respectful of our property. His shoes came off as soon as he stepped inside. Allen inspected the area and explained the procedure to resolve the problem along with pictures of the problem to show us what was happening. Mission accomplished. We will definitely call on him to provide annual maintenance services. Great work!",
      author: "M.A. Williams",
      role: "Homeowner in Cypress, TX"
    },
    {
      quote: "I have been reaching out to Allen for years, almost a decade and he has never let me down. Even after the warranty company sends someone and the techs do not find anything - I reach out to Allen and he will find the issue. Very honest and flexible.",
      author: "Priscilla Garcia",
      role: "Property Owner in Tomball & Cypress"
    },
    {
      quote: "Very knowledgeable & gave upfront pricing. No surprises. Explained recommendations for upgrades to the builder grade materials on my 20yr old system. New AC is great & cleanliness is a plus.",
      author: "Lance Vincent",
      role: "Homeowner in Cypress, TX"
    }
  ];

  const faqs = [
    {
      q: "How much does AC repair cost in Cypress, TX?",
      a: "The cost of AC repair in Cypress typically ranges from $100 to $1,000+ depending on the component (capacitors, fan motors, refrigerant leak repairs). Upfront AC offers clear, flat-rate pricing before work begins with zero hidden fees."
    },
    {
      q: "Why is my AC not cooling in Cypress?",
      a: "The most common reasons are frozen evaporator coils from low refrigerant, clogged air filters, a failed outdoor capacitor, or restricted attic return ductwork."
    },
    {
      q: "How can I fix my air conditioning system in Cypress?",
      a: "Start by checking your thermostat batteries and replacing dirty air filters. If warm air continues blowing, call our licensed technicians for electronic diagnostic and repair."
    },
    {
      q: "How do I maintain my HVAC system in Cypress?",
      a: "Schedule an annual 21-point tune-up before summer, replace 1-inch filters every 30–60 days, and keep outdoor condenser units clear of grass clippings and debris."
    },
    {
      q: "What is the best AC repair company in Cypress?",
      a: "Upfront AC is BBB-accredited, family-owned since 2005, and holds 50+ 5-star reviews across Cypress, Towne Lake, and Bridgeland."
    },
    {
      q: "How often should I have my AC serviced in Cypress?",
      a: "In Texas, systems should be serviced at least once a year in spring to prevent mid-summer breakdowns."
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
        eyebrow="Emergency AC Repair Services in Cypress, TX – Upfront AC"
        title="Best AC Repair Services in Cypress, TX"
        subtitle="When your AC breaks down, comfort is the first thing that comes to mind. Upfront AC offers fast, reliable, and affordable AC repair services in Cypress, TX, with a family-oriented approach since 2005."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Award className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Serving Cypress Since 2005</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>5/5 BBB Accredited</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Fast, Dependable Cypress AC Repairs with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Personalized Solutions
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                We understand how crucial a functioning AC system is for homes and businesses in this hot Texas climate. At Upfront AC, we promise fast repairs, dependable service, and personalized solutions for your AC repair needs.
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
                  <span>Schedule Service Now</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={serviceImg}
                  alt="AC Repair Cypress TX"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">AC Repair Cypress, TX</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Towne Lake, Bridgeland, Fairfield & Cy-Fair
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 1: WHAT IS AC REPAIR IN CYPRESS? ────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Cypress Climate Essential
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What is AC Repair in Cypress?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm">
              <p>
                AC repair in Cypress involves troubleshooting, fixing, and maintaining air conditioning systems to ensure they function efficiently. With our hot, humid summers in Cypress, having a properly functioning AC system is essential.
              </p>
              <p>
                Many homes and commercial buildings in Cypress rely heavily on cooling systems to maintain comfort, making AC repair in Cypress, TX a critical service.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <p>
                If your AC is struggling to keep up, needs refrigerant recharging, or isn’t cooling properly, it’s time to call for expert HVAC repair services in Cypress, TX.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#005CE6] uppercase">Satisfaction Guaranteed</span>
                <a href="tel:+17138197908" className="text-xs font-extrabold text-slate-900 hover:text-[#005CE6] flex items-center gap-1">
                  <span>Call (713) 819-7908</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#005CE6]" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT'S INCLUDED IN CYPRESS AC REPAIR ── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Comprehensive Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What’s Included in Our AC Repair in Cypress, TX?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
              When you choose Upfront AC for AC repair services, you receive thorough diagnostics, reliable service, and high-quality replacement parts.
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
                  Cypress Verified
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: BENEFITS OF AC REPAIR ───────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Key Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Are the Benefits of AC Repair in Cypress, TX?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: COST & TRANSPARENT PRICING ───────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Cost Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              How Much Does AC Repair Cost in Cypress, TX?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                The cost of AC repair in Cypress, TX, depends on the type of issue, the age of your system, and the repairs required. On average, AC repair can range from $100 to $1,000 or more for major system issues.
              </p>
              <p>
                Upfront AC offers affordable AC repair services, ensuring that your budget remains a top priority. We provide clear, upfront pricing and never surprise our customers with hidden fees.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-400">Diagnostic Inspection</span>
                  <span className="text-base font-black text-cyan-300">$100 – $250</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-400">Standard Part Repair</span>
                  <span className="text-base font-black text-cyan-300">$150 – $600</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-400">Major Leak & Compressor</span>
                  <span className="text-base font-black text-cyan-300">$600 – $1,200+</span>
                </div>
                <div className="pt-2 text-center">
                  <a
                    href="tel:+17138197908"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-6 py-3 text-xs uppercase tracking-wider"
                  >
                    <span>Get Upfront Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: HYPER-LOCAL NEIGHBORHOOD SERVICE AREAS ── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Hyper-Local Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              We’re in Your Neighborhood across Cypress & Greater Houston
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localNeighborhoods.map((loc, idx) => (
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

      {/* ── SECTION 6: VERIFIED CUSTOMER REVIEWS ───────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Cypress homeowners say about Allen & Upfront AC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-7 shadow-sm flex flex-col justify-between">
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
                <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs">
                  <span className="font-black text-[#005CE6] block">{t.author}</span>
                  <span className="text-slate-500 font-semibold">{t.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Local Case Study */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1 text-xs font-black uppercase text-[#005CE6] mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Local Case Study</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
              Recent repair near Cypress Park, Cypress, TX
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-3xl">
              Last month, we helped a customer near Cypress Park whose AC unit wasn’t cooling during peak heat. After inspecting the system, we found a refrigerant leak and repaired it the same day. They were delighted with the quick service and now enjoy a cool, comfortable home again.
            </p>
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
              Frequently asked questions for AC repair in Cypress
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
              <span>Book Professional AC Repair in Cypress Today</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Don’t let a broken AC ruin your day!
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Upfront AC offers 24/7 AC repair services for homes and businesses in Cypress, TX. Whether you need a quick fix or a full system replacement, we are here to help.
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
