export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  description: string;
  contactTime: string;
  status: "new" | "contacted" | "consultation_scheduled" | "proposal_sent" | "won" | "lost";
  estimatedValue: number;
  notes?: string;
  createdAt: string;
  photos?: string[];
}

export interface Review {
  id: string;
  title: string;
  text: string;
  author: string;
  location: string;
  rating: number;
  featured: boolean;
  replyText?: string;
  createdAt: string;
  photos?: string[];
  source?: "google" | "direct";
  authorPhoto?: string;
}

export interface WebEmail {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "client" | "admin";
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  clientName: string;
  clientCity: string;
  clientEmail?: string;
  clientPhone?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  status?: "active" | "closed";
  isClosed?: boolean;
  closedAt?: string;
  messages: ChatMessage[];
}

export interface PortalUser {
  id: string;
  username: string;
  role: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  category?: string;
  uploadedAt: string;
}

// ── INITIAL PRE-SEEDS FOR UPFRONT AIR CONDITIONING & HEATING (HOUSTON / CYPRESS, TX) ──
export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Marcus Vance",
    email: "marcus.vance@gmail.com",
    phone: "(713) 819-7908",
    address: "14210 Spring Cypress Rd, Cypress, TX 77429",
    projectType: "residential",
    description: "AC blowing warm air on the second floor during peak afternoon heat. Need urgent refrigerant leak test and capacitor diagnosis.",
    contactTime: "morning",
    status: "new",
    estimatedValue: 450,
    createdAt: "2026-08-16T09:30:00Z"
  },
  {
    id: "lead-2",
    name: "Sarah Jenkins",
    email: "sarah.jenkins.tx@yahoo.com",
    phone: "(832) 555-8831",
    address: "28405 Tomball Pkwy, Tomball, TX 77375",
    projectType: "install",
    description: "Full system replacement estimate for a 16-SEER 4-Ton high-efficiency heat pump and air handler. Current unit is 14 years old.",
    contactTime: "afternoon",
    status: "contacted",
    estimatedValue: 8900,
    createdAt: "2026-08-15T14:15:00Z"
  },
  {
    id: "lead-3",
    name: "Daniel Alvarez",
    email: "dan_alvarez@outlook.com",
    phone: "(713) 555-4421",
    address: "9405 Barker Cypress Rd, Cypress, TX 77433",
    projectType: "maintenance",
    description: "Pre-season 21-point HVAC tune-up and evaporator coil cleaning before peak summer temperatures.",
    contactTime: "evening",
    status: "consultation_scheduled",
    estimatedValue: 189,
    createdAt: "2026-08-14T11:00:00Z"
  },
  {
    id: "lead-4",
    name: "Emily Croft",
    email: "emily.croft@gmail.com",
    phone: "(281) 555-7729",
    address: "18720 Kuykendahl Rd, Spring, TX 77379",
    projectType: "heating",
    description: "Gas furnace inspection, heat exchanger safety check, and thermostat calibration.",
    contactTime: "afternoon",
    status: "proposal_sent",
    estimatedValue: 650,
    createdAt: "2026-08-12T16:40:00Z"
  },
  {
    id: "lead-5",
    name: "Amanda Carter",
    email: "amanda.carter@commercialtx.net",
    phone: "(832) 555-1284",
    address: "12820 Willow Chase Dr, Houston, TX 77070",
    projectType: "commercial",
    description: "Commercial rooftop 10-ton package unit servicing for retail strip center. Needs filter replacements, belt adjustments, and economizer check.",
    contactTime: "morning",
    status: "won",
    notes: "Contract approved for bi-annual maintenance and emergency rooftop service.",
    estimatedValue: 4800,
    createdAt: "2026-08-10T10:10:00Z"
  },
  {
    id: "lead-6",
    name: "Jonathan Riggs",
    email: "jriggs_woodlands@gmail.com",
    phone: "(713) 555-9012",
    address: "4202 Woodlands Pkwy, The Woodlands, TX 77380",
    projectType: "indoor_air_quality",
    description: "Whole-home REME HALO LED air purification system and media filter upgrade for allergy relief.",
    contactTime: "evening",
    status: "won",
    notes: "Installed and validated airflow. Customer very satisfied.",
    estimatedValue: 1450,
    createdAt: "2026-08-08T15:20:00Z"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-google-1",
    title: "Helpful, honest, and reasonable prices",
    text: "I had a great experience with Allen from Upfront AC. He let me know when he was on his way, and he showed up as promised. He was helpful in answering questions, and his prices were reasonable. Would highly recommend him.",
    author: "Lorraine Penczak",
    location: "Google Verified Review · 3 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-05-15T10:00:00Z"
  },
  {
    id: "rev-google-2",
    title: "Told me the honest truth about my A/C unit",
    text: "Allen is my neighbor for many years and saw A/C company at house and came over to ask a few questions. I explain to him what they said and he just told me the honest truth about my A/C unit. The company was basically trying to sell me a new unit when the issue was something much smaller.",
    author: "Robert L Watts Jr",
    location: "Google Verified Review · 4 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-04-18T14:30:00Z"
  },
  {
    id: "rev-google-3",
    title: "Helped us tremendously and quick to respond",
    text: "I’ve had a couple interactions with Upfront AC and both times they have helped us tremendously! Their team is quick to respond, makes it really easy to understand what’s going on. I truly appreciate the help and services from these guys with fixing my problems!",
    author: "Josh Juarez",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-10T11:15:00Z"
  },
  {
    id: "rev-google-4",
    title: "Professional, prompt, efficient and reasonably priced",
    text: "Allen and his son were quick and thorough! They were professional, prompt, efficient, and reasonably priced for the maintenance / repair work completed. Thank you Allen and Damian!",
    author: "Melody Rymer",
    location: "Google Verified Review · 3 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-05-20T16:00:00Z"
  },
  {
    id: "rev-google-5",
    title: "Prolonged the life of my unit when others said replace",
    text: "Stephen fixed my system and was able to prolong the life of my unit for me, when other companies said it needed to be replaced. I recommend this company if you want honest work done.",
    author: "Deion Weaver",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-12T09:45:00Z"
  },
  {
    id: "rev-google-6",
    title: "Honest, Decent and Affordable HVAC guys",
    text: "Honest, Decent and Affordable HVAC guys. Not trying to upsell you things you don’t need.",
    author: "Henrik T Andersen",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-14T13:20:00Z"
  },
  {
    id: "rev-google-7",
    title: "Good utility bills through July and August",
    text: "Friendly, professional and very helpful. Had a few questions about my new unit and was a bit concerned. He assured me I have a very good system, and it has proven to be very efficient. Good utility bills through July and August.",
    author: "Joy Daniels",
    location: "Local Guide · 11 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-09-15T15:00:00Z"
  },
  {
    id: "rev-google-8",
    title: "Fair upfront pricing, prompt and professional",
    text: "Very knowledgeable, gave fair upfront pricing, and was very prompt and professional. I highly recommend using him.",
    author: "Chris Watson",
    location: "Local Guide · 4 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-04-22T10:30:00Z"
  },
  {
    id: "rev-google-9",
    title: "No surprises, new AC is great & cleanliness is a plus",
    text: "Very knowledgeable & gave upfront pricing. No surprises. Explained recommendations for upgrades to the builder grade materials on my 20yr old system. New AC is great & cleanliness is a plus.",
    author: "Lance Vincent",
    location: "Google Verified Review · 9 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-11-10T12:00:00Z"
  },
  {
    id: "rev-google-10",
    title: "Treats you like family and does amazing work",
    text: "Allen has been our service tech for many moons. He has always been reliable, fair, upfront, and honest. He communicates well, does extremely solid work and super friendly. Its hard to find someone who treats you like family and does such amazing work. I will recommend him to anyone.",
    author: "Crystal Monariti",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-01T14:00:00Z"
  },
  {
    id: "rev-google-11",
    title: "Reaching out to Allen for almost a decade",
    text: "I have been reaching out to Allen for years, almost a decade and he has never let me down. Even after the warranty company sends someone and the techs do not find anything - I reach out to Allen and he will find the issue. Very honest and flexible.",
    author: "Priscilla Garcia",
    location: "Local Guide · 11 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-09-20T17:00:00Z"
  },
  {
    id: "rev-google-12",
    title: "Saved me when my unit broke down over the holiday",
    text: "Upfront AC was just supposed to do a routine maintenance for me, but they ended up saving me when my unit broke down over the holiday. Allen was very responsive and honest, getting me parts and service at the last minute.",
    author: "Evan Visser",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-15T11:00:00Z"
  },
  {
    id: "rev-google-13",
    title: "Prompt, on time and work completed as planned",
    text: "Prompt, on time and work completed as planned. Very good group to work with.",
    author: "John Atwood",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-18T08:30:00Z"
  },
  {
    id: "rev-google-14",
    title: "Truly honest contractor who diagnosed quickly",
    text: "I had a great experience with Allen at Upfront A/C and just had to share. It's rare to find a contractor who's not only skilled but also truly honest. He came out, diagnosed the issue quickly, and fixed it right away.",
    author: "Letha Gaines",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-10T15:30:00Z"
  },
  {
    id: "rev-google-15",
    title: "Shoes came off as soon as he stepped inside",
    text: "Allen responded quickly to our urgent a/c problem and was very professional and respectful of our property. His shoes came off as soon as he stepped inside. Outstanding service.",
    author: "M.A. Williams",
    location: "Google Verified Review · 11 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-09-25T13:45:00Z"
  },
  {
    id: "rev-google-16",
    title: "Installed a new unit in our home seamlessly",
    text: "We have been using Allen Swindell for our Ac/Heating service/repairs for years now. He installed a new unit in our home a couple years ago and we couldn’t be happier with his work. He is very honest, respectful, and reliable.",
    author: "Sybil Ellis",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-06-15T12:00:00Z"
  },
  {
    id: "rev-google-17",
    title: "Always on time, very honest, family owned",
    text: "I have been using Allen for a couple of years now on all my A/C work at my house. Always on time and very honest and family owned. He takes pride in his work and I know I’m always getting high quality work from Allen.",
    author: "Eric M",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-20T10:00:00Z"
  },
  {
    id: "rev-google-18",
    title: "Amazing service! Would definitely recommend!",
    text: "Amazing service!!! Would definitely recommend!",
    author: "Brooke Davis",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-25T14:15:00Z"
  },
  {
    id: "rev-google-19",
    title: "Conducts business with absolute integrity",
    text: "When it comes to this company….they conduct business with absolute integrity. They act with urgency making you feel like a priority. You can tell he is motivated and takes great pride in what service he provides to the community.",
    author: "Kristee Ochiltree",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-22T09:00:00Z"
  },
  {
    id: "rev-google-20",
    title: "Walked me through a repair via phone on Friday evening",
    text: "I would refer anyone to Upfront AC! Allen exhibited what you would want from any service provider: patience, honesty, and care. He took his time on a Friday evening to walk me through a repair on my HVAC system via phone.",
    author: "Je'Marcus Jackson",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-30T18:00:00Z"
  },
  {
    id: "rev-google-21",
    title: "Educating me in the process and reasonable price",
    text: "Reasonable price. Allen with Upfront came over today and took care of my issue while talking us through it. It wasn’t an easy find so I appreciated his attention and educating me in the process.",
    author: "Hector Gonzalez",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-10T16:20:00Z"
  },
  {
    id: "rev-google-22",
    title: "Honest, hardworking and reliable",
    text: "If you want someone who is honest, hardworking and reliable you are looking in the right place with Allen! He always does his best to be a good person you can trust. Definitely recommend!",
    author: "Rachel Hannes",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-06-30T11:45:00Z"
  },
  {
    id: "rev-google-23",
    title: "These guys ROCK! Up and running in no time",
    text: "These guys ROCK! Our AC went out a few weeks ago and Alex got us up and running in no time. He cleared a clogged drain line that was backing up and triggering the float switch, and even went ahead and cleaned the machine up.",
    author: "David Grench",
    location: "Google Verified Review · 11 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-09-12T14:30:00Z"
  },
  {
    id: "rev-google-24",
    title: "New A/C was installed seamlessly next morning",
    text: "If you ever need a true local A/C guy Alan is your guy. He came out after hours to just diagnose the problem. Unfortunately we needed a new A/C so not a quick fix. Still next morning a new A/C was installed seamlessly.",
    author: "J&S",
    location: "Google Verified Review · 10 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-10-05T09:15:00Z"
  },
  {
    id: "rev-google-25",
    title: "Finds the problem and fixes it, no band-aids",
    text: "Always happy with the honest and fast service and support. Alan finds the problem and fixes it. Doesn’t just bandaid the symptoms. Truly appreciative of all the help he has provided.",
    author: "Jennifer Andjelich",
    location: "Local Guide · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-28T12:00:00Z"
  },
  {
    id: "rev-google-26",
    title: "Outstanding service, knowledgeable, and integrity",
    text: "Outstanding service, knowledgeable, and integrity. Allen went above and beyond.",
    author: "Marlon A Lara",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-20T17:10:00Z"
  },
  {
    id: "rev-google-27",
    title: "Spent hours cleaning blowers in 90° heat",
    text: "Upfront A/C came out to inspect and tune up my 2 A/C's. The young Man that came out was outstanding. He spent hours in my attic cleaning my Blowers, even with the temp 90 or above.",
    author: "Henry Mcgowen",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-15T15:00:00Z"
  },
  {
    id: "rev-google-28",
    title: "Very impressed, knowledgeable and trustworthy",
    text: "Great customer service...very impressed with Allen and Upfront AC. Very knowledgeable and trustworthy. Will be using again! If you need any A/C work done give him try!",
    author: "Rebecca Williams",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-05T13:20:00Z"
  },
  {
    id: "rev-google-29",
    title: "Fast, thorough, and efficient job on my AC",
    text: "Allen and his crew did a fast, thorough, and efficient job on my AC! I would trust them to help all my friends and family! Highly recommended! Thank you Upfront AC :)",
    author: "Celise Keller",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-12T10:30:00Z"
  },
  {
    id: "rev-google-30",
    title: "Provides pictures of what is actually wrong",
    text: "Excellent service, thorough, provides pictures of what is actually wrong versus just telling you. Doesn’t try to find things to charge you for but instead they try to save you money. Highly recommend.",
    author: "Heather Smith",
    location: "Local Guide · 10 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-10-18T16:00:00Z"
  },
  {
    id: "rev-google-31",
    title: "Fit us into schedule and charged what was estimated",
    text: "Fit us into schedule and got the ac back up and running. Charged what was estimated. Will always call these guys when need hvac work done.",
    author: "Jean-Paul Cardoso",
    location: "Google Verified Review · 8 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-12-05T11:00:00Z"
  },
  {
    id: "rev-google-32",
    title: "Quick to respond, referred to many clients",
    text: "Allen has always been quick to respond, very knowledgable about all things HVAC and I have used him for our personal home and referred him to many clients. Highly recommend.",
    author: "Nicole Walters (KatyTXRealtor)",
    location: "Local Guide · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-20T14:15:00Z"
  },
  {
    id: "rev-google-33",
    title: "Went out of their way to evaluate my situation",
    text: "These guys have a lot of knowledge in the AC world. Went out of their way to come to my home and evaluate my situation to provide useful feedback. Thank you guys so much!!",
    author: "Josh Bass",
    location: "Local Guide · 11 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-09-08T15:45:00Z"
  },
  {
    id: "rev-google-34",
    title: "Professional & quick would definitely use again",
    text: "Professional & quick would definitely use again & recommend.",
    author: "Tonna Biehle",
    location: "Google Verified Review · 10 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-10-22T12:00:00Z"
  },
  {
    id: "rev-google-35",
    title: "Reliable and honest and always on time",
    text: "The best company you can contact for your ac needs. Reliable and honest and always on time.",
    author: "Duane Ellis",
    location: "Google Verified Review · 8 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-12-14T09:30:00Z"
  },
  {
    id: "rev-google-36",
    title: "Explained everything in detail and was honest",
    text: "Great company! Allen explained everything in detail and was honest. Will definitely use him in the future.",
    author: "BEATRIZ RAMIREZ",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-05T13:00:00Z"
  },
  {
    id: "rev-google-37",
    title: "He was a nice guy",
    text: "He was a nice guy.",
    author: "Nicole Price",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-01T10:00:00Z"
  },
  {
    id: "rev-google-38",
    title: "I was hot for days he really saved me",
    text: "I was hot for days he really saved me.",
    author: "Treveon Green-Trent",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-08T16:30:00Z"
  },
  {
    id: "rev-google-39",
    title: "Scott is the best in the business!",
    text: "Scott is the best in the business!",
    author: "Tracey Gaines",
    location: "Google Verified Review · 3 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-05-18T11:20:00Z"
  },
  {
    id: "rev-google-40",
    title: "They go over and above service",
    text: "This company is thorough in what they do. They are very nice and great customers service. They go over and above service.",
    author: "Kristie Lazor",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-12T14:40:00Z"
  },
  {
    id: "rev-google-41",
    title: "On time and very direct, highly recommend",
    text: "On time and very direct, would recommend Upfront AC when in need of any HVAC repairs or service.",
    author: "Drayton Weaver",
    location: "Google Verified Review · 8 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-12-20T10:15:00Z"
  },
  {
    id: "rev-google-42",
    title: "Very responsable, committed, punctual with fair prices",
    text: "Excellent services, very responsable and committed, punctual and also very fair prices. I recommended.",
    author: "Blanca Brito",
    location: "Local Guide · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-07-25T15:10:00Z"
  },
  {
    id: "rev-google-43",
    title: "Outstanding service and fair pricing",
    text: "Outstanding service! Highly responsible, punctual with very fair pricing.",
    author: "Ginger Shunka",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-08T12:00:00Z"
  },
  {
    id: "rev-google-44",
    title: "Knowledgeable, checked everything for safety",
    text: "Knowledgeable, checked everything to ensure safety, individual service.",
    author: "Linda McRae",
    location: "Local Guide · 8 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-12-18T14:00:00Z"
  },
  {
    id: "rev-google-45",
    title: "Great job. Highly Professional",
    text: "Great job. Highly Professional.",
    author: "Koteswara Rao",
    location: "Local Guide · 11 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-09-28T16:00:00Z"
  },
  {
    id: "rev-google-46",
    title: "Great experience with Upfront AC",
    text: "Great experience with Upfront AC, would recommend.",
    author: "Taylor Becerra",
    location: "Google Verified Review · 1 year ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2025-08-16T11:00:00Z"
  },
  {
    id: "rev-google-47",
    title: "Stop looking and just call UPFRONT AIR CONDITIONING",
    text: "If you need AC help in Houston, stop looking and just call UPFRONT AIR CONDITIONING. The owner, Allen, and his helper, Stephen, came out to my house and they were absolutely incredible.",
    author: "Andrew Robinson",
    location: "Google Verified Review · 3 days ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-08-14T10:00:00Z"
  },
  {
    id: "rev-google-48",
    title: "No upsells, just honest work with a fair price",
    text: "Allen and Stephen from Upfront AC were nothing short of amazing. They were prompt, professional, and thorough in their work. No upsells, just honest work with a fair price.",
    author: "Lesley M.",
    location: "Google Verified Review · 3 days ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-08-14T14:30:00Z"
  },
  {
    id: "rev-google-49",
    title: "Great Service and fair price, very professional",
    text: "Great Service and fair price. Great work customer service and very professional.",
    author: "Review4ALL Truth2020",
    location: "Google Verified Review · 3 weeks ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-07-28T16:00:00Z"
  },
  {
    id: "rev-google-50",
    title: "Amazing experience working with Damien",
    text: "This was an amazing experience working with Damien. He did what he said, and pointed me in the right direction.",
    author: "Brooke Young",
    location: "Google Verified Review · 1 month ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-07-15T12:00:00Z"
  },
  {
    id: "rev-google-51",
    title: "Service is top notch, no hidden fees",
    text: "1st time using Allen and UP Front but wont be the last! Service is top notch. No hidden fees. Paid exactly what was quoted. He went above and beyond.",
    author: "James Rogers",
    location: "Google Verified Review · 2 months ago",
    rating: 5,
    featured: true,
    source: "google",
    createdAt: "2026-06-15T10:00:00Z"
  }
];

