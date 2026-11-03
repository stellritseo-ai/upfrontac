import logo1 from "@/assets/logos/1.png";
import logo2 from "@/assets/logos/2.png";
import logo3 from "@/assets/logos/3.png";
import logo4 from "@/assets/logos/4.png";
import logo5 from "@/assets/logos/5.png";
import logo6 from "@/assets/logos/6.png";
import logo7 from "@/assets/logos/7.png";

const logos = [
  { src: logo1, name: "Goodman" },
  { src: logo2, name: "York" },
  { src: logo3, name: "Coleman" },
  { src: logo4, name: "Carrier" },
  { src: logo5, name: "Bryant" },
  { src: logo6, name: "Ruud" },
  { src: logo7, name: "Lennox" },
];

export function TrustBar() {
  // Quadruple the list of logos to guarantee it spans wider than any viewport width
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="border-y border-gray-100 bg-white py-5 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-6">
          Brand We Carry
        </p>

        {/* Marquee Slider Container */}
        <div className="relative flex overflow-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
          <div className="flex gap-16 items-center animate-marquee hover-pause w-max">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-12 w-28 shrink-0"
                aria-hidden={index >= logos.length ? true : undefined}
              >
                <img
                  src={logo.src}
                  // Only the first set is announced to screen readers / crawlers; copies exist for the marquee loop.
                  alt={index < logos.length ? `${logo.name} HVAC equipment brand logo` : ""}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
