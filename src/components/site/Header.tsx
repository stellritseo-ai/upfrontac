import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu, Phone, X, Mail, MapPin, Facebook, Instagram, Clock,
  ChevronDown, Home, Building2, Factory, Zap, BatteryCharging,
  ShieldAlert, Cable, Shield, AlertTriangle, Video, Wrench,
  Snowflake, Flame, Wind, Sparkles, Activity, CheckCircle2, User, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/useLanguage";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { to: "#welcome", label: t("Home", "Inicio") },
    { to: "#welcome", label: t("About Us", "Sobre Nosotros") },
    { to: "#services", label: t("Services", "Servicios") },
    { to: "#projects", label: t("Projects", "Proyectos") },
    { to: "#service-area", label: t("Service Areas", "Áreas de Servicio") },
    { to: "#get-in-touch", label: t("Service Price", "Precios de Servicios") },
    { to: "#get-in-touch", label: t("Finance", "Financiamiento") },
    { to: "#get-in-touch", label: t("Contact Us", "Contáctenos") },
  ];

  const serviceLinks = [
    { to: "#services", l: t("HVAC Install", "Instalación HVAC"), desc: t("Professional heating & cooling system installation", "Instalación profesional de calefacción y aire acondicionado"), icon: Wrench },
    { to: "#services", l: t("Air Conditioning", "Aire Acondicionado"), desc: t("Complete AC solutions, cooling design & installation", "Soluciones completas de AC, diseño y instalación"), icon: Snowflake },
    { to: "#services", l: t("HVAC Repairs", "Reparaciones HVAC"), desc: t("Fast & reliable emergency HVAC repair services", "Servicios de reparación rápida de HVAC"), icon: Activity },
    { to: "#services", l: t("AC Repair Services Cypress", "Reparación de AC Cypress"), desc: t("Local AC repair & maintenance in Cypress, TX", "Reparación local de AC en Cypress, TX"), icon: MapPin },
    { to: "#services", l: t("AC Repair Tomball", "Reparación de AC Tomball"), desc: t("Trusted AC repair technicians in Tomball, TX", "Técnicos de reparación de AC en Tomball, TX"), icon: MapPin },
    { to: "#services", l: t("Heating", "Calefacción"), desc: t("Furnace & heating system repairs & installation", "Reparación e instalación de sistemas de calefacción"), icon: Flame },
    { to: "#services", l: t("HVAC Maintenance", "Mantenimiento HVAC"), desc: t("Preventative tune-ups & system maintenance", "Puesta a punto y mantenimiento preventivo"), icon: CheckCircle2 },
    { to: "#services", l: t("Indoor Air Quality", "Calidad del Aire Interior"), desc: t("Air filtration, purifiers & humidity control", "Filtración de aire, purificadores y control de humedad"), icon: Sparkles },
    { to: "#services", l: t("Commercial HVAC Services", "Servicios HVAC Comerciales"), desc: t("Commercial heating, cooling & rooftop units", "Calefacción, refrigeración y unidades comerciales"), icon: Building2 },
    { to: "#services", l: t("Residential HVAC Services", "Servicios HVAC Residenciales"), desc: t("Home heating & cooling solutions", "Soluciones de calefacción y refrigeración para el hogar"), icon: Home },
  ];

  const aboutLinks = [
    { to: "#welcome", l: t("About Us", "Sobre Nosotros"), desc: t("Learn about our company & mission", "Conozca nuestra empresa y misión"), icon: Info },
    { to: "#welcome", l: t("About The Owner", "Sobre El Propietario"), desc: t("Meet the leadership & expert behind Upfront AC", "Conozca al líder y experto detrás de Upfront AC"), icon: User },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full bg-transparent pointer-events-none">

      {/* ── TOP BAR ──────────────────────────────────────────── */}
      <div
        className={cn(
          "w-full bg-[#F8F9FA] border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 pointer-events-auto transition-all duration-300 origin-top overflow-hidden",
          scrolled ? "max-h-0 py-0 opacity-0 border-none" : "max-h-20 py-2 opacity-100"
        )}
      >
        <div className="mx-auto max-w-7xl flex flex-row justify-between items-center w-full gap-2">
          {/* Left: Info */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#1E293B] min-w-0">
            {/* License */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Shield className="h-3.5 w-3.5 text-[#005CE6] shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight truncate">
                {t("Licensed# TACLA133609C", "Licencia# TACLA133609C")}
              </span>
            </div>
            {/* Email */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <Mail className="h-3.5 w-3.5 text-[#005CE6] shrink-0" />
              <a href="mailto:allen@upfrontac.com" className="text-[9px] sm:text-[10px] font-bold tracking-wider leading-tight hover:text-[#005CE6] transition lowercase">
                allen@upfrontac.com
              </a>
            </div>
            {/* Address */}
            <div className="hidden lg:flex items-center gap-1.5 shrink-0 truncate">
              <MapPin className="h-3.5 w-3.5 text-[#005CE6] shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight truncate">
                Northpointe, Tomball, Tx. 77377
              </span>
            </div>
          </div>
          {/* Right: Language */}
          <div className="flex items-center gap-3 text-[10px] sm:text-xs shrink-0">
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "flex items-center gap-1 transition font-bold cursor-pointer select-none",
                language === "en" ? "text-[#1E293B]" : "text-gray-400 hover:text-[#005CE6]"
              )}
            >
              <span className="text-sm leading-none">🇬🇧</span>
              <span className="hidden sm:inline">English</span>
            </button>
            <button
              onClick={() => setLanguage("es")}
              className={cn(
                "flex items-center gap-1 transition font-bold cursor-pointer select-none",
                language === "es" ? "text-[#1E293B]" : "text-gray-400 hover:text-[#005CE6]"
              )}
            >
              <span className="text-sm leading-none">🇪🇸</span>
              <span className="hidden sm:inline">Spanish</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MIDDLE BAR (desktop only) ────────────────────────── */}
      <div
        className={cn(
          "w-full bg-white px-4 sm:px-6 lg:px-8 border-b border-gray-100 pointer-events-auto transition-all duration-300 origin-top overflow-hidden hidden md:block",
          scrolled ? "max-h-0 py-0 opacity-0 border-none" : "max-h-28 py-3 opacity-100"
        )}
      >
        <div className="mx-auto max-w-7xl flex justify-between items-center w-full gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logoImg} alt="R&E Electrical Contractor Corp Logo" className="h-12 lg:h-14 w-auto object-contain" />
          </Link>

          {/* Contact cards */}
          <div className="flex items-center gap-4 lg:gap-8 ml-auto">
            {/* Certified */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#005CE6] flex items-center justify-center text-white shrink-0 shadow-md">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t("Certified", "Certificados")}</span>
                <span className="text-[13px] font-bold text-[#1E293B] leading-tight">
                  {t("We Are Certified Technicians!", "¡Somos Técnicos Certificados!")}
                </span>
              </div>
            </div>

            {/* Emergency */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#005CE6] flex items-center justify-center text-white shrink-0 shadow-md">
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t("Emergency", "Emergencia")}</span>
                <span className="text-[13px] font-bold text-[#1E293B] leading-tight">
                  {t("24/7 Emergency HVAC Service", "Servicio HVAC de Emergencia 24/7")}
                </span>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#005CE6] hover:border-[#005CE6] transition">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#005CE6] hover:border-[#005CE6] transition">
              <Instagram className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV BAR ─────────────────────────────────────── */}
      <div
        className={cn(
          "w-full transition-all duration-300 px-0 md:px-4 lg:px-8 pointer-events-auto",
          scrolled
            ? "py-0 md:py-2 bg-white/95 backdrop-blur-md shadow-none md:shadow-md md:border-b md:border-gray-100"
            : "py-0 md:py-3 bg-transparent md:bg-[linear-gradient(to_bottom,#ffffff_50%,transparent_50%)] md:absolute md:top-full md:left-0 md:z-40"
        )}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between w-full gap-3">

          {/* ── MOBILE: Full-Width Clean Header (Logo + Call + Menu) ──────── */}
          <div className="flex items-center justify-between w-full md:hidden bg-white px-3.5 sm:px-4 py-2.5 border-none shadow-none select-none">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logoImg} alt="Upfront AC Logo" className="h-10 sm:h-11 w-auto object-contain scale-110 origin-left my-[-2px]" />
            </Link>

            {/* Right: Phone Call Pill + Hamburger */}
            <div className="flex items-center gap-2.5">
              <a
                href="tel:+17138197908"
                className="flex items-center gap-1.5 bg-[#005CE6] hover:bg-[#004bb8] text-white text-xs font-black rounded-full px-4 py-2 shadow-md shadow-[#005CE6]/25 transition-all active:scale-95"
              >
                <Phone className="h-3.5 w-3.5 fill-white text-white" />
                <span>Call</span>
              </a>

              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-white text-slate-800 shadow-sm transition hover:border-[#005CE6] hover:text-[#005CE6] active:scale-95"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 stroke-[2.2]" />}
              </button>
            </div>
          </div>

          {/* ── DESKTOP: Pill Nav + Call Button ──────────────── */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-3 w-full justify-between">
            {/* Navigation pill */}
            <nav
              className={cn(
                "rounded-full px-3 lg:px-6 py-2.5 flex items-center gap-0.5 lg:gap-1.5 shadow-sm border transition-colors",
                scrolled
                  ? "bg-[#F1F3F5] border-gray-200/60"
                  : "bg-white/90 backdrop-blur-md border-white/40"
              )}
            >
              {navItems.map((item) => {
                if (item.label === t("About Us", "Sobre Nosotros")) {
                  return (
                    <div key={item.label} className="relative group/nav">
                      <a
                        href="#welcome"
                        className="flex items-center gap-1 rounded-full px-2.5 lg:px-3.5 py-2 text-[10px] lg:text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-[#1E293B] hover:text-[#005CE6]"
                      >
                        {t("About Us", "Sobre Nosotros")} <ChevronDown className="h-3 w-3" />
                      </a>
                      <div className="absolute left-0 top-full z-50 pt-2 opacity-0 invisible pointer-events-none group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:pointer-events-auto transition-all duration-200">
                        <div className="w-[280px] bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] p-3 flex flex-col gap-1">
                          {aboutLinks.map((ab) => (
                            <a
                              key={ab.l}
                              href={ab.to}
                              className="group/item flex items-center gap-2.5 rounded-xl p-2.5 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-[#005CE6]/10 flex items-center justify-center text-gray-500 group-hover/item:text-[#005CE6] transition-colors shrink-0">
                                <ab.icon className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[12px] font-bold text-gray-900 group-hover/item:text-[#005CE6] transition-colors leading-tight">{ab.l}</span>
                                <span className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">{ab.desc}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.label === t("Services", "Servicios")) {
                  return (
                    <div key={item.label} className="relative group/nav">
                      <a
                        href="#services"
                        className="flex items-center gap-1 rounded-full px-2.5 lg:px-3.5 py-2 text-[10px] lg:text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-[#1E293B] hover:text-[#005CE6]"
                      >
                        {t("Services", "Servicios")} <ChevronDown className="h-3 w-3" />
                      </a>
                      {/* Dropdown — pt-2 creates a transparent bridge so hover stays active */}
                      <div className="absolute left-0 top-full z-50 pt-2 opacity-0 invisible pointer-events-none group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:pointer-events-auto transition-all duration-200">
                        <div className="w-[580px] max-w-[90vw] bg-white border border-gray-100 rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] p-5 flex flex-col gap-3">
                          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("Our HVAC Services", "Nuestros Servicios de HVAC")}</span>
                            <a href="#services" className="text-[10px] font-black uppercase text-[#005CE6] tracking-wider hover:underline">{t("View All →", "Ver Todos →")}</a>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {serviceLinks.map((srv) => (
                              <a
                                key={srv.l}
                                href={srv.to}
                                className="group/item flex items-start gap-2.5 rounded-xl p-2 hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-[#005CE6]/10 flex items-center justify-center text-gray-500 group-hover/item:text-[#005CE6] transition-colors shrink-0">
                                  <srv.icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[11px] font-bold text-gray-900 group-hover/item:text-[#005CE6] transition-colors leading-tight">{srv.l}</span>
                                  <span className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">{srv.desc}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                          {/* Emergency CTA */}
                          <div className="bg-[#005CE6]/5 border border-[#005CE6]/10 rounded-xl p-2.5 flex justify-between items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#005CE6] flex items-center justify-center text-white shrink-0">
                                <AlertTriangle className="h-4 w-4 animate-pulse" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[11px] font-bold text-gray-900">{t("Need Immediate Assistance?", "¿Necesita Ayuda Inmediata?")}</span>
                                <span className="text-[10px] text-gray-500">{t("24/7 Rapid Response", "Respuesta Rápida 24/7")}</span>
                              </div>
                            </div>
                            <a
                              href="#get-in-touch"
                              className="bg-white border border-gray-200 hover:border-[#005CE6] hover:text-[#005CE6] text-gray-800 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                            >
                              {t("Emergency", "Emergencia")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.to}
                    className="rounded-full px-2.5 lg:px-3.5 py-2 text-[10px] lg:text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-[#1E293B] hover:text-[#005CE6]"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Call Now button */}
            <a
              href="tel:+17138197908"
              className="bg-[#005CE6] hover:bg-[#0047B3] text-white flex items-center gap-2 lg:gap-3 shadow-[0_8px_20px_-6px_rgba(255,107,0,0.6)] transition duration-300 shrink-0 px-3 lg:px-5 py-2 lg:py-2.5"
              style={{ borderRadius: "50px 0px 50px 50px" }}
            >
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/20 shrink-0">
                <Phone className="h-3.5 w-3.5 lg:h-4 lg:w-4 fill-white text-white" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-wider text-white/90">{t("Call Us Now", "Llámenos Ahora")}</span>
                <span className="text-xs lg:text-sm xl:text-base font-extrabold text-white mt-0.5">(713) 819-7908</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ────────────────────────────────────── */}
      <div
        className={cn(
          "md:hidden w-full transition-all duration-300 ease-in-out pointer-events-auto overflow-hidden bg-[#0F172A]",
          open
            ? "max-h-[calc(100vh-60px)] opacity-100 border-t border-slate-800 shadow-2xl"
            : "max-h-0 opacity-0"
        )}
      >
        {/* Semi-transparent Dark Glass Canvas */}
        <div className="w-full bg-[#0F172A] text-white max-h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar">
          <div className="px-4 py-5 flex flex-col gap-5">

            {/* Top Quick Actions Bar: Direct Call + Language Toggle */}
            <div className="grid grid-cols-2 gap-3 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
              <a
                href="tel:+17138197908"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#005CE6] to-[#0047B3] py-2.5 px-3 text-xs font-black text-white shadow-md shadow-[#005CE6]/30 active:scale-95 transition-transform"
              >
                <Phone className="h-3.5 w-3.5 fill-white" />
                <span>(713) 819-7908</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-800/80 p-1 border border-slate-700/60">
                <button
                  onClick={() => setLanguage("en")}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[11px] font-extrabold uppercase transition-all flex items-center justify-center gap-1.5",
                    language === "en"
                      ? "bg-[#005CE6] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <span className="text-xs leading-none">🇬🇧</span>
                  <span>EN</span>
                </button>
                <button
                  onClick={() => setLanguage("es")}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[11px] font-extrabold uppercase transition-all flex items-center justify-center gap-1.5",
                    language === "es"
                      ? "bg-[#005CE6] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <span className="text-xs leading-none">🇪🇸</span>
                  <span>ES</span>
                </button>
              </div>
            </div>

            {/* Navigation Category Items */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                if (item.label === t("About Us", "Sobre Nosotros")) {
                  return (
                    <div key="about-mobile" className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
                      <button
                        onClick={() => setAboutOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-black uppercase tracking-wider text-slate-100 hover:text-[#005CE6] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#005CE6]/15 text-[#005CE6] flex items-center justify-center">
                            <Info className="h-3.5 w-3.5" />
                          </div>
                          <span>{t("About Us", "Sobre Nosotros")}</span>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-300", aboutOpen && "rotate-180 text-[#005CE6]")} />
                      </button>
                      
                      {aboutOpen && (
                        <div className="px-3 pb-3 flex flex-col gap-1 border-t border-slate-800/60 pt-2">
                          {aboutLinks.map((ab) => (
                            <a
                              key={ab.l}
                              href={ab.to}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[#005CE6] shrink-0">
                                <ab.icon className="h-3.5 w-3.5" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold text-slate-200">{ab.l}</span>
                                <span className="text-[10px] text-slate-400 leading-tight">{ab.desc}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.label === t("Services", "Servicios")) {
                  return (
                    <div key="services-mobile" className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-black uppercase tracking-wider text-slate-100 hover:text-[#005CE6] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#005CE6]/15 text-[#005CE6] flex items-center justify-center">
                            <Wrench className="h-3.5 w-3.5" />
                          </div>
                          <span>{t("Services", "Servicios")}</span>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-300", servicesOpen && "rotate-180 text-[#005CE6]")} />
                      </button>

                      {servicesOpen && (
                        <div className="px-3 pb-3 flex flex-col gap-1 border-t border-slate-800/60 pt-2 max-h-[320px] overflow-y-auto custom-scrollbar">
                          {serviceLinks.map((srv) => (
                            <a
                              key={srv.l}
                              href={srv.to}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[#005CE6] shrink-0">
                                <srv.icon className="h-3.5 w-3.5" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold text-slate-200">{srv.l}</span>
                                <span className="text-[10px] text-slate-400 leading-tight line-clamp-1">{srv.desc}</span>
                              </div>
                            </a>
                          ))}
                          <a
                            href="#get-in-touch"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-2.5 text-xs font-extrabold text-red-400 hover:bg-red-500/20 transition-colors mt-1"
                          >
                            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                            <span>{t("Emergency Service 24/7", "Servicio de Emergencia 24/7")}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-200 hover:text-[#005CE6] hover:bg-slate-900/80 transition-all border border-transparent hover:border-slate-800"
                  >
                    <span>{item.label}</span>
                    <span className="text-[#005CE6] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                );
              })}
            </nav>

            {/* Bottom Certification Badge */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 text-slate-300 font-bold text-[11px]">
                <Shield className="h-4 w-4 text-[#005CE6] shrink-0" />
                <span>TACLA133609C</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                24/7 Active
              </span>
            </div>

          </div>
        </div>
      </div>

    </header>
  );
}
