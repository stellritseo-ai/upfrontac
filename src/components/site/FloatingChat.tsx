import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Phone, Calendar, CheckCircle2, Lock, RotateCcw, User, Mail, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createChatSession, sendChatMessage, getChatSessionById, dedupeChatMessages, ChatMessage } from "@/lib/leads-store";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { toast } from "sonner";
import logoImg from "@/assets/logo.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function FloatingChat() {
  const { settings, phoneTel } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const socketRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Play audio chime when admin replies
  const playChime = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {}
  }, []);

  // 1. Retrieve localStorage session on mount
  useEffect(() => {
    const storedId = localStorage.getItem("upfront-chat-session-id");
    const storedName = localStorage.getItem("upfront-chat-client-name");
    const storedEmail = localStorage.getItem("upfront-chat-client-email");
    const storedPhone = localStorage.getItem("upfront-chat-client-phone");
    if (storedId) {
      setSessionId(storedId);
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);

      getChatSessionById(storedId).then((session) => {
        if (session) {
          if (session.isClosed || session.status === "closed") {
            setIsClosed(true);
          } else {
            setIsClosed(false);
          }
          if (Array.isArray(session.messages) && session.messages.length > 0) {
            setMessages((prev) => dedupeChatMessages([...prev, ...session.messages]));
          }
        }
      });
    }
  }, []);

  // 2. Real-time sync: Socket.IO on local dev, polling on Vercel
  useRealtimeSync({
    enabled: true,
    joinRoom: sessionId || undefined,
    pollInterval: 4000,
    onPoll: async () => {
      if (!sessionId) return;
      try {
        const session = await getChatSessionById(sessionId);
        if (session) {
          if (session.isClosed || session.status === "closed") {
            setIsClosed(true);
          }
          if (Array.isArray(session.messages) && session.messages.length > 0) {
            setMessages((prev) => dedupeChatMessages([...prev, ...session.messages]));
          }
        }
      } catch {
        // silent
      }
    },
    socketHandlers: {
      message: (msg: any) => {
        if (sessionId && msg.sessionId === sessionId) {
          setMessages((prev) => {
            const updated = dedupeChatMessages([...prev, msg]);
            if (updated.length > prev.length && msg.sender === "admin") playChime();
            return updated;
          });
        }
      },
      "new-chat-message": (msg: any) => {
        if (sessionId && msg.sessionId === sessionId) {
          setMessages((prev) => {
            const updated = dedupeChatMessages([...prev, msg]);
            if (updated.length > prev.length && msg.sender === "admin") playChime();
            return updated;
          });
        }
      },
      "session-status": (data: any) => {
        if (sessionId && data.sessionId === sessionId) {
          setIsClosed(Boolean(data.isClosed));
          if (data.isClosed) toast.info("This chat session has been marked resolved and closed by support.");
        }
      },
      "session-status-changed": (data: any) => {
        if (sessionId && data.sessionId === sessionId) {
          setIsClosed(Boolean(data.isClosed));
        }
      },
    },
  });

  // Custom DOM events (cross-tab)
  useEffect(() => {
    const handleCustomEvent = (e: any) => {
      if (e.detail && sessionId && (e.detail.id === sessionId || e.detail === sessionId)) {
        if (e.detail.isClosed !== undefined) setIsClosed(Boolean(e.detail.isClosed));
        if (Array.isArray(e.detail.messages) && e.detail.messages.length > 0) {
          setMessages((prev) => dedupeChatMessages([...prev, ...e.detail.messages]));
        }
      }
    };
    window.addEventListener("upfront-chats-updated", handleCustomEvent);
    return () => window.removeEventListener("upfront-chats-updated", handleCustomEvent);
  }, [sessionId]);

  // 3. Scroll to bottom dynamically
  const prevMsgCountRef = useRef<number>(0);
  useEffect(() => {
    const currentCount = messages.length;
    if (currentCount > prevMsgCountRef.current || isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMsgCountRef.current = currentCount;
  }, [messages.length, isOpen]);

  // 4. Start Chat Handler (Welcome card)
  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!trimmedMsg) {
      toast.error("Please describe how we can help you.");
      return;
    }

    setIsSubmitting(true);
    const msgId = "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);
    const time = new Date().toISOString();

    const optimisticMsg: ChatMessage = {
      id: msgId,
      sender: "client",
      text: trimmedMsg,
      timestamp: time
    };

    try {
      const session = await createChatSession(trimmedName, "Tomball, TX", trimmedEmail, trimmedPhone, trimmedMsg);
      const activeId = session.id;
      setSessionId(activeId);
      setName(trimmedName);
      setEmail(trimmedEmail);
      if (trimmedPhone) setPhone(trimmedPhone);
      setMessage("");
      setMessages([optimisticMsg]);

      localStorage.setItem("upfront-chat-session-id", activeId);
      localStorage.setItem("upfront-chat-client-name", trimmedName);
      localStorage.setItem("upfront-chat-client-email", trimmedEmail);
      if (trimmedPhone) localStorage.setItem("upfront-chat-client-phone", trimmedPhone);

      if (socketRef.current) {
        socketRef.current.emit("join-session", activeId);
        socketRef.current.emit("session-created", {
          sessionId: activeId,
          clientName: trimmedName,
          clientEmail: trimmedEmail,
          clientPhone: trimmedPhone,
          firstMessage: trimmedMsg
        });
        socketRef.current.emit("send-message", {
          ...optimisticMsg,
          sessionId: activeId,
          clientName: trimmedName
        });
      }
      toast.success("Chat connected! Our support team is reviewing your message.");
    } catch (err) {
      console.error("Failed to start chat session:", err);
      toast.error("Failed to start chat. Please try again or call our hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Subsequent Message Handler
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isClosed) {
      toast.error("This chat session has been closed. Please start a new chat.");
      return;
    }

    const textToSend = message.trim();
    if (!textToSend || !sessionId) return;

    const msgId = "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);
    const time = new Date().toISOString();

    const optimisticMsg: ChatMessage = {
      id: msgId,
      sender: "client",
      text: textToSend,
      timestamp: time
    };

    setMessage("");
    setMessages((prev) => dedupeChatMessages([...prev, optimisticMsg]));

    try {
      if (socketRef.current) {
        socketRef.current.emit("send-message", {
          ...optimisticMsg,
          sessionId,
          clientName: name
        });
      }
      await sendChatMessage(sessionId, "client", textToSend, msgId, time);
    } catch (err) {
      console.error("Failed to send chat message:", err);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem("upfront-chat-session-id");
    localStorage.removeItem("upfront-chat-client-name");
    localStorage.removeItem("upfront-chat-client-email");
    localStorage.removeItem("upfront-chat-client-phone");
    setSessionId(null);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setMessages([]);
    setIsClosed(false);
  };

  const quickPrompts = [
    "❄️ AC Not Cooling Properly",
    "🔥 Heating / Furnace Repair",
    "📋 Free System Replacement Estimate",
    "🛠️ 21-Point Maintenance Tune-Up"
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto mb-4 w-[min(400px,calc(100vw-32px))] h-[min(580px,calc(100vh-100px))] max-h-[580px] bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="shrink-0 bg-gradient-to-r from-[#005CE6] via-[#004BB8] to-[#00388A] p-4 text-white flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center select-none overflow-hidden p-1 border border-slate-100 shadow-sm">
                    <img src={logoImg} alt="Upfront AC Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#005CE6] animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-sm tracking-wide">Upfront AC Support</span>
                  <span className="text-[10px] text-cyan-200 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online · 24/7 Live Dispatch
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {sessionId && (
                  <button
                    onClick={handleClearChat}
                    title="Start Fresh Chat"
                    className="text-white/70 hover:text-white transition text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg cursor-pointer font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition p-1 hover:bg-white/10 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            {!sessionId ? (
              /* ── WELCOME & START CHAT SCREEN ── */
              <div className="flex-1 min-h-0 p-5 overflow-y-auto bg-gradient-to-b from-slate-50/70 to-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#005CE6] text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">Direct Technician Chat</p>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight">Enter your name & email to connect live with our Tomball & Cypress team.</p>
                    </div>
                  </div>

                  <form onSubmit={handleStartChat} id="start-chat-form" className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider text-left mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g., John Smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/15 focus:border-[#005CE6] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider text-left mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g., john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/15 focus:border-[#005CE6] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider text-left mb-1">
                        Phone Number <span className="text-slate-400 text-[10px] lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="e.g., (713) 555-0199"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/15 focus:border-[#005CE6] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider text-left mb-1">
                        How can we help? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Describe your AC or heating request..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005CE6]/15 focus:border-[#005CE6] transition resize-none"
                      />
                    </div>

                    {/* Quick Suggestion Pills */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left mb-1.5">Common Topics:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {quickPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => setMessage(prompt.replace(/^[^\s]+\s/, ""))}
                            className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-[#005CE6] hover:border-[#005CE6]/30 border border-slate-200/80 rounded-lg px-2 py-1 transition cursor-pointer text-slate-600"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#004BB8] hover:to-[#00388A] text-white rounded-xl text-xs font-bold tracking-wide uppercase shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Connecting..." : "Start Live Chat Now"}</span>
                    </button>
                  </form>
                </div>

                {/* Footer Call fallback */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Need urgent 24/7 help?</span>
                  <a
                    href={`tel:${phoneTel}`}
                    className="font-bold text-[#005CE6] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>(713) 819-7908</span>
                  </a>
                </div>
              </div>
            ) : (
              /* ── ACTIVE CONVERSATION SCREEN ── */
              <>
                <div className="flex-1 min-h-0 p-4 overflow-y-auto bg-slate-50/50 flex flex-col gap-3 overscroll-contain">
                  {/* Default Greeting */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center select-none shrink-0 overflow-hidden p-0.5 border border-slate-100 shadow-sm">
                      <img src={logoImg} alt="Upfront AC Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-sm text-left max-w-[85%]">
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                        Hi {name || "there"}! Thanks for connecting. An Upfront AC specialist is actively monitoring this chat. How can we assist with your HVAC today?
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Messages */}
                  {messages.map((msg) => {
                    const isAdmin = msg.sender === "admin";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 items-start ${isAdmin ? "" : "flex-row-reverse"}`}
                      >
                        {isAdmin ? (
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center select-none shrink-0 overflow-hidden p-0.5 border border-slate-100 shadow-sm">
                            <img src={logoImg} alt="Upfront AC Logo" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center select-none shrink-0 text-[10px] font-bold text-slate-700 capitalize shadow-sm">
                            {name.charAt(0) || "V"}
                          </div>
                        )}
                        <div
                          className={`rounded-2xl p-3 shadow-sm text-left max-w-[80%] border ${
                            isAdmin
                              ? "bg-white border-slate-100 text-slate-800 rounded-tl-none"
                              : "bg-[#005CE6] text-white border-[#005CE6] rounded-tr-none"
                          }`}
                        >
                          <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Form Actions in Active Chat */}
                <div className="shrink-0 px-4 pb-4 pt-2 border-t border-slate-100 bg-white flex flex-col gap-2">
                  {isClosed ? (
                    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 text-center space-y-2">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Chat Resolved & Closed</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                        This inquiry has been completed. If you have additional questions, start a new chat below.
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleClearChat}
                          className="px-3 py-2 bg-[#005CE6] hover:bg-[#0047B3] text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Start New Chat</span>
                        </button>
                        <a
                          href={`tel:${phoneTel}`}
                          className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-[#005CE6]" />
                          <span>Call Us</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSend} className="flex flex-col gap-2">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          required
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-3 pr-10 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#005CE6]/10 focus:border-[#005CE6] transition"
                        />
                        <button
                          type="submit"
                          disabled={!message.trim()}
                          className="absolute right-1.5 p-1.5 rounded-lg text-white bg-[#005CE6] hover:bg-[#0047B3] transition disabled:opacity-40 disabled:hover:bg-[#005CE6] cursor-pointer"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="pointer-events-auto relative h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-[#005CE6] to-[#0047B3] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none select-none cursor-pointer overflow-hidden p-0 border-0"
      >
        <span className="absolute inset-0 rounded-full bg-[#005CE6] opacity-35 animate-ping -z-10" />
        {isOpen ? (
          <X className="h-6 w-6 sm:h-7 sm:w-7" />
        ) : (
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-inner">
            <img src={logoImg} alt="Chat Logo" className="w-full h-full object-contain" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
