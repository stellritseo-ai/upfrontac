import { useState, useEffect, useMemo, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Briefcase,
  Users,
  DollarSign,
  MapPin,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Phone,
  Mail,
  Home,
  FileText,
  Settings,
  LogOut,
  MessageSquare,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  MessageCircle,
  User,
  ThumbsUp,
  Sliders,
  Bell,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  Info,
  Image as ImageIcon,
  Eye,
  EyeOff,
  X,
  Send,
  Upload,
  ChevronDown,
  Globe,
  Layers,
  Play,
  CheckSquare,
  Check,
  ExternalLink,
  Menu,
  Flame,
  Snowflake,
  Wrench,
  Sparkles,
  Zap,
  PhoneCall,
  Server,
  Cloud,
  CheckCircle2,
  Lock,
  KeyRound,
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft,
  Copy,
  XCircle,
  RotateCcw
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

import {
  getLeads,
  getReviews,
  getWebEmails,
  getChatSessions,
  getGalleryPhotos,
  getPortalUsers,
  getAnalyticsData,
  updateLeadStatus,
  updateLeadDetails,
  deleteLead,
  addCustomLead,
  uploadLeadPhoto,
  removeLeadPhoto,
  toggleReviewFeatured,
  replyToReview,
  addReview,
  deleteReview,
  syncGooglePlacesReviews,
  sendChatMessage,
  markChatAsRead,
  deleteChatSession,
  closeChatSession,
  reopenChatSession,
  deleteWebEmail,
  uploadGalleryPhoto,
  removeGalleryPhoto,
  updateUserCredentials,
  createPortalUser,
  deletePortalUser,
  verifyAdminToken,
  getSiteSettings,
  saveSiteSettings,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications,
  Lead,
  Review,
  WebEmail,
  ChatSession,
  ChatMessage,
  dedupeChatMessages,
  GalleryPhoto,
  PortalUser,
  DashboardNotification,
  getStorageItem,
  setStorageItem
} from "@/lib/leads-store";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Upfront A/C & Heating — Business Command Portal" },
      { name: "description", content: "Executive operations, HVAC dispatch, and lead management portal." }
    ],
  }),
  component: DashboardPage,
});

// Premium Modern Tooltip for Analytics Charts
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1528] border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl text-xs text-white">
        <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1.5">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="font-semibold text-slate-200 flex items-center justify-between gap-4 mt-1">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.stroke || p.fill || "#005CE6" }} />
              {p.name}:
            </span>
            <span className="font-bold text-white">
              {typeof p.value === "number" ? `$${p.value.toLocaleString()}` : p.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Format chat timestamp safely
const formatChatTime = (timestamp?: string) => {
  if (!timestamp) return "Just now";
  try {
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) return "Just now";
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "Just now";
  }
};

function DashboardPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "reviews" | "gallery" | "chat" | "emails" | "settings" | "security">("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Database / state stores
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [webEmails, setWebEmails] = useState<WebEmail[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [chatFilterUnread, setChatFilterUnread] = useState(false);
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Gallery Upload Workflow States
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<string>("residential");
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<Set<string>>(new Set());
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);

  // Portal Security States
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>([]);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addRole, setAddRole] = useState<"admin" | "editor" | "viewer">("editor");
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);
  const [editUserUsername, setEditUserUsername] = useState("");
  const [editUserPassword, setEditUserPassword] = useState("");
  const [editUserRole, setEditUserRole] = useState<"admin" | "editor" | "viewer">("viewer");
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [isSavingUserEdit, setIsSavingUserEdit] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modals & Forms
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editProjectType, setEditProjectType] = useState("residential");
  const [editEstimatedValue, setEditEstimatedValue] = useState(0);
  const [editNotes, setEditNotes] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<Lead["status"]>("new");

  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadAddress, setNewLeadAddress] = useState("");
  const [newLeadType, setNewLeadType] = useState("residential");
  const [newLeadDesc, setNewLeadDesc] = useState("");
  const [newLeadVal, setNewLeadVal] = useState(450);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewReplyText, setReviewReplyText] = useState("");

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewPhoto, setNewReviewPhoto] = useState("");

  // Review Filters
  const [reviewSearch, setReviewSearch] = useState("");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewRatingFilter, setReviewRatingFilter] = useState("all");

  // Google Places Sync States
  const [isSyncingGoogleModal, setIsSyncingGoogleModal] = useState(false);
  const [googleApiKey, setGoogleApiKey] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_google_api_key") : null) || "");
  const [googlePlaceId, setGooglePlaceId] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_google_place_id") : null) || "");
  const [isSyncingGoogle, setIsSyncingGoogle] = useState(false);

  // Web Inquiries Filters & Modals
  const [selectedEmail, setSelectedEmail] = useState<WebEmail | null>(null);
  const [isViewingEmail, setIsViewingEmail] = useState(false);
  const [emailSearch, setEmailSearch] = useState("");
  const [emailSourceFilter, setEmailSourceFilter] = useState("all");

  // Portal & Site Config States
  const [alertEmail, setAlertEmail] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_alertEmail") : null) || "allen@upfrontac.com");
  const [officePhone, setOfficePhone] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_officePhone") : null) || "(713) 819-7908");
  const [emailAlert, setEmailAlert] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_emailAlert") !== "false" : true));
  const [maintenanceMode, setMaintenanceMode] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_maintenanceMode") === "true" : false));
  const [weekdays, setWeekdays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_weekdays") : null) || "7:00 AM - 5:00 PM");
  const [saturdays, setSaturdays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_saturdays") : null) || "Emergency Calls Only");
  const [sundays, setSundays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_sundays") : null) || "Emergency Calls Only");

  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
  } | null>(null);

  const triggerConfirm = (config: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
  }) => {
    setConfirmConfig(config);
  };

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("electrical-session-token");
      if (!token) {
        setIsAuthenticated(false);
        navigate({ to: "/dashboard/login" });
        return;
      }
      try {
        const res = await verifyAdminToken(token);
        if (res.valid) {
          setIsAuthenticated(true);
          const activeUser = {
            id: res.id || "",
            username: res.username || "",
            role: res.role || "admin"
          };
          setCurrentUser(activeUser);
          setUpdateUsername(activeUser.username);
        } else {
          localStorage.removeItem("electrical-session-token");
          setIsAuthenticated(false);
          navigate({ to: "/dashboard/login" });
        }
      } catch (e) {
        console.error("Token verification failed:", e);
        setIsAuthenticated(false);
        navigate({ to: "/dashboard/login" });
      }
    };
    checkAuth();
  }, [navigate]);

  // Load data for authenticated admin
  useEffect(() => {
    if (isAuthenticated) {
      getLeads().then(setLeads);
      getReviews().then(setReviews);
      getWebEmails().then(setWebEmails);
      getChatSessions().then(setChatSessions);
      getGalleryPhotos().then(setGalleryPhotos);
      getNotifications().then(setNotifications);
      getSiteSettings().then(settings => {
        if (settings) {
          setAlertEmail(settings.alertEmail || "allen@upfrontac.com");
          setOfficePhone(settings.officePhone || "(713) 819-7908");
          setEmailAlert(settings.emailAlert);
          setMaintenanceMode(settings.maintenanceMode);
          setWeekdays(settings.weekdays || "7:00 AM - 5:00 PM");
          setSaturdays(settings.saturdays || "Emergency Calls Only");
          setSundays(settings.sundays || "Emergency Calls Only");
        }
      });
      if (currentUser?.role === "admin") {
        getPortalUsers().then(setPortalUsers);
      }
    }
  }, [isAuthenticated, activeTab, currentUser]);

  const socketRef = useRef<any>(null);
  const deletedEmailIdsRef = useRef<Set<string>>(new Set());
  const deletedLeadIdsRef = useRef<Set<string>>(new Set());
  const deletedChatIdsRef = useRef<Set<string>>(new Set());

  // Listen to same-window and cross-tab real-time events immediately
  useEffect(() => {
    const handleChatUpdate = () => {
      getChatSessions().then(setChatSessions);
    };
    const handleEmailUpdate = () => {
      getWebEmails().then(setWebEmails);
    };
    const handleLeadUpdate = () => {
      getLeads().then(setLeads);
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "upfront-chats-v2") getChatSessions().then(setChatSessions);
      if (e.key === "upfront-emails-v2") getWebEmails().then(setWebEmails);
      if (e.key === "electrical-leads") getLeads().then(setLeads);
    };

    window.addEventListener("upfront-chats-updated", handleChatUpdate);
    window.addEventListener("upfront-emails-updated", handleEmailUpdate);
    window.addEventListener("upfront-leads-updated", handleLeadUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("upfront-chats-updated", handleChatUpdate);
      window.removeEventListener("upfront-emails-updated", handleEmailUpdate);
      window.removeEventListener("upfront-leads-updated", handleLeadUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Real-time sync: Socket.IO on local dev, polling on Vercel
  useRealtimeSync({
    enabled: isAuthenticated,
    joinRoom: activeSessionId || undefined,
    pollInterval: 5000,
    onPoll: async () => {
      try {
        const [notifs, latestLeads, latestEmails, latestSessions] = await Promise.allSettled([
          getNotifications(),
          getLeads(),
          getWebEmails(),
          getChatSessions(),
        ]);
        if (notifs.status === "fulfilled" && Array.isArray(notifs.value)) setNotifications(notifs.value);
        if (latestLeads.status === "fulfilled" && Array.isArray(latestLeads.value)) {
          setLeads((prev) => {
            const map = new Map<string, Lead>();
            latestLeads.value.forEach((l: Lead) => {
              if (l?.id && !deletedLeadIdsRef.current.has(l.id)) map.set(l.id, l);
            });
            prev.forEach((l) => {
              if (l?.id && !deletedLeadIdsRef.current.has(l.id) && !map.has(l.id)) {
                map.set(l.id, l);
              }
            });
            const merged = Array.from(map.values()).sort((a, b) => {
              const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return timeB - timeA;
            });
            const prevIds = prev.map((l) => l.id).join(",");
            const mergedIds = merged.map((l) => l.id).join(",");
            return prevIds === mergedIds ? prev : merged;
          });
        }
        if (latestEmails.status === "fulfilled" && Array.isArray(latestEmails.value)) {
          setWebEmails((prev) => {
            const map = new Map<string, WebEmail>();
            latestEmails.value.forEach((e: WebEmail) => {
              if (e?.id && !deletedEmailIdsRef.current.has(e.id)) map.set(e.id, e);
            });
            prev.forEach((e) => {
              if (e?.id && !deletedEmailIdsRef.current.has(e.id) && !map.has(e.id)) {
                map.set(e.id, e);
              }
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            const prevIds = prev.map((e) => e.id).join(",");
            const mergedIds = merged.map((e) => e.id).join(",");
            return prevIds === mergedIds ? prev : merged;
          });
        }
        if (latestSessions.status === "fulfilled" && Array.isArray(latestSessions.value)) {
          setChatSessions((prev) => {
            const deleted = new Set(getStorageItem<string[]>("upfront-deleted-chats", []));
            const map = new Map<string, ChatSession>();
            latestSessions.value.forEach((s: ChatSession) => {
              if (s?.id && !deleted.has(s.id) && !deletedChatIdsRef.current.has(s.id)) {
                map.set(s.id, s);
              }
            });
            prev.forEach((s) => {
              if (s?.id && !deleted.has(s.id) && !deletedChatIdsRef.current.has(s.id)) {
                const existing = map.get(s.id);
                if (existing) {
                  const messages = dedupeChatMessages([...(s.messages || []), ...(existing.messages || [])]);
                  const clientName =
                    existing.clientName && existing.clientName !== "Website Visitor"
                      ? existing.clientName
                      : (s.clientName && s.clientName !== "Website Visitor" ? s.clientName : (existing.clientName || s.clientName || "Website Visitor"));
                  const clientEmail = existing.clientEmail || s.clientEmail || "";
                  const clientPhone = existing.clientPhone || s.clientPhone || "";

                  map.set(s.id, {
                    ...s,
                    ...existing,
                    clientName,
                    clientEmail,
                    clientPhone,
                    messages,
                    lastMessage: existing.lastMessage || s.lastMessage,
                    lastMessageTime: existing.lastMessageTime || s.lastMessageTime
                  });
                } else {
                  map.set(s.id, s);
                }
              }
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
            );
            const prevSummary = prev.map((s) => s.id + "-" + (s.messages?.length || 0) + "-" + s.lastMessageTime).join(",");
            const mergedSummary = merged.map((s) => s.id + "-" + (s.messages?.length || 0) + "-" + s.lastMessageTime).join(",");
            return prevSummary === mergedSummary ? prev : merged;
          });
        }
      } catch {
        // silent
      }
    },
    socketHandlers: {
      "session-created": (data: { sessionId: string; clientName: string; clientEmail?: string; clientPhone?: string; firstMessage?: string }) => {
        getChatSessions().then(setChatSessions);
        getNotifications().then(setNotifications);
        toast.info(`New live chat from ${data.clientName || "Website Visitor"}`);
      },
      "new-chat-message": (msg: { sessionId: string; id: string; sender: "client" | "admin"; text: string; timestamp: string; clientName?: string; clientEmail?: string; clientPhone?: string }) => {
        setChatSessions((prev) => {
          const updated = prev.map((session) => {
            if (session.id === msg.sessionId) {
              const messages = dedupeChatMessages([...(session.messages || []), msg]);
              const clientName =
                msg.clientName && msg.clientName !== "Website Visitor"
                  ? msg.clientName
                  : session.clientName;
              const clientEmail = msg.clientEmail || session.clientEmail;
              const clientPhone = msg.clientPhone || session.clientPhone;
              return {
                ...session,
                clientName,
                clientEmail,
                clientPhone,
                messages,
                lastMessage: msg.text,
                lastMessageTime: msg.timestamp,
                unread: msg.sessionId === activeSessionId ? false : (msg.sender === "client" ? true : session.unread)
              };
            }
            return session;
          });
          return [...updated].sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
        });
        if (msg.sender === "client" && (msg.sessionId !== activeSessionId || activeTab !== "chat")) {
          toast.message(`${msg.clientName || "Visitor"} Message Received`, { description: `"${msg.text}"` });
        }
      },
      "new-lead": (newLead: Lead) => {
        setLeads((prev) => {
          if (prev.some((l) => l.id === newLead.id)) return prev;
          return [newLead, ...prev];
        });
        toast.success(`⚡ New HVAC Dispatch Lead: ${newLead.name}!`, {
          description: `${newLead.projectType?.toUpperCase()} · $${newLead.estimatedValue?.toLocaleString()} (${newLead.address || "Houston"})`,
          action: { label: "View Leads", onClick: () => setActiveTab("leads") }
        });
      },
      "lead-updated": (data: { id: string; updates: any }) => {
        setLeads((prev) => prev.map((lead) => (lead.id === data.id ? { ...lead, ...data.updates } : lead)));
      },
      "lead-deleted": (data: { id: string }) => {
        setLeads((prev) => prev.filter((lead) => lead.id !== data.id));
      },
      "new-inquiry": (newInquiry: WebEmail) => {
        setWebEmails((prev) => {
          if (prev.some((e) => e.id === newInquiry.id)) return prev;
          return [newInquiry, ...prev];
        });
        toast.success(`📬 New Web Inquiry from ${newInquiry.name}!`, {
          description: `${newInquiry.service || "General Request"} (${newInquiry.source || "Website"})`,
          action: { label: "View Inquiries", onClick: () => setActiveTab("emails") }
        });
      },
      "new-notification": (notification: DashboardNotification) => {
        setNotifications((prev) => {
          if (prev.some((n) => n.id === notification.id)) return prev;
          return [notification, ...prev];
        });
        if (notification.type === "form_submission" || notification.type === "lead") {
          toast.message(notification.title, {
            description: notification.message,
            action: { label: "View Inquiries", onClick: () => setActiveTab("emails") }
          });
        }
      },
      "settings-updated": (updated: any) => {
        if (updated) {
          setAlertEmail(updated.alertEmail || "allen@upfrontac.com");
          setOfficePhone(updated.officePhone || "(713) 819-7908");
          setEmailAlert(updated.emailAlert !== undefined ? Boolean(updated.emailAlert) : true);
          setMaintenanceMode(updated.maintenanceMode !== undefined ? Boolean(updated.maintenanceMode) : false);
          setWeekdays(updated.weekdays || "7:00 AM - 5:00 PM");
          setSaturdays(updated.saturdays || "Emergency Calls Only");
          setSundays(updated.sundays || "Emergency Calls Only");
        }
      },
    },
  });

  // Window event listener for cross-tab leads & inquiries updates
  useEffect(() => {
    const handleInquiriesUpdated = () => {
      getWebEmails().then((emails) => {
        if (Array.isArray(emails)) setWebEmails(emails);
      });
    };
    const handleLeadsUpdated = () => {
      getLeads().then((leadsData) => {
        if (Array.isArray(leadsData)) setLeads(leadsData);
      });
    };
    window.addEventListener("upfront-emails-updated", handleInquiriesUpdated);
    window.addEventListener("upfront-leads-updated", handleLeadsUpdated);
    return () => {
      window.removeEventListener("upfront-emails-updated", handleInquiriesUpdated);
      window.removeEventListener("upfront-leads-updated", handleLeadsUpdated);
    };
  }, []);



  const activeChatSession = useMemo(() => {
    return chatSessions.find((s) => s.id === activeSessionId) || null;
  }, [chatSessions, activeSessionId]);

  // Auto scroll chat ONLY when user switches sessions or when a new message count increases
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevMsgCountRef = useRef<number>(0);
  const prevSessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentCount = activeChatSession?.messages?.length || 0;
    const isNewSession = activeSessionId !== prevSessionIdRef.current;
    const isNewMessage = currentCount > prevMsgCountRef.current;

    if (isNewSession || isNewMessage) {
      chatEndRef.current?.scrollIntoView({ behavior: isNewSession ? "auto" : "smooth" });
    }

    prevMsgCountRef.current = currentCount;
    prevSessionIdRef.current = activeSessionId;
  }, [activeSessionId, activeChatSession?.messages?.length]);

  // Analytics Computation
  const analytics = useMemo(() => {
    return getAnalyticsData(leads, reviews);
  }, [leads, reviews]);

  const serviceSplit = useMemo(() => {
    const total = leads.length;
    const ac = leads.filter((l) => l.projectType === "residential" || l.projectType === "ac").length;
    const heating = leads.filter((l) => l.projectType === "heating").length;
    const install = leads.filter((l) => l.projectType === "install").length;
    const maintenance = leads.filter((l) => l.projectType === "maintenance").length;
    const commercial = leads.filter((l) => l.projectType === "commercial").length;

    const acPct = total > 0 ? Math.round((ac / total) * 100) : 45;
    const heatPct = total > 0 ? Math.round((heating / total) * 100) : 20;
    const installPct = total > 0 ? Math.round((install / total) * 100) : 20;
    const commPct = total > 0 ? Math.round((commercial / total) * 100) : 15;

    return [
      { label: "AC Repair", pct: acPct, color: "#005CE6" },
      { label: "HVAC Install", pct: installPct, color: "#06B6D4" },
      { label: "Heating / Furnace", pct: heatPct, color: "#F59E0B" },
      { label: "Commercial HVAC", pct: commPct, color: "#10B981" }
    ];
  }, [leads]);

  const filteredWebEmails = useMemo(() => {
    return webEmails.filter((email) => {
      const q = emailSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        email.name?.toLowerCase().includes(q) ||
        email.email?.toLowerCase().includes(q) ||
        email.phone?.toLowerCase().includes(q) ||
        email.service?.toLowerCase().includes(q) ||
        email.source?.toLowerCase().includes(q) ||
        email.message?.toLowerCase().includes(q);

      const matchesSource =
        emailSourceFilter === "all" ||
        (email.source && email.source.toLowerCase().includes(emailSourceFilter.toLowerCase()));

      return matchesSearch && matchesSource;
    });
  }, [webEmails, emailSearch, emailSourceFilter]);

  const handleLogout = () => {
    localStorage.removeItem("electrical-session-token");
    setIsAuthenticated(false);
    navigate({ to: "/dashboard/login" });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (updatePassword && updatePassword !== updatePasswordConfirm) {
      toast.error("New passwords do not match. Please verify.");
      return;
    }
    try {
      const res = await updateUserCredentials(
        currentUser.id,
        updateUsername.trim() || undefined,
        updatePassword.trim() || undefined
      );
      if (res.success) {
        toast.success("Security credentials updated successfully!");
        setCurrentUser((prev) => prev ? { ...prev, username: res.username } : null);
        setUpdatePassword("");
        setUpdatePasswordConfirm("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleToggleMaintenanceMode = async () => {
    const nextVal = !maintenanceMode;
    setMaintenanceMode(nextVal);
    try {
      const saved = await saveSiteSettings({
        alertEmail: alertEmail.trim(),
        officePhone: officePhone.trim(),
        emailAlert,
        maintenanceMode: nextVal,
        weekdays: weekdays.trim(),
        saturdays: saturdays.trim(),
        sundays: sundays.trim()
      });
      if (saved) {
        setMaintenanceMode(saved.maintenanceMode);
      }
      if (nextVal) {
        toast.error("🚨 Emergency Maintenance Mode ACTIVATED! Public visitors will now see the Under Construction screen.", {
          duration: 6000
        });
      } else {
        toast.success("✅ Maintenance Mode DEACTIVATED — Website is Live & Operational!");
      }
    } catch {
      setMaintenanceMode(!nextVal);
      toast.error("Failed to update maintenance mode.");
    }
  };

  const handleToggleEmailAlert = async () => {
    const nextVal = !emailAlert;
    setEmailAlert(nextVal);
    try {
      await saveSiteSettings({
        alertEmail: alertEmail.trim(),
        officePhone: officePhone.trim(),
        emailAlert: nextVal,
        maintenanceMode,
        weekdays: weekdays.trim(),
        saturdays: saturdays.trim(),
        sundays: sundays.trim()
      });
      toast.success(nextVal ? "Instant email notifications enabled" : "Email notifications muted");
    } catch {
      setEmailAlert(!nextVal);
      toast.error("Failed to update notification settings.");
    }
  };

  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      const saved = await saveSiteSettings({
        alertEmail: alertEmail.trim(),
        officePhone: officePhone.trim(),
        emailAlert,
        maintenanceMode,
        weekdays: weekdays.trim(),
        saturdays: saturdays.trim(),
        sundays: sundays.trim()
      });
      if (saved) {
        setAlertEmail(saved.alertEmail);
        setOfficePhone(saved.officePhone);
        setWeekdays(saved.weekdays);
        setSaturdays(saved.saturdays);
        setSundays(saved.sundays);
        setEmailAlert(saved.emailAlert);
        setMaintenanceMode(saved.maintenanceMode);
      }
      toast.success("Operational settings updated & synced to live website!");
    } catch {
      toast.error("Failed to save operational settings.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addUsername.trim() || !addPassword.trim()) {
      toast.error("Username and password are required.");
      return;
    }
    setIsCreatingUser(true);
    try {
      const res = await createPortalUser(addUsername.trim(), addPassword.trim(), addRole);
      if (res.success) {
        toast.success(`Team account '${res.username}' created successfully.`);
        setAddUsername("");
        setAddPassword("");
        setAddRole("editor");
        getPortalUsers().then(setPortalUsers);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create portal user.");
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleOpenEditUser = (user: PortalUser) => {
    setEditingUser(user);
    setEditUserUsername(user.username);
    setEditUserPassword("");
    setEditUserRole(user.role as any || "viewer");
    setShowEditPassword(false);
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsSavingUserEdit(true);
    try {
      const res = await updateUserCredentials(
        editingUser.id,
        editUserUsername.trim() || undefined,
        editUserPassword.trim() || undefined,
        editUserRole
      );
      if (res.success) {
        toast.success(`Account '${res.username || editingUser.username}' updated successfully!`);
        if (currentUser && currentUser.id === editingUser.id) {
          setCurrentUser(prev => prev ? { ...prev, username: res.username, role: editUserRole } : null);
        }
        setEditingUser(null);
        getPortalUsers().then(setPortalUsers);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update account.");
    } finally {
      setIsSavingUserEdit(false);
    }
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (username === "admin") {
      toast.error("The root administrator account cannot be removed.");
      return;
    }
    if (currentUser && userId === currentUser.id) {
      toast.error("You cannot delete your own active session account.");
      return;
    }
    triggerConfirm({
      title: "Delete Account",
      message: `Are you sure you want to remove user account '${username}'? This cannot be undone.`,
      confirmText: "Delete Account",
      onConfirm: async () => {
        try {
          const res = await deletePortalUser(userId);
          if (res.success) {
            toast.success(`User '${username}' removed from database.`);
            getPortalUsers().then(setPortalUsers);
          }
        } catch {
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  const filteredPortalUsers = useMemo(() => {
    return portalUsers.filter((u) => {
      const matchSearch =
        u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.role.toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.id && u.id.toLowerCase().includes(userSearch.toLowerCase()));
      const matchRole =
        userRoleFilter === "all" ? true : u.role.toLowerCase() === userRoleFilter.toLowerCase();
      return matchSearch && matchRole;
    });
  }, [portalUsers, userSearch, userRoleFilter]);

  // Lead Handlers
  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditName(lead.name || "");
    setEditPhone(lead.phone || "");
    setEditEmail(lead.email || "");
    setEditAddress(lead.address || "");
    setEditProjectType(lead.projectType || "residential");
    setEditEstimatedValue(lead.estimatedValue || 0);
    setEditStatus(lead.status || "new");
    setEditNotes(lead.notes || "");
    setEditDescription(lead.description || "");
    setIsEditingLead(true);
  };

  const handleSaveLeadDetails = async () => {
    if (!selectedLead) return;
    try {
      const updated = await updateLeadDetails(selectedLead.id, {
        name: editName.trim() || selectedLead.name,
        phone: editPhone.trim() || selectedLead.phone,
        email: editEmail.trim() || selectedLead.email,
        address: editAddress.trim() || selectedLead.address,
        projectType: editProjectType || selectedLead.projectType,
        estimatedValue: Number(editEstimatedValue) || 0,
        status: editStatus,
        notes: editNotes.trim(),
        description: editDescription.trim() || selectedLead.description
      });
      if (updated) {
        setLeads(updated);
        toast.success("Lead details and dispatch ticket saved.");
        setIsEditingLead(false);
        setSelectedLead(null);
      }
    } catch {
      toast.error("Failed to update lead details.");
    }
  };

  const handleQuickStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const updated = await updateLeadStatus(leadId, newStatus);
      if (updated) {
        setLeads(updated);
        toast.success(`Lead status updated to ${newStatus.replace("_", " ").toUpperCase()}`);
      }
    } catch {
      toast.error("Failed to update lead status.");
    }
  };

  const handleDeleteLead = (id: string, name: string) => {
    triggerConfirm({
      title: "Delete Lead Ticket",
      message: `Are you sure you want to delete the lead record for "${name}"? This cannot be undone.`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          deletedLeadIdsRef.current.add(id);
          const updated = await deleteLead(id);
          setLeads(updated);
          toast.success("Lead deleted successfully.");
          setIsEditingLead(false);
          setSelectedLead(null);
        } catch {
          toast.error("Failed to delete lead.");
        }
      }
    });
  };

  const handleAddCustomLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) {
      toast.error("Customer name and phone number are required.");
      return;
    }
    try {
      const created = await addCustomLead({
        name: newLeadName.trim(),
        email: newLeadEmail.trim() || `${newLeadName.trim().toLowerCase().replace(/\s+/g, ".")}@client.com`,
        phone: newLeadPhone.trim(),
        address: newLeadAddress.trim() || "Cypress, TX",
        projectType: newLeadType,
        description: newLeadDesc.trim() || "Direct dispatch lead created from admin dashboard.",
        status: "new",
        estimatedValue: Number(newLeadVal) || 450,
        contactTime: "anytime",
        notes: ""
      });
      toast.success(`New HVAC dispatch lead for '${newLeadName}' created.`);
      setIsAddingLead(false);
      setNewLeadName("");
      setNewLeadEmail("");
      setNewLeadPhone("");
      setNewLeadAddress("");
      setNewLeadDesc("");
      setNewLeadVal(450);
      getLeads().then(setLeads);
    } catch {
      toast.error("Failed to create lead.");
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>, leadId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const updated = await uploadLeadPhoto(leadId, base64);
        setLeads(updated);
        const current = updated.find(l => l.id === leadId);
        if (current) setSelectedLead(current);
        toast.success("Photo attachment uploaded.");
      } catch {
        toast.error("Failed to upload photo.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async (leadId: string, index: number) => {
    try {
      const updated = await removeLeadPhoto(leadId, index);
      setLeads(updated);
      const current = updated.find(l => l.id === leadId);
      if (current) setSelectedLead(current);
      toast.success("Photo removed.");
    } catch {
      toast.error("Failed to remove photo.");
    }
  };

  // Review Handlers
  const handleToggleReviewFeatured = async (id: string) => {
    try {
      const updated = await toggleReviewFeatured(id);
      setReviews(updated);
      toast.success("Public website showcase visibility updated.");
    } catch {
      toast.error("Failed to toggle review visibility.");
    }
  };

  const handleDeleteReview = (id: string, title: string) => {
    triggerConfirm({
      title: "Delete Customer Review",
      message: `Are you sure you want to delete the review "${title}"? It will be removed from the public website immediately.`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const updated = await deleteReview(id);
          setReviews(updated);
          toast.success("Review deleted successfully.");
        } catch {
          toast.error("Failed to delete review.");
        }
      }
    });
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    try {
      await addReview({
        author: newReviewAuthor,
        location: newReviewLocation,
        title: newReviewTitle,
        text: newReviewText,
        rating: newReviewRating,
        newReviewPhoto: newReviewPhoto || undefined,
      });
      toast.success("Verified customer review added!");
      setIsAddingReview(false);
      setNewReviewAuthor("");
      setNewReviewLocation("");
      setNewReviewTitle("");
      setNewReviewText("");
      setNewReviewRating(5);
      setNewReviewPhoto("");
      getReviews().then(setReviews);
    } catch {
      toast.error("Failed to add review.");
    }
  };

  const handleSaveReviewReply = async () => {
    if (!selectedReview) return;
    try {
      const updated = await replyToReview(selectedReview.id, reviewReplyText);
      setReviews(updated);
      toast.success("Upfront Owner reply published live.");
      setSelectedReview(null);
      setReviewReplyText("");
    } catch {
      toast.error("Failed to publish reply.");
    }
  };

  const handleSyncGoogleReviews = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSyncingGoogle(true);
    try {
      if (googleApiKey) localStorage.setItem("upfront_google_api_key", googleApiKey);
      if (googlePlaceId) localStorage.setItem("upfront_google_place_id", googlePlaceId);

      const res = await syncGooglePlacesReviews(googleApiKey || undefined, googlePlaceId || undefined);
      if (res.success) {
        setReviews(res.reviews);
        setIsSyncingGoogleModal(false);
        toast.success(res.message || `Successfully synced ${res.count} Google reviews!`);
      } else {
        toast.error(res.message || "Failed to sync Google reviews.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to connect to Google Places API.");
    } finally {
      setIsSyncingGoogle(false);
    }
  };

  // Email Handlers
  const handleDeleteEmail = (id: string) => {
    triggerConfirm({
      title: "Delete Web Inquiry",
      message: "Are you sure you want to remove this contact submission?",
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          deletedEmailIdsRef.current.add(id);
          const updated = await deleteWebEmail(id);
          setWebEmails(updated);
          toast.success("Contact submission deleted.");
        } catch {
          toast.error("Failed to delete inquiry.");
        }
      }
    });
  };

  // Chat Handlers
  const handleSelectChat = async (id: string) => {
    setActiveSessionId(id);
    setChatSessions((prev) => prev.map((s) => (s.id === id ? { ...s, unread: false } : s)));
    markChatAsRead(id);
    if (socketRef.current) {
      socketRef.current.emit("join-session", id);
    }
  };

  const handleSendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = adminReplyText.trim();
    if (!activeSessionId || !textToSend) return;

    // 1. INSTANT Optimistic UI Update (0ms latency!)
    const msgId = "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6);
    const time = new Date().toISOString();
    const optimisticMsg: ChatMessage = {
      id: msgId,
      sender: "admin",
      text: textToSend,
      timestamp: time
    };

    setAdminReplyText("");

    setChatSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === activeSessionId) {
          const messages = dedupeChatMessages([...(s.messages || []), optimisticMsg]);
          return {
            ...s,
            messages,
            lastMessage: textToSend,
            lastMessageTime: time
          };
        }
        return s;
      });
      return [...updated].sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
    });

    // 2. Broadcast immediately over Socket.io
    if (socketRef.current) {
      socketRef.current.emit("send-message", {
        ...optimisticMsg,
        sessionId: activeSessionId
      });
    }

    // 3. Persist in background
    try {
      sendChatMessage(
        activeSessionId,
        "admin",
        textToSend,
        msgId,
        time,
        activeChatSession?.clientName,
        activeChatSession?.clientEmail,
        activeChatSession?.clientPhone
      );
    } catch (err) {
      console.warn("Background chat persist error:", err);
    }
  };

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerConfirm({
      title: "Delete Chat Session?",
      message: "Are you sure you want to remove this chat history permanently?",
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          deletedChatIdsRef.current.add(id);
          const updated = await deleteChatSession(id);
          setChatSessions(updated);
          if (activeSessionId === id) {
            setActiveSessionId(null);
          }
          toast.success("Chat history cleared.");
        } catch {
          toast.error("Failed to delete chat session.");
        }
      }
    });
  };

  const handleToggleChatStatus = async (id: string, shouldClose: boolean) => {
    try {
      const updated = shouldClose ? await closeChatSession(id) : await reopenChatSession(id);
      if (updated) {
        setChatSessions((prev) => prev.map((s) => s.id === id ? updated : s));
        if (socketRef.current) {
          socketRef.current.emit("session-status", {
            sessionId: id,
            isClosed: shouldClose,
            status: shouldClose ? "closed" : "active"
          });
        }
        toast.success(shouldClose ? "Chat closed. Visitor cannot reply on this chat." : "Chat session reopened.");
      }
    } catch {
      toast.error("Failed to update chat status.");
    }
  };

  // Gallery Handlers
  const handleUploadGallery = async () => {
    if (selectedGalleryFiles.length === 0) {
      toast.error("Please select one or more photos first.");
      return;
    }

    setIsUploadingGallery(true);
    setGalleryUploadProgress(0);

    const filesCount = selectedGalleryFiles.length;
    let currentPhotosList = [...galleryPhotos];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < filesCount; i++) {
      const file = selectedGalleryFiles[i];
      const segmentStart = Math.floor((i / filesCount) * 100);
      setGalleryUploadProgress(segmentStart);

      try {
        const updated = await uploadGalleryPhoto(file, uploadCategory);
        if (Array.isArray(updated)) {
          currentPhotosList = updated;
          setGalleryPhotos(updated);
        }
        successCount++;
      } catch (uploadErr) {
        console.error(`Error uploading photo ${i + 1} (${file.name}):`, uploadErr);
        failCount++;
      }

      const segmentEnd = Math.floor(((i + 1) / filesCount) * 100);
      setGalleryUploadProgress(segmentEnd);
    }

    setGalleryPhotos(currentPhotosList);
    setIsUploadingGallery(false);
    setGalleryUploadProgress(0);
    setSelectedGalleryFiles([]);

    if (successCount > 0 && failCount === 0) {
      toast.success(`Successfully uploaded all ${successCount} photos to Cloudinary CDN & live gallery!`);
    } else if (successCount > 0 && failCount > 0) {
      toast.warning(`Uploaded ${successCount} photos (${failCount} failed to process).`);
    } else {
      toast.error("Failed to upload photos. Please check your internet connection and Cloudinary settings.");
    }
  };

  const handleDeleteGallery = (id: string) => {
    triggerConfirm({
      title: "Delete Showcase Photo",
      message: "Are you sure you want to remove this photo from the public website gallery?",
      confirmText: "Remove",
      onConfirm: async () => {
        try {
          const updated = await removeGalleryPhoto(id);
          setGalleryPhotos(updated);
          toast.success("Photo removed from gallery.");
        } catch {
          toast.error("Failed to remove photo.");
        }
      }
    });
  };

  const handleBulkDeleteGallery = () => {
    if (selectedGalleryIds.size === 0) return;
    triggerConfirm({
      title: `Delete ${selectedGalleryIds.size} Showcase Photos`,
      message: `Are you sure you want to remove ${selectedGalleryIds.size} selected photos from the live gallery?`,
      confirmText: "Delete Selected",
      onConfirm: async () => {
        try {
          const ids = Array.from(selectedGalleryIds);
          let updatedPhotos = galleryPhotos;
          for (const id of ids) {
            updatedPhotos = await removeGalleryPhoto(id);
          }
          setGalleryPhotos(updatedPhotos);
          setSelectedGalleryIds(new Set());
          setIsBulkDeleteMode(false);
          toast.success(`${ids.length} photos removed successfully.`);
        } catch {
          toast.error("Failed to delete selected photos.");
        }
      }
    });
  };

  // Sorted & Filtered Leads
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    return sortedLeads.filter((lead) => {
      const matchesSearch =
        !s ||
        (lead.name || "").toLowerCase().includes(s) ||
        (lead.email || "").toLowerCase().includes(s) ||
        (lead.address || "").toLowerCase().includes(s) ||
        (lead.phone || "").includes(s) ||
        (lead.description || "").toLowerCase().includes(s) ||
        (lead.notes || "").toLowerCase().includes(s);
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesType = typeFilter === "all" || lead.projectType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [sortedLeads, searchTerm, statusFilter, typeFilter]);

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const matchesSearch =
        rev.author.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        rev.title.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        rev.text.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        rev.location.toLowerCase().includes(reviewSearch.toLowerCase());
      const matchesStatus =
        reviewFilter === "all" ||
        (reviewFilter === "featured" && rev.featured) ||
        (reviewFilter === "hidden" && !rev.featured);
      const matchesRating =
        reviewRatingFilter === "all" || rev.rating === Number(reviewRatingFilter);
      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, reviewSearch, reviewFilter, reviewRatingFilter]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060B18] text-white font-sans">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-[#005CE6]/30 border-t-[#005CE6] border-r-cyan-400 rounded-full animate-spin mx-auto" />
            <ShieldCheck className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
          </div>
          <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Loading Upfront Command Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 antialiased selection:bg-[#005CE6] selection:text-white">
      
      {/* ── MOBILE SLIDE-OVER DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#060B18] text-white flex flex-col justify-between p-5 shadow-2xl border-r border-slate-800 lg:hidden overflow-hidden"
            >
              {/* Glow ambient decoration inside mobile drawer */}
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#005CE6]/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="space-y-6 overflow-y-auto pr-1 relative z-10 scrollbar-none">
                {/* Header Branding */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center">
                      <img src={logo} alt="Upfront A/C & Heating" className="h-8 w-auto object-contain select-none" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black uppercase tracking-wider text-white">Upfront A/C</span>
                      <span className="text-[10px] font-bold text-cyan-400 tracking-tight">TACLA #121344E</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Action Dispatch Button */}
                <button
                  onClick={() => {
                    setActiveTab("leads");
                    setIsAddingLead(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#0066FF] hover:to-[#0052CC] text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-[#005CE6]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Dispatch / Lead</span>
                </button>

                {/* Navigation Links */}
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">Command Menu</p>
                  {[
                    { id: "overview", label: "Executive Overview", icon: TrendingUp },
                    { id: "leads", label: "Leads & Dispatch", icon: Briefcase, badge: leads.filter(l => l.status === "new").length },
                    { id: "reviews", label: "Reviews Moderator", icon: Star, badge: reviews.length },
                    { id: "gallery", label: "Photo Showcase", icon: ImageIcon, badge: galleryPhotos.length },
                    { id: "chat", label: "Live Visitor Chat", icon: MessageCircle, badge: chatSessions.filter(s => s.unread).length },
                    { id: "emails", label: "Web Inquiries", icon: Mail, badge: webEmails.length },
                    { id: "settings", label: "Portal Operations", icon: Settings },
                    { id: "security", label: "Security & Users", icon: Sliders }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between relative group cursor-pointer ${
                          isActive
                            ? "bg-[#005CE6] text-white shadow-lg shadow-[#005CE6]/30"
                            : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 transition-transform ${isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-400"}`} />
                          <span>{tab.label}</span>
                        </span>
                        
                        {Boolean(tab.badge && tab.badge > 0) && (
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isActive ? "bg-white/20 text-white" : "bg-cyan-500/20 text-cyan-300"
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="border-t border-slate-800/80 pt-4 space-y-3 relative z-10">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#005CE6] flex items-center justify-center text-white font-black text-xs">
                      {currentUser?.username?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-white capitalize">{currentUser?.username || "Admin"}</span>
                      <span className="text-[10px] font-medium text-slate-400 capitalize">{currentUser?.role || "Administrator"}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP LEFT SIDEBAR NAVIGATION ── */}
      <aside className="hidden lg:flex w-72 bg-[#060B18] text-white flex-col justify-between p-5 sticky top-0 h-screen z-40 border-r border-slate-800 shadow-2xl shrink-0 overflow-hidden">
        
        {/* Glow ambient decoration inside sidebar */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#005CE6]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="space-y-6 overflow-y-auto pr-1 relative z-10 scrollbar-none">
          
          {/* Header Branding */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center">
                <img src={logo} alt="Upfront A/C & Heating" className="h-8 w-auto object-contain select-none" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-wider text-white">Upfront A/C</span>
                <span className="text-[10px] font-bold text-cyan-400 tracking-tight">TACLA #121344E</span>
              </div>
            </div>
            
            <Link
              to="/"
              title="View Live Website"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-[#005CE6] text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Action Dispatch Button */}
          <button
            onClick={() => {
              setActiveTab("leads");
              setIsAddingLead(true);
            }}
            className="w-full bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#0066FF] hover:to-[#0052CC] text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-[#005CE6]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Dispatch / Lead</span>
          </button>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">Command Menu</p>
            {[
              { id: "overview", label: "Executive Overview", icon: TrendingUp },
              { id: "leads", label: "Leads & Dispatch", icon: Briefcase, badge: leads.filter(l => l.status === "new").length },
              { id: "reviews", label: "Reviews Moderator", icon: Star, badge: reviews.length },
              { id: "gallery", label: "Photo Showcase", icon: ImageIcon, badge: galleryPhotos.length },
              { id: "chat", label: "Live Visitor Chat", icon: MessageCircle, badge: chatSessions.filter(s => s.unread).length },
              { id: "emails", label: "Web Inquiries", icon: Mail, badge: webEmails.length },
              { id: "settings", label: "Portal Operations", icon: Settings },
              { id: "security", label: "Security & Users", icon: Sliders }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between relative group cursor-pointer ${
                    isActive
                      ? "bg-[#005CE6] text-white shadow-lg shadow-[#005CE6]/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform ${isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-400"}`} />
                    <span>{tab.label}</span>
                  </span>
                  
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-cyan-500/20 text-cyan-300"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Infrastructure Health Status Card */}
          <div className="bg-[#0B1528] border border-slate-800/90 rounded-2xl p-4 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Systems
              </span>
              <span className="text-[9px] font-bold text-slate-400">Houston HQ</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3 h-3 text-cyan-400" /> Atlas Sync
                </span>
                <span className="text-[10px] font-bold text-emerald-400">Connected</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Cloud className="w-3 h-3 text-[#005CE6]" /> Media CDN
                </span>
                <span className="text-[10px] font-bold text-emerald-400">Active</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-emerald-400" /> 24/7 Dispatch
                </span>
                <span className="text-[10px] font-bold text-cyan-300">Online</span>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Footer: User Info & Logout */}
        <div className="border-t border-slate-800/80 pt-4 space-y-3 relative z-10">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#005CE6] flex items-center justify-center text-white font-black text-xs">
                {currentUser?.username?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white capitalize">{currentUser?.username || "Admin"}</span>
                <span className="text-[10px] font-medium text-slate-400 capitalize">{currentUser?.role || "Administrator"}</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <div className="flex-1 min-h-screen overflow-y-auto flex flex-col bg-[#F8FAFC]">
        
        {/* Top Executive Header Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Hamburger Button on Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-[#005CE6] text-slate-700 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="hidden sm:inline">Upfront Command</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-[#005CE6]">{activeTab}</span>
              </div>
              <h1 className="font-extrabold text-base sm:text-xl lg:text-2xl text-slate-900 leading-tight capitalize mt-0.5 truncate max-w-[200px] sm:max-w-md lg:max-w-none">
                {activeTab === "overview" && "Executive Overview & Metrics"}
                {activeTab === "leads" && "HVAC Leads & Dispatch Pipeline"}
                {activeTab === "reviews" && "Reviews & Reputation"}
                {activeTab === "gallery" && "Cloud Media Showcase"}
                {activeTab === "chat" && "Live Visitor Chat"}
                {activeTab === "emails" && "Contact Form Inquiries"}
                {activeTab === "settings" && "Portal Operations & Alerts"}
                {activeTab === "security" && "Security & User Management"}
              </h1>
            </div>
          </div>

          {/* Topbar Right Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Input */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads, phone, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 focus:border-[#005CE6] w-56 lg:w-64 transition-all"
              />
            </div>

            {/* Live Chat Drawer Indicator */}
            <button
              onClick={() => setActiveTab("chat")}
              className={`p-2 sm:p-2.5 rounded-full border transition-all relative cursor-pointer ${
                activeTab === "chat"
                  ? "bg-[#005CE6] text-white border-[#005CE6]"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 border-slate-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {chatSessions.some(s => s.unread) && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            {/* Notifications Center */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 border border-slate-200 transition-all relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown Popover */}
              <AnimatePresence>
                {showNotificationsPopover && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="font-extrabold text-sm text-slate-900">Notifications</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            const updated = await markAllNotificationsRead();
                            setNotifications(updated);
                            toast.success("All marked as read");
                          }}
                          className="text-[10px] font-bold text-[#005CE6] hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                        <button
                          onClick={async () => {
                            const updated = await clearAllNotifications();
                            setNotifications(updated);
                            toast.success("Notifications cleared");
                          }}
                          className="text-[10px] font-bold text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 mt-2">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400 font-medium">
                          No notifications right now.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={async () => {
                              if (!notif.read) {
                                const updated = await markNotificationRead(notif.id);
                                setNotifications(updated);
                              }
                              if (notif.type === "form_submission") setActiveTab("emails");
                              if (notif.type === "chat_start") setActiveTab("chat");
                              setShowNotificationsPopover(false);
                            }}
                            className={`p-3 rounded-xl transition cursor-pointer text-left ${
                              notif.read ? "bg-transparent opacity-70" : "bg-blue-50/60 font-semibold"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs text-slate-900 font-bold">{notif.title}</span>
                              <span className="text-[9px] text-slate-400 whitespace-nowrap">
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Call Button */}
            <a
              href="tel:+17138197908"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 text-xs font-black text-[#005CE6] hover:bg-[#005CE6] hover:text-white transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>(713) 819-7908</span>
            </a>

          </div>
        </header>

        {/* ── ACTIVE TAB VIEWPORT ── */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">

          {/* ══════════════════════════════════════════════════════════
              TAB 1: EXECUTIVE OVERVIEW & METRICS
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Executive Operational Pulse Banner */}
              <div className="bg-gradient-to-r from-[#0B1528] via-[#0E1F3D] to-[#0A162C] border border-slate-800 rounded-3xl p-6 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#005CE6]/20 border border-[#005CE6]/40 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-black text-white">Upfront AC Operations Center</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        MongoDB Atlas Live
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Real-time customer dispatch, incoming web inquiries, and automated quote metrics.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
                  <button
                    onClick={() => {
                      setActiveTab("leads");
                      setIsAddingLead(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-black shadow-lg shadow-[#005CE6]/30 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Dispatch Lead</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("emails")}
                    className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inquiries ({webEmails.length})</span>
                  </button>
                </div>
              </div>

              {/* Top 4 KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                
                {/* Metric 1: Pipeline Value */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Total Pipeline Value</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">${analytics.totalValue.toLocaleString()}</span>
                    <div className="flex items-center gap-2 mt-2 text-xs font-bold text-emerald-600">
                      <span className="flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <TrendingUp className="w-3 h-3" /> Active Pipeline
                      </span>
                      <span className="text-slate-400 font-medium text-[11px]">{leads.length} Active Records</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2: New Service Leads */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">New Service Leads</span>
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">{leads.filter(l => l.status === "new").length}</span>
                    <div className="flex items-center gap-2 mt-2 text-xs font-bold text-cyan-600">
                      <span className="bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200 text-[11px]">
                        {analytics.activeCount} In Active Dispatch
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric 3: Closed / Won Jobs */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Won HVAC Contracts</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">{analytics.wonCount}</span>
                    <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px] font-black">
                        {analytics.conversionRate}% Win Rate · ${analytics.wonValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Customer Satisfaction */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Customer Rating</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Star className="w-5 h-5 fill-amber-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-slate-900">5.0</span>
                      <span className="text-sm font-bold text-slate-400">/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs font-bold text-amber-600">
                      <span className="bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px]">
                        {reviews.length} Verified Reviews
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Middle Section: Revenue Chart & Service Category Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Recharts Pipeline Trend Chart */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <h3 className="text-base font-black text-slate-900">HVAC Service Demand & Pipeline Velocity</h3>
                      <p className="text-xs text-slate-400 font-medium">Estimated project revenue over time across Houston Metro</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                      <span className="px-3 py-1 bg-white text-[#005CE6] rounded-lg shadow-xs">Daily Leads</span>
                      <span className="px-3 py-1 text-slate-400">Houston HQ</span>
                    </div>
                  </div>

                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics.monthlyTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#005CE6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#005CE6" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600 }} tickFormatter={(val) => `$${val / 1000}k`} />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Area type="monotone" dataKey="value" stroke="#005CE6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Est. Revenue" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right: Service Demand Split */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Service Category Split</h3>
                    <p className="text-xs text-slate-400 font-medium">Inquiry share by HVAC service specialty</p>
                    
                    <div className="space-y-4 mt-6">
                      {serviceSplit.map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              {item.label}
                            </span>
                            <span className="text-slate-900 font-extrabold">{item.pct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Top Territory:</span>
                    <span className="font-extrabold text-[#005CE6]">Cypress & Tomball, TX</span>
                  </div>
                </div>

              </div>

              {/* Bottom Section: Urgent Dispatch Stream */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Live Dispatch & Recent Leads</h3>
                    <p className="text-xs text-slate-400 font-medium">Immediate customer requests requiring technician assignment</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-extrabold text-[#005CE6] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Leads ({leads.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {sortedLeads.slice(0, 6).map((lead) => (
                    <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center shrink-0 font-black text-sm">
                          {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-sm text-slate-900">{lead.name}</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              lead.status === "new" ? "bg-amber-100 text-amber-800" :
                              lead.status === "won" ? "bg-emerald-100 text-emerald-800" :
                              lead.status === "lost" ? "bg-rose-100 text-rose-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {lead.status.replace("_", " ")}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1 flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lead.address || "Houston, TX"}
                            </span>
                            <span>•</span>
                            <span className="text-[#005CE6] font-bold capitalize">{lead.projectType ? lead.projectType.replace("-", " ") : "HVAC"} Service</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="text-sm font-black text-slate-900">${(lead.estimatedValue || 0).toLocaleString()}</span>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-[#005CE6] text-slate-600 hover:text-white transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleEditLead(lead)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#005CE6] text-white text-xs font-bold hover:bg-[#0047B3] transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                  {sortedLeads.length === 0 && (
                    <div className="p-10 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center mb-3">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-black text-slate-800">No Leads Yet</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">
                        Incoming service requests from your website forms will appear here in real-time as customers submit them.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 2: LEADS & SERVICE DISPATCH MANAGER
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "leads" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Tab 2 Top KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
                    <p className="text-2xl font-black text-slate-900 mt-1">{leads.length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005CE6] flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">New Inquiries</span>
                    <p className="text-2xl font-black text-amber-600 mt-1">{leads.filter(l => l.status === "new").length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600">Active Dispatch</span>
                    <p className="text-2xl font-black text-cyan-600 mt-1">
                      {leads.filter(l => ["contacted", "consultation_scheduled", "proposal_sent"].includes(l.status)).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Won Revenue</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">${analytics.wonValue.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Header Controls & Filters */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* Search & Filter Inputs */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
                  <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, phone, address, notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses ({leads.length})</option>
                    <option value="new">New Inquiry ({leads.filter(l => l.status === "new").length})</option>
                    <option value="contacted">Contacted ({leads.filter(l => l.status === "contacted").length})</option>
                    <option value="consultation_scheduled">Scheduled ({leads.filter(l => l.status === "consultation_scheduled").length})</option>
                    <option value="proposal_sent">Proposal Sent ({leads.filter(l => l.status === "proposal_sent").length})</option>
                    <option value="won">Won Jobs ({leads.filter(l => l.status === "won").length})</option>
                    <option value="lost">Lost ({leads.filter(l => l.status === "lost").length})</option>
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Services</option>
                    <option value="residential">Residential AC Repair</option>
                    <option value="install">System Replacement</option>
                    <option value="heating">Heating / Furnace</option>
                    <option value="maintenance">Seasonal Tune-Up</option>
                    <option value="commercial">Commercial HVAC</option>
                    <option value="indoor_air_quality">Air Quality / IAQ</option>
                    <option value="emergency">24/7 Emergency</option>
                  </select>
                </div>

                {/* Add Lead Button */}
                <button
                  onClick={() => setIsAddingLead(true)}
                  className="w-full md:w-auto px-5 py-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white rounded-2xl text-xs font-extrabold shadow-md shadow-[#005CE6]/20 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Dispatch Lead</span>
                </button>

              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="py-4 px-6">Client & Service Address</th>
                        <th className="py-4 px-4">Direct Contact</th>
                        <th className="py-4 px-4">Service Specialty</th>
                        <th className="py-4 px-4">Est. Value</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                            No HVAC leads match the current filters or search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            
                            {/* Client & Address */}
                            <td className="py-4 px-6">
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center font-black text-xs shrink-0">
                                  {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-extrabold text-slate-900 block">{lead.name}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                    {lead.address || "Houston / Cypress Service Area, TX"}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Contact Info */}
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                {lead.phone ? (
                                  <a href={`tel:${lead.phone}`} className="text-slate-900 font-bold hover:text-[#005CE6] flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-[#005CE6]" />
                                    <span>{lead.phone}</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">No phone</span>
                                )}
                                {lead.email && (
                                  <a href={`mailto:${lead.email}`} className="text-[11px] text-slate-500 hover:underline flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-slate-400" />
                                    <span className="truncate max-w-[150px]">{lead.email}</span>
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Service Type */}
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border ${
                                lead.projectType === "residential" || lead.projectType === "ac" ? "bg-blue-50 text-[#005CE6] border-blue-200" :
                                lead.projectType === "install" ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                                lead.projectType === "heating" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                lead.projectType === "maintenance" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                lead.projectType === "commercial" ? "bg-purple-50 text-purple-700 border-purple-200" :
                                lead.projectType === "indoor_air_quality" ? "bg-teal-50 text-teal-700 border-teal-200" :
                                "bg-slate-100 text-slate-700 border-slate-200"
                              }`}>
                                {lead.projectType ? lead.projectType.replace("_", " ").replace("-", " ") : "HVAC"}
                              </span>
                            </td>

                            {/* Value */}
                            <td className="py-4 px-4 font-black text-slate-900 text-sm">
                              ${(lead.estimatedValue || 0).toLocaleString()}
                            </td>

                            {/* Status Stepper Dropdown */}
                            <td className="py-4 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleQuickStatusChange(lead.id, e.target.value as any)}
                                className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                                  lead.status === "new" ? "bg-amber-50 text-amber-800 border-amber-200" :
                                  lead.status === "won" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                                  lead.status === "lost" ? "bg-rose-50 text-rose-800 border-rose-200" :
                                  "bg-blue-50 text-[#005CE6] border-blue-200"
                                }`}
                              >
                                <option value="new">NEW</option>
                                <option value="contacted">CONTACTED</option>
                                <option value="consultation_scheduled">SCHEDULED</option>
                                <option value="proposal_sent">PROPOSAL SENT</option>
                                <option value="won">WON</option>
                                <option value="lost">LOST</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#005CE6] text-slate-600 hover:text-white transition-colors"
                                  title="Call Customer"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => handleEditLead(lead)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#005CE6] text-slate-600 hover:text-white transition-colors cursor-pointer"
                                  title="Edit / View Details"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id, lead.name)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-500 text-slate-600 hover:text-white transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 3: REVIEWS MODERATOR
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">Verified Customer Testimonials</h3>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                      5.0★ Rating ({reviews.length} Total)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Moderate client ratings, respond to feedback, and auto-sync live from your Google Business Profile</p>
                </div>
                
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Automated Google Sync Button */}
                  <button
                    onClick={() => setIsSyncingGoogleModal(true)}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-black shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span>Sync Google Places API</span>
                  </button>

                  <button
                    onClick={() => setIsAddingReview(true)}
                    className="px-4 py-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white rounded-2xl text-xs font-extrabold shadow-md shadow-[#005CE6]/20 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Manual Review</span>
                  </button>
                </div>
              </div>

              {/* Reviews Filter Toolbar */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search author, keyword, or text..."
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                    />
                  </div>

                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <option value="all">All Statuses ({reviews.length})</option>
                    <option value="featured">Featured on Site ({reviews.filter(r => r.featured).length})</option>
                    <option value="hidden">Hidden ({reviews.filter(r => !r.featured).length})</option>
                  </select>

                  <select
                    value={reviewRatingFilter}
                    onChange={(e) => setReviewRatingFilter(e.target.value)}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <option value="all">All Star Ratings</option>
                    <option value="5">5 Stars Only</option>
                    <option value="4">4 Stars Only</option>
                  </select>
                </div>

                <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                  Showing <strong className="text-slate-800">{filteredReviews.length}</strong> of {reviews.length} Reviews
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredReviews.length === 0 ? (
                  <div className="col-span-2 py-12 text-center text-slate-400 font-medium bg-white rounded-3xl border border-slate-200">
                    No customer reviews match your search filter.
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          {(rev.source === "google" || rev.id.includes("google") || rev.title.includes("Google")) && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                              </svg>
                              Google Verified
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleToggleReviewFeatured(rev.id)}
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                            rev.featured
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          {rev.featured ? "Featured on Site" : "Hidden"}
                        </button>
                      </div>

                      <h4 className="font-extrabold text-sm text-slate-900 mt-3">{rev.title}</h4>
                      <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed italic">
                        "{rev.text}"
                      </p>

                      {rev.replyText && (
                        <div className="mt-3 bg-blue-50/80 border border-blue-100 rounded-2xl p-3.5 text-xs text-slate-700">
                          <span className="font-black text-[10px] uppercase tracking-wider text-[#005CE6] block mb-1">
                            Upfront Owner Response:
                          </span>
                          "{rev.replyText}"
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {rev.authorPhoto ? (
                          <img src={rev.authorPhoto} alt={rev.author} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#005CE6] font-black text-xs flex items-center justify-center">
                            {rev.author.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                          <span className="text-[10px] text-slate-400">{rev.location || "Houston Metro"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedReview(rev);
                            setReviewReplyText(rev.replyText || "");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#005CE6] text-slate-600 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          {rev.replyText ? "Edit Reply" : "Reply"}
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id, rev.title)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-500 text-slate-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )))}
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 4: PHOTO SHOWCASE & CLOUD MEDIA
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "gallery" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Cloudinary Live Upload Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Cloudinary Media Uploader</h3>
                    <p className="text-xs text-slate-400 font-medium">Upload high-resolution project photos directly to the live website gallery</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      <option value="residential">Residential AC Repair</option>
                      <option value="heating">Heating & Furnace</option>
                      <option value="install">New HVAC Installation</option>
                      <option value="commercial">Commercial HVAC</option>
                    </select>
                  </div>
                </div>

                {/* Upload Drag & Drop Area */}
                <div className="border-2 border-dashed border-slate-200 hover:border-[#005CE6] rounded-3xl p-8 text-center transition-colors bg-slate-50/50">
                  <Upload className="w-8 h-8 text-[#005CE6] mx-auto mb-2" />
                  <p className="text-xs font-extrabold text-slate-800">Choose images to upload</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">JPEG, PNG, WEBP up to 10MB each</p>
                  
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedGalleryFiles(Array.from(e.target.files));
                      }
                    }}
                    className="mt-4 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#005CE6] file:text-white hover:file:bg-[#0047B3] cursor-pointer"
                  />

                  {selectedGalleryFiles.length > 0 && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <span className="text-xs font-bold text-slate-700">
                        {selectedGalleryFiles.length} file(s) selected
                      </span>
                      <button
                        onClick={handleUploadGallery}
                        disabled={isUploadingGallery}
                        className="px-5 py-2 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold shadow-md shadow-[#005CE6]/30 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isUploadingGallery ? `Uploading (${galleryUploadProgress}%)...` : "Start Cloud Upload"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Photos Grid */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h4 className="font-extrabold text-sm text-slate-900">Live Website Gallery ({galleryPhotos.length} Photos)</h4>
                  <span className="text-xs text-slate-400 font-medium">Instant sync enabled</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryPhotos.map((photo) => (
                    <div key={photo.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                      <img
                        src={photo.url}
                        alt="Gallery Project"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                        <span className="text-[9px] font-black uppercase text-cyan-300 tracking-wider bg-black/40 px-2 py-0.5 rounded-md self-start">
                          {photo.category}
                        </span>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setLightboxPhoto(photo.url)}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white text-xs backdrop-blur-md cursor-pointer"
                            title="Preview High Res"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(photo.id)}
                            className="p-1.5 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white text-xs backdrop-blur-md cursor-pointer"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 5: LIVE VISITOR CHAT CONSOLE
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "chat" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden h-[580px] sm:h-[660px] grid grid-cols-1 md:grid-cols-12"
            >
              {/* Left Pane: Sessions List */}
              <div className={`md:col-span-4 border-r border-slate-200 flex-col h-full bg-slate-50/50 ${activeChatSession ? "hidden md:flex" : "flex"}`}>
                <div className="p-4 border-b border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
                      Visitor Conversations ({chatSessions.length})
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Socket
                    </span>
                  </div>

                  {/* Search and Unread Filter */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search chats..."
                        value={chatSearchQuery}
                        onChange={(e) => setChatSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#005CE6]"
                      />
                    </div>
                    <button
                      onClick={() => setChatFilterUnread(!chatFilterUnread)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                        chatFilterUnread
                          ? "bg-[#005CE6] text-white"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                      title="Toggle Unread Only"
                    >
                      Unread
                    </button>
                  </div>
                </div>

                {/* Sessions List */}
                <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
                  {chatSessions
                    .filter((session) => {
                      if (chatFilterUnread && !session.unread) return false;
                      if (!chatSearchQuery.trim()) return true;
                      const q = chatSearchQuery.toLowerCase();
                      const nameMatch = (session.clientName || "").toLowerCase().includes(q);
                      const msgMatch = (session.lastMessage || "").toLowerCase().includes(q);
                      const phoneMatch = (session.clientPhone || "").toLowerCase().includes(q);
                      return nameMatch || msgMatch || phoneMatch;
                    })
                    .length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      {chatSessions.length === 0
                        ? "No live chats yet. Visitor chats will automatically pop up here in real time."
                        : "No conversations match your search."}
                    </div>
                  ) : (
                    chatSessions
                      .filter((session) => {
                        if (chatFilterUnread && !session.unread) return false;
                        if (!chatSearchQuery.trim()) return true;
                        const q = chatSearchQuery.toLowerCase();
                        const nameMatch = (session.clientName || "").toLowerCase().includes(q);
                        const msgMatch = (session.lastMessage || "").toLowerCase().includes(q);
                        const phoneMatch = (session.clientPhone || "").toLowerCase().includes(q);
                        return nameMatch || msgMatch || phoneMatch;
                      })
                      .map((session) => (
                        <div
                          key={session.id}
                          onClick={() => handleSelectChat(session.id)}
                          className={`p-4 transition cursor-pointer text-left flex items-start justify-between gap-2 ${
                            activeSessionId === session.id
                              ? "bg-white shadow-xs border-l-4 border-[#005CE6]"
                              : "hover:bg-slate-100/60"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="font-extrabold text-xs text-slate-900 truncate">
                                  {session.clientName || "Website Visitor"}
                                </span>
                                {session.isClosed && (
                                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded-md shrink-0">
                                    Closed
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium shrink-0">
                                {formatChatTime(session.lastMessageTime)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              {session.unread && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                              )}
                              <p className="text-[11px] text-slate-500 truncate">
                                {session.lastMessage || "Started a chat..."}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleDeleteChat(session.id, e)}
                            className="text-slate-300 hover:text-rose-500 p-1 cursor-pointer"
                            title="Delete Chat"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Right Pane: Active Thread */}
              <div className={`md:col-span-8 flex-col h-full bg-white min-h-0 overflow-hidden ${!activeChatSession ? "hidden md:flex" : "flex"}`}>
                {activeChatSession ? (
                  <>
                    {/* Active Chat Header */}
                    <div className="shrink-0 p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => setActiveSessionId(null)}
                          className="md:hidden p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer shrink-0"
                          title="Back to Chats List"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="w-9 h-9 rounded-full bg-[#005CE6] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {activeChatSession.clientName?.charAt(0) || "V"}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">{activeChatSession.clientName}</h4>
                            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-full">
                              {activeChatSession.clientCity || "Tomball, TX"}
                            </span>
                          </div>
                          {activeChatSession.isClosed ? (
                            <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                              <Lock className="w-3 h-3 text-slate-400" />
                              Chat Session Closed
                            </span>
                          ) : (
                            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active Visitor Session
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeChatSession.clientEmail && (
                          <a
                            href={`mailto:${activeChatSession.clientEmail}`}
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl transition"
                          >
                            <Mail className="w-3 h-3 text-[#005CE6]" />
                            <span>{activeChatSession.clientEmail}</span>
                          </a>
                        )}

                        {activeChatSession.clientPhone && (
                          <a
                            href={`tel:${activeChatSession.clientPhone}`}
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#005CE6] bg-blue-50 hover:bg-blue-100 border border-blue-200/60 px-3 py-1.5 rounded-xl transition"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{activeChatSession.clientPhone}</span>
                          </a>
                        )}

                        {activeChatSession.isClosed ? (
                          <button
                            type="button"
                            onClick={() => handleToggleChatStatus(activeChatSession.id, false)}
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
                            title="Reopen this chat session"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reopen Chat</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleChatStatus(activeChatSession.id, true)}
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
                            title="Close chat session (visitor cannot reply)"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Close Chat</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Messages Thread */}
                    <div className="flex-1 min-h-0 p-5 overflow-y-auto space-y-4 bg-slate-50/50 overscroll-contain">
                      {dedupeChatMessages(activeChatSession.messages || []).map((m) => (
                        <div
                          key={m.id}
                          className={`flex items-end gap-2.5 ${m.sender === "admin" ? "justify-end" : "justify-start"}`}
                        >
                          {m.sender === "client" && (
                            <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 text-slate-700 font-black text-[10px] flex items-center justify-center shrink-0 mb-1 uppercase select-none">
                              {activeChatSession.clientName?.charAt(0) || "V"}
                            </div>
                          )}
                          <div className={`flex flex-col max-w-[80%] ${m.sender === "admin" ? "items-end" : "items-start"}`}>
                            <div
                              className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words ${
                                m.sender === "admin"
                                  ? "bg-[#005CE6] text-white rounded-br-xs shadow-sm font-medium"
                                  : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs font-medium"
                              }`}
                            >
                              {m.text}
                            </div>
                            <span className="text-[10px] text-slate-400 font-semibold mt-1 px-1 select-none">
                              {m.sender === "admin" ? "Upfront AC Dispatch" : activeChatSession.clientName} · {formatChatTime(m.timestamp)}
                            </span>
                          </div>
                          {m.sender === "admin" && (
                            <div className="w-7 h-7 rounded-full bg-[#005CE6] text-white font-black text-[10px] flex items-center justify-center shrink-0 mb-1 select-none">
                              UA
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {activeChatSession.isClosed ? (
                      <div className="shrink-0 p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>This chat has been closed. Visitor cannot send new replies.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleChatStatus(activeChatSession.id, false)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reopen Chat</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Quick Canned Replies */}
                        <div className="shrink-0 px-4 pt-3 pb-1 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
                            Quick Replies:
                          </span>
                          {[
                            "👋 Hi! How can we assist you with your AC today?",
                            "❄️ A technician is available in Tomball/Cypress today.",
                            "🚨 Emergency service available 24/7: (713) 819-7908.",
                            "📋 Can we get your address to schedule a Free Estimate?"
                          ].map((canned, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setAdminReplyText(canned)}
                              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 whitespace-nowrap transition cursor-pointer shrink-0"
                            >
                              {canned.slice(0, 30)}...
                            </button>
                          ))}
                        </div>

                        {/* Chat Input Bar */}
                        <form onSubmit={handleSendChatReply} className="shrink-0 p-4 border-t border-slate-200 flex gap-3 bg-white">
                          <input
                            type="text"
                            placeholder={`Reply to ${activeChatSession.clientName}...`}
                            value={adminReplyText}
                            onChange={(e) => setAdminReplyText(e.target.value)}
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 font-medium"
                          />
                          <button
                            type="submit"
                            disabled={!adminReplyText.trim()}
                            className="px-5 py-3 bg-[#005CE6] hover:bg-[#0047B3] text-white rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-[#005CE6]/30 cursor-pointer disabled:opacity-50 transition"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Send</span>
                          </button>
                        </form>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center mb-3">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-black text-slate-800">Live Visitor Chat Console</h4>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Select an incoming conversation from the left pane to chat live with your website visitors.
                    </p>
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 6: WEB CONTACT INQUIRIES
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "emails" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-[#005CE6] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Web Inquiries & Dedicated Page Leads</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Real-time submissions captured from Contact, Free Estimate, Pricing, Financing, Careers & Service Area forms.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs font-black text-emerald-700 select-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync Active
                  </span>
                  <button
                    onClick={() => {
                      getWebEmails().then(setWebEmails);
                      toast.success("Web inquiries refreshed!");
                    }}
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
                    title="Refresh Inquiries"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* KPI Mini-Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Submissions</span>
                    <span className="text-2xl font-black text-slate-900">{webEmails.length}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Direct Phone Provided</span>
                    <span className="text-2xl font-black text-slate-900">
                      {webEmails.filter((e) => e.phone && e.phone.trim().length > 0).length}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Free Estimates</span>
                    <span className="text-2xl font-black text-slate-900">
                      {webEmails.filter((e) => (e.source && e.source.toLowerCase().includes("estimate")) || (e.service && e.service.toLowerCase().includes("estimate"))).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Search & Source Filter Bar */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    placeholder="Search by customer name, phone, email, service type, or message..."
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 font-medium"
                  />
                  {emailSearch && (
                    <button
                      onClick={() => setEmailSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Source Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider shrink-0 mr-1">
                    Filter by Source:
                  </span>
                  {[
                    { id: "all", label: `All (${webEmails.length})` },
                    { id: "estimate", label: `Free Estimate (${webEmails.filter(e => e.source?.toLowerCase().includes("estimate")).length})` },
                    { id: "contact", label: `Contact Form (${webEmails.filter(e => e.source?.toLowerCase().includes("contact")).length})` },
                    { id: "financ", label: `Financing (${webEmails.filter(e => e.source?.toLowerCase().includes("financ")).length})` },
                    { id: "career", label: `Careers (${webEmails.filter(e => e.source?.toLowerCase().includes("career")).length})` },
                    { id: "pricing", label: `Pricing (${webEmails.filter(e => e.source?.toLowerCase().includes("pricing")).length})` },
                    { id: "area", label: `Service Areas (${webEmails.filter(e => e.source?.toLowerCase().includes("area")).length})` }
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setEmailSourceFilter(chip.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                        emailSourceFilter === chip.id
                          ? "bg-[#005CE6] text-white shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Grid */}
              {filteredWebEmails.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center mb-3">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-black text-slate-800">No Web Inquiries Found</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {emailSearch || emailSourceFilter !== "all"
                      ? "No submissions matched your search criteria. Try clearing the filter."
                      : "Website form submissions will automatically populate here in real-time."}
                  </p>
                  {(emailSearch || emailSourceFilter !== "all") && (
                    <button
                      onClick={() => {
                        setEmailSearch("");
                        setEmailSourceFilter("all");
                      }}
                      className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredWebEmails.map((email) => {
                    const sourceLower = (email.source || "").toLowerCase();
                    const sourceBadge = sourceLower.includes("estimate")
                      ? { bg: "bg-blue-50", text: "text-[#005CE6]", border: "border-blue-200", label: email.source || "Free Estimate Page" }
                      : sourceLower.includes("contact")
                      ? { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: email.source || "Contact Form" }
                      : sourceLower.includes("career")
                      ? { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", label: email.source || "Careers Page" }
                      : sourceLower.includes("financ")
                      ? { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: email.source || "Financing Page" }
                      : sourceLower.includes("pricing")
                      ? { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", label: email.source || "Pricing Page" }
                      : sourceLower.includes("area")
                      ? { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", label: email.source || "Service Areas" }
                      : { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", label: email.source || "Website Form" };

                    return (
                      <div
                        key={email.id}
                        className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
                      >
                        <div>
                          {/* Top Row: Source Badge & Timestamp */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${sourceBadge.bg} ${sourceBadge.text} ${sourceBadge.border}`}>
                              {sourceBadge.label}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-300" />
                              {new Date(email.createdAt).toLocaleDateString()} {new Date(email.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          {/* Customer Name & Service */}
                          <div className="mb-3">
                            <h4 className="font-extrabold text-base text-slate-900 group-hover:text-[#005CE6] transition-colors">
                              {email.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Wrench className="w-3.5 h-3.5 text-[#005CE6] shrink-0" />
                              <span className="text-xs font-bold text-slate-700">
                                {email.service || "General HVAC Request"}
                              </span>
                            </div>
                          </div>

                          {/* Contact Info Pills */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            {email.phone && (
                              <a
                                href={`tel:${email.phone}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#005CE6] border border-blue-200/70 rounded-xl text-xs font-bold transition"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{email.phone}</span>
                              </a>
                            )}
                            {email.email && (
                              <a
                                href={`mailto:${email.email}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-medium transition"
                              >
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{email.email}</span>
                              </a>
                            )}
                          </div>

                          {/* Message Body Block */}
                          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-wrap max-h-36 overflow-y-auto overscroll-contain">
                            {email.message || "No detailed message provided."}
                          </div>
                        </div>

                        {/* Bottom Action Toolbar */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {email.phone && (
                              <a
                                href={`tel:${email.phone}`}
                                className="px-3 py-1.5 bg-[#005CE6] hover:bg-[#0047B3] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition"
                              >
                                <Phone className="w-3 h-3" />
                                <span>Call</span>
                              </a>
                            )}
                            {email.email && (
                              <a
                                href={`mailto:${email.email}?subject=Upfront AC & Heating Inquiry - ${encodeURIComponent(email.service || "HVAC Service")}`}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
                              >
                                <Mail className="w-3 h-3 text-slate-600" />
                                <span>Email</span>
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const info = `Name: ${email.name}\nPhone: ${email.phone || "N/A"}\nEmail: ${email.email}\nService: ${email.service || "General"}\nSource: ${email.source || "Website"}\nMessage:\n${email.message || ""}`;
                                navigator.clipboard.writeText(info);
                                toast.success("Customer inquiry copied to clipboard!");
                              }}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                              title="Copy Customer Info"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEmail(email);
                                setIsViewingEmail(true);
                              }}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                              title="View Full Breakdown"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeleteEmail(email.id)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Inquiry Details Modal */}
              <AnimatePresence>
                {isViewingEmail && selectedEmail && (
                  <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center font-extrabold text-base">
                            {selectedEmail.name.charAt(0) || "U"}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-base text-slate-900">{selectedEmail.name}</h4>
                            <span className="text-xs text-slate-400 font-medium">
                              Received {new Date(selectedEmail.createdAt).toLocaleDateString()} at {new Date(selectedEmail.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsViewingEmail(false);
                            setSelectedEmail(null);
                          }}
                          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-3.5 text-xs text-slate-700">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Source Page</span>
                            <span className="font-bold text-[#005CE6]">{selectedEmail.source || "Website Form"}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Requested Service</span>
                            <span className="font-bold text-slate-800">{selectedEmail.service || "General HVAC"}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Phone Number</span>
                            <span className="font-bold text-slate-900 text-sm">{selectedEmail.phone || "Not Provided"}</span>
                          </div>
                          {selectedEmail.phone && (
                            <a
                              href={`tel:${selectedEmail.phone}`}
                              className="px-3 py-1.5 bg-[#005CE6] text-white rounded-xl font-bold flex items-center gap-1 hover:bg-[#0047B3] transition"
                            >
                              <Phone className="w-3 h-3" /> Call
                            </a>
                          )}
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Email Address</span>
                            <span className="font-bold text-slate-900">{selectedEmail.email || "Not Provided"}</span>
                          </div>
                          {selectedEmail.email && (
                            <a
                              href={`mailto:${selectedEmail.email}?subject=Upfront AC & Heating Follow-Up`}
                              className="px-3 py-1.5 bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center gap-1 hover:bg-slate-300 transition"
                            >
                              <Mail className="w-3 h-3" /> Email
                            </a>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5">Submitted Notes & Form Details</span>
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
                            {selectedEmail.message || "No additional comments provided."}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            const info = `Name: ${selectedEmail.name}\nPhone: ${selectedEmail.phone || "N/A"}\nEmail: ${selectedEmail.email}\nService: ${selectedEmail.service || "General"}\nSource: ${selectedEmail.source || "Website"}\nMessage:\n${selectedEmail.message || ""}`;
                            navigator.clipboard.writeText(info);
                            toast.success("Customer inquiry copied to clipboard!");
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Info</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsViewingEmail(false);
                            setSelectedEmail(null);
                          }}
                          className="px-5 py-2.5 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white font-bold text-xs transition cursor-pointer shadow-md shadow-[#005CE6]/30"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 7: OPERATIONS & SITE SETTINGS
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Top Banner Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-[#005CE6] flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">HVAC Dispatch & Portal Operations</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Configure alert routing emails, dispatch phone lines, and operating hours. Updates sync instantly to all website visitors and service pages in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs font-black text-emerald-700 select-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live DB Synced
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      getSiteSettings().then(settings => {
                        if (settings) {
                          setAlertEmail(settings.alertEmail || "allen@upfrontac.com");
                          setOfficePhone(settings.officePhone || "(713) 819-7908");
                          setEmailAlert(settings.emailAlert);
                          setMaintenanceMode(settings.maintenanceMode);
                          setWeekdays(settings.weekdays || "7:00 AM - 5:00 PM");
                          setSaturdays(settings.saturdays || "Emergency Calls Only");
                          setSundays(settings.sundays || "Emergency Calls Only");
                        }
                      });
                      toast.success("Settings reloaded from database!");
                    }}
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
                    title="Reload from DB"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left 2 Cols: Main Configuration Form */}
                <div className="lg:col-span-2 space-y-6">
                  <form onSubmit={handleSaveConfig} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-7">
                    
                    {/* Section 1: Contact & Dispatch Routing */}
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                        <Phone className="w-4 h-4 text-[#005CE6]" />
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                          1. Direct Routing & Contact Info
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                            <span>Alert Notification Email</span>
                            <span className="text-[10px] text-slate-400 font-normal">Receives all web inquiries</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={alertEmail}
                              onChange={(e) => setAlertEmail(e.target.value)}
                              placeholder="allen@upfrontac.com"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                            <span>Dispatch Office Phone</span>
                            <span className="text-[10px] text-slate-400 font-normal">Displayed on website & call buttons</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={officePhone}
                              onChange={(e) => setOfficePhone(e.target.value)}
                              placeholder="(713) 819-7908"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 transition"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Operating & Dispatch Hours */}
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#005CE6]" />
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                            2. Service & Operational Schedule
                          </h4>
                        </div>

                        {/* Quick Presets */}
                        <div className="hidden sm:flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Presets:</span>
                          <button
                            type="button"
                            onClick={() => {
                              setWeekdays("7:00 AM - 5:00 PM");
                              setSaturdays("Emergency Calls Only");
                              setSundays("Emergency Calls Only");
                              toast.info("Applied Upfront Standard Schedule (7 AM - 5 PM M-F)");
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition"
                          >
                            Upfront Standard
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setWeekdays("24 Hours Available");
                              setSaturdays("24 Hours Available");
                              setSundays("24 Hours Available");
                              toast.info("Applied 24/7 Full Schedule");
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition"
                          >
                            24/7 All Week
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                          <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                            <span>Monday - Friday</span>
                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Weekdays</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={weekdays}
                            onChange={(e) => setWeekdays(e.target.value)}
                            placeholder="7:00 AM - 5:00 PM"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                          />
                        </div>

                        <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                          <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                            <span>Saturday</span>
                            <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Weekend</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={saturdays}
                            onChange={(e) => setSaturdays(e.target.value)}
                            placeholder="Emergency Calls Only"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                          />
                        </div>

                        <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                          <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                            <span>Sunday / Emergencies</span>
                            <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Emergency</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={sundays}
                            onChange={(e) => setSundays(e.target.value)}
                            placeholder="Emergency Calls Only"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Notification & System Controls */}
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                        <Sliders className="w-4 h-4 text-[#005CE6]" />
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                          3. System Automation & Alerts
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-black text-slate-900 block">Instant Email Alerts</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              Notify {alertEmail || "admin"} immediately on incoming leads
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleToggleEmailAlert}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                              emailAlert ? "bg-[#005CE6]" : "bg-slate-300"
                            }`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                emailAlert ? "translate-x-6" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-black text-slate-900 block">Emergency Maintenance Mode</span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              Displays maintenance screen to public visitors
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleToggleMaintenanceMode}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                              maintenanceMode ? "bg-rose-600 shadow-sm shadow-rose-500/40" : "bg-slate-300"
                            }`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                maintenanceMode ? "translate-x-6" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="submit"
                        disabled={isSavingConfig}
                        className="px-8 py-3.5 bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#0066FF] hover:to-[#0052CC] text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-[#005CE6]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                      >
                        {isSavingConfig ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Saving & Broadcasting...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Save & Broadcast to Live Website</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right 1 Col: Live Website Appearance Preview */}
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 sticky top-24">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Live Public Site Preview
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">Real-Time</span>
                    </div>

                    {/* Preview 1: Header Call Bar */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Header Call Button
                      </span>
                      <div className="bg-[#005CE6] text-white p-3.5 rounded-2xl shadow-md flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-black tracking-wider text-white/80 block">Call Us Now</span>
                          <span className="text-sm font-black">{officePhone || "(713) 819-7908"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preview 2: Footer Contact Block */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Footer Contact Card
                      </span>
                      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2.5 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-[#005CE6] shrink-0" />
                          <span className="font-bold">{officePhone || "(713) 819-7908"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-[#005CE6] shrink-0" />
                          <span className="font-medium text-slate-300 break-all">{alertEmail || "allen@upfrontac.com"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preview 3: Working Hours Schedule */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Website Operational Hours
                      </span>
                      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-bold text-[11px]">Mon - Fri:</span>
                          <span className="font-bold text-white text-[11px]">{weekdays || "7:00 AM - 5:00 PM"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-bold text-[11px]">Saturday:</span>
                          <span className="font-bold text-white text-[11px]">{saturdays || "Emergency Calls Only"}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-700/50">
                          <span className="text-rose-400 font-black text-[11px]">Sunday:</span>
                          <span className="font-black text-rose-400 text-[11px]">{sundays || "Emergency Calls Only"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 8: SECURITY & USER ACCESS CONTROL
             ══════════════════════════════════════════════════════════ */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-6xl"
            >
              {/* Top Security Overview Header & KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Security Status */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-[#0F172A] rounded-3xl p-5 border border-slate-700/60 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active &amp; Secured
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Security Protocol</span>
                  <div className="text-lg font-black text-white mt-0.5">SHA-256 Hashing</div>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">Multi-round salted credential encryption</p>
                </div>

                {/* 2. Active Session */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/60 text-[#005CE6] flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-[#005CE6] border border-blue-100 uppercase">
                      {currentUser?.role || "Admin"}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Session User</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5 truncate">{currentUser?.username || "admin"}</div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Protected HTTPS &amp; Socket Session</p>
                </div>

                {/* 3. Team Member Accounts */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-violet-50 border border-violet-200/60 text-violet-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                      {portalUsers.length} Accounts
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Portal Team Size</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {portalUsers.filter(u => u.role === "admin").length} Admins • {portalUsers.filter(u => u.role !== "admin").length} Staff
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Role-Based Access Control (RBAC)</p>
                </div>

                {/* 4. Database Sync */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      Live
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Storage Engine</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">MongoDB Atlas</div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Real-time synchronized persistence</p>
                </div>
              </div>

              {/* Main Content Grid: Left (User Directory) + Right (Create Team Member & Profile) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ── LEFT COLUMN: Team Directory (7 Cols) ── */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-slate-900">Portal Team Accounts</h3>
                          <span className="px-2.5 py-0.5 bg-blue-50 text-[#005CE6] text-[11px] font-black rounded-full border border-blue-100">
                            {filteredPortalUsers.length}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Authorized team members with access to Upfront AC Dashboard
                        </p>
                      </div>

                      <button
                        onClick={() => getPortalUsers().then(setPortalUsers)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                        title="Reload users from MongoDB"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh</span>
                      </button>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="pt-4 pb-4 flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          placeholder="Search accounts by username or role..."
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#005CE6] focus:ring-2 focus:ring-[#005CE6]/10 outline-none transition"
                        />
                        {userSearch && (
                          <button
                            onClick={() => setUserSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Role Filter Tabs */}
                      <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl shrink-0 overflow-x-auto">
                        {[
                          { id: "all", label: "All" },
                          { id: "admin", label: "Admins" },
                          { id: "editor", label: "Dispatchers" },
                          { id: "viewer", label: "Viewers" }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setUserRoleFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                              userRoleFilter === tab.id
                                ? "bg-white text-[#005CE6] shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Users List / Table */}
                    <div className="space-y-3 pt-2">
                      {filteredPortalUsers.length === 0 ? (
                        <div className="text-center py-12 px-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                          <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-xs font-bold text-slate-700">No portal accounts found</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Try searching with a different username or role filter.</p>
                          {userSearch && (
                            <button
                              onClick={() => { setUserSearch(""); setUserRoleFilter("all"); }}
                              className="mt-3 text-xs font-extrabold text-[#005CE6] hover:underline"
                            >
                              Clear Search Filter
                            </button>
                          )}
                        </div>
                      ) : (
                        filteredPortalUsers.map((user) => {
                          const isCurrentUser = currentUser?.id === user.id || currentUser?.username === user.username;
                          const isRootAdmin = user.username === "admin";
                          const initials = user.username.slice(0, 2).toUpperCase();

                          const roleBadgeStyle =
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-200/80"
                              : user.role === "editor"
                              ? "bg-sky-50 text-sky-700 border-sky-200/80"
                              : "bg-slate-100 text-slate-700 border-slate-200/80";

                          const roleAvatarStyle =
                            user.role === "admin"
                              ? "from-purple-600 to-indigo-600 ring-purple-200"
                              : user.role === "editor"
                              ? "from-[#005CE6] to-cyan-500 ring-blue-200"
                              : "from-slate-600 to-slate-800 ring-slate-200";

                          return (
                            <div
                              key={user.id}
                              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                isCurrentUser
                                  ? "bg-blue-50/40 border-blue-200/80 shadow-xs"
                                  : "bg-slate-50/50 hover:bg-slate-50 border-slate-200/70"
                              }`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${roleAvatarStyle} text-white font-black text-sm flex items-center justify-center shadow-xs ring-2`}>
                                    {initials}
                                  </div>
                                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Active Account" />
                                </div>

                                {/* Info */}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-black text-sm text-slate-900 truncate">
                                      {user.username}
                                    </span>
                                    {isCurrentUser && (
                                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-full shadow-xs">
                                        You (Active)
                                      </span>
                                    )}
                                    {isRootAdmin && (
                                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-black rounded-full border border-amber-200">
                                        Root System
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${roleBadgeStyle}`}>
                                      {user.role === "editor" ? "Dispatcher / Editor" : user.role}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium">
                                      ID: {user.id.slice(0, 10)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                {currentUser?.role === "admin" && (
                                  <button
                                    onClick={() => handleOpenEditUser(user)}
                                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-xs flex items-center gap-1.5 transition cursor-pointer"
                                    title="Edit account credentials and role"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Edit</span>
                                  </button>
                                )}

                                {!isRootAdmin && !isCurrentUser && currentUser?.role === "admin" && (
                                  <button
                                    onClick={() => handleDeleteUser(user.id, user.username)}
                                    className="p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 shadow-xs transition cursor-pointer"
                                    title="Remove account permanently"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: Create Team Account & Personal Profile (5 Cols) ── */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Create New Team Member Account (Admin only) */}
                  {currentUser?.role === "admin" && (
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#005CE6] flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900">Add Team Member</h3>
                          <p className="text-[11px] text-slate-400 font-medium">Provision new staff account for Upfront portal</p>
                        </div>
                      </div>

                      <form onSubmit={handleCreateUser} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-slate-700">Account Username *</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. dispatcher_sarah"
                              value={addUsername}
                              onChange={(e) => setAddUsername(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] focus:ring-2 focus:ring-[#005CE6]/10 outline-none transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-slate-700">Initial Password *</label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type={showAddPassword ? "text" : "password"}
                              required
                              placeholder="Minimum 6 characters"
                              value={addPassword}
                              onChange={(e) => setAddPassword(e.target.value)}
                              className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] focus:ring-2 focus:ring-[#005CE6]/10 outline-none transition"
                            />
                            <button
                              type="button"
                              onClick={() => setShowAddPassword(!showAddPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showAddPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-slate-700">Access Role &amp; Permissions</label>
                          <div className="relative">
                            <select
                              value={addRole}
                              onChange={(e) => setAddRole(e.target.value as any)}
                              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#005CE6] outline-none transition appearance-none cursor-pointer"
                            >
                              <option value="editor">Dispatcher / Editor (Leads &amp; Chats)</option>
                              <option value="admin">Administrator (Full Access)</option>
                              <option value="viewer">Viewer (Read-Only Access)</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Role Description Helper */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-[11px] text-slate-500 font-medium">
                          {addRole === "admin" && "👑 Full access to all portal data, database operations, team accounts, and site settings."}
                          {addRole === "editor" && "🎧 Can respond to live chats, review web inquiries, manage dispatch leads, and view reviews."}
                          {addRole === "viewer" && "👁️ Read-only dashboard view. Cannot edit leads, dispatch chats, or alter settings."}
                        </div>

                        <button
                          type="submit"
                          disabled={isCreatingUser}
                          className="w-full py-3 bg-gradient-to-r from-[#005CE6] to-[#0047B3] hover:from-[#0066FF] hover:to-[#0052CC] text-white text-xs font-extrabold rounded-2xl shadow-md shadow-[#005CE6]/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isCreatingUser ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Create Team Account</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Update My Account Security / Credentials */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">My Profile &amp; Password</h3>
                        <p className="text-[11px] text-slate-400 font-medium">Update credentials for your logged-in session ({currentUser?.username})</p>
                      </div>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-700">Display Username</label>
                        <input
                          type="text"
                          required
                          value={updateUsername}
                          onChange={(e) => setUpdateUsername(e.target.value)}
                          placeholder="e.g. admin"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] outline-none transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-700">New Password</label>
                        <div className="relative">
                          <input
                            type={showUpdatePassword ? "text" : "password"}
                            placeholder="Leave blank to keep unchanged"
                            value={updatePassword}
                            onChange={(e) => setUpdatePassword(e.target.value)}
                            className="w-full px-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] outline-none transition"
                          />
                          <button
                            type="button"
                            onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showUpdatePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {updatePassword && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-extrabold text-slate-700">Confirm New Password</label>
                            <input
                              type={showUpdatePassword ? "text" : "password"}
                              placeholder="Re-enter new password"
                              value={updatePasswordConfirm}
                              onChange={(e) => setUpdatePasswordConfirm(e.target.value)}
                              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] outline-none transition"
                            />
                          </div>

                          {/* Password Strength Indicator */}
                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-slate-500">Password Strength</span>
                              <span className={
                                updatePassword.length >= 10 && /[0-9]/.test(updatePassword) && /[^A-Za-z0-9]/.test(updatePassword)
                                  ? "text-emerald-600 font-black"
                                  : updatePassword.length >= 8
                                  ? "text-blue-600 font-black"
                                  : "text-amber-600 font-black"
                              }>
                                {updatePassword.length >= 10 && /[0-9]/.test(updatePassword) && /[^A-Za-z0-9]/.test(updatePassword)
                                  ? "Strong / Secure"
                                  : updatePassword.length >= 8
                                  ? "Good"
                                  : "Weak (add numbers/symbols)"}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  updatePassword.length >= 10 && /[0-9]/.test(updatePassword) && /[^A-Za-z0-9]/.test(updatePassword)
                                    ? "w-full bg-emerald-500"
                                    : updatePassword.length >= 8
                                    ? "w-2/3 bg-blue-500"
                                    : "w-1/3 bg-amber-500"
                                }`}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-2xl shadow-md transition cursor-pointer"
                      >
                        Update Security Credentials
                      </button>
                    </form>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* ── ADD LEAD MODAL ── */}
      <AnimatePresence>
        {isAddingLead && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h3 className="font-black text-base text-slate-900">Add New HVAC Dispatch Lead</h3>
                <button onClick={() => setIsAddingLead(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCustomLead} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. Robert Smith"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      placeholder="(713) 000-0000"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      placeholder="client@email.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Service Location Address</label>
                  <input
                    type="text"
                    value={newLeadAddress}
                    onChange={(e) => setNewLeadAddress(e.target.value)}
                    placeholder="12345 Spring Cypress Rd, Cypress, TX"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Service Type</label>
                    <select
                      value={newLeadType}
                      onChange={(e) => setNewLeadType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    >
                      <option value="residential">Residential AC Repair</option>
                      <option value="heating">Heating / Furnace</option>
                      <option value="install">HVAC Replacement</option>
                      <option value="maintenance">Seasonal Tune-Up</option>
                      <option value="commercial">Commercial HVAC</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Estimated Value ($)</label>
                    <input
                      type="number"
                      value={newLeadVal}
                      onChange={(e) => setNewLeadVal(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Notes / Problem Description</label>
                  <textarea
                    rows={2}
                    value={newLeadDesc}
                    onChange={(e) => setNewLeadDesc(e.target.value)}
                    placeholder="Customer reported AC blowing warm air in Tomball..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingLead(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold shadow-md cursor-pointer"
                  >
                    Save Lead Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── EDIT LEAD MODAL ── */}
      <AnimatePresence>
        {isEditingLead && selectedLead && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="font-black text-base text-slate-900">Lead & Dispatch Details: {selectedLead.name}</h3>
                  <span className="text-xs text-slate-400">ID: {selectedLead.id} · Created {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recently"}</span>
                </div>
                <button onClick={() => setIsEditingLead(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Customer Name *</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Service Location Address</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Service Type</label>
                    <select
                      value={editProjectType}
                      onChange={(e) => setEditProjectType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    >
                      <option value="residential">Residential AC Repair</option>
                      <option value="heating">Heating / Furnace</option>
                      <option value="install">HVAC Replacement</option>
                      <option value="maintenance">Seasonal Tune-Up</option>
                      <option value="commercial">Commercial HVAC</option>
                      <option value="indoor_air_quality">Air Quality / IAQ</option>
                      <option value="emergency">24/7 Emergency AC</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Estimated Value ($)</label>
                    <input
                      type="number"
                      value={editEstimatedValue}
                      onChange={(e) => setEditEstimatedValue(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="consultation_scheduled">Scheduled</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="won">Won Job</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Customer Problem Description / Request</label>
                  <textarea
                    rows={2}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Customer inquiry details or notes submitted from form..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Technician Dispatch Notes & Parts</label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Enter inspection findings, capacitor/refrigerant levels, diagnostic codes, scheduled technician..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                  />
                </div>

                {/* Photo Attachments */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold text-slate-700 block">Job Photos & Diagnostics</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.photos?.map((photo, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={photo} alt="Lead Attachment" className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleRemovePhoto(selectedLead.id, idx)}
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <label className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#005CE6] flex flex-col items-center justify-center text-slate-400 hover:text-[#005CE6] cursor-pointer transition">
                      <Plus className="w-4 h-4" />
                      <span className="text-[9px] font-bold">Add</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadPhoto(e, selectedLead.id)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingLead(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLeadDetails}
                    className="px-6 py-2.5 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── GOOGLE PLACES API SYNC MODAL ── */}
      <AnimatePresence>
        {isSyncingGoogleModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center p-1.5 border border-blue-100">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">Google Places Reviews Sync</h3>
                    <span className="text-[11px] font-bold text-slate-400">Automated Google Business Profile Integration</span>
                  </div>
                </div>
                <button onClick={() => setIsSyncingGoogleModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSyncGoogleReviews} className="space-y-4">
                <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
                  <span className="font-extrabold text-[#005CE6] block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> How this sync works:
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Connects directly to your Google Business Profile via Google Places API to fetch verified 5-star ratings, reviewer profile pictures, and timestamps without duplicates.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700">Google Place ID *</label>
                    <a
                      href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#005CE6] hover:underline flex items-center gap-1"
                    >
                      <span>Find your Place ID</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ChIJgUbEo8cfqokR5lP9_WhZeWA"
                    value={googlePlaceId}
                    onChange={(e) => setGooglePlaceId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 block">Search "Upfront Air Conditioning & Heating" on Google Place ID Finder.</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700">Google Cloud Places API Key *</label>
                    <a
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#005CE6] hover:underline flex items-center gap-1"
                    >
                      <span>Google Cloud Console</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="AIzaSy..."
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 block">Saved securely and used to fetch live reviews from Google.</span>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsSyncingGoogleModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSyncingGoogle}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isSyncingGoogle ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Syncing with Google...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Sync Reviews Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ADD REVIEW MODAL ── */}
      <AnimatePresence>
        {isAddingReview && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h3 className="font-black text-base text-slate-900">Add Verified Customer Review</h3>
                <button onClick={() => setIsAddingReview(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Author Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Cypress, TX"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Review Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Best HVAC repair service in Houston!"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Review Testimonial Text *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write client testimonial..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${star <= newReviewRating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold shadow-md cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── REVIEW REPLY MODAL ── */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h3 className="font-black text-base text-slate-900">Reply to {selectedReview.author}</h3>
                <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-600 italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  "{selectedReview.text}"
                </p>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Your Official Response (Shown on Website)</label>
                  <textarea
                    rows={3}
                    placeholder="Thank you for trusting Upfront A/C & Heating with your home comfort..."
                    value={reviewReplyText}
                    onChange={(e) => setReviewReplyText(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedReview(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveReviewReply}
                    className="px-6 py-2.5 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold shadow-md cursor-pointer"
                  >
                    Save & Publish Reply
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── PHOTO LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={lightboxPhoto}
              alt="High-Res Project View"
              className="max-w-4xl max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── UNIVERSAL CONFIRMATION DIALOG ── */}
      <AnimatePresence>
        {confirmConfig && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">{confirmConfig.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{confirmConfig.message}</p>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setConfirmConfig(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmConfig.onConfirm();
                    setConfirmConfig(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md cursor-pointer"
                >
                  {confirmConfig.confirmText || "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── EDIT PORTAL USER MODAL ── */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#005CE6] flex items-center justify-center">
                    <Edit2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">Edit Account</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{editingUser.username}</p>
                  </div>
                </div>
                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditUserSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Account Username</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={editUserUsername}
                      onChange={(e) => setEditUserUsername(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Reset Password (Optional)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showEditPassword ? "text" : "password"}
                      placeholder="Leave blank to keep existing"
                      value={editUserPassword}
                      onChange={(e) => setEditUserPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:bg-white focus:border-[#005CE6] outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showEditPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Access Role &amp; Permissions</label>
                  <div className="relative">
                    <select
                      value={editUserRole}
                      disabled={editingUser.username === "admin"}
                      onChange={(e) => setEditUserRole(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#005CE6] outline-none transition appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="editor">Dispatcher / Editor (Leads &amp; Chats)</option>
                      <option value="admin">Administrator (Full Access)</option>
                      <option value="viewer">Viewer (Read-Only Access)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {editingUser.username === "admin" && (
                    <p className="text-[10px] text-amber-600 font-bold mt-1">
                      Root administrator role is permanent and cannot be downgraded.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingUserEdit}
                    className="px-6 py-2.5 rounded-2xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold shadow-md shadow-[#005CE6]/20 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSavingUserEdit ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