export const INITIAL_CHATS: ChatSession[] = [];

export const INITIAL_EMAILS: WebEmail[] = [
  {
    id: "email-1",
    name: "Brandon Scott",
    email: "bscott.houston@gmail.com",
    phone: "(713) 555-0194",
    service: "AC System Replacement & Installation",
    message: "Looking for an estimate to replace our 14-year-old 4-ton carrier unit in Tomball. Would love to review high-efficiency inverter heat pump options.",
    source: "Free Estimate Page",
    createdAt: "2026-08-16T14:30:00Z"
  },
  {
    id: "email-2",
    name: "Sarah Jenkins",
    email: "sjenkins.cypress@yahoo.com",
    phone: "(832) 555-0812",
    service: "24/7 Emergency AC Diagnostic",
    message: "Our AC stopped cooling this afternoon and is blowing warm air. Need a technician in Cypress as soon as possible.",
    source: "Contact Page",
    createdAt: "2026-08-17T09:15:00Z"
  },
  {
    id: "email-3",
    name: "David Miller",
    email: "dmiller@magnoliacoffee.com",
    phone: "(281) 555-7391",
    service: "Commercial HVAC Maintenance",
    message: "Inquiring about seasonal maintenance contracts for our 3 commercial rooftop packaged units in Tomball.",
    source: "Commercial HVAC Page",
    createdAt: "2026-08-17T11:45:00Z"
  }
];

