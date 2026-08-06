import { useRef } from "react";
import { Star, CheckCircle2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface Review {
  text: string;
  name: string;
  role: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ review, isGrid = false }: { review: Review; isGrid?: boolean }) {
  return (
    <div className={cn(
      "relative bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col justify-between gap-4 group hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)] hover:border-[#005CE6]/30 transition-all duration-300 text-left select-none",
      isGrid ? "w-full" : "flex-shrink-0 w-[340px] sm:w-[380px] mx-3"
    )}>
      <div className="space-y-3">
        {/* Top Header: Rating & Verified Google Badge */}
        <div className="flex items-center justify-between gap-2">
          <StarRating count={review.rating} />
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 border border-slate-200">
            <GoogleIcon className="w-3 h-3" />
            <span>Google Verified</span>
          </div>
        </div>

        {/* Review Content */}
        <p className="text-slate-700 text-sm leading-relaxed font-medium pt-1">
          "{review.text}"
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-slate-900 font-extrabold text-sm leading-tight truncate">
              {review.name}
            </p>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#005CE6] shrink-0" />
          </div>
          <p className="text-slate-400 text-xs mt-0.5 font-medium truncate">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: Review[];
  direction?: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const duplicated = [...items, ...items, ...items];

  const animClass =
    direction === "left" ? "marquee-track-left" : "marquee-track-right";

  return (
    <div
      className="overflow-hidden relative group/row py-1"
      onMouseEnter={() => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = "paused";
        }
      }}
      onMouseLeave={() => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = "running";
        }
      }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#F8FAFC] to-transparent" />

      <div ref={trackRef} className={`flex ${animClass}`}>
        {duplicated.map((review, i) => (
          <TestimonialCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ isGrid = false }: { isGrid?: boolean }) {
  const { t } = useLanguage();

  const googleReviews: Review[] = [
    {
      name: "Lorraine Penczak",
      role: "5 reviews · 3 months ago",
      text: "I had a great experience with Allen from Upfront AC. He let me know when he was on his way, and he showed up as promised. He was helpful in answering questions, and his prices were reasonable. Would highly recommend him.",
      rating: 5,
      initials: "LP",
      avatarColor: "#1D4ED8",
    },
    {
      name: "Robert L Watts Jr",
      role: "6 reviews · 4 months ago",
      text: "Allen is my neighbor for many years and saw A/C company at house and came over to ask a few questions. I explain to him what they said and he just told me the honest truth about my A/C unit. The company was basically trying to sell me a new unit when the issue was something much smaller.",
      rating: 5,
      initials: "RW",
      avatarColor: "#7C3AED",
    },
    {
      name: "Josh Juarez",
      role: "9 reviews · 2 months ago",
      text: "I’ve had a couple interactions with Upfront AC and both times they have helped us tremendously! Their team is quick to respond, makes it really easy to understand what’s going on. I truly appreciate the help and services from these guys with fixing my problems!",
      rating: 5,
      initials: "JJ",
      avatarColor: "#065F46",
    },
    {
      name: "Melody Rymer",
      role: "2 reviews · 3 months ago",
      text: "Allen and his son were quick and thorough! They were professional, prompt, efficient, and reasonably priced for the maintenance / repair work completed. Thank you Allen and Damian!",
      rating: 5,
      initials: "MR",
      avatarColor: "#B45309",
    },
    {
      name: "Deion Weaver",
      role: "1 review · 2 months ago",
      text: "Stephen fixed my system and was able to prolong the life of my unit for me, when other companies said it needed to be replaced. I recommend this company if you want honest work done.",
      rating: 5,
      initials: "DW",
      avatarColor: "#BE185D",
    },
    {
      name: "Henrik T Andersen",
      role: "3 reviews · 2 months ago",
      text: "Honest, Decent and Affordable HVAC guys. Not trying to upsell you things you don’t need.",
      rating: 5,
      initials: "HA",
      avatarColor: "#0F766E",
    },
    {
      name: "Joy Daniels",
      role: "Local Guide · 15 reviews · 11 months ago",
      text: "Friendly, professional and very helpful. Had a few questions about my new unit and was a bit concerned. He assured me I have a very good system, and it has proven to be very efficient. Good utility bills through July and August.",
      rating: 5,
      initials: "JD",
      avatarColor: "#9333EA",
    },
    {
      name: "Chris Watson",
      role: "Local Guide · 22 reviews · 4 months ago",
      text: "Very knowledgeable, gave fair upfront pricing, and was very prompt and professional. I highly recommend using him.",
      rating: 5,
      initials: "CW",
      avatarColor: "#DC2626",
    },
    {
      name: "Lance Vincent",
      role: "2 reviews · 9 months ago",
      text: "Very knowledgeable & gave upfront pricing. No surprises. Explained recommendations for upgrades to the builder grade materials on my 20yr old system. New AC is great & cleanliness is a plus.",
      rating: 5,
      initials: "LV",
      avatarColor: "#2563EB",
    },
    {
      name: "Crystal Monariti",
      role: "1 review · a year ago",
      text: "Allen has been our service tech for many moons. He has always been reliable, fair, upfront, and honest. He communicates well, does extremely solid work and super friendly. Its hard to find someone who treats you like family and does such amazing work. I will recommend him to anyone.",
      rating: 5,
      initials: "CM",
      avatarColor: "#059669",
    },
    {
      name: "Priscilla Garcia",
      role: "Local Guide · 35 reviews · 11 months ago",
      text: "I have been reaching out to Allen for years, almost a decade and he has never let me down. Even after the warranty company sends someone and the techs do not find anything - I reach out to Allen and he will find the issue. Very honest and flexible.",
      rating: 5,
      initials: "PG",
      avatarColor: "#D97706",
    },
    {
      name: "Evan Visser",
      role: "4 reviews · a year ago",
      text: "Upfront AC was just supposed to do a routine maintenance for me, but they ended up saving me when my unit broke down over the holiday. Allen was very responsive and honest, getting me parts and service at the last minute.",
      rating: 5,
      initials: "EV",
      avatarColor: "#4F46E5",
    },
    {
      name: "John Atwood",
      role: "3 reviews · 2 months ago",
      text: "Prompt, on time and work completed as planned. Very good group to work with.",
      rating: 5,
      initials: "JA",
      avatarColor: "#0891B2",
    },
    {
      name: "Letha Gaines",
      role: "3 reviews · a year ago",
      text: "I had a great experience with Allen at Upfront A/C and just had to share. It's rare to find a contractor who's not only skilled but also truly honest. He came out, diagnosed the issue quickly, and fixed it right away.",
      rating: 5,
      initials: "LG",
      avatarColor: "#C026D3",
    },
    {
      name: "M.A. Williams",
      role: "5 reviews · 11 months ago",
      text: "Allen responded quickly to our urgent a/c problem and was very professional and respectful of our property. His shoes came off as soon as he stepped inside. Outstanding service.",
      rating: 5,
      initials: "MW",
      avatarColor: "#E11D48",
    },
    {
      name: "Sybil Ellis",
      role: "4 reviews · a year ago",
      text: "We have been using Allen Swindell for our Ac/Heating service/repairs for years now. He installed a new unit in our home a couple years ago and we couldn’t be happier with his work. He is very honest, respectful, and reliable.",
      rating: 5,
      initials: "SE",
      avatarColor: "#0284C7",
    },
    {
      name: "Eric M",
      role: "9 reviews · a year ago",
      text: "I have been using Allen for a couple of years now on all my A/C work at my house. Always on time and very honest and family owned. He takes pride in his work and I know I’m always getting high quality work from Allen.",
      rating: 5,
      initials: "EM",
      avatarColor: "#16A34A",
    },
    {
      name: "Brooke Davis",
      role: "6 reviews · 2 months ago",
      text: "Amazing service!!! Would definitely recommend!",
      rating: 5,
      initials: "BD",
      avatarColor: "#9333EA",
    },
    {
      name: "Kristee Ochiltree",
      role: "5 reviews · a year ago",
      text: "When it comes to this company….they conduct business with absolute integrity. They act with urgency making you feel like a priority. You can tell he is motivated and takes great pride in what service he provides to the community.",
      rating: 5,
      initials: "KO",
      avatarColor: "#EA580C",
    },
    {
      name: "Je'Marcus Jackson",
      role: "3 reviews · a year ago",
      text: "I would refer anyone to Upfront AC! Allen exhibited what you would want from any service provider: patience, honesty, and care. He took his time on a Friday evening to walk me through a repair on my HVAC system via phone.",
      rating: 5,
      initials: "JJ",
      avatarColor: "#2563EB",
    },
    {
      name: "Hector Gonzalez",
      role: "14 reviews · a year ago",
      text: "Reasonable price. Allen with Upfront came over today and took care of my issue while talking us through it. It wasn’t an easy find so I appreciated his attention and educating me in the process.",
      rating: 5,
      initials: "HG",
      avatarColor: "#059669",
    },
    {
      name: "Rachel Hannes",
      role: "1 review · a year ago",
      text: "If you want someone who is honest, hardworking and reliable you are looking in the right place with Allen! He always does his best to be a good person you can trust. Definitely recommend!",
      rating: 5,
      initials: "RH",
      avatarColor: "#7C3AED",
    },
    {
      name: "David Grench",
      role: "4 reviews · 11 months ago",
      text: "These guys ROCK! Our AC went out a few weeks ago and Alex got us up and running in no time. He cleared a clogged drain line that was backing up and triggering the float switch, and even went ahead and cleaned the machine up.",
      rating: 5,
      initials: "DG",
      avatarColor: "#D97706",
    },
    {
      name: "J&S",
      role: "1 review · 10 months ago",
      text: "If you ever need a true local A/C guy Alan is your guy. He came out after hours to just diagnose the problem. Unfortunately we needed a new A/C so not a quick fix. Still next morning a new A/C was installed seamlessly.",
      rating: 5,
      initials: "JS",
      avatarColor: "#0F766E",
    },
    {
      name: "Jennifer Andjelich",
      role: "Local Guide · 18 reviews · a year ago",
      text: "Always happy with the honest and fast service and support. Alan finds the problem and fixes it. Doesn’t just bandaid the symptoms. Truly appreciative of all the help he has provided.",
      rating: 5,
      initials: "JA",
      avatarColor: "#BE185D",
    },
    {
      name: "Marlon A Lara",
      role: "6 reviews · 2 months ago",
      text: "Outstanding service, knowledgeable, and integrity. Allen went above and beyond.",
      rating: 5,
      initials: "ML",
      avatarColor: "#1D4ED8",
    },
    {
      name: "Henry Mcgowen",
      role: "9 reviews · a year ago",
      text: "Upfront A/C came out to inspect and tune up my 2 A/C's. The young Man that came out was outstanding. He spent hours in my attic cleaning my Blowers, even with the temp 90 or above.",
      rating: 5,
      initials: "HM",
      avatarColor: "#16A34A",
    },
    {
      name: "Rebecca Williams",
      role: "4 reviews · a year ago",
      text: "Great customer service...very impressed with Allen and Upfront AC. Very knowledgeable and trustworthy. Will be using again! If you need any A/C work done give him try!",
      rating: 5,
      initials: "RW",
      avatarColor: "#9333EA",
    },
    {
      name: "Celise Keller",
      role: "4 reviews · a year ago",
      text: "Allen and his crew did a fast, thorough, and efficient job on my AC! I would trust them to help all my friends and family! Highly recommended! Thank you Upfront AC :)",
      rating: 5,
      initials: "CK",
      avatarColor: "#0891B2",
    },
    {
      name: "Heather Smith",
      role: "Local Guide · 18 reviews · 10 months ago",
      text: "Excellent service, thorough, provides pictures of what is actually wrong versus just telling you. Doesn’t try to find things to charge you for but instead they try to save you money. Highly recommend.",
      rating: 5,
      initials: "HS",
      avatarColor: "#EA580C",
    },
    {
      name: "Jean-Paul Cardoso",
      role: "4 reviews · 8 months ago",
      text: "Fit us into schedule and got the ac back up and running. Charged what was estimated. Will always call these guys when need hvac work done.",
      rating: 5,
      initials: "JC",
      avatarColor: "#2563EB",
    },
    {
      name: "Nicole Walters (KatyTXRealtor)",
      role: "Local Guide · 19 reviews · a year ago",
      text: "Allen has always been quick to respond, very knowledgable about all things HVAC and I have used him for our personal home and referred him to many clients. Highly recommend.",
      rating: 5,
      initials: "NW",
      avatarColor: "#059669",
    },
    {
      name: "Josh Bass",
      role: "Local Guide · 13 reviews · 11 months ago",
      text: "These guys have a lot of knowledge in the AC world. Went out of their way to come to my home and evaluate my situation to provide useful feedback. Thank you guys so much!!",
      rating: 5,
      initials: "JB",
      avatarColor: "#4F46E5",
    },
    {
      name: "Tonna Biehle",
      role: "10 reviews · 10 months ago",
      text: "Professional & quick would definitely use again & recommend.",
      rating: 5,
      initials: "TB",
      avatarColor: "#7C3AED",
    },
    {
      name: "Duane Ellis",
      role: "1 review · 8 months ago",
      text: "The best company you can contact for your ac needs. Reliable and honest and always on time.",
      rating: 5,
      initials: "DE",
      avatarColor: "#16A34A",
    },
    {
      name: "BEATRIZ RAMIREZ",
      role: "3 reviews · a year ago",
      text: "Great company! Allen explained everything in detail and was honest. Will definitely use him in the future.",
      rating: 5,
      initials: "BR",
      avatarColor: "#D97706",
    },
    {
      name: "Nicole Price",
      role: "1 review · 2 months ago",
      text: "He was a nice guy.",
      rating: 5,
      initials: "NP",
      avatarColor: "#0284C7",
    },
    {
      name: "Treveon Green-Trent",
      role: "4 reviews · 2 months ago",
      text: "I was hot for days he really saved me.",
      rating: 5,
      initials: "TG",
      avatarColor: "#C026D3",
    },
    {
      name: "Tracey Gaines",
      role: "3 reviews · 3 months ago",
      text: "Scott is the best in the business!",
      rating: 5,
      initials: "TG",
      avatarColor: "#0F766E",
    },
    {
      name: "Kristie Lazor",
      role: "6 reviews · a year ago",
      text: "This company is thorough in what they do. They are very nice and great customers service. They go over and above service.",
      rating: 5,
      initials: "KL",
      avatarColor: "#E11D48",
    },
    {
      name: "Drayton Weaver",
      role: "6 reviews · 8 months ago",
      text: "On time and very direct, would recommend Upfront AC when in need of any HVAC repairs or service.",
      rating: 5,
      initials: "DW",
      avatarColor: "#2563EB",
    },
    {
      name: "Blanca Brito",
      role: "Local Guide · 43 reviews · a year ago",
      text: "Excellent services, very responsable and committed, punctual and also very fair prices. I recommended.",
      rating: 5,
      initials: "BB",
      avatarColor: "#059669",
    },
    {
      name: "Ginger Shunka",
      role: "5 reviews · a year ago",
      text: "Outstanding service! Highly responsible, punctual with very fair pricing.",
      rating: 5,
      initials: "GS",
      avatarColor: "#7C3AED",
    },
    {
      name: "Linda McRae",
      role: "Local Guide · 18 reviews · 8 months ago",
      text: "Knowledgeable, checked everything to ensure safety, individual service.",
      rating: 5,
      initials: "LM",
      avatarColor: "#4F46E5",
    },
    {
      name: "Koteswara Rao",
      role: "Local Guide · 22 reviews · 11 months ago",
      text: "Great job. Highly Professional.",
      rating: 5,
      initials: "KR",
      avatarColor: "#0891B2",
    },
    {
      name: "Taylor Becerra",
      role: "4 reviews · a year ago",
      text: "Great experience with Upfront AC, would recommend.",
      rating: 5,
      initials: "TB",
      avatarColor: "#9333EA",
    },
    {
      name: "Andrew Robinson",
      role: "5 reviews · 3 days ago",
      text: "If you need AC help in Houston, stop looking and just call UPFRONT AIR CONDITIONING. The owner, Allen, and his helper, Stephen, came out to my house and they were absolutely incredible.",
      rating: 5,
      initials: "AR",
      avatarColor: "#EA580C",
    },
    {
      name: "Lesley M.",
      role: "2 reviews · 3 days ago",
      text: "Allen and Stephen from Upfront AC were nothing short of amazing. They were prompt, professional, and thorough in their work. No upsells, just honest work with a fair price.",
      rating: 5,
      initials: "LM",
      avatarColor: "#2563EB",
    },
    {
      name: "Review4ALL Truth2020",
      role: "8 reviews · 3 weeks ago",
      text: "Great Service and fair price. Great work customer service and very professional.",
      rating: 5,
      initials: "RT",
      avatarColor: "#059669",
    },
    {
      name: "Brooke Young",
      role: "2 reviews · a month ago",
      text: "This was an amazing experience working with Damien. He did what he said, and pointed me in the right direction.",
      rating: 5,
      initials: "BY",
      avatarColor: "#7C3AED",
    },
    {
      name: "James Rogers",
      role: "3 reviews · 2 months ago",
      text: "1st time using Allen and UP Front but wont be the last! Service is top notch. No hidden fees. Paid exactly what was quoted. He went above and beyond.",
      rating: 5,
      initials: "JR",
      avatarColor: "#1D4ED8",
    },
  ];

  const row1 = googleReviews.slice(0, Math.ceil(googleReviews.length / 2));
  const row2 = googleReviews.slice(Math.ceil(googleReviews.length / 2));

  return (
    <section
      id="reviews"
      className="relative py-16 lg:py-20 bg-[#F8FAFC] overflow-hidden select-none"
    >
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-cyan-200/30 blur-[100px]" />

      {/* Section Header */}
      <div className="mx-auto w-[90%] max-w-7xl text-center mb-12 relative z-10">
        
        {/* Top Google Verified Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 rounded-full px-4 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-widest mb-4 shadow-sm">
          <GoogleIcon className="w-4 h-4" />
          <span>{t("All Reviews Verified on Google", "Todas las Reseñas Verificadas en Google")}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          {t("Trusted by ", "Con la confianza de ")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-500">
            {t("Hundreds of Homeowners", "Cientos de Clientes")}
          </span>{" "}
          {t("in Houston, TX", "en Houston, TX")}
        </h2>

        <p className="mx-auto max-w-2xl text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
          {t(
            "100% verified 5-star Google reviews. Real experiences from real homeowners across Houston and surrounding suburbs. See why homeowners trust Upfront AC every time.",
            "Reseñas de Google de 5 estrellas 100% verificadas. Experiencias reales de propietarios en Houston y suburbios cercanos."
          )}
        </p>

        {/* Leave a Review / View Google Reviews Link */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.google.com/search?q=Upfront+AC+Houston+TX+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-white border border-slate-300 hover:border-[#005CE6] px-6 py-3 text-xs font-extrabold text-slate-800 uppercase tracking-widest shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>{t("Leave a Review on Google", "Dejar una Reseña en Google")}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Grid or Marquee View */}
      {isGrid ? (
        <div className="mx-auto w-[90%] max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {googleReviews.map((review, idx) => (
            <TestimonialCard key={idx} review={review} isGrid={true} />
          ))}
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-6">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          animation: marquee-left 130s linear infinite;
          width: max-content;
        }
        .marquee-track-right {
          animation: marquee-right 130s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
