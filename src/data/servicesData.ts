import {
  Wrench,
  Snowflake,
  Activity,
  MapPin,
  Flame,
  CheckCircle2,
  Sparkles,
  Building2,
  Home,
  LucideIcon
} from "lucide-react";
import hvacInstallImg from "@/assets/service-hvac-install.png";
import airConditioningImg from "@/assets/service-air-conditioning.png";
import hvacRepairsImg from "@/assets/service-hvac-repairs.png";
import acCypressImg from "@/assets/service-ac-cypress.png";
import acTomballImg from "@/assets/service-ac-tomball.png";
import heatingImg from "@/assets/service-heating.png";
import hvacMaintenanceImg from "@/assets/service-hvac-maintenance.png";
import indoorAirQualityImg from "@/assets/service-indoor-air-quality.png";
import commercialHvacImg from "@/assets/service-commercial-hvac.png";
import residentialHvacImg from "@/assets/service-residential-hvac.png";
import { ServiceDetailData } from "@/components/site/ServiceDetailPage";

export const servicesDataMap: Record<string, ServiceDetailData> = {
  "hvac-install": {
    id: "hvac-install",
    eyebrow: "Installation & System Replacement",
    title: "HVAC Installation & Custom Comfort Systems",
    subtitle: "Custom design, energy-efficient load calculation, and precision installation for residential replacements and new construction in Tomball & Cypress, TX.",
    badge: "Custom Design & Installation",
    image: hvacInstallImg,
    icon: Wrench,
    leadParagraph: "Air Innovations at Upfront AC takes pride in quality over quantity. We believe ease of use, comfort, and health should take priority when recommending and designing your system. Not every homeowner is the same — why should every system be?",
    specs: ["Custom Duct Design", "Free In-Home Load Calc", "10-Year Parts Warranty"],
    whyUsPoints: ["BBB-Accredited Quality", "100% Upfront Pricing", "Licensed Master Technicians"],
    featuresTitle: "What's Included in Our Custom HVAC Installation",
    features: [
      { title: "Manual J Load Calculation", desc: "Precision thermodynamic sizing to match your home's exact square footage and insulation." },
      { title: "SEER2 Energy Upgrades", desc: "High-efficiency systems reducing monthly energy bills by up to 35%." },
      { title: "Custom Air Distribution", desc: "Balanced duct layout ensuring even cooling and heating across all bedrooms." },
      { title: "Smart Thermostat Setup", desc: "Integration with mobile phone controls, scheduling, and multi-zone climate control." },
      { title: "Dual-Fuel System Options", desc: "Combining gas furnaces with heat pumps for maximum year-round Texas efficiency." },
      { title: "Post-Install Inspection", desc: "Comprehensive airflow testing, refrigerant charge check, and warranty activation." }
    ],
    processSteps: [
      { num: "01", title: "In-Home Assessment", desc: "We evaluate your space, ductwork, and cooling desires." },
      { num: "02", title: "Custom Design Quote", desc: "Upfront pricing options tailored to your home and budget." },
      { num: "03", title: "Precision Installation", desc: "Clean, professional removal and new system placement." },
      { num: "04", title: "Testing & Handshake", desc: "Full performance check and system operation walkthrough." }
    ]
  },

  "air-conditioning": {
    id: "air-conditioning",
    eyebrow: "Air Conditioning Excellence",
    title: "High-Efficiency Air Conditioning Services",
    subtitle: "Complete AC solutions including cooling design, high SEER2 replacements, condenser installations, and rapid cooling restores for Texas heat.",
    badge: "Air Conditioning Solutions",
    image: airConditioningImg,
    icon: Snowflake,
    leadParagraph: "Texas summer heat demands reliable, high-performance air conditioning. Upfront AC provides tailored cooling solutions that keep your home at target temperatures while keeping monthly utility costs under control.",
    specs: ["High SEER2 Systems", "Rapid Cooling Restore", "Quiet Operation Tech"],
    whyUsPoints: ["24/7 Emergency Dispatch", "No Hidden Surcharges", "All Brands Serviced"],
    featuresTitle: "Complete Cooling System Capabilities",
    features: [
      { title: "Central AC Replacement", desc: "Replacing aging, noisy units with quiet, ultra-efficient cooling systems." },
      { title: "Ductless Mini-Split Systems", desc: "Zoned cooling for additions, sunrooms, workshops, and multi-room spaces." },
      { title: "Refrigerant & Coil Diagnostics", desc: "Pinpointing leaks, checking pressure levels, and restoring cooling output." },
      { title: "Variable-Speed Compressors", desc: "Delivering continuous, dehumidified airflow with quiet operation." },
      { title: "Condensate Drain Protection", desc: "Installing float switches to prevent attic water overflows and ceiling leaks." },
      { title: "Sub-Cooling & Superheat Tuning", desc: "Optimizing refrigerant charge for maximum cooling efficiency." }
    ],
    processSteps: [
      { num: "01", title: "Cooling Audit", desc: "Diagnosing air output, coil state, and refrigerant levels." },
      { num: "02", title: "Options Presentation", desc: "Clear repair vs replacement choices with upfront pricing." },
      { num: "03", title: "Execution", desc: "Expert technical repair or precision AC installation." },
      { num: "04", title: "Verification", desc: "Confirming vent temperature drop and system pressure." }
    ]
  },

  "hvac-repairs": {
    id: "hvac-repairs",
    eyebrow: "Emergency & Diagnostic Repair",
    title: "24/7 Rapid HVAC Repair Services",
    subtitle: "Fast, reliable emergency HVAC repair services for frozen coils, electrical failures, blowing warm air, and system breakdowns.",
    badge: "24/7 Emergency Repair",
    image: hvacRepairsImg,
    icon: Activity,
    leadParagraph: "When your AC breaks down in peak Texas summer, you need an honest technician fast. Upfront AC responds 24/7 with fully equipped service trucks and upfront quotes before any work begins.",
    specs: ["Same-Day Service", "Upfront Pricing", "Stocked Service Trucks"],
    whyUsPoints: ["No Sales Pressure", "Diagnose & Fix Right", "Fully Licensed Techs"],
    featuresTitle: "Common HVAC Repairs We Resolve Instantly",
    features: [
      { title: "Blowing Warm Air", desc: "Fixing failed capacitors, broken contactors, and compressor startup issues." },
      { title: "Frozen Evaporator Coils", desc: "Resolving airflow restrictions, dirty filters, and low refrigerant charges." },
      { title: "Water Leaking from Unit", desc: "Clearing clogged condensate drain lines and repairing drain pan cracks." },
      { title: "Frequent System Cycling", desc: "Fixing thermostat communication errors and sensor calibration faults." },
      { title: "Electrical & Breaker Trips", desc: "Tracing short circuits, burnt wiring, and relay board failures." },
      { title: "Unusual Rattling & Screeching", desc: "Replacing worn fan blower motors, bearings, and loose fan blades." }
    ],
    processSteps: [
      { num: "01", title: "24/7 Dispatch", desc: "Call (713) 819-7908 for immediate technician dispatch." },
      { num: "02", title: "Comprehensive Check", desc: "Complete 21-point electrical and mechanical diagnostic." },
      { num: "03", title: "Upfront Quote", desc: "Written price upfront before any work starts." },
      { num: "04", title: "Instant Repair", desc: "Fixed on the spot with high-quality OEM components." }
    ]
  },

  "ac-repair-cypress": {
    id: "ac-repair-cypress",
    eyebrow: "Local Service Cypress, TX",
    title: "AC Repair Services in Cypress, TX",
    subtitle: "Dedicated local AC repair, cooling maintenance, and emergency HVAC response tailored for Cypress homeowners and businesses.",
    badge: "Cypress, TX Local Techs",
    image: acCypressImg,
    icon: MapPin,
    leadParagraph: "As your local Cypress HVAC contractor, Upfront AC understands the unique weather and neighborhood cooling demands in Towne Lake, Bridgeland, Fairfield, and surrounding Cypress areas.",
    specs: ["Fast Cypress Arrival", "Zero Travel Surcharges", "Licensed Cypress Pros"],
    whyUsPoints: ["Neighborhood Trusted", "Upfront Written Quotes", "Family Owned Service"],
    featuresTitle: "Tailored AC Solutions for Cypress Neighborhoods",
    features: [
      { title: "Rapid Emergency Response", desc: "Local technicians stationed near Hwy 290 and Grand Parkway for fast arrival." },
      { title: "Attic Unit Specialists", desc: "Expert servicing for high-temperature Cypress attic furnaces and coils." },
      { title: "High-Efficiency Retrofits", desc: "Upgrading older 10-14 SEER systems to modern 16+ SEER2 energy standards." },
      { title: "Pre-Summer Tune-Ups", desc: "Comprehensive seasonal care to prevent peak-summer AC lockouts." },
      { title: "Duct Inspection & Sealing", desc: "Fixing leaky ducts in Cypress homes to stop cool air loss in attics." },
      { title: "Honest Second Opinions", desc: "Free second opinions on major compressor or heat exchanger replacement quotes." }
    ],
    processSteps: [
      { num: "01", title: "Local Call", desc: "Reach our local dispatch team for fast Cypress scheduling." },
      { num: "02", title: "On-Site Diagnostic", desc: "Thorough inspection of indoor and outdoor cooling units." },
      { num: "03", title: "Clear Pricing", desc: "Transparent, flat-rate pricing with zero hidden fees." },
      { num: "04", title: "Cool Comfort", desc: "Restoring ice-cold air to your Cypress home." }
    ]
  },

  "ac-repair-tomball": {
    id: "ac-repair-tomball",
    eyebrow: "Tomball Headquarters",
    title: "Trusted AC Repair in Tomball, TX",
    subtitle: "Tomball's local HVAC experts providing fast air conditioning repairs, furnace maintenance, and custom replacement systems.",
    badge: "Tomball Hometown Service",
    image: acTomballImg,
    icon: MapPin,
    leadParagraph: "Headquartered in Tomball, TX, Upfront AC treats every customer like a neighbor. Founded by Allen Swindell, we deliver honest advice, double-checked craftsmanship, and personal care.",
    specs: ["Tomball Native Team", "BBB-Accredited", "Same-Day Booking"],
    whyUsPoints: ["Integrity First", "Upfront Pricing Always", "No Pressure Sales"],
    featuresTitle: "Hometown HVAC Services for Tomball Residents",
    features: [
      { title: "Emergency AC Fixes", desc: "Resolving unexpected cooling shutdowns in Tomball homes immediately." },
      { title: "Freon & Puron Recharges", desc: "Finding refrigerant leaks and topping off R-410A / R-32 systems." },
      { title: "Fan & Blower Motor Repair", desc: "Replacing noisy or seized condenser motors and indoor blower wheels." },
      { title: "Thermostat Diagnostics", desc: "Calibrating temperature sensors and replacing failed digital controls." },
      { title: "Compressor Protection", desc: "Installing hard start kits and surge protectors to guard against Texas storms." },
      { title: "Whole-Home Comfort Tuning", desc: "Adjusting fan speeds and airflow registers for balanced cooling." }
    ],
    processSteps: [
      { num: "01", title: "Hometown Contact", desc: "Call (713) 819-7908 to connect with Allen & team." },
      { num: "02", title: "Master Tech Arrival", desc: "Prompt arrival by certified, background-checked technicians." },
      { num: "03", title: "Upfront Guarantee", desc: "Full explanation of the issue and exact cost upfront." },
      { num: "04", title: "Job Done Right", desc: "Work completed with double-checked quality standards." }
    ]
  },

  "heating": {
    id: "heating",
    eyebrow: "Furnaces & Heat Pumps",
    title: "Heating & Gas Furnace Repair & Installation",
    subtitle: "Complete furnace repairs, heat pump maintenance, heat exchanger inspections, and emergency heating solutions for Texas winter freezes.",
    badge: "Furnace & Heating Experts",
    image: heatingImg,
    icon: Flame,
    leadParagraph: "Texas winters can bring sudden hard freezes. Upfront AC keeps your family warm and safe with expert furnace repairs, heat pump tuning, and carbon monoxide safety checks.",
    specs: ["Gas & Electric Furnaces", "Carbon Monoxide Tested", "Heat Pump Specialists"],
    whyUsPoints: ["Safety-First Protocols", "Honest Diagnostics", "100% Guaranteed"],
    featuresTitle: "Comprehensive Heating Capabilities",
    features: [
      { title: "Gas Furnace Repair", desc: "Fixing igniters, flame sensors, gas valves, and draft inducer motors." },
      { title: "Heat Exchanger Safety Test", desc: "Inspecting for dangerous cracks to prevent carbon monoxide exposure." },
      { title: "Electric Heater Servicing", desc: "Replacing burnt heating elements, sequencers, and safety limit switches." },
      { title: "Heat Pump Reversing Valves", desc: "Repairing defrost boards and reversing valves for seamless heating mode." },
      { title: "Energy-Efficient Heating", desc: "Installing high-efficiency 96%+ AFUE gas furnaces and variable heat pumps." },
      { title: "Pre-Winter Tune-Up", desc: "Cleaning burners, testing safety shutoffs, and ensuring clean ignition." }
    ],
    processSteps: [
      { num: "01", title: "Heating Request", desc: "Fast booking when your furnace fails during cold snaps." },
      { num: "02", title: "Safety Diagnostic", desc: "Testing electrical connections, gas pressure, and heat sensors." },
      { num: "03", title: "Upfront Solution", desc: "Flat-rate pricing for repair or replacement." },
      { num: "04", title: "Warm & Safe", desc: "System tested, calibrated, and certified safe for your family." }
    ]
  },

  "hvac-maintenance": {
    id: "hvac-maintenance",
    eyebrow: "Preventative Maintenance",
    title: "Preventative HVAC Maintenance & Tune-Ups",
    subtitle: "Keep your system running efficiently, prevent costly breakdowns, and extend equipment lifespan with our 21-Point Seasonal Tune-Up.",
    badge: "21-Point System Tune-Up",
    image: hvacMaintenanceImg,
    icon: CheckCircle2,
    leadParagraph: "Regular maintenance is the single best investment you can make in your HVAC system. Our 21-point tune-up catches minor wear before it turns into expensive mid-summer breakdowns.",
    specs: ["21-Point Inspection", "Lowers Monthly Bills", "Extends System Life"],
    whyUsPoints: ["Priority Service Dispatch", "Discounts on Repairs", "Detailed Written Report"],
    featuresTitle: "What's Included in Our 21-Point Tune-Up",
    features: [
      { title: "Condenser Coil Wash", desc: "Removing dirt, leaves, and debris to optimize heat release and cooling." },
      { title: "Refrigerant Level Check", desc: "Measuring operating pressures and sub-cooling for peak efficiency." },
      { title: "Electrical Tightening & Amps", desc: "Inspecting contactors, capacitors, and measuring motor running amps." },
      { title: "Drain Line Flush", desc: "Clearing condensate lines with algaecide to prevent water overflows." },
      { title: "Blower Assembly Inspection", desc: "Checking wheel balance, motor bearings, and static pressure." },
      { title: "Thermostat & Safety Controls", desc: "Verifying temperature calibration and emergency safety cutoffs." }
    ],
    processSteps: [
      { num: "01", title: "Scheduled Visit", desc: "Convenient appointment times fitting your schedule." },
      { num: "02", title: "21-Point Execution", desc: "Thorough cleaning, testing, and system calibration." },
      { num: "03", title: "Health Report", desc: "Clear digital summary of system performance & wear." },
      { num: "04", title: "Peace of Mind", desc: "System optimized for maximum summer & winter efficiency." }
    ]
  },

  "indoor-air-quality": {
    id: "indoor-air-quality",
    eyebrow: "Clean Air Solutions",
    title: "Whole-Home Indoor Air Quality & Filtration",
    subtitle: "Breathe cleaner, healthier air with whole-home UV germicidal purifiers, HEPA air filtration, dehumidification, and duct sanitation.",
    badge: "Pure Clean Air Tech",
    image: indoorAirQualityImg,
    icon: Sparkles,
    leadParagraph: "Indoor air can be up to 5x more polluted than outdoor air. Upfront AC installs medical-grade air purification and humidity control systems that remove allergens, dust mites, mold spores, and viruses.",
    specs: ["UV Germicidal Lights", "Whole-Home Dehumidifiers", "MERV 13+ HEPA Filters"],
    whyUsPoints: ["Allergy & Asthma Relief", "Odor Elimination", "Family Health First"],
    featuresTitle: "Advanced Air Purification & Filtration Options",
    features: [
      { title: "Whole-Home UV Light Purifiers", desc: "Neutralizing airborne bacteria, mold, and viruses inside your ductwork." },
      { title: "High-MERV Media Air Cleaners", desc: "Capturing microscopic dust, pollen, pet dander, and smoke particles." },
      { title: "Whole-Home Dehumidification", desc: "Removing excess Texas mugginess so your home feels cooler at higher thermostat settings." },
      { title: "Air Duct Sanitation & Sealing", desc: "Sanitizing air channels to eliminate musty odors and dust buildup." },
      { title: "Fresh Air Ventilation (ERV/HRV)", desc: "Bringing fresh, filtered outdoor air into energy-efficient tight homes." },
      { title: "Static Pressure Optimization", desc: "Ensuring high-efficiency filters don't restrict furnace airflow." }
    ],
    processSteps: [
      { num: "01", title: "Air Quality Audit", desc: "Testing home humidity, particulate levels, and airflow." },
      { num: "02", title: "Custom Purification Plan", desc: "Recommending filtration & UV lights suited to your health goals." },
      { num: "03", title: "Seamless Integration", desc: "Professional installation into existing ductwork." },
      { num: "04", title: "Pure Air Restored", desc: "Noticeably cleaner, fresher air throughout your entire home." }
    ]
  },

  "commercial-hvac": {
    id: "commercial-hvac",
    eyebrow: "Commercial Climate Care",
    title: "Commercial HVAC Services & Rooftop Units",
    subtitle: "Heavy-duty commercial heating, cooling, rooftop package units, VRF systems, and scheduled maintenance for business facilities.",
    badge: "Commercial HVAC Specialists",
    image: commercialHvacImg,
    icon: Building2,
    leadParagraph: "Business downtime means lost revenue. Upfront AC provides fast, reliable commercial HVAC repairs, rooftop unit replacements, and custom maintenance contracts for offices, retail, and warehouses.",
    specs: ["Rooftop Package Units", "Commercial Contracts", "Minimal Business Downtime"],
    whyUsPoints: ["24/7 Priority Commercial", "Licensed & Insured", "Upfront Commercial Pricing"],
    featuresTitle: "Heavy-Duty Commercial HVAC Solutions",
    features: [
      { title: "Rooftop Unit (RTU) Repair", desc: "Expert servicing for 3-ton to 25-ton commercial rooftop package units." },
      { title: "Commercial System Replacement", desc: "Turnkey replacement of aging commercial units with minimal disruption." },
      { title: "Scheduled Maintenance Contracts", desc: "Quarterly filter changes, belt replacements, and coil washing for businesses." },
      { title: "VRF & Multi-Zone Systems", desc: "Custom climate control for individual offices, server rooms, and conference areas." },
      { title: "Commercial Air Balancer", desc: "Ensuring compliant fresh air intake and balanced airflow across large facilities." },
      { title: "Emergency Commercial Response", desc: "Rapid dispatch to protect heat-sensitive inventory and customer comfort." }
    ],
    processSteps: [
      { num: "01", title: "Facility Inspection", desc: "Evaluating building tonnage, duct static, and equipment state." },
      { num: "02", title: "Tailored Proposal", desc: "Detailed commercial quote with minimal downtime planning." },
      { num: "03", title: "Professional Execution", desc: "Crane lifts, roof safety, and precision commercial setup." },
      { num: "04", title: "Ongoing Support", desc: "Scheduled maintenance keeping your business running smoothly." }
    ]
  },

  "residential-hvac": {
    id: "residential-hvac",
    eyebrow: "Residential Home Comfort",
    title: "Residential HVAC Heating & Cooling Solutions",
    subtitle: "Tailored home heating, cooling, zoning, and preventative care designed specifically for Texas families and single-family residences.",
    badge: "Residential HVAC Experts",
    image: residentialHvacImg,
    icon: Home,
    leadParagraph: "Your home should be your sanctuary. Upfront AC designs and services residential heating and cooling systems that deliver whisper-quiet operation, consistent temperatures, and low monthly bills.",
    specs: ["Custom Home Zoning", "Whisper-Quiet AC", "Family-First Care"],
    whyUsPoints: ["Respect Your Home", "Clean Technician Work", "100% Satisfaction Guarantee"],
    featuresTitle: "Complete Home Comfort Solutions",
    features: [
      { title: "Whole-Home AC & Heating", desc: "Tailored systems for single-story, two-story, and custom residential layouts." },
      { title: "Multi-Zone Climate Control", desc: "Independent temperature settings for upstairs bedrooms and main living spaces." },
      { title: "Attic Insulation & Duct Upgrades", desc: "Reducing heat transfer in Texas attics to ease the load on your AC unit." },
      { title: "Smart Thermostat Integration", desc: "Controlling home comfort remotely via mobile app with energy reporting." },
      { title: "Noise Reduction Dampeners", desc: "Installing sound blankets and isolated mounts for whisper-quiet cooling." },
      { title: "Residential Service Plans", desc: "Affordable annual maintenance keeping your home comfort worry-free." }
    ],
    processSteps: [
      { num: "01", title: "Home Evaluation", desc: "Understanding your family's comfort preferences and budget." },
      { num: "02", title: "Clear Recommendation", desc: "Upfront options explaining energy savings and warranties." },
      { num: "03", title: "Clean Installation", desc: "Technicians use shoe covers and drop cloths to protect your home." },
      { num: "04", title: "Family Handshake", desc: "Walkthrough showing you how to operate your new system." }
    ]
  }
};
