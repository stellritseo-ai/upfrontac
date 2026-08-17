import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
  ArrowRight,
  Search,
  Wrench,
  Snowflake,
  Flame,
  Zap,
  Sliders,
  Filter,
  Sparkles,
  MapPin,
  Send,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHeader } from "@/components/site/PageHeader";
import { addWebEmail } from "@/lib/leads-store";
import { toast } from "sonner";

export function UpfrontPricingPageDetail() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", date: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    try {
      await addWebEmail({
        name: formData.name.trim(),
        email: "pricing-booking@upfrontac.com",
        phone: formData.phone.trim(),
        service: formData.service || "Flat-Rate Service Booking",
        message: `Preferred Date: ${formData.date || "ASAP"}. Service Category: ${formData.service || "Standard Diagnostic"}`,
        source: "Upfront Pricing Page (/upfront-pricing)"
      });
      setSubmitted(true);
      toast.success("Service booked! We will confirm your appointment shortly.");
      setFormData({ name: "", phone: "", service: "", date: "" });
    } catch {
      toast.error(`Failed to submit request. Please call ${settings.officePhone || "(713) 819-7908"}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const pricingCategories = [
    {
      id: "rates",
      title: "Labor, Hourly & Service Call Rates",
      icon: Clock,
      warranty: "Upfront Fixed Rates",
      items: [
        { name: "Residential Service Call", price: "$89", note: "Diagnostic fee applied toward repair" },
        { name: "After Hours / Weekends Service Call", price: "$185", note: "Evenings & Saturday/Sunday dispatch" },
        { name: "After 9 PM Service Call", price: "$260", note: "Credit card processed prior to dispatch" },
        { name: "Commercial Service Call", price: "$179", note: "Commercial RTUs & office systems" },
        { name: "Industrial (Chiller) Service Call", price: "$196", note: "Chillers & heavy commercial plants" },
        { name: "Residential Hourly Labor Rate", price: "$159 / hr", note: "Standard diagnostic labor rate" },
        { name: "Commercial Hourly Labor Rate", price: "$189 / hr", note: "Commercial system labor rate" },
        { name: "Industrial Hourly Rate (Chiller)", price: "$209 / hr", note: "Industrial equipment rate" }
      ]
    },
    {
      id: "capacitors",
      title: "Capacitors & Hard Start Kits",
      icon: Zap,
      warranty: "180 Day to 5 YR Warranty",
      items: [
        { name: "Single Capacitor (3 - 10 MFD)", price: "$189", note: "180 Day Warranty" },
        { name: "Single Capacitor (2.5 - 30 MFD)", price: "$209", note: "180 Day Warranty" },
        { name: "Single Capacitor (35 - 80 MFD)", price: "$243", note: "180 Day Warranty" },
        { name: "Dual Capacitor (30 - 60 MFD)", price: "$259", note: "180 Day Warranty" },
        { name: "Dual Capacitor (60 - 80 MFD)", price: "$276", note: "180 Day Warranty" },
        { name: "Turbo Capacitor 200 Mini (2.5 - 15 MFD)", price: "$237", note: "5 Year Warranty" },
        { name: "Turbo Capacitor 200 (2.5 - 67.5 MFD)", price: "$361", note: "5 Year Warranty" },
        { name: "Turbo Capacitor 200X (5 - 97.5 MFD)", price: "$398", note: "5 Year Warranty" },
        { name: "5-2-1 Hard Start Kit (1 - 3 Ton)", price: "$259", note: "3 Year Warranty" },
        { name: "5-2-1 Hard Start Kit (3.5 - 4.5 Ton)", price: "$289", note: "3 Year Warranty" },
        { name: "5-2-1 Hard Start Kit (4 - 5 Ton)", price: "$319", note: "3 Year Warranty" }
      ]
    },
    {
      id: "electrical",
      title: "Contactors, Transformers & Relays",
      icon: Sliders,
      warranty: "180 Day Warranty",
      items: [
        { name: "Contactor (1.5 Pole)", price: "$209", note: "180 Day Warranty" },
        { name: "Contactor (2 Pole)", price: "$229", note: "180 Day Warranty" },
        { name: "Contactor (3 Pole)", price: "$334", note: "180 Day Warranty" },
        { name: "Transformer 40VA (Standard)", price: "$235", note: "180 Day Warranty" },
        { name: "Transformer 75VA", price: "$389", note: "180 Day Warranty" },
        { name: "Relays / Sequencers / Rollouts (Aftermarket)", price: "$252", note: "180 Day Warranty" },
        { name: "Relays / Sequencers / Rollouts (OEM)", price: "Part Cost + $159/hr", note: "Factory original components" },
        { name: "Furnace / Air Handler Board (Aftermarket/Universal)", price: "$891", note: "180 Day Warranty" },
        { name: "Furnace / Air Handler Board (OEM)", price: "Part Cost + $159/hr", note: "Factory replacement board" }
      ]
    },
    {
      id: "freon",
      title: "Refrigerant, Leaks & TXV Valves",
      icon: Snowflake,
      warranty: "No Warranty on Freon",
      items: [
        { name: "R-22 Freon (Per LB)", price: "$207 / lb", note: "Legacy refrigerant" },
        { name: "R-410A Freon (Per LB)", price: "$71 / lb", note: "Standard modern refrigerant" },
        { name: "Misc Refrigerant (Per LB)", price: "$199 – $255 / lb", note: "Specialized blends" },
        { name: "TXV Valve (OEM) Replacement", price: "$1,489 – $1,889", note: "Includes new filter drier" },
        { name: "Schrader Core Replacement", price: "$105", note: "Valve core service" },
        { name: "Brass Schrader Cap (Each)", price: "$5", note: "Heavy-duty brass cap" },
        { name: "Filter Drier Replacement", price: "$888", note: "Liquid line drier installation" },
        { name: "Freon Leak Check (< 1 HR)", price: "$128", note: "Electronic leak detection" },
        { name: "Freon Leak Check (> 1 HR)", price: "$211", note: "Comprehensive system isolation" },
        { name: "Refrigerant Leak Repair", price: "$662 and up", note: "Braze & pressure test" },
        { name: "Refrigerant Leak Seal (50/50 Chance)", price: "$284", note: "System sealant injection" },
        { name: "UV Dye Leak Search", price: "$382", note: "Fluorescent dye & UV light inspection" },
        { name: "UV Armor Flex Insulation", price: "$12 / ft", note: "UV resistant line insulation" }
      ]
    },
    {
      id: "water",
      title: "Water Control & Condensate Lines",
      icon: Wrench,
      warranty: "No Warranty on Drain Clearing",
      items: [
        { name: "Clear Primary Drain Restriction", price: "$172", note: "Includes ball valve if needed" },
        { name: "Clear Restriction Bundle (w/ Aqua Guard Protection)", price: "$282", note: "Includes overflow pan safety switch" },
        { name: "PVC Drain Reconfigure (1 - 5 FT)", price: "$147", note: "Drain line correction" },
        { name: "PVC Drain Reconfigure (6 - 10 FT)", price: "$185", note: "Mid-length line rerun" },
        { name: "PVC Drain Reconfigure (11 - 20 FT)", price: "$215", note: "Long drain line replacement" },
        { name: "PVC Drain Reconfigure (20+ FT)", price: "$305 + $5/FT", note: "Over 20 feet extension" },
        { name: "Condition Primary Drain Line w/ Blue", price: "$48", note: "Anti-clog treatment" },
        { name: "Armor Flex for Condensate Line", price: "$8 / ft", note: "Thermal insulation" }
      ]
    },
    {
      id: "motors",
      title: "Fan Motors, Compressors & Power Kits",
      icon: Flame,
      warranty: "1 YR Warranty",
      items: [
        { name: "Condenser Fan Motor (Aftermarket PSC)", price: "$743", note: "1 Year Warranty" },
        { name: "Condenser Fan Motor (OEM)", price: "Part Cost + $159/hr", note: "Factory replacement motor" },
        { name: "Blower Motor (Aftermarket PSC)", price: "$894", note: "1 Year Warranty" },
        { name: "Blower Motor (Aftermarket / Rescue ECM)", price: "$1,233", note: "High efficiency ECM motor" },
        { name: "Blower Motor (OEM)", price: "Part Cost + $159/hr", note: "Factory ECM/PSC assembly" },
        { name: "Power Distribution Kit (1 - 3 Ton)", price: "$575", note: "180 Day Warranty" },
        { name: "Power Distribution Kit (3.5 - 4 Ton)", price: "$598", note: "180 Day Warranty" },
        { name: "Power Distribution Kit (5 Ton)", price: "$631", note: "180 Day Warranty" }
      ]
    },
    {
      id: "controls",
      title: "Thermostats, Safety Switches & Protection",
      icon: Sliders,
      warranty: "2 YR to 5 YR Warranty",
      items: [
        { name: "Honeywell T4 Thermostat", price: "$294", note: "5 Year Warranty" },
        { name: "Honeywell T6 Wi-Fi Smart Thermostat", price: "$386", note: "5 Year Warranty" },
        { name: "Honeywell T10 Pro Smart Thermostat", price: "$492", note: "5 Year Warranty" },
        { name: "Customer-Supplied Thermostat Install", price: "$205", note: "No warranty on customer equipment" },
        { name: "Aqua Guard Overflow Safety Switch", price: "$164", note: "180 Day Warranty" },
        { name: "SS1 Float Switch (T-Style)", price: "$229", note: "180 Day Warranty" },
        { name: "SS2 Float Switch (90-Style)", price: "$229", note: "180 Day Warranty" },
        { name: "Intermatic AG3000 Surge Protector", price: "$434", note: "2 Year Warranty" },
        { name: "Micro-Air Soft Start Kit", price: "$783", note: "2 Year Warranty" },
        { name: "3 Amp Fuse Replacement", price: "$72", note: "Low voltage fuse" },
        { name: "Low Voltage 2-Wire Repair", price: "$139 and up", note: "Thermostat wire repair" },
        { name: "High Voltage Wiring Repair", price: "$171 and up", note: "Electrical line repair" }
      ]
    },
    {
      id: "maintenance",
      title: "Onsite Maintenance & Coil Cleaning",
      icon: CheckCircle2,
      warranty: "Preventive Care",
      items: [
        { name: "Spring / Fall Maintenance Combo", price: "$189", note: "One trip per year (Full Tune-Up)" },
        { name: "Additional Maintenance Unit", price: "$119 ea", note: "Same location multi-unit discount" },
        { name: "Condenser Coil Cleaning (Non-Chemical)", price: "$85", note: "Water pressure coil wash" },
        { name: "Condenser Coil Cleaning (Chemical)", price: "$128", note: "Deep foam chemical wash" },
        { name: "Evaporator Coil Cleaning (In-Place)", price: "$689", note: "Without coil removal" },
        { name: "Evaporator Coil Cleaning (Pulled & Cleaned)", price: "$1,089", note: "Full coil pump-down & pull" },
        { name: "Blower Motor Assembly Cleaning", price: "$145", note: "Wheel & housing cleaning" }
      ]
    },
    {
      id: "iaq",
      title: "Air Flow, Ductwork & Indoor Air Quality",
      icon: Sparkles,
      warranty: "Whole-Home Purification",
      items: [
        { name: "High-Efficiency Media Filter Cabinet", price: "$802", note: "4-5 inch media filter housing" },
        { name: "Reme Halo LED Whole-Home Air Purifier", price: "$1,361", note: "Active LED air purification" },
        { name: "Reme Halo LED Replacement Cell Bulb", price: "$528", note: "Replacement cell" },
        { name: "Return Air Plenum Replacement", price: "$983", note: "Insulated return box" },
        { name: "Supply Air Plenum Replacement", price: "$1,361", note: "Custom transition duct" },
        { name: "R8 Flex Duct Replacement (Per Drop)", price: "$467", note: "High R-value flex duct run" },
        { name: "Add Return Air Duct (Under 25 FT)", price: "$969", note: "Includes ceiling grill & transition" }
      ]
    }
  ];

  const filteredCategories = pricingCategories.map((cat) => {
    if (activeTab !== "all" && cat.id !== activeTab) {
      return null;
    }
    const matchingItems = cat.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.note.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchingItems.length === 0) return null;
    return { ...cat, items: matchingItems };
  }).filter(Boolean);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Flat-Rate Transparency · Upfront AC"
        title="100% Upfront Pricing Guide"
        subtitle="No hidden fees, no sales gimmicks, and no surprise add-ons. Clear flat-rate pricing for every AC, heating, freon, motor, and air quality service across Tomball, Cypress, Katy & Greater Houston."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <DollarSign className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Published Flat-Rate Book · Upfront Guarantee</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 shadow-sm">
              <Award className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Up to 5 Year Parts Warranties</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>TACLA133609C Licensed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Know the Cost Before We Ever Touch a Screw.{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  100% Honest Pricing.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                We publish our flat-rate repair menu so Houston homeowners know exactly what to expect. No hourly inflation, no surprise charges after work begins, and no pressure.
              </p>
            </div>

            <div className="lg:col-span-4 rounded-3xl bg-[#050b1a] text-white p-6 border border-slate-800 shadow-2xl space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block">
                Standard Service Call
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">$89</span>
                <span className="text-xs text-slate-400 font-bold">/ Diagnostic Trip Fee</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Applied directly toward your repair when service is approved. Same-day emergency scheduling available.
              </p>
              <a
                href={`tel:${phoneTel}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-3.5 text-xs shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4 fill-white" />
                <span>Call {settings.officePhone || "(713) 819-7908"}</span>
              </a>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 p-4 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search any repair or part (e.g. Capacitor, Freon, Blower Motor, Reme Halo)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:border-[#005CE6] focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-black uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: "all", label: "All Categories" },
                { id: "rates", label: "Rates & Calls" },
                { id: "capacitors", label: "Capacitors" },
                { id: "electrical", label: "Contactors & Boards" },
                { id: "freon", label: "Freon & Leaks" },
                { id: "water", label: "Water Control" },
                { id: "motors", label: "Fan & Blower Motors" },
                { id: "controls", label: "Thermostats & Switches" },
                { id: "maintenance", label: "Maintenance" },
                { id: "iaq", label: "Air Quality & Ductwork" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#005CE6] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── PRICING TABLES SECTION ─────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left space-y-12">
          
          {filteredCategories.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-black text-slate-900">No matching pricing items found</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Try searching a different keyword or select "All Categories".</p>
            </div>
          ) : (
            filteredCategories.map((cat: any) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-md"
                >
                  <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#005CE6] text-white flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-white">{cat.title}</h2>
                        <span className="text-xs font-bold text-cyan-300 block">{cat.warranty}</span>
                      </div>
                    </div>

                    <span className="rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-slate-300 border border-white/10">
                      Itemized Menu
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {cat.items.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 p-4 sm:p-5 items-center gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="col-span-7 sm:col-span-6 font-bold text-slate-900 text-xs sm:text-sm">
                          {item.name}
                        </div>
                        <div className="col-span-5 sm:col-span-3 text-right sm:text-left font-black text-[#005CE6] text-sm sm:text-base">
                          {item.price}
                        </div>
                        <div className="col-span-12 sm:col-span-3 text-xs font-semibold text-slate-500">
                          {item.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}

        </div>
      </section>

      {/* ── MAP & SERVICE RADIUS SECTION ────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                UPFRONT AC SERVICE RADIUS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Tomball Base, Fast Metro Dispatch
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                All pricing applies equally across our primary service corridor: Tomball, Cypress, Katy, Spring, Magnolia, Sugar Land, and Greater Houston.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <MapPin className="w-5 h-5 text-[#005CE6] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Headquarters</span>
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
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Hours & Emergency Dispatch</span>
                    <span className="text-sm font-extrabold text-slate-900">M-F: {settings.weekdays || "9:00 AM - 6:30 PM"}</span>
                    <span className="text-xs font-bold text-emerald-600 block mt-0.5">Sat: {settings.saturdays} • Sun: {settings.sundays}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[460px] relative bg-slate-100">
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

      {/* ── BOOKING FORM & DIRECT CONTACT ───────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              BOOK AT PUBLISHED RATES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Request Your Upfront Priced Service
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Schedule your service call or repair today. A certified technician will confirm your pricing before any work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl">
              {submitted ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-4 shadow-sm animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-pulse" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                      Booking Confirmed
                    </span>
                    <h3 className="text-2xl font-black text-emerald-950">Service Request Received!</h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you! Your flat-rate service booking has been scheduled. A dispatch coordinator will call you within 15–30 minutes to verify technician arrival.
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 text-left space-y-2 max-w-sm mx-auto">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-500">Service:</span>
                      <span className="text-slate-900">{formData.service || "Standard Diagnostic"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-500">Emergency Line:</span>
                      <a href={`tel:${phoneTel}`} className="text-[#005CE6] hover:underline font-extrabold">
                        {settings.officePhone || "(713) 819-7908"}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", service: "", date: "" });
                    }}
                    className="mt-2 text-xs font-bold text-[#005CE6] hover:underline cursor-pointer"
                  >
                    ← Book another service
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
                        <option value="Residential Service Call ($89)">Residential Service Call ($89)</option>
                        <option value="Capacitor Replacement">Capacitor Replacement</option>
                        <option value="Freon Leak Check / Recharge">Freon Leak Check / Recharge</option>
                        <option value="Drain Line Clearing">Drain Line Clearing</option>
                        <option value="Thermostat Installation">Thermostat Installation</option>
                        <option value="Spring/Fall Tune-Up Combo">Spring/Fall Tune-Up Combo</option>
                        <option value="Commercial HVAC Service">Commercial HVAC Service</option>
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
                        <span>Confirming Flat-Rate Booking...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-white" />
                        <span>Book Upfront Service Now</span>
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
                  OUR GUARANTEE TO YOU
                </span>
                <h3 className="text-2xl font-black text-white">100% Upfront Pricing Policy</h3>
                <p className="text-xs text-slate-300 mt-3 font-medium leading-relaxed">
                  We state the full repair cost before starting any work. If we find additional pre-existing issues during service, we explain them first — no surprises on your bill.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Up to 5-Year Parts Warranties</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>No Weekend or Evening Surprise Markups</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>EPA 608 & Texas TDLR Licensed Techs</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-center">
                <a href={`tel:${phoneTel}`} className="text-xs font-black text-cyan-300 block hover:underline">
                  Call Direct: {settings.officePhone || "(713) 819-7908"}
                </a>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                  M-F {settings.weekdays} • Sat {settings.saturdays}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
