import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";

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
  const { settings, phoneTel } = useSiteSettings();

  const quickLinks = [
    { label: t("Home", "Inicio"), href: "/" },
    { label: t("About Upfront AC", "Sobre Upfront AC"), href: "/about" },
    { label: t("Our Services", "Nuestros Servicios"), href: "/services" },
    { label: t("Service Areas", "Áreas de Servicio"), href: "/service-areas" },
    { label: t("Upfront Pricing", "Precios Transparentes"), href: "/upfront-pricing" },
    { label: t("Finance", "Financiamiento"), href: "/finance" },
    { label: t("Get Free Estimate", "Obtener Presupuesto Gratis"), href: "/request-free-estimate" },
    { label: t("Careers", "Carreras"), href: "/careers" },
    { label: t("Projects", "Proyectos"), href: "/projects" },
    { label: t("Contact Us", "Contáctenos"), href: "/contact" },
  ];

  const serviceLinks = [
    { label: t("HVAC Install", "Instalación HVAC"), href: "/services/hvac-install" },
    { label: t("Air Conditioning", "Aire Acondicionado"), href: "/services/air-conditioning" },
    { label: t("HVAC Repairs", "Reparaciones HVAC"), href: "/services/hvac-repairs" },
    { label: t("AC Repair Cypress", "Reparación AC Cypress"), href: "/services/ac-repair-cypress" },
    { label: t("AC Repair Tomball", "Reparación AC Tomball"), href: "/services/ac-repair-tomball" },
    { label: t("Heating", "Calefacción"), href: "/services/heating" },
    { label: t("HVAC Maintenance", "Mantenimiento HVAC"), href: "/services/hvac-maintenance" },
    { label: t("Indoor Air Quality", "Calidad del Aire"), href: "/services/indoor-air-quality" },
    { label: t("Commercial HVAC", "HVAC Comercial"), href: "/services/commercial-hvac" },
    { label: t("Residential HVAC", "HVAC Residencial"), href: "/services/residential-hvac" },
  ];

  return (
    <footer className="bg-[#020617] text-white pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005CE6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white rounded-2xl p-2 shadow-lg transition-transform group-hover:scale-105">
                <img
                  src={logoImg}
                  alt="Upfront AC & Heating Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  UPFRONT <span className="text-[#005CE6]">AC</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                  Heating & Air Conditioning
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t(
                "Upfront AC & Heating provides honest, top-tier HVAC repairs, installations, and maintenance across Tomball, Cypress, and Greater Houston.",
                "Upfront AC & Heating ofrece reparaciones, instalaciones y mantenimiento de HVAC de primer nivel en Tomball, Cypress y Greater Houston."
              )}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="h-10 w-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#005CE6] hover:border-[#005CE6] transition-all"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
              {t("Quick Links", "Enlaces Rápidos")}
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {quickLinks.slice(0, 6).map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
              {t("HVAC Services", "Servicios HVAC")}
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {serviceLinks.slice(0, 6).map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Col */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
              {t("Contact Info", "Información de Contacto")}
            </div>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${phoneTel}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="h-9 w-9 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-[#005CE6] group-hover:bg-[#005CE6]/10 group-hover:border-[#005CE6]/30 transition-all shrink-0">
                    <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Phone</span>
                    <span className="font-semibold text-white tracking-tight mt-0.5">{settings.officePhone || "(713) 819-7908"}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.alertEmail || "allen@upfrontac.com"}`}
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="h-9 w-9 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-[#005CE6] group-hover:bg-[#005CE6]/10 group-hover:border-[#005CE6]/30 transition-all shrink-0">
                    <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</span>
                    <span className="font-semibold text-white tracking-tight mt-0.5 text-wrap break-all">{settings.alertEmail || "allen@upfrontac.com"}</span>
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

        </div>

        {/* ── REDESIGNED FULL-WIDTH ROW: OFFICE & SERVICE HOURS ── */}
        <div className="my-8 bg-slate-900/50 border border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Header */}
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-[#005CE6]/15 border border-[#005CE6]/30 flex items-center justify-center text-[#005CE6] shrink-0 shadow-inner">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-widest text-slate-400 font-extrabold">
                    {t("Operational Schedule", "Horario Operativo")}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Hours
                  </span>
                </div>
                <span className="text-base font-black text-white tracking-tight block mt-0.5">
                  {t("Office & Service Hours", "Horarios de Oficina y Servicio")}
                </span>
              </div>
            </div>

            {/* Right: 3 In-Row Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto flex-1 lg:max-w-3xl">
              {/* Mon - Fri */}
              <div className="bg-slate-950/80 border border-slate-800/90 hover:border-[#005CE6]/40 transition-colors rounded-2xl p-3.5 flex flex-col text-left group">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-400">{t("Monday – Friday", "Lunes – Viernes")}</span>
                  <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {t("Weekdays", "Días Laborables")}
                  </span>
                </div>
                <span className="text-sm font-black text-white tracking-tight">
                  {settings.weekdays || "7:00 AM - 5:00 PM"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  {t("Full Service, Repairs & Installs", "Servicio Completo e Instalaciones")}
                </span>
              </div>

              {/* Saturday */}
              <div className="bg-slate-950/80 border border-slate-800/90 hover:border-amber-500/40 transition-colors rounded-2xl p-3.5 flex flex-col text-left group">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-400">{t("Saturday", "Sábado")}</span>
                  <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {t("Weekend", "Fin de Semana")}
                  </span>
                </div>
                <span className="text-sm font-black text-amber-400 tracking-tight">
                  {settings.saturdays || "Emergency Calls Only"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  {t("Rapid On-Call Technician Dispatch", "Técnico de Guardia para Urgencias")}
                </span>
              </div>

              {/* Sunday */}
              <div className="bg-slate-950/80 border border-slate-800/90 hover:border-rose-500/40 transition-colors rounded-2xl p-3.5 flex flex-col text-left group">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-400">{t("Sunday", "Domingo")}</span>
                  <span className="text-[9px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {t("24/7 Priority", "Prioridad 24/7")}
                  </span>
                </div>
                <span className="text-sm font-black text-rose-400 tracking-tight">
                  {settings.sundays || "Emergency Calls Only"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  {t("Critical AC Breakdown Response", "Respuesta Crítica a Fallas")}
                </span>
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
