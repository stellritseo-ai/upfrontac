import type { Article } from "./article-types";

/**
 * Knowledge Center articles.
 *
 * NOTE: These are drafts for owner review. All technical facts, price ranges and
 * regulatory statements must be re-verified by a licensed technician before
 * publication, and Upfront price quotes must match /upfront-pricing at the time
 * of publishing.
 */
export const ARTICLES: Article[] = [
  // ---------------------------------------------------------------------------
  // 1
  // ---------------------------------------------------------------------------
  {
    slug: "ac-running-not-cooling",
    title: "Why Is My AC Running but Not Cooling?",
    metaTitle: "AC Running but Not Cooling? Causes and Fixes",
    metaDescription:
      "AC blowing warm air? Learn the common causes, from dirty filters and frozen coils to bad capacitors and low refrigerant, and when to call a pro.",
    answer:
      "An air conditioner that runs but does not cool is usually suffering from restricted airflow (a dirty filter or iced-over coil), a failed outdoor component such as a capacitor or fan motor, or low refrigerant caused by a leak. A few simple checks can rule out the easy causes, but anything involving refrigerant or electrical parts needs a licensed technician.",
    category: "Cooling",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "How cooling works, and where it breaks down" },
      {
        type: "p",
        text: "An AC does not create cold air. It moves heat. The indoor evaporator coil absorbs heat and moisture from your home's air, refrigerant carries that heat outside, and the outdoor condenser coil releases it. If any link in that chain fails, the blower can keep running and pushing air through your vents while the air never actually gets cold.",
      },
      { type: "h2", text: "Common causes of an AC that runs but blows warm air" },
      { type: "h3", text: "Restricted airflow" },
      {
        type: "p",
        text: "A clogged filter, blocked return grille or dirty evaporator coil cuts the amount of air crossing the coil. With too little warm air passing over it, the coil can get cold enough to freeze, and then airflow drops even further. This is one of the most common reasons a system suddenly stops cooling in the middle of summer.",
      },
      { type: "h3", text: "The outdoor unit is not doing its job" },
      {
        type: "p",
        text: "If the indoor blower is running but the outdoor fan or compressor is not, the air from your vents will be around room temperature or only slightly cool. Typical culprits are a weak or failed run or start capacitor, a worn contactor, a failed condenser fan motor, or a compressor that has tripped on a safety. A humming or clicking outdoor unit that never settles into a steady run is a classic sign.",
      },
      { type: "h3", text: "Low refrigerant" },
      {
        type: "p",
        text: "Refrigerant is not used up like fuel. If the charge is low, there is a leak somewhere, often at a coil, a braze joint or a service valve. Topping off without finding and repairing the leak is only a temporary fix, and handling refrigerant legally requires EPA Section 608 certification, so it is not a homeowner task.",
      },
      { type: "h3", text: "A dirty condenser or a heavy heat load" },
      {
        type: "p",
        text: "If the outdoor coil is matted with cottonwood fluff, grass clippings or dirt, the system cannot shed heat and cooling drops off, especially in the afternoon. Older, undersized or leaky-duct systems can also fall behind on the hottest days even when nothing is technically broken.",
      },
      { type: "h2", text: "What you can safely check yourself" },
      {
        type: "ol",
        items: [
          "Confirm the thermostat is set to Cool, the fan is set to Auto, and the set temperature is several degrees below the current room temperature. If the display is dim or blank, replace the batteries.",
          "Check the air filter. If it is gray, matted or you cannot see light through it, replace it.",
          "Make sure supply vents are open and that furniture, rugs or curtains are not blocking return grilles.",
          "Look at the outdoor unit from a safe distance. Is the fan spinning? Is the coil covered in debris? Clear loose leaves from around it and keep about two feet of open space on all sides. Never put your hands or tools near the fan.",
          "Look for ice on the larger copper refrigerant line or on the indoor unit. If you see ice, turn the system off at the thermostat and set the fan to On to help it thaw. Do not keep running the AC with a frozen coil.",
          "Check your electrical panel for a tripped breaker labeled for the AC or air handler. You may reset it one time. If it trips again, leave it off and call for service.",
        ],
      },
      {
        type: "callout",
        title: "When to stop and call a licensed professional",
        text: "Call a licensed HVAC contractor if ice returns after thawing, the outdoor unit hums but the fan or compressor will not start, a breaker keeps tripping, you see oily residue on refrigerant lines, you hear hissing, or you smell burning. Do not open electrical panels or access doors on the equipment, and do not try to add refrigerant yourself.",
      },
      { type: "h2", text: "What a technician actually does to find the problem" },
      {
        type: "p",
        text: "A good diagnostic is a measured process, not a guess. A technician will typically confirm the thermostat call for cooling, check airflow and measure static pressure, compare the temperature of the air entering and leaving the evaporator coil, and test the capacitor, contactor and motors with a meter. They will also check the amp draw of the compressor and fans.",
      },
      {
        type: "p",
        text: "Only after airflow is confirmed do they read refrigerant pressures and calculate superheat and subcooling, which show whether the charge is correct. If the charge is low, a leak search follows, using an electronic detector, dye or a nitrogen pressure test. Repairing the leak, evacuating the system and weighing in the correct charge is the proper fix.",
      },
      { type: "h2", text: "Houston and Gulf Coast factors" },
      {
        type: "p",
        text: "Our cooling season is long, and systems here often run for months with few breaks. That wears out capacitors, contactors and motors faster than in milder climates. Hot attics can push duct and air handler temperatures well above comfortable levels, humid air makes the coil work harder, and storm-season power surges can stress control boards and capacitors. A whole-home surge protector and a clean, free-flowing system go a long way toward preventing breakdowns on the hottest days.",
      },
      {
        type: "p",
        text: "If your AC is running but not cooling, shut it off rather than letting it labor. Continuing to run a system with a failing component or a frozen coil can turn a modest repair into a compressor failure.",
      },
    ],
    relatedServices: [
      { label: "HVAC repair services", to: "/services/hvac-repairs" },
      { label: "Air conditioning service", to: "/services/air-conditioning" },
      { label: "AC repair in Tomball", to: "/services/ac-repair-tomball" },
      { label: "Flat-rate pricing", to: "/upfront-pricing" },
    ],
    relatedArticles: [
      "frozen-evaporator-coil-causes",
      "ac-repair-cost-houston",
      "how-often-change-hvac-filter",
    ],
    faqs: [
      {
        q: "Can a dirty air filter really stop my AC from cooling?",
        a: "Yes. A badly clogged filter starves the evaporator coil of airflow, which can cause the coil to freeze and the air from your vents to turn warm. Replacing the filter is the first and safest thing to check.",
      },
      {
        q: "Is it okay to keep running my AC if it is blowing warm air?",
        a: "It is better not to. If the cause is a frozen coil, a failing capacitor or a refrigerant leak, continued running can damage the compressor. Turn it off and have it diagnosed.",
      },
      {
        q: "How can I tell if the problem is indoors or outdoors?",
        a: "If your vents are blowing air but it is not cold and the outdoor fan is not spinning, the issue is likely in the outdoor unit. If the outdoor unit runs but airflow is weak or ice is visible, the issue is more likely indoors. A technician can confirm with measurements.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 2
  // ---------------------------------------------------------------------------
  {
    slug: "ac-repair-cost-houston",
    title: "How Much Does AC Repair Cost in Houston, TX?",
    metaTitle: "AC Repair Cost in Houston, TX: What to Expect",
    metaDescription:
      "What drives AC repair costs in Houston, typical price ranges for common repairs, and why flat-rate pricing beats surprise hourly bills for homeowners.",
    answer:
      "Most AC repairs in the Houston area fall somewhere between a couple hundred dollars for a simple electrical part and several thousand for a major component like a compressor or evaporator coil. The final number depends on the part, the labor, refrigerant, access and the time of day you call, which is why a clear, flat-rate quote matters.",
    category: "Costs",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 5,
    body: [
      { type: "h2", text: "What drives the cost of an AC repair" },
      {
        type: "p",
        text: "No two repair calls are identical, but the same handful of factors shape almost every bill.",
      },
      {
        type: "ul",
        items: [
          "Diagnostic or service call fee: the charge for a technician to come out, test the system and identify the cause. Some companies apply it toward the repair; others do not.",
          "Parts: a capacitor is a small, inexpensive part, while a compressor or coil is a major component. Brand, capacity and whether the part is original-equipment or aftermarket all matter.",
          "Labor: the time a repair takes, and whether the company charges a flat rate or bills by the hour.",
          "Refrigerant: if the system has a leak, the cost includes finding the leak, repairing it and recharging the system. The type of refrigerant matters a great deal, because older R-22 is far more expensive than modern R-410A.",
          "Access: units in tight closets, hot attics or on rooftops take longer and can be harder to work on.",
          "Timing: evenings, weekends and holidays commonly carry a higher service call fee.",
        ],
      },
      { type: "h2", text: "Typical price ranges for common repairs" },
      {
        type: "p",
        text: "The following are general ranges seen across the Houston area for common residential repairs. They are typical ranges only, and actual quotes vary by company, equipment and circumstances.",
      },
      {
        type: "ul",
        items: [
          "Diagnostic or service call: roughly 75 to 200 dollars",
          "Capacitor replacement: roughly 150 to 450 dollars",
          "Contactor replacement: roughly 150 to 400 dollars",
          "Condensate drain clearing: roughly 100 to 300 dollars",
          "Condenser fan motor: roughly 400 to 1,000 dollars",
          "Blower motor: roughly 500 to 1,500 dollars, with variable-speed motors at the high end",
          "Refrigerant leak repair and recharge: roughly 500 to 2,500 dollars or more, depending on where the leak is",
          "Evaporator coil replacement: roughly 1,500 to 4,000 dollars or more",
          "Compressor replacement: roughly 1,500 to 3,500 dollars or more, and often a point where replacement of the whole system deserves a second look",
        ],
      },
      { type: "h2", text: "Why flat-rate pricing is easier to trust" },
      {
        type: "p",
        text: "Hourly billing can leave you guessing. A repair that takes twice as long as expected becomes twice as expensive, and you rarely know in advance. Flat-rate pricing sets the price for the job before work begins, so the number you approve is the number you pay. It also makes it easy to compare quotes, because you are comparing like for like.",
      },
      {
        type: "h2",
        text: "Upfront AC & Heating's published prices",
      },
      {
        type: "p",
        text: "Upfront AC & Heating publishes its flat-rate prices openly. Examples from the current price list include a residential service call at $89, with the diagnostic fee applied toward the repair, and a capacitor repair starting at $189 for a single 3 to 10 MFD capacitor, with larger capacitors priced higher. Contactors are listed at $209 for a 1.5 pole, $229 for a 2 pole and $334 for a 3 pole. R-410A refrigerant is listed at $71 per pound, a freon leak check at $128 for under one hour or $211 for over one hour, and clearing a primary drain restriction at $172.",
      },
      {
        type: "p",
        text: "The pricing page also lists higher service call fees for evenings and weekends and for calls after 9 PM, along with an hourly labor rate for work that is not covered by a flat price. Prices can change, so see current prices on our Upfront Pricing page before you call.",
      },
      {
        type: "callout",
        title: "When a quote should make you pause",
        text: "Be cautious of any company that will not give a price before starting work, pushes a full replacement without showing you what failed, or offers to simply add refrigerant without finding the leak. Refrigerant handling requires EPA Section 608 certification, so confirm any contractor is licensed. In Texas, HVAC contractors are licensed through the Texas Department of Licensing and Regulation.",
      },
      { type: "h2", text: "How to keep repair bills down" },
      {
        type: "ol",
        items: [
          "Replace your air filter on schedule. A clogged filter is a leading contributor to frozen coils and failed blower motors.",
          "Keep the outdoor unit clear of debris and about two feet away from plants and fences.",
          "Have the system checked once or twice a year so weak capacitors, worn contactors and small leaks are caught early.",
          "Deal with small problems quickly. Running a system with a failing part can turn a minor repair into a major one.",
          "Ask what failed, why it failed, and whether the part is original-equipment or aftermarket.",
        ],
      },
      { type: "h2", text: "Repair or replace: where cost fits in" },
      {
        type: "p",
        text: "Houston systems work hard through a long, humid cooling season, so older equipment can reach a point where repair after repair stops making sense. If a single repair approaches a large share of the price of a new system, or the system uses a phased-out refrigerant like R-22, it is worth getting a replacement estimate for comparison. Upfront AC & Heating offers free estimates for replacements through its request-free-estimate page.",
      },
    ],
    relatedServices: [
      { label: "Upfront flat-rate pricing", to: "/upfront-pricing" },
      { label: "HVAC repair services", to: "/services/hvac-repairs" },
      { label: "Free replacement estimate", to: "/request-free-estimate" },
      { label: "Financing options", to: "/finance" },
    ],
    relatedArticles: [
      "repair-or-replace-air-conditioner",
      "ac-running-not-cooling",
      "professional-hvac-tune-up",
    ],
    faqs: [
      {
        q: "Is a diagnostic fee normal for AC repair?",
        a: "Yes. Most HVAC companies charge a service call or diagnostic fee because a technician has to travel, test the system and identify the problem. Ask whether the fee is applied toward the repair if you proceed.",
      },
      {
        q: "Why does AC repair cost more on nights and weekends?",
        a: "Evening, weekend and holiday calls typically carry a higher service call fee because they require technicians outside normal hours. Booking during regular hours when it is safe to wait usually costs less.",
      },
      {
        q: "Why is refrigerant so expensive for older systems?",
        a: "R-22 production was phased out in the United States, so remaining supply is reclaimed or stockpiled, and prices are far higher than for R-410A. This is a major reason older R-22 systems with leaks are often better replaced than repaired.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 3
  // ---------------------------------------------------------------------------
  {
    slug: "repair-or-replace-air-conditioner",
    title: "When Should You Repair or Replace Your Air Conditioner?",
    metaTitle: "Repair or Replace Your Air Conditioner? How to Decide",
    metaDescription:
      "Not sure whether to fix or replace your AC? Compare age, repair cost, refrigerant type, efficiency and comfort to make a smart, honest decision.",
    answer:
      "Repair is usually the better choice when the system is under about 10 years old, the problem is a single failed part, and the repair costs a modest fraction of a new system. Replacement makes more sense when the unit is 12 to 15 years old or older, needs a major component like a compressor or coil, uses R-22 refrigerant, or keeps breaking down.",
    category: "Buying Guide",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 5,
    body: [
      { type: "h2", text: "The main factors in a repair-or-replace decision" },
      {
        type: "p",
        text: "No single number settles this question. A fair decision weighs the age of the system, the cost and nature of the repair, how often it has failed, the refrigerant it uses, and how well it keeps your home comfortable. Think of it as a balance, not a formula.",
      },
      { type: "h3", text: "Age of the system" },
      {
        type: "p",
        text: "Many residential air conditioners last roughly 10 to 15 years, and systems that run hard through a long cooling season can sit toward the lower end of that range. Below about 10 years, repair is usually reasonable. Past 12 to 15, even a successful repair may only buy a short reprieve before the next failure.",
      },
      { type: "h3", text: "Cost of the repair compared with replacement" },
      {
        type: "p",
        text: "Contractors often use rules of thumb. One is the 50 percent rule: if the repair costs more than about half the price of a new system, replacement deserves serious thought. Another multiplies the system's age in years by the repair cost, and if the result is much over 5,000, replacement may be wiser. These are guidelines, not laws, but they help keep emotion out of the decision.",
      },
      { type: "h3", text: "Type of refrigerant" },
      {
        type: "p",
        text: "Systems built before roughly 2010 commonly use R-22, which is no longer produced in the United States. What remains is reclaimed or stockpiled and costs far more than R-410A. A leaky R-22 system is rarely a good place to put repair money. Newer equipment is moving to lower global-warming-potential refrigerants, though R-410A systems can still be serviced.",
      },
      { type: "h3", text: "Frequency of breakdowns" },
      {
        type: "p",
        text: "One failed capacitor in a ten-year-old system is an isolated event. A third repair in two summers is a pattern. When parts are wearing out across the system, you may be paying for repairs on a system that is nearing the end of its useful life.",
      },
      { type: "h3", text: "Efficiency, comfort and humidity control" },
      {
        type: "p",
        text: "Equipment from the 1990s and 2000s is often much less efficient than what is sold today. In a climate where air conditioning may run for most of the year, higher efficiency matters for monthly bills. Comfort matters too: if rooms are uneven, humidity stays high or the system short-cycles, newer variable-capacity equipment, and a proper sizing calculation, may help.",
      },
      { type: "h2", text: "Signs a repair makes sense" },
      {
        type: "ul",
        items: [
          "The system is relatively young and has a good repair history.",
          "The failed part is inexpensive, like a capacitor, contactor, fan motor or float switch.",
          "The system uses R-410A or a newer refrigerant and the leak, if any, is easily accessible.",
          "The system cools and dehumidifies well when it is working.",
          "The warranty still covers the failed part.",
        ],
      },
      { type: "h2", text: "Signs it is time to consider replacement" },
      {
        type: "ul",
        items: [
          "The compressor has failed, or the evaporator or condenser coil has a leak, especially outside of warranty.",
          "The system is 12 to 15 years old or older and is breaking down repeatedly.",
          "It uses R-22 and is leaking.",
          "Your electric bills have crept up while comfort has gone down.",
          "Rooms are uneven or humid even after ductwork and airflow have been checked.",
          "The indoor and outdoor units are mismatched or were never properly sized for your home.",
        ],
      },
      {
        type: "callout",
        title: "Get a second opinion before a big decision",
        text: "If someone tells you the system must be replaced, ask which part failed, how they tested it, and what a repair would cost, in writing. Replacement is a major expense, so a second opinion from another licensed contractor is reasonable. Never allow anyone to rush you with a high-pressure sales pitch.",
      },
      { type: "h2", text: "What a technician looks at before advising you" },
      {
        type: "p",
        text: "An honest assessment goes beyond the failed part. A technician will look at the age and model of the equipment, the refrigerant type, the condition of the coils, the ductwork and its leakage, and the airflow the system is actually delivering. If you are considering replacement, the proper next step is a load calculation, known as a Manual J, which estimates your home's real heating and cooling needs rather than guessing from the old unit's size. Systems that were oversized, which is common, often cool quickly but leave humidity behind and wear out sooner.",
      },
      { type: "h2", text: "Why this matters on the Gulf Coast" },
      {
        type: "p",
        text: "Long, hot, humid summers mean your AC does a great deal of work, so efficiency and reliability matter more here than in milder places. Hurricane-season outages and power surges can also shorten the life of electronics. If you are replacing, ask about surge protection and about equipment that handles humidity well, such as two-stage or variable-speed systems.",
      },
      {
        type: "p",
        text: "Upfront AC & Heating offers free estimates for system replacements through its request-free-estimate page, and also publishes flat-rate repair prices so you can see what a repair would cost before comparing it against replacement.",
      },
    ],
    relatedServices: [
      { label: "AC and HVAC installation", to: "/services/hvac-install" },
      { label: "Request a free replacement estimate", to: "/request-free-estimate" },
      { label: "HVAC repair services", to: "/services/hvac-repairs" },
      { label: "Financing options", to: "/finance" },
    ],
    relatedArticles: [
      "choose-right-hvac-system",
      "ac-repair-cost-houston",
      "seer2-vs-seer",
    ],
    faqs: [
      {
        q: "Does a new AC really lower my energy bills?",
        a: "Often, yes, especially when replacing a system that is 15 years old or older, but the amount depends on the old and new efficiency, the condition of your ducts, your insulation and how much the system runs. Ask for a written estimate rather than a promised percentage.",
      },
      {
        q: "Should I replace the indoor and outdoor units together?",
        a: "In most cases, yes. Indoor and outdoor components are designed to work as a matched system, and mismatched equipment can reduce efficiency and cooling performance. A contractor can advise on what is appropriate for your equipment.",
      },
      {
        q: "Is it worth fixing an AC that uses R-22?",
        a: "For a simple electrical repair, it can be. For a refrigerant leak, it is usually hard to justify given the cost of R-22. Ask for a repair quote and a replacement estimate and compare them.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 4
  // ---------------------------------------------------------------------------
  {
    slug: "houston-hvac-maintenance-checklist",
    title: "Houston HVAC Maintenance Checklist",
    metaTitle: "Houston HVAC Maintenance Checklist: Spring and Fall",
    metaDescription:
      "A seasonal HVAC maintenance checklist for Houston homeowners: safe DIY tasks, what to leave to a licensed technician, and storm-season precautions.",
    answer:
      "Houston homeowners should check the air filter monthly during cooling season, keep the outdoor unit clear, test the condensate drain, and book a professional tune-up before cooling season and again before the short heating season. A few safe habits plus a technician's visit can prevent most mid-summer breakdowns.",
    category: "Maintenance",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 5,
    body: [
      { type: "h2", text: "Why a Houston-specific checklist" },
      {
        type: "p",
        text: "Our air conditioners often run for most of the year, summers are hot and humid, and attics can get far hotter than the outdoors. Then winter is short and mild, so heating equipment sits idle for months. A seasonal routine that reflects this pattern catches problems before the hottest weeks, and before the first cold snap.",
      },
      { type: "h2", text: "Monthly tasks you can do yourself" },
      {
        type: "ol",
        items: [
          "Check the air filter and replace it if it is dirty. Check monthly during peak summer even if the filter is rated for longer.",
          "Look at the supply and return vents. Make sure nothing blocks them and that dust is not building up on the return grille.",
          "Look at the thermostat. Replace batteries if your model uses them, and confirm the schedule is what you want.",
          "Look at the outdoor unit. Remove leaves and debris from around it, keep plants and fences about two feet away, and make sure the unit sits level.",
          "Check the area around the indoor unit and the drain pan for water, stains or musty smells.",
        ],
      },
      { type: "h2", text: "Spring checklist, before cooling season peaks" },
      {
        type: "ul",
        items: [
          "Schedule a professional cooling tune-up before the heat arrives.",
          "Gently rinse the outdoor coil from the outside with a garden hose after shutting the system off at the thermostat. Do not use a pressure washer, which can bend the fins.",
          "Check that the insulation on the larger refrigerant line is intact and not cracked or missing.",
          "Test the condensate drain. If the system has a cleanout tee with a cap near the indoor unit, a technician can show you how to clear it with a wet-dry vacuum. Some homeowners pour in a cup of distilled white vinegar to discourage algae. Never mix vinegar with bleach or other chemicals, and check your equipment manual first.",
          "Consider a whole-home surge protector installed by a licensed professional, ahead of hurricane season.",
        ],
      },
      { type: "h2", text: "Fall checklist, before the heating season" },
      {
        type: "ul",
        items: [
          "Schedule a heating check, especially if you have a gas furnace. A technician should inspect the burners, heat exchanger, flue and safety controls.",
          "Test the heat on the first cool day instead of the first cold night. A short, mild burning smell from dust on the heat strips or burners is normal, but it should fade quickly.",
          "If you have a heat pump, make sure the outdoor unit is clear and that you know how to read your thermostat's emergency heat setting.",
          "Test carbon monoxide and smoke detectors and replace the batteries. This is especially important with gas heat.",
          "Clear leaves from the outdoor unit and nearby gutters, which can send water into the equipment.",
        ],
      },
      { type: "h2", text: "Hurricane and storm-season precautions" },
      {
        type: "ul",
        items: [
          "Before a storm, set the thermostat and turn the system off if power may fail. Rapid on-off cycling during an outage and restoration can stress the equipment.",
          "Secure or remove loose items that could blow into the outdoor unit.",
          "After a storm, check for debris and damage but do not run the equipment if it has been under floodwater. Electrical components and controls that have been submerged should be inspected and often replaced by a licensed professional before use.",
          "Wait a few minutes after power returns before restarting the system to avoid short-cycling.",
        ],
      },
      {
        type: "callout",
        title: "Leave these jobs to a licensed professional",
        text: "Do not open electrical panels beyond resetting a breaker once, do not touch capacitors, wiring or contactors, do not attempt to add or release refrigerant (this requires EPA Section 608 certification), and do not work inside a gas furnace. If you ever smell natural gas, leave the home and call your gas utility or emergency services from outside. If you suspect carbon monoxide, get everyone outdoors and call 911.",
      },
      { type: "h2", text: "What a professional maintenance visit covers" },
      {
        type: "p",
        text: "A proper tune-up goes beyond a quick look. A technician will typically clean or inspect the condenser coil, check the evaporator coil and drain, test capacitors, contactors and motors, measure amp draws, tighten electrical connections, and check refrigerant performance with measurements such as superheat and subcooling. They should also check airflow, inspect the filter and tell you plainly about anything that is wearing out.",
      },
      { type: "h2", text: "A simple year-round calendar" },
      {
        type: "ul",
        items: [
          "Every month in summer: check the filter and keep the outdoor unit clear.",
          "March or April: book a cooling tune-up and surge protection.",
          "June through November: stay alert to storm forecasts and know your shut-off steps.",
          "October or November: heating check, detector batteries and a test run of the heat.",
        ],
      },
      {
        type: "p",
        text: "Upfront AC & Heating lists a spring and fall maintenance combo on its pricing page. See current prices on our Upfront Pricing page, since they can change.",
      },
    ],
    relatedServices: [
      { label: "HVAC maintenance", to: "/services/hvac-maintenance" },
      { label: "Heating services", to: "/services/heating" },
      { label: "Air conditioning service", to: "/services/air-conditioning" },
      { label: "Flat-rate pricing", to: "/upfront-pricing" },
    ],
    relatedArticles: [
      "professional-hvac-tune-up",
      "how-often-change-hvac-filter",
      "ac-leaking-water",
    ],
    faqs: [
      {
        q: "How often should I have my HVAC system professionally serviced?",
        a: "Most manufacturers and contractors recommend a professional visit at least once a year, and many Gulf Coast homeowners choose two, one before cooling season and one before heating season, because the system runs so much.",
      },
      {
        q: "Is it safe to hose off my outdoor AC unit?",
        a: "A gentle rinse with a garden hose from the outside is generally fine, with the system turned off first. Avoid pressure washers, which can bend the aluminum fins, and avoid chemical cleaners unless a technician applies them.",
      },
      {
        q: "Do I need heating maintenance in Houston's mild winters?",
        a: "Yes. Heating equipment that sits unused for most of the year can develop problems, and gas furnaces carry safety concerns like cracked heat exchangers and venting issues that should be checked before you rely on them.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 5
  // ---------------------------------------------------------------------------
  {
    slug: "ac-leaking-water",
    title: "Why Is My AC Leaking Water?",
    metaTitle: "Why Is My AC Leaking Water? Causes and What to Do",
    metaDescription:
      "Water around your indoor AC unit usually means a clogged condensate drain, a frozen coil or a failed pan. Learn safe checks and when to call a pro.",
    answer:
      "Water around your indoor unit is most often caused by a clogged condensate drain line, but it can also come from a frozen evaporator coil that has melted, a cracked or rusted drain pan, or poor installation. Turn the system off to limit damage, check the filter and drain access safely, and call a licensed technician if the water returns.",
    category: "Cooling",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "Where the water comes from" },
      {
        type: "p",
        text: "Cooling air also removes humidity. As warm, humid air crosses the cold evaporator coil, moisture condenses on it much like water on a cold glass. That water drips into a drain pan and runs out through a condensate drain line, usually a PVC pipe that exits outside or ties into a plumbing drain. In humid weather, a system can remove several gallons of water a day, so a small blockage can become a leak quickly.",
      },
      { type: "h2", text: "Common causes of a leaking AC" },
      { type: "h3", text: "Clogged condensate drain line" },
      {
        type: "p",
        text: "Algae, slime, dirt and debris can build up and block the line. When that happens, water backs up, fills the pan and overflows. This is the leading cause of indoor AC leaks, particularly in humid climates like ours.",
      },
      { type: "h3", text: "Frozen evaporator coil" },
      {
        type: "p",
        text: "If the coil freezes because of poor airflow or low refrigerant, it builds up ice. When the system shuts off or the ice melts, more water arrives than the pan can handle. A leak that comes with weak airflow or visible ice usually points to this cause.",
      },
      { type: "h3", text: "Damaged or rusted drain pan" },
      {
        type: "p",
        text: "Older drain pans, especially metal ones, can rust through or crack, and water leaks directly from the pan. This is common in older systems.",
      },
      { type: "h3", text: "Disconnected, cracked or poorly sloped drain line" },
      {
        type: "p",
        text: "A drain line that has come loose, been damaged, or does not slope properly can leak or fail to drain. Installation shortcuts show up here.",
      },
      { type: "h3", text: "Dirty filter and airflow problems" },
      {
        type: "p",
        text: "A clogged filter can cause the coil to ice, leading to leaks as described above. Dirty coils and blower problems can have the same effect.",
      },
      { type: "h3", text: "Attic and closet installations" },
      {
        type: "p",
        text: "In many Houston-area homes the air handler is in the attic or a closet. A leak there may not be noticed until water stains a ceiling, and a hot, humid attic can accelerate algae growth in the drain. A secondary pan and a float switch are important for these installations.",
      },
      { type: "h2", text: "What you can safely check yourself" },
      {
        type: "ol",
        items: [
          "Turn the AC off at the thermostat to stop producing condensate. If water is actively dripping from a ceiling, turn the system off and place a bucket underneath. Do not touch electrical components near the water.",
          "Check and replace a dirty air filter.",
          "Look for ice on the indoor unit or the refrigerant line. If you see ice, leave the system off and set the fan to On to help it thaw.",
          "Check whether the secondary drain pan under the unit has water in it, which is a sign the primary drain is blocked.",
          "If your system has an accessible condensate cleanout, a technician can show you how to clear it with a wet-dry vacuum at the drain line's outside end. If you try a cleaner, a cup of distilled white vinegar is commonly used. Never mix vinegar with bleach, and follow your manufacturer's guidance on chemicals.",
          "Check whether a float switch has shut the system down. A tripped float switch usually means the drain is blocked and is doing its job.",
        ],
      },
      {
        type: "callout",
        title: "When to stop and call a licensed professional",
        text: "Call a technician if water returns after you clear what you can, if the unit is in an attic or closet you cannot safely reach, if water has reached electrical components or ceiling drywall, if you see ice again after thawing, or if the pan is cracked or rusted. Do not climb into a hot attic to investigate, and never run the system while water is pooling around electrical parts.",
      },
      { type: "h2", text: "What a technician actually does" },
      {
        type: "p",
        text: "A technician will usually clear the drain line with a vacuum or pressurized flush, inspect the pan and slope, check the float or overflow switch, and look at the coil and filter. If the leak came from a frozen coil, they will find out why it froze, whether from airflow or refrigerant, because clearing the drain does not fix the underlying cause. They may also recommend a cleanout access point, an insulated drain line, or a float switch if your system does not have them.",
      },
      { type: "h2", text: "Preventing leaks in a humid climate" },
      {
        type: "ul",
        items: [
          "Change filters on schedule.",
          "Have the drain line inspected and cleared during seasonal maintenance.",
          "Make sure your system has a working float switch or overflow safety so it shuts off before water damages your home.",
          "Insulate drain lines in attics where condensation on the outside of the pipe can drip.",
          "Do not ignore small stains or a musty smell near the unit, which can signal a slow leak.",
        ],
      },
      {
        type: "p",
        text: "In a climate where AC runs for most of the year, a drain line rarely stays clean forever. A small, regular maintenance step costs far less than ceiling and drywall repair.",
      },
    ],
    relatedServices: [
      { label: "HVAC repair services", to: "/services/hvac-repairs" },
      { label: "AC maintenance", to: "/services/hvac-maintenance" },
      { label: "AC repair in Cypress", to: "/services/ac-repair-cypress" },
      { label: "Flat-rate pricing", to: "/upfront-pricing" },
    ],
    relatedArticles: [
      "frozen-evaporator-coil-causes",
      "houston-hvac-maintenance-checklist",
      "how-often-change-hvac-filter",
    ],
    faqs: [
      {
        q: "Is a leaking AC an emergency?",
        a: "It can be, if water is reaching a ceiling, wiring or insulation. Turn the system off, contain the water and call for service. A small, slow drip is less urgent but should still be addressed before it causes damage.",
      },
      {
        q: "What does a float switch do?",
        a: "A float switch is a safety device that detects rising water in the drain pan or line and shuts the system off before it overflows. If your AC stopped on its own and there is water in the pan, the switch may have tripped for a reason.",
      },
      {
        q: "Can a leak mean I am low on refrigerant?",
        a: "Indirectly, yes. Low refrigerant can cause the coil to freeze, and when the ice melts it can overflow the pan. The water is not refrigerant. It is condensation, but the cause may still be a refrigerant problem.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 6
  // ---------------------------------------------------------------------------
  {
    slug: "frozen-evaporator-coil-causes",
    title: "What Causes an AC Evaporator Coil to Freeze?",
    metaTitle: "What Causes a Frozen AC Evaporator Coil?",
    metaDescription:
      "Frozen AC coil? The main causes are restricted airflow, low refrigerant, a dirty coil or a failed blower. Learn how to thaw it safely and prevent it.",
    answer:
      "An evaporator coil freezes when its surface drops below 32°F and moisture in the air turns to ice. The most common causes are restricted airflow from a dirty filter, dirty coil or failed blower, and low refrigerant from a leak. If you see ice, turn the AC off and let it thaw before calling a technician.",
    category: "Cooling",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "Why a coil freezes in the first place" },
      {
        type: "p",
        text: "The evaporator coil works by getting very cold, typically around the low 40s Fahrenheit, so it can absorb heat and moisture from the air blowing across it. Normally the warm air passing over the coil keeps it from dropping to freezing. If either the airflow or the refrigerant pressure drifts out of range, the coil surface falls below 32°F. Moisture from the air then freezes onto it, and the ice acts like insulation, which reduces airflow even more. The problem feeds on itself until the system stops cooling.",
      },
      { type: "h2", text: "The main causes" },
      { type: "h3", text: "Restricted airflow" },
      {
        type: "p",
        text: "This is the most common cause. A clogged filter, closed or blocked vents, collapsed or crushed ductwork, or a dirty blower wheel all reduce the warm air reaching the coil. Without enough warm air, the coil gets colder than it should.",
      },
      { type: "h3", text: "Low refrigerant from a leak" },
      {
        type: "p",
        text: "When the charge is low, the refrigerant pressure in the coil drops, and so does the coil temperature, which can fall below freezing. Refrigerant does not get used up, so low refrigerant means a leak. Adding refrigerant without finding the leak is a short-term patch, and adding refrigerant requires EPA Section 608 certification.",
      },
      { type: "h3", text: "A dirty evaporator coil" },
      {
        type: "p",
        text: "A layer of dirt on the coil acts like a blanket, blocking heat transfer and airflow. In homes with poor filtration or filters that are not changed on time, the coil gradually clogs from the inside where you cannot see it.",
      },
      { type: "h3", text: "A failing blower motor or capacitor" },
      {
        type: "p",
        text: "A blower that runs slowly, or intermittently, moves less air across the coil. A weak blower capacitor or worn motor can cause this, often with weak airflow from the vents.",
      },
      { type: "h3", text: "Other contributors" },
      {
        type: "ul",
        items: [
          "A faulty or incorrect metering device, such as a stuck expansion valve, that sends the wrong amount of refrigerant to the coil.",
          "A system that runs when it is too cool outside, for example running the AC at night during a cool snap, which can drop coil temperatures further.",
          "Oversized or poorly designed ductwork, or return air that is too small for the system.",
        ],
      },
      { type: "h2", text: "How to thaw a frozen coil safely" },
      {
        type: "ol",
        items: [
          "Turn the system off at the thermostat, setting it to Off, not just raising the temperature.",
          "Set the fan to On so the blower circulates warm indoor air across the coil. This speeds up thawing without running the compressor.",
          "Check and replace the filter while you wait.",
          "Place towels or a container under the unit if the drain pan could overflow as the ice melts.",
          "Allow several hours, sometimes a full day for a heavy freeze-up, for the ice to melt completely. Do not chip or scrape the ice, since the coil's fins and tubing are delicate and easy to puncture.",
          "Once thawed, restart the system only if the cause was clear and fixed, such as a very dirty filter. If it freezes again, leave it off and call for service.",
        ],
      },
      {
        type: "callout",
        title: "Never run an AC with a frozen coil",
        text: "Running the compressor while the coil is iced over can let liquid refrigerant return to the compressor, which can damage it, and it may flood the drain pan and your home when the ice melts. If ice returns after you have replaced the filter and cleared the vents, the cause is more likely refrigerant, a dirty coil or a failing blower, and needs a licensed technician. Do not add refrigerant or open the equipment yourself.",
      },
      { type: "h2", text: "What a technician does to find the cause" },
      {
        type: "p",
        text: "A technician will confirm the coil is thawed first so measurements are meaningful. They will then inspect the filter, blower wheel and coil, measure the temperature difference between the air entering and leaving the coil, and measure static pressure to see whether the ducts are restricting airflow. They will test the blower motor and capacitor, and read refrigerant pressures with superheat and subcooling calculations.",
      },
      {
        type: "p",
        text: "If the charge is low, they should perform a leak search rather than just recharge the system. Common leak locations include the evaporator coil itself, braze joints and service valve cores. Depending on the finding, the fix may be as simple as a new capacitor or as involved as coil replacement.",
      },
      { type: "h2", text: "Gulf Coast considerations" },
      {
        type: "p",
        text: "Houston's humid air makes ice and condensate appear quickly once something is off, and long run times mean a restricted system can ice up fast. Hot attics also stress the air handler and ductwork, and crushed or disconnected flex duct is a common hidden airflow problem in older attic installations.",
      },
      { type: "h2", text: "How to reduce the chance of freezing" },
      {
        type: "ul",
        items: [
          "Change your filter on schedule and use the filter size and rating your system was designed for.",
          "Keep supply registers open, even in rooms you rarely use.",
          "Have the coil and blower checked during maintenance.",
          "Do not ignore weak airflow, which is often the first warning.",
        ],
      },
    ],
    relatedServices: [
      { label: "AC repair services", to: "/services/hvac-repairs" },
      { label: "Air conditioning service", to: "/services/air-conditioning" },
      { label: "HVAC maintenance", to: "/services/hvac-maintenance" },
    ],
    relatedArticles: [
      "ac-running-not-cooling",
      "ac-leaking-water",
      "how-often-change-hvac-filter",
    ],
    faqs: [
      {
        q: "How long does a frozen AC coil take to thaw?",
        a: "A light frost can melt in an hour or two, and a heavy freeze-up can take several hours to a full day with the fan running. Do not rush it with a hair dryer, heat gun or sharp tools.",
      },
      {
        q: "Will a frozen coil damage my AC?",
        a: "It can, especially if you keep running the compressor. Liquid refrigerant returning to the compressor can cause serious damage, and the underlying cause, like a leak or failing blower, will often get worse over time.",
      },
      {
        q: "Is ice on the outdoor unit the same problem?",
        a: "Ice on the larger refrigerant line or indoor coil points to the airflow and refrigerant issues described here. Ice on the outdoor unit of a heat pump in winter can be part of normal operation, because heat pumps have a defrost cycle.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 7
  // ---------------------------------------------------------------------------
  {
    slug: "how-often-change-hvac-filter",
    title: "How Often Should You Change Your HVAC Filter?",
    metaTitle: "How Often to Change an HVAC Filter in Houston",
    metaDescription:
      "How often to change your HVAC filter depends on thickness, pets, dust and run time. Get practical Houston guidance, MERV tips and a quick checklist.",
    answer:
      "Most 1-inch filters should be checked monthly and replaced every one to three months, while thicker 4 to 5 inch media filters often last six to twelve months. In Houston, where AC runs most of the year, homes with pets, allergies or dust may need a change more often.",
    category: "Maintenance",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "General replacement guidelines" },
      {
        type: "p",
        text: "The right interval depends on the filter, the home and how much the system runs. These general guidelines are a good starting point, but always follow the manufacturer's label and your equipment manual.",
      },
      {
        type: "ul",
        items: [
          "1-inch pleated filters: check monthly and plan to replace every one to three months.",
          "2-inch filters: typically every three to six months.",
          "4 to 5 inch media filters: often every six to twelve months, depending on the product and conditions.",
          "Basic fiberglass filters: roughly every month, since they trap little and clog easily.",
          "Washable filters: clean on the schedule the manufacturer lists and make sure they are fully dry before reinstalling.",
        ],
      },
      { type: "h2", text: "Factors that shorten the interval" },
      {
        type: "ul",
        items: [
          "Long run times. Houston systems run for much of the year, so filters load faster than in places with mild seasons.",
          "Pets that shed, especially multiple pets.",
          "Allergy or asthma concerns, where cleaner air matters more.",
          "Nearby construction, yard work, or a dusty area.",
          "Smoking, candles or heavy cooking indoors.",
          "A home with leaky ducts that pull attic dust into the system.",
          "Recent renovation, which creates a lot of fine dust.",
        ],
      },
      { type: "h2", text: "How to check whether a filter needs changing" },
      {
        type: "ol",
        items: [
          "Turn the system off at the thermostat.",
          "Slide the filter out and note the arrow on the frame, which shows airflow direction.",
          "Hold it up to a light. If you cannot see much light through it, or it looks gray and furry, replace it.",
          "Write the date on the frame of the new filter and install it with the arrow pointing toward the blower or air handler, the direction the air moves.",
          "Make a note on your phone calendar so you remember to check again.",
        ],
      },
      { type: "h2", text: "Choosing the right filter: MERV and thickness" },
      {
        type: "p",
        text: "MERV, or Minimum Efficiency Reporting Value, rates how well a filter captures particles on a scale of 1 to 16 for residential use. Higher numbers capture smaller particles but can also resist airflow. For many homes, a MERV 8 to 11 filter balances protection and airflow. Higher ratings may be fine if your system and filter slot were designed for them, such as a deep media cabinet.",
      },
      {
        type: "p",
        text: "A very restrictive filter in a system not designed for it can reduce airflow, strain the blower and contribute to frozen coils. If you want better filtration, ask a technician whether your system can handle it, or whether a larger media filter cabinet would be a better solution than forcing a thick filter into a thin slot.",
      },
      {
        type: "callout",
        title: "When filter problems point to something bigger",
        text: "If a new filter clogs within a few weeks, the coil freezes repeatedly, airflow is weak even with a clean filter, or you cannot find the filter slot, call a licensed HVAC technician. Dirty ducts, a failing blower, leaky returns, or an undersized return can all cause filter and airflow problems that changing the filter will not solve. Never run the system without a filter.",
      },
      { type: "h2", text: "What a dirty filter actually does" },
      {
        type: "p",
        text: "A clogged filter restricts airflow across the evaporator coil. That can lead to a frozen coil, weak cooling, longer run times and higher energy use. The blower motor works harder to pull air through the restriction, and dust that bypasses a loaded filter can coat the coil and blower wheel, which makes the problem harder to fix. In humid conditions, a dirty coil also holds moisture, which can support microbial growth and musty smells.",
      },
      { type: "h2", text: "A practical Houston schedule" },
      {
        type: "ul",
        items: [
          "Summer: check every month. Replace 1-inch filters at least every one to two months if you have pets or allergies.",
          "Spring and fall: check monthly when the AC and heat run on and off.",
          "Mild winter stretches: filters last longer since the system runs less, but do not skip checks.",
          "After storms, wildfire smoke days or nearby construction: look at the filter sooner than scheduled.",
        ],
      },
      {
        type: "p",
        text: "If you have more than one return or filter location, check every one. It is common to find a clean filter in one slot and a clogged one in another.",
      },
      { type: "h2", text: "Filters and indoor air quality" },
      {
        type: "p",
        text: "Filters catch dust, pollen and pet dander, but they are not a complete air-quality solution. They do not remove odors or most gases, and they do not control humidity. If air quality is a concern, a technician can discuss options such as a media filter cabinet or other whole-home treatment based on your specific situation and system.",
      },
    ],
    relatedServices: [
      { label: "Indoor air quality", to: "/services/indoor-air-quality" },
      { label: "HVAC maintenance", to: "/services/hvac-maintenance" },
      { label: "Air conditioning service", to: "/services/air-conditioning" },
    ],
    relatedArticles: [
      "frozen-evaporator-coil-causes",
      "houston-hvac-maintenance-checklist",
      "rooms-hotter-than-others",
    ],
    faqs: [
      {
        q: "Does a higher MERV filter always give better air quality?",
        a: "Not necessarily. Higher MERV filters capture smaller particles but resist airflow more. If your system was not designed for that restriction, airflow can drop and cause problems. Choose a rating your equipment can handle.",
      },
      {
        q: "Can I clean and reuse a disposable filter?",
        a: "No. Disposable pleated or fiberglass filters are not designed to be washed or vacuumed, and doing so can damage the media. Replace them. Only filters labeled washable should be cleaned.",
      },
      {
        q: "Which way does the filter go?",
        a: "Follow the airflow arrow printed on the filter frame. It should point in the direction air travels, toward the blower or air handler and away from the return duct.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 8
  // ---------------------------------------------------------------------------
  {
    slug: "rooms-hotter-than-others",
    title: "Why Are Some Rooms Hotter Than Others?",
    metaTitle: "Why Are Some Rooms Hotter Than Others in My House?",
    metaDescription:
      "Hot and cold spots usually come from duct leaks, weak airflow, poor insulation, sun exposure or system sizing. Learn the causes and safe fixes.",
    answer:
      "Uneven temperatures usually come from airflow problems such as leaky, undersized or crushed ducts, closed or blocked vents, too few returns, or insulation and sun exposure that load certain rooms more than others. Some fixes are simple, but ductwork and system sizing issues need a professional evaluation.",
    category: "Cooling",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "Why temperature varies from room to room" },
      {
        type: "p",
        text: "A central AC does not cool rooms. It delivers cool air through ducts, and each room gets a share based on duct size, length, leaks and the home's heat load. If a room receives less air than it needs, or gains more heat than others, it will run warmer. Many homes have at least one problem room, such as a second-floor bedroom, a bonus room above the garage or a room with big west-facing windows.",
      },
      { type: "h2", text: "Common causes" },
      { type: "h3", text: "Duct leaks and poor duct design" },
      {
        type: "p",
        text: "Ducts that leak, are disconnected, crushed or kinked, or run long distances through a hot attic can lose a lot of the cool air before it arrives. Flex duct that sags or has tight bends restricts airflow. In many attic installations, this is the largest single factor behind hot rooms.",
      },
      { type: "h3", text: "Not enough return air" },
      {
        type: "p",
        text: "Air has to get back to the system as well as out of it. When a bedroom door is closed and the room has no return or transfer path, air pressure builds up, supply airflow drops and the room warms up.",
      },
      { type: "h3", text: "Insulation, air sealing and sun exposure" },
      {
        type: "p",
        text: "Rooms under a hot roof, over a garage, or with large west-facing windows gain far more heat than a shaded interior room. Thin attic insulation or gaps around attic hatches, recessed lights and wall penetrations worsen the problem. Houston attics can reach well over 100°F in summer, so ceilings directly below take on a heavy load.",
      },
      { type: "h3", text: "System size and design" },
      {
        type: "p",
        text: "A system that is too small cannot keep up on peak afternoons. A system that is too large cools quickly and shuts off before air has mixed evenly, which leaves humidity and uneven temperatures behind. A load calculation known as Manual J, along with duct design, is the proper way to size a system.",
      },
      { type: "h3", text: "Equipment and filter issues" },
      {
        type: "p",
        text: "A dirty filter, dirty coil or weak blower reduces airflow to the whole house, and the farthest rooms tend to suffer first. A single-stage system with a single thermostat also cannot respond to individual rooms.",
      },
      { type: "h2", text: "What you can safely check yourself" },
      {
        type: "ol",
        items: [
          "Replace a dirty filter, since weak airflow is felt first in the farthest rooms.",
          "Make sure supply vents in the hot rooms are fully open and not blocked by furniture, rugs or curtains.",
          "Do not close vents in unused rooms to push air elsewhere. This often raises duct pressure, can increase leakage and may harm the system.",
          "Close blinds or curtains on sun-facing windows during the day, and consider window film or exterior shade.",
          "Hold your hand at the supply vent in the hot room and compare airflow with a cooler room. Weak airflow points to a duct problem, while strong but warm airflow points to a heat-load or cooling problem.",
          "Keep interior doors open or leave a gap under bedroom doors. If the room still warms up with the door closed, ask about a return or a transfer grille.",
          "Use ceiling fans to improve comfort, turning them off in empty rooms.",
        ],
      },
      {
        type: "callout",
        title: "When to call a licensed professional",
        text: "Call a licensed HVAC contractor if a room remains uncomfortable after the checks above, if airflow from a vent is very weak, if you suspect disconnected ducts, or if the system runs constantly yet cannot reach the set temperature. Attics can exceed 120°F and have hidden hazards, so do not go into one to inspect ducts yourself.",
      },
      { type: "h2", text: "What a technician does to diagnose uneven rooms" },
      {
        type: "p",
        text: "A thorough evaluation looks at the whole system, not just the thermostat. A technician may measure airflow at registers, check static pressure, inspect ducts in the attic for leaks, crushing, disconnects and poor insulation, and compare supply and return temperatures. Duct leakage can be tested with specialized equipment. They may also compare the home's load against the system's capacity, using a Manual J calculation.",
      },
      { type: "h2", text: "Typical solutions" },
      {
        type: "ul",
        items: [
          "Sealing and repairing ducts, and replacing damaged or undersized runs.",
          "Adding or enlarging return air paths.",
          "Balancing airflow with dampers.",
          "Adding insulation or air sealing in the attic.",
          "Adding a zoning system or a separate system for a bonus room or second floor.",
          "Replacing an improperly sized system with equipment sized to the home.",
        ],
      },
      { type: "h2", text: "Thermostat placement and humidity" },
      {
        type: "p",
        text: "A thermostat in a hallway that stays cool can shut the system off while farther rooms are still warm. In a humid climate, a room can also feel uncomfortable even if its temperature is acceptable, because humidity makes it feel warmer. Variable-speed and two-stage equipment, along with correct sizing, tends to handle both temperature and humidity more evenly.",
      },
    ],
    relatedServices: [
      { label: "HVAC repair services", to: "/services/hvac-repairs" },
      { label: "Residential HVAC", to: "/services/residential-hvac" },
      { label: "Indoor air quality and ductwork", to: "/services/indoor-air-quality" },
      { label: "Free system estimate", to: "/request-free-estimate" },
    ],
    relatedArticles: [
      "how-often-change-hvac-filter",
      "choose-right-hvac-system",
      "ac-running-not-cooling",
    ],
    faqs: [
      {
        q: "Is it bad to close vents in rooms I do not use?",
        a: "Generally yes. Most residential systems are designed for a certain amount of airflow, and closing vents can raise duct pressure, increase leaks and reduce efficiency. It is better to have a technician balance the system.",
      },
      {
        q: "Can adding insulation fix a hot room?",
        a: "Sometimes. If the room is hot because of a thin attic layer or air leaks above it, improved insulation and air sealing can help a lot. If the cause is weak airflow, you would also need to address the ducts.",
      },
      {
        q: "Would a zoning system solve the problem?",
        a: "It can, for homes with distinct areas like separate floors, but zoning does not fix leaky or undersized ducts. A proper evaluation should come first.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 9
  // ---------------------------------------------------------------------------
  {
    slug: "how-heat-pump-works",
    title: "How Does a Heat Pump Work?",
    metaTitle: "How Does a Heat Pump Work? A Plain-English Guide",
    metaDescription:
      "A heat pump moves heat instead of making it, cooling in summer and heating in winter. Learn how the reversing valve works and if it suits Houston.",
    answer:
      "A heat pump uses refrigerant to move heat from one place to another instead of generating it. In summer it pulls heat out of your home and releases it outdoors like an air conditioner, and in winter a reversing valve flips the process so it pulls heat from outdoor air into your home.",
    category: "Heating",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "The basic idea: moving heat, not making it" },
      {
        type: "p",
        text: "A heat pump is essentially an air conditioner that can run in reverse. Heat naturally flows from warm to cool. Refrigerant, which boils and condenses at very low temperatures, lets a heat pump push heat the other way. Even cold outdoor air contains heat energy, and a heat pump can extract some of it and bring it inside.",
      },
      { type: "h2", text: "The main components" },
      {
        type: "ul",
        items: [
          "Compressor: pressurizes the refrigerant and drives it around the system.",
          "Outdoor coil: releases heat in cooling mode and absorbs heat in heating mode.",
          "Indoor coil: absorbs heat in cooling mode and releases heat in heating mode.",
          "Expansion device: lowers refrigerant pressure and temperature before it enters the coil that must absorb heat.",
          "Reversing valve: changes the direction of refrigerant flow, which switches the system between heating and cooling.",
          "Blower and thermostat: move air through the ducts and tell the system what to do.",
        ],
      },
      { type: "h2", text: "Cooling mode versus heating mode" },
      { type: "h3", text: "In cooling mode" },
      {
        type: "p",
        text: "The indoor coil gets cold and absorbs heat and humidity from the air in your home. Refrigerant carries that heat to the outdoor coil, where it is released into the outside air. This is the same cycle as a standard air conditioner.",
      },
      { type: "h3", text: "In heating mode" },
      {
        type: "p",
        text: "The reversing valve redirects the refrigerant so the outdoor coil becomes the cold one, absorbing heat from outside air. The refrigerant carries that heat to the indoor coil, where it warms the air passing through, and the blower distributes it through the ducts.",
      },
      { type: "h2", text: "Why heat pumps can be efficient" },
      {
        type: "p",
        text: "Because they move heat instead of burning a fuel or heating an element, heat pumps can deliver more heat energy than the electrical energy they use. This ratio is called the coefficient of performance, or COP. A COP of 3 means roughly three units of heat delivered for each unit of electricity consumed. COP varies with outdoor temperature and the equipment, and it falls as outdoor temperatures drop. Efficiency ratings such as SEER2 for cooling and HSPF2 for heating describe seasonal performance.",
      },
      { type: "h2", text: "The defrost cycle and emergency heat" },
      {
        type: "p",
        text: "In cool, damp weather, frost can form on the outdoor coil when it is cold. To clear it, the system briefly switches into cooling mode, which warms the outdoor coil. During this defrost cycle you may see steam rising from the outdoor unit and the fan may stop for a few minutes. That is normal. Some indoor air may feel cooler during defrost, and many systems use electric auxiliary heat strips during this time.",
      },
      {
        type: "p",
        text: "Most heat pump thermostats also have an Emergency Heat setting, which runs only the electric backup heat. It is intended for situations where the heat pump itself is not working. Electric resistance heat is far more expensive to run than the heat pump, so do not use it as a normal setting.",
      },
      { type: "h2", text: "Are heat pumps a good fit for Houston?" },
      {
        type: "p",
        text: "Heat pumps work well in mild climates, and the Gulf Coast has short winters with relatively few days at deeply low temperatures. That means the system can handle heating efficiently most of the time, with a single piece of equipment providing both cooling and heat. Houston does see occasional hard freezes, and a properly sized system with backup heat, or a gas furnace paired with an AC in a dual-fuel setup, can cover those. Whether a heat pump is a good choice for you depends on your home, your ducts, your utility rates and your priorities, and a contractor can help you compare.",
      },
      { type: "h2", text: "What you can safely do as a homeowner" },
      {
        type: "ol",
        items: [
          "Replace the filter on schedule.",
          "Keep the outdoor unit clear of leaves, debris and snow or ice, and leave about two feet of space around it.",
          "Do not pour hot water on the outdoor unit or chip ice off it. If heavy ice builds and does not clear, turn the system to Off and call for service.",
          "Learn what your thermostat's Emergency Heat setting does, and use it only if the heat pump is not working.",
          "Schedule maintenance twice a year, since heat pumps run in both seasons.",
        ],
      },
      {
        type: "callout",
        title: "When to call a licensed professional",
        text: "Call a technician if the outdoor unit is encased in ice, if the system blows cool air in heating mode for long periods, if the auxiliary heat runs constantly, if you hear loud grinding or banging, or if your electric bill spikes in winter. Heat pumps contain refrigerant and high-voltage electrical components, and refrigerant work requires EPA Section 608 certification.",
      },
      { type: "h2", text: "What a technician checks on a heat pump" },
      {
        type: "p",
        text: "In addition to the standard cooling checks, a heat pump visit typically includes testing the reversing valve operation, defrost controls and sensors, auxiliary heat elements and sequencers, and checking temperature rise in heating mode. Refrigerant charge and airflow are verified because both strongly affect performance in each mode.",
      },
    ],
    relatedServices: [
      { label: "Heating services", to: "/services/heating" },
      { label: "HVAC installation", to: "/services/hvac-install" },
      { label: "Residential HVAC", to: "/services/residential-hvac" },
    ],
    relatedArticles: [
      "choose-right-hvac-system",
      "seer2-vs-seer",
      "professional-hvac-tune-up",
    ],
    faqs: [
      {
        q: "Can a heat pump replace both my AC and furnace?",
        a: "Yes, in many homes. A heat pump provides cooling and heating from one system, usually with electric backup heat. Some homeowners instead pair a heat pump with a gas furnace for the coldest days. A contractor can help you compare options.",
      },
      {
        q: "Why is my heat pump blowing cool air in winter?",
        a: "Heat pump air is warm, but it is often cooler than the air from a gas furnace, so it can feel cool on your skin. If the air is truly cold, or this lasts, the cause could be a refrigerant problem, a defrost issue or a reversing valve fault, and it should be checked.",
      },
      {
        q: "Do heat pumps work in freezing weather?",
        a: "They can, but efficiency and output fall as temperatures drop, and electric backup heat supplements them. Cold-climate models are designed to perform better in low temperatures. Ask your contractor which is appropriate for your area.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 10
  // ---------------------------------------------------------------------------
  {
    slug: "seer2-vs-seer",
    title: "What Is the Difference Between SEER2 and Older SEER Ratings?",
    metaTitle: "SEER2 vs SEER: What Changed and What It Means",
    metaDescription:
      "SEER2 uses a tougher test than SEER, so the numbers run lower for the same equipment. See what changed, current minimums for Texas and how to compare.",
    answer:
      "SEER2 is the updated efficiency rating that replaced SEER in 2023. It measures the same seasonal cooling efficiency but tests equipment under higher airflow resistance that better reflects real ducts, so the same unit scores a bit lower on SEER2 than it did on SEER.",
    category: "Buying Guide",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "What SEER measures" },
      {
        type: "p",
        text: "SEER stands for Seasonal Energy Efficiency Ratio. It compares the cooling a system delivers over a typical season, measured in British thermal units, with the electricity it uses, measured in watt-hours. A higher number means more cooling per unit of electricity. It is a lab rating, not a prediction of your bill, because real efficiency depends on your home, ducts, installation quality and climate.",
      },
      { type: "h2", text: "What changed with SEER2" },
      {
        type: "p",
        text: "The U.S. Department of Energy updated the test procedure, and starting in 2023 ratings are reported as SEER2. The key change is the external static pressure used during testing. Under the old SEER test, the air handler worked against about 0.1 inches of water column of resistance, which is lower than most real duct systems. SEER2 tests at 0.5 inches of water column, which is closer to what systems face in homes with filters, coils and ductwork.",
      },
      {
        type: "p",
        text: "Because the new test is tougher, the same piece of equipment gets a lower number. As a rough conversion, a SEER rating multiplied by about 0.95 gives an approximate SEER2 rating for split-system air conditioners, though the conversion varies by product. Heat pump heating efficiency is similarly updated from HSPF to HSPF2, and the cooling-capacity efficiency rating EER becomes EER2.",
      },
      { type: "h2", text: "Current minimum standards" },
      {
        type: "p",
        text: "Federal minimums depend on region and equipment type. The Department of Energy defines regional standards, and Texas currently falls in the southern region. For split-system air conditioners under 45,000 Btu per hour in that region, the minimum is currently 14.3 SEER2. In the northern region the minimum is lower, at 13.4 SEER2, which is roughly equivalent to the older 14 SEER. Heat pumps follow a national minimum, which is currently 14.3 SEER2 for split systems along with a minimum HSPF2. Standards and effective dates can be updated, and equipment installed in a given year follows specific rules, so confirm current requirements with your contractor.",
      },
      { type: "h2", text: "Quick comparison" },
      {
        type: "ul",
        items: [
          "Test pressure: SEER used about 0.1 in. w.c. external static pressure, SEER2 uses 0.5 in. w.c.",
          "Numbers: the same equipment rates roughly 4 to 5 percent lower on SEER2.",
          "Meaning: SEER2 is a more realistic comparison, but still a lab rating.",
          "Labels: new equipment is labeled with SEER2, while you may still see SEER on older units and ads.",
        ],
      },
      { type: "h2", text: "Does a higher SEER2 save money?" },
      {
        type: "p",
        text: "In general, yes, but with diminishing returns. Moving from an older 10 SEER system to a modern 14 to 16 SEER2 system can make a significant difference, while the extra savings from jumping from 16 to 20 are smaller and may take longer to repay the higher price. Your savings also depend on duct leakage, correct refrigerant charge, proper airflow and how many hours per year your system runs. With a long cooling season, Houston homeowners do see more benefit from efficiency than owners in milder climates.",
      },
      { type: "h2", text: "What else matters as much as the rating" },
      {
        type: "ul",
        items: [
          "Correct sizing based on a Manual J load calculation, not the size of the old unit.",
          "Single-stage, two-stage and variable-speed operation. Multi-stage and variable-speed units generally handle humidity better, which matters in this climate.",
          "Matched indoor and outdoor components. Efficiency ratings apply to specific matched combinations.",
          "Duct condition. Leaky or restricted ducts can erase efficiency gains.",
          "Installation quality, including airflow, refrigerant charge and a clean system.",
          "Warranty terms and what registration requires.",
        ],
      },
      {
        type: "callout",
        title: "Check before you buy",
        text: "Ask any contractor to show you the AHRI certificate for the exact indoor and outdoor combination being quoted, and to explain the SEER2 and EER2 ratings. Confirm that the equipment meets the current minimum for your region, and that the contractor is licensed in Texas. Do not rely on a rating printed on an outdoor unit alone.",
      },
      { type: "h2", text: "How to compare quotes" },
      {
        type: "ol",
        items: [
          "Ask each contractor for the model numbers, the SEER2 rating and the capacity of every component quoted.",
          "Make sure each quote is based on a load calculation rather than a guess.",
          "Compare both stages of operation, such as single-stage, two-stage or variable-speed.",
          "Ask what is included: permits, ductwork repairs, thermostat, warranty and haul-away.",
          "Compare total cost and expected annual operating cost, not just the SEER2 number.",
        ],
      },
      { type: "h2", text: "Should you worry if your system says SEER?" },
      {
        type: "p",
        text: "No. A system labeled with a SEER rating was built under the older standard and is not illegal or defective. The rating simply used a different test. If you are replacing an older system, though, compare new equipment on SEER2 and use the same test method for each option you are considering.",
      },
    ],
    relatedServices: [
      { label: "HVAC installation", to: "/services/hvac-install" },
      { label: "Free replacement estimate", to: "/request-free-estimate" },
      { label: "Financing options", to: "/finance" },
    ],
    relatedArticles: [
      "choose-right-hvac-system",
      "repair-or-replace-air-conditioner",
      "how-heat-pump-works",
    ],
    faqs: [
      {
        q: "Is a 14 SEER system the same as 14 SEER2?",
        a: "No. A 14 SEER system would rate roughly 13.4 SEER2 under the newer test. Always compare like with like, using SEER2 for new equipment.",
      },
      {
        q: "What is EER2?",
        a: "EER2 measures efficiency at a single hot test condition rather than across a season. It can matter more in very hot climates, and some regions have EER2 requirements. Ask your contractor which ratings apply to your equipment.",
      },
      {
        q: "Will my old unit stop working because of the new standard?",
        a: "No. The standards govern new equipment. Your existing system can continue to be used and repaired. They matter when you are shopping for replacement equipment.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 11
  // ---------------------------------------------------------------------------
  {
    slug: "professional-hvac-tune-up",
    title: "What Happens During a Professional HVAC Tune-Up?",
    metaTitle: "What Happens During a Professional HVAC Tune-Up?",
    metaDescription:
      "See what a real HVAC tune-up includes: coil and drain checks, electrical testing, airflow and refrigerant measurements, plus what to expect and ask.",
    answer:
      "A professional HVAC tune-up is a systematic inspection and cleaning of your equipment, including electrical testing, coil and drain checks, airflow measurements and refrigerant performance checks. Its goal is to catch worn parts and small problems before they cause a breakdown.",
    category: "Maintenance",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "What a tune-up is, and is not" },
      {
        type: "p",
        text: "A tune-up is preventive maintenance. A quick glance at the outdoor unit and a thermostat check is not a real tune-up. A thorough visit includes cleaning where needed, measurements with instruments, and a plain-language report of what the technician found. It is meant to keep the system running safely and efficiently, and to identify parts that are likely to fail soon.",
      },
      { type: "h2", text: "Typical steps in a cooling tune-up" },
      {
        type: "ol",
        items: [
          "Review of your concerns, such as noises, weak airflow, high bills or humidity.",
          "Thermostat check, including calibration, settings and operation.",
          "Air filter inspection and replacement if needed.",
          "Outdoor unit inspection, including the condenser coil, fan blades, cabinet and the pad it sits on.",
          "Condenser coil cleaning when needed.",
          "Electrical inspection, tightening connections and checking wire condition and contactor wear.",
          "Capacitor testing with a meter to confirm the microfarad rating is within the manufacturer's tolerance.",
          "Motor checks on the condenser fan and indoor blower, including amp draw and lubrication where applicable.",
          "Evaporator coil and blower inspection, accessing them where practical.",
          "Condensate drain check, clearing the line if it is slow and testing the float or overflow switch.",
          "Temperature split measurement, comparing air entering and leaving the evaporator coil.",
          "Static pressure and airflow measurement to see whether ducts and filters restrict airflow.",
          "Refrigerant system check, including pressure and temperature readings, superheat and subcooling, and a look for signs of leaks such as oil stains.",
          "Inspection of the refrigerant line insulation and visible ductwork connections.",
          "Final operation check and a summary of findings and recommendations.",
        ],
      },
      { type: "h2", text: "Additional steps for heating" },
      {
        type: "ul",
        items: [
          "Gas furnace: inspect burners and ignition, check the flue and venting, test safety controls, inspect the heat exchanger as far as visible access allows, and check for carbon monoxide.",
          "Heat pump: test the reversing valve, defrost controls and auxiliary heat elements.",
          "Electric heat: inspect elements, sequencers, relays and breakers.",
        ],
      },
      { type: "h2", text: "What a tune-up can catch" },
      {
        type: "ul",
        items: [
          "A weakening capacitor before it fails on a 100-degree afternoon.",
          "A pitted contactor that is about to stick or fail.",
          "A slow drain that could overflow into your ceiling.",
          "A dirty coil that is reducing capacity and raising your bills.",
          "Low refrigerant charge indicating a leak.",
          "Poor airflow from dirty blower wheels or restricted ducts.",
          "Safety issues on a furnace, such as a cracked heat exchanger or venting problems.",
        ],
      },
      {
        type: "callout",
        title: "What a tune-up does not do",
        text: "A tune-up does not guarantee a system will never break down, and it should not turn into a sales pitch. If a technician recommends a repair, ask to see the measurement or the failing part and get the price in writing. If someone says refrigerant needs to be added routinely, ask why. A properly sealed system should not need regular refrigerant additions, and handling refrigerant requires EPA Section 608 certification.",
      },
      { type: "h2", text: "What you can do before the technician arrives" },
      {
        type: "ol",
        items: [
          "Write down any symptoms: noises, smells, uneven rooms or humidity.",
          "Clear space around the indoor and outdoor units so the technician can reach them.",
          "Replace a very dirty filter, or have the new one ready.",
          "Secure pets and let the technician know about any access issues, such as an attic ladder.",
          "Have your system's age and any past service records handy.",
        ],
      },
      { type: "h2", text: "When to schedule" },
      {
        type: "p",
        text: "In the Houston area, spring before the heat is a smart time for a cooling tune-up, and fall before the first cold stretch suits a heating check. Because the system works through such a long cooling season, some homeowners choose two visits a year. Booking before the busiest weeks can mean a more flexible schedule and a more thorough visit.",
      },
      { type: "h2", text: "Is it worth it?" },
      {
        type: "p",
        text: "Regular maintenance is typically a small cost relative to a major breakdown, and some manufacturer warranties require documented maintenance. A well-kept system also tends to run more efficiently and last longer. The value depends on the quality of the visit, so ask what is included and whether measurements are recorded.",
      },
      {
        type: "p",
        text: "Upfront AC & Heating lists a spring and fall maintenance combo, billed as one trip per year for a full tune-up, at $189 on its pricing page, along with an additional-unit price for multiple systems at the same location. See current prices on our Upfront Pricing page, since they can change.",
      },
    ],
    relatedServices: [
      { label: "HVAC maintenance", to: "/services/hvac-maintenance" },
      { label: "Heating services", to: "/services/heating" },
      { label: "Flat-rate pricing", to: "/upfront-pricing" },
      { label: "Air conditioning service", to: "/services/air-conditioning" },
    ],
    relatedArticles: [
      "houston-hvac-maintenance-checklist",
      "ac-running-not-cooling",
      "ac-repair-cost-houston",
    ],
    faqs: [
      {
        q: "How long does an HVAC tune-up take?",
        a: "A thorough tune-up for a single system commonly takes about an hour or more, depending on the equipment, access and condition. Be cautious of visits that take only a few minutes.",
      },
      {
        q: "Will a tune-up lower my energy bill?",
        a: "It can, if the system was running with a dirty coil, weak airflow or an electrical issue. Savings depend on the system's condition before the visit, so avoid anyone who promises a specific percentage.",
      },
      {
        q: "Do I need a tune-up for a new system?",
        a: "Yes, regular maintenance is still recommended, and many manufacturers require it to keep warranties valid. Check your warranty paperwork for specific requirements.",
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // 12
  // ---------------------------------------------------------------------------
  {
    slug: "choose-right-hvac-system",
    title: "How to Choose the Right HVAC System for Your Home",
    metaTitle: "How to Choose the Right HVAC System for Your Home",
    metaDescription:
      "A practical guide to choosing an HVAC system: sizing with Manual J, system types, efficiency, ducts, humidity control and how to compare contractor quotes.",
    answer:
      "The right HVAC system is correctly sized for your home through a load calculation, matched to your ducts and climate, and installed properly. Efficiency, equipment type and features matter, but sizing and installation quality usually have the biggest effect on comfort and cost.",
    category: "Buying Guide",
    datePublished: "2026-11-03",
    dateModified: "2026-11-03",
    readingMinutes: 5,
    body: [
      { type: "h2", text: "Start with sizing, not brand" },
      {
        type: "p",
        text: "The most common mistake is replacing an old system with the same size without checking whether it was right to begin with. Proper sizing begins with a Manual J load calculation, which accounts for your home's square footage, insulation, windows, orientation, air leakage, ducts and local climate. Cooling capacity is measured in tons, where one ton equals 12,000 Btu per hour. Rules of thumb based only on square footage are unreliable.",
      },
      {
        type: "p",
        text: "An oversized system cools too fast, shuts off before it removes much moisture and cycles on and off frequently. In humid places, that means a clammy house and extra wear. An undersized system runs constantly and struggles on peak days. Properly sized equipment runs longer, steadier cycles and manages humidity better.",
      },
      { type: "h2", text: "Types of systems" },
      { type: "h3", text: "Split-system air conditioner with a gas furnace" },
      {
        type: "p",
        text: "An outdoor AC paired with an indoor furnace and coil. This is common where natural gas is available and is a familiar, repairable setup.",
      },
      { type: "h3", text: "Heat pump with air handler" },
      {
        type: "p",
        text: "One system provides both cooling and heating by moving heat, usually with electric backup heat. It can work well in a mild climate like ours, and it has one set of outdoor equipment to maintain.",
      },
      { type: "h3", text: "Dual-fuel system" },
      {
        type: "p",
        text: "A heat pump paired with a gas furnace that takes over in the coldest weather. It is a more complex and more expensive option, which may suit homeowners who want flexibility.",
      },
      { type: "h3", text: "Ductless mini-split" },
      {
        type: "p",
        text: "A good option for additions, garages converted into living space, or homes without ducts. It can also solve a stubborn hot room.",
      },
      { type: "h3", text: "Packaged units" },
      {
        type: "p",
        text: "All components in one outdoor cabinet, often used on slabs or rooftops where there is no indoor space. Commercial buildings commonly use rooftop units.",
      },
      { type: "h2", text: "Features that matter in a humid climate" },
      {
        type: "ul",
        items: [
          "Efficiency, shown as SEER2 for cooling and HSPF2 for heat pump heating. Check the current regional minimum with your contractor and compare equipment using SEER2.",
          "Staging: single-stage, two-stage or variable-speed compressors. Two-stage and variable-speed systems run longer at lower output, which tends to improve humidity control and comfort.",
          "Blower type: variable-speed blowers can improve airflow and quiet operation.",
          "Refrigerant: newer equipment uses lower global-warming-potential refrigerants as the industry transitions away from R-410A. Ask what the system uses and how it will be serviced.",
          "Thermostat and controls: programmable or smart options can help, but they matter less than good sizing and installation.",
          "Warranty: compare parts and compressor coverage, and find out what requires registration or maintenance.",
        ],
      },
      { type: "h2", text: "Do not forget the ducts" },
      {
        type: "p",
        text: "New equipment connected to leaky, undersized or poorly designed ducts will not perform as promised. Many Houston-area homes have attic ductwork that is old, kinked or poorly sealed. A good contractor will inspect the ducts, measure static pressure and tell you whether repairs, new returns or a partial replacement are needed. Slab homes and attics also affect where equipment can go, and clay soil movement can stress ductwork and pads, so the setup should be inspected, not assumed.",
      },
      { type: "h2", text: "How to compare contractors and quotes" },
      {
        type: "ol",
        items: [
          "Verify the license. In Texas, HVAC contractors are licensed by the Texas Department of Licensing and Regulation, and you can look up a license number on the TDLR website.",
          "Ask whether the quote is based on a Manual J load calculation.",
          "Get written quotes listing brand, model numbers, SEER2, capacity, staging, warranty and what is included.",
          "Ask about permits. Replacements often require a permit and inspection, and the contractor should handle that.",
          "Check that ductwork, thermostat, disposal of the old equipment and surge protection are addressed.",
          "Compare total value, not only price. The lowest quote may skip steps that matter.",
          "Be cautious of pressure to sign the same day or of prices that expire in hours.",
        ],
      },
      {
        type: "callout",
        title: "Red flags when buying a system",
        text: "Be wary of anyone who will not do a load calculation, will not put the equipment details in writing, pushes the most expensive option without explaining why, or asks for a large payment before any work. Never allow an unlicensed person to handle refrigerant. It requires EPA Section 608 certification.",
      },
      { type: "h2", text: "Budget and financing" },
      {
        type: "p",
        text: "A new system is a major purchase, and price depends on size, equipment tier, duct work and the home's layout. Many homeowners use financing to spread the cost, and some utility or manufacturer incentives may be available for certain high-efficiency equipment. Check current offers rather than assuming. A mid-range system that is sized and installed well often serves a home better than a premium unit installed poorly.",
      },
      {
        type: "p",
        text: "Upfront AC & Heating, a licensed Texas HVAC contractor based in Tomball, offers free estimates for system replacements through its request-free-estimate page. Owner Allen Swindell has more than 15 years of experience in the HVAC industry.",
      },
    ],
    relatedServices: [
      { label: "HVAC installation", to: "/services/hvac-install" },
      { label: "Request a free estimate", to: "/request-free-estimate" },
      { label: "Residential HVAC", to: "/services/residential-hvac" },
      { label: "Financing options", to: "/finance" },
    ],
    relatedArticles: [
      "seer2-vs-seer",
      "how-heat-pump-works",
      "repair-or-replace-air-conditioner",
    ],
    faqs: [
      {
        q: "How long does an HVAC installation take?",
        a: "A straightforward replacement of an existing split system often takes one day, while jobs that include new ductwork, a new location or electrical changes can take longer. Your contractor should give you a timeline in advance.",
      },
      {
        q: "Should I replace my AC and furnace at the same time?",
        a: "Often, yes, if both are old, since matched components perform best and you avoid paying for two separate installations. If one is much newer, a contractor can advise whether it is compatible.",
      },
      {
        q: "What size air conditioner do I need for my house?",
        a: "There is no reliable answer from square footage alone. Size depends on insulation, windows, shading, duct design and more. A Manual J load calculation gives a defensible answer.",
      },
    ],
  },
];
