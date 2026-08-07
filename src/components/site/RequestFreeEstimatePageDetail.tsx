import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  PhoneCall,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Star,
  Award,
  ShieldCheck,
  ArrowRight,
  MapPin,
  MessageSquare,
  Building2,
  ChevronDown,
  User,
  AlertCircle,
  TrendingUp,
  ArrowUp
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import tomballImg from "@/assets/service-ac-tomball.png";
import cypressImg from "@/assets/service-ac-cypress.png";
import hvacImg from "@/assets/service-air-conditioning.png";

export function RequestFreeEstimatePageDetail() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    serviceNeeded: "",
    problemDescription: "",
    timeline: "As Soon As Possible",
    contactMethod: "Phone"
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        serviceNeeded: "",
        problemDescription: "",
        timeline: "As Soon As Possible",
        contactMethod: "Phone"
      });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const processSteps = [
    {
      step: "01",
      title: "Call or Book Online",
      desc: "Reach out to us 24/7 for a same-day appointment or complete our online request form."
    },
    {
      step: "02",
      title: "On-Site Diagnosis",
      desc: "Our EPA-certified technician will perform a full inspection of your system."
    },
    {
      step: "03",
      title: "Upfront Pricing",
      desc: "We provide a detailed, honest quote before any work begins. No hidden fees, no surprises."
    }
  ];

  const whyChooseUs = [
    {
      title: "In-House Experts",
      desc: "We never use subcontractors. You get a trained, vetted, and accountable technician."
    },
    {
      title: "Upfront Pricing",
      desc: "We give you the cost upfront, so you know exactly what to expect before work starts."
    },
    {
      title: "24/7 Emergency Response",
      desc: "We’re here for you when the Houston heat strikes — 60-minute emergency dispatch."
    },
    {
      title: "Licensed & Insured",
      desc: "Certified by the state of Texas (TACLA133609C) and fully insured for your peace of mind."
    }
  ];

  const testimonials = [
    {
      quote: "I had a great experience with Allen from Upfront. He let me know when he was on his way, and showed up as promised. He was helpful in answering questions, and his prices were reasonable. Would highly recommend him.",
      author: "Lorraine Penczak",
      badge: "Google Verified Review"
    },
    {
      quote: "Allen and his crew did a fast, thorough, and efficient job on my AC! I would trust them to help all my friends and family! Highly recommended! Thank you Upfront AC :)",
      author: "Celise Keller",
      badge: "Google Verified Review"
    }
  ];

  const serviceAreas = [
    { city: "Tomball, TX", desc: "Residential neighborhoods along FM 2920 & SH 249." },
    { city: "Houston, TX", desc: "North Houston, West Houston, Energy Corridor." },
    { city: "The Woodlands, TX", desc: "Master-planned communities and commercial centers." },
    { city: "Cypress, TX", desc: "Bridgeland, Towne Lake, Fairfield, Copper Lakes." },
    { city: "Katy, TX", desc: "Rapidly growing western suburbs." },
    { city: "Spring, TX", desc: "Established neighborhoods along FM 1960." },
    { city: "Sugar Land, TX", desc: "Southwest Houston suburbs." },
    { city: "Magnolia, TX", desc: "Rural residential and acreage properties." }
  ];

  const faqs = [
    {
      q: "How quickly can an HVAC technician arrive in Houston, TX?",
      a: "We prioritize emergency dispatch and can typically have a technician at your property within 60 minutes. Standard same-day appointments are also available."
    },
    {
      q: "Why is my AC not cooling during the Houston heat?",
      a: "Common causes include low refrigerant, dirty coils, a failing compressor, or ductwork issues. Our technicians can accurately diagnose the root cause during your free estimate."
    },
    {
      q: "How much does AC repair cost in Houston, TX?",
      a: "Costs vary depending on the issue. We provide upfront, itemized pricing before any work begins, ensuring you know the cost and approve it first."
    },
    {
      q: "Do you provide emergency HVAC repair 24/7 in Houston?",
      a: "Yes! We are available around-the-clock for emergency HVAC services across the Greater Houston area."
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Serving Tomball, Cypress, The Woodlands & Greater Houston, TX"
        title="Request a Free HVAC Estimate | Upfront AC"
        subtitle="At Upfront AC, we believe you shouldn't have to pay for a mystery. That’s why we provide free, no-obligation estimates for every service we offer, from urgent AC repairs to complete system installations."
      />

      {/* ── HERO CONTACT BAR & INTRO ───────────────────────── */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#050b1a] text-white shadow-xl mb-10">
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold">
              <a href="tel:+17138197908" className="flex items-center gap-2 text-cyan-300 hover:underline">
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>(713) 819-7908</span>
              </a>
              <a href="mailto:allen@upfrontac.com" className="flex items-center gap-2 text-slate-200 hover:text-cyan-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>allen@upfrontac.com</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Verified 5-Star Service</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Your Fast, Transparent Quote for{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  HVAC Service in Houston
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                No hidden fees, no sales pressure, and no guesswork. We perform a thorough inspection and give you the cost upfront so you know exactly what to expect before any work begins.
              </p>

              {/* 3 Step Process */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {processSteps.map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-black text-[#005CE6] block mb-1">{p.step}</span>
                    <h3 className="text-sm font-extrabold text-slate-900 mb-1">{p.title}</h3>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative group">
                <img
                  src={cypressImg}
                  alt="Upfront AC Service Estimate Technician"
                  className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">100% Free & No Obligation</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    TACLA133609C Licensed · In-House Technicians
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE UPFRONT AC ───────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              WHY CHOOSE UPFRONT AC?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Tomball & Houston Homeowners Trust Our Quotes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((w, idx) => (
              <div key={idx} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{w.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ESTIMATE REQUEST FORM ───────────────────────────── */}
      <section id="estimate-form" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              TELL US ABOUT YOUR HVAC NEEDS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Request Your Free, Accurate Estimate
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Ready to get started? Fill out the form below, and we’ll connect you with a technician who can provide a free, accurate estimate. Fields marked with * are required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form */}
            <div className="lg:col-span-8 bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-extrabold text-emerald-900">Estimate Request Received!</h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    Thank you! An Upfront AC specialist will review your details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Contact Info Header */}
                  <span className="text-xs font-black uppercase tracking-wider text-[#005CE6] block border-b border-slate-200 pb-2">
                    1. Contact Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Address / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tomball, Cypress, Houston"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Service Details */}
                  <span className="text-xs font-black uppercase tracking-wider text-[#005CE6] block border-b border-slate-200 pb-2 pt-2">
                    2. Service Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Service Needed *
                      </label>
                      <select
                        required
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      >
                        <option value="">Select HVAC Service...</option>
                        <option value="AC Repair & Maintenance">AC Repair & Maintenance</option>
                        <option value="HVAC Installation (New/Replacement)">HVAC Installation (New/Replacement)</option>
                        <option value="Commercial HVAC Service">Commercial HVAC Service</option>
                        <option value="Heating Service (Furnace/Heat Pump)">Heating Service (Furnace/Heat Pump)</option>
                        <option value="HVAC Maintenance/Tune-Up">HVAC Maintenance/Tune-Up</option>
                        <option value="Ductwork & Indoor Air Quality">Ductwork & Indoor Air Quality</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Timeline *
                      </label>
                      <select
                        required
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                      >
                        <option value="Emergency (Today)">Emergency (Today)</option>
                        <option value="As Soon As Possible">As Soon As Possible</option>
                        <option value="Within the Next Week">Within the Next Week</option>
                        <option value="Planning for a Project">Planning for a Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Project Scope / Problem Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder='Example: "AC is blowing warm air," "Need a new system for a 2,000 sq ft home," or "System is short-cycling and making noise."'
                      value={formData.problemDescription}
                      onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex items-center gap-6 pt-1">
                      {["Phone", "Email", "Text"].map((method) => (
                        <label key={method} className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={formData.contactMethod === method}
                            onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                            className="text-[#005CE6] focus:ring-[#005CE6]"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-4 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-[1.01] active:scale-95"
                  >
                    <Calculator className="w-4 h-4 text-white" />
                    <span>GET MY FREE ESTIMATE</span>
                  </button>
                </form>
              )}
            </div>

            {/* Hotline & Guarantee Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Emergency Callout Card */}
              <div className="rounded-3xl bg-[#050b1a] text-white p-8 border border-slate-800 shadow-2xl space-y-5">
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block">
                  NEED IMMEDIATE ASSISTANCE?
                </span>
                <h3 className="text-xl font-black text-white">24/7 Emergency HVAC Hotline</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  If your AC has stopped working in the Houston heat, don't wait for a form response. Call our hotline for immediate same-day dispatch:
                </p>

                <a
                  href="tel:+17138197908"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-4 text-sm shadow-xl transition-all"
                >
                  <PhoneCall className="w-5 h-5 fill-white" />
                  <span>(713) 819-7908</span>
                </a>
              </div>

              {/* Houston Partner Card */}
              <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-slate-900">Why We're Houston's Trusted Partner</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Upfront AC operates as a local HVAC service provider with trained in-house technicians, fast dispatch systems, and deep expertise in central air conditioning, ductwork, and thermostat calibration.
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                    <span>5-Star Google Reviews (Verified Metro Ratings)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                    <span>BBB Accredited (A+ Rated Business)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                    <span>Active Daily Service in Tomball, Cypress & Houston</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── CUSTOMER REVIEWS CAROUSEL ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-black uppercase tracking-widest text-[#005CE6] block mb-2">
            WHAT OUR CUSTOMERS SAY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-10">
            Real Feedback from Real Houston Homeowners
          </h2>

          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xl relative min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-center items-center gap-1 text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500" />
              ))}
            </div>

            <p className="text-base sm:text-lg text-slate-700 italic font-bold leading-relaxed max-w-3xl mx-auto">
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-black text-[#005CE6]">
                — {testimonials[activeTestimonial].author}{" "}
                <span className="text-slate-400 font-semibold">({testimonials[activeTestimonial].badge})</span>
              </span>

              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === idx ? "bg-[#005CE6] w-6" : "bg-slate-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SERVICE AREAS LIST ──────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              SERVICE AREAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Same-Day HVAC Service Across Northwest Houston
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              We provide prompt, certified HVAC service across Harris & Montgomery Counties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceAreas.map((area, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <MapPin className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span>{area.city}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium pl-6 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 text-center text-xs font-black text-slate-700">
            Fort Bend County service available upon request.
          </div>

        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ─────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Common Estimate Questions
            </h2>
          </div>

          <div className="space-y-4 mb-12">
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

          <div className="text-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold px-6 py-3 text-xs transition-all"
            >
              <ArrowUp className="w-4 h-4 text-[#005CE6]" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>
      </section>

      {/* ── MAP SECTION ────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              OUR OFFICE & DISPATCH HUB
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Northpointe, Tomball, TX 77377
            </h2>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[440px] relative bg-slate-100">
            <iframe
              title="Upfront AC Location Map"
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

    </div>
  );
}
