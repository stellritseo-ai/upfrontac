import type { PhotoCategory } from "./photo-meta";
import { cloudinaryResize } from "@/lib/projects-lib";

/**
 * Field-documented HVAC project entries built strictly from real photographs uploaded to the
 * Upfront AC & Heating Cloudinary gallery.
 *
 * INTEGRITY RULES:
 *  - Only use original photographs supplied by the business.
 *  - Describe only what is directly visible in the photographs (equipment type, brazing, crane
 *    rigging, coil washing, gauge readings, sheet-metal fabrication, zone boards).
 *  - Never fabricate customer names, street addresses, or testimonials.
 *  - Location is listed at the service-area level unless the owner tags a specific city/subdivision.
 */
export interface ProjectCase {
  slug: string;
  title: string;
  /** Service area or owner-verified city. */
  location: string;
  category: PhotoCategory;
  equipmentType: string;
  customerProblem: string;
  workCompleted: string[];
  result: string;
  /** ISO date the project photos were archived/uploaded. */
  projectDate: string;
  serviceLinks: { label: string; to: string }[];
  images: { url: string; thumb: string; large: string; alt: string }[];
  testimonial?: { quote: string; author: string };
}

function img(url: string, alt: string) {
  return {
    url,
    thumb: cloudinaryResize(url, 720),
    large: cloudinaryResize(url, 1600),
    alt,
  };
}

