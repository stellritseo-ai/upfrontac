import React, { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  priority?: boolean;
}

function getCloudinaryPoster(src: string): string | undefined {
  if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/")) {
    return undefined;
  }
  return src
    .replace(/\/video\/upload\/(?:[^/]+\/)?/, "/video/upload/f_webp,q_auto:eco,w_960,so_0/")
    .replace(/\.(mp4|mov|webm)$/i, ".webp");
}

function getOptimizedVideoSrc(src: string): string {
  if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/")) {
    return src;
  }
  return src.replace(
    /\/video\/upload\/(?:[^/]+\/)?/,
    "/video/upload/f_auto,q_auto:eco,w_960/"
  );
}

export function AutoPlayVideo({
  src,
  priority = false,
  className,
  style,
  poster,
  onPlaying,
  onTimeUpdate,
  ...props
}: AutoPlayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterImgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInViewRef = useRef(priority);

  const [canAutoPlay, setCanAutoPlay] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [posterReady, setPosterReady] = useState(!priority);
  const [hasStarted, setHasStarted] = useState(false);

  const resolvedPoster = poster ?? getCloudinaryPoster(src);
  const optimizedSrc = getOptimizedVideoSrc(src);

  // Respect prefers-reduced-motion (including live OS preference changes) and Data Saver
  useEffect(() => {
    if (typeof window === "undefined") return;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })?.connection;
    const saveData = conn?.saveData === true;
    const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const updatePreference = (prefersReduced: boolean) => {
      const allowed = !prefersReduced && !saveData;
      setCanAutoPlay(allowed);
      if (!allowed) {
        setHasStarted(false);
        const video = videoRef.current;
        if (video && !video.paused) {
          video.pause();
        }
      }
    };

    updatePreference(Boolean(reducedMotionQuery?.matches));

    const handleChange = (event: MediaQueryListEvent) => {
      updatePreference(event.matches);
    };

    reducedMotionQuery?.addEventListener?.("change", handleChange);
    return () => {
      reducedMotionQuery?.removeEventListener?.("change", handleChange);
    };
  }, []);

  // Reset playback state cleanly when video source changes
  useEffect(() => {
    setHasStarted(false);
  }, [optimizedSrc]);

  // For above-the-fold priority videos, let the high-priority WebP poster complete first
  // so it never competes for bandwidth with the LCP frame, with a short failsafe timeout.
  useEffect(() => {
    if (!priority || !resolvedPoster) {
      setPosterReady(true);
      return;
    }

    const img = posterImgRef.current;
    if (img?.complete) {
      setPosterReady(true);
      return;
    }

    setPosterReady(false);
    let settled = false;
    const markReady = () => {
      if (settled) return;
      settled = true;
      setPosterReady(true);
    };

    img?.addEventListener("load", markReady, { once: true });
    img?.addEventListener("error", markReady, { once: true });
    const failsafeTimer = setTimeout(markReady, 600);

    return () => {
      img?.removeEventListener("load", markReady);
      img?.removeEventListener("error", markReady);
      clearTimeout(failsafeTimer);
    };
  }, [priority, resolvedPoster]);

  // Observe viewport intersection using the visible wrapper box (never an off-screen video)
  useEffect(() => {
    const target = containerRef.current ?? videoRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      isInViewRef.current = true;
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            setHasEnteredView(true);
            const video = videoRef.current;
            if (
              video &&
              (video.currentSrc || video.src) &&
              canAutoPlay &&
              document.visibilityState !== "hidden" &&
              video.paused
            ) {
              video.muted = true;
              video.defaultMuted = true;
              video.volume = 0;
              video.play().catch(() => {});
            }
          } else {
            const video = videoRef.current;
            if (video && !video.paused) {
              video.pause();
            }
          }
        }
      },
      { rootMargin: "250px 0px 250px 0px", threshold: 0.01 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [canAutoPlay]);

  const shouldLoadMedia = canAutoPlay && posterReady && (priority || hasEnteredView);

  // Synchronize native muted/inline properties, attach playback listeners, and recover on tab focus
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadMedia) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    let removeUnlockListeners: (() => void) | undefined;

    const attemptPlay = async () => {
      if (!video || !canAutoPlay || !isInViewRef.current || document.visibilityState === "hidden") {
        return;
      }
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        await video.play();
      } catch (err) {
        if ((err as DOMException)?.name === "NotAllowedError" && !removeUnlockListeners) {
          const onFirstInteraction = () => {
            removeUnlockListeners?.();
            removeUnlockListeners = undefined;
            if (canAutoPlay && isInViewRef.current && document.visibilityState !== "hidden") {
              video.muted = true;
              video.play().catch(() => {});
            }
          };
          window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true });
          window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
          window.addEventListener("click", onFirstInteraction, { once: true, passive: true });
          removeUnlockListeners = () => {
            window.removeEventListener("pointerdown", onFirstInteraction);
            window.removeEventListener("touchstart", onFirstInteraction);
            window.removeEventListener("click", onFirstInteraction);
          };
        }
      }
    };

    const handleCanPlay = () => {
      attemptPlay();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (!video.paused) video.pause();
      } else if (isInViewRef.current) {
        attemptPlay();
      }
    };

    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Ensure the browser starts fetching immediately when src is attached
    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      video.load();
    }
    attemptPlay();

    return () => {
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      removeUnlockListeners?.();
    };
  }, [shouldLoadMedia, canAutoPlay, optimizedSrc]);

  const baseMediaClass = className || "h-full w-full object-cover";
  const lazyVideoAttr = !priority ? ({ loading: "lazy" } as Record<string, string>) : undefined;

  return (
    <div ref={containerRef} className="relative h-full w-full isolate">
      {resolvedPoster && (
        <img
          ref={posterImgRef}
          src={resolvedPoster}
          alt=""
          aria-hidden="true"
          width={960}
          height={540}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          className={`${baseMediaClass} absolute inset-0`}
          style={{
            ...style,
            ...(hasStarted
              ? {
                  opacity: 0,
                  transition: "opacity 350ms ease-out",
                  pointerEvents: "none",
                }
              : undefined),
          }}
        />
      )}
      <video
        ref={videoRef}
        src={shouldLoadMedia ? optimizedSrc : undefined}
        autoPlay={shouldLoadMedia}
        loop
        muted
        playsInline
        webkit-playsinline="true"
        width={960}
        height={540}
        preload={shouldLoadMedia ? "auto" : "none"}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        {...lazyVideoAttr}
        onPlaying={(e) => {
          setHasStarted(true);
          onPlaying?.(e);
        }}
        onTimeUpdate={(e) => {
          if (!hasStarted && e.currentTarget.currentTime > 0) {
            setHasStarted(true);
          }
          onTimeUpdate?.(e);
        }}
        className={`${baseMediaClass} relative`}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          ...style,
        }}
        {...props}
      />
    </div>
  );
}
