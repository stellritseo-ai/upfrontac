import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  Calendar,
  CheckCircle2,
  Star,
  Award,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Building2,
  Wrench,
  Snowflake,
  Flame,
  Activity,
  User,
  Compass,
  Check,
  Navigation,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHeader } from "@/components/site/PageHeader";
import { addWebEmail } from "@/lib/leads-store";
import { toast } from "sonner";
import tomballImg from "@/assets/service-ac-tomball.png";
import cypressImg from "@/assets/service-ac-cypress.png";
import hvacImg from "@/assets/service-air-conditioning.png";
import repairsImg from "@/assets/service-hvac-repairs.png";

export function ServiceAreasPageDetail() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    city: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    try {
      await addWebEmail({
        name: formData.name.trim(),
        email: "service-area-inquiry@upfrontac.com",
        phone: formData.phone.trim(),
        service: `${formData.service || "HVAC Service"} (${formData.city || selectedCity || "Tomball / Cypress Area"})`,
        message: `City / Service Area: ${formData.city || selectedCity || "Greater Houston"}\nRequested Date / Time: ${formData.date || "As soon as possible"}`,
        source: "Service Areas Page (/service-areas)"
      });
      setSubmitted(true);
      toast.success("Service area request received! We will contact you shortly.");
    } catch {
      toast.error(`Failed to submit request. Please call ${settings.officePhone || "(713) 819-7908"}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToContact = (cityName?: string) => {
    if (cityName) {
      setFormData((prev) => ({ ...prev, city: cityName }));
      setSelectedCity(cityName);
    }
    const elem = document.getElementById("contact-form");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cities = [
    {
      name: "Tomball, TX",
      zip: "77375, 77377",
      tag: "Home Headquarters",
      desc: "Fast same-day AC repairs, furnace tune-ups, and replacement services across Old Town Tomball, Northpointe, and FM 2920.",
      img: tomballImg,
      features: ["Same-Day Emergency Service", "Northpointe & FM 2920 Corridor", "0% Financing Available"]
    },
    {
      name: "Cypress, Houston, TX",
      zip: "77433, 77429",
      tag: "Cy-Fair Priority Zone",
      desc: "Comprehensive residential and commercial HVAC services for Bridgeland, Towne Lake, Fairfield, Copper Lakes, and Cy-Fair communities.",
      img: cypressImg,
      features: ["Bridgeland & Towne Lake", "Ductless & Dehumidification", "TACLA133609C Licensed"]
    },
    {
      name: "Houston, TX",
      zip: "Metro & Suburbs",
      tag: "Greater Metro Hub",
      desc: "North Houston, West Houston, Energy Corridor, River Oaks, and Memorial. Full-spectrum heating, cooling, and rooftop commercial units.",
      img: hvacImg,
      features: ["Energy Corridor & Heights", "Commercial RTU Specialist", "EPA Section 608 Certified"]
    },
    {
      name: "Katy, TX",
      zip: "77449, 77493, 77494",
      tag: "I-10 & Grand Pkwy",
      desc: "Serving Cinco Ranch, Seven Meadows, Firethorne, and Old Town Katy with precision AC repair, coil cleaning, and system installations.",
      img: repairsImg,
      features: ["Cinco Ranch & Firethorne", "Fast Dispatch", "100% Upfront Pricing"]
    },
    {
      name: "The Woodlands, TX",
      zip: "77380, 77381, 77382",
      tag: "Montgomery County",
      desc: "Master-planned residential subdivisions and commercial plazas along I-45 and Woodlands Parkway. High-efficiency SEER2 upgrades.",
      img: tomballImg,
      features: ["Carlton Woods & Sterling Ridge", "SEER2 High Efficiency", "Air Quality Upgrades"]
    },
    {
      name: "Spring, TX 77373",
      zip: "77373, 77379, 77388",
      tag: "FM 1960 Corridor",
      desc: "Established homes and vibrant commercial plazas along FM 1960 and Champions. Full maintenance, duct sanitization, and heating.",
      img: cypressImg,
      features: ["FM 1960 & Champions", "24/7 Priority Dispatch", "Bi-Annual Maintenance"]
    },
    {
      name: "Magnolia, TX",
      zip: "77354, 77355",
      tag: "Acreage & Custom",
      desc: "Rural acreage properties, custom homes, and commercial spaces along FM 1488. Dedicated long-run heat pump & AC solutions.",
      img: hvacImg,
      features: ["FM 1488 Corridor", "Acreage & Custom Homes", "Heavy-Duty Heat Pumps"]
    },
    {
      name: "Sugar Land, TX",
      zip: "77478, 77479, 77498",
      tag: "Southwest Metro",
      desc: "Southwest Houston master-planned communities including First Colony, Greatwood, and New Territory. Complete HVAC & IAQ.",
      img: repairsImg,
      features: ["First Colony & Greatwood", "Whole-Home Purification", "Itemized Diagnostics"]
    }
  ];

  const highlights = [
    { number: "12,000+", label: "Completed HVAC Projects", desc: "Across Houston & Tomball since 2013" },
    { number: "10+ Yrs", label: "Local Family Business", desc: "TACLA133609C Licensed & EPA Certified" },
    { number: "5.0 ★", label: "Customer Review Rating", desc: "Based on 50+ verified homeowner reviews" },
    { number: "30–60m", label: "Average Dispatch Time", desc: "Fast emergency response in priority zones" }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Our Service Areas – Upfront AC"
        title="Texas HVAC Repair, Installation & Maintenance Coverage"
        subtitle="If you don’t see your area listed, don’t worry—reach out to us at (713) 819-7908, and we’ll be happy to confirm if we serve your location!"
      />

      {/* ── HERO OVERVIEW SPOTLIGHT ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Navigation className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Northwest Houston & Greater Metro Service Area</span>
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

          <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
              Trusted HVAC Expertise Across{" "}
              <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Tomball, Cypress, Katy & Greater Houston
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
              At Upfront AC, we proudly offer a wide range of professional HVAC services across Texas. Whether you’re dealing with AC Repair, Installation, or need thorough Indoor Air Quality, our expert team is here to serve you.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex items-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-4 h-4 fill-white" />
                <span>Call {settings.officePhone || "(713) 819-7908"}</span>
              </a>

              <button
                onClick={() => scrollToContact()}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 font-bold px-7 py-4 text-sm transition-all"
              >
                <span>Check Your Location</span>
                <ArrowRight className="w-4 h-4 text-[#005CE6]" />
              </button>
            </div>
          </div>

          {/* Highlights Counter Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80">
            {highlights.map((h, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
                <span className="text-2xl sm:text-3xl font-black text-[#005CE6] block">{h.number}</span>
                <span className="text-xs font-extrabold text-slate-900 block mt-0.5">{h.label}</span>
                <span className="text-[11px] text-slate-500 font-semibold block">{h.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CITIES GRID SECTION ────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              LOCAL COMMUNITIES SERVED
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Explore Our Service Cities & Subdivisions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Click learn more on your community or call (713) 819-7908 for immediate local scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={city.img}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                    
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase text-[#005CE6] border border-white/80 shadow-md">
                      {city.tag}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-black text-cyan-300 uppercase tracking-widest block">{city.zip}</span>
                      <h3 className="text-lg font-black text-white">{city.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {city.desc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {city.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#005CE6] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => scrollToContact(city.name)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F0F5FF] hover:bg-[#005CE6] text-[#005CE6] hover:text-white font-extrabold py-3 text-xs border border-[#005CE6]/20 transition-all duration-300 shadow-sm group-hover:shadow-md"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MAP & GOOGLE LOCATION SECTION ──────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                INTERACTIVE COVERAGE MAP
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Rooted in Tomball, Serving Greater Houston
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Our main office is centrally positioned in Northpointe, Tomball, TX 77377, allowing our fully stocked service trucks to reach Cypress, Spring, Katy, Magnolia, and Houston within 30–60 minutes.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <MapPin className="w-5 h-5 text-[#005CE6] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Main Address</span>
                    <span className="text-sm font-extrabold text-slate-900">Northpointe, Tomball, TX 77377</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <PhoneCall className="w-5 h-5 text-[#005CE6] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Direct Phone</span>
                    <a href={`tel:${phoneTel}`} className="text-sm font-extrabold text-[#005CE6] hover:underline">
                      {settings.officePhone || "(713) 819-7908"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <Clock className="w-5 h-5 text-[#005CE6] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Office Hours</span>
                    <span className="text-sm font-extrabold text-slate-900">M-F: {settings.weekdays || "7:00 AM - 5:00 PM"}</span>
                    <span className="text-xs font-bold text-emerald-600 block mt-0.5">Sat & Sun: {settings.saturdays || "Emergency Calls Only"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[480px] relative bg-slate-100">
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

          </div>

        </div>
      </section>

      {/* ── CONTACT FORM & DIRECT INFO SECTION ──────────────── */}
      <section id="contact-form" className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              BOOK YOUR SERVICE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Contact Upfront AC
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Thank you for considering Upfront AC for your HVAC needs. Contact us directly at (713) 819-7908 or complete the online form below and a specialist will be in contact with you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl relative">
              {selectedCity && (
                <div className="mb-6 p-3 rounded-2xl bg-[#005CE6]/10 border border-[#005CE6]/20 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#005CE6]">
                    Requesting Service for: <strong className="text-slate-900">{selectedCity}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase"
                  >
                    Clear
                  </button>
                </div>
              )}

              {submitted ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-4 shadow-sm animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-pulse" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                      Local Dispatch Dispatched
                    </span>
                    <h3 className="text-2xl font-black text-emerald-950">Request Submitted Successfully!</h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you! Your local dispatch request has been logged for {selectedCity || "your area"}. A technician will call you within 15–30 minutes.
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 text-left space-y-2 max-w-sm mx-auto">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-500">Service Hotline:</span>
                      <a href={`tel:${phoneTel}`} className="text-[#005CE6] hover:underline font-extrabold">
                        {settings.officePhone || "(713) 819-7908"}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", service: "", date: "", city: "" });
                    }}
                    className="mt-2 text-xs font-bold text-[#005CE6] hover:underline cursor-pointer"
                  >
                    ← Submit another local request
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
                        className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:bg-white focus:outline-none transition-all font-medium"
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
                        className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:bg-white focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Choose a Service *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:bg-white focus:outline-none transition-all font-medium"
                      >
                        <option value="">Choose a Service</option>
                        <option value="AC Repair">AC Repair</option>
                        <option value="HVAC Installation">HVAC Installation</option>
                        <option value="Heating & Furnace Repair">Heating & Furnace Repair</option>
                        <option value="HVAC Maintenance Tune-Up">HVAC Maintenance Tune-Up</option>
                        <option value="Indoor Air Quality">Indoor Air Quality</option>
                        <option value="Commercial HVAC">Commercial HVAC</option>
                        <option value="Emergency Service">Emergency Service</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Date of Availability *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900 focus:border-[#005CE6] focus:bg-white focus:outline-none transition-all font-medium"
                      />
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
                        <span>Transmitting Local Request...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-white" />
                        <span>Submit Service Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Info Card */}
            <div className="lg:col-span-5 bg-[#050b1a] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-2">
                  DIRECT CONTACT INFO
                </span>
                <h3 className="text-2xl font-black text-white">Upfront AC Office</h3>
                <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
                  Call or visit us in Northpointe Tomball. Fast dispatch across Harris and Montgomery Counties.
                </p>

                <div className="space-y-5 pt-6 border-t border-slate-800/80">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Address</span>
                      <span className="text-sm font-extrabold text-white">Northpointe, Tomball, Tx. 77377</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Email</span>
                      <a href="mailto:allen@upfrontac.com" className="text-sm font-extrabold text-cyan-300 hover:underline">
                        allen@upfrontac.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Phone</span>
                      <a href={`tel:${phoneTel}`} className="text-sm font-extrabold text-white hover:text-cyan-300">
                        {settings.officePhone || "(713) 819-7908"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Timing</span>
                      <span className="text-sm font-extrabold text-white">M-F: {settings.weekdays || "7:00 AM - 5:00 PM"}</span>
                      <span className="text-xs font-bold text-emerald-400 block mt-0.5">Sat & Sun: {settings.saturdays || "Emergency Calls Only"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 text-center">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Licensed Texas HVAC Contractor TACLA133609C
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