// ── LOCAL STORAGE FALLBACK HELPERS ──
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ── GENERIC API FETCH HELPER ──
async function apiCall<T>(url: string, method: string, body?: any): Promise<T> {
  const options: RequestInit = { method };
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["content-type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  // Attach session token if logged in
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("electrical-session-token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  options.headers = headers;

  const res = await fetch(url, options);
  if (!res.ok) {
    let errorMsg = `HTTP error ${res.status}`;
    try {
      const text = await res.text();
      try {
        const parsed = JSON.parse(text);
        if (parsed.error) {
          errorMsg = parsed.error;
        }
      } catch {
        if (text) {
          const cleanText = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
          errorMsg = cleanText.length > 200 ? cleanText.substring(0, 200) + "..." : cleanText;
        }
      }
    } catch {
      // Ignore
    }
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}

// ── LEADS ──
export const getLeads = async (): Promise<Lead[]> => {
  try {
    const leads = await apiCall<Lead[]>("/api/leads", "GET");
    setStorageItem("electrical-leads", leads);
    return leads;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage leads:", err);
    return getStorageItem<Lead[]>("electrical-leads", INITIAL_LEADS);
  }
};

export const addLead = async (leadData: Omit<Lead, "id" | "status" | "estimatedValue" | "createdAt">): Promise<Lead> => {
  try {
    return await apiCall<Lead>("/api/leads", "POST", { leadData });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    let estimatedValue = 2500;
    switch (leadData.projectType) {
      case "panel-upgrades": estimatedValue = 3500; break;
      case "ev-charger": estimatedValue = 1200; break;
      case "generator": estimatedValue = 14500; break;
      case "commercial": estimatedValue = 32000; break;
      case "residential": estimatedValue = 2500; break;
      case "industrial": estimatedValue = 54000; break;
      case "emergency": estimatedValue = 450; break;
      case "wiring-rewiring": estimatedValue = 8500; break;
      case "security-systems": estimatedValue = 6500; break;
    }
    const newLead: Lead = {
      ...leadData,
      id: "lead-" + Math.random().toString(36).substr(2, 9),
      status: "new",
      estimatedValue,
      createdAt: new Date().toISOString(),
      photos: []
    };
    leads.push(newLead);
    setStorageItem("electrical-leads", leads);
    return newLead;
  }
};

export const addCustomLead = async (lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> => {
  try {
    return await apiCall<Lead>("/api/leads", "POST", { custom: true, lead });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const newLead: Lead = {
      ...lead,
      id: "lead-" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    leads.push(newLead);
    setStorageItem("electrical-leads", leads);
    return newLead;
  }
};

export const updateLeadStatus = async (id: string, status: Lead["status"]): Promise<Lead[] | null> => {
  try {
    const updated = await apiCall<Lead[]>("/api/leads", "PUT", { id, updates: { status } });
    if (Array.isArray(updated)) {
      setStorageItem("electrical-leads", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
  }
  const leads = await getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, status } : l);
  setStorageItem("electrical-leads", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
  }
  return updated;
};

export const updateLeadDetails = async (id: string, updates: Partial<Omit<Lead, "id" | "createdAt">>): Promise<Lead[] | null> => {
  try {
    const updated = await apiCall<Lead[]>("/api/leads", "PUT", { id, updates });
    if (Array.isArray(updated)) {
      setStorageItem("electrical-leads", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
  }
  const leads = await getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, ...updates } : l);
  setStorageItem("electrical-leads", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
  }
  return updated;
};

export const deleteLead = async (id: string): Promise<Lead[]> => {
  try {
    const updated = await apiCall<Lead[]>("/api/leads", "DELETE", { id });
    if (Array.isArray(updated)) {
      setStorageItem("electrical-leads", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
  }
  const leads = await getLeads();
  const filtered = leads.filter(l => l.id !== id);
  setStorageItem("electrical-leads", filtered);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
  }
  return filtered;
};

export const uploadLeadPhoto = async (leadId: string, base64Photo: string): Promise<Lead[]> => {
  try {
    const updated = await apiCall<Lead[]>("/api/leads/photos", "POST", { leadId, base64Photo });
    if (Array.isArray(updated)) {
      setStorageItem("electrical-leads", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
  }
  const leads = await getLeads();
  const updated = leads.map(l => {
    if (l.id === leadId) {
      const photos = l.photos || [];
      return { ...l, photos: [...photos, base64Photo] };
    }
    return l;
  });
  setStorageItem("electrical-leads", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-leads-updated"));
  }
  return updated;
};

export const removeLeadPhoto = async (leadId: string, photoIndex: number): Promise<Lead[]> => {
  try {
    return await apiCall<Lead[]>("/api/leads/photos", "DELETE", { leadId, photoIndex });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const updated = leads.map(l => {
      if (l.id === leadId && l.photos) {
        const photos = [...l.photos];
        photos.splice(photoIndex, 1);
        return { ...l, photos };
      }
      return l;
    });
    setStorageItem("electrical-leads", updated);
    return updated;
  }
};

// ── REVIEWS ──
export const getReviews = async (): Promise<Review[]> => {
  try {
    const reviews = await apiCall<Review[]>("/api/reviews", "GET");
    if (Array.isArray(reviews) && reviews.length >= INITIAL_REVIEWS.length) {
      setStorageItem("upfront-reviews-v2", reviews);
      return reviews;
    }
    // If backend returns fewer than full set, merge them
    const merged = [...INITIAL_REVIEWS];
    if (Array.isArray(reviews)) {
      for (const r of reviews) {
        if (!merged.some(m => m.id === r.id || (m.author === r.author && m.text === r.text))) {
          merged.unshift(r);
        }
      }
    }
    setStorageItem("upfront-reviews-v2", merged);
    return merged;
  } catch (err) {
    console.warn("MongoDB offline, loading all verified Google reviews:", err);
    const local = getStorageItem<Review[]>("upfront-reviews-v2", INITIAL_REVIEWS);
    if (!local || local.length < INITIAL_REVIEWS.length) {
      setStorageItem("upfront-reviews-v2", INITIAL_REVIEWS);
      return INITIAL_REVIEWS;
    }
    return local;
  }
};

export const addReview = async (reviewData: Omit<Review, "id" | "featured" | "createdAt"> & { newReviewPhoto?: string }): Promise<Review> => {
  try {
    return await apiCall<Review>("/api/reviews", "POST", reviewData);
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const photos: string[] = [];
    if (reviewData.newReviewPhoto) {
      photos.push(reviewData.newReviewPhoto);
    }
    const newReview: Review = {
      ...reviewData,
      id: "review-" + Math.random().toString(36).substr(2, 9),
      featured: true,
      createdAt: new Date().toISOString(),
      photos
    };
    reviews.unshift(newReview);
    setStorageItem("upfront-reviews-v2", reviews);
    return newReview;
  }
};

export const toggleReviewFeatured = async (id: string): Promise<Review[]> => {
  try {
    return await apiCall<Review[]>("/api/reviews", "PUT", { id, action: "featured" });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const updated = reviews.map(r => r.id === id ? { ...r, featured: !r.featured } : r);
    setStorageItem("upfront-reviews-v2", updated);
    return updated;
  }
};

export const replyToReview = async (id: string, replyText: string): Promise<Review[]> => {
  try {
    return await apiCall<Review[]>("/api/reviews", "PUT", { id, replyText, action: "reply" });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const updated = reviews.map(r => r.id === id ? { ...r, replyText } : r);
    setStorageItem("upfront-reviews-v2", updated);
    return updated;
  }
};

export const deleteReview = async (id: string): Promise<Review[]> => {
  try {
    return await apiCall<Review[]>("/api/reviews", "DELETE", { id });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const updated = reviews.filter(r => r.id !== id);
    setStorageItem("upfront-reviews-v2", updated);
    return updated;
  }
};

export const syncGooglePlacesReviews = async (
  apiKey?: string,
  placeId?: string
): Promise<{ success: boolean; reviews: Review[]; count: number; message?: string }> => {
  try {
    const res = await apiCall<{ success: boolean; reviews: Review[]; count: number; message?: string }>(
      "/api/reviews",
      "POST",
      { action: "sync_google", apiKey, placeId }
    );
    if (res && res.reviews) {
      setStorageItem("electrical-reviews", res.reviews);
    }
    return res;
  } catch (err: any) {
    console.error("Failed to sync Google reviews:", err);
    throw new Error(err.message || "Failed to sync Google reviews");
  }
};

// ── CHATS ──
export const getChatSessions = async (): Promise<ChatSession[]> => {
  try {
    const chats = await apiCall<ChatSession[]>("/api/chats?t=" + Date.now(), "GET");
    if (Array.isArray(chats)) {
      const sorted = chats.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
      setStorageItem("upfront-chats-v2", sorted);
      return sorted;
    }
  } catch (err) {
    console.warn("MongoDB/API offline, checking local storage chats:", err);
  }
  const chats = getStorageItem<ChatSession[]>("upfront-chats-v2", INITIAL_CHATS);
  return chats.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
};

export const getChatSessionById = async (sessionId: string): Promise<ChatSession | null> => {
  const chats = await getChatSessions();
  return chats.find(c => c.id === sessionId) || null;
};

export const createChatSession = async (
  clientName: string,
  clientCity: string = "Tomball, TX",
  clientEmail?: string,
  clientPhone?: string
): Promise<ChatSession> => {
  try {
    const session = await apiCall<ChatSession>("/api/chats", "POST", { action: "create", clientName, clientCity, clientEmail, clientPhone });
    if (session) {
      const chats = await getChatSessions();
      if (!chats.some(c => c.id === session.id)) {
        chats.unshift(session);
        setStorageItem("upfront-chats-v2", chats);
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: session }));
      }
      return session;
    }
  } catch (err) {
    console.warn("MongoDB offline, creating chat in local storage:", err);
  }

  const chats = await getChatSessions();
  const newSession: ChatSession = {
    id: "session-" + Math.random().toString(36).substr(2, 9),
    clientName: clientName || "Website Visitor",
    clientCity: clientCity || "Tomball, TX",
    clientEmail,
    clientPhone,
    lastMessage: "Chat session initialized",
    lastMessageTime: new Date().toISOString(),
    unread: true,
    messages: []
  };
  chats.unshift(newSession);
  setStorageItem("upfront-chats-v2", chats);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: newSession }));
  }
  return newSession;
};

export const dedupeChatMessages = (messages: ChatMessage[]): ChatMessage[] => {
  if (!Array.isArray(messages)) return [];
  const seenIds = new Set<string>();
  const result: ChatMessage[] = [];
  for (const m of messages) {
    if (!m || !m.text) continue;
    if (m.id && seenIds.has(m.id)) continue;
    const isDuplicate = result.some(
      existing =>
        existing.sender === m.sender &&
        existing.text.trim() === m.text.trim() &&
        Math.abs(new Date(existing.timestamp).getTime() - new Date(m.timestamp).getTime()) < 3000
    );
    if (isDuplicate) continue;
    if (m.id) seenIds.add(m.id);
    result.push(m);
  }
  return result;
};

export const sendChatMessage = async (
  sessionId: string,
  sender: "client" | "admin",
  text: string,
  messageId?: string,
  timestamp?: string
): Promise<ChatSession | null> => {
  const msgId = messageId || "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);
  const time = timestamp || new Date().toISOString();

  try {
    const updated = await apiCall<ChatSession | null>("/api/chats", "POST", {
      action: "message",
      sessionId,
      sender,
      text,
      messageId: msgId,
      timestamp: time
    });
    if (updated) {
      updated.messages = dedupeChatMessages(updated.messages || []);
      const chats = await getChatSessions();
      const updatedChats = chats.map(c => c.id === sessionId ? updated : c);
      setStorageItem("upfront-chats-v2", updatedChats);
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, sending message via local storage:", err);
  }

  const chats = await getChatSessions();
  let updatedSession: ChatSession | null = null;
  const updatedChats = chats.map(c => {
    if (c.id === sessionId) {
      const newMsg: ChatMessage = {
        id: msgId,
        sender,
        text,
        timestamp: time
      };
      const messages = dedupeChatMessages([...c.messages, newMsg]);
      updatedSession = {
        ...c,
        messages,
        lastMessage: text,
        lastMessageTime: time,
        unread: sender === "client"
      };
      return updatedSession;
    }
    return c;
  });
  setStorageItem("upfront-chats-v2", updatedChats);
  return updatedSession;
};

export const markChatAsRead = async (sessionId: string): Promise<ChatSession[]> => {
  try {
    const updated = await apiCall<ChatSession[]>("/api/chats", "POST", { action: "read", sessionId });
    if (Array.isArray(updated)) {
      setStorageItem("upfront-chats-v2", updated);
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, marking read in local storage:", err);
  }
  const chats = await getChatSessions();
  const updated = chats.map(c => c.id === sessionId ? { ...c, unread: false } : c);
  setStorageItem("upfront-chats-v2", updated);
  return updated;
};

export const deleteChatSession = async (id: string): Promise<ChatSession[]> => {
  try {
    const chats = await apiCall<ChatSession[]>("/api/chats?id=" + id, "DELETE");
    if (Array.isArray(chats)) {
      setStorageItem("upfront-chats-v2", chats);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: id }));
      }
      return chats;
    }
  } catch (err) {
    console.warn("MongoDB offline, deleting from local storage:", err);
  }
  const chats = await getChatSessions();
  const filtered = chats.filter(c => c.id !== id);
  setStorageItem("upfront-chats-v2", filtered);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: id }));
  }
  return filtered;
};

