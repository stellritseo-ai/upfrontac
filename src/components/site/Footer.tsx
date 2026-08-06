import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socials = [
  { icon: FacebookIcon, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("Home", "Inicio"), href: "/" },
    { label: t("About Upfront AC", "Sobre Upfront AC"), href: "/about" },
    { label: t("AC Repair Tomball", "Reparación AC Tomball"), href: "/services/ac-repair-tomball" },
    { label: t("AC Repair Cypress", "Reparación AC Cypress"), href: "/services/ac-repair-cypress" },
    { label: t("Emergency HVAC Dispatch", "Despacho HVAC Emergencia"), href: "/services/hvac-repairs" },
    { label: t("Verified Google Reviews", "Reseñas Verificadas de Google"), href: "/reviews" },
    { label: t("Get Free Estimate", "Obtener Presupuesto Gratis"), href: "/contact" },
  ];

  const servicesLinks = [
    { label: t("AC Repair", "Reparación de Aire Acondicionado"), href: "/services/air-conditioning" },
    { label: t("HVAC Installation", "Instalación de HVAC"), href: "/services/hvac-install" },
    { label: t("Heating Service", "Servicio de Calefacción"), href: "/services/heating" },
    { label: t("Commercial HVAC", "HVAC Comercial"), href: "/services/commercial-hvac" },
    { label: t("Indoor Air Quality", "Calidad del Aire Interior"), href: "/services/indoor-air-quality" },
    { label: t("HVAC Maintenance", "Mantenimiento HVAC"), href: "/services/hvac-maintenance" },
    { label: t("Residential HVAC", "HVAC Residencial"), href: "/services/residential-hvac" },
  ];

  return (
    <footer className="relative bg-[#050b1a] text-white overflow-hidden border-t border-slate-900 select-none">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

      {/* Decorative Blur Blobs */}
      <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] bg-[#005CE6]/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-40 right-10 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      <div className="relative mx-auto w-[90%] max-w-7xl pt-16 pb-8 lg:pt-20 lg:pb-10 z-10 text-left">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10">

          {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Upfront AC Logo"
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 text-sm text-slate-400 leading-relaxed max-w-sm font-semibold">
              {t(
                "A full service residential and commercial HVAC service company located in Tomball, Texas and serving the greater Houston Area. We Provide 24/7 emergency HVAC Service. Customer satisfaction is our main target . We Committed to customer satisfaction.",
                "Una empresa de servicio de HVAC residencial y comercial ubicada en Tomball, Texas y atendiendo al área metropolitana de Houston. Brindamos servicio de HVAC de emergencia las 24 horas, los 7 días de la semana. La satisfacción del cliente es nuestro objetivo principal."
              )}
            </p>

            {/* Socials row */}
            <div className="mt-8 flex gap-3 select-none">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -4, scale: 1.05, backgroundColor: "rgba(0, 92, 230, 0.2)", borderColor: "rgba(0, 92, 230, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  aria-label={label}
                  className="grid place-items-center h-10 w-10 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-colors shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <Col title={t("Quick Links", "Enlaces Rápidos")} items={quickLinks} />

          {/* Services Column */}
          <Col title={t("Our Services", "Nuestros Servicios")} items={servicesLinks} />

          {/* Contact & Hours Column (4-span grid layout subsplit) */}
          <div className="col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6">

            {/* Contact Details */}
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
                {t("Contact Us", "Contáctenos")}
              </div>
              <ul className="space-y-4.5 text-sm">
                <li>
                  <a
                    href="tel:7138197908"
                    className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-[#005CE6] group-hover:bg-[#005CE6]/10 group-hover:border-[#005CE6]/30 transition-all shrink-0">
                      <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Phone</span>
                      <span className="font-semibold text-white tracking-tight mt-0.5">713-819-7908</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:allen@upfrontac.com"
                    className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-[#005CE6] group-hover:bg-[#005CE6]/10 group-hover:border-[#005CE6]/30 transition-all shrink-0">
                      <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</span>
                      <span className="font-semibold text-white tracking-tight mt-0.5 text-wrap break-all">allen@upfrontac.com</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=Northpointe,+Tomball,+Tx.+77377"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-[#005CE6] group-hover:bg-[#005CE6]/10 group-hover:border-[#005CE6]/30 transition-all shrink-0">
                      <MapPin className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{t("Office", "Oficina")}</span>
                      <span className="font-semibold text-white tracking-tight mt-0.5 leading-snug">
                        Northpointe, Tomball, Tx. 77377
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours Info */}
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
                {t("Office Hours", "Horarios de Oficina")}
              </div>
              <div className="bg-slate-900/40 border border-red-500/25 rounded-2xl p-5">
                <span className="text-red-400 font-black uppercase tracking-wider block mb-3 text-[10px] flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  {t("Call for 24/7 Emergency Service", "Llama para Servicio de Emergencia 24/7")}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  <span className="text-white block font-bold mb-1">{t("Monday-Friday:", "Lunes-Viernes:")}</span>
                  {t("24 Hours Service", "Servicio 24 Horas")}<br /><br />
                  <span className="text-white block font-bold mb-1">{t("Saturday-Sunday:", "Sábado-Domingo:")}</span>
                  {t("12am-5pm", "12am-5pm")}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Trust Badges Full-Width 1-Row Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 select-none">
          <div className="flex items-center justify-center gap-2 bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-2 text-xs font-black text-red-400 uppercase tracking-wider shadow-sm w-full lg:w-auto text-center">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span>{t("Call for 24/7 Emergency Service", "Llama para Servicio 24/7")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 uppercase tracking-wider w-full lg:w-auto text-center">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>{t("Licensed & Insured HVAC Provider", "Proveedor HVAC Autorizado")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 uppercase tracking-wider w-full lg:w-auto text-center">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>{t("Tomball & Greater Houston", "Tomball y Greater Houston")}</span>
          </div>
        </div>

        {/* Bottom Copy/Trademark Row with Back to Top trigger */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500 font-semibold">
            © 2026 Upfront AC. {t("All rights reserved. Design by", "Todos los derechos reservados. Diseño por")}{" "}
            <a 
              href="https://stellrit.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-[#005CE6] transition-colors whitespace-nowrap"
            >
              StellR IT LLC
            </a>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <p className="text-xs text-slate-500 font-semibold hidden lg:block">
              {t("Tomball, TX & Greater Houston Area", "Tomball, TX y Área Metropolitana de Houston")}
            </p>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-slate-400 hover:text-white transition-colors font-bold flex items-center gap-2 cursor-pointer select-none bg-white/5 sm:bg-transparent px-4 py-2 sm:p-0 rounded-full sm:rounded-none"
            >
              <span>{t("Back to Top", "Volver Arriba")}</span>
              <ArrowRight className="h-4 w-4 -rotate-90 text-[#005CE6]" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}

function Col({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="col-span-1 lg:col-span-2 text-left">
      <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
        {title}
      </div>
      <ul className="space-y-3 text-xs sm:text-sm font-semibold">
        {items.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.href}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
            >
              <span className="h-1 w-1 rounded-full bg-[#005CE6] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
