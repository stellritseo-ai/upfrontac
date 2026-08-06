import heroVideo from "@/assets/herovideo.mp4";

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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-[#0F172A]/80 to-[#0F172A]" />
      </div>

      {/* Glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#005CE6]/15 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#005CE6] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005CE6] animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-[38px] sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/65 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