export const closeChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  try {
    const updated = await apiCall<ChatSession | null>("/api/chats", "POST", { action: "close", sessionId });
    if (updated) {
      const chats = await getChatSessions();
      const updatedChats = chats.map(c => c.id === sessionId ? updated : c);
      setStorageItem("upfront-chats-v2", updatedChats);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: updated }));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, closing chat in local storage:", err);
  }
  const chats = await getChatSessions();
  let updatedSession: ChatSession | null = null;
  const updatedChats = chats.map(c => {
    if (c.id === sessionId) {
      updatedSession = {
        ...c,
        status: "closed",
        isClosed: true,
        closedAt: new Date().toISOString()
      };
      return updatedSession;
    }
    return c;
  });
  setStorageItem("upfront-chats-v2", updatedChats);
  if (typeof window !== "undefined" && updatedSession) {
    window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: updatedSession }));
  }
  return updatedSession;
};

export const reopenChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  try {
    const updated = await apiCall<ChatSession | null>("/api/chats", "POST", { action: "reopen", sessionId });
    if (updated) {
      const chats = await getChatSessions();
      const updatedChats = chats.map(c => c.id === sessionId ? updated : c);
      setStorageItem("upfront-chats-v2", updatedChats);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: updated }));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, reopening chat in local storage:", err);
  }
  const chats = await getChatSessions();
  let updatedSession: ChatSession | null = null;
  const updatedChats = chats.map(c => {
    if (c.id === sessionId) {
      updatedSession = {
        ...c,
        status: "active",
        isClosed: false,
        closedAt: undefined
      };
      return updatedSession;
    }
    return c;
  });
  setStorageItem("upfront-chats-v2", updatedChats);
  if (typeof window !== "undefined" && updatedSession) {
    window.dispatchEvent(new CustomEvent("upfront-chats-updated", { detail: updatedSession }));
  }
  return updatedSession;
};

