import { MongoClient, ObjectId } from "mongodb";
import { hashPassword } from "./crypto.server.js";

const DB_NAME = process.env.MONGODB_DB_NAME || "upfrontac";

let client: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (!client) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is missing!");
    }
    const newClient = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 15000,
    });
    await newClient.connect();
    client = newClient;
  }
  return client;
}

export async function getDb() {
  const connectedClient = await getClient();
  return connectedClient.db(DB_NAME);
}

// Helper to safely map MongoDB documents (_id) to application types (id)
function mapDoc<T>(doc: any): T {
  if (!doc) return null as any;
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || String(_id),
  } as T;
}

// ── LEADS ──
export async function dbGetLeads(_initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const leadsCol = db.collection("leads");

  // Clean up any legacy localhost photos from leads
  const allLeads = await leadsCol.find({}).toArray();
  for (const lead of allLeads) {
    if (lead.photos && lead.photos.some((p: string) => p.includes("localhost"))) {
      const cleanedPhotos = lead.photos.filter((p: string) => !p.includes("localhost"));
      await leadsCol.updateOne({ _id: lead._id }, { $set: { photos: cleanedPhotos } });
    }
  }

  const docs = await leadsCol.find({}).sort({ createdAt: -1, _id: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddLead(lead: any): Promise<any> {
  const db = await getDb();
  const leadsCol = db.collection("leads");
  const result = await leadsCol.insertOne(lead);
  return { ...lead, id: lead.id || String(result.insertedId) };
}

export async function dbUpdateLead(id: string, updates: any): Promise<any[] | null> {
  const db = await getDb();
  const leadsCol = db.collection("leads");
  
  let res = await leadsCol.updateOne({ id }, { $set: updates });
  if (res.matchedCount === 0) {
    if (ObjectId.isValid(id)) {
      await leadsCol.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    }
  }
  
  const docs = await leadsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbDeleteLead(id: string): Promise<any[]> {
  const db = await getDb();
  const leadsCol = db.collection("leads");
  
  let res = await leadsCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await leadsCol.deleteOne({ _id: new ObjectId(id) });
    }
  }
  
  const docs = await leadsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── REVIEWS ──
export async function dbGetReviews(initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");
  
  if (initialSeeds && initialSeeds.length > 0) {
    for (const seed of initialSeeds) {
      const exists = await reviewsCol.findOne({
        $or: [
          { id: seed.id },
          { title: seed.title, author: seed.author }
        ]
      });
      if (!exists) {
        await reviewsCol.insertOne(seed);
      }
    }
  }

  // Clean up any legacy localhost photos from reviews
  const allReviews = await reviewsCol.find({}).toArray();
  for (const rev of allReviews) {
    if (rev.photos && rev.photos.some((p: string) => p.includes("localhost"))) {
      const cleanedPhotos = rev.photos.filter((p: string) => !p.includes("localhost"));
      await reviewsCol.updateOne({ _id: rev._id }, { $set: { photos: cleanedPhotos } });
    }
  }

  const docs = await reviewsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbAddReview(review: any): Promise<any> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");
  const result = await reviewsCol.insertOne(review);
  return { ...review, id: review.id || String(result.insertedId) };
}

export async function dbUpdateReview(id: string, updates: any): Promise<any[]> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");
  
  let res = await reviewsCol.updateOne({ id }, { $set: updates });
  if (res.matchedCount === 0) {
    if (ObjectId.isValid(id)) {
      await reviewsCol.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    }
  }
  
  const docs = await reviewsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbDeleteReview(id: string): Promise<any[]> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");
  let res = await reviewsCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await reviewsCol.deleteOne({ _id: new ObjectId(id) });
    }
  }
  const docs = await reviewsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── WEB EMAILS ──
export async function dbGetWebEmails(_initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");
  const docs = await emailsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddWebEmail(email: any): Promise<any> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");
  const result = await emailsCol.insertOne(email);
  return { ...email, id: email.id || String(result.insertedId) };
}

export async function dbDeleteWebEmail(id: string): Promise<any[]> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");
  
  let res = await emailsCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await emailsCol.deleteOne({ _id: new ObjectId(id) });
    }
  }
  
  const docs = await emailsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── CHATS ──
