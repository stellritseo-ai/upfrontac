import { useState, useEffect, useMemo, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { io } from "socket.io-client";
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
  ChevronLeft
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
  GalleryPhoto,
  PortalUser,
  DashboardNotification
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
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addRole, setAddRole] = useState<"admin" | "editor" | "viewer">("viewer");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modals & Forms
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editEstimatedValue, setEditEstimatedValue] = useState(0);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<Lead["status"]>("new");

  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadAddress, setNewLeadAddress] = useState("");
  const [newLeadType, setNewLeadType] = useState("residential");
  const [newLeadDesc, setNewLeadDesc] = useState("");
  const [newLeadVal, setNewLeadVal] = useState(2500);

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

  const [selectedEmail, setSelectedEmail] = useState<WebEmail | null>(null);
  const [isViewingEmail, setIsViewingEmail] = useState(false);

  // Portal & Site Config States
  const [alertEmail, setAlertEmail] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_alertEmail") : null) || "allen@upfrontac.com");
  const [officePhone, setOfficePhone] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_officePhone") : null) || "(713) 819-7908");
  const [smsTemplate, setSmsTemplate] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_smsTemplate") : null) || "Hi {Name}, thank you for choosing Upfront Air Conditioning & Heating! A Texas licensed technician will contact you during the {Time} window regarding your {Type} service.");
  const [emailAlert, setEmailAlert] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_emailAlert") !== "false" : true));
  const [smsAlert, setSmsAlert] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_smsAlert") !== "false" : true));
  const [maintenanceMode, setMaintenanceMode] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_maintenanceMode") === "true" : false));
  const [weekdays, setWeekdays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_weekdays") : null) || "9:00 AM - 6:30 PM");
  const [saturdays, setSaturdays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_saturdays") : null) || "9:00 AM - 6:30 PM");
  const [sundays, setSundays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("upfront_settings_sundays") : null) || "24/7 Emergency Dispatch");

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
          setSmsTemplate(settings.smsTemplate || "");
          setEmailAlert(settings.emailAlert);
          setSmsAlert(settings.smsAlert);
          setMaintenanceMode(settings.maintenanceMode);
          setWeekdays(settings.weekdays || "9:00 AM - 6:30 PM");
          setSaturdays(settings.saturdays || "9:00 AM - 6:30 PM");
          setSundays(settings.sundays || "24/7 Emergency Dispatch");
        }
      });
      if (currentUser?.role === "admin") {
        getPortalUsers().then(setPortalUsers);
      }
    }
  }, [isAuthenticated, activeTab, currentUser]);

  const socketRef = useRef<any>(null);

  // WebSocket Live Sync for Chats & Real-Time Alerts
  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = io({
      transports: ["websocket", "polling"],
      autoConnect: true
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("⚡ [Socket.io] Upfront Admin Console Connected");
      if (activeSessionId) {
        socket.emit("join-session", activeSessionId);
      }
    });

    socket.on("session-created", (data: { sessionId: string; clientName: string }) => {
      getChatSessions().then(setChatSessions);
      getNotifications().then(setNotifications);
      toast.info(`New live chat from ${data.clientName}`);
    });

    socket.on("new-chat-message", (msg: { sessionId: string; id: string; sender: "client" | "admin"; text: string; timestamp: string }) => {
      setChatSessions((prev) => {
        const updated = prev.map((session) => {
          if (session.id === msg.sessionId) {
            const exists = session.messages.some((m) => m.id === msg.id);
            const messages = exists ? session.messages : [...session.messages, {
              id: msg.id,
              sender: msg.sender,
              text: msg.text,
              timestamp: msg.timestamp
            }];

            return {
              ...session,
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
        toast.message("Client Message Received", {
          description: `"${msg.text}"`,
        });
      }
    });

    socket.on("new-notification", (notification: DashboardNotification) => {
      setNotifications((prev) => {
        if (prev.some((n) => n.id === notification.id)) return prev;
        return [notification, ...prev];
      });

      if (notification.type === "form_submission") {
        toast.message(notification.title, {
          description: notification.message,
          action: {
            label: "View Email",
            onClick: () => setActiveTab("emails")
          }
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, activeSessionId, activeTab]);

  // Polling fallback for chat and notifications
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      getNotifications().then(notifs => {
        if (Array.isArray(notifs)) setNotifications(notifs);
      });
      if (activeTab === "chat") {
        getChatSessions().then(sessions => {
          if (Array.isArray(sessions)) setChatSessions(sessions);
        });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  const activeChatSession = useMemo(() => {
    return chatSessions.find((s) => s.id === activeSessionId) || null;
  }, [chatSessions, activeSessionId]);

  // Auto scroll chat
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatSession?.messages]);

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

  const handleLogout = () => {
    localStorage.removeItem("electrical-session-token");
    setIsAuthenticated(false);
    navigate({ to: "/dashboard/login" });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const res = await updateUserCredentials(currentUser.id, updateUsername, updatePassword);
      if (res.success) {
        toast.success("Security credentials updated successfully!");
        setCurrentUser((prev) => prev ? { ...prev, username: res.username } : null);
        setUpdatePassword("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSiteSettings({
        alertEmail,
        officePhone,
        smsTemplate,
        emailAlert,
        smsAlert,
        maintenanceMode,
        weekdays,
        saturdays,
        sundays
      });
      toast.success("Operational settings updated successfully!");
    } catch {
      toast.error("Failed to save operational settings.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addUsername.trim() || !addPassword.trim()) {
      toast.error("Username and password are required.");
      return;
    }
    try {
      const res = await createPortalUser(addUsername, addPassword, addRole);
      if (res.success) {
        toast.success(`User account '${res.username}' created.`);
        setAddUsername("");
        setAddPassword("");
        setAddRole("viewer");
        getPortalUsers().then(setPortalUsers);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create portal user.");
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
      message: `Are you sure you want to remove user account '${username}'?`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const res = await deletePortalUser(userId);
          if (res.success) {
            toast.success("User account deleted.");
            getPortalUsers().then(setPortalUsers);
          }
        } catch {
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  // Lead Handlers
  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditEstimatedValue(lead.estimatedValue);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setIsEditingLead(true);
  };

  const handleSaveLeadDetails = async () => {
    if (!selectedLead) return;
    try {
      const updated = await updateLeadDetails(selectedLead.id, {
        estimatedValue: editEstimatedValue,
        status: editStatus,
        notes: editNotes
      });
      if (updated) {
        setLeads(updated);
        toast.success("Lead details updated.");
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
      message: `Are you sure you want to delete the lead record for "${name}"?`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
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
    if (!newLeadName.trim()) return;
    try {
      await addCustomLead({
        name: newLeadName,
        email: newLeadEmail,
        phone: newLeadPhone,
        address: newLeadAddress,
        projectType: newLeadType,
        description: newLeadDesc,
        status: "new",
        estimatedValue: newLeadVal,
        contactTime: "anytime"
      });
      toast.success("New HVAC dispatch lead created successfully.");
      setIsAddingLead(false);
      setNewLeadName("");
      setNewLeadEmail("");
      setNewLeadPhone("");
      setNewLeadAddress("");
      setNewLeadDesc("");
      setNewLeadVal(2500);
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
    const updated = await markChatAsRead(id);
    setChatSessions(updated);
    if (socketRef.current) {
      socketRef.current.emit("join-session", id);
    }
  };

  const handleSendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSessionId || !adminReplyText.trim()) return;
    try {
      const updated = await sendChatMessage(activeSessionId, "admin", adminReplyText);
      if (updated) {
        setChatSessions(prev => [...prev.map(s => s.id === activeSessionId ? updated : s)].sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()));
        setAdminReplyText("");
        
        const lastMsg = updated.messages[updated.messages.length - 1];
        if (socketRef.current) {
          socketRef.current.emit("send-message", {
            ...lastMsg,
            sessionId: activeSessionId
          });
        }
      }
    } catch {
      toast.error("Failed to send chat reply.");
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

    try {
      for (let i = 0; i < filesCount; i++) {
        const file = selectedGalleryFiles[i];
        const segmentStart = (i / filesCount) * 100;
        const segmentEnd = ((i + 1) / filesCount) * 100;
        setGalleryUploadProgress(Math.floor(segmentStart));

        const updated = await uploadGalleryPhoto(file, uploadCategory);
        currentPhotosList = updated;

        setGalleryUploadProgress(Math.floor(segmentEnd));
      }

      setGalleryPhotos(currentPhotosList);
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
      setSelectedGalleryFiles([]);
      toast.success(`Successfully uploaded ${filesCount} photos to Cloudinary CDN.`);
    } catch {
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
      toast.error("Failed to complete upload. Please check Cloudinary connection.");
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

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesType = typeFilter === "all" || lead.projectType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leads, searchTerm, statusFilter, typeFilter]);

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
      
      {/* ── LEFT SIDEBAR NAVIGATION ── */}
      <aside className="w-72 bg-[#060B18] text-white flex flex-col justify-between p-5 sticky top-0 h-screen z-40 border-r border-slate-800 shadow-2xl shrink-0 overflow-hidden">
        
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
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Upfront Command</span>
              <span>/</span>
              <span className="text-[#005CE6]">{activeTab}</span>
            </div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight capitalize mt-0.5">
              {activeTab === "overview" && "Executive Overview & Metrics"}
              {activeTab === "leads" && "HVAC Service Leads & Dispatch Pipeline"}
              {activeTab === "reviews" && "Customer Reviews & Reputation Moderator"}
              {activeTab === "gallery" && "Cloud Media Showcase & Installation Gallery"}
              {activeTab === "chat" && "Live Website Visitor Chat & Conversations"}
              {activeTab === "emails" && "Contact Form Inquiries & Messages"}
              {activeTab === "settings" && "Operations & Alert Configurations"}
              {activeTab === "security" && "Portal Access & User Management"}
            </h1>
          </div>

          {/* Topbar Right Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Input */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads, phone, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 focus:border-[#005CE6] w-64 transition-all"
              />
            </div>

            {/* Live Chat Drawer Indicator */}
            <button
              onClick={() => setActiveTab("chat")}
              className={`p-2.5 rounded-full border transition-all relative cursor-pointer ${
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
                        <TrendingUp className="w-3 h-3" /> +18.4%
                      </span>
                      <span className="text-slate-400 font-medium text-[11px]">vs last month</span>
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
                        {leads.length} Total Captured
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric 3: Closed / Won Jobs */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Won HVAC Jobs</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">{analytics.wonCount}</span>
                    <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 text-[11px]">
                        {analytics.conversionRate}% Win Rate
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
                      <span className="px-3 py-1 text-slate-400">Monthly Forecast</span>
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
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center shrink-0 font-black text-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-sm text-slate-900">{lead.name}</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              lead.status === "new" ? "bg-amber-100 text-amber-800" :
                              lead.status === "won" ? "bg-emerald-100 text-emerald-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {lead.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1 flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lead.address || "Houston, TX"}
                            </span>
                            <span>•</span>
                            <span className="text-[#005CE6] font-bold capitalize">{lead.projectType} Service</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="text-sm font-black text-slate-900">${lead.estimatedValue.toLocaleString()}</span>
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
              {/* Header Controls & Filters */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* Search & Filter Inputs */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, phone, address..."
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
                    <option value="all">All Statuses</option>
                    <option value="new">New Inquiry</option>
                    <option value="contacted">Contacted</option>
                    <option value="consultation_scheduled">Scheduled</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won Job</option>
                    <option value="lost">Lost</option>
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Services</option>
                    <option value="residential">Residential AC</option>
                    <option value="heating">Heating / Furnace</option>
                    <option value="install">HVAC Installation</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="commercial">Commercial HVAC</option>
                  </select>
                </div>

                {/* Add Lead Button */}
                <button
                  onClick={() => setIsAddingLead(true)}
                  className="w-full md:w-auto px-5 py-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white rounded-2xl text-xs font-extrabold shadow-md shadow-[#005CE6]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
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
                        <th className="py-4 px-6">Client / Location</th>
                        <th className="py-4 px-4">Contact Info</th>
                        <th className="py-4 px-4">Service Type</th>
                        <th className="py-4 px-4">Est. Value</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                            No HVAC leads match the current filters.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            
                            {/* Client & Address */}
                            <td className="py-4 px-6">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#005CE6] flex items-center justify-center font-black text-xs shrink-0">
                                  {lead.name.charAt(0)}
                                </div>
                                <div>
                                  <span className="font-extrabold text-slate-900 block">{lead.name}</span>
                                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                    {lead.address || "Houston, TX"}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Contact Info */}
                            <td className="py-4 px-4">
                              <div className="space-y-0.5">
                                <a href={`tel:${lead.phone}`} className="text-slate-800 font-bold hover:text-[#005CE6] block">
                                  {lead.phone}
                                </a>
                                <a href={`mailto:${lead.email}`} className="text-[11px] text-slate-400 hover:underline block">
                                  {lead.email}
                                </a>
                              </div>
                            </td>

                            {/* Service Type */}
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] capitalize">
                                {lead.projectType}
                              </span>
                            </td>

                            {/* Value */}
                            <td className="py-4 px-4 font-black text-slate-900">
                              ${lead.estimatedValue.toLocaleString()}
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
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden h-[660px] grid grid-cols-1 md:grid-cols-12"
            >
              {/* Left Pane: Sessions List */}
              <div className="md:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
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
                              <span className="font-extrabold text-xs text-slate-900 truncate">
                                {session.clientName || "Website Visitor"}
                              </span>
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
              <div className="md:col-span-8 flex flex-col h-full bg-white">
                {activeChatSession ? (
                  <>
                    {/* Active Chat Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#005CE6] text-white font-black text-sm flex items-center justify-center">
                          {activeChatSession.clientName?.charAt(0) || "V"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900">{activeChatSession.clientName}</h4>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              {activeChatSession.clientCity || "Tomball, TX"}
                            </span>
                          </div>
                          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active Visitor Session
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeChatSession.clientPhone && (
                          <a
                            href={`tel:${activeChatSession.clientPhone}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005CE6] bg-blue-50 hover:bg-blue-100 border border-blue-200/60 px-3 py-1.5 rounded-xl transition"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{activeChatSession.clientPhone}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Messages Thread */}
                    <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-[#F8FAFC]">
                      {activeChatSession.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col ${m.sender === "admin" ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                              m.sender === "admin"
                                ? "bg-[#005CE6] text-white rounded-br-none shadow-md shadow-[#005CE6]/20 font-medium"
                                : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-xs font-medium"
                            }`}
                          >
                            {m.text}
                          </div>
                          <span className="text-[9px] text-slate-400 font-semibold mt-1 px-1">
                            {m.sender === "admin" ? "Upfront AC Dispatch" : activeChatSession.clientName} · {formatChatTime(m.timestamp)}
                          </span>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Quick Canned Replies */}
                    <div className="px-4 pt-3 pb-1 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
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
                    <form onSubmit={handleSendChatReply} className="p-4 border-t border-slate-200 flex gap-3 bg-white">
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
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">Website Contact Form Submissions</h3>
                  <p className="text-xs text-slate-400 font-medium">Inquiries received through the public contact & free estimate forms</p>
                </div>
                <span className="text-xs font-bold text-[#005CE6] bg-blue-50 px-3 py-1 rounded-full">
                  {webEmails.length} Submissions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {webEmails.map((email) => (
                  <div key={email.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-extrabold text-sm text-slate-900">{email.name}</span>
                        <span className="text-[10px] text-slate-400">{new Date(email.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[11px] font-black text-[#005CE6] uppercase tracking-wider block mt-1">
                        Service: {email.service || "General HVAC Request"}
                      </span>
                      <p className="text-xs text-slate-600 font-medium mt-3 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        "{email.message || "No detailed message provided."}"
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs">
                        {email.phone && (
                          <a href={`tel:${email.phone}`} className="font-bold text-slate-800 hover:text-[#005CE6]">
                            {email.phone}
                          </a>
                        )}
                        <a href={`mailto:${email.email}`} className="text-slate-500 hover:underline">
                          {email.email}
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteEmail(email.id)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-500 text-slate-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-4xl"
            >
              <h3 className="text-base font-black text-slate-900 mb-1">HVAC Dispatch & Alert Settings</h3>
              <p className="text-xs text-slate-400 font-medium mb-6">Manage automated client communications, alert emails, and operating hours</p>

              <form onSubmit={handleSaveConfig} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Alert Notification Email</label>
                    <input
                      type="email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Dispatch Office Phone</label>
                    <input
                      type="text"
                      value={officePhone}
                      onChange={(e) => setOfficePhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Automated SMS Response Template</label>
                  <textarea
                    rows={3}
                    value={smsTemplate}
                    onChange={(e) => setSmsTemplate(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005CE6]/30 leading-relaxed"
                  />
                  <span className="text-[10px] text-slate-400 font-medium">Available tags: {'{Name}'}, {'{Time}'}, {'{Type}'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Monday - Friday</label>
                    <input
                      type="text"
                      value={weekdays}
                      onChange={(e) => setWeekdays(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Saturday</label>
                    <input
                      type="text"
                      value={saturdays}
                      onChange={(e) => setSaturdays(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Sunday / Emergencies</label>
                    <input
                      type="text"
                      value={sundays}
                      onChange={(e) => setSundays(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-[#005CE6]/30 transition-all cursor-pointer"
                >
                  Save Operational Settings
                </button>
              </form>
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
              className="space-y-8 max-w-4xl"
            >
              {/* Update Current Credentials */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                <h3 className="text-base font-black text-slate-900 mb-1">Update Admin Password</h3>
                <p className="text-xs text-slate-400 font-medium mb-6">Modify login credentials for your active account ({currentUser?.username})</p>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Username</label>
                    <input
                      type="text"
                      required
                      value={updateUsername}
                      onChange={(e) => setUpdateUsername(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={updatePassword}
                      onChange={(e) => setUpdatePassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold rounded-2xl shadow-md transition cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Add New Portal User */}
              {currentUser?.role === "admin" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                  <h3 className="text-base font-black text-slate-900 mb-1">Create Team Account</h3>
                  <p className="text-xs text-slate-400 font-medium mb-6">Grant dashboard access to dispatchers, technicians, or office managers</p>

                  <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <input
                      type="text"
                      required
                      placeholder="Username"
                      value={addUsername}
                      onChange={(e) => setAddUsername(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={addPassword}
                      onChange={(e) => setAddPassword(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                    <div className="flex gap-2">
                      <select
                        value={addRole}
                        onChange={(e) => setAddRole(e.target.value as any)}
                        className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex-1"
                      >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Dispatcher / Editor</option>
                        <option value="admin">Administrator</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold rounded-xl shrink-0 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </form>

                  {/* Existing Users List */}
                  <div className="divide-y divide-slate-100 border-t border-slate-100 pt-4">
                    {portalUsers.map((u) => (
                      <div key={u.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-xs text-slate-900">{u.username}</span>
                          <span className="text-[10px] font-bold text-[#005CE6] uppercase ml-2 bg-blue-50 px-2 py-0.5 rounded-md">
                            {u.role}
                          </span>
                        </div>
                        {u.username !== "admin" && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.username)}
                            className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="font-black text-base text-slate-900">Lead Details: {selectedLead.name}</h3>
                  <span className="text-xs text-slate-400">{selectedLead.phone} • {selectedLead.address}</span>
                </div>
                <button onClick={() => setIsEditingLead(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
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
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="consultation_scheduled">Consultation Scheduled</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="won">Won Job</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Technician Dispatch Notes</label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Enter inspection results, capacitor replacements, part numbers..."
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

    </div>
  );
}
