import {
  dbGetLeads,
  dbAddLead,
  dbUpdateLead,
  dbDeleteLead,
  dbGetReviews,
  dbAddReview,
  dbUpdateReview,
  dbDeleteReview,
  dbGetWebEmails,
  dbAddWebEmail,
  dbDeleteWebEmail,
  dbGetChatSessions,
  dbSaveChatSession,
  dbGetGalleryPhotos,
  dbAddGalleryPhoto,
  dbRemoveGalleryPhoto,
  dbGetPortalUsers,
  dbAddPortalUser,
  dbDeletePortalUser,
  dbUpdatePortalUser,
  dbGetSettings,
  dbSaveSettings,
  getDb,
  dbGetNotifications,
  dbAddNotification,
  dbMarkNotificationRead,
  dbMarkAllNotificationsRead,
  dbClearAllNotifications
} from "./db.server.js";

import {
  INITIAL_REVIEWS,
} from "./leads-store.js";

import { uploadToCloudinary, deleteFromCloudinary, listCloudinaryPhotos } from "./cloudinary.server.js";
import { hashPassword, verifyPassword } from "./crypto.server.js";

const DEFAULT_ADMIN = {
  id: "admin-1",
  username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
  role: "admin",
  password: process.env.DEFAULT_ADMIN_PASSWORD || "admin123"
};

// Helper to construct JSON responses
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