// ── EMAILS / WEB INQUIRIES ──
export const getWebEmails = async (): Promise<WebEmail[]> => {
  try {
    const emails = await apiCall<WebEmail[]>("/api/emails?t=" + Date.now(), "GET");
    if (Array.isArray(emails)) {
      const sorted = emails.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setStorageItem("upfront-emails-v2", sorted);
      return sorted;
    }
  } catch (err) {
    console.warn("MongoDB/API offline, reading local storage emails:", err);
  }
  const emails = getStorageItem<WebEmail[]>("upfront-emails-v2", INITIAL_EMAILS);
  return emails.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addWebEmail = async (emailData: Omit<WebEmail, "id" | "createdAt">): Promise<WebEmail> => {
  let projectType: Lead["projectType"] = "residential";
  let estimatedValue = 450;
  const srvLower = ((emailData.service || "") + " " + (emailData.message || "")).toLowerCase();
  if (srvLower.includes("install") || srvLower.includes("replacement") || srvLower.includes("system") || srvLower.includes("heat pump")) {
    projectType = "install";
    estimatedValue = 8500;
  } else if (srvLower.includes("furnace") || srvLower.includes("heating") || srvLower.includes("heater")) {
    projectType = "heating";
    estimatedValue = 650;
  } else if (srvLower.includes("tune-up") || srvLower.includes("tuneup") || srvLower.includes("maintenance") || srvLower.includes("checkup")) {
    projectType = "maintenance";
    estimatedValue = 189;
  } else if (srvLower.includes("commercial") || srvLower.includes("rooftop")) {
    projectType = "commercial";
    estimatedValue = 3500;
  } else if (srvLower.includes("air quality") || srvLower.includes("iaq") || srvLower.includes("purification") || srvLower.includes("duct")) {
    projectType = "indoor_air_quality";
    estimatedValue = 1200;
  } else if (srvLower.includes("emergency") || srvLower.includes("urgent") || srvLower.includes("24/7")) {
    projectType = "emergency";
    estimatedValue = 550;
  }

  const newLeadFallback: Lead = {
    id: "lead-" + Math.random().toString(36).substr(2, 9),
    name: emailData.name || "Website Prospect",
    email: emailData.email || "",
    phone: emailData.phone || "",
    address: (emailData as any).address || `${emailData.source || "Website Inquiry"} · Houston / Cypress, TX`,
    projectType,
    description: emailData.message || `Customer inquiry received from ${emailData.source || "Website Form"} (${emailData.service || "General Request"})`,
    contactTime: "anytime",
    status: "new",
    estimatedValue,
    createdAt: new Date().toISOString(),
    photos: []
  };

  try {
    const res = await apiCall<any>("/api/emails", "POST", { emailData });
    if (res) {
      const savedEmail: WebEmail = {
        id: res.id || "email-" + Math.random().toString(36).substr(2, 9),
        name: res.name || emailData.name,
        email: res.email || emailData.email,
        phone: res.phone || emailData.phone,
        service: res.service || emailData.service,
        message: res.message || emailData.message,
        source: res.source || emailData.source,
        createdAt: res.createdAt || new Date().toISOString()
      };
      const savedLead: Lead = res.lead || newLeadFallback;

      // Update client emails cache
      const emails = await getWebEmails();
      if (!emails.some(e => e.id === savedEmail.id)) {
        emails.unshift(savedEmail);
        setStorageItem("upfront-emails-v2", emails);
      }

      // Update client leads cache
      const leads = await getLeads();
      if (!leads.some(l => l.id === savedLead.id)) {
        leads.unshift(savedLead);
        setStorageItem("electrical-leads", leads);
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-emails-updated", { detail: savedEmail }));
        window.dispatchEvent(new CustomEvent("upfront-leads-updated", { detail: savedLead }));
      }
      return savedEmail;
    }
  } catch (err) {
    console.warn("MongoDB offline, saving email and lead to local storage:", err);
  }

  // Local storage fallback
  const emails = await getWebEmails();
  const newEmail: WebEmail = {
    ...emailData,
    id: "email-" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  emails.unshift(newEmail);
  setStorageItem("upfront-emails-v2", emails);

  const leads = await getLeads();
  leads.unshift(newLeadFallback);
  setStorageItem("electrical-leads", leads);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-emails-updated", { detail: newEmail }));
    window.dispatchEvent(new CustomEvent("upfront-leads-updated", { detail: newLeadFallback }));
  }
  return newEmail;
};

export const deleteWebEmail = async (id: string): Promise<WebEmail[]> => {
  try {
    const updated = await apiCall<WebEmail[]>("/api/emails", "DELETE", { id });
    if (Array.isArray(updated)) {
      setStorageItem("upfront-emails-v2", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-emails-updated", { detail: id }));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, deleting email from local storage:", err);
  }
  const emails = await getWebEmails();
  const filtered = emails.filter(e => e.id !== id);
  setStorageItem("upfront-emails-v2", filtered);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-emails-updated", { detail: id }));
  }
  return filtered;
};

// ── GALLERY PHOTOS ──
export const getGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  try {
    const photos = await apiCall<GalleryPhoto[]>("/api/gallery", "GET");
    if (Array.isArray(photos) && photos.length > 0) {
      setStorageItem("upfront-gallery-photos-v2", photos);
      return photos;
    }
  } catch (err) {
    console.warn("API/DB gallery read warning, checking local storage:", err);
  }
  return getStorageItem<GalleryPhoto[]>("upfront-gallery-photos-v2", []);
};

