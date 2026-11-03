import { useEffect, useState } from "react";
import { PhoneCall, FileText, Calendar, DollarSign, Globe, Sparkles, RefreshCw, Mail } from "lucide-react";

interface ConversionSummary {
  total: number;
  byType: Record<string, number>;
  byChannel: Record<string, number>;
  byPath: Record<string, number>;
  recent: Array<{
    eventType: string;
    channel: string;
    path: string;
    label: string;
    createdAt: string;
  }>;
}

export function SeoConversionMonitorCard() {
  const [data, setData] = useState<ConversionSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConversions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/conversions");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Ignore network errors in offline preview
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversions();
  }, []);

  const phoneClicks = data?.byType?.phone_click ?? 0;
  const estimates = data?.byType?.estimate_submit ?? 0;
  const bookings = data?.byType?.booking_submit ?? 0;
  const financing = data?.byType?.financing_click ?? 0;
  const emailClicks = data?.byType?.email_click ?? 0;

  const googleVisits = data?.byChannel?.google ?? 0;
  const chatgptVisits = (data?.byChannel?.chatgpt ?? 0) + (data?.byChannel?.other_ai ?? 0);
  const bingVisits = data?.byChannel?.bing ?? 0;
  const directVisits = data?.byChannel?.direct ?? 0;

  const topPaths = Object.entries(data?.byPath ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#005CE6] bg-[#005CE6]/10 px-2.5 py-1 rounded-full mb-1.5">
            <Globe className="w-3 h-3" />
            <span>SEO & AI Search Attribution Telemetry</span>
          </div>
          <h3 className="text-base font-black text-slate-900">
            Website Conversion & Search Channel Monitor
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Tracks click-to-call taps, free estimate requests, financing applications, and Google vs. ChatGPT Search referrals.
          </p>
        </div>
        <button
          onClick={fetchConversions}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Conversion Event Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-5">
        <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Phone Clicks</span>
            <PhoneCall className="w-4 h-4 text-[#005CE6]" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{phoneClicks}</div>
          <span className="text-[10px] font-semibold text-slate-500">Header, sticky bar & page CTAs</span>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Estimate Forms</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{estimates}</div>
          <span className="text-[10px] font-semibold text-slate-500">Free estimate submissions</span>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Service Bookings</span>
            <Calendar className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{bookings}</div>
          <span className="text-[10px] font-semibold text-slate-500">Contact & dispatch forms</span>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Financing Clicks</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{financing}</div>
          <span className="text-[10px] font-semibold text-slate-500">Synchrony, Microf, JBFin, Acorn</span>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Email Clicks</span>
            <Mail className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{emailClicks}</div>
          <span className="text-[10px] font-semibold text-slate-500">Direct mailto: interactions</span>
        </div>
      </div>

      {/* Channel Attribution & Top Landing Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 pt-5 border-t border-slate-100">
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Traffic Source Attribution
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl bg-blue-50/70 border border-blue-200/70 p-3">
              <span className="text-[10px] font-black uppercase text-[#005CE6] block">Google Search</span>
              <span className="text-lg font-black text-slate-900 mt-0.5 block">{googleVisits}</span>
            </div>
            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/70 p-3">
              <span className="text-[10px] font-black uppercase text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> ChatGPT / AI
              </span>
              <span className="text-lg font-black text-slate-900 mt-0.5 block">{chatgptVisits}</span>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
              <span className="text-[10px] font-black uppercase text-slate-600 block">Bing Search</span>
              <span className="text-lg font-black text-slate-900 mt-0.5 block">{bingVisits}</span>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
              <span className="text-[10px] font-black uppercase text-slate-600 block">Direct / Local</span>
              <span className="text-lg font-black text-slate-900 mt-0.5 block">{directVisits}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Top Converting Pages
          </h4>
          {topPaths.length === 0 ? (
            <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 border border-slate-200/70">
              Conversion events will appear here as visitors click phone numbers, submit estimate forms, or arrive from Google & ChatGPT Search.
            </p>
          ) : (
            <div className="space-y-1.5">
              {topPaths.map(([path, count]) => (
                <div
                  key={path}
                  className="flex items-center justify-between text-xs bg-slate-50 rounded-xl px-3 py-2 border border-slate-200/60"
                >
                  <span className="font-bold text-slate-800 truncate">{path}</span>
                  <span className="font-black text-[#005CE6] ml-2">{count} events</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