export async function dbGetChatSessions(_initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const chatsCol = db.collection("chat_sessions");
  const docs = await chatsCol.find({}).sort({ lastMessageTime: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbSaveChatSession(session: any): Promise<void> {
  const db = await getDb();
  const chatsCol = db.collection("chat_sessions");
  const { _id, ...cleanSession } = session;
  await chatsCol.updateOne({ id: cleanSession.id }, { $set: cleanSession }, { upsert: true });
}

// ── GALLERY PHOTOS ──
export async function dbGetGalleryPhotos(initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const galleryCol = db.collection("gallery_photos");

  // Clean up any legacy localhost photos from gallery
  await galleryCol.deleteMany({ url: { $regex: "localhost" } });

  const count = await galleryCol.countDocuments();
  
  // Force re-seeding if we only have the old 1-photo seed
  const hasOnlyOldSeed = count === 1 && (await galleryCol.findOne({ id: "photo-1" }))?.url === "https://images.unsplash.com/photo-1621905251189-08b45d6a269e";
  if (hasOnlyOldSeed) {
    await galleryCol.deleteMany({});
  }

  const updatedCount = await galleryCol.countDocuments();
  if (updatedCount === 0 && initialSeeds.length > 0) {
    await galleryCol.insertMany(initialSeeds);
    return initialSeeds;
  }
  const docs = await galleryCol.find({}).sort({ uploadedAt: -1, _id: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddGalleryPhoto(photo: any): Promise<any[]> {
  const db = await getDb();
  const galleryCol = db.collection("gallery_photos");
  await galleryCol.insertOne(photo);
  const docs = await galleryCol.find({}).sort({ uploadedAt: -1, _id: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbRemoveGalleryPhoto(id: string): Promise<any[]> {
  const db = await getDb();
  const galleryCol = db.collection("gallery_photos");
  
  let res = await galleryCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await galleryCol.deleteOne({ _id: new ObjectId(id) });
    }
  }
  
  const docs = await galleryCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── PORTAL SECURITY & AUTH ACCOUNTS ──
export async function dbGetPortalUsers(defaultAdmin: any): Promise<any[]> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");
  const count = await accountsCol.countDocuments();
  if (count === 0) {
    const hashedPassword = await hashPassword(defaultAdmin.password);
    const seededAdmin = { ...defaultAdmin, password: hashedPassword };
    await accountsCol.insertOne(seededAdmin);
    return [seededAdmin];
  }

  // Ensure default admin exists and has the correct password hashed
  const existingDefaultAdmin = await accountsCol.findOne({ username: defaultAdmin.username });
  if (!existingDefaultAdmin) {
    const hashedPassword = await hashPassword(defaultAdmin.password);
    const seededAdmin = { ...defaultAdmin, password: hashedPassword };
    await accountsCol.insertOne(seededAdmin);
  } else {
    const isPlaintext = !existingDefaultAdmin.password.includes(":");
    if (isPlaintext) {
      const hashedPassword = await hashPassword(defaultAdmin.password);
      await accountsCol.updateOne({ id: existingDefaultAdmin.id }, { $set: { password: hashedPassword } });
    }
  }

  const docs = await accountsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbAddPortalUser(user: any): Promise<void> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");
  await accountsCol.insertOne(user);
}

export async function dbDeletePortalUser(userId: string): Promise<void> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");
  
  let res = await accountsCol.deleteOne({ id: userId });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(userId)) {
      await accountsCol.deleteOne({ _id: new ObjectId(userId) });
    }
  }
}

export async function dbUpdatePortalUser(userId: string, updates: any): Promise<any[]> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");
  
  let res = await accountsCol.updateOne({ id: userId }, { $set: updates });
  if (res.matchedCount === 0) {
    if (ObjectId.isValid(userId)) {
      await accountsCol.updateOne({ _id: new ObjectId(userId) }, { $set: updates });
    }
  }
  
  const docs = await accountsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── SETTINGS ──
export async function dbGetSettings(defaultSettings: any): Promise<any> {
  const db = await getDb();
  const settingsCol = db.collection("settings");
  let doc = await settingsCol.findOne({ id: "site_config" });
  if (!doc) {
    const seeded = { ...defaultSettings, id: "site_config" };
    await settingsCol.insertOne(seeded);
    return seeded;
  }
  
  // Auto-correct legacy database values if present
  let needsUpdate = false;
  const updates: any = {};
  if (doc.alertEmail === "revitalizerealestate@gmail.com") {
    doc.alertEmail = defaultSettings.alertEmail;
    updates.alertEmail = defaultSettings.alertEmail;
    needsUpdate = true;
  }
  if (doc.officePhone === "(813) 323-0291") {
    doc.officePhone = defaultSettings.officePhone;
    updates.officePhone = defaultSettings.officePhone;
    needsUpdate = true;
  }
  if (needsUpdate) {
    await settingsCol.updateOne({ id: "site_config" }, { $set: updates });
  }

  return mapDoc(doc);
}

export async function dbSaveSettings(settings: any): Promise<any> {
  const db = await getDb();
  const settingsCol = db.collection("settings");
  await settingsCol.updateOne({ id: "site_config" }, { $set: settings }, { upsert: true });
  const doc = await settingsCol.findOne({ id: "site_config" });
  return mapDoc(doc);
}

// ── NOTIFICATIONS ──
export async function dbGetNotifications(): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  const docs = await notificationsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddNotification(notification: any): Promise<any> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  const doc = {
    ...notification,
    id: notification.id || "notif-" + Math.random().toString(36).substr(2, 9),
    read: false,
    createdAt: notification.createdAt || new Date().toISOString()
  };
  const result = await notificationsCol.insertOne(doc);
  return { ...doc, id: doc.id || String(result.insertedId) };
}

export async function dbMarkNotificationRead(id: string, read: boolean = true): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.updateOne({ id }, { $set: { read } });
  return await dbGetNotifications();
}

export async function dbMarkAllNotificationsRead(): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.updateMany({}, { $set: { read: true } });
  return await dbGetNotifications();
}

export async function dbDeleteNotification(id: string): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.deleteOne({ id });
  return await dbGetNotifications();
}

export async function dbClearAllNotifications(): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.deleteMany({});
  return [];
}

