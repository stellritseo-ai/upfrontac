import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowRight,
  DollarSign,
  Zap,
  Star,
  Sparkles,
  MapPin,
  Send,
  HelpCircle,
  TrendingUp,
  Percent,
  Check,
  ChevronDown,
  Building2,
  Calendar
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import { addWebEmail } from "@/lib/leads-store";
import { toast } from "sonner";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import hvacImg from "@/assets/service-air-conditioning.png";
import installImg from "@/assets/service-hvac-install.png";
import tomballImg from "@/assets/service-ac-tomball.png";
import cypressImg from "@/assets/service-ac-cypress.png";

export function FinancePageDetail() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    service: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    try {
      await addWebEmail({
        name: formData.name.trim(),
        email: "financing-inquiry@upfrontac.com",
        phone: formData.phone.trim(),
        service: `Financing Application: ${formData.service || "HVAC System Replacement"}`,
        message: `Estimated Budget: ${formData.budget || "Not Specified"}\nSystem / Service: ${formData.service || "HVAC Replacement Financing"}`,
        source: "Financing Page (/finance)"
      });
      setSubmitted(true);
      toast.success("Financing inquiry received! A specialist will contact you shortly.");
    } catch (err) {
      toast.error("Failed to submit request. Please call (713) 819-7908.");
    } finally {
      setSubmitting(false);
    }
  };

  const coreBenefits = [
    {
      icon: Sparkles,
      title: "Temperature Consistency",
      desc: "Through the HVAC installation in South Texas, you can maintain temperature consistency. Enjoy the same comfortable temperature in every area of your house without hot or cold spots."
    },
    {
      icon: Clock,
      title: "Quick & Simple Approval",
      desc: "Getting started is fast and hassle-free. With our quick credit approval process, you’ll know your financing options in no time: no long waits or complicated paperwork."
    },
    {
      icon: DollarSign,
      title: "Zero Down Payment Options",
      desc: "Don’t want to pay anything upfront? No problem! We offer zero-down payment plans, so you can get the comfort you need today and pay later."
    },
    {
      icon: CreditCard,
      title: "Revolving Credit Line",
      desc: "Enjoy the convenience of a revolving credit line you can use whenever you need it. Perfect for future tune-ups, repairs, or upgrades. Rest comfortably knowing we’re always there when you need us."
    }
  ];

  const locations = [
    { name: "Tomball, TX, USA", zip: "77375, 77377", img: tomballImg },
    { name: "Cypress, Houston, TX, USA", zip: "77433, 77429", img: cypressImg },
    { name: "Houston, TX, USA", zip: "Metro Area", img: hvacImg },
    { name: "Katy, TX, USA", zip: "77449, 77494", img: installImg },
    { name: "The Woodlands, TX, USA", zip: "77380, 77381", img: tomballImg },
    { name: "Spring, TX 77373, USA", zip: "77373, 77379", img: cypressImg },
    { name: "Magnolia, TX, USA", zip: "77354, 77355", img: hvacImg },
    { name: "Sugar Land, TX, USA", zip: "77478, 77479", img: installImg }
  ];

  const faqs = [
    {
      q: "How does HVAC financing work with Upfront AC?",
      a: "It’s simple! We partnered with two of the best lenders out there — Synchrony and Microf — to offer flexible payment options that fit your budget. Once you’ve gone through the quick online application process, you can then choose the plan that works for you and get your project moving."
    },
    {
      q: "What credit score do I need to qualify for financing?",
      a: "We offer programs for a wide range of credit scores (580+ FICO for prime loans, plus no-credit-check lease-to-own options via Microf). Approval decisions are fast and tailored to your situation."
    },
    {
      q: "Can I finance both installation and equipment costs?",
      a: "Yes! Financing covers the full scope of your project — new HVAC equipment, indoor air quality upgrades, ductwork modifications, electrical, permits, and professional installation labor into one single monthly payment."
    },
    {
      q: "Are there any pre-payment penalties if I pay early?",
      a: "No. All of our financing options allow you to pay off your balance early at any time with zero pre-payment penalties or hidden interest charges."
    },
    {
      q: "How fast can I get approved for new system financing?",
      a: "Most credit applications take less than 3 minutes online or over the phone, giving you instant credit decisions on the spot."
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Air Conditioning & Heating Financing"
        title="Flexible HVAC Financing Options for Every Budget"
        subtitle="We believe home comfort should be accessible to everyone, no matter your budget. That’s why we offer a variety of special financing solutions tailored to fit your comfort level."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Percent className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>0% Interest Promotional APR Available</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Instant Approval Decisions</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Zero Down Payment Options</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Get Your New AC Today, Pay Over Time with{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Low Monthly Payments
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                You don’t have to let a tight budget keep you from big home comfort projects. Whether you're fixing an emergency breakdown or replacing an aging unit, Upfront AC helps you find a payment plan that fits your lifestyle.
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
                  href="#finance-form"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 font-bold px-7 py-4 text-sm transition-all"
                >
                  <span>Pre-Qualify Now</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={installImg}
                  alt="HVAC System Installation Financing"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">HVAC Financing Specialists</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Synchrony · Microf · JBFin · Acorn Finance
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── CORE FINANCING BENEFITS ─────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              FINANCING ADVANTAGES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Homeowners Finance with Upfront AC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── HOME COMFORT WITHOUT FINANCIAL STRESS ───────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                BUDGET-FRIENDLY UPGRADES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Home Comfort Without Financial Stress
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
                You don’t have to let a small budget keep you from your big projects. That’s why at Upfront AC, we offer flexible financing options to help you get the upgrades you need, when you need them.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Whether you’re looking to fix your AC unit, install a new HVAC system, or make other energy-efficient home improvements, we’re here to help you find a payment plan that fits your budget. With simple terms, quick approvals, and payment plans that fit your budget, you can focus on enjoying your space instead of worrying about the price. Ask your Upfront AC advisor about our financing options today.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="tel:+17138197908"
                  className="inline-flex items-center gap-2 rounded-full bg-[#005CE6] text-white font-extrabold px-7 py-3.5 text-xs shadow-md"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>Call (713) 819-7908</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#050b1a] text-white p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block">
                  FAST CREDIT PRE-QUALIFICATION
                </span>
                <h3 className="text-2xl font-black text-white">Soft Credit Check Available</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Checking your pre-qualification options takes less than 2 minutes and won't affect your credit score.
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Low Monthly Payment Plans starting at $79/mo</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>0% APR Promotional Financing (6 to 60 Months)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Second-Chance & Lease-To-Own Options (Microf)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── TRUSTED FINANCING PARTNERS ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              OUR TRUSTED LENDERS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Flexible Lenders Built Around Your Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* JBFin Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block mb-2">
                  JBFin Financing Network
                </span>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Apply with JBFin</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  We provide additional lending opportunities through our network of trusted financial institutions. Call a JBFin representative to explore options tailored to your situation.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Check className="w-4 h-4 text-[#005CE6]" />
                    <span>Convenient monthly payment options</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Check className="w-4 h-4 text-[#005CE6]" />
                    <span>Online account management</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Check className="w-4 h-4 text-[#005CE6]" />
                    <span>Fast credit decisions</span>
                  </div>
                </div>
              </div>

              <a
                href="#finance-form"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-3.5 text-xs shadow-md transition-all"
              >
                <span>Apply for Financing with JBFin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Acorn Finance Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-black uppercase text-[#005CE6] tracking-wider block mb-2">
                  Acorn Finance Network
                </span>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Apply with Acorn</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  We provide additional lending opportunities through our network of trusted financial institutions. Call an Acorn Finance representative to explore options tailored to your situation.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Check className="w-4 h-4 text-[#005CE6]" />
                    <span>Competitive fixed interest rates</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Check className="w-4 h-4 text-[#005CE6]" />
                    <span>No home equity requirements</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Check className="w-4 h-4 text-[#005CE6]" />
                    <span>Multiple lender offers in 60 seconds</span>
                  </div>
                </div>
              </div>

              <a
                href="#finance-form"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-3.5 text-xs shadow-md transition-all"
              >
                <span>Apply for Financing with Acorn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ─────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Have questions? We’ve got answers!
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Here are some of the most common questions we receive from homeowners about HVAC financing with Upfront AC.
            </p>
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

      {/* ── MAP & SERVICE LOCATIONS ─────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              FINANCING COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Available Across All Our Texas Service Locations
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {locations.map((loc, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#005CE6] shrink-0" />
                <div>
                  <span className="text-xs font-black text-slate-900 block truncate">{loc.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold block">{loc.zip}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Embed */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[420px] relative bg-slate-100">
            <iframe
              title="Upfront AC Financing Locations Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109865.258814717!2d-95.6984218!3d30.0888293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640cd1a97d74db1%3A0xb30d32f5fb3f9f!2sTomball%2C%20TX%2077377!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>
      </section>

      {/* ── FINANCING CONSULTATION FORM ─────────────────────── */}
      <section id="finance-form" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              APPLY NOW
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Request Your Financing Pre-Qualification
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Fill out the short form below and an Upfront AC financing advisor will walk you through your zero-down and monthly payment options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form */}
            <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl">
              {submitted ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-4 shadow-sm animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-pulse" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                      Pre-Qualification Received
                    </span>
                    <h3 className="text-2xl font-black text-emerald-950">Application Received!</h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you! A financing specialist will call you within 15–30 minutes to review low monthly payment options and pre-qualification plans.
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 text-left space-y-2 max-w-sm mx-auto">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-500">Service:</span>
                      <span className="text-slate-900">{formData.service || "HVAC Replacement"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-500">Financing Desk:</span>
                      <a href={`tel:${phoneTel}`} className="text-[#005CE6] hover:underline font-extrabold">
                        {settings.officePhone || "(713) 819-7908"}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", budget: "", service: "" });
                    }}
                    className="mt-2 text-xs font-bold text-[#005CE6] hover:underline cursor-pointer"
                  >
                    ← Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Preferred Monthly Budget *
                      </label>
                      <select
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      >
                        <option value="">Select Monthly Range</option>
                        <option value="Under $100/mo">Under $100 / mo</option>
                        <option value="$100 - $150/mo">$100 – $150 / mo</option>
                        <option value="$150 - $250/mo">$150 – $250 / mo</option>
                        <option value="0% Promotional APR">0% Promotional APR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Service Needed *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      >
                        <option value="">Select Service</option>
                        <option value="New AC & Heating Replacement">New AC & Heating Replacement</option>
                        <option value="Emergency System Repair">Emergency System Repair</option>
                        <option value="Ductless Mini-Split Installation">Ductless Mini-Split Installation</option>
                        <option value="Whole-Home Dehumidification">Whole-Home Dehumidification</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-4 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        <span>Submitting Financing Application...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-white" />
                        <span>Check My Financing Options</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Guarantee Callout */}
            <div className="lg:col-span-5 bg-[#050b1a] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-2">
                  OUR FINANCING PROMISE
                </span>
                <h3 className="text-2xl font-black text-white">No Hidden Fees or Penalties</h3>
                <p className="text-xs text-slate-300 mt-3 font-medium leading-relaxed">
                  We walk you through all monthly rates, interest terms, and payment schedules upfront. No surprising fine print or hidden fees.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Synchrony & Microf Premier Lending Options</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Pre-payment Penalties</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Same-Day System Installation Available</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-center">
                <span className="text-xs font-black text-cyan-300 block">Questions? Call (713) 819-7908</span>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Monday-Saturday 9:00 am – 6:30 pm</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