export const PROJECT_CASES: ProjectCase[] = [
  {
    slug: "commercial-rooftop-hvac-crane-rigging-and-commissioning",
    title: "Commercial Rooftop Packaged Unit Crane Lift & Commissioning",
    location: "Greater Houston & Tomball Commercial Service Area",
    category: "commercial",
    equipmentType: "Commercial Packaged Rooftop HVAC Units (RTU)",
    customerProblem:
      "Aging commercial rooftop packaged equipment requiring crane-assisted rigging, safe roof placement, and electrical/control commissioning with minimal disruption to building operations.",
    workCompleted: [
      "Coordinated commercial crane staging and rigging in the property parking area with safety perimeter cones.",
      "Hoisted packaged rooftop HVAC units onto the flat commercial roof curb.",
      "Opened control and blower compartments for two-technician electrical tie-in, belt-drive blower inspection, and startup checks.",
    ],
    result:
      "Packaged rooftop units safely set on roof curbs, wired, and inspected for commercial cooling and airflow operation.",
    projectDate: "2026-08-17",
    serviceLinks: [
      { label: "Commercial HVAC Services", to: "/services/commercial-hvac" },
      { label: "HVAC Installation", to: "/services/hvac-install" },
    ],
    images: [
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998781/upfrontac/residential/irn1lb3flhrpyx10sxth.jpg",
        "Crane lifting a commercial rooftop HVAC unit onto a flat-roof commercial building"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998814/upfrontac/residential/fdxjbw1ryhrvkot5gnhk.jpg",
        "Crane staged in a commercial parking lot with rooftop HVAC unit on flatbed trailer"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998817/upfrontac/residential/ribqgoyn45en7bwm7y2i.jpg",
        "Crane hoisting a packaged HVAC unit onto a commercial building roof"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998887/upfrontac/residential/h27ecuxceo4el6brxqhn.webp",
        "Commercial rooftop HVAC unit installed on a flat roof curb"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998752/upfrontac/residential/um1yhunlerhicblgrmxs.webp",
        "Two Upfront AC technicians servicing the interior of a commercial rooftop unit"
      ),
    ],
  },
  {
    slug: "residential-condenser-installations-goodman-lennox",
    title: "Residential Split-System Condenser Installations (Goodman & Lennox)",
    location: "Northwest Houston, Tomball & Cypress Service Area",
    category: "install",
    equipmentType: "Goodman & Lennox Residential Split-System Outdoor Condensers",
    customerProblem:
      "Homeowners replacing worn outdoor condensing units needed properly leveled pads, weather-sealed electrical whips and disconnects, and insulated suction line sets.",
    workCompleted: [
      "Positioned new outdoor condensing units on level equipment pads with proper clearance from brick and siding walls.",
      "Connected electrical service disconnects, liquid-tight conduit whips, and insulated refrigerant line sets.",
      "Verified refrigerant charge and electrical draw at startup.",
    ],
    result:
      "Clean, level outdoor condenser installations with protected refrigerant insulation and accessible service disconnects.",
    projectDate: "2026-08-17",
    serviceLinks: [
      { label: "HVAC Installation & Replacement", to: "/services/hvac-install" },
      { label: "Residential HVAC Services", to: "/services/residential-hvac" },
      { label: "Air Conditioning Services", to: "/services/air-conditioning" },
    ],
    images: [
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998857/upfrontac/residential/fgfz0rrrrtb3rmqd0yco.webp",
        "Two matching residential condensing units installed on concrete equipment pads beside a brick home"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998859/upfrontac/residential/jckmqk4cw20oeblhurnn.webp",
        "Lennox residential outdoor condenser installed beside a brick wall"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998863/upfrontac/residential/nknpznxzbreczqwb4tjz.jpg",
        "Goodman residential condenser installed beside a brick home with disconnect box"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998861/upfrontac/residential/zuj9xjcmbvknjnmuznfw.jpg",
        "New Goodman condensing unit set on a concrete pad beside a residential home"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998875/upfrontac/residential/nsvmw4t3fgsnvxgl2xkf.jpg",
        "Goodman outdoor condenser during post-installation inspection"
      ),
    ],
  },
  {
    slug: "refrigerant-recovery-filter-drier-brazing-line-set-service",
    title: "Refrigerant Recovery, Liquid-Line Filter Drier & Torch Brazing Service",
    location: "Greater Houston & Tomball Service Area",
    category: "repair",
    equipmentType: "Split-System & Commercial Refrigerant Circuits with Filter Driers",
    customerProblem:
      "Refrigerant circuit repairs and component replacements require EPA-compliant refrigerant recovery, clean copper-to-copper brazing, and a new liquid-line filter drier to protect the compressor from moisture and debris.",
    workCompleted: [
      "Connected refrigerant recovery equipment and cylinder to recover existing charge in accordance with EPA Section 608 procedures.",
      "Installed replacement liquid-line filter driers and brazed copper refrigerant joints using heat shields to protect nearby insulation and cabinetry.",
      "Re-insulated suction lines and pressure-tested the circuit before evacuation and recharge.",
    ],
    result:
      "Sealed, pressure-tested refrigerant connections with new filter driers installed and line-set insulation restored.",
    projectDate: "2026-08-17",
    serviceLinks: [
      { label: "HVAC Repairs", to: "/services/hvac-repairs" },
      { label: "AC Repair in Tomball", to: "/services/ac-repair-tomball" },
      { label: "AC Repair in Cypress", to: "/services/ac-repair-cypress" },
    ],
    images: [
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786999037/upfrontac/residential/dvd1eyynk0dwx7kijzry.jpg",
        "Technician brazing a refrigerant line set and liquid-line filter drier"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786999034/upfrontac/residential/dnercbrq5asod17qwxsj.jpg",
        "Technicians operating refrigerant recovery equipment and recovery cylinder during service"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786999039/upfrontac/residential/fwt9rhbnthdi2vj91xio.jpg",
        "Close-up of copper refrigerant line brazing with a protective heat shield"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786999030/upfrontac/residential/iuvhmo6n5nl9mruieb15.jpg",
        "Two technicians brazing refrigerant connections inside a yellow safety rail"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786999042/upfrontac/residential/mp3jfa1j6ojqxkjo5jr3.jpg",
        "Technicians completing copper line-set brazing and filter drier installation"
      ),
    ],
  },
  {
    slug: "custom-sheet-metal-duct-plenum-and-multi-zone-controls",
    title: "Custom Sheet-Metal Duct Plenum Fabrication & Multi-Zone Control Wiring",
    location: "Northwest Houston & Tomball Service Area",
    category: "install",
    equipmentType: "Fabricated Galvanized Sheet-Metal Plenums & Honeywell Zone Control Panel",
    customerProblem:
      "Tight interior utility chases and multi-zone homes require custom-fitted sheet-metal supply/return plenums and organized zone damper wiring to balance airflow between zones.",
    workCompleted: [
      "Installed custom-fabricated galvanized sheet-metal duct plenums and transitions inside interior chases.",
      "Wired and commissioned a multi-zone control board with labeled thermostat and damper connections.",
      "Verified zone status indicators and airflow routing.",
    ],
    result:
      "Rigid, low-leakage sheet-metal plenum transitions and a cleanly wired zone control board for multi-zone comfort.",
    projectDate: "2026-09-29",
    serviceLinks: [
      { label: "HVAC Installation", to: "/services/hvac-install" },
      { label: "Indoor Air Quality & Ductwork", to: "/services/indoor-air-quality" },
      { label: "Residential HVAC", to: "/services/residential-hvac" },
    ],
    images: [
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1790721074/upfrontac/residential/fg78l4f5gfid0zj6gzfs.jpg",
        "New galvanized sheet-metal duct plenum installed in an interior utility chase"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1790721071/upfrontac/residential/gu4wydne2eh3g693dytd.jpg",
        "Curved fabricated sheet-metal ductwork installed in an elevated interior space"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998819/upfrontac/residential/har83ehr6dsgppcrzeh8.webp",
        "Honeywell zone control panel wired with status LEDs lit during commissioning"
      ),
    ],
  },
  {
    slug: "evaporator-and-condenser-coil-deep-cleaning-and-diagnostics",
    title: "Evaporator & Condenser Coil Deep Cleaning and Digital Gauge Diagnostics",
    location: "Tomball, Cypress & Greater Houston Service Area",
    category: "repair",
    equipmentType: "A-Frame Evaporator Coils, Condenser Coils & Digital Manifold Gauges",
    customerProblem:
      "Impacted dirt, grass clippings, and biological buildup on evaporator and condenser coils restrict heat transfer, raise head pressure, and reduce cooling capacity during Houston summers.",
    workCompleted: [
      "Connected digital and analog manifold gauge sets and clamp meters to record operating pressures, superheat/subcooling, and amp draw.",
      "Removed and washed heavily fouled A-frame evaporator coils and rinsed outdoor condenser coils from the inside out.",
      "Reassembled cabinetry and verified restored airflow and pressure readings.",
    ],
    result:
      "Clean coil fin surfaces for proper heat rejection and verified refrigerant operating pressures.",
    projectDate: "2026-09-29",
    serviceLinks: [
      { label: "HVAC Maintenance & Tune-Ups", to: "/services/hvac-maintenance" },
      { label: "Air Conditioning Services", to: "/services/air-conditioning" },
      { label: "Upfront Flat-Rate Pricing", to: "/upfront-pricing" },
    ],
    images: [
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1790721081/upfrontac/residential/ogfkfygyx5fxlw8abd1k.jpg",
        "Technician washing a removed A-frame evaporator coil assembly"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1790721078/upfrontac/residential/pycbaintitwy8ery5nt0.jpg",
        "Heavily fouled HVAC evaporator coil being foamed and rinsed clean"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998766/upfrontac/residential/mdc6hw2crpnthzqo64dj.webp",
        "Technician washing an outdoor condenser coil with a sprayer"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998812/upfrontac/residential/q2honx2c4z0dexfpiczq.webp",
        "Digital manifold gauge set displaying refrigerant pressures during system diagnosis"
      ),
      img(
        "https://res.cloudinary.com/swvkivle/image/upload/v1786998865/upfrontac/residential/lpgpm6ubzbdqpalpv2ve.jpg",
        "Digital refrigerant gauges and electrical clamp meters connected to an outdoor unit"
      ),
    ],
  },
];

export const getProjectCase = (slug: string) =>
  PROJECT_CASES.find((p) => p.slug === slug);
