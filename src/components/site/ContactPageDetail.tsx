import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Star,
  Award,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Building2,
  Wrench,
  User
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { PageHeader } from "@/components/site/PageHeader";
import { addWebEmail } from "@/lib/leads-store";
import { toast } from "sonner";
import tomballImg from "@/assets/service-ac-tomball.png";
import cypressImg from "@/assets/service-ac-cypress.png";

export function ContactPageDetail() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setSubmitting(true);
    try {
      await addWebEmail({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        service: "Contact Us Inquiry",
        source: "Contact Page (/contact)"
      });
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent to our dispatch team.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error(`Failed to submit message. Please call our office directly at ${settings.officePhone || "(713) 819-7908"}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Get In Touch · Upfront AC"
        title="Contact Us Today"
        subtitle="If you are looking for a professional HVAC contractor in the Houston - Tomball, TX area for heating and air conditioning repair, We provide free quotes for any new heating or AC equipment installation. Whether you need residential or commercial services, our experienced HVAC specialists are ready to serve you."
      />

      {/* ── HERO SPOTLIGHT SECTION ─────────────────────────── */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <PhoneCall className="h-3.5 w-3.5 text-[#005CE6]" />
              <span>Fast 24-Hour Inquiry Response Guarantee</span>
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
                We're Ready to Help Keep Your Home or Business{" "}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Cool & Comfortable
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                Please call 713-819-7908 or complete our online request form below. For any inquiries, we typically respond within 24 hours. Free estimates provided on all new heating and AC equipment installations!
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+17138197908"
                  className="inline-flex items-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 fill-white" />
                  <span>Call +1 (713) 819-7908</span>
                </a>

                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 font-bold px-7 py-4 text-sm transition-all"
                >
                  <span>Send Online Inquiry</span>
                  <ArrowRight className="w-4 h-4 text-[#005CE6]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/80 group">
                <img
                  src={tomballImg}
                  alt="Upfront AC Office & Technicians"
                  className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl text-left">
                  <span className="block text-base font-black text-slate-900">Upfront AC Contact Center</span>
                  <span className="text-xs font-bold text-[#005CE6] block mt-0.5">
                    Northpointe, Tomball, TX 77377
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4 CONTACT INFO PILLARS ───────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Address</span>
              <span className="text-sm font-extrabold text-slate-900 block">
                Northpointe, Tomball, Tx. 77377
              </span>
              <span className="text-xs text-slate-500 font-medium block">Harris & Montgomery County Hub</span>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Email</span>
              <a href={`mailto:${settings.alertEmail || "allen@upfrontac.com"}`} className="text-sm font-extrabold text-[#005CE6] hover:underline block">
                {settings.alertEmail || "allen@upfrontac.com"}
              </a>
              <span className="text-xs text-slate-500 font-medium block">24-hour response guarantee</span>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Phone</span>
              <a href={`tel:${phoneTel}`} className="text-sm font-extrabold text-slate-900 hover:text-[#005CE6] block">
                {settings.officePhone || "(713) 819-7908"}
              </a>
              <span className="text-xs text-emerald-600 font-bold block">24/7 Emergency Dispatch</span>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Hours of Operation</span>
              <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                M-F: {settings.weekdays || "7:00 AM - 5:00 PM"}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Sat & Sun: {settings.saturdays || "Emergency Calls Only"}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ── FORM & DIRECT DETAILS SECTION ────────────────────── */}
      <section id="contact-form" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              ONLINE REQUEST FORM
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Send Us a Message
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              Complete our online request form below and an HVAC specialist will contact you within 24 hours.
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
                      Inquiry Received & Dispatched
                    </span>
                    <h3 className="text-2xl font-black text-emerald-950">Message Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you for contacting Upfront AC. Our team will review your message and reach back out to you promptly within 15–30 minutes.
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 text-left space-y-2 max-w-sm mx-auto">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="text-slate-500">Emergency Dispatch:</span>
                      <a href={`tel:${phoneTel}`} className="text-[#005CE6] hover:underline font-extrabold">
                        {settings.officePhone || "(713) 819-7908"}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="mt-2 text-xs font-bold text-[#005CE6] hover:underline cursor-pointer"
                  >
                    ← Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Email *
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
                        Phone *
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

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your AC, heating, or equipment installation needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-[#005CE6] focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold py-4 text-sm shadow-xl shadow-[#005CE6]/30 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        <span>Sending Message to Dispatch...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-white" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Office Details Panel */}
            <div className="lg:col-span-5 bg-[#050b1a] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-2">
                  UPFRONT AC HEADQUARTERS
                </span>
                <h3 className="text-2xl font-black text-white">Local Family-Owned Business</h3>
                <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
                  Serving Tomball, Cypress, Katy, The Woodlands, Spring, Magnolia, Sugar Land & Greater Houston with 10+ years of dedicated HVAC excellence.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free Quotes on New Equipment Installations</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Upfront Itemized Pricing</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>EPA Section 608 & Texas TDLR Certified</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs font-black text-white block">Call Allen Directly:</span>
                <a href="tel:+17138197908" className="text-lg font-black text-cyan-300 hover:underline block">
                  +1 (713) 819-7908
                </a>
                <span className="text-[10px] text-slate-400 font-semibold block">Northpointe, Tomball, Tx. 77377</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── MAP SECTION ────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-100/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              OUR LOCATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Find Us in Tomball, TX
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Located in Northpointe, Tomball, TX 77377 — servicing all surrounding Northwest Houston communities.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[460px] relative bg-slate-100">
            <iframe
              title="Upfront AC Office Location Map"
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
