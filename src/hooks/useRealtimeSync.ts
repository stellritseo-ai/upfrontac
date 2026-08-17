/**
 * useRealtimeSync -- Smart real-time sync hook
 * Uses Socket.IO when available (local dev), falls back to polling on Vercel.
 */
import { useEffect, useRef } from "react";

function isVercelHost(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h.includes(".vercel.app");
}

let globalSocket: any = null;
let socketAttempted = false;
let socketOk = false;

async function tryGetSocket(): Promise<any | null> {
  if (isVercelHost()) return null;
  if (socketAttempted) return socketOk ? globalSocket : null;
  socketAttempted = true;
  try {
    const { io } = await import("socket.io-client");
    const socket = io({
      transports: ["polling", "websocket"],
      autoConnect: true,
      reconnectionAttempts: 2,
      timeout: 4000,
    });
    await new Promise<void>((resolve, reject) => {
      const t = setTimeout(() => { socket.disconnect(); reject(new Error("timeout")); }, 4000);
      socket.on("connect", () => { clearTimeout(t); socketOk = true; globalSocket = socket; resolve(); });
      socket.on("connect_error", (e: any) => { clearTimeout(t); socket.disconnect(); reject(e); });
    });
    return globalSocket;
  } catch (e) {
    console.warn("[RealtimeSync] Socket.IO not available, using polling fallback.", (e as Error).message);
    socketOk = false;
    return null;
  }
}

export function disconnectGlobalSocket() {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
    socketOk = false;
    socketAttempted = false;
  }
}

interface SyncOptions {
  onPoll: () => void | Promise<void>;
  socketHandlers?: Record<string, (data: any) => void>;
  pollInterval?: number;
  enabled?: boolean;
  joinRoom?: string;
}

/**
 * useRealtimeSync
 * - Local dev: Socket.IO events + slow background poll
 * - Vercel / serverless: fast polling every pollInterval ms
 */
export function useRealtimeSync({
  onPoll,
  socketHandlers = {},
  pollInterval = 5000,
  enabled = true,
  joinRoom,
}: SyncOptions) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const socketRef = useRef<any>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    if (!enabled) return;
    let cancelled = false;

    async function init() {
      const socket = await tryGetSocket();
      if (cancelled) return;

      if (socket) {
        socketRef.current = socket;
        if (joinRoom) socket.emit("join-session", joinRoom);
        for (const [ev, fn] of Object.entries(socketHandlers)) {
          socket.on(ev, fn);
        }
        // Slower background poll when socket is live (every 3x interval)
        intervalRef.current = setInterval(async () => {
          if (alive.current) await onPoll();
        }, pollInterval * 3);
      } else {
        // No socket -- aggressive polling
        await onPoll();
        intervalRef.current = setInterval(async () => {
          if (alive.current) await onPoll();
        }, pollInterval);
      }
    }

    init();

    return () => {
      cancelled = true;
      alive.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (socketRef.current) {
        for (const ev of Object.keys(socketHandlers)) {
          socketRef.current.off(ev);
        }
        socketRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, joinRoom, pollInterval]);
}
