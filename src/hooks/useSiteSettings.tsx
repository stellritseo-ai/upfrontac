import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getSiteSettings, saveSiteSettings, SiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/leads-store";

interface SiteSettingsContextType {
  settings: SiteSettings;
  phoneTel: string;
  loading: boolean;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<SiteSettings>;
  refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SITE_SETTINGS,
  phoneTel: "+17138197908",
  loading: false,
  updateSettings: async () => DEFAULT_SITE_SETTINGS,
  refreshSettings: async () => {}
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await getSiteSettings();
      if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.warn("Failed to load dynamic site settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    // 1. Cross-tab and in-page event listener
    const handleLocalUpdate = (e: any) => {
      if (e.detail) {
        setSettings(e.detail);
      } else {
        fetchSettings();
      }
    };
    window.addEventListener("upfront-settings-updated", handleLocalUpdate);

    // 2. Real-time sync: dynamic socket.io (dev) or polling fallback (Vercel)
    let socket: any = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    const isVercel = typeof window !== "undefined" && window.location.hostname.includes(".vercel.app");

    if (!isVercel) {
      // Try socket.io only on non-Vercel environments
      (async () => {
        try {
          const { io: ioConnect } = await import("socket.io-client");
          socket = ioConnect({ transports: ["polling", "websocket"], autoConnect: true, reconnectionAttempts: 2, timeout: 4000 });
          socket.on("settings-updated", (updated: SiteSettings) => {
            if (updated) {
              setSettings(updated);
              localStorage.setItem("upfront_site_settings_v2", JSON.stringify(updated));
            }
          });
        } catch (err) {
          console.warn("Socket.io settings sync unavailable:", err);
        }
      })();
    }

    // Always run a slow background poll to catch settings changes
    pollInterval = setInterval(() => {
      fetchSettings();
    }, 30000); // every 30s

    return () => {
      window.removeEventListener("upfront-settings-updated", handleLocalUpdate);
      if (socket) socket.disconnect();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<SiteSettings> => {
    const updated = await saveSiteSettings(newSettings);
    setSettings(updated);
    return updated;
  };

  const rawPhone = settings.officePhone || "(713) 819-7908";
  const cleanedDigits = rawPhone.replace(/\D/g, "");
  const phoneTel = cleanedDigits.length === 10 ? `+1${cleanedDigits}` : (cleanedDigits.startsWith("1") ? `+${cleanedDigits}` : `+1${cleanedDigits}`);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        phoneTel,
        loading,
        updateSettings,
        refreshSettings: fetchSettings
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  return useContext(SiteSettingsContext);
};
