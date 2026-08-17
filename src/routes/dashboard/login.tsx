import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  PhoneCall,
  Flame,
  Snowflake,
  Server,
  Cloud,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Activity,
  Award,
  Layers,
  Sparkles,
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import { loginAdmin, verifyAdminToken } from "@/lib/leads-store";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard/login")({
  head: () => ({
    meta: [
      { title: "Upfront A/C & Heating — Business Command Portal" },
      {
        name: "description",
        content: "Secure executive portal for Upfront A/C & Heating management, dispatch, leads, reviews, and media."
      }
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  // Check if already authenticated on mount
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("electrical-session-token");
      if (token) {
        try {
          const res = await verifyAdminToken(token);
          if (res.valid) {
            navigate({ to: "/dashboard" });
            return;
          }
        } catch (e) {
          console.error("Auto-auth check failed:", e);
        }
      }
      setCheckingSession(false);
    };
    checkToken();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await loginAdmin(username, password);
      if (res.success && res.token) {
        toast.success("Welcome back! Authenticated successfully.");
        navigate({ to: "/dashboard" });
      } else {
        setErrorMsg("Authentication failed. Please verify your credentials.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMsg(err.message || "Invalid username or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#060B18] flex flex-col items-center justify-center text-white font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,92,230,0.15),transparent_70%)] pointer-events-none" />
        <div className="relative flex flex-col items-center gap-4 z-10">
          <div className="relative">
            <div className="h-14 w-14 rounded-full border-3 border-[#005CE6]/30 border-t-[#005CE6] border-r-cyan-400 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-white tracking-wider uppercase">Authenticating Portal</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Verifying encrypted security token...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B17] text-white flex flex-col justify-between relative overflow-x-hidden selection:bg-[#005CE6] selection:text-white">
      {/* Background Decorative Lighting & High-Tech Mesh */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-[#005CE6]/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[170px]" />
        
        {/* Subtle HVAC Grid Matrix */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2 flex items-center justify-between relative z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all duration-200 backdrop-blur-md group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Main Website</span>
        </Link>

        <a
          href="tel:+17138197908"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005CE6]/10 hover:bg-[#005CE6]/20 border border-[#005CE6]/30 text-xs font-bold text-cyan-300 transition-all duration-200 backdrop-blur-md"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#005CE6]" />
          <span>24/7 Dispatch: (713) 819-7908</span>
        </a>
      </header>

      {/* Main Two-Column Layout */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 flex items-center relative z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT SIDE: BRANDING, VALUE PROPOSITION & SYSTEM METRICS ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          >
            {/* Brand Logo & Verification Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#005CE6] to-cyan-400 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-white rounded-2xl p-2.5 shadow-xl flex items-center justify-center border border-white/20">
                  <img
                    src={logo}
                    alt="Upfront Air Conditioning & Heating Logo"
                    className="h-10 sm:h-12 w-auto object-contain select-none"
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#005CE6]/15 border border-[#005CE6]/30 text-[10px] sm:text-xs font-black uppercase tracking-wider text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Executive Operations · TACLA #121344E</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Upfront HVAC <br />
                <span className="bg-gradient-to-r from-white via-cyan-200 to-[#005CE6] bg-clip-text text-transparent">
                  Command & Dispatch
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-normal mt-3.5 max-w-xl leading-relaxed">
                Centralized management hub for real-time customer repair requests, live dispatch coordination, verified reviews, project gallery showcases, and website settings across Greater Houston.
              </p>
            </div>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-start gap-3 hover:border-cyan-400/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#005CE6]/20 border border-[#005CE6]/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Instant Lead Routing</h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                    Live capture for AC repair, heat maintenance, and emergency calls.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-start gap-3 hover:border-cyan-400/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Operations Analytics</h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                    Conversion tracking, revenue metrics, and technician job logs.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-start gap-3 hover:border-cyan-400/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Encrypted Sync</h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                    MongoDB Atlas high-availability cluster with end-to-end TLS.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-start gap-3 hover:border-cyan-400/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Media Cloud</h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                    Direct Cloudinary asset CDN for before/after installation photos.
                  </p>
                </div>
              </div>
            </div>

            {/* Status Capsule & Coverage */}
            <div className="p-3.5 rounded-2xl bg-[#0B1528]/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Cypress, Tomball, Spring, Katy & Greater Houston Metro</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider">System Live</span>
              </div>
            </div>
          </motion.div>


          {/* ── RIGHT SIDE: THE LOGIN FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* Main Glassmorphic Portal Card */}
            <div className="relative rounded-3xl bg-[#0B1528]/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_80px_-15px_rgba(0,92,230,0.35)] p-7 sm:p-9 overflow-hidden">
              
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#005CE6] via-cyan-400 to-[#005CE6]" />

              {/* Form Card Header */}
              <div className="text-left mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-cyan-400 mb-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Authentication</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Sign In
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Access your dispatch console and lead records.
                </p>
              </div>

              {/* Error Notification Alert */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mb-5"
                  >
                    <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-left">
                      <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-xs font-semibold text-rose-300 leading-relaxed">
                        {errorMsg}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Username</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full bg-[#0E1B33]/80 border border-white/10 group-hover:border-white/20 rounded-2xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:bg-[#10203D] focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Password</span>
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#0E1B33]/80 border border-white/10 group-hover:border-white/20 rounded-2xl py-3.5 pl-11 pr-11 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:bg-[#10203D] focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 tracking-wider"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-cyan-300 focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#005CE6] via-[#0066FF] to-[#0052CC] hover:from-[#0066FF] hover:to-[#0047B3] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider py-4 shadow-xl shadow-[#005CE6]/30 hover:shadow-[#005CE6]/50 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none mt-5"
                >
                  {/* Button shine reflection */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <>
                      <span>Enter Business Console</span>
                      <ArrowRight className="h-4 w-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Guarantee Badges */}
              <div className="mt-7 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] font-bold text-slate-300">256-Bit SSL</span>
                  <span className="text-[8px] text-slate-500 font-medium">Encrypted</span>
                </div>

                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span className="text-[9px] font-bold text-slate-300">MongoDB Atlas</span>
                  <span className="text-[8px] text-slate-500 font-medium">Sync Ready</span>
                </div>

                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <Cloud className="w-4 h-4 text-[#005CE6]" />
                  <span className="text-[9px] font-bold text-slate-300">Cloudinary</span>
                  <span className="text-[8px] text-slate-500 font-medium">Media Active</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer Details */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-6 text-center relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[10px] text-slate-500 font-medium tracking-wide">
          <span>© {new Date().getFullYear()} Upfront Air Conditioning & Heating Inc.</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>TACLA #121344E Regulated by TDLR</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="text-slate-400 font-semibold">Strict Confidentiality Enforced</span>
        </div>
      </footer>
    </div>
  );
}