export const uploadGalleryPhoto = async (fileOrBase64: string | File, category?: string, title?: string): Promise<GalleryPhoto[]> => {
  let secureUrl = "";
  try {
    const folder = `upfrontac/${category && category !== "all" ? category : "gallery"}`;

    // Step 1: Get a signed upload token from the server
    const signRes = await apiCall<{ signature: string; timestamp: number; apiKey: string; cloudName: string; folder: string }>(
      "/api/sign-upload", "POST", { folder }
    );

    // Step 2: Build FormData for direct Cloudinary upload (supports high-res images)
    const formData = new FormData();
    formData.append("api_key", signRes.apiKey);
    formData.append("signature", signRes.signature);
    formData.append("timestamp", String(signRes.timestamp));
    formData.append("folder", signRes.folder);

    // Accept either a File object (from input) or a base64 string
    if (fileOrBase64 instanceof File) {
      formData.append("file", fileOrBase64);
    } else {
      formData.append("file", fileOrBase64);
    }

    // Step 3: Upload directly to Cloudinary CDN
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signRes.cloudName}/auto/upload`,
      { method: "POST", body: formData }
    );
    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      throw new Error(`Cloudinary upload failed: ${err}`);
    }
    const uploadData = await uploadRes.json();
    secureUrl = uploadData.secure_url;

    // Step 4: Save the URL & metadata to our database
    const updated = await apiCall<GalleryPhoto[]>("/api/gallery", "POST", { url: secureUrl, category, title });
    if (Array.isArray(updated)) {
      setStorageItem("upfront-gallery-photos-v2", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-gallery-updated", { detail: updated }));
      }
      return updated;
    }
  } catch (err) {
    console.warn("Gallery upload server sync fallback:", err);
  }

  // Ensure Cloudinary secureUrl is always saved
  const photos = await getGalleryPhotos();
  const newPhoto: GalleryPhoto = {
    id: "photo-" + Math.random().toString(36).substr(2, 9),
    url: secureUrl || (typeof fileOrBase64 === "string" ? fileOrBase64 : ""),
    category: category || "residential",
    title: title || "HVAC Project",
    uploadedAt: new Date().toISOString()
  };
  photos.unshift(newPhoto);
  setStorageItem("upfront-gallery-photos-v2", photos);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-gallery-updated", { detail: photos }));
  }
  return photos;
};

export const removeGalleryPhoto = async (id: string): Promise<GalleryPhoto[]> => {
  try {
    const updated = await apiCall<GalleryPhoto[]>(`/api/gallery?id=${id}`, "DELETE");
    if (Array.isArray(updated)) {
      setStorageItem("upfront-gallery-photos-v2", updated);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-gallery-updated", { detail: updated }));
      }
      return updated;
    }
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
  }
  const photos = await getGalleryPhotos();
  const filtered = photos.filter(p => p.id !== id);
  setStorageItem("upfront-gallery-photos-v2", filtered);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-gallery-updated", { detail: filtered }));
  }
  return filtered;
};

// ── PORTAL SECURITY & AUTH ──
export const loginAdmin = async (username: string, password: string): Promise<{ success: boolean; token: string }> => {
  try {
    const res = await apiCall<{ success: boolean; user: any }>("/api/users", "POST", { action: "login", username, password });
    if (res && res.success && res.user && typeof window !== "undefined") {
      const token = "token-" + res.user.id + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("electrical-session-token", token);
      localStorage.setItem("electrical-session-user", JSON.stringify(res.user));
      return { success: true, token };
    }
    throw new Error("Invalid username or password.");
  } catch (err: any) {
    throw new Error(err.message || "Invalid username or password. Please verify your credentials.");
  }
};

export const verifyAdminToken = async (token: string): Promise<{ valid: boolean; id?: string; username?: string; role?: string }> => {
  if (typeof window === "undefined") return { valid: false };
  const activeToken = localStorage.getItem("electrical-session-token");
  const storedUser = localStorage.getItem("electrical-session-user");
  if (activeToken === token && storedUser) {
    try {
      const u = JSON.parse(storedUser);
      return { valid: true, id: u.id, username: u.username, role: u.role };
    } catch {
      return { valid: false };
    }
  }
  return { valid: false };
};

export const getPortalUsers = async (): Promise<PortalUser[]> => {
  try {
    const users = await apiCall<PortalUser[]>("/api/users", "GET");
    if (Array.isArray(users)) {
      return users;
    }
    return [];
  } catch (err) {
    console.warn("Error fetching portal users from database:", err);
    return [];
  }
};

export const createPortalUser = async (username: string, password: string, role: string): Promise<{ success: boolean; id: string; username: string; role: string }> => {
  return await apiCall<{ success: boolean; id: string; username: string; role: string }>("/api/users", "POST", { action: "create", username, password, role });
};

export const deletePortalUser = async (userId: string): Promise<{ success: boolean }> => {
  return await apiCall<{ success: boolean }>("/api/users", "POST", { action: "delete", userId });
};

export const updateUserCredentials = async (userId: string, username?: string, password?: string, role?: string): Promise<{ success: boolean; username: string }> => {
  const res = await apiCall<{ success: boolean; username: string }>("/api/users", "POST", { action: "update", userId, username, password, role });
  if (res && res.success && typeof window !== "undefined") {
    const storedUser = localStorage.getItem("electrical-session-user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.id === userId) {
          u.username = res.username;
          if (role) u.role = role;
          localStorage.setItem("electrical-session-user", JSON.stringify(u));
        }
      } catch {}
    }
  }
  return res;
};

// Analytics calculator helper
export const getAnalyticsData = (leads: Lead[], reviews: Review[]) => {
  const totalValue = leads.reduce((acc, curr) => curr.status !== "lost" ? acc + curr.estimatedValue : acc, 0);
  const activeCount = leads.filter(l => ["new", "contacted", "consultation_scheduled", "proposal_sent"].includes(l.status)).length;
  
  const wonLeads = leads.filter(l => l.status === "won");
  const lostLeads = leads.filter(l => l.status === "lost");
  const wonValue = wonLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0);
  const totalClosed = wonLeads.length + lostLeads.length;
  const winRate = totalClosed > 0 ? Math.round((wonLeads.length / totalClosed) * 100) : (leads.length > 0 ? Math.round((wonLeads.length / leads.length) * 100) : 0);
  
  const averageValue = leads.length > 0 ? Math.round(leads.reduce((acc, curr) => acc + curr.estimatedValue, 0) / leads.length) : 0;

  // 1. Project type distribution
  const typeCounts: Record<string, { count: number; value: number }> = {};
  leads.forEach(l => {
    const pType = l.projectType || "residential";
    if (!typeCounts[pType]) {
      typeCounts[pType] = { count: 0, value: 0 };
    }
    typeCounts[pType].count += 1;
    typeCounts[pType].value += (l.estimatedValue || 0);
  });

  const projectTypesChart = Object.entries(typeCounts).map(([name, data]) => ({
    name: name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    value: data.count,
    amount: data.value
  }));

  // 2. Status distribution
  const statusLabels: Record<Lead["status"], string> = {
    new: "New Lead",
    contacted: "Contacted",
    consultation_scheduled: "Consultation Scheduled",
    proposal_sent: "Proposal Sent",
    won: "Contract Won",
    lost: "Lost / Closed"
  };

  const statusCounts: Record<string, number> = {
    "New Lead": 0,
    "Contacted": 0,
    "Consultation Scheduled": 0,
    "Proposal Sent": 0,
    "Contract Won": 0,
    "Lost / Closed": 0
  };

  leads.forEach(l => {
    const label = statusLabels[l.status] || "New Lead";
    statusCounts[label] = (statusCounts[label] || 0) + 1;
  });

  const statusChart = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  // 3. Regional distribution (Texas territory)
  const cityCounts: Record<string, number> = {};
  leads.forEach(l => {
    const addressStr = l.address || "Cypress, TX";
    const parts = addressStr.split(",");
    let city = "Cypress";
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 2].trim();
      city = cityPart || "Cypress";
    }
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  const regionChart = Object.entries(cityCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 4. Growth monthly timeline
  const monthsList = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const monthlyData: Record<string, { count: number; value: number }> = {
    "Mar": { count: 4, value: 4500 },
    "Apr": { count: 8, value: 9200 },
    "May": { count: 14, value: 16800 },
    "Jun": { count: 18, value: 24500 },
    "Jul": { count: 22, value: 31200 },
    "Aug": { count: 0, value: 0 }
  };

  leads.forEach(l => {
    if (!l.createdAt) return;
    const date = new Date(l.createdAt);
    if (isNaN(date.getTime())) return;
    const month = date.toLocaleString("en-US", { month: "short" });
    if (monthlyData[month]) {
      monthlyData[month].count += 1;
      monthlyData[month].value += (l.estimatedValue || 0);
    } else {
      monthlyData[month] = { count: 1, value: (l.estimatedValue || 0) };
    }
  });

  const timelineChart = Object.entries(monthlyData).map(([month, data]) => ({
    name: month,
    month: month,
    leads: data.count,
    revenue: data.value,
    value: data.value
  }));

  return {
    totalValue,
    activeCount,
    wonCount: wonLeads.length,
    conversionRate: winRate,
    winRate,
    wonValue,
    averageValue,
    totalLeads: leads.length,
    projectTypesChart,
    statusChart,
    regionChart,
    timelineChart,
    monthlyTrends: timelineChart
  };
};

export interface SiteSettings {
  alertEmail: string;
  officePhone: string;
  emailAlert: boolean;
  maintenanceMode: boolean;
  weekdays: string;
  saturdays: string;
  sundays: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  alertEmail: "allen@upfrontac.com",
  officePhone: "(713) 819-7908",
  emailAlert: true,
  maintenanceMode: false,
  weekdays: "9:00 AM - 6:30 PM",
  saturdays: "9:00 AM - 6:30 PM",
  sundays: "24/7 Emergency Dispatch"
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const data = await apiCall<SiteSettings>("/api/settings?t=" + Date.now(), "GET");
    if (data && typeof data === "object") {
      const merged: SiteSettings = {
        alertEmail: data.alertEmail || DEFAULT_SITE_SETTINGS.alertEmail,
        officePhone: data.officePhone || DEFAULT_SITE_SETTINGS.officePhone,
        emailAlert: data.emailAlert !== undefined ? Boolean(data.emailAlert) : true,
        maintenanceMode: data.maintenanceMode !== undefined ? Boolean(data.maintenanceMode) : false,
        weekdays: data.weekdays || DEFAULT_SITE_SETTINGS.weekdays,
        saturdays: data.saturdays || DEFAULT_SITE_SETTINGS.saturdays,
        sundays: data.sundays || DEFAULT_SITE_SETTINGS.sundays
      };
      setStorageItem("upfront_site_settings_v2", merged);
      return merged;
    }
  } catch (err) {
    console.warn("MongoDB/API offline, reading local storage site settings:", err);
  }

  const stored = getStorageItem<SiteSettings>("upfront_site_settings_v2", DEFAULT_SITE_SETTINGS);
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...stored
  };
};

export const saveSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  try {
    const saved = await apiCall<SiteSettings>("/api/settings", "POST", settings);
    if (saved) {
      setStorageItem("upfront_site_settings_v2", saved);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("upfront-settings-updated", { detail: saved }));
      }
      return saved;
    }
  } catch (err) {
    console.warn("MongoDB offline, saving to local storage settings:", err);
  }

  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings
  };
  setStorageItem("upfront_site_settings_v2", updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("upfront-settings-updated", { detail: updated }));
  }
  return updated;
};

// ── NOTIFICATIONS ──
export interface DashboardNotification {
  id: string;
  type: "chat_start" | "chat_message" | "form_submission";
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
  metadata?: any;
}

export const getNotifications = async (): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "GET");
  } catch (err) {
    console.warn("Error getting notifications:", err);
    return [];
  }
};

export const markNotificationRead = async (id: string): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "POST", { action: "read", id });
  } catch (err) {
    console.warn("Error marking notification read:", err);
    return [];
  }
};

export const markAllNotificationsRead = async (): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "POST", { action: "read-all" });
  } catch (err) {
    console.warn("Error marking all read:", err);
    return [];
  }
};

export const clearAllNotifications = async (): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "POST", { action: "clear-all" });
  } catch (err) {
    console.warn("Error clearing notifications:", err);
    return [];
  }
};

