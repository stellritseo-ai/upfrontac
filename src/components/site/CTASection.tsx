import { useState } from "react";
import { Mail, MapPin, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { addWebEmail } from "@/lib/leads-store";

const TinyLightningIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#005CE6] fill-[#005CE6] shrink-0" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export function CTASection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    
    try {
      // 1. Save to MongoDB
      await addWebEmail({
        name,
        phone,
        email,
        service: service || "General Quote Request",
        message: `Address: ${address}\n\nMessage: ${message}`,
        source: "Landing CTA Section"
      });

      // 2. Email backup
      await fetch("https://formsubmit.co/ajax/Williams@electricalcontractorcorp.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: name,
          Phone: phone,
          Email: email,
          Address: address,
          "Service Needed": service || "General Quote Request",
          Message: message
        })
      });

      toast.success("Thank you! We will get in touch with you shortly.");
      setIsSubmitted(true);
    } catch (err) {
      toast.error("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f4f3ef] mt-[15px] mb-0 pt-[5px] pb-0 px-[15px]">
      <section id="contact" className="mx-auto max-w-[1400px] w-full rounded-t-[10px] rounded-b-none bg-[#0F172A] py-6 sm:py-8 px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[150px] border border-slate-800 shadow-[0_12px_45px_rgba(0,0,0,0.035)] relative overflow-hidden text-center animate-fade-up">
        
        {/* Inner Card Container */}
        <div className="w-full rounded-[8px] bg-white border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative z-10 p-5 sm:p-8 md:p-10 lg:p-[40px_50px]">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest mb-6 select-none shadow-sm">
            <TinyLightningIcon /> GET A FREE ESTIMATE <TinyLightningIcon />
          </div>

          {/* Title */}
          <h2
            className="text-2xl md:text-[32px] text-neutral-900 leading-tight tracking-tight font-black"
            style={{
              marginTop: "-15px",
              marginBottom: "10px",
            }}
          >
            Ready to Upgrade Your Electrical System?
          </h2>

          {/* Description */}
          <p
            className="text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium"
            style={{
              fontSize: "14px",
              marginBottom: "22px",
            }}
          >
            Fill out the form below and one of our licensed electricians will contact you within 24 hours to discuss your project.
          </p>

          {isSubmitted ? (
            <div className="flex flex-col justify-center items-center text-center w-full py-12 space-y-4">
              <div className="bg-[#005CE6]/10 text-[#005CE6] p-4 rounded-full animate-bounce">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900">
                Thank You for Reaching Out!
              </h3>
              <p className="text-sm text-slate-500 max-w-md">
                We have received your message and our team will get in touch with you within 24 hours.
              </p>
            </div>
          ) : (
            /* Contact Form */
            <form className="w-full space-y-4 text-left" onSubmit={handleSubmit}>

              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-slate-200 py-3 px-4 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/20 transition-all font-medium"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-slate-200 py-3 px-4 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/20 transition-all font-medium"
                />
              </div>

              {/* Row 2: Email and Address with Icons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-slate-200 py-3 pl-4 pr-10 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/20 transition-all font-medium"
                  />
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#005CE6]" />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Project Address"
                    className="w-full bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-slate-200 py-3 pl-4 pr-10 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/20 transition-all font-medium"
                  />
                  <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#005CE6]" />
                </div>
              </div>

              {/* Row 3: Services select dropdown */}
              <div className="relative w-full">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-slate-200 py-3 pl-4 pr-10 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/20 transition-all appearance-none cursor-pointer font-medium"
                >
                  <option value="" disabled hidden>
                    Select Required Service
                  </option>
                  <option value="residential">Residential Electrical</option>
                  <option value="commercial">Commercial Electrical</option>
                  <option value="industrial">Industrial Electrical</option>
                  <option value="panel-upgrades">Panel Upgrades</option>
                  <option value="ev-charger">EV Charger Installation</option>
                  <option value="generator">Generator Installation</option>
                  <option value="wiring-rewiring">Wiring & Rewiring</option>
                  <option value="security-systems">Security Systems</option>
                  <option value="emergency">24/7 Emergency Service</option>
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                  <ChevronDown className="h-4.5 w-4.5 text-[#005CE6]" />
                </div>
              </div>

              {/* Row 4: Message Textarea */}
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your project details"
                className="w-full bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-slate-200 py-3 px-4 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/20 transition-all resize-none font-medium"
              />

              {/* Row 5: Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#0047B3] hover:to-[#C24F00] text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-[5px] py-4 transition-all duration-300 shadow-[0_4px_14px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] select-none cursor-pointer text-center disabled:opacity-75 disabled:pointer-events-none"
              >
                {isSubmitting ? "Submitting..." : "Get Free Estimate"}
              </button>

            </form>
          )}
        </div>

      </section>
    </div>
  );
}