// ── UNIFIED API REQUEST DISPATCHER (Web Standards) ──
export async function handleApiRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (!pathname.startsWith("/api/")) return null;

  const method = request.method;

  try {
    // ── /api/leads ──
    if (pathname === "/api/leads") {
      if (method === "GET") {
        try {
          const leads = await dbGetLeads([]);
          (globalThis as any).__serverLeads = leads;
          return jsonResponse(leads);
        } catch (dbErr) {
          console.warn("MongoDB leads fetch error, using in-memory store:", dbErr);
          if (!(globalThis as any).__serverLeads) (globalThis as any).__serverLeads = [];
          return jsonResponse((globalThis as any).__serverLeads);
        }
      }
      if (method === "POST") {
        const body = await request.json();
        let savedLead: any = null;
        if (body.custom) {
          const newLead = {
            ...body.lead,
            id: "lead-" + Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            photos: body.lead.photos || []
          };
          try {
            savedLead = await dbAddLead(newLead);
          } catch (err) {
            console.warn("MongoDB lead custom add error:", err);
            savedLead = newLead;
          }
        } else {
          let estimatedValue = 450;
          const projType = body.leadData ? body.leadData.projectType : "residential";
          switch (projType) {
            case "install": estimatedValue = 8500; break;
            case "heating": estimatedValue = 650; break;
            case "maintenance": estimatedValue = 189; break;
            case "commercial": estimatedValue = 3500; break;
            case "indoor_air_quality": estimatedValue = 1200; break;
            case "emergency": estimatedValue = 550; break;
            case "residential":
            default:
              estimatedValue = 450; break;
          }
          const newLead = {
            ...body.leadData,
            id: "lead-" + Math.random().toString(36).substr(2, 9),
            status: "new",
            estimatedValue,
            createdAt: new Date().toISOString(),
            photos: []
          };
          try {
            savedLead = await dbAddLead(newLead);
          } catch (err) {
            console.warn("MongoDB lead add error:", err);
            savedLead = newLead;
          }
        }

        if (!(globalThis as any).__serverLeads) (globalThis as any).__serverLeads = [];
        (globalThis as any).__serverLeads.unshift(savedLead);

        const io = (global as any).io;
        if (io && savedLead) {
          io.emit("new-lead", savedLead);
        }
        return jsonResponse(savedLead);
      }
      if (method === "PUT") {
        const body = await request.json();
        let updated: any = null;
        try {
          updated = await dbUpdateLead(body.id, body.updates);
        } catch (dbErr) {
          console.warn("MongoDB lead update error:", dbErr);
          if ((globalThis as any).__serverLeads) {
            (globalThis as any).__serverLeads = (globalThis as any).__serverLeads.map((l: any) =>
              l.id === body.id ? { ...l, ...body.updates } : l
            );
            updated = (globalThis as any).__serverLeads;
          }
        }
        const io = (global as any).io;
        if (io) {
          io.emit("lead-updated", { id: body.id, updates: body.updates });
        }
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        let id = "";
        try {
          const body = await request.json();
          id = body.id;
        } catch {}
        if (!id) {
          id = url.searchParams.get("id") || "";
        }
        if (!id) {
          return jsonResponse({ error: "Missing lead ID" }, 400);
        }

        if ((globalThis as any).__serverLeads) {
          (globalThis as any).__serverLeads = (globalThis as any).__serverLeads.filter((l: any) => l.id !== id);
        }

        let updated: any = null;
        try {
          updated = await dbDeleteLead(id);
        } catch (dbErr) {
          console.warn("MongoDB lead delete error:", dbErr);
          updated = (globalThis as any).__serverLeads || [];
        }
        const io = (global as any).io;
        if (io) {
          io.emit("lead-deleted", { id });
        }
        return jsonResponse(updated);
      }
    }

    // ── /api/leads/photos ──
    if (pathname === "/api/leads/photos") {
      const body = await request.json();
      const db = await getDb();
      const leadsCol = db.collection("leads");

      if (method === "POST") {
        const url = await uploadToCloudinary(body.base64Photo, "electrical/leads");
        await leadsCol.updateOne({ id: body.leadId }, { $push: { photos: url } } as any);
      } else if (method === "DELETE") {
        const lead = await leadsCol.findOne({ id: body.leadId });
        if (lead && lead.photos) {
          const photos = [...lead.photos];
          const photoUrl = photos[body.photoIndex];
          if (photoUrl && photoUrl.includes("cloudinary.com")) {
            await deleteFromCloudinary(photoUrl);
          }
          photos.splice(body.photoIndex, 1);
          await leadsCol.updateOne({ id: body.leadId }, { $set: { photos } });
        }
      }
      const leads = await dbGetLeads([]);
      return jsonResponse(leads);
    }

    // ── /api/reviews ──
    if (pathname === "/api/reviews") {
      if (method === "GET") {
        const reviews = await dbGetReviews(INITIAL_REVIEWS);
        return jsonResponse(reviews);
      }
      if (method === "POST") {
        const body = await request.json();

        // ── SYNC FROM GOOGLE PLACES API ──
        if (body.action === "sync_google") {
          const apiKey = body.apiKey || process.env.GOOGLE_PLACES_API_KEY || process.env.VITE_GOOGLE_PLACES_API_KEY;
          const placeId = body.placeId || process.env.GOOGLE_PLACE_ID || process.env.VITE_GOOGLE_PLACE_ID;

          if (!apiKey || !placeId) {
            return jsonResponse({
              success: false,
              message: "Google Places API Key and Place ID are required. Please provide them in the modal or configure them in your .env file."
            }, 400);
          }

          try {
            let googleReviews: any[] = [];
            let businessName = "Upfront Air Conditioning & Heating";

            // Try New Google Places API first
            try {
              const newApiRes = await fetch(
                `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount,displayName&key=${apiKey}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "reviews,rating,userRatingCount,displayName"
                  }
                }
              );
              if (newApiRes.ok) {
                const data = await newApiRes.json();
                if (data.displayName?.text) businessName = data.displayName.text;
                if (Array.isArray(data.reviews)) {
                  googleReviews = data.reviews.map((r: any) => ({
                    author: r.authorAttribution?.displayName || "Google Reviewer",
                    authorPhoto: r.authorAttribution?.photoUri || "",
                    rating: r.rating || 5,
                    text: r.text?.text || r.originalText?.text || "Verified Google Review",
                    relativeTime: r.relativePublishTimeDescription || "Recent",
                    createdAt: r.publishTime || new Date().toISOString()
                  }));
                }
              }
            } catch (err) {
              console.warn("New Places API failed, attempting legacy details API:", err);
            }

            // Fallback to legacy Maps Place Details API if needed
            if (googleReviews.length === 0) {
              const legacyRes = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
              );
              if (legacyRes.ok) {
                const data = await legacyRes.json();
                if (data.result?.name) businessName = data.result.name;
                if (Array.isArray(data.result?.reviews)) {
                  googleReviews = data.result.reviews.map((r: any) => ({
                    author: r.author_name || "Google Reviewer",
                    authorPhoto: r.profile_photo_url || "",
                    rating: r.rating || 5,
                    text: r.text || "Verified Google Review",
                    relativeTime: r.relative_time_description || "Recent",
                    createdAt: r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString()
                  }));
                }
              }
            }

            if (googleReviews.length === 0) {
              return jsonResponse({
                success: false,
                message: "No reviews returned from Google Places API for this Place ID. Ensure the Place ID is correct and has public reviews enabled."
              }, 404);
            }

            // Get existing reviews to avoid duplicates
            const currentReviews = await dbGetReviews(INITIAL_REVIEWS);
            let addedCount = 0;

            for (const gRev of googleReviews) {
              const exists = currentReviews.some(
                (r) =>
                  r.author.toLowerCase() === gRev.author.toLowerCase() ||
                  (r.text && gRev.text && r.text.trim().substring(0, 30) === gRev.text.trim().substring(0, 30))
              );

              if (!exists) {
                const newReview = {
                  id: "review-g-" + Math.random().toString(36).substr(2, 9),
                  title: `${gRev.rating}★ Google Verified Review`,
                  text: gRev.text,
                  author: gRev.author,
                  location: "Google Verified Review",
                  rating: gRev.rating,
                  featured: true,
                  source: "google" as const,
                  authorPhoto: gRev.authorPhoto,
                  createdAt: gRev.createdAt,
                  photos: []
                };
                await dbAddReview(newReview);
                addedCount++;
              }
            }

            const updatedReviews = await dbGetReviews(INITIAL_REVIEWS);
            return jsonResponse({
              success: true,
              count: addedCount,
              businessName,
              totalSynced: googleReviews.length,
              reviews: updatedReviews,
              message: `Successfully synced ${addedCount} new Google review${addedCount === 1 ? "" : "s"} (${googleReviews.length} total fetched from Google).`
            });
          } catch (apiErr: any) {
            console.error("Google Places API fetch error:", apiErr);
            return jsonResponse({
              success: false,
              message: apiErr.message || "Failed to connect to Google Places API."
            }, 500);
          }
        }

        const photos: string[] = [];
        if (body.newReviewPhoto) {
          const url = await uploadToCloudinary(body.newReviewPhoto, "electrical/reviews");
          photos.push(url);
        }
        const newReview = {
          title: body.title,
          text: body.text,
          author: body.author,
          location: body.location,
          rating: body.rating,
          id: "review-" + Math.random().toString(36).substr(2, 9),
          featured: true,
          createdAt: new Date().toISOString(),
          photos
        };
        const saved = await dbAddReview(newReview);
        return jsonResponse(saved);
      }
      if (method === "PUT") {
        const body = await request.json();
        if (body.action === "reply") {
          const updated = await dbUpdateReview(body.id, { replyText: body.replyText });
          return jsonResponse(updated);
        } else if (body.action === "featured") {
          const db = await getDb();
          const review = await db.collection("reviews").findOne({ id: body.id });
          const featured = review ? !review.featured : false;
          const updated = await dbUpdateReview(body.id, { featured });
          return jsonResponse(updated);
        }
      }
      if (method === "DELETE") {
        const body = await request.json();
        const updated = await dbDeleteReview(body.id);
        return jsonResponse(updated);
      }
    }

    // ── /api/emails ──
    if (pathname === "/api/emails") {
      if (method === "GET") {
        try {
          const emails = await dbGetWebEmails([]);
          return jsonResponse(emails);
        } catch (dbErr) {
          console.warn("MongoDB emails read error, using fallback:", dbErr);
          return jsonResponse((globalThis as any).__serverEmails || []);
        }
      }
      if (method === "POST") {
        const body = await request.json();
        const newEmail = {
          ...body.emailData,
          id: (body.emailData && body.emailData.id) || ("email-" + Math.random().toString(36).substr(2, 9)),
          createdAt: (body.emailData && body.emailData.createdAt) || new Date().toISOString()
        };

        let saved = newEmail;
        try {
          saved = await dbAddWebEmail(newEmail);
        } catch (dbErr) {
          console.warn("MongoDB email save error, using in-memory store:", dbErr);
        }

        if (!(globalThis as any).__serverEmails) (globalThis as any).__serverEmails = [];
        (globalThis as any).__serverEmails.unshift(saved);

        // Also automatically create a corresponding Lead in the Leads & Dispatch database
        let savedLead: any = null;
        let projectType = "residential";
        let estimatedValue = 450;
        const srvLower = ((newEmail.service || "") + " " + (newEmail.message || "")).toLowerCase();
        if (srvLower.includes("install") || srvLower.includes("replacement") || srvLower.includes("system") || srvLower.includes("heat pump")) {
          projectType = "install";
          estimatedValue = 8500;
        } else if (srvLower.includes("heat") || srvLower.includes("furnace") || srvLower.includes("heater")) {
          projectType = "heating";
          estimatedValue = 650;
        } else if (srvLower.includes("maintenance") || srvLower.includes("tune-up") || srvLower.includes("tuneup") || srvLower.includes("checkup")) {
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

        const correspondingLead = {
          id: "lead-" + Math.random().toString(36).substr(2, 9),
          name: newEmail.name || "Website Prospect",
          email: newEmail.email || "",
          phone: newEmail.phone || "",
          address: (newEmail as any).address || `${newEmail.source || "Website Inquiry"} · Houston / Cypress, TX`,
          projectType,
          description: newEmail.message || `Customer inquiry received from ${newEmail.source || "Website Form"} (${newEmail.service || "General Request"})`,
          contactTime: (newEmail as any).contactTime || "anytime",
          status: "new" as const,
          estimatedValue,
          createdAt: newEmail.createdAt || new Date().toISOString(),
          photos: []
        };

        try {
          savedLead = await dbAddLead(correspondingLead);
        } catch (leadErr) {
          console.warn("Auto-lead MongoDB save error, using in-memory store:", leadErr);
          savedLead = correspondingLead;
        }

        if (!(globalThis as any).__serverLeads) (globalThis as any).__serverLeads = [];
        (globalThis as any).__serverLeads.unshift(savedLead);

        // Add a dashboard notification for the new form submission
        try {
          const notification = {
            id: "notif-" + Math.random().toString(36).substr(2, 9),
            type: "form_submission" as const,
            title: "📬 New Website Form Submission",
            message: `${newEmail.name} submitted an inquiry from ${newEmail.source || "Website"} (${newEmail.service || "General Inquiry"})`,
            link: "/dashboard",
            read: false,
            createdAt: new Date().toISOString(),
            metadata: {
              name: newEmail.name,
              email: newEmail.email,
              phone: newEmail.phone,
              service: newEmail.service,
              message: newEmail.message,
              source: newEmail.source
            }
          };

          try {
            await dbAddNotification(notification);
          } catch {}

          const io = (global as any).io;
          if (io) {
            io.emit("new-notification", notification);
            io.emit("new-inquiry", saved);
            if (savedLead) {
              io.emit("new-lead", savedLead);
            }
          }
        } catch (err) {
          console.error("Failed to create form submission notification:", err);
        }

        return jsonResponse({ ...saved, lead: savedLead });
      }
      if (method === "DELETE") {
        let id = "";
        try {
          const body = await request.json();
          id = body.id;
        } catch {}
        if (!id) {
          id = url.searchParams.get("id") || "";
        }
        if (!id) {
          return jsonResponse({ error: "Missing email ID" }, 400);
        }

        if ((globalThis as any).__serverEmails) {
          (globalThis as any).__serverEmails = (globalThis as any).__serverEmails.filter((e: any) => e.id !== id);
        }

        try {
          const updated = await dbDeleteWebEmail(id);
          return jsonResponse(updated);
        } catch (dbErr) {
          console.warn("MongoDB email delete error, using in-memory store:", dbErr);
          return jsonResponse((globalThis as any).__serverEmails || []);
        }
      }
    }

    // ── /api/notifications ──
    if (pathname === "/api/notifications") {
      if (method === "GET") {
        const notifications = await dbGetNotifications();
        return jsonResponse(notifications);
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.action === "read") {
          const updated = await dbMarkNotificationRead(body.id);
          return jsonResponse(updated);
        }
        if (body.action === "read-all") {
          const updated = await dbMarkAllNotificationsRead();
          return jsonResponse(updated);
        }
        if (body.action === "clear-all") {
          const updated = await dbClearAllNotifications();
          return jsonResponse(updated);
        }
      }
    }

    // ── /api/chats ──
    if (pathname === "/api/chats") {
      if (method === "GET") {
        try {
          const chats = await dbGetChatSessions(INITIAL_CHATS);
          return jsonResponse(chats);
        } catch (dbErr) {
          console.warn("MongoDB chat read error, using server fallback:", dbErr);
          if (!(globalThis as any).__serverChats) (globalThis as any).__serverChats = [];
          return jsonResponse((globalThis as any).__serverChats);
        }
      }
      if (method === "DELETE") {
        const urlObj = new URL(request.url);
        const id = urlObj.searchParams.get("id");
        if (id) {
          try {
            const db = await getDb();
            await db.collection("chat_sessions").deleteOne({ id });
            const docs = await db.collection("chat_sessions").find({}).toArray();
            const mapped = docs.map(d => ({ ...d, id: d.id || String(d._id), _id: undefined }));
            return jsonResponse(mapped);
          } catch (dbErr) {
            console.warn("MongoDB chat delete error, using server fallback:", dbErr);
            if (!(globalThis as any).__serverChats) (globalThis as any).__serverChats = [];
            (globalThis as any).__serverChats = (globalThis as any).__serverChats.filter((c: any) => c.id !== id);
            return jsonResponse((globalThis as any).__serverChats);
          }
        }
        return jsonResponse({ error: "Missing ID" }, 400);
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.action === "create") {
          const newSession = {
            id: "session-" + Math.random().toString(36).substr(2, 9),
            clientName: body.clientName || "Website Visitor",
            clientCity: body.clientCity || "Tomball, TX",
            clientEmail: body.clientEmail || "",
            clientPhone: body.clientPhone || "",
            lastMessage: "Chat session initialized",
            lastMessageTime: new Date().toISOString(),
            unread: true,
            messages: []
          };

          try {
            await dbSaveChatSession(newSession);
          } catch (dbErr) {
            console.warn("MongoDB chat create error, saving to memory fallback:", dbErr);
          }

          if (!(globalThis as any).__serverChats) (globalThis as any).__serverChats = [];
          (globalThis as any).__serverChats.unshift(newSession);

          // Save a dashboard notification for the new chat session
          try {
            const notification = await dbAddNotification({
              type: "chat_start",
              title: "New Live Chat Started",
              message: `${newSession.clientName} started a live chat session from ${newSession.clientCity}.`,
              link: "/dashboard?tab=chat",
              metadata: {
                sessionId: newSession.id,
                clientName: newSession.clientName,
                clientCity: newSession.clientCity,
                clientPhone: newSession.clientPhone,
                clientEmail: newSession.clientEmail
              }
            });

            // Broadcast the notification via Socket.io
            const io = (global as any).io;
            if (io) {
              io.emit("new-notification", notification);
              io.emit("session-created", { sessionId: newSession.id, clientName: newSession.clientName });
            }
          } catch (err) {
            console.error("Failed to broadcast chat start notification:", err);
          }

          return jsonResponse(newSession);
        }
        if (body.action === "message") {
          let session: any = null;
          try {
            const db = await getDb();
            session = await db.collection("chat_sessions").findOne({ id: body.sessionId });
          } catch (dbErr) {
            console.warn("MongoDB find session error, checking memory:", dbErr);
          }

          if (!session && (globalThis as any).__serverChats) {
            session = (globalThis as any).__serverChats.find((s: any) => s.id === body.sessionId);
          }

          if (!session) {
            session = {
              id: body.sessionId,
              clientName: "Website Visitor",
              clientCity: "Tomball, TX",
              messages: [],
              lastMessage: "",
              lastMessageTime: new Date().toISOString(),
              unread: true
            };
          }

          if (session && (session.isClosed || session.status === "closed") && body.sender === "client") {
            return jsonResponse({ error: "This chat session has been closed by the support agent." }, 403);
          }

          const newMsg = {
            id: body.messageId || ("msg-" + Math.random().toString(36).substr(2, 9)),
            sender: body.sender,
            text: body.text,
            timestamp: body.timestamp || new Date().toISOString()
          };

          const currentMsgs = Array.isArray(session.messages) ? session.messages : [];
          const alreadyExists = currentMsgs.some((m: any) =>
            m.id === newMsg.id ||
            (m.sender === newMsg.sender && m.text?.trim() === newMsg.text?.trim() && Math.abs(new Date(m.timestamp).getTime() - new Date(newMsg.timestamp).getTime()) < 3000)
          );
          const messages = alreadyExists ? currentMsgs : [...currentMsgs, newMsg];

          const updatedSession = {
            ...session,
            messages,
            lastMessage: body.text,
            lastMessageTime: newMsg.timestamp,
            unread: body.sender === "client"
          };

          try {
            await dbSaveChatSession(updatedSession);
          } catch (dbErr) {
            console.warn("MongoDB chat update error:", dbErr);
          }

          if (!(globalThis as any).__serverChats) (globalThis as any).__serverChats = [];
          const existingIdx = (globalThis as any).__serverChats.findIndex((s: any) => s.id === updatedSession.id);
          if (existingIdx >= 0) {
            (globalThis as any).__serverChats[existingIdx] = updatedSession;
          } else {
            (globalThis as any).__serverChats.unshift(updatedSession);
          }

          // Broadcast message via Socket.io
          const io = (global as any).io;
          if (io) {
            io.to(body.sessionId).emit("message", { ...newMsg, sessionId: body.sessionId });
            io.emit("new-chat-message", { ...newMsg, sessionId: body.sessionId });
          }

          return jsonResponse(updatedSession);
        }
        if (body.action === "close" || body.action === "reopen") {
          const isClosed = body.action === "close";
          const status = isClosed ? "closed" : "active";
          const timestamp = new Date().toISOString();
          const sysMsg = {
            id: "sys-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6),
            sender: "admin",
            text: isClosed
              ? "🔒 This chat session has been closed by Upfront AC support."
              : "🔓 This chat session has been reopened.",
            timestamp
          };

          let session: any = null;
          try {
            const db = await getDb();
            session = await db.collection("chat_sessions").findOne({ id: body.sessionId });
          } catch (dbErr) {
            console.warn("MongoDB find session for close/reopen error:", dbErr);
          }

          if (!session && (globalThis as any).__serverChats) {
            session = (globalThis as any).__serverChats.find((s: any) => s.id === body.sessionId);
          }

          if (session) {
            const currentMsgs = Array.isArray(session.messages) ? session.messages : [];
            const messages = [...currentMsgs, sysMsg];
            const updatedSession = {
              ...session,
              status,
              isClosed,
              closedAt: isClosed ? timestamp : undefined,
              messages,
              lastMessage: sysMsg.text,
              lastMessageTime: timestamp,
              unread: false
            };

            try {
              await dbSaveChatSession(updatedSession);
            } catch (dbErr) {
              console.warn("MongoDB save closed session error:", dbErr);
            }

            if (!(globalThis as any).__serverChats) (globalThis as any).__serverChats = [];
            const sIdx = (globalThis as any).__serverChats.findIndex((s: any) => s.id === updatedSession.id);
            if (sIdx >= 0) {
              (globalThis as any).__serverChats[sIdx] = updatedSession;
            } else {
              (globalThis as any).__serverChats.unshift(updatedSession);
            }

            const io = (global as any).io;
            if (io) {
              io.to(body.sessionId).emit("session-status", {
                sessionId: body.sessionId,
                status,
                isClosed,
                closedAt: updatedSession.closedAt
              });
              io.to(body.sessionId).emit("message", { ...sysMsg, sessionId: body.sessionId });
              io.emit("session-status-changed", {
                sessionId: body.sessionId,
                status,
                isClosed,
                closedAt: updatedSession.closedAt
              });
            }

            return jsonResponse(updatedSession);
          }
          return jsonResponse({ error: "Session not found" }, 404);
        }
        if (body.action === "read") {
          try {
            const db = await getDb();
            await db.collection("chat_sessions").updateOne({ id: body.sessionId }, { $set: { unread: false } });
            const docs = await db.collection("chat_sessions").find({}).toArray();
            const mapped = docs.map(d => ({ ...d, id: d.id || String(d._id), _id: undefined }));
            return jsonResponse(mapped);
          } catch (dbErr) {
            console.warn("MongoDB mark read error:", dbErr);
            if ((globalThis as any).__serverChats) {
              (globalThis as any).__serverChats = (globalThis as any).__serverChats.map((s: any) =>
                s.id === body.sessionId ? { ...s, unread: false } : s
              );
            }
            return jsonResponse((globalThis as any).__serverChats || []);
          }
        }
      }
    }

    // ── /api/gallery ──
    if (pathname === "/api/gallery") {
      if (method === "GET") {
        try {
          const photos = await dbGetGalleryPhotos([]);
          if (Array.isArray(photos) && photos.length > 0) {
            return jsonResponse(photos);
          }
          // If MongoDB has 0 photos or is empty, fetch live from Cloudinary!
          const cloudPhotos = await listCloudinaryPhotos("upfrontac");
          if (cloudPhotos.length > 0) {
            return jsonResponse(cloudPhotos);
          }
          return jsonResponse(photos);
        } catch (dbErr) {
          console.warn("MongoDB gallery read error, syncing directly with Cloudinary:", dbErr);
          try {
            const cloudPhotos = await listCloudinaryPhotos("upfrontac");
            if (cloudPhotos.length > 0) {
              return jsonResponse(cloudPhotos);
            }
          } catch (cErr) {
            console.warn("Cloudinary list fallback error:", cErr);
          }
          return jsonResponse((globalThis as any).__serverGallery || []);
        }
      }
      if (method === "POST") {
        const body = await request.json();
        let url = body.url;
        if (!url && body.base64Photo) {
          url = await uploadToCloudinary(body.base64Photo, "upfrontac/gallery");
        }
        if (!url) {
          return jsonResponse({ error: "Missing image content or URL" }, 400);
        }
        const newPhoto = {
          id: "photo-" + Math.random().toString(36).substr(2, 9),
          url,
          category: body.category || "residential",
          title: body.title || "HVAC Project",
          uploadedAt: new Date().toISOString()
        };

        try {
          const updated = await dbAddGalleryPhoto(newPhoto);
          return jsonResponse(updated);
        } catch (dbErr) {
          console.warn("MongoDB gallery insert error, syncing with Cloudinary:", dbErr);
          try {
            const cloudPhotos = await listCloudinaryPhotos("upfrontac");
            if (cloudPhotos.length > 0) {
              return jsonResponse(cloudPhotos);
            }
          } catch {}
          if (!(globalThis as any).__serverGallery) (globalThis as any).__serverGallery = [];
          (globalThis as any).__serverGallery.unshift(newPhoto);
          return jsonResponse((globalThis as any).__serverGallery);
        }
      }
      if (method === "DELETE") {
        let id = url.searchParams.get("id");
        if (!id) {
          try {
            const body = await request.json();
            id = body.id;
          } catch {}
        }
        if (!id) {
          return jsonResponse({ error: "Missing image ID" }, 400);
        }

        let photoUrlToDelete = "";
        try {
          const db = await getDb();
          const photo = await db.collection("gallery_photos").findOne({ id });
          if (photo?.url) photoUrlToDelete = photo.url;
        } catch {}

        if (photoUrlToDelete && photoUrlToDelete.includes("cloudinary.com")) {
          try {
            await deleteFromCloudinary(photoUrlToDelete);
          } catch (cloudinaryErr) {
            console.error("Failed to delete from Cloudinary:", cloudinaryErr);
          }
        }

        try {
          const updated = await dbRemoveGalleryPhoto(id);
          return jsonResponse(updated);
        } catch (dbErr) {
          console.warn("MongoDB gallery delete error, fetching Cloudinary:", dbErr);
          try {
            const cloudPhotos = await listCloudinaryPhotos("upfrontac");
            return jsonResponse(cloudPhotos.filter((p: any) => p.id !== id));
          } catch {}
          if ((globalThis as any).__serverGallery) {
            (globalThis as any).__serverGallery = (globalThis as any).__serverGallery.filter((p: any) => p.id !== id);
          }
          return jsonResponse((globalThis as any).__serverGallery || []);
        }
      }
    }

    // ── /api/users ──
    if (pathname === "/api/users") {
      if (method === "GET") {
        try {
          const users = await dbGetPortalUsers(DEFAULT_ADMIN);
          const mapped = users.map(u => ({ id: u.id, username: u.username, role: u.role }));
          return jsonResponse(mapped);
        } catch (dbErr) {
          console.warn("MongoDB users read error, using fallback admin:", dbErr);
          return jsonResponse([{ id: DEFAULT_ADMIN.id, username: DEFAULT_ADMIN.username, role: DEFAULT_ADMIN.role }]);
        }
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.action === "login") {
          try {
            const accounts = await dbGetPortalUsers(DEFAULT_ADMIN);
            const user = accounts.find(a => a.username.toLowerCase() === body.username.toLowerCase());
            if (user) {
              const isValid = await verifyPassword(body.password, user.password);
              if (isValid) {
                return jsonResponse({ success: true, user: { id: user.id, username: user.username, role: user.role } });
              }
            }
          } catch (dbErr) {
            console.warn("MongoDB auth error, fallback admin check:", dbErr);
            if (body.username.toLowerCase() === "admin" && body.password === "admin123") {
              return jsonResponse({ success: true, user: { id: "admin-1", username: "admin", role: "admin" } });
            }
          }
          return jsonResponse({ error: "Invalid username or password" }, 401);
        }
        if (body.action === "create") {
          try {
            const accounts = await dbGetPortalUsers(DEFAULT_ADMIN);
            if (accounts.some(a => a.username.toLowerCase() === body.username.toLowerCase())) {
              return jsonResponse({ error: "Username already exists" }, 400);
            }
            const hashedPassword = await hashPassword(body.password);
            const newUser = {
              id: "admin-" + Math.random().toString(36).substr(2, 9),
              username: body.username,
              password: hashedPassword,
              role: body.role
            };
            await dbAddPortalUser(newUser);
            return jsonResponse({ success: true, id: newUser.id, username: newUser.username, role: newUser.role });
          } catch (dbErr) {
            return jsonResponse({ error: "Failed to create user" }, 500);
          }
        }
        if (body.action === "delete") {
          try {
            await dbDeletePortalUser(body.userId);
            return jsonResponse({ success: true });
          } catch (dbErr) {
            return jsonResponse({ error: "Failed to delete user" }, 500);
          }
        }
        if (body.action === "update") {
          try {
            const updates: any = {};
            if (body.username) updates.username = body.username;
            if (body.role) updates.role = body.role;
            if (body.password) {
              updates.password = await hashPassword(body.password);
            }
            const users = await dbUpdatePortalUser(body.userId, updates);
            const updatedUser = users.find(u => u.id === body.userId);
            return jsonResponse({ success: true, username: updatedUser ? updatedUser.username : (body.username || "") });
          } catch (dbErr) {
            return jsonResponse({ error: "Failed to update user" }, 500);
          }
        }
      }
    }

    // ── /api/settings ──
    if (pathname === "/api/settings") {
      const defaultSettings = {
        alertEmail: "allen@upfrontac.com",
        officePhone: "(713) 819-7908",
        emailAlert: true,
        maintenanceMode: false,
        weekdays: "9:00 AM - 6:30 PM",
        saturdays: "9:00 AM - 6:30 PM",
        sundays: "24/7 Emergency Dispatch"
      };

      if (method === "GET") {
        try {
          const settings = await dbGetSettings(defaultSettings);
          return jsonResponse(settings);
        } catch (dbErr) {
          console.warn("MongoDB settings read error, using fallback defaults:", dbErr);
          return jsonResponse((globalThis as any).__serverSettings || defaultSettings);
        }
      }
      if (method === "POST") {
        const body = await request.json();
        let saved = { ...defaultSettings, ...body };
        try {
          saved = await dbSaveSettings(body);
        } catch (dbErr) {
          console.warn("MongoDB settings save error, using in-memory store:", dbErr);
        }
        (globalThis as any).__serverSettings = saved;

        // Broadcast updated settings to all clients in real time
        const io = (global as any).io;
        if (io) {
          io.emit("settings-updated", saved);
        }

        return jsonResponse(saved);
      }
    }

    // ── /api/sign-upload ──
    if (pathname === "/api/sign-upload" && method === "POST") {
      const body = await request.json();
      const folder = body.folder || "upfrontac/gallery";
      const timestamp = Math.round(Date.now() / 1000);
      const apiSecret = process.env.CLOUDINARY_API_SECRET;
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;

      if (!apiSecret || !cloudName || !apiKey) {
        return jsonResponse({ error: "Missing Cloudinary configuration" }, 500);
      }

      // Build the string to sign
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
      
      const { createHash } = await import("crypto");
      const signature = createHash("sha1").update(paramsToSign + apiSecret).digest("hex");

      return jsonResponse({ signature, timestamp, apiKey, cloudName, folder });
    }

  } catch (error: any) {
    console.error("API error:", error);
    return jsonResponse({ error: error.message || "Internal Server Error" }, 500);
  }

  return null;
}

// ── NODE.JS MIDDLEWARE ADAPTER (For Vite configureServer Dev Mode) ──
export async function handleNodeApiRequest(req: any, res: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  let body: any = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers);
  }

  const webHeaders = new Headers();
  Object.entries(req.headers).forEach(([key, val]) => {
    if (val !== undefined) {
      if (Array.isArray(val)) {
        val.forEach(v => webHeaders.append(key, v));
      } else {
        webHeaders.set(key, val);
      }
    }
  });

  const webReq = new Request(url, {
    method: req.method,
    headers: webHeaders,
    body: body && body.length > 0 ? body : undefined
  });

  const webRes = await handleApiRequest(webReq);
  if (webRes) {
    res.statusCode = webRes.status;
    webRes.headers.forEach((val, key) => {
      res.setHeader(key, val);
    });
    const resBody = await webRes.text();
    res.end(resBody);
    return true;
  }
  return false;
}
