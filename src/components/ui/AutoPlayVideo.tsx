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
  ...props
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [shouldAttachSource, setShouldAttachSource] = useState(false);

  const resolvedPoster = poster ?? getCloudinaryPoster(src);
  const optimizedSrc = getOptimizedVideoSrc(src);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion, Data Saver, and slow mobile cellular connections (< 2.5 Mbps)
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const conn = (navigator as any)?.connection;
    const saveData = conn?.saveData === true;
    const effectiveType = conn?.effectiveType as string | undefined;
    const downlink = typeof conn?.downlink === "number" ? conn.downlink : 10;
    const isSlowConnection =
      effectiveType === "slow-2g" ||
      effectiveType === "2g" ||
      effectiveType === "3g" ||
      downlink < 2.5;

    if (prefersReducedMotion || saveData || isSlowConnection) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const enableVideo = () => {
      timer = setTimeout(() => {
        setShouldAttachSource(true);
      }, priority ? 2500 : 3500);
    };

    if (document.readyState === "complete") {
      enableVideo();
    } else {
      window.addEventListener("load", enableVideo, { once: true });
    }

    return () => {
      window.removeEventListener("load", enableVideo);
      if (timer) clearTimeout(timer);
    };
  }, [priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldAttachSource) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    let isIntersecting = false;

    const playVideo = async () => {
      if (!video || !isIntersecting || document.visibilityState === "hidden") return;
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        await video.play();
      } catch {
        const onFirstInteraction = () => {
          if (isIntersecting && document.visibilityState !== "hidden") {
            video.play().catch(() => {});
          }
        };
        window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
        window.addEventListener("click", onFirstInteraction, { once: true, passive: true });
      }
    };

    const pauseVideo = () => {
      if (video && !video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersecting = true;
            setInView(true);
            playVideo();
          } else {
            isIntersecting = false;
            pauseVideo();
          }
        });
      },
      { rootMargin: "150px 0px 150px 0px", threshold: 0.01 }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pauseVideo();
      } else if (isIntersecting) {
        playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      pauseVideo();
    };
  }, [optimizedSrc, shouldAttachSource]);

  return (
    <>
      {resolvedPoster && (
        <img
          src={resolvedPoster}
          alt=""
          aria-hidden="true"
          width={960}
          height={540}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={className}
          style={style}
        />
      )}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        // @ts-ignore
        webkit-playsinline="true"
        preload="none"
        poster={resolvedPoster}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        className={className}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          ...style,
        }}
        {...props}
      >
        {shouldAttachSource && inView && (
          <source src={optimizedSrc} type="video/mp4" />
        )}
      </video>
    </>
  );
}
