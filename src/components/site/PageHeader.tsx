import heroVideo from "@/assets/herovideo.mp4";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F172A] pt-28 sm:pt-32 pb-20 sm:pb-24 text-white">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <AutoPlayVideo
          src={heroVideo}
          className="h-full w-full object-cover opacity-85 pointer-events-none transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/45 to-[#0F172A]/85" />
      </div>

      {/* Glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#005CE6]/15 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-red-400 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-[38px] sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white leading-relaxed font-semibold">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
